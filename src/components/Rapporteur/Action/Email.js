
import React, { useEffect, useState } from "react";
import Tabulator from "tabulator-tables";
import axios from 'axios';
import axios1 from '../../axios';
import "../CasEmail.css"
import uuid from 'react-uuid';
import Moment from 'moment';
import GenerateTable from '../Rapport/layoutGen/layoutGenerator';
import { MDBContainer, MDBInputGroup, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Swal from 'sweetalert2';
import Navbar from "../../navbar";
import FilterV1 from '../../filterV1';
import Modal_TL_V2 from "../../Modal/Modal_TL_V2";
import Modal_CL_V2 from "../../Modal/Modal_CL_V2";
import Modal_ML_V2 from "../../Modal/Modal_ML_V2";
import { ReactTabulator, reactFormatter } from 'react-tabulator'

const validateForm = (errors) => {
  let valid = true;
  console.log(errors)
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Email extends React.Component {


 
  componentDidMount() {
    //getdate
    this.getDate();


    //////////

  
    /// api tabulator display EventEMail

    axios1.get(window.apiUrl + "getEmails/"

     

    )

      .then(
        (result) => {
          //this.tableData = result.data;
          if (result.data !== null) {
            const dataglobale = result.data
            



            for (var i = 0; i < dataglobale.length; i++) {
          
              const Email_Code = dataglobale[i].Email_Code
              const Email_Nom = dataglobale[i].Email_Nom
              const Email_Subject = dataglobale[i].Email_Subject
              const Email_Body = dataglobale[i].Email_Body
              const Email_Description = dataglobale[i].Email_Description
          
              ////////Email_To
              if (dataglobale[i].Email_To.length == 0 || dataglobale[i].Email_Attachement.length == 0 ) {

                console.log("vide")
     

              } else {

                const To = [dataglobale[i].Email_To]
                
                To.forEach(element =>
                  this.state.Email_To_tab = element.Email_To)
              
                To.forEach(element =>
                  this.state.Email_To_tabCode = element.Code_To)
         

                ///// Attachement 

                const Attachement = [dataglobale[i].Email_Attachement]
            
                Attachement.forEach(element =>
                  this.state.Email_Attachement_tab = element.Email_Attachement)
             
                Attachement.forEach(element =>
                  this.state.Email_Attachement_tabCode = element.Code_Attachement)
               
                Attachement.forEach(element =>
                  this.state.Attachement_tab = element.Attachement)
         

                ///// email_cc 
              
                const CC = [dataglobale[i].Email_CC]
           
  if(dataglobale[i].Email_CC.length!=0 ){

                CC.forEach(element =>
                  this.state.Email_CC_tab = element.Email_CC
                )


                CC.forEach(element =>
                  this.state.Email_CC_tabCode = element.Code_CC
                )}
                const Email_To = this.state.Email_To_tab;
                const To_code = this.state.Email_To_tabCode;
                const Email_Attachement = this.state.Email_Attachement_tab;
                const Attachement_Code = this.state.Email_Attachement_tabCode;
                const Attachement2 = this.state.Attachement_tab;
                const Email_CC = this.state.Email_CC_tab;
                const cc_code = this.state.Email_CC_tabCode
              
                const dataEmail = { "Email_Code": Email_Code, "Email_Nom": Email_Nom, "Email_Subject": Email_Subject, "Email_Body": Email_Body, "Email_To": Email_To, "Email_Description": Email_Description, "Email_Attachement": Email_Attachement, "Email_CC": Email_CC, "Code_CC": cc_code, "Code_Attachement": Attachement_Code, "Code_To": To_code, "Attachement": Attachement2 }
  

                this.state.Email.push(dataEmail)
              }
          
            }
          }
          else {
            console.log("data Email est vide")
          }
       
this.setState({tableData:this.state.Email})

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

    axios1.get(window.apiUrl + "getMailingList/")

      .then(
        (result) => {
          if (result.data !== null) {
            
            this.setState({MailingList:result.data})
           
          }
          else {
            console.log("data MailingList est vide")
          }
        })
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Email_Nom: ' ',
      Email_To_Name: ' ',
      Email_Subject: ' ',
   
    }
    this.state.Email_Nom = "";
    this.state.Email_To_Name = "";
    this.state.Email_CC_Name = "";
    this.state.Email_Body = "";
    this.state.Email_Attachement = "";
    this.state.Attachement = "";
    this.state.Email_Description = "";
    this.state.Email_Subject = "";
    this.state.datamodifier=[];
  };
  toggle3 = () => {

      ////////////filter Reporting

      axios1.get(window.apiUrl + "getReports/?g")
      .then(
        (result) => {
          //result.data = result.data;
          if (result.data !== null) {
            this.setState({ listRapportglobal: result.data.reports })
            //   console.log("data filter Reporting");
            console.log("Reporting", this.state.listRapportglobal)
          } else {
            console.log('no data change')
          }


        }
      )  
      .catch(({response})=>{
                        
        console.log("---------",response)
        if(response!=null){
     if (response.status=="401"){
        
          window.location.assign("/")
          localStorage.clear();

     }}
  }
  )
    ////////
    if (this.state.datamodifier.length != 0) {
      this.setState({
        modal3: !this.state.modal3
      });
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 5000,
        icon: 'warning',
        width: 400,
        title: 'écraser Rapport existants'
      })
    
    } else {
      this.setState({
        modal3: !this.state.modal3
      });
    }
  }

  toggle6 = () => {
    this.setState({
      modal6: !this.state.modal6,
      Report_Name_Enregistrer:this.state.Report_Name
    });

    console.log("Selected_Global",this.state.Selected_Global)


    for (var i = 0; i < this.state.Selected_Global.length; i++) {
      if (this.state.Selected_Global[i].Dim == "CL") {
        
        this.setState({CompteurListI_Name:this.state.Selected_Global[i].Dim_label})
      } else if (this.state.Selected_Global[i].Dim == "ML") {
        this.setState({ML_Name:this.state.Selected_Global[i].Dim_label})
     
      } else if (this.state.Selected_Global[i].Dim == "TL") {
        this.setState({tl_name:this.state.Selected_Global[i].Dim_label.iot_name + "," + this.state.Selected_Global[i].Dim_label.cluster_name})
      }
    }
  }

  toggle1 = () => {
    axios1.get(window.apiUrl + "getMailingList/")

    .then(
      (result) => {
        if (result.data !== null) {
         
          this.setState({MailingList:result.data})
         
        }
        else {
          console.log("data MailingList est vide")
        }
      })
    if (this.state.datamodifier.length != 0) {
      this.setState({
        modal1: !this.state.modal1
      })
      this.state.errors = {
        Email_Nom: ' ',
        Email_To_Name: ' ',
        Email_Subject: ' ',
    
      }
      this.state.datamodifier.push();
      //console.log(this.state.datamodifier)
      this.state.Email_Code = this.state.datamodifier[0].Email_Code;
      this.state.Email_Nom = this.state.datamodifier[0].Email_Nom;
      this.state.Email_To_Name = this.state.Email_To = this.state.datamodifier[0].Email_To;
      //console.log("Email_To", this.state.Email_To)
      this.state.Email_CC_Name = this.state.Email_CC = this.state.datamodifier[0].Email_CC;
      // console.log("Email_CC", this.state.Email_CC)
      this.state.Email_Subject = this.state.datamodifier[0].Email_Subject;
      this.state.Email_Body = this.state.datamodifier[0].Email_Body;
      this.state.Email_Attachement = this.state.datamodifier[0].Email_Attachement;
      this.state.Code_Attachement=this.state.datamodifier[0].Code_Attachement;
      this.state.Email_CC_Code=this.state.datamodifier[0].Code_CC;
      this.state.Email_To_Code=this.state.datamodifier[0].Code_To;
      this.state.Attachement = this.state.datamodifier[0].Attachement;
      // console.log("Attachement", this.state.Attachement)
      this.state.Email_Description = this.state.datamodifier[0].Email_Description;
      this.state.To_internal = this.state.datamodifier[0].To_internal;
      this.state.CC_internl = this.state.datamodifier[0].CC_internl;
      this.state.Report_FactBook = this.state.datamodifier[0].Report_FactBook;

      this.state.position = this.state.datamodifier[1];
      /*
         var $ = require("jquery");
      
         if (this.state.datamodifier[0].Attachement=="Rapport") {
      
           $('#Rapport').show();
          
           
         }
         if (this.state.datamodifier[0].Attachement =="PowerBI") {
           $('#PowerBI').show();
       
         }
         if (this.state.datamodifier[0].Attachement=="FactBook") {
             $('#FactBook').show();
            
       
           }
      */



    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Veuillez sélectionner un Cas-Email à modifier'
      })
    }
  };

  ajouter() {

    self = this

    if (validateForm(this.state.errors) == true && this.state.Email_Attachement!="") {
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
          tablename: "Email_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Email_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {

            // this.state.Email_Code = result.data.substring(1, result.data.length-1);
            if (result.data !== null) {
              var code = result.data.split(", ")
              this.state.Email_Code = code
              console.log("Email_Code")
              console.log(this.state.Email_Code)
            } else {
              console.log('Email_Code est vide')


            }

            const Email_Code = this.state.Email_Code[0];
            const Email_Nom = this.state.Email_Nom;


            const Email_Subject = this.state.Email_Subject;
            const Email_Body = this.state.Email_Body;

            // const Email_Attachement = this.state.Email_Attachement;
            const Email_Description = this.state.Email_Description;
            const To_internal = this.state.To_internal;
            const CC_internl = this.state.CC_internl;
            const Report_FactBook = this.state.Report_FactBook;

            const DBAction = "2";


            ////////////////Email_To_Json
            this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]

            console.log("Email_To_Json", this.state.Email_To_Json)
            // const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
         
            const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
            //////////////Email_CC_Json
            this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
            console.log("Email_CC_Json", this.state.Email_CC_Json)
            // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
            var Email_CC_Json_Base = {}
            console.log("------------------------",this.state.Email_CC_Name!="" && this.state.Email_CC_Code!="")
            if(this.state.Email_CC_Name!="" && this.state.Email_CC_Code!=""){
             Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
          }else {
             Email_CC_Json_Base = {}
          }
            /////////////Email_Attachement_Json
            this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
            console.log("Email_Attachement", this.state.Email_Attachement_Json)
            //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);
            const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };

            //this.state.ajout = (Email_Code + ";" + Email_Nom + ";" + Email_Subject + ";" + Email_Body + ";" + Email_Description + ";" + To_internal + ";" + CC_internl + ";" + Report_FactBook + ";" + Email_Attachement_Json_Base + ";" + Email_To_Json_Base + ";" + Email_CC_Json_Base + ";" + DBAction)
            this.state.ajout = {
              "Email_Code": Email_Code,
              "Email_Nom": Email_Nom,
              "Email_Subject": Email_Subject,
              "Email_Body": Email_Body,
              "Email_Description": Email_Description,
              "To_internal": To_internal,
              "CC_internl": CC_internl,
              "Report_FactBook": Report_FactBook,
              "Email_Attachement": Email_Attachement_Json_Base,
              "Email_To": Email_To_Json_Base,
              "Email_CC": Email_CC_Json_Base,
              "DBAction": DBAction
            }
            this.state.ajoutertemp.push(this.state.ajout);
            ///////////////////////////
            ////////////////
            if (this.state.Report_Name_Enregistrer != 0) {
              const config = JSON.stringify(this.state.config)
              const config1 = config.replace(/'/g, "''")
              const config2 = JSON.parse(config1)
              this.state.ajoutertemprapport.push({
                "Report_Code": this.state.Code_Attachement,
                "Report_Name": this.state.Email_Attachement,
                "Report_TableauName": this.state.Report_TableauName,
                "Report_TableauCode": this.state.Report_TableauCode,
                "Report_Description": this.state.Report_Description,
                "Report_Master": "Non",
                "Report_EnergyCode": "",
                "Report_EnergyName": "",
                "Report_ViewCode": "",
                "Report_ViewName": "",
                "Report_PostCCode": "",
                "Report_PostCName": "",
                "Auteur": this.state.Auteur,
                "Body": config2,
                "Selected_Global": this.state.Selected_Global_Enregistrer,
                "Html": "",
                "TAGS": this.state.TAGS_New,
                "SHAH1_code": this.state.SHAH1_code,
                "Access_Groupe_User": this.state.Access_Groupe_User,
                "disposition": this.state.disposition,
                "DBAction": "2"
              })

            }
            /////////////////
            /////////////Email_To
            const Email_To = this.state.Email_To_Json[0].Email_To;
            console.log("Email_To", Email_To)
            /////////////Email_CC
            const Email_CC = this.state.Email_CC_Json[0].Email_CC;
            console.log("Email_CC", Email_CC)
            /////////////Attachement
            const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
            console.log("Email_Attachement", Email_Attachement)
            const Code_To=this.state.Email_To_Code
            const Code_CC=this.state.Email_CC_Code
            const Code_Attachement=this.state.Code_Attachement
            const Attachement= this.state.Attachement
            //////////// ajouter dans tabulator
            this.table.current.table.addRow({ Email_Code, Email_Nom, Email_To,Code_To, Email_CC,Code_CC, Email_Subject, Email_Body, Email_Attachement,Code_Attachement, Email_Description,Attachement }, true);
         
        

            ////////////           
            this.state.Email_Nom = "";
            this.state.Email_To = "";
            this.state.Email_CC = "";
            this.state.Email_Subject = "";
            this.state.Email_Body = "";
            this.state.Email_Attachement = "";
            this.state.Email_Description = "";


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
        title: 'Veuillez remplir tous les champs obligatoires'
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

    const Email_Code = this.state.Email_Code;
    const Email_Nom = this.state.Email_Nom;


    const Email_Subject = this.state.Email_Subject;
    const Email_Body = this.state.Email_Body;

    // const Email_Attachement = this.state.Email_Attachement;
    const Email_Description = this.state.Email_Description;
    const To_internal = this.state.To_internal;
    const CC_internl = this.state.CC_internl;
    const Report_FactBook = this.state.Report_FactBook;

    const DBAction = "1";


    ////////////////Email_To_Json
    

         console.log("-----------","Code_To", this.state.Email_To_Code )

         console.log("-----------","Code_CC", this.state.Email_CC_Code)

         console.log("-----------","Code_Attachement", this.state.Code_Attachement)

    this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]
    console.log("Email_To_Json--------------------------------------->>>>>>>>>>>>>>>>>>", this.state.Email_To_Json)
    //const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
    const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
    //////////////Email_CC_Json
    this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
    console.log("Email_CC_Json", this.state.Email_CC_Json)
    // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
    const Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
    /////////////Email_Attachement_Json
    this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
    const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };
    console.log("Email_Attachement", this.state.Email_Attachement_Json)
    //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);

    // push with modificationtemp 
    this.state.modificationtemp.push(
      {
        "Email_Code": Email_Code,
        "Email_Nom": Email_Nom,
        "Email_Subject": Email_Subject,
        "Email_Body": Email_Body,
        "Email_Description": Email_Description,
        "To_internal": To_internal,
        "CC_internl": CC_internl,
        "Report_FactBook": Report_FactBook,
        "Email_Attachement": Email_Attachement_Json_Base,
        "Email_To": Email_To_Json_Base,
        "Email_CC": Email_CC_Json_Base,
        "DBAction": DBAction
      });
    console.log(this.state.modificationtemp);


    if (this.state.Report_Name_Enregistrer != 0) {
      const config = JSON.stringify(this.state.config)
      const config1 = config.replace(/'/g, "''")
      const config2 = JSON.parse(config1)
      this.state.ajoutertemprapport.push({
        "Report_Code": this.state.Code_Attachement,
        "Report_Name": this.state.Email_Attachement,
        "Report_TableauName": this.state.Report_TableauName,
        "Report_TableauCode": this.state.Report_TableauCode,
        "Report_Description": this.state.Report_Description,
        "Report_Master": "Non",
        "Report_EnergyCode": "",
        "Report_EnergyName": "",
        "Report_ViewCode": "",
        "Report_ViewName": "",
        "Report_PostCCode": "",
        "Report_PostCName": "",
        "Auteur": this.state.Auteur,
        "Body": config2,
        "Selected_Global": this.state.Selected_Global_Enregistrer,
        "Html": "",
        "TAGS": this.state.TAGS_New,
        "SHAH1_code": this.state.SHAH1_code,
        "Access_Groupe_User": this.state.Access_Groupe_User,
        "disposition": this.state.disposition,
        "DBAction": "2"
      })

    }
    /////////////Email_To
    const Email_To = this.state.Email_To_Json[0].Email_To;
    console.log("Email_To", Email_To)
    /////////////Email_CC
    const Email_CC = this.state.Email_CC_Json[0].Email_CC;
    console.log("Email_CC", Email_CC)
    /////////////Attachement
    const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
    console.log("Email_Attachement", Email_Attachement)
  
    const Attachement= this.state.Attachement
    const Code_To=this.state.Email_To_Code
    const Code_CC=this.state.Email_CC_Code
    const Code_Attachement=this.state.Code_Attachement


    console.log("testttttt  " + [Email_Code,Attachement, Email_Nom,Code_To, Email_To,Code_CC, Email_CC, Email_Subject,Code_Attachement, Email_Body, Email_Attachement, Email_Description])
    
    const aaa= {
      Email_Code, Email_Nom, Email_To, Email_CC, Email_Subject, Email_Body, Email_Attachement, Email_Description
    }
    this.table.current.table.updateData([aaa])
    
    
    this.state.Email_Nom = "";
    this.state.Email_To = "";
    this.state.Email_CC = "";
    this.state.Email_Subject = "";
    this.state.Email_Body = "";
    this.state.Email_Attachement = "";
    this.state.Email_Description = "";

  }

  Enregistrer() {
    console.log("Email_Code", this.state.Email_Code,
      "supprimertemp", this.state.supprimertemp.length,
      "   ajoutertemp", this.state.ajoutertemp.length,
      "   modificationtemp", this.state.modificationtemp.length,this.state.modificationtemp
    )
    if (this.state.ajoutertemp.length != 0 || this.state.modificationtemp.length != 0 || this.state.supprimertemp.length != 0) {


      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "Email_V3",
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
          if (response.data.length != 0) {
            Swal.fire({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              width: 300,
              icon: 'success',
              title: 'Vos données ont été enregistrées avec succès.'

            })
            if (this.state.ajoutertemprapport.length != 0) {
              axios.post(window.apiUrl + "updatedelete/", {
                tablename: "Reporting_V3",
                identifier: this.state.dateDMY + uuid(),
                datatomodified: [].concat(this.state.ajoutertemprapport),
              }
              )
                .then((response) => {
                  console.log("Enregistrer Rapport");
                  console.log(response.status);
                  console.log(response.statusText);
                  console.log(response);
                  console.log(response.data);


                })
            }
            setTimeout(function () {
              window.location.reload(1);
            }, 500);
            this.setState({
              BtnAjouterRapportCloner:false,
              modalDelete: false,
              cellName: "",
              cellTable:"",
              //////////////
              modal: false,
              modal1: false,
              modal2: false,
              modal3: false,
              modal4: false,
              modal5: false,
              modal6: false,
              modal7: false,
              Email_Nom: "",
              Email_To: "",
              Email_To_Json: [],
              Email_CC_Json: [],
              Email_Attachement_Json: [],
              Email_CC: "",
              Email_Code: "",
              Email_Description: "",
              Email_Subject: "",
              Email_Body: "",
              Email_Attachement: "",
              Email: [],
              To_internal: "",
              CC_internl: "",
              Report_FactBook: "",
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
              // PowerBI: [],
              FactBook: [],
              Email_To_Name: "",
              Email_To_Code: "",
              Email_CC_Name: "",
              Email_CC_tab: "",
              Email_To_tab: "",
              Email_CC_tabCode: "",
              Email_To_tabCode: "",
              Email_Attachement_tabCode: "",
              Attachement_tab: "",
              Email_Attachement_tab: "",
              Email_CC_Code: "",
              //   PowerBI_Code: "",
              MailingList: [],
              Attachement: "",
              MailingList_Code: "",
              Code_FactBook: "",
              Code_Compteur: "",
              NameEnergy: '',
              EnergyMeasure: '',
              Tableaux: '',
              energie: '',
              view: '',
              unite: '',
              unite1: '',
              Sys_mesureid: '',
        
              listNameEnergy: [],
              LeCompteur: [],
              dataCompteur: [],
              dataEnergyMeasure: [],
              dataEnergy: [],
              listRapportglobal: [],
        
              listfieldfiltername: [],
              listfieldfiltercontent: [],
              listTableau: [],
              listenergie: [],
              listview: [],
              listunite: [],
              codeunite: [],
              U_Rapportselected: "",
              position: null,
              ////////////
        
        
              listTableau: [],
              listTAGS: [],
              listMaster: [],
              Listes_TL: [],
              Listes_Ml: [],
              Listes_Cl: [],
              Listes_Cl2: [],
              Tableaux: '',
              Master: '',
              TAGS: "",
              Code_Cl: "",
              Name_Cl: "",
              Code_Ml: "",
              Name_Ml: "",
              Name_Tl: "",
              Code_Tl: "",
              BtnMlDesibled: false,
              BtnClDesibled: false,
              BtnTlDesibled: false,
              BtnEnregistreDesibled: true,
              tl_members: [],
              tl_name: "",
              tl_id: "",
              BooleanVar_CL: false,
              BooleanVar_ML: false,
              BooleanVar_TL: false,
              cl_Membre_Select_fin: [],
              ml_Membre_Select_fin: [],
              Selected_Global: [],
              CL_Membre: [],
              ML_Membre: [],
              Le_Compteur_Liste: [],
              m_name_Liste: [],
              CompteurListI_Name: "",
              ML_Name: "",
              filterNameRapport: [],
              Report_Name: "",
              RapportAfficher: [],
              Report_TableauCode: "",
              Report_TableauName: "",
              Selected_Global: [],
              Access_Groupe_User: "",
              disposition: "",
              editRapport: null,
              Report_Name_Enregistrer: "",
              items: {
                default: "1",
              },
              /////////
              GenerateTableActive: false,
              AjouterRapport: false,
              config: null,
              layoutFormat: null,
              Report_Code_Enregistrer: "",
              /////
              ajoutertemprapport: [],
              Report_Description: "",
              Report_TableauCode: "",
              Report_TableauName: "",
              TAGS_New: "",
              SHAH1_code: "",
              disposition: "",
              Access_Groupe_User: "",
              ///////////////////
              listesFactbook: [],
              NomFactbbok: "",
              Factbook_Membre: [],
              //////////////////
              tl_name_IOT:"",
              tl_id_IOT:"",
              tl_name_cluster:"",
              tl_id_cluster:"",
            })

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
        title: 'Veuillez créer ou modifier un Email'
      })
    }
  }
  logValue = value => {
    console.log(value);
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    /////////////////////////////////////////////////////
    const { name, value } = e.target;
    console.log("---------",this.state.Email_Attachement,this.state.Email_To_Name)
    let errors = this.state.errors;
    switch (name) {
      case 'Email_Nom':
        errors.Email_Nom =
          value.length < 5 /* && typeof value.length == "string" */
            ? 'Veuillez saisir un nom d’mail d\'au moins 5 caractères'
            : '';
        break;
      case 'Email_To_Name':
        errors.Email_To_Name =
          value.length < 1
            ? 'Le champs Email-to ne peut pas être vide . Veuillez saisir une entrée valide.'
            : '';
        break;

      
      case 'Email_Subject':
        errors.Email_Subject =
          value.length < 5
            ? 'Veuillez saisir un nom d’mail d\'au moins 5 caractères'
            : '';
        break;


      default:
        break;
    }

    this.setState({ errors, [name]: value });

    ////////////////////////////////////////////////////
    var $ = require("jquery");

    if (e.target.value == "Rapport") {

      $('#Rapport').show();
      //  $('#PowerBI').hide();
      $('#FactBook').hide();
      ;
    }
    // if (e.target.value == "PowerBI") {
    //   $('#PowerBI').show();
    //   $('#Rapport').hide();
    //   $('#FactBook').hide();
    // }
    if (e.target.value == "FactBook") {
      $('#FactBook').show();
      // $('#PowerBI').hide();
      $('#Rapport').hide();

    }

  }
  constructor(props) {
    super(props)
    this.state = {
    
      tableData:[],
      columnsReactTabulator: [    
      {
        title: "Nom de l'Email",
        field: "Email_Nom",
        width: "13%",
        headerFilter: "input",
        cellClick: this.datamodifierFun,
        // cellClick: function (e, cell, row) {
        //   var position = cell.getRow().getPosition()
        //   console.log(position);
        //   datamodifier.splice(0, 2);
        //   datamodifier.push(cell.getData(), position);
        //   var Attachement = cell.getData().Attachement;

        //   console.log("Attachement", Attachement)

        //   console.log("valider", datamodifier)


        // }
      },

      {
        title: "Email To",
        field: "Email_To",

        width: "13%",
        cellClick: this.datamodifierFun,
      },
      {
        title: "Email CC",
        field: "Email_CC",
        width: "13%",
        cellClick: this.datamodifierFun,
      },
      {
        title: "Objet",
        field: "Email_Subject",
        width: "12%",
        cellClick: this.datamodifierFun,

      },
      {
        title: "Corps de l'email",
        field: "Email_Body",
        width: "12%",
        cellClick: this.datamodifierFun,

      },
      {
        title: "Attachement",
        field: "Email_Attachement",
        width: "14%",
        cellClick: this.datamodifierFun,

      },
      {
        title: "Description de l'Email",
        field: "Email_Description",
        width: "13%",
        cellClick: this.datamodifierFun,

      },

      {
        title: "Supprimer",
        field: "supprimer",
        width: "8%",
        hozAlign: "center",
        formatter: this.supprimerFunIcon,
        cellClick: this.supprimerFunclick
       
      
      }],
      history:props.history,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),

      modalDelete: false,
      cellName: "",
      cellTable:"",
      //////////////
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      Email_Nom: "",
      Email_To: "",
      Email_To_Json: [],
      Email_CC_Json: [],
      Email_Attachement_Json: [],
      Email_CC: "",
      Email_Code: "",
      Email_Description: "",
      Email_Subject: "",
      Email_Body: "",
      Email_Attachement: "",
      Email: [],
      To_internal: "",
      CC_internl: "",
      Report_FactBook: "",
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
      // PowerBI: [],
      FactBook: [],
      Email_To_Name: "",
      Email_To_Code: "",
      Email_CC_Name: "",
      Email_CC_tab: "",
      Email_To_tab: "",
      Email_CC_tabCode: "",
      Email_To_tabCode: "",
      Email_Attachement_tabCode: "",
      Attachement_tab: "",
      Email_Attachement_tab: "",
      Email_CC_Code: "",
      //   PowerBI_Code: "",
      MailingList: [],
      Attachement: "",
      MailingList_Code: "",
      Code_FactBook: "",
      Code_Compteur: "",
      NameEnergy: '',
      EnergyMeasure: '',
      Tableaux: '',
      energie: '',
      view: '',
      unite: '',
      unite1: '',
      Sys_mesureid: '',

      listNameEnergy: [],
      LeCompteur: [],
      dataCompteur: [],
      dataEnergyMeasure: [],
      dataEnergy: [],
      listRapportglobal: [],

      listfieldfiltername: [],
      listfieldfiltercontent: [],
      listTableau: [],
      listenergie: [],
      listview: [],
      listunite: [],
      codeunite: [],
      U_Rapportselected: "",
      position: null,
      ////////////


      listTableau: [],
      listTAGS: [],
      listMaster: [],
      Listes_TL: [],
      Listes_Ml: [],
      Listes_Cl: [],
      Listes_Cl2: [],
      Tableaux: '',
      Master: '',
      TAGS: "",
      Code_Cl: "",
      Name_Cl: "",
      Code_Ml: "",
      Name_Ml: "",
      Name_Tl: "",
      Code_Tl: "",
      BtnMlDesibled: false,
      BtnClDesibled: false,
      BtnTlDesibled: false,
      BtnEnregistreDesibled: true,
      tl_members: [],
      tl_name: "",
      tl_id: "",
      BooleanVar_CL: false,
      BooleanVar_ML: false,
      BooleanVar_TL: false,
      cl_Membre_Select_fin: [],
      ml_Membre_Select_fin: [],
      Selected_Global: [],
      CL_Membre: [],
      ML_Membre: [],
      Le_Compteur_Liste: [],
      m_name_Liste: [],
      CompteurListI_Name: "",
      ML_Name: "",
      filterNameRapport: [],
      Report_Name: "",
      RapportAfficher: [],
      Report_TableauCode: "",
      Report_TableauName: "",
      Selected_Global: [],
      Access_Groupe_User: "",
      disposition: "",
      editRapport: null,
      Report_Name_Enregistrer: "",
      items: {
        default: "1",
      },
      /////////
      errors: {
        Email_Nom: '* Obligatoire',
        Email_To_Name: '* Obligatoire',
       
        Email_Subject: '* Obligatoire',
      },
      GenerateTableActive: false,
      AjouterRapport: false,
      config: null,
      layoutFormat: null,
      Report_Code_Enregistrer: "",
      /////
      ajoutertemprapport: [],
      Report_Description: "",
      Report_TableauCode: "",
      Report_TableauName: "",
      TAGS_New: "",
      SHAH1_code: "",
      disposition: "",
      Access_Groupe_User: "",
      ///////////////////
      listesFactbook: [],
      NomFactbbok: "",
      Factbook_Membre: [],
      //////////////////
      tl_name_IOT:"",
      tl_id_IOT:"",
      tl_name_cluster:"",
      tl_id_cluster:"",
      BtnAjouterRapportCloner:false,
    }
    this.table = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Email_CC_Click = this.Email_CC_Click.bind(this);
    //  this.PowerBIClick = this.PowerBIClick.bind(this);
    this.FactBookClick = this.FactBookClick.bind(this);
    this.btndelete_Email_Attachement = this.btndelete_Email_Attachement.bind(this)
    this.copier = this.copier.bind(this);
    this.handleRapportselectedchange = this.handleRapportselectedchange.bind(this)
    this.handleListeCompteurClick = this.handleListeCompteurClick.bind(this)
    this.handleListeMLClick = this.handleListeMLClick.bind(this)
    this.modelCl = this.modelCl.bind(this)
    this.modelMl = this.modelMl.bind(this)
    this.CL_Tags_Function = this.CL_Tags_Function.bind(this)
    this.ML_Tags_Function = this.ML_Tags_Function.bind(this)
    this.handleListeTLClick = this.handleListeTLClick.bind(this)
    this.AjouterCl = this.AjouterCl.bind(this)
    this.AjouterMl = this.AjouterMl.bind(this)
    this.AjouterTl = this.AjouterTl.bind(this)
  }
  togglePills = (type, tab, name) => e => {
    e.preventDefault();

    let items = { ...this.state.items };
    if (tab === "2") {


      if (items[type] !== "2") {
        if (this.state.Report_Name_Enregistrer != "" && this.state.Report_Name_Enregistrer.length > 5) {
 
          axios.get(window.apiUrl + `getReportByName/?reportName=${this.state.Report_Name_Enregistrer}`)
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
              "IDs": [this.state.Code_Attachement],
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
                  this.setState({Email_Attachement:this.state.Report_Name_Enregistrer})
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
  copier = () => {
console.log(this.state.datamodifier)
    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      console.log(this.state.datamodifier)
      this.setState({ isDisabledbutton: true })

      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Email_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Email_Code",
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
              var code = result.data.split(", ")
              this.setState({ Email_Code: code })
              console.log(this.state.Email_Code, "Email_Code")

              /////////////////////////////////////Email Select
              this.state.Email_Nom = 'copie ' + this.state.datamodifier[0].Email_Nom;
              this.state.Email_To_Name = this.state.Email_To = this.state.datamodifier[0].Email_To;
              this.state.Email_To_Code = this.state.datamodifier[0].Code_To;
              //  Code_CC
              //console.log("Email_To", this.state.Email_To)
              this.state.Email_CC_Name = this.state.Email_CC = this.state.datamodifier[0].Email_CC;
              this.state.Email_CC_Code = this.state.datamodifier[0].Code_CC;
              // console.log("Email_CC", this.state.Email_CC)
              this.state.Email_Subject = this.state.datamodifier[0].Email_Subject;
              this.state.Email_Body = this.state.datamodifier[0].Email_Body;
              this.state.Email_Attachement = this.state.datamodifier[0].Email_Attachement;

              this.state.Attachement = this.state.datamodifier[0].Attachement;
              this.state.Code_Attachement = this.state.datamodifier[0].Code_Attachement
              // console.log("Attachement", this.state.Attachement)
              this.state.Email_Description = this.state.datamodifier[0].Email_Description;
              this.state.To_internal = this.state.datamodifier[0].To_internal;
              this.state.CC_internl = this.state.datamodifier[0].CC_internl;
              this.state.Report_FactBook = this.state.datamodifier[0].Report_FactBook;

              this.state.position = this.state.datamodifier[1];
              ///////////////////////////////////////////////////////////////////





              const Email_Code = this.state.Email_Code[0];
              const Email_Nom = this.state.Email_Nom;


              const Email_Subject = this.state.Email_Subject;
              const Email_Body = this.state.Email_Body;

              // const Email_Attachement = this.state.Email_Attachement;
              const Email_Description = this.state.Email_Description;
              const To_internal = this.state.To_internal;
              const CC_internl = this.state.CC_internl;
              const Report_FactBook = this.state.Report_FactBook;

              const DBAction = "2";


              ////////////////Email_To_Json
              this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]

              console.log("Email_To_Json", this.state.Email_To_Json)
              // const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
              const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
              //////////////Email_CC_Json
              this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
              console.log("Email_CC_Json", this.state.Email_CC_Json)
              // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
              const Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
              /////////////Email_Attachement_Json
              this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
              console.log("Email_Attachement", this.state.Email_Attachement_Json)
              //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);
              const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };

              //this.state.ajout = (Email_Code + ";" + Email_Nom + ";" + Email_Subject + ";" + Email_Body + ";" + Email_Description + ";" + To_internal + ";" + CC_internl + ";" + Report_FactBook + ";" + Email_Attachement_Json_Base + ";" + Email_To_Json_Base + ";" + Email_CC_Json_Base + ";" + DBAction)
              this.state.ajout = {
                "Email_Code": Email_Code,
                "Email_Nom": Email_Nom,
                "Email_Subject": Email_Subject,
                "Email_Body": Email_Body,
                "Email_Description": Email_Description,
                "To_internal": To_internal,
                "CC_internl": CC_internl,
                "Report_FactBook": Report_FactBook,
                "Email_Attachement": Email_Attachement_Json_Base,
                "Email_To": Email_To_Json_Base,
                "Email_CC": Email_CC_Json_Base,
                "DBAction": DBAction
              }
              this.state.ajoutertemp.push(this.state.ajout);
              /////////////Email_To
              const Email_To = this.state.Email_To_Json[0].Email_To;
      

              console.log("Email_To", Email_To)
              /////////////Email_CC
              const Email_CC = this.state.Email_CC_Json[0].Email_CC;
             
      
              console.log("Email_CC", Email_CC)
              /////////////Attachement
              const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
              const Code_To=this.state.Email_To_Code
              const Code_CC=this.state.Email_CC_Code
              const Code_Attachement=this.state.Code_Attachement
              console.log("Email_Attachement", Email_Attachement)
              const Attachement= this.state.Attachement
              //////////// ajouter dans tabulator


              this.table.current.table.addRow({ Email_Code, Email_Nom, Email_To,Code_To, Email_CC,Code_CC, Email_Subject, Email_Body, Email_Attachement,Code_Attachement,Attachement, Email_Description }, true);
    
              console.log(this.state.ajout);
              console.log(this.state.ajoutertemp);

              ////////////           
              this.state.Email_Nom = "";
              this.state.Email_To = "";
              this.state.Email_CC = "";
              this.state.Email_Subject = "";
              this.state.Email_Body = "";
              this.state.Email_Attachement = "";
              this.state.Email_Description = "";
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
  handleClick(id, event) {
    this.state.Email_To_Code = id;
    console.log("Email_To_Code", this.state.Email_To_Code)

  }
  Email_CC_Click(id, event) {
    this.state.Email_CC_Code = id;


    console.log("Email_CC_Code", this.state.Email_CC_Code)

  }
  // PowerBIClick(id, event) {
  //   this.state.Code_Attachement = id;
  //   console.log("PowerBI_Code", this.state.Code_Attachement)
  // }
  FactBookClick(id, name, Membre, event) {
    this.state.Code_Attachement = id;
    this.state.Email_Attachement = name;
    this.state.Factbook_Membre = Membre
    this.setState({ Factbook_Membre: Membre })
    console.log("Code_FactBook", this.state.Code_Attachement)
    console.log("Email_Attachement", this.state.Email_Attachement)
    console.log("Factbook_Membre", this.state.Factbook_Membre)
  }

  toggle5 = () => {
    console.log("click")
    this.setState({
      modal5: !this.state.modal5
    });

  }

  toggle7 = () => {

 
    axios1.get(window.apiUrl + "getFactBooks/")
   
      .then(
        (result) => {
          if (result.data !== null) {
            //this.state.FactBook = result.data;
            this.setState({ FactBook: result.data })
         
            if (this.state.datamodifier.length != 0) {
              this.setState({
                modal7: !this.state.modal7
              });
              Swal.fire({
                toast: true,
                position: 'top',
        
                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'écraser FactBook existants'
              })
            
            } else {
              this.setState({
                modal7: !this.state.modal7
              });
            }
          }
          else {
            console.log("data FactBook est vide")
          }
        })
  }
  ///////////////Ml
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });

    /////////ML
    document.querySelector("body").classList.add("isLoading")
    axios1.get(window.apiUrl + "getMeasureList/")

      .then(
        (result) => {
          if (result.data !== null) {

            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

              this.setState({ Listes_Ml: result.data })
            }
          } else {
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
  ///////////////ml
  toggle4 = () => {


    this.setState({
      modal4: !this.state.modal4
    });
    /////////CL
    document.querySelector("body").classList.add("isLoading")
    axios1.get(window.apiUrl + "getCountersList/")

      .then(
        (result) => {
          if (result.data !== null) {
            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

           
            this.setState({ Listes_Cl: result.data })
             this.setState({ Listes_Cl2: result.data })
            }
          } else {
          }

        })
      .catch(({ response }) => {

        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/")
            localStorage.clear();

          }
        }
      }
      )
    


  }
  handleRapportselectedchange(json) {


     console.log("tesssst", json)
     if(json.length!=0){
    this.state.Code_Attachement = json.Report_Code;
    this.setState({
      Email_Attachement: json.Report_Name,
    });
    this.setState({
      Report_Name: json.Report_Name,
    });

    console.log("Email_Attachement", this.state.Email_Attachement)

    this.setState({ RapportAfficher: json })
              this.setState({ Report_TableauCode: json.Report_TableauCode })
              this.setState({ Report_TableauName: json.Report_TableauName })
              this.setState({ Selected_Global: json.Selected_Global })


              if (json.Selected_Global != null) {
                for (var i = 0; i < json.Selected_Global.length; i++) {
                  // this.setState({ editRapport: false })
                  if (json.Selected_Global[i].Dim_type == "VAR") {
                    if (json.Selected_Global[i].Dim == "CL") {
                      console.log("1 VAR", json.Selected_Global[i].Dim)
                      this.setState({ BtnClDesibled: false })

                    } else if (json.Selected_Global[i].Dim == "ML") {
                      console.log("2 VAR", json.Selected_Global[i].Dim)

                      this.setState({ BtnMlDesibled: false })

                    } else if (json.Selected_Global[i].Dim == "TL") {

                      console.log("3 VAR", json.Selected_Global[i].Dim)
                      this.setState({ BtnTlDesibled: false })

                    } else {

                      console.log("vide")

                    }
                    this.setState({ editRapport: false })

                  }
                  
                  if (json.Selected_Global[i].Dim_type == "FIX") {

                    if (json.Selected_Global[i].Dim == "CL") {
                      console.log("1 Fix", json.Selected_Global[i].Dim)
                      this.setState({ BtnClDesibled: true })


                    } else if (json.Selected_Global[i].Dim == "ML") {
                      console.log("2 Fix", json.Selected_Global[i].Dim)
                      this.setState({ BtnMlDesibled: true })


                    } else if (json.Selected_Global[i].Dim == "TL") {

                      console.log("3 Fix", json.Selected_Global[i].Dim)
                      this.setState({ BtnTlDesibled: true })

                    }
                  }



                }
                if (this.state.BtnTlDesibled == true && this.state.BtnClDesibled == true && this.state.BtnMlDesibled == true) {
                  console.log("tout les Dim est fix")
                  this.setState({ editRapport: true })

                }


              } else {

                console.log("Selected_Global vide")
                this.setState({ BtnClDesibled: true })
                this.setState({ BtnMlDesibled: true })
                this.setState({ BtnTlDesibled: true })
                this.setState({ editRapport: true })
              }
            }
     
  }

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  

  btndelete_Email_Attachement() {

    if (this.state.Email_Attachement == "") {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'le champ est vide'
      })
    } else {
      const array = []

      this.setState({ editRapport: null })
      array.push(this.state.Email_Attachement)
      console.log(this.state.Email_Attachement);

      this.setState({ Email_Attachement: array.slice(0, -1) });
      this.state.Email_Attachement = "";
      console.log('deleteee')
      var $ = require("jquery");
    
      this.state.Tableaux = ""
      this.state.energie = ""
      this.state.view = ""
      this.state.unite1 = ""
      this.state.listfieldfiltername.slice(0, -1)
      this.state.listfieldfiltercontent.slice(0, -1)
      console.log("aaaaaaaaaaaaaaaaaaaaaaa", this.state.listfieldfiltername = [], this.state.listfieldfiltercontent = [])

     
     }
  }
  handleListeCompteurClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Cl: id })
    this.setState({ Name_Cl: name })
    this.setState({ CL_Membre: membre })
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
  handleListeMLClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Ml: id })
    this.setState({ Name_Ml: name })
    this.setState({ ML_Membre: membre })
  }
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

  AjouterCl() {
    if (this.state.Name_Cl != "" && this.state.cl_Membre_Select_fin.length != 0) {
      this.setState({
        modal4: !this.state.modal4
      });
      this.setState({ CompteurListI_Name: this.state.Name_Cl })
    }
  }
  modelCl(cl_Membre_Select) {
    this.setState({ cl_Membre_Select_fin: cl_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", cl_Membre_Select)
  }

  modelMl(ml_Membre_Select) {
    this.setState({ ml_Membre_Select_fin: ml_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", ml_Membre_Select)
  }

  AjouterMl() {
    if (this.state.Name_Ml != "" && this.state.ml_Membre_Select_fin.length != 0) {
      this.setState({
        modal2: !this.state.modal2
      });
      this.setState({ ML_Name: this.state.Name_Ml })
    }
  }
  AjouterTl=()=>{
    if (this.state.tl_id_IOT != "" && this.state.tl_id_cluster != "" && this.state.tl_name_IOT != "" && this.state.tl_name_cluster != "") {

      this.setState({modal5:!this.state.modal5})

      var name_Tl = (this.state.tl_name_IOT + " et " + this.state.tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
     
      this.setState({tl_name:name_Tl2})

    } else if (this.state.tl_id_IOT != "" && this.state.tl_id_cluster == "" && this.state.tl_name_IOT != "" && this.state.tl_name_cluster == "") {
      this.setState({modal5:!this.state.modal5})

      this.setState({tl_name:this.state.tl_name_IOT})
    } else if (this.state.tl_id_IOT == "" && this.state.tl_id_cluster != "" && this.state.tl_name_IOT == "" && this.state.tl_name_cluster != "") {
      this.setState({modal5:!this.state.modal5})
      var name_Tl = (this.state.tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
      this.setState({tl_name:name_Tl2})

    }
  }
  ajouterNewRapport = () => {
    if (this.state.Report_Name_Enregistrer != "") {
      console.log("Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage", this.state.Report_Name_Enregistrer)


              this.setState({
                modal6: !this.state.modal6
              });

            }
          
  }
  ajouterRapportAttachement = () => {
    console.log("ajouterRapportAttachement")

    if (this.state.Email_Attachement != "" && this.state.Code_Attachement != "" && this.state.Report_Name_Enregistrer == "") {

      //this.state.Email_Attachement_Json = [{ "Attachement": "Rapport" , "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
      //console.log('this.state.Email_Attachement_Json',this.state.Email_Attachement_Json)
      this.setState({
        modal3: !this.state.modal3,
        Attachement:"Rapport"
      });
 


    } else if (this.state.Email_Attachement != "" && this.state.Code_Attachement != "" && this.state.Report_Name_Enregistrer != "") {

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


            if (result.data !== null) {
              var code = result.data.split(", ")
           //   this.state.Report_Code_Enregistrer = code[0]
              console.log("Report_Code")
              console.log(this.state.Report_Code_Enregistrer)
   
              this.setState({
                Report_Code_Enregistrer: code[0],
                Email_Attachement:this.state.Report_Name_Enregistrer,
                Code_Attachement: code[0],
                Attachement:"Rapport"

              })
            }
          })



      // this.state.Email_Attachement_Json = [{ "Attachement": "Rapport" , "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
      //console.log('this.state.Email_Attachement_Json',this.state.Email_Attachement_Json)

      this.setState({
        modal3: !this.state.modal3
      });

      ////////////////////////Changement////////////////
      if (this.state.Selected_Global.length != 0) {
        console.log("this.state.Selected_Global", this.state.Selected_Global)
        var CL_Selected = null
        var ML_Selected = null
        var TL_Selected = null
        for (var i = 0; i < this.state.Selected_Global.length; i++) {
          if (this.state.Selected_Global[i].Dim_type == "VAR") {
            if (this.state.Selected_Global[i].Dim == "CL") {
              console.log("1 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_CL: true })
              if (this.state.Code_Cl != "" && this.state.Name_Cl != "") {
                CL_Selected = {
                  "Dim": "CL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Code_Cl,
                  "Dim_label": this.state.Name_Cl,
                  "Dim_Member": this.state.cl_Membre_Select_fin,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("CL_Selected1", CL_Selected)
              } else {

                CL_Selected = {
                  "Dim": "CL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("CL_Selected2", CL_Selected)
                this.setState({ CompteurListI_Name: this.state.Selected_Global[i].Dim_label })
              }
            } else if (this.state.Selected_Global[i].Dim == "ML") {
              console.log("2 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_ML: true })
              if (this.state.Code_Ml != "" && this.state.Name_Ml != "") {
                ML_Selected = {
                  "Dim": "ML",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Code_Ml,
                  "Dim_label": this.state.Name_Ml,
                  "Dim_Member": this.state.ml_Membre_Select_fin,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("ML_Selected1", ML_Selected)
              } else {

                ML_Selected = {
                  "Dim": "ML",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("ML_Selected2", ML_Selected)
                this.setState({ ML_Name: this.state.Selected_Global[i].Dim_label })
              }

            } else if (this.state.Selected_Global[i].Dim == "TL") {

              console.log("3 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_TL: true })
              if (this.state.tl_id_IOT != "" && this.state.tl_name_IOT != "" && this.state.tl_id_cluster == "" && this.state.tl_name_cluster == "") {
                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": { "cluster_code": this.state.Selected_Global[i].Dim_code.cluster_code, "iot_code": this.state.tl_id_IOT },
                  "Dim_label": { "cluster_name": this.state.Selected_Global[i].Dim_label.cluster_name, "iot_name": this.state.tl_name_IOT },
                  "Dim_Member": { "clusterMembers": this.state.Selected_Global[i].Dim_Member.clusterMembers, "iotinnerMembers": [this.state.tl_id_IOT] },
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }


              } else if (this.state.tl_id_IOT == "" && this.state.tl_name_IOT == "" && this.state.tl_id_cluster != "" && this.state.tl_name_cluster != "") {
                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": { "cluster_code": this.state.tl_id_cluster, "iot_code": this.state.Selected_Global[i].Dim_code.iot_code },
                  "Dim_label": { "cluster_name": this.state.tl_name_cluster, "iot_name": this.state.Selected_Global[i].Dim_label.iot_name },
                  "Dim_Member": { "clusterMembers": [this.state.tl_id_cluster], "iotinnerMembers": this.state.Selected_Global[i].Dim_Member.iotinnerMembers },
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }

              } else if (this.state.tl_id_IOT != "" && this.state.tl_name_IOT != "" && this.state.tl_id_cluster != "" && this.state.tl_name_cluster != "") {

                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": { "cluster_code": this.state.tl_id_cluster, "iot_code": this.state.tl_id_IOT },
                  "Dim_label": { "cluster_name": this.state.tl_name_cluster, "iot_name": this.state.tl_name_IOT },
                  "Dim_Member": { "clusterMembers": [this.state.tl_id_cluster], "iotinnerMembers": [this.state.tl_id_IOT] },
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
              }
              else {

                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                
              
                console.log("TL_Selected2", TL_Selected)
                this.setState({ tl_name: this.state.Selected_Global[i].Dim_label })
              }

              console.log("TL_Selected2------------------------------------>", TL_Selected)
            } else {

              console.log("vide")

            }


          } else {

            if (this.state.Selected_Global[i].Dim == "CL") {
              console.log("1 Fix", this.state.Selected_Global[i].Dim)
              CL_Selected = {
                "Dim": "Cl",
                "Dim_type": "Fix",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("CL_Selected3", CL_Selected)


            } else if (this.state.Selected_Global[i].Dim == "ML") {
              console.log("2 Fix", this.state.Selected_Global[i].Dim)
              ML_Selected = {
                "Dim": "ML",
                "Dim_type": "VAR",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("ML_Selected3", ML_Selected)

            } else if (this.state.Selected_Global[i].Dim == "TL") {

              console.log("3 Fix", this.state.Selected_Global[i].Dim)

              TL_Selected = {
                "Dim": "TL",
                "Dim_type": "Fix",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("TL_Selected3", TL_Selected)
            } else {

              console.log("vide")

            }
          }


        }
        this.state.Selected_Global_Enregistrer = [CL_Selected, ML_Selected, TL_Selected]
      } else {
        console.log("Selected_Global is vide")
      }
      console.log('Selected_Global------------------------------>', this.state.Selected_Global_Enregistrer)



    }
    else {
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
  FactbookList1 = () => {
    console.log("Factbbok click", this.state.Email_Attachement)
    if (this.state.Email_Attachement != "" || this.state.Attachement == "FactBook") {
      this.setState({ modal7: !this.state.modal7,
        Attachement:"FactBook"
      
      
      })
      
      console.log("attachement", this.state.Attachement)
    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: "Veuillez sélectionner un Factbook"
      })
    }
  }
  FB = () => {
    window.open("/Rapporteur/FactBook")
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
    this.setState({ cellName: cell.getData().Email_Nom })
  }

  deletetab = () => {

    this.toggleDelete()
    this.state.cellTable.getRow().delete();

    ///////////////////

          ///Email_CC
          var CC = { "Email_CC": this.state.cellTable.getData().Email_CC, "Code_CC": this.state.cellTable.getData().Code_CC }
          var Email_cc = []
          Email_cc.push(CC)
          var Email_CC = JSON.stringify(Email_cc)
          ////
          ///Email_To
          var To = { "Email_To": this.state.cellTable.getData().Email_To, "Code_To": this.state.cellTable.getData().Code_To }
          var Email_to = []
          Email_to.push(To)
          var Email_To = JSON.stringify(Email_to)
          ////
          ///Email_Attachement
          var Attachement = { "Email_Attachement": this.state.cellTable.getData().Email_Attachement, "Code_Attachement": this.state.cellTable.getData().Code_Attachement }
          var Email_attachement = []
          Email_attachement.push(Attachement)
          var Email_Attachement = JSON.stringify(Email_attachement)
          ////
          //supprimertemp.push(cell.getData().Email_Code + ";" + cell.getData().Email_Nom + ";" + cell.getData().Email_Subject + ";" + cell.getData().Email_Body + ";" + cell.getData().Email_Description + ";" + cell.getData().To_internal + ";" + cell.getData().CC_internl + ";" + cell.getData().Report_FactBook + ";" + Email_Attachement + ";" + Email_To + ";" + Email_CC + ";" + 3);
        
    ////////////////////
    this.state.supprimertemp.push(
      {
        
                "Email_Code": this.state.cellTable.getData().Email_Code,
                "Email_Nom": this.state.cellTable.getData().Email_Nom,
                "Email_Subject": this.state.cellTable.getData().Email_Subject,
                "Email_Body": this.state.cellTable.getData().Email_Body,
                "Email_Description": this.state.cellTable.getData().Email_Description,
                "To_internal": this.state.cellTable.getData().To_internal,
                "CC_internl": this.state.cellTable.getData().CC_internl,
                "Report_FactBook": this.state.cellTable.getData().Report_FactBook,
                "Email_Attachement": Email_Attachement,
                "Email_To": Email_To,
                "Email_CC": Email_CC,
                "DBAction": "3"
              
      })

  }

  render() {
    const scrollContainerStyle = { width: "100%", maxHeight: "250px" };
    const { errors } = this.state;
    return (
      <>  <Navbar history={this.state.history}/>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Email</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn> */}

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle} style={{ width: "196px" }} className="float-left">Nouveau <MDBIcon icon="plus-square" className="ml-1" /></MDBBtn>


          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg" >
            <MDBModalHeader toggle={this.toggle} >Nouveau Email</MDBModalHeader>
            <MDBModalBody>

              <MDBRow>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Nom de l'Email<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Nom" className="form-control" value={this.state.Email_Nom} onChange={this.handleChange} required />
                  {errors.Email_Nom.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}

                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    objet<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>

                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" value={this.state.Email_Subject} onChange={this.handleChange} required />

                  {errors.Email_Subject.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Subject}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email To<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <select className="browser-default custom-select " name="Email_To_Name" className="form-control" value={this.state.Email_To_Name} onChange={this.handleChange} size="4" >
                    <option></option>
                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.handleClick(i.MailingList_Code, e)}>{i.Nom_MailingList}</option>)}
                  </select>
                  {errors.Email_To_Name.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_To_Name}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email CC
                  </label>

                  <select className="browser-default custom-select " name="Email_CC_Name" className="form-control" value={this.state.Email_CC_Name} onChange={this.handleChange} size="4" >
                    <option></option>

                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.Email_CC_Click(i.MailingList_Code, e)} > {i.Nom_MailingList} </option>)}

                  </select>

                </MDBCol>
                <MDBCol size="12">

                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Corps de l'email
                  </label>
                  <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Email_Body" className="form-control" value={this.state.Email_Body} onChange={this.handleChange} required />

                </MDBCol>

                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Description de l'Email
                  </label>
                  <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Description" value={this.state.Email_Description} onChange={this.handleChange} required />

                </MDBCol>



                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Attachement<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>



                  <MDBRow >
                    <MDBCol size="6" style={{ marginLeft: "-1%" }}>
                      <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle3} style={{ width: "100%" }}> Rapport  <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
                    </MDBCol>         <MDBCol size="6">   <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle7} style={{ width: "100%" }}  > FactBook <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
                    </MDBCol>         </MDBRow>
                </MDBCol>

                {this.state.Email_Attachement != "" &&
                  <MDBCol size="12">
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                      {this.state.Attachement}
                    </label>
                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={this.state.Email_Attachement} onChange={this.handleChange} disabled />
                  </MDBCol>
                }
              
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          {/* ************************************************************************************************ */}
      


          {/* ************************************************************************************************ */}
          {/* <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" className="" >Modifier</MDBBtn> */}
          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" style={{ width: "196px" }} className="float-left">Modifier <MDBIcon icon="pen-square" className="ml-1" /></MDBBtn>

          <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} size="lg">
            <MDBModalHeader toggle={this.toggle1} >Modifier Email</MDBModalHeader>
            <MDBModalBody>

              <MDBRow>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Nom de l'Email<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Nom" className="form-control" value={this.state.Email_Nom} onChange={this.handleChange} required />
                  {errors.Email_Nom.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}

                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    objet<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>

                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" value={this.state.Email_Subject} onChange={this.handleChange} required />

                  {errors.Email_Subject.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Subject}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email To<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <select className="browser-default custom-select " name="Email_To_Name" className="form-control" value={this.state.Email_To_Name} onChange={this.handleChange} size="4" >
                    <option></option>
                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.handleClick(i.MailingList_Code, e)}>{i.Nom_MailingList}</option>)}
                  </select>
                  {errors.Email_To_Name.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_To_Name}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email CC
                  </label>

                  <select className="browser-default custom-select " name="Email_CC_Name" className="form-control" value={this.state.Email_CC_Name} onChange={this.handleChange} size="4" >
                    <option></option>

                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.Email_CC_Click(i.MailingList_Code, e)} > {i.Nom_MailingList} </option>)}

                  </select>

                </MDBCol>
                <MDBCol size="12">

                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Corps de l'email
                  </label>
                  <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Email_Body" className="form-control" value={this.state.Email_Body} onChange={this.handleChange} required />

                </MDBCol>

                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Description de l'Email
                  </label>
                  <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Description" value={this.state.Email_Description} onChange={this.handleChange} required />

                </MDBCol>



                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Attachement
                  </label>



                  <MDBRow >
                    <MDBCol size="6" style={{ marginLeft: "-1%" }}>
                      <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle3} style={{ width: "100%" }}> Rapport  <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
                    </MDBCol>         <MDBCol size="6">   <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle7} style={{ width: "100%" }}  > FactBook <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
                    </MDBCol>         </MDBRow>
                </MDBCol>

                {this.state.Email_Attachement != "" &&
                  <MDBCol size="12">
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                      {this.state.Attachement}
                    </label>
                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={this.state.Email_Attachement} onChange={this.handleChange} disabled />
                  </MDBCol>
                }

              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.modifier}> <MDBIcon far icon="edit" />   Modifier</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

         
          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} style={{ width: "196px" }} className="float-left" >Copier <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} style={{ width: "196px" }} > Enregistrer   <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          {/* <div>
            <div className="tabulator" ref={el => (this.el = el)} /></div> */}
          <ReactTabulator style={{ marginTop: 30 + 'px' }}
            ref={this.table}
            // cellClick={this.click}
            // rowClick={this.click2}
            data={this.state.tableData}
            columns={this.state.columnsReactTabulator}
            layout={"fitData"}
            index={"Email_Code"}
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

        <div>
                 {/* ********************* */}
                 <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered size="lg" >

<Navigateur
  ajouterRapportAttachement={this.ajouterRapportAttachement}
  // TAGS={this.state.TAGS}
  // Master={this.state.Master}
  // Tableaux={this.state.Tableaux}
   //TAGS_New={this.state.TAGS_New}
  // filterTAGS={this.filterTAGS}
  // listTableau={this.state.listTableau}
  // filterMaster={this.filterMaster}
  // filterTableaux={this.filterTableaux}
  listRapportglobal={this.state.listRapportglobal}
  // filterRapportglobal={this.filterRapportglobal}
  btndelete_Email_Attachement={this.btndelete_Email_Attachement}
  handleRapportselectedchange={this.handleRapportselectedchange}
  Report_Name_Enregistrer={this.state.Report_Name_Enregistrer}
  Report_Description={this.state.Report_Description}
  // resetvalueoffilter={this.resetvalueoffilter}
  Email_Attachement={this.state.Email_Attachement}
  handleChange={this.handleChange}
  editRapport={this.state.editRapport}
  Report_Name={this.state.Report_Name}
  // listMaster={this.state.listMaster}
  // listTAGS={this.state.listTAGS}
  ajouter={this.ajouter}
  toggle3={this.toggle3}
  toggle6={this.toggle6}
  BtnAjouterRapportCloner={this.state.BtnAjouterRapportCloner}
/>


</MDBModal>
{/* ************************************** */}
      
   
<MDBModal isOpen={this.state.modal6} toggle={this.toggle6} centered size="fluid" >

<MDBModalHeader toggle={this.toggle6} >Nouveau Rapport</MDBModalHeader>
<MDBModalBody>

  <MDBTabContent activeItem={this.state.items["default"]}>
    <MDBTabPane tabId="1">
      <MDBRow>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
          </label>

          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Report_Name_Enregistrer" value={this.state.Report_Name_Enregistrer} onChange={this.handleChange} className="form-control" required />

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
                  style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle4}>
                  Compteurs Listes
                </MDBBtn>
              </MDBCol >
              <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >{this.state.CompteurListI_Name}</b></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="4" >
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnMlDesibled}
                 style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle2}>
                  Mesures Listes
                </MDBBtn>

              </MDBCol>
              <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.ML_Name}</b></MDBCol>
            </MDBRow>
            <MDBRow>

              <MDBCol size="4" >
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnTlDesibled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle5}>
                  Time Intelligence
                </MDBBtn>

              </MDBCol>
              <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.tl_name}</b></MDBCol>
            </MDBRow>
    
          </fieldset>
        </MDBCol>
      </MDBRow>
    {/**    Mesures Listes Modale */}

    <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} centered size="lg">

<Modal_ML_V2 toggle2={this.toggle2} ML_Tags_Function={this.ML_Tags_Function} Code_Ml={this.state.Code_Ml} Name_Ml={this.state.Name_Ml} modelMl={this.modelMl} Listes_Ml={this.state.Listes_Ml} handleListeMLClick={this.handleListeMLClick} ML_Membre={this.state.ML_Membre} />


<MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

  <MDBNavItem>
    <MDBNavLink link /*onClick={() => this.MesuresListes()}*/>
      liste d'éditeurs
    </MDBNavLink>
  </MDBNavItem>
</MDBNav>


<MDBModalFooter>

  <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterMl}
  > <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
</MDBModalFooter>
</MDBModal>
{/**    Compteurs Listes Modale */}
<MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered size="lg">

{/* <Modal_CL_V2 toggle4={this.toggle4} CL_Tags_Function={this.CL_Tags_Function} handleChange={this.handleChange} modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} /> */}

    <Modal_CL_V2 toggle4={this.toggleCL} CL_Tags_Function={this.CL_Tags_Function} modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} />

<MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

  <MDBNavItem>
    <MDBNavLink link /*onClick={() => this.CL()}*/>
      liste d'éditeurs
    </MDBNavLink>
  </MDBNavItem>
</MDBNav>
<MDBModalFooter>

  <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterCl}> <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
</MDBModalFooter>
</MDBModal>
{/**    Time Intelligence Modale */}
<MDBModal isOpen={this.state.modal5} toggle={this.toggle5} centered size="lg" >


<Modal_TL_V2 toggle={this.toggle5} handleListeTLClick={this.handleListeTLClick} />

<MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

<MDBNavItem>
  <MDBNavLink link /*onClick={() => window.open("/Rapporteur/TimeIntelligence")} */style={{ color: "#000" }} >
    liste d'éditeurs
  </MDBNavLink>
</MDBNavItem>
</MDBNav>
<MDBModalFooter>

<MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterTl}
>  Sélectionnez</MDBBtn>
</MDBModalFooter>
</MDBModal>
    </MDBTabPane>

    <MDBTabPane tabId="2">
      {this.state.GenerateTableActive &&
        <div>


          <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} maxCols={5} maxRows={5} style={{ width: "95%", height: window.screen.availHeight / 1.90 + `px` }}
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
  {this.state.BtnAjouterRapportCloner==true && 
  <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.ajouterNewRapport}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>
}
  </MDBModalFooter>
</MDBModal>
      {/* ******************* */}
      
          <MDBModal isOpen={this.state.modal7} toggle={this.toggle7} centered size="lg">

            <ModalFactBook toggle4={this.toggle7} listes={this.state.FactBook} handleChange={this.handleChange} FactBookClick={this.FactBookClick} NomFactbbok={this.state.NomFactbbok} Factbook_Membre={this.state.Factbook_Membre} />

            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link /*onClick={() => this.FB()}*/>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "38%" }} onClick={this.FactbookList1}> <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* ********************* */}

         
        </div>

      </>
    );
  }

}

const Navigateur = ({
  toggle3,
  toggle6,
  ajouterRapportAttachement,
  handleRapportselectedchange,

  TAGS_New,
  Report_Name,
  Report_Name_Enregistrer,

  Report_Description,

  listRapportglobal,

  handleChange,

  Email_Attachement,
  btndelete_Email_Attachement,
  editRapport,
  
}) => {

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
//      input.removeEventListener("keyup", matna7inich)
    }



  }, [])

  useEffect(() => {

    //console.log('---Report_Name--->', Report_Name)


  }, [Report_Name])


  useEffect(() => {

    //console.log('---Report_Name--->', Report_Name)
    //console.log('---Report_Description--->', Report_Description)
    //console.log('---TAGS_New--->', TAGS_New)


  }, [Report_Name, Report_Description, TAGS_New, Report_Name_Enregistrer])

  return (<>

    <MDBModalHeader toggle={toggle3}>Rapport</MDBModalHeader>

    <MDBModalBody>

      {/* <Rapport Tableaux={Tableaux} TAGS={TAGS} Master={Master} filterMaster={filterMaster} filterTAGS={filterTAGS} listMaster={listMaster} filterTableaux={filterTableaux} listRapportglobal={listRapportglobal} resetvalueoffilter={resetvalueoffilter} listTAGS={listTAGS} listTableau={listTableau} handleChange={handleChange} filterRapportglobal={filterRapportglobal} handleRapportselectedchange={handleRapportselectedchange} /> */}
      {listRapportglobal.length != 0 && 
      <FilterV1 filterName={"Rapport"}
         outSelected={handleRapportselectedchange}
        // outAllFiltred={outAllFiltred}
        filter={[{ Report_TableauName: "Tableaux" }, { TAGS: "Mot Clé" }, { Report_Master: "Master" }]}
        display={{ separator: "", elems: ["Report_Name"] }}
        data={listRapportglobal}
        styleScroll={{ width: "100%", maxHeight: "350px" }}
        btnEdit={true} />
        }
      <MDBRow style={{ margin: "1%" }} >
        <MDBCol size="11" >
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Rapport Sélectionnez
          </label>
          <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={Email_Attachement} onChange={handleChange} disabled />
        </MDBCol>
        <MDBCol size="1">
          <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "30px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndelete_Email_Attachement}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
        </MDBCol>
      </MDBRow  >
      {editRapport == false && Report_Name ? (<MDBRow style={{ margin: "1%" }}>
        <MDBCol size="12">
          <MDBBtn color="#bdbdbd grey lighten-1" style={{ width: "100%" }} onClick={toggle6} > On peut copier le même rapport avec changement les données  <MDBIcon icon="file-invoice" className="ml-2" /> </MDBBtn></MDBCol></MDBRow>) : null}




    </MDBModalBody>
    <MDBModalFooter>

      <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={ajouterRapportAttachement}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
  
  
    </MDBModalFooter>
  </>);
}

const ModalFactBook = ({ toggle7, listes, handleChange, FactBookClick, NomFactbbok, Factbook_Membre }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterFactbook_Liste, setfilterFactbook_Liste] = useState([])
  const scrollContainerStyle2 = { width: "100%", maxHeight: "230px" };
  useEffect(() => {

    console.log("--------Listes_Ml------->", listes)
  }, [listes])

  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterFactbook_Liste.length == 0) {
      setfilterFactbook_Liste(listes)
    }
    if (listes.length != 0) {
      const FilterFactbookListe = (e) => {

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

        setfilterFactbook_Liste(listes.filter((el) => el.Nom_FactBook.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterFactbookListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterFactbookListe)
      }

    }

  }, [listes])
  //////////////////////
  useEffect(() => {
    //if(!filterFactbook_Liste)return
    console.log('---filterFactbook_Liste--->', filterFactbook_Liste)



  }, [filterFactbook_Liste])

  return (
    <>
      <MDBModalHeader toggle={toggle7} >Sélectionnez une liste:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12" style={{ height: "240px" }}>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des FactBook
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="NomFactbbok" value={NomFactbbok} onChange={handleChange} size="8" >
              <option></option>
              {filterFactbook_Liste.map(liste => <option key={liste.Code_FactBook} id={liste.Code_FactBook} onClick={(e) => FactBookClick(liste.Code_FactBook, liste.Nom_FactBook, liste.Factbook_Membre, e)}>  {liste.Nom_FactBook} </option>)}

            </select>
          </MDBCol>

          {Factbook_Membre.length != 0 ? (<MDBCol className='p-0'>
            <MDBCol style={{ marginLeft: "1%" }}>
              <br />
              <div className="d-flex justify-content-between " className="grey-text">
                <p className=" m-0 p-0">Liste des rapports d'un FactBook : </p>
              </div>
              <br />

              <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }} >
                <br />
                <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle2} id="myFilter">
                  {Factbook_Membre.map((Factbook_Membre, i) => <MDBListGroupItem hover key={i} name="Report_Name" value={Factbook_Membre.Report_Name} style={{ padding: 0.5 + 'em' }} id={Factbook_Membre.Report_Code} hover >{Factbook_Membre.Report_Name}</MDBListGroupItem>)}
                </MDBListGroup>
              </MDBContainer>
            </MDBCol>
          </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}

export default Email;


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


