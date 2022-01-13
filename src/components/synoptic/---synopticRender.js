
import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./synopticRender.css"
import axios from "axios"
import { ReactSVG } from 'react-svg'
import useState2 from "react-usestateref"
import { getNested, parseParams } from '../Rapporteur/Rapport/layoutGen/extra';
// import {ReactComponent as Svg} from "../../synoptic/Synoptique Energitique Vapeur_ElMarzaa.svg";

const SynopticRender = ({ history, prefix = "", synopticObject, autoUpdate = false, name = "" }) => {

    const [svgName, setSvgName] = useState(null)
    const [ready, setReady] = useState(null)
    const [data, setData] = useState(null)
    const [url, setUrl] = useState(null)
    const [params, setParams] = useState(null)
    const [masterObj, setMasterObj,] = useState(null)
    const [backupData, setBackupData, backupDataRef] = useState2({})
    const [loading, setLoading, loadingRef] = useState2(true)

    const unitFixer = (unit, period) => {
        let output;
        output = unit.replaceAll("_Slash_", "/")
        output = unit.replaceAll("_slash_", "/")
        // output = output.replaceAll("Rendement", "")

        // output = output.replaceAll("Rendement__percent_", "%")
        // output = output.replaceAll("Rendement_percent_", "%")
        // output = output.replaceAll("rendement__percent_", "%")
        // output = output.replaceAll("rendement_percent_", "%")
        // output = output.replaceAll("rendement", "")
        output = output.replaceAll("_percent_", "%")
        output = output.replaceAll("_1", ` ${period}-1`)
        return output
    }

    const unitDisplayFixer = (unitFixed, value) => {
        let output = unitFixed;
        if (output.indexOf("Part_") != -1)
            output = "%"

        if (output.indexOf("Ratio") != -1)
            // output = "%"
            output = ""

        if (output.indexOf("Tonne") != -1) {
            if (value > 1)
                output = "Tonnes"
            else
                output = "Tonne"
        }
        output = output.replaceAll(/Rendement__percent_/gi, "%")
        output = output.replaceAll(/Rendement_percent_/gi, "%")
        output = output.replaceAll(/m3Eau/gi, "m3")
        return output;
    }

    const getData = (data) => {
        if (!Array.isArray(data)) data = [];

        const period = synopticObject.object.period
        return data.map((elem, i) => {

            const cc = elem.cc_m.split(",")[0]
            const id = elem.cc_m.split(",")[1]
            const unit = elem.m_name

            const unitFixed = unitFixer(unit, period)
            const unitDisplay = unitDisplayFixer(unitFixed, parseFloat(elem.value))
            // DDR01___MZV000___

            const _elem = document.querySelector(`#___${cc}___${unitFixed}`)

            //#___MZB110___Ton_1

            if (_elem) {
                switch (id) {
                    case "28":
                    case "31":
                    case "155":
                    case "998":
                        _elem.classList.remove("incident_True")
                        _elem.classList.remove("incident_False")
                        _elem.classList.remove("incident_Null")
                        const value = parseFloat(elem.value)
                        if (isNaN(value))
                            _elem.classList.add("incident_Null")
                        else
                            if (value == 0)
                                _elem.classList.add("incident_False")
                            else
                                _elem.classList.add("incident_True")

                        _elem.innerHTML = value.toString()

                        break;

                    default: {
                        
                        _elem.innerHTML = `${parseFloat((elem.value || 0).toFixed(4)) || 0} ${unitDisplay}`
                        // _elem.innerHTML = `${parseFloat(elem.value).toFixed(4) || 0} ${unitDisplay}`
                    }
                }
            }
            return cc
        })
    }

    const handleLinks = (data, inervalId) => {
        const done = []
        const handleClickableLinks = (elem) => {
            if (inervalId) {
                clearInterval(inervalId)
                inervalId = false
            }
        }

        (data || []).map((elem, i) => {
            const cc = elem.cc_m.split(",")[0]
            const _elem = document.querySelector(`#___${cc}___`)
            if (_elem) {
                if (!done.includes(`___${cc}___`)) {
                    done.push(`___${cc}___`)
                    _elem.style.cursor = "pointer"
                    _elem.addEventListener("click", () => handleClickableLinks(_elem))
                }
            }

        })
    }

    const eventManager = (ccS, reportCode, next, prev, zpm, remove = false) => {
        const event = remove === true ? "removeEventListener" : "addEventListener"

        ccS.map((cc, i) => {
            const _reportsCodes=reportCode.split(",")
            _reportsCodes.map((code)=>{
                // console.log(`${code}___${cc}___`)

                document.querySelectorAll(`#${code}___${cc}___`).forEach((value, i, parent) => {
    
                    value.classList.add("noSelect", "pointer")
                    value[event]("click", () => {
                        const clElement = synopticObject.object.MasterObj_Data_Query.cl.find((el) => el.Code_Compteur == cc)
                        const tlElement = synopticObject.object.MasterObj_Data_Query.tl
    
    
                        // console.log("params", params)
    
                        history.push({
                            search: `?${params.reportId ? `parent=${params.reportId}&` : ""}&reportId=${code}&counters=${cc}&cLabels=${clElement.Le_Compteur}${tlElement?`&tlCluster=${tlElement}`:""}`,
    
                            // state: { detail: response.data }
                        })
                    }, { passive: true })
                })
            })
        })

        zpm = (zpm || "").split(",")

        if (Array.isArray(zpm) && zpm.length && zpm[0] != "") {
            const tlElement = synopticObject.object.MasterObj_Data_Query.tl

            zpm.map((reportCode, i) => {
                document.querySelectorAll(`#${reportCode}______`).forEach((value, i, parent) => {
                    value.classList.add("noSelect", "pointer")
                    value[event]("click", () => {
                        history.push({
                            search: `?${params.reportId ? `parent=${params.reportId}&` : ""}reportId=${reportCode}${tlElement?`&tlCluster=${tlElement}`:""}`,
                            // search: `?${backupDataRef.current.reportCode ? `parent=${backupDataRef.current.reportCode}&` : ""}reportId=${reportCode}`,
                        })
                    }, { passive: true })
                })
            })
        }

        [next, prev].map((reportCode, i) => {
            if (reportCode) {
                document.querySelectorAll(`#${reportCode}______`).forEach((value, i, parent) => {
                    value.classList.add("noSelect", "pointer")
                    value[event]("click", () => {
                        history.push({
                            search: `?${params.reportId ? `parent=${params.reportId}&` : ""}reportId=${reportCode}`,
                            // search: `?${backupDataRef.current.reportCode ? `parent=${backupDataRef.current.reportCode}&` : ""}reportId=${reportCode}`,
                        })
                    }, { passive: true })
                })
            }

        })

    }

    useEffect(() => {
        // if (!ready) return
        if (!ready || !data || !Array.isArray(data)) return
        const ccS = Array.from(new Set(getData(data)));
        const { DDRC: reportCode, prev, next, zpm } = { ...getNested(synopticObject, "object") }

        setBackupData({ ccS, reportCode, next, prev, zpm })

        // if (reportCode)
        eventManager(ccS, reportCode || "", next || "", prev || "", zpm || "")

    // }, [ready])
}, [ready, data])

    const unmount = () => {

        const { ccS, reportCode, next, prev, zpm } = { ...backupDataRef.current }
        eventManager(ccS, reportCode, next, prev, zpm, true)
    }

    useEffect(() => {
        let inervalId;
        let firstTime = true;
        setSvgName(synopticObject.object.Image);
        setParams(parseParams(history.location.search))
        const url = `${window.apiUrl}${synopticObject.object.QueryAPI}/`;
        const masterObjectQuery = synopticObject.object.MasterObj_Data_Query
        const refreshRate = synopticObject.object.RefreshRate

        if (masterObjectQuery) {
            axios.post(url, masterObjectQuery)
                .then(({ data }) => {
                    setData(data)
                    if (firstTime) {
                        handleLinks(data, inervalId)
                        firstTime = false;
                    }
                })

            if (autoUpdate && !isNaN(parseInt(refreshRate))) {
                inervalId = setInterval((task) => {
                    axios.post(url, task)
                        .then(({ data }) => {
                            getData(data)
                        })
                }, refreshRate * 1000, masterObjectQuery);

            }
        }

        return function cleanup() {
            clearInterval(inervalId)
            unmount()
        }
    }, [])

    const beforeInjection = useCallback((svg) => {

        const DDRC = getNested(synopticObject, "object", "DDRC")
        const ZPM = getNested(synopticObject, "object", "zpm")
        const DDRC_cond = getNested(synopticObject, "object", "DDRC_cond")
        const PREV = getNested(synopticObject, "object", "prev")
        const NEXT = getNested(synopticObject, "object", "next")

        const oldElems = svg.querySelector(`#reportCode`)

        const sar = (_old, _new,DDRC_cond="", svg, t) => {
            if (_old && typeof _old == "string" && _old.trim() != "" && _new && typeof _new == "string" && _new.trim() != "") {
                const _oldSplitted = _old.split(",")
                const _newSplitted = _new.split(",")
                if (t == "ZPM")
                    _oldSplitted.map((el, i) => {
                        const regex = new RegExp(`${el}______`, "gi");
                        svg.innerHTML = svg.innerHTML.replace(regex, `${_newSplitted[i]}______`)
                    })
                else if (t == 'DDRC'){
                    const __new=_new.split(",")
                    const __cond=DDRC_cond.split(";_;")

                    __new.map((_new,i)=>{
                        const r=new RegExp(__cond[i],"i")
                        synopticObject.object.MasterObj_Data_Query.cl.map((cl,i)=>{
                            const counter=cl.Code_Compteur.trim()
                            let from = `${_old}___${counter}___`
                            const to =r.exec(counter)?`${_new}___${counter}___`:false
                            if (to){
                                const regex = new RegExp(from, "gi"); 
                                svg.innerHTML = svg.innerHTML.replace(regex, to)    
                            }
                        })
                    })
                    // if (__new.length>1){
                    //     synopticObject.object.MasterObj_Data_Query.cl.map((cl,i)=>{
                    //         const counter=cl.Code_Compteur
                    //         let from = `${_old}___${counter}___`
                    //         let to =""
                    //         if (counter[2]=="B")
                    //             to=`${__new[0]}___${counter}___`
                    //         else
                    //             to=`${__new[1]}___${counter}___`
                    //         const regex = new RegExp(from, "gi"); 
                    //         svg.innerHTML = svg.innerHTML.replace(regex, to)    
                    //     })

                    // }else{
                    //     const regex = new RegExp(`${_old}___`, "gi"); 
                    //     svg.innerHTML = svg.innerHTML.replace(regex, `${_new}___`)    
                    // }
                }
                else {
                    const regex = new RegExp(`${_old}___`, "gi");
                    svg.innerHTML = svg.innerHTML.replace(regex, `${_new}___`)
                }
                // else if (t == "DDRC") {
                //     const regex = new RegExp(`${_old}___`, "gi");
                //     svg.innerHTML = svg.innerHTML.replace(regex, `${_new}___`)

                // }
                // else if (t == "PREV") {
                //     const regex = new RegExp(`${_old}______`, "gi");
                //     svg.innerHTML = svg.innerHTML.replace(regex, `${_new}______`)
                // }
            }
            return svg
        }

        if (oldElems) {
            const oldDDRC = oldElems.getAttribute("dl")
            const oldZpm = oldElems.getAttribute("zpm")
            const oldPrev = oldElems.getAttribute("prev")
            const oldNext = oldElems.getAttribute("next")

            // if (typeof oldZpm == "string" && oldZpm.trim() != "") {
            //     const regex = new RegExp(oldZpm, "gi");
            //     svg.innerHTML = svg.innerHTML.replace(regex, ZPM)
            // }

            svg = sar(oldZpm, ZPM,null, svg, "ZPM")
            svg = sar(oldDDRC, DDRC,DDRC_cond, svg, "DDRC")

            svg = sar(oldPrev, PREV,null, svg, "PREV")
            svg = sar(oldNext, NEXT,null, svg, "NEXT")

        }
    }, []);

    const afterInjection = useCallback(() => {
        setReady(true)

    }, []);

    const onLoading = useCallback(() => {
        return <Loading />
    }, []);

    return (svgName ? <div style={{ width: "100%", height: "800px" }}>
        <ReactSVG
            loading={onLoading}
            afterInjection={afterInjection}
            beforeInjection={beforeInjection}
            src={`/synoptic/${prefix}${svgName}.svg`} />
    </div>
        : null)

}

const Spinner = ({ height }) => (
    <div className="text-center layoutGenerator-bg-loading" style={{ height }}>
        <div className="loadingBG" />
        <div
            className="spinner-border text-primary"
            style={{ opacity: 1, zIndex: 1000 }}
            role="status"
        >
            <span className="visually-hidden" />
        </div>
    </div>
);

const Loading = () => {
    return <div style={{ background: "black", opacity: .4, top: 0, position: "fixed", width: "100vw", height: "100vh" }} ><Spinner height={"100%"} /></div>
}
export default SynopticRender;


/*
    const getMasterObjectById = async (synopticId) => {
        const task = {
            ml: [],
            cl: [],
            retour: "json",
            cross_tab: "normalised"
        };
        return axios.post(urlGetReport, {
            tablename: "MasterObject",
            fields: "MasterObj_Code",
            identifier: "",
            content: synopticId,
            dataselect: "QueryAPI;MasterObj_Name;Image;MasterObj_Data_Query",
            dist: "*",
            orderby: "asc",
        }).then(({ data }) => {
            if (!data) return null
            data = Array.isArray(data) && data.length == 1 ? data[0] : data;

            setMasterObj(data)
            setSvgName(data.Image)

            task.ml = data.MasterObj_Data_Query.ml
            task.cl = data.MasterObj_Data_Query.cl
            return Object.assign({}, task, { cl: task.cl, ml: task.ml })
        })
    }
*/


/*
  const requestConstructor = async (synopticNameDeconstructed) => {
        const task = {
            ml: [],
            cl: [],
            retour: "json",
            cross_tab: "normalised"
        };
        const mlSelection = `${synopticNameDeconstructed.type}_${synopticNameDeconstructed.energy}_${synopticNameDeconstructed.time}`
        const clSelection = `${synopticNameDeconstructed.type}_${synopticNameDeconstructed.location}_${synopticNameDeconstructed.energy}`

        const mlPromise = axios.post(urlGetParams, {
            tablename: "ML_V3",
            fields: "ML_Name",
            identifier: "",
            content: mlSelection,
            dataselect: "ML_Membre",
            dist: "dist",
            orderby: "asc",
        }
        ).then(({ data }) => data).catch((err) => err)

        const clPromise = axios.post(urlGetParams, {
            tablename: "CL_V3",
            fields: "CompteurListI_Name",
            identifier: "",
            content: clSelection,
            dataselect: "CL_Membre",
            dist: "*",
            orderby: "asc",
        }).then(({ data }) => data).catch((err) => err)

        return Promise.all([mlPromise, clPromise]).then((resp) => {
            const ml = Array.isArray(resp[0]) && typeof resp[0][0] == "object" ? resp[0][0].ML_Membre : null;
            const cl = Array.isArray(resp[1]) && typeof resp[1][0] == "object" ? resp[1][0].CL_Membre : null;
            if (ml && cl)
                return Object.assign({}, task, { ml }, { cl })
            else return false
        })
    }
*/







