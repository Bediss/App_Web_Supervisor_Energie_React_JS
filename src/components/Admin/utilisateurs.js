//import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import axios from 'axios';
import uuid from 'react-uuid';
import Moment from 'moment';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBModal, MDBModalHeader, MDBModalBody, MDBContainer, MDBRow, MDBCol, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import SimpleReactValidator from 'simple-react-validator';
import { Multiselect } from 'multiselect-react-dropdown';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import MultiSelectAll from "./MultiSelectAll";
import Swal from 'sweetalert2';
import Navbar from "../navbar";
// import { useForm } from "react-hook-form";

// const { register, handleSubmit } = useForm();

// const onSubmit = data => console.log(data);
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

class Utilisateurs extends React.Component {
    el = React.createRef();
    mytable = "Tabulator"; //variable to hold your table
    tableData = [] //data for table to display

    ///////////////

    //////////////////////////
    getDate() {

        var date = { currentTime: new Date().toLocaleString() };
        this.setState({
            date: date
        });
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.state.errors = {
            User_Master_Name: ' ', // au moins 5 caractére
            Email_User_Master: ' ',//email
            User_Master_Pseudo: ' ',//Login//
            Password: ' ', //Login//Mot de passe
          //  SMS_User_Master: ' ', //SMS TYPE Email
           // User_Tel: ' ', //Telephone Number
          //  Fax_User_Master: ' ', //Number
        }
        this.state.User_Master_Code = "";
        this.state.User_Master_Name = "";
        this.state.Email_User_Master = "";
        this.state.User_Master_Pseudo = "";
        this.state.Password = "";
        this.state.SMS_User_Master = "";
        this.state.User_Tel = "";
        this.state.Fax_User_Master = "";
        this.state.BU_Master = "";
        this.state.Fonction_Master = "";
    };
    toggle1 = () => {
        if (this.state.datamodifier.length != []) {
            this.setState({
                modal1: !this.state.modal1
            })
            this.state.errors = {
                User_Master_Name: '', // au moins 5 caractére
                Email_User_Master: '',//email
                User_Master_Pseudo: '',//Login//
                Password: '', //Login//Mot de passe
                //SMS_User_Master: '', //SMS TYPE Email
              //  User_Tel: '', //Telephone Number
               // Fax_User_Master: '', //Number
            }
            this.state.datamodifier.push();

            this.state.User_Master_Name = this.state.datamodifier[0].User_Master_Name;
            this.state.Email_User_Master = this.state.datamodifier[0].Email_User_Master;

            this.state.User_Master_Pseudo = this.state.datamodifier[0].User_Master_Pseudo;

            this.state.Password = this.state.datamodifier[0].Password;
            this.state.Access_Groupe_User = this.state.datamodifier[0].Access_Groupe_User;
            this.state.SMS_User_Master = this.state.datamodifier[0].SMS_User_Master;
            this.state.User_Tel = this.state.datamodifier[0].User_Tel;
            this.state.Fax_User_Master = this.state.datamodifier[0].Fax_User_Master;
            this.state.User_Master_Code = this.state.datamodifier[0].User_Master_Code;

            this.state.BU_Master = this.state.datamodifier[0].BU_Master;
            this.state.Fonction_Master = this.state.datamodifier[0].Fonction_Master;
            this.state.position = this.state.datamodifier[1];
        } else {
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

    };


    componentDidMount() {
        const supprimertemp = this.state.supprimertemp;
        const datamodifier = this.state.datamodifier;
        /// api tabulator
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
                (result) => {
                    console.log(result.data)
                    if (result.data !== null) {
                        
                        this.tableData = result.data;
                        //tabulator
                        

                        console.log("Utilisateur");
                        console.log(result.data);
                    } else {
                        console.log('no data change')
                        this.tableData = ''
                      }

                      this.mytable = new Tabulator(this.el, {
                        data: this.tableData,
                        //link data to table
                        reactiveData: true, //enable data reactivity
                        addRowPos: "top",
                        pagination: "local",
                        paginationSize: 6,
                        paginationSizeSelector: [3, 6, 8, 10],
                        printRowRange: "selected",
                        selectable: 1,
                        selectablePersistence: this.state.position,
                        columns: [
                            {
                                hozAlign: "center",

                                headerSort: false,
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }
                            },
                            {
                                title: "Nom de l'utilisateur",
                                field: "User_Master_Name",
                                width: "10%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }
                            },

                            {
                                title: "Email",
                                field: "Email_User_Master",
                                width: "10%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }
                            },
                            {
                                title: "LOGIN",
                                field: "User_Master_Pseudo",
                                width: "10 %",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }
                            },
                            {
                                title: "SMS",
                                field: "SMS_User_Master",
                                width: "12%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }
                            },
                            {
                                title: "Telephone",
                                field: "User_Tel",
                                width: "12%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }

                            },


                            {
                                title: "Fax",
                                field: "Fax_User_Master",
                                width: "12%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }



                            },
                            {
                                title: "BU_Master",
                                field: "BU_Master",
                                width: "12%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

                                }



                            },
                            {
                                title: "Fonction",
                                field: "Fonction_Master",
                                width: "12%",
                                cellClick: function (e, cell, row) {
                                    var position = cell.getRow().getPosition()
                                    console.log(position);
                                    datamodifier.splice(0, 2);
                                    datamodifier.push(cell.getData(), position);
                                    console.log("valider", datamodifier)

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
                                    //alert("confirmation de Suppression" + " " + cell.getData().User_Master_Name);

                                    supprimertemp.push(
                                        {
                                            "User_Master_Code": cell.getData().User_Master_Code,
                                            "User_Master_Name": cell.getData().User_Master_Name,
                                            "User_Master_Pseudo": cell.getData().User_Master_Pseudo,
                                            "Email_User_Master": cell.getData().Email_User_Master,
                                            "SMS_User_Master": cell.getData().SMS_User_Master,
                                            "User_Tel": cell.getData().User_Tel,
                                            "Fax_User_Master": cell.getData().Fax_User_Master,
                                            "Access_Groupe_User": cell.getData().Access_Groupe_User,
                                            "BU_Master": cell.getData().BU_Master,
                                            "Fonction_Master": cell.getData().Fonction_Master,
                                            "Password": cell.getData().Password,
                                            "DBAction": 3
                                        })


                                    console.log(supprimertemp)
                                    cell.getRow().delete();
                                    Swal.fire({
                                        toast: true,
                                        position: 'top',
                                        showConfirmButton: false,
                                        timer: 4000,
                                        width: 300,
                                        icon: '',
                                        title: 'Supprimer temporairement l\'utilisateur ' + cell.getData().User_Master_Name

                                    })
                                },
                                hideInHtml: true,

                            },

                        ], //define table columns



                    });



                }
            )


    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'User_Master_Name':
                errors.User_Master_Name =
                    value.length < 5 /* && typeof value.length == "string" */
                        ? 'Nom doit comporter au moins 5 caractères!'
                        : '';
                break;
            case 'Email_User_Master':
                errors.Email_User_Master =
                    validEmailRegex.test(value)
                        ? ''
                        : 'L\'email n\'est pas valide!';
                break;
            case 'User_Master_Pseudo':
                errors.User_Master_Pseudo =
                    value.length < 5
                        ? 'Pseudo doit comporter au moins 5 caractères!'
                        : '';
                break;
            case 'Password':
                errors.Password =
                    value.length < 8
                        ? 'Password doit comporter au moins 8 caractères!'
                        : '';
                break;
            // case 'SMS_User_Master':
            //     errors.SMS_User_Master =
            //         validEmailRegex.test(value)
            //             ? ''
            //             : 'SMS n\'est pas valide!';
            //     break; 
            // case 'User_Tel':
            //     errors.User_Tel =
            //         validPhoneRegex.test(value) && value.length > 7
            //             ? ''
            //             : 'Numéro de Telephone n\'est pas valide!';
            //     break;
            // case 'Fax_User_Master':
            //     errors.Fax_User_Master =
            //         validPhoneRegex.test(value) && value.length > 7
            //             ? ''
            //             : 'Numéro de Fax n\'est pas valide!';
            //     break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });

    }


    /*    handleSubmit = (event) => {
           event.preventDefault();
           console.log(validateForm(this.state.errors))
           if (validateForm(this.state.errors)) {
               console.info('Valid Form')
           } else {
               console.error('Invalid Form')
           }
       } */


    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();

        this.state = {
            history:props.history,
            modal: false,
            modal1: false,
            dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss'),
            casalarem: [],
            User_Master_Name: '',
            Email_User_Master: '',
            User_Master_Pseudo: '',
            Password: '',
            Access_Groupe_User: '',
            SMS_User_Master: '',
            User_Tel: '',
            Fax_User_Master: '',
            BU_Master: '',
            Fonction_Master: '',
            User_Master_Code: '',
            ajout: "",
            ajoutertemp: [],
            modificationtemp: [],
            datamodifier: [],
            modificationtemp: [],
            supprimertemp: [],
            errors: {
                User_Master_Name: '* Obligatoire', // au moins 5 caractére
                Email_User_Master: '* Obligatoire',//email
                User_Master_Pseudo: '* Obligatoire',//Login//
                Password: '* Obligatoire', //Login//Mot de passe
                //Access_Groupe_User: '* Obligatoire',//number access group
        //        SMS_User_Master: '* Obligatoire', //SMS TYPE Email
         //       User_Tel: '* Obligatoire', //Telephone Number
         //       Fax_User_Master: '* Obligatoire', //Number
                //BU_Master: ' ',
                // Fonction_Master: ' ',
                //User_Master_Code: '',
            }
            // options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],


        }
        this.handleChange = this.handleChange.bind(this);
        this.ajouter = this.ajouter.bind(this);
        this.Enregistrer = this.Enregistrer.bind(this);
        this.modifier = this.modifier.bind(this);
    }
    Enregistrer() {
        if(this.state.ajoutertemp.length != 0 || this.state.modificationtemp != 0 || this.state.supprimertemp != 0){
        axios.post(window.apiUrl + "updatedelete/", {
            tablename: "User_Master",
            identifier: this.state.dateDMY + uuid(),
            datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),
            //"User_Master_Code;User_Master_Name;User_Master_Pseudo;Email_User_Master;SMS_User_Master;User_Tel;Fax_User_Master;Access_Groupe_User;BU_Master;Fonction_Master;Password;DBAction"

            // datatodelete: ["User_Master_Code;User_Master_Name;User_Master_Pseudo;Email_User_Master;SMS_User_Master;User_Tel;Fax_User_Master;Access_Groupe_User;BU_Master;Fonction_Master;Password;DBAction"].concat(this.state.supprimertemp)
        }
        )
            .then((response) => {
                console.log("Enregistrer");
                console.log(response.status);
                console.log(response.statusText);
                console.log(response);
                console.log(response.data);
                //loading()
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
        }, 3000);

    }else{
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            width: 300,
            icon: 'warning',
            title: 'Aucune donnée à enregistrer'

        })

    }
    }


    ajouter() {
        self = this
        //console.log(validateForm(this.state.errors))
        if (validateForm(this.state.errors) == true) {
            this.setState({
                modal: !this.state.modal
            });
            axios.post(window.apiUrl + "sendid/",
                {
                    tablename: "User_Master",
                    identifier: this.state.dateDMY + uuid(),
                    nombermaxcode: '1',
                    primaryfield: "User_Master_Code",
                    fields: "*",
                    content: "*",

                }
            )
                .then(
                    (result) => {

                        //  this.state.User_Master_Code = result.data.substring(1, result.data.length-1);
                        var code = result.data.split(", ")
                        this.state.User_Master_Code = code
                        console.log("User_Master_Code")
                        console.log(this.state.User_Master_Code)

                        if (this.state.User_Master_Code == "") {
                            alert("Un champ n'est pas remplie");
                            return false;
                        }

                        const User_Master_Code = this.state.User_Master_Code[0];
                        const User_Master_Name = this.state.User_Master_Name;
                        const Email_User_Master = this.state.Email_User_Master;
                        const User_Master_Pseudo = this.state.User_Master_Pseudo;
                        const Password = this.state.Password;
                        const Access_Groupe_User = localStorage.getItem('acesscode')
                        const SMS_User_Master = this.state.SMS_User_Master;
                        const User_Tel = this.state.User_Tel;
                        const Fax_User_Master = this.state.Fax_User_Master;
                        const BU_Master = this.state.BU_Master;
                        const Fonction_Master = this.state.Fonction_Master;
                        const DBAction = "2";


                        this.state.ajout = (

                            {
                                "User_Master_Code": User_Master_Code,
                                "User_Master_Name": User_Master_Name,
                                "User_Master_Pseudo": User_Master_Pseudo,
                                "Email_User_Master": Email_User_Master,
                                "SMS_User_Master": SMS_User_Master,
                                "User_Tel": User_Tel,
                                "Fax_User_Master": Fax_User_Master,
                                "Access_Groupe_User": Access_Groupe_User,
                                "BU_Master": BU_Master,
                                "Fonction_Master": Fonction_Master,
                                "Password": Password,
                                "DBAction": DBAction
                            }
                        )

                        this.state.ajoutertemp.push(this.state.ajout);


                        this.mytable.addRow({ User_Master_Name, Email_User_Master, User_Master_Pseudo, SMS_User_Master, User_Tel, Fax_User_Master, BU_Master, Fonction_Master }, true);
                        //console.log(this.state.ajout);
                        //console.log(this.state.ajoutertemp);
                        this.state.User_Master_Code = "";
                        this.state.User_Master_Name = "";
                        this.state.Email_User_Master = "";
                        this.state.User_Master_Pseudo = "";
                        this.state.Password = "";
                        this.state.SMS_User_Master = "";
                        this.state.User_Tel = "";
                        this.state.Fax_User_Master = "";
                        this.state.BU_Master = "";
                        this.state.Fonction_Master = "";

                        return true;

                    })
            /************************************************************* */
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 300,
                icon: 'success',
                title: 'Ajouter'

            })
            /************************************************************ */
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



    
    /********************* */
    modifier() {
        this.setState({
            modal1: !this.state.modal1
        });
        const User_Master_Name = this.state.User_Master_Name;
        const Email_User_Master = this.state.Email_User_Master;
        const User_Master_Pseudo = this.state.User_Master_Pseudo;
        const Password = this.state.Password;
        const Access_Groupe_User = this.state.Access_Groupe_User;
        const SMS_User_Master = this.state.SMS_User_Master;
        const User_Tel = this.state.User_Tel;
        const Fax_User_Master = this.state.Fax_User_Master;
        const User_Master_Code = this.state.User_Master_Code;
        const BU_Master = this.state.BU_Master;
        const Fonction_Master = this.state.Fonction_Master;

        const DBAction = "1";
        // push with modificationtemp 
        this.state.modificationtemp.push({

            "User_Master_Code": User_Master_Code,
            "User_Master_Name": User_Master_Name,
            "User_Master_Pseudo": User_Master_Pseudo,
            "Email_User_Master": Email_User_Master,
            "SMS_User_Master": SMS_User_Master,
            "User_Tel": User_Tel,
            "Fax_User_Master": Fax_User_Master,
            "Access_Groupe_User": Access_Groupe_User,
            "BU_Master": BU_Master,
            "Fonction_Master": Fonction_Master,
            "Password": Password,
            "DBAction": DBAction
        }

        )





        /* User_Master_Code + ";" + User_Master_Name + ";" + User_Master_Pseudo + ";" + Email_User_Master + ";" +
        SMS_User_Master + ";" + User_Tel + ";" + Fax_User_Master + ";" + Access_Groupe_User +
        ";" + BU_Master + ";" + Fonction_Master + ";" + Password + ";" + DBAction); */
        console.log(this.state.modificationtemp);
        this.mytable.redraw(true);

        console.log(Object.keys(this.mytable.getData()));
        this.tableData[this.state.position].User_Master_Name = User_Master_Name;
        this.tableData[this.state.position].User_Master_Pseudo = User_Master_Pseudo;
        this.tableData[this.state.position].Email_User_Master = Email_User_Master;
        this.tableData[this.state.position].SMS_User_Master = SMS_User_Master;
        this.tableData[this.state.position].User_Tel = User_Tel;
        this.tableData[this.state.position].Fax_User_Master = Fax_User_Master;
        this.tableData[this.state.position].User_Master_Code = User_Master_Code;
        this.tableData[this.state.position].BU_Master = BU_Master;
        this.tableData[this.state.position].Fonction_Master = Fonction_Master;
        //console.log("testttttt  " + [User_Master_Name, Email_User_Master, User_Master_Pseudo, SMS_User_Master, User_Tel, Fax_User_Master, User_Master_Code, BU_Master, Fonction_Master])
        this.state.User_Master_Name = "";
        this.state.Email_User_Master = "";
        this.state.SMS_User_Master = "";
        this.state.User_Tel = "";
        this.state.Fax_User_Master = "";
        this.state.User_Master_Code = "";
        this.state.BU_Master = "";
        this.state.Fonction_Master = "";
        this.lod();
    }
    /************************************* */
    render() {
        const { errors } = this.state;
        return (

            <>
                <Navbar history={this.state.history}/>
                <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
                    <MDBBreadcrumbItem>  Admin</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem > Utilisateurs</MDBBreadcrumbItem>
                </MDBBreadcrumb>
                <div style={{ margin: 30 }}>
                    <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn>


                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered
                        onSubmit={this.handleSubmit} noValidate>
                        <MDBModalHeader toggle={this.toggle} >Nouveau Utilisateur</MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol size="6">
                                    <div className="form-group">
                                        <label htmlFor="defaultFormLoginEmailEx6" className="grey-text" >
                                            Nom de l'utilisateur <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx6" name="User_Master_Name" className="form-control" value={this.state.User_Master_Name} onChange={this.handleChange} required />
                                        {errors.User_Master_Name.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Master_Name}</span>}
                                    </div>
                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group">
                                        <label htmlFor="defaultFormLoginEmailEx7" className="grey-text" >
                                            Email 
                                        </label><span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                        <input type="email" id="Email_User_Master" validate
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            name="Email_User_Master" className="form-control"
                                            value={this.state.Email_User_Master}
                                            onChange={this.handleChange} required />
                                        {errors.Email_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_User_Master}</span>}
                                    </div>
                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                                            <legend style={{ width: "70px", color: "#51545791" }}>Login <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>


                                            <MDBInput label="Pseudo" outline size="sm" type="text" className="form-control" placeholder="" autoComplete="off" name="User_Master_Pseudo" value={this.state.User_Master_Pseudo} onChange={this.handleChange} />
                                            {errors.User_Master_Pseudo.length > 0 &&
                                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Master_Pseudo}</span>}


                                            <MDBInput
                                                type="password"
                                                autoComplete="off"
                                                label="Mot de passe"
                                                outline size="sm"
                                                className="form-control"
                                                placeholder=""
                                                name="Password" value={this.state.Password} onChange={this.handleChange} required />
                                            {errors.Password.length > 0 &&
                                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Password}</span>}
                                            <MultiSelectAll name="Access_Groupe_User" value={this.state.Access_Groupe_User} onChange={this.handleChange} />
                                        </fieldset>
                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx1" className="grey-text" >
                                            SMS 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx1" name="SMS_User_Master" className="form-control" value={this.state.SMS_User_Master} onChange={this.handleChange} required />
                                        {/* {errors.SMS_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.SMS_User_Master}</span>} */}

                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: -7 + 'em', marginLeft: 15.5 + 'em', width: '217px' }}>
                                        <label htmlFor="defaultFormLoginEmailEx2" className="grey-text" >
                                            Telephone 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx2" name="User_Tel" className="form-control" value={this.state.User_Tel} onChange={this.handleChange} required />
                                        {/* {errors.User_Tel.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Tel}</span>} */}

                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: -2 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx3" className="grey-text" >
                                            Fax 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx3" name="Fax_User_Master" className="form-control" value={this.state.Fax_User_Master} onChange={this.handleChange} required />
                                        {/* {errors.Fax_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Fax_User_Master}</span>}
                                    */}</div> 

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx4" className="grey-text" >
                                            BU_Master
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx4" name="BU_Master" className="form-control" value={this.state.BU_Master} onChange={this.handleChange} required />

                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx5" className="grey-text" >
                                            Fonction
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx5" name="Fonction_Master" className="form-control" value={this.state.Fonction_Master} onChange={this.handleChange} required />
                                    </div>

                                </MDBCol>
                            </MDBRow>


                        </MDBModalBody>
                        <MDBModalFooter>

                            <MDBBtn className='submit' color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" type="submit" />Ajouter</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>









                    <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod"  >Modifier</MDBBtn>


                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} centered>
                        <MDBModalHeader toggle={this.toggle1} >Modifier Utilisateur</MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol size="6">
                                    <div className="form-group">
                                        <label htmlFor="defaultFormLoginEmailEx6" className="grey-text" >
                                            Nom de l'utilisateur <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx6" name="User_Master_Name" className="form-control" value={this.state.User_Master_Name} onChange={this.handleChange} required />
                                        {errors.User_Master_Name.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Master_Name}</span>}


                                    </div>
                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group">
                                        <label htmlFor="defaultFormLoginEmailEx7" className="grey-text" >
                                            Email 
                                        </label>
                                        <input type="email" id="Email_User_Master" validate
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            name="Email_User_Master" className="form-control"
                                            value={this.state.Email_User_Master}
                                            onChange={this.handleChange} required />

                                        {errors.Email_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_User_Master}</span>}
                                    </div>
                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px' }}>
                                            <legend style={{ width: "70px", color: "#51545791" }}>Login <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>


                                            <MDBInput label="Pseudo" outline size="sm" type="text" className="form-control" placeholder="" name="User_Master_Pseudo" value={this.state.User_Master_Pseudo} onChange={this.handleChange} />
                                            {errors.User_Master_Pseudo.length > 0 &&
                                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Master_Pseudo}</span>}


                                            <MDBInput
                                                type="password"
                                                validate
                                                label="Mot de passe"
                                                outline size="sm"
                                                className="form-control"
                                                placeholder=""
                                                name="Password" value={this.state.Password} onChange={this.handleChange} required />
                                            {errors.Password.length > 0 &&
                                                <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Password}</span>}

                                            <MultiSelectAll name="Access_Groupe_User" value={this.state.Access_Groupe_User} onChange={this.handleChange} />
                                        </fieldset>
                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx1" className="grey-text" >
                                            SMS 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx1" name="SMS_User_Master" className="form-control" value={this.state.SMS_User_Master} onChange={this.handleChange} required />
                                        {/* {errors.SMS_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.SMS_User_Master}</span>} */}


                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: -8 + 'em', marginLeft: 15.5 + 'em', width: '217px' }}>
                                        <label htmlFor="defaultFormLoginEmailEx2" className="grey-text" >
                                            Telephone 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx2" name="User_Tel" className="form-control" value={this.state.User_Tel} onChange={this.handleChange} required />
                                        {/* {errors.User_Tel.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.User_Tel}</span>} */}

                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: -2 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx3" className="grey-text" >
                                            Fax 
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx3" name="Fax_User_Master" className="form-control" value={this.state.Fax_User_Master} onChange={this.handleChange} required />
                                        {/* {errors.Fax_User_Master.length > 0 &&
                                            <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Fax_User_Master}</span>} */}

                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx4" className="grey-text" >
                                            BU_Master
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx4" name="BU_Master" className="form-control" value={this.state.BU_Master} onChange={this.handleChange} required />
                                    </div>

                                </MDBCol>
                                <MDBCol size="6">
                                    <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                                        <label htmlFor="defaultFormLoginEmailEx5" className="grey-text" >
                                            Fonction
                                        </label>
                                        <input type="text" id="1" id="defaultFormLoginEmailEx5" name="Fonction_Master" className="form-control" value={this.state.Fonction_Master} onChange={this.handleChange} required />
                                    </div>

                                </MDBCol>
                            </MDBRow>


                        </MDBModalBody>
                        <MDBModalFooter>

                            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.modifier}> <MDBIcon far icon="edit" />Modifier</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>








                    <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} > Enregistrer   <MDBIcon icon="paper-plane" className="ml-1" /></MDBBtn>






                    <div className="tabulator"  ref={el => (this.el = el)} />
                </div>
            </>






        )
    }
}


export default Utilisateurs