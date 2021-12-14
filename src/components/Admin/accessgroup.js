//import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBRow, MDBCol, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import axios from 'axios';
import uuid from 'react-uuid';
import Moment from 'moment';
class AccessGroup extends React.Component {
    el = React.createRef();
    mytable = "Tabulator"; //variable to hold your table
    tableData = [] //data for table to display
    getDate() {

        var date = { currentTime: new Date().toLocaleString() };
        this.setState({
            date: date
        });
    }

    componentDidMount() {
        // this.senddata();


    }
    constructor(props) {
        super(props)
        this.state = {
            dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss'),
            group1: '',
            group2: '',
            group3: '',
            group4: '',
            group5: '',
            group6: '',
            group7: '',
            group8: '',
            group9: '',
            group10: '',
            group11: '',
            group12: '',
            group13: '',
            group14: 'Admin',
            group15: 'Developer',

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    senddata() {
        self = this 
        axios.post(window.apiUrl+"accessgroupnames/", {
            identifier: this.state.dateDMY+uuid(),
            Group1: this.state.group1,
            Group2: this.state.group2,
            Group3: this.state.group3,
            Group4: this.state.group4,
            Group5: this.state.group5,
            Group6: this.state.group6,
            Group7: this.state.group7,
            Group8: this.state.group8,
            Group9: this.state.group9,
            Group10: this.state.group10,
            Group11: this.state.group11,
            Group12: this.state.group12,
            Group13: this.state.group13,
            Group14: this.state.group14,
            Group15: this.state.group15,
        }
        )
            .then((response) => {
                console.log("login");
                console.log(response.status);
                console.log(response.statusText);
                console.log(response);
                console.log("data",response.data);
                

            })
            .catch((err) => console.error(err));
    }




    render() {

        return (

            <div>
                <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
                    <MDBBreadcrumbItem>  Admin</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem > Privilege Definition</MDBBreadcrumbItem>
                </MDBBreadcrumb>

                <div>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="4" style={{ marginRight: 1.5 + 'em' }}>
                                <MDBRow >
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 1
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group1" value={this.state.group1} onChange={this.handleChange}  />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 2
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group2" value={this.state.group2} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 3
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group3" value={this.state.group3} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 4
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group4" value={this.state.group4} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 5
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group5" value={this.state.group5} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 6
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group6" value={this.state.group6} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 7
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group7" value={this.state.group7} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend" >
                                            <span className="input-group-text" id="basic-addon">
                                                Group 8
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group8" value={this.state.group8} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                            </MDBCol>

                            <MDBCol md="4">
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 9
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group9" value={this.state.group9} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 10
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group10" value={this.state.group10} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 11
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group11" value={this.state.group11} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 12
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group12" value={this.state.group12} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 13
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" name="group13" value={this.state.group13} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 14
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" value={this.state.group14} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow>
                                    <div className="input-group" style={{ marginTop: 1.5 + 'em' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                Group 15
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" value={this.state.group15} onChange={this.handleChange} />
                                    </div>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    
                        <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.senddata.bind(this)}>Enregistrer</MDBBtn>
                    </MDBContainer>

                </div>
                
            </div>






        )
    }
}


export default AccessGroup