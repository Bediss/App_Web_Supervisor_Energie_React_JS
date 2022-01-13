import axios from '../../../axios';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"


const ModalTListeUser = ({ toggle4, listesCluster, listesIot,handleClick, handleChange, Nom }) => {
    //console.log("Listes_Ml", Listes_Ml)

    const [filterTL_ListeCluster, setfilterTL_ListeCluster] = useState([])
    const [filterTL_ListeIot, setfilterTL_ListeIot] = useState([])
    const [mDBListGroupItemSelectedCluster, setMDBListGroupItemSelectedCluster] = useState(null)
    const [mDBListGroupItemSelectedIOT, setMDBListGroupItemSelectedIOT] = useState(null)

    useEffect(() => {

        //console.log("--------listesCluster------->", listesCluster)
    }, [listesCluster])
    useEffect(() => {

        //console.log("--------listesIot------->", listesIot)
    }, [listesIot])
    ////////////////////
    useEffect(() => {

        //console.log("jjjj",listesCluster_Ml.length!=0)
        if (filterTL_ListeCluster.length == 0) {
            setfilterTL_ListeCluster(listesCluster)
        }
        if (listesCluster.length != 0) {
            const FilterTlListe = (e) => {

                //console.log("listesCluster_Ml", listesCluster_Ml)
                const text = e.target.value
                //console.log("text", text)

                console.log("filter", listesCluster.filter(
                    (el, i) => {
                        // console.log(i,el)
                        return el.name.indexOf(text) >= 0
                    }
                )
                )

                setfilterTL_ListeCluster(listesCluster.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


            }

            const input = document.querySelector("#myInputCl")

            //console.log("input", input)
            if (input) {

                input.addEventListener("keyup", (e) => FilterTlListe(e))
            }

            return function cleanup() {

                input.removeEventListener("keyup", FilterTlListe)
            }

        }

    }, [listesCluster])
    //////////////////////
    ////////////////////
    useEffect(() => {

        //console.log("jjjj",listesCluster_Ml.length!=0)
        if (filterTL_ListeIot.length == 0) {
            setfilterTL_ListeIot(listesIot)
        }
        if (listesIot.length != 0) {
            const FilterTlListe = (e) => {

                //console.log("listesCluster_Ml", listesCluster_Ml)
                const text = e.target.value
                //console.log("text", text)

                // console.log("filter", listesIot.filter(
                //     (el, i) => {
                //         // console.log(i,el)
                //         return el.name.indexOf(text) >= 0
                //     }
                // )
                //)

                setfilterTL_ListeIot(listesIot.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


            }

            const input = document.querySelector("#myInputIot")

            //console.log("input", input)
            if (input) {

                input.addEventListener("keyup", (e) => FilterTlListe(e))
            }

            return function cleanup() {

//                input.removeEventListener("keyup", FilterTlListe)
            }

        }

    }, [listesIot])
    //////////////////////
    useEffect(() => {
        //if(!filterML_Liste)return
       // console.log('---filterTL_ListeCluster--->', filterTL_ListeCluster)



    }, [filterTL_ListeCluster])
    useEffect(() => {
        //if(!filterML_Liste)return
       // console.log('---filterTL_ListeIot--->', filterTL_ListeIot)



    }, [filterTL_ListeIot])


    const scrollContainerStyle = {width: "100%", maxHeight: "300px" };
    

    function selectTLCluster(e,code,name,i){
        console.log("code",code,name)
        handleClick(code,name ,e)
        
        setMDBListGroupItemSelectedIOT(null)
        setMDBListGroupItemSelectedCluster(i)
    }
    function selectTLIot(e,code,name,i){
        console.log("code",code,name)
        handleClick(code,name ,e)
        setMDBListGroupItemSelectedIOT(i)
        setMDBListGroupItemSelectedCluster(null)
    }
    return (
        <>

            <MDBModalBody>

                <MDBRow>
  

                        <MDBCol size="6">
                      <p style={{marginLeft:"17px"}}>  List des valeur instantanée:</p>
                        



                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "90%",marginRight:"6%" }} />


{/* 
                        <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
                            <option></option>
                            {filterTL_ListeCluster.map(liste => <option key={liste.code} id={liste.code} onClick={(e) => handleClick(liste.code, e)}>  {liste.name} </option>)}

                        </select> */}
                           
                        <MDBContainer style={{marginTop:"60px"}}>
                          <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                            {filterTL_ListeCluster.map((liste, i) =>
                              <div className="d-flex d-flex bd-highlight example-parent" style={{
                                borderLeft: '0.5px solid #d6d4d4',
                                borderBottom: 'none'
                              }} >
                                <MDBListGroupItem hover key={i} 
                                //value={liste.name}
                                  style={{ padding: 0.5 + 'em' }} hover
                                  active={mDBListGroupItemSelectedCluster == i ? true : false}
                               //   onClick={(e) => handleClick(liste.code, e)}
                                  onClick={(e)=>selectTLCluster(e,liste.code,liste.name,i)}
                                  value={Nom}
                                  onChange={handleChange}
                                >
                                  {liste.name}</MDBListGroupItem>
                              </div>
                            )}
                     
                          </MDBListGroup>
                        </MDBContainer>
</MDBCol>
<MDBCol size="6">
<p style={{marginLeft:"17px"}}>List des variations dans les temps</p>
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "90%",marginRight:"6%"  }} />

                        <MDBContainer style={{marginTop:"60px"}}>
                          <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle} >
                            {filterTL_ListeIot.map((liste, i) =>
                              <div className="d-flex d-flex bd-highlight example-parent" style={{
                                borderLeft: '0.5px solid #d6d4d4',
                                borderBottom: 'none'
                              }} >
                                <MDBListGroupItem hover key={i} 
                                //value={liste.name}
                                  style={{ padding: 0.5 + 'em' }} hover
                                 active={mDBListGroupItemSelectedIOT == i ? true : false}
                              //    onClick={(e) => handleClick(liste.code, e)}
                                onClick={(e)=>selectTLIot(e,liste.code,liste.name,i)}
                                 // value={Nom}
                                  onChange={handleChange}
                                >
                                  {liste.name}</MDBListGroupItem>
                              </div>
                            )}
                     
                          </MDBListGroup>
                        </MDBContainer>
                   

</MDBCol>



                </MDBRow>
            </MDBModalBody>
        </>
    )


}

export default ModalTListeUser