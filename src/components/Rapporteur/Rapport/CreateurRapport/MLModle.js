

import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"
import Swal from 'sweetalert2';
const ModalML = ({ toggle2, ML_Tags_Function,  modelMl, Listes_Ml, handleListeMLClick, ML_Membre }) => {
    ////console.log("Listes_Ml", Listes_Ml)
  
    const [filterML_Liste, setfilterML_Liste] = useState([])
    const [filterML_Membre, setfilterML_Membre] = useState([])
    const [ML_Membre_Select, setML_Membre_Select] = useState([])
    const [Member_select, setMember_select] = useState({})
    const [btnDelete, setBtnDelete] = useState(true)
    const [m_name, setM_name] = useState("")
    const [m_code, setM_code] = useState("")
    const [ML_Tags_var, setML_Tags_var] = useState("")
    const [showTAGS_ML, setShowTAGS_ML] = useState(false)
    const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
    const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
    useEffect(() => {
  
        //console.log("--------Listes_Ml------->", Listes_Ml)
    }, [Listes_Ml])
  
    //////////////////
    useEffect(() => {
  
        //console.log("---------ML_Membre------>", ML_Membre)
  
        if (filterML_Membre != ML_Membre) {
            setfilterML_Membre(ML_Membre)
        }
    }, [ML_Membre])
    ////////////
    useEffect(() => {
  
        ////console.log("jjjj",ML_Membre.length!=0)
        if (filterML_Membre.length == 0) {
            setfilterML_Membre(ML_Membre)
        }
        if (ML_Membre.length != 0) {
  
            const filterMLMembre = (e) => {
  
                ////console.log("ML_Membre", ML_Membre)
                const text = e.target.value
                ////console.log("text", text)
  
                console.log("filter", ML_Membre.filter(
                    (el, i) => {
                        // //console.log(i,el)
                        return el.m_name.indexOf(text) >= 0
                    }
                )
                )
  
                setfilterML_Membre(ML_Membre.filter((el) => el.m_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
  
  
            }
  
            const input = document.querySelector("#myInputCl_Membre")
  
            ////console.log("input", input)
            if (input) {
  
                input.addEventListener("keyup", (e) => filterMLMembre(e))
            }
  
            return function cleanup() {
  
                input.removeEventListener("keyup", filterMLMembre)
            }
  
        }
  
    }, [ML_Membre])
    ////////////////////
    useEffect(() => {
  
        ////console.log("jjjj",Listes_Ml.length!=0)
        if (filterML_Liste.length == 0) {
            setfilterML_Liste(Listes_Ml)
        }
        if (Listes_Ml.length != 0) {
            const FilterClListe = (e) => {
  
                ////console.log("Listes_Ml", Listes_Ml)
                const text = e.target.value
                ////console.log("text", text)
  
                console.log("filter", Listes_Ml.filter(
                    (el, i) => {
                        // //console.log(i,el)
                        return el.ML_Name.indexOf(text) >= 0
                    }
                )
                )
  
                setfilterML_Liste(Listes_Ml.filter((el) => el.ML_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
  
  
            }
  
            const input = document.querySelector("#myInputCl")
  
            ////console.log("input", input)
            if (input) {
  
                input.addEventListener("keyup", (e) => FilterClListe(e))
            }
  
            return function cleanup() {
  
                input.removeEventListener("keyup", FilterClListe)
            }
  
        }
  
    }, [Listes_Ml])
    //////////////////////
    useEffect(() => {
        //if(!filterML_Liste)return
        //console.log('---filterML_Liste--->', filterML_Liste)
  
  
  
    }, [filterML_Liste])
  
    useEffect(() => {
        //if(!filterML_Liste)return
        //console.log('---filterML_Liste--->', filterML_Membre)
  
  
  
    }, [filterML_Membre])
    useEffect(() => {
        //if(!filterML_Liste)return
        //console.log('---ML_Membre_Select--->', ML_Membre_Select)
        modelMl(ML_Membre_Select)
        if (ML_Membre_Select.length == 0) {
            setBtnDelete(true)
        }
  
    }, [ML_Membre_Select])
    function Ajouter_All() {
        setML_Membre_Select(ML_Membre)
        setBtnDelete(false)
        setShowTAGS_ML(false)
        setShowBtnAjouterParMembre(true)
        setML_Tags_var("")
    }
    function Ajouter_Par_Member() {
        const elem = document.querySelector(`#selectWestania`)
        if (elem) {
            ////console.log("/////////////////////////",elem.value)
            elem.selectedIndex = -1
        }
        ////console.log("ajouter y2")
        const array = []
        ////console.log("ML_Membre_Select",ML_Membre_Select)
        ////console.log("Member_select",Member_select)
  
        if (!Object.keys(Member_select).length) return
        ////console.log("ML_Membre_Select.length",ML_Membre_Select.length)
        if (ML_Membre_Select.length == 0) {
            array.push(Member_select)
            setML_Membre_Select(array)
            setBtnDelete(false)
            setShowTAGS_ML(true)
            setShowBtnAjouterAll(true)
            ////console.log("arrayarrayarrayarrayarrayarray",array)
  
        }
        else {
            if (!ML_Membre_Select) return
            if (!ML_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
                array.push(Member_select)
                setML_Membre_Select(array.concat(ML_Membre_Select))
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top',
  
                    showConfirmButton: false,
                    timer: 4000,
                    icon: 'warning',
                    width: 400,
                    title: 'Déja Ajouter dans la liste'
                })
            }
  
        }
  
  
        //   for (var i = 0; i < filterML_Membre.length; i++) {
  
        //     if (filterML_Membre[i].Le_Compteur === array[0].Le_Compteur) {
  
        //         filterML_Membre.splice(i, 1);
        //     }
  
        //   }
        //console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterML_Membre)
        //console.log('KKKKK', ML_Membre)
        setMember_select({})
    }
    function Delete_Member() {
        setML_Membre_Select([])
        setMember_select({})
        setShowTAGS_ML(false)
        setShowBtnAjouterAll(false)
        setShowBtnAjouterParMembre(false)
        setML_Tags_var("")
  
    }
  
    useEffect(() => {
        //console.log("------Member_select---->", Member_select)
    }, [Member_select])
  
  
    function handleMlClick(id, name, e) {
        setM_code(id);
        setM_name(name);
    }
    useEffect(() => {
        if (m_name != "" && m_code != "") {
            setMember_select({ "m_name": m_name, "m_code": m_code })
        }
    }, [m_name, m_code])
  
    useEffect(() => {
        // if (!CL_Tags_var)return
        ML_Tags_Function(ML_Tags_var)
        //console.log("ML_Tags_var", ML_Tags_var)
  
    }, [ML_Tags_var])
  
  
  
    const onChange = (e) => {
        setML_Tags_var(e.currentTarget.value);
  
    }
    return (
        <>
            <MDBModalHeader toggle={toggle2} >Sélectionnez measure Listes:</MDBModalHeader>
            <MDBModalBody>
  
                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des compteurs
                        </label>
                        <br />
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />
  
                        <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
                            {filterML_Liste.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={() => handleListeMLClick(liste.ML_Code, liste.ML_Name, liste.ML_Membre)}>  {liste.ML_Name} </option>)}
  
                        </select>
                    </MDBCol>
                    {ML_Membre.length ? (<MDBCol size="5">
                        <br />
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des membres
                        </label>
                        <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
                        <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
                            <option style={{ display: "none" }} selected value> -- select an option -- </option>
                            {filterML_Membre.map(liste => <option onClick={(e) => handleMlClick(liste.m_code, liste.m_name, e)} >  {liste.m_name} </option>)}
  
                        </select>
                    </MDBCol>) : null}
  
                    {ML_Membre.length ? (<MDBCol size="2" >
  
                        <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
                        <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
                        <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>
  
                    </MDBCol>) : null}
  
  
                    {ML_Membre.length ? (
  
                        <MDBCol size="5">
                            <br />
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Liste des membres sélectionnez
                            </label>
  
                            <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                                {ML_Membre_Select.map(liste => <option >  {liste.m_name} </option>)}
  
                            </select>
                        </MDBCol>) : null}
                    {showTAGS_ML == true ? (<MDBCol size="12">
  
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Mot clé d'une nouvelle liste compteur
                        </label>
                        <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Tags_var" value={ML_Tags_var} onChange={onChange} className="form-control" required />
  
  
  
                    </MDBCol>) : null}
                </MDBRow>
            </MDBModalBody>
        </>
    )
  
  
  }
  export default ModalML