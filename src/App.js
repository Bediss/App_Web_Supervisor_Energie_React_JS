import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./index.css";

//import { Router } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from "../src/components/navbar";
import Bar from "../src/components/bar";
import CasEmail from './components/Rapporteur/Action/CasEmail';
import Login from '../src/components/login/login';
import CasIncidents from '../src/components/Rapporteur/Cas/CasIncidents/CasIncidents';
import CasReguliers from './components/Rapporteur/Cas/CasReguliers';
import Utilisateurs from "./components/Admin/utilisateurs";
import AccessGroup from "./components/Admin/accessgroup";
import MailingListes from "./components/Rapporteur/Action/MailingListes";
import Compteur_Listes from "./components/Rapporteur/Data_Selecteur/Compteur_Listes";
import MesuresListes from "./components/Rapporteur/Data_Selecteur/MesuresListes";

import FactBook from "./components/Rapporteur/Rapport/FactBook";
import Email from "./components/Rapporteur/Action/Email";
import TimeIntelligence from "./components/Rapporteur/Data_Selecteur/TimeIntelligence";
import CreateurRapport from "./components/Rapporteur/Rapport/CreateurRapport/CreateurRapport";
import Rapport from "./components/Rapporteur/Rapport/CreateurRapport/Rapport";
import HotListe from "./components/Hot_Liste/HotListe";

import Superviseur from "./components/Superviseur/Superviseur";

import Navigateur from "./components/NavigateurTableau/Navigateur";
import NavigateurFactBook from "./components/NavigateurFactBook/NavigateurFactBook";
import { createBrowserHistory } from "history";
import Aa from "./a"
const history = createBrowserHistory();


class App extends Component {

  render() {
    return (

      <Router  history={history} >


{this.props.location.pathname === "/"?""  :  <Bar />}
        <div>
          {this.props.location.pathname === "/"||  
          this.props.location.pathname === "/HotListe" ||
          this.props.location.pathname === "/Navigateur" ||
           this.props.location.pathname === "/NavigateurFactBook" ? "" : 
           <Navbar history={history}/>}

          <Switch>
            {/**Rapporteur */}
            <Route path='/Navigateur' component={Navigateur}  />
            <Route path='/NavigateurFactBook' component={NavigateurFactBook}  />
            <Route path='/HotListe' component={HotListe}  />
            <Route path='/Rapporteur/CasEmail' component={CasEmail} />
            <Route path='/Rapporteur/CasIncidents' component={CasIncidents} />
            <Route path='/Rapporteur/CasReguliers' component={CasReguliers} />
            <Route path='/Rapporteur/Email' component={Email} />
            <Route path='/Rapporteur/MailingListes' component={MailingListes} />
            <Route path='/Rapporteur/Compteur_Listes' component={Compteur_Listes} />
            <Route path='/Rapporteur/MesuresListes' component={MesuresListes} />
            <Route path='/Rapporteur/FactBook' component={FactBook} />
            <Route path='/Rapporteur/TimeIntelligence' component={TimeIntelligence} />
            <Route path='/Rapporteur/CreateurRapport' component={CreateurRapport} />
            <Route path='/Rapporteur/Rapport' component={Rapport} />
            <Route path='/a' component={Aa} />
            {/**login */}
            <Route path='/' component={Login} />
            {/**Admin */}
            {/* <Route path='/Admin/Utilisateurs' component={Utilisateurs} /> */}
            {/* <Route path='/Admin/AccessGroup' component={AccessGroup} /> */}
            {/**Superviseur */}
            {/* <Route path='/Superviseur/Superviseur' component={Superviseur} /> */}
          </Switch>
        </div>
      </Router>

    );
  }
}

export default withRouter(App);
