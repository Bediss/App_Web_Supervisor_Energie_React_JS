import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"
import Swal from 'sweetalert2';
const ModalTL = ({ toggle5, Listes_TL, handleListeTLClick }) => {
    ////console.log("Listes_Ml", Listes_Ml)
  
    const [filterTL_Liste, setfilterTL_Liste] = useState([])
   
    useEffect(() => {
        //console.log("--------Listes_TL------->", Listes_TL)
    }, [Listes_TL])
  
    ////////////////////
    useEffect(() => {
  
        ////console.log("jjjj",Listes_Ml.length!=0)
        if (filterTL_Liste.length == 0) {
            setfilterTL_Liste(Listes_TL)
        }
        if (Listes_TL.length != 0) {
            const FilterTlListe = (e) => {
  
                ////console.log("Listes_Ml", Listes_Ml)
                const text = e.target.value
                ////console.log("text", text)
  
                console.log("filter", Listes_TL.filter(
                    (el, i) => {
                        // //console.log(i,el)
                        return el.tl_name.indexOf(text) >= 0
                    }
                )
                )
  
                setfilterTL_Liste(Listes_TL.filter((el) => el.tl_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
  
  
            }
  
            const input = document.querySelector("#myInputCl")
  
            ////console.log("input", input)
            if (input) {
  
                input.addEventListener("keyup", (e) => FilterTlListe(e))
            }
  
            return function cleanup() {
  
                input.removeEventListener("keyup", FilterTlListe)
            }
  
        }
  
    }, [Listes_TL])
    //////////////////////
    useEffect(() => {
        //if(!filterML_Liste)return
        //console.log('---filterTL_Liste--->', filterTL_Liste)
  
  
  
    }, [filterTL_Liste])
  
  
  
  
    return (
        <>
            <MDBModalHeader toggle={toggle5} >Sélectionnez Time Intelligence:</MDBModalHeader>
            <MDBModalBody>
  
                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des compteurs
                        </label>
                        <br />
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />
  
                        <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
                            {filterTL_Liste.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={() => handleListeTLClick(liste.tl_id, liste.tl_name, liste.tl_members)}>  {liste.tl_name} </option>)}
  
                        </select>
                    </MDBCol>
  
  
  
  
  
                </MDBRow>
            </MDBModalBody>
        </>
    )
  
  
  }
  export default ModalTL    