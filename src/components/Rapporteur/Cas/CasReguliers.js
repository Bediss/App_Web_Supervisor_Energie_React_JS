//import 'react-tabulator/lib/styles.css';
import React, { useEffect,useState } from "react";
import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
//import "tabulator-tables/dist/css/bootstrap/tabulator_bootstrap.min.css";

import axios from 'axios';
import axios1 from '../../axios'
import "../../Rapporteur/CasEmail.css"
import { MDBBreadcrumb,MDBCol, MDBRow , MDBBreadcrumbItem,MDBJumbotron, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import uuid from 'react-uuid';
import Moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { isThisSecond } from 'date-fns';
import Swal from 'sweetalert2';
import Emploi_Temps from "./Emploi_TempsV2"
import ModifierEmploi_Temps from "./ModifierEmploi_TempsV2"
import { ReactTabulator, reactFormatter } from 'react-tabulator'

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
import Navbar from "../../navbar";
class CasReguliers extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      columnsReactTabulator:[   
        
      {
        title: "Nom de Cas Reguliers",
        field: "Event_Name",
        width: "20%",
        headerFilter: "input",
        cellClick: this.datamodifierFun
        // cellClick: function (e, cell, row) {
        //   var position = cell.getRow().getPosition()
        //   console.log(position);
        //   datamodifier.splice(0, 2); 
        //   datamodifier.push(cell.getData(), position);
        //   console.log("valider",datamodifier)
        //   const a = JSON.stringify(cell.getData().OperateurValue)
        //   const b = a.replace(/'/g,"''")
         
        //   localStorage.setItem('OperateurValue', b );
        // }
      },

      {
        title: "Frequence",
        field: "FrequenceUser",
        width: "10%",
        cellClick: this.datamodifierFun
      },
      {
        title: "Emploi du Temps",
        field: "UserInterface",
        width: "20%",
        cellClick: this.datamodifierFun
      },
      {
        title: "Prochain réveil",
        field: "Next_Check",
        width: "17%",
        cellClick: this.datamodifierFun
      },
      {
        title: "Description de Cas Regulier",
        field: "Event_Description",
        width: "17%",
        cellClick: this.datamodifierFun
      },
     

      {
        title: "Supprimer",
        field: "supprimer",
        width: "13%",
        hozAlign: "center",
        formatter: this.supprimerFunIcon,
        cellClick: this.supprimerFunclick
  
      }],
      tableData: [],
      cellName: "",
      cellTable:"",
      modal: false,
      modal1: false,
      modal2: false,
      Event_Code: "",
      Event_Name: "",
      Frequency: [],
      Frequency1: [],
      evaluation:1,
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
      periode:"Journalier",
      valeur2:"",
      operateur2:"",
      TempsUnite:"Heure",
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
    },
    history:props.history,
    validationEmploiTemp: false,
    OperateurValueModifier:[],
    modifiertab:[],
    }
    this.table = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.copier = this.copier.bind(this);
    
  }

  componentDidMount() {

    //getdate
    this.getDate();

    const supprimertemp = this.state.supprimertemp;
    const datamodifier = this.state.datamodifier;

 
   
    axios1.get(window.apiUrl+"getRegular/?name&freq&next&desc&eval")

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
               
        
          
            const Frequency  = dataglobale[i].Frequency
            const FrequencyArray =[dataglobale[i].Frequency]
       if(dataglobale[i].Frequency==null){

       console.log("vide")

       }else{
        FrequencyArray.forEach(element => 
           this.state.Frequence_tab=element.Frequence)
         const Frequence=[this.state.Frequence_tab];

         const FrequenceUser=this.state.FrequenceUser=Frequence[0].FrequenceUser;
         FrequencyArray.forEach(element => 
          this.state.OperateurValue_tab=element.OperateurValue)
        const OperateurValue=this.state.OperateurValue_tab;
      
                 
        FrequencyArray.forEach(element => 
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
 
           this.setState({tableData:this.state.dataCasRegulier})
      
          
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
    this.state.periode="Journalier";
    this.state.Event_Description="";
    this.state.TempsUnite="Heure";
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
    console.log('Frequence------------------------>',this.state.datamodifier[0].Frequency)
    this.state.OperateurValueModifier = this.state.datamodifier[0].Frequency.OperateurValue
    const Frequence = this.state.datamodifier[0].Frequency.Frequence
    console.log('Frequence',Frequence)
    this.state.periode=Frequence.Periode
    this.state.TempsUnite=Frequence.UniteTemp
    this.state.num=Frequence.NbUnite
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
      title: 'Veuillez sélectionner une entrée à modifier'})
  }
  };

  ajouter() {
    self = this
    if (this.state.validationEmploiTemp == false&&this.state.Event_Name!=""&&this.state.periode!=""&&this.state.TempsUnite!=""&&this.state.Next_Check!="") {
    this.setState({
      modal: !this.state.modal
    });
////////ajouterUserInterface///////////

    console.log("this.state.ajoutertap",this.state.ajoutertap)
for (var i = 0; i <this.state.ajoutertap.length ; i++) 
{
  const valeur =this.state.ajoutertap[i].valeur
  const c = valeur.replace(/\|/g,"")
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
           const evaluation = 1;
          const DBAction = "2";
          
        

          //this.state.ajout = ( Event_Code+ ";" + Event_Name + ";" + Next_Check + ";" + Event_Description + ";" + Frequency + ";" + DBAction)
          this.state.ajout =  {
            "Event_Code":Event_Code,
            "Event_Name":Event_Name,
            "Next_Check":Next_Check,
            "Event_Description":Event_Description,
            "Frequency":Frequency,
            "evaluation": 1,
            "DBAction":DBAction}
          this.state.ajoutertemp.push(this.state.ajout);
          const  Frequence= this.state.FrequencyJson[0].Frequence; 
          const FrequenceUser =this.state.FrequencyJson[0].Frequence[0].FrequenceUser

          console.log("FrequenceUser",FrequenceUser)
          const  UserInterface= this.state.FrequencyJson[0].UserInterface; 
          console.log("UserInterface",UserInterface)




          this.table.current.table.addRow({ Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode,Frequency }, true);
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
      }
      else if(this.state.Event_Name==""){
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          width: 300,
          icon: 'warning',
          title: "Veuillez entrer un nom valide pour votre Cas Régulier. Celui-ci ne peut pas être vide. "
        })
      }  else if (this.state.Next_Check==""){
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          width: 300,
          icon: 'warning',
          title: 'Veuillez Remplir le champ Prochain réveil'
  
        })
      }else if (this.state.periode == ""&&this.state.TempsUnite=="") {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          width: 300,
          icon: 'warning',
          title: 'Veuillez entrer une fréquence  valide pour votre Cas Régulier. Celui-ci ne peut pas être vide'
  
        })
  
      }
      else if (this.state.validationEmploiTemp == true) {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          width: 300,
          icon: 'warning',
          title: "Veuillez enregistrer l'emploi du temps de votre cas régulier."
        })
      }
    
      
      else {
        Swal.fire({
            toast: true,
            position: 'top',

            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 400,
            title: 'Veuillez saisir tous les champs obligatoires'
        })
      }
        
  }
  modifier() {
    if(this.state.validationEmploiTemp == false&&this.state.Event_Name!=""&&this.state.periode!=""&&this.state.TempsUnite!=""&&this.state.Next_Check!=""){
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

    
if(this.state.modifiertab.length!=0){
for (var i = 0; i <this.state.modifiertab.length ; i++) 
{
  const valeur =this.state.modifiertab[i].valeur
  const f = this.state.modifiertab[i].valeur
  .replace("dimanche", "Dimanche")
  .replace("samedi", "Samedi")
  .replace("vendredi", "Vendredi")
  .replace("jeudi", "Jeudi")
  .replace("mercredi", "Mercredi")
  .replace("mardi", "Mardi")
  .replace("lundi", "Lundi")
  .replace("last_a", "Dernier jour de l'année")
  .replace("last_m", "Dernier jour du mois")
  .replace("last_s", "Dernier jour de la semaine")
  .replace("(", "").replace(")", "").replace("and ", ",").replace(/\|/g, " ")
    this.state.valeur2=f
this.state.operateur2=this.state.modifiertab[i].operateur
console.log("operateur",this.state.operateur)
this.state.modifierUserInterface.push(this.state.operateur2+" Periode "+this.state.valeur2+ " ") 
}


console.log(this.state.modifierUserInterface)

}
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
          const UserInterface=this.state.modifierUserInterface;
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
      "evaluation":1,
      "DBAction":DBAction});
    console.log(this.state.modificationtemp);
    console.log("this.state.modificationtemp")
    

  
    const periode = this.state.periode;
    const aaa = {
  

      Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode,Frequency
    }
    this.table.current.table.updateData([aaa])
    console.log("testttttt  " + [Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode])
 
    this.state.Event_Description = "";
          this.state.Event_Name = "";
          this.state.Frequency = "";
          this.state.Next_Check = "";
  } else if(this.state.Event_Name==""){
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'warning',
      title: "Remplir le champ Nom de Cas Reguliers "
    })
  }  else if (this.state.Next_Check==""){
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'warning',
      title: 'Veuillez Remplir le champ Prochain réveil'

    })
  }else if (this.state.periode == ""&&this.state.TempsUnite=="") {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'warning',
      title: 'Veuillez entrer une fréquence  valide pour votre Cas Régulier. Celui-ci ne peut pas être vide'

    })

  }
  else if (this.state.validationEmploiTemp == true) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'warning',
      title: "Veuillez enregistrer l'emploi du temps de votre cas régulier."
    })
  }
  else {
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
    //   setTimeout(function(){
    //     window.location.reload(1);
    //  }, 500);
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
               ? 'Veuillez saisir une valeur de fréquence valide. Ce champ ne peut pas être vide.'
               : '';
           break;
           
            
       default:
           break;
   }

   this.setState({ errors, [name]: value });

////////////////////////////////////////////////////
  }

  copier = () => {

    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      console.log(this.state.datamodifier)
      //next
      //this.state.Alarme_Code = this.state.datamodifier[0].Alarme_Code;
      //this.getmaxid();



      //console.log(Alarme_Code)
     // this.setState({ isDisabledbutton: true })

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
              console.log("this.state.Frequency",this.state.Frequency1.UserInterface)
              console.log("this.state.Frequency",this.state.Frequency1.OperateurValue)
         
              const OperateurValue = this.state.Frequency1.OperateurValue
              console.log("OperateurValue",OperateurValue)
              this.state.Next_Check = this.state.datamodifier[0].Next_Check;
            
              const Frequence1 = this.state.datamodifier[0].Frequency.Frequence
              console.log('Frequence1',Frequence1)
              this.state.periode=Frequence1.Periode
              this.state.TempsUnite=Frequence1.UniteTemp
              this.state.num=Frequence1.NbUnite

              this.state.position = this.state.datamodifier[1];
              const FrequenceJson = {"Periode":this.state.periode,"UniteTemp":this.state.TempsUnite,"NbUnite":this.state.num,"FrequenceUser": this.state.num+'_'+this.state.TempsUnite}
              console.log(FrequenceJson)
              this.state.FrequencyJson=[{"Frequence" : FrequenceJson ,"OperateurValue":OperateurValue,"UserInterface": this.state.Frequency1.UserInterface}]
            
                this.state.Frequency=JSON.stringify(this.state.FrequencyJson)
             
                 const Event_Code = this.state.Event_Code[0];
                 const Event_Description = this.state.Event_Description;
                 const Event_Name = this.state.Event_Name;
                
                const b =  {"Frequence" : FrequenceJson,"OperateurValue":OperateurValue,"UserInterface": this.state.Frequency1.UserInterface}; 
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
                   "evaluation": 1,
                   "DBAction":DBAction}
                 this.state.ajoutertemp.push(this.state.ajout);
                 const  Frequence= this.state.FrequencyJson[0].Frequence; 
                 const FrequenceUser =this.state.FrequencyJson[0].Frequence.FrequenceUser
       
                 console.log("FrequenceUser",FrequenceUser)
                 const  UserInterface= this.state.FrequencyJson[0].UserInterface; 
                 console.log("UserInterface",UserInterface)
       
       
       
       
                 this.table.current.table.addRow({ Event_Code, Event_Name, FrequenceUser,UserInterface,Next_Check, Event_Description,periode,Frequency }, true);
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

    supprimerFunIcon() {
      return "<i class='fa fa-trash-alt icon'></i>";
    }
    supprimerFunclick = (e, cell) => {
      console.log(cell)
      this.toggleDelete()
      this.CellTableFun(cell)
      //cell.getData();
      //  alert("confirmation de Suppression" + " " + cell.getData().U_Alarme_Name);
  
    }
    datamodifierFun = (e, cell, row) => {

      var datamodifier = [cell.getData()];
      // var position = cell.getRow().getPosition()
      //datamodifier.splice(0, 2)
      const position = cell.getRow().getPosition()
      this.setState({ position })
      console.log("datamodifier", datamodifier)
      this.selectDataTabulator(datamodifier)
      // this.setState({datamodifier:datamodifier})
  
    }
    selectDataTabulator = (ArrayData) => {
      this.setState({ datamodifier: ArrayData })
    }
  
    CellTableFun = (cell) => {
      this.setState({ cellTable: cell })
      this.setState({ cellName: cell.getData().Event_Name })
    }
    toggleDelete = () => {
      this.setState({
        modalDelete: !this.state.modalDelete
      });
    }
    deletetab = () => {
  
      this.toggleDelete()
      this.state.cellTable.getRow().delete();
      this.state.supprimertemp.push(
        {
          "Event_Code":this.state.cellTable.getData().Event_Code,
              "Event_Name":this.state.cellTable.getData().Event_Name,
              "Next_Check":this.state.cellTable.getData().Next_Check,
              "Event_Description":this.state.cellTable.getData().Event_Description,
              "Frequency":this.state.cellTable.getData().Frequency,
              "DBAction":"3"
        })
  
    }

    validationEmploi = (Validation) => {
      console.log("cas incidents pas validation emploi", Validation)
      this.setState({ validationEmploiTemp: Validation })
    }

    ModifierDataEmploi = (DataEmploi) => {
      //console.log("-----------------DataEmploi--------------------",DataEmploi)
      this.setState({ modifiertab: DataEmploi })
    }
    //////
  render() {
    const { errors } = this.state;
    
    return (
      <>
         <Navbar history={this.state.history}/>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM'}}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Cas-Reguliers</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn> */}

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle} style={{ width: "196px" }} className="float-left">Nouveau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>
          
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
              <Emploi_Temps  AjoutTab={this.AjoutDataEmploi} /*AjoutTab={AjoutTab}*/ ValidationEmploi={this.validationEmploi}/>
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

          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1}  id="btnmod"  >Modifier</MDBBtn> */}

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" style={{ width: "196px" }} className="float-left">Modifier <MDBIcon icon="pen-square" className="ml-1" /></MDBBtn>

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
              <ModifierEmploi_Temps OperateurValueModifier={this.state.OperateurValueModifier} ModifierTab={this.ModifierDataEmploi} ValidationEmploi={this.validationEmploi}/>
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


        {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} >Copier</MDBBtn> */}
        <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} style={{ width: "196px" }} className="float-left" disabled={this.state.isDisabledbutton}>Copier <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
        

          {/* <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} > Enregistrer <MDBIcon icon="save" className="ml-1" /></MDBBtn> */}
          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} style={{ width: "196px" }}> Enregistrer <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          {/* <div> <div className="tabulator"  ref={el => (this.el = el)} /></div> */}
          {/* {this.state.tableData.length ?  */}
          <ReactTabulator style={{ marginTop: 30 + 'px' }}
            ref={this.table}
            // cellClick={this.click}
            // rowClick={this.click2}
            data={this.state.tableData}
            columns={this.state.columnsReactTabulator}
            layout={"fitData"}
            index={"Event_Code"}
            options={{
              pagination: true,
              paginationSize: 8,

              paginationSizeSelector: [8, 10],
              pagination: "local",
              selectable: 1,
              movableColumns: true,
              resizableRows: true,
              reactiveData: true,
            }}
          /> 
          {/* : <></>} */}
          <DeleteRow toggle={this.toggleDelete} modal={this.state.modalDelete} deletetab={this.deletetab} cellTable={this.state.cellTable} cellName={this.state.cellName} />

        </div>
  


      </>
    );
  }

}

export default CasReguliers;



const DeleteRow = ({ toggle, modal, deletetab, cellName }) => {
  useEffect(() => {

  }, [cellName])

  return (<MDBContainer>

    <MDBModal isOpen={modal} toggle={toggle} centered>
      <MDBModalHeader toggle={toggle}>Confirmation de Suppression  </MDBModalHeader>
      <MDBModalBody style={{ textAlign: "center", fontSize: '120%' }}>
        Supprimer temporairement l'alarme
        <p style={{ fontWeight: "bold", color: "#b71c1c" }}> {cellName}</p>
      </MDBModalBody>
      <MDBModalFooter>

        <MDBBtn color="#b71c1c red darken-4" style={{ color: "#fff" }} onClick={deletetab}>Supprimer</MDBBtn>
        <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "18%" }} onClick={toggle} >Annuller</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
  );
}


//Les modifications que vous avez apportées ne seront peut-être pas enregistrées.