import React, { Component } from "react";
import {
  MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
  MDBBreadcrumb, MDBBreadcrumbItem, MDBInput, MDBIcon, MDBRow, MDBCol,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
  MDBListGroupItem, MDBListGroup
} from 'mdbreact';
import Calculatrice from "../CasIncidents/calculatrice/calculatriceV2";
import axios from 'axios';
import axios1 from '../../../axios';
import uuid from 'react-uuid';
import Tabulator from "tabulator-tables"; 
import Dropdown from 'react-bootstrap/Dropdown'
import Moment from 'moment';
import Datetime from 'react-datetime';
import { timers } from "jquery";
import "./casincidents.css";
import Swal from 'sweetalert2';
import { PropTypes } from 'react'
import Fetching from "../../../Fetching"
import FilterV1 from '../../../filterV1';
import NouveauCasIncidentsModale from "./NouveauCasIncidentsModal";
import ModifierCasIncidentsModal from "./ModifierCasIncidentsModal";
import ClonerCasIncidentsModal from "./ClonerCasIncidentsModal";
class CasIncident extends React.Component {
  el = React.createRef();
  mytable = "Tabulator"; //variable to hold your table
  tableData = [] //data for table to display
  showadvanced = () => {
    this.setState({ displayadvanced: !this.state.displayadvanced })

    this.setState({ displaycalculatriceobjective: false })
  }
  showmodifyadvanced = () => {
    this.setState({ displaymodifyadvanced: !this.state.displaymodifyadvanced })

    this.setState({ displaycalculatriceobjective: false })
  }
  showgetobjective = () => {
    this.setState({ displaycalculatriceobjective: !this.state.displaycalculatriceobjective })
    this.setState({ displayadvanced: false })

  }
  getobjective = () => {
    /* this.setState({
       modal3: !this.state.modal3
     }); */
     //console.log("asma",[{"m_code": this.state.MeasureGetObject[0].m_code, "m_name": this.state.MeasureGetObject[0].m_name}])
    axios.post(window.apiUrl + "getobjective/",

      {

        ML: [{"m_code": this.state.MeasureGetObject[0].m_code, "m_name": this.state.MeasureGetObject[0].m_name}],
        CL: [{
          "Code_Compteur": this.state.CodecompteurObjective,
          "Le_Compteur": this.state.incidentselectedwithoutlive
        }]
      }


    )

      .then(
        (result) => {


          if (result.data !== null) {
          this.state.listobjectivefromDB = result.data;
        //   console.log("this.state.listobjectivefromDB",this.state.listobjectivefromDB)
          // console.log(result.data.length)
          //this.setState({listobjectivefromDB : result.data})

          if (this.state.listobjectivefromDB.length !=0) {
            //  console.log("this.state.MeasureGetObject",this.state.MeasureGetObject)
            //m_name
           const listmesure = [{"measure_ID": this.state.MeasureGetObject[0].measure_ID, "measure_Label": this.state.listobjectivefromDB[0].m_name +":"+this.state.listobjectivefromDB[0].value}]
            //this.setState({ Listmesureenergy: [this.state.listobjectivefromDB[0].m_name + ':' + this.state.listobjectivefromDB[0].value]})
         //  console.log("Listmesureenergy---------------------",this.state.Listmesureenergy)
           
            // this.state.listobjectivefromDB.map((item1, i) => {

              
  
            //   const listmesure = this.state.Listmesureenergy.map((item2, j) => {
            //     if (item2.measure_Label === item1.m_name) {
            //       var x = item2.measure_Label + ':' + item1.value
            //       item2.measure_Label = x
            //       return item2
            //     } else if (item2.measure_Label === item1.m_name + ':0') {
            //       var x = item1.m_name + ':' + item1.value
            //       item2.measure_Label = x
            //       return item2
            //     } else {
            //       if (item2.measure_Label.includes(':')) { return item2; }
            //       else {
            //         var y = item2.measure_Label + ':0'
            //         item2.measure_Label = y
            //         return item2;
            //       }
            //     }
            //   });
              this.setState({ Listmesureenergy: listmesure })

         // console.log('+++++++++++++++++++++++++++++++++++++++++++',this.state.Listmesureenergy)
       //   });

          } else if (this.state.listobjectivefromDB.length === 0) {

          }
          //tabulator

        }}
      )
  }

  callbackValueIncident = (childData) => {
    // console.log("page Incidents",childData[2])
    // console.log("page Incidents U_Compteur",childData[0])
    // console.log("energycompteurselected------------------------------------------------>",childData[8])
    // console.log("MesureList------------------------------------------------>",childData[11])

    // console.log("sys-----------------------------------------***************------->",childData[18])
    this.setState({ U_Compteur: childData[0] });//c
    this.setState({ U_Formule: childData[0] + '=' + childData[14] });/// c
    this.setState({ Compteur_Incident: childData[2] });//c

    this.setState({ Formule: childData[15] });//c

    this.setState({ Parsed_Formule: childData[4] + '=' + childData[15] });//c
    this.setState({ CodecompteurObjective: childData[5] });
    this.setState({ MesureidObjective: childData[6] })
    this.setState({ displaycalculator: childData[7] })
    this.setState({ energycompteurselected: childData[8] })
    this.setState({ incidentselectedwithoutlive: childData[9] })
    this.setState({ Listmesureenergy: childData[10] })
  //  console.log("childData[10]",childData[10])
    this.setState({ MesureList: childData[11] })
    this.setState({ TAG_Formule: childData[12] })
    this.setState({ U_measurelabel: childData[13] })
    this.setState({ Description: childData[0] + '=' + childData[14] })
    this.setState({ FormulewithTildee: childData[16] })
  //  this.setState({dataMaseurCalculatrice:childData[17]})
      this.setState({codeCompterIncidentCalculatrice:childData[18]})
     //   console.log(childData)
    //console.log(childData1)
  }

  callbackAdvancedObjective = (childData) => {

    // console.log('dataaaaaaaaaaaaaaaaaaaaaaaa objectiveeeeeeee')
    console.log("pageCasIncident",childData)
this.setState({dataObjectiveAdvanced:childData[1]})
    // var Uinputobjective = []
    // if(childData[1].length!=0){
    // for (var i = 0; i < childData[1].length; i++) {
    //   const valeur = childData[1][i].valeur
    //   const c = valeur.replace(/'/g, "")
    //   const d = c.replace("and ", "-")
    //   const e = d.replace("(", "")
    //   const f = e.replace(")", "")
     
    //   var valueobj = f
    //   // console.log("valeur", valueobj)
    //   //inclure exclure
    //   var operateurvalue = childData[1][i].operateur
    //   //intervalle ensemble
    //   var keywordvalue = childData[1][i].keyword
    //   //// console.log("operateur", this.state.operateur)
      
    //   Uinputobjective.push(keywordvalue + ' ' + operateurvalue + " Periode " + valueobj + " ")
    // }
    // // console.log(Uinputobjective)
    // if (Uinputobjective.length == 1) {
    //   // console.log(Uinputobjective)
    //   this.setState({
    //     Objectif: [{
    //       "U_inputobjective": 'Objective : ' + Uinputobjective,
    //       "Sys_inputobjective": childData[1]
    //     }]

    //   });
    // } else {
    //   // console.log(Uinputobjective.join('et'))
    //   this.setState({
    //     Objectif: [{
    //       "U_inputobjective": 'Objective : ' + Uinputobjective.join('et '),
    //       "Sys_inputobjective": childData[1]
    //     }]
    //   });
    // }
    // }
    /*   this.setState({
        Objectif: [{
          "U_inputobjective": 'Objective : ' + Uinputobjective.join('et'),
          "Sys_inputobjective": childData[0]
        }]
  
      }); */
    //c
    //this.state.Objectif.push(childData[0])
    //// console.log(childData1)
  }

  callbackmodel = (childData) => {
    this.setState({ displaycalculator: childData })
    // console.log(childData)
    //// console.log(childData1)
  }
  getDate() {
    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  getmaxid() {
    /* this.setState({
      loading: true,
    }) */
    axios.post(window.apiUrl + "sendid/",
      {
        tablename: "Alarme_F_Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        nombermaxcode: 1,
        primaryfield: "Alarme_Code",
        fields: "*",
        content: "*",

      }
    )

      .then(
        (result) => {

          // console.log('resultt data get max code ' + result.data)
          /* this.setState({
            loading: false,
          }) */
          if (result.data == null) {
            alert("N'existe pas max code ");

          } else {

            // var code = result.data
            // console.log(typeof (result.data))
            
            // console.log(result.data)
            // // console.log(JSON.parse(result.data))
            // var array = code.split(",");
            //["A681", "A682", "A683"]
            // // console.log(array)
            // // console.log("Alarme_Code " + code)
            this.setState({ Alarme_Code: result.data })
            // console.log(this.state.Alarme_Code)
          }



        })
  }
  getnameenergy = (c) => {
     //console.log("Energy name",this.state.modal5);
    if (this.state.modal5 == false) {
      // console.log("Energy name");
      axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${c}`)

        .then(
          (result) => {
            //result.data;
            // console.log('data select of this specified energy eeeeeeeeeeeeeeeeee')
            // console.log(result.data);
            //tabulator
            //this.setState({ dataCompteur: result.data })
            var x = ''
            if (result.data !== null) {

              this.setState({ NameEnergy: result.data[0].Energie })
              /////////////////Filter global select list compteur of this energy//////////
              axios1.get(window.apiUrl+`getAllCounters/?energie=${result.data[0].Energie}`)

            
                .then(
                  ({data}) => {
                       
                   var  value =[]
                    Object.keys(data).map((key, ii, aa) => {
                       value = data[key]
              
                       console.log("value maseur avec energie",value)
       
                    })

              
                      this.setState({ listcompteurglobal: value})
               
                  

                  }
                )

}
            //  else {
        
            //   axios.post(window.apiUrl + "filter/",

            //     {
            //       tablename: "AllCompteur",
            //       identifier: this.state.dateDMY + uuid(),
            //       fields: "*",
            //       content: "*",
            //       dataselect: "Code_Compteur;Le_Compteur",
            //       dist: "*",
            //       orderby: "*",
            //     }
            //   )

            //     .then(
            //       (result) => {
            //         this.tableData = result.data;

      
            //         if (this.tableData !== null) {
            //           this.setState({ listcompteurglobal: result.data })
               
            //         } else {
                 
            //         }



            //       }
            //     )
            // }



          }
        )
    }

  }

  handlecompteurselectedchange(event1, event2) {
    this.setState({
      U_compteurselected: event1,
    });
    this.setState({
      Sys_compteurselectedwithoutid: event2,
    });
    // console.log(this.state.U_compteurselected)
    // console.log(this.state.Sys_compteurselectedwithoutid)
  }
  methodtest() {
    // console.log('test')
  }
  getcodecompteur = () => {
    //this.getmaxid();
   if(this.state.listeCompteurPourCloner.length!=0){
    this.setState({ isDisabledbuttonclone: true })
    this.setState({
      modal5: false
    })
    // console.log('hiiiiiiiiiiiiiiiiiii')
    axios1.get(window.apiUrl + "getAllEnergies/")
      .then(
        (result) => {
        
          if (result.data!== null) {




            this.setState({ dataEnergy: result.data })
            var nameenergyinput = this.state.NameEnergy
            var outputprefix = ''
            var inputprefix = ''
            result.data.forEach(function (arrayItem) {
              if (arrayItem.Name_Energy == nameenergyinput) {
                //energylivelist = arrayItem.Energy_LIVEInc_List; //28
                //var y = arrayItem.Code_Energy; //1
                //EMNcode = energylivelist + '_' + y; //28_1

                outputprefix = arrayItem.OUTP_Prefix_Energy;
                inputprefix = arrayItem.INP_Prefix_Energy;
              }

            });
            this.setState({
              CodecompteurObjective: 'O' + this.state.Sys_compteurselectedwithoutid.replace(outputprefix, inputprefix)
            });
            // console.log('code eeeeeeeeeeeeeeee' + this.state.CodecompteurObjective)
            /////////////////////Add row with this new code compteur objective///////////////////
            /////////////////Get max code for each compteur /////////////////////////
            axios.post(window.apiUrl + "sendid/",
              {
                tablename: "Alarme_F_Reporting_V3",
                identifier: this.state.dateDMY + uuid(),
                nombermaxcode: this.state.listeCompteurPourCloner.length,
                primaryfield: "Alarme_Code",
                fields: "*",
                content: "*",

              }
            )

              .then(
                (result) => {

                  // console.log('resultt data get max code ' + result.data)
                  if (result.data == null) {
                    alert("N'existe pas max code ");
                    this.setState({ isDisabledbuttonclone: false })
                  } else {
                    var code = result.data
                    // console.log(typeof (result.data))
                    // console.log(result.data[0])
                    //convert str to array
                    var array = code.split(",");
                    // ["A681", "A682", "A683"]
                    // console.log(array)
                    // console.log("Alarme_Code " + code)
                    this.setState({ Alarme_Code: array })
                    // console.log(this.state.Alarme_Code)
                    /////////////////////////////////////////////////////////////////

                    ///////////////////////////////////////////////
                    for (var i = 0; i < this.state.listeCompteurPourCloner.length; i++) {
                      //////////////////////////////
                      var codecompteur = 'O' + this.state.listeCompteurPourCloner[i].Code_Compteur.replace(outputprefix, inputprefix)
                      var inputprefixcompteur = this.state.listeCompteurPourCloner[i].Code_Compteur.replace(outputprefix, inputprefix)
                      ///add row
                      //this.getmaxid();
                      var Alarme_Code = array[i]

                      ///CC1$28
                      var extractCompteur_Incident = this.state.Compteur_Incident.substring(0, this.state.Compteur_Incident.indexOf("$"))
                      const Compteur_Incident = this.state.Compteur_Incident.replace(extractCompteur_Incident, this.state.listeCompteurPourCloner[i].Code_Compteur)
                      ///CC1$0
                      //// console.log('formuleee'+this.state.Formule)
                      var extractFormule = this.state.Formule.substring(0, this.state.Formule.indexOf("$"))
                      const Formule = this.state.Formule.replace(extractFormule, this.state.listeCompteurPourCloner[i].Code_Compteur)
                      //E1$28=CC1$0~
                      var extractParsed_Formule = this.state.Parsed_Formule.substring(0, this.state.Parsed_Formule.indexOf("$"))
                      const Parsed_Formule = this.state.Parsed_Formule.replace(extractParsed_Formule, inputprefixcompteur);
                      //c
                      const Operateur = this.state.Operateur;
                      //e
                      const Objectifjson = this.state.Objectifjson[0];
                      const Frequency = this.state.Frequency;
                      const Objectif = this.state.Objectifjson[0].U_inputobjective
                      //correct
                      const Next_Check = this.state.Next_Check;
                      //const U_Alarme_Name = this.state.U_Alarme_Name;
                      const U_Alarme_Name = "Alarme "+this.state.listeCompteurPourCloner[i].Le_Compteur;
                      //ElMazeraa Elec$Inc LIVE<O:CC1$0:ElMazeraa Elec_KWh-J
                      if (this.state.Description != '' && this.state.Description != null) {
                        var extractDescription = this.state.Description.substring(0, this.state.Description.indexOf("$"))
                        var Description = this.state.Description.replace(extractDescription, this.state.listeCompteurPourCloner[i].Le_Compteur);//Abattage elec;

                      } else {
                        var Description = this.state.Description
                      }
                      //ElMazeraa Elec$Inc-LIVE
                      var extractnamecompteur = this.state.U_Compteur.substring(0, this.state.U_Compteur.indexOf("$"))
                      const U_Compteur = this.state.U_Compteur.replace(extractnamecompteur, this.state.listeCompteurPourCloner[i].Le_Compteur);//Abattage elec
                      //ElMazeraa Elec$Inc-LIVE=ElMazeraa Elec$KWh-J~
                      var extractU_Formule = this.state.U_Formule.substring(0, this.state.U_Formule.indexOf("$"));
                      const U_Formule = this.state.U_Formule.replace(extractU_Formule, this.state.listeCompteurPourCloner[i].Le_Compteur)
                      //g
                      const Nbr_Error = this.state.Nbr_Error;
                      const TAG_Formule = this.state.TAG_Formule;
                      const DBAction = "2";

                      /////////////////////////////
                      const O1 = JSON.stringify(Objectifjson)
                      const Objectifjsonn = O1.replace(/'/g,"''")
                      // console.log("Objectif",Objectifjsonn)
                      ///////////////////////

                      const F1 = JSON.stringify(Frequency[0])
                      const Frequencywithoutsimplecode = F1.replace(/'/g,"''")
                      // console.log("Frequency",Frequencywithoutsimplecode)
//
//"Alarme"+extractCompteur_Incident
                      this.state.ajout = (
                        {
                          "Alarme_Code": Alarme_Code,
                          "Compteur_Incident": Compteur_Incident,
                          "Formule": Formule,
                          "Parsed_Formule": Parsed_Formule,
                          "Operateur": Operateur,
                          "Objectif":  JSON.parse(Objectifjsonn),
                          "Frequence": JSON.parse(Frequencywithoutsimplecode),
                          "Next_Check": Next_Check,
                          // U_Alarme_Name
                          "U_Alarme_Name": U_Alarme_Name ,
                          "Description": Description,
                          "U_Compteur": U_Compteur,
                          "U_Formule": U_Formule,
                          "Nbr_Error": Nbr_Error,
                          "TAG_Formule": TAG_Formule,
                          "DBAction": DBAction
                        })


                      ////////////////////////////////////////
                      /*Alarme_Code + ";" + Compteur_Incident + ";" +
                      Formule + ";" + Parsed_Formule + ";" +
                      Operateur + ";" + Objectifjson + ";" + Frequency + ";" +
                      Next_Check +
                      ";" + U_Alarme_Name + ";" + Description + ";" + U_Compteur +
                      ";" + U_Formule +
                      ";" + Nbr_Error +
                      ";" + TAG_Formule +
                      ";" + DBAction*/
                      ////////////////////////////////////)

                      this.state.ajoutertemp.push(this.state.ajout);
                      // console.log(this.state.ajoutertemp)
                      const Frequence = this.state.Frequency[0].Frequence.FrequenceUser;
                      const UserInterface = this.state.Frequency[0].UserInterface[0];
                      this.mytable.addRow({
                        Nbr_Error, U_Alarme_Name, U_Compteur, U_Formule, Operateur, Objectif,
                        Frequence, UserInterface, Next_Check
                      }, true);

                      //////////////////////////////////////////

                    }
                    this.setState({ isDisabledbuttonclone: false })

                    ////////////////////////////////////////////////////////////////////////

                  }


                })




            ////////////////////////////////////////////////////////////////////////
            // console.log(this.state.listcompteurglobal.length + '//////////////////////////////')

          } else {
            // console.log('no data change')
          }
        }
      )
    }else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Liste des compteurs vides'
    })
    }
  }
  toggle = nr => () => {
    // console.log('modal number ' + nr)
    if (nr == 3) {
      //this.state.incidentselectedwithoutlive
      if ( this.state.U_Compteur != '') {
        let modalNumber = 'modal' + nr
    
      if (this.state[modalNumber] == false) {
        this.getobjective()
      }
        
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
        
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'Sélectionner compteur s\'il vous plait '
        })

      }
    } else if (nr == 1) { //Nouveau cas incident 
   
      let modalNumber = 'modal' + nr
      // console.log(modalNumber)
      // console.log("hiiiiiiiiiiiii")
      //////////////// Vide tous les champs d'ajout/////////////////
      this.state.U_inputobjective=[];
      this.state.Sys_inputobjective=[];
      this.state.Alarme_Code = "";
      this.state.Compteur_Incident = "";
      this.state.Formule = "";
      this.state.Parsed_Formule = "";
      this.state.Operateur = "";
      this.state.Objectif = "";
      this.state.Frequence = "";
      this.state.Next_Check = "";
      this.state.U_Alarme_Name = "";
      this.state.Description = "";
      this.state.U_Compteur = "";
      this.state.U_Formule = "";
      this.state.Nbr_Error = "0";
      this.state.TAG_Formule = "";
      this.state.valuedropdown = "Type";
       this.state.datamodifier=[]
      // this.state.U_inputobjective="";
      ///////////////////////////////
      this.state.errors = {
        U_Alarme_Name: ' ',
        U_Compteur: ' ',
        U_Formule: ' ',
        valuedropdown: ' ',
        Operateur: ' ',
        Compteur_Incident: ' ',
        Parsed_Formule: ' ',
        Objectif: ' ',
        Frequence: ' ',
        Next_Check: ' ',
        Description: ' ',
      }
      ///////////////////////
      // console.log(this.state[modalNumber])
      if (this.state[modalNumber] == false) {
        this.getmaxid()
      }

      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
      // !this.state[modalNumber]
    } else if (nr == 6) { //Modifier
     
     
        if (this.state.datamodifier.length != 0) {
          this.setState({
            modal6: !this.state.modal6
          })
          this.state.datamodifier.push();
     
          this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
          this.state.Compteur_Incident = this.state.datamodifier[0].Compteur_Incident;
  
          this.state.Formule = this.state.datamodifier[0].Formule;
  
          this.state.Parsed_Formule = this.state.datamodifier[0].Parsed_Formule;
          this.state.Operateur = this.state.datamodifier[0].Operateur;
          if (this.state.Operateur == "A") {
  
            this.state.displaymodifyadvanced = true;
            this.state.displaycalculatriceobjective = false;
            this.state.sendtoModifyObjectiveAdvanced = this.state.datamodifier[0].Objectifjson[0].Sys_inputobjective
         
  
  
          } else {
            this.state.displaymodifyadvanced = false;
            this.state.displaycalculatriceobjective = true;

            this.state.U_inputobjective = [this.state.datamodifier[0].Objectifjson[0].U_inputobjective]
            this.state.U_inputobjective =this.state.U_inputobjective.join('')
         
          }
          this.state.valuedropdown = this.state.datamodifier[0].Operateur;
          this.state.Objectif = this.state.datamodifier[0].Objectifjson;
          this.state.Next_Check = this.state.datamodifier[0].Next_Check;
  
          this.state.U_Alarme_Name = this.state.datamodifier[0].U_Alarme_Name;
          this.state.Description = this.state.datamodifier[0].Description;
          this.state.U_Compteur = this.state.datamodifier[0].U_Compteur;
  
          this.state.U_Formule = this.state.datamodifier[0].U_Formule;
          this.state.Nbr_Error = this.state.datamodifier[0].Nbr_Error;
          this.state.TAG_Formule = this.state.datamodifier[0].TAG_Formule;
          this.state.Frequency = this.state.datamodifier[0].Frequency;
  
          this.state.position = this.state.datamodifier[1];
          this.state.periode = this.state.datamodifier[0].Frequency[0].Frequence.Periode;
          this.state.TempsUnite = this.state.datamodifier[0].Frequency[0].Frequence.UniteTemp;
          this.state.num = this.state.datamodifier[0].Frequency[0].Frequence.NbUnite;
          this.state.OperateurValueModifier=this.state.datamodifier[0].OperateurValue;

          console.log("mooooddddiiiiffffiiiier",this.state.U_inputobjective)

        this.state.Sys_inputobjective=this.state.datamodifier[0].Objectifjson[0].Sys_inputobjective
          console.log(" this.state.Compteur_Incident ", this.state.Compteur_Incident )
          console.log(" this.state.Formule ", this.state.Formule )
          console.log(" this.state.U_Formule ",  this.state.U_Formule  )
          console.log(" this.state.U_Compteur ", this.state.U_Compteur )
          console.log(" this.state.Parsed_Formule ", this.state.Parsed_Formule )
          console.log(" this.state.TAG_Formule ", this.state.TAG_Formule )
          var compteurwithoutid = this.state.datamodifier[0].Compteur_Incident.substring(0, this.state.datamodifier[0].Compteur_Incident.indexOf("$"))
     
          axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${compteurwithoutid}`
        ).then(
          (result) => {
  
  
  
            if (result.data !== null) {
          //     console.log("getEnergyFromCounters",result.data)
              var energycompteurselected = result.data[0]["Energie"]

              this.setState({energycompteurselected:energycompteurselected})        

                      this.state.CodecompteurObjective = 'O' + compteurwithoutid.replace(result.data[0]["OUTP_Prefix_Energy"], result.data[0]["INP_Prefix_Energy"])
            //         console.log(this.state.CodecompteurObjective)
                    this.state.incidentselectedwithoutlive = this.state.datamodifier[0].U_Compteur.substring(0, this.state.datamodifier[0].U_Compteur.indexOf("$"))
                    ///////////////
                    axios1.get(window.apiUrl+`getMLByEnergy/?energies=${energycompteurselected}`)
  
  
                .then(
                  ({data}) => {

                 var value=[]
                    Object.keys(data).map((key, ii, aa) => {
                       value = data[key]
             //         console.log("value maseur avec energie",value)
                  })
                  
                  
                      var mesurelist = []
                      var listmesureenergy = []
                     value.forEach(function (arrayItem) {
                       
                          var x = arrayItem.measure_ID; //1
                          var y = arrayItem.measure_Label; //kwh
                          var z = arrayItem.EMNCode; //2-1
                          
                          listmesureenergy.push({
                            "measure_ID": x,
                            "measure_Label": y
                          })
                          mesurelist.push({
                            "m_code": z,
                            "m_name": y
                          })
                        
                      })
                 
                    
                      this.state.MesureList = mesurelist
                      this.state.Listmesureenergy = listmesureenergy
                   //    console.log(mesurelist)
                    //   console.log(listmesureenergy)
                  
                  })
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
            width: 400,
            title: 'Sélectionner pour le modifier'
          })
        }

      
     
     
      
     
    } else if (nr == 5) { //Cloner

      if (this.state.datamodifier.length != []) {
        this.setState({
          modal5: !this.state.modal5
        })
        this.state.datamodifier.push();
        // console.log(this.state.datamodifier)
        this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
        this.state.Compteur_Incident = this.state.datamodifier[0].Compteur_Incident;
        // console.log('formule' + this.state.Formule)
        // console.log('formule' + this.state.datamodifier[0].Formule)
        this.state.Formule = this.state.datamodifier[0].Formule;

        this.state.Parsed_Formule = this.state.datamodifier[0].Parsed_Formule;
        this.state.Operateur = this.state.datamodifier[0].Operateur;
        this.state.valuedropdown = this.state.datamodifier[0].Operateur;
        this.state.Objectif = this.state.datamodifier[0].Objectif;
        this.state.Objectifjson = this.state.datamodifier[0].Objectifjson;

        this.state.Next_Check = this.state.datamodifier[0].Next_Check;

        this.state.U_Alarme_Name = this.state.datamodifier[0].U_Alarme_Name;
        this.state.Description = this.state.datamodifier[0].Description;
        this.state.U_Compteur = this.state.datamodifier[0].U_Compteur;

        this.state.U_Formule = this.state.datamodifier[0].U_Formule;
        this.state.Nbr_Error = this.state.datamodifier[0].Nbr_Error;
        this.state.TAG_Formule = this.state.datamodifier[0].TAG_Formule;
        this.state.Frequency = this.state.datamodifier[0].Frequency;

        this.state.position = this.state.datamodifier[1];
        // console.log(this.state.Compteur_Incident)
        var res = this.state.Compteur_Incident.substring(0, this.state.Compteur_Incident.indexOf("$"))
        // console.log('code compteurrrrrrrrrrr' + res)
        this.getnameenergy(res);
      }
      else {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'Sélectionner pour le cloner'
        })
      }
    } else if (nr == 8) { //cloner objective
      if (this.state.datamodifier.length != []) {
        this.setState({
          modal8: !this.state.modal8
        })
        this.state.datamodifier.push();
        // console.log(this.state.datamodifier)
        this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
        this.state.Compteur_Incident = this.state.datamodifier[0].Compteur_Incident;
        // console.log('formule' + this.state.Formule)
        // console.log('formule' + this.state.datamodifier[0].Formule)
        this.state.Formule = this.state.datamodifier[0].Formule;

        this.state.Parsed_Formule = this.state.datamodifier[0].Parsed_Formule;
        this.state.Operateur = this.state.datamodifier[0].Operateur;
        this.state.valuedropdown = this.state.datamodifier[0].Operateur;
        this.state.Objectif = this.state.datamodifier[0].Objectif;
        this.state.Objectifjson = this.state.datamodifier[0].Objectifjson;

        this.state.Next_Check = this.state.datamodifier[0].Next_Check;

        this.state.U_Alarme_Name = this.state.datamodifier[0].U_Alarme_Name;
        this.state.Description = this.state.datamodifier[0].Description;
        this.state.U_Compteur = this.state.datamodifier[0].U_Compteur;

        this.state.U_Formule = this.state.datamodifier[0].U_Formule;
        this.state.Nbr_Error = this.state.datamodifier[0].Nbr_Error;
        this.state.TAG_Formule = this.state.datamodifier[0].TAG_Formule;
        this.state.Frequency = this.state.datamodifier[0].Frequency;

        this.state.position = this.state.datamodifier[1];
        // console.log(this.state.Compteur_Incident)
        var codecompteurCC = this.state.Compteur_Incident.substring(0, this.state.Compteur_Incident.indexOf("$"))
        var namecompteur = this.state.U_Compteur.substring(0, this.state.U_Compteur.indexOf("$"))
        //var codecompteur=''
        //'O'+res.replace(outputprefix, inputprefix)

        /* if(codecompteur != ''){
          this.getobjectivecloneobjective(codecompteur, namecompteur)
        } */
        // console.log('code compteurrrrrrrrrrr : ' + codecompteurCC)
        // console.log('name compteurrrrrrrrrrr : ' + namecompteur)
        this.getnameenergycloneobjective(codecompteurCC, namecompteur);
      }
      else {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'Sélectionner pour cloner l\'objective'
        })
      }
    } else {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
  }

  componentcalculator = () => {
    this.setState({
      displaycalculator: !this.state.displaycalculator,
    });
    // console.log('calll')
    // console.log(this.state.displaycalculator)
  }
  onClickHandler = event => {
    const valuedropdownn = event.target.innerHTML;
    // console.log(valuedropdownn)
    if (valuedropdownn == 'AVANCÉE') {
      // console.log(this.state.Operateur)
      this.setState({ Operateur: 'A' })
      this.setState({ valuedropdown: 'A' })
      this.setState({ displayadvanced: true })

      this.setState({ displaycalculatriceobjective: false })
      //this.showadvanced();
      //this.setState({ operatoradvanced: !this.state.operatoradvanced })
      //this.setState({ operatorlogic: false })
    } else {
      // console.log(valuedropdownn)
      const valuedropdownnn = valuedropdownn.replace("&gt;", '>').replace("&lt;", '<').replace("&amp;", '&')
      // console.log(valuedropdownnn)
      this.setState({ Operateur: valuedropdownnn })
      this.setState({ valuedropdown: valuedropdownnn })
      this.setState({ displayadvanced: false })

      this.setState({ displaycalculatriceobjective: true })
      // console.log(this.state.Operateur)

    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    var $ = require("jquery");
    // console.log(e.target.value)
    if (e.target.value == "Temps_Reel") {

      $('#vide').hide();
      $('#Temps_Reel').show();
      $('#numTemps_Reel').show();
      $('#Journalier').hide();
      $('#numJournalier').hide();
      $('#Hebdomadaire').hide();
      $('#numHabdomadaire').hide();
      $('#Mensuel').hide();
      $('#numMensuel').hide();
      $('#Annelle').hide();
      $('#numAnnelle').hide();
      this.state.TempsUnite = this.state.Temps_Reel_unite

    }
    if (e.target.value == "Journalier") {

      $('#vide').hide();
      $('#Temps_Reel').hide();
      $('#numTemps_Reel').hide();
      $('#Journalier').show();
      $('#numJournalier').show();
      $('#Hebdomadaire').hide();
      $('#numHabdomadaire').hide();
      $('#Mensuel').hide();
      $('#numMensuel').hide();
      $('#Annelle').hide();
      $('#numAnnelle').hide();
      this.state.TempsUnite = this.state.Journalier_unite
    }
    if (e.target.value == "Hebdomadaire") {

      $('#vide').hide();
      $('#Temps_Reel').hide();
      $('#numTemps_Reel').hide();
      $('#Journalier').hide();
      $('#numJournalier').hide();
      $('#Hebdomadaire').show();
      $('#numHabdomadaire').show();
      $('#Mensuel').hide();
      $('#numMensuel').hide();
      $('#Annelle').hide();
      $('#numAnnelle').hide();
      this.state.TempsUnite = this.state.Habdomadaire_unite
    }
    if (e.target.value == "Mensuel") {

      $('#vide').hide();
      $('#Temps_Reel').hide();
      $('#numTemps_Reel').hide();
      $('#Journalier').hide();
      $('#numJournalier').hide();
      $('#Hebdomadaire').hide();
      $('#numHabdomadaire').hide();
      $('#Mensuel').show();
      $('#numMensuel').show();
      $('#Annelle').hide();
      $('#numAnnelle').hide();
      this.state.TempsUnite = this.state.Mensuel_unite
    }
    if (e.target.value == "Annelle") {

      $('#vide').hide();
      $('#Temps_Reel').hide();
      $('#numTemps_Reel').hide();
      $('#Journalier').hide();
      $('#numJournalier').hide();
      $('#Hebdomadaire').hide();
      $('#numHabdomadaire').hide();
      $('#Mensuel').hide();
      $('#numMensuel').hide();
      $('#Annelle').show();
      $('#numAnnelle').show();
      this.state.TempsUnite = this.state.Annelle_unite
    }

  }
  handleClick() {
    this.setState(state => ({
      displaysetobjective: !state.displaysetobjective
    }));
  }
  sendData = (param) => {

    this.props.parentCallback(param);
    //this.props.
    // console.log(param)
    this.setState({ prevvalue: param });
    //this.setState({ typeprevvalue: param });

    //// console.log(parentCallback)
  }
  sendDatatocalculatrice = () => {
    // console.log('hi No error')
    this.props.valuecalculatricecallback({

      0: 'this.state.U_Compteur',//ELMAZERAA ELEC$LIVE INC
      1: this.state.Compteur_Incident,//CC1$28

    })

  }
  sendDatatoAdvancedobjective = () => {
    /* this.props.valuetoAdvancedobjective([
      this.state.MesureList,//ELMAZERAA ELEC$LIVE INC
      this.state.CodecompteurObjective,//CC1$28
      this.state.incidentselectedwithoutlive,
      this.state.Listmesureenergy,
    ]
    ) */
  }
  updateDate(newDate) {

    this.setState({
      Next_Check: newDate = Moment(newDate).format('DD/MM/YYYY HH:mm:ss'),

    });
    // console.log(this.state.Next_Check)

  }

  constructor(props) {
    super(props)
    this.state = {
      //////cloner opjective /////
      isDisabledbutton: false,
      isDisabledbuttonclone: false,
      outputprefixx: "",
      inputprefixx: "",
      loading: true,
      modal: false,
      modal1: false,//Nouveau cas incident Add form
      modal2: false, //Calculatrice
      modal3: false, //Objective
      modal4: false,//sel objective
      modal5: false,//Cloner
      modal6: false,//Modifier
      modal7: false,// pour supp
      modal8: false,// pour clone objective
      sendtoModifyObjectiveAdvanced: [],
      FormulewithTildee: '',
      operator: ['<', '>', '<=', '>=', '=', '!='],
      operatoradvanced: false,
      operatorlogic: false,
      Nbr_Error: '0',
      U_Alarme_Name: '',

      Description: '',
      Operateur: '',

      Objectif: '',
      Objectifjson: '',

      Frequency: '', //field frequence in the table

      Next_Check: '',

      Alarme_Code: '',
      Compteur_Incident: '',
      Formule: '',
      U_Compteur: '',
      U_Formule: '',
      TAG_Formule: '',

      CodecompteurObjective: '',
      CodecompteurObjectivevalue: '',
      MesureidObjective: '',
      displaysetobjective: false,
      energycompteurselected: '',

      Sys_compteurselectedwithoutid: '',
      U_compteurselected: '',
      ///////////////////////
      ListSetobjective: [],
      //////////////////////
      incidentselectedwithoutlive: '',
      Listmesureenergy: [], //10
      dataEnergy: [],
      MesureList: [],
      Parsed_Formule: '',
      valuedropdown: 'Type',
      btn0: '0',
      btn1: '1',
      btn2: '2',
      btn3: '3',  
      btn4: '4',
      btn5: '5',
      btn6: '6',
      btn7: '7',
      btn8: '8',
      btn9: '9',
      btnaddition: '+',
      btnvirgule: '.',
      //Filter
      NameEnergy: '',
      Compteur_Parent: '',
      secteur: '',
      pointproduction: '',
      pointdistribution: '',
      pointconsommation: '',
      listcompteurParent: [],
      listsecteur: [],
      listpointproduction: [],
      listpointdistribution: [],
      listpointconsommation: [],
      ///
      //Result Filter
      listcompteurglobal: [],
      listfieldfiltername: [],
      listfieldfiltercontent: [],
      ///Objective
      U_measurelabel: '',
      U_inputobjective: '',
      objectifValeurInput:'',
      Sys_inputobjective: [],
      listobjectivefromDB: [],
      indexmesure: '',
      valuetomesure: '',
      objectivechoixselected: '',
      displaycalculatriceobjective: false,
      displayadvanced: false,
      displaymodifyadvanced: false,
      Objectif_tab: "",
      OperateurValueObjectif_tab: "",
      UserInterfaceObjectif_tab: "",
  
      ////Frequence ///////////////////
      Frequence_tab: "",
      OperateurValue_tab: "",
      UserInterface_tab: "",

      dataCasIncident: [],
      position: null,

      Frequence: '', //data return from db
      periode: "",
      TempsUnite: "",
      Temps_Reel_unite: 'Min',
      Journalier_unite: 'Heure',
      Habdomadaire_unite: 'Jour',
      Mensuel_unite: 'Jour',
      Annelle_unite: 'Mois',
          //////////
          num:1,
          numTemps_Reel:1,
          numJournalier:1,
          numHabdomadaire:1,
          numMensuel:1,
          numAnnelle:1,
    
      //Supprim
      supprimertemp: [],
      modificationtemp: [],

      ////////////Modifier/////////////////
      datamodifier: [],
      //////
      ////////Ajouter//////////
      ajout: "",
      ajoutertemp: [],
      ajoutertap: [],
      modifiertab:[],
      ajouterUserInterface: [],
      valeur2: "",
      operateur2: "",
      operateurvalue: "",
      /////////////////
      dataMaseurCalculatrice:"",
      //////////////////
      errors: {
        U_Alarme_Name: '* Obligatoire',
        U_Compteur: '* Obligatoire',
        U_Formule: '* Obligatoire',
        valuedropdown: '* Obligatoire',
        Operateur: '* Obligatoire',
        Compteur_Incident: '* Obligatoire',
        Parsed_Formule: '* Obligatoire',
        Objectif: '* Obligatoire',
        Frequence: '* Obligatoire',
        Next_Check: '* Obligatoire',
        Description: '* Obligatoire',
     
        //operateur
        //getobjective
        //
      },
      //////
      MeasureGetObject:[],
      modalFilterMesure:false,
      modalFilterMesure3:false,
      modalFilterMesure5:false,
      modalFilterMesure7:false,
      listeCompteurPourCloner:[],
      codeCompterIncidentCalculatrice:"",
      OperateurValueModifier:[],
      modifierUserInterface:[],
      dataObjectiveAdvanced:[],
      ////////
      Next_Check: null,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),

    }
    this.handleChange = this.handleChange.bind(this);
    this.handlecompteurselectedchange = this.handlecompteurselectedchange.bind(this);
    this.getcodecompteur = this.getcodecompteur.bind(this);
    this.showadvanced = this.showadvanced.bind(this);
    this.showmodifyadvanced = this.showmodifyadvanced.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    // this.showLogique = this.showLogique.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sendDatatocalculatrice = this.sendDatatocalculatrice.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.showgetobjective = this.showgetobjective.bind(this);
    //this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendsetobjective = this.sendsetobjective.bind(this);
    this.getobjective = this.getobjective.bind(this);
    this.onClick = this.onClick.bind(this);
    //filter
    // this.filtercompteurparent = this.filtercompteurparent.bind(this);
    // this.filtersecteur = this.filtersecteur.bind(this)
    // this.filterpointproduction = this.filterpointproduction.bind(this);
    // this.filterpointdistrubition = this.filterpointdistrubition.bind(this);
    // this.filterpointconsommation = this.filterpointconsommation.bind(this);
    ////
    //Objective
    this.addvaluetomesue = this.addvaluetomesue.bind(this);
    this.getindexmesue = this.getindexmesue.bind(this);
    this.handlemesureselectedchange = this.handlemesureselectedchange.bind(this);
    this.Annulersendsetobjective = this.Annulersendsetobjective.bind(this);
  //  this.addUinputobjective = this.addUinputobjective.bind(this);
    this.clearequation = this.clearequation.bind(this);
    this.deleteequation = this.deleteequation.bind(this);

    //clone
    this.getindexcompteur = this.getindexcompteur.bind(this);
    this.deleteitemfromlistg = this.deleteitemfromlistg.bind(this);
    this.copieralarme = this.copieralarme.bind(this);
    this.getnameenergy = this.getnameenergy.bind(this);

    ////////////Clone Objective//////////////////
    this.getnameenergycloneobjective = this.getnameenergycloneobjective.bind(this);
    this.getobjectivecloneobjective = this.getobjectivecloneobjective.bind(this)
    this.clonerobjective = this.clonerobjective.bind(this)
  }

  ///////////////////////////////////////////////
  enableSpinner = () => {
    this.setState({
      loading: true,
    });
  }

  disableSpinner = () => {
    this.setState({
      loading: false,
    })
  }
  ////////////Clone Objective//////////////////
  getobjectivecloneobjective = (energie, codecompteurCC, namecompteur) => {

    axios.post(window.apiUrl + "display/",

      {
        tablename: "Energy",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }


    )

      .then(
        (result) => {

          // console.log('Energy')
          // console.log(result.data)
          //tabulator
          if (result.data !== null) {
            // this.setState({ dataEnergy: result.data })
            //var datalist = this.state.listNameEnergy
            var outputprefix = ''
            var inputprefix = ''
            var codecompteurwithinputprefix = ''
            result.data.forEach(function (arrayItem) {
              if (arrayItem.Name_Energy == energie) {
                //energylivelist = arrayItem.Energy_LIVEInc_List; //28
                //var y = arrayItem.Code_Energy; //1
                ///EMNcode = energylivelist + '_' + y; //28_1
                outputprefix = arrayItem.OUTP_Prefix_Energy;
                inputprefix = arrayItem.INP_Prefix_Energy;
                // console.log('hiiiiiiiiiiiiiiiiiiiiiiii')
                // console.log(outputprefix + inputprefix)

                // this.setState({outputprefixx: outputprefix})
                //this.setState({inputprefixx: inputprefix })
              }

            })
            // console.log(this.state.outputprefixx)
            this.setState({ outputprefixx: outputprefix })
            this.setState({ inputprefixx: inputprefix })
            // console.log(this.state.outputprefixx)
            codecompteurwithinputprefix = 'O' + codecompteurCC.replace(outputprefix, inputprefix)
            //////// Get mesure list and send query get objective/////
            axios.post(window.apiUrl + "display/",

              {
                tablename: "EnergyMeasureNormalised",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*"
              }


            )

              .then(
                (result) => {
                 
                  // console.log('EnergyMeasureNormalized')
                  if (result.data.length !== 0) {
                 //   console.log("EnergyMeasureNormalised",result.data)
                    //this.setState({ dataEnergyMeasure: result.data })
                    //tabulator
                    var nameenergyinput = this.state.NameEnergy
                 //   console.log("nameenergyinput",nameenergyinput)
                    var mesurelist = []
                    result.data.forEach(function (arrayItem) {

                      if (arrayItem.measure_Energy == nameenergyinput) {
                        var x = arrayItem.measure_ID; //1
                        var y = arrayItem.measure_Label; //kwh
                        var z = arrayItem.EMNCode; //2-1
                        
                        //mesurelabel = y
                        /* listmesureenergy.push({
                          "measure_ID":x,
                          "measure_Label":y}) */
                        mesurelist.push({
                          "m_code": z,
                          "m_name": y
                        })
                      }
                    })
           
                    /////////////////send query get objective/////////
                    if (mesurelist != []) {
                      ///////know find code compteur with input prefix


                      axios.post(window.apiUrl + "getobjective/",

                        {

                          identifier: this.state.dateDMY + uuid(),
                          ML: mesurelist,
                          CL: [{
                            "Code_Compteur": codecompteurwithinputprefix,
                            "Le_Compteur": namecompteur,
                          }]
                        }


                      )

                        .then(
                          (result) => {
                            this.state.listobjectivefromDB = result.data;
                            // console.log('Get OBJECTIVE from database')
                            // console.log(result.data)

                            // console.log(this.state.listobjectivefromDB.length)
                            // console.log(result.data.length)
                            //this.setState({listobjectivefromDB : result.data})

                            if (/*  prevState.listobjectivefromDB !== this.state.listobjectivefromDB && */
                              this.state.listobjectivefromDB.length > 1) {
                              //m_name
                              this.state.listobjectivefromDB.map((item1, i) => {
                                const listmesure = this.state.Listmesureenergy.map((item2, j) => {

                                  if (item2.measure_Label === item1.m_name) {
                                    //var x = item2.measure_Label.substring(0, item2.measure_Label.indexOf(item1.m_name)+1)
                                    var x = item2.measure_Label + ':' + item1.value
                                    //var x = item2.measure_Label.replace(/[^:]*$/g,item1.value)
                                    // console.log('extractttttttttttt')
                                    // console.log(item1.m_name)
                                    // console.log(item2.measure_Label)
                                    // console.log(item2.measure_Label.indexOf(item1.m_name))
                                    // console.log(x)
                                    //item2.replace(/[^:]*$/g,item1.value)
                                    //// console.log(x + item1.value)
                                    item2.measure_Label = x


                                    return item2
                                  } else if (item2.measure_Label === item1.m_name + ':0') {
                                    var x = item1.m_name + ':' + item1.value
                                    // console.log('extractttttttttttt if ')
                                    // console.log(item1.m_name)
                                    // console.log(item2.measure_Label)
                                    //// console.log(item2.measure_Label.indexOf(item1.m_name))
                                    // console.log(x)
                                    item2.measure_Label = x
                                    return item2
                                  } else {
                                    if (item2.measure_Label.includes(':')) { return item2; }
                                    else {
                                      var y = item2.measure_Label + ':0'
                                      item2.measure_Label = y
                                      return item2;
                                    }
                                  }
                                });
                                this.setState({ Listmesureenergy: listmesure })


                              });
                            } else if (this.state.listobjectivefromDB.length === 0) {

                            }
                            //tabulator

                          }
                        )
                    }
                    ///////////////////////




                  } else {
                    // console.log('no data change')
                  }
                }
              )
            ///////

          } else {
            // console.log('no data change')
          }
        }
      )

  }
  getnameenergycloneobjective = (c, namecompteur) => {

    // console.log("Energy name");
    axios.post(window.apiUrl + "filter/",

      {
        tablename: "AllCompteur",
        identifier: this.state.dateDMY + uuid(),
        fields: "Code_Compteur",
        content: c,
        dataselect: "Energie",
        dist: "dist",
        orderby: "desc",
      }


    )

      .then(
        (result) => {
          //result.data;
          // console.log('data select of this specified energy eeeeeeeeeeeeeeeeee')
          // console.log(result.data);
          //tabulator
          //this.setState({ dataCompteur: result.data })
          var x = ''
          if (result.data !== null) {
            ///retourne typr of energy exemple Electrique
            this.setState({ NameEnergy: result.data[0].Energie })
            this.getobjectivecloneobjective(result.data[0].Energie, c, namecompteur)
            /////////////////Filter global select list compteur of this energy//////////
            axios.post(window.apiUrl + "filter/",

              {
                tablename: "AllCompteur",
                identifier: this.state.dateDMY + uuid(),
                fields: "Energie",
                content: result.data[0].Energie,
                dataselect: "Code_Compteur;Le_Compteur",
                dist: "*",
                orderby: "*",
              }
            )

              .then(
                (result) => {
            

                  //tabulator
                  //this.setState({ dataCompteur: result.data })
                  // console.log('result data global list compteur with energy. ')
                  // console.log('data' + this.tableData + 'data')
                  if (result.data !== null) {
                    this.setState({ listcompteurglobal: result.data })
                    // console.log("data filter");
                    // console.log(this.state.listcompteurglobal)
                  } else {
                    // console.log('no data change')
                  }



                }
              )


          } else {
            // console.log('no data change')
            axios.post(window.apiUrl + "filter/",

              {
                tablename: "AllCompteur",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",
                dataselect: "Code_Compteur;Le_Compteur",
                dist: "*",
                orderby: "*",
              }
            )

              .then(
                (result) => {
               //   this.tableData = result.data;

                  //tabulator
                  //this.setState({ dataCompteur: result.data })
                  // console.log('result data global list compteur. ')
                  // console.log('data' + this.tableData + 'data')
                  if (result.data !== null) {
                    this.setState({ listcompteurglobal: result.data })
                    // console.log("data filter");
                    // console.log(this.state.listcompteurglobal)
                  } else {
                    // console.log('no data change')
                  }



                }
              )
          }



        }
      )


  }

  clonerobjective = () => {
    //this.state.ListSetobjective.push([])
    //// i willl find measure id of this energy
    // console.log('cloner objective en cours')
    // console.log(this.state.NameEnergy)

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Energy",
        identifier: this.state.dateDMY + uuid(),
        fields: "Name_Energy",
        content: this.state.NameEnergy,
        dataselect: "Energy_LIVEInc_List;Code_Energy",
        dist: "*",
        orderby: "*",
      }
    )

      .then(
        (result) => {


          //tabulator

          //this.setState({ dataCompteur: result.data })
          // console.log('return emn code. ')
          // console.log(result.data)
          if (result.data !== null) {
            // console.log(result.data)
            var EMNCode = result.data[0].Energy_LIVEInc_List + '_' + result.data[0].Code_Energy
            // console.log(EMNCode)
            axios.post(window.apiUrl + "filter/",

              {
                tablename: "EnergyMeasureNormalised",
                identifier: this.state.dateDMY + uuid(),
                fields: "EMNCode",
                content: EMNCode,
                dataselect: "measure_ID",
                dist: "dist",
                orderby: "desc",
              }
            )

              .then(
                (result) => {

                  // console.log('return mesure id. ')
                  // console.log(result.data)
                  if (result.data !== null) {
                    // console.log(result.data)
                    // console.log(this.state.outputprefixx)
                    // console.log(this.state.inputprefixx)
                    if (this.state.outputprefixx != '' && this.state.inputprefixx != '') {
                      var mesureid = result.data[0].measure_ID
                      var listsetobjectiveinit = []
                      /////////////////////////////////////////////////////////////


                      this.state.listobjectivefromDB.map((item1, i) => {
                        this.state.listcompteurglobal.map((item2, j) => {
                          ////

                          var CodecompteurObjectivewithO = 'O' + item2.Code_Compteur.replace(this.state.outputprefixx, this.state.inputprefixx)

                          listsetobjectiveinit.push({
                            "cc_m": CodecompteurObjectivewithO + ',' + mesureid,
                            //this.state.CodecompteurObjective+','+this.state.MesureidObjective,
                            "value": item1.value,
                          })


                          /////


                        });
                      });
                      // console.log('List set Objectiveeeeee')
                      // console.log(listsetobjectiveinit)
                      this.setState({ ListSetobjective: listsetobjectiveinit })
                      this.sendsetobjective();
                      this.setState({ modal8: !this.state.modal8 })
                      Swal.fire({
                        toast: true,
                        position: 'top',

                        showConfirmButton: false,
                        timer: 4000,
                        icon: 'success',
                        width: 400,
                        title: 'La liste des compteurs filtrés est clonée.'
                      })
                    }








                    /////////////////////////////////////////////////////////////


                  } else {
                    // console.log('no data change')
                  }



                }
              )


          } else {
            // console.log('no data change')
          }



        }
      )

    //////

  }
  /////////////////////////////
  copieralarme = () => {

    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      // console.log(this.state.datamodifier)
      //next
      //this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
      //this.getmaxid();



      //// console.log(Alarme_Code)
      this.setState({ isDisabledbutton: true })

      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Alarme_F_Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Alarme_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {

            // console.log('resultt data get max code ' + result.data)
            /* this.setState({
              loading: false,
            }) */
            if (result.data == null) {
              alert("N'existe pas max code ");

            } else {

              var code = result.data
              // console.log(typeof (result.data))
              // console.log(result.data[0])

              var array = code.split(",");
              // ["A681", "A682", "A683"]
              // console.log(array)
              // console.log("Alarme_Code " + code)
              this.setState({ Alarme_Code: array })
              // console.log(this.state.Alarme_Code)

              /////////////////////////////////////
              this.state.Compteur_Incident = this.state.datamodifier[0].Compteur_Incident;

              this.state.Formule = this.state.datamodifier[0].Formule;

              this.state.Parsed_Formule = this.state.datamodifier[0].Parsed_Formule;
              this.state.Operateur = this.state.datamodifier[0].Operateur;
              this.state.valuedropdown = this.state.datamodifier[0].Operateur;
              this.state.Objectif = this.state.datamodifier[0].Objectif;
              this.state.Objectifjson = this.state.datamodifier[0].Objectifjson;
              this.state.Next_Check = this.state.datamodifier[0].Next_Check;

              this.state.U_Alarme_Name = 'copie ' + this.state.datamodifier[0].U_Alarme_Name;
              this.state.Description = this.state.datamodifier[0].Description;
              this.state.U_Compteur = this.state.datamodifier[0].U_Compteur;

              this.state.U_Formule = this.state.datamodifier[0].U_Formule;
              this.state.Nbr_Error = this.state.datamodifier[0].Nbr_Error;
              this.state.TAG_Formule = this.state.datamodifier[0].TAG_Formule;
              this.state.Frequency = this.state.datamodifier[0].Frequency;
              this.state.Frequence = this.state.datamodifier[0].Frequence;
              this.state.position = this.state.datamodifier[1];
              // console.log(this.state.Compteur_Incident)

              const Alarme_Code = this.state.Alarme_Code[0];

              const Compteur_Incident = this.state.Compteur_Incident;

              const Formule = this.state.Formule;
              //c
              const Parsed_Formule = this.state.Parsed_Formule;
              //c
              const Operateur = this.state.Operateur;
              //e
              const Objectif = JSON.stringify(this.state.Objectif);
              const Objectifjson = this.state.Objectifjson[0];
              const Frequency = this.state.Frequency[0];
              //correct
              const Next_Check = this.state.Next_Check;
              const U_Alarme_Name = this.state.U_Alarme_Name;
              //e
              const Description = this.state.Description;
              //c
              const U_Compteur = this.state.U_Compteur;
              const U_Formule = this.state.U_Formule;
              const Nbr_Error = this.state.Nbr_Error;
              const TAG_Formule = this.state.TAG_Formule;
              const DBAction = "2";
              /////////////////////////////
              const O1 = JSON.stringify(Objectifjson)
              const Objectifjsonn = O1.replace(/'/g,"''")
              // console.log("Objectif",Objectifjson)
              /////////////////////
              const F1 = JSON.stringify(Frequency)
              const Frequencywithoutsimplecode = F1.replace(/'/g,"''")
              // console.log("Frequency",Frequencywithoutsimplecode)
              ////////////////////////////
              this.state.ajout = (
                {
                  "Alarme_Code": Alarme_Code,
                  "Compteur_Incident": Compteur_Incident,
                  "Formule": Formule,
                  "Parsed_Formule": Parsed_Formule,
                  "Operateur": Operateur,
                  "Objectif": JSON.parse(Objectifjsonn),
                  "Frequence": JSON.parse(Frequencywithoutsimplecode),
                  "Next_Check": Next_Check,
                  "U_Alarme_Name": U_Alarme_Name,
                  "Description": Description,
                  "U_Compteur": U_Compteur,
                  "U_Formule": U_Formule,
                  "Nbr_Error": Nbr_Error,
                  "TAG_Formule": TAG_Formule,
                  "DBAction": DBAction
                })
              this.state.ajoutertemp.push(this.state.ajout);
              // console.log(Objectif)
              console.log("this.state.ajoutertemp", this.state.ajoutertemp)
              const Frequence = this.state.Frequency[0].Frequence.FrequenceUser;
              // console.log("Frequence", Frequence)
              const UserInterface = this.state.Frequency[0].UserInterface[0];
              //const UserInterface = this.state.Frequency[0].UserInterface
              // console.log("UserInterface", UserInterface)
              // console.log(this.state.ajout)

              this.mytable.addRow({
                Nbr_Error, U_Alarme_Name, U_Compteur, U_Formule, Operateur, Objectif,
                Frequence, UserInterface, Next_Check
              }, true);

              this.setState({ isDisabledbutton: false })


            }



          })
      /* if (Alarme_Code != '') {
      } */



    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Sélectionner pour le copier'
      })
    }


  }

  deleteitemfromlistg() {
    //console.log('index'+this.state.indexmesure)
    this.state.listcompteurglobal.splice(this.state.indexmesure, 1);
    // console.log(this.state.listcompteurglobal);
    this.setState({ modal7: !this.state.modal7 })
  }
  getindexcompteur(event) {
     console.log('event',event);
    // console.log(event);
    // console.log(this.state.listcompteurglobal);
    this.setState({ indexmesure: event })
    this.setState({ modal7: !this.state.modal7 })
    //this.deleteitemfromlistg(event);
  }

  getindexmesue(event, value) {
   console.log("getindexmesue",event,value)
    this.setState({ indexmesure: event })
    this.setState({ MesureidObjective: value })

 
    this.setState({ modal4: !this.state.modal4 })
    // this.setState({ modal6: !this.state.modal6 })
    // this.setState({ modal8: !this.state.modal8 })
  }
  addvaluetomesue = () => {
    // console.log('mesueeeeeeeeee')
    //console.log("this.state.ListSetobjective+++++++++++++++++++++++++",this.state.ListSetobjective)
    // console.log(this.state.indexmesure)
    // console.log(this.state.Listmesureenergy[this.state.indexmesure])
    //var cc_m 
    console.log("this.state.Listmesureenergy",this.state.Listmesureenergy)
    const listmesure = this.state.Listmesureenergy.map((item, j) => {
      console.log("j === this.state.indexmesure",j === this.state.indexmesure)
      if (j === this.state.indexmesure) {
        //cc_m = item.measure_Label + ":" + this.state.valuetomesure;
         console.log(item);
        console.log(item.measure_Label.includes(':'));
        if (item.measure_Label.includes(':') === true) {
          item.measure_Label = item.measure_Label.replace(/[^:]+$/g, this.state.valuetomesure);
         // this.sendsetobjective()

          return item;
        } else if (item.measure_Label.includes(':') === false) {
          item.measure_Label = item.measure_Label + ':' + this.state.valuetomesure
         // this.sendsetobjective()
          return item
        }


      } else {
        return item;
      }
    });

//console.log("listmesure",listmesure)
    this.setState({ Listmesureenergy: listmesure })
    // console.log("this.state.ListSetobjective",this.state.ListSetobjective)
    // console.log("this.state.CodecompteurObjective",this.state.CodecompteurObjective)
    // console.log("this.state.MesureidObjective",this.state.MesureidObjective)
    // console.log("this.state.valuetomesure",this.state.valuetomesure)
    if (this.state.ListSetobjective.length != 0) {

      this.state.ListSetobjective.map((item, j) => {

        if (item.cc_m === this.state.CodecompteurObjective + ',' + this.state.MesureidObjective) {
          item.value = this.state.valuetomesure
          return item;


        } else {
          return item;
        }
      });
    } else {
      this.state.ListSetobjective.push({
        "cc_m": this.state.CodecompteurObjective + ',' + this.state.MesureidObjective,
        //this.state.CodecompteurObjective+','+this.state.MesureidObjective,
        "value": this.state.valuetomesure,
      })
    }
    console.log("this.state.ListSetobjective--------------+++++++++++++++------------",this.state.ListSetobjective)
    this.sendsetobjective()
    this.setState({ modal4: !this.state.modal4 })
    this.state.valuetomesure = ""
  }
  sendsetobjective() {
    /* var setobjective = [{
      "cc_m": this.state.CodecompteurObjective,
      "value": this.state.CodecompteurObjectivevalue
    }]
    // console.log(setobjective) */
    axios.post(window.apiUrl + "insertiot/",
      {

        identifier: this.state.dateDMY + uuid(),
        datatoinsert: this.state.ListSetobjective,
      }
    )
      .then(
        (result) => {
          //this.tableData = result.data;
      //     console.log("insertiot",result.data)
          this.state.ListSetobjective = []
          //this.setState({ modal4: !this.state.modal4 })

        }
      )
  }
  Annulersendsetobjective = () => {
    this.setState({
      modal3: !this.state.modal3,

    })
    this.setState({

      ListSetobjective: []
    })
  }
  handlemesureselectedchange = (event1, event2) => {
    // console.log(event1)
  //   console.log(this.state.listobjectivefromDB.length)
  //   console.log("listobjectivefromDB",this.state.listobjectivefromDB)
    // console.log(event1.includes(this.state.listobjectivefromDB.m_name + ':'))
    var number = 0
    if (this.state.listobjectivefromDB.length > 0) {

      this.state.listobjectivefromDB.map((item, i) => {
        if (event1.includes(item.m_name + ':') && event1.includes('null') == false) {
          // console.log(event1.includes(item.m_name + ':'))
          // console.log(event1)
          number = 1;
          this.setState({
            U_inputobjective: ('Objective : ' + item.compteur_name + '_' + item.m_name),
            Sys_inputobjective: [{
              "keyword": null, "operateur": null, "att": null,
              "valeur": [{ "type": "o", "content": item.cc_m }], "user_value": null
            }


            ],
            Objectif: [{
              "U_inputobjective": 'Objective : ' + item.compteur_name + '_' + item.m_name,
              "Sys_inputobjective": [{
                "keyword": null, "operateur": null, "att": null,
                "valeur": [{ "type": "o", "content": item.cc_m }], "user_value": null
              }
              ]

            }]
          });
          // this.setState({
          //   modal3: false
          // })
          // console.log('hii')
        } else {
          // console.log('alert s\'il vous plait sélectionner une mesure possede une valeur différente 0.')
          
        }
      })
    //  console.log(number)

      if (number == 0) {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'S\'il vous plaît sélectionner une mesure possède une valeur'
        })
        //// console.log("alert aucun objectif declaré")
        //// console.log("alert")

      }else if (number == 1){
         this.setState({
            modal3: false
          })

          this.setState({ modalFilterMesure: false })
      }


    } else if (this.state.listobjectivefromDB.length == 0) {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Aucun objectif ne déclaré dans la base de donnée'
      })
      //// console.log("alert aucun objectif declaré")
      //// console.log("alert")
    }




  };
  addUinputobjective = (value) => {
    console.log("kkkkkk",value)
    if(value.length!=0){
    this.setState({
      Objectif: [{
        "U_inputobjective": "objective : " + [value].join(''),
        "Sys_inputobjective": [{
          "keyword": null, "operateur": null, "att": null,
          "valeur": [{ "type": "r", "content": [value].join('') }], "user_value": null
        }
        ]
      }]
    });}
  }
  clearequation = () => {
    this.setState({ U_inputobjective: "" });
    this.setState({ Sys_inputobjective: [] });
    this.setState({ Objectif: [] });
    // console.log('clearrrrrrrrrrrrr')
  }
  deleteequation = () => {
    // console.log(this.state.U_inputobjective)
    this.setState({ U_inputobjective: this.state.U_inputobjective.slice(0, -1) });
    this.setState({ Sys_inputobjective: this.state.Sys_inputobjective.slice(0, -1) });
    this.setState({ Objectif: this.state.Objectif.slice(0, -1) });
    // console.log('deleteee')
  }
  
  onClick() {
    this.toggle(3)
  }

  ajouter() {
    self = this

 
//////////////////////////////////////////////////dataObjectiveAdvanced

console.log("this.state.dataObjectiveAdvanced",this.state.dataObjectiveAdvanced)

  
    if(this.state.dataObjectiveAdvanced.length!=0){
      var Uinputobjective = []
    for (var i = 0; i < this.state.dataObjectiveAdvanced.length; i++) {
      const valeur = this.state.dataObjectiveAdvanced[i].valeur
      const c = valeur.replace(/'/g, "")
      const d = c.replace("and ", "-")
      const e = d.replace("(", "")
      const f = e.replace(")", "")
     
      var valueobj = f
      // console.log("valeur", valueobj)
      //inclure exclure
      var operateurvalue = this.state.dataObjectiveAdvanced[i].operateur
      //intervalle ensemble
      var keywordvalue = this.state.dataObjectiveAdvanced[i].keyword
      //// console.log("operateur", this.state.operateur)
      
      Uinputobjective.push(keywordvalue + ' ' + operateurvalue + " Periode " + valueobj + " ")
    }
    // console.log(Uinputobjective)
    if (Uinputobjective.length == 1) {
      // console.log(Uinputobjective)
      
        this.state.Objectif= [{
          "U_inputobjective": 'Objective : ' + Uinputobjective,
          "Sys_inputobjective":this.state.dataObjectiveAdvanced
        }]

   
    } else {
      // console.log(Uinputobjective.join('et'))
    
        this.state.Objectif=[{
          "U_inputobjective": 'Objective : ' + Uinputobjective.join('et '),
          "Sys_inputobjective": this.state.dataObjectiveAdvanced
        }]
  
    }
    }



////////////////////////////

console.log("this.state.Objectif",this.state.Objectif)

 ////////////////////////////////////////////////////
    if (this.state.Alarme_Code !== null && this.state.Compteur_Incident !== "" && this.state.Formule !== "" && this.state.Parsed_Formule !== ""
      && this.state.valuedropdown !== "Type" && this.state.Objectif !== "" && this.state.periode !== "" && this.state.Next_Check !== ""
      && this.state.U_Alarme_Name !== "" && this.state.U_Compteur !== "" && this.state.U_Formule !== "") 
      {

      this.setState({
        modal1: false
      });

      ////////ajouterUserInterface///////////

      for (var i = 0; i < this.state.ajoutertap.length; i++) {
        const valeur = this.state.ajoutertap[i].valeur.replace(/''/g, " ")
        const c = valeur.replace(/''/g, "")
        const d = c.replace("(", "")
        const e = d.replace(")", "")
        const f = e.replace("and ", ",")
        this.state.valeur2 = f
        this.state.operateur2 = this.state.ajoutertap[i].operateur
        this.state.ajouterUserInterface.push(this.state.operateur2 + " Periode " + this.state.valeur2 + " ")
      }
      ///////////////////////

      /////////////
      this.state.FrequencyJson = [{
        "Frequence": {
          "NbUnite": this.state.num,
          "Periode": this.state.periode,
          "UniteTemp": this.state.TempsUnite,
          "FrequenceUser": this.state.num + '_' + this.state.TempsUnite
        }


        , "OperateurValue": this.state.ajoutertap, "UserInterface": this.state.ajouterUserInterface
      }]
      //generate new format of the frequence without "[" "]" in the first and the end of the list , demanded by responsable of the database
      const b = {
        "Frequence": {
          "NbUnite": this.state.num,
          "Periode": this.state.periode,
          "UniteTemp": this.state.TempsUnite,
          "FrequenceUser": this.state.num + '_' + this.state.TempsUnite
        }, "OperateurValue": this.state.ajoutertap, 
           "UserInterface": this.state.ajouterUserInterface
      }
      this.state.Frequency = b
    
      //to delete "[" "]" in the first and the end of the list , demanded by responsable of the database
      const d = JSON.stringify(this.state.Objectif).slice(1, -1)
      // console.log(d)
      // console.log(this.state.Frequency)
      const Alarme_Code = this.state.Alarme_Code;

      const Compteur_Incident = this.state.Compteur_Incident;

      const Formule = this.state.Formule;
      //c
      const Parsed_Formule = this.state.Parsed_Formule;
      //c
      const Operateur = this.state.Operateur;
      //e
      const Objectifjson = this.state.Objectif[0];
      const Frequency = this.state.Frequency;
      //correct
      const Next_Check = this.state.Next_Check;
      const U_Alarme_Name = this.state.U_Alarme_Name;
      //e
      const Description = this.state.Description;
      //c
      const U_Compteur = this.state.U_Compteur;
      const U_Formule = this.state.U_Formule.replace(/~/g, ' ').replace(/#/g, '');
      const U_FormulewithoutTilde = this.state.U_Formule;
      const Nbr_Error = this.state.Nbr_Error;
      const TAG_Formule = this.state.TAG_Formule;
      const DBAction = "2";
      this.state.ajout = (
        {
          "Alarme_Code": Alarme_Code,
          "Compteur_Incident": Compteur_Incident,
          "Formule": Formule,
          "Parsed_Formule": Parsed_Formule,
          "Operateur": Operateur,
          "Objectif": Objectifjson,
          "Frequence": Frequency,
          "Next_Check": Next_Check,
          "U_Alarme_Name": U_Alarme_Name,
          "Description": Description,
          "U_Compteur": U_Compteur,
          "U_Formule": U_FormulewithoutTilde,
          "Nbr_Error": Nbr_Error,
          "TAG_Formule": TAG_Formule,
          "evaluation": null,
          "DBAction": DBAction
        }
      )

      this.state.ajoutertemp.push(this.state.ajout);
      const Frequence = this.state.FrequencyJson[0].Frequence.FrequenceUser;

      const UserInterface = this.state.FrequencyJson[0].UserInterface;

    
  
     // const Objectif = JSON.stringify(this.state.Objectif[0].U_inputobjective);
     const Objectif = Objectifjson.U_inputobjective
      
      
      console.log("Objectif",Objectif)
   

      this.mytable.addRow({
        Nbr_Error, U_Alarme_Name, U_Compteur, U_Formule, Operateur, Objectif,
        Frequence, UserInterface, Next_Check
      }, true);
     console.log("ajoutertemp",this.state.ajout);
     console.log("ajoutertemp",this.state.ajoutertemp);
      this.state.Alarme_Code = "";
      this.state.Compteur_Incident = "";
      this.state.Formule = "";
      this.state.Parsed_Formule = "";
      this.state.Operateur = "";
      this.state.Objectif = "";
      this.state.Frequence = "";
      this.state.Next_Check = "";
      this.state.U_Alarme_Name = "";
      this.state.Description = "";
      this.state.U_Compteur = "";
      this.state.U_Formule = "";
      this.state.Nbr_Error = "0";
      this.state.TAG_Formule = "";
      this.state.periode="";
      this.state.TempsUnite="";
      this.state.num=1;
      
      //return true;

      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'success',
        title: 'Ajouter'

      })
    } else if(this.state.U_Alarme_Name == ""){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 600,
        icon: 'warning',
        title: 'Remplir le champ Nom de Cas incident.'
      })
    }else if(this.state.U_Compteur == ""){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 500,
        icon: 'warning',
        title: 'Remplir le champ Compteur.'

      })

    } else if(this.state.U_Formule.length==0){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Remplir le champ Formule de cas.'

      })

    } else if(this.state.valuedropdown == "Type" || this.state.valuedropdown == "" ){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 500,
        icon: 'warning',
        title: 'Remplir le champ Operateur.'

      })

    } else if(this.state.Objectif.length==0){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 500,
        icon: 'warning',
        title: 'Remplir le champ Objectif.'

      })

    } else if(this.state.periode.length==0){
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Remplir le champ Frequence.'

      })

    }else{
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 500,
        icon: 'warning',
        title: 'Remplir tous les champs obligatoire '

      })
     // console.log(this.state.Alarme_Code)
     // console.log(this.state.Compteur_Incident)
     // console.log(this.state.Formule)
     // console.log(this.state.valuedropdown)
     // console.log(this.state.Objectif)
     // console.log(this.state.FrequencyJson)
     // console.log(this.state.Next_Check)
     // console.log(this.state.U_Alarme_Name)
     // console.log(this.state.U_Compteur)
     // console.log(this.state.U_Formule)

    }


    //////////////////////////


  }
  modifier() {

//////////////////////////////////////////////////dataObjectiveAdvanced

console.log("this.state.dataObjectiveAdvanced",this.state.dataObjectiveAdvanced)

  
    if(this.state.dataObjectiveAdvanced.length!=0){
      var Uinputobjective = []
    for (var i = 0; i < this.state.dataObjectiveAdvanced.length; i++) {
      const valeur = this.state.dataObjectiveAdvanced[i].valeur
      const c = valeur.replace(/'/g, "")
      const d = c.replace("and ", "-")
      const e = d.replace("(", "")
      const f = e.replace(")", "")
     
      var valueobj = f
      // console.log("valeur", valueobj)
      //inclure exclure
      var operateurvalue = this.state.dataObjectiveAdvanced[i].operateur
      //intervalle ensemble
      var keywordvalue = this.state.dataObjectiveAdvanced[i].keyword
      //// console.log("operateur", this.state.operateur)
      
      Uinputobjective.push(keywordvalue + ' ' + operateurvalue + " Periode " + valueobj + " ")
    }
    // console.log(Uinputobjective)
    if (Uinputobjective.length == 1) {
      // console.log(Uinputobjective)
      
        this.state.Objectif= [{
          "U_inputobjective": 'Objective : ' + Uinputobjective,
          "Sys_inputobjective":this.state.dataObjectiveAdvanced
        }]

   
    } else {
      // console.log(Uinputobjective.join('et'))
    
        this.state.Objectif=[{
          "U_inputobjective": 'Objective : ' + Uinputobjective.join('et '),
          "Sys_inputobjective": this.state.dataObjectiveAdvanced
        }]
  
    }
    }



////////////////////////////

console.log("this.state.Objectif",this.state.Objectif)

 ////////////////////////////////////////////////////









    //////////////////////////////////////////////////////////////////////////////
    this.state.U_inputobjective =this.state.objectifValeurInput

    console.log("this.state.U_inputobjective",this.state.U_inputobjective)
 // console.log("this.state.modifiertab-------------->",this.state.modifiertab)

  for (var i = 0; i <this.state.modifiertab.length ; i++) 
{
  const valeur =this.state.modifiertab[i].valeur
  const c = valeur.replace(/'/g,"")
    const d= c.replace("(","")
    const e= d.replace(")","")
    const f= e.replace("and ",",") 
    this.state.valeur2=f
this.state.operateur2=this.state.modifiertab[i].operateur
//console.log("operateur",this.state.operateur)
this.state.modifierUserInterface.push(this.state.operateur2+" Periode "+this.state.valeur2+ " ") 
}
//console.log("this.state.modifierUserInterface",this.state.modifierUserInterface)
    this.setState({
      modal6: !this.state.modal6 //modifier
    });

    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'success',
      title: 'Modifier'

  })


    const Alarme_Code = this.state.Alarme_Code;

    const Compteur_Incident = this.state.Compteur_Incident;

    const Formule = this.state.Formule;
    //c
    const Parsed_Formule = this.state.Parsed_Formule;
    //c
    const Operateur = this.state.Operateur;
    //e
    const Objectif = this.state.Objectif;


    const FrequenceJson = {"Periode":this.state.periode,"UniteTemp":this.state.TempsUnite,"NbUnite":this.state.num,"FrequenceUser": this.state.num+'_'+this.state.TempsUnite}
    this.state.FrequencyJson={"Frequence" : FrequenceJson,"OperateurValue":this.state.modifiertab,"UserInterface": this.state.modifierUserInterface}
 

    const Frequency = this.state.FrequencyJson
   // console.log("+++++++++++",Frequency.Frequence.FrequenceUser)
    //= (this.state.num + '_' + this.state.TempsUnite);

    const Next_Check = this.state.Next_Check;
    const U_Alarme_Name = this.state.U_Alarme_Name;
    //e
    const Description = this.state.Description;
    //c
    const U_Compteur = this.state.U_Compteur;
    const U_Formule = this.state.U_Formule;
    const Nbr_Error = this.state.Nbr_Error;
    const TAG_Formule = this.state.TAG_Formule;
    const DBAction = "1";
    /////////////////////////////
    const O1 = JSON.stringify(Objectif[0])
    const Objectifjson = O1.replace(/'/g,"''")
   // console.log("Objectif",Objectifjson)
    ///////////////////////
  
    const F1 = JSON.stringify(Frequency)
    const Frequencywithoutsimplecode = F1.replace(/'/g,"''")
   //console.log("Frequency",JSON.parse(Frequencywithoutsimplecode))
    // push with modificationtemp 
    this.state.modificationtemp.push(

      {
        "Alarme_Code": Alarme_Code,
        "Compteur_Incident": Compteur_Incident,
        "Formule": Formule,
        "Parsed_Formule": Parsed_Formule,
        "Operateur": Operateur,
        "Objectif": JSON.parse(Objectifjson),
        "Frequence": JSON.parse(Frequencywithoutsimplecode),
        "Next_Check": Next_Check,
        "U_Alarme_Name": U_Alarme_Name,
        "Description": Description,
        "U_Compteur": U_Compteur,
        "U_Formule": U_Formule,
        "Nbr_Error": Nbr_Error,
        "TAG_Formule": TAG_Formule,
        "DBAction": DBAction

      })
    this.mytable.redraw(true);
  
    this.tableData[this.state.position].U_Alarme_Name = U_Alarme_Name;
    this.tableData[this.state.position].U_Compteur = U_Compteur;
    this.tableData[this.state.position].U_Formule = U_Formule;
    this.tableData[this.state.position].Operateur = Operateur;
    this.tableData[this.state.position].Objectif = Objectif[0].U_inputobjective;
    this.tableData[this.state.position].Frequence = Frequency.Frequence.FrequenceUser;
    this.tableData[this.state.position].UserInterface = Frequency.UserInterface
    this.tableData[this.state.position].Next_Check = Next_Check;

    this.state.Nbr_Error = "";
    this.state.U_Alarme_Name = "";
    this.state.U_Compteur = "";
    this.state.U_Formule = "";
    this.state.Operateur = "";
    this.state.Objectif = "";
    this.state.Frequency = "";
    this.state.Next_Check = "0";
  }

  Enregistrer() {
   // console.log(this.state.ajoutertemp.length)
    if (this.state.ajoutertemp.length!=0 || this.state.modificationtemp.length!=0 || this.state.supprimertemp.length!=0){
    axios.post(window.apiUrl + "updatedelete/", {
      tablename: "Alarme_F_Reporting_V3",
      identifier: this.state.dateDMY + uuid(),
      datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),

      // datatodelete: ["Event_Code;Event_Name;Frequency;Next_Check;Event_Description;DBAction"].concat(this.state.supprimertemp)
    }
    )
      .then((response) => {
       // console.log("Enregistrer");
       // console.log(response.status);
       // console.log(response.statusText);
       // console.log(response);
       // console.log(response.data);

        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          width: 300,
          icon: 'success',
          title: 'Enregister avec succès'

        })
      })
      .catch((err) => console.error(err));
    setTimeout(function () {
      window.location.reload(1);
    }, 3000);
    
  }
  else{
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'warning',
      title: 'Créez ou Modifier une cas-incident.'
  })
}
  }
  lod() {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Les modifications que vous avez apportées ne seront peut-être pas enregistrées.';
    });
  }

  componentDidMount() {
    //localStorage.clear();
    //getdate
    this.getDate();
    ////
    const supprimertemp = this.state.supprimertemp;
    const datamodifier = this.state.datamodifier;
    /// api tabulator display Alarme
    axios.defaults.withCredentials = true;


  
    axios1.post(window.apiUrl + "getIncidents/")
      .then(
        (result) => {
          this.disableSpinner();
          ////////////////////////////////////////////////////////////////////////////////////////////
          const dataglobale = result.data
         // console.log(result.data)
          // if ( type)
          // if (result.data !== 'no data' || result.data.U_Formule !== '' || result.data.U_Formule !== 'None') {
          if (result.data !== null) {
            for (var i = 0; i < dataglobale.length; i++) {
              const Alarme_Code = dataglobale[i].Alarme_Code
              const Compteur_Incident = dataglobale[i].Compteur_Incident
              const Formule = dataglobale[i].Formule
              const Parsed_Formule = dataglobale[i].Parsed_Formule
              //c
              const Operateur = dataglobale[i].Operateur
              const Next_Check = dataglobale[i].Next_Check
              const U_Alarme_Name = dataglobale[i].U_Alarme_Name
              const Description = dataglobale[i].Description
              const U_Compteur = dataglobale[i].U_Compteur
              const U_Formule = dataglobale[i].U_Formule.replace(/~/g, ' ').replace(/#/g, '')
              const U_FormulewithTilde = dataglobale[i].U_Formule
              //.replace(/~/g, ' ').replace(/#/g, '')
              const Nbr_Error = dataglobale[i].Nbr_Error
              const TAG_Formule = dataglobale[i].TAG_Formule

              ////////Email_To
             // console.log(JSON.stringify(dataglobale[i].Objectif))

              const Objectifjson = [JSON.parse(JSON.stringify(dataglobale[i].Objectif))]
             // console.log(Objectifjson)
              var Frequency = [dataglobale[i].Frequence]
             // console.log("fffffffffffffffffff", Frequency)
             // console.log(typeof dataglobale[i].Frequence);

             // console.log(JSON.parse(JSON.stringify(Frequency)))
              var Frequence_tab = ""
              var OperateurValue_tab = ""
              var UserInterface_tab = ""

              ////Objectif
              var Objectif_tab = ""
              var Frequence = null
              var OperateurValue = null
              var UserInterface = null
              var Objectif_U_input = null
              var Objectif_Sys_input = null
              var Objectif = null
              if (Frequency != null) {
                //console.log(JSON.parse(Frequency))
                //const Frequence = this.state.Frequence;
                ////const Frequency = dataglobale[i].Frequency
                /*var Frequence_tab = ""
                var OperaterValue_tab = ""
                var UserInterface_tab = ""*/
                Frequency.forEach(function (element) {
                  Frequence = element.Frequence.FrequenceUser,
                    // console.log('hii' + element.Frequence.FrequenceUser)
                  OperateurValue_tab = element.OperateurValue,
                    UserInterface_tab = element.UserInterface
                })
                // = Frequence_tab;
                OperateurValue = OperateurValue_tab;
                UserInterface = UserInterface_tab;
                // console.log(Frequence)
                // console.log('frq' + OperateurValue)
                // console.log('frq' + UserInterface)


                //// console.log(dataCasIncident)
                /*  this.setState({ Frequence_tab: Frequence_tab })
                    this.setState({ OperateurValue_tab: OperateurValue_tab })
                    this.setState({ UserInterface_tab: UserInterface_tab })
                    this.state.dataCasIncident.push(dataCasIncident)*/

              }
              if (Objectifjson != null) {

                Objectifjson.forEach(function (element) {
                  Objectif_U_input = element.U_inputobjective,
                    Objectif_Sys_input = element.Sys_inputobjective

                })
                Objectif = Objectif_U_input;
                // console.log('OBJ' + Objectif_U_input)
                // console.log('OBJ' + Objectif_Sys_input)


              }
              const dataCasIncident = {
                "Alarme_Code": Alarme_Code, "Compteur_Incident": Compteur_Incident, "Formule": Formule,
                "Parsed_Formule": Parsed_Formule, "Frequence": Frequence, "OperateurValue": OperateurValue, "UserInterface": UserInterface, "Frequency": Frequency,
                "Operateur": Operateur, "Objectif": Objectif, "Objectifjson": Objectifjson,
                "Next_Check": Next_Check, "U_Alarme_Name": U_Alarme_Name,
                "Description": Description, "U_Compteur": U_Compteur,
                "U_Formule": U_Formule, "U_FormulewithTilde": U_FormulewithTilde, "Nbr_Error": Nbr_Error, "TAG_Formule": TAG_Formule

              }
              this.state.dataCasIncident.push(dataCasIncident)
              // console.log(this.state.dataCasIncident)
              /*  if(Objectif != null ){
                 Objectif.forEach(element =>
                   this.state.Objectif_tab = element.U_inputobjective
                 )
               const Objectif = this.state.Objectif_tab;
   
               Objectif.forEach(element =>
                 this.state.OperateurValueObjectif_tab = element.U_inputobjective
               )
             const Objectif = this.state.Objectif_tab;
               } */
            }
            // console.log('data cas incidents ')
            // console.log(this.state.dataCasIncident)
            this.tableData = this.state.dataCasIncident;
          } else {
            // console.log('no data change')
            this.tableData = ''
          }
          /////////////////////////////////////////////////////////
          //this.state.dataCasIncident
          //tabulator
          this.mytable = new Tabulator(this.el, {
            data: this.tableData,
            //link data to table
            reactiveData: true, //enable data reactivity
            addRowPos: "top",
            pagination: "local",
            paginationSize: 8,
            movableColumns: true,
            resizableRows: true,
            reactiveData: true,
            printRowRange: "selected",
            selectable: 1,
            selectablePersistence: this.state.position,

            paginationSizeSelector: [3, 6, 8, 10],
            columns: [
        
              // {
              //   title: "Nombre d'erreur",
              //   field: "Nbr_Error",
              //   width: "12%",
              //   cellClick: function (e, cell, row) {
              //     var position = cell.getRow().getPosition()
              //     // console.log(position);
              //     datamodifier.splice(0, 2);
              //     datamodifier.push(cell.getData(), position);
              //     //// console.log(cell.getData())
              //     console.log("valider", datamodifier)

              //     localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));

              //   }

              // },

              {
                title: "Nom de Cas Incident",
                field: "U_Alarme_Name",
                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)
                  //localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));

               //   const a = JSON.stringify(cell.getData().OperateurValue)
               //   const b = a.replace(/'/g,"''")
                 
              //    localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Compteur",
                field: "U_Compteur",
                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                   console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                 // const a = JSON.stringify(cell.getData().OperateurValue)
                 // const b = a.replace(/'/g,"''")
                 
                 // localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Formule de cas",
                field: "U_Formule",
                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                  //const a = JSON.stringify(cell.getData().OperateurValue)
                //  const b = a.replace(/'/g,"''")
                 
                 // localStorage.setItem('OperateurValue', b );
                  ///////////
                }
              },
              {
                title: "Operateur",
                field: "Operateur",
                width: "7%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                //  const a = JSON.stringify(cell.getData().OperateurValue)
                  //const b = a.replace(/'/g,"''")
                 
                 // localStorage.setItem('OperateurValue', b );
                }

              },


              {
                title: "Objective",
                field: "Objectif",
                width: "10%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
              //    const a = JSON.stringify(cell.getData().OperateurValue)
               //   const b = a.replace(/'/g,"''")
                 
                //  localStorage.setItem('OperateurValue', b );
                }

              },
              {
                title: "Frequence",
                field: "Frequence",
                width: "9%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                 // const a = JSON.stringify(cell.getData().OperateurValue)
                //  const b = a.replace(/'/g,"''")
                  //localStorage.setItem('OperateurValue', b );
                }
              }, {
                title: "Emploi du Temps",
                field: "UserInterface",
                width: "14%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                //  const a = JSON.stringify(cell.getData().OperateurValue)
                //  const b = a.replace(/'/g,"''")
                 
                 // localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Date suivante",
                field: "Next_Check",
                width: "12%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  // console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  // console.log("valider", datamodifier)
                  // localStorage.setItem('OperateurValue', JSON.stringify(cell.getData().OperateurValue));
                //  const a = JSON.stringify(cell.getData().OperateurValue)
                 // const b = a.replace(/'/g,"''")
                 
                //  localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Supprimer",
                field: "supprimer",
                width: "8%",
                hozAlign: "center",
                formatter: function () { //plain text value

                  return "<i class='fa fa-trash-alt icon'></i>";

                },
                cellClick: (e, cell) =>{
                  this.toggle()
                  //const Frequency = JSON.stringify(cell.getData().Frequency)
                  cell.getData();
                  alert("confirmation de Suppression" + " " + cell.getData().U_Alarme_Name);
                  ///////////////////////
                  const O1 = JSON.stringify(cell.getData().Objectifjson)
                  const Objectifjson = O1.replace(/'/g,"''")
                  // console.log("Objectif",Objectifjson)
                  ///////////////////////

                  const F1 = JSON.stringify(cell.getData().Frequency)
                  const Frequency = F1.replace(/'/g,"''")
                  // console.log("Frequency",Frequency)

                  supprimertemp.push(
                    {
                      "Alarme_Code": cell.getData().Alarme_Code,
                      "Compteur_Incident": cell.getData().Compteur_Incident,
                      "Formule": cell.getData().Formule,
                      "Parsed_Formule": cell.getData().Parsed_Formule,
                      "Operateur": cell.getData().Operateur,
                      "Objectif": Objectifjson,
                      "Frequence": Frequency,
                      "Next_Check": cell.getData().Next_Check,
                      "U_Alarme_Name": cell.getData().U_Alarme_Name,
                      "Description": cell.getData().Description,
                      "U_Compteur": cell.getData().U_Compteur,
                      "U_Formule": cell.getData().U_FormulewithTilde,
                      "Nbr_Error": cell.getData().Nbr_Error,
                      "TAG_Formule": cell.getData().TAG_Formule,
                      "DBAction": "3"
                    })

                  ///////////////////////////////////////////
                  /*  cell.getData().Alarme_Code + ";" + cell.getData().Compteur_Incident + ";" +
                   cell.getData().Formule + ";" + cell.getData().Parsed_Formule + ";" +
                   cell.getData().Operateur + ";" + JSON.stringify(cell.getData().Objectifjson) + ";" +
                   JSON.stringify(cell.getData().Frequency) + ";" + cell.getData().Next_Check + ";" + cell.getData().U_Alarme_Name + ";" +
                   cell.getData().Description + ";" + cell.getData().U_Compteur + ";" +
                   cell.getData().U_FormulewithTilde + ";" + cell.getData().Nbr_Error + ";" +
                   cell.getData().TAG_Formule + ";" + 3); */
                  // console.log('deleteeeeeeeeeeeeeeeeeeeeeeeeeee')
                  // console.log(supprimertemp)
                  cell.getRow().delete();
                  Swal.fire({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    width: 300,
                    icon: '',
                    title: 'Supprimer temporairement l\'alarme ' + cell.getData().U_Alarme_Name

                  })
                },
                hideInHtml: true,

              },

            ], //define table columns



          });

          // console.log("Reporting_F_Alarme");
          // console.log(result.data);



        }
      )
      .catch(({ response }) => {
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/login")
            localStorage.clear();

          }
        }
      }
      )   


  }

 
  ModifierDataEmploi=(DataEmploi)=>{
//console.log("-----------------DataEmploi--------------------",DataEmploi)
this.setState({modifiertab:DataEmploi})
  }

  AjoutDataEmploi=(DataEmploi)=>{
    // console.log("-----------------DataEmploi--------------------",DataEmploi)
    this.setState({ajoutertap:DataEmploi})
      }
  selectMeasureGetObject=(jsonMeasur)=>{
  //  console.log("page cas incident ",[jsonMeasur])
this.setState({MeasureGetObject:[jsonMeasur]})
  }


  toggleFilterMesure=()=>{
    //console.log(this.state.U_Compteur)
    if(this.state.U_Compteur!=""){

if(this.state.codeCompterIncidentCalculatrice==""&&this.state.datamodifier.length!=0){

  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.energycompteurselected}`)
            
  .then(
    ({data})=>{

  Object.keys(data).map((key, ii, aa) => {
    const value = data[key]
    //console.log("value maseur avec energie",value)
  
   this.setState({dataMaseurCalculatrice:value})
})

  })
  .catch(({ response }) => {

    // console.log("------------",response)
    if (response != null) {
      if (response.status == "401") {

        window.location.assign("/login")
        localStorage.clear();

      }
    }
  }
  )   

}else if (this.state.codeCompterIncidentCalculatrice!=""){

 // console.log("codeCompterIncidentCalculatrice",this.state.codeCompterIncidentCalculatrice)
  axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${this.state.codeCompterIncidentCalculatrice}`)

        .then(
          (result) => {
     //   console.log("result",result.data[0].Energie)
var Energie =result.data[0].Energie
//console.log("Energie",Energie)
    


      axios1.get(window.apiUrl+`getMLByEnergy/?energies=${Energie}`)
            
      .then(
        ({data})=>{
          var value = []
      Object.keys(data).map((key, ii, aa) => {
       value = data[key]
       // console.log("value maseur avec energie",value)
      
      
    })
    this.setState({dataMaseurCalculatrice:[]})
     this.setState({dataMaseurCalculatrice:value})
      })
      .catch(({ response }) => {
    
        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {
    
            window.location.assign("/login")
            localStorage.clear();
    
          }
        }
      }
      )   
          })


}
    this.setState({modalFilterMesure:!this.state.modalFilterMesure})

   // setmodalFilterMesure(!modalFilterMesure)
  } else {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 400,
      title: 'Sélectionner compteur s\'il vous plait '
    })}
  }
  toggleFilterMesure3=()=>{
    console.log(this.state.U_Compteur)
    if(this.state.U_Compteur!=""){

if(this.state.codeCompterIncidentCalculatrice==""&&this.state.datamodifier.length!=0){

  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.energycompteurselected}`)
            
  .then(
    ({data})=>{

  Object.keys(data).map((key, ii, aa) => {
    const value = data[key]
    //console.log("value maseur avec energie",value)
  
   this.setState({dataMaseurCalculatrice:value})
})

  })
  .catch(({ response }) => {

    // console.log("------------",response)
    if (response != null) {
      if (response.status == "401") {

        window.location.assign("/login")
        localStorage.clear();

      }
    }
  }
  )   

}else if (this.state.codeCompterIncidentCalculatrice!=""){

 // console.log("codeCompterIncidentCalculatrice",this.state.codeCompterIncidentCalculatrice)
  axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${this.state.codeCompterIncidentCalculatrice}`)

        .then(
          (result) => {
     //   console.log("result",result.data[0].Energie)
var Energie =result.data[0].Energie
//console.log("Energie",Energie)
    


      axios1.get(window.apiUrl+`getMLByEnergy/?energies=${Energie}`)
            
      .then(
        ({data})=>{
          var value = []
      Object.keys(data).map((key, ii, aa) => {
       value = data[key]
       // console.log("value maseur avec energie",value)
      
      
    })
    this.setState({dataMaseurCalculatrice:[]})
     this.setState({dataMaseurCalculatrice:value})
      })
      .catch(({ response }) => {
    
        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {
    
            window.location.assign("/login")
            localStorage.clear();
    
          }
        }
      }
      )   
          })


}
    this.setState({modalFilterMesure3:!this.state.modalFilterMesure3})

   // setmodalFilterMesure(!modalFilterMesure)
  } else {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 400,
      title: 'Sélectionner compteur s\'il vous plait '
    })}
  }
  toggleFilterMesure5=()=>{
    console.log(this.state.U_Compteur)
    if(this.state.U_Compteur!=""){

if(this.state.codeCompterIncidentCalculatrice==""&&this.state.datamodifier.length!=0){

  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.energycompteurselected}`)
            
  .then(
    ({data})=>{

  Object.keys(data).map((key, ii, aa) => {
    const value = data[key]
    //console.log("value maseur avec energie",value)
  
   this.setState({dataMaseurCalculatrice:value})
})

  })
  .catch(({ response }) => {

    // console.log("------------",response)
    if (response != null) {
      if (response.status == "401") {

        window.location.assign("/login")
        localStorage.clear();

      }
    }
  }
  )   

}else if (this.state.codeCompterIncidentCalculatrice!=""){

 // console.log("codeCompterIncidentCalculatrice",this.state.codeCompterIncidentCalculatrice)
  axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${this.state.codeCompterIncidentCalculatrice}`)

        .then(
          (result) => {
     //   console.log("result",result.data[0].Energie)
var Energie =result.data[0].Energie
//console.log("Energie",Energie)
    


      axios1.get(window.apiUrl+`getMLByEnergy/?energies=${Energie}`)
            
      .then(
        ({data})=>{
          var value = []
      Object.keys(data).map((key, ii, aa) => {
       value = data[key]
       // console.log("value maseur avec energie",value)
      
      
    })
    this.setState({dataMaseurCalculatrice:[]})
     this.setState({dataMaseurCalculatrice:value})
      })
      .catch(({ response }) => {
    
        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {
    
            window.location.assign("/login")
            localStorage.clear();
    
          }
        }
      }
      )   
          })


}
    this.setState({modalFilterMesure5:!this.state.modalFilterMesure5})

   // setmodalFilterMesure(!modalFilterMesure)
  } else {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 400,
      title: 'Sélectionner compteur s\'il vous plait '
    })}
  }
  toggleFilterMesure7=()=>{
    console.log(this.state.U_Compteur)
    if(this.state.U_Compteur!=""){

if(this.state.codeCompterIncidentCalculatrice==""&&this.state.datamodifier.length!=0){

  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.energycompteurselected}`)
            
  .then(
    ({data})=>{

  Object.keys(data).map((key, ii, aa) => {
    const value = data[key]
    //console.log("value maseur avec energie",value)
  
   this.setState({dataMaseurCalculatrice:value})
})

  })
  .catch(({ response }) => {

    // console.log("------------",response)
    if (response != null) {
      if (response.status == "401") {

        window.location.assign("/login")
        localStorage.clear();

      }
    }
  }
  )   

}else if (this.state.codeCompterIncidentCalculatrice!=""){

 // console.log("codeCompterIncidentCalculatrice",this.state.codeCompterIncidentCalculatrice)
  axios1.get(window.apiUrl + `getEnergyFromCounters/?counters=${this.state.codeCompterIncidentCalculatrice}`)

        .then(
          (result) => {
     //   console.log("result",result.data[0].Energie)
var Energie =result.data[0].Energie
//console.log("Energie",Energie)
    


      axios1.get(window.apiUrl+`getMLByEnergy/?energies=${Energie}`)
            
      .then(
        ({data})=>{
          var value = []
      Object.keys(data).map((key, ii, aa) => {
       value = data[key]
       // console.log("value maseur avec energie",value)
      
      
    })
    this.setState({dataMaseurCalculatrice:[]})
     this.setState({dataMaseurCalculatrice:value})
      })
      .catch(({ response }) => {
    
        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {
    
            window.location.assign("/login")
            localStorage.clear();
    
          }
        }
      }
      )   
          })


}
    this.setState({modalFilterMesure7:!this.state.modalFilterMesure7})

   // setmodalFilterMesure(!modalFilterMesure)
  } else {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 400,
      title: 'Sélectionner compteur s\'il vous plait '
    })}
  }
  functionListePourCloner=(liste)=>
  {
   // console.log("-------------------->",liste)

    this.setState({listeCompteurPourCloner:liste})

  }
  funObjectifValeurInputModifier=(objectifValeurInput)=>{

    this.setState({objectifValeurInput:objectifValeurInput})

  }

  funModaleObjective=(modalObject,nb)=>{
    if(nb==3){
this.setState({modalFilterMesure3:false})
}else if(nb==5){
  this.setState({modalFilterMesure5:false})

}else if(nb==7){
  this.setState({modalFilterMesure7:false})

}
  }
  render() {
    const scrollContainerStyle = { maxHeight: "300px" };

    return (
      <React.Fragment>
        {
          this.state.loading ? (
            <Fetching />
          ) : (
            <div>
              <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
                <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
                <MDBBreadcrumbItem > Cas-Incidents</MDBBreadcrumbItem>
              </MDBBreadcrumb>


              <div style={{ margin: 30 }}>
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle(1)} style={{ width: "196px"}} className="float-left">Nouveau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>
  {/***Nouveau******************************************************************************************************************************************************** */}             
              
                <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg" centered className="modal-dialog-scrollable" >
                  <NouveauCasIncidentsModale 
                toggleNouveau={this.toggle(1)} 
                toggleObjective={this.toggle(3)} 
                modalObjective={this.state.modal3} 
                toggleValue={this.toggle(4)} 
                modalValue={this.state.modal4}
                U_Alarme_Name ={this.state.U_Alarme_Name}
                handleChange={this.handleChange}
                componentcalculator={this.componentcalculator}
                U_Compteur={this.state.U_Compteur}
                displaycalculator={this.state.displaycalculator}
                callbackValueIncident={this.callbackValueIncident}
                callbackmodel={this.callbackmodel}
                Compteur_Incident={this.state.Compteur_Incident}
                FormulewithTildee={this.state.FormulewithTildee}
                TAG_Formule={this.state.TAG_Formule}
                U_Formule={this.state.U_Formule}
                valuedropdown={this.state.valuedropdown}
                operator={this.state.operator}
                onClickHandler={this.onClickHandler}
                showgetobjective={this.state.showgetobjective}
                displaycalculatriceobjective={this.state.displaycalculatriceobjective}
                U_inputobjective={this.state.U_inputobjective}
                Sys_inputobjective={this.state.Sys_inputobjective}
                energycompteurselected={this.state.energycompteurselected}
                incidentselectedwithoutlive={this.state.incidentselectedwithoutlive}
                Listmesureenergy={this.state.Listmesureenergy}
                handlemesureselectedchange={this.handlemesureselectedchange}
                getindexmesue={this.getindexmesue}
                addvaluetomesue={this.addvaluetomesue}
                valuetomesure={this.state.valuetomesure}
                Annulersendsetobjective={this.Annulersendsetobjective}
                showadvanced={this.showadvanced}
                displayadvanced={this.state.displayadvanced}
                callbackAdvancedObjective={this.callbackAdvancedObjective}
                MesureList={this.state.MesureList}
                CodecompteurObjective={this.state.CodecompteurObjective}
                Next_Check={this.state.Next_Check}
                periode={this.state.periode}
                TempsUnite={this.state.TempsUnite}
                num={this.state.num}
                ajouter={this.ajouter}
                deleteequation={this.deleteequation}
                clearequation={this.clearequation}
                AjoutDataEmploi={this.AjoutDataEmploi}
                dataEnergyMeasure={this.state.dataMaseurCalculatrice}
                selectMeasureGetObject={this.selectMeasureGetObject}
                modalFilterMesure={this.state.modalFilterMesure}
                toggleFilterMesure={this.toggleFilterMesure}
                modalFilterMesure3={this.state.modalFilterMesure3}
                toggleFilterMesure3={this.toggleFilterMesure3}
                modalFilterMesure5={this.state.modalFilterMesure5}
                toggleFilterMesure5={this.toggleFilterMesure5}
                modalFilterMesure7={this.state.modalFilterMesure7}
                toggleFilterMesure7={this.toggleFilterMesure7}
                addUinputobjective={this.addUinputobjective}
                datamodifier={this.state.datamodifier}
                funModaleObjective={this.funModaleObjective}
                />
                
                </MDBModal> 
  {/*********************************************************************************************************************************************************** */}             

                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle(5)} style={{ width: "196px"}} className="float-left" >Cloner <MDBIcon icon="clone" className="ml-1" /></MDBBtn>
  {/****Cloner******************************************************************************************************************************************************* */}             

                <MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} size="fluid">
          <ClonerCasIncidentsModal 
                              toggleClone={this.toggle(5)} 
                               listcompteurglobal={this.state.listcompteurglobal}
                                NameEnergy={this.state.NameEnergy}
                                getcodecompteur={this.getcodecompteur}
                                
                                functionListePourCloner={this.functionListePourCloner}
                                />
                </MDBModal>
  {/*********************************************************************************************************************************************************** */}             
               
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle(6)} id="btnmod" style={{width: "196px"}} className="float-left">Modifier <MDBIcon icon="pen-square"  className="ml-1" /></MDBBtn>
  {/*******Modifier**************************************************************************************************************************************************** */}             

                {/* <MDBBtn color="#e0e0e0 grey lighten-2"  style={{ float: 'left' }} className="float-left modal-dialog-scrollable" >Modifier</MDBBtn> */}
                <MDBModal isOpen={this.state.modal6} toggle={this.toggle(6)} size="lg" centered className="modal-dialog-scrollable">
                <ModifierCasIncidentsModal
                toggleModifier={this.toggle(6)} 
                toggleObjective={this.toggle(3)} 
                modalObjective={this.state.modal3} 
                toggleValue={this.toggle(4)} 
                modalValue={this.state.modal4}
                U_Alarme_Name ={this.state.U_Alarme_Name}
                handleChange={this.handleChange}
                componentcalculator={this.componentcalculator}
                U_Compteur={this.state.U_Compteur}
                displaycalculator={this.state.displaycalculator}
                callbackValueIncident={this.callbackValueIncident}
                callbackmodel={this.callbackmodel}
                Compteur_Incident={this.state.Compteur_Incident}
                FormulewithTildee={this.state.FormulewithTildee}
                TAG_Formule={this.state.TAG_Formule}
                U_Formule={this.state.U_Formule}
                valuedropdown={this.state.valuedropdown}
                operator={this.state.operator}
                onClickHandler={this.onClickHandler}
                showgetobjective={this.state.showgetobjective}
                displaycalculatriceobjective={this.state.displaycalculatriceobjective}
                U_inputobjective={this.state.U_inputobjective}
                Sys_inputobjective={this.state.Sys_inputobjective}
                energycompteurselected={this.state.energycompteurselected}
                incidentselectedwithoutlive={this.state.incidentselectedwithoutlive}
                Listmesureenergy={this.state.Listmesureenergy}
                handlemesureselectedchange={this.handlemesureselectedchange}
                getindexmesue={this.getindexmesue}
                addvaluetomesue={this.addvaluetomesue}
                valuetomesure={this.state.valuetomesure}
                Annulersendsetobjective={this.Annulersendsetobjective}
                callbackAdvancedObjective={this.callbackAdvancedObjective}
                MesureList={this.state.MesureList}
                CodecompteurObjective={this.state.CodecompteurObjective}
                Next_Check={this.state.Next_Check}
                periode={this.state.periode}
                TempsUnite={this.state.TempsUnite}
                num={this.state.num}
                modifier={this.modifier}
                deleteequation={this.deleteequation}
                clearequation={this.clearequation}
                ModifierDataEmploi={this.ModifierDataEmploi}
                dataEnergyMeasure={this.state.dataMaseurCalculatrice}
                selectMeasureGetObject={this.selectMeasureGetObject}
                modalFilterMesure={this.state.modalFilterMesure}
                toggleFilterMesure={this.toggleFilterMesure}
                showmodifyadvanced={this.showmodifyadvanced}
                displaymodifyadvanced={this.state.displaymodifyadvanced}
                addUinputobjective={this.addUinputobjective}
                OperateurValueModifier={this.state.OperateurValueModifier}
                Formule={this.state.Formule}
                funObjectifValeurInputModifier={this.funObjectifValeurInputModifier}
                sendtoModifyObjectiveAdvanced={this.state.sendtoModifyObjectiveAdvanced}
                datamodifier={this.state.datamodifier}
                modalFilterMesure3={this.state.modalFilterMesure3}
                toggleFilterMesure3={this.toggleFilterMesure3}
                modalFilterMesure5={this.state.modalFilterMesure5}
                toggleFilterMesure5={this.toggleFilterMesure5}
                modalFilterMesure7={this.state.modalFilterMesure7}
                toggleFilterMesure7={this.toggleFilterMesure7}
                funModaleObjective={this.funModaleObjective}
                />
                
                </MDBModal>
  {/*********************************************************************************************************************************************************** */}             
                
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copieralarme} style={{width: "196px" }} className="float-left" disabled={this.state.isDisabledbutton}>Copier <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle(8)} style={{ float: 'left' }} className="float-left" /*disabled={this.state.isDisabledbuttonclone}*/ disabled >Cloner objective <MDBIcon icon="clone" className="ml-1" /></MDBBtn>


  {/****Cloner objective ******************************************************************************************************************************************************* */}             

                <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} size="lg">
                  {/* <MDBModalHeader toggle={this.toggle(4)}>MDBModal title</MDBModalHeader> */}
                  <MDBModalHeader toggle={this.toggle(8)}>Cloner Objective</MDBModalHeader>
                  <MDBModalBody>
                    <MDBRow>
                      <MDBCol style={{}} size='6'>
                        <label htmlFor="defaultFormLoginEmailEx7" >
                          Filter Compteur :
                        </label>


                        <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>
                          <MDBInput label="Energie :"
                          autoComplete="off"
                            style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
                            name="NameEnergy" value={this.state.NameEnergy}
                            onChange={this.handleChange} disabled />

                          <MDBInput label="Compteur Parent :"
                          autoComplete="off"
                            list="listcompteurparent" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}

                            onClick={this.filtercompteurparent}
                            name="Compteur_Parent" value={this.state.Compteur_Parent}
                            onChange={this.handleChange} />
                          <datalist id="listcompteurparent">
                            {this.state.listcompteurParent.map((listcompteurParent, i) => <option key={i} value={listcompteurParent}></option>)}
                          </datalist>

                          <MDBInput label="Secteur :"
                          autoComplete="off"
                            list="listsecteur" style={{ marginBottom: 0.8 + 'em' }}

                            onClick={this.filtersecteur}
                            name="secteur" value={this.state.secteur}
                            onChange={this.handleChange} />
                          <datalist id="listsecteur">
                            {this.state.listsecteur.map((listsecteur, i) => <option key={i} value={listsecteur}></option>)}
                          </datalist>

                          <MDBInput label="Point de Production :"
                          autoComplete="off"
                            list="listptproduction" style={{ marginBottom: 0.8 + 'em' }}

                            onClick={this.filterpointproduction}
                            name="pointproduction" value={this.state.pointproduction}
                            onChange={this.handleChange}
                          />
                          <datalist id="listptproduction">
                            {this.state.listpointproduction.map(listpointproduction => <option value={listpointproduction}></option>)}
                          </datalist>

                          <MDBInput label="Point de Distribution :"
                          autoComplete="off"
                            list="listptdistribution" style={{ marginBottom: 0.8 + 'em' }}

                            onClick={this.filterpointdistrubition}
                            name="pointdistribution" value={this.state.pointdistribution}
                            onChange={this.handleChange}
                          />
                          <datalist id="listptdistribution">
                            {this.state.listpointdistribution.map((listpointdistribution, i) => <option key={i} value={listpointdistribution}></option>)}
                          </datalist>

                          <MDBInput label="Point de Consommation :"
                          autoComplete="off"
                            list="listptconsommation" style={{ marginBottom: 0.8 + 'em' }}

                            onClick={this.filterpointconsommation}
                            name="pointconsommation" value={this.state.pointconsommation}
                            onChange={this.handleChange} />
                          <datalist id="listptconsommation">
                            {this.state.listpointconsommation.map((listpointconsommation, i) => <option key={i} value={listpointconsommation}></option>)}

                          </datalist>
                        </MDBCol>

                      </MDBCol>
                      <MDBCol size='6'>

                        <div className="d-flex justify-content-between ">
                          <p className=" m-0 p-0">Liste compteur : </p>

                        </div>
                        <MDBContainer style={{ padding: 0 + 'em' }}>
                          <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                            {/* {this.state.listcompteurglobal.map((listcompteurglobal, i) => <MDBListGroupItem hover key={i} value={listcompteurglobal.Le_Compteur} style={{ padding: 0.5 + 'em' }} hover onClick={() => this.handlecompteurselectedchange(listcompteurglobal.Le_Compteur, listcompteurglobal.Code_Compteur)}>{listcompteurglobal.Le_Compteur}</MDBListGroupItem>)} */}
                            {this.state.listcompteurglobal.map((listcompteurglobal, i) =>
                              <div className="d-flex d-flex bd-highlight example-parent" style={{
                                borderLeft: '0.5px solid #d6d4d4',
                                borderRight: '0.5px solid #d6d4d4',
                                borderTop: '0.5px solid #d6d4d4',
                                borderBottom: 'none'
                              }} >
                                <MDBListGroupItem hover key={i} value={listcompteurglobal.Le_Compteur}
                                  style={{ padding: 0.5 + 'em' }} hover
                                  onClick={() => this.handlecompteurselectedchange(listcompteurglobal.Le_Compteur, listcompteurglobal.Code_Compteur)}>
                                  {listcompteurglobal.Le_Compteur}</MDBListGroupItem>
                                <MDBBtn size="sm" color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                  onClick={() => this.getindexcompteur(i)}
                                >
                                  <MDBIcon icon="trash-alt" />

                                </MDBBtn>

                              </div>
                            )}
                            <MDBModal isOpen={this.state.modal7} toggle={this.toggle(7)} size="sm">
                              {/* <MDBModalHeader toggle={this.toggle(4)}>MDBModal title</MDBModalHeader> */}
                              <MDBModalBody>
                                <label>Êtes-vous sûr de vouloir supprimer?</label>


                              </MDBModalBody>
                              <MDBModalFooter>
                                <MDBBtn color="default" size="sm" onClick={() => this.deleteitemfromlistg()}>Supprimer</MDBBtn>

                                <MDBBtn color="primary" size="sm" onClick={this.toggle(7)}>Annuler</MDBBtn>
                              </MDBModalFooter>
                            </MDBModal>
                          </MDBListGroup>
                        </MDBContainer>



                      </MDBCol>

                    </MDBRow>


                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="default" size="sm" onClick={this.clonerobjective}>Cloner</MDBBtn>

                    <MDBBtn color="primary" size="sm" onClick={this.toggle(8)}>Annuler</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>

  {/*********************************************************************************************************************************************************** */}             

                <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} style={{width: "196px"}}> Enregistrer <MDBIcon icon="save" className="ml-1" /></MDBBtn>


                <div className="tabulator"  style={{ marginTop: 30 + 'px' }} ref={el => (this.el = el)} />
                {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn> */}
              </div>


            </div>

          )}
      </React.Fragment>
    )

  }





}
export default CasIncident;