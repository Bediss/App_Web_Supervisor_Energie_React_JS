import React, { useEffect, useState } from "react";
import { MDBContainer, MDBTabPane,MDBTabContent, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import GenerateTable from '../Rapport/layoutGen/layoutGenerator';
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
class FactBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Nom_FactBook: "",
      Nom_FactBook1: "",
      Code_FactBook: "",
      code: "",
      validation_Code: "",
      listes: [],
      modal: false,
      modal1: false,
      modal4: false,
      modal3: false,
      modal5: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal9: false,
      SMS_User_Master: "",
      Fax_User_Master: "",
      Email_User_Master: "",
      Nom: "",
      masterListe: [],
      Factbook_Membre: "",
      Nom_FactBook: '',
      User_Master_Code: '',
      liste_Membres: [],
      F_Code: "",
      ajoutertemp: [],
      modificationtemp: [],
      Membres: [],
      ajout: "",
      NB_Rapport: "",
      arrayMembres: {},
      supprimer: "",
      supprimertemp: [],
      listepath: "",
      listeType: "",
      listePath: ``,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      errors: {
        Nom_FactBook: '* Obligatoire',
      },
      ///////togglePills
      items: {
        default: "1",
      },
      ////////
      Code_Compteur: "",
      NameEnergy: '',
      EnergyMeasure: '',
      Tableaux: '',
      Tableaux: '',
      Master: '',
      TAGS: "",
      uniteCode: '',
      Sys_mesureid: '',

      listNameEnergy: [],
      LeCompteur: [],
      dataCompteur: [],
      dataEnergyMeasure: [],
      dataEnergy: [],
      listRapportglobal: [],

      listfieldfiltername: [],
      listfieldfiltercontent: [],
      listRapportglobal: [],
      listTableau: [],
      listTAGS: [],
      listMaster: [],
      codeunite: [],
      array: [],
      U_Rapportselected: "",
      Selected_test: "",
      Selected_Global_Rapport_Array: "",
      modal_data_var: false,
      //////////liste ML CL TL
      Listes_Cl: [],
      Listes_Ml: [],
      Listes_TL: [],
      CL_Membre: [],
      ML_Membre: [],
      tl_members: [],
      ml_Membre_Select_fin: [],
      cl_Membre_Select_fin: [],
      Code_Cl: "",
      Name_Cl: "",
      Code_Ml: "",
      Name_Ml: "",
      CompteurListI_Name: "",
      ML_Name: "",
      tl_name: "",
      Name_Tl: "",
      Code_Tl: "",
      tl_id: "",
      BtnClDesibled: true,
      BtnMlDesibled: true,
      BtnTlDesibled: true,
      Body_Code_Rapport:"",
      GenerateTableActive:false,
      config:null,
      configLayout:null,
      configLayout_Orientation:"",
      layoutFormat:null,
      Selected_Global_Enregistrer:[],
      Body:null,
      AjouterRapport:false,
      ajoutertemp_Rapport:[],
      Report_Code_new:"",
      Rapport_Liste:[],
      Nom_Rappot_new:"",
    }
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.FactbookList1 = this.FactbookList1.bind(this);
    this.ajouterListe = this.ajouterListe.bind(this);
    this.supprimerAll = this.supprimerAll.bind(this);
    this.addAll = this.addAll.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Newliste = this.Newliste.bind(this);
    this.updateliste = this.updateliste.bind(this);
    this.modifierNom = this.modifierNom.bind(this);
    this.hClick = this.hClick.bind(this);
    this.handleRapportselectedchange = this.handleRapportselectedchange.bind(this);
    this.resetvalueoffilter = this.resetvalueoffilter.bind(this);
    this.modelCl = this.modelCl.bind(this)
    this.modelMl = this.modelMl.bind(this)
    this.CL_Tags_Function = this.CL_Tags_Function.bind(this)
    this.ML_Tags_Function = this.ML_Tags_Function.bind(this)
    this.AjouterCl = this.AjouterCl.bind(this)
    this.AjouterMl = this.AjouterMl.bind(this)
    this.AjouterTl = this.AjouterTl.bind(this)
    this.handleListeTLClick = this.handleListeTLClick.bind(this)
    this.handleListeCompteurClick = this.handleListeCompteurClick.bind(this)
    this.handleListeMLClick = this.handleListeMLClick.bind(this)
    this.Ajouter_Rapport_Liste=this.Ajouter_Rapport_Liste.bind(this)

  }
  /*************************************************** */
  togglePills = (type, tab, name) => e => {
    e.preventDefault();

    let items = { ...this.state.items };
    if (tab === "2") {


      if (items[type] !== "2") {


        console.log('ggggg')

        items[type] = "2";
        this.setState({
          items
        });
        console.log("this.state.Body1",this.state.Body)
if(this.state.cl_Membre_Select_fin.length!=0 || this.state.ml_Membre_Select_fin.length!=0 || this.state.tl_members.length !=0){
      console.log("Selected_Global_Rapport_Array",this.state.Selected_Global_Rapport_Array)
  

      var data = []
        if(this.state.cl_Membre_Select_fin.length!=0 && this.state.ml_Membre_Select_fin.length==0 && this.state.tl_members.length==0){
/////CL
data =[{
  "cl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.cl_Membre_Select_fin
  }}]

        }else if(this.state.ml_Membre_Select_fin.length!=0 && this.state.tl_members.length==0 && this.state.cl_Membre_Select_fin.length==0){
/////ML
data =[{
  "ml":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.ml_Membre_Select_fin
  }}]
        }else if (this.state.tl_members.length!=0&& this.state.cl_Membre_Select_fin.length==0 && this.state.ml_Membre_Select_fin.length==0){
/////TL
data =[{
  "tl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.tl_members
  }}]

        }else if (this.state.cl_Membre_Select_fin.length!=0 && this.state.ml_Membre_Select_fin.length!=0 && this.state.tl_members.length==0){
////// cl & ml
data =[{
  "cl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.cl_Membre_Select_fin
  },
  "ml":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.ml_Membre_Select_fin
  }}]
        }else if (this.state.cl_Membre_Select_fin.length!=0 && this.state.tl_members.length!=0 && this.state.ml_Membre_Select_fin.length==0){
/////cl & tl          
data =[{
  "cl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.cl_Membre_Select_fin
  },
  "tl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.tl_members
  }}]
        }else if (this.state.ml_Membre_Select_fin.length!=0 && this.state.tl_members.length!=0 && this.state.cl_Membre_Select_fin.length==0){
//// ml & tl    


data =[{
  "ml":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.ml_Membre_Select_fin
  },
  "tl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.tl_members
  }}]

        }else if (this.state.cl_Membre_Select_fin.length!=0 && this.state.tl_members.length!=0 && this.state.ml_Membre_Select_fin.length!=0){
    //      cl & tl & ml     
    
    
data =[{
  "cl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.cl_Membre_Select_fin
  },
  "ml":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.ml_Membre_Select_fin
  },
  "tl":{
    "tag": this.state.CompteurListI_Name,
      "members": this.state.tl_members
  }}]
        }
        console.log("datadatadatadatadata",data)
        axios.post(window.apiUrl + "cloneV2/",

        {
          "R_IDs": [this.state.Report_Code],
          "data": data
          
      }
  
  
      )
  
        .then(
          (result) => {
         //   this.tableData = result.data;
            if (result.data!== null) {
        
              console.log("sssssssssssssssssssssssssssssssssssss",result.data)
                     this.setState({ config :result.data[0]})
                     this.setState({ GenerateTableActive: false })
    
                     setTimeout(() => this.setState({ GenerateTableActive: true }), 500)
                     // this.setState({AjouterRapport: true})
                      this.state.AjouterRapport=true
                      console.log("AjouterRapportAjouterRapportAjouterRapport", this.state.AjouterRapport)
            } else {
              console.log('no data change')
            }
  
  
  
          }
        )

      }
    else {




    console.log("this.state.Body",this.state.Body)
      this.setState({ config :this.state.Body})
      this.setState({ GenerateTableActive: false })
      setTimeout(() => this.setState({ GenerateTableActive: true }), 500)
      this.state.AjouterRapport=false
      console.log("AjouterRapportAjouterRapportAjouterRapport2222222222", this.state.AjouterRapport)

    }
  }


    }
    else {
      console.log('ggsssssggg')
      items[type] = tab;
      this.setState({
        items
      });
    }
  };
  /**********************Liste ML CL TL************* */

  modelCl(cl_Membre_Select) {
    this.setState({ cl_Membre_Select_fin: cl_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", cl_Membre_Select)
  }

  modelMl(ml_Membre_Select) {
    this.setState({ ml_Membre_Select_fin: ml_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", ml_Membre_Select)
  }

  CL_Tags_Function(name) {
    console.log("jjjjjjjjjjjj", name)
    if (name != "") {
      this.setState({ Code_Cl: "*" })
      this.setState({ Name_Cl: name })
    }
  }
  ML_Tags_Function(name) {
    console.log("jjjjjjjjjjjj", name)
    if (name != "") {
      this.setState({ Code_Ml: "*" })
      this.setState({ Name_Ml: name })
    }
  }


  AjouterCl() {
    if (this.state.Name_Cl != "" && this.state.cl_Membre_Select_fin.length != 0) {
      this.setState({
        modal7: !this.state.modal7
      });
      this.setState({ CompteurListI_Name: this.state.Name_Cl })
    }
  }


  AjouterMl() {
    if (this.state.Name_Ml != "" && this.state.ml_Membre_Select_fin.length != 0) {
      this.setState({
        modal6: !this.state.modal6
      });
      this.setState({ ML_Name: this.state.Name_Ml })
    }
  }
  AjouterTl() {
    if (this.state.Name_Tl != "" && this.state.Code_Tl != "") {
      this.setState({
        modal8: !this.state.modal8
      });
      //this.setState({ tl_name: this.state.Name_Tl })
      this.state.tl_name = this.state.Name_Tl
      this.setState({ tl_id: this.state.Code_Tl })
      console.log("tl_name", this.state.tl_name)
      console.log("tl_id", this.state.tl_id)
    }
  }

  handleListeMLClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Ml: id })
    this.setState({ Name_Ml: name })
    this.setState({ ML_Membre: membre })
  }
  handleListeTLClick(id, name, membre) {
    console.log(id, name, membre[0].Tl_Sql)
    this.setState({ Code_Tl: id })
    //this.setState({ Name_Tl: name })
    this.state.Name_Tl = name
    this.setState({ tl_members: membre[0].Tl_Sql })
    console.log("Code_Tl", this.state.Code_Tl)
    console.log("Name_Tl", this.state.Name_Tl)

    console.log("tl_members", this.state.membre)

  }
  handleListeCompteurClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Cl: id })
    this.setState({ Name_Cl: name })
    this.setState({ CL_Membre: membre })
  }
  /**************************************** */

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

    ////////////filter Reporting

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Report_Code;Report_Name",
        dist: "*",
        orderby: "*",
      }


    )

      .then(
        (result) => {
          this.tableData = result.data;
          if (this.tableData !== null) {
            this.setState({ listRapportglobal: result.data })
            console.log("data filter Reporting");
            console.log(this.state.listRapportglobal)
          } else {
            console.log('no data change')
          }



        }
      )




  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Nom_FactBook: ' ',

    }
  }


  toggle9 = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggle5 = () => {
    this.setState({
      modal5: !this.state.modal5
    });
  }
  toggle6 = () => {
    this.setState({
      modal6: !this.state.modal6
    });
    axios.post(window.apiUrl + "display/",
      {
        tablename: "ML_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {


            this.setState({ Listes_Ml: result.data })
            console.log("Listes_Ml", this.state.Listes_Ml)
            //       console.log("Listes_Ml ML_Name",Listes_Ml[0].ML_Name)
          } else {
            console.log('Listes_Ml vide')
          }

        })
  }
  toggle7 = () => {
    this.setState({
      modal7: !this.state.modal7
    });
    /////////CL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {

            this.setState({ Listes_Cl: result.data })

            console.log('different')


          } else {
            console.log('Listes_Cl vide')
          }

        })

    ///////////////
  }
  toggle8 = () => {
    this.setState({
      modal8: !this.state.modal8
    });
    /////////tL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "tl",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ Listes_TL: result.data })
          } else {
            console.log('Listes_TL vide')
          }

        })
  }

  toggle3 = () => {
    this.setState({
      modal3: !this.state.modal3
    });
    this.state.errors = {
      Nom_FactBook: ' ',

    }
  }
  toggle1 = () => {
    if (this.state.Nom_FactBook == "") {
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

    ////////////
    /// API Factbook
    axios.post(window.apiUrl + "display/",
      {
        tablename: "FactBook_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",

      }
    )
      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ listes: result.data })
            console.log(this.state.listes)
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
    /// FIN API Factbook
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case 'Nom_FactBook':
        errors.Nom_FactBook =
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
          tablename: "FactBook_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Code_FactBook",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {
            if (result.data !== null) {
              //  this.state.F_Code = result.data.substring(1, result.data.length-1);
              var code = result.data.split(", ")
              this.state.F_Code = code[0]
              console.log("Code_FactBook", this.state.F_Code)
            } else {
              console.log(" Code_FactBook vide")
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
            title: "Nom du rapports",
            field: "Report_Name",
            width: '70%',

          },

          {
            title: "Supprimer",
            field: "supprimer",
            width: "28%",
            hozAlign: "center",
            formatter: function () { //plain text value

              return "<i class='fa fa-trash-alt icon'></i>";

            },

            cellClick: function (e, cell) {
              cell.getData();
              supprimertemp.push(cell.getData().Report_Name);
              cell.getRow().delete();
              console.log("supprimertemp", supprimertemp)
            }
          },],
      });

      this.mytable.clearData()
    }

    else {
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
  ajouterListe() {

    if (this.state.Nom_FactBook == "") {


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
      const Report_Code = this.state.Report_Code;
      const Nom_FactBook = this.state.Nom_FactBook;
      const Report_Name = this.state.U_Rapportselected;
      /////////////////////////////////////////////

      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: "Report_Code",
          content: Report_Code,
          dataselect: "Report_Code;Report_Name;Report_TableauName;Report_TableauCode;Report_Master;Selected_Global;Body;TAGS;Auteur;disposition",
          dist: "*",
          orderby: "*",
        }

      )

        .then(
          (result) => {

            console.log("result.data1111111111111111111111", result.data)
            console.log("result.data1111111111111111111111", result.data.length != 0)
            if (result.data.length != 0) {
           
            //  console.log("result.data", result.data[0].Selected_Global)
              this.state.Selected_Global_Rapport_Array = result.data[0].Selected_Global
              this.setState({Body:result.data[0].Body})
              this.setState({Rapport_Liste:result.data[0]})



              this.state.Body_Code_Rapport=result.data[0].Report_Code




              if(result.data[0].Body.objects!=undefined){
              
              console.log("configLayout_Orientation", result.data[0].Body.configLayout)

              this.state.configLayout_Orientation=result.data[0].Body.configLayout.Orientation
  



              if (this.state.configLayout_Orientation == "Portrait") {
        
                this.setState({ layoutFormat: { height: "650px", width: "70%" } })
              }
              if (this.state.configLayout_Orientation == "Paysage") {

                this.setState({ layoutFormat: { height: "500px", width: "100%" } })
        
              }
              console.log("configLayout_Orientation", this.state.configLayout_Orientation)
                 }else if(result.data[0].Body.object!=undefined){

               console.log("synobtique")
                 }

              // this.setState({Selected_Global_Rapport_Array:result.data[0].Selected_Global})
              console.log("Selected_Global_Rapport_Array", this.state.Selected_Global_Rapport_Array)
              var Var = ""
              for (var i = 0; i < this.state.Selected_Global_Rapport_Array.length; i++) {

                //  console.log('Dim_type',this.state.Selected_Global_Rapport_Array[i].Dim_type)
                if (this.state.Selected_Global_Rapport_Array[i].Dim_type == "VAR") {
                  Var = this.state.Selected_Global_Rapport_Array[i].Dim_type

                  if (this.state.Selected_Global_Rapport_Array[i].Dim == "CL") {
                    this.setState({ BtnClDesibled: false })
                  }

                  if (this.state.Selected_Global_Rapport_Array[i].Dim == "ML") {
                    this.setState({ BtnMlDesibled: false })
                  }
                  if (this.state.Selected_Global_Rapport_Array[i].Dim == "TL") {
                    this.setState({ BtnTlDesibled: false })
                  }
                }


                if (this.state.Selected_Global_Rapport_Array[i].Dim == "CL") {
                  this.setState({ CompteurListI_Name: this.state.Selected_Global_Rapport_Array[i].Dim_label })
                }

                if (this.state.Selected_Global_Rapport_Array[i].Dim == "ML") {
                  this.setState({ ML_Name: this.state.Selected_Global_Rapport_Array[i].Dim_label })

                }
                if (this.state.Selected_Global_Rapport_Array[i].Dim == "TL") {
                  this.setState({ tl_name: this.state.Selected_Global_Rapport_Array[i].Dim_label })

                }


              }
              if (Var == "VAR") {
                console.log('Dim_type', Var)
                console.log("varrrr")



                this.toggle5()

              } else {
                console.log('Dim_type', Var)
                console.log("fix")
          
               
               var   Report_Code=this.state.Report_Code 
                  if (this.state.Report_Code != "" || this.state.U_Rapportselected != "") {
                    this.mytable.addRow({ Report_Name }, true);
                    console.log(Report_Name);

                    this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code })

                    console.log('Factbook_Membre push', this.state.Membres)
                  
                    this.setState({Report_Code:""})
                 this.setState({U_Rapportselected:""})
                  }
                


              }

            } else {
              console.log('no data change')

                 Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 4000,
                    icon: 'warning',
                    width: 300,
                    title: 'Sélectionnez un rapport'
                  })
            }


          }
        )





      //////////////////////////////////////



    }

  }


  FactbookList1() {


    const supprimertemp = this.state.supprimertemp;

    /// API CompteurList
    axios.post(window.apiUrl + "display/",
      {
        tablename: "FactBook_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",

      }
    )
      .then(
        (result) => {
          console.log('result FactBook')
          console.log(result.data)
          if (result.data != null) {
            if (this.state.Nom == "") {
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
            } else {
              for (var i = 0; i < result.data.length; i++) {
                this.state.Code_FactBook = result.data[i].Code_FactBook
                console.log(this.state.Code_FactBook)
                if (this.state.code == this.state.Code_FactBook) {
                  this.setState({
                    modal4: !this.state.modal4
                  });

                  this.setState({ Nom_FactBook: this.state.Nom })

                  // this.state.liste_Factbook_Membre=result.data[i].Factbook_Membre;
                  this.setState({ liste_Factbook_Membre: result.data[i].Factbook_Membre })
                  this.state.listePath = result.data[i].Path;
                  this.state.listeType = result.data[i].Type;
                  console.log("listePath", this.state.listePath)
                  console.log("listeType", this.state.Type)
                  console.log("Factbook_Membre", this.state.liste_Factbook_Membre)


                  if (this.state.liste_Factbook_Membre.length == 0) {

                    Swal.fire({
                      toast: true,
                      position: 'top',
                      showConfirmButton: false,
                      timer: 4000,
                      width: 500,
                      title: ('Ajouter des Rapports dans ' + this.state.Nom)

                    })
                    ///tabulator 
                    this.mytable = new Tabulator(this.el, {
                      data: this.tableData, //link data to table
                      reactiveData: true, //enable data reactivity
                      height: "450px",
                      columns: [

                        {
                          title: "Nom du rapports",
                          field: "Report_Name",
                          width: '70%',

                        },

                        {
                          title: "Supprimer",
                          field: "supprimer",
                          width: "29%",
                          hozAlign: "center",
                          formatter: function () { //plain text value

                            return "<i class='fa fa-trash-alt icon'></i>";

                          },

                          cellClick: function (e, cell) {
                            cell.getData();
                            cell.getRow().delete();

                            supprimertemp.push(cell.getData().Report_Name);

                            console.log("supprimertemp", supprimertemp)
                          }
                        },], //define table columns
                    });
                    this.mytable.clearData()
                  }
                  else {
                    this.tableData = result.data[i].Factbook_Membre;
                    console.log(" this.tableData", this.tableData)
                    ///tabulator 
                    this.mytable = new Tabulator(this.el, {
                      data: this.tableData, //link data to table
                      reactiveData: true, //enable data reactivity
                      height: "450px",
                      columns: [

                        {
                          title: "Nom du rapports",
                          field: "Report_Name",
                          width: '70%',

                        },

                        {
                          title: "Supprimer",
                          field: "supprimer",
                          width: "29%",
                          hozAlign: "center",
                          formatter: function () { //plain text value

                            return "<i class='fa fa-trash-alt icon'></i>";

                          },

                          cellClick: function (e, cell) {
                            cell.getData();
                            cell.getRow().delete();

                            supprimertemp.push(cell.getData().Report_Name);

                            console.log("supprimertemp", supprimertemp)
                          }
                        },], //define table columns
                    });



                  }

                }
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







    console.log(this.state.Nom)
    console.log(this.state.Code_FactBook)



  }

  supprimerAll() {



    const Code_FactBook = this.state.code;
    const Nom_FactBook = this.state.Nom_FactBook;
    const Path = this.state.listePath;
    const Type = this.state.listeType;
    const newMembres = (this.state.Membres.concat(this.state.liste_Factbook_Membre))

    console.log(this.state.liste_Factbook_Membre)
    console.log("Update_newMembres", newMembres)
    const Factbook_Membre = newMembres;
    console.log("Factbook_Membre", Factbook_Membre);
    const NB_Rapport = this.state.NB_Rapport
    const DBAction = "3"
    this.state.supprimer = {
      "Code_FactBook": Code_FactBook,
      "Nom_FactBook": Nom_FactBook,
      "Path": Path,
      "NB_Rapport": NB_Rapport,
      "Type": Type,
      "Factbook_Membre": Factbook_Membre,
      "DBAction": DBAction
    };
    this.state.supprimertemp.push(this.state.supprimer);
    console.log(this.state.supprimertemp);
    this.mytable.clearData()
    this.state.Nom_FactBook = ""
    this.setState({
      modal1: !this.state.modal1
    });



    axios.post(window.apiUrl + "updatedelete/", {
      tablename: "FactBook_V3",
      identifier: this.state.dateDMY + uuid(),
      datatomodified: [].concat(this.state.supprimertemp)
      //  datatodelete: ["Code_FactBook;Nom_FactBook;Path;NB_Rapport;Type;Factbook_Membre;DBAction"]
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
    this.state.Nom_FactBook = this.state.Nom
    console.log(this.state.Nom_FactBook)

    const Report_Name = this.state.Factbook_Membre;

    this.mytable.addData({ Report_Name }, true);
  }


  handleClick(id, event) {
    this.state.code = id;
    console.log("code", this.state.code)

  }


  ///////
  Newliste() {
    const Code_FactBook = this.state.F_Code;
    console.log("Code_FactBook11111", Code_FactBook)
    this.state.validation_Code = Code_FactBook;
    console.log(" this.state.validation_Code222222222", this.state.validation_Code)
    const Nom_FactBook = this.state.Nom_FactBook;
    const Path = this.state.listePath;
    const Type = "FactBook";

    /** with delete row */
    var data = this.state.Membres
    for (var i = 0; i < this.state.supprimertemp.length; i++) {

      var index = -1;
      var val = this.state.supprimertemp[i]
      console.log(val)
      var filteredObj = data.find(function (item, i) {
        if (item.Report_Name === val) {
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
    const Factbook_Membre = data;
    console.log("Factbook_Membre", Factbook_Membre);
    const NB_Rapport = this.state.NB_Rapport;
    const DBAction = "2";
    //this.state.ajout=( Code_FactBook+";"+Nom_FactBook+";"+Path+";"+NB_Rapport+";"+Type+";"+Factbook_Membre+";"+DBAction);
    this.state.ajout = {
      "Code_FactBook": Code_FactBook,
      "Nom_FactBook": Nom_FactBook,
      "Path": Path,
      "NB_Rapport": NB_Rapport,
      "Type": Type,
      "Factbook_Membre": Factbook_Membre,
      "DBAction": DBAction
    }
    this.state.ajoutertemp.push(this.state.ajout);
    console.log(this.state.ajoutertemp);
  }




  /////
  updateliste() {
    const Code_FactBook = this.state.code;
    this.state.validation_Code = Code_FactBook;
    const Nom_FactBook = this.state.Nom_FactBook;
    const Path = this.state.listePath;
    const Type = this.state.listeType;




    const newMembres = (this.state.Membres.concat(this.state.liste_Factbook_Membre))

    /** with delete row */


    //var val = this.state.supprimertemp[0]
    var data = newMembres
    for (var i = 0; i < this.state.supprimertemp.length; i++) {

      var index = -1;
      var val = this.state.supprimertemp[i]
      console.log(val)


      var filteredObj = data.find(function (item, i) {
        if (item.Report_Name === val) {
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

    console.log(this.state.liste_Factbook_Membre)
    console.log("Update_newMembres", newMembres)
    const Factbook_Membre = newMembres;

    console.log("supprimertemp", this.state.supprimertemp)

    console.log("Factbook_Membre", Factbook_Membre);
    const NB_Rapport = this.state.NB_Rapport
    const DBAction = "1"
    this.state.modifier = {
      "Code_FactBook": Code_FactBook,
      "Nom_FactBook": Nom_FactBook,
      "Path": Path,
      "NB_Rapport": NB_Rapport,
      "Type": Type,
      "Factbook_Membre": Factbook_Membre,
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
    } console.log("validation_Code", this.state.validation_Code)
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
        tablename: "FactBook_V3",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp)

      }
      )
        .then((response) => {
          console.log("Enregistrer FactBook_V3");
          console.log(response.status);
          console.log(response.statusText);
          console.log(response);
          console.log(response.data);


        if(this.state.ajoutertemp_Rapport.length!=0){
          const ajoutertemp_Rapport = JSON.stringify(this.state.ajoutertemp_Rapport)
          const ajoutertemp_Rapport1 = ajoutertemp_Rapport.replace(/'/g, "''")
          const ajoutertemp_Rapport2 = JSON.parse(ajoutertemp_Rapport1)
          axios.post(window.apiUrl + "updatedelete/", {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            datatomodified: [].concat(ajoutertemp_Rapport2),
          }
          )
            .then((response) => {
              console.log("Enregistrer Reporting_V3");
              console.log(response.status);
              console.log(response.statusText);
              console.log(response);
              console.log(response.data);
           
    
            })
            .catch((err) => console.error(err));


          }

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

  handleRapportselectedchange(event, id, Auteur) {
    console.log("tesssst", id)
    this.state.Report_Code = id;
    this.setState({ Report_Name: event })
    this.setState({
      U_Rapportselected: event,
    });

    console.log(this.state.U_Rapportselected)
  }

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  ////////////////////Filter Rapport fonction////////////////////


  resetvalueoffilter() {

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Report_Code;Report_Name",
        dist: "*",
        orderby: "*",
      }
    )

      .then(
        (result) => {
          this.tableData = result.data;

          //tabulator
          //this.setState({ dataCompteur: result.data })
          //console.log('result data global list compteur. ')
          //console.log('data' + this.tableData + 'data')
          if (result.data.length !== 0) {
            this.setState({ listRapportglobal: result.data })
            console.log("data filter");
            console.log(this.state.listRapportglobal)
          } else {
            console.log('no data change')
          }



        }
      )
    this.state.Master = ""
    this.state.TAGS = ""
    this.state.Tableaux = ""
  }

  filterRapportglobal = (filterNameRapport) => {
    //console.log('appel data')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    this.state.filterNameRapport = filterNameRapport;
    //console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", filterNameRapport)

    if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
      if (this.state.filterNameRapport == undefined || this.state.filterNameRapport.length == 0) {
        axios.post(window.apiUrl + "filter/",

          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: "*",
            content: "*",
            dataselect: "Report_Code;Report_Name",
            dist: "*",
            orderby: "*",
          }
        )

          .then(
            (result) => {
              this.tableData = result.data;

              //tabulator
              //this.setState({ dataCompteur: result.data })
              //console.log('result data global list compteur. ')
              //console.log('data' + this.tableData + 'data')
              if (result.data.length !== 0) {
                this.setState({ listRapportglobal: result.data })
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else {
                console.log('no data change')
              }



            }
          )

      }
      else {
        this.setState({ listRapportglobal: this.state.filterNameRapport })
      }
    }
    else {


      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_Code;Report_Name",
          dist: "*",
          orderby: "*",
        }
      )

        .then(
          (result) => {
            //  this.tableData = result.data;

            //tabulator
            //this.setState({ dataCompteur: result.data })
            console.log('result data global list Rapport. ')
            console.log('data' + result.data + 'data')
            if (result.data.length !== 0) {
              this.setState({ listRapportglobal: result.data })
              console.log("data filter");
              console.log(this.state.listRapportglobal)
            } else {
              console.log('no data change')
            }



          }
        )
    }

  }

  filterTableaux = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee tableaux')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_TableauCode;Report_TableauName",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data.length !== 0) {
              var listTableaux = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_TableauName;
                listTableaux.push(x)
              });
              this.setState({ listTableau: listTableaux })
              console.log("data Tableaux");
              console.log(this.state.listTableau)
            } else {
              console.log('no data change')
            }
          }
        )
    } else {
      console.log(this.state.listfieldfiltername.join(';'))
      console.log(this.state.listfieldfiltercontent.join(';'))
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_TableauCode;Report_TableauName",
          dist: "*;dist",
          orderby: "*;asc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            var listTableaux = []
            console.log("lllll", result.data)
            if (result.data.length !== 0) {

              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_TableauName;
                listTableaux.push(x)
              });
              this.setState({ listTableau: listTableaux })
              console.log("data compteur parent");
              console.log(this.state.listTableau)

            } else {
              console.log('no data recieve by compteur parent')
            }

          }
        )


    }
  }
  filterTAGS = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee TAGS')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_Code;TAGS",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data.length !== 0) {
              var listTAGSs = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.TAGS;
                listTAGSs.push(x)
              });
              this.setState({ listTAGS: listTAGSs })
              console.log("data TAGS");
              console.log(this.state.listTAGS)
            } else {
              console.log('no data change')
            }
          }
        )
    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_Code;TAGS",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listTAGSs = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.TAGS;
                listTAGSs.push(x)
              });
              this.setState({ listTAGS: listTAGSs })
              console.log("data TAGS");
              console.log(this.state.listTAGS)
            } else {
              console.log('no data change')
            }

          }
        )
    }


  }
  filterMaster = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee Master')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_Code;Report_Master",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data.length !== 0) {
              var listMasters = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_Master;
                listMasters.push(x)
              });
              this.setState({ listMaster: listMasters })
              console.log("data Master");
              console.log(this.state.listMaster)
            } else {
              console.log('no data change')
            }
          }
        )

    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_Code;Report_Master",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            //  this.tableData = result.data;
            console.log(result.data)
            if (result.data.length !== 0) {
              var listMasters = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_Master;
                listMasters.push(x)
              });
              this.setState({ listMaster: listMasters })
              console.log("data Master");
              console.log(this.state.listMaster)
            } else {
              console.log('no data change')
            }

          }
        )

    }

  }

  getlistcompteurparent = () => {
    var listeTableau = []
    var listglobalcompteur = []


    var listparentcompteurduplicate = [...new Set(listeTableau)]

    this.setState({ listTableaux: listparentcompteurduplicate })
    this.setState({ listRapportglobal: listglobalcompteur })
  }

  //////////////////////////////
  componentDidUpdate(prevProps, prevState) {

    if (prevState.Tableaux !== this.state.Tableaux) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Report_TableauName') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {

            if (item == 'Report_TableauName') {
              console.log('existeeeeeeeeeeeeeeee Report_TableauName')
              console.log(j)
              if (this.state.Tableaux != '') {
                this.state.listfieldfiltercontent[j] = this.state.Tableaux
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            }
          }
          );
        });
      } else if (this.state.Tableaux != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_TableauName'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Tableaux] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Report_TableauName'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Report_TableauName'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'),
            dataselect: "Report_Code;Report_Name",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              //  this.tableData = result.data;

              if (result.data.length !== 0) {

                this.setState({ listRapportglobal: result.data })
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else {
                console.log('no data change')
              }
            }
          )
      }


    }
    /****************************** */


    ///console.log("uniti fini", this.state.unite)
    /*************************** */
    if (prevState.TAGS !== this.state.TAGS) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('TAGS') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'TAGS') {
              console.log('existeeeeeeeeeeeeeeee TAGS')
              console.log(j)
              if (this.state.TAGS != '') {
                this.state.listfieldfiltercontent[j] = this.state.TAGS
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            }
          }
          );
        });
      } else if (this.state.TAGS != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'TAGS'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.TAGS] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'TAGS'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.TAGS].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'TAGS'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.TAGS].join(';'),
            dataselect: "Report_Code;Report_Name",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              //     result.data = result.data;
              if (result.data !== null) {


                this.setState({ listRapportglobal: result.data })
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else { console.log('no data change') }
            }
          )
      }


    }

    /********************** */
    if (prevState.Master !== this.state.Master) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Report_Master') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Report_Master') {
              console.log('existeeeeeeeeeeeeeeee Report_Master')
              console.log(j)
              if (this.state.Master != '') {
                this.state.listfieldfiltercontent[j] = this.state.Master
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            } /*else {
         console.log('not existttttttttttttttt')
         state.listfieldfiltername.concat('Report_TableauName')
         state.listfieldfiltercontent.concat(this.state.Tableaux)

       }*/
          }
          );
        });
      } else if (this.state.Master != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_Master'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Master] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Report_Master'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.Master].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Report_Master'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.Master].join(';'),
            dataselect: "Report_Code;Report_Name",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              // = result.data;
              if (result.data !== null) {

                this.setState({ listRapportglobal: result.data })
                console.log("data filter");
                console.log(this.state.listRapportglobal)

              } else {
                console.log('no data change')
              }
            }
          )

      }


    }
    /********************* */





  }


  ///////////////////////////////////////////////
  hClick(name, event) {
    this.state.unite = name;
    console.log("this.state.unite", this.state.unite)
  }
  ////////////////////////

  Ajouter_Rapport_Liste(){
           ////////////////////////Changement////////////////


console.log("Rapport_Liste",this.state.Rapport_Liste)
console.log("AjouterRapport",this.state.AjouterRapport)

         if(this.state.AjouterRapport==true){

           if(this.state.Selected_Global_Rapport_Array.length!=0){
            console.log("this.state.Selected_Global_Rapport_Array", this.state.Selected_Global_Rapport_Array)
            var CL_Selected = null
            var ML_Selected = null
            var TL_Selected = null
            for (var i = 0; i < this.state.Selected_Global_Rapport_Array.length; i++) {
                if (this.state.Selected_Global_Rapport_Array[i].Dim_type == "VAR") {
                    if (this.state.Selected_Global_Rapport_Array[i].Dim == "CL") {
                        console.log("1 VAR", this.state.Selected_Global_Rapport_Array[i].Dim)
                        this.setState({BooleanVar_CL:true})
                        if (this.state.Code_Cl != "" && this.state.Name_Cl != "") {
                            CL_Selected = {
                                "Dim": "CL",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Code_Cl,
                                "Dim_label": this.state.Name_Cl,
                                "Dim_Member": this.state.cl_Membre_Select_fin,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("CL_Selected1", CL_Selected)
                        } else {

                            CL_Selected = {
                                "Dim": "CL",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                                "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                                "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("CL_Selected2", CL_Selected)
                     this.setState({CompteurListI_Name:this.state.Selected_Global_Rapport_Array[i].Dim_label})
                        }
                    } else if (this.state.Selected_Global_Rapport_Array[i].Dim == "ML") {
                        console.log("2 VAR", this.state.Selected_Global_Rapport_Array[i].Dim)
                        this.setState({BooleanVar_ML:true})
                        if (this.state.Code_Ml != "" && this.state.Name_Ml != "") {
                            ML_Selected = {
                                "Dim": "ML",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Code_Ml,
                                "Dim_label": this.state.Name_Ml,
                                "Dim_Member": this.state.ml_Membre_Select_fin,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("ML_Selected1", ML_Selected)
                        } else {

                            ML_Selected = {
                                "Dim": "ML",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                                "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                                "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("ML_Selected2", ML_Selected)
                            this.setState({ML_Name:this.state.Selected_Global_Rapport_Array[i].Dim_label})
                        }

                    } else if (this.state.Selected_Global_Rapport_Array[i].Dim == "TL") {

                        console.log("3 VAR", this.state.Selected_Global_Rapport_Array[i].Dim)
                        this.setState({BooleanVar_TL:true})
                        if (this.state.Code_Tl != "" && this.state.Name_Tl != "") {
                            TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Code_Tl,
                                "Dim_label": this.state.Name_Tl,
                                "Dim_Member": this.state.tl_members,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("TL_Selected1", TL_Selected)
                        } else {

                            TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                                "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                                "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                                "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                            }
                            console.log("TL_Selected2", TL_Selected)
                            this.setState({tl_name:this.state.Selected_Global_Rapport_Array[i].Dim_label})
                        }

                        
                    } else {

                        console.log("vide")

                    }


                } else {

                    if (this.state.Selected_Global_Rapport_Array[i].Dim == "CL") {
                        console.log("1 Fix", this.state.Selected_Global_Rapport_Array[i].Dim)
                        CL_Selected = {
                            "Dim": "Cl",
                            "Dim_type": "Fix",
                            "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                            "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                            "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                            "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                        }
                        console.log("CL_Selected3", CL_Selected)
    

                    } else if (this.state.Selected_Global_Rapport_Array[i].Dim == "ML") {
                        console.log("2 Fix", this.state.Selected_Global_Rapport_Array[i].Dim)
                        ML_Selected = {
                            "Dim": "ML",
                            "Dim_type": "VAR",
                            "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                            "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                            "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                            "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                        }
                        console.log("ML_Selected3", ML_Selected)

                    } else if (this.state.Selected_Global_Rapport_Array[i].Dim == "TL") {

                        console.log("3 Fix", this.state.Selected_Global_Rapport_Array[i].Dim)

                        TL_Selected = {
                            "Dim": "TL",
                            "Dim_type": "Fix",
                            "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                            "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                            "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                            "Dim_Clone":this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                        }
                        console.log("TL_Selected3", TL_Selected)
                    } else {

                        console.log("vide")

                    }
                }


            }
            this.state.Selected_Global_Enregistrer=[CL_Selected, ML_Selected, TL_Selected]
        }else {
            console.log("Selected_Global_Rapport_Array is vide")
       }
            console.log('Selected_Global_Rapport_Array',this.state.Selected_Global_Enregistrer)
            /////////////////////////////////////////////
            if(this.state.Nom_Rappot_new!=""){



              axios.post(window.apiUrl + "filter/",

              {
                  tablename: "Reporting_V3",
                  identifier: this.state.dateDMY + uuid(),
                  fields: "Report_Name",
                  content: this.state.Nom_Rappot_new,
                  dataselect: "Report_Name",
                  dist: "dist",
                  orderby: "*",
              }
          )
     
              .then(
                  (result) => {
                      // this.tableData = result.data;
                      if (result.data.length !== 0) {
               
                     
                          Swal.fire({
                             toast: true,
                             position: 'top',
                             showConfirmButton: false,
                             timer: 4000,
                             width: 300,
                             icon: 'warning',
                             title: 'Nom de Rapport déjà utilisé'
                           })
     
                      }else{
  
     
            axios.post(window.apiUrl + "sendid/",
            {
              tablename: "Reporting_V3",
              identifier: this.state.dateDMY + uuid(),
              nombermaxcode: '1',
              primaryfield: "Report_Code",
              fields: "*",
              content: "*",
    
            }
          )
    
            .then(
              (result) => {
    
                // this.state.Email_Code = result.data.substring(1, result.data.length-1);
                if (result.data !== null) {
                  var code = result.data.split(", ")
                  this.state.Report_Code_new = code[0]
                  console.log("Report_Code")
                  console.log(this.state.Report_Code_new)

/////////////////////////////////////////////////////
 
var Report_Name=this.state.Nom_Rappot_new

console.log("Report_Name1",Report_Name)

this.state.ajoutertemp_Rapport.push({
  "Report_Code": this.state.Report_Code_new,
  "Report_Name": Report_Name,
  "Report_TableauName":this.state.Rapport_Liste.Report_TableauName,
  "Report_TableauCode":this.state.Rapport_Liste.Report_TableauCode,//parseInt(this.state.Report_TableauCode),
  "Report_Description": this.state.Rapport_Liste.Report_Description,
  "Report_Master": this.state.Rapport_Liste.Report_Master,
  "Report_EnergyCode": this.state.Rapport_Liste.Report_EnergyCode,
  "Report_EnergyName": this.state.Rapport_Liste.Report_EnergyName,
  "Report_ViewCode": this.state.Rapport_Liste.Report_ViewCode,
  "Report_ViewName": this.state.Rapport_Liste.Report_ViewName,
  "Report_PostCCode": this.state.Rapport_Liste.Report_PostCCode,
  "Report_PostCName": this.state.Rapport_Liste.Report_PostCName,
  "Auteur": this.state.Rapport_Liste.Auteur,
  "Body": this.state.config,
  "Selected_Global": this.state.Selected_Global_Enregistrer,
  "Html": this.state.Rapport_Liste.Html,
  "TAGS":this.state.Rapport_Liste.TAGS,
  "SHAH1_code": this.state.Rapport_Liste.SHAH1_code,
  "Access_Groupe_User": this.state.Rapport_Liste.Access_Groupe_User,
  "disposition": this.state.Rapport_Liste.disposition,
  "DBAction": "2"
})


var Report_Code_new =this.state.Report_Code_new
if (this.state.Report_Code_new != "" || this.state.U_Rapportselected != "") {
  this.mytable.addRow({ Report_Name,Report_Code_new }, true);
  console.log(Report_Name);

  this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code_new })

  console.log('Factbook_Membre push', this.state.Membres)
  this.state.Report_Code = "";
  this.state.U_Rapportselected = "";
  this.state.items= {
    default: "1"
  }
  this.state.GenerateTableActive=false
  this.state.config=null
  this.state.Report_Code_new=""
  this.state.Nom_Rappot_new=""
  this.state.AjouterRapport=false
  this.state.cl_Membre_Select_fin=[]
  this.state.ml_Membre_Select_fin=[]
  this.state.tl_members=[]
}


this.setState({
  modal5: !this.state.modal5
});
/////////////////////////////////////////////////

                } else {
                  console.log('Report_Code est vide')
                }

              })




            }})
            

            }else{
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 300,
                icon: 'warning',
                title: 'Ajouter un nouveau nom de rapport'
              })
            }

          
          }else {
           var Report_Name=this.state.Report_Name
           var Report_Code=this.state.Report_Code

            if (this.state.Report_Code != "" || this.state.U_Rapportselected != "") {
              this.mytable.addRow({ Report_Name }, true);
              console.log(Report_Name);

              this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code })

              console.log('Factbook_Membre push', this.state.Membres)
              this.state.Report_Code = "";
              this.state.U_Rapportselected = "";
              this.state.items= {
                default: "1"
              }
              this.state.GenerateTableActive=false
              this.state.config=null
              this.state.Report_Code_new=""
              this.state.Report_Name=""
              this.state.AjouterRapport=false
              this.state.cl_Membre_Select_fin=[]
              this.state.ml_Membre_Select_fin=[]
              this.state.tl_members=[]
            }

            this.setState({
              modal5: !this.state.modal5
            });
          }

  }

  
  ///////////////////
  render() {

    const { errors } = this.state;
    return (
      <div>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > FactBook </MDBBreadcrumbItem>
        </MDBBreadcrumb>

        <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px" }}>
          {/** liste 1 */}
          <MDBRow >
            <MDBCol size="6">
              <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: '650px', height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>



                {/****************************************************** */}

                < table border="1" style={{ marginTop: "78px" }} className="tab  float-right" >
                  <thead >
                    <tr>
                      <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Fichier Source </b></th>
                      <th style={{ backgroundColor: "#fff" }}><h6 value={this.state.U_Rapportselected} onChange={this.handleChange} id="1" >{this.state.U_Rapportselected}</h6></th>
                      <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round ' style={{ marginLeft: '4px' }} onClick={this.ajouterListe} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                    </tr>

                  </thead>
                  <tbody></tbody>
                </table >

                <Rapport Tableaux={this.state.Tableaux}
                  TAGS={this.state.TAGS}
                  Master={this.state.Master}
                  filterMaster={this.filterMaster}
                  filterTAGS={this.filterTAGS}
                  listMaster={this.state.listMaster}
                  filterTableaux={this.filterTableaux}
                  listRapportglobal={this.state.listRapportglobal}
                  resetvalueoffilter={this.resetvalueoffilter}
                  listTAGS={this.state.listTAGS}
                  listTableau={this.state.listTableau}
                  handleChange={this.handleChange}
                  filterRapportglobal={this.filterRapportglobal}
                  handleRapportselectedchange={this.handleRapportselectedchange} />





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

                  <ModalFactBook toggle4={this.toggle4} listes={this.state.listes} handleChange={this.handleChange} handleClick={this.handleClick} Nom={this.state.Nom} />

                  <MDBModalFooter>

                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.FactbookList1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                {/* /***********************************  */}

                <MDBModal isOpen={this.state.modal5} toggle={this.toggle5} centered size="lg" >






                  <MDBModalHeader toggle5={this.toggle5}>Changer les données</MDBModalHeader>

                  <MDBModalBody>
                  <MDBTabContent activeItem={this.state.items["default"]}>
                    <MDBTabPane tabId="1">

                      <MDBRow>
                        <MDBCol size="4" style={{ marginTop: "-10px" }}>
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnClDesibled}
                            style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle7}>
                            Compteurs Listes
                          </MDBBtn>
                        </MDBCol >
                        <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >{this.state.CompteurListI_Name}</b></MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol size="4" >
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnMlDesibled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle6}>
                            Mesures Listes
                          </MDBBtn>

                        </MDBCol>
                        <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.ML_Name}</b></MDBCol>
                      </MDBRow>
                      <MDBRow>

                        <MDBCol size="4" >
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnTlDesibled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle8}>
                            Time Intelligence
                          </MDBBtn>

                        </MDBCol>
                        <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.tl_name}</b></MDBCol>
                      </MDBRow>

                    </MDBTabPane>

                    <MDBTabPane tabId="2">
                    {this.state.GenerateTableActive &&
                          <div>


                            <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} style={{  width: this.state.layoutFormat.width, height: this.state.layoutFormat.height}}
                            />  </div>}
                            {this.state.AjouterRapport==true?(   <>  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                  Tapez le nom du Nouveau Rapport ici :<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                              </label>
                              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_Rappot_new" className="form-control" value={this.state.Nom_Rappot_new} onChange={this.handleChange} required />
                           </>   ):null}

                            
                    </MDBTabPane>

                 </MDBTabContent>

                  </MDBModalBody>
                  <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={this.state.items["default"] === "1"} onClick={this.togglePills("default", "1")} >
                        Données
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={this.state.items["default"] === "2"} onClick={this.togglePills("default", "2")} >
                        Vue
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                  <MDBModalFooter>
                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.Ajouter_Rapport_Liste}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                {/************* Nom_FactBook *************/}
                <div style={{ marginTop: "20px" }} >
                  < table border="1" className="tab  float-right" >
                    <thead >
                      <tr>
                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}>Fichier Source</b></th>
                        <th style={{ backgroundColor: "#fff" }}>

                          <h6 value={this.state.Nom_FactBook} onChange={this.handleChange} >

                            {this.state.Nom_FactBook}

                          </h6>
                        </th>
                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >
                          {/** Nouveau */}
                          <MDBBtn className=' button_round  ' id="btnNouveau" style={{ marginLeft: '4px' }} onClick={this.toggle}><MDBIcon title="Nouveau" icon="plus" /></MDBBtn>
                          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
                            <MDBModalHeader toggle={this.toggle} >Tapez le nom du Nouveau FactBook ici :</MDBModalHeader>
                            <MDBModalBody>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                              </label>
                              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_FactBook" className="form-control" value={this.state.Nom_FactBook} onChange={this.handleChange} required />

                              {errors.Nom_FactBook.length > 0 &&
                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Nom_FactBook}</span>}
                            </MDBModalBody>
                            <MDBModalFooter>

                              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                            </MDBModalFooter>
                          </MDBModal>

                          {/** Modifier Nom liste */}
                          <MDBBtn className=' button_round  option' id="btnModifier" style={{ marginLeft: '4px' }} onClick={this.toggle3}><MDBIcon title="Modifier Nom" icon="pencil-alt" /></MDBBtn>
                          <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
                            <MDBModalHeader toggle={this.toggle3} >Modifier le nom du FactBook ici :</MDBModalHeader>
                            <MDBModalBody>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                              </label>
                              <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_FactBook" className="form-control" value={this.state.Nom_FactBook} onChange={this.handleChange} required />
                              {errors.Nom_FactBook.length > 0 &&
                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Nom_FactBook}</span>}

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
                                Voulez-vous vraiment supprimer la CompteurList selectionner ?
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
        {/**    Mesures Listes Modale */}

        <MDBModal isOpen={this.state.modal6} toggle={this.toggle6} centered size="lg">

          <ModalML toggle2={this.toggle6} ML_Tags_Function={this.ML_Tags_Function} Code_Ml={this.state.Code_Ml} Name_Ml={this.state.Name_Ml} handleChange={this.handleChange} modelMl={this.modelMl} Listes_Ml={this.state.Listes_Ml} handleListeMLClick={this.handleListeMLClick} ML_Membre={this.state.ML_Membre} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link onClick={() => this.MesuresListes()}>
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>


          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterMl}
            > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        {/**    Compteurs Listes Modale */}
        <MDBModal isOpen={this.state.modal7} toggle={this.toggle7} centered size="lg">

          <ModalCL toggle4={this.toggle7} CL_Tags_Function={this.CL_Tags_Function} handleChange={this.handleChange} modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link onClick={() => this.CL()}>
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterCl}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        {/**    Time Intelligence Modale */}
        <MDBModal isOpen={this.state.modal8} toggle={this.toggle8} centered size="lg" >

          <ModalTL Listes_TL={this.state.Listes_TL} handleChange={this.handleChange} handleListeTLClick={this.handleListeTLClick} toggle5={this.toggle8} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link to="/Rapporteur/TimeIntelligence" onClick={() => this.tl()} >
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterTl}
            > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>);
  }





}
export default FactBook;




const Rapport = ({ Tableaux, TAGS, Master, filterMaster, filterTAGS, listMaster, filterTableaux, listRapportglobal, resetvalueoffilter, listTAGS, listTableau, handleChange, filterRapportglobal, handleRapportselectedchange }) => {
  const scrollContainerStyle = { width: "350px", maxHeight: "410px" };
  const [filterNameRapport, setFilterNameRapport] = useState([])
  useEffect(() => {

    const matna7inich = (e) => {
      //console.log("listRapportglobal", listRapportglobal)
      const text = e.target.value
      //console.log(listRapportglobal.filter((el) => el.Report_Name.indexOf(text) >= 0))
      //listRapportglobal.filter((el)=>el.Report_Name.indexOf(text)>=0)
      setFilterNameRapport(listRapportglobal.filter((el) => el.Report_Name.indexOf(text) >= 0))


    }

    const input = document.querySelector("#myInput")

    //console.log("this.state.modal", input)
    if (input) {
      input.addEventListener("keyup", matna7inich)
    }

    return function cleanup() {
      input.removeEventListener("keyup", matna7inich)
    }



  }, [listRapportglobal])
  useEffect(() => {
    if (!filterNameRapport) return
    filterRapportglobal(filterNameRapport)
    //console.log("filterNameRapport", filterNameRapport)
  }, [filterNameRapport])

  return (<>

    <MDBRow style={{ marginTop: "166px" }} >
      <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
        <label htmlFor="defaultFormLoginEmailEx7" >
          Filter rapport :
        </label>
        <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => { resetvalueoffilter(); }}>
          <MDBIcon size='lg' icon="sync-alt" />
        </MDBBtn>

        <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>


          <MDBInput label="Tableaux :"
            list="listTableau" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
            onClick={filterTableaux}
            autoComplete="off"
            name="Tableaux" value={Tableaux}
            onChange={handleChange}
          />
          <datalist id="listTableau">
            {listTableau.map((listTableau, i) => <option key={i} value={listTableau}></option>)}

          </datalist>


          <MDBInput label="Mots clés:"
            list="listTAGS" style={{ marginBottom: 0.8 + 'em' }}
            onClick={filterTAGS}
            name="TAGS" value={TAGS}
            onChange={handleChange}
            autoComplete="off"
          />
          <datalist id="listTAGS">
            {listTAGS.map((listTAGS, i) => <option key={i} value={listTAGS}></option>)}
          </datalist>

          <MDBInput label="Master :"
            list="listMaster" style={{ marginBottom: 0.8 + 'em' }}
            autoComplete="off"
            onClick={filterMaster}
            name="Master" value={Master}
            onChange={handleChange}
          />
          <datalist id="listMaster">
            {listMaster.map((listMaster, i) => <option key={i} value={listMaster}></option>)}
          </datalist>
        </MDBCol>

      </MDBCol>
      {/**********   This is where the magic happens     ***********/}
      <MDBCol className='p-0'>
        <MDBCol style={{ marginLeft: "1%" }}>

          <div className="d-flex justify-content-between " >
            <p className=" m-0 p-0">Liste des rapports : </p>

            {/* <input type="textarea" id="1" id="defaultFormLoginEmailEx" style={{width:"60%",marginTop:"-7px"}}   name="Report_Name_Search" value={this.state.Report_Name_Search} onChange={this.handleChange} className="form-control" required /> */}
            <input type="text" id="myInput" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "60%", marginTop: "-2%" }} />

          </div>
          <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }} >
            <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle} id="myFilter">
              {listRapportglobal.map((listRapportglobal, i) => <MDBListGroupItem hover key={i} name="Report_Name" value={listRapportglobal.Report_Name} style={{ padding: 0.5 + 'em' }} id={listRapportglobal.Report_Code} hover onClick={() => handleRapportselectedchange(listRapportglobal.Report_Name, listRapportglobal.Report_Code)}>{listRapportglobal.Report_Name}</MDBListGroupItem>)}
            </MDBListGroup>
          </MDBContainer>
        </MDBCol>
      </MDBCol>
    </MDBRow>


  </>)
}




const ModalFactBook = ({ toggle4, listes, handleChange, handleClick, Nom }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterML_Liste, setfilterML_Liste] = useState([])

  useEffect(() => {

    console.log("--------Listes_Ml------->", listes)
  }, [listes])

  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterML_Liste.length == 0) {
      setfilterML_Liste(listes)
    }
    if (listes.length != 0) {
      const FilterClListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", listes.filter(
          (el, i) => {
            // console.log(i,el)
            return el.Nom_FactBook.indexOf(text) >= 0
          }
        )
        )

        setfilterML_Liste(listes.filter((el) => el.Nom_FactBook.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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
    //if(!filterML_Liste)return
    console.log('---filterML_Liste--->', filterML_Liste)



  }, [filterML_Liste])

  return (
    <>
      <MDBModalHeader toggle={toggle4} >Sélectionnez une liste:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des FactBook
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
              <option></option>
              {filterML_Liste.map(liste => <option key={liste.Code_FactBook} id={liste.Code_FactBook} onClick={(e) => handleClick(liste.Code_FactBook, e)}>  {liste.Nom_FactBook} </option>)}

            </select>
          </MDBCol>

        </MDBRow>
      </MDBModalBody>
    </>
  )


}




const ModalCL = ({ toggle7, modelCl, CL_Tags_Function, Listes_Cl, handleListeCompteurClick, handleChange, CL_Membre }) => {
  //console.log("Listes_Cl", Listes_Cl)

  const [filterCL_Liste, setfilterCL_Liste] = useState([])
  const [filterCL_Membre, setfilterCL_Membre] = useState([])
  const [CL_Membre_Select, setCL_Membre_Select] = useState([])
  const [Member_select, setMember_select] = useState({})
  const [btnDelete, setBtnDelete] = useState(true)
  const [Le_Compteur, setLe_Compteur] = useState("")
  const [Code_Compteur, setCode_Compteur] = useState("")
  const [showTAGS_CL, setShowTAGS_CL] = useState(false)
  const [CL_Tags_var, setCL_Tags_var] = useState("")
  const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
  const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
  useEffect(() => {

    //console.log("--------------->",Listes_Cl)
  }, [Listes_Cl])

  //////////////////
  useEffect(() => {

    console.log("---------CL_Membre------>", CL_Membre)

    if (filterCL_Membre != CL_Membre) {
      setfilterCL_Membre(CL_Membre)
    }
  }, [CL_Membre])
  ////////////
  useEffect(() => {

    //console.log("jjjj",CL_Membre.length!=0)
    if (filterCL_Membre.length == 0) {
      setfilterCL_Membre(CL_Membre)
    }
    if (CL_Membre.length != 0) {

      const filterCLMembre = (e) => {

        //console.log("CL_Membre", CL_Membre)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", CL_Membre.filter(
          (el, i) => {
            // console.log(i,el)
            return el.Le_Compteur.indexOf(text) >= 0
          }
        )
        )

        setfilterCL_Membre(CL_Membre.filter((el) => el.Le_Compteur.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl_Membre")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => filterCLMembre(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", filterCLMembre)
      }

    }

  }, [CL_Membre])
  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Cl.length!=0)
    if (filterCL_Liste.length == 0) {
      setfilterCL_Liste(Listes_Cl)
    }
    if (Listes_Cl.length != 0) {
      const FilterClListe = (e) => {

        //console.log("Listes_Cl", Listes_Cl)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_Cl.filter(
          (el, i) => {
            // console.log(i,el)
            return el.CompteurListI_Name.indexOf(text) >= 0
          }
        )
        )

        setfilterCL_Liste(Listes_Cl.filter((el) => el.CompteurListI_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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

  }, [Listes_Cl])
  //////////////////////
  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---filterCL_Liste--->', filterCL_Liste)



  }, [filterCL_Liste])

  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---filterCL_Liste--->', filterCL_Membre)



  }, [filterCL_Membre])
  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---CL_Membre_Select--->', CL_Membre_Select)
    modelCl(CL_Membre_Select)
    if (CL_Membre_Select.length == 0) {
      setBtnDelete(true)
    }

  }, [CL_Membre_Select])
  function Ajouter_All() {
    setCL_Membre_Select(CL_Membre)
    setBtnDelete(false)
    setShowTAGS_CL(false)
    setShowBtnAjouterParMembre(true)
    setCL_Tags_var("")
  }
  function Ajouter_Par_Member() {
    const elem = document.querySelector(`#selectWestania`)
    if (elem) {
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex = -1
    }
    //console.log("ajouter y2")
    const array = []
    //console.log("CL_Membre_Select",CL_Membre_Select)
    //console.log("Member_select",Member_select)

    if (!Object.keys(Member_select).length) return
    //console.log("CL_Membre_Select.length",CL_Membre_Select.length)
    if (CL_Membre_Select.length == 0) {
      array.push(Member_select)
      setCL_Membre_Select(array)
      setBtnDelete(false)
      setShowTAGS_CL(true)
      setShowBtnAjouterAll(true)
      //console.log("arrayarrayarrayarrayarrayarray",array)

    }
    else {
      if (!CL_Membre_Select) return
      if (!CL_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
        array.push(Member_select)
        setCL_Membre_Select(array.concat(CL_Membre_Select))
      } else {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'Déja Ajouter dans la liste'
        })
      }

    }


    //   for (var i = 0; i < filterCL_Membre.length; i++) {

    //     if (filterCL_Membre[i].Le_Compteur === array[0].Le_Compteur) {

    //         filterCL_Membre.splice(i, 1);
    //     }

    //   }
    console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterCL_Membre)
    console.log('KKKKK', CL_Membre)
    setMember_select({})
  }
  function Delete_Member() {
    setCL_Membre_Select([])
    setMember_select({})
    setShowTAGS_CL(false)
    setShowBtnAjouterAll(false)
    setShowBtnAjouterParMembre(false)
    setCL_Tags_var("")
  }

  useEffect(() => {
    console.log("------Member_select---->", Member_select)
  }, [Member_select])


  function handleClClick(id, name, e) {
    setCode_Compteur(id);
    setLe_Compteur(name);
  }
  useEffect(() => {
    if (Le_Compteur != "" && Code_Compteur != "") {
      setMember_select({ "Le_Compteur": Le_Compteur, "Code_Compteur": Code_Compteur })
    }
  }, [Le_Compteur, Code_Compteur])

  useEffect(() => {
    // if (!CL_Tags_var)return
    CL_Tags_Function(CL_Tags_var)
    console.log("CL_Tags_var", CL_Tags_var)

  }, [CL_Tags_var])



  const onChange = (e) => {
    setCL_Tags_var(e.currentTarget.value);

  }
  return (
    <>
      <MDBModalHeader toggle={toggle7} >Sélectionnez Compteurs Listes:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterCL_Liste.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={() => handleListeCompteurClick(liste.CompteurList_Code, liste.CompteurListI_Name, liste.CL_Membre)}>  {liste.CompteurListI_Name} </option>)}

            </select>
          </MDBCol>
          {CL_Membre.length ? (
            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres
              </label>
              <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
              <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
                <option style={{ display: "none" }} selected value> -- select an option -- </option>
                {filterCL_Membre.map(liste => <option onClick={(e) => handleClClick(liste.Code_Compteur, liste.Le_Compteur, e)} >  {liste.Le_Compteur} </option>)}

              </select>
            </MDBCol>
          ) : null}

          {CL_Membre.length ? (
            <MDBCol size="2" >

              <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
              <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
              <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>

            </MDBCol>
          ) : null}


          {CL_Membre.length ? (

            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres sélectionnez
              </label>

              <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                {CL_Membre_Select.map(liste => <option >  {liste.Le_Compteur} </option>)}

              </select>
            </MDBCol>
          ) : null}
          {showTAGS_CL == true ? (<MDBCol size="12">

            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Mot clé d'une nouvelle liste compteur
            </label>
            <input type="text" id="1" id="defaultFormLoginEmailEx" name="CL_Tags_var" value={CL_Tags_var} onChange={onChange} className="form-control" required />



          </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}

const ModalML = ({ toggle6, ML_Tags_Function, modelMl, Code_Ml, Name_Ml, Listes_Ml, handleListeMLClick, handleChange, ML_Membre }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterML_Liste, setfilterML_Liste] = useState([])
  const [filterML_Membre, setfilterML_Membre] = useState([])
  const [ML_Membre_Select, setML_Membre_Select] = useState([])
  const [Member_select, setMember_select] = useState({})
  const [btnDelete, setBtnDelete] = useState(true)
  const [m_name, setM_name] = useState("")
  const [m_code, setM_code] = useState("")
  const [ML_Tags_var, setML_Tags_var] = useState("")
  const [showTAGS_ML, setShowTAGS_ML] = useState(false)
  const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
  const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
  useEffect(() => {

    console.log("--------Listes_Ml------->", Listes_Ml)
  }, [Listes_Ml])

  //////////////////
  useEffect(() => {

    console.log("---------ML_Membre------>", ML_Membre)

    if (filterML_Membre != ML_Membre) {
      setfilterML_Membre(ML_Membre)
    }
  }, [ML_Membre])
  ////////////
  useEffect(() => {

    //console.log("jjjj",ML_Membre.length!=0)
    if (filterML_Membre.length == 0) {
      setfilterML_Membre(ML_Membre)
    }
    if (ML_Membre.length != 0) {

      const filterMLMembre = (e) => {

        //console.log("ML_Membre", ML_Membre)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", ML_Membre.filter(
          (el, i) => {
            // console.log(i,el)
            return el.m_name.indexOf(text) >= 0
          }
        )
        )

        setfilterML_Membre(ML_Membre.filter((el) => el.m_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl_Membre")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => filterMLMembre(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", filterMLMembre)
      }

    }

  }, [ML_Membre])
  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterML_Liste.length == 0) {
      setfilterML_Liste(Listes_Ml)
    }
    if (Listes_Ml.length != 0) {
      const FilterClListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_Ml.filter(
          (el, i) => {
            // console.log(i,el)
            return el.ML_Name.indexOf(text) >= 0
          }
        )
        )

        setfilterML_Liste(Listes_Ml.filter((el) => el.ML_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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

  }, [Listes_Ml])
  //////////////////////
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterML_Liste--->', filterML_Liste)



  }, [filterML_Liste])

  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterML_Liste--->', filterML_Membre)



  }, [filterML_Membre])
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---ML_Membre_Select--->', ML_Membre_Select)
    modelMl(ML_Membre_Select)
    if (ML_Membre_Select.length == 0) {
      setBtnDelete(true)
    }

  }, [ML_Membre_Select])
  function Ajouter_All() {
    setML_Membre_Select(ML_Membre)
    setBtnDelete(false)
    setShowTAGS_ML(false)
    setShowBtnAjouterParMembre(true)
    setML_Tags_var("")
  }
  function Ajouter_Par_Member() {
    const elem = document.querySelector(`#selectWestania`)
    if (elem) {
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex = -1
    }
    //console.log("ajouter y2")
    const array = []
    //console.log("ML_Membre_Select",ML_Membre_Select)
    //console.log("Member_select",Member_select)

    if (!Object.keys(Member_select).length) return
    //console.log("ML_Membre_Select.length",ML_Membre_Select.length)
    if (ML_Membre_Select.length == 0) {
      array.push(Member_select)
      setML_Membre_Select(array)
      setBtnDelete(false)
      setShowTAGS_ML(true)
      setShowBtnAjouterAll(true)
      //console.log("arrayarrayarrayarrayarrayarray",array)

    }
    else {
      if (!ML_Membre_Select) return
      if (!ML_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
        array.push(Member_select)
        setML_Membre_Select(array.concat(ML_Membre_Select))
      } else {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'Déja Ajouter dans la liste'
        })
      }

    }


    //   for (var i = 0; i < filterML_Membre.length; i++) {

    //     if (filterML_Membre[i].Le_Compteur === array[0].Le_Compteur) {

    //         filterML_Membre.splice(i, 1);
    //     }

    //   }
    console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterML_Membre)
    console.log('KKKKK', ML_Membre)
    setMember_select({})
  }
  function Delete_Member() {
    setML_Membre_Select([])
    setMember_select({})
    setShowTAGS_ML(false)
    setShowBtnAjouterAll(false)
    setShowBtnAjouterParMembre(false)
    setML_Tags_var("")

  }

  useEffect(() => {
    console.log("------Member_select---->", Member_select)
  }, [Member_select])


  function handleMlClick(id, name, e) {
    setM_code(id);
    setM_name(name);
  }
  useEffect(() => {
    if (m_name != "" && m_code != "") {
      setMember_select({ "m_name": m_name, "m_code": m_code })
    }
  }, [m_name, m_code])

  useEffect(() => {
    // if (!CL_Tags_var)return
    ML_Tags_Function(ML_Tags_var)
    console.log("ML_Tags_var", ML_Tags_var)

  }, [ML_Tags_var])



  const onChange = (e) => {
    setML_Tags_var(e.currentTarget.value);

  }
  return (
    <>
      <MDBModalHeader toggle={toggle6} >Sélectionnez measure Listes:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterML_Liste.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={() => handleListeMLClick(liste.ML_Code, liste.ML_Name, liste.ML_Membre)}>  {liste.ML_Name} </option>)}

            </select>
          </MDBCol>
          {ML_Membre.length ? (
            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres
              </label>
              <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
              <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
                <option style={{ display: "none" }} selected value> -- select an option -- </option>
                {filterML_Membre.map(liste => <option onClick={(e) => handleMlClick(liste.m_code, liste.m_name, e)} >  {liste.m_name} </option>)}

              </select>
            </MDBCol>
          ) : null}

          {ML_Membre.length ? (
            <MDBCol size="2" >

              <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
              <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
              <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>

            </MDBCol>
          ) : null}


          {ML_Membre.length ? (

            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres sélectionnez
              </label>

              <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                {ML_Membre_Select.map(liste => <option >  {liste.m_name} </option>)}

              </select>
            </MDBCol>
          ) : null}
          {showTAGS_ML == true ? (

            <MDBCol size="12">

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Mot clé d'une nouvelle liste compteur
              </label>
              <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Tags_var" value={ML_Tags_var} onChange={onChange} className="form-control" required />



            </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}


const ModalTL = ({ toggle8, Listes_TL, handleListeTLClick, handleChange }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterTL_Liste, setfilterTL_Liste] = useState([])

  useEffect(() => {

    console.log("--------Listes_TL------->", Listes_TL)
  }, [Listes_TL])

  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterTL_Liste.length == 0) {
      setfilterTL_Liste(Listes_TL)
    }
    if (Listes_TL.length != 0) {
      const FilterTlListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_TL.filter(
          (el, i) => {
            // console.log(i,el)
            return el.tl_name.indexOf(text) >= 0
          }
        )
        )

        setfilterTL_Liste(Listes_TL.filter((el) => el.tl_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterTlListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterTlListe)
      }

    }

  }, [Listes_TL])
  //////////////////////
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterTL_Liste--->', filterTL_Liste)



  }, [filterTL_Liste])




  return (
    <>
      <MDBModalHeader toggle={toggle8} >Sélectionnez Time Intelligence:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterTL_Liste.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={() => handleListeTLClick(liste.tl_id, liste.tl_name, liste.tl_members)}>  {liste.tl_name} </option>)}

            </select>
          </MDBCol>





        </MDBRow>
      </MDBModalBody>
    </>
  )


}