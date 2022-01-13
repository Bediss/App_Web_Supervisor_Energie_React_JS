
import { makeAutoObservable, action } from "mobx";

import axios from '../../src/components/axios';
export class testStore {
  apiPath = "http://192.168.3.91:8000/api/"
  name = "test";
  pathHome = "";
  user = {}
  adHoc={init:false}
  ui = { saisie: false, user: false, rapporteur: false, admin: false, superUser: false }
  ui2 = {
    navigateur: false,
    Factbook: false,
    hotListe: false,
    Rapport: false,
    FBL: false,
    ML: false,
    CL: false,
    TL: false,
    CasIncidents: false,
    CasReguliers: false,
    Emails: false,
    CasEmails: false,
    Utilisateurs: false,
    Mailing: false,
    Saisie: false
  }
  constructor() {
    makeAutoObservable(this);
  }

  setAdHoc=(i)=>{
    if (typeof i == "object"){
      const type=i.type
      const reportId=i.reportId
      localStorage.setItem("adHoc",JSON.stringify({type,reportId,init:true}))
      this.adHoc=Object.assign({},i,{init:true})
    }
  }

  getUI = () => {
    return this.ui

  }


  setUser = async () => {
    return axios.get(window.apiUrl + "getUser/")
      .then(
        ({ data }) => {

          //    document.querySelector("body").classList.remove("isLoading")
          this.user = data;
          this.ui.saisie = (data?.userType || []).includes("saisie")
          this.ui.user = (data?.userType || []).includes("user")
          this.ui.rapporteur = (data?.userType || []).includes("rapporteur")
          this.ui.admin = (data.userType).includes("admin")
          this.ui.superUser = (data?.userType || []).includes("superUser")
          const a = {
            saisie: "/saisie",
            user: "/Navigateur",
            rapporteur: "/Navigateur",
            admin: "/Navigateur",
            superUser: "/Navigateur",
          }

          switch (true) {
            case this.ui.user: {
              this.pathHome = a.user
            }
              break;
            case this.ui.saisie: {
              this.pathHome = a.saisie
            }
              break;
            case this.ui.rapporteur: {
              this.pathHome = a.rapporteur
            }
              break;
            case this.ui.admin: {
              this.pathHome = a.admin
            }
              break;
            case this.ui.superUser: {
              this.pathHome = a.superUser
            }
              break;
          }

          return data
        }
      )
      .catch(({ response }) => {
        if (response != null) {
          if (response.status == "401") {
            // document.querySelector("body").classList.remove("isLoading")
            //   window.location.assign("/")

            // localStorage.clear();
          }

        }
      }
      )

  };



  // setpathHomeStore =(pathHome)=>{
  //   console.log("pathHome",pathHome)
  //   this.pathHome=pathHome

  //    }
  getpathHomeStore = () => {

    return this.pathHome
  }

  getUitStore2 = () => {

    if (this.ui.superUser == true) {
      this.ui2.navigateur = true
      this.ui2.Factbook = true
      this.ui2.hotListe = true
      this.ui2.Rapport = true
      this.ui2.FBL = true
      this.ui2.ML = true
      this.ui2.CL = true
      this.ui2.TL = true
      this.ui2.CasIncidents = true
      this.ui2.CasReguliers = true
      this.ui2.Emails = true
      this.ui2.CasEmails = true
      this.ui2.Mailing = true
      this.ui2.Utilisateurs = true
      this.ui2.Saisie = true
    }
    if (this.ui.admin == true) {
      this.ui2.navigateur = true
      this.ui2.Factbook = true
      this.ui2.hotListe = true
      this.ui2.Rapport = true
      this.ui2.FBL = true
      this.ui2.ML = true
      this.ui2.CL = true
      this.ui2.TL = true
      this.ui2.CasIncidents = true
      this.ui2.CasReguliers = true
      this.ui2.Emails = true
      this.ui2.CasEmails = true
      this.ui2.Mailing = true
      this.ui2.Utilisateurs = true
      this.ui2.Saisie = true
    }

    if (this.ui.rapporteur == true) {
      this.ui2.navigateur = true
      this.ui2.Factbook = true
      this.ui2.hotListe = true
      this.ui2.Rapport = true
      this.ui2.FBL = true
      this.ui2.ML = true
      this.ui2.CL = true
      this.ui2.TL = true
      this.ui2.CasIncidents = true
      this.ui2.CasReguliers = true
      this.ui2.Emails = true
      this.ui2.CasEmails = true
      this.ui2.Mailing = true
    }

    if (this.ui.user == true) {
      this.ui2.navigateur = true
      this.ui2.Factbook = true
      this.ui2.hotListe = true

    }



    if (this.ui.saisie == true) {
      this.ui2.Saisie = true
    }


    // /********************************************** */


    return this.ui2;
  };





  getUserType = () => {
    return this.user.userType;
  };





}



export class uitStore {
  ui = {
    "navigateur": false,
    "Factbook": false,
    "hotListe": false,
    "Rapport": false,
    "FBL": false,
    "ML": false,
    "CL": false,
    "TL": false,
    "CasIncidents": false,
    "CasReguliers": false,
    "Emails": false,
    "CasEmails": false,
    "CasEmails": false,
    "Utilisateurs": false,
    "Saisie": false
  }

  CasIncidents = {
    basic: false,
    advanced: false,
    needConfirmationAdvanced: false,
    needConfirmationBasic: false,
  }
  setIncState = (op = "") => {
    switch (op) {
      // case false:
      //   this.CasIncidents.basic = false
      //   this.CasIncidents.advanced = false
      case "basic":
        this.CasIncidents.basic = true
        this.CasIncidents.advanced = false
        break;
      case "advanced":
        this.CasIncidents.basic = false
        this.CasIncidents.advanced = true
        break;
      default:
        this.CasIncidents.basic = false
        this.CasIncidents.advanced = false
        break;
    }
  }

  getIncState(op = "") {
    switch (op) {
      case "basic":
        return this.CasIncidents.basic
      case "advanced":
        return this.CasIncidents.advanced
      default:
        break;
    }
  }

  setNeedConfirmation = (op = "", state = false) => {

    switch (op) {
      case "basic":
        this.CasIncidents.needConfirmationBasic = Boolean(state)
        this.CasIncidents.needConfirmationAdvanced = !Boolean(state)
        break;
      case "advanced":
        this.CasIncidents.needConfirmationAdvanced = Boolean(state)
        this.CasIncidents.needConfirmationBasic = !Boolean(state)
        break;
      default:
        this.CasIncidents.needConfirmationBasic = false
        this.CasIncidents.needConfirmationAdvanced = false
        console.log("aaaaaaa-----------------", Boolean(state), op)
        break;
    }
    this.CasIncidents.needConfirmation = Boolean(state)
  }

  getNeedConfirmation = (op = "") => {
    switch (op) {
      case "basic":
        return this.CasIncidents.needConfirmationBasic
      case "advanced":
        return this.CasIncidents.needConfirmationAdvanced
    }
  }

  getUitStore = () => {
    return this.ui;
  };



  constructor() {
    makeAutoObservable(this);
  }
}