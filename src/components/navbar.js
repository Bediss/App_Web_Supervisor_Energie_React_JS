import React, { useEffect, useState } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBBtn,
  MDBDropdownToggle, MDBDropdownMenu, MDBModal, MDBModalHeader, MDBModalBody, MDBDropdownItem, MDBIcon, MDBRow, MDBCol
} from "mdbreact";
import Swal from 'sweetalert2';
import { BrowserRouter as Router } from 'react-router-dom';
import "./bar.css";
import NavigateurTableauModale from "./NavigateurTableau/NavigateurTableauModale"
import NavigateurFactBookModale from "./NavigateurFactBook/NavigateurFactBookModale"
import { parseParams } from '../components/Rapporteur/Rapport/layoutGen/extra'
import axios1 from 'axios';
import axios from "../components/axios"
const navbar = ({ history, EnregisterNew, Visualiser_Rapport_Id_function }) => {
  /*************************************Variable************************************************* */
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalFactBook, setModalFactBook] = useState(false)
  const [reportI_href, setReportI_href] = useState(null)
  const [jsonNewRapport, setJsonNewRapport] = useState(null)
  const [BtnEnregistreDesibled, setBtnEnregistreDesibled] = useState(true)
  const [ArrayHotListe, setArrayHotListe] = useState([])
  const [ArrayHotListeRepport, setArrayHotListeRepport] = useState([])
  /************************************************************************************** */
  /********************************toggleCollapse NavBar***************************************** */
  function toggleCollapse() {
    setIsOpen(!isOpen)
  }
  /************************************************************************************** */
  /****************************************Route navigateur Tableaux********************************************** */
  function NavigateurTableaux() {
    window.location.assign("/Navigateur")
  }
  /************************************************************************************** */
  /*******************************BTN déconnection***************************************** */
  function Login() {
    window.location.assign("/")
    localStorage.clear();
  }
  /************************************************************************************** */
  /************************************Modal btn navigateur************************************************** */
  function toggle() {
    setModal(!modal)
  }
  /************************************************************************************** */
  /***************************************Modal btn FactBook*********************************************** */
  function toggleFactBook() {
    setModalFactBook(!modalFactBook)
  }
  /************************************************************************************** */
  /***************************************history.location.search*********************************************** */

  useEffect(() => {
    if (window.location.pathname == '/Navigateur' || window.location.pathname == '/NavigateurFactBook') {
      const query = parseParams(history.location.search)
      const { reportId } = { ...query }
      setReportI_href(reportId)
    }
  }, [history.location.search])
  /************************************************************************************** */
  /*******************************************ImprimerPDF******************************************* */
  function ImprimerPDF() {
    var Report_Name_Imprimer
    var Body = null
    console.log("-------------------------------------",history.location.search)
    let str =history.location.search
    let strValidation= (str.slice(0,7)=="?parent")
    console.log("-------------------------------------",strValidation)
    if (reportI_href != ""&& strValidation==false) {

      axios.get(`${window.apiUrl}getReportById/?reportId=${reportI_href}&b&n&tn`)
        .then(
          (result) => {
            if (result.data.length !== 0) {

              Report_Name_Imprimer = result.data.Report_Name
              Body = result.data.Body

            

              if (Body != null && reportI_href != null) {
                document.querySelector("body").classList.add("isLoading")
                axios.post(window.apiUrl + "generatePDF/",
                  [
                    {
                      "Report_Code": reportI_href,
                      "Report_Name": Report_Name_Imprimer,
                      "email_from": "",

                      "cas_type": "superviseur",
                      "cas_name": "",
                      "condition_alarme": "",
                      "email_publish": {
                        "event_email_nom": Report_Name_Imprimer
                      },
                      "attach_type": {
                        "Attachement": "Rapport",
                        "Code_Attachement": reportI_href,
                        "Email_Attachement": Report_Name_Imprimer
                      },
                      "report": {
                        "Report_Code": reportI_href,
                        "Body": Body,
                        "Auteur": "Developpeur",
                        "Report_EnergyName": "",
                        "Report_EnergyCode": ""
                      }
                    }
                  ]

                  ,
                  { responseType: 'arraybuffer', headers: { 'Content-Type': 'application/json', } }

                )

                  .then((response) => {
                    if (response != null) {
                      if (response.status == 200) {
                        document.querySelector("body").classList.remove("isLoading")
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${Report_Name_Imprimer}.pdf`);
                        document.body.appendChild(link);
                        link.click();
                      }
                    }
                  })
                  .catch(({ response }) => {

                    console.log("---------", response)
                    if (response != null) {
                      if (response.status == "401") {

                        window.location.assign("/")
                        localStorage.clear();

                      }
                      if (response.status == "500") {

                        document.querySelector("body").classList.remove("isLoading")
                        Swal.fire({
                          toast: true,
                          position: 'top',
                          showConfirmButton: false,
                          timer: 4000,
                          icon: 'warning',
                          width: 750,
                          title: 'Tu ne peux pas télécharger ce rapport pour le moment réessayer ultérieurement '
                        })

                      }
                    }
                  }
                  )

              } else {

                Swal.fire({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 4000,
                  icon: 'warning',
                  width: 550,
                  title: 'Pour télécharger un PDF, il faut enregistrer le nouveau rapport'
                })
              }

            }
          })
          .catch(({ response }) => {
            if (response != null) {
              if (response.status == "401") {

                window.location.assign("/")
                localStorage.clear();

              }else if (response.status == "404"){
                Swal.fire({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 4000,
                  icon: 'warning',
                  width: 650,
                  title: 'Pour télécharger un PDF, il faut enregistrer le nouveau rapport'
                })
              }

            }
          })
    }else{
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 550,
        title: 'Tu ne peux pas télécharger ce rapport'
      })
    
    }
  }
  /************************************************************************************** */
  /*************************************Route NavigateurFactBook************************************************* */

  function NavigateurFactBook() {
    window.location.assign("/NavigateurFactBook")
  }

  /************************************************************************************** */
  /***************************************New rapport enregister*********************************************** */
  function EnregisterNewRapport(EnregisterTemp) {
    EnregisterNew(EnregisterTemp)
    setJsonNewRapport(EnregisterTemp)
  }
  function Visualiser_Rapport_Id(type) {
    Visualiser_Rapport_Id_function(type)
  }
  /************************************************************************************** */
  /******************************************EnregisterRapportBTN******************************************** */
  function EnregisterRapportBTN() {
    if (jsonNewRapport != null) {
      setBtnEnregistreDesibled(false)
      axios1.post(window.apiUrl + "sendid/",
        {
          tablename: "Reporting_V3",
          identifier: "",
          nombermaxcode: '1',
          primaryfield: "Report_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {
            var Report_Code_New = ""
            var ajoutertemp = []
            if (result.data !== null) {
              Report_Code_New = result.data.split(", ")[0]
            }
            ajoutertemp.push({
              "Report_Code": Report_Code_New,
              "Report_Name": jsonNewRapport[0].Report_Name,
              "Report_TableauName": jsonNewRapport[0].Report_TableauName,
              "Report_TableauCode": jsonNewRapport[0].Report_TableauCode,//parseInt(this.state.Report_TableauCode),
              "Report_Description": jsonNewRapport[0].Report_Description,
              "Report_Master": "Non",
              "Report_EnergyCode": "",
              "Report_EnergyName": "",
              "Report_ViewCode": "",
              "Report_ViewName": "",
              "Report_PostCCode": "",
              "Report_PostCName": "",
              "Auteur": "",
              "Body": jsonNewRapport[0].Body,
              "Selected_Global": jsonNewRapport[0].Selected_Global,
              "Html": "",
              "TAGS": jsonNewRapport[0].TAGS,
              "SHAH1_code": "",
              "Access_Groupe_User": "",
              "disposition": jsonNewRapport[0].disposition,
              "DBAction": "2"
            })
            if (ajoutertemp.length != 0) {
              axios1.post(window.apiUrl + "updatedelete/", {
                tablename: "Reporting_V3",
                identifier: "",
                datatomodified: [].concat(ajoutertemp),
              }
              )
                .then((response) => {
                  if (response.data == "op") {
                    Swal.fire({
                      toast: true,
                      position: 'top',
                      showConfirmButton: false,
                      timer: 4000,
                      width: 300,
                      icon: 'success',
                      title: 'Enregister avec succès'
                    })
                    history.push({ search: `?reportId=${Report_Code_New}` })
                    setBtnEnregistreDesibled(true)
                  } else {

                    Swal.fire({
                      toast: true,
                      position: 'top',

                      showConfirmButton: false,
                      timer: 4000,
                      icon: 'warning',
                      width: 400,
                      title: "Ce rapport n'est pas Enregistré"
                    })
                  }
                })
                .catch((err) => console.error(err));
            }


          })

    }
  }
  /************************************************************************************** */
  /************************************useEffect new json rapport****************************************** */
  useEffect(() => {
    if (jsonNewRapport != null) {
      setBtnEnregistreDesibled(false)
    }
  }, [jsonNewRapport])
  /************************************************************************************** */
  function HotListe(){
   // window.location.assign("/HotListe")
   document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + "getUser/?hl")
    .then(
        (result) => {
          if (result.status == 200) {
            document.querySelector("body").classList.remove("isLoading")
          console.log("-----",result.data)
        setArrayHotListe(result.data)
          }
        }
    )
    .catch(({response})=>{
                          
      console.log("---------",response)
      if(response!=null){
   if (response.status=="401"){
        document.querySelector("body").classList.remove("isLoading")
        window.location.assign("/")
        localStorage.clear();
    }
      
   }
}
)

  }
  useEffect(()=>{
    if(ArrayHotListe.length!=0){
   console.log("ArrayHotListe",ArrayHotListe)
   document.querySelector("body").classList.add("isLoading")
   axios.get(window.apiUrl + `getReports/?reportsIds=${ArrayHotListe.toString()}`)
   .then(
     (result) => {
      if (result.status == 200) {
        document.querySelector("body").classList.remove("isLoading")
       console.log('-----------------getReports------------------',result.data.reports)
       setArrayHotListeRepport(result.data.reports)
      }
     })
    }
  },[ArrayHotListe])
useEffect(()=>{
  if(ArrayHotListeRepport.length!=0){
    console.log("-----ArrayHotListeRepport----",ArrayHotListeRepport)
  }

},[ArrayHotListeRepport])

  return (
    <div>
      <Router>
        <MDBNavbar className="navbarmenu heightNavBar" light expand="md">
          <MDBNavbarBrand>
            <strong ></strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler className="black-text" onClick={toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" className="black-text fontNavBar" isOpen={isOpen} navbar style={{marginTop: "30px"}}>
          
            <MDBNavbarNav left className="na" >

              <MDBNavItem >
                <MDBNavLink className="black-text" link  to ='' onClick={NavigateurTableaux} > <b>Tableau de bord</b> 
                {window.location.pathname == "/Navigateur" ? (  <hr className="new5"/>) : <hr style={{borderTop: "1px solid #00000000"}}/>}
             
                </MDBNavLink>
              
              </MDBNavItem>
            
              <MDBNavItem>
                <MDBNavLink link to ='' onClick={NavigateurFactBook} className="black-text"> <b>FactBook</b>
                {window.location.pathname == "/NavigateurFactBook" ? (  <hr className="new5"/> ) : <hr style={{borderTop: "1px solid #00000000"}}/>}
                </MDBNavLink>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink link className="black-text" onClick={HotListe}> <b>Hot-Liste</b>
                {window.location.pathname == "/HotListe" ? (<hr className="new5"/>) : null}
                </MDBNavLink>
                    
              </MDBNavItem> */}




              <MDBNavItem>
                <MDBDropdown>

                  <MDBDropdownToggle nav  >

                    <div className="d-md-inline black-text" onClick={HotListe}><b>Hot-Liste <MDBIcon icon="caret-down" /></b> 
                    {window.location.pathname == "/HotListe" ? (<hr className="new5"/>) : <hr style={{borderTop: "1px solid #00000000"}}/>}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default"  style={{marginTop: "-33px"}}>
                    <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "auto", marginTop: "-8px" }}>Rapports</MDBDropdownItem>

                    {ArrayHotListeRepport.map((list, i) =>  <MDBDropdownItem key={list.Report_Code} href={`/HotListe?reportId=${list.Report_Code}`}>{list.Report_Name}</MDBDropdownItem>)}

                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>












              <MDBNavItem >
                <MDBDropdown >

                  <MDBDropdownToggle nav  >
                    <div className="d-md-inline black-text" ><b>Rapporteur <MDBIcon icon="caret-down" /></b> 
                    {window.location.pathname == "/Rapporteur/Rapport" || 
                    window.location.pathname == "/Rapporteur/FactBook" ||  
                    window.location.pathname == "/Rapporteur/CasIncidents" ||
                    window.location.pathname == "/Rapporteur/CasReguliers" ||
                    window.location.pathname == "/Rapporteur/MesuresListes" ||
                    window.location.pathname == "/Rapporteur/TimeIntelligence" ||
                    window.location.pathname == "/Rapporteur/Compteur_Listes" ||
                    window.location.pathname == "/Rapporteur/Email" ||
                    window.location.pathname == "/Rapporteur/CasEmail" ||
                    window.location.pathname == "/Rapporteur/MailingListes" 
                    ? (<hr className="new5"/>) : <hr style={{borderTop: "1px solid #00000000"}}/>}
                    
                     </div>
                 
                  </MDBDropdownToggle>
                  <MDBDropdownMenu color="default" style={{ width: "670px",marginTop: "-33px" }} >
                    <MDBRow style={{ backgroundColor: '#e2e2e2', width: "670px", marginLeft: "0px", marginTop: "-8px" }}>
                      <MDBCol size="3">
                        <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "145px" }}>Repports</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">
                        <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "145px" }}>Cas</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">
                        <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "145px" }}>Data Selector</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">
                        <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "145px" }}>Action</MDBDropdownItem>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol size="3">
                        <MDBDropdownItem href="/Rapporteur/Rapport">Rapport Editeur</MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/FactBook" >FactBook Listes</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">
                        <MDBDropdownItem href="/Rapporteur/CasIncidents">Cas-Incidents</MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/CasReguliers">Cas-Reguliers</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">

                        <MDBDropdownItem href="/Rapporteur/MesuresListes">Mesures Listes</MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/TimeIntelligence">Time Intelligence </MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/Compteur_Listes">Compteurs Listes</MDBDropdownItem>
                      </MDBCol>

                      <MDBCol size="3">
                        <MDBDropdownItem href="/Rapporteur/Email">Emails</MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/CasEmail">Cas-Emails</MDBDropdownItem>
                        <MDBDropdownItem href="/Rapporteur/MailingListes">Mailing Listes</MDBDropdownItem>
                      </MDBCol>




                    </MDBRow>
                  </MDBDropdownMenu>

                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem>
                <MDBDropdown>

                  <MDBDropdownToggle nav  >

                    <div className="d-md-inline black-text"><b>Administrateur <MDBIcon icon="caret-down" /></b> 
                    {window.location.pathname == "/Admin/Utilisateurs" 
                    ? (<hr className="new5"/>) : <hr style={{borderTop: "1px solid #00000000"}}/>}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" style={{marginTop: "-33px"}} >
                    <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "170px", marginTop: "-8px" }}>Administrateur</MDBDropdownItem>

                    <MDBDropdownItem /*href="/Admin/Utilisateurs"*/ href="#!">Utilisateurs</MDBDropdownItem>


                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!">Configuration Email</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Configuration SMS</MDBDropdownItem>

                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav >
            {window.location.pathname == "/Navigateur" ? (
              <MDBNavbarNav right  className="BtnNavBar" >

                <MDBNavItem >

                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={toggle} > <span className="span_Tableau_bord" > Navigateur</span><MDBIcon icon="edit" className="ml-1" /></MDBBtn>

                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={ImprimerPDF} ><span className="span_Tableau_bord"> Télécharger</span> <MDBIcon icon="file-download" className="ml-1" /></MDBBtn>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn size="sm" color="#bdbdbd grey lighten-1" className="btn_Tableau_bord" disabled={BtnEnregistreDesibled} onClick={EnregisterRapportBTN} ><span className="span_Tableau_bord"> Enregistrer </span><MDBIcon icon="save" className="ml-1 " /></MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>) : null}

            {window.location.pathname == "/NavigateurFactBook" ? (
              <MDBNavbarNav right className="BtnNavBar"  >

                <MDBNavItem >

                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={toggleFactBook} > <span className="span_Tableau_bord" > Navigateur</span><MDBIcon icon="edit" className="ml-1" /></MDBBtn>

                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={ImprimerPDF} ><span className="span_Tableau_bord">Télécharger</span> <MDBIcon icon="file-download" className="ml-1" /></MDBBtn>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn size="sm" color="#bdbdbd grey lighten-1" className="btn_Tableau_bord" disabled={BtnEnregistreDesibled} onClick={EnregisterRapportBTN}><span className="span_Tableau_bord"> Enregistrer </span><MDBIcon icon="save" className="ml-1 " /></MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>) : null}
            <MDBNavbarNav right className="BtnNavBar" >
              <MDBNavItem>
                <MDBBtn size="sm" color="#9e9e9e grey" onClick={Login}>

                  <MDBIcon title="Déconnexion" icon="user" size="lg" />

                </MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
      <MDBModal isOpen={modal} toggle={toggle} size="lg" centered>
        <NavigateurTableauModale

          toggle={toggle}
          historyProps={history}
          EnregisterNewRapport={EnregisterNewRapport}
          Visualiser_Rapport_Id={Visualiser_Rapport_Id}
        />
      </MDBModal>

      <MDBModal isOpen={modalFactBook} toggle={toggleFactBook} size="lg" centered>
        <NavigateurFactBookModale

          toggle={toggleFactBook}
          historyProps={history}
          EnregisterNewRapport={EnregisterNewRapport}
          Visualiser_Rapport_Id={Visualiser_Rapport_Id}
        />
      </MDBModal>
    </div>

  );

}
export default navbar