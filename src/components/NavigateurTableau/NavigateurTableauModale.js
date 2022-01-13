
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import axios from "../axios"
import { MDBBtn,MDBModal, MDBModalHeader, MDBModalBody,MDBModalFooter, MDBIcon, MDBRow, MDBCol} from "mdbreact";
import FilterV1 from '../filterV1';
import EditerRapportTableau from './EditerRapport';
import Swal from 'sweetalert2';
import { getNested, parseParams, prepareParams, checkSize } from "../Rapporteur/Rapport/layoutGen/extra"

const NavigateurTableauModale = ({toggle,modal,historyProps,EnregisterNewRapport,Visualiser_Rapport_Id}) => {
  /*****************************************Variable****************************************************/
  const [array_data_rapport, setArray_data_rapport] = useState([])
  const [modelEditerRapport, setModelEditerRapport] = useState(false)
  const [Report_Code, setReport_Code] = useState("")
  const [btn_Editer_Rapport, setBtn_Editer_Rapport] = useState(true)
  const [reportI_href, setReportI_href] = useState(null)
  /**************************************************************************************************************** */
 /*****************************************selectioner un rapport****************************************************/
 function outAllFiltred() {}
  function outSelected(Repport_selected) {
  //console.log(Repport_selected.Report_Code)
    setReport_Code(Repport_selected.Report_Code)
    for (var i = 0; i < array_data_rapport.length; i++) {

      if (Repport_selected.Report_Code == array_data_rapport[i].Report_Code) {
       // if (array_data_rapport[i].Body.objects != undefined) {
         console.log("synoptic",array_data_rapport[i].type)
         if(array_data_rapport[i].type=="synoptic"){
          setBtn_Editer_Rapport(true)
        } else {
          setBtn_Editer_Rapport(false)
        }
      }
    }
  }
  useEffect(() => {
  }, [Report_Code])
 /**************************************************************************************************************/
 /*****************************************Api get All Report****************************************************/
  useEffect(() => {
    document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + "getReports/?g")
      .then(
        (result) => {
          //   this.tableData = result.data;
          if (result.data.length !== 0) {
            if (result.status == 200) {
            document.querySelector("body").classList.remove("isLoading")
            setArray_data_rapport(result.data.reports)
            
            }
          }
        })
        .catch(({response})=>{
                        
          console.log("---------",response)
          if(response!=null){
       if (response.status=="401"){
          
            window.location.assign("/")
            localStorage.clear();

       }}
    }
    )
  }, [])
  useEffect(() => {
  }, [btn_Editer_Rapport])
  useEffect(() => {
  }, [array_data_rapport])
   /**************************************************************************************************************/
  /*****************************************Modal Edit Report****************************************************/
  function toggleEditerRapport() {
    setModelEditerRapport(!modelEditerRapport)
  }
  /************************************************************************************************************ */
  /*****************************************Btn Visualiser Rapport********************************************* */
  function Visualiser_Rapport() {
    if (Report_Code != "") {
      toggle()

      historyProps.push({
        search: `?reportId=${Report_Code}`,

      })

      Visualiser_Rapport_Id(false)
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Veuillez sélectionner un rapport pour visualiser'
      })
    }

  }
 /************************************************************************************************************ */
 /**************************************************historyProps.location.search****************************** */
  useEffect(() => {
    const query = parseParams(historyProps.location.search)
    const { reportId } = { ...query }
    setReportI_href(reportId)
  }, [historyProps.location.search])

  useEffect(() => {
    historyProps.location.state = { "reportI_href": reportI_href }

  }, [reportI_href])

 /************************************************************************************************************ */
 /*****************************************Function New Rapport********************************************** */
  function EnregisterNewRapportFunction(EnregisterTemp) {
    EnregisterNewRapport(EnregisterTemp)
  }
  function Rapportnewclone(type) {
    Visualiser_Rapport_Id(type)
  }
 /************************************************************************************************************ */

  return (<>
    <MDBModalHeader toggle={toggle}>Navigateur Tableaux</MDBModalHeader>
    <MDBModalBody>
      {array_data_rapport.length != 0 && <FilterV1 filterName={"Rapport"}
        outSelected={outSelected}
        outAllFiltred={outAllFiltred}
        filter={[{ Report_TableauName: "Tableaux" }, { TAGS: "Mot Clé" }, { Report_Master: "Master" }]}
        display={{ separator: "", elems: ["Report_Name"] }}
        data={array_data_rapport}
        styleScroll={{ width: "450px", maxHeight: "510px" }}
        btnEdit={true} />}

    </MDBModalBody>
    <MDBModalFooter>
      <MDBRow >
        <MDBCol size="6" style={{ marginLeft: "-12%" }}>
          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ width: "270px" }} onClick={Visualiser_Rapport}> Visualiser Rapport <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
        </MDBCol>
        <MDBCol size="6">
          <MDBBtn style={{ width: "270px" }} onClick={toggleEditerRapport} /*disabled={true} */disabled={btn_Editer_Rapport} > Éditer Rapport <MDBIcon icon="edit" className="ml-1" /></MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBModalFooter>

    <MDBModal isOpen={modelEditerRapport} toggle={toggleEditerRapport} size="lg" centered>
      <EditerRapportTableau historyProps={historyProps} modal={modal} toggleEditerRapport={toggleEditerRapport} toggle={toggle} Report_Code={Report_Code} EnregisterNewRapportFunction={EnregisterNewRapportFunction} Rapportnewclone={Rapportnewclone} />
    </MDBModal>

  </>);
}

export default NavigateurTableauModale