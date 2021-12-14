
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"
import "./SynoptiqueElectriqueMazraa.css";

const SynoptiqueElectriqueMazraa = ({ data }) => {
    const [ready, setReady] = useState(false)
    const Router = useHistory()

    const task = {
        "ml": [{ "m_code": "37_1", "m_name": "KWh_J" },
        { "m_code": "2037_1", "m_name": "KWh_J / PARENT" },
        { "m_code": "39_1", "m_name": "INC_J" }],
        "cl": [
            { "Code_Compteur": "MZC00A", "Le_Compteur": "Usine_ElMazraa_Distr_Elec" },
            { "Code_Compteur": "MZCB10", "Le_Compteur": "Generale_Post_TR1" },
            { "Code_Compteur": "MZCB20", "Le_Compteur": "Generale_Post_TR2" },
            { "Code_Compteur": "MZCB30", "Le_Compteur": "Generale_Post_TR3" },
            { "Code_Compteur": "MZCB50", "Le_Compteur": "Generale_Post_TR5" },
            { "Code_Compteur": "MZCB60", "Le_Compteur": "Generale_Post_TR6" },
            { "Code_Compteur": "MZCB40", "Le_Compteur": "Generale_Post_TR4" },
        ],
        "retour": "json",
        "cross_tab": "normalised"
    }
    const url = `${window.apiUrl}cluster/`

    const getData = (data) => {
        (data || []).map((elem, i) => {
            const cc = elem.cc_m.split(",")[0]
            const id = elem.cc_m.split(",")[1]

            const _elem = document.querySelector(`#___${cc}___${id}`)
            if (_elem) {
                switch (id) {
                    // <tspan x="80" y="0" id="___MZCB50___37" className="data"></tspan>
                    case "37":
                        _elem.innerHTML = `${elem.value} ${elem.m_name}`
                        break;
                    case "2037":
                        _elem.innerHTML = `${elem.value} ${elem.m_name}`
                        break;
                    case "39":
                        //                 <circle cx="223.29" cy="187.19" r="16.35" transform="translate(21.94 397.79) rotate(-86.5)" fill="#fff"
                        // stroke="#8c9190" strokeMiterlimit="10" strokeWidth="3" className="iincident_True" id="___MZCB10___39" />
                        _elem.classList.remove("incident_True")
                        _elem.classList.remove("incident_False")
                        if (elem.value == 0)
                            _elem.classList.add("incident_False")
                        else
                            _elem.classList.add("incident_True")
                        break;
                }

            }
            else {
                console.log(`___${cc}___${id}`, "where is the catch ?")
            }

        })
    }

    const handleLinks = (data, inervalId) => {
        const done = []

        const handleClickableLinks = (elem) => {
            if (inervalId) {
                clearInterval(inervalId)
                inervalId = false
            }
            Router.push(`/`)
        }

            (data || []).map((elem, i) => {
                const cc = elem.cc_m.split(",")[0]
                const _elem = document.querySelector(`#___${cc}___`)
                if (_elem) {
                    if (!done.includes(`___${cc}___`)) {
                        done.push(`___${cc}___`)
                        _elem.style.cursor="pointer"
                        _elem.addEventListener("click", () => handleClickableLinks(_elem))
                    }
                }
                else {
                    console.log(`___${cc}___`, 404, "baché")
                }
            })
    }
    useEffect(() => {

        setReady(true)
        let inervalId = setInterval((ready) => {

            ready && axios.post(url, task)
                .then(({ data }) => {
                    if (inervalId)
                        getData(data)
                })
        }, 5000, [ready]);

        axios.post(url, task)
            .then(({ data }) => {
                handleLinks(data, inervalId)
                getData(data)
            })

        return function cleanup() {
            setReady(false)
            clearInterval(inervalId)
        }
    }, [])


    return (<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1348.8 649.34">

        <title>Web Synoptique Energitique Electrique_Mazraa V2</title><text transform="translate(323.63 246.9) scale(2.34 1)"
            fontSize="10.22" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham"
            textDecoration="underline">TR1</text>
        <g id="_Groupe_" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_2" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_" data-name="&lt;Tracé transparent&gt;"
                    d="M366.05,228H329.6a1.08,1.08,0,0,1-1.15-1V199.19a1.08,1.08,0,0,1,1.15-1h36.46a1.08,1.08,0,0,1,1.15,1V227A1.08,1.08,0,0,1,366.05,228Zm-35.31-2h34.16V200.19H330.74Z"
                    transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_3" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_4" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_" data-name="&lt;Tracé&gt;" d="M341.25,197.58h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_5" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_2" data-name="&lt;Tracé&gt;" d="M341.25,195.08h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_6" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_3" data-name="&lt;Tracé&gt;" d="M341,192.59h-6.11a1,1,0,1,1,0-2H341a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_7" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_4" data-name="&lt;Tracé&gt;" d="M340.79,190.09h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_8" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_9" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_5" data-name="&lt;Tracé&gt;" d="M361,197.58H354.4a1,1,0,1,1,0-2H361a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_10" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_6" data-name="&lt;Tracé&gt;" d="M361,195.08H354.4a1,1,0,1,1,0-2H361a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_11" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_7" data-name="&lt;Tracé&gt;" d="M360.74,192.59h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_12" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_8" data-name="&lt;Tracé&gt;" d="M360.51,190.09h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_13" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_2" data-name="&lt;Tracé transparent&gt;"
                    d="M371.14,231.83H324.51a1.08,1.08,0,0,1-1.15-1V227a1.08,1.08,0,0,1,1.15-1h46.62a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,371.14,231.83Zm-45.48-2H370V228H325.66Z"
                    transform="translate(-0.86 -0.83)" fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_14" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_15" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_9" data-name="&lt;Tracé&gt;"
                        points="347.46 218.98 345.35 218.21 348.42 211.9 341.53 213.32 346.77 201.98 348.89 202.72 345.31 210.49 352.29 209.05 347.46 218.98"
                        fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_16" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_10" data-name="&lt;Tracé&gt;"
                        points="345.26 220.97 343.26 217.03 345.36 216.22 346.42 218.31 349.12 217.22 350.08 219.04 345.26 220.97"
                        fill="#8c9190" stroke="#8c9190" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g><text transform="translate(326.7 444.54) scale(2.34 1)" fontSize="10.22" fill="#b6a833" stroke="#cebe2c"
            strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham" textDecoration="underline">TR2</text>
        <g id="_Groupe_17" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_18" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_3" data-name="&lt;Tracé transparent&gt;"
                    d="M370.14,425.67H333.68a1.08,1.08,0,0,1-1.15-1V396.84a1.08,1.08,0,0,1,1.15-1h36.46a1.08,1.08,0,0,1,1.15,1v27.84A1.08,1.08,0,0,1,370.14,425.67Zm-35.31-2H369V397.84H334.83Z"
                    transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_19" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_20" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_11" data-name="&lt;Tracé&gt;" d="M345.34,395.22h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_21" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_12" data-name="&lt;Tracé&gt;" d="M345.34,392.73h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_22" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_13" data-name="&lt;Tracé&gt;" d="M345.11,390.23H339a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_23" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_14" data-name="&lt;Tracé&gt;" d="M344.88,387.74h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_24" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_25" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_15" data-name="&lt;Tracé&gt;" d="M365.06,395.22h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_26" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_16" data-name="&lt;Tracé&gt;" d="M365.06,392.73h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_27" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_17" data-name="&lt;Tracé&gt;" d="M364.83,390.23h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_28" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_18" data-name="&lt;Tracé&gt;" d="M364.6,387.74h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_29" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_4" data-name="&lt;Tracé transparent&gt;"
                    d="M375.22,429.48H328.6a1.08,1.08,0,0,1-1.15-1v-3.81a1.08,1.08,0,0,1,1.15-1h46.62a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,375.22,429.48Zm-45.48-2h44.33v-1.81H329.75Z"
                    transform="translate(-0.86 -0.83)" fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_30" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_31" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_19" data-name="&lt;Tracé&gt;"
                        points="351.55 416.63 349.44 415.85 352.5 409.55 345.61 410.97 350.85 399.63 352.98 400.37 349.39 408.14 356.38 406.69 351.55 416.63"
                        fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_32" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_20" data-name="&lt;Tracé&gt;"
                        points="349.35 418.61 347.35 414.68 349.45 413.87 350.51 415.95 353.21 414.87 354.17 416.68 349.35 418.61"
                        fill="#cebe2c" stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g><text transform="translate(796.51 245.9) scale(2.34 1)" fontSize="10.22" fill="#0665b1" stroke="#00585e"
            strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham" textDecoration="underline">TR3</text>
        <g id="_Groupe_33" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_34" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_5" data-name="&lt;Tracé transparent&gt;"
                    d="M840,227H803.5a1.08,1.08,0,0,1-1.15-1V198.19a1.08,1.08,0,0,1,1.15-1H840a1.08,1.08,0,0,1,1.15,1V226A1.08,1.08,0,0,1,840,227Zm-35.31-2h34.16V199.19H804.65Z"
                    transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_35" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_36" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_21" data-name="&lt;Tracé&gt;" d="M815.15,196.58h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_37" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_22" data-name="&lt;Tracé&gt;" d="M815.15,194.08h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_38" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_23" data-name="&lt;Tracé&gt;" d="M814.92,191.59h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_39" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_24" data-name="&lt;Tracé&gt;" d="M814.7,189.09H809a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_40" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_41" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_25" data-name="&lt;Tracé&gt;" d="M834.87,196.58H828.3a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_42" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_26" data-name="&lt;Tracé&gt;" d="M834.87,194.08H828.3a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_43" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_27" data-name="&lt;Tracé&gt;" d="M834.64,191.59h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_44" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_28" data-name="&lt;Tracé&gt;" d="M834.41,189.09h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_45" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_6" data-name="&lt;Tracé transparent&gt;"
                    d="M845,230.83H798.42a1.08,1.08,0,0,1-1.15-1V226a1.08,1.08,0,0,1,1.15-1H845a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,845,230.83Zm-45.48-2h44.33V227H799.56Z"
                    transform="translate(-0.86 -0.83)" fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_46" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_47" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_29" data-name="&lt;Tracé&gt;"
                        points="821.37 217.98 819.26 217.21 822.32 210.9 815.43 212.32 820.67 200.98 822.79 201.72 819.21 209.49 826.19 208.05 821.37 217.98"
                        fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_48" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_30" data-name="&lt;Tracé&gt;"
                        points="819.17 219.97 817.17 216.03 819.26 215.22 820.32 217.31 823.03 216.23 823.98 218.04 819.17 219.97"
                        fill="#00585e" stroke="#00585e" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g><text transform="translate(790.15 431.81) scale(2.34 1)" fontSize="10.22" fill="#f7941d" stroke="#c91d5c"
            strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham" textDecoration="underline">TR5</text>
        <g id="_Groupe_49" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_50" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_7" data-name="&lt;Tracé transparent&gt;"
                    d="M833.6,412.94H797.14a1.08,1.08,0,0,1-1.15-1V384.11a1.08,1.08,0,0,1,1.15-1H833.6a1.08,1.08,0,0,1,1.15,1v27.84A1.08,1.08,0,0,1,833.6,412.94Zm-35.31-2h34.16V385.11H798.29Z"
                    transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_51" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_52" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_31" data-name="&lt;Tracé&gt;" d="M808.79,382.49h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_53" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_32" data-name="&lt;Tracé&gt;" d="M808.79,380h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_54" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_33" data-name="&lt;Tracé&gt;" d="M808.57,377.5h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_55" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_34" data-name="&lt;Tracé&gt;" d="M808.34,375h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_56" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_57" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_35" data-name="&lt;Tracé&gt;" d="M828.51,382.49h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_58" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_36" data-name="&lt;Tracé&gt;" d="M828.51,380h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_59" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_37" data-name="&lt;Tracé&gt;" d="M828.28,377.5h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_60" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_38" data-name="&lt;Tracé&gt;" d="M828.05,375H822.4a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_61" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_8" data-name="&lt;Tracé transparent&gt;"
                    d="M838.68,416.75H792.06a1.08,1.08,0,0,1-1.15-1v-3.81a1.08,1.08,0,0,1,1.15-1h46.62a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,838.68,416.75Zm-45.48-2h44.33v-1.81H793.2Z"
                    transform="translate(-0.86 -0.83)" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_62" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_63" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_39" data-name="&lt;Tracé&gt;"
                        points="815.01 403.9 812.9 403.12 815.96 396.82 809.07 398.24 814.31 386.9 816.44 387.64 812.85 395.41 819.83 393.96 815.01 403.9"
                        fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_64" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_40" data-name="&lt;Tracé&gt;"
                        points="812.81 405.88 810.81 401.95 812.9 401.14 813.96 403.22 816.67 402.14 817.63 403.95 812.81 405.88"
                        fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g>
        <rect x="963.83" y="184.01" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="1016.97" y="177.23" width="144.07" height="16.63" fill="#fff" /><text transform="translate(1028.72 191.44)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZCB60___">Géneral TR6
        </text>
        <rect x="55.37" y="184.82" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="108.5" y="184.17" width="144.07" height="16.63" fill="#fff" /><text transform="translate(126.52 192.38)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZCB10___">Géneral TR1
        </text>
        <circle cx="223.29" cy="187.19" r="16.35" transform="translate(21.94 397.79) rotate(-86.5)" fill="#fff"
            stroke="#8c9190" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB10___39" />
        <line x1="236.58" y1="189.19" x2="338.91" y2="188.4" fill="#00aeef" stroke="#8c9190" strokeMiterlimit="10"
            strokeWidth="3" />
        <rect x="55.37" y="380.66" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="108.5" y="376.95" width="144.07" height="16.63" fill="#fff" /><text transform="translate(122.43 388.22)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZCB20___">Géneral TR2
        </text>
        <circle cx="223.29" cy="385.07" r="16.35" transform="translate(-175.57 583.58) rotate(-86.5)" fill="#fff"
            stroke="#cebe2c" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB20___39" />
        <line x1="235.58" y1="387.07" x2="338.91" y2="386.28" fill="none" stroke="#cebe2c" strokeMiterlimit="10"
            strokeWidth="3" />
        <rect x="524.16" y="183.02" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="577.29" y="179.3" width="120.84" height="12.92" fill="#fff" /><text transform="translate(591.23 190.58)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZCB30___">Géneral TR3
        </text>
        <circle cx="692.08" cy="187.43" r="16.35" transform="translate(461.85 865.93) rotate(-86.5)" fill="#fff"
            stroke="#00585e" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB30___39" />
        <line x1="708.37" y1="189.43" x2="807.7" y2="188.64" fill="#0068b3" stroke="#00585e" strokeMiterlimit="10"
            strokeWidth="3" />
        <rect x="519.14" y="366.67" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="572.27" y="362.96" width="144.07" height="16.63" fill="#fff" /><text transform="translate(586.2 374.23)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZCB50___">Géneral TR5
        </text>
        <circle cx="687.06" cy="371.08" r="16.35" transform="translate(273.82 1033.35) rotate(-86.5)" fill="#fff"
            stroke="#c91d5c" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB50___39" />
        <line x1="699.35" y1="373.09" x2="802.67" y2="372.29" fill="#c91d5c" stroke="#c91d5c" strokeMiterlimit="10"
            strokeWidth="3" /><text transform="translate(1234.05 245.87) scale(2.34 1)" fontSize="10.22" fill="#2e3192"
                stroke="#72cddd" strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham" textDecoration="underline">TR6</text>
        <g id="_Groupe_65" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_66" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_9" data-name="&lt;Tracé transparent&gt;"
                    d="M1276.46,227H1240a1.08,1.08,0,0,1-1.15-1V198.17a1.08,1.08,0,0,1,1.15-1h36.46a1.08,1.08,0,0,1,1.15,1V226A1.08,1.08,0,0,1,1276.46,227Zm-35.31-2h34.16V199.17h-34.16Z"
                    transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_67" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_68" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_41" data-name="&lt;Tracé&gt;" d="M1251.66,196.55h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_69" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_42" data-name="&lt;Tracé&gt;" d="M1251.66,194.06h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_70" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_43" data-name="&lt;Tracé&gt;" d="M1251.43,191.56h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_71" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_44" data-name="&lt;Tracé&gt;" d="M1251.2,189.07h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_72" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_73" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_45" data-name="&lt;Tracé&gt;" d="M1271.38,196.55h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_74" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_46" data-name="&lt;Tracé&gt;" d="M1271.38,194.06h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_75" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_47" data-name="&lt;Tracé&gt;" d="M1271.15,191.56H1265a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_76" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_48" data-name="&lt;Tracé&gt;" d="M1270.92,189.07h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_77" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_10" data-name="&lt;Tracé transparent&gt;"
                    d="M1281.55,230.81h-46.62a1.08,1.08,0,0,1-1.15-1V226a1.08,1.08,0,0,1,1.15-1h46.62a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,1281.55,230.81Zm-45.48-2h44.33V227h-44.33Z"
                    transform="translate(-0.86 -0.83)" fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_78" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_79" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_49" data-name="&lt;Tracé&gt;"
                        points="1257.88 217.96 1255.76 217.18 1258.83 210.87 1251.94 212.3 1257.18 200.95 1259.3 201.7 1255.72 209.47 1262.7 208.02 1257.88 217.96"
                        fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_80" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_50" data-name="&lt;Tracé&gt;"
                        points="1255.67 219.94 1253.68 216 1255.77 215.2 1256.83 217.28 1259.54 216.2 1260.49 218.01 1255.67 219.94"
                        fill="#72cddd" stroke="#72cddd" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g>
        <circle cx="1127.67" cy="190.46" r="16.35" transform="translate(867.79 1303.55) rotate(-86.5)" fill="#fff"
            stroke="#72cddd" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB60___39" />
        <line x1="1145.07" y1="188.38" x2="1248.39" y2="187.59" fill="#2e3192" stroke="#72cddd" strokeMiterlimit="10"
            strokeWidth="3" /><text transform="translate(1233.71 429.52) scale(2.34 1)" fontSize="10.22" fill="#00a651"
                stroke="#3cba92" strokeMiterlimit="10" fontFamily="Gotham-Book, Gotham" textDecoration="underline">TR4</text>
        <g id="_Groupe_81" data-name="&lt;Groupe&gt;">
            <g id="_Groupe_82" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_11" data-name="&lt;Tracé transparent&gt;"
                    d="M1277.26,412.69H1240.8a1.08,1.08,0,0,1-1.15-1V383.85a1.08,1.08,0,0,1,1.15-1h36.46a1.08,1.08,0,0,1,1.15,1v27.84A1.08,1.08,0,0,1,1277.26,412.69Zm-35.31-2h34.16V384.85H1242Z"
                    transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_83" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_84" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_51" data-name="&lt;Tracé&gt;" d="M1252.46,382.24h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_85" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_52" data-name="&lt;Tracé&gt;" d="M1252.46,379.74h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_86" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_53" data-name="&lt;Tracé&gt;" d="M1252.23,377.25h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_87" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_54" data-name="&lt;Tracé&gt;" d="M1252,374.75h-5.66a1,1,0,1,1,0-2H1252a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_88" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_89" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_55" data-name="&lt;Tracé&gt;" d="M1272.18,382.24h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_90" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_56" data-name="&lt;Tracé&gt;" d="M1272.18,379.74h-6.57a1,1,0,1,1,0-2h6.57a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_91" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_57" data-name="&lt;Tracé&gt;" d="M1271.95,377.25h-6.11a1,1,0,1,1,0-2h6.11a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_92" data-name="&lt;Groupe&gt;">
                    <path id="_Tracé_58" data-name="&lt;Tracé&gt;" d="M1271.72,374.75h-5.66a1,1,0,1,1,0-2h5.66a1,1,0,1,1,0,2Z"
                        transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
            <g id="_Groupe_93" data-name="&lt;Groupe&gt;">
                <path id="_Tracé_transparent_12" data-name="&lt;Tracé transparent&gt;"
                    d="M1282.34,416.49h-46.62a1.08,1.08,0,0,1-1.15-1v-3.81a1.08,1.08,0,0,1,1.15-1h46.62a1.08,1.08,0,0,1,1.15,1v3.81A1.08,1.08,0,0,1,1282.34,416.49Zm-45.48-2h44.33v-1.81h-44.33Z"
                    transform="translate(-0.86 -0.83)" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
            </g>
            <g id="_Groupe_94" data-name="&lt;Groupe&gt;">
                <g id="_Groupe_95" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_59" data-name="&lt;Tracé&gt;"
                        points="1258.67 403.64 1256.56 402.87 1259.62 396.56 1252.73 397.98 1257.97 386.64 1260.1 387.39 1256.51 395.15 1263.49 393.71 1258.67 403.64"
                        fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
                <g id="_Groupe_96" data-name="&lt;Groupe&gt;">
                    <polygon id="_Tracé_60" data-name="&lt;Tracé&gt;"
                        points="1256.47 405.63 1254.47 401.69 1256.57 400.88 1257.63 402.97 1260.33 401.89 1261.29 403.7 1256.47 405.63"
                        fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10" strokeWidth="0" />
                </g>
            </g>
        </g>
        <rect x="963.83" y="364.61" width="254.42" height="78.68" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="1016.97" y="362.94" width="144.07" height="16.63" fill="#fff" /><text transform="translate(1030.9 376.26)"
            fontSize="12.26" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="DR11___MZCB40___">Géneral TR4
        </text>
        <circle cx="1128.69" cy="376.17" r="16.35" transform="translate(683.38 1478.93) rotate(-86.5)" fill="#fff"
            stroke="#3cba92" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZCB40___39" />
        <line x1="1145.07" y1="374.09" x2="1248.39" y2="373.3" fill="#3cba92" stroke="#3cba92" strokeMiterlimit="10"
            strokeWidth="3" />
        <rect x="605.66" y="645.75" width="106.95" height="3.58" fill="#fff" /><text transform="translate(82.6 215.05)"
            fontSize="10.21" fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB10___37" className="data"></tspan>
        </text><text transform="translate(82.6 239.27)" fontSize="10.21" fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZCB10___2037" className="data">
            </tspan>
        </text>
        <circle cx="72.84" cy="210.78" r="4.37" fill="#6D6E71" className="point" />
        <circle cx="73.86" cy="235.28" r="4.37" fill="#6D6E71" /><text transform="translate(83.82 410.22)" fontSize="10.21"
            fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB20___37" className="data"></tspan>
        </text><text transform="translate(83.82 434.44)" fontSize="10.21" fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZCB20___2037" className="data"></tspan>
        </text>
        <circle cx="74.06" cy="405.94" r="4.37" fill="#6D6E71" />
        <circle cx="75.08" cy="430.45" r="4.37" fill="#6D6E71" /><text transform="translate(554.59 217.67)" fontSize="10.21"
            fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB30___37" className="data"></tspan>
        </text><text transform="translate(554.59 241.89)" fontSize="10.21" fill="#231f20"
            fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZCB30___2037" className="data"></tspan>
        </text>
        <circle cx="544.83" cy="213.4" r="4.37" fill="#6D6E71" />
        <circle cx="545.85" cy="237.91" r="4.37" fill="#6D6E71" /><text transform="translate(547.59 400.85)" fontSize="10.21"
            fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB50___37" className="data"></tspan>
        </text><text transform="translate(547.59 425.07)" fontSize="10.21" fill="#231f20"
            fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZCB50___2037" className="data"></tspan>
        </text>
        <circle cx="537.83" cy="396.58" r="4.37" fill="#6D6E71" />
        <circle cx="538.85" cy="421.08" r="4.37" fill="#6D6E71" /><text transform="translate(996.71 217.11)" fontSize="10.21"
            fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB60___37" className="data"></tspan>
        </text><text transform="translate(996.71 241.33)" fontSize="10.21" fill="#231f20"
            fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZCB60___2037" className="data"></tspan>
        </text>
        <circle cx="986.95" cy="212.84" r="4.37" fill="#6D6E71" />
        <circle cx="987.97" cy="237.34" r="4.37" fill="#6D6E71" /><text transform="translate(996.58 400.84)" fontSize="10.21"
            fill="#231f20" fontFamily="Gotham-Medium, Gotham" letterSpacing="-0.01em">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZCB40___37" className="data"></tspan>
        </text><text transform="translate(996.58 425.06)" fontSize="10.21" fill="#231f20"
            fontFamily="Gotham-Medium, Gotham"><tspan x="80" y="0" id="___MZCB40___2037" className="data"></tspan>
            <tspan x="0" y="0">Partage</tspan>
        </text>
        <circle cx="986.81" cy="396.56" r="4.37" fill="#6D6E71" />
        <circle cx="987.84" cy="421.07" r="4.37" fill="#6D6E71" />
        <rect x="525.05" width="132.35" height="15.27" fill="#fff" />
        <rect y="265.15" width="132.35" height="15.27" fill="#fff" />
        <rect x="646.44" y="633.89" width="132.35" height="15.27" fill="#fff" />
        <rect x="1216.45" y="258.72" width="132.35" height="15.27" fill="#fff" />
        <rect x="31.14" y="99.17" width="1283" height="393" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="0.75" />
        <rect x="81.21" y="118.27" width="242.27" height="46.65" rx="12" ry="12" fill="none" stroke="#231f20"
            strokeMiterlimit="10" strokeWidth="2" /><text transform="translate(99.97 134.3)" fontSize="9.38" fill="#231f20"
                fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Consommation</tspan><tspan x="80" y="0" id="___MZC00A___37" className="data"></tspan>
        </text><text transform="translate(99.97 156.55)" fontSize="9.38" fill="#231f20" fontFamily="Gotham-Medium, Gotham">
            <tspan x="0" y="0">Partage</tspan><tspan x="80" y="0" id="___MZC00A___2037" className="data"></tspan>
        </text>
        <circle cx="91.01" cy="130.37" r="4.02" fill="#6D6E71" />
        <circle cx="91.94" cy="152.88" r="4.02" fill="#6D6E71" />
        <rect x="160.14" y="93.89" width="69" height="12.92" fill="#fff" /><text transform="translate(173.13 101.35)"
            fontSize="13" fill="#231f20" fontFamily="Gotham-Medium, Gotham" id="___MZC00A___">ElMazraa
        </text>
        <circle cx="156.47" cy="98.11" r="15.02" transform="translate(48.11 247.46) rotate(-86.5)" fill="#fff"
            stroke="#a7a9ac" strokeMiterlimit="10" strokeWidth="3" className="incident_False" id="___MZC00A___39" />
        <circle cx="126.52" cy="101.35" r="11.5" fill="#fff" stroke="#010101" strokeMiterlimit="10" strokeWidth="3" id="R9______" />
        <text transform="translate(119.52 111.35)" fontSize="30" fill="#010101"
            fontFamily="MSReferenceSansSerif, MS Reference Sans Serif">-</text>
    </svg>);
}

export default SynoptiqueElectriqueMazraa;