import React, { useEffect, useState } from "react";
import { MDBContainer, MDBTabPane,MDBTabContent, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import GenerateTable from '../Rapport/layoutGen/layoutGenerator';
import axios from 'axios';
import axios1 from '../../axios';
import uuid from 'react-uuid';
import Moment from 'moment';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import Navbar from "../../navbar";
import FilterV1 from '../../filterV1';
import Modal_TL_V2 from "../../Modal/Modal_TL_V2";
import Modal_CL_V2 from "../../Modal/Modal_CL_V2";
import Modal_ML_V2 from "../../Modal/Modal_ML_V2";
import { ReactTabulator, reactFormatter } from 'react-tabulator'
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
      tabulatorAfficher:false,
      tableData:[],
      columns:[  {
        title: "Nom du rapports",
        field: "Report_Name",
        width: '70%',

      },

      {
        title: "Supprimer",
        field: "supprimer",
        width: "28%",
        hozAlign: "center",
        formatter: this.supprimerFunIcon,
        cellClick: this.supprimerFunclick,

        // cellClick: function (e, cell) {
        //   cell.getData();
        //   supprimertemp.push(cell.getData().Report_Name);
        //   cell.getRow().delete();
        //   console.log("supprimertemp", supprimertemp)
        // }
      }],
      history:props.history,
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
      modalConfirmationAjout:false,
      Body:null,
      AjouterRapport:false,
      ajoutertemp_Rapport:[],
      Report_Code_new:"",
      Rapport_Liste:[],
      Nom_Rappot_new:"",
      TAGS_New:"",
      Report_Description:"",
      ////////////////
      tl_name_IOT:"",
      tl_id_IOT:"",
      tl_name_cluster:"",
      tl_id_cluster:"",
      BtnAjouterRapportCloner:false,
      modalDelete:false,
      tabulatorAfficher:false,
    }
    this.mytable = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.FactbookList1 = this.FactbookList1.bind(this);
    this.ajouterListe = this.ajouterListe.bind(this);
    this.supprimerAll = this.supprimerAll.bind(this);
   // this.addAll = this.addAll.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Newliste = this.Newliste.bind(this);
    this.updateliste = this.updateliste.bind(this);
    this.modifierNom = this.modifierNom.bind(this);
    this.hClick = this.hClick.bind(this);
    this.handleRapportselectedchange = this.handleRapportselectedchange.bind(this);
  
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
  this.state.Report_Name_Enregistrer=this.state.Nom_Rappot_new
  if (this.state.Report_Name_Enregistrer != "" && this.state.Report_Name_Enregistrer.length > 5) {

    axios1.get(window.apiUrl + `getReportByName/?reportName=${this.state.Report_Name_Enregistrer}`)
      .then(
        (result) => {
          if (result.data.length !== null) {

            if (result.status == 200) {
           

            Swal.fire({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              icon: 'warning',
              width: 450,
              title: 'Nom de Rapport déjà utilisé'
            })
          }
          }
        })

      .catch((err) => {
     



 // console.log("this.state.Body1", this.state.Body)
  if (this.state.cl_Membre_Select_fin.length != 0 || this.state.ml_Membre_Select_fin.length != 0 || this.state.tl_id_cluster != "" || this.state.tl_id_IOT != "") {
    console.log("Selected_Global_Rapport_Array", this.state.Selected_Global_Rapport_Array)


    var data = []


    if (this.state.cl_Membre_Select_fin.length != 0 || this.state.ml_Membre_Select_fin.length != 0 || this.state.tl_id_cluster != "" || this.state.tl_id_IOT != "") {
      if (this.state.cl_Membre_Select_fin.length != 0 && this.state.ml_Membre_Select_fin.length == 0 && this.state.tl_id_IOT.length == 0 && this.state.tl_id_cluster.length == 0) {
        /////CL
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          }
        }]
      } else if (this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length == 0 && this.state.tl_id_cluster.length == 0 && this.state.cl_Membre_Select_fin.length == 0) {
        /////ML
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          }
        }]
      } else if (this.state.tl_id_IOT.length != 0 && this.state.tl_id_cluster.length == 0 && this.state.cl_Membre_Select_fin.length == 0 && this.state.ml_Membre_Select_fin.length == 0) {
        /////TL



        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]

      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length == 0 && this.state.tl_id_cluster.length == 0) {
        ////// cl & ml
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length != 0 && this.state.tl_id_cluster.length == 0 && this.state.ml_Membre_Select_fin.length == 0) {
        /////cl & tl      


        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]
      } else if (this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length != 0 && this.state.tl_id_cluster.length == 0 && this.state.cl_Membre_Select_fin.length == 0) {
        //// ml & tl    


        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]

      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length != 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_cluster.length == 0) {
        //      cl & tl & ml     
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length != 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length == 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length == 0 && this.state.tl_id_IOT.length != 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_id_IOT.length != 0 && this.state.ml_Membre_Select_fin.length == 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "cl": {
            "tag": this.state.CompteurListI_Name,
            "members": this.state.cl_Membre_Select_fin
          },
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]

      } else if (this.state.cl_Membre_Select_fin.length == 0 && this.state.tl_id_IOT.length == 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "ml": {
            "tag": this.state.ML_Name,
            "members": this.state.ml_Membre_Select_fin
          },
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length == 0 && this.state.tl_id_IOT.length == 0 && this.state.ml_Membre_Select_fin.length == 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          }
        }]
      } else if (this.state.cl_Membre_Select_fin.length == 0 && this.state.tl_id_IOT.length != 0 && this.state.ml_Membre_Select_fin.length == 0 && this.state.tl_id_cluster.length != 0) {
        data=[{
          "title": this.state.Report_Name_Enregistrer,
          "tags": this.state.TAGS_New,
          "description": this.state.Report_Description,
          "tlCluster": {
            "id": this.state.tl_id_cluster,
            "tag": this.state.tl_name_cluster,
          },
          "tlIot": {
            "tag": this.state.tl_name_IOT,
            "id": this.state.tl_id_IOT
          }
        }]

      } else {
        console.log("data vide")
        data=[]
      }
    }
    console.log("data",data)
  
    console.log("datadatadatadatadata", data)
    axios1.post(window.apiUrl + "clone/",

      {
        "IDs": [this.state.Report_Code],
        "data": data

      }


    )

      .then(
        (result) => {
          //   this.tableData = result.data;
          if (result.data !== null) {
            items[type] = "2";
            this.setState({
              items
            });
            console.log("sssssssssssssssssssssssssssssssssssss", result.data)
            this.setState({BtnAjouterRapportCloner :true })
      
            this.setState({ config: result.data[0] })
            this.setState({ GenerateTableActive: false })

            setTimeout(() => this.setState({ GenerateTableActive: true }), 500)
            // this.setState({AjouterRapport: true})
            this.state.AjouterRapport = true
            console.log("AjouterRapportAjouterRapportAjouterRapport", this.state.AjouterRapport)
          } else {
            console.log('no data change')
          }



        }
      )
  
  }
  else {


    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 450,
      title: 'Aucun changement des données'
    })

   




  }

})
}else{
  Swal.fire({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    icon: 'warning',
    width: 350,
    title: 'Vérifier le champ nom de rapport'
  })

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
  // AjouterTl() {
  //   if (this.state.Name_Tl != "" && this.state.Code_Tl != "") {
  //     this.setState({
  //       modal8: !this.state.modal8
  //     });
  //     //this.setState({ tl_name: this.state.Name_Tl })
  //     this.state.tl_name = this.state.Name_Tl
  //     this.setState({ tl_id: this.state.Code_Tl })
  //     console.log("tl_name", this.state.tl_name)
  //     console.log("tl_id", this.state.tl_id)
  //   }
  // }

  AjouterTl=()=>{
    if (this.state.tl_id_IOT != "" && this.state.tl_id_cluster != "" && this.state.tl_name_IOT != "" && this.state.tl_name_cluster != "") {

      this.setState({modal8:!this.state.modal8})

      var name_Tl = (this.state.tl_name_IOT + " et " + this.state.tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
     
      this.setState({tl_name:name_Tl2})

    } else if (this.state.tl_id_IOT != "" && this.state.tl_id_cluster == "" && this.state.tl_name_IOT != "" && this.state.tl_name_cluster == "") {
      this.setState({modal8:!this.state.modal8})

      this.setState({tl_name:this.state.tl_name_IOT})
    } else if (this.state.tl_id_IOT == "" && this.state.tl_id_cluster != "" && this.state.tl_name_IOT == "" && this.state.tl_name_cluster != "") {
      this.setState({modal8:!this.state.modal8})
      var name_Tl = (this.state.tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
      this.setState({tl_name:name_Tl2})

    }
  }

  handleListeMLClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Ml: id })
    this.setState({ Name_Ml: name })
    this.setState({ ML_Membre: membre })
  }
  // handleListeTLClick(id, name, membre) {
  //   console.log(id, name, membre[0].Tl_Sql)
  //   this.setState({ Code_Tl: id })
  //   //this.setState({ Name_Tl: name })
  //   this.state.Name_Tl = name
  //   this.setState({ tl_members: membre[0].Tl_Sql })
  //   console.log("Code_Tl", this.state.Code_Tl)
  //   console.log("Name_Tl", this.state.Name_Tl)

  //   console.log("tl_members", this.state.membre)

  // }


  handleListeTLClick=(json)=>{
    if (json != null) {
      if (json.cluster.id != "" && json.iotinner.id == "") {
        this.setState({tl_name_IOT:""})
        this.setState({tl_id_IOT:""})
        this.setState({tl_name_cluster:json.cluster.name})
        this.setState({tl_id_cluster:json.cluster.id})
      } else if (json.cluster.id == "" && json.iotinner.id != "") {
        this.setState({tl_name_IOT:json.iotinner.name})
        this.setState({tl_id_IOT:json.iotinner.id})
        this.setState({tl_name_cluster:""})
        this.setState({tl_id_cluster:""})

      } else if (json.cluster.id != "" && json.iotinner.id != "") {

        this.setState({tl_name_IOT:json.iotinner.name})
        this.setState({tl_id_IOT:json.iotinner.id})
        this.setState({tl_name_cluster:json.cluster.name})
        this.setState({tl_id_cluster:json.cluster.id})
      } else {
        this.setState({tl_name_IOT:""})
        this.setState({tl_id_IOT:""})
        this.setState({tl_name_cluster:""})
        this.setState({tl_id_cluster:""})
      }
    }
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

    axios1.get(window.apiUrl + "getReports/",

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
         
          if (result.data.reports.length !== 0) {
            this.setState({ listRapportglobal: result.data.reports })
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
      modal5: !this.state.modal5,
      Nom_Rappot_new:this.state.U_Rapportselected,
    });
  }
  toggle6 = () => {
    this.setState({
      modal6: !this.state.modal6
    });
    axios1.get(window.apiUrl + "getMeasureList/")
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
    axios1.get(window.apiUrl + "getCountersList/")

      .then(
        (result) => {
          if (result.data.length !== 0) {

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
        width: 600,
        title: 'Sélectionnez une liste pour le supprimer'
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
    axios1.get(window.apiUrl + "getFactBooks/")
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
        modal: !this.state.modal,
        tabulatorAfficher: true
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
      this.setState({tableData:[]})
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
        title: "Veuillez sélectionner une liste existante ou créer une nouvelle liste à enregistrer"
      })

    } else {
      const Report_Code = this.state.Report_Code;
      const Nom_FactBook = this.state.Nom_FactBook;
      const Report_Name = this.state.U_Rapportselected;
      /////////////////////////////////////////////

      axios1.get(window.apiUrl + `getReportById/?reportId=${Report_Code}&g`
      )

        .then(
          (result) => {

            console.log("result.data1111111111111111111111", result.data)
            console.log("result.data1111111111111111111111", result.data.length != 0)
            if (result.data.length != 0) {
           
            //  console.log("result.data", result.data[0].Selected_Global)
              this.state.Selected_Global_Rapport_Array = result.data.Selected_Global
              this.setState({Body:result.data.Body})
              this.setState({Rapport_Liste:result.data})



              this.state.Body_Code_Rapport=result.data.Report_Code




              if(result.data.type=="report"){
              
          //    console.log("configLayout_Orientation", result.data.Body.configLayout)

            //  this.state.configLayout_Orientation=result.data[0].Body.configLayout.Orientation
  



              // if (this.state.configLayout_Orientation == "Portrait") {
        
              // this.setState({ layoutFormat: { height: "650px", width: "70%" } })
              // }
              // if (this.state.configLayout_Orientation == "Paysage") {

                 this.setState({ layoutFormat: { height: "500px", width: "100%" } })
        
              // }
              // console.log("configLayout_Orientation", this.state.configLayout_Orientation)
                 }else if(result.data.type=="synoptic"){

               console.log("synobtique")
                 }

              // this.setState({Selected_Global_Rapport_Array:result.data[0].Selected_Global})
              console.log("Selected_Global_Rapport_Array", this.state.Selected_Global_Rapport_Array)
              var Var = ""
              for (var i = 0; i < this.state.Selected_Global_Rapport_Array.length; i++) {

                 console.log('Dim_type',this.state.Selected_Global_Rapport_Array[i].Dim_type)
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
                  this.setState({tl_name:this.state.Selected_Global_Rapport_Array[i].Dim_label.iot_name + "," + this.state.Selected_Global_Rapport_Array[i].Dim_label.cluster_name})

                }
              }
                


              
              if (Var == "VAR") {
                console.log('Dim_type', Var)
                console.log("varrrr")



                this.toggleConfirmationAjout()

              } else {
                console.log('Dim_type', Var)
                console.log("fix")
          
               
               var   Report_Code=this.state.Report_Code 
                  if (this.state.Report_Code != "" || this.state.U_Rapportselected != "") {


                    if(this.state.Membres.length==0){

                    this.mytable.current.table.addRow({ Report_Name,Report_Code }, true);
                    console.log(Report_Name);

                    this.setState({Membres:[{ "Report_Name": Report_Name, "Report_Code": Report_Code }]})

                    console.log('Factbook_Membre push', this.state.Membres)
                  
                    this.setState({Report_Code:""})
                 this.setState({U_Rapportselected:""})


                    }else{
                      var  validation=false

                      this.state.Membres.map((item,i)=>{
                        console.log( "----------------------------------", item.Report_Name,this.state.Report_Name)
            
                        console.log( "----------------------------------", item.Report_Name==this.state.Report_Name)
                           if(item.Report_Name == this.state.Report_Name){
                                 console.log("------------------------------------------item.MailingList_Membres==this.state.MailingList_Membres")
                                 validation=true
                           }
                           
            
                      })

              

                  if(validation==false){
                    this.mytable.current.table.addRow({ Report_Name,Report_Code }, true);
                    console.log(Report_Name);
                    // this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code })
                    this.setState({Membres:this.state.Membres.concat([{ "Report_Name": Report_Name, "Report_Code": Report_Code }])})
                    console.log('Factbook_Membre push', this.state.Membres)
                  
                    this.setState({Report_Code:""})
                 this.setState({U_Rapportselected:""})
                  }else {
                    Swal.fire({
                      toast: true,
                      position: 'top',
                      showConfirmButton: false,
                      timer: 4000,
                      icon: 'warning',
                      width: 600,
                      title: 'Veuillez sélectionner un rapport qui ne figure pas déjà dans la liste des rapports du factbook actuel.'
                    })
              }
                  }


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
                    title: 'Veuillez  Sélectionner un rapport'
                  })
            }


          }
        )





      //////////////////////////////////////



    }

  }


  FactbookList1() {


    const supprimertemp = this.state.supprimertemp;

  
        
            if (this.state.Nom == "") {
              console.log("tl_name vide")
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 400,
                icon: 'warning',
                title: "Veuillez sélectionner un factbook pour ajouter le rapport à sa liste de rapports."
              })
            } else {
              for (var i = 0; i < this.state.listes.length; i++) {
                this.state.Code_FactBook = this.state.listes[i].Code_FactBook
                console.log(this.state.Code_FactBook)
                if (this.state.code == this.state.Code_FactBook) {
                  this.setState({
                    modal4: !this.state.modal4,
                    tabulatorAfficher: true
                  });

                  this.setState({ Nom_FactBook: this.state.Nom })

                  // this.state.liste_Factbook_Membre=this.state.listes[i].Factbook_Membre;
                  console.log("this.state.listes[i].Factbook_Membrethis.state.listes[i].Factbook_Membre",this.state.listes[i].Factbook_Membre)
                  
                  
                  this.setState({ liste_Factbook_Membre: this.state.listes[i].Factbook_Membre })
                  this.setState({tableData : this.state.listes[i].Factbook_Membre,
                   Membres:this.state.listes[i].Factbook_Membre
                  })
             


                

                }
              }
            }

            var $ = require("jquery");
            $('#btnModifier').show();
            $('#btnNouveau').hide();




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
          title: 'Votre factbook a été supprimé avec succès'

        })
      })
      .catch((err) => console.error(err));



    setTimeout(function () {
      window.location.reload(1);

    }, 500);

    var $ = require("jquery");
    $('#btnNouveau').show();
    $('#btnModifier').hide();
  }

  // addAll() {
  //   this.setState({

  //   });
  //   this.state.Nom_FactBook = this.state.Nom
  //   console.log(this.state.Nom_FactBook)

  //   const Report_Name = this.state.Factbook_Membre;

  //   this.mytable.current.table.addData({ Report_Name }, true);
  // }


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

  handleRapportselectedchange(json) {
    console.log("json",json)
    this.setState({ Report_Name: json.Report_Name,Report_Code:json.Report_Code,U_Rapportselected: json.Report_Name })
  }

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
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
                          
                        }

                    } else if (this.state.Selected_Global_Rapport_Array[i].Dim == "TL") {

                        console.log("3 VAR", this.state.Selected_Global_Rapport_Array[i].Dim)
                        this.setState({BooleanVar_TL:true})
                        if (this.state.tl_id_IOT != "" && this.state.tl_name_IOT != "" && this.state.tl_id_cluster == "" && this.state.tl_name_cluster == "") {
                          TL_Selected = {
                            "Dim": "TL",
                            "Dim_type": "VAR",
                            "Dim_code": { "cluster_code": this.state.Selected_Global_Rapport_Array[i].Dim_code.cluster_code, "iot_code": this.state.tl_id_IOT },
                            "Dim_label": { "cluster_name": this.state.Selected_Global_Rapport_Array[i].Dim_label.cluster_name, "iot_name": this.state.tl_name_IOT },
                            "Dim_Member": { "clusterMembers": this.state.Selected_Global_Rapport_Array[i].Dim_Member.clusterMembers, "iotinnerMembers": [this.state.tl_id_IOT] },
                            "Dim_Clone": this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                          }


                        } else if (this.state.tl_id_IOT == "" && this.state.tl_name_IOT == "" && this.state.tl_id_cluster != "" && this.state.tl_name_cluster != "") {
                          TL_Selected = {
                            "Dim": "TL",
                            "Dim_type": "VAR",
                            "Dim_code": { "cluster_code": this.state.tl_id_cluster, "iot_code": this.state.Selected_Global_Rapport_Array[i].Dim_code.iot_code },
                            "Dim_label": { "cluster_name": this.state.tl_name_cluster, "iot_name": this.state.Selected_Global_Rapport_Array[i].Dim_label.iot_name },
                            "Dim_Member": { "clusterMembers": [this.state.tl_id_cluster], "iotinnerMembers": this.state.Selected_Global_Rapport_Array[i].Dim_Member.iotinnerMembers },
                            "Dim_Clone": this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                          }

                        } else if (this.state.tl_id_IOT != "" && this.state.tl_name_IOT != "" && this.state.tl_id_cluster != "" && this.state.tl_name_cluster != "") {

                          TL_Selected = {
                            "Dim": "TL",
                            "Dim_type": "VAR",
                            "Dim_code": { "cluster_code": this.state.tl_id_cluster, "iot_code": this.state.tl_id_IOT },
                            "Dim_label": { "cluster_name": this.state.tl_name_cluster, "iot_name": this.state.tl_name_IOT },
                            "Dim_Member": { "clusterMembers": [this.state.tl_id_cluster], "iotinnerMembers": [this.state.tl_id_IOT] },
                            "Dim_Clone": this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                          }
                        }
                        else {

                          TL_Selected = {
                            "Dim": "TL",
                            "Dim_type": "VAR",
                            "Dim_code": this.state.Selected_Global_Rapport_Array[i].Dim_code,
                            "Dim_label": this.state.Selected_Global_Rapport_Array[i].Dim_label,
                            "Dim_Member": this.state.Selected_Global_Rapport_Array[i].Dim_Member,
                            "Dim_Clone": this.state.Selected_Global_Rapport_Array[i].Dim_Clone,
                          }
                          
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


////////////////////////////








///////////////////////////

var Report_Code_new =this.state.Report_Code_new
if (this.state.Report_Code_new != "" || this.state.U_Rapportselected != "") {
  

  if(this.state.Membres.length==0){

    this.mytable.current.table.addRow({ Report_Name, "Report_Code": Report_Code_new }, true);
    console.log(Report_Name);
  
    this.setState({Membres:[{ "Report_Name": Report_Name, "Report_Code": Report_Code_new }]})
  
    console.log('Factbook_Membre push', this.state.Membres)
  
    this.setState({Report_Code_new:""})
  this.setState({U_Rapportselected:""})
  
  
    }else{
      var  validation=false
  
      this.state.Membres.map((item,i)=>{
        console.log( "----------------------------------", item.Report_Name,this.state.Report_Name)
  
        console.log( "----------------------------------", item.Report_Name==this.state.Report_Name)
           if(item.Report_Name == this.state.Report_Name){
                 console.log("------------------------------------------item.MailingList_Membres==this.state.MailingList_Membres")
                 validation=true
           }
           
  
      })
  
  
  
  if(validation==false){
    this.mytable.current.table.addRow({ Report_Name, "Report_Code": Report_Code_new }, true);
    console.log(Report_Name);
    // this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code })
    this.setState({Membres:this.state.Membres.concat([{ "Report_Name": Report_Name, "Report_Code": Report_Code_new }])})
    console.log('Factbook_Membre push', this.state.Membres)
  
    this.setState({Report_Code_new:""})
  this.setState({U_Rapportselected:""})
  }else {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width: 600,
      title: 'Veuillez sélectionner un rapport qui ne figure pas déjà dans la liste des rapports du factbook actuel.'
    })
  }
  }
  

  // this.mytable.current.table.addRow({ Report_Name, "Report_Code": Report_Code_new }, true);
  // console.log(Report_Name);

  // this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code_new })

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
  modal5: !this.state.modal5,
  modalConfirmationAjout:!this.state.modalConfirmationAjout
});
/////////////////////////////////////////////////

                } else {
                  console.log('Report_Code est vide')
                }

              })




     
            

            }else{
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 300,
                icon: 'warning',
                title: 'Veuillez saisir un nouveau nom pour votre rapport'
              })
            }

          
          }else {
           var Report_Name=this.state.Report_Name
           var Report_Code=this.state.Report_Code

            if (this.state.Report_Code != "" || this.state.U_Rapportselected != "") {
              this.mytable.current.table.addRow({ Report_Name,Report_Code }, true);
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
  toggleConfirmationAjout=()=>{
    this.setState({modalConfirmationAjout:!this.state.modalConfirmationAjout})
  }

  NonEditRapport=()=>{
    const Report_Name = this.state.U_Rapportselected;
    var   Report_Code=this.state.Report_Code 
    if (this.state.Report_Code != "" || this.state.U_Rapportselected != "") {
      this.toggleConfirmationAjout()
      if(this.state.Membres.length==0){

        this.mytable.current.table.addRow({ Report_Name,Report_Code }, true);
        console.log(Report_Name);

        this.setState({Membres:[{ "Report_Name": Report_Name, "Report_Code": Report_Code }]})

        console.log('Factbook_Membre push', this.state.Membres)
      
        this.setState({Report_Code:""})
     this.setState({U_Rapportselected:""})


        }else{
          var  validation=false

          this.state.Membres.map((item,i)=>{
            console.log( "----------------------------------", item.Report_Name,this.state.Report_Name)

            console.log( "----------------------------------", item.Report_Name==this.state.Report_Name)
               if(item.Report_Name == this.state.Report_Name){
                     console.log("------------------------------------------item.MailingList_Membres==this.state.MailingList_Membres")
                     validation=true
               }
              
          })
      if(validation==false){
        this.mytable.current.table.addRow({ Report_Name,Report_Code }, true);
        console.log(Report_Name);
        // this.state.Membres.push({ "Report_Name": Report_Name, "Report_Code": Report_Code })
        this.setState({Membres:this.state.Membres.concat([{ "Report_Name": Report_Name, "Report_Code": Report_Code }])})
        console.log('Factbook_Membre push', this.state.Membres)
      
        this.setState({Report_Code:""})
     this.setState({U_Rapportselected:""})
      }else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 600,
          title: 'Veuillez sélectionner un rapport qui ne figure pas déjà dans la liste des rapports du factbook actuel.'
        })
  }
      }

    }


  }
  ///////////////////////
  deletetab = () => {

    this.toggleDelete()
    this.state.cellTable.getRow().delete();
    this.state.supprimertemp.push(this.state.cellTable.getData().Report_Name);
}
toggleDelete = () => {
  this.setState({
      modalDelete: !this.state.modalDelete
  });
}
CellTableFun = (cell) => {
  this.setState({ cellTable: cell })
  this.setState({ cellName: cell.getData().Report_Name })
}

supprimerFunclick = (e, cell) => {
  console.log(cell)
  this.toggleDelete()
  this.CellTableFun(cell)
  //cell.getData();
  //  alert("confirmation de Suppression" + " " + cell.getData().U_Alarme_Name);
}
supprimerFunIcon() {
  return "<i class='fa fa-trash-alt icon'></i>";
}
  ///////////////////
  render() {

    const { errors } = this.state;
    return (
      <>
       <Navbar history={this.state.history}/>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > FactBook </MDBBreadcrumbItem>
        </MDBBreadcrumb>

        <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px" }}>
          {/** liste 1 */}
          <MDBRow >
            <MDBCol size="6">
              <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: window.screen.availHeight / 1.56 + `px`, height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>



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

      


<div style={{marginTop:"175px"}}>
{this.state.listRapportglobal.length != 0 && 
      <FilterV1 filterName={"Rapport"}
         outSelected={this.handleRapportselectedchange}
        // outAllFiltred={outAllFiltred}
        filter={[{ Report_TableauName: "Tableaux" }, { TAGS: "Mot Clé" }, { Report_Master: "Master" }]}
        display={{ separator: "", elems: ["Report_Name"] }}
        data={this.state.listRapportglobal}
        styleScroll={{ width: "100%", maxHeight: window.screen.availHeight /2.5  + `px` }}
        btnEdit={true} />
        }
</div>





              </fieldset>
              {/** fin liste 1 */}


            </MDBCol>

            <MDBCol size="6">
              {/**  <MDBBtn  color="#e0e0e0 grey lighten-2" onClick={this.addAll} size="sm" style={{ marginTop: "13%", marginLeft: '-4%' }} id="btnaddAll" className="option" > <MDBIcon icon="angle-double-right" size="2x" /> </MDBBtn>*/}
              {/** liste 2 */}
              <fieldset className="form-group" className="float-right" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', height: 'auto', minHeight: window.screen.availHeight / 1.56 + `px`, width: '98%', backgroundColor: "#c3c3c321" }}>
                {/*****************************Selectionnez une Liste************************* */}
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle4} >Sélectionnez une Liste</MDBBtn>

                <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered >

                  <ModalFactBook toggle4={this.toggle4} listes={this.state.listes} handleChange={this.handleChange} handleClick={this.handleClick} Nom={this.state.Nom} />

                  <MDBModalFooter>

                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.FactbookList1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                {/* /***********************************  */}

                <MDBModal isOpen={this.state.modalConfirmationAjout} toggle={this.toggleConfirmationAjout} centered >
                <MDBModalHeader toggle5={this.toggleConfirmationAjout}>Rapport</MDBModalHeader>
                <MDBModalBody>
                        Souhaitez-vous modifier ce rapport avant de l'ajouter à la liste des rapports du factbook ?
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn onClick={this.toggle5} > oui</MDBBtn>
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.NonEditRapport}> non</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>


                <MDBModal isOpen={this.state.modal5} toggle={this.toggle5} centered size="fluid" >






                  <MDBModalHeader toggle5={this.toggle5}>Nouveau Rapport</MDBModalHeader>

                  <MDBModalBody>
                  <MDBTabContent activeItem={this.state.items["default"]}>
                    <MDBTabPane tabId="1">

                    <MDBRow>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
          </label>

          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Nom_Rappot_new" value={this.state.Nom_Rappot_new} onChange={this.handleChange} className="form-control" required />

        </MDBCol>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Mots clés
          </label>
          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="TAGS_New" value={this.state.TAGS_New} onChange={this.handleChange} className="form-control" required />
        </MDBCol>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Description
          </label>

          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_Description" value={this.state.Report_Description} onChange={this.handleChange} className="form-control" required />
        </MDBCol>
        <MDBCol size="12">
          <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

            <legend style={{ width: "220px", color: "#51545791", fontSize: "20px" }}>Sélectionner les données </legend>

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
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnMlDesibled}
                 style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle6}>
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
    
          </fieldset>
        </MDBCol>
      </MDBRow>


                    </MDBTabPane>

                    <MDBTabPane tabId="2">
                    {this.state.GenerateTableActive &&
                          <div>


                            <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} style={{  width: this.state.layoutFormat.width, height: this.state.layoutFormat.height}}
                            />  </div>}
            
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


               { this.state.BtnAjouterRapportCloner==true &&     <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.Ajouter_Rapport_Liste} > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
               
               }
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
                {/* <div><div style={{ marginTop: "100px" }} className="listeValider" ref={el => (this.el = el)} /></div> */}
                  {this.state.tabulatorAfficher == true &&    
                 <ReactTabulator style={{ marginTop: "90px" }} className="listeValider"
                                ref={this.mytable}
                                data={this.state.tableData}
                                columns={this.state.columns}
                                layout={"fitData"}
                                index={"Report_Name"}
                                options={{
                                    pagination: true,
                                    paginationSize: 7,
                                    paginationSizeSelector: [7, 10, 15],
                                    pagination: "local",
                                    selectable: 1,
                                    movableColumns: true,
                                    resizableRows: true,
                                    reactiveData: true,
                                }}
                                />

                                
                                }
            <DeleteRow toggle={this.toggleDelete} modal={this.state.modalDelete} deletetab={this.deletetab} cellTable={this.state.cellTable} cellName={this.state.cellName} />

              </fieldset>
              {/** fin liste 2 */}

            </MDBCol>
          </MDBRow>
        </fieldset>
        {/**    Mesures Listes Modale */}

        <MDBModal isOpen={this.state.modal6} toggle={this.toggle6} centered size="lg">

          <Modal_ML_V2 toggle2={this.toggle6} ML_Tags_Function={this.ML_Tags_Function} Code_Ml={this.state.Code_Ml} Name_Ml={this.state.Name_Ml} handleChange={this.handleChange} modelMl={this.modelMl} Listes_Ml={this.state.Listes_Ml} handleListeMLClick={this.handleListeMLClick} ML_Membre={this.state.ML_Membre} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link /*onClick={() => this.MesuresListes()}*/>
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

          <Modal_CL_V2 toggle4={this.toggle7} CL_Tags_Function={this.CL_Tags_Function}  modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link /*onClick={() => this.CL()}*/>
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

          <Modal_TL_V2  handleListeTLClick={this.handleListeTLClick} toggle={this.toggle8} />


          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link /* to="/Rapporteur/TimeIntelligence" onClick={() => this.tl()} */>
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterTl}
            > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>);
  }





}
export default FactBook;






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

     //   input.removeEventListener("keyup", FilterClListe)
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

const DeleteRow = ({ toggle, modal, deletetab, cellName }) => {
  useEffect(() => {

  }, [cellName])

  return (<MDBContainer>

      <MDBModal isOpen={modal} toggle={toggle} centered>
          <MDBModalHeader toggle={toggle}>Confirmation de Suppression  </MDBModalHeader>
          <MDBModalBody style={{ textAlign: "center", fontSize: '120%' }}>
              Supprimer temporairement un membre
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