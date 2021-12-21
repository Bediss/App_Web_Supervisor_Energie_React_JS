import React, { useEffect, useState } from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
    MDBBreadcrumb, MDBBreadcrumbItem, MDBInput, MDBIcon, MDBRow, MDBCol,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
    MDBListGroupItem, MDBListGroup
  } from 'mdbreact';
import "./casincidents.css";
import Swal from 'sweetalert2';
import ModifyObjectiveAdvanced from "./ModifyObjectiveAdvancedV2"
import ModifierEmploi_Temps from "../ModifierEmploi_TempsV2"
import { PropTypes } from 'react'
import Fetching from "../../../Fetching"
import Dropdown from 'react-bootstrap/Dropdown'
import Calculatrice from "../CasIncidents/calculatrice/calculatriceV2";
import FilterV1 from '../../../filterV1';
import { number } from 'prop-types';
const ModiifierCasIncidentsModale = ({ 
    toggleModifier ,
    toggleObjective,
    modalObjective,
    toggleValue,
    modalValue,
    U_Alarme_Name ,
    handleChange,
    componentcalculator,
    U_Compteur,
    displaycalculator,
    callbackValueIncident,
    callbackmodel,
    Compteur_Incident,
    FormulewithTildee,
    Sys_equationwithTilde,
    TAG_Formule,
    U_Formule,
    valuedropdown,
    operator,
    onClickHandler,
    showgetobjective,
    displaycalculatriceobjective,
    U_inputobjective,
    energycompteurselected,
    incidentselectedwithoutlive,
    Listmesureenergy,
    handlemesureselectedchange,
    getindexmesue,
    addvaluetomesue,
    valuetomesure,
    Annulersendsetobjective,
    callbackAdvancedObjective,
    MesureList,
    CodecompteurObjective,
    Next_Check,
    periode,
    TempsUnite,
    num,
    modifier,
   // deleteequation,
    clearequation,
    ModifierDataEmploi,
    dataEnergyMeasure, 
    selectMeasureGetObject,
    modalFilterMesure,
    toggleFilterMesure,
    showmodifyadvanced,
    displaymodifyadvanced,
    Sys_inputobjective,
    addUinputobjective,
    OperateurValueModifier,
    Formule,
    funObjectifValeurInputModifier,
    sendtoModifyObjectiveAdvanced,
    datamodifier,
    modalFilterMesure3,
    toggleFilterMesure3,
    modalFilterMesure5,
    toggleFilterMesure5,
    modalFilterMesure7,
    toggleFilterMesure7,
    funModaleObjective,

}) => {
        const scrollContainerStyle = { maxHeight: "300px" };
        const [inputValueType,setinputValueType]=useState("number")
        const [inputValueDisabled,setinputValueDisabled]=useState(false)
        const [U_inputobjective_string,setU_inputobjective_string]=useState(false)
        const [objectifValeurInput,setObjectifValeurInput]=useState("")
        const [typeValidation,settypeValidation]=useState(false)
        const [contentValeur,setContentValeur]=useState("")

         useEffect(() => {
          var contentVariable=""
          if(Sys_inputobjective.length!=0){
  
            var valeur = Sys_inputobjective[0].valeur
            var content=""
            for (var i=0;i<valeur.length;i++){
           if(valeur[i].type=="r"){
            settypeValidation(true)
          content=valeur[0].content
              // setContentValeur(content)
               U_inputobjective=[content]
               setContentValeur(content)
               contentVariable=[content]
          }
           }  }

 
         }, [Sys_inputobjective])

          function  ModifierTab(dataEmploi){
            ModifierDataEmploi(dataEmploi)
            }
        
            useEffect(() => {
            }, [Listmesureenergy])
            useEffect(() => {
            }, [dataEnergyMeasure])
        
            useEffect(() => {

       




    
        
              if(U_inputobjective.length!=0&& (U_inputobjective.slice(0,9) =="Objective") ){
              setinputValueType("text")
              setinputValueDisabled(true)
              setObjectifValeurInput(U_inputobjective)
              }else {
                setinputValueType("number")
                setinputValueDisabled(false)

                setObjectifValeurInput(U_inputobjective)
                
               Sys_inputobjective=contentValeur
             }
            }, [U_inputobjective])
        
           function outSelectedMesure(json){
            selectMeasureGetObject({"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
           }

  

           useEffect(() => {
            console.log("------energycompteurselected---->>>>>>>>>>>>>>",energycompteurselected)
          }, [energycompteurselected])
           useEffect(() => {
             if(objectifValeurInput!=""&& inputValueType=="number" && inputValueDisabled==false && typeValidation==true){
           
              addUinputobjective(objectifValeurInput)
      
             }
          }, [objectifValeurInput,inputValueType,inputValueDisabled,typeValidation])
          function funModale(modalObject,nb){
            funModaleObjective(modalObject,nb)
            
          }

return(

    <>
         <MDBModalHeader toggle={toggleModifier} >Modifier Cas Incident</MDBModalHeader>
                  <MDBModalBody>
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="form-group">
                          <label className="grey-text" >
                            Nom de Cas Incident <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                          <input type="text" name="U_Alarme_Name" className="form-control"
                            value={U_Alarme_Name}
                            onChange={handleChange} required />
                        </div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="form-group">
                          <label className="grey-text" >
                            Compteur <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                          <input type="text"
                            onClick={componentcalculator}
                            name="U_Compteur" className="form-control"
                            value={U_Compteur}
                            onChange={handleChange} required />
                          <div>
                            {displaycalculator && <Calculatrice 
                                componentcalculator={componentcalculator} 
                            valueincidentcallback={callbackValueIncident} 
                            closemodel={callbackmodel}
                            datamodifier={datamodifier}
                            energycompteurselected={energycompteurselected}
                              datafromcasincidenttocalculatrice={[
                                U_Compteur,
                                Compteur_Incident,
                                U_Formule.substring(U_Formule.indexOf("=") + 1).replace(/#/g, '').split('~').filter(e=>e),
                                Formule.substring(Formule.indexOf("=") + 1).replace(/#/g, '').split('~').filter(e=>e),
                                TAG_Formule
                              ]}
                                ></Calculatrice>}
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol size="12">
                        <div className="form-group">

                          <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                            <legend style={{ width: "173px", color: "#51545791",fontSize: "21px" }} >Formule de cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
                            <div className='pb-2' style={{marginTop: "-23px"}}>
                            {TAG_Formule!=""&&     `TAG:${TAG_Formule}`}
                            </div>
                            <textarea type="text" className="form-control"
                              name="U_Formule"
                              value={U_Formule.replace(/~/g, ' ').replace(/#/g, '')} onChange={handleChange} required disabled />
                          </fieldset>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-group">
                          <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>

                            <legend style={{width: "124px", color: "#51545791",fontSize: "21px" }}>Operateur <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
                            <Dropdown className='' >
                              <Dropdown.Toggle className='m-0' id="dropdown-basic"
                                variant='#2BBBAD' style={{ width: '100%' }}>
                                {valuedropdown}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {operator.map((operatoritem, i) => <Dropdown.Item key={i} onClick={onClickHandler} >{operatoritem}</Dropdown.Item>)}
                                {/*  </div>} */}
                                <Dropdown.Divider />
                                <Dropdown.Item /*  onClick={() => showadvanced()} */ /* onSelect={handleSelect} */ onClick={onClickHandler}>AVANCÉE
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </fieldset>
                        </div>

                      </MDBCol>
                      <MDBCol size="9">
                        <div className="form-group">
                          <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                            <legend style={{ width: "118px", color: "#51545791",fontSize: "21px"}} >Objective<span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
                            <ul onClick={showgetobjective} className={displaycalculatriceobjective ? "displaycalculatrice pl-2" : "pl-2"}>Valeur</ul>
                            {displaycalculatriceobjective &&
                              <div style={{ marginBottom: 8 + 'px' }}>
                                {/* <input type="text" className="form-control form-control-sm" value={U_inputobjective.join('')} /> */}

                                <input type={inputValueType} disabled={inputValueDisabled} autoComplete="off" className="form-control form-control-sm" name="objectifValeurInput" value={objectifValeurInput}  onChange={(e) => setObjectifValeurInput(e.target.value)}/>

                                <div className="d-flex bd-highlight example-parent">

                                  <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

                                    onClick={toggleFilterMesure}
                                  >Get Objective</MDBBtn>


                                  {/* <MDBBtn className='  px-2 btn-floating bd-highlight col-example ml-0' style={{ backgroundColor: '#7dd2d9' }} onClick={() => deleteequation()}>
                                    <MDBIcon size='lg' fas icon='times-circle'></MDBIcon>
                                  </MDBBtn> */}

                                  <MDBBtn className=' btn-floating px-2 bd-highlight col-example mx-0' style={{ backgroundColor: '#7dd2d9' }} onClick={() => clearequation()}>
                                    <MDBIcon size='lg' fas icon='trash-alt' ></MDBIcon>
                                  </MDBBtn>
                                </div>
                                <MDBModal isOpen={modalFilterMesure} toggle={toggleFilterMesure} size="lg">
                                  <MDBModalHeader toggle={toggleFilterMesure}>Get Objective</MDBModalHeader>
                                  <MDBModalBody>
                                  <div style={{width:'99%'}}>
         {dataEnergyMeasure.length != 0 ? (   <FilterV1 filterName={"Mesure"}

outSelected={ outSelectedMesure}


filter={[
  { measure_View: "Périodicité" },
  { "Measure-Category": "Catégorie" },
  { "Measure-Stats": "Statistiques" },
  { measure_name: "Nom Mesure" },
]}
display={{ separator: "", elems: ["measure_Label"] }}
data={ dataEnergyMeasure}
styleScroll={{ width: "100%", maxHeight: "295px" }}
btnEdit={true} />):null}               </div>
                                  </MDBModalBody>
                                  <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={toggleFilterMesure}>Annuler</MDBBtn>
                                    <MDBBtn color="primary" size="sm" onClick={toggleObjective}>Get Objective</MDBBtn>
                                  </MDBModalFooter>
                                </MDBModal>
                                <MDBModal isOpen={modalObjective} toggle={toggleObjective} size="md">
                                  <MDBModalHeader toggle={toggleObjective}>Get Objective</MDBModalHeader>
                                  <MDBModalBody>
                                    <div><b>Capteur :</b> {energycompteurselected}</div>
                                    <div><b>Compteur :</b> {incidentselectedwithoutlive}</div>
                                    <div><b>Sélectionner votre mesure :</b></div>

                                    <MDBContainer style={{ padding: 0 + 'em' }}>
                                      <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                        {Listmesureenergy.map((mesureitem, i) =>
                                          <div className="d-flex d-flex bd-highlight example-parent" style={{
                                            borderLeft: '0.5px solid #d6d4d4',
                                            borderRight: '0.5px solid #d6d4d4',
                                            borderTop: '0.5px solid #d6d4d4',
                                            borderBottom: 'none'
                                          }} >
                                            <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                              className=" w-100 bd-highlight col-example"
                                              hover flush
                                              onClick={() => handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID)}  >
                                              {mesureitem.measure_Label}

                                            </MDBListGroupItem>
                                            <MDBBtn size="sm" color="default" className="float-right" style={{height:"31px"}} className="flex-shrink-1 bd-highlight col-example"

                                              onClick={() => getindexmesue(i, mesureitem.measure_ID)}
                                            >
                                              <MDBIcon icon="pencil-alt" />

                                            </MDBBtn>
                                          </div>

                                        )}
                                        <MDBModal isOpen={modalValue} toggle={toggleValue} size="sm">
                                          {/* <MDBModalHeader toggle={toggle(4)}>MDBModal title</MDBModalHeader> */}
                                          <MDBModalBody>
                                            <label>Value</label>

                                            <input
                                              className="form-control form-control-sm"
                                              name="valuetomesure" value={valuetomesure}
                                              onChange={handleChange} />
                                          </MDBModalBody>
                                          <MDBModalFooter>
                                            <MDBBtn color="default" size="sm" onClick={() => addvaluetomesue()}>Ajouter</MDBBtn>

                                            <MDBBtn color="primary" size="sm" onClick={toggleValue}>Annuler</MDBBtn>
                                          </MDBModalFooter>
                                        </MDBModal>

                                      </MDBListGroup>
                                    </MDBContainer>


                                  </MDBModalBody>
                                  <MDBModalFooter>
                                  {/*   <MDBBtn color="default" size="sm" onClick={() => sendsetobjective()}>Enregistrer</MDBBtn>
 */}
                                    <MDBBtn color="primary" size="sm" onClick={() => Annulersendsetobjective()}>Annuler</MDBBtn>
                                  </MDBModalFooter>
                                </MDBModal>

                              </div>}
                            <ul onClick={showmodifyadvanced} className={displaymodifyadvanced ? "displayadvanced pl-2" : "pl-2"}>Avancée</ul>
                            {displaymodifyadvanced &&
                              <div style={{ marginTop: 10 + 'px' }}>
                                <ModifyObjectiveAdvanced 
                                  valueajoutertabcallback={callbackAdvancedObjective}
                                  toggleFilterMesure3={toggleFilterMesure3}
                                  modalFilterMesure3={modalFilterMesure3}
                                  funModale={funModale}
                                  toggleFilterMesure5={toggleFilterMesure5}
                                  modalFilterMesure7={modalFilterMesure7}
                                  toggleFilterMesure7={toggleFilterMesure7}
                                  modalFilterMesure5={modalFilterMesure5}
                                  dataEnergyMeasure={dataEnergyMeasure}
                                  datafromcasincidents={[
                                  MesureList,//0
                                  CodecompteurObjective,//1
                                  incidentselectedwithoutlive,//2
                                  Listmesureenergy,//3
                                  energycompteurselected,//4
                                 sendtoModifyObjectiveAdvanced//5
                                  ]}/>
                              </div>}


                          </fieldset>

                        </div>


                      </MDBCol>
                      <MDBCol size="12">
                        <div className="form-group" >
                          <label htmlFor="defaultFormLoginEmailEx4"  className="grey-text" >
                          Prochain réveil <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                          <MDBInput style={{height: '37px'}}  step="2" outline size="sm" type="datetime-local" className="form-control" name="Next_Check" value={Next_Check} placeholder="" onChange={handleChange} />
                          {/*<Datetime dateFormat="DD/MM/YYYY" timeFormat="HH:mm:ss"
                            name="Next_Check" value={Next_Check}
                                onChange={updateDate} />*/}

                        </div>
                      </MDBCol>
                      <MDBCol size="12">

                        <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                          <legend style={{ width: "123px", color: "#51545791",fontSize: "21px" }}>Frequence <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>

                          <MDBRow>
                            <MDBCol size="4">
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Periode
                              </label>

                              <select
                                className="browser-default custom-select" id="2" name="periode" value={periode} onChange={handleChange} required>
                                <option value="vide"></option>
                                <option value="Temps_Reel">Temps réel</option>
                                <option value="Journalier">Journalier</option>
                                <option value="Hebdomadaire">Hebdomadaire</option>
                                <option value="Mensuel">Mensuel</option>
                                <option value="Annelle">Annuelle</option>
                              </select>
                            </MDBCol>
                            <MDBCol>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Unité de temps
                              </label>
                              <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " value={TempsUnite} onChange={handleChange} disabled />
                              <input type="text" id="1" id="Journalier" name="Unte_temps" className="form-control option" value={TempsUnite} onChange={handleChange} disabled />
                              <input type="text" id="1" id="Hebdomadaire" name="Unte_temps" className="form-control option" value={TempsUnite} onChange={handleChange} disabled />
                              <input type="text" id="1" id="Mensuel" name="Unte_temps" className="form-control option" value={TempsUnite} onChange={handleChange} disabled />
                              <input type="text" id="1" id="Annelle" name="Unte_temps" className="form-control option " value={TempsUnite} onChange={handleChange} disabled />
                            </MDBCol>
                            <MDBCol size="4">
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Nombre d'unité
                              </label>
                              <input type="number" min="1" max="59" name="num" id="numTemps_Reel" className="form-control  " value={num} onChange={handleChange} />
                              <input type="number" min="1" max="24" name="num" id="numJournalier" className="form-control option " value={num} onChange={handleChange} />
                              <input type="number" min="1" max="7" name="num" id="numHabdomadaire" className="form-control option " value={num} onChange={handleChange} />
                              <input type="number" min="1" max="31" name="num" id="numMensuel" className="form-control option " value={num} onChange={handleChange} />
                              <input type="number" min="1" max="12" name="num" id="numAnnelle" className="form-control option " value={num} onChange={handleChange} />


                            </MDBCol>
                          </MDBRow>

                        </fieldset>

                      </MDBCol>
                      <MDBCol size="12">
                        <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                          <legend style={{ width: "180px", color: "#51545791",fontSize: "21px" }}>Emploi du Temps</legend>
                          <ModifierEmploi_Temps OperateurValueModifier={OperateurValueModifier} ModifierTab={ModifierTab} />
                        </fieldset>
                      </MDBCol>
                      
                    </MDBRow>
                  </MDBModalBody>
                  <MDBModalFooter>

                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={modifier}> <MDBIcon icon="plus" className="ml-1" />    Modifier</MDBBtn>
                  </MDBModalFooter>
    </>
);


}

export default ModiifierCasIncidentsModale;

