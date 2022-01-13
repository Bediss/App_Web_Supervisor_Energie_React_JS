//import 'react-tabulator/lib/styles.css';
import React, { useEffect, useState } from "react";

import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
//import "tabulator-tables/dist/css/bootstrap/tabulator_bootstrap.min.css";

import axios from 'axios';
import axios1 from '../../axios'
import "../CasEmail.css"
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer,MDBRow,MDBCol, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import uuid from 'react-uuid';
import Moment from 'moment';
import { Prompt } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import Swal from 'sweetalert2';
import Navbar from "../../navbar";
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


class CasEmail extends React.Component {

 
  getApi=()=>{
   /// api regulier   

   axios1.get(window.apiUrl + "getRegular/?name")
     .then(
       (result) => {
         if (result.data.length !== 0) {
        

           this.setState({casregulier:result.data})
         
           
         }
       


       })
       .catch(({ response }) => {
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/login")
            localStorage.clear();

          }
        }
      }
      )

   ///api alarme


   axios1.get(window.apiUrl + "getIncidents/"
   )

     .then(
       (result) => {
         if (result.data.length != 0) {
         
           this.setState({casalarem:result.data})
         
         } 

       })
       .catch(({ response }) => {
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/login")
            localStorage.clear();

          }
        }
      }
      )
   //// api email 
   axios1.get(window.apiUrl + "getEmails/"
   )

     .then(
       (result) => {
         if (result.data !== null) {
           this.state.email = result.data;
           this.setState({email:result.data})
     
         } 

       })

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

  componentDidMount() {
    //getdate
    this.getDate();

  

    /// api tabulator display EventEMail
  
    axios1.get(window.apiUrl + "getEventEmail/")

      .then(
        (result) => {

          if (result.data !== null){
            
          this.setState({tableData:result.data})
             }   else
          {
            console.log("data EventEMail est vide")
          }
        
          //tabulator
    

          console.log("EventEMail", result.data);
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






  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  toggle = () => {
    this.getApi()
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Event_Email_Nom: ' ', 
      Event_Type: ' ',
      Email_Nom: ' ',
      Event_Nom: ' ', 

 

  }
    this.state.Event_Email_Nom="";
    this.state.Event_Nom="";
    this.state.Event_Type="";
    this.state.description="";
    this.state.Email_Nom="";

  };

  toggle1 = () => {
    this.getApi()
    if (this.state.datamodifier.length != []) {
      this.setState({
        modal1: !this.state.modal1
      })

      this.state.errors = {
        Event_Email_Nom: ' ', 
        Event_Type: ' ',
        Email_Nom: ' ',
        Event_Nom: ' ', 

       
    }
      this.state.datamodifier.push();
      console.log(this.state.datamodifier)
      this.state.Event_Email_Code = this.state.datamodifier[0].Event_Email_Code;
      this.state.Event_Code = this.state.datamodifier[0].Event_Code;
      console.log(this.state.Event_Code)
      this.state.Email_Code = this.state.datamodifier[0].Email_Code;
      console.log(this.state.Email_Code)
      this.state.Event_Email_Nom = this.state.datamodifier[0].Event_Email_Nom;
      this.state.Event_Nom = this.state.datamodifier[0].Event_Nom;
      this.state.Event_Type = this.state.datamodifier[0].Event_Type;
      this.state.Email_Nom = this.state.datamodifier[0].Email_Nom;
      this.state.description = this.state.datamodifier[0].description;
      this.state.position = this.state.datamodifier[1];
    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Veuillez  sélectionner un Cas-Email à modifier'
      })
    }
  };

  ajouter() {
    self = this
   
    if (validateForm(this.state.errors) == true) {
    this.setState({
      modal: !this.state.modal
    });

    axios.post(window.apiUrl + "sendid/",
      {
        tablename: "EventEMail",
        identifier: this.state.dateDMY + uuid(),
        nombermaxcode: '1',
        primaryfield: "Event_Email_Code",
        fields: "*",
        content: "*",

      }
    )

      .then(
        (result) => {

          //  this.state.Event_Email_Code = result.data.substring(1, result.data.length-1);
          var code = result.data.split(", ")
          this.state.Event_Email_Code = code
          console.log("Event_Email_Code")
          console.log(this.state.Event_Email_Code)



          const Event_Email_Nom = this.state.Event_Email_Nom;
          const Event_Type = this.state.Event_Type;
          const Event_Nom = this.state.Event_Nom;
          const Email_Nom = this.state.Email_Nom;
          const description = this.state.description;
          const Email_Code = this.state.Email_Code;
          const Event_Code = this.state.Event_Code;
          const Event_Email_Code = this.state.Event_Email_Code[0];
          const DBAction = "2";

          //  this.state.ajout = (Event_Email_Code + ";" + Event_Email_Nom + ";" + Event_Nom + ";" + Email_Nom + ";" + Event_Type + ";"  + description + ";"+ Event_Code + ";"+ Email_Code + ";" + DBAction)
          this.state.ajout = {

            "Event_Email_Code":Event_Email_Code,
            "Event_Email_Nom":Event_Email_Nom,
            "Event_Nom":Event_Nom,
            "Email_Nom":Email_Nom,
            "Event_Type":Event_Type,
            "description":description,
            "Event_Code":Event_Code,
            "Email_Code":Email_Code,
            "DBAction":DBAction
        }
          this.state.ajoutertemp.push(this.state.ajout);


          this.table.current.table.addRow({ Event_Email_Code, Event_Email_Nom, Event_Type, Event_Nom, Email_Nom, description }, true);
          //console.log(this.mytable.addRow({Event_Email_Code, Event_Email_Nom, Event_Type,Event_Nom,Email_Nom, description}, true))
          console.log(this.state.ajout);
          console.log(this.state.ajoutertemp);

          this.state.Event_Email_Nom = "";
          this.state.Event_Type = "";
          this.state.Event_Nom = "";
          this.state.Email_Nom = "";
          this.state.description = "";
          this.lod();
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            width: 300,
            icon: 'success',
            title: 'Ajouter'

          })
        })
      }else {
        Swal.fire({
            toast: true,
            position: 'top',

            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 400,
            title: 'Veuillez remplir tous les champs obligatoires'
        })
    }

  }
  modifier() {
  console.log('Event_Email_Nom',this.state.Event_Email_Nom.length)
  console.log('Event_Nom',this.state.Event_Nom.length)
  console.log('Email_Nom',this.state.Email_Nom.length)
  console.log('description',this.state.description.length)
  console.log('Event_Type',this.state.Event_Type.length)

    self = this
   
  //  if (validateForm(this.state.errors) == true) {
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
    const Event_Email_Nom = this.state.Event_Email_Nom;
    const Event_Type = this.state.Event_Type;
    const Event_Nom = this.state.Event_Nom;
    const Email_Nom = this.state.Email_Nom;
    const description = this.state.description;
    const Email_Code = this.state.Email_Code;
    const Event_Code = this.state.Event_Code;
    const Event_Email_Code = this.state.Event_Email_Code;

    const DBAction = "1";
    // push with modificationtemp 
    this.state.modificationtemp.push({

      "Event_Email_Code":Event_Email_Code,
      "Event_Email_Nom":Event_Email_Nom,
      "Event_Nom":Event_Nom,
      "Email_Nom":Email_Nom,
      "Event_Type":Event_Type,
      "description":description,
      "Event_Code":Event_Code,
      "Email_Code":Email_Code,
      "DBAction":DBAction
  });
    console.log(this.state.modificationtemp);
    const aaa= {
      Event_Email_Code, Event_Email_Nom, Event_Type, Event_Nom, Email_Nom, description
    }
    this.table.current.table.updateData([aaa])
    console.log("testttttt  " + [Event_Email_Code, Event_Email_Nom, Event_Type, Event_Nom, Email_Nom, description])
    this.state.Event_Email_Nom = "";
    this.state.Event_Type = "";
    this.state.Event_Nom = "";
    this.state.Email_Nom = "";
    this.state.description = "";
//   }else {
//     Swal.fire({
//         toast: true,
//         position: 'top',

//         showConfirmButton: false,
//         timer: 4000,
//         icon: 'warning',
//         width: 400,
//         title: 'Veuillez remplir tous les champs obligatoires'
//     })
// }

  }

  Enregistrer() {

    console.log("Email_Code", this.state.Email_Code,
      "supprimertemp", this.state.supprimertemp.length,
      "   ajoutertemp", this.state.ajoutertemp.length,
      "   modificationtemp", this.state.modificationtemp.length
    )
    if (this.state.ajoutertemp.length != 0 || this.state.modificationtemp.length != 0 || this.state.supprimertemp.length != 0) {

      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "EventEMail",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),
        //datatodelete: ["Event_Email_Code;Event_Email_Nom;Event_Nom;Email_Nom;Event_Type;description;Event_Code;Email_Code;DBAction"]
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
            title: 'Vos données ont été enregistrées avec succès'

          })

          this.setState({
            modalDelete: false,
      cellName: "",
      cellTable:"",
      modal: false,
      modal1: false,
      modal2: false,
      Email_Nom: "",
      Event_Nom: "",
      Event_Type: "",
      Event_Email_Nom: "",
      description: "",
      Email_Code: "",
      Event_Code: "",
      Event_Email_Code: "",
      action: "",
      ajout: "",
      ajoutertemp: [],
      prefix: "",
      max: "",
      modifier: "",
      temp: "",
      supprimer: "",
      data: "",

      supprimertemp: [],
      modificationtemp: [],
      datamodifier: [],
      casregulier: [],
      email: [],
      casalarem: [],
    
      position: null,
          })
     

        })
        .catch((err) => console.error(err));


        setTimeout(function () {
          window.location.reload(1);
        }, 500);

      // setTimeout(function () {
      //   window.location.reload(1);
      // }, 1000);

    } else {

      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Veuillez créer ou modifier un Cas-Email'
      })
    }


  }
  logValue = value => {
    console.log(value);
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

   /////////////////////////////////////////////////////////
   const { name, value } = e.target;
   let errors = this.state.errors;
   switch (name) {
       case 'Event_Email_Nom':
           errors.Event_Email_Nom =
               value.length < 5 /* && typeof value.length == "string" */
                   ? 'Veuillez saisir un nom du cas-email d\'au moins 5 caractères'
                   : '';
           break;
       case 'Event_Type':
           errors.Event_Type =
              value.length < 1
               ? 'Le Type Cas ne peut pas être vide. Veuillez saisir un Type Cas valide. '
               : '';
           break;
       case 'Event_Nom':
           errors.Event_Nom =
               value.length < 1
               ? 'Le Cas ne peut pas être vide. Veuillez saisir un Cas valide. '
               : '';
           break;
       case 'Email_Nom':
           errors.Email_Nom =
               value.length < 1
               ? 'L’Email ne peut pas être vide. Veuillez saisir un Email valide. '
               : '';
           break;
       case 'description':
           errors.description =
                 value.length < 5
               ? 'Veuillez saisir une Description d\'au moins 5 caractères'
               : '';
           break;
       default:
           break;
   }

   this.setState({ errors, [name]: value });








    /////////////////////////////////////////////////////
    var $ = require("jquery");

    if (e.target.value == "regulier") {
      $('#souSelect1-label').show();
      $('#souSelect1').show();
      $('#souSelect2').hide();
      $('#souSelect2-label').hide();
     

      ;
    }
    if (e.target.value == "alarme") {
      $('#souSelect2').show();
      $('#souSelect2-label').show();
      $('#souSelect1').hide();
      $('#souSelect1-label').hide();
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      tableData:[],
      columnsReactTabulator: [
 
        {
          title: "Nom de cas Email",
          field: "Event_Email_Nom",
          width: "17%",
          headerFilter: "input",
          cellClick: this.datamodifierFun,
      
        },

        {
          title: "Type de cas",
          field: "Event_Type",
          width: "18%",
          cellClick: this.datamodifierFun,
        },
        {
          title: "cas",
          field: "Event_Nom",
          width: "18%",
          cellClick: this.datamodifierFun,
        },
        {
          title: "Email",
          field: "Email_Nom",
          width: "18%",
          cellClick: this.datamodifierFun,
        },
        {
          title: "Description de Cas Email",
          field: "description",
          width: "19%",
          cellClick: this.datamodifierFun,

        },

        {
          title: "Supprimer",
          field: "supprimer",
          width: "7%",
          hozAlign: "center",
          formatter: this.supprimerFunIcon,
          cellClick: this.supprimerFunclick
    
       
        }
      ],
      history:props.history,
      modalDelete: false,
      cellName: "",
      cellTable:"",
      modal: false,
      modal1: false,
      modal2: false,
      Email_Nom: "",
      Event_Nom: "",
      Event_Type: "",
      Event_Email_Nom: "",
      description: "",
      Email_Code: "",
      Event_Code: "",
      Event_Email_Code: "",
      action: "",
      ajout: "",
      ajoutertemp: [],
      prefix: "",
      max: "",
      modifier: "",
      temp: "",
      supprimer: "",
      data: "",

      supprimertemp: [],
      modificationtemp: [],
      datamodifier: [],
      casregulier: [],
      email: [],
      casalarem: [],
      formErrors: { Email_Nom: '', Event_Nom: '', Event_Type: '', Event_Email_Nom: '', description: '' },
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),

      position: null,
      errors: {
        Email_Nom: '* Obligatoire', 
        Event_Nom: '* Obligatoire',
        Event_Type: '* Obligatoire',
        Event_Email_Nom: '* Obligatoire',  
    
    }
    }
    this.table = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    this.EventClick =this.EventClick.bind(this);
    this.EmailClick= this.EmailClick.bind(this);
    this.copier = this.copier.bind(this);
  }
  lod() {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Les modifications que vous avez apportées ne seront peut-être pas enregistrées.';
    });
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
          tablename: "EventEMail",
        identifier: this.state.dateDMY + uuid(),
        nombermaxcode: '1',
        primaryfield: "Event_Email_Code",
        fields: "*",
        content: "*",

        }
      )

        .then(
          (result) => {

            console.log('resultt data get max code ' + result.data)
            if (result.data == null) {
              alert("N'existe pas max code ");

            } else {
              var code= result.data.split(", ")
              this.setState({ Event_Email_Code: code })
              console.log(this.state.Event_Email_Code,"Event_Email_Code")

              /////////////////////////////////////Email Select
            
      this.state.Event_Code = this.state.datamodifier[0].Event_Code;
      this.state.Email_Code = this.state.datamodifier[0].Email_Code;
      this.state.Event_Email_Nom = 'copie ' +this.state.datamodifier[0].Event_Email_Nom;
      this.state.Event_Nom = this.state.datamodifier[0].Event_Nom;
      this.state.Event_Type = this.state.datamodifier[0].Event_Type;
      this.state.Email_Nom = this.state.datamodifier[0].Email_Nom;
      this.state.description = this.state.datamodifier[0].description;
      this.state.position = this.state.datamodifier[1];
      ///////////////////////////////////////////////////////////////////
            
             
            
     

      const Event_Email_Nom = this.state.Event_Email_Nom;
      const Event_Type = this.state.Event_Type;
      const Event_Nom = this.state.Event_Nom;
      const Email_Nom = this.state.Email_Nom;
      const description = this.state.description;
      const Email_Code = this.state.Email_Code;
      const Event_Code = this.state.Event_Code;
      const Event_Email_Code = this.state.Event_Email_Code[0];
      const DBAction = "2";

      //  this.state.ajout = (Event_Email_Code + ";" + Event_Email_Nom + ";" + Event_Nom + ";" + Email_Nom + ";" + Event_Type + ";"  + description + ";"+ Event_Code + ";"+ Email_Code + ";" + DBAction)
      this.state.ajout = {

        "Event_Email_Code":Event_Email_Code,
        "Event_Email_Nom":Event_Email_Nom,
        "Event_Nom":Event_Nom,
        "Email_Nom":Email_Nom,
        "Event_Type":Event_Type,
        "description":description,
        "Event_Code":Event_Code,
        "Email_Code":Email_Code,
        "DBAction":DBAction
    }
      this.state.ajoutertemp.push(this.state.ajout);


      this.table.current.table.addRow({ Event_Email_Code, Event_Email_Nom, Event_Type, Event_Nom, Email_Nom, description }, true);
      //console.log(this.mytable.addRow({Event_Email_Code, Event_Email_Nom, Event_Type,Event_Nom,Email_Nom, description}, true))
      console.log(this.state.ajout);
      console.log(this.state.ajoutertemp);

      this.state.Event_Email_Nom = "";
      this.state.Event_Type = "";
      this.state.Event_Nom = "";
      this.state.Email_Nom = "";
      this.state.description = "";
           } })
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
        title: 'Veuillez  sélectionner un Cas-Email à copier'
      })
    }


  }
  EventClick(id, event) {
    this.state.Event_Code = id;
    console.log("Event_Code", this.state.Event_Code)
  }
  EmailClick(id, event) {
    this.state.Email_Code = id;
    console.log("Email_Code", this.state.Email_Code)
  }


  selectDataTabulator = (ArrayData) => {
    this.setState({ datamodifier: ArrayData })
  }

  datamodifierFun = (e, cell, row) => {

    var datamodifier = [cell.getData()];
    // var position = cell.getRow().getPosition()
    //datamodifier.splice(0, 2)
    const position = cell.getRow().getPosition()
    this.setState({ position })
    console.log("datamodifier", datamodifier)
    this.selectDataTabulator(datamodifier)
  
  }
  supprimerFunIcon=()=> {
    return "<i class='fa fa-trash-alt icon'></i>";
  }
  supprimerFunclick = (e, cell) => {
    console.log(cell)
    this.toggleDelete()
    this.CellTableFun(cell)
    //cell.getData();
    //  alert("confirmation de Suppression" + " " + cell.getData().U_Alarme_Name);


 

  }
  toggleDelete = () => {
    this.setState({
      modalDelete: !this.state.modalDelete
    });
  }
  CellTableFun = (cell) => {
    this.setState({ cellTable: cell })
    this.setState({ cellName: cell.getData().Event_Email_Nom })
  }

  deletetab = () => {

    this.toggleDelete()
    this.state.cellTable.getRow().delete();
           this.state.supprimertemp.push(
           {

            "Event_Email_Code":this.state.cellTable.getData().Event_Email_Code,
            "Event_Email_Nom":this.state.cellTable.getData().Event_Email_Nom,
            "Event_Nom":this.state.cellTable.getData().Event_Nom,
            "Email_Nom":this.state.cellTable.getData().Email_Nom,
            "Event_Type":this.state.cellTable.getData().Event_Type,
            "description":this.state.cellTable.getData().description,
            "Event_Code":this.state.cellTable.getData().Event_Code,
            "Email_Code":this.state.cellTable.getData().Email_Code,
            "DBAction":"3"
        }
           )
          
  
  }
  render() {
    const { errors } = this.state;

    return (
      <>
          <Navbar history={this.state.history}/>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM'}}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Cas-Email</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn> */}

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle} style={{ width: "196px" }} className="float-left">Nouveau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>


          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg">
            <MDBModalHeader toggle={this.toggle} >Nouveau Cas Email</MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" > 
                Nom de cas Email <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
               </label>
              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Event_Email_Nom" className="form-control" value={this.state.Event_Email_Nom} onChange={this.handleChange} required />
             
              {errors.Event_Email_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Email_Nom}</span>}
              </MDBCol>
               </MDBRow>
               <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Type de cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <select
                className="browser-default custom-select" id="2" name="Event_Type" value={this.state.Event_Type} onChange={this.handleChange} required>
                <option></option>
                <option value="regulier" >Regulier</option>
                <option value="alarme">Alarme</option>

              </select>
              {errors.Event_Type.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Type}</span>}
                  </MDBCol>
               </MDBRow>
               <MDBRow>
                <MDBCol size="12">
          
         
           
          { this.state.Event_Type== "alarme" &&  
                 <>
                 
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text "  >
                Cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
               <select size="4" className="browser-default custom-select "  name="Event_Nom" value={this.state.Event_Nom} onChange={this.handleChange} >
                <option></option>

                {this.state.casalarem.map(casalarem => <option key={casalarem.Alarme_Code} id="alarme"  onClick={(e) => this.EventClick(casalarem.Alarme_Code, e)} > {casalarem.U_Alarme_Name} </option>)}

                </select>
                </>
            }
              { this.state.Event_Type== "regulier" &&  
              <>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text "  >
                Cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>

              <select size="4" className="browser-default custom-select "  name="Event_Nom" value={this.state.Event_Nom} onChange={this.handleChange} >
                <option></option>
                {this.state.casregulier.map(casregulier => <option key={casregulier.Event_Code} id="regulier" onClick={(e) => this.EventClick(casregulier.Event_Code, e)}  > {casregulier.Event_Name}</option>)}


              </select></>}
              {errors.Event_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Nom}</span>}
                </MDBCol>
               </MDBRow>
               <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Email <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <select size="4" className="browser-default custom-select" name="Email_Nom" value={this.state.Email_Nom} onChange={this.handleChange} required>
                <option></option>
                {this.state.email.map(email => <option onClick={(e) => this.EmailClick(email.Email_Code, e)}> {email.Email_Nom} </option>)}
              </select>
              {errors.Email_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}
                 </MDBCol>
               </MDBRow>
                  <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                Description de Cas Email 
               </label>
              <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} required />
            


                 </MDBCol>
               </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod"  >Modifier</MDBBtn> */}

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" style={{ width: "196px" }} className="float-left">Modifier <MDBIcon icon="pen-square" className="ml-1" /></MDBBtn>





          <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} centered size="lg">
            <MDBModalHeader toggle={this.toggle1} >Modifier Cas Email</MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                Nom de cas Email <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
               </label>
              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Event_Email_Nom" className="form-control" value={this.state.Event_Email_Nom} onChange={this.handleChange} required />
             
              {errors.Event_Email_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Email_Nom}</span>}
              </MDBCol>
               </MDBRow>
               <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Type de cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <select
                className="browser-default custom-select" id="2" name="Event_Type" value={this.state.Event_Type} onChange={this.handleChange} required>
                <option></option>
                <option value="regulier" >Regulier</option>
                <option value="alarme">Alarme</option>

              </select>
              {errors.Event_Type.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Type}</span>}
                  </MDBCol>
               </MDBRow>
               <MDBRow>
               <MDBCol size="12">
      
          { this.state.Event_Type== "alarme" &&  
                 <>
                 
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text "  >
                Cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
               <select size="4" className="browser-default custom-select "  name="Event_Nom" value={this.state.Event_Nom} onChange={this.handleChange} >
                <option></option>

                {this.state.casalarem.map(casalarem => <option key={casalarem.Alarme_Code} id="alarme"  onClick={(e) => this.EventClick(casalarem.Alarme_Code, e)} > {casalarem.U_Alarme_Name} </option>)}

                </select>
                </>
            }
              { this.state.Event_Type== "regulier" &&  
              <>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text "  >
                Cas <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              
              <select size="4" className="browser-default custom-select "  name="Event_Nom" value={this.state.Event_Nom} onChange={this.handleChange} >
                <option></option>
                {this.state.casregulier.map(casregulier => <option key={casregulier.Event_Code} id="regulier" onClick={(e) => this.EventClick(casregulier.Event_Code, e)}  > {casregulier.Event_Name}</option>)}


              </select></>}
              
              {errors.Event_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Event_Nom}</span>}
                </MDBCol>
               </MDBRow>
               <MDBRow>
               <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Email <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
              </label>
              <select size="4" className="browser-default custom-select" name="Email_Nom" value={this.state.Email_Nom} onChange={this.handleChange} required>
                <option></option>
                {this.state.email.map(email => <option onClick={(e) => this.EmailClick(email.Email_Code, e)}> {email.Email_Nom} </option>)}
              </select>
              {errors.Email_Nom.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}
                 </MDBCol>
               </MDBRow>
                  <MDBRow>
                <MDBCol size="12">
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                Description de Cas Email 
               </label>
              <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} required />
            

                 </MDBCol>
               </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.modifier}> <MDBIcon far icon="edit" />   Modifier</MDBBtn>
            </MDBModalFooter>
          </MDBModal>




          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} >Copier</MDBBtn>

          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} > Enregistrer   <MDBIcon icon="save" className="ml-1" /></MDBBtn> */}
          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} style={{ width: "196px" }} className="float-left" >Copier <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} style={{ width: "196px" }} > Enregistrer   <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          {/* <div> <div className="tabulator" ref={el => (this.el = el)} /></div> */}
          <ReactTabulator style={{ marginTop: 30 + 'px' }}
            ref={this.table}
            // cellClick={this.click}
            // rowClick={this.click2}
            data={this.state.tableData}
            columns={this.state.columnsReactTabulator}
            layout={"fitData"}
            index={"Event_Email_Code"}
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
<DeleteRow toggle={this.toggleDelete} modal={this.state.modalDelete} deletetab={this.deletetab} cellTable={this.state.cellTable} cellName={this.state.cellName} />
          
        </div>



      </>
    );
  }

}

export default CasEmail;



const DeleteRow = ({ toggle, modal, deletetab, cellName }) => {
  useEffect(() => {

  }, [cellName])

  return (<MDBContainer>

    <MDBModal isOpen={modal} toggle={toggle} centered>
      <MDBModalHeader toggle={toggle}>Confirmation de Suppression  </MDBModalHeader>
      <MDBModalBody style={{ textAlign: "center", fontSize: '120%' }}>
      Cet e-mail est marqué pour suppression  
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