import { useState, useEffect } from "react"
import SynopticRender from "./synoptic/synopticRender"
import GenerateTable from "./Rapporteur/Rapport/layoutGen/layoutGenerator"
// import axios from "axios"
import axios from "./axios"
import { getNested, parseParams, prepareParams, checkSize } from "./Rapporteur/Rapport/layoutGen/extra"
import {
    MDBAlert
  } from "mdbreact";
  import "../components/RapportRouteCss.css"
const Test = ({ history,callback=()=>{} ,layoutFormat}) => {

    const [isSynoptic, setIsSynoptic] = useState(null)
    const [isReport, setIsRapport] = useState(null)
    const [workObject, setWorkObject] = useState(null)
    const [plotConfig, setPlotConfig] = useState(null)
    const [reportName, setReportName] = useState(null)
    const [reprotId, setReportId] = useState(null)

    useEffect(() => {

        setWorkObject(null)
        setReportId(null)
        setReportName(null)
        setIsSynoptic(false)
        setIsRapport(false)
        const query = parseParams(history.location.search)

        const { parent, tlCluster,tlIot } = { ...query }
        let { reportName: _tempReportName, reportId: _tempReportId, counters: _counters, cLabels: _cLabels, mesures: _mesures, mLabels: _mLabels } = { ...query }

        const counters = (_counters || "").split(",").filter(el => el)
        const cLabels = (_cLabels || "").split(",").filter(el => el)
        const mesures = (_mesures || "").split(",").filter(el => el)
        const mLabels = (_mLabels || "").split(",").filter(el => el)
        const reportName = _tempReportName ? decodeURI(_tempReportName) : undefined
        const reportId = _tempReportId

        if (counters.length != cLabels.length) {
            console.log("counters", counters.length, cLabels.length)
            return
        }

        if (mesures.length != mLabels.length) {
            console.log("mesures", mesures.length, mLabels.length)
            return
        }
        setReportName(reportName)
        setReportId(reportId)

        switch (true) {
            case (reportName && !counters.length && !mesures.length && !tlCluster && !tlIot): {
                axios.get(`${window.apiUrl}getReportByName/`, { params: { reportName } }
                )
                    .then(({ data }) => {
                        //data=data.body
                        if (!data) return
                        callback(data)
                        setWorkObject(data.Body)
                        setIsSynoptic(Boolean(getNested(data.Body, "object", "synoptic") && getNested(data.Body, "object")))
                        setIsRapport(Boolean(getNested(data.Body, "objects")))
                    })
                    .catch(({response})=>{
                        
                        if(response!=null){
                        if (response.status=="401"){
                            console.log(response.status)
                            window.location.assign("/")
                            localStorage.clear();

                        }
                        }
                    }
                    )

            }
                break;
            case (reportId && !counters.length && !mesures.length && !tlCluster && !tlIot): {
                axios.get(`${window.apiUrl}getReportById/?reportId=${reportId}&b&n&tn`
                )
                    .then(({ data }) => {
                        console.log("test",data)
                       // data=data.Body
                        if (!data) return
                        callback(data)
                        setWorkObject(data.Body)
                        setIsSynoptic(Boolean(getNested(data.Body, "object", "synoptic") && getNested(data.Body, "object")))
                        setIsRapport(Boolean(getNested(data.Body, "objects")))
                    })
                    .catch(({response})=>{
                        
                          console.log("---------",response)
                          if(response!=null){
                       if (response.status=="401"){
                          
                            window.location.assign("/")
                            localStorage.clear();

                       }
                    }
                    }
                    )
            }

                break;

            default:
                const data = {}
                if (counters.length) {
                    data.cl = {
                        members: counters.map((c, i) => ({
                            "Le_Compteur": cLabels[i],
                            "Code_Compteur": c
                        })),
                    }
                }
                if (mesures.length) {
                    data.ml = {
                        members: mesures.map((m, i) => ({
                            "m_name": mLabels[i],
                            "m_code": m
                        })),
                    }
                }

                if (tlCluster && typeof tlCluster == "string" && tlCluster.length)
                    data.tlCluster = {id:tlCluster}

                if (tlIot && typeof tlIot == "string" && tlIot.length)
                    data.tlIot = {id:tlIot}

                axios.post(`${window.apiUrl}cloneV5/`, {
                    R_IDs: [reportId],
                    data: [data]

                }).then(({ data }) => {
                    if (!Array.isArray(data) || data.length > 1) return;
                    data = data[0]
                    callback(data)

                    setWorkObject(data)
                    setIsSynoptic(Boolean(getNested(data, "object", "synoptic") && getNested(data, "object")))
                    setIsRapport(Boolean(getNested(data)))
                })
                .catch(({response})=>{
                        
                    console.log("---------",response)
                    if(response!=null){
                 if (response.status=="401"){
                    
                      window.location.assign("/")
                      localStorage.clear();

                 }
                }
              }
              )
                break;
        }
        return function cleanup() { }
    }, [history.location.search])

    return (
        
        
        isSynoptic && workObject ?
        <SynopticRender synopticObject={workObject} /* prefix={"__"} */history={history} name={reportName} autoUpdate={true}  />
        : isReport && workObject ?
            <GenerateTable
                history={history}
                editor={false}
                supervisor={true}
                config={workObject}
                maxCols={5}
                maxRows={5}
                dummy={false}
                style={{ width: layoutFormat.width, height: layoutFormat.height }}
            /> : 
            // <>loading...</>
            
            <MDBAlert color="light" className="aucunRapport" >
            Aucun rapport affiché
          </MDBAlert>
            );
}

const Fallback = ({ history }) => {
    useEffect(() => {
        history.push({ pathname: `/` })
    }, [])
    return (<></>)
}

export default Test;