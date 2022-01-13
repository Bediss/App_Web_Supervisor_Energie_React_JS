



import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { MDBBtn,MDBModal, MDBModalHeader, MDBContainer, MDBModalBody,MDBModalFooter, MDBListGroupItem, MDBListGroup, MDBIcon, MDBRow, MDBCol} from "mdbreact";
import Swal from 'sweetalert2';
import EditerRapport from '../NavigateurTableau/EditerRapport';
const NavigateurFactBookModale = ({ toggle,modal, historyProps, EnregisterNewRapport, Visualiser_Rapport_Id }) => {
  /****************************************************Variable************************************************ */
  const [listeFactBook, setListeFactBook] = useState([])
  const [listeRapport, setListeRapport] = useState([])
  const [mDBListGroupItemSelected, setMDBListGroupItemSelected] = useState(null)
  const [mDBListGroupItemSelectedRapport, setMDBListGroupItemSelectedRapport] = useState(null)
  const [btn_Editer_Rapport, setBtn_Editer_Rapport] = useState(true)
  const [modelEditerRapport, setModelEditerRapport] = useState(false)
  const [Report_Code, setReport_Code] = useState("")
  const [code_FactBook, setCode_FactBook] = useState("")
  const [nom_FactBook, setNom_FactBook] = useState("")
  const [filterFactBook_Liste, setFilterFactBook_Liste] = useState([])
  const [filterRapportFB_Liste, setFilterRapportFB_Liste] = useState([])
  /*****************************************************************************************************/
  /**************************************************getFactBooks***************************************************/

  useEffect(() => {
    document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + "getFactBooks/")
      .then(
        (result) => {
          // this.tableData = result.data;

          if (result.data.length !== 0) {
                   if (result.status == 200) {
            document.querySelector("body").classList.remove("isLoading")
            setListeFactBook(result.data)
                   }
          }
        })
      .catch(({ response }) => {

        console.log("---------", response)
        if (response != null) {
          if (response != null) {
            if (response.status == "401") {

              window.location.assign("/")
              localStorage.clear();
            }
          }
        }
      }
      )
  }, [])

  useEffect(() => {

  }, [code_FactBook, nom_FactBook])
  useEffect(() => {
    if (!listeFactBook) return
  }, [listeFactBook])
  /*****************************************************************************************************/
  /********************************************FactBookselectedchange*********************************************************/
  function FactBookselectedchange(Code_FactBook, i, Nom_FactBook) {
    setNom_FactBook(Nom_FactBook)
    setCode_FactBook(Code_FactBook)
    document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + `getFactBookById/?factBookId=${Code_FactBook}`)
      .then(
        (result) => {
          // this.tableData = result.data;
          if (result.data.length !== 0) {
            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")
            setFilterRapportFB_Liste([])
            setListeRapport(result.data[0].Factbook_Membre)
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
        }
      }
      )
    setMDBListGroupItemSelected(i)
  }
  /*****************************************************************************************************/
  /*********************************************Rapportselectedchange********************************************************/

  function Rapportselectedchange(Report_Code, i) {
    setReport_Code(Report_Code)
    setMDBListGroupItemSelectedRapport(i)


    axios.get(`${window.apiUrl}getReportById/?reportId=${Report_Code}&n&tn`)
      .then(
        (result) => {
          if (result.data.length !== 0) {

        //    if (result.data.Body.objects != undefined) {
  
              if(result.data.type=="synoptic"){
              setBtn_Editer_Rapport(true)
            } else {
              setBtn_Editer_Rapport(false)
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
        }
      }
      )

  }

  useEffect(() => {

  }, [btn_Editer_Rapport])
  useEffect(() => {

  }, [Report_Code])
  /**************************************************************************************************** */
  /****************************************************Visualiser_Rapport************************************************ */

  function Visualiser_Rapport() {
    if (Report_Code != "") {
      toggle()

      historyProps.push({
        search: `?reportId=${Report_Code}`,

      })
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Veuillez sélectionner un rapport'
      })
    }

  }
  /**************************************************************************************************** */
  /*********************************************Modal edit report******************************************************* */

  function toggleEditerRapport() {
    setModelEditerRapport(!modelEditerRapport)
  }
  /**************************************************************************************************** */
  /***************************************************télécharger_FactBook************************************************* */

  function télécharger_FactBook() {
    document.querySelector("body").classList.add("isLoading")

    var arrayCode = []
    var arrayRapportFactBook = []
    for (var i = 0; i < listeRapport.length; i++) {
      arrayCode.push(listeRapport[i].Report_Code)
    }

    axios.get(window.apiUrl + `getReports/?reportsIds=${arrayCode.toString()}&b`)
      .then(
        (result) => {
          if (result.data.length !== 0) {

            var dataRapports = result.data.reports
            for (var j = 0; j < dataRapports.length; j++) {



              arrayRapportFactBook.push({
                "Report_Code": dataRapports[j].Report_Code,
                "Report_Name": dataRapports[j].Report_Name,
                "email_from": "",

                "cas_type": "FactBook",
                "cas_name": "",
                "condition_alarme": "",
                "email_publish": {
                  "event_email_nom": nom_FactBook
                },
                "attach_type": {
                  "Attachement": "Rapport",
                  "Code_Attachement": code_FactBook,
                  "Email_Attachement": nom_FactBook
                },
                "report": {
                  "Report_Code": dataRapports[j].Report_Code,
                  "Body": dataRapports[j].Body,
                  "Auteur": "Developpeur",
                  "Report_EnergyName": "",
                  "Report_EnergyCode": ""
                }
              })

            }



            axios.post(window.apiUrl + "generatePDF/",


              arrayRapportFactBook

              ,
              { responseType: 'arraybuffer', headers: { 'Content-Type': 'application/json', } }

            )

              .then((response) => {
                if (response != null) {
                  if (response.status == 200) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${nom_FactBook}.pdf`);
                    document.body.appendChild(link);
                    link.click();

                    document.querySelector("body").classList.remove("isLoading")
                  }
                }
              })
              .catch((err) => console.error(err));
          }
        }
      )
      .catch(({ response }) => {

        console.log("---------", response)
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/")
            localStorage.clear();

          }
        }
      }
      )

  }
  /**************************************************************************************************** */
  /************************************************filterFactBook_Liste**************************************************** */


  useEffect(() => {
    const input = document.querySelector("#myInputFactBook")
    if (filterFactBook_Liste.length == 0) {
      setFilterFactBook_Liste(listeFactBook)
    }

    const FilterFBListe = (e) => {
      const text = e.target.value
      setFilterFactBook_Liste(listeFactBook.filter((el) => el.Nom_FactBook.toLowerCase().indexOf(text.toLowerCase()) >= 0))
    }


    if (input) {

      input.addEventListener("keyup", (e) => FilterFBListe(e))
    }

    return function cleanup() {

      input.removeEventListener("keyup", FilterFBListe)
    }


  }, [listeFactBook])

  useEffect(() => {
    if (!filterFactBook_Liste) return
  }, [filterFactBook_Liste])
  /**************************************************************************************************** */
  /*********************************************************filterRapportFB_Liste******************************************* */

  useEffect(() => {

    if (filterRapportFB_Liste.length == 0) {
      setFilterRapportFB_Liste(listeRapport)

    }

    const FilterRapportFBListe = (e) => {


      const text = e.target.value


      setFilterRapportFB_Liste(listeRapport.filter((el) => el.Report_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))
    }

    const input2 = document.querySelector("#myInputRapportFactBook")
    if (input2) {

      input2.addEventListener("keyup", (e) => FilterRapportFBListe(e))
    }

    return function cleanup() {

      input2.removeEventListener("keyup", FilterRapportFBListe)
    }


  }, [listeRapport])
  useEffect(() => {
    if (!filterRapportFB_Liste) return



  }, [filterRapportFB_Liste])
  /**************************************************************************************************** */
  /****************************************************EnregisterNewRapportFunction************************************************ */

  function EnregisterNewRapportFunction(EnregisterTemp) {
    EnregisterNewRapport(EnregisterTemp)
  }
  /**************************************************************************************************** */
  /*******************************************************Rapportnewclone********************************************* */

  function Rapportnewclone(type) {
    Visualiser_Rapport_Id(type)
  }
  /**************************************************************************************************** */
  return (
    <>
      <MDBModalHeader toggle={toggle}>Navigateur FactBook</MDBModalHeader>
      <MDBModalBody>
        <MDBRow>
          <MDBCol size="6">
            <label htmlFor="defaultFormLoginEmailEx" style={{ marginLeft: "4%" }}   >Liste des FactBook:</label>

            <input type="text" id="myInputFactBook" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "93%", marginRight: "4%" }} />

            <MDBContainer style={{ padding: 0 + 'em' }} >

              <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{ width: "350px", maxHeight: "390px" }} id="myFilter">
                {filterFactBook_Liste.map((list, i) => <MDBListGroupItem hover key={i} active={mDBListGroupItemSelected == i ? true : false} name="Nom_FactBook" value={list.Nom_FactBook} style={{ padding: 0.5 + 'em' }} id={list.Code_FactBook} hover onClick={() => FactBookselectedchange(list.Code_FactBook, i, list.Nom_FactBook)} >{list.Nom_FactBook}</MDBListGroupItem>)}

              </MDBListGroup>
            </MDBContainer>
          </MDBCol>
          <MDBCol size="6">
            <label htmlFor="defaultFormLoginEmailEx" style={{ marginLeft: "4%" }} > Liste des Rapports d'un FactBook:</label>
            <input type="text" id="myInputRapportFactBook" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "93%", marginRight: "4%" }} />

            <MDBContainer style={{ padding: 0 + 'em' }}>


              <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{ width: "350px", maxHeight: "390px" }} id="myFilter">
                {filterRapportFB_Liste.map((listRapportglobal, i) => <MDBListGroupItem active={mDBListGroupItemSelectedRapport == i ? true : false} hover key={i} name="Report_Name" value={listRapportglobal.Report_Name} style={{ padding: 0.5 + 'em' }} id={listRapportglobal.Report_Code} hover onClick={() => Rapportselectedchange(listRapportglobal.Report_Code, i)}>{listRapportglobal.Report_Name}</MDBListGroupItem>)}

              </MDBListGroup>
            </MDBContainer>
          </MDBCol>

        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBRow >
          <MDBCol size="4" style={{ marginLeft: "-2%" }}>
            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ width: "267px" }} onClick={télécharger_FactBook}> télécharger FactBook <MDBIcon icon="file-download" className="ml-1" /></MDBBtn>
          </MDBCol>
          <MDBCol size="4" style={{ marginLeft: "22px" }}>
            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ width: "236px" }} onClick={Visualiser_Rapport}> Visualiser Rapport <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
          </MDBCol>
          <MDBCol size="4" style={{ marginLeft: "-13px" }}>
            <MDBBtn style={{ width: "235px" }} onClick={toggleEditerRapport} /*disabled={true}*/ disabled={btn_Editer_Rapport} > Éditer Rapport <MDBIcon icon="edit" className="ml-1" /></MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBModalFooter>
      <MDBModal isOpen={modelEditerRapport} toggle={toggleEditerRapport} size="lg" centered>
        <EditerRapport historyProps={historyProps} modal={modal} toggleEditerRapport={toggleEditerRapport} toggle={toggle} Report_Code={Report_Code} EnregisterNewRapportFunction={EnregisterNewRapportFunction} Rapportnewclone={Rapportnewclone} />
      </MDBModal>
    </>

  )

}
export default NavigateurFactBookModale;