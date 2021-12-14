//import 'react-tabulator/lib/styles.css';
import React,{ useEffect, useState } from "react";
//import "tabulator-tables/dist/css/bootstrap/tabulator_bootstrap.min.css"; 
import "tabulator-tables/dist/css/bootstrap/tabulator_bootstrap4.min.css";
import Tabulator from "tabulator-tables";
import axios from 'axios';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import uuid from 'react-uuid';
import Moment from 'moment';
import { Prompt } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import Swal from 'sweetalert2';

import "./CreateurRapport.css"
import MultiSelectAll from "../../../Admin/MultiSelectAll";
import $ from "jquery"
import GenerateTable from '../layoutGen/layoutGenerator';
import { stringify } from 'postcss';
import { getWeekYearWithOptions } from 'date-fns/fp';
import FilterV1 from '../../../filterV1'
import ModalML from '../CreateurRapport/MLModle'
import ModalCL from "./CLModle";
import ModalTL from "./TLModle";
const validateForm = (errors) => {
  let valid = true;
  //console.log(errors)
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
const validateFormTableau = (errorsNewTableau) => {
  let valid = true;
  //console.log(errorsNewTableau)
  Object.values(errorsNewTableau).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
const validateTableauSelected = (errorsSelectedTableau) => {
  let valid = true;
  //console.log(errorsSelectedTableau)
  Object.values(errorsSelectedTableau).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class Rapport extends React.Component {
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Report_Name: ' '
    }

    this.state.errorsNewTableau = {
      Nom: ' ',
      Security_Group: '',
    }
    this.state.errorsSelectedTableau = {
      Report_TableauName: ' ',
      Report_Name_Select: ' ',
      Report_Master: ' ',
    }
    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Report_TableauCode;Report_TableauName;Access_Groupe_User",
        dist: "*;dist;*",
        orderby: "*",
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {

            this.setState({ listesTableaux: result.data })
  
          } else {
            //console.log('Tableaux vide')
          }


        })
    /////////////////
  }
  toggle1 = () => {
    if (this.state.datamodifier.length != []) {
      this.setState({
        modal1: !this.state.modal1
      });
      this.state.Report_Code = this.state.datamodifier[0].Report_Code;
      this.state.Report_Name = this.state.datamodifier[0].Report_Name;
      this.state.Report_TableauName = this.state.Email_To = this.state.datamodifier[0].Report_TableauName;
      this.state.Report_TableauCode = this.state.datamodifier[0].Report_TableauCode;

      this.state.Report_Description = this.state.datamodifier[0].Report_Description;
      this.state.Report_Master = this.state.datamodifier[0].Report_Master;

      this.state.Report_EnergyCode = this.state.datamodifier[0].Report_EnergyCode;
      this.state.Report_EnergyName = this.state.datamodifier[0].Report_EnergyName;
      this.state.Report_ViewCode = this.state.datamodifier[0].Report_ViewCode;

      this.state.Report_ViewName = this.state.datamodifier[0].Report_ViewName;
      this.state.Report_PostCCode = this.state.datamodifier[0].Report_PostCCode

      this.state.Report_PostCName = this.state.datamodifier[0].Report_PostCName;
      this.state.Auteur = this.state.datamodifier[0].Auteur;
      const config = JSON.stringify(this.state.datamodifier[0].Body)
      const config1 = config.replace(/'/g, "''")
      const config2 = JSON.parse(config1)
      this.state.Body = config2;
      this.state.Selected_Global2 = this.state.datamodifier[0].Selected_Global;
      this.state.Html = this.state.datamodifier[0].Html;
      this.state.SHAH1_code = this.state.datamodifier[0].SHAH1_code;
      this.state.Access_Groupe_User = this.state.datamodifier[0].Access_Groupe_User;
      this.state.formatRapport = this.state.datamodifier[0].disposition;
      this.state.position = this.state.datamodifier[1];



      if (this.state.formatRapport == "Portrait") {


        $('#PortraitLayout').show();
        $('#PaysageLayout').hide();
        $('#PortraitActive').removeClass('activeFormat').addClass('inactiveFormat');
        $(this).removeClass('inactiveFormat').addClass('activeFormat');
        $('#PaysageActive').removeClass('inactiveFormat').addClass('activeFormat');
        $(this).removeClass('activeFormat').addClass('inactiveFormat');

        this.setState({ layoutFormat: { height: "650px", width: "70%" } })
      }
      if (this.state.formatRapport == "Paysage") {
        $('#PortraitLayout').hide();
        $('#PaysageLayout').show();
        $('#PaysageActive').removeClass('activeFormat').addClass('inactiveFormat');
        $(this).removeClass('inactiveFormat').addClass('activeFormat');
        $('#PortraitActive').removeClass('inactiveFormat').addClass('activeFormat');
        $(this).removeClass('activeFormat').addClass('inactiveFormat');
        //console.log("kkkkkkkkk", this.state.formatRapport)
        this.setState({ layoutFormat: { height: "500px", width: "100%" } })

      }




    }

    else {
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

  }
   ///////////////Ml
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });

    /////////ML
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
            ////console.log("ListesMl", this.state.ListesMl)
            //       //console.log("ListesMl ML_Name",ListesMl[0].ML_Name)
          } else {
            //console.log('ListesMl vide')
          }

        })
  }
  toggle3 = () => {
    this.setState({
      modal3: !this.state.modal3
    });

    ////console.log('fffffffffffffffffffffff')
  }
///////////////Tl
  toggle5 = () => {
    this.setState({
        modal5: !this.state.modal5
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
                    //console.log('Listes_TL vide')
                }

            })
}
  ///////////////Cl
  toggle4 = () => {

    this.setState({
      modal4: !this.state.modal4
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

            ////console.log("ListesCl")
            ////console.log(this.state.ListesCl)
          } else {
            //console.log('ListesCl vide')
          }

        })

    ///////////////


  }
  togglePills = (type, tab, name) => e => {
    e.preventDefault();
    this.state.NameMenu = name
    let items = { ...this.state.items };

    // $('#ItemTab2').removeClass('activeItemTab').addClass('inactiveItemTab');
    // $(this).removeClass('inactiveItemTab').addClass('activeItemTab');

    // $('#ItemTab1').removeClass('inactiveItemTab').addClass('activeItemTab');
    // $(this).removeClass('activeItemTab').addClass('inactiveItemTab');
    if (tab==="2"){
      if (this.state.statutTableau==true){
          items[type] = "2";
          this.setState({
            items
          });
        }


else{
  Swal.fire({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    icon: 'warning',
    width: 400,
    title: "S'il vous plaît ajouter un tableau"
  })

       }   

    }
   else if (tab === "3" ) {
      if (validateForm(this.state.errors) == true) {
        if (this.state.statutTableau==true){
      if (items[type] !== "3") {

 

          let items = { ...this.state.items };
          items[type] = "3";
          this.setState({
            items
          });
         
      
           if( this.state.ArrayJSON.length == 0 && this.state.CodeRapportSelected != ""){
        ////////////////////////////////////////////////////
          
//console.log("Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage",this.state.Report_Name_Enregistrer)
axios.post(window.apiUrl + "filter/",

{
    tablename: "Reporting_V3",
    identifier: this.state.dateDMY + uuid(),
    fields: "Report_Name",
    content: this.state.Report_Name,
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
         
if (this.state.CodeRapportSelected != "") {
   



  this.setState({ GenerateTableActive: false })

   ////////////////////////Changement////////////////
   if(this.state.Selected_Global2.length!=0){
   //console.log("this.state.Selected_Global", this.state.Selected_Global2)
   var CL_Selected = null
   var ML_Selected = null
   var TL_Selected = null
   for (var i = 0; i < this.state.Selected_Global2.length; i++) {
       if (this.state.Selected_Global2[i].Dim_type == "VAR") {
           if (this.state.Selected_Global2[i].Dim == "CL") {
               //console.log("1 VAR", this.state.Selected_Global2[i].Dim)
               this.setState({BooleanVar_CL:true})
               if (this.state.Code_Cl != "" && this.state.Name_Cl != "") {
                   CL_Selected = {
                       "Dim": "CL",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Code_Cl,
                       "Dim_label": this.state.Name_Cl,
                       "Dim_Member": this.state.cl_Membre_Select_fin,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("CL_Selected1", CL_Selected)
               } else {

                   CL_Selected = {
                       "Dim": "CL",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Selected_Global2[i].Dim_code,
                       "Dim_label": this.state.Selected_Global2[i].Dim_label,
                       "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("CL_Selected2", CL_Selected)
            this.setState({CompteurListI_Name:this.state.Selected_Global2[i].Dim_label})
               }
           } else if (this.state.Selected_Global2[i].Dim == "ML") {
               //console.log("2 VAR", this.state.Selected_Global2[i].Dim)
               this.setState({BooleanVar_ML:true})
               if (this.state.Code_Ml != "" && this.state.Name_Ml != "") {
                   ML_Selected = {
                       "Dim": "ML",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Code_Ml,
                       "Dim_label": this.state.Name_Ml,
                       "Dim_Member": this.state.ml_Membre_Select_fin,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("ML_Selected1", ML_Selected)
               } else {

                   ML_Selected = {
                       "Dim": "ML",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Selected_Global2[i].Dim_code,
                       "Dim_label": this.state.Selected_Global2[i].Dim_label,
                       "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("ML_Selected2", ML_Selected)
                   this.setState({ML_Name:this.state.Selected_Global2[i].Dim_label})
               }

           } else if (this.state.Selected_Global2[i].Dim == "TL") {

               //console.log("3 VAR", this.state.Selected_Global2[i].Dim)
               this.setState({BooleanVar_TL:true})
               if (this.state.Code_Tl != "" && this.state.Name_Tl != "") {
                   TL_Selected = {
                       "Dim": "TL",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Code_Tl,
                       "Dim_label": this.state.Name_Tl,
                       "Dim_Member": this.state.tl_members,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("TL_Selected1", TL_Selected)
               } else {

                   TL_Selected = {
                       "Dim": "TL",
                       "Dim_type": "VAR",
                       "Dim_code": this.state.Selected_Global2[i].Dim_code,
                       "Dim_label": this.state.Selected_Global2[i].Dim_label,
                       "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                       "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
                   }
                   //console.log("TL_Selected2", TL_Selected)
                   this.setState({tl_name:this.state.Selected_Global2[i].Dim_label})
               }

               
           } else {

               //console.log("vide")

           }


       } else {

           if (this.state.Selected_Global2[i].Dim == "CL") {
               //console.log("1 Fix", this.state.Selected_Global2[i].Dim)
               CL_Selected = {
                   "Dim": "Cl",
                   "Dim_type": "Fix",
                   "Dim_code": this.state.Selected_Global2[i].Dim_code,
                   "Dim_label": this.state.Selected_Global2[i].Dim_label,
                   "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                   "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
               }
               //console.log("CL_Selected3", CL_Selected)


           } else if (this.state.Selected_Global2[i].Dim == "ML") {
               //console.log("2 Fix", this.state.Selected_Global2[i].Dim)
               ML_Selected = {
                   "Dim": "ML",
                   "Dim_type": "VAR",
                   "Dim_code": this.state.Selected_Global2[i].Dim_code,
                   "Dim_label": this.state.Selected_Global2[i].Dim_label,
                   "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                   "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
               }
               //console.log("ML_Selected3", ML_Selected)

           } else if (this.state.Selected_Global2[i].Dim == "TL") {

               //console.log("3 Fix", this.state.Selected_Global2[i].Dim)

               TL_Selected = {
                   "Dim": "TL",
                   "Dim_type": "Fix",
                   "Dim_code": this.state.Selected_Global2[i].Dim_code,
                   "Dim_label": this.state.Selected_Global2[i].Dim_label,
                   "Dim_Member": this.state.Selected_Global2[i].Dim_Member,
                   "Dim_Clone":this.state.Selected_Global2[i].Dim_Clone,
               }
               //console.log("TL_Selected3", TL_Selected)
           } else {

               //console.log("vide")

           }
       }


   }
   this.state.Selected_Global_Enregistrer=[CL_Selected, ML_Selected, TL_Selected]
}else {
   //console.log("Selected_Global2 is vide")
}
   //console.log('Selected_Global2',this.state.Selected_Global_Enregistrer)



   if(this.state.cl_Membre_Select_fin.length!=0 || this.state.ml_Membre_Select_fin.length!=0 || this.state.tl_members.length !=0){
       //console.log("Selected_Global_Rapport_Array",this.state.Selected_Global_Rapport_Array)
   
 
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
         //////////////////////////////////////////////////////////////cloneV2
         axios.post(window.apiUrl + "cloneV2/",
 
         {
           "R_IDs": [this.state.CodeRapportSelected],
           "data": data
           
       }
   
   
       )
   
         .then(
           (result) => {
          //   this.tableData = result.data;
             if (result.data!== null) {
         
               console.log("CLONEV2--------------------------------------->",result.data)
                      this.setState({ config :result.data[0]})
                      this.setState({ GenerateTableActive: false })
     
                      setTimeout(() => this.setState({ GenerateTableActive: true }), 1000)
                       this.state.AjouterRapport=true
                       this.state.Report_Code_Enregistrer=""
                       //console.log("AjouterRapportAjouterRapportAjouterRapport", this.state.AjouterRapport)
             } else {
               //console.log('no data change')
         
             }
   
   
   
           }
         )

        }else {

          console.log("Rapport_Body------------------------------------>", this.state.Rapport_Body)
          this.setState({ config :this.state.Rapport_Body})
         

          setTimeout(() => this.setState({ GenerateTableActive: true }), 1000)
           this.state.AjouterRapport=true
           this.state.Report_Code_Enregistrer=""
        }
      }
  }
               })
 

   
   
   /////////////////////////////////////////////////////////////////////////
      
          

          }}

}else{
  Swal.fire({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    icon: 'warning',
    width: 400,
    title: "S'il vous plaît nom de Rapport obligatoire"
  })
}
        }else{ 
          Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 400,
          title: 'S\il vous plait remplir tous les champs obligatoire'
        })}
    }else if (tab === "4"){
      console.log('--------------------------->1',"Report_Name",this.state.Report_Name,"statutTableau",this.state.statutTableau,"formatRapport",this.state.formatRapport,"editor",this.state.editor)
      if (this.state.Report_Name!=""&&this.state.statutTableau==true&& this.state.formatRapport!="" &&this.state.editor==false){

        if (items[type] !== "4") {
          let items = { ...this.state.items };
          items[type] = "4";
          this.setState({
            items
          });
      }
     // this.state.validAjouter= true
      this.setState({validAjouter:true})
    } else if (this.state.Report_Name!=""&&this.state.statutTableau==true&& this.state.formatRapport!=""&&this.state.editor==true){
      //console.log('--------------------------->2',"Report_Name",this.state.Report_Name,"statutTableau",this.state.statutTableau,"formatRapport",this.state.formatRapport,"editor",this.state.editor)
      if (items[type] !== "4") {
        let items = { ...this.state.items };
        items[type] = "4";
        this.setState({
          items
        });   
    }
    }else {
      //console.log('--------------------------->3',"Report_Name",this.state.Report_Name,"statutTableau",this.state.statutTableau,"formatRapport",this.state.formatRapport,"editor",this.state.editor)
     //console.log("corpsVide")
    }
    }
    else{
     
      items[type] = tab;
      this.setState({
        items
      });
      // $('#ItemTab1').removeClass('activeItemTab').addClass('inactiveItemTab');
      // $(this).removeClass('inactiveItemTab').addClass('activeItemTab');
      // $('#ItemTab2').removeClass('inactiveItemTab2').addClass('activeItemTab');
      // $(this).removeClass('activeItemTab2').addClass('inactiveItemTab');
    }
  };
  togglePills2 = (type, tab, name) => e => {
    e.preventDefault();

    if (this.state.items[type] !== tab) {
      let items = { ...this.state.items };
      items[type] = tab;
      this.setState({
        items
      });
    }
    //////////////////////////////////////
    //console.log("validier 22222")
    if (tab === "2" && this.state.ArrayJSON.length == 0 && this.state.Body.length != 0) {

      for (var i = 0; i < this.state.Body.objects.length; i++) {
        var data = this.state.Body.objects[i].MasterObj_Data_selection
        var data2 = this.state.Body.objects[i].MasterObj_Data_Mapping

        //console.log('XXXXXXXXXXXXXXXXXXX')
        if (data.x == "CL") {
          if (this.state.CL_Membre.length != 0) {
            data.masterObjectX = this.state.CL_Membre
          }

        } else if (data.x == "ML") {
          if (this.state.ML_Membre.length != 0) {

            data.masterObjectX = this.state.ML_Membre
          }

        } else if (data.x == "TL") {
          if (this.state.tl_members.length != 0) {
            data.masterObjectX = this.state.tl_members
          }


        } else {
          //console.log("data.masterObjectX", data.masterObjectX)
          data.masterObjectX = data.masterObjectX
        }
        /*******************************End X****************************** */

        /********************************Y******************************** */
        //console.log('YYYYYYYYYYYYYYY')
        if (data.y == "CL") {
          if (this.state.CL_Membre.length != 0) {
            data.masterObjectY = this.state.CL_Membre

            data.masterObjectY.forEach(element =>
              this.state.Le_Compteur_Liste.push(element.Le_Compteur))
            data2.Plots[0].Y.Y1 = this.state.Le_Compteur_Liste;
            //console.log("this.state.Le_Compteur_Liste", this.state.Le_Compteur_Liste)
            //console.log("data2.Plots[0].Y.Y1", data2.Plots[0].Y.Y1)
          }

        } else if (data.y == "ML") {
          if (this.state.ML_Membre.length != 0) {

            data.masterObjectY = this.state.ML_Membre

            data.masterObjectY.forEach(element =>
              this.state.m_name_Liste.push(element.m_name))
            data2.Plots[0].Y.Y1 = this.state.m_name_Liste;
          }
        } else {
          //console.log("data.masterObjectY", data.masterObjectY)
          data.masterObjectY = data.masterObjectY
          data2.Plots[0].Y.Y1 = data2.Plots[0].Y.Y1
        }
        /********************************End Y******************************** */
        /*****************************Page************************************ */
        //console.log('PPPPPPPPPPPPPPPPPP')
        if (data.page.page == "CL") {
          if (this.state.CL_Membre.length != 0) {
            data.MasterObjPage = {
              "membersList": this.state.CL_Membre,
              "selectedMember": this.state.CL_Membre[0]
            }
          }

        } else if (data.page.page == "ML") {
          if (this.state.ML_Membre.length != 0) {
            if (this.state.CL_Membre.length != 0) {
              data.MasterObjPage = {
                "membersList": this.state.ML_Membre,
                "selectedMember": this.state.ML_Membre[0]
              }

            }

          }
        } else if (data.page.page == "TL") {
          if (this.state.tl_members.length != 0) {
            data.MasterObjPage = {
              "membersList": this.state.tl_members,
              "selectedMember": {}
            }
          }


        } else {
          //console.log("data.MasterObjPage", data.MasterObjPage)
          data.MasterObjPage = {
            "membersList": data.MasterObjPage.membersList,
            "selectedMember": data.MasterObjPage.selectedMember
          }

        }

        /*****************************************End Page**************************************** */

        ////console.log("Body",this.state.Body)
        ////console.log("MasterObj_Code",this.state.Body.objects[0].MasterObj_Code)
        this.state.ArrayJSON.push({
          "MasterObj_Code": this.state.Body.objects[i].MasterObj_Code,
          "row": this.state.Body.objects[i].row,
          "col": this.state.Body.objects[i].col,
          "spanRow": this.state.Body.objects[i].spanRow,
          "spanCol": this.state.Body.objects[i].spanCol,
          "QueryAPI": this.state.Body.objects[i].QueryAPI,
          "MasterObj_Data_selection": {
            "page": this.state.Body.objects[i].MasterObj_Data_selection.page,
            "x": this.state.Body.objects[i].MasterObj_Data_selection.x,
            "y": this.state.Body.objects[i].MasterObj_Data_selection.y,
            "MasterObjPage": data.MasterObjPage,//this.state.MasterObjPage_Array,
            "masterObjectX": data.masterObjectX,//this.state.masterObjectX_Array,
            "masterObjectY": data.masterObjectY,//this.state.masterObjectY_Array
          },
          "MasterObj_Data_Query": this.state.Body.objects[i].MasterObj_Data_Query,
          "MasterObj_Data_Mapping": {
            "Plots": [{
              "X": this.state.Body.objects[i].MasterObj_Data_Mapping.Plots[0].X,
              "Y": {
                "Y1": data2.Plots[0].Y.Y1//,
                // "Y2":[]
              },
              "function_type": this.state.Body.objects[i].MasterObj_Data_Mapping.Plots[0].function_type,
              "extraPlotConfig": this.state.Body.objects[i].MasterObj_Data_Mapping.Plots[0].extraPlotConfig
            }],
            "xaxis": this.state.Body.objects[i].MasterObj_Data_Mapping.xaxis,
            "legend": this.state.Body.objects[i].MasterObj_Data_Mapping.legend,
            "margin": this.state.Body.objects[i].MasterObj_Data_Mapping.margin,
            "yaxis1": this.state.Body.objects[i].MasterObj_Data_Mapping.yaxis1//,     
            //      "yaxis2":this.state.Body.objects[i].MasterObj_Data_Mapping.yaxis2,                             
          }
        })
      }
      /********************* end For*********************/
      ////////////////////////////
      //console.log('ArrayJSON', this.state.ArrayJSON)



      ////////////////////////

      const config = {
        "configLayout": {
          "Masterlayout_row": this.state.Body.configLayout.Masterlayout_row,
          "Masterlayout_col": this.state.Body.configLayout.Masterlayout_col,
          "Orientation": this.state.formatRapport,
          "title": this.state.Body.configLayout.title
        }
        , "objects": this.state.ArrayJSON
      }
      //console.log('---config---', { "configLayout": this.state.Body.configLayout, "objects": this.state.ArrayJSON })
      this.setState({ config })
      this.setState({ GenerateTableActive: false })
      setTimeout(() => this.setState({ GenerateTableActive: true }), 1000)

    }

    /////////////////////////////////////
    ////console.log(name)
    // this.setState({NameMenu:name})
    this.state.NameMenu = name
    ////console.log("NameMenu", this.state.NameMenu)
  };
  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      ///////////Tableaux////////////
      Nom: "",
      Security_Group: "",
      DescriptionTableaux: "",
      CodeNoveauTableaux: "",
      Autheur: "",
      t_Code: [],
      Code: "",
      Prefix: "T",
      listesTableaux: [],
      ajouterTableaux: [],
      //////////////var fix ml cl tl ////////////
      Tl_Var_Fix: "Variable",
      Ml_Var_Fix: "Variable",
      Cl_Var_Fix: "Variable",
      variable: "",
      Dim_code_ML: "",
      Dim_label_ML: "",
      Dim_code_TL: "",
      Dim_label_TL: "",
      Dim_code_CL: "",
      Dim_label_CL: "",
      /////////////objet
      Liste_Objet: [],
      //////////////////////////////////////
      ajout: "",
      ajoutertemp: [],
      formatRapport: "Paysage",
      modifier: "",
      temp: "",
      supprimer: "",
      data: "",
      supprimertemp: [],
      modificationtemp: [],
      formatObjet: "",
      datamodifier: [],
      layoutFormat:  { height: "500px", width: "100%" } ,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      Portrait: "Portrait",
      Paysage: "Paysage",
      Entete1: "Tableaux",
      Entete2: "Nouveau Rapoort",
      Disposition_Rapoort: "Disposition Rapoort",
      Disposition: "",
      Corps: " Corps Rapoort",
      NameMenu: "Tableaux",
      position: null,
      numAncien: "",
      ////////////Rapport///////////
      Report_Code: "",
      Report_Name: "",
      Report_TableauName: "",
      Report_TableauCode: "",
      Report_Description: "",
      Report_Master: "",
      Report_EnergyCode: "",
      Report_EnergyName: "",
      Report_ViewCode: "",
      Report_ViewName: "",
      Report_PostCCode: "",
      Report_PostCName: "",
      Auteur: "",
      Objectjson: [],
      Body: null,
      Body2: null,
      Selected_Global: [],
      Selected_Global2: [],
      Html: "",
      TAGS: "",
      SHAH1_code: "",
      Access_Groupe_User: "",
      QueryApi: "iotinner",

      /////////////////
      config: null,
      data: null,
      GenerateTableActive: false,
      ////////////////////////////
      items: {
        default: "1",
      },
      /////////////////
      TlDisabled: false,
      ClDisabled: false,
      MlDisabled: false,
      //////////
      editor: null,
      Report_Name_Select: "",
      Report_Master: "Oui",
      listesRapportSelect: [],
      Rapport_Body: null,

      ////////////////
      maxRows: 5,
      maxCols: 5,
      /////
      Listes_Cl: [],
      Listes_Ml: [],
      Listes_TL: [],
      CompteurListI_Name: "",
      ML_Name: "",
      tl_name: "",
      ML_Membre: [],
      tl_members: [],
      CL_Membre: [],
      ML_Name: "",
      tl_name: "",
      CompteurList_Code: "",
      ML_Code: "",
      tl_id: "",
      ArrayJSON: [],
      Le_Compteur_Liste: [],
      m_name_Liste: [],
      masterObjectX_Array: [],
      masterObjectY_Array: [],
      MasterObjPage_Array: {},
      Y1_Array: [],
      Y2_Array: [],
      CodeRapportSelected: "",
      statutTableau: false,
      validAjouter: false,
      errors: {
        Report_Name: '* Obligatoire',
 

      },
      errorsNewTableau: {
        Nom: "* Obligatoire",
        Security_Group: "* Obligatoire"
      },

      errorsSelectedTableau: {
        Report_TableauName: '* Obligatoire',
        Report_Name_Select: '* Obligatoire',
        Report_Master: '* Obligatoire',
      },
      /////////////////
      Dim_Member_CL:"",
      Dim_Clone_CL:"",
      Dim_Member_ML:"",
      Dim_Clone_ML:"",
      Dim_Member_TL:"",
      Dim_Clone_TL:"",
      ///////////////
      Code_Cl:"",
      Name_Cl:"",
      cl_Membre_Select_fin:[],
      Code_Ml:"",
      Name_Ml:"",
      ml_Membre_Select_fin:[],
      Code_Tl:"",
      Name_Tl:"",
      Selected_Global_Enregistrer:[],
      disabled_new_tableau:false,
      disabled_selected_tableau:false,
      data_rapport:[],
      array_data_rapport:[],

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.QueryApiClick = this.QueryApiClick.bind(this);
    this.handleObjectjson = this.handleObjectjson.bind(this);
    this.dataConfig = this.dataConfig.bind(this);
    this.AjouterCl = this.AjouterCl.bind(this);
    this.AjouterMl = this.AjouterMl.bind(this)
    this.AjouterTl = this.AjouterTl.bind(this)
    this.handleListeCompteurClick = this.handleListeCompteurClick.bind(this)
   // this.handleMlClick = this.handleMlClick.bind(this)
   // this.handleTl_Click = this.handleTl_Click.bind(this)
    this.Enregistrer = this.Enregistrer.bind(this)
    this.copier = this.copier.bind(this);
    this.modifier = this.modifier.bind(this);
    this.ajouterTableauxExiste = this.ajouterTableauxExiste.bind(this)
  }
  copier = () => {

    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      //console.log(this.state.datamodifier)
      this.setState({ isDisabledbutton: true })
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

            //console.log('resultt data get max code ' + result.data)
            if (result.data == null) {
              alert("N'existe pas max code ");

            } else {
              var code = result.data.split(", ")
              this.state.Report_Code = code
              //console.log("Report_Code")
              //console.log(this.state.Report_Code)
              /////////////////////////////////////
              this.state.Report_Name = 'copie ' + this.state.datamodifier[0].Report_Name;
              this.state.Report_TableauName = this.state.Email_To = this.state.datamodifier[0].Report_TableauName;
              this.state.Report_TableauCode = this.state.datamodifier[0].Report_TableauCode;

              this.state.Report_Description = this.state.datamodifier[0].Report_Description;
              this.state.Report_Master = this.state.datamodifier[0].Report_Master;

              this.state.Report_EnergyCode = this.state.datamodifier[0].Report_EnergyCode;
              this.state.Report_EnergyName = this.state.datamodifier[0].Report_EnergyName;
              this.state.Report_ViewCode = this.state.datamodifier[0].Report_ViewCode;

              this.state.Report_ViewName = this.state.datamodifier[0].Report_ViewName;
              this.state.Report_PostCCode = this.state.datamodifier[0].Report_PostCCode

              this.state.Report_PostCName = this.state.datamodifier[0].Report_PostCName;
              this.state.Auteur = this.state.datamodifier[0].Auteur;
              this.state.Body = this.state.datamodifier[0].Body;
              this.state.Selected_Global2 = this.state.datamodifier[0].Selected_Global;
              this.state.Html = this.state.datamodifier[0].Html;
              this.state.SHAH1_code = this.state.datamodifier[0].SHAH1_code;
              this.state.Access_Groupe_User = this.state.datamodifier[0].Access_Groupe_User;
              this.state.Disposition= this.state.datamodifier[0].disposition
              this.state.position = this.state.datamodifier[1];
              ///////////////////////////////////////////////////////////////////
           //console.log("BodyBodyBodyBody",this.state.Body)
              const config = JSON.stringify(this.state.Body)
              const config1 = config.replace(/'/g, "''")
              const config2 = JSON.parse(config1)
             //console.log("config2",config2)
             
              this.state.ajoutertemp.push({
                "Report_Code": this.state.Report_Code[0],
                "Report_Name": this.state.Report_Name,
                "Report_TableauName": this.state.Report_TableauName,
                "Report_TableauCode": this.state.Report_TableauCode,
                "Report_Description": this.state.Report_Description,
                "Report_Master": this.state.Report_Master,
                "Report_EnergyCode": this.state.Report_EnergyCode,
                "Report_EnergyName": this.state.Report_EnergyName,
                "Report_ViewCode": this.state.Report_ViewCode,
                "Report_ViewName": this.state.Report_ViewName,
                "Report_PostCCode": this.state.Report_PostCCode,
                "Report_PostCName": this.state.Report_PostCName,
                "Auteur": this.state.Auteur,
                "Body": config2,
                "Selected_Global": this.state.Selected_Global2,
                "Html": this.state.Html,
                "TAGS": this.state.TAGS,
                "SHAH1_code": this.state.SHAH1_code,
                "Access_Groupe_User": this.state.Access_Groupe_User,
                "disposition": this.state.Disposition,
                "DBAction": "2"
              })
              var Report_Name = this.state.Report_Name;
              var Report_TableauName = this.state.Report_TableauName;
              var Report_Master = this.state.Report_Master;
              var disposition = this.state.Disposition;
              var Report_Description = this.state.Report_Description;
              var TAGS=this.state.TAGS
              this.mytable.addRow({ Report_Name, Report_TableauName, Report_Master,TAGS, disposition, Report_Description }, true);

              //console.log("this.state.ajoutertemp", this.state.ajoutertemp)

              ////////////           

            }


          })
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
  el = React.createRef();
  mytable = "Tabulator";
  tableData = []
  ajouter() {
    //console.log("validateForm(this.state.errors) == true", validateForm(this.state.errors) == true)
    if (validateForm(this.state.errors) == true) {
      this.setState({
        modal: !this.state.modal
      });
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'success',
        title: 'Ajouter'

      })
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
              this.state.Report_Code = code
              //console.log("Report_Code")
              //console.log(this.state.Report_Code)
            } else {
              //console.log('Report_Code est vide')
            }
        
            ////console.log('this.state.Objectjson', this.state.Objectjson)
            //this.state.Liste_Objet=this.state.Objectjson
            //this.state({Liste_Objet:this.state.Objectjson})
            ////console.log('this.state.Liste_Objet', this.state.Liste_Objet)
            this.state.Body = {
              "configLayout": {
                "Masterlayout_row": this.state.maxRows,
                "Masterlayout_col": this.state.maxCols,
                "Orientation": this.state.formatRapport,
                "title": "",
              },

              "objects": this.state.Objectjson
            }
          
            ////console.log("----------Body----------",JSON.stringify( this.state.Body))
            if (this.state.CodeRapportSelected != "") {
              const config = JSON.stringify(this.state.config)
              const config1 = config.replace(/'/g, "''")
              const config2 = JSON.parse(config1)

              this.state.ajoutertemp.push({
                "Report_Code": this.state.Report_Code[0],
                "Report_Name": this.state.Report_Name,
                "Report_TableauName": this.state.Report_TableauName,
                "Report_TableauCode": this.state.Report_TableauCode,//parseInt(this.state.Report_TableauCode),
                "Report_Description": this.state.Report_Description,
                "Report_Master": this.state.Report_Master,
                "Report_EnergyCode": this.state.Report_EnergyCode,
                "Report_EnergyName": this.state.Report_EnergyName,
                "Report_ViewCode": this.state.Report_ViewCode,
                "Report_ViewName": this.state.Report_ViewName,
                "Report_PostCCode": this.state.Report_PostCCode,
                "Report_PostCName": this.state.Report_PostCName,
                "Auteur": this.state.Auteur,
                "Body": config2,
                "Selected_Global": this.state.Selected_Global2,
                "Html": this.state.Html,
                "TAGS": this.state.TAGS,
                "SHAH1_code": this.state.SHAH1_code,
                "Access_Groupe_User": this.state.Access_Groupe_User,
                "disposition": this.state.formatRapport,
                "DBAction": "2"
              })

            } else {

              if (this.state.Cl_Var_Fix == "Fixe") {
                this.state.Dim_code_CL = "*"
                this.state.Dim_label_CL = "*"
                this.state.Dim_Member_CL="*"
                this.state.Dim_Clone_CL="*"
              }
              if (this.state.Ml_Var_Fix == "Fixe") {
                this.state.Dim_code_ML = "*"
                this.state.Dim_label_ML = "*"
                this.state.Dim_Member_ML="*"
                this.state.Dim_Clone_ML="*"
              }
              if (this.state.Ml_Var_Fix == "Fixe") {
                this.state.Dim_code_TL = "*"
                this.state.Dim_label_TL = "*"
                this.state.Dim_Member_TL="*"
                this.state.Dim_Clone_TL="*"
              }
              //////////// Prends les valeurs in page Master Objet
              if (this.state.Cl_Var_Fix == "Variable") {
                this.state.Dim_code_CL = "*"
                this.state.Dim_label_CL = "*"
                this.state.Dim_Member_CL="*"
                this.state.Dim_Clone_CL="*"
              }
              if (this.state.Ml_Var_Fix == "Variable") {
                this.state.Dim_code_ML = "*"
                this.state.Dim_label_ML = "*"
                this.state.Dim_Member_ML="*"
                this.state.Dim_Clone_ML="*"
              }
              if (this.state.Ml_Var_Fix == "Variable") {
                this.state.Dim_code_TL = "*"
                this.state.Dim_label_TL = "*"
                this.state.Dim_Member_TL="*"
                this.state.Dim_Clone_TL="*"
              }
              var CL_Selected = {
                "Dim": "CL",
                "Dim_type": this.state.Cl_Var_Fix,
                "Dim_code": this.state.Dim_code_CL,
                "Dim_label": this.state.Dim_label_CL,
                "Dim_Member": this.state.Dim_Member_CL,
                "Dim_Clone":this.state.Dim_Clone_CL,
              }
              var ML_Selected = {
                "Dim": "ML",
                "Dim_type": this.state.Ml_Var_Fix,
                "Dim_code": this.state.Dim_code_ML,
                "Dim_label": this.state.Dim_label_ML,
                "Dim_Member": this.state.Dim_Member_ML,
                "Dim_Clone":this.state.Dim_Clone_ML,
              }
              var TL_Selected = {
                "Dim": "TL",
                "Dim_type": this.state.Tl_Var_Fix,
                "Dim_code": this.state.Dim_code_TL,
                "Dim_label": this.state.Dim_label_TL,
                "Dim_Member": this.state.Dim_Member_TL,
                "Dim_Clone":this.state.Dim_Clone_TL,
              }
              const Selected_Global = [CL_Selected, ML_Selected, TL_Selected]
              const a = JSON.stringify(Selected_Global)
              const b = a.replace(/Fixe/g, "FIX");
              const c = b.replace(/Variable/g, "VAR");
              this.state.Selected_Global = JSON.parse(c);


              //////////////////////
              //console.log("this.state.Nom", this.state.Nom)
              const config = JSON.stringify(this.state.Body)
              const config1 = config.replace(/'/g, "''")
              const config2 = JSON.parse(config1)
//              Disposition = config2.configLayout.Orientation;
              this.state.Report_Master = "Oui"
              this.state.ajoutertemp.push({
                "Report_Code": this.state.Report_Code[0],
                "Report_Name": this.state.Report_Name,
                "Report_TableauName": this.state.Report_TableauName,
                "Report_TableauCode": this.state.Report_TableauCode,
                "Report_Description": this.state.Report_Description,
                "Report_Master": this.state.Report_Master,
                "Report_EnergyCode": this.state.Report_EnergyCode,
                "Report_EnergyName": this.state.Report_EnergyName,
                "Report_ViewCode": this.state.Report_ViewCode,
                "Report_ViewName": this.state.Report_ViewName,
                "Report_PostCCode": this.state.Report_PostCCode,
                "Report_PostCName": this.state.Report_PostCName,
                "Auteur": this.state.Auteur,
                "Body": config2,
                "Selected_Global": this.state.Selected_Global,
                "Html": this.state.Html,
                "TAGS": this.state.TAGS,
                "SHAH1_code": this.state.SHAH1_code,
                "Access_Groupe_User": this.state.Access_Groupe_User,
                "disposition": this.state.formatRapport,
                "DBAction": "2"
              })
            }
            var Report_Name = this.state.Report_Name;
            var Report_TableauName = this.state.Report_TableauName;
            var Report_Master = this.state.Report_Master;
            var disposition = this.state.formatRapport;
            var TAGS=this.state.TAGS
            //console.log('dispositiondispositiondisposition',disposition)
            var Report_Description = this.state.Report_Description;
            this.mytable.addRow({ Report_Name, Report_TableauName,TAGS, Report_Master, disposition, Report_Description }, true);

            //console.log("this.state.ajoutertemp", this.state.ajoutertemp)
          })
      // this.state.Report_Name = "";
      // this.state.Report_TableauName = "";
      // this.state.Report_TableauCode = "";
      // this.state.Report_Description = "";
      // this.state.Report_EnergyCode = "";
      // this.state.Report_Master = "";
      // this.state.Report_EnergyName = "";
      // this.state.Report_ViewCode = "";
      // this.state.Report_ViewName = "";
      // this.state.Report_PostCCode = "";
      // this.state.Auteur = "";
      // this.state.Body = null ;
      // this.state.Selected_Global = [];
      // this.state.Html = "";
      // this.state.TAGS = [];
      // this.state.SHAH1_code = "";
      // this.state.Access_Groupe_User = "";
      // this.state.Nom="";
      // this.state.t_Code="";
      // this.state.Security_Group = localStorage.removeItem('acesscode')
    //  //console.log('Security_Group Update', this.state.Security_Group)
    this.setState({disabled_new_tableau:false})
    this.setState({disabled_selected_tableau:false})
    this.setState({  items: {
      default: "1",
    }})
    } else {
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

    const config = JSON.stringify(this.state.config)
    const config1 = config.replace(/'/g, "''")
    const config2 = JSON.parse(config1)

    this.state.modificationtemp.push(

      {
        "Report_Code": this.state.Report_Code,
        "Report_Name": this.state.Report_Name,
        "Report_TableauName": this.state.Report_TableauName,
        "Report_TableauCode": this.state.Report_TableauCode,//parseInt(this.state.Report_TableauCode),
        "Report_Description": this.state.Report_Description,
        "Report_Master": this.state.Report_Master,
        "Report_EnergyCode": this.state.Report_EnergyCode,
        "Report_EnergyName": this.state.Report_EnergyName,
        "Report_ViewCode": this.state.Report_ViewCode,
        "Report_ViewName": this.state.Report_ViewName,
        "Report_PostCCode": this.state.Report_PostCCode,
        "Report_PostCName": this.state.Report_PostCName,
        "Auteur": this.state.Auteur,
        "Body": config2,
        "Selected_Global": this.state.Selected_Global2,
        "Html": this.state.Html,
        "TAGS": this.state.TAGS,
        "SHAH1_code": this.state.SHAH1_code,
        "Access_Groupe_User": this.state.Access_Groupe_User,
        "disposition": this.state.formatRapport,
        "DBAction": "1"
      });
    this.tableData[this.state.position].Report_Name = this.state.Report_Name;
    this.tableData[this.state.position].Report_TableauName = this.state.Report_TableauName;
    this.tableData[this.state.position].Report_Description = this.state.Report_Description;
    this.tableData[this.state.position].Report_Master = this.state.Report_Master;
    this.tableData[this.state.position].Disposition = this.state.formatRapport;

    this.state.Report_Name = "";
    this.state.Report_TableauName = "";
    this.state.Report_Description = "";
    this.state.Report_Master = "";
    this.state.Body = null

  }
  Enregistrer() {
    if (this.state.ajouterTableaux.length != 0) {
      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "Tableaux_V3",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajouterTableaux)
      }
      )
        .then((response) => {
          console.log("Enregistrer");
          console.log(response.status);
          console.log(response.statusText);
          console.log(response);
          console.log(response.data);
        })
        .catch((err) => console.error(err));
    }
    console.log("verification", this.state.ajoutertemp.length, this.state.modificationtemp.length, this.state.supprimertemp.length)

    console.log("verification2", this.state.ajoutertemp, this.state.modificationtemp, this.state.supprimertemp)
    if (this.state.ajoutertemp.length != 0 || this.state.modificationtemp.length != 0 || this.state.supprimertemp.length != 0) {
      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),
      }
      )
        .then((response) => {
          console.log("Enregistrer");
          console.log(response.status);
          console.log(response.statusText);
          console.log(response);
          console.log(response.data);
          if(response.data=="op"){
            Swal.fire({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              width: 300,
              icon: 'success',
              title: 'Enregister avec succès'
            })
      setTimeout(function () {
        window.location.reload(1);
      }, 1000);
          }else {

            console.log("Enregistrer error");
          }
        })
        .catch((err) => console.error(err));
    } else {
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
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    ///////////////
    const { name, value } = e.target;
    let errors = this.state.errors;
    let errorsNewTableau = this.state.errorsNewTableau;
    let errorsSelectedTableau = this.state.errorsSelectedTableau;
    //console.log("statutTableau",this.state.statutTableau)
    switch (name) {
      case 'Report_Name':
        errors.Report_Name =
          value.length < 5
            ? 'Nom doit comporter au moins 5 caractères!'
            : '';
        break;
      case 'Nom':
        errorsNewTableau.Nom =
          value.length < 5
            ? 'Nom doit comporter au moins 5 caractères!'
            : '';
        break;
      case 'Security_Group':
        errorsNewTableau.Security_Group =
          value.length < 1
            ?
            'Security_Group est vide!'
            : '';
        break;
      case 'Report_TableauName':
        errorsSelectedTableau.Report_TableauName =
          value.length < 1
            ?
            'Liste Tableau est vide!'
            : '';
        break;
      case 'Report_Master':
        errorsSelectedTableau.Report_Master =
          value.length < 1
            ?
            'Report_Master est vide!'
            : '';
        break;
      case 'Report_Name_Select':
        errorsSelectedTableau.Report_Name_Select =
          value.length < 1
            ?
            'Rapport est vide!'
            : '';
        break;
      default:
        break;
    }


    this.setState({ errors, [name]: value });
    this.setState({ errorsNewTableau, [name]: value });
    this.setState({ errorsSelectedTableau, [name]: value });
  }
  dataConfig = (config, data) => {
    let x = 0
    let y = 0
    let backupXData = null

    const getNewXY = (op) => {
      switch (op) {
        case "x": {
          x++
          return `x${x < 2 ? "" : x}`
        }
        case "y": {
          y++
          return `y${y < 2 ? "" : y}`
        }
        default:
          break;
      }
    }

    const generateX = (plot, data, i, j) => {
      let x = []
      if (plot.X == "time" && backupXData)
        return backupXData
      else {
        if (plot.X == "time") {
          data.map((elem, i) => {
            if (elem.time) {
              const date = new Date(elem.time)
              x.push(date)
            }
            else
              x.push(date)
          })
        }
      }
      return x
    }

    const generateY = (plot, data, i, j, Globalfunction_type) => {
      const y = []
      data.map((elem, i) => {
        if (Globalfunction_type == "*") {
          if (typeof (elem[plot.Y]) == "undefined") throw new Error(`plot.Y=${plot.Y} missing`)
          y.push(elem[plot.Y])
        }
        else {
          if (typeof (elem[Globalfunction_type]) == "undefined") throw new Error(`Globalfunction_type=${Globalfunction_type} missing`)
          y.push(elem[Globalfunction_type])
        }
      })
      return y
    }

    const layoutGenerator = (config, data, generatedData) => {

      let _layout = { dragmode: false, grid: { rows: config.configLayout.rowG, columns: config.configLayout.colG, pattern: 'independent' }, }
      for (let _data of generatedData) {
        let code = "x"
        let num = _data.xaxis.split("")[1]
        _layout[`${code}axis${num ? num : ""}`] = { title: _data.X_title, fixedrange: true }
        code = "y"
        num = _data.yaxis.split("")[1]
        _layout[`${code}axis${num ? num : ""}`] = { fixedrange: true }
        if (_data.Y_title) {
          _layout[`${code}axis${num ? num : ""}`].title = _data.Y_title[`Y${num ? num : "1"}_title`]
          _layout[`${code}axis${num ? num : ""}`].side = "right"
        }
        _layout.title = config.configLayout.title

      }
      return _layout
      // return {
      //   grid: { rows: config.configLayout.rowG, columns: config.configLayout.colG, pattern: 'independent' },
      //   // xaxis: { title: "xaxis" },
      //   // yaxis: { title: 'yaxis', },
      //   // xaxis2: { title: "xaxis2" },
      //   // yaxis2: { title: 'yaxis2', side: "right" }
      //   xaxis: { title: "xaxis" },
      //   yaxis: { title: 'yaxis', },
      //   xaxis2: { title: "xaxis2" },
      //   yaxis2: { title: 'yaxis2', side: "right" }
      // }

    }

    const dataGenerator = (config, data) => {
      let outFinal = []
      let outTemp = {}
      config.objects.map((obj, i) => {
        const secondary = Object.keys(config.configLayout.specs[i]).length ? true : false
        const x = getNewXY("x")
        const y = getNewXY("y")
        obj.Data_Maping.Plots.map((plot, j) => {
          outTemp = {}
          const xData = generateX(plot, data, i, j)
          const yData = generateY(plot, data, i, j, obj.Data_Maping.Globalfunction_type)
          outTemp.x = xData
          outTemp.y = yData

          if (j != 0 && secondary) {

            outTemp.xaxis = x
            outTemp.yaxis = y

          }
          else {

            outTemp.xaxis = x
            outTemp.yaxis = y

          }

          outTemp.type = plot.function_type
          outTemp.id = obj.id
          outTemp.Page_title = obj.Page_title
          outTemp.X_title = obj.X_title
          outTemp.X_unite = obj.X_unite
          if (obj.Y_title) {
            outTemp.Y_title = obj.Y_title
            outTemp.Y_unite = obj.Y_unite
          }

          outFinal.push(outTemp)
        })
      })
      return outFinal
    }

    const _data = dataGenerator(config, data)
    let output = {
      data: _data,
      layout: layoutGenerator(config, data, _data)
    }

    return output
  }

  componentDidMount() {
    ////console.log("this.state.Rapport_Body",this.state.Rapport_Body )


    /////
    this.getDate();

    const supprimertemp = this.state.supprimertemp;
    const datamodifier = this.state.datamodifier;

    /// api tabulator display EventEMail
    axios.defaults.withCredentials = true;
    axios.get(window.apiUrl + "getReports/?g&b")
    .then(
        (result) => {
       //   this.tableData = result.data;
    

console.log("***************",result.data.reports)
          if (result.data.length !== 0) {
            this.tableData = result.data.reports;
        
           this.setState({data_rapport:result.data.reports})
           
           for( var i=0;i<this.state.data_rapport.length;i++){
             
             if (this.state.data_rapport[i].Body.objects!=undefined){
              this.state.array_data_rapport.push(this.state.data_rapport[i])
           //   console.log(this.state.array_data_rapport)
             }else {
             //console.log("synoptique")
             }

           }
          
  
           console.log("   this.state.array_data_rapport",   this.state.array_data_rapport)
      
            this.state.listes = result.data
            //console.log("this.tableData ", this.tableData)

          } else {
            ////console.log('tl vide')
          }
          //tabulator
          this.mytable = new Tabulator(this.el, {
            data: this.tableData,

            //link data to table
            reactiveData: true, //enable data reactivity
             addRowPos: "top",
             pagination: "local",
             paginationSize: 8,
             movableColumns: true,
          //   resizableRows: true,
            // reactiveData: true,
           //  printRowRange: "selected",
            selectable: 1,
          //  layout:"fitColumns",
          //rowBackgroundColor:	"#fff",
            selectablePersistence: this.state.position,
            paginationSizeSelector: [8,12,16,20],
            columns: [
              {


                hozAlign: "center",
                headerSort: false,
                cellClick: function (e, cell, row) {



                  var position = cell.getRow().getPosition()
                  //console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  //console.log("valider", cell.getData())
                  //console.log("valider", datamodifier)


                }
              },
              {
                title: "Nom de Rapport",
                field: "Report_Name",
                width: "20%",
                headerFilter: "input",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  ////console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), cell.getRow().getPosition());
                  //console.log("valider", datamodifier)


                }
              },

              {
                title: "Tableau",
                field: "Report_TableauName",
                width: "20%",
                headerFilter:"select", headerFilterParams:{values:true},
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  ////console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), cell.getRow().getPosition());
                  //console.log("valider", datamodifier)


                }

              },
              {
                title: "Tags",
                field: "TAGS",
                width: "15%",
                headerFilter: "input",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  ////console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), cell.getRow().getPosition());


                }
              },

              {title:"Master",
               field:"Report_Master",
               width: "15%",
               cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
                ////console.log(position);
                datamodifier.splice(0, 2);
                datamodifier.push(cell.getData(), cell.getRow().getPosition());


              },
            
                 headerFilter:"select", 
                 headerFilterParams:{values:{"Oui":"Oui", "Non":"Non", "":""},
               
                }
              },
                 
              
          


              {
                title: "Description de Rapport",
                field: "Report_Description",
                width: "20%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  ////console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), cell.getRow().getPosition());
                  ////console.log("valider", datamodifier)


                }

              },

              {
                title: "Supprimer",
                field: "supprimer",
                width: "7%",
                hozAlign: "center",
                formatter: function () { //plain text value

                  return "<i class='fa fa-trash-alt icon'></i>";

                },
                cellClick: function (e, cell) {
                  cell.getData();

                  //console.log(cell.getData())
                  const config = JSON.stringify(cell.getData().Body)
                  const config1 = config.replace(/'/g, "''")
                  const config2 = JSON.parse(config1)
                  supprimertemp.push(
                    {

                      "Report_Name": cell.getData().Report_Name,
                      "Report_Code": cell.getData().Report_Code,
                      "Report_TableauName": cell.getData().Report_TableauName,
                      "Report_TableauCode": cell.getData().Report_TableauCode,
                      "Report_Description": cell.getData().Report_Description,
                      "Report_Master": cell.getData().Report_Master,
                      "Report_EnergyCode": cell.getData().Report_EnergyCode,
                      "Report_EnergyName": cell.getData().Report_EnergyName,
                      "Report_ViewCode": cell.getData().Report_ViewCode,
                      "Report_ViewName": cell.getData().Report_ViewName,
                      "Report_PostCCode": cell.getData().Report_PostCCode,
                      "Report_PostCName": cell.getData().Report_PostCName,
                      "Auteur": cell.getData().Auteur,
                      "Body": config2,
                      "Selected_Global": cell.getData().Selected_Global2,
                      "Html": cell.getData().Html,
                      "TAGS": cell.getData().TAGS,
                      "SHAH1_code": cell.getData().SHAH1_code,
                      "Access_Groupe_User": cell.getData().Access_Groupe_User,
                      "dispodtion": cell.getData().disposition,
                      "DBAction": "3"
                    }
                  )
                  //console.log(supprimertemp)
                  cell.getRow().delete();
                  Swal.fire({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    width: 300,
                    icon: '',
                    title: 'Supprimer temporairement  ' + cell.getData().Report_Name

                  })
                },
                hideInHtml: true,
              },
            ], //define table columns

          });

          //console.log("Reporting_V3", result.data);
        }
      )
    // this.state.formatRapport="Portrait"
  }
  handleClick(id) {
    //this.state.formatRapport=id

    this.setState({ variable: this.state.Tl_Var_Fix })
    ////console.log("variable", this.state.variable)
    this.setState({ formatRapport: id })
    this.setState({ layoutFormat: { height: "650px", width: "70%" }  })
    ////console.log("formatRapport", this.state.formatRapport)
    this.state.formatRapport = id
    var $ = require("jquery");
    if (this.state.formatRapport == "Portrait") {
      $('#PortraitActive').removeClass('activeFormat').addClass('inactiveFormat');
      $(this).removeClass('inactiveFormat').addClass('activeFormat');
      $('#PaysageActive').removeClass('inactiveFormat').addClass('activeFormat');
      $(this).removeClass('activeFormat').addClass('inactiveFormat');

      this.setState({ layoutFormat: { height: "650px", width: "70%" } })
    }
    if (this.state.formatRapport == "Paysage") {
      $('#PaysageActive').removeClass('activeFormat').addClass('inactiveFormat');
      $(this).removeClass('inactiveFormat').addClass('activeFormat');
      $('#PortraitActive').removeClass('inactiveFormat').addClass('activeFormat');
      $(this).removeClass('activeFormat').addClass('inactiveFormat');

      this.setState({ layoutFormat: { height: "500px", width: "100%" } })
  
    }

  }
  NouveauTableauClick() {
    $('#NouveauTableaux').show();
    $('#Tl_Var_Fix').show();
    $('#Ml_Var_Fix').show();
    $('#Cl_Var_Fix').show();
    $('#liste_Tableaux').hide();
    axios.post(window.apiUrl + "sendid/",
      {
        tablename: "Tableaux_V3",
        identifier: this.state.dateDMY + uuid(),
        nombermaxcode: '1',
        primaryfield: "Code",
        fields: "*",
        content: "*",

      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            // this.state.tl_Code = result.data.substring(1, result.data.length - 1);
            var code = result.data.split(", ")
            this.state.t_Code = code
            ////console.log("t_Code", this.state.t_Code)
          } else {
            ////console.log('t_Code vide')
          }
        }
      )

  }
  AjouterNouveauTableauClick() {
    var Nom = this.state.Nom
    var Security_Group = this.state.Security_Group
    var Code = this.state.CodeNoveauTableaux = this.state.t_Code[0]
    var Prefix = this.state.Prefix
    var DescriptionTableaux = this.state.DescriptionTableaux
    var Autheur = this.state.Autheur


    //console.log("Nom", this.state.Nom)
    //console.log("Security_Group", this.state.Security_Group)

    //console.log("validateForm(this.state.errorsNewTableau) == true)", validateFormTableau(this.state.errorsNewTableau) == true)
    //console.log("validateForm(this.state.errorsNewTableau) == true)", validateFormTableau(this.state.errorsNewTableau))


    if (validateFormTableau(this.state.errorsNewTableau) == true) {


      if (Nom != "") {
        this.state.Report_TableauName = Nom;
        this.state.Report_TableauCode = Code;
        this.state.Access_Groupe_User = Security_Group;
      }
      // //console.log(
      //   'Code', Code,
      //   "\n Prefix", Prefix,
      //   "\n Nom", Nom,
      //   "\n Security_Group", Security_Group,
      //   "\n DescriptionTableaux", DescriptionTableaux,
      //   "\n Autheur", Autheur)
      this.state.ajouterTableaux.push({
        "Code": Code,
        "Prefix": Prefix,
        "Nom": Nom,
        "Security_Group": Security_Group,
        "Description": DescriptionTableaux,
        "Autheur": Autheur,
        "DBAction": "2"
      });
      $('#editorTrue').show();
      this.state.editor=true;
      $('#editorFalse').hide();

      //console.log("kkkk", this.state.ajouterTableaux)
      $('#NouveauTableaux').hide();

      $('#NouveauTableau').show();
   // $('#selectionTableau').hide();
      this.setState({disabled_selected_tableau:true})
      this.state.statutTableau=true;
      //console.log('this.state.statutTableau',this.state.statutTableau)
    } else {
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

  QueryApiClick(QueryAPI, e) {
    ////console.log("gggggggggggggggg", QueryAPI)
    if (QueryAPI === "cluster") {
      // this.state.TlDisabled=true
      this.setState({ TlDisabled: true })
      ////console.log('disabled', this.state.TlDisabled)
      this.state.Tl_Var_Fix = ""
    } else {
      this.setState({ TlDisabled: false })
      //this.state.TlDisabled=false
      ////console.log('notdisabled', this.state.TlDisabled)
      this.state.Tl_Var_Fix = "Variable"
    }
  }
  handleObjectjson(Objectjson) {

    this.setState((prev) => {
      prev.Objectjson.push(Objectjson)
      return prev
    })
    if ( Objectjson.length!=0){
      this.setState({validAjouter:true})
      }
    // //console.log("Ooooooooooooooooooooobjectjson", this.state.Objectjson)
   // //console.log("Ooooooooooooooooooooobjectjson00000", Objectjson)
  }
  ajouterTableauxExiste() {
    //console.log("Report_TableauName",this.state.Report_TableauName)
    //console.log("validateTableauSelected(this.state.errorsSelectedTableau) == true", validateTableauSelected(this.state.errorsSelectedTableau) == true)
    // if (validateTableauSelected(this.state.errorsSelectedTableau) == true) {
      console.log("Report_Name_Select",this.state.Report_Name_Select)
 if (this.state.Report_Name_Select!="") {

    $('#liste_Tableaux').hide();
    //$('#NewTableauBtn').hide();
    this.setState({disabled_new_tableau:true})
    $('#liste_Tableaux_Input').show();
    $('#liste_Rapport_Input').show();
    $('#Selected_tableau_data').show();
    $('#Selected_tableau_Master').show();
    this.state.statutTableau=true;
    console.log('this.state.statutTableau',this.state.statutTableau)
    }else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: "S'il vous plait sélectionnez un rapport"
      })
    }

  }
  componentDidUpdate() {
    localStorage.removeItem('acesscode')
    this.state.Security_Group = localStorage.getItem('acesscode')
    localStorage.removeItem('acesscode')
    //////

  }
  AjouterMl() {
    if (this.state.Name_Ml != "" && this.state.ml_Membre_Select_fin.length != 0) {
      this.setState({
          modal2: !this.state.modal2
      });
      this.setState({ ML_Name: this.state.Name_Ml })
  }
  }
  AjouterCl() {
    //console.log("this.state.cl_Membre_Select_fin.length",this.state.cl_Membre_Select_fin.length)
    //console.log("this.state.cl_Membre_Select_fin",this.state.cl_Membre_Select_fin)
    //console.log("this.state.Name_Cl",this.state.Name_Cl)

    if (this.state.Name_Cl != "" && this.state.cl_Membre_Select_fin.length != 0) {
      this.setState({
          modal4: !this.state.modal4
      });
      this.setState({ CompteurListI_Name: this.state.Name_Cl })
  }
  
  }
  AjouterTl() {
    if(this.state.Name_Tl!=""&&this.state.Code_Tl!=""){
      this.setState({
          modal5: !this.state.modal5
      });
      this.setState({ tl_name: this.state.Name_Tl })
      this.setState({ tl_id: this.state.Code_Tl })
  } 
  }
  handleListeTLClick = (id, name, membre)=> {
    //console.log(id, name, membre[0].Tl_Sql)
    this.setState({ Code_Tl: id })
    this.setState({ Name_Tl: name })
    this.setState({ tl_members: membre[0].Tl_Sql })
}

  handleListeMLClick=(id, name, membre) =>{
    //console.log(id, name, membre)
    this.setState({ Code_Ml: id })
    this.setState({ Name_Ml: name })
    this.setState({ ML_Membre: membre })
}
  handleListeCompteurClick(id, name, membre, e) {
    //console.log("-------****----------****---------***------->",id, name, membre)
    this.setState({ Code_Cl: id })
    this.setState({ Name_Cl: name })
    this.setState({ CL_Membre: membre })
  }
  SelectedTableauClick(){
    $('#liste_Tableaux').show();
    $('#NouveauTableaux').hide();
    $('#Tl_Var_Fix').hide();
    $('#Ml_Var_Fix').hide();
    $('#Cl_Var_Fix').hide();

  }
  CL_Tags_Function=(name)=> {
    //console.log("jjjjjjjjjjjj", name)
    if (name != "") {
        this.setState({ Code_Cl: "*" })
        this.setState({ Name_Cl: name })
    }
}
ML_Tags_Function=(name)=> {
    //console.log("jjjjjjjjjjjj", name)
    if (name != "") {
        this.setState({ Code_Ml: "*" })
        this.setState({ Name_Ml: name })
    }
}
modelCl=(cl_Membre_Select)=> {
  this.setState({ cl_Membre_Select_fin: cl_Membre_Select })
  //console.log("llllllllllllllllllllllllllllllllllllll", cl_Membre_Select)
}

modelMl=(ml_Membre_Select)=> {
  this.setState({ ml_Membre_Select_fin: ml_Membre_Select })
  //console.log("llllllllllllllllllllllllllllllllllllll", ml_Membre_Select)
}
outAllFiltred=()=>{

}
outSelected=(Repport_selected)=>{
  console.log("***********************Repport_selected*******************",Repport_selected)
  $('#editorFalse').show();
    $('#editorTrue').hide();
    this.state.editor=false
    this.state.Report_Name_Select= Repport_selected.Report_Name;
    this.state.CodeRapportSelected = Repport_selected.Report_Code;
    this.state.Report_TableauCode = Repport_selected.Report_TableauCode;
    this.state.Report_TableauName = Repport_selected.Report_TableauName;
    this.state.Access_Groupe_User = Repport_selected.Access_Groupe_User;

  this.setState({ Selected_Global2: Repport_selected.Selected_Global })
            console.log("Selected_Global2",this.state.Selected_Global2)
  for (var i = 0; i < this.state.Selected_Global2.length; i++) {
    if (this.state.Selected_Global2[i].Dim_type == "FIX") {
      if (this.state.Selected_Global2[i].Dim == "CL") {
        this.setState({ ClDisabled: true })
       
      }
      if (this.state.Selected_Global2[i].Dim == "ML") {
        this.setState({ MlDisabled: true })
      }
      if (this.state.Selected_Global2[i].Dim == "TL") {
        this.setState({ TlDisabled: true })
      }
    }
    if (this.state.Selected_Global2[i].Dim_type == "VAR") {
      if (this.state.Selected_Global2[i].Dim == "CL") {
        this.setState({ ClDisabled: false })
      }
      if (this.state.Selected_Global2[i].Dim == "ML") {
        this.setState({ MlDisabled: false })
      }
      if (this.state.Selected_Global2[i].Dim == "TL") {
        this.setState({ TlDisabled: false })
      }
    }
  }
  ////console.log("Selected_Global2",this.state.Selected_Global2)
  //////////////////////////////////////////////////////////////////


  this.setState({ Rapport_Body: Repport_selected.Body })
  console.log("-----Rapport_Body-----",this.state.Rapport_Body)
  ////console.log('data json ',this.state.Rapport_Body.objects)



}

MesuresListes(){
  window.open("/Rapporteur/MesuresListes")
}
CL(){
  window.open("/Rapporteur/Compteur_Listes")
}
tl(){
  window.open("/Rapporteur/TimeIntelligence")
}
  render() {
    const { errors } = this.state;
    const { errorsNewTableau } = this.state;
    const { errorsSelectedTableau } = this.state;
    return (

      <div>

        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem >Rapports</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          <MDBBtn  color="#e0e0e0 grey lighten-2" onClick={this.toggle} style={{width: "196px"}}>Nouveau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>


          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg"  centered>
            <MDBModalHeader toggle={this.toggle} >Éditeur / {this.state.NameMenu}</MDBModalHeader>

            <MDBModalBody>

              <MDBRow>
                <MDBCol md="12">

                  <MDBTabContent activeItem={this.state.items["default"]}>
                    <MDBTabPane tabId="1">
                      <MDBRow>

                      <MDBCol size="6">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Tableau <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                       
                          <MDBBtn     color="#bdbdbd grey lighten-1" className="btnNouveauTableau" id="NewTableauBtn" style={{ marginTop: '0px', width: "97%", height: "52%" }} onClick={() => this.NouveauTableauClick()} disabled={this.state.disabled_new_tableau}> Nouveau Tableau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>
                        </MDBCol>
                        <MDBCol size="6" id="selectionTableau" >
                          <MDBBtn color="#bdbdbd grey lighten-1" className="btnNouveauTableau" style={{ marginTop: '32px', width: "97%", height: "52%" }} onClick={() => this.SelectedTableauClick()} disabled={this.state.disabled_selected_tableau} > Sélectionner Tableau <MDBIcon icon="mouse-pointer" className="ml-1"/></MDBBtn>

                        </MDBCol>
                        <MDBCol size="12" id="liste_Tableaux" className="option">

                          <br />
                          <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>


                            <MDBRow>
                              
          <MDBCol size="12">
        <FilterV1 filterName={"Rapport"}
            outSelected={this.outSelected}
            outAllFiltred={this.outAllFiltred}
            filter={[{ Report_TableauName: "Tableaux" },{ TAGS: "Mot Clé" },{ Report_Master: "Master" }]}
            display={{ separator: "", elems: ["Report_Name"] }}
            //data={this.state.array_data_rapport}
            data={this.state.array_data_rapport}
            styleScroll={ {width: "420px", maxHeight: "210px"} }
            btnEdit={false} />
            </MDBCol>
                             
            </MDBRow>
                            <MDBCol size="12">
                              <MDBBtn color="#e0e0e0 grey lighten-2" className="float-right" onClick={() => this.ajouterTableauxExiste()}>Ajouter</MDBBtn>
                            </MDBCol>
                       
                          </fieldset>

                        </MDBCol>
                        <MDBCol size="12" id="NouveauTableau" className="option">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Le Nouveau Tableau
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Nom" value={this.state.Nom} className="form-control" disabled />


                        </MDBCol>
                        <MDBCol size="12" id="liste_Tableaux_Input" /*style={{marginTop:"-50px"}}*/ className="option">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                          Tableau Sélectionnez
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_TableauName" value={this.state.Report_TableauName} className="form-control" disabled />


                        </MDBCol>
                        <MDBCol size="12" id="liste_Rapport_Input" /*style={{marginTop:"-50px"}}*/ className="option">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                          Rapport Sélectionnez
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_Name_Select" value={this.state.Report_Name_Select} className="form-control" disabled />


                        </MDBCol>
                        <MDBCol size="12" id="NouveauTableaux" className="option">

                          <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

                            <legend style={{ width: "280px", color: "#51545791", fontSize: "20px" }}>Création d'une Nouveau tableau</legend>
                            <MDBRow>
                              <MDBCol size="12">
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                  Nom Tableaux
                                </label> <span className='text-danger' style={{ fontSize: '12px'}}>*</span>

                                <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" required name="Nom" value={this.state.Nom} onChange={this.handleChange} />
                              </MDBCol>
                              {errorsNewTableau.Nom.length > 0 &&
                                <span className='text-danger' style={{ fontSize: '12px', marginLeft:'2%' }}>{errorsNewTableau.Nom}</span>}
                              <MDBCol size="12">
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                  Security Groupe
                                </label> <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                <MultiSelectAll name="Security_Group" value={this.state.Security_Group} onChange={this.handleChange} />
                                {errorsNewTableau.Security_Group.length > 0 &&
                                  <span className='text-danger' style={{ fontSize: '12px' }}>{errorsNewTableau.Security_Group}</span>}
                              </MDBCol>
                              <MDBCol size="12">
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                  Description
                                </label>

                                <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" required name="DescriptionTableaux" value={this.state.DescriptionTableaux} onChange={this.handleChange} />
                              </MDBCol>
                              <MDBCol size="12">
                                <MDBBtn color="#e0e0e0 grey lighten-2" className="float-right" onClick={() => this.AjouterNouveauTableauClick()}>Ajouter nouveau tableau</MDBBtn>
                              </MDBCol>
                            </MDBRow>

                          </fieldset>

                        </MDBCol>

                       
      
                      </MDBRow>
           
                    </MDBTabPane>
                    <MDBTabPane tabId="2">
                  <MDBRow>
                  <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>

                          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Report_Name" value={this.state.Report_Name} onChange={this.handleChange} className="form-control" required />
                          {errors.Report_Name.length > 0 &&
                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Report_Name}</span>}

                        </MDBCol>
                        <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Mots clés
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="TAGS" value={this.state.TAGS} onChange={this.handleChange} className="form-control" required />
                        </MDBCol>



                        <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Description
                          </label>

                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_Description" value={this.state.Report_Description} onChange={this.handleChange} className="form-control" required />
                        </MDBCol>

                        <MDBCol size="12" id="Selected_tableau_Master" className="option">
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                  Rapport c'est un master? <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                </label>
                                <select size="2" className="browser-default custom-select" name="Report_Master" value={this.state.Report_Master} onChange={this.handleChange}>

                                  <option value="Oui" >Oui</option>
                                  <option value="Non" >Non</option>
                                </select>
                              </MDBCol>
                              
                              <MDBCol size="12" className="option" id="Selected_tableau_data">
                                <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

                                  <legend style={{ width: "219px", color: "#51545791", fontSize: "20px" }} >Sélectionner les données</legend>

                                  <MDBRow>
                                    <MDBCol size="4" style={{ marginTop: "-10px" }}>
                                      <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.ClDisabled}
                                        style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle4}>
                                        Compteurs Listes
                                      </MDBBtn>
                                    </MDBCol >
                                    <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >{this.state.CompteurListI_Name}</b></MDBCol>
                                  </MDBRow>
                                  <MDBRow>
                                    <MDBCol size="4" >
                                      <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.MlDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%"/* ,   marginTop: "14px"*/ }} onClick={this.toggle2}>
                                        Mesures Listes
                                      </MDBBtn>

                                    </MDBCol>
                                    <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.ML_Name}</b></MDBCol>
                                  </MDBRow>
                                  <MDBRow>

                                    <MDBCol size="4" /*style={{ marginTop: "14px" }}*/>
                                      <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.TlDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%" /*,marginTop: "14px"*/ }} onClick={this.toggle5}>
                                        Time Intelligence
                                      </MDBBtn>

                                    </MDBCol>
                                    <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.tl_name}</b></MDBCol>
                                  </MDBRow>
                                </fieldset>
                              </MDBCol>
                           



                        <MDBCol size="4" id="Cl_Var_Fix" className="option">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text"  >
                            Compteurs Listes
                          </label>
                          <select className="browser-default custom-select" name="Cl_Var_Fix" onChange={this.handleChange} value={this.state.Cl_Var_Fix} >
                            <option></option>
                            <option value="Variable">Variable</option>
                            <option value="Fixe">Fixe</option>
                          </select>

                        </MDBCol>
                        <MDBCol size="4" id="Ml_Var_Fix" className="option">

                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                            Mesures Listes
                          </label>
                          <select className="browser-default custom-select" name="Ml_Var_Fix" onChange={this.handleChange} value={this.state.Ml_Var_Fix} >
                            <option></option>
                            <option value="Variable">Variable</option>
                            <option value="Fixe">Fixe</option>
                          </select>

                        </MDBCol>
                        <MDBCol size="4" id="Tl_Var_Fix" className="option">

                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                            Time Intelligence
                          </label>
                          <select className="browser-default custom-select" name="Tl_Var_Fix" onChange={this.handleChange} value={this.state.Tl_Var_Fix} >
                            <option></option>
                            <option value="Variable">Variable</option>
                            <option value="Fixe">Fixe</option>
                          </select>

                        </MDBCol>

                 
                  </MDBRow>
                    </MDBTabPane>
                    <MDBTabPane tabId="3">
                      <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                          Sélectionner le format du rapport
                        </label>
                        <MDBRow>
                          <MDBCol size="12">
                            <input type="text" id="1" id="defaultFormLoginEmailEx" name="formatRapport" className="form-control" value={this.state.formatRapport} onChange={this.handleChange} disabled style={{ textAlign: "center" }} />
                          </MDBCol>
                          <br />
                        </MDBRow>
                        <MDBRow style={{ marginLeft: "20%" }}>
                          <br />
                          <MDBCol >
                            <br />
                            <fieldset id="PortraitActive" className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "167px", height: "auto" }}>
                              <MDBBtn  size="sm" style={{ width: "132px", height: "171px" }} value={this.state.Portrait} onClick={() => this.handleClick(this.state.Portrait)} >Portrait</MDBBtn>
                            </fieldset>

                            <fieldset id="PaysageActive" className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "230px", height: "auto", marginLeft: "200px", marginTop: "-188px" }}>
                              <MDBBtn  size="sm" style={{ width: "190px", height: "112px" }} value={this.state.Paysage} onClick={() => this.handleClick(this.state.Paysage)}>Paysage</MDBBtn>
                            </fieldset>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBTabPane>
                    <MDBTabPane tabId="4" >
                      <div id="editorTrue" className="option">
                        {this.state.layoutFormat && <GenerateTable
                          handleObjectjson={this.handleObjectjson}
                          editor={true}
                          QueryApi={this.state.QueryApi}
                          Tl_Var_Fix={this.state.Tl_Var_Fix}
                          Ml_Var_Fix={this.state.Ml_Var_Fix}
                          Cl_Var_Fix={this.state.Cl_Var_Fix}
                          maxCols={this.state.maxCols}
                          maxRows={this.state.maxRows}
                          style={{ height: this.state.layoutFormat.height, width: this.state.layoutFormat.width }} />}
                      </div>
                      <div id="editorFalse" className="option">
                        {this.state.layoutFormat && this.state.GenerateTableActive &&
                          <div>


                            <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} maxCols={10} maxRows={10} style={{ width: this.state.layoutFormat.width, height: this.state.layoutFormat.height }}
                            />  </div>}
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBNav  className="nav-tabs mt-5" /*color='indigo'*/  style={{ backgroundColor: "#e0e0e0",marginTop:"-10%" }}   >

              <MDBNavItem style={{width:"25%",textAlign: "center"}}>
                <MDBNavLink /*id="ItemTab1"*/  link to="#" active={this.state.items["default"] === "1"} value={this.state.Entete} onClick={this.togglePills("default", "1", this.state.Entete1)} style={{color:"#000"}} >
                 Tableaux
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem style={{width:"25%",textAlign: "center"}}>
                <MDBNavLink /*id="ItemTab2"*/  link to="#" active={this.state.items["default"] === "2"} value={this.state.Entete} onClick={this.togglePills("default", "2", this.state.Entete2)} style={{color:"#000"}}>
                 Nouveau Rapoort
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem style={{width:"25%",textAlign: "center"}}>
                <MDBNavLink link to="#" active={this.state.items["default"] === "3"} value={this.state.Disposition} onClick={this.togglePills("default", "3", this.state.Disposition_Rapoort)} style={{color:"#000"}}>
                  Disposition Rapoort
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem style={{width:"25%",textAlign: "center"}}>
                <MDBNavLink link to="#" active={this.state.items["default"] === "4"} value={this.state.Corps} onClick={this.togglePills("default", "4", this.state.Corps)} style={{color:"#000"}}>
                  Corps Rapoort
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

            {this.state.validAjouter==true ?(<MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }}  disabled={true}  onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>):null}  
            </MDBModalFooter>
          </MDBModal>
          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" style={{width: "196px"}} disabled={true}>Modifier <MDBIcon icon="pen-square"  className="ml-1" /></MDBBtn>
          <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} size="lg" centered>
            <MDBModalHeader toggle={this.toggle1} >Modifier Rapport / {this.state.NameMenu}</MDBModalHeader>
            <MDBModalBody>

              <MDBRow>
                <MDBCol md="12">

                  <MDBTabContent activeItem={this.state.items["default"]}>
                    <MDBTabPane tabId="1">
                      <MDBRow>
                        <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                          </label>
                          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Report_Name" value={this.state.Report_Name} onChange={this.handleChange} className="form-control" required />
                          {/* {errors.Report_Name.length > 0 &&<span className='text-danger' style={{ fontSize: '12px' }}>{errors.Report_Name}</span>} */}
                        </MDBCol>
                        <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Mots clés
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="TAGS" value={this.state.TAGS} onChange={this.handleChange} className="form-control" required />
                        </MDBCol>
                        <MDBCol size="12">
                          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Description
                          </label>
                          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_Description" value={this.state.Report_Description} onChange={this.handleChange} className="form-control" required />
                        </MDBCol>
                        <MDBCol size="12" id="liste_Tableaux" >
                          <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

                            <legend style={{ width: "250px", color: "#51545791", fontSize: "20px" }}>Sélectionner les données </legend>

                            <MDBRow>
                              <MDBCol size="4" style={{ marginTop: "-10px" }}>
                                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.ClDisabled}
                                  style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle4}>
                                  Compteurs Listes
                                </MDBBtn>
                              </MDBCol >
                              <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >{this.state.CompteurListI_Name}</b></MDBCol>
                            </MDBRow>
                            <MDBRow>
                              <MDBCol size="4" >
                                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.MlDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%"/* ,   marginTop: "14px"*/ }} onClick={this.toggle2}>
                                  Mesures Listes
                                </MDBBtn>

                              </MDBCol>
                              <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.ML_Name}</b></MDBCol>
                            </MDBRow>
                            <MDBRow>

                              <MDBCol size="4" /*style={{ marginTop: "14px" }}*/>
                                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.TlDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%" /*,marginTop: "14px"*/ }} onClick={this.toggle5}>
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
                      <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                          Sélectionner le format du rapport
                        </label>
                        <MDBRow>
                          <MDBCol size="12">
                            <input type="text" id="1" id="defaultFormLoginEmailEx" name="formatRapport" className="form-control" value={this.state.formatRapport} onChange={this.handleChange} disabled style={{ textAlign: "center" }} />
                          </MDBCol>
                          <br />
                        </MDBRow>
                        <MDBRow style={{ marginLeft: "25%" }}>
                          <br />
                          <MDBCol >
                            <br />
                            <fieldset id="PortraitActive" className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "140px", height: "auto" }}>
                              <MDBBtn size="sm" style={{ width: "100px", height: "150px" }} value={this.state.Portrait} onClick={() => this.handleClick(this.state.Portrait)}>Portrait</MDBBtn>
                            </fieldset>

                            <fieldset id="PaysageActive" className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "190px", height: "auto", marginLeft: "160px", marginTop: "-170px" }}>
                              <MDBBtn size="sm" style={{ width: "150px", height: "90px" }} value={this.state.Paysage} onClick={() => this.handleClick(this.state.Paysage)}>Paysage</MDBBtn>
                            </fieldset>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBTabPane>
                    <MDBTabPane tabId="3" >

                      <div>
                        {this.state.layoutFormat && this.state.GenerateTableActive &&
                          <div>
                            <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} maxCols={4} maxRows={4} style={{ width: this.state.layoutFormat.width, height: this.state.layoutFormat.height }}
                            />  </div>}
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >
              <MDBNavItem>
                <MDBNavLink link to="#" active={this.state.items["default"] === "1"} value={this.state.Entete} onClick={this.togglePills2("default", "1", this.state.Entete)} >
                  Entête
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink link to="#" active={this.state.items["default"] === "2"} value={this.state.Disposition} onClick={this.togglePills2("default", "2", this.state.Disposition)} >
                  Disposition
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink link to="#" active={this.state.items["default"] === "3"} value={this.state.Corps} onClick={this.togglePills2("default", "3", this.state.Corps)} >
                  Corps
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>
              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.modifier}> <MDBIcon far icon="edit" />   Modifier</MDBBtn>

            </MDBModalFooter>
          </MDBModal>

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} style={{width: "196px"}}>Copier <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} style={{width: "196px"}}> Enregistrer <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          <div>
            <div className="tabulator"  ref={el => (this.el = el)} /></div>
     
        </div>
        <div>
          {/**    Mesures Listes Modale */}

          <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} centered size="lg">
  
                        <ModalML toggle2={this.toggle2} ML_Tags_Function={this.ML_Tags_Function} Code_Ml={this.state.Code_Ml} Name_Ml={this.state.Name_Ml} handleChange={this.handleChange} modelMl={this.modelMl}  Listes_Ml={this.state.Listes_Ml} handleListeMLClick={this.handleListeMLClick} ML_Membre={this.state.ML_Membre} />
               
            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={()=>this.MesuresListes()} style={{color:"#000"}} >
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>


            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterMl}
              > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/**    Compteurs Listes Modale */}
          <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered size="lg">
        

             <ModalCL toggle4={this.toggle4} CL_Tags_Function={this.CL_Tags_Function} handleChange={this.handleChange} modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} />

            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={()=>this.CL()} style={{color:"#000"}} /*active={items["default"] === "2"} value={this.state.Disposition} onClick={this.togglePills("default", "2", this.state.Disposition)} */>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterCl}
              > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/**    Time Intelligence Modale */}
          <MDBModal isOpen={this.state.modal5} toggle={this.toggle5} centered  size="lg">
          
            <ModalTL Listes_TL={this.state.Listes_TL} handleChange={this.handleChange} handleListeTLClick={this.handleListeTLClick} toggle5={this.toggle5} />


            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={()=>this.tl()} style={{color:"#000"}} /*active={items["default"] === "2"} value={Disposition} onClick={this.togglePills("default", "2", Disposition)} */>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterTl}
              > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </div>
      </div>
    );
  }
}

export default Rapport;