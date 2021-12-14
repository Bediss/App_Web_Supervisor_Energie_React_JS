import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"
import Swal from 'sweetalert2';
const ModalCL = ({ toggle4, modelCl, CL_Tags_Function, Listes_Cl, handleListeCompteurClick, CL_Membre }) => {
    ////console.log("Listes_Cl", Listes_Cl)
  
    const [filterCL_Liste, setfilterCL_Liste] = useState([])
    const [filterCL_Membre, setfilterCL_Membre] = useState([])
    const [CL_Membre_Select, setCL_Membre_Select] = useState([])
    const [Member_select, setMember_select] = useState({})
    const [btnDelete, setBtnDelete] = useState(true)
    const [Le_Compteur, setLe_Compteur] = useState("")
    const [Code_Compteur, setCode_Compteur] = useState("")
    const [showTAGS_CL, setShowTAGS_CL] = useState(false)
    const [CL_Tags_var, setCL_Tags_var] = useState("")
    const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
    const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
    const [errors, setErrors] = useState({ CL_Tags_var: '' })

    useEffect(() => {
    }, [Listes_Cl])
  
    //////////////////
    useEffect(() => {
        if (filterCL_Membre != CL_Membre) {
            setfilterCL_Membre(CL_Membre)
        }
    }, [CL_Membre])
    ////////////
    useEffect(() => {
        if (filterCL_Membre.length == 0) {
            setfilterCL_Membre(CL_Membre)
        }
        if (CL_Membre.length != 0) {
  
            const filterCLMembre = (e) => {
                const text = e.target.value
                console.log("filter", CL_Membre.filter(
                    (el, i) => {
                        // //console.log(i,el)
                        return el.Le_Compteur.indexOf(text) >= 0
                    }
                )
                )
  
                setfilterCL_Membre(CL_Membre.filter((el) => el.Le_Compteur.toLowerCase().indexOf(text.toLowerCase()) >= 0))
  
  
            }
  
            const input = document.querySelector("#myInputCl_Membre")
  
            ////console.log("input", input)
            if (input) {
  
                input.addEventListener("keyup", (e) => filterCLMembre(e))
            }
  
            return function cleanup() {
  
                input.removeEventListener("keyup", filterCLMembre)
            }
  
        }
  
    }, [CL_Membre])
    ////////////////////
    useEffect(() => {
  
        //console.log("jjjj",Listes_Cl)
        if (filterCL_Liste.length == 0) {
            setfilterCL_Liste(Listes_Cl)
        }
        if (Listes_Cl.length != 0) {
            const FilterClListe = (e) => {
  
                ////console.log("Listes_Cl", Listes_Cl)
                const text = e.target.value
                ////console.log("text", text)
  
                console.log("filter", Listes_Cl.filter(
                    (el, i) => {
                        // //console.log(i,el)
                        return el.CompteurListI_Name.indexOf(text) >= 0
                    }
                )
                )
  
                setfilterCL_Liste(Listes_Cl.filter((el) => el.CompteurListI_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
  
  
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
  
    }, [Listes_Cl])
    //////////////////////
    useEffect(() => {
        //if(!filterCL_Liste)return
        //console.log('---filterCL_Liste--->', filterCL_Liste)
  
  
  
    }, [filterCL_Liste])
  
    useEffect(() => {
        //if(!filterCL_Liste)return
        //console.log('---filterCL_Liste--->', filterCL_Membre)
  
  
  
    }, [filterCL_Membre])
    useEffect(() => {
        //if(!filterCL_Liste)return
        //console.log('---CL_Membre_Select--->', CL_Membre_Select)
        modelCl(CL_Membre_Select)
        if (CL_Membre_Select.length == 0) {
            setBtnDelete(true)
        }
  
    }, [CL_Membre_Select])
    function Ajouter_All() {
        setCL_Membre_Select(CL_Membre)
        setBtnDelete(false)
        setShowTAGS_CL(false)
        setShowBtnAjouterParMembre(true)
        setCL_Tags_var("")
    }
    function Ajouter_Par_Member() {
        const elem = document.querySelector(`#selectWestania`)
        if (elem) {
            ////console.log("/////////////////////////",elem.value)
            elem.selectedIndex = -1
        }
        ////console.log("ajouter y2")
        const array = []
        ////console.log("CL_Membre_Select",CL_Membre_Select)
        ////console.log("Member_select",Member_select)
  
        if (!Object.keys(Member_select).length) return
        ////console.log("CL_Membre_Select.length",CL_Membre_Select.length)
        if (CL_Membre_Select.length == 0) {
            array.push(Member_select)
            setCL_Membre_Select(array)
            setBtnDelete(false)
            setShowTAGS_CL(true)
            setShowBtnAjouterAll(true)
            ////console.log("arrayarrayarrayarrayarrayarray",array)
  
        }
        else {
            if (!CL_Membre_Select) return
            if (!CL_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
                array.push(Member_select)
                setCL_Membre_Select(array.concat(CL_Membre_Select))
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
  
  
        //   for (var i = 0; i < filterCL_Membre.length; i++) {
  
        //     if (filterCL_Membre[i].Le_Compteur === array[0].Le_Compteur) {
  
        //         filterCL_Membre.splice(i, 1);
        //     }
  
        //   }
        //console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterCL_Membre)
        //console.log('KKKKK', CL_Membre)
        setMember_select({})
    }
    function Delete_Member() {
        setCL_Membre_Select([])
        setMember_select({})
        setShowTAGS_CL(false)
        setShowBtnAjouterAll(false)
        setShowBtnAjouterParMembre(false)
        setCL_Tags_var("")
    }
  
    useEffect(() => {
        //console.log("------Member_select---->", Member_select)
    }, [Member_select])
  
  
    function handleClClick(id, name, e) {
        setCode_Compteur(id);
        setLe_Compteur(name);
    }
    useEffect(() => {
        if (Le_Compteur != "" && Code_Compteur != "") {
            setMember_select({ "Le_Compteur": Le_Compteur, "Code_Compteur": Code_Compteur })
        }
    }, [Le_Compteur, Code_Compteur])
  
    useEffect(() => {
        // if (!CL_Tags_var)return
        CL_Tags_Function(CL_Tags_var)
        //console.log("CL_Tags_var", CL_Tags_var)
  
    }, [CL_Tags_var])
  
  
  
    const onChange = (e) => {
        console.log("mmmmm",e.currentTarget.value)
        setCL_Tags_var(e.currentTarget.value);

        switch ("CL_Tags_var") {
            case 'CL_Tags_var':
              errors.CL_Tags_var =
                (CL_Tags_var.length < 5
                  ? 'Nom doit comporter au moins 5 caractères!'
                  : ' ');
              break;
            default:
              break;
                }
    }
    return (
        <>
            <MDBModalHeader toggle={toggle4} >Sélectionnez Compteurs Listes:</MDBModalHeader>
            <MDBModalBody>
  
                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des compteurs
                        </label>
                        <br />
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />
  
                        <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
                            {filterCL_Liste.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={() => handleListeCompteurClick(liste.CompteurList_Code, liste.CompteurListI_Name, liste.CL_Membre)}>  {liste.CompteurListI_Name} </option>)}
  
                        </select>
                    </MDBCol>
                    {CL_Membre.length ? (<MDBCol size="5">
                        <br />
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des membres
                        </label>
                        <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
                        <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
                            <option style={{ display: "none" }} selected value> -- select an option -- </option>
                            {filterCL_Membre.map(liste => <option onClick={(e) => handleClClick(liste.Code_Compteur, liste.Le_Compteur, e)} >  {liste.Le_Compteur} </option>)}
  
                        </select>
                    </MDBCol>) : null}
  
                    {CL_Membre.length ? (<MDBCol size="2" >
  
                        <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
                        <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
                        <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>
  
                    </MDBCol>) : null}
  
  
                    {CL_Membre.length ? (
  
                        <MDBCol size="5">
                            <br />
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Liste des membres sélectionnez
                            </label>
  
                            <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                                {CL_Membre_Select.map(liste => <option >  {liste.Le_Compteur} </option>)}
  
                            </select>
                        </MDBCol>) : null}
                    {showTAGS_CL == true ? (<MDBCol size="12">
  
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Mot clé d'une nouvelle liste compteur
                        </label>
                        <input type="text" id="1" id="defaultFormLoginEmailEx" name="CL_Tags_var" value={CL_Tags_var} onChange={onChange} className="form-control" required />
                        {errors.CL_Tags_var.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.CL_Tags_var}</span>}
  
  
                    </MDBCol>) : null}
                </MDBRow>
            </MDBModalBody>
        </>
    )
  
  
  }
  export default ModalCL  