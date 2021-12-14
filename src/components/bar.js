import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";
import logo from "../logobizeyes.png";
import "./bar.css"
class NavbarPage extends Component {
state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  return (
      <MDBNavbar className="bizeyes"  dark>
        <MDBNavbarBrand href="#">
          <img src={logo} height="45" alt="logo" />
        </MDBNavbarBrand>
        <MDBNavbarBrand href="#"className="ms-3">
        <p className="nav-h2" >REAL TIME MONITORING SYSTEM : ElMazraa </p>
        
        </MDBNavbarBrand>
        
      </MDBNavbar>
    );
  }
}

export default NavbarPage;