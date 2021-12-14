//import 'react-tabulator/lib/styles.css';
import React, { useState } from "react";
import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
//import "tabulator-tables/dist/css/bootstrap/tabulator_bootstrap.min.css";

import axios from 'axios';
import "../../Rapporteur/CasEmail.css"
import { MDBBreadcrumb,MDBCol, MDBRow , MDBBreadcrumbItem,MDBJumbotron, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import uuid from 'react-uuid';
import Moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { isThisSecond } from 'date-fns';
import Swal from 'sweetalert2';
import Emploi_Temps from "./Emploi_TempsV2"
import ModifierEmploi_Temps from "./ModifierEmploi_Temps"

//import ConfirmNavigationModal from "./your-own-code";
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPhoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i);
const validateForm = (errors) => {
    let valid = true;
    console.log(errors)
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
class CasReguliers extends React.Component {

  el = React.createRef();

  mytable = "Tabulator"; //variable to hold your table
  tableData = [] //data for table to display

  componentDidMount() {

    //getdate
    this.getDate();

    const supprimertemp = this.state.supprimertemp;
    const datamodifier = this.state.datamodifier;

    /// api tabulator display EventEMail
    axios.defaults.withCredentials = true;
    axios.post(window.apiUrl+"display/",

      {
        tablename: "Reporting_F_Regulier_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }


    )

      .then(
        (result) => {

/////////////////////////////////////////////////////////////////////////////////////////////////////
if (result.data !== null){ 
          const dataglobale = result.data
          
              for (var i = 0; i <dataglobale.length ; i++) 
             {  
               const Event_Code =dataglobale[i].Event_Code
               const Event_Name =dataglobale[i].Event_Name
               const Next_Check= dataglobale[i].Next_Check
               const Event_Description=dataglobale[i].Event_Description
               
        
          
            const Frequency  = [dataglobale[i].Frequency]
            
       if(dataglobale[i].Frequency==null){

       console.log("vide")

       }else{
          Frequency.forEach(element => 
           this.state.Frequence_tab=element.Frequence)
         const Frequence=[this.state.Frequence_tab];

         const FrequenceUser=this.state.FrequenceUser=Frequence[0].FrequenceUser;
         Frequency.forEach(element => 
          this.state.OperateurValue_tab=element.OperateurValue)
        const OperateurValue=this.state.OperateurValue_tab;
      
                 
        Frequency.forEach(element => 
          this.state.UserInterface_tab=element.UserInterface)
        const UserInterface=this.state.UserInterface_tab;
    
        console.log("data cas regulier ",Event_Code,Event_Name,Next_Check,Event_Description,Frequence,OperateurValue,UserInterface,Frequency)
     

            const dataCasRegulier = {"Event_Code":Event_Code,"Event_Name":Event_Name,"Next_Check":Next_Check,"Event_Description":Event_Description,"Frequence":Frequence,"FrequenceUser":FrequenceUser,"OperateurValue":OperateurValue,"UserInterface":UserInterface,"Frequency":Frequency}
            console.log(dataCasRegulier)
         
          this.state.dataCasRegulier.push(dataCasRegulier)
          console.log( this.state.dataCasRegulier)
          
  }   

////////////////////////////////////////////////////////////////////////


//localStorage.setItem('OperateurValue', JSON.stringify(OperateurValue));
///////////////////////////

             }
            }
            else{
              console.log("data Email est vide")
            }
          this.tableData = this.state.dataCasRegulier;

          //tabulator
          this.mytable = new Tabulator(this.el, {
            data: this.tableData,

            //link data to table
            reactiveData: true, //enable data reactivity
            addRowPos: "top",
            pagination: "local",
            paginationSize: 6,
            movableColumns: true,      
            resizableRows: true,
            reactiveData: true,
            printRowRange: "selected",
            selectable: 1,
            selectablePersistence: this.state.position,
            
            paginationSizeSelector: [3, 6, 8, 10],
            columns: [
              {
                hozAlign: "center",
                headerSort: false,
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Nom de Cas Reguliers",
                field: "Event_Name",
                width: "20%",
                headerFilter: "input",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },

              {
                title: "Frequence",
                field: "FrequenceUser",
                width: "10%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Emploi du Temps",
                field: "UserInterface",
                width: "20%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Prochain réveil",
                field: "Next_Check",
                width: "17%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },
              {
                title: "Description de Cas Regulier",
                field: "Event_Description",
                width: "17%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2); 
                  datamodifier.push(cell.getData(), position);
                  console.log("valider",datamodifier)
                  const a = JSON.stringify(cell.getData().OperateurValue)
                  const b = a.replace(/'/g,"''")
                 
                  localStorage.setItem('OperateurValue', b );
                }
              },
             

              {
                title: "Supprimer",
                field: "supprimer",
                width: "13%",
                hozAlign: "center",
                formatter: function () { //plain text value

                  return "<i class='fa fa-trash-alt icon'></i>";

                },
                cellClick: function (e, cell) {
                 const F1 = JSON.stringify(cell.getData().Frequency)
                 const Frequency = F1.replace(/'/g,"''")
                 console.log("Frequency",Frequency)
                  
                  //supprimertemp.push(cell.getData().Event_Code+ ";" + cell.getData().Event_Name + ";" + cell.getData().Next_Check + ";" + cell.getData().Event_Description+ ";"+ Frequency + ";"  + 3);
                  
                    supprimertemp.push({
                    "Event_Code":cell.getData().Event_Code,
                    "Event_Name":cell.getData().Event_Name,
                    "Next_Check":cell.getData().Next_Check,
                    "Event_Description":cell.getData().Event_Description,
                    "Frequency":Frequency,
                    "DBAction":"3"
                  })
                  console.log(supprimertemp)
                  cell.getRow().delete();
                  Swal.fire({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    width: 300,
                    icon: '',
                    title: 'Supprimer temporairement  '+cell.getData().Event_Name 
          
                })
                },
                hideInHtml: true,
              },
            ], //define table columns
          });
          
          console.log("Reporting_F_Regulier", result.data);
        }
      )
   
    //  localStorage.clear();
  }
  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Event_Name: ' ', 
     Next_Check: ' ',
      periode: ' ',
  }
    this.state.Event_Name="";
    this.state.Next_Check="";
    this.state.periode="";
    this.state.Event_Description="";
    this.state.TempsUnite="";
    this.state.num=1;
    //////////////////
    axios.post(window.apiUrl+"sendid/",
      {
        tablename: "Reporting_F_Regulier_V3",
        identifier: this.state.dateDMY + uuid(),
        nombermaxcode :'1',
        primaryfield: "Event_Code",
        fields: "*",
        content: "*",

      }
    )

      .then(
        (result) => {

          //this.state.Event_Code=result.data.substring(1, result.data.length-1);
          var code= result.data.split(", ")
          this.state.Event_Code= code
          console.log(this.state.Event_Code,"Event_Code")
        })
  };
  toggle1 = () => {
    if ( this.state.datamodifier.length !=[]){
    this.setState({
      modal1: !this.state.modal1
    })
    this.state.errors = {
      Event_Name: ' ', 
     Next_Check: ' ',
      periode: ' ',
  }
    this.state.datamodifier.push();
    console.log(this.state.datamodifier)
    this.state.Event_Code = this.state.datamodifier[0].Event_Code;
    this.state.Event_Description = this.state.datamodifier[0].Event_Description;
    this.state.Event_Name = this.state.datamodifier[0].Event_Name; 
    this.state.Frequency = this.state.datamodifier[0].Frequency;
    this.state.Next_Check = this.state.datamodifier[0].Next_Check;
    const a = this.state.datamodifier[0].Frequency[0].Frequence
    const Frequence = [a]
    console.log('Frequence',Frequence)
    this.state.periode=Frequence[0].Periode
    this.state.TempsUnite=Frequence[0].UniteTemp
    this.state.num=Frequence[0].NbUnite
   // this.state.periode=this.state.datamodifier[0].Frequency[0].Frequence[0].Periode;
   // this.state.TempsUnite=this.state.datamodifier[0].Frequency[0].Frequence[0].UniteTemp;
   // this.state.num=this.state.datamodifier[0].Frequency[0].Frequence[0].NbUnite;
    
    this.state.position = this.state.datamodifier[1];
  }else{
    Swal.fire({
      toast: true,
      position: 'top',
      
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width:400,
      title: 'Sélectionner pour le modifier'})
  }
  };

  ajouter() {
    self = this
    if (validateForm(this.state.errors) == true) {
    this.setState({
      modal: !this.state.modal
    });
////////ajouterUserInterface///////////

    console.log("this.state.ajoutertap",this.state.ajoutertap)
for (var i = 0; i <this.state.ajoutertap.length ; i++) 
{
  const valeur =this.state.ajoutertap[i].valeur
  const c = valeur.replace(/'/g,"")
    const d= c.replace("(","")
    const e= d.replace(")","")
    const f= e.replace("and ",",") 
    this.state.valeur2=f
 console.log("valeur",this.state.valeur2)
 this.state.operateur2=this.state.ajoutertap[i].operateur
 console.log("operateur",this.state.operateur)
this.state.ajouterUserInterface.push(this.state.operateur2+" Periode "+this.state.valeur2+ " ") 
}


console.log(this.state.ajouterUserInterface)
/////////////
     
       const FrequenceJson = {"Periode":this.state.periode,"UniteTemp":this.state.TempsUnite,"NbUnite":this.state.num,"FrequenceUser": this.state.num+'_'+this.state.TempsUnite}
       console.log(FrequenceJson)
       this.state.FrequencyJson=[{"Frequence" : [FrequenceJson] ,"OperateurValue":this.state.ajoutertap,"UserInterface": this.state.ajouterUserInterface}]
     
         this.state.Frequency=JSON.stringify(this.state.FrequencyJson)
      
          const Event_Code = this.state.Event_Code[0];
          const Event_Description = this.state.Event_Description;
          const Event_Name = this.state.Event_Name;
         
         const b =  {"Frequence" : FrequenceJson,"OperateurValue":this.state.ajoutertap,"UserInterface": this.state.ajouterUserInterface}; 
           const Frequency =b
               console.log(Frequency)
          const Next_Check = this.state.Next_Check;
          const periode = this.state.periode;
           const evaluation = this.state.evaluation;
          const DBAction = "2";
          
        

          //this.state.ajout = ( Event_Code+ ";" + Event_Name + ";" + Next_Check + ";" + Event_Description + ";" + Frequency + ";" + DBAction)
          this.state.ajout =  {
            "Event_Code":Event_Code,
            "Event_Name":Event_Name,
            "Next_Check":Next_Check,
            "Event_Description":Event_Description,
            "Frequency":Frequency,
            "evaluation": null,
            "DBAction":DBAction}
          this.state.ajoutertemp.push(this.state.ajout);
          const  Frequence= this.state.FrequencyJson[0].Frequence; 
          const FrequenceUser =this.state.FrequencyJson[0].Frequence[0].FrequenceUser

          console.log("FrequenceUser",FrequenceUser)
          const  UserInterface= this.state.FrequencyJson[0].UserInterface; 
          console.log("UserInterface",UserInterface)




          this.mytable.addRow({ Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode }, true);
          console.log(this.state.ajout);
          console.log(this.state.ajoutertemp);

          this.state.Event_Description = "";
          this.state.Event_Name = "";
          this.state.Frequency = [];
          this.state.Next_Check = "";
          this.state.periode="";
          this.state.num=1;
          this.state.TempsUnite="";
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            width: 300,
            icon: 'success',
            title: 'Ajouter'
      
        })
      }else {
        Swal.fire({
            toast: true,
            position: 'top',

            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 400,
            title: 'S\il vous plait remplir tous les champs obligatoire'
        })
      }
        
  }
  modifier() {
    this.setState({
      modal1: !this.state.modal1
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
  ////////modifierUserInterface///////////
const a =  localStorage.getItem('modifiertap'); 
    
console.log(" localStorage modifiertap",a)
this.state.modifiertab=JSON.parse(a) 
console.log("this.state.modifiertap",this.state.modifiertap)
for (var i = 0; i <this.state.modifiertab.length ; i++) 
{
  const valeur =this.state.modifiertab[i].valeur
  const c = valeur.replace(/'/g,"")
    const d= c.replace("(","")
    const e= d.replace(")","")
    const f= e.replace("and ",",") 
    this.state.valeur2=f
this.state.operateur2=this.state.modifiertab[i].operateur
console.log("operateur",this.state.operateur)
this.state.modifierUserInterface.push(this.state.operateur2+" Periode "+this.state.valeur2+ " ") 
}


console.log(this.state.modifierUserInterface)
/////////////
const FrequenceJson = {"Periode":this.state.periode,"UniteTemp":this.state.TempsUnite,"NbUnite":this.state.num,"FrequenceUser": this.state.num+'_'+this.state.TempsUnite}
console.log(FrequenceJson)
   
   this.state.FrequencyJson=[{"Frequence" : [FrequenceJson],"OperateurValue":this.state.modifiertab,"UserInterface": this.state.modifierUserInterface}]
 // this.state.FrequencyJson=[{"Frequence": "2_Jour", "OperateurValue":[{"keyword":"Ensemble","operateur":"exclure","att":"Dans","valeur":"17:04"}],"UserInterface":["exclure Période 17:04"]}]
 //this.state.FrequencyJson=[{"Frequence":"4_Jour","OperateurValue":"[{\"keyword\":\"Intervalle\",\"operateur\":\"inclure\",\"att\":\"Haut et Bas\",\"valeur\":\"11:52;12:52\"}]","UserInterface":"[\"inclure Période 11:52;12:52\"]"}]
 // const b = a.replace(/\\/g,"")
   
 for (var i = 0; i <this.state.FrequencyJson.length ; i++) 
 {
  this.state.Frequence=this.state.FrequencyJson[i].Frequence;
  this.state.UserInterface=this.state.FrequencyJson[i].UserInterface;

 }
     this.state.Frequency=JSON.stringify(this.state.FrequencyJson)
      console.log(this.state.Frequency)
          const Event_Code = this.state.Event_Code;
          const Event_Description = this.state.Event_Description;
          const Event_Name = this.state.Event_Name;   

        //  const Frequence =this.state.Frequence;
        const FrequenceUser =this.state.FrequencyJson[0].Frequence[0].FrequenceUser

        console.log("FrequenceUser",FrequenceUser)
          const UserInterface=this.state.UserInterface;
          const b =  {"Frequence" : FrequenceJson,"OperateurValue":this.state.modifiertab,"UserInterface": this.state.modifierUserInterface}; 
       
        
        
          const Frequency =b
               console.log("gggggggggggggggggggggggggggggggggg",Frequency)
               const evaluation = this.state.evaluation;
          const Next_Check = this.state.Next_Check;

        const DBAction = "1";
    // push with modificationtemp 
    this.state.modificationtemp.push( {
      "Event_Code":Event_Code,
      "Event_Name":Event_Name,
      "Next_Check":Next_Check,
      "Event_Description":Event_Description,
      "Frequency":Frequency,
      "evaluation":null,
      "DBAction":DBAction});
    console.log(this.state.modificationtemp);
    console.log("this.state.modificationtemp")
    this.mytable.redraw(true);

  
    this.tableData[this.state.position].Event_Name= Event_Name;
    this.tableData[this.state.position].FrequenceUser= FrequenceUser;
    this.tableData[this.state.position].UserInterface= UserInterface;
    this.tableData[this.state.position].Next_Check= Next_Check;
    this.tableData[this.state.position].Event_Description= Event_Description;
   
    console.log("testttttt  " + [Event_Name,  Next_Check, Event_Description])
 
    this.state.Event_Description = "";
          this.state.Event_Name = "";
          this.state.Frequency = "";
          this.state.Next_Check = "";
    this.lod();
  }

  Enregistrer() {
    console.log("this.state.modificationtemp",this.state.modificationtemp)

    console.log("Email_Code",this.state.Email_Code,
    "supprimertemp",this.state.supprimertemp.length,
    "   ajoutertemp",this.state.ajoutertemp.length,
    "   modificationtemp",this.state.modificationtemp.length
    )
    if (this.state.ajoutertemp.length!=0 || this.state.modificationtemp.length!=0 || this.state.supprimertemp.length!=0){
      console.log("this.state.modificationtemp",this.state.modificationtemp)
    axios.post(window.apiUrl+"updatedelete/", {
      tablename: "Reporting_F_Regulier_V3",
      identifier: this.state.dateDMY + uuid(),
      datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),
      // datatodelete: ["Event_Code;Event_Name;Frequency;Next_Check;Event_Description;DBAction"].concat(this.state.supprimertemp)
    }
    )
      .then((response) => {
        console.log("Enregistrer");
        console.log(response.status);
        console.log(response.statusText);
        console.log(response);
        console.log(response.data);
    
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
      setTimeout(function(){
        window.location.reload(1);
     }, 1000);
    }
    else{
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Créez ou Modifier'
    })
  }
  }
  logValue = value => {
    console.log(value);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    var $ = require("jquery");
    console.log(e.target.value)
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
      $('#Annuelle').hide();
      $('#numAnnuelle').hide();
      this.state.TempsUnite=this.state.Temps_Reel_unite
  
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
      $('#Annuelle').hide();
      $('#numAnnuelle').hide();
      this.state.TempsUnite=this.state.Journalier_unite
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
      $('#Annuelle').hide();
      $('#numAnnuelle').hide();
      this.state.TempsUnite=this.state.Habdomadaire_unite
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
      $('#Annuelle').hide();
      $('#numAnnuelle').hide();
      this.state.TempsUnite=this.state.Mensuel_unite
    }
    if (e.target.value == "Annuelle") {

      $('#vide').hide();
      $('#Temps_Reel').hide();
      $('#numTemps_Reel').hide();
      $('#Journalier').hide();
      $('#numJournalier').hide();
      $('#Hebdomadaire').hide();
      $('#numHabdomadaire').hide();
      $('#Mensuel').hide();
      $('#numMensuel').hide();
      $('#Annuelle').show();
      $('#numAnnuelle').show();
      this.state.TempsUnite=this.state.Annuelle_unite
    }
    
/////////////////////////////////////////////////////
const { name, value } = e.target;
   let errors = this.state.errors;
   switch (name) {
       case 'Event_Name':
           errors.Event_Name =
               value.length < 5 /* && typeof value.length == "string" */
                   ? 'Nom doit comporter au moins 5 caractères!'
                   : '';
           break;
           case 'Next_Check':
           errors.Next_Check =
           value.length < 5 /* && typeof value.length == "string" */
               ? 'Prochain réveil est vide!'
               : '';
       break;
  
  
       case 'periode':
           errors.periode =
                 value.length < 5
               ? 'Frequence est vide!'
               : '';
           break;
           
            
       default:
           break;
   }

   this.setState({ errors, [name]: value });

////////////////////////////////////////////////////
  }

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      modal1: false,
      modal2: false,
      Event_Code: "",
      Event_Name: "",
      Frequency: [],
      Frequency1: [],
      evaluation:"",
      FrequencyJson: [],
      Next_Check: null,
      Event_Description: "",
      ajout: "",
      ajoutertemp: [],
      ajoutertap: [],
      modifiertap: [],
      modifierUserInterface:[],
      ajouterUserInterface:[],
      modifier: "",
      temp: "",
      supprimer: "",
      data: "",
      Temps_Reel_unite:'Min',
      Journalier_unite:'Heure',
      Habdomadaire_unite:'Jour',
      Mensuel_unite:'Jour',
      Annuelle_unite:'Mois',
      num:1,
      numTemps_Reel:1,
      numJournalier:1,
      numHabdomadaire:1,
      numMensuel:1,
      numAnnuelle:1,
      periode:"",
      valeur2:"",
      operateur2:"",
      TempsUnite:"",
      supprimertemp: [],
      modificationtemp: [],
      datamodifier: [],
      email: [],
      keyword:"",
      operateur:"",
      haut:"",
      bas:"",
      FrequenceUser:"",
      dans:"",
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      position: null,
      Frequence_tab:[],
      OperateurValue_tab:"",
      UserInterface_tab:"",
      UserInterface:"",
      Frequence:"",
      dataCasRegulier:[],
      errors: {
        Event_Name: '* Obligatoire', 
        Next_Check: '* Obligatoire',
        periode: '* Obligatoire',
    }
    }
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.copier = this.copier.bind(this);
    
  }

  copier = () => {

    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      console.log(this.state.datamodifier)
      //next
      //this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
      //this.getmaxid();



      //console.log(Alarme_Code)
      this.setState({ isDisabledbutton: true })

      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Reporting_F_Regulier_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode :'1',
          primaryfield: "Event_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {

            console.log('resultt data get max code ' + result.data)
            /* this.setState({
              loading: false,
            }) */
            if (result.data == null) {
              alert("N'existe pas max code ");

            } else {
              var code= result.data.split(", ")
            //  this.state.Event_Code= code
              //console.log(this.state.Event_Code,"Event_Code")

              // var code = result.data
              // console.log(typeof (result.data))
              // console.log(result.data[0])

              // var array = code.split(",");
             
              // console.log(array)
              // console.log("Alarme_Code " + code)
              this.setState({ Event_Code: code })
              console.log(this.state.Event_Code,"Event_Code")

              /////////////////////////////////////
           //   this.state.Event_Code = this.state.datamodifier[0].Event_Code;
              this.state.Event_Description = this.state.datamodifier[0].Event_Description;
              this.state.Event_Name =  'copie ' +this.state.datamodifier[0].Event_Name; 
              this.state.Frequency1 = this.state.datamodifier[0].Frequency;
              console.log("this.state.Frequency",this.state.Frequency1[0].UserInterface)
              console.log("this.state.Frequency",this.state.Frequency1[0].OperateurValue)
              const c =JSON.stringify(this.state.Frequency1[0].OperateurValue)
              const d = c.replace(/'/g,"''")
              const OperateurValue = JSON.parse(d)
              console.log("OperateurValue",OperateurValue)
              this.state.Next_Check = this.state.datamodifier[0].Next_Check;
              const a = this.state.datamodifier[0].Frequency[0].Frequence
              console.log('a',a)
              const Frequence1 = [a]
              console.log('Frequence1',Frequence1)
              this.state.periode=Frequence1[0].Periode
              this.state.TempsUnite=Frequence1[0].UniteTemp
              this.state.num=Frequence1[0].NbUnite

              this.state.position = this.state.datamodifier[1];
              const FrequenceJson = {"Periode":this.state.periode,"UniteTemp":this.state.TempsUnite,"NbUnite":this.state.num,"FrequenceUser": this.state.num+'_'+this.state.TempsUnite}
              console.log(FrequenceJson)
              this.state.FrequencyJson=[{"Frequence" : [FrequenceJson] ,"OperateurValue":OperateurValue,"UserInterface": this.state.Frequency1[0].UserInterface}]
            
                this.state.Frequency=JSON.stringify(this.state.FrequencyJson)
             
                 const Event_Code = this.state.Event_Code[0];
                 const Event_Description = this.state.Event_Description;
                 const Event_Name = this.state.Event_Name;
                
                const b =  {"Frequence" : FrequenceJson,"OperateurValue":OperateurValue,"UserInterface": this.state.Frequency1[0].UserInterface}; 
                console.log("b",b)  
                const Frequency =b
                      console.log(Frequency)
                 const Next_Check = this.state.Next_Check;
                 const periode = this.state.periode;
                  const evaluation = this.state.evaluation;
                 const DBAction = "2";
                 
               
       
                 //this.state.ajout = ( Event_Code+ ";" + Event_Name + ";" + Next_Check + ";" + Event_Description + ";" + Frequency + ";" + DBAction)
                 this.state.ajout =  {
                   "Event_Code":Event_Code,
                   "Event_Name":Event_Name,
                   "Next_Check":Next_Check,
                   "Event_Description":Event_Description,
                   "Frequency":Frequency,
                   "evaluation": null,
                   "DBAction":DBAction}
                 this.state.ajoutertemp.push(this.state.ajout);
                 const  Frequence= this.state.FrequencyJson[0].Frequence; 
                 const FrequenceUser =this.state.FrequencyJson[0].Frequence[0].FrequenceUser
       
                 console.log("FrequenceUser",FrequenceUser)
                 const  UserInterface= this.state.FrequencyJson[0].UserInterface; 
                 console.log("UserInterface",UserInterface)
       
       
       
       
                 this.mytable.addRow({ Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode }, true);
                 console.log(this.state.ajout);
                 console.log(this.state.ajoutertemp);
       
                 this.state.Event_Description = "";
                 this.state.Event_Name = "";
                 this.state.Frequency = [];
                 this.state.Next_Check = "";
                 this.state.periode="";
                 this.state.num=1;
                 this.state.TempsUnite="";
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

lod(){
  window.addEventListener('beforeunload', function (e) { 
    e.preventDefault(); 
    e.returnValue = 'Les modifications que vous avez apportées ne seront peut-être pas enregistrées.'; 
 }); }

 updateDate(newDate) {

  this.setState({
    Next_Check: newDate=Moment(newDate).format('DD/MM/YYYY HH:mm:ss'),  
    
  });

  
}
AjoutDataEmploi=(DataEmploi)=>{
  console.log("-----------------DataEmploi--------------------",DataEmploi)
  this.setState({ajoutertap:DataEmploi})
    }
  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM'}}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Cas-Reguliers</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn>

          
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
          <MDBModalHeader toggle={this.toggle} >Nouveau Cas Reguliers</MDBModalHeader>
          <MDBModalBody>
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
              Nom de Cas Reguliers <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
               </label>
              <input type="text" id="1" id="defaultFormLoginEmailEx"  name="Event_Name" className="form-control" value={this.state.Event_Name} onChange={this.handleChange} required />
             
              {errors.Event_Name.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Name}</span>}
            
              <MDBRow>  <MDBCol size="5">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Prochain réveil <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <MDBInput style={{height: '37px'}}  step="2" outline size="sm" type="datetime-local" className="form-control" name="Next_Check" value={this.state.Next_Check} placeholder="" onChange={this.handleChange} />

              {/* <Datetime dateFormat="DD/MM/YYYY" timeFormat="HH:mm:ss" name="Next_Check" value={this.state.Next_Check}  onChange={this.updateDate}/> */}
             {errors.Next_Check.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Next_Check}</span>}
              
              </MDBCol> 
             
          
              </MDBRow>
              <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0",borderStyle: "solid",  borderRadius: '4px'}}>
              <legend style={{ width:"112px", color: "#51545791"}}>Frequence </legend>
           
    <MDBRow>  <MDBCol size="4">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Periode <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              
              <select  
                className="browser-default custom-select" id="2" name="periode" value={this.state.periode} onChange={this.handleChange} required>
                  <option value="vide"></option>
                  <option value="Temps_Reel">Temps réel</option>
                  <option value="Journalier">Journalier</option>
                  <option value="Hebdomadaire">Hebdomadaire</option>
                  <option value="Mensuel">Mensuel</option>
                  <option value="Annuelle">Annuelle</option>
              </select> 

              {errors.periode.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.periode}</span>}
            
              </MDBCol> 
               <MDBCol>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Unté de temps
              </label>
              <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control "  value={this.state.TempsUnite} onChange={this.handleChange} disabled/> 
              <input type="text" id="1" id="Journalier"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite} onChange={this.handleChange} disabled /> 
              <input type="text" id="1"id="Hebdomadaire"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite}onChange={this.handleChange} disabled /> 
              <input type="text" id="1" id="Mensuel"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite} onChange={this.handleChange} disabled />
              <input type="text" id="1" id="Annuelle"  name="Unte_temps" className="form-control option " value={this.state.TempsUnite} onChange={this.handleChange} disabled /> 
              </MDBCol> 
               <MDBCol size="4">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Nombre d'unité
              </label>
              <input type="number" min="1" max="59" name="num" id="numTemps_Reel" className="form-control  " value={this.state.num}  onChange={this.handleChange} />
              <input type="number" min="1" max="24" name="num"id="numJournalier" className="form-control option " value={this.state.num}  onChange={this.handleChange} />
              <input type="number" min="1" max="7"  name="num"id="numHabdomadaire" className="form-control option " value={this.state.num}  onChange={this.handleChange}/>
              <input type="number" min="1" max="31"  name="num"id="numMensuel" className="form-control option "value={this.state.num}  onChange={this.handleChange}/>
              <input type="number" min="1" max="12"  name="num" id="numAnnuelle" className="form-control option "value={this.state.num} onChange={this.handleChange}/>
              

              </MDBCol> 
              </MDBRow>

              </fieldset>
              <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0",borderStyle: "solid",  borderRadius: '4px'}}>
              <legend style={{ width:"190px", color: "#51545791"}}>Emploi du Temps</legend>
              <Emploi_Temps  AjoutTab={this.AjoutDataEmploi}/>
              </fieldset>   
        
            
            
            
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
              Description de Cas Regulier
               </label>
              <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Event_Description" value={this.state.Event_Description} onChange={this.handleChange} required />
          </MDBModalBody>
          <MDBModalFooter>
          
            <MDBBtn color="#e0e0e0 grey lighten-2" style={{marginRight: "40%"}} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1"/>    Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1}  id="btnmod"  >Modifier</MDBBtn>


          <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} size="lg" centered>
          <MDBModalHeader toggle={this.toggle1} >Modifier Cas Reguliers</MDBModalHeader>
          <MDBModalBody>
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
              Nom de Cas Reguliers <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
               </label>
              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Event_Name" className="form-control" value={this.state.Event_Name} onChange={this.handleChange} required />
             
              {errors.Event_Name.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Name}</span>}
            
              <MDBRow>  <MDBCol size="5">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Prochain réveil <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <MDBInput style={{height: '37px'}}  step="2"  label="Haute" outline size="sm" type="datetime-local" className="form-control" name="Next_Check" value={this.state.Next_Check} placeholder="" onChange={this.handleChange} />

              {/* <Datetime dateFormat="DD/MM/YYYY" timeFormat="HH:mm:ss" name="Next_Check" value={this.state.Next_Check}  onChange={this.updateDate}/> */}
               {errors.Next_Check.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Next_Check}</span>}
             
              </MDBCol> 
             
          
              </MDBRow>
              <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0",borderStyle: "solid",  borderRadius: '4px'}}>
              <legend style={{ width:"112px", color: "#51545791"}}>Frequence </legend>
           
    <MDBRow>  <MDBCol size="4">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Periode <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              
              <select  
                className="browser-default custom-select" id="2" name="periode" value={this.state.periode} onChange={this.handleChange} required>
                  <option value="vide"></option>
                  <option value="Temps_Reel">Temps réel</option>
                  <option value="Journalier">Journalier</option>
                  <option value="Hebdomadaire">Hebdomadaire</option>
                  <option value="Mensuel">Mensuel</option>
                  <option value="Annuelle">Annuelle</option>
              </select> 

              {errors.periode.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.periode}</span>}
            
              </MDBCol> 
               <MDBCol>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Unté de temps
              </label>
              <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control "  value={this.state.TempsUnite} onChange={this.handleChange} disabled/> 
              <input type="text" id="1" id="Journalier"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite} onChange={this.handleChange} disabled /> 
              <input type="text" id="1"id="Hebdomadaire"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite}onChange={this.handleChange} disabled /> 
              <input type="text" id="1" id="Mensuel"  name="Unte_temps" className="form-control option" value={this.state.TempsUnite} onChange={this.handleChange} disabled />
              <input type="text" id="1" id="Annuelle"  name="Unte_temps" className="form-control option " value={this.state.TempsUnite} onChange={this.handleChange} disabled /> 
              </MDBCol> 
               <MDBCol size="4">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Nombre d'unité
              </label>
              <input type="number" min="1" max="59" name="num" id="numTemps_Reel" className="form-control  " value={this.state.num}  onChange={this.handleChange} />
              <input type="number" min="1" max="24" name="num"id="numJournalier" className="form-control option " value={this.state.num}  onChange={this.handleChange} />
              <input type="number" min="1" max="7"  name="num"id="numHabdomadaire" className="form-control option " value={this.state.num}  onChange={this.handleChange}/>
              <input type="number" min="1" max="31"  name="num"id="numMensuel" className="form-control option "value={this.state.num}  onChange={this.handleChange}/>
              <input type="number" min="1" max="12"  name="num" id="numAnnuelle" className="form-control option "value={this.state.num} onChange={this.handleChange}/>
              

              </MDBCol> 
              </MDBRow>

              </fieldset>
              <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0",borderStyle: "solid",  borderRadius: '4px'}}>
              <legend style={{ width:"190px", color: "#51545791"}}>Emploi du Temps</legend>
              <ModifierEmploi_Temps/>
              </fieldset>   
        
            
            
            
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
              Description de Cas Regulier
               </label>
              <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Event_Description" value={this.state.Event_Description} onChange={this.handleChange} required />
          </MDBModalBody>
          <MDBModalFooter>
          
            <MDBBtn color="#e0e0e0 grey lighten-2" style={{marginRight: "40%"}}  onClick={this.modifier}> <MDBIcon far icon="edit" />   Modifier</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


        <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} >Copier</MDBBtn>
        

          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} > Enregistrer <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          <div>
            <div className="tabulator"  ref={el => (this.el = el)} /></div>

        </div>
  


      </div>
    );
  }

}

export default CasReguliers;





//Les modifications que vous avez apportées ne seront peut-être pas enregistrées.