import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from 'axios';

import uuid from 'react-uuid';
import Moment from 'moment';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
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


class Compteur_Listes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      CompteurListI_Name: "",
      CompteurListI_Name1: "",
      CompteurList_Code: "",
      validation_Code: "",
      code: "",
      listes: [],
      modal: false,
      modal1: false,
      modal4: false,
      modal3: false,
      modal6: false,
      Nom: "",
      masterListe: [],
      CL_Membre: "",
      CompteurListI_Name: '',

      liste_Membres: [],

      ajoutertemp: [],
      modificationtemp: [],

      Membres: [],
      ajout: "",
      Groupe_Acess: "163883",
      arrayMembres: {},
      supprimer: "",
      supprimertemp: [],
      listepath: "",
      listeDescription: "",
      Path_List: `C:\\ProgramData\\Winlog Pro 3\\Projects\\Energy_Supervisor_V47 Elmazraa\\Winlog\\Files\\DATAMODELFiles\\CompteurList\\`,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      Code_Compteur: "",
      NameEnergy: '',
      EnergyMeasure: '',
      Compteur_Parent: '',
      secteur: '',
      pointproduction: '',
      pointdistribution: '',
      pointconsommation: '',
      Sys_mesureid: '',
      listpointconsommation: [],
      listNameEnergy: [],
      LeCompteur: [],
      dataCompteur: [],
      dataEnergyMeasure: [],
      dataEnergy: [],
      listcompteurglobal: [],

      listfieldfiltername: [],
      listfieldfiltercontent: [],
      listcompteurParent: [],
      listsecteur: [],
      listpointproduction: [],
      listpointdistribution: [],
      listpointconsommation: [],
      U_compteurselected: "",
      errors: {
        CompteurListI_Name: '* Obligatoire',
      },
      ///////////////////////
      tag_user: "",
      tag_system: "",
      tag_system_Modifier: "",
      tag_system_Array: [],
      tag_system_Array_Update: [],
      /////
      EnergieSelected: "",
      Le_Compteur_ParentSelected: "",
      typeSelected: "",
      Point_de_ProductionSelected: "",
      Point_de_DistributionSelected: "",
      Point_de_ConsommationSelected: "",
      ////
      CL_Membre_fin:[],
      filterNameCompteur:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.handlecompteurselectedchange = this.handlecompteurselectedchange.bind(this)
    this.CompteurList1 = this.CompteurList1.bind(this);
    this.ajouterListe = this.ajouterListe.bind(this);
    this.supprimerAll = this.supprimerAll.bind(this);
    this.addAll = this.addAll.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Newliste = this.Newliste.bind(this);
    this.updateliste = this.updateliste.bind(this);
    this.modifierNom = this.modifierNom.bind(this);
    ////filter
    this.filtercompteurparent = this.filtercompteurparent.bind(this);
    this.resetvalueoffilter = this.resetvalueoffilter.bind(this);
  }
  resetvalueoffilter() {

    axios.post(window.apiUrl + "filter/",

    {
      tablename: "AllCompteur",
      identifier: this.state.dateDMY + uuid(),
      fields: "*",
      content: "*",
      dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
      dist: "*",
      orderby: "*",
    }


  )

    .then(
      (result) => {
  

        //tabulator
        //this.setState({ dataCompteur: result.data })

        if (result.data !== null) {
          this.setState({ listcompteurglobal: result.data })
          console.log("data filter");
          console.log(this.state.listcompteurglobal)
        } else {
          console.log('no data change')
        }
    
      })
    this.state.Compteur_Parent=""
    this.state.secteur=""
    this.state.pointproduction=""
    this.state.pointdistribution=""
    this.state.pointconsommation=""
    this.state.NameEnergy=""
    this.state.listfieldfiltername= []
    this.state.listfieldfiltercontent=[]

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





    ////////////filter AllCompteur

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "AllCompteur",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
        dist: "*",
        orderby: "*",
      }


    )

      .then(
        (result) => {
    

          //tabulator
          //this.setState({ dataCompteur: result.data })

          if (result.data !== null) {
            this.setState({ listcompteurglobal: result.data })
            console.log("data filter");
            console.log(this.state.listcompteurglobal)
          } else {
            console.log('no data change')
          }




        }
      )
    // ////////////Energy
    // axios.post(window.apiUrl + "display/",

    //   {
    //     tablename: "Energy",
    //     identifier: this.state.dateDMY + uuid(),
    //     fields: "*",
    //     content: "*"
    //   }


    // )

    //   .then(
    //     (result) => {
    //       result.data = result.data;
    //       console.log('Energy')
    //       console.log(result.data)
    //       //tabulator
    //       if (result.data !== null) {
    //         this.setState({ dataEnergy: result.data })
    //         var datalist = this.state.listNameEnergy

    //         result.data.forEach(function (arrayItem) {
    //           var x = arrayItem.Name_Energy;
    //           datalist.push(x)
    //           //console.log(x);
    //         });
    //         console.log('list of Name Energy')
    //         console.log(this.state.listNameEnergy)
    //       } else {
    //         console.log('no data change')
    //       }

    //     }
    //   )

    // //////////////////////////////////////////////////////////////////////////////////////////////


  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      CompteurListI_Name: ' ',

    }

  }
  toggle3 = () => {
    this.setState({
      modal3: !this.state.modal3
    });

    this.state.errors = {
      CompteurListI_Name: ' ',

    }


  }
  toggle1 = () => {
    if (this.state.CompteurListI_Name == "") {
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
    /// API CompteurList
    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
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
    /// FIN API CompteurList
  }
  toggle6 = () => {


console.log("this.state.validation_Code", this.state.validation_Code, "kk")
if (this.state.CompteurList_Code != "") {
  console.log("CompteurList_Code", this.state.CompteurList_Code)
    this.state.validation_Code = this.state.CompteurList_Code
} else if (this.state.code != "") {
    console.log("gggggggggggg", this.state.code)
    this.state.validation_Code = this.state.code

} else {
    console.log("code vide")
}

if (this.state.validation_Code != ""||this.state.validation_Code == undefined) {


    if (this.state.code != "") {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var tab =[]
        console.log("this.mytable.rowManager.activeRows.length",this.mytable.rowManager.activeRows.length)

        for(var j=0;j<this.mytable.rowManager.activeRows.length;j++){
           
            console.log("mytable",this.mytable.rowManager.activeRows[j].component._row.data.Le_Compteur)
  
            var  jsonTab = {"Code_Compteur":this.mytable.rowManager.activeRows[j].component._row.data.Code_Compteur,"Le_Compteur":this.mytable.rowManager.activeRows[j].component._row.data.Le_Compteur}
            tab.push(jsonTab)

        }

console.log("-----------------------tab---------------------->",tab)
        const newMembres = (tab)

        /** with delete 1 row update Liste */
        var data = newMembres
        console.log("liste_CL_Membre ", this.state.liste_CL_Membre)
        console.log("this.state.Membres ", this.state.Membres)
        console.log("data ", data)
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var val = this.state.supprimertemp[i]
            console.log(val)


            var filteredObj = data.find(function (item, i) {
                if (item.Le_Compteur === val) {
                    index = i;
                    return i;
                }
            });

            console.log(index, filteredObj);
            if (index > -1) {
                data.splice(index, 1);
            }
        }
        console.log("data update", data);


        /**********fin delete row  */

        console.log(this.state.liste_CL_Membre)
        console.log("Update_newMembres", newMembres)
        const CL_Membre = newMembres;
        this.state.CL_Membre_fin = CL_Membre;



        /////////////////////////////////////////////////////////////Update Tags system  with change liste membres///////////////////////////////////////////////////////////
        var arr = []
        for (var i = 0; i < CL_Membre.length; i++) {

            arr.push(CL_Membre[i].Code_Compteur)

        }
        console.log("--------->", arr)

        var str = arr.toString()

        axios.get(window.apiUrl + "getCounters/?counters=" + str,

        )

            .then(
                (result) => {


                    if (result.data !== null) {

                        console.log('result.data result.data result.data result.data------------------------------------------> ', result.data)
                        this.state.tag_system_Array_Update = []
                        this.state.tag_system = ""
                        for (var i = 0; i < result.data.length; i++) {

                            var EnergieSelected = result.data[i].Energie
                            var Le_Compteur_ParentSelected = result.data[i].Le_Compteur_Parent
                            var typeSelected = result.data[i].type
                            var Point_de_ProductionSelected = result.data[i].Point_de_Production
                            var Point_de_DistributionSelected = result.data[i].Point_de_Distribution
                            var Point_de_ConsommationSelected = result.data[i].Point_de_Consommation



                            this.state.tag_system_Array_Update.push(EnergieSelected, Le_Compteur_ParentSelected, typeSelected, Point_de_ProductionSelected, Point_de_DistributionSelected,Point_de_ConsommationSelected)

                        }
                        if (this.state.tag_system_Array_Update.length != 0) {
                            let arr = []

                            arr = Array.from(new Set(this.state.tag_system_Array_Update))

                            console.log("array update", arr)

                            this.state.tag_system = arr.toString()
                            // this.setState({tag_system:arr.toString()})

                        }
                        console.log("this.state.tag_system  update update update", this.state.tag_system)

                        this.setState({
                            modal6: !this.state.modal6
                        });
                    } else {
                        console.log('no data change')
                    }


                }
            )
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    } else {

      ////////////////////////////////////////////Ajouter new Tags system//////////////////////////////////
      var tab =[]
      console.log("this.mytable.rowManager.activeRows.length",this.mytable.rowManager.activeRows.length)

      for(var j=0;j<this.mytable.rowManager.activeRows.length;j++){
         
          console.log("mytable",this.mytable.rowManager.activeRows[j].component._row.data.Le_Compteur)
          var  jsonTab = {"Code_Compteur":this.mytable.rowManager.activeRows[j].component._row.data.Code_Compteur,"Le_Compteur":this.mytable.rowManager.activeRows[j].component._row.data.Le_Compteur}
          tab.push(jsonTab)
      }

    console.log("-----------------------tab---------------------->",tab)

/** with delete row */
//var data = this.state.Membres
var data = tab
for (var i = 0; i < this.state.supprimertemp.length; i++) {

 var index = -1;
 var val = this.state.supprimertemp[i]
 console.log(val)
 var filteredObj = data.find(function (item, i) {
     if (item.Le_Compteur === val) {
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
const CL_Membre = data;

console.log("CL_Membre", CL_Membre);
this.state.CL_Membre_fin = CL_Membre;
      /////////////////////////////////////////////////////
        if (this.state.tag_system_Array.length != 0) {
            let arr = []

            arr = Array.from(new Set(this.state.tag_system_Array))

            console.log("array", arr)

            this.state.tag_system = arr.toString()
            // this.setState({tag_system:arr.toString()})

        }
        console.log("this.state.tag_system", this.state.tag_system)

        this.setState({
            modal6: !this.state.modal6
        });

    }
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

else {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Créez ou Modifier une liste '
    })
}





  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case 'CompteurListI_Name':
        errors.CompteurListI_Name =
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
          tablename: "CL_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "CompteurList_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {
            if (result.data !== null) {
              //this.state.CompteurList_Code = result.data.substring(1, result.data.length-1);
              var code = result.data.split(", ")
              console.log("codecodecodecodecodecodecode", code)
              this.state.CompteurList_Code = code[0]
              console.log("CompteurList_Code")
              console.log(this.state.CompteurList_Code)
            } else {
              console.log('CompteurList_Code vide')
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
            title: "Compteur",
            field: "Le_Compteur",
            width: '70%',
            editor:"input",
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
              supprimertemp.push(cell.getData().Le_Compteur);
              cell.getRow().delete();
              console.log("supprimertemp", supprimertemp)
            }
          },],

      });
      this.mytable.clearData()

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
  ajouterListe() {
    if (this.state.CompteurListI_Name == "") {


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


      const Le_Compteur = this.state.U_compteurselected;
      const Code_Compteur = this.state.Code_Compteur
      console.log("Code_Compteur", Code_Compteur)
      if (Le_Compteur == "") {
        Swal.fire({
          toast: true,
          position: 'top',

          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 300,
          title: 'Sélectionnez des compteurs'
        })
      } else {
        if (this.state.U_compteurselected != "" || this.state.Code_Compteur != "") {
          this.mytable.addRow({ Le_Compteur,Code_Compteur }, true);
          console.log(Le_Compteur);

          this.state.Membres.push({ "Le_Compteur": Le_Compteur, "Code_Compteur": Code_Compteur })

          this.state.tag_system_Array.push(this.state.EnergieSelected, this.state.Le_Compteur_ParentSelected, this.state.typeSelected, this.state.Point_de_ProductionSelected, this.state.Point_de_DistributionSelected,this.state.Point_de_ConsommationSelected)
          console.log("tag_system_Array", this.state.tag_system_Array)
        

          console.log('Le_Compteur push', this.state.Membres)
          this.state.U_compteurselected = ""
          this.state.Code_Compteur = ""

        }
      }



    }

  }


  CompteurList1() {

    const supprimertemp = this.state.supprimertemp;

    /// API CompteurList
    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",

      }
    )
      .then(
        (result) => {
          console.log('result cl')
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
                this.state.CompteurList_Code = result.data[i].CompteurList_Code
                console.log(this.state.CompteurList_Code)
                if (this.state.code == this.state.CompteurList_Code) {
                  this.setState({
                    modal4: !this.state.modal4
                  });
                  this.setState({ CompteurListI_Name: this.state.Nom })
                  this.setState({ liste_CL_Membre: result.data[i].CL_Membre })

                  //        this.state.liste_CL_Membre = result.data[i].CL_Membre;
                  this.state.listePath = result.data[i].Path_List;
                  this.state.listeDescription = result.data[i].Description;
                  console.log("listePath", this.state.listePath)
                  console.log("listeDescription", this.state.Description)
                  console.log("CL_Membre", this.state.liste_CL_Membre)


                  if (this.state.liste_CL_Membre.length == 0) {

                    Swal.fire({
                      toast: true,
                      position: 'top',
                      showConfirmButton: false,
                      timer: 4000,
                      width: 500,
                      title: ('Ajouter des compteurs dans ' + this.state.Nom)

                    })
                    ///tabulator 

                    this.mytable = new Tabulator(this.el, {

                      data: this.tableData, //link data to table
                      reactiveData: true, //enable data reactivity
                      height: "450px",
                      columns: [

                        {
                          title: "Compteur",
                          field: "Le_Compteur",
                          width: '70%',
                          editor:"input",
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

                            supprimertemp.push(cell.getData().Le_Compteur);

                            console.log("supprimertemp", supprimertemp)
                          }
                        },], //define table columns
                    });
                    this.mytable.clearData()
                  }
                  else {
                    this.tableData = result.data[i].CL_Membre;
                    console.log(" this.tableData", this.tableData)
                    ///tabulator 
                    this.mytable = new Tabulator(this.el, {
                      data: this.tableData, //link data to table
                      reactiveData: true, //enable data reactivity
                      height: "450px",
                      columns: [

                        {
                          title: "Compteur",
                          field: "Le_Compteur",
                          width: '70%',
                          editor:"input",
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

                            supprimertemp.push(cell.getData().Le_Compteur);

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

    // this.state.CompteurListI_Name = this.state.Nom;
    console.log(this.state.Nom)
    console.log(this.state.CompteurList_Code)



  }

  supprimerAll() {



    const CompteurList_Code = this.state.code;
    const CompteurListI_Name = this.state.CompteurListI_Name;
    const Path_List = this.state.listePath;
    const Description = this.state.listeDescription;
    const newMembres = (this.state.Membres.concat(this.state.liste_CL_Membre))

    console.log(this.state.liste_CL_Membre)
    console.log("Update_newMembres", newMembres)

    const CL_Membre = newMembres;
    console.log("CL_Membre", CL_Membre);
    const Groupe_Acess = this.state.Groupe_Acess
    const DBAction = "3"
    this.state.supprimer = {
      "CompteurList_Code": CompteurList_Code,
      "CompteurListI_Name": CompteurListI_Name,
      "Path_List": Path_List,
      "Groupe_Acess": Groupe_Acess,
      "Description": Description,
      "CL_Membre": CL_Membre,
      "DBAction": DBAction
    };
    this.state.supprimertemp.push(this.state.supprimer);
    console.log(this.state.supprimertemp);
    if (newMembres.length == 0) {
      this.mytable.clearData()
      console.log("Array is empty!")
    }

    this.state.CompteurListI_Name = ""
    this.setState({
      modal1: !this.state.modal1
    });



    axios.post(window.apiUrl + "updatedelete/", {
      tablename: "CL_V3",
      identifier: this.state.dateDMY + uuid(),
      datatomodified: [].concat(this.state.supprimertemp)
      //  datatodelete: ["CompteurList_Code;CompteurListI_Name;Path_List;Groupe_Acess;Description;CL_Membre;DBAction"]
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
    this.state.CompteurListI_Name = this.state.Nom
    console.log(this.state.CompteurListI_Name)

    const Le_Compteur = this.state.CL_Membre;

    this.mytable.addData({ Le_Compteur }, true);
  }


  handleClick(id, event) {
    this.state.code = id;
    console.log("code", this.state.code)

  }


  ///////
  Newliste() {
    const CompteurList_Code = this.state.CompteurList_Code;
    this.state.validation_Code = CompteurList_Code;

    // /** with delete row */
    // var data = this.state.Membres
    // for (var i = 0; i < this.state.supprimertemp.length; i++) {

    //   var index = -1;
    //   var val = this.state.supprimertemp[i]
    //   console.log(val)
    //   var filteredObj = data.find(function (item, i) {
    //     if (item.Le_Compteur === val) {
    //       index = i;
    //       return i;
    //     }
    //   });

    //   console.log(index, filteredObj);
    //   if (index > -1) {
    //     data.splice(index, 1);
    //   }
    // }
    // console.log(data);
    // /**********fin delete row  */
    // const CL_Membre = data;
    // console.log("CL_Membre", CL_Membre);

    this.state.ajout =
    {
      "CompteurList_Code": this.state.CompteurList_Code,
      "CompteurListI_Name": this.state.CompteurListI_Name,
      "Path_List": this.state.Path_List,
      "Groupe_Acess": this.state.Groupe_Acess,
      "Description": "",
      "CL_Membre": this.state.CL_Membre_fin,
      "tag_user": this.state.tag_user,
      "tag_system": this.state.tag_system,
      "DBAction": "2"
    }
    this.state.ajoutertemp.push(this.state.ajout);
    console.log(this.state.ajoutertemp);
  }




  /////
  updateliste() {
  //  const CompteurList_Code = this.state.code;
 




    // const newMembres = (this.state.Membres.concat(this.state.liste_CL_Membre))

    // /** with delete row */


    // //var val = this.state.supprimertemp[0]
    // var data = newMembres
    // for (var i = 0; i < this.state.supprimertemp.length; i++) {

    //   var index = -1;
    //   var val = this.state.supprimertemp[i]
    //   console.log(val)


    //   var filteredObj = data.find(function (item, i) {
    //     if (item.Le_Compteur === val) {
    //       index = i;
    //       return i;
    //     }
    //   });

    //   console.log(index, filteredObj);
    //   if (index > -1) {
    //     data.splice(index, 1);
    //   }
    // }
    // console.log(data);


    // /**********fin delete row  */

    // console.log(this.state.liste_CL_Membre)
    // console.log("Update_newMembres", newMembres)
    // const CL_Membre = newMembres;

    // console.log("supprimertemp", this.state.supprimertemp)

    // console.log("CL_Membre", CL_Membre);

    this.state.modifier =
    {
      "CompteurList_Code": this.state.CompteurList_Code,
      "CompteurListI_Name": this.state.CompteurListI_Name,
      "Path_List": this.state.Path_List,
      "Groupe_Acess": this.state.Groupe_Acess,
      "Description": "",
      "CL_Membre": this.state.CL_Membre_fin,
      "tag_user": this.state.tag_user,
      "tag_system": this.state.tag_system,
      "DBAction": "1"
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
    if (this.state.validation_Code == undefined) {

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
        tablename: "CL_V3",
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




  handlecompteurselectedchange(event, id, Energie, Le_Compteur_Parent, type, Point_de_Production, Point_de_Distribution, Point_de_Consommation) {
    console.log("tesssst", id)
    this.state.Code_Compteur = id;
    this.setState({
      U_compteurselected: event,
    });
    this.setState({
      EnergieSelected: Energie,
    });
    this.setState({
      Le_Compteur_ParentSelected: Le_Compteur_Parent,
    });
    this.setState({
      typeSelected: type,
    });
  
    this.setState({
      Point_de_ProductionSelected: Point_de_Production,
    });
    this.setState({
      Point_de_DistributionSelected: Point_de_Distribution,
    });
    this.setState({
      Point_de_ConsommationSelected: Point_de_Consommation,
    });
    console.log(this.state.U_compteurselected)
    console.log(event, id, Energie, Le_Compteur_Parent, type, Point_de_Production, Point_de_Distribution, Point_de_Consommation)
 
 
 
 
 
  }

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  getlistcompteurenergy = () => {


    console.log('listeeeeeeeeeeeeeeeeeeee Energie')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Energie",
          dist: "dist",
          orderby: "asc",
        }
      )
        .then(
          (result) => {
      
            console.log(result.data)
            console.log(typeof (result.data))
            if (result.data !== null) {
              var listNameEnergys = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Energie;
                listNameEnergys.push(x)
              });
              this.setState({ listNameEnergy: listNameEnergys })
              console.log("data Energie");
              console.log(this.state.listNameEnergy)
           
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
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Energie",
          dist: "dist",
          orderby: "asc",
        }
      )
        .then(
          (result) => {
         
            console.log(result.data)
            var listNameEnergys = []
            if (result.data !== null) {

              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Energie;
                listNameEnergys.push(x)
              });
              this.setState({ listNameEnergy: listNameEnergys })
              console.log("data compteur parent");
              console.log(this.state.listNameEnergy)

            } else {
              console.log('no data recieve by compteur parent')
            }

          }
        )


    }
  }
  getlistcompteurparent = () => {
    var listparentcompteur = []
    var listglobalcompteur = []

    var valueNameEnergy = this.state.NameEnergy
    var listparentcompteurduplicate = [...new Set(listparentcompteur)]

    this.setState({ listcompteurParent: listparentcompteurduplicate })
    this.setState({ listcompteurglobal: listglobalcompteur })
  }

  //FILTER COMPONENT$




  filtercompteurglobal = (filterNameCompteur) => {
    //console.log('appel data')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log(filterNameCompteur)
    this.state.filterNameCompteur = filterNameCompteur;
    console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", filterNameCompteur)

    if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
        if (this.state.filterNameCompteur == undefined || this.state.filterNameCompteur.length == 0) {
            axios.post(window.apiUrl + "filter/",

                {
                  tablename: "AllCompteur",
                              identifier: this.state.dateDMY + uuid(),
                              fields: "*",
                              content: "*",
                              dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
                              dist: "*",
                              orderby: "*",
                }
            )

                .then(
                    (result) => {


                        if (result.data !== null) {
                            this.setState({ listcompteurglobal: result.data })
                            console.log("data filter");
                            console.log('listcompteurglobal', this.state.listcompteurglobal)
                        } else {
                            console.log('no data change')
                        }



                    }
                )

        }
        else {
            this.setState({ listcompteurglobal: this.state.filterNameCompteur })
        }
    }
    else {


        axios.post(window.apiUrl + "filter/",

            {
              tablename: "AllCompteur",
                identifier: this.state.dateDMY + uuid(),
                fields: this.state.listfieldfiltername.join(';'),
                content: this.state.listfieldfiltercontent.join(';'),
                dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
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
                    if (result.data !== null) {
                        this.setState({ listcompteurglobal: result.data })
                        console.log("data filter");
                        console.log('listcompteurglobal', this.state.listcompteurglobal)
                    } else {
                        console.log('no data change')
                    }



                }
            )
    }

}
//   filtercompteurglobal = (filterNameCompteur) => {
//     console.log('appel data')
//     console.log(this.state.listfieldfiltername)
//     console.log(this.state.listfieldfiltercontent)
//   //  this.state.filterNameCompteur = filterNameCompteur;
      
// //////////////////new
// if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
//   if (filterNameCompteur == undefined || filterNameCompteur.length == 0) {
//       axios.post(window.apiUrl + "filter/",

//           {
//             tablename: "AllCompteur",
//             identifier: this.state.dateDMY + uuid(),
//             fields: "*",
//             content: "*",
//             dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
//             dist: "*",
//             orderby: "*",
//           }
//       )

//           .then(
//               (result) => {
//                  // this.tableData = result.data;

//                   if (result.data !== null) {
//                       this.setState({ listcompteurglobal: result.data })
 
//                       console.log("data filter");
//                       console.log(this.state.listcompteurglobal)
//                   } else {
//                       console.log('no data change')
//                   }



//               }
//           )

//   }
//   else {
//     //  this.setState({ listcompteurglobal: this.state.filterNameCompteur })
//     this.state.listcompteurglobal=this.state.filterNameCompteur
//   }
// }
// else {
//   axios.post(window.apiUrl + "filter/",

//   {
//     tablename: "AllCompteur",
//     identifier: this.state.dateDMY + uuid(),
//     fields: this.state.listfieldfiltername.join(';'),
//     content: this.state.listfieldfiltercontent.join(';'),
//     dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
//     dist: "*",
//     orderby: "*",
//   }
// )

//   .then(
//     (result) => {


//       //tabulator
//       //this.setState({ dataCompteur: result.data })
//       //console.log('result data global list compteur. ')
//       //console.log('data' + result.data + 'data')
//       if (result.data !== null) {
//         this.setState({ listcompteurglobal: result.data })
//         console.log("data filter");
//         console.log(this.state.listcompteurglobal)
//       } else {
//         console.log('no data change')
//       }



//     }
//   )

// }










//   }
  filtercompteurparent = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee compteur parent')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Compteur_Parent;Le_Compteur_Parent",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
           
            console.log(result.data)
            console.log(typeof (result.data))
            if (result.data !== null) {
              var listparentcompteur = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Le_Compteur_Parent;
                listparentcompteur.push(x)
              });
              this.setState({ listcompteurParent: listparentcompteur })
              console.log("data compteur parent");
              console.log(this.state.listcompteurParent)
              for (var i = 0; i < this.state.listcompteurParent.length; i++) {
                console.log(this.state.listcompteurParent[i])

              }
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
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Compteur_Parent;Le_Compteur_Parent",
          dist: "*;dist",
          orderby: "*;asc",
        }
      )
        .then(
          (result) => {
         
            console.log(result.data)
            var listparentcompteur = []
            if (result.data !== null) {

              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Le_Compteur_Parent;
                listparentcompteur.push(x)
              });
              this.setState({ listcompteurParent: listparentcompteur })
              console.log("data compteur parent");
              console.log(this.state.listcompteurParent)

            } else {
              console.log('no data recieve by compteur parent')
            }

          }
        )


    }
  }
  filtersecteur = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee secteur')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*' /* this.state.listfieldfiltername.join(';') */,
          content: '*' /*this.state.listfieldfiltercontent.join(';')*/,
          dataselect: "Compteur_Level;type",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
       
            console.log(result.data)
            if (result.data !== null) {
              var listtype = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.type;
                listtype.push(x)
              });
              this.setState({ listsecteur: listtype })
              console.log("data secteur");
              console.log(this.state.listsecteur)
            } else {
              console.log('no data change')
            }
          }
        )
    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Compteur_Level;type",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
       
            console.log(result.data)
            if (result.data !== null) {
              var listtype = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.type;
                listtype.push(x)
              });
              this.setState({ listsecteur: listtype })
              console.log("data secteur");
              console.log(this.state.listsecteur)
            } else {
              console.log('no data change')
            }

          }
        )
    }


  }
  filterpointproduction = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee point production')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*' /* this.state.listfieldfiltername.join(';') */,
          content: '*' /*this.state.listfieldfiltercontent.join(';')*/,
          dataselect: "PC_Production;Point_de_Production",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
    
            console.log(result.data)
            if (result.data !== null) {
              var listpointproduction = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Production;
                listpointproduction.push(x)
              });
              this.setState({ listpointproduction: listpointproduction })
              console.log("data point production");
              console.log(this.state.listpointproduction)
            } else {
              console.log('no data change')
            }
          }
        )

    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "PC_Production;Point_de_Production",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
      
            console.log(result.data)
            if (result.data !== null) {
              var listpointproduction = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Production;
                listpointproduction.push(x)
              });
              this.setState({ listpointproduction: listpointproduction })
              console.log("data point production");
              console.log(this.state.listpointproduction)
            } else {
              console.log('no data change')
            }

          }
        )

    }

  }

  filterpointdistrubition = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee  point distrubtion')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*' /* this.state.listfieldfiltername.join(';') */,
          content: '*' /*this.state.listfieldfiltercontent.join(';')*/,
          dataselect: "PC_Distribution;Point_de_Distribution",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
          
            console.log(result.data)
            if (result.data !== null) {
              var listpointdistribution = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Distribution;
                listpointdistribution.push(x)
              });
              this.setState({ listpointdistribution: listpointdistribution })
              console.log("data point distribution");
              console.log(this.state.listpointdistribution)
            } else {
              console.log('no data change')
            }
          }
        )

    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "PC_Distribution;Point_de_Distribution",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
      

            console.log(result.data)
            if (result.data !== null) {
              var listpointdistribution = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Distribution;
                listpointdistribution.push(x)
              });
              this.setState({ listpointdistribution: listpointdistribution })
              console.log("data point distribution");
              console.log(this.state.listpointdistribution)
            } else {
              console.log('no data change')
            }
          }
        )
    }
  }


  filterpointconsommation = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee point consommation')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log('filter with new data')
    if (this.state.Compteur_Parent == '' & this.state.secteur == '' & this.state.pointproduction == '' & this.state.pointdistribution == '' & this.state.pointconsommation == '' & this.state.NameEnergy == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "PC_Consommation;Point_de_Consommation",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
     
            console.log(result.data)
            if (result.data !== null) {
              var listpointconsommation = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Consommation;
                listpointconsommation.push(x)
              });
              this.setState({ listpointconsommation: listpointconsommation })
              console.log("data point consommation");
              console.log(this.state.listpointconsommation)
            } else {
              console.log('no data change')
            }
          }
        )

    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "AllCompteur",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "PC_Consommation;Point_de_Consommation",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
           
            console.log(result.data)
            if (result.data !== null) {
              var listpointconsommation = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Point_de_Consommation;
                listpointconsommation.push(x)
              });
              this.setState({ listpointconsommation: listpointconsommation })
              console.log("data point consommation");
              console.log(this.state.listpointconsommation)
            } else {
              console.log('no data change')
            }
          }
        )
    }
  }
  /////////////////////////////////////////////
  componentDidUpdate(prevProps, prevState) {

    if (prevState.Compteur_Parent !== this.state.Compteur_Parent /* && prevState.Compteur_Parent !== '' */) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Le_Compteur_Parent') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Le_Compteur_Parent') {
              console.log('existeeeeeeeeeeeeeeee Le_Compteur_Parent')
              console.log(j)
              if (this.state.Compteur_Parent != '') {
                this.state.listfieldfiltercontent[j] = this.state.Compteur_Parent
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            } /*else {
                  console.log('not existttttttttttttttt')
                  state.listfieldfiltername.concat('Le_Compteur_Parent')
                  state.listfieldfiltercontent.concat(this.state.Compteur_Parent)
    
                }*/
          }
          );
        });
      } else if (this.state.Compteur_Parent != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Le_Compteur_Parent'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Compteur_Parent] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Le_Compteur_Parent'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.Compteur_Parent].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Le_Compteur_Parent'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.Compteur_Parent].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {

              if (result.data !== null) {

                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)
              } else {
                console.log('no data change')
              }
            }
          )
      }


    }
    /*************************** */
    if (prevState.secteur !== this.state.secteur /* && prevState.Compteur_Parent !== '' */) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('type') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'type') {
              console.log('existeeeeeeeeeeeeeeee type')
              console.log(j)
              if (this.state.secteur != '') {
                this.state.listfieldfiltercontent[j] = this.state.secteur
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            } /*else {
                  console.log('not existttttttttttttttt')
                  state.listfieldfiltername.concat('Le_Compteur_Parent')
                  state.listfieldfiltercontent.concat(this.state.Compteur_Parent)
    
                }*/
          }
          );
        });
      } else if (this.state.secteur != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'type'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.secteur] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'type'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.secteur].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'type'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.secteur].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              if (result.data !== null) {


                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)
              } else { console.log('no data change') }
            }
          )
      }


    }

    /********************** */
    if (prevState.pointproduction !== this.state.pointproduction /* && prevState.Compteur_Parent !== '' */) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Point_de_Production') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Point_de_Production') {
              console.log('existeeeeeeeeeeeeeeee Point_de_Production')
              console.log(j)
              if (this.state.pointproduction != '') {
                this.state.listfieldfiltercontent[j] = this.state.pointproduction
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            } /*else {
                  console.log('not existttttttttttttttt')
                  state.listfieldfiltername.concat('Le_Compteur_Parent')
                  state.listfieldfiltercontent.concat(this.state.Compteur_Parent)
    
                }*/
          }
          );
        });
      } else if (this.state.pointproduction != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Point_de_Production'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.pointproduction] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Point_de_Production'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.pointproduction].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Point_de_Production'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.pointproduction].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
    
              if (result.data !== null) {

                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)

              } else {
                console.log('no data change')
              }
            }
          )

      }


    }
    /********************* */
    if (prevState.pointdistribution !== this.state.pointdistribution /* && prevState.Compteur_Parent !== '' */) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Point_de_Distribution') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Point_de_Distribution') {
              console.log('existeeeeeeeeeeeeeeee Point_de_Distribution')
              console.log(j)
              if (this.state.pointdistribution != '') {
                this.state.listfieldfiltercontent[j] = this.state.pointdistribution
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            } /*else {
                  console.log('not existttttttttttttttt')
                  state.listfieldfiltername.concat('Le_Compteur_Parent')
                  state.listfieldfiltercontent.concat(this.state.Compteur_Parent)
    
                }*/
          }
          );
        });
      } else if (this.state.pointdistribution != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Point_de_Distribution'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.pointdistribution] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Point_de_Distribution'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.pointdistribution].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Point_de_Distribution'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.pointdistribution].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              
              if (result.data !== null) {


                //tabulator
                //this.setState({ dataCompteur: result.data })
                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)
              } else {
                console.log('no data change')
              }



            }
          )
      }


    }
    /************************** */
    if (prevState.pointconsommation !== this.state.pointconsommation /* && prevState.Compteur_Parent !== '' */) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Point_de_Consommation') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Point_de_Consommation') {
              console.log('existeeeeeeeeeeeeeeee Point_de_Consommation')
              console.log(j)
              if (this.state.pointconsommation != '') {
                this.state.listfieldfiltercontent[j] = this.state.pointconsommation
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            }
          }
          );
        });
      } else if (this.state.pointconsommation != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Point_de_Consommation'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.pointconsommation] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Point_de_Consommation'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.pointconsommation].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Point_de_Consommation'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.pointconsommation].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
            
              if (result.data !== null) {
                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)
              } else {
                console.log('no data change')
              }

            }
          )
      }
    }
    /******* */
    if (prevState.NameEnergy !== this.state.NameEnergy /* && prevState.Compteur_Parent !== '' */) {

      if (this.state.listfieldfiltername.includes('Energie') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Energie') {
              console.log('existeeeeeeeeeeeeeeee Energie')
              console.log(j)
              if (this.state.NameEnergy != '') {
                this.state.listfieldfiltercontent[j] = this.state.NameEnergy
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filtercompteurglobal();
            } /*else {
                  console.log('not existttttttttttttttt')
                  state.listfieldfiltername.concat('Le_Compteur_Parent')
                  state.listfieldfiltercontent.concat(this.state.Compteur_Parent)
    
                }*/
          }
          );
        });
      } else if (this.state.NameEnergy != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Energie'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.NameEnergy] })
        console.log('appel dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Energie'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.NameEnergy])
        axios.post(window.apiUrl + "filter/",

          {
            tablename: "AllCompteur",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Energie'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.NameEnergy].join(';'),
            dataselect: "Code_Compteur;Le_Compteur;Energie;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
           
              if (result.data !== null) {
                this.setState({ listcompteurglobal: result.data })
                console.log("data filter");
                console.log(this.state.listcompteurglobal)
              } else {
                console.log('no data change')
              }
            }
          )
      }
      //this.filtercompteurglobal();
    }
  }


  render() {
    const scrollContainerStyle = { width: "350px", maxHeight: "410px" };
    const { errors } = this.state;
    return (
      <div>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Compteur Listes</MDBBreadcrumbItem>
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
                      <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Compteur </b></th>
                      <th style={{ backgroundColor: "#fff" }}><h6 name="U_compteurselected" value={this.state.U_compteurselected} onChange={this.handleChange} id="1" >{this.state.U_compteurselected}</h6></th>
                      <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round' style={{ marginLeft: '4px' }} onClick={this.ajouterListe} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                    </tr>

                  </thead>
                  <tbody></tbody>
                </table >
                <div>
 

                < FilterCompteur 
                Compteur_Parent={this.state.Compteur_Parent} 
                secteur={this.state.secteur} 
                pointproduction={this.state.pointproduction} 
                pointdistribution={this.state.pointdistribution} 
                filterpointconsommation={this.filterpointconsommation} 
                listpointconsommation={this.state.listpointconsommation}
                 listcompteurglobal={this.state.listcompteurglobal}
                pointconsommation={this.state.pointconsommation}
                listpointdistribution={this.state.listpointdistribution}
                filterpointdistrubition={this.filterpointdistrubition}
                listsecteur={this.state.listsecteur}
                filtersecteur={this.filtersecteur}
                listpointproduction={this.state.listpointproduction}
                filterpointproduction={this.filterpointproduction}
                pointproduction={this.state.pointproduction}
                handlecompteurselectedchange={this.handlecompteurselectedchange}
                 NameEnergy={this.state.NameEnergy}
                 filtercompteurparent={this.filtercompteurparent}
                 listcompteurParent={this.state.listcompteurParent}
                 listNameEnergy={this.state.listNameEnergy}
                 getlistcompteurenergy={this.getlistcompteurenergy}
                 handleChange={this.handleChange}
                 resetvalueoffilter={this.resetvalueoffilter}
                 filtercompteurglobal={this. filtercompteurglobal}

/>

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
                  <ModalCL toggle4={this.toggle4} listes={this.state.listes} handleClick={this.handleClick} handleChange={this.handleChange} Nom={this.state.Nom} />

                  <MDBModalFooter>

                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.CompteurList1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>

                {/************* CompteurListI_Name *************/}
                <div style={{ marginTop: "20px" }} >
                  < table border="1" className="tab  float-right" >
                    <thead >
                      <tr>
                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}>Fichier Source</b></th>
                        <th style={{ backgroundColor: "#fff" }}>

                          <h6 value={this.state.CompteurListI_Name} onChange={this.handleChange} >

                            {this.state.CompteurListI_Name}

                          </h6>
                        </th>
                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >
                          {/** Nouveau */}
                          <MDBBtn className=' button_round  ' id="btnNouveau" style={{ marginLeft: '4px' }} onClick={this.toggle}><MDBIcon title="Nouveau" icon="plus" /></MDBBtn>
                          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
                            <MDBModalHeader toggle={this.toggle} >Tapez le nom du Nouveau Compteur liste ici :</MDBModalHeader>
                            <MDBModalBody>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                              </label>
                              <input type="text" id="1" id="defaultFormLoginEmailEx" name="CompteurListI_Name" className="form-control" value={this.state.CompteurListI_Name} onChange={this.handleChange} required />

                              {errors.CompteurListI_Name.length > 0 &&
                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.CompteurListI_Name}</span>}

                            </MDBModalBody>
                            <MDBModalFooter>

                              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                            </MDBModalFooter>
                          </MDBModal>

                          {/** Modifier Nom liste */}
                          <MDBBtn className=' button_round  option' id="btnModifier" style={{ marginLeft: '4px' }} onClick={this.toggle3}><MDBIcon title="Modifier Nom" icon="pencil-alt" /></MDBBtn>
                          <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
                            <MDBModalHeader toggle={this.toggle3} >Modifier le nom du Compteur lists ici :</MDBModalHeader>
                            <MDBModalBody>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                Nom <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                              </label>
                              <input type="text" id="1" id="defaultFormLoginEmailEx" name="CompteurListI_Name" className="form-control" value={this.state.CompteurListI_Name} onChange={this.handleChange} required />

                              {errors.CompteurListI_Name.length > 0 &&
                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.CompteurListI_Name}</span>}

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

                          <MDBBtn className=" button_round  " onClick={this.toggle6} ><MDBIcon title="Enregistrer" icon="save" size="lg" /></MDBBtn>

                          <MDBModal isOpen={this.state.modal6} toggle={this.toggle6} centered >
                            <MDBModalHeader toggle={this.toggle6} >Enregistrer liste des compteurs:</MDBModalHeader>
                            <MDBModalBody>
                              <MDBRow>
                                <MDBCol size="12">
                                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text float-left" style={{ fontSize: "17px" }}>
                                    Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                  </label>

                                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="CompteurListI_Name" className="form-control" value={this.state.CompteurListI_Name} onChange={this.handleChange} required />
                                </MDBCol>
                                <MDBCol size="12">
                                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text float-left" style={{ fontSize: "17px" }}>
                                    Mot clé système
                                  </label>


                                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="tag_system" className="form-control" value={this.state.tag_system} onChange={this.handleChange} required disabled />
                                </MDBCol> <MDBCol size="12">
                                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text float-left" style={{ fontSize: "17px" }}>
                                    Mot clé utilisateur
                                  </label>
                                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="tag_user" className="form-control" value={this.state.tag_user} onChange={this.handleChange} required />

                                </MDBCol>     </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>

                              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.Enregistrer} > <MDBIcon icon="save" className="ml-1" /> Enregistrer</MDBBtn>
                            </MDBModalFooter>
                          </MDBModal>


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



const ModalCL = ({ toggle4, listes, handleClick, handleChange, Nom }) => {
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
            return el.CompteurListI_Name.indexOf(text) >= 0
          }
        )
        )

        setfilterCL_Liste(listes.filter((el) => el.CompteurListI_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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



            <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
              <option></option>
              {filterCL_Liste.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={(e) => handleClick(liste.CompteurList_Code, e)}>  {liste.CompteurListI_Name} </option>)}

            </select>
          </MDBCol>

        </MDBRow>
      </MDBModalBody>
    </>
  )


}





const FilterCompteur = ({
  Compteur_Parent ,
  secteur ,
  pointproduction ,
  pointdistribution,
  filterpointconsommation,
  listpointconsommation,
  listcompteurglobal ,
  pointconsommation,
  listpointdistribution,
  filterpointdistrubition,
  listsecteur,
  filtersecteur,
  listpointproduction,
  filterpointproduction,
  handlecompteurselectedchange,
  NameEnergy,
  filtercompteurparent,
  listcompteurParent,
  listNameEnergy,
  getlistcompteurenergy,
  handleChange,
  resetvalueoffilter,
  filtercompteurglobal})=>{
 
  const scrollContainerStyle = { width: "350px", maxHeight: "410px" };
  const [filterNameCompteur, setFilterNameCompteur] = useState([])
  useEffect(() => {

    console.log("listcompteurglobal--", listcompteurglobal)
}, [listcompteurglobal])

  useEffect(() => {

    const matna7inich = (e) => {
        console.log("listcompteurgloballistcompteurgloballistcompteurglobal----->", listcompteurglobal)
        const text = e.target.value
        console.log("------->",listcompteurglobal.filter((el) => el.Le_Compteur.indexOf(text) >= 0))
        //listcompteurglobal.filter((el)=>el.Le_Compteur.indexOf(text)>=0)
        setFilterNameCompteur(listcompteurglobal.filter((el) => el.Le_Compteur.indexOf(text) >= 0))


    }

    const input = document.querySelector("#myInput")

  
    if (input) {
        input.addEventListener("keyup", matna7inich)
    }

    return function cleanup() {
        input.removeEventListener("keyup", matna7inich)
    }



}, [listcompteurglobal])
  useEffect(() => {
      if (!filterNameCompteur) return
      filtercompteurglobal(filterNameCompteur)
      console.log("filterNameCompteur", filterNameCompteur)
  }, [filterNameCompteur])

  return(
    <MDBRow style={{ marginTop: '20%' }}>
    <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
      <label htmlFor="defaultFormLoginEmailEx7" >
        Filter Compteur :
      </label>
     

      <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => {resetvalueoffilter() ;}}>
        <MDBIcon size='lg' icon="sync-alt" />
      </MDBBtn>

      <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>


        <MDBInput label="Capteur Énergie :"
          autoComplete="off"
          list="listenergy" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
          name="NameEnergy" value={NameEnergy}
          onClick={getlistcompteurenergy}
          onChange={handleChange} />
        <datalist id="listenergy" >
          {listNameEnergy.map((listNameEnergy, i) => <option key={i} value={listNameEnergy}></option>)}
        </datalist>

        <MDBInput label="Compteur Parent :"
          autoComplete="off"
          list="listcompteurparent" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
          onClick={filtercompteurparent}
          name="Compteur_Parent" value={Compteur_Parent}
          onChange={handleChange} />
        <datalist id="listcompteurparent">
          {listcompteurParent.map((listcompteurParent, i) => <option key={i} value={listcompteurParent}></option>)}
        </datalist>

        <MDBInput label="Secteur :"
          list="listsecteur" style={{ marginBottom: 0.8 + 'em' }}
          autoComplete="off"
          onClick={filtersecteur}
          name="secteur" value={secteur}
          onChange={handleChange} />
        <datalist id="listsecteur">
          {listsecteur.map((listsecteur, i) => <option key={i} value={listsecteur}></option>)}
        </datalist>

        <MDBInput label="Point de Production :"
          list="listptproduction" style={{ marginBottom: 0.8 + 'em' }}
          autoComplete="off"
          onClick={filterpointproduction}
          name="pointproduction" value={pointproduction}
          onChange={handleChange}
        />
        <datalist id="listptproduction">
          {listpointproduction.map(listpointproduction => <option value={listpointproduction}></option>)}
        </datalist>

        <MDBInput label="Point de Distribution :"
          list="listptdistribution" style={{ marginBottom: 0.8 + 'em' }}
          autoComplete="off"
          onClick={filterpointdistrubition}
          name="pointdistribution" value={pointdistribution}
          onChange={handleChange}
        />
        <datalist id="listptdistribution">
          {listpointdistribution.map((listpointdistribution, i) => <option key={i} value={listpointdistribution}></option>)}
        </datalist>

        <MDBInput label="Point de Consommation :"
          list="listptconsommation" style={{ marginBottom: 0.8 + 'em' }}
          autoComplete="off"
          onClick={filterpointconsommation}
          name="pointconsommation" value={pointconsommation}
          onChange={handleChange} />
        <datalist id="listptconsommation">
          {listpointconsommation.map((listpointconsommation, i) => <option key={i} value={listpointconsommation}></option>)}

        </datalist>

      </MDBCol>

    </MDBCol>







    {/**********   This is where the magic happens     ***********/}




    <MDBCol className='p-0'>
      <MDBCol style={{ marginLeft: "1%" }}>

        <div className="d-flex justify-content-between " style={{ marginLeft: "10%" }} >
          <p className=" m-0 p-0">Liste compteur : </p>

          <input type="text" id="myInput" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "60%", marginTop: "-2%" }} />
        </div>
        <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }}>
          <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
            {listcompteurglobal.map((listcompteurglobal, i) => <MDBListGroupItem hover key={i} name="Le_Compteur" value={listcompteurglobal.Le_Compteur} style={{ padding: 0.5 + 'em' }} id={listcompteurglobal.Code_Compteur} hover onClick={() => handlecompteurselectedchange(listcompteurglobal.Le_Compteur, listcompteurglobal.Code_Compteur, listcompteurglobal.Energie, listcompteurglobal.Le_Compteur_Parent, listcompteurglobal.type, listcompteurglobal.Point_de_Production, listcompteurglobal.Point_de_Distribution, listcompteurglobal.Point_de_Consommation)}>{listcompteurglobal.Le_Compteur}</MDBListGroupItem>)}
          </MDBListGroup>
        </MDBContainer>



      </MDBCol>
    </MDBCol>



  </MDBRow>

  );

}


export default Compteur_Listes;