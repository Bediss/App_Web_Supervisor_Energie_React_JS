import axios from '../axios';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"

const Modal_TL_V2 = ({ toggle, handleListeTLClick }) => {

    const [QueryApi_select, setQueryApi_select] = useState("")
    const [chcboxValue, setChcboxValue] = useState(false)
    const [filterTL_Liste, setfilterTL_Liste] = useState([])
    const [filterTL_Liste_Cluster, setfilterTL_Liste_Cluster] = useState([])
    const [Listes_TL_Cluster, setListes_TL_Cluster] = useState([])
    const [Listes_TL_IOT, setListes_TL_IOT] = useState([])
    const [filterTL_Liste_Iot, setfilterTL_Liste_Iot] = useState([])
    useEffect(() => {
        axios.get(window.apiUrl + "getTl/")

            .then(
                (result) => {
                    if (result.data !== null) {

                        setListes_TL_Cluster(result.data.cluster)
                        setListes_TL_IOT(result.data.iot_value)
                    } else {
                    }

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
    }, [])
    useEffect(() => {



        if (QueryApi_select != "cluster" || QueryApi_select != "globales") {

            const inputCluster = document.querySelector("#myInputTl_Cluster")
            if (filterTL_Liste_Cluster.length == 0) {
                setfilterTL_Liste_Cluster(Listes_TL_Cluster)
            }

            const FilterTlClusterListe = (e) => {

                const text = e.target.value

                console.log("filter", Listes_TL_Cluster.filter(
                    (el, i) => {
                        return el.name.indexOf(text) >= 0
                    }
                )
                )
                setfilterTL_Liste_Cluster(Listes_TL_Cluster.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
            }

            if (inputCluster) {

                inputCluster.addEventListener("keyup", (e) => FilterTlClusterListe(e))
            }



        }
    }, [Listes_TL_Cluster, QueryApi_select])
    useEffect(() => {
        if (QueryApi_select != "iotinner" || QueryApi_select != "globales") {

            const inputIotinner = document.querySelector("#myInputTl_iotinner")
            if (filterTL_Liste_Iot.length == 0) {
                setfilterTL_Liste_Iot(Listes_TL_IOT)
            }

            const FilterTlIotListe = (e) => {

                const text = e.target.value

                console.log("filter", Listes_TL_IOT.filter(
                    (el, i) => {
                        return el.tl_name.indexOf(text) >= 0
                    }
                )
                )
                setfilterTL_Liste_Iot(Listes_TL_IOT.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
            }

            if (inputIotinner) {

                inputIotinner.addEventListener("keyup", (e) => FilterTlIotListe(e))
            }



        }
    }, [Listes_TL_IOT, QueryApi_select])
    useEffect(() => {

    }, [filterTL_Liste])
    useEffect(() => {
        if (!filterTL_Liste_Cluster) return

    }, [filterTL_Liste_Cluster])
    useEffect(() => {
        if (!filterTL_Liste_Iot) return

    }, [filterTL_Liste_Iot])

    function onChangeType(e) {
        setChcboxValue(!chcboxValue)
        if (chcboxValue == false) {
            settl_name_cluster("now")
            settl_id_cluster("now")
        }

    }
    const [tl_name_IOT, settl_name_IOT] = useState("")
    const [tl_id_IOT, settl_id_IOT] = useState("")
    const [tl_name_cluster, settl_name_cluster] = useState("")
    const [tl_id_cluster, settl_id_cluster] = useState("")
    function handleListeTLIOTClick(id, name, c) {
        settl_name_IOT(name)
        settl_id_IOT(id)

    }
    function handleListeTLClusterClick(id, name, c) {
        settl_name_cluster(name)
        settl_id_cluster(id)
    }

    useEffect(() => {
        var jsonClusterIot = null;
        if (QueryApi_select == "cluster") {
            jsonClusterIot = {
                "cluster": {
                    "name": tl_name_cluster,
                    "id": tl_id_cluster
                },
                "iotinner": {
                    "name": "",
                    "id": ""
                }
            }

        } else if (QueryApi_select == "iotinner") {
            jsonClusterIot = {
                "cluster": {
                    "name": "",
                    "id": "",
                },
                "iotinner": {
                    "name": tl_name_IOT,
                    "id": tl_id_IOT
                }
            }

        } else if (QueryApi_select == "globales") {
            jsonClusterIot = {
                "cluster": {
                    "name": tl_name_cluster,
                    "id": tl_id_cluster
                },
                "iotinner": {
                    "name": tl_name_IOT,
                    "id": tl_id_IOT
                }
            }

        } else {
            jsonClusterIot = {
                "cluster": {
                    "name": "",
                    "id": ""
                },
                "iotinner": {
                    "name": "",
                    "id": ""
                }
            }
        }
        handleListeTLClick(jsonClusterIot)
    }, [tl_name_IOT, tl_id_IOT, tl_name_cluster, tl_id_cluster, QueryApi_select])

    return (
        <>
            <MDBModalHeader toggle={toggle} >Sélectionnez Time Intelligence:</MDBModalHeader>
            <MDBModalBody>

                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text"  >
                            Actualisation
                        </label>
                        <select className="browser-default custom-select" name="QueryApi" value={QueryApi_select} onChange={(e) => setQueryApi_select(e.target.value)}>
                            <option value=""></option>
                            <option value="globales">Globales</option>
                            <option value="cluster">Valeur instantanée</option>
                            <option value="iotinner">Variations dans les temps</option>

                        </select>

                    </MDBCol>

                </MDBRow>
                {QueryApi_select == "cluster" || QueryApi_select == "globales" ? (
                    <MDBRow>
                        <MDBCol size="12" style={{ marginLeft: "25px" }}>

                            <div style={{ marginTop: "3%" }}>
                                <input style={{ marginLeft: "-10px" }} type="checkbox" name="now" value="now" onChange={onChangeType} checked={chcboxValue} />
                                <label htmlFor="defaultFormLoginEmailEx" style={{ fontSize: "17px", marginLeft: "10px" }}  >Derniéres lectures</label>
                            </div>
                        </MDBCol>
                        <MDBCol size="12">
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                List des valeur instantanée
                            </label>
                            <br />
                            <input type="text" id="myInputTl_Cluster" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

                            <select className="browser-default custom-select" name="CompteurListI_Name" size="6" disabled={chcboxValue} >
                                {filterTL_Liste_Cluster.map(liste => <option key={liste.code} id={liste.code} onClick={() => handleListeTLClusterClick(liste.code, liste.name)}>  {liste.name} </option>)}

                            </select>

                        </MDBCol>
                    </MDBRow>
                ) : null
                }

                {QueryApi_select == "iotinner" || QueryApi_select == "globales" ? (
                    <MDBRow>
                        <MDBCol size="12" style={{ marginTop: "3%" }}>

                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                List des variations dans les temps
                            </label>
                            <br />
                            <input type="text" id="myInputTl_iotinner" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

                            <select className="browser-default custom-select" name="CompteurListI_Name" size="6"  >
                                {filterTL_Liste_Iot.map(liste => <option key={liste.code} id={liste.code} onClick={() => handleListeTLIOTClick(liste.code, liste.name)}>  {liste.name} </option>)}

                            </select>

                        </MDBCol>
                    </MDBRow>
                ) : null
                }

            </MDBModalBody>
        </>
    )


}
export default Modal_TL_V2