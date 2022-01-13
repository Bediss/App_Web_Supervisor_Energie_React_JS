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
import {useStores} from "../../../../store"
import {observer} from "mobx-react-lite"
const ModiifierCasIncidentsModale =observer( ({ 
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
    Operateur,
    Description,
    validationEmploi,
    ValidationObjectif,
    dataObjectiveAdvanced,
    ObjectiveAdvanced,
    Parsed_Formule
}) => {
  const {uitStore} = useStores()
        const scrollContainerStyle = { maxHeight: "300px" };
        const [inputValueType,setinputValueType]=useState("number")
        const [inputValueDisabled,setinputValueDisabled]=useState(false)
        const [U_inputobjectiveVar,setU_inputobjectiveVar]=useState(null)
        const [objectifValeurInput,setObjectifValeurInput]=useState("")
        const [typeValidation,settypeValidation]=useState(false)
        const [contentValeur,setContentValeur]=useState("")
        const [operateur, setOperateur] = useState("")
        
console.log("---dataObjectiveAdvanced---",dataObjectiveAdvanced)
useEffect(() => {
  function disableScrollInputNbr(event){
    if(document.activeElement.type === "number" &&
       document.activeElement.classList.contains("hideArrows"))
    {
        document.activeElement.blur();
    }
}
  document.addEventListener("wheel", disableScrollInputNbr);

  return () => {
    document.removeEventListener("wheel",disableScrollInputNbr)
  }
}, [])
         useEffect(() => {
          var contentVariable=""
          if(Sys_inputobjective.length!=0){
  
            var valeur = Sys_inputobjective[0].valeur
            var content=""
            for (var i=0;i<valeur.length;i++){
           if(valeur[i].type=="r"&&Operateur!="A"){
              settypeValidation(true)
              content=valeur[0].content
              // setContentValeur(content)
              console.log("U_inputobjective----------------------------------------------------",U_inputobjective)
              console.log("contentcontentcontentcontent----------------------------------------------------",content)

               U_inputobjective=[content]
             //  addUinputobjective(parseFloat(content))
            
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
              console.log("U_inputobjective----------------------------------------------------",U_inputobjective)
              if(U_inputobjective.length!=0&& (U_inputobjective.slice(0,9) =="Objective") ){
              setinputValueType("text")
              setinputValueDisabled(true)
              setObjectifValeurInput(U_inputobjective)
              setU_inputobjectiveVar(U_inputobjective)
              console.log("U_inputobjective---------------------8888-------------------------------",U_inputobjective)

              }else {

                setinputValueType("number")
                setinputValueDisabled(false)
                console.log("U_inputobjective---------------------22222s-------------------------------",U_inputobjective)
               setObjectifValeurInput(U_inputobjective)
                setU_inputobjectiveVar(U_inputobjective[0])
                Sys_inputobjective=contentValeur
             }
            }, [U_inputobjective])




            useEffect(() => {
             
            }, [U_inputobjectiveVar])
        
           function outSelectedMesure(json){
            selectMeasureGetObject({"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
           }

  

           useEffect(() => {
            console.log("------energycompteurselected---->>>>>>>>>>>>>>",energycompteurselected)
          }, [energycompteurselected])
           useEffect(() => {
           if(U_inputobjectiveVar!=null&& inputValueType=="number" && inputValueDisabled==false /*&& typeValidation==true*/){
           
              addUinputobjective([U_inputobjectiveVar])
      
             }
             
          }, [U_inputobjectiveVar,inputValueType,inputValueDisabled,typeValidation])
          function funModale(modalObject,nb){

            
            funModaleObjective(modalObject,nb)
            
          }

          useEffect(() => {
            console.log("--------------->><<<------",U_Formule)
          }, [U_Formule])
          useEffect(() => {
            console.log("--------------->><<<------",Formule)
          }, [Formule])

          function btnAvancee() {
         
            uitStore.setIncState("advanced")
            setOperateur("AVANCÉE")
        }
          function btnValeur() {

        
           uitStore.setIncState("basic")
           
        }


        useEffect(() => {
          console.log("-----------------------------------------------------------------------------------",Operateur)
          
          setOperateur(Operateur)
          
          if(Operateur=="A"){
          
            uitStore.setIncState("advanced")
          }else{
            uitStore.setIncState("basic")
          
           
          
          }
          
          }, [])


        useEffect(() => {
          console.log("-------------------------------------operateur----------------------------------------------",operateur)
        
          if(operateur!=""){
            onClickHandler(operateur)
          }
        }, [operateur])




 
          function annuler(){
            uitStore.setIncState("")
            ValidationObjectif("")
            setOperateur("")
            onClickHandler("")
            setU_inputobjectiveVar(null)
            addUinputobjective([])
         //   ObjectiveAdvanced([])
         //   callbackAdvancedObjective([])
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
                                Description.substring(U_Formule.indexOf("=") + 1).replace(/#/g, '').split('~').filter(e=>e),
                                Formule.substring(Formule.indexOf("=") + 1).split('~').filter(e=>e),
                                TAG_Formule,
                                Parsed_Formule
                                
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
                      <MDBCol size="12">

<fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
  <legend style={{ width: "118px", color: "#51545791", fontSize: "21px" }}>Objective <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
  <MDBRow>

    <MDBCol size="12" >

    </MDBCol>
    
    <MDBCol size="6" >
      <MDBBtn style={{ width: "96%" }} outline onClick={btnValeur} disabled={uitStore.getIncState("advanced")}>VALEUR</MDBBtn>
    </MDBCol>
    <MDBCol size="6" >
      <MDBBtn style={{ width: "96%" }} outline onClick={btnAvancee} disabled={uitStore.getIncState("basic")}>Avancée</MDBBtn>
    </MDBCol>
    { uitStore.getIncState("basic") == true && <MDBCol size="12" >

      <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
        <legend style={{ width: "73px", color: "#51545791", fontSize: "21px" }}>Valeur<span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Operateur <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
        </label>
        {/* <select className="browser-default custom-select" id="2" name="Operateur" value={Operateur} onChange={handleChange} required> */}
        <select className="browser-default custom-select" id="2" name="operateur" value={operateur} onChange={(e)=>setOperateur(e.target.value)} required>

          <option></option>
          {operator.map((operatoritem, i) => <option key={i}  >{operatoritem}</option>)}

        </select>

        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Valeur <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
        </label>

        {/* <input type={inputValueType} disabled={inputValueDisabled} autoComplete="off" className="form-control form-control-sm" name="U_inputobjective" value={U_inputobjective} onChange={handleChange} />
        <br/> */}
        <input type={inputValueType} disabled={inputValueDisabled} autoComplete="off" className="form-control form-control-sm  hideArrows"  name="U_inputobjectiveVar" value={U_inputobjectiveVar} onChange={(e)=>(setU_inputobjectiveVar(e.target.value))} />



        <div className="d-flex bd-highlight example-parent">

          <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

            onClick={toggleFilterMesure}
          >Get Objective</MDBBtn>

          <MDBBtn className=' btn-floating px-2 bd-highlight col-example mx-0' style={{ backgroundColor: '#7dd2d9' }} onClick={() => clearequation()}>
            <MDBIcon size='lg' fas icon='trash-alt' ></MDBIcon>
          </MDBBtn>
        </div>

        <MDBModal isOpen={modalFilterMesure} toggle={toggleFilterMesure} size="lg">
          <MDBModalHeader toggle={toggleFilterMesure}>Get Objective</MDBModalHeader>
          <MDBModalBody>
            <div style={{ width: '99%' }}>
              {dataEnergyMeasure.length != 0 ? (<FilterV1 filterName={"Mesure"}

                outSelected={outSelectedMesure}


                filter={[
                  { measure_View: "Périodicité" },
                  { "Measure-Category": "Catégorie" },
                  { "Measure-Stats": "Statistiques" },
                  { measure_name: "Nom Mesure" },
                ]}
                display={{ separator: "", elems: ["measure_Label"] }}
                data={dataEnergyMeasure}
                styleScroll={{ width: "100%", maxHeight: "295px" }}
                btnEdit={true} />) : null}               </div>
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
                    <MDBBtn size="sm" style={{ height: "31px" }} color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                      onClick={() => getindexmesue(i, mesureitem.measure_ID)}
                    >
                      <MDBIcon icon="pencil-alt" />

                    </MDBBtn>
                  </div>



                )}
                <MDBModal isOpen={modalValue} toggle={toggleValue} size="sm">
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
            <MDBBtn color="primary" size="sm" onClick={() => Annulersendsetobjective()}>Annuler</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <hr/>
          <MDBBtn color="#9e9e9e grey"   onClick={annuler} className="float-right" size="sm">Annuler</MDBBtn>
      </fieldset>
    </MDBCol>}

    {uitStore.getIncState("advanced") == true && <MDBCol size="12" >
      <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
        <legend style={{ width: "118px", color: "#51545791", fontSize: "21px" }}>Avancée <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
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

        </div>
<hr/>
        <MDBBtn color="#9e9e9e grey" onClick={annuler} size="sm" className="float-right">Annuler</MDBBtn>
      </fieldset>
    </MDBCol>}
  </MDBRow>
</fieldset>
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
                          <ModifierEmploi_Temps OperateurValueModifier={OperateurValueModifier} ModifierTab={ModifierTab}  ValidationEmploi={validationEmploi}/>
                        </fieldset>
                      </MDBCol>
                      
                    </MDBRow>
                  </MDBModalBody>
                  <MDBModalFooter>

                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={modifier}> <MDBIcon icon="plus" className="ml-1" />    Modifier</MDBBtn>
                  </MDBModalFooter>
    </>
);


})

export default ModiifierCasIncidentsModale;

