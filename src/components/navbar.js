import React, { useEffect, useState } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBBtn,
  MDBDropdownToggle, MDBDropdownMenu, MDBModal, MDBModalHeader, MDBModalBody, MDBDropdownItem, MDBIcon, MDBRow, MDBCol
} from "mdbreact";
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import "./bar.css";
import useState2 from "react-usestateref"
import NavigateurTableauModale from "./NavigateurTableau/NavigateurTableauModale"
import NavigateurFactBookModale from "./NavigateurFactBook/NavigateurFactBookModale"
import Adhoc from "./NavigateurTableau/Adhoc";
import { parseParams } from '../components/Rapporteur/Rapport/layoutGen/extra'
import axios1 from 'axios';
import axios from "../components/axios"
import { useStores } from "../store"
import { useHistory } from "react-router-dom"
import Bar from "./bar";
import { observer } from "mobx-react-lite"

const navbar = observer(({ EnregisterNew, Visualiser_Rapport_Id_function }) => {
  /*************************************Variable************************************************* */

  const history = useHistory()
  const { mainStore } = useStores()
  const { uiStore } = useStores()
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalAdhoc, setModalAdHoc] = useState(false)
  const [modalFactBook, setModalFactBook] = useState(false)
  const [btnAdhocdesibled, setBtnAdhocdesibled] = useState(false)
  const [reportI_href, setReportI_href] = useState(null)
  const [jsonNewRapport, setJsonNewRapport] = useState(null)
  const [to, setto, toRef] = useState2("")
  const [BtnEnregistreDesibled, setBtnEnregistreDesibled] = useState(true)
  const [BtnMlDesibled, setBtnMlDesibled] = useState(false)
  const [BtnClDesibled, setBtnClDesibled] = useState(false)
  const [BtnTlDesibled, setBtnTlDesibled] = useState(false)
  const [nameTl, setNameTl] = useState(false)
  const [nameCl, setNameCl] = useState(false)
  const [nameMl, setNameMl] = useState(false)
  const [ArrayHotListeRepport, setArrayHotListeRepport] = useState([])

  useEffect(() => {

    const { saisie, user, rapporteur, admin } = { ...mainStore.getUI() }
    window.store = mainStore
    console.log('-------------user-------', user)
    console.log('-------------rapporteur-------', rapporteur)
    console.log('-------------admin-------', admin)
    console.log('-------------saisie-------', saisie)


  }, [])



  useEffect(() => {

    const userAcc = () => {
      const pathname = mainStore.getpathHomeStore()

      const {
        navigateur,
        Factbook,
        hotListe,
        Rapport,
        FBL,
        ML,
        CL,
        TL,
        CasIncidents,
        CasReguliers,
        Emails,
        CasEmails,
        Utilisateurs,
        Saisie
      } = { ...mainStore.getUitStore2() }
      console.log("aaaa")
      switch (window.location.pathname) {
        case "/Navigateur":
          if (!navigateur) {
            history.push(pathname)
          }
          break;
        case "/NavigateurFactBook":
          if (!Factbook) {
            history.push(pathname)
          }
          break;
        case "/HotListe":
          if (!hotListe) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/Rapport":
          if (!Rapport) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/FactBook":
          if (!FBL) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/MesuresListes":
          if (!ML) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/Compteur_Listes":
          if (!CL) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/TimeIntelligence":
          if (!TL) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/Compteur_Listes":
          if (!CasIncidents) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/Compteur_Listes":
          if (!CasReguliers) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/Email":
          if (!Emails) {
            history.push(pathname)
          }
          break;
        case "/Rapporteur/CasEmail":
          if (!CasEmails) {
            history.push(pathname)
          }
          break;
        case "/Admin/Utilisateurs":
          if (!Utilisateurs) {
            history.push(pathname)
          }
          break;
        case "/saisie":
          if (!Saisie)
            history.push(pathname)

        default:
          break;
      }
    }
    if (Object.keys(mainStore.user).length) {
      return userAcc()
    }
    else {
      return mainStore.setUser().then((r) => {
        return userAcc()
      })

    }

  }, [])
  /************************************************************************************** */
  /********************************toggleCollapse NavBar***************************************** */
  function toggleCollapse() {
    setIsOpen(!isOpen)
  }
  /************************************************************************************** */
  /****************************************Route navigateur Tableaux********************************************** */
  function NavigateurTableaux(e) {
    e.preventDefault()
    if (window.location.pathname != "/Navigateur")
      history.push("/Navigateur")
    // history.push({pathname:"/Navigateur",search:history.location.search})
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

    if (BtnTlDesibled == true && BtnClDesibled == true && BtnMlDesibled == true) {
      setBtnAdhocdesibled(true)

    }
  }, [BtnTlDesibled, BtnClDesibled, BtnMlDesibled])
  useEffect(() => {

    if (window.location.pathname == '/Navigateur' || window.location.pathname == '/NavigateurFactBook') {
      const query = parseParams(history.location.search)
      const { reportId } = { ...query }
      setReportI_href(reportId)


      var ReportAdhoc = localStorage.getItem('adHoc')
      try{
        ReportAdhoc=JSON.parse(ReportAdhoc)
      }
      catch(er){
        ReportAdhoc=undefined
      }



      console.log("ReportAdhocReportAdhocReportAdhocReportAdhocReportAdhocReportAdhoc",ReportAdhoc)
      if (reportId != undefined /*&& type=="raport"*/) {




        axios.get(`${window.apiUrl}getReportById/?reportId=${reportId}&g&b`)
          .then(
            (result) => {


              console.log("result", result.data)

              if (result.data.type == "synoptic") {
                setBtnAdhocdesibled(true)
                localStorage.setItem("ReportAdhoc", undefined)
              } else {
                setBtnAdhocdesibled(false)
                localStorage.setItem("ReportAdhoc", reportId)


                console.log("--------------------------Selected_Global-----------------------------", result.data.Selected_Global)
                var Selected_Global = result.data.Selected_Global
                var objects = result.data.Body.objects
                for (var i = 0; i < objects.length; i++) {

                  var Plots = objects[i].MasterObj_Data_Mapping.Plots
                  for (var j = 0; j < Plots.length; j++) {
                    if (Selected_Global != null) {

                      for (var k = 0; k < Selected_Global.length; k++) {
                        if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 == undefined) {

                          if (Selected_Global[k].Dim == "CL") {

                            setBtnClDesibled(false)

                          } else if (Selected_Global[k].Dim == "ML") {

                            setBtnMlDesibled(false)

                          } else if (Selected_Global[k].Dim == "TL") {

                            setBtnTlDesibled(false)

                          } else {


                          }

                        } else if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 != undefined) {

                          if (objects[i].MasterObj_Data_selection.y == "ML") {
                            setBtnMlDesibled(true)
                          } else if (objects[i].MasterObj_Data_selection.y == "CL") {
                            setBtnClDesibled(true)
                          }
                        }
                        else {
                          if (Selected_Global[k].Dim == "CL") {


                            setBtnClDesibled(true)

                          } else if (Selected_Global[k].Dim == "ML") {


                            setBtnMlDesibled(true)


                          } else if (Selected_Global[k].Dim == "TL") {
                            setBtnTlDesibled(true)
                          }

                        }


                        if (Selected_Global[k].Dim == "CL") {

                          setNameCl(Selected_Global[k].Dim_label)


                        }
                        if (Selected_Global[k].Dim == "ML") {


                          setNameMl(Selected_Global[k].Dim_label)


                        }
                        if (Selected_Global[k].Dim == "TL") {
                          setNameTl(Selected_Global[k].Dim_label.iot_name + "," + Selected_Global[k].Dim_label.cluster_name)
                        }
                      }

                    }
                  }
                }
              }




            })
      } else if (typeof ReportAdhoc == "object") {
        axios.get(`${window.apiUrl}getReportById/?reportId=${ReportAdhoc.reportId}&g&b`)
          .then(
            (result) => {


              console.log("result", result.data)

              if (result.data.type == "synoptic") {
                setBtnAdhocdesibled(true)
              } else {
                setBtnAdhocdesibled(false)
                setReportI_href(ReportAdhoc.reportId)

                console.log("--------------------------Selected_Global-----------------------------", result.data.Selected_Global)
                var Selected_Global = result.data.Selected_Global
                var objects = result.data.Body.objects
                for (var i = 0; i < objects.length; i++) {

                  var Plots = objects[i].MasterObj_Data_Mapping.Plots
                  for (var j = 0; j < Plots.length; j++) {
                    if (Selected_Global != null) {

                      for (var k = 0; k < Selected_Global.length; k++) {
                        if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 == undefined) {

                          if (Selected_Global[k].Dim == "CL") {

                            setBtnClDesibled(false)

                          } else if (Selected_Global[k].Dim == "ML") {

                            setBtnMlDesibled(false)

                          } else if (Selected_Global[k].Dim == "TL") {

                            setBtnTlDesibled(false)

                          } else {


                          }

                        } else if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 != undefined) {

                          if (objects[i].MasterObj_Data_selection.y == "ML") {
                            setBtnMlDesibled(true)
                          } else if (objects[i].MasterObj_Data_selection.y == "CL") {
                            setBtnClDesibled(true)
                          }
                        }
                        else {
                          if (Selected_Global[k].Dim == "CL") {


                            setBtnClDesibled(true)

                          } else if (Selected_Global[k].Dim == "ML") {


                            setBtnMlDesibled(true)


                          } else if (Selected_Global[k].Dim == "TL") {
                            setBtnTlDesibled(true)
                          }

                        }


                        if (Selected_Global[k].Dim == "CL") {

                          setNameCl(Selected_Global[k].Dim_label)


                        }
                        if (Selected_Global[k].Dim == "ML") {


                          setNameMl(Selected_Global[k].Dim_label)


                        }
                        if (Selected_Global[k].Dim == "TL") {
                          setNameTl(Selected_Global[k].Dim_label.iot_name + "," + Selected_Global[k].Dim_label.cluster_name)
                        }
                      }

                    }
                  }
                }
              }




            })



      } else {
        setBtnAdhocdesibled(true)
      }
    }
  }, [history.location.search])
  /************************************************************************************** */
  /*******************************************ImprimerPDF******************************************* */
  function ImprimerPDF() {
    var Report_Name_Imprimer
    var Body = null
    console.log("-------------------------------------", history.location.search)
    let str = history.location.search
    let strValidation = (str.slice(0, 7) == "?parent")
    console.log("-------------------------------------", strValidation)
    if (reportI_href != "" && strValidation == false) {

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

                        //   window.location.assign("/")
                        history.push("/")
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

              //   window.location.assign("/")
              history.push("/")
              localStorage.clear();

            } else if (response.status == "404") {
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
    } else {
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

  function NavigateurFactBook(e) {
    e.preventDefault()
    //   window.location.assign("/NavigateurFactBook")
    // history.push({ pathname: "/NavigateurFactBook", search: history.location.search })
    if (window.location.pathname != "/NavigateurFactBook")
      history.push("/NavigateurFactBook")
    // history.push({pathname:"/Navigateur",search:history.location.search})

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
  function HotListe() {

    if (mainStore.getUitStore2().hotListe == true) {
      document.querySelector("body").classList.add("isLoading")
      axios.get(window.apiUrl + "getUser/?hl")
        .then(
          (result) => {
            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

              console.log("-----", result.data)

              if (result.data.hotList.length != 0) {
                setArrayHotListeRepport(result.data.hotList)
              }
            }
          }
        )
        .catch(({ response }) => {
          if (response != null) {
            if (response.status == "401") {
              document.querySelector("body").classList.remove("isLoading")
              // window.location.assign("/")
              history.push("/")
              localStorage.clear();
            }

          }
        }
        )
    }
  }
  // useEffect(() => {
  //   if (ArrayHotListe.length != 0) {
  //     console.log("ArrayHotListe", ArrayHotListe)
  //     document.querySelector("body").classList.add("isLoading")
  //     axios.get(window.apiUrl + `getReports/?reportsIds=${ArrayHotListe.toString()}`)
  //       .then(
  //         (result) => {
  //           if (result.status == 200) {
  //             document.querySelector("body").classList.remove("isLoading")
  //             console.log('-----------------getReports------------------', result.data.reports)
  //             setArrayHotListeRepport(result.data.reports)
  //           }
  //         })
  //   }
  // }, [ArrayHotListe])
  useEffect(() => {
    if (ArrayHotListeRepport.length != 0) {
      console.log("-----ArrayHotListeRepport----", ArrayHotListeRepport)
    }

  }, [ArrayHotListeRepport])
  function Saisie() {
    //window.location.assign("/saisie")

    history.push("/saisie")

  }

  function CasIncidents(e) {
    e.preventDefault()
    history.push("/Rapporteur/CasIncidents")
  }
  function RapportEditeur(e) {
    e.preventDefault()
    history.push("/Rapporteur/Rapport")
  }
  function FactBookListes(e) {
    e.preventDefault()
    history.push("/Rapporteur/FactBook")
  }
  function MListes(e) {
    e.preventDefault()
    history.push("/Rapporteur/MesuresListes")
  }
  function CListes(e) {
    e.preventDefault()
    history.push("/Rapporteur/Compteur_Listes")
  }
  function MailingListes(e) {
    e.preventDefault()
    history.push("/Rapporteur/MailingListes")
  }
  function CasEmail(e) {
    e.preventDefault()
    history.push("/Rapporteur/CasEmail")
  }
  function Email(e) {
    e.preventDefault()
    history.push("/Rapporteur/Email")
  }
  function CasReguliers(e) {
    e.preventDefault()
    history.push("/Rapporteur/CasReguliers")
  }
  function TL(e) {
    e.preventDefault()
    history.push("/Rapporteur/TimeIntelligence")
  }

  function Utilisateur(e) {
    e.preventDefault()
    history.push("/Admin/Utilisateurs")
  }
  function hotListPath(e, Report_Code) {
    e.preventDefault()
    history.push({ pathname: '/HotListe', search: `?reportId=${Report_Code}` })
  }

  function toggleAdhoc() {



    setModalAdHoc(!modalAdhoc)
  }
  return (
    <>
      {window.location.pathname === "/" ? "" : <Bar />}
      <Router>
        <MDBNavbar className="navbarmenu heightNavBar" light expand="md">
          <MDBNavbarBrand>
            <strong ></strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler className="black-text" onClick={toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" className="black-text fontNavBar" isOpen={isOpen} navbar style={{ marginTop: "30px" }}>

            <MDBNavbarNav left className="na" >

              <MDBNavItem >

                {/* <MDBNavLink className="black-text" to='/Navigateur' disabled={!mainStore.getUitStore2().navigateur} onClick={NavigateurTableaux} > */}
                <MDBNavLink className="black-text" to={`#`} disabled={!mainStore.getUitStore2().navigateur} onClick={NavigateurTableaux} >
                  <b>Tableau de bord</b>
                  {history.location.pathname == "/Navigateur" ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}

                </MDBNavLink>

              </MDBNavItem>

              <MDBNavItem>
                <MDBNavLink link to={`#`} onClick={NavigateurFactBook} disabled={!mainStore.getUitStore2().Factbook} className="black-text"> <b>FactBook</b>
                  {window.location.pathname == "/NavigateurFactBook" ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBDropdown>

                  <MDBDropdownToggle nav >
                    {/*** */}
                    <div className="d-md-inline black-text" onClick={HotListe}  ><b>Hot-Liste <MDBIcon icon="caret-down" /></b>
                      {window.location.pathname == "/HotListe" ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}
                    </div>
                  </MDBDropdownToggle>
                  {/*** */}
                  {mainStore.getUitStore2().hotListe == true && <MDBDropdownMenu className="dropdown-default" style={{ marginTop: "-33px" }}>
                    <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "auto", marginTop: "-8px" }}>Derniers rapports ouverts</MDBDropdownItem>

                    {ArrayHotListeRepport.map((list, i) => <MDBDropdownItem key={list.Report_Code} href={`#`} onClick={(e) => hotListPath(e, list.Report_Code)}>{list.Report_Name}</MDBDropdownItem>)}

                  </MDBDropdownMenu>}
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
                        ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}

                    </div>

                  </MDBDropdownToggle>
                  <MDBDropdownMenu color="default" style={{ width: "670px", marginTop: "-33px" }} >
                    <MDBRow style={{ backgroundColor: '#e2e2e2', width: "670px", marginLeft: "0px", marginTop: "-8px" }}>
                      <MDBCol size="3">
                        <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "145px" }} >Repports</MDBDropdownItem>
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
                        <MDBDropdownItem href="#!"  /* disabled={!mainStore.getUitStore2().Rapport}  onClick={RapportEditeur}*/ disabled >Rapport Editeur</MDBDropdownItem>
                        <MDBDropdownItem href="#!" disabled={!mainStore.getUitStore2().FBL} onClick={FactBookListes} onClick={FactBookListes}>FactBook Listes</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">
                        <MDBDropdownItem href="#!" style={{ marginLeft: "-2px" }} disabled={!mainStore.getUitStore2().CasIncidents} onClick={CasIncidents}>Cas-Incidents</MDBDropdownItem>
                        <MDBDropdownItem href="#!" disabled={!mainStore.getUitStore2().CasReguliers} onClick={CasReguliers} >Cas-Reguliers</MDBDropdownItem>
                      </MDBCol>
                      <MDBCol size="3">

                        <MDBDropdownItem disabled={!mainStore.getUitStore2().ML}onClick={MListes}  >Mesures Listes</MDBDropdownItem>
                        <MDBDropdownItem disabled={!mainStore.getUitStore2().TL} onClick={TL} >Time Intelligence </MDBDropdownItem>
                        <MDBDropdownItem disabled={!mainStore.getUitStore2().CL} onClick={CListes}  >Compteurs Listes</MDBDropdownItem>
                      </MDBCol>

                      <MDBCol size="3">
                        <MDBDropdownItem href="#!" disabled={!mainStore.getUitStore2().Emails} onClick={Email}>Emails</MDBDropdownItem>
                        <MDBDropdownItem href="#!" disabled={!mainStore.getUitStore2().CasEmails} onClick={CasEmail}>Cas-Emails</MDBDropdownItem>
                        <MDBDropdownItem href="#!" disabled={!mainStore.getUitStore2().Mailing} onClick={MailingListes}>Mailing Listes</MDBDropdownItem>
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
                        ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" style={{ marginTop: "-33px" }} >
                    <MDBDropdownItem header style={{ backgroundColor: '#e2e2e2', width: "170px", marginTop: "-8px" }}>Administrateur</MDBDropdownItem>

                    <MDBDropdownItem /*href="/Admin/Utilisateurs"*/ href="#!" disabled={!mainStore.getUitStore2().Utilisateurs} onClick={Utilisateur}>Utilisateurs</MDBDropdownItem>


                    <MDBDropdownItem divider />
                    <MDBDropdownItem href="#!" disabled>Configuration Email</MDBDropdownItem>
                    <MDBDropdownItem href="#!" disabled>Configuration SMS</MDBDropdownItem>

                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>


              <MDBNavItem>
                <MDBNavLink link to='/saisie' onClick={Saisie} className="black-text" disabled={!mainStore.getUitStore2().Saisie}> <b>Saisie</b>
                  {window.location.pathname == "/saisie" ? (<hr className="new5" />) : <hr style={{ borderTop: "1px solid #00000000" }} />}
                </MDBNavLink>
              </MDBNavItem>



            </MDBNavbarNav >





            {window.location.pathname == "/Navigateur" ? (
              <MDBNavbarNav right className="BtnNavBar" >

                <MDBNavItem >

                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={toggle} > <span className="span_Tableau_bord" > Navigateur</span><MDBIcon icon="edit" className="ml-1" /></MDBBtn>

                </MDBNavItem>
                <MDBNavItem >

                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={toggleAdhoc}
                    //  disabled={btnAdhocdesibled}> 
                    disabled={mainStore.adHoc.type == "synoptic"}>
                    <span className="span_Tableau_bord" > Ad hoc</span><MDBIcon icon="clone" className="ml-1" /></MDBBtn>

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
                <MDBNavItem >

                  <MDBBtn size="sm" color="#e0e0e0 grey lighten-2" className="btn_Tableau_bord" onClick={toggleAdhoc} disabled={btnAdhocdesibled}> <span className="span_Tableau_bord" > Ad hoc</span><MDBIcon icon="clone" className="ml-1" /></MDBBtn>

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
          modal={modal}
          historyProps={history}
          EnregisterNewRapport={EnregisterNewRapport}
          Visualiser_Rapport_Id={Visualiser_Rapport_Id}
        />
      </MDBModal>

      <MDBModal isOpen={modalFactBook} toggle={toggleFactBook} size="lg" centered>
        <NavigateurFactBookModale

          toggle={toggleFactBook}
          modal={modalFactBook}
          historyProps={history}
          EnregisterNewRapport={EnregisterNewRapport}
          Visualiser_Rapport_Id={Visualiser_Rapport_Id}
        />
      </MDBModal>
      <MDBModal isOpen={modalAdhoc} toggle={toggleAdhoc} size="lg" centered>
        <Adhoc toggle={toggleAdhoc}
          modal={modalAdhoc}
          reportI_href={reportI_href}
          toggleEditeur={toggle}
          EnregisterNewRapport={EnregisterNewRapport}
          Visualiser_Rapport_Id={Visualiser_Rapport_Id}
          BtnClDesibled={BtnClDesibled}
          BtnMlDesibled={BtnMlDesibled}
          BtnTlDesibled={BtnTlDesibled}
          nameCl={nameCl}
          nameMl={nameMl}
          nameTl={nameTl}

        />
      </MDBModal>





    </>

  );

})
export default navbar