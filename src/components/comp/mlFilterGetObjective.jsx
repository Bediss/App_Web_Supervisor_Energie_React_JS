

import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import axios from "axios"
import FilterV1 from './filterV1';


const MLFilterGetObjective = ({ energy = "", toggle = () => { }, getMindex = () => { }, compteur = "", isOpen = false, mChange = () => { }, cancel = () => { } }) => {

    // const [mList, setMList] = useState(null)
    const [testData, setTestData] = useState(null)
    useEffect(() => {

        // axios.get(`${window.apiUrl}getMLByEnergy/?energies=${energy}`,{headers:{token:"superToken"}})
        // .then(({data})=>{
        //     setMList(data[energy])        
        // })
        axios.get(`${window.apiUrl}getReports/?b&n`,{headers:{token:"superToken"}})
        .then(({data})=>{
            setTestData(data.reports)        
        })

    }, [])

    // mList
    return testData ? <MDBModal isOpen={isOpen} toggle={toggle} size="xl">
        <MDBRow>
            <MDBCol lg={10} >
                <FilterV1 
                      filterName={"Rapport"}
                    //   outSelected={outSelected}
                    //   outAllFiltred={outAllFiltred}
                      filter={[{ Report_TableauName: "Tableaux" }, { TAGS: "Mot Clé" }, { Report_Master: "Master" }]}
                      display={{ separator: "", elems: ["Report_Name"] }}
                      data={testData}
                      styleScroll={{ width: "450px", maxHeight: "510px" }}
                      btnEdit={true} 
                // filter={[{ measure_View: "Périodicité" },{"Measure-Stats":"Catégorie"} ,{ "Measure-level": "Niveau" }, { "Measure-Stats": "Statistiques" }, { "measure_name": "Nom Mesure" }]}
                // style={{ margin: "30px", width: "80%" }} 
                // display={{ separator: "", elems: ["measure_Label"] }}
                // data={mList} 
                />
            </MDBCol>
            <MDBCol lg={2}>
                ddd
            </MDBCol>
        </MDBRow>
    </MDBModal>

        : <></>
}
// const MLFilterGetObjective = ({ isOpen = false, cancel = () => { }, toggle = () => { }, energy = "", compteur = "", mlist = [], getMindex = () => { }, mChange = () => { } }) => {
//     return (<>
//         <MDBModal isOpen={isOpen} toggle={toggle} size="sm">
//             <MDBModalHeader toggle={toggle}>Get Objective</MDBModalHeader>

//             <MDBModalBody>
//                 <div><b>Energy :</b> {energy}</div>
//                 <div><b>Compteur :</b> {compteur}</div>
//                 <div><b>Sélectionner votre mesure :</b></div>

//                 <MDBContainer style={{ padding: 0 + 'em' }}>
//                     {/* <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}> */}
//                     <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary mx-auto">
//                         {mlist.map((mesureitem, i) =>
//                             <div className="d-flex d-flex bd-highlight example-parent" style={{
//                                 borderLeft: '0.5px solid #d6d4d4',
//                                 borderRight: '0.5px solid #d6d4d4',
//                                 borderTop: '0.5px solid #d6d4d4',
//                                 borderBottom: 'none'
//                             }} >
//                                 <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
//                                     className=" w-100 bd-highlight col-example"
//                                     hover flush
//                                     onClick={() => mChange(mesureitem.measure_Label, mesureitem.measure_ID)}  >
//                                     {mesureitem.measure_Label}

//                                 </MDBListGroupItem>
//                                 <MDBBtn size="sm" color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"
//                                     onClick={() => getMindex(i, mesureitem.measure_ID)}
//                                 >
//                                     <MDBIcon icon="pencil-alt" />

//                                 </MDBBtn>
//                             </div>

//                         )}
//                     </MDBListGroup>
//                 </MDBContainer>


//             </MDBModalBody>

//             <MDBModalFooter>
//                 <MDBBtn color="primary" size="sm" onClick={cancel}>Annuler</MDBBtn>
//             </MDBModalFooter>
//         </MDBModal>
//     </>);
// }



export default MLFilterGetObjective;