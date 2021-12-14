import { useState, useEffect } from "react"
import SynopticRender from "./synoptic/synopticRender"
import GenerateTable from "./Rapporteur/Rapport/layoutGen/layoutGenerator"
import axios from "axios"
import { getNested, parseParams, prepareParams, checkSize } from "./Rapporteur/Rapport/layoutGen/extra"
const Test = ({ history, layoutFormat }) => {


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

        const { parent, time } = { ...query }
        let { reportName: _tempReportName, reportId: _tempReportId, counters: _counters, cLabels: _cLabels, mesures: _mesures, mLabels: _mLabels } = { ...query }

        const counters = (_counters || "").split(",").filter(el=>el)
        const cLabels = (_cLabels || "").split(",").filter(el=>el)
        const mesures = (_mesures || "").split(",").filter(el=>el)
        const mLabels = (_mLabels || "").split(",").filter(el=>el)
        const reportName = _tempReportName ? decodeURI(_tempReportName) : undefined
        const reportId = _tempReportId

        if (counters.length != cLabels.length) {
       //     console.log("counters",counters.length , cLabels.length)
            return
        }

        if (mesures.length != mLabels.length) {
      //      console.log("mesures",mesures.length , mLabels.length)
            return
        }
        setReportName(reportName)
        setReportId(reportId)

        switch (true) {
            case (reportName && !counters.length && !mesures.length && !time): {
                axios.get(`${window.apiUrl}getReportByName/`, { params: { reportName } })
                    .then(({ data }) => {
                        if (!data) return
                        // data = Array.isArray(data) && data.length == 1 ? data[0] : data;
                        // data = data.Body
                        setWorkObject(data)


                        setIsSynoptic(Boolean(getNested(data, "object", "synoptic") && getNested(data, "object")))
                        setIsRapport(Boolean(getNested(data, "objects")))
                    })
                //                    .catch(()=>{
                //                       history.push("/")
                //                    })
            }
                break;
            case (reportId && !counters.length && !mesures.length && !time): {
                axios.get(`${window.apiUrl}getReportById/`, { params: { reportId } })
                    .then(({ data }) => {
                        if (!data) return

                        // data = Array.isArray(data) && data.length == 1 ? data[0] : data;
                        // data = data.Body
                        setWorkObject(data)
                        setIsSynoptic(Boolean(getNested(data, "object", "synoptic") && getNested(data, "object")))
                        setIsRapport(Boolean(getNested(data, "objects")))
                    })
                //                    .catch(()=>{
                //                       history.push("/")
                //                    })
            }

                break;
            // case (reportId && counters.length && cLabels.length && !mesures.length && !mLabels.length && !time): {
            //     axios.post(`${window.apiUrl}cloneV2/`, {
            //         R_IDs: [reportId],
            //         data: [{
            //             cl: {
            //                 members: counters.map((c, i) => ({
            //                     "Le_Compteur": cLabels[i],
            //                     "Code_Compteur": c
            //                 })),
            //             }
            //         }]

            //     }).then(({ data }) => {
            //         if (!Array.isArray(data) || data.length > 1) return;
            //         data = data[0]
            //         // setIsSynoptic(Boolean(getNested(data,"object","synoptic") && getNested(data,"object")))
            //         setWorkObject(data)

            //         setIsSynoptic(Boolean(getNested(data, "object", "synoptic") && getNested(data, "object")))
            //         // setIsRapport(Boolean(getNested(data,"objects")))
            //         setIsRapport(Boolean(getNested(data)))

            //     })
            //     // .catch(()=>{
            //     //     history.push("/")
            //     // })
            // }
            //     break;
           
           
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
                    if (mesures.length){
                        data.ml = {
                            members: mesures.map((m, i) => ({
                                "m_name": mLabels[i],
                                "m_code": m
                            })),
                        } 
                    }
                    if (time && typeof time == "string" && time.length)
                        data.tl=time
       
                    axios.post(`${window.apiUrl}cloneV2/`, {
                        R_IDs: [reportId],
                        data: [data]
    
                    }).then(({ data }) => {
                        if (!Array.isArray(data) || data.length > 1) return;
                        data = data[0]
                        // setIsSynoptic(Boolean(getNested(data,"object","synoptic") && getNested(data,"object")))
                        setWorkObject(data)
    
                        setIsSynoptic(Boolean(getNested(data, "object", "synoptic") && getNested(data, "object")))
                        // setIsRapport(Boolean(getNested(data,"objects")))
                        setIsRapport(Boolean(getNested(data)))
    
                    })
                break;
        }
        return function cleanup() { }
    }, [history.location.search])

    useEffect(() => {
        // const locations= location.pathname.split("/").filter((v,i)=>v)
        // const [rapport,counter]=locations[1].split("--")

        // if (rapport && !counter){
        //     axios.post(`${window.apiUrl}filter/`, {
        //         tablename: "Reporting_V3",
        //         fields: "Report_Name",
        //         identifier: "",
        //         content: rapport,
        //         dataselect: "Body",
        //         dist: "*",
        //         orderby: "asc",
        //       }).then(({ data }) => {
        //         if (!data) return
        //         data = Array.isArray(data) && data.length == 1 ? data[0] : data;
        //         data=data.Body
        //         setSynopticObject(data)
        //         setIsSynoptic(Boolean(data.synoptic))
        //       })
        // }
        // else{
        //     alert("")
        // }
        // return function cleanup() {}

    }, [])

    return (isSynoptic && workObject ?
        <SynopticRender synopticObject={workObject} prefix={"__"} history={history} name={reportName} autoUpdate={true} />
        : isReport && workObject ?
            <GenerateTable
                history={history}
                editor={false}
                supervisor={true}
                config={workObject}
                maxCols={5}
                maxRows={5}
                style={{ width: layoutFormat.width, height: layoutFormat.height }}
            /> : <>loading...</>);
}

const Fallback = ({ history }) => {
    useEffect(() => {
        history.push({ pathname: `/` })
    }, [])
    return (<></>)
}

export default Test;