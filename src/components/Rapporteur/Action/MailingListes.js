import React, { useEffect, useState }from "react";
import { MDBContainer,MDBRow ,MDBCol, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from 'axios';
import uuid from 'react-uuid';
import Moment from 'moment';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
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
class MailingListes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Nom_MailingList: "",
      Nom_MailingList1: "",
      MailingList_Code: "",
      code: "",
      validation_Code: "",
      listes: [],
      modal: false,
      modal1: false,
      modal4: false,
      modal3: false,
      SMS_User_Master: "",
      Fax_User_Master: "",
      Email_User_Master: "",
      Nom: "",
      masterListe: [],
      MailingList_Membres: "",
      User_Master_Name: '',
      User_Master_Code: '',
      liste_Membres: [],
      Mailing_Code: "",
      ajoutertemp: [],
      modificationtemp: [],
      Membres: [],
      ajout: "",
      Access: "163883",
      arrayMembres: {},
      supprimer: "",
      supprimertemp: [],
      listepath: "",
      listeType: "",
      listeTest: [],
      To_tab: [],
      arrayListeTest: [],
      array: [],
      Path: `C:\\ProgramData\\Winlog Pro 3\\Projects\\Energy_Supervisor_V47 Elmazraa\\Winlog\\Files\\DATAMODELFiles\\MailingList\\`,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      errors: {
        Nom_MailingList: '* Obligatoire',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.masterListes = this.masterListes.bind(this);
    this.MailingList1 = this.MailingList1.bind(this);
    this.ajouterUser = this.ajouterUser.bind(this);
    this.supprimerAll = this.supprimerAll.bind(this);
    this.addAll = this.addAll.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Newliste = this.Newliste.bind(this);
    this.updateliste = this.updateliste.bind(this);
    this.modifierNom = this.modifierNom.bind(this);
  }

  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }

  el = React.createRef();

  mytable = "Tabulator"; //variable to hold your table
  tableData = [] //data for table to display

  componentDidMount() {
    //getdate
    this.getDate();
    //////


   




    axios.defaults.withCredentials = true;
    axios.post(window.apiUrl + "display/",

      {
        tablename: "User_Master",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )
      .then(
        (rep) => {
          if (rep.data !== null) {
            this.state.masterListe = rep.data;
            console.log(this.state.masterListe)
          } else {
            console.log('User_Master est vide')

          }
        })

  }

  ///*******function MasterListes
  masterListes() {
    this.setState({

    });
    console.log("Button Master liste clicked")
    this.state.Nom_MailingList1 = "User Master Liste";
    console.log(this.state.Nom_MailingList1)


    var $ = require("jquery");
    $('#listeuser').show();
    $('#btnuser').show();

    $('#myInput').show();
    $("#myInput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

  }
  ///********fin function MasterListes
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Nom_MailingList: ' ',

    }
  }
  toggle3 = () => {
    this.setState({
      modal3: !this.state.modal3
    });
    this.state.errors = {
      Nom_MailingList: ' ',

    }
  }
  toggle1 = () => {
    if (this.state.Nom_MailingList == "") {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 300,
        title: 'Liste est vide '
      })

    } else {
      this.setState({
        modal1: !this.state.modal1
      });
    }
  }

  toggle4 = () => {
 
////////////////
 /// API MailingList
 axios.post(window.apiUrl + "display/",
 {
   tablename: "MailingList_V3",
   identifier: this.state.dateDMY + uuid(),
   fields: "*",
   content: "*",

 }
)
 .then(
   (result) => {
     if (result.data !== null) {
       this.setState({listes:result.data})
      // this.state.listes = result.data
       console.log("listes",this.state.listes)
       this.setState({
        modal4: !this.state.modal4
      });
     } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 5000,
        icon: 'warning',
        width: 300,
        title: "Il n'a pas des listes"
    })

     }


   }

 )
/// FIN API MailingList

  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });



    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case 'Nom_MailingList':
        errors.Nom_MailingList =
          value.length < 5
            ? 'Nom doit comporter au moins 5 caractères!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });

  }
  ajouter() {
    const supprimertemp = this.state.supprimertemp;


    if (validateForm(this.state.errors) == true) {



      this.setState({
        modal: !this.state.modal
      });
      var $ = require("jquery");
      $('#btnModifier').show();
      $('#btnNouveau').hide();
      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "MailingList_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "MailingList_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {
            if (result.data !== null) {
              //this.state.Mailing_Code = result.data.substring(1, result.data.length-1);
              var code = result.data.split(", ")
              this.state.Mailing_Code = code
              console.log("MailingList_Code", this.state.Mailing_Code)
            }
            else {
              console.log("MailingList_Code vide")
            }
          }
        )

      ///tabulator 
      this.mytable = new Tabulator(this.el, {
        data: this.tableData, //link data to table
        reactiveData: true, //enable data reactivity
        height: "450px",
        columns: [
          {
            title: "Nom de l'utilisateur",
            field: "User_Master_Name",
            width: '30%',

          },

          {
            title: "Contact",
            field: "MailingList_Membres",
            width: '40%',

          },

          {
            title: "Supprimer",
            width: "28%",
            hozAlign: "center",
            formatter: function () { //plain text value

              return "<i class='fa fa-trash-alt icon'></i>";

            },

            cellClick: function (e, cell) {
              cell.getData();
              supprimertemp.push(cell.getData().MailingList_Membres);
              cell.getRow().delete();
              console.log("supprimertemp", supprimertemp)
            }
          },], //define table columns
      });


    } else {

      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 300,
        title: 'Nom est vide'
      })
    }
  }
  ajouterUser() {
    if (this.state.Nom_MailingList == "") {


      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 300,
        title: 'Créez ou Modifier une liste'
      })

    } else {


      const User_Master_Code = this.state.User_Master_Code;
      const User_Master_Name = this.state.User_Master_Name;
      const MailingList_Membres = this.state.MailingList_Membres;
      console.log("User_Master_Code", User_Master_Code)
      if (MailingList_Membres == "") {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 300,
          title: 'Sélectionnez des contacts'
        })
      } else {
        console.log("***********************************************")

        this.state.listeTest = this.tableData.concat(this.state.Membres)
        console.log("listeTest", this.state.listeTest)

        if (this.state.User_Master_Name != "" || this.state.User_Master_Code != "" || this.state.MailingList_Membres != "") {

          var data = [{ "MailingList_Membres": MailingList_Membres }]
          console.log(data)

          //  for ( var j=0; j<1 ; j++){
          //    for (var i = 0; i < this.state.listeTest.length; i++) {
          //  console.log('testttt', data[0].MailingList_Membres == this.state.listeTest[i].MailingList_Membres)
          //      if (data[0].MailingList_Membres != this.state.listeTest[i].MailingList_Membres) {
          this.mytable.addRow({ User_Master_Code, User_Master_Name, MailingList_Membres }, true);
          console.log(User_Master_Code, User_Master_Name, MailingList_Membres);
          this.state.Membres.push({ "MailingList_Membres": MailingList_Membres, "User_Master_Name": User_Master_Name, "User_Master_Code": User_Master_Code })
          console.log('MailingList_Membres push', this.state.Membres)
          this.state.User_Master_Name = ""
          this.state.User_Master_Code = ""
          this.state.MailingList_Membres = ""

        }







      }
    }
  }


  MailingList1() {


    console.log(this.state.Nom)
    console.log(this.state.MailingList_Code)

    const supprimertemp = this.state.supprimertemp;

    /// API MailingList
    axios.post(window.apiUrl + "display/",
      {
        tablename: "MailingList_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",

      }
    )
      .then(
        (result) => {
          console.log('result dataaaaaaaaaaaaaaaaaaaaaaa')
          console.log(result.data)

          if (result.data != null) {
            if(this.state.Nom==""){
                console.log("tl_name vide")
                Swal.fire({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 4000,
                  width: 400,
                  icon: 'warning',
                  title: "Sélectionner une liste pour ajouter"
              })
          }else {
          for (var i = 0; i < result.data.length; i++) {
            this.state.MailingList_Code = result.data[i].MailingList_Code
            console.log(this.state.MailingList_Code)
            if (this.state.code == this.state.MailingList_Code) {
              this.setState({
                modal4: !this.state.modal4
            });
        this.setState({Nom_MailingList:this.state.Nom})
        this.setState({ liste_MailingList_Membres: result.data[i].MailingList_Membres })
              this.tableData = result.data[i].MailingList_Membres;
              console.log(" this.tableData", this.tableData)
         //     this.state.liste_MailingList_Membres = result.data[i].MailingList_Membres;
              this.state.listePath = result.data[i].Path;
              this.state.listeType = result.data[i].Type;
              console.log("listePath", this.state.listePath)
              console.log("listeType", this.state.listeType)
              console.log("MailingList_Membres", this.state.liste_MailingList_Membres)
              if (this.state.liste_MailingList_Membres.length == 0) {

                Swal.fire({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    width: 500,
                    title: ('Ajouter des Utilisateurs  dans ' + this.state.Nom)

                })
                this.mytable = new Tabulator(this.el, {
                  data: this.tableData, //link data to table
                  reactiveData: true, //enable data reactivity
                  height: "450px",
                  columns: [
                    {
                      title: "Nom de l'utilisateur",
                      field: "User_Master_Name",
                      width: '30%',
  
                    },
                    {
                      title: "Contact",
                      field: "MailingList_Membres",
                      width: '40%',
  
                    },
  
                    {
                      title: "Supprimer",
                      width: "29%",
                      hozAlign: "center",
                      formatter: function () { //plain text value
  
                        return "<i class='fa fa-trash-alt icon'></i>";
  
                      },
  
                      cellClick: function (e, cell) {
                        cell.getData();
                        cell.getRow().delete();
  
                        supprimertemp.push(cell.getData().MailingList_Membres);
  
                        console.log("supprimertemp", supprimertemp)
                      }
                    },], //define table columns
                });
                this.mytable.clearData()
            } else {


              ///tabulator 
              this.mytable = new Tabulator(this.el, {
                data: this.tableData, //link data to table
                reactiveData: true, //enable data reactivity
                height: "450px",
                columns: [
                  {
                    title: "Nom de l'utilisateur",
                    field: "User_Master_Name",
                    width: '30%',

                  },
                  {
                    title: "Contact",
                    field: "MailingList_Membres",
                    width: '40%',

                  },

                  {
                    title: "Supprimer",
                    width: "29%",
                    hozAlign: "center",
                    formatter: function () { //plain text value

                      return "<i class='fa fa-trash-alt icon'></i>";

                    },

                    cellClick: function (e, cell) {
                      cell.getData();
                      cell.getRow().delete();

                      supprimertemp.push(cell.getData().MailingList_Membres);

                      console.log("supprimertemp", supprimertemp)
                    }
                  },], //define table columns
              });


            }}
          }
        }
        var $ = require("jquery");
        $('#btnModifier').show();
        $('#btnNouveau').hide();


    }
    else {
        console.log("liste vide")
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            width: 300,
            icon: 'warning',
            title: ' la liste est vide'
        })
    }

        }

      )
    /// FIN API MailingList


    /////

  }

  supprimerAll() {



    const MailingList_Code = this.state.code;
    const Nom_MailingList = this.state.Nom_MailingList;
    const Path = this.state.listePath;
    const Type = this.state.listeType;
    const newMembres = (this.state.Membres.concat(this.state.liste_MailingList_Membres))

    console.log(this.state.liste_MailingList_Membres)
    console.log("Update_newMembres", newMembres)
    const MailingList_Membres = newMembres;
    console.log("MailingList_Membres", MailingList_Membres);
    const Access = this.state.Access
    const DBAction = "3"
    this.state.supprimer = ({
      "MailingList_Code": MailingList_Code,
      "Nom_MailingList": Nom_MailingList,
      "Path": Path,
      "Access": Access,
      "Type": Type,
      "MailingList_Membres": MailingList_Membres,
      "DBAction": DBAction
    });
    this.state.supprimertemp.push(this.state.supprimer);
    console.log(this.state.supprimertemp);
    if (newMembres.length == []) {
      this.mytable.clearData()
      console.log("Array is empty!")
    }
    this.state.Nom_MailingList = ""
    this.setState({
      modal1: !this.state.modal1
    });

    axios.post(window.apiUrl + "updatedelete/", {
      tablename: "MailingList_V3",
      identifier: this.state.dateDMY + uuid(),
      datatomodified: [].concat(this.state.supprimertemp)
      //  datatodelete: ["MailingList_Code;Nom_MailingList;Path;Access;Type;MailingList_Membres;DBAction"]
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
          title: 'Supprimer avec succès'

        })
      })
      .catch((err) => console.error(err));



    setTimeout(function () {
      window.location.reload(1);

    }, 1000);

    var $ = require("jquery");
    $('#btnNouveau').show();
    $('#btnModifier').hide();
  }

  addAll() {
    this.setState({

    });
    this.state.Nom_MailingList = this.state.Nom
    console.log(this.state.Nom_MailingList)

    const MailingList_Membres = this.state.MailingList_Membres;

    this.mytable.addData({ MailingList_Membres }, true);
  }


  handleClick(id, event) {
    this.state.code = id;
    console.log("code", this.state.code)

  }


  ///////
  Newliste() {
    const MailingList_Code = this.state.Mailing_Code[0];
    this.state.validation_Code = MailingList_Code;
    const Nom_MailingList = this.state.Nom_MailingList;
    const Path = this.state.Path;
    const Type = "Mailing List";

    /** with delete row */
    var data = this.state.Membres
    for (var i = 0; i < this.state.supprimertemp.length; i++) {

      var index = -1;
      var val = this.state.supprimertemp[i]
      console.log(val)
      var filteredObj = data.find(function (item, i) {
        if (item.MailingList_Membres === val) {
          index = i;
          return i;
        }
      });

      console.log(index, filteredObj);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    console.log(data);
    /**********fin delete row  */
    const MailingList_Membres = data;
    console.log("MailingList_Membres", MailingList_Membres);
    const Access = this.state.Access;
    const DBAction = "2";
    //this.state.ajout = (MailingList_Code + ";" + Nom_MailingList + ";" + Path + ";" + Access + ";" + Type + ";" + MailingList_Membres + ";" + DBAction);
    this.state.ajout = {
      "MailingList_Code": MailingList_Code,
      "Nom_MailingList": Nom_MailingList,
      "Path": Path,
      "Access": Access,
      "Type": Type,
      "MailingList_Membres": MailingList_Membres,
      "DBAction": DBAction
    }
    this.state.ajoutertemp.push(this.state.ajout);
    console.log(this.state.ajoutertemp);
  }




  /////
  updateliste() {
    const MailingList_Code = this.state.code;
    this.state.validation_Code = MailingList_Code;
    const Nom_MailingList = this.state.Nom_MailingList;
    const Path = this.state.listePath;
    const Type = this.state.listeType;




    const newMembres = (this.state.Membres.concat(this.state.liste_MailingList_Membres))

    console.log(this.state.liste_MailingList_Membres)
    console.log("Update_newMembres", newMembres)
    /** with delete row */


    //var val = this.state.supprimertemp[0]
    var data = newMembres
    for (var i = 0; i < this.state.supprimertemp.length; i++) {

      var index = -1;
      var val = this.state.supprimertemp[i]
      console.log(val)


      var filteredObj = data.find(function (item, i) {
        if (item.MailingList_Membres === val) {
          index = i;
          return i;
        }
      });

      console.log(index, filteredObj);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    console.log(data);


    /**********fin delete row  */


    const MailingList_Membres = data;

    console.log("supprimertemp", this.state.supprimertemp)

    console.log("MailingList_Membres", MailingList_Membres);
    const Access = this.state.Access
    const DBAction = "1"
    this.state.modifier = {
      "MailingList_Code": MailingList_Code,
      "Nom_MailingList": Nom_MailingList,
      "Path": Path,
      "Access": Access,
      "Type": Type,
      "MailingList_Membres": MailingList_Membres,
      "DBAction": DBAction
    };
    this.state.modificationtemp.push(this.state.modifier);
    delete this.state.modificationtemp[this.state.supprimertemp]
    console.log(this.state.modificationtemp);

  }

  Enregistrer() {
    if (this.state.code == "") {
      this.Newliste();
    }
    else {
      this.updateliste();
    }

    if (this.state.validation_Code == "") {

      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Créez ou Modifier une liste '
      })

    } else {
      console.log("Enregistrer")


      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "MailingList_V3",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp)

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


      setTimeout(function () {
        window.location.reload(1);
      }, 1000);
      var $ = require("jquery");
      $('#btnNouveau').show();
      $('#btnModifier').hide();

    }
  }

  modifierNom() {


    this.setState({
      modal3: !this.state.modal3
    });
  }


  userClick(id, name, event) {

    this.state.User_Master_Code = id;
    this.state.User_Master_Name = name;
    console.log("User_Master_Code", this.state.User_Master_Code)
    console.log("User_Master_Name", this.state.User_Master_Name)
  }



  render() {
    const { errors } = this.state;
    return (
      <div>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Mailing Listes</MDBBreadcrumbItem>
        </MDBBreadcrumb>
 
        <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px", width: 'auto' }}>
          {/** liste 1 */}


          <MDBRow >
                        <MDBCol size="6">
          <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: '650px', height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>

            {/***************************** Master Liste************************* */}
            <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.masterListes} >Master Liste</MDBBtn>

            <input type="text" id="myInput" placeholder="Rechrech..." className="form-control float-right option" style={{ width: "25%", marginTop: "1%" }} />

            {/****************************************************** */}

            < table border="1" style={{ marginTop: "22px" }} className="tab  float-right" >
              <thead >
                <tr>
                  <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Fichier Source </b></th>
                  <th style={{ backgroundColor: "#fff" }}><h6 value={this.state.Nom_MailingList1} onChange={this.handleChange} id="1" >{this.state.Nom_MailingList1}</h6></th>
                  <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round option ' id="btnuser" style={{ marginLeft: '4px' }} onClick={this.ajouterUser} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                </tr>

              </thead>
              <tbody></tbody>
            </table >

            <div className="tableMaster option" id="listeuser" style={{ 'height': '450px', 'overflowY': 'scroll', marginTop: "100px" }} >
              {/*****user Master table****** */}

              <table  > <thead > <tr >

                <th className="th"> <b style={{ fontSize: '16px' }} >Nom de l'utilisateur</b> <br />

                </th>
                <th className="th" style={{ width: '50%', fontSize: '16px' }} ><b>Contact</b></th> </tr> </thead>

                {this.state.masterListe.map(i =>
                  <tbody id="myTable" >

                    <tr key={i.User_Master_Code} ><td name="User_Master_Name" value={this.state.User_Master_Name} onChange={this.handleChange} >{i.User_Master_Name} </td>
                      <td style={{ width: '50%' }} key={i.User_Master_Code} onClick={(e) => this.userClick(i.User_Master_Code, i.User_Master_Name, e)}>
                        < select className="browser-default custom-select" name="MailingList_Membres" value={this.state.MailingList_Membres} onChange={this.handleChange}>
                          <option></option>
                          <option>  {i.Email_User_Master} </option>
                          <option >  {i.SMS_User_Master}</option>
                        </select>
                      </td>
                    </tr></tbody>)}


              </table>

            </div>

          </fieldset>
          {/** fin liste 1 */}

          </MDBCol>
              
              <MDBCol size="6">

          {/**  <MDBBtn  color="#e0e0e0 grey lighten-2" onClick={this.addAll} size="sm" style={{ marginTop: "13%", marginLeft: '-4%' }} id="btnaddAll" className="option" > <MDBIcon icon="angle-double-right" size="2x" /> </MDBBtn>*/}
          {/** liste 2 */}
          <fieldset className="form-group" className="float-right" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', height: 'auto', minHeight: '650px', width: '98%', backgroundColor: "#c3c3c321" }}>
          
          
          
          
            {/*****************************Selectionnez une Liste************************* */}
            <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle4} >Sélectionnez une Liste</MDBBtn>

            <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered >
              <MDBModalHeader toggle={this.toggle4} >Sélectionnez une Liste :</MDBModalHeader>
              {/* <MDBModalBody>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                  Les listes
                </label>
                <select className="browser-default custom-select" name="Nom" value={this.state.Nom} onChange={this.handleChange} size="8" >
                  <option></option>
                  {this.state.listes.map(liste => <option key={liste.MailingList_Code} id={liste.MailingList_Code} onClick={(e) => this.handleClick(liste.MailingList_Code, e)}>  {liste.Nom_MailingList} </option>)}

                </select>

              </MDBModalBody> */}


<ModalMailing toggle4={this.toggle4}  listes={this.state.listes} handleClick={this.handleClick} handleChange={this.handleChange} Nom={this.state.Nom} />

              <MDBModalFooter>

                <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.MailingList1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            {/************* Nom_MailingList *************/}
            <div style={{ marginTop: "20px" }} >
              < table border="1" className="tab  float-right" >
                <thead >
                  <tr>
                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}>Fichier Source</b></th>
                    <th style={{ backgroundColor: "#fff" }}>

                      <h6 value={this.state.Nom_MailingList} onChange={this.handleChange} >

                        {this.state.Nom_MailingList}

                      </h6>
                    </th>
                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >
                      {/** Nouveau */}
                      <MDBBtn className=' button_round  ' id="btnNouveau" style={{ marginLeft: '4px' }} onClick={this.toggle}><MDBIcon title="Nouveau" icon="plus" /></MDBBtn>
                      <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
                        <MDBModalHeader toggle={this.toggle} >Tapez le nom du Nouveau mailing list ici :</MDBModalHeader>
                        <MDBModalBody>
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                            Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_MailingList" className="form-control" value={this.state.Nom_MailingList} onChange={this.handleChange} required />
                          {errors.Nom_MailingList.length > 0 &&
                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Nom_MailingList}</span>}

                        </MDBModalBody>
                        <MDBModalFooter>

                          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                        </MDBModalFooter>
                      </MDBModal>

                      {/** Modifier Nom liste */}
                      <MDBBtn className=' button_round  option' id="btnModifier" style={{ marginLeft: '4px' }} onClick={this.toggle3}><MDBIcon title="Modifier Nom" icon="pencil-alt" /></MDBBtn>
                      <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
                        <MDBModalHeader toggle={this.toggle3} >Modifier le nom du mailing list ici :</MDBModalHeader>
                        <MDBModalBody>
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                            Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>

                          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_MailingList" className="form-control" value={this.state.Nom_MailingList} onChange={this.handleChange} required />
                          {errors.Nom_MailingList.length > 0 &&
                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Nom_MailingList}</span>}


                        </MDBModalBody>
                        <MDBModalFooter>

                          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.modifierNom}> <MDBIcon icon="pencil-alt" className="ml-1" /> Modifier</MDBBtn>
                        </MDBModalFooter>
                      </MDBModal>
                      {/** Supprimer */}

                      <MDBBtn className="button_round" onClick={this.toggle1}><MDBIcon title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>


                      <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} centered >
                        <MDBModalHeader toggle={this.toggle1}  >Attention :</MDBModalHeader>
                        <MDBModalBody>
                          <label htmlFor="defaultFormLoginEmailEx" className="red-text" style={{ fontSize: "20px" }}>
                            Voulez-vous vraiment supprimer la MailingList selectionner ?
                          </label>

                        </MDBModalBody>
                        <MDBModalFooter>
                          <MDBBtn color="#e0e0e0 grey lighten-2" className="float-right" onClick={this.supprimerAll} >  Oui</MDBBtn>
                          <MDBBtn color="#e0e0e0 grey lighten-2" className="float-right" onClick={this.toggle1} >  Non</MDBBtn>
                        </MDBModalFooter>
                      </MDBModal>

                      {/** Enregistrer */}

                      <MDBBtn className=" button_round  " onClick={this.Enregistrer} ><MDBIcon title="Enregistrer" icon="save" size="lg" /></MDBBtn>
                    </th>

                  </tr>
                </thead><tbody></tbody></table></div>
            <div><div style={{ marginTop: "100px" }} className="listeValider" ref={el => (this.el = el)} /></div>
          </fieldset>
          {/** fin liste 2 */}
          </MDBCol>
                    </MDBRow>

        </fieldset>

      </div>);
  }





}



const ModalMailing = ({ toggle4, listes, handleClick, handleChange,Nom }) => {
  //console.log("listes", listes)

  const [filterCL_Liste, setfilterCL_Liste] = useState([])

  useEffect(() => {

      //console.log("--------------->",listes)
  }, [listes])



  useEffect(() => {

      //console.log("jjjj",listes.length!=0)
      if (filterCL_Liste.length == 0) {
          setfilterCL_Liste(listes)
      }
      if (listes.length != 0) {
          const FilterClListe = (e) => {

              //console.log("listes", listes)
              const text = e.target.value
              //console.log("text", text)

              console.log("filter", listes.filter(
                  (el, i) => {
                      // console.log(i,el)
                      return el.Nom_MailingList.indexOf(text) >= 0
                  }
              )
              )

              setfilterCL_Liste(listes.filter((el) => el.Nom_MailingList.toLowerCase().indexOf(text.toLowerCase()) >= 0))


          }

          const input = document.querySelector("#myInputCl")

          //console.log("input", input)
          if (input) {

              input.addEventListener("keyup", (e) => FilterClListe(e))
          }

          return function cleanup() {

              input.removeEventListener("keyup", FilterClListe)
          }

      }

  }, [listes])
  //////////////////////
  useEffect(() => {
      //if(!filterCL_Liste)return
      console.log('---filterCL_Liste--->', filterCL_Liste)



  }, [filterCL_Liste])

  return (
      <>

          <MDBModalBody>

              <MDBRow>
                  <MDBCol size="12">
                      <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                          Liste des compteurs
                      </label>
                      <br />
                      <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            

                      {/* <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
                 <option></option>
                  {filterCL_Liste.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={(e) => handleClick(liste.CompteurList_Code, e)}>  {liste.CompteurListI_Name} </option>)}

                </select> */}


                <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
                  <option></option>
                  {filterCL_Liste.map(liste => <option key={liste.MailingList_Code} id={liste.MailingList_Code} onClick={(e) => handleClick(liste.MailingList_Code, e)}>  {liste.Nom_MailingList} </option>)}

                </select>
                  </MDBCol>
                 
              </MDBRow>
          </MDBModalBody>
      </>
  )


}
export default MailingListes;