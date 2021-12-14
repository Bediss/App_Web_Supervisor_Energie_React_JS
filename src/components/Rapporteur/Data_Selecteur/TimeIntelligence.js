import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

import axios from 'axios';
import uuid from 'react-uuid';
import Moment from 'moment';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Datetime from 'react-datetime';
import { DatetimePicker } from 'rc-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import moment from 'moment';

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

class TimeIntelligence extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tl_name: "",
            tl_name1: "",
            tl_id: "",
            code: "",
            validation_Code: "",
            listes: [],
            modal: false,
            modal1: false,
            modal4: false,
            modal5: false,
            modal3: false,
            modal6: false,
            Nom: "",
            tl_members: "",
            JsonOperateurValue: [],
            totale_Dans: "",
            liste_tl_members: [],
            //////data modifier
            liste_tl_members_Modifier_Tl_User: [],
            liste_tl_members_Modifier_Tl_SQL: [],
            liste_keyword_Modifier: [],
            liste_Select_Modifier: [],
            /////////
            liste_tl_members2: [],
            tl_Code: "",
            ajoutertemp: [],
            modificationtemp: [],
            Membres: [],
            ajout: "",
            tl_access: "",
            arrayMembres: {},
            supprimer: "",
            supprimertemp: [],

            SQLArrayInclure: [],
            SQLJoinInclure: [],
            SQLArrayExclure: [],
            SQLJoinExclure: [],
            SQLArrayInclureExclure: [],
            SQLJoinInclureExclure: [],
            SQLArrayEntre: [],
            SQLJoinEntre: [],
            SQLArrayHaut: [],
            SQLJoinHaut: [],
            SQLArrayBas: [],
            SQLJoinBas: [],
            SQLArrayDans: [],
            SQLJoinDans: [],
            SQLArrayLimit: [],
            SQLArrayOffSet: [],
            SQLArraySelect: [],
            SQLJoinLimit: [],
            SQLJoinOffSet: [],
            SQLJoinSelect: [],
            SQLArrayIntervalles: [],
            JsonSQl: [],
            SQLWhere: [],
            SQLLimit: [],
            SQLOffSet: [],
            SQLSelect: [],
            TlSQL: [],
            JsonWhere: [],
            JsonLimit: [],
            JsonOffSet: [],
            JsonSelect: [],
            Tl_User_tab: [],
            horloge: "",
            tl_description: "",
            Path: "",
            keyword: "",
            heure: "",
            dateHeure: "",
            date: "",
            datehorloge: "",
            date22: new Date(),
            Btnoperateur: "",
            haut: "",
            bas: "",
            dans: "",
            att: "",
            valeur: "",
            valeur2: "",
            dateHeure: "",
            position: "",
            Maintenant: "Maintenant",
            Date_Actuelle: "Date_Actuelle",
            Temp_Actuelle: "Temp_Actuelle",
            fleche: "<",
            DansDev: [],
            inputDateCalculater: "",
            btn7: '7',
            btn8: '8',
            btn9: '9',
            btn4: '4',
            btn5: '5',
            btn6: '6',
            btn1: '1',
            btn2: '2',
            btn3: '3',
            btn0: '0',
            Cal: null,
            Calendar: "",
            /////// User
            CalendarUser: "",
            hautUser: "",
            basUser: "",
            dansUser: "",
            inputDateCalculaterUser: "",
            AdhocPeriodicitesUser: "",
            totale_DansUser: "",
            DansDevUser: "",
            //////
            operateur: "",
            Btnvaleur: [],
            Btnvaleurprd: [],
            PeriodicityPrd: "",
            Periodicity: "",
            BtnValeur2: "",
            BtnValeur2prd: "",
            btnaddition: '+',
            btnmultiplication: '*',
            btndiv: '/',
            btnsubstraction: '-',
            valeurLimite: "",
            valeurDecalage: "",
            valeurUser: "",
            SQL: "",
            SQLInclure: "",
            SQLExclure: "",
            SQLc: "",
            SQLcWhere: "",
            SQLcSelect: "",
            SQLcLimite: "",
            SQLcOffset: "",
            SQLcWhere2: "",
            SQLcSelect2: "",
            SQLcLimite2: "",
            SQLcOffset2: "",
            order: "",
            orderUser:"",
            AdhocPeriodicites: "",
            AdhocPeriodicites2: "",
            Prd2: "",
            moment: moment(),
            SQLArrayBas2:[],
            SQLArrayHaut2:[],
            SQLArrayEntre2:[],
            SQLArrayLimit2:[],
            SQLArrayDecalage2:[],
            SQLJoinSelect2: [],
            SQLArrayDans2:[],
            SQLDeclage2:[],
            SQLHaut2:[],
            SQLBas2:[],
            SQLEntre2:[],
            SQLDans2:[],
            SQLLimit2:[],
            SQLSelect2:[],
            SQLDeclage2:[],
            dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
            errors: {
                tl_name: '* Obligatoire',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.ajouter = this.ajouter.bind(this);

        this.tl1 = this.tl1.bind(this);
        this.ajouterListe = this.ajouterListe.bind(this);
        this.supprimerAll = this.supprimerAll.bind(this);

        this.Enregistrer = this.Enregistrer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Newliste = this.Newliste.bind(this);
        this.updateliste = this.updateliste.bind(this);
        this.modifierNom = this.modifierNom.bind(this);
        this.addValeur = this.addValeur.bind(this);
        this.addOperateur = this.addOperateur.bind(this);
        this.addCalendar = this.addCalendar.bind(this);
        this.addPeriodicity = this.addPeriodicity.bind(this);
        this.btndeleteDateCalculater = this.btndeleteDateCalculater.bind(this);
        this.AddDataCalculateurHaut = this.AddDataCalculateurHaut.bind(this)
        this.AddDataCalculateurBas = this.AddDataCalculateurBas.bind(this)
        this.AddDataCalculateurDans = this.AddDataCalculateurDans.bind(this)
        this.ajoutTab = this.ajoutTab.bind(this)
        this.InputBas = this.InputBas.bind(this)
        this.updateDate = this.updateDate.bind(this);
        this.periodicites = this.periodicites.bind(this)
        this.btnAjouterDans = this.btnAjouterDans.bind(this);
        this.btndeleteDans = this.btndeleteDans.bind(this);
        this.HorlogeChange = this.HorlogeChange.bind(this);
        this.addPeriodicityPrd = this.addPeriodicityPrd.bind(this);
        this.addValeurprd = this.addValeurprd.bind(this);
        this.btndeleteinputPeriodicity = this.btndeleteinputPeriodicity.bind(this);
        this.addPrd2 = this.addPrd2.bind(this);
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

    }


    ///********fin function MasterListes
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.state.errors = {
            tl_name: ' ',

        }
    }
    toggle1 = () => {
        if (this.state.tl_name == "") {
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Sélectionnez une liste pour supprimer'
            })

        } else {
            this.setState({
                modal1: !this.state.modal1
            });
        }
    }
    toggle3 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
        this.state.errors = {
            tl_name: ' ',

        }
    }
    toggle4 = () => {
        
        

        /// API tl
        axios.post(window.apiUrl + "display/",
            {
                tablename: "tl",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",

            }
        )
            .then(
                (result) => {
                    if (result.data !== null) {
                        this.setState({ listes: result.data })
                        //this.state.listes = result.data
                        console.log("listes", this.state.listes)
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
        /// FIN API tl
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
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        var $ = require("jquery");

        if (e.target.value == "Intervalles") {

            $('#IntervalleTimeNouveau').show();
            $('#EnsembleTimeNouveau').hide();
            $('#DateCalculator').hide();
            $('#ajoutHaut').hide();
            $('#ajoutBas').hide();
            $('#ajoutDans').hide();
            $('#Inclure').show();
            $('#Exclure').show();
            $('#Ascendant').hide();
            $('#Descendant').hide();
            $('#Intervalle').hide();
            $('#LimiteNouveau').hide();
            $('#DecalageNouveau').hide();
            $('#optionVide').hide();
            $('#periodicitesNouveau').hide();
            this.state.dans = "";
            this.state.dansUser = "";
            this.state.valeurLimite = "";
            this.state.valeurDecalage = "";
            this.state.totale_Dans = "";
            this.state.operateur = "";
            this.state.inputPeriodicity = "";
            this.state.Btnvaleurprd = [];
            this.state.PeriodicityPrd = "";
        }

        if (e.target.value == "Ensemble") {


            $('#IntervalleTimeNouveau').hide();
            $('#EnsembleTimeNouveau').show();
            $('#DateCalculator').hide();
            $('#ajoutHaut').hide();
            $('#ajoutBas').hide();
            $('#ajoutDans').hide();
            $('#Inclure').show();
            $('#Exclure').show();
            $('#Ascendant').hide();
            $('#Descendant').hide();
            $('#Intervalle').hide();
            $('#LimiteNouveau').hide();
            $('#DecalageNouveau').hide();
            $('#optionVide').hide();
            $('#periodicitesNouveau').hide();
            this.state.haut = "";
            this.state.hautUser = "";
            this.state.bas = "";
            this.state.basUser = "";
            this.state.valeurLimite = "";
            this.state.valeurDecalage = "";
            this.state.operateur = "";
            this.state.inputPeriodicity = "";
            this.state.Btnvaleurprd = [];
            this.state.PeriodicityPrd = "";
        }

        if (e.target.value == "Limite") {


            $('#IntervalleTimeNouveau').hide();
            $('#EnsembleTimeNouveau').hide();
            $('#DateCalculator').hide();
            $('#ajoutHaut').hide();
            $('#ajoutBas').hide();
            $('#ajoutDans').hide();
            $('#Inclure').hide();
            $('#Exclure').hide();
            $('#Ascendant').show();
            $('#Descendant').show();
            $('#Intervalle').hide();
            $('#LimiteNouveau').show();
            $('#DecalageNouveau').hide();
            $('#optionVide').hide();
            $('#periodicitesNouveau').hide();


            this.state.haut = "";
            this.state.bas = "";
            this.state.dans = "";
            this.state.basUser = "";
            this.state.hautUser = "";
            this.state.dansUser = "";
            this.state.valeurDecalage = "";
            this.state.totale_Dans = "";
            this.state.operateur = "";
            this.state.inputPeriodicity = "";
            this.state.Btnvaleurprd = [];
            this.state.PeriodicityPrd = "";
        }
        if (e.target.value == "Decalage") {
            $('#IntervalleTimeNouveau').hide();
            $('#EnsembleTimeNouveau').hide();
            $('#DateCalculator').hide();
            $('#ajoutHaut').hide();
            $('#ajoutBas').hide();
            $('#ajoutDans').hide();
            $('#Inclure').hide();
            $('#Exclure').hide();
            $('#Ascendant').show();
            $('#Descendant').show();
            $('#Intervalle').hide();
            $('#LimiteNouveau').hide();
            $('#DecalageNouveau').show();
            $('#optionVide').hide();
            $('#periodicitesNouveau').hide();
            this.state.haut = "";
            this.state.bas = "";
            this.state.dans = "";
            this.state.basUser = "";
            this.state.hautUser = "";
            this.state.dansUser = "";
            this.state.valeurLimite = "";
            this.state.totale_Dans = "";
            this.state.operateur = "";
            this.state.inputPeriodicity = "";
            this.state.Btnvaleurprd = [];
            this.state.PeriodicityPrd = "";
        }

        if (e.target.value == "Ad hoc periodicites") {


            $('#IntervalleTimeNouveau').hide();
            $('#EnsembleTimeNouveau').hide();
            $('#DateCalculator').hide();
            $('#ajoutHaut').hide();
            $('#ajoutBas').hide();
            $('#ajoutDans').hide();
            $('#Inclure').hide();
            $('#Exclure').hide();
            $('#Ascendant').hide();
            $('#Descendant').hide();
            $('#Intervalle').show();
            $('#LimiteNouveau').hide();
            $('#DecalageNouveau').hide();
            $('#optionVide').hide();
            $('#periodicitesNouveau').show();
            $('#Btnprd1').show();
            $('#Btnprd2').show();
            this.state.haut = "";
            this.state.bas = "";
            this.state.dans = "";
            this.state.basUser = "";
            this.state.hautUser = "";
            this.state.dansUser = "";
            this.state.valeurLimite = "";
            this.state.totale_Dans = "";
            this.state.operateur = "Intervalle";

        }

        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'tl_name':
                errors.tl_name =
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
                    tablename: "tl",
                    identifier: this.state.dateDMY + uuid(),
                    nombermaxcode: '1',
                    primaryfield: "tl_id",
                    fields: "*",
                    content: "*",

                }
            )

                .then(
                    (result) => {
                        if (result.data !== null) {
                            // this.state.tl_Code = result.data.substring(1, result.data.length - 1);
                            var code = result.data.split(", ")
                            this.state.tl_Code = code
                            console.log("tl_id", this.state.tl_Code)
                        } else {
                            console.log('tl_id vide')
                        }
                    }
                )



            ///tabulator 
            this.mytable = new Tabulator(this.el, {
                data: this.tableData, //link data to table
                reactiveData: true, //enable data reactivity
                height: "720px",
                columns: [
                    {
                        title: "Mot Clé",
                        field: "keyword",
                        width: '20%',
                        cellClick: function (e, cell, row) {

                            var datamodifier = []
                            datamodifier.push(cell.getData());
                            console.log("valider", datamodifier)

                        }

                    },

                    {
                        title: "Traitement",
                        field: "operateur",
                        width: '20%',

                    },
                    {
                        title: "Opérateur",
                        field: "att",
                        width: '20%',

                    },
                    {
                        title: "Valeur",
                        field: "valeurUser",
                        width: '20%',

                    },

                    {
                        title: "Supprimer",
                        width: "18%",
                        hozAlign: "center",
                        formatter: function () { //plain text value

                            return "<i class='fa fa-trash-alt icon'></i>";

                        },

                        cellClick: function (e, cell) {
                            cell.getData();
                            console.log("testttt", cell.getData().valeur)
                            supprimertemp.push(cell.getData().valeur);
                            cell.getRow().delete();
                            console.log("supprimertemp", supprimertemp)
                        }
                    },], //define table columns
            });
        }
        else {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 300,
                title: 'Nom est vide'
            })
        }
    }
    ajouterListe() {

    }
    tl1() {

        const supprimertemp = this.state.supprimertemp;

        /// API tl
        axios.post(window.apiUrl + "display/",
            {
                tablename: "tl",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",

            }
        )
            .then(
                (result) => {
                    console.log('result data')
                    console.log(result.data)
               
                    if (result.data != null) {
                        if(this.state.Nom==""){
                            console.log("tl_name vide")
                            Swal.fire({
                              toast: true,
                              position: 'top',
                              showConfirmButton: false,
                              timer: 5000,
                              width: 400,
                              icon: 'warning',
                              title: "Sélectionner une liste pour ajouter"
                          })
                      }else {
                        for (var i = 0; i < result.data.length; i++) {
                            this.state.tl_id = result.data[i].tl_id
                            console.log(this.state.tl_id)
                            if (this.state.code == this.state.tl_id) {
                                
                                    this.setState({
                                        modal4: !this.state.modal4
                                    });
                                this.setState({tl_name:this.state.Nom})
                                this.setState({ liste_tl_members: result.data[i].tl_members })
                                //    this.state.liste_tl_members = result.data[i].tl_members;
                            
                                console.log("this.state.liste_tl_members", this.state.liste_tl_members)
                                this.setState({ liste_tl_members_Modifier_Tl_User: this.state.liste_tl_members[0].Tl_User })
                                this.setState({ liste_tl_members_Modifier_Tl_SQL: this.state.liste_tl_members[0].Tl_Sql })
                                console.log(" Tl_User", this.state.liste_tl_members_Modifier_Tl_User)
                                console.log(" Tl_SQL", this.state.liste_tl_members_Modifier_Tl_SQL)
                                /////////////

                                //   this.tableData = result.data[i].tl_members;
                                console.log(" this.tableData", this.tableData)

                                const Tl_UserG = result.data[i].tl_members
                                if (Tl_UserG == null) {

                                    console.log("vide")

                                } else {
                                    Tl_UserG.forEach(element =>
                                        this.state.Tl_User_tab = element.Tl_User)

                                }
                               // this.state.tl_name = this.state.Nom;
                           
                                console.log("this.state.Tl_User_tab", this.state.Tl_User_tab)

                                ///this.state.tl_description = result.data[i].tl_description;

                                //console.log("tl_description", this.state.tl_description)
                                console.log("tl_members", this.state.Tl_User_tab)

                                this.tableData = this.state.Tl_User_tab;
                                console.log(" this.tableData", this.tableData)
                                ///tabulator 
                                this.mytable = new Tabulator(this.el, {
                                    data: this.tableData, //link data to table
                                    reactiveData: true, //enable data reactivity
                                    height: "720px",
                                    columns: [
                                        {
                                            title: "Mot Clé",
                                            field: "keyword",
                                            width: '20%',
                                            cellClick: function (e, cell, row) {

                                                var datamodifier = []
                                                datamodifier.push(cell.getData());
                                                console.log("valider", datamodifier)

                                            }
                                        },

                                        {
                                            title: "Traitement",
                                            field: "operateur",
                                            width: '20%',

                                        },
                                        {
                                            title: "Opérateur",
                                            field: "att",
                                            width: '20%',

                                        },
                                        {
                                            title: "Valeur",
                                            field: "valeurUser",
                                            width: '20%',

                                        },

                                        {
                                            title: "Supprimer",
                                            width: "18%",
                                            hozAlign: "center",
                                            formatter: function () { //plain text value

                                                return "<i class='fa fa-trash-alt icon'></i>";

                                            },

                                            cellClick: function (e, cell) {
                                                cell.getData();
                                                supprimertemp.push(cell.getData().valeur);
                                                cell.getRow().delete();
                                                console.log("supprimertemp", supprimertemp)
                                            }
                                        },], //define table columns
                                });


                            }}
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
                            timer: 5000,
                            width: 300,
                            icon: 'warning',
                            title: ' La liste est vide'
                        })
                    }
                }

            )
        /// FIN API tl

       
        console.log(this.state.Nom)
        console.log(this.state.tl_id)



    }

    supprimerAll() {

        const tl_id = this.state.code;
        const tl_name = this.state.tl_name;
        const tl_description = this.state.tl_description;
        const newMembres = (this.state.Membres.concat(this.state.liste_tl_members))

        console.log(this.state.liste_tl_members)
        console.log("Update_newMembres", newMembres)
        const a = JSON.stringify(newMembres).replace(/'/g, "''");
        const tl_members = a;
        console.log("tl_members", tl_members);
        const tl_access = this.state.tl_access
        const DBAction = "3"
        this.state.supprimer = {
            "tl_id": tl_id,
            "tl_name": tl_name,
            "tl_description": tl_description,
            "tl_access": tl_access,
            "tl_members": tl_members,
            "DBAction": DBAction
        };
        this.state.supprimertemp.push(this.state.supprimer);
        console.log(this.state.supprimertemp);
        if (newMembres.length == []) {
            this.mytable.clearData()
            console.log("Array is empty!")
        }
        this.state.tl_name = ""
        this.setState({
            modal1: !this.state.modal1
        });

        axios.post(window.apiUrl + "updatedelete/", {
            tablename: "tl",
            identifier: this.state.dateDMY + uuid(),
            datatomodified: [].concat(this.state.supprimertemp)
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
                    timer: 5000,
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
    handleClick(id, event) {
        this.state.code = id;
        console.log("code", this.state.code)

    }
    ///////
    Newliste() {
        const tl_id = this.state.tl_Code[0];
        console.log("id", tl_id)
        this.state.validation_Code = tl_id
        const tl_name = this.state.tl_name;
        const tl_description = this.state.tl_description;
        const tl_access = this.state.tl_access;

        /** with delete row */


        var Tl_User = this.state.JsonOperateurValue
        console.log("gggggggggggg",Tl_User)
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var val = this.state.supprimertemp[i]
            console.log("val", val)
            var filteredObj = Tl_User.find(function (item, i) {
                console.log("item", item)
                console.log("item Tl_User", item.valeur)
                if (item.valeur === val) {
                    index = i;
                    return i;
                }
            });

            console.log("delete row", index, filteredObj);
            if (index > -1) {
                Tl_User.splice(index, 1);
            }
        }
console.log("Tl_Userrrrrrrrrrrrrrrrrrrrr",Tl_User)

for(i=0;i<Tl_User.length;i++){
    const att= Tl_User[i].att
    const operateur=Tl_User[i].operateur
    const valeur= Tl_User[i].valeur
    const valeurUser=Tl_User[i].valeurUser
    const keyword=Tl_User[i].keyword
    const order=Tl_User[i].order
    if(att=="Haut"){
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLHaut2 = ("( iot.date >= " + valeur+")")
            console.log("SQL Inclure", this.state.SQLHaut2)
        }

        if (operateur == "Exclure") {

            this.state.SQLHaut2 = ("( iot.date <= " + valeur+")")
            console.log("SQL Exclure", this.state.SQL)
        }
        this.state.SQLArrayHaut2.push(this.state.SQLHaut2)
        console.log("SQLArrayHaut2", this.state.SQLArrayHaut2)

 
    }
    if(att=="Bas"){
        
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLBas2 = ("( iot.date <= " + valeur+")")
            console.log("SQL Inclure", this.state.SQLBas2)
        }

        if (operateur == "Exclure") {

            this.state.SQLBas2 = ("( iot.date >= " + valeur+")")
            console.log("SQL Exclure", this.state.SQLBas2)
        }
        this.state.SQLArrayBas2.push(this.state.SQLBas2)
        console.log("SQLArrayBas2", this.state.SQLArrayBas2)
    }
    if(att=="Entre"){
        
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLEntre2 = ("( iot.date between " + valeur+")")
            console.log("SQL Inclure", this.state.SQLEntre2)
        }

        if (operateur == "Exclure") {

            this.state.SQLEntre2 = ("( iot.date not between " + valeur+")")
            console.log("SQL Exclure", this.state.SQLEntre2)
        }
        this.state.SQLArrayEntre2.push(this.state.SQLEntre2)
        console.log("SQLArrayBas2", this.state.SQLArrayEntre2) 
    }
   if(att=="Ad hoc periodicites"){
    this.state.SQLcSelect2 = "select"
    this.state.SQLSelect2 = ("time_bucket(''" + valeur + "'', iot.date) AS time,avg(iot.value) as valeur")
    this.state.SQLJoinSelect2 = this.state.SQLSelect2
    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)  
}
   if(att=="Ad hoc periodicites remplissait les cases vides"){
   const Prd30=  valeurUser.slice(0,30)
   const Prd0=  valeurUser.slice(0,1)
   const Prd34=  valeurUser.slice(0,34)
    this.state.SQLcSelect2 = "select"

    if (Prd30 == "Periodicite du dernier lecteur") {
        this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(avg(iot.value))as valeur")
    }
    if (Prd34 == "Interpoler les lecteurs manquantes") {
        this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(avg(iot.value))as valeur")
    }
    if (Prd0 == " ") {
         this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,avg(iot.value)as valeur")
     }
    this.state.SQLJoinSelect2 = this.state.SQLSelect2
    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
   }
   if(att=="Dans"){
    this.state.SQLcWhere2 = "where " + order
    if (operateur == "Inclure") {

        this.state.SQLDans2 = ("( date(iot.date) in(" + valeur + "))")
        console.log("SQL Inclure", this.state.SQLDans2)
    }

    if (operateur == "Exclure") {

        this.state.SQLDans2 = ("( date(iot.date) not in(" + valeur + "))")
        console.log("SQL Exclure", this.state.SQLDans2)
    }
    this.state.SQLArrayDans2.push(this.state.SQLDans2)
        console.log("SQLArrayBas2", this.state.SQLArrayDans2) 
   }
   if(att=="Entier"&& keyword=="Limite"){
    var l = operateur.replace("Ascendant", "asc")
    var m = l.replace("Descendant", "desc")
    console.log('M', m)
    this.state.SQLcLimite2 = "limit"
    this.state.SQLLimit2 = ("("+m + " limit " + valeur+")")
    this.state.SQLArrayLimit2.push(this.state.SQLLimit2)
    console.log("SQLArrayBas2", this.state.SQLArrayLimit2) 
   }
   if(att=="Entier"&& keyword=="Decalage"){
    var l = operateur.replace("Ascendant", "asc")
                    var m = l.replace("Descendant", "desc")
                    console.log('M', m)
                    this.state.SQLcOffset2 = "offset"
                    this.state.SQLDeclage2 = ("("+m + " offset " + valeur+")")
                    this.state.SQLArrayDecalage2.push(this.state.SQLDeclage2)
                    console.log("SQLArrayBas2", this.state.SQLArrayDecalage2) 
}
    console.log("att",att)
    console.log("operateur",operateur)
}
//////////////
     ///////////////////////////////////////////Where/////////////////////////////////////////////////////

     const arraysqlIntarvalle = (this.state.SQLArrayBas2.concat(this.state.SQLArrayEntre2).concat(this.state.SQLArrayHaut2))
     console.log("arraysqlIntarvalle", arraysqlIntarvalle)
     console.log("arraysqlIntarvalle.length", arraysqlIntarvalle.length)
     var c = arraysqlIntarvalle.join("or")
     if (arraysqlIntarvalle.length != 0) {
         this.state.SQLWhere.push(c);
         console.log("SQLWhere", this.state.SQLWhere)
         console.log("SQLWhere.length", this.state.SQLWhere.length)
     }
     const arraysqlWhere = this.state.SQLWhere.concat(this.state.SQLArrayDans2)
     console.log("this.state.SQLArrayDans", this.state.SQLArrayDans)
     console.log("arraysqlWhere", arraysqlWhere)
     var Where = arraysqlWhere.join("and")
     this.state.JsonWhere = [{ "SQL": Where, "SQLc": this.state.SQLcWhere2 }]
     console.log(" JsonWhere", this.state.JsonWhere)
     console.log(" arrayyyyyyyyyyyyyyy this.state.SQLWhere", this.state.SQLWhere)
      //////////////////////////////////////////Limit//////////////////////////////////////////////////////

      const arraysqlLimit = (this.state.SQLArrayLimit2)
      console.log("arraysql", arraysqlLimit)
      var Limit = arraysqlLimit.join("and")
      this.state.SQLLimit.push(Limit);
      this.state.JsonLimit = [{ "SQL": Limit, "SQLc": this.state.SQLcLimite2 }]
      console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonLimit)

      console.log(" arrayyyyyyyyyyyyyyy this.state.SQLLimit", this.state.SQLLimit) 

        ////////////////////////////////////////////Offset////////////////////////////////////////////////////

        const arraysqlOffset = (this.state.SQLArrayDecalage2)
        console.log("arraysql", arraysqlOffset)
        var Offset = arraysqlOffset.join("and")
        this.state.SQLOffSet.push(Offset);
        this.state.JsonOffSet = [{ "SQL": Offset, "SQLc": this.state.SQLcoffset2 }]
        console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonOffSet)

        console.log(" arrayyyyyyyyyyyyyyy this.state.SQLOffSet", this.state.SQLOffSet)
         ////////////////////////////////////////////Select////////////////////////////////////////////////////
        this.state.JsonSelect = [{ "SQL": this.state.SQLJoinSelect2, "SQLc": this.state.SQLcSelect2 }]
        console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonSelect)

        console.log(" arrayyyyyyyyyyyyyyy this.state.JsonSelect", this.state.JsonSelect)
        //////////////////////////////////////Condition d'ajout sur tl_sql/////////////////////////////
        ////////4
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("where and limit and offset and select")
        }
        ////////3          
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && this.state.SQLJoinSelect.length != 0 && arraysqlOffset.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonSelect)
            console.log("where and limit and select")
        }
        ////////3             
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("where and offset and select")
        }
        ////////3             
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonOffSet)
            console.log("where and offset and limit")
        }
        ///////3                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("limit and offset and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonOffSet.concat(this.state.JsonSelect)
            console.log("offset and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonSelect)
            console.log("limit and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonOffSet)
            console.log("limit and offset ")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonOffSet)
            console.log("where and offset ")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonSelect)
            console.log("where and select")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit)
            console.log("where and limit")
        }
        /////////1           
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonLimit
            console.log("limit")
        }
        /////////1   
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonOffSet
            console.log("offset")
        }
        /////////1   
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere
            console.log("where")
        }
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonSelect
            console.log("select")
        }

        ////////////0       
        console.log("vide TlSQL SQLJoinSelect ", (this.state.SQLJoinSelect.length))
        console.log("vide TlSQL arraysqlWhere ", (arraysqlWhere.length))
        console.log("vide TlSQL arraysqlLimit ", (arraysqlLimit.length))
        console.log("vide TlSQL arraysqlOffset ", (arraysqlOffset.length))
        console.log("vide TlSQL globale ", (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0))
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = []
            console.log("vide TlSQL ")
        }

///////////////////////////////
               this.state.Membres.push({ Tl_User: Tl_User, Tl_Sql: this.state.TlSQL })
        console.log('tl_members push', this.state.Membres)
        /**********fin delete row  */
        const tl_members = this.state.Membres;
        console.log("tl_members", tl_members);
        
        const DBAction = "2";
        // this.state.ajout = (tl_id + ";" + tl_name + ";" + tl_description + ";" + tl_access + ";" + tl_members + ";" + DBAction);
        this.state.ajout = {
            "tl_id": tl_id,
            "tl_name": tl_name,
            "tl_description": tl_description,
            "tl_access": tl_access,
            "tl_members": tl_members,
            "DBAction": DBAction
        }
        this.state.ajoutertemp.push(this.state.ajout);
        console.log(this.state.ajoutertemp);
    }

    /////
    updateliste() {
        const tl_id = this.state.code;
        this.state.validation_Code = tl_id
        const tl_name = this.state.tl_name;
        const tl_description = this.state.tl_description;
       
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var o = JSON.stringify(this.state.liste_tl_members).replace(/'/g, "''");
        console.log("liste_tl_members string", o)
        var w = JSON.parse(o)
        console.log("liste_tl_members json", w)
        var Tl_User_List_Modifier={};
       var Tl_Sql_List_Modifier={};
        for ( var i=0;i<w.length;i++){
 var Tl_User_List_Modifier = w[i].Tl_User
var Tl_Sql_List_Modifier = w[i].Tl_Sql
console.log("liste_tl_members Tl_User",Tl_User_List_Modifier)
console.log("liste_tl_members Tl_Sql",Tl_Sql_List_Modifier)
        }

      //  const newMembres = (this.state.Membres.concat(w))

        /** with delete row */


        //var val = this.state.supprimertemp[0]
        var Tl_User =  this.state.JsonOperateurValue.concat(Tl_User_List_Modifier)
        console.log("Tl_User_debut",Tl_User)
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var val = this.state.supprimertemp[i]
            var val1=val.replace(/'/g, "''"); 
            
            console.log("supp",val1)

            var filteredObj = Tl_User.find(function (item, i) {
                if (item.valeur === val1) {
                    index = i;
                    return i;
                }
            });

            console.log(index, filteredObj);
            if (index > -1) {
                Tl_User.splice(index, 1);
            }
        }
        
        console.log("Tl_User_fin",Tl_User)

   for(i=0;i<Tl_User.length;i++){
    const att= Tl_User[i].att
    const operateur=Tl_User[i].operateur
    const valeur= Tl_User[i].valeur
    const valeurUser=Tl_User[i].valeurUser
    const keyword=Tl_User[i].keyword
    const order=Tl_User[i].order
    if(att=="Haut"){
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLHaut2 = ("( iot.date >= " + valeur+")")
            console.log("SQL Inclure", this.state.SQLHaut2)
        }

        if (operateur == "Exclure") {

            this.state.SQLHaut2 = ("( iot.date <= " + valeur+")")
            console.log("SQL Exclure", this.state.SQL)
        }
        this.state.SQLArrayHaut2.push(this.state.SQLHaut2)
        console.log("SQLArrayHaut2", this.state.SQLArrayHaut2)

 
    }
    if(att=="Bas"){
        
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLBas2 = ("( iot.date <= " + valeur+")")
            console.log("SQL Inclure", this.state.SQLBas2)
        }

        if (operateur == "Exclure") {

            this.state.SQLBas2 = ("( iot.date >= " + valeur+")")
            console.log("SQL Exclure", this.state.SQLBas2)
        }
        this.state.SQLArrayBas2.push(this.state.SQLBas2)
        console.log("SQLArrayBas2", this.state.SQLArrayBas2)
    }
    if(att=="Entre"){
        
        this.state.SQLcWhere2 = "where " + order
        if (operateur == "Inclure") {

            this.state.SQLEntre2 = ("( iot.date between " + valeur+")")
            console.log("SQL Inclure", this.state.SQLEntre2)
        }

        if (operateur == "Exclure") {

            this.state.SQLEntre2 = ("( iot.date not between " + valeur+")")
            console.log("SQL Exclure", this.state.SQLEntre2)
        }
        this.state.SQLArrayEntre2.push(this.state.SQLEntre2)
        console.log("SQLArrayBas2", this.state.SQLArrayEntre2) 
    }
   if(att=="Ad hoc periodicites"){
    this.state.SQLcSelect2 = "select"
    this.state.SQLSelect2 = ("time_bucket(''" + valeur + "'', iot.date) AS time,avg(iot.value) as valeur")
    this.state.SQLJoinSelect2 = this.state.SQLSelect2
    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)  
}
   if(att=="Ad hoc periodicites remplissait les cases vides"){
    
    const Prd30=  valeurUser.slice(0,30)
    const Prd0=  valeurUser.slice(0,1)
    const Prd34=  valeurUser.slice(0,34)
     this.state.SQLcSelect2 = "select"
 
     if (Prd30 == "Periodicite du dernier lecteur") {
         this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(avg(iot.value))as valeur")
     }
     if (Prd34 == "Interpoler les lecteurs manquantes") {
         this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(avg(iot.value))as valeur")
     }
     if (Prd0 == " ") {
          this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,avg(iot.value)as valeur")
      }
    this.state.SQLJoinSelect2 = this.state.SQLSelect2
    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
   }
   if(att=="Dans"){
    this.state.SQLcWhere2 = "where " + order
    if (operateur == "Inclure") {
    
        this.state.SQLDans2 = ("( date(iot.date) in(" + valeur + "))")
        console.log("SQL Inclure", this.state.SQLDans2)
    }

    if (operateur == "Exclure") {

        this.state.SQLDans2 = ("( date(iot.date) not in(" + valeur + "))")
        console.log("SQL Exclure", this.state.SQLDans2)
    }
    this.state.SQLArrayDans2.push(this.state.SQLDans2)
        console.log("SQLArrayBas2", this.state.SQLArrayDans2) 
   }
   if(att=="Entier"&& keyword=="Limite"){
    var l = operateur.replace("Ascendant", "asc")
    var m = l.replace("Descendant", "desc")
    console.log('M', m)
    this.state.SQLcLimite2 = "limit"
    this.state.SQLLimit2 = ("("+m + " limit " + valeur+")")
    this.state.SQLArrayLimit2.push(this.state.SQLLimit2)
    console.log("SQLArrayBas2", this.state.SQLArrayLimit2) 
   }
   if(att=="Entier"&& keyword=="Decalage"){
    var l = operateur.replace("Ascendant", "asc")
                    var m = l.replace("Descendant", "desc")
                    console.log('M', m)
                    this.state.SQLcOffset2 = "offset"
                    this.state.SQLDeclage2 = ("("+m + " offset " + valeur+")")
                    this.state.SQLArrayDecalage2.push(this.state.SQLDeclage2)
                    console.log("SQLArrayBas2", this.state.SQLArrayDecalage2) 
}
    console.log("att",att)
    console.log("operateur",operateur)
}
//////////////
     ///////////////////////////////////////////Where/////////////////////////////////////////////////////

     const arraysqlIntarvalle = (this.state.SQLArrayBas2.concat(this.state.SQLArrayEntre2).concat(this.state.SQLArrayHaut2))
     console.log("arraysqlIntarvalle", arraysqlIntarvalle)
     console.log("arraysqlIntarvalle.length", arraysqlIntarvalle.length)
     var c = arraysqlIntarvalle.join("or")
     if (arraysqlIntarvalle.length != 0) {
         this.state.SQLWhere.push(c);
         console.log("SQLWhere", this.state.SQLWhere)
         console.log("SQLWhere.length", this.state.SQLWhere.length)
     }
     const arraysqlWhere = this.state.SQLWhere.concat(this.state.SQLArrayDans2)
     console.log("this.state.SQLArrayDans", this.state.SQLArrayDans)
     console.log("arraysqlWhere", arraysqlWhere)
     var Where = arraysqlWhere.join("and")
     this.state.JsonWhere = [{ "SQL": Where, "SQLc": this.state.SQLcWhere2 }]
     console.log(" JsonWhere", this.state.JsonWhere)
     console.log(" arrayyyyyyyyyyyyyyy this.state.SQLWhere", this.state.SQLWhere)
      //////////////////////////////////////////Limit//////////////////////////////////////////////////////

      const arraysqlLimit = (this.state.SQLArrayLimit2)
      console.log("arraysql", arraysqlLimit)
      var Limit = arraysqlLimit.join("and")
      this.state.SQLLimit.push(Limit);
      this.state.JsonLimit = [{ "SQL": Limit, "SQLc": this.state.SQLcLimite2 }]
      console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonLimit)

      console.log(" arrayyyyyyyyyyyyyyy this.state.SQLLimit", this.state.SQLLimit) 

        ////////////////////////////////////////////Offset////////////////////////////////////////////////////

        const arraysqlOffset = (this.state.SQLArrayDecalage2)
        console.log("arraysql", arraysqlOffset)
        var Offset = arraysqlOffset.join("and")
        this.state.SQLOffSet.push(Offset);
        this.state.JsonOffSet = [{ "SQL": Offset, "SQLc": this.state.SQLcoffset2 }]
        console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonOffSet)

        console.log(" arrayyyyyyyyyyyyyyy this.state.SQLOffSet", this.state.SQLOffSet)
         ////////////////////////////////////////////Select////////////////////////////////////////////////////
        this.state.JsonSelect = [{ "SQL": this.state.SQLJoinSelect2, "SQLc": this.state.SQLcSelect2 }]
        console.log(" arrayyyyyyyyyyyyyyyyyyyyyyyyy", this.state.JsonSelect)

        console.log(" arrayyyyyyyyyyyyyyy this.state.JsonSelect", this.state.JsonSelect)
        //////////////////////////////////////Condition d'ajout sur tl_sql/////////////////////////////
        ////////4
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("where and limit and offset and select")
        }
        ////////3          
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && this.state.SQLJoinSelect.length != 0 && arraysqlOffset.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonSelect)
            console.log("where and limit and select")
        }
        ////////3             
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("where and offset and select")
        }
        ////////3             
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit).concat(this.state.JsonOffSet)
            console.log("where and offset and limit")
        }
        ///////3                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonOffSet).concat(this.state.JsonSelect)
            console.log("limit and offset and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonOffSet.concat(this.state.JsonSelect)
            console.log("offset and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonSelect)
            console.log("limit and select")
        }
        ///////2                 
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonLimit.concat(this.state.JsonOffSet)
            console.log("limit and offset ")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonOffSet)
            console.log("where and offset ")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonSelect)
            console.log("where and select")
        }
        ///////2
        if (arraysqlWhere.length != 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere.concat(this.state.JsonLimit)
            console.log("where and limit")
        }
        /////////1           
        if (arraysqlWhere.length == 0 && arraysqlLimit.length != 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonLimit
            console.log("limit")
        }
        /////////1   
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length != 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonOffSet
            console.log("offset")
        }
        /////////1   
        if (arraysqlWhere.length != 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = this.state.JsonWhere
            console.log("where")
        }
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length != 0) {
            this.state.TlSQL = this.state.JsonSelect
            console.log("select")
        }

        ////////////0       
        console.log("vide TlSQL SQLJoinSelect ", (this.state.SQLJoinSelect.length))
        console.log("vide TlSQL arraysqlWhere ", (arraysqlWhere.length))
        console.log("vide TlSQL arraysqlLimit ", (arraysqlLimit.length))
        console.log("vide TlSQL arraysqlOffset ", (arraysqlOffset.length))
        console.log("vide TlSQL globale ", (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0))
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = []
            console.log("vide TlSQL ")
        }

///////////////////////////////
               this.state.Membres.push({ Tl_User: Tl_User, Tl_Sql: this.state.TlSQL })
        console.log('tl_members push', this.state.Membres)
        /**********fin delete row  */
        // console.log("Tl_User----Tl_User---Tl_User",Tl_User);

        // this.state.Membres.push({ Tl_User:Tl_User , Tl_Sql: this.state.TlSQL.concat(Tl_Sql_List_Modifier) })
        // console.log('tl_members push', this.state.Membres)
        // /**********fin delete row  */

        console.log(this.state.liste_tl_members)
        console.log("Update_newMembres", this.state.Membres)
        const tl_members = this.state.Membres;

        console.log("supprimertemp", this.state.supprimertemp)

        console.log("tl_members", tl_members);
        const tl_access = this.state.tl_access
        const DBAction = "1"
        this.state.modifier = {
            "tl_id": tl_id,
            "tl_name": tl_name,
            "tl_description": tl_description,
            "tl_access": tl_access,
            "tl_members": tl_members,
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
        }
        console.log("this.state.validation_Code", this.state.validation_Code)
        if (this.state.validation_Code == "") {

            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                width: 300,
                icon: 'warning',
                title: 'Créez ou Modifier une liste '
            })

        } else {
            console.log("Enregistrer")



            axios.post(window.apiUrl + "updatedelete/", {
                tablename: "tl",
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
                        timer: 5000,
                        width: 300,
                        icon: 'success',
                        title: 'Enregistrer avec succès'
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



    InputHaut() {
        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').show();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
        $('#ajoutHautBtn').show();
        $('#ajoutBasBtn').hide();
        $('#ajoutDansBtn').hide();


    }
    InputBas() {

        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').hide();
        $('#ajoutBas').show();
        $('#ajoutDans').hide();
        $('#ajoutHautBtn').hide();
        $('#ajoutBasBtn').show();
        $('#ajoutDansBtn').hide();

    }
    InputDans() {

        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').show();
        $('#ajoutHautBtn').hide();
        $('#ajoutBasBtn').hide();
        $('#ajoutDansBtn').show();

    }
    Annuler() {
        var $ = require("jquery");
        $('#DateCalculator').hide();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
    }

    addValeur = (value) => {
        if (this.state.Calendar == "" || this.state.Btnoperateur == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Opérateur est vide'
            })
        } else {
            if (value == "0" || value == "1" || value == "2" || value == "3" || value == "4" || value == "5" || value == "6" || value == "7" || value == "8" || value == "9") {

                // var str=" "
                ////  var a= str.repeat(this.state.Periodicity.length+1 )
                this.setState({
                    inputDateCalculater: this.state.inputDateCalculater + value
                });
            }
            this.state.Btnvaleur.push(value)
            this.state.BtnValeur2 = this.state.Btnvaleur.join("")


            console.log("Btnvaleur", this.state.Btnvaleur)
            console.log("Btnvaleur", this.state.BtnValeur2)
            var $ = require("jquery");
            $('#Calendrier').hide();
            $('#Operateur').hide();
            $('#Valeur').hide();
            $('#Periodicity').show();
            $('#Calendrier1').show();
            $('#Operateur1').show();
            $('#Valeur1').show();
            $('#Periodicity1').hide();
        }




    }
    addPeriodicity = (value) => {
        if (this.state.Calendar == "" || this.state.Btnoperateur == "" || this.state.Btnvaleur == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Valeur est vide'
            })
        } else {

            const array = []
            array.push(this.state.inputDateCalculater)
            console.log(this.state.inputDateCalculater);
            this.setState({


                inputDateCalculater: this.state.Calendar + " " + this.state.Btnoperateur + "INTERVAL" + " ''" + this.state.BtnValeur2 + "''" + value + "''",
                inputDateCalculater: array.slice(0, -1) + this.state.Calendar + " " + this.state.Btnoperateur + "INTERVAL ''" + this.state.BtnValeur2 + ' ' + value + "''",


            });
            this.state.Periodicity = value;
            console.log("Periodicity", this.state.Periodicity)
        }


    }
    addOperateur = (value) => {

        if (this.state.Calendar == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'calandre est vide'
            })
        } else {

            if (value == "-" || value == "+" || value == "*" || value == "/") {
                this.setState({
                    inputDateCalculater: this.state.inputDateCalculater + " " + value + "INTERVAL ",

                    inputDateCalculater: this.state.inputDateCalculater.slice(0, -11) + " " + value + "INTERVAL "
                });
            }
            this.state.Btnoperateur = value;
            console.log("Btnoperateur", this.state.Btnoperateur);
            var $ = require("jquery");
            $('#Calendrier').hide();
            $('#Operateur').hide();
            $('#Valeur').show();
            $('#Periodicity').hide();
            $('#Calendrier1').show();
            $('#Operateur1').show();
            $('#Valeur1').hide();
            $('#Periodicity1').show();
        }

    }
    addCalendar = (value) => {

        console.log("aaaaaaaaaaaaaaaaaaaaaaaa", value)
        const array = []
        array.push(this.state.inputDateCalculater)
        console.log(this.state.inputDateCalculater);


        this.setState({
            inputDateCalculater: this.state.inputDateCalculater + value + "           ",

            inputDateCalculater: array.slice(0, -1) + value + "           "
        });
        this.state.Calendar = value;
        console.log("calendar", this.state.Calendar);

        var $ = require("jquery");
        $('#Calendrier').hide();
        $('#Operateur').show();
        $('#Valeur').hide();
        $('#Periodicity').hide();
        $('#Calendrier1').show();
        $('#Operateur1').hide();
        $('#Valeur1').show();
        $('#Periodicity1').show();
    }

    btndeleteDateCalculater() {

        if (this.state.inputDateCalculater == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'le champ est vide'
            })
        } else {
            const array = []
            array.push(this.state.inputDateCalculater)
            console.log(this.state.inputDateCalculater);

            this.setState({ inputDateCalculater: array.slice(0, -1) });
            console.log('deleteee')
            this.state.Calendar = "";
            this.state.Btnoperateur = "";
            this.state.Btnvaleur = [];
        }
    }

    AddDataCalculateurHaut() {
        console.log("this.state.inputDateCalculater", this.state.inputDateCalculater)
        if (this.state.inputDateCalculater >= this.state.bas || this.state.haut == "") {
            this.setState({ haut: this.state.inputDateCalculater });
            var a = this.state.inputDateCalculater.replace("date", "")
            var b = a.replace("::timestamp", "")
            var c = b.replace(/''/g, "")
            console.log("bbbbbbbbbbbbbbb", c)

            this.state.inputDateCalculaterUser = c;
            this.state.hautUser = this.state.inputDateCalculaterUser


            console.log(this.state.haut)


        }
        else {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 300,
                title: 'Il faut ajouter la valeur Haut Supérieur à la valeur Bas'
            })

        }
        var $ = require("jquery");
        $('#DateCalculator').hide();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
        this.state.Calendar = ""
        this.state.Btnoperateur = ""
        this.state.Btnvaleur = []
        this.state.Periodicity = ""
        this.state.inputDateCalculater = ""
    }
    AddDataCalculateurBas() {
        console.log("this.state.inputDateCalculater", this.state.inputDateCalculater)

        console.log(this.state.inputDateCalculater <= this.state.haut)
        if (this.state.inputDateCalculater <= this.state.haut || this.state.haut == "") {
            this.setState({ bas: this.state.inputDateCalculater });
            var a = this.state.inputDateCalculater.replace("date", "")
            var b = a.replace("::timestamp", "")
            var c = b.replace(/''/g, "")
            console.log("bbbbbbbbbbbbbbb", c)
            this.state.inputDateCalculaterUser = c;
            this.state.basUser = this.state.inputDateCalculaterUser
            console.log(this.state.bas)
        }
        else {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 500,
                title: 'Il faut ajouter la valeur Bas inférieure à la valeur Haut'
            })
        }
        var $ = require("jquery");
        $('#DateCalculator').hide();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
        this.state.Calendar = ""
        this.state.Btnoperateur = ""
        this.state.Btnvaleur = []
        this.state.Periodicity = ""
        this.state.inputDateCalculater = ""
    }

    AddDataCalculateurDans() {
        this.setState({ dans: this.state.inputDateCalculater });
        var a = this.state.inputDateCalculater.replace("date", "")
        var b = a.replace("::timestamp", "")
        var c = b.replace(/''/g, "")
        console.log("bbbbbbbbbbbbbbb", c)
        this.state.inputDateCalculaterUser = c;
        this.state.dansUser = this.state.inputDateCalculaterUser
        console.log(this.state.dans)
        var $ = require("jquery");
        $('#DateCalculator').hide();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
        this.state.Calendar = ""
        this.state.Btnoperateur = ""
        this.state.Btnvaleur = []
        this.state.Periodicity = ""
        this.state.inputDateCalculater = ""
    }

    updateDate(newDate) {

        // this.state.date = ("date'" + Moment(newDate).format('DD/MM/YYYY') + "'");
        this.state.datehorloge = ("''" + Moment(newDate).format('YYYY-MM-DD') + "''")
        this.state.date = ("date''" + Moment(newDate).format('YYYY-MM-DD') + "''");
        console.log("Date Calendar", this.state.date)//
        const array = []
        array.push(this.state.inputDateCalculater)
        console.log(this.state.inputDateCalculater);
        this.setState({
            inputDateCalculater: this.state.inputDateCalculater + this.state.date + "           ",

            inputDateCalculater: array.slice(0, -1) + this.state.date + "           "
        });


        this.state.Calendar = this.state.date
        console.log("this.state.Calendar", this.state.Calendar);

        var $ = require("jquery");
        $('#Calendrier').hide();
        $('#Operateur').show();
        $('#Valeur').hide();
        $('#Periodicity').hide();
        $('#Calendrier1').show();
        $('#Operateur1').hide();
        $('#Valeur1').show();
        $('#Periodicity1').show();

    }
    // updateDate = Calendar => this.setState({ Calendar: Moment(Calendar).format('DD/MM/YYYY') })

    HorlogeChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.state.horloge = e.target.value
        console.log("horloge", this.state.horloge);
        const array = []
        array.push(this.state.inputDateCalculater)
        console.log(this.state.inputDateCalculater);
        this.setState({
            inputDateCalculater: this.state.inputDateCalculater + +this.state.datehorloge + " " + this.state.horloge + "''::timestamp            ",

            inputDateCalculater: array.slice(0, -1) + this.state.datehorloge.slice(0, -2) + " " + this.state.horloge + "''::timestamp            "
        });
        this.state.Calendar = this.state.datehorloge.slice(0, -2) + " " + this.state.horloge + "''::timestamp"
        console.log("this.state.Calendar", this.state.Calendar);
        var $ = require("jquery");
        $('#Calendrier').hide();
        $('#Operateur').show();
        $('#Valeur').hide();
        $('#Periodicity').hide();
        $('#Calendrier1').show();
        $('#Operateur1').hide();
        $('#Valeur1').show();
        $('#Periodicity1').show();

    }


    ajoutTab() {
        ///////////////////////data modifier//////
        for (var i = 0; i < this.state.liste_tl_members_Modifier_Tl_User.length; i++) {
            const keyword = this.state.liste_tl_members_Modifier_Tl_User[i].keyword

            console.log("keyword", keyword)
            if (keyword == "Intervalles") {
                this.state.liste_keyword_Modifier.push(keyword)
            }

        }
        console.log("liste_keyword_Modifier", this.state.liste_keyword_Modifier)

        for (var i = 0; i < this.state.liste_tl_members_Modifier_Tl_SQL.length; i++) {
            const select = this.state.liste_tl_members_Modifier_Tl_SQL[i].SQLc
            console.log("select", select)
            if (select == "select") {
                this.state.liste_Select_Modifier.push(select)
            }
        }
        console.log("liste_Select_Modifier", this.state.liste_Select_Modifier)
        ///////////////////////////////////////////

        if (this.state.tl_name == "") {


            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 300,
                title: 'Créez ou Modifier une liste'
            })

        } else {
            if (this.state.keyword == "") {
                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 5000,
                    icon: 'warning',
                    width: 300,
                    title: 'les champs est vides'
                })
             } else if (this.state.operateur == "" ){
              
                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 5000,
                    icon: 'warning',
                    width: 400,
                    title: 'le champ Traitement est vide'
                })
            
                

            } else {

                ////////////////////////////Haut///Intervalles///////////////////////////
                if (this.state.haut != "" && this.state.bas == "") {

                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        this.state.totale_Dans = ""
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Haut"
                        this.state.att = att

                        const valeurUser = this.state.hautUser
                        this.state.valeurUser = valeurUser
                        const valeur1 = this.state.haut
                        var a = valeur1.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                        var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                        var b = o.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                        var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                        var d = c.replace(/Annee/g, "year")
                        var e = d.replace(/Moi/g, "month")
                        var f = e.replace(/Semaine/g, "week")
                        var j = f.replace(/Jour/g, "day")
                        var h = j.replace(/Heure/g, "hour")
                        var k = h.replace(/Minute/g, "minute")
                        var valeur = k.replace(/seconde/g, "second")
                        this.state.valeur = valeur
                        this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser=bb
                        console.log("bbbbbb", bb)
                        this.state.SQLcWhere = "where " + bb

                        ///////////////////////
                        if (operateur == "Inclure") {

                            this.state.SQL = (" iot.date >= " + valeur)
                            console.log("SQL Inclure", this.state.SQL)
                        }

                        if (operateur == "Exclure") {

                            this.state.SQL = (" iot.date <= " + valeur)
                            console.log("SQL Exclure", this.state.SQL)
                        }



                        //////////////////

                        this.state.SQLArrayHaut.push("(" + this.state.SQL + ")")
                        console.log("SQLArrayHaut", this.state.SQLArrayHaut)

                        this.state.SQLJoinHaut = this.state.SQLArrayHaut.join("or")
                        console.log("***join****SQLJoinHaut", this.state.SQLJoinHaut)
                        ////

                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                    } else {


                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter un autre Intervalle car pour chaque Ad hoc periodicites un seule Intervalle  '

                        })
                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                        this.state.keyword = "";
                        this.state.att = "";
                        this.state.valeurUser = "";
                        this.state.valeur = "";
                        this.state.operateur = "";

                    }

                }
                ////////////////////////////Bas///Intervalles///////////////////////////
                if (this.state.haut == "" && this.state.bas != "") {
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        this.state.totale_Dans = ""
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Bas"
                        this.state.att = att
                        const valeurUser = this.state.basUser
                        this.state.valeurUser = valeurUser
                        const valeur1 = this.state.bas
                        var a = valeur1.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                        var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                        var b = o.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                        var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                        var d = c.replace(/Annee/g, "year")
                        var e = d.replace(/Moi/g, "month")
                        var f = e.replace(/Semaine/g, "week")
                        var j = f.replace(/Jour/g, "day")
                        var h = j.replace(/Heure/g, "hour")
                        var k = h.replace(/Minute/g, "minute")
                        var valeur = k.replace(/seconde/g, "second")
                        this.state.valeur = valeur
                        this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser=bb
                        this.state.SQLcWhere = "where " + bb
                        //////
                        if (operateur == "Inclure") {

                            this.state.SQL = (" iot.date <= " + valeur)
                            console.log("SQL Inclure", this.state.SQL)
                        }

                        if (operateur == "Exclure") {

                            this.state.SQL = (" iot.date >= " + valeur)
                            console.log("SQL Exclure", this.state.SQL)
                        }
                        //////
                        this.state.SQLArrayBas.push("(" + this.state.SQL + ")")

                        console.log("SQLArrayBas", this.state.SQLArrayBas)

                        this.state.SQLJoinBas = this.state.SQLArrayBas.join("or")
                        console.log("***join****SQLJoinHaut", this.state.SQLJoinBas)
                        //////
                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                    } else {


                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter un autre Intervalle car pour chaque Ad hoc periodicites un seule Intervalle  '

                        })
                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                        this.state.keyword = "";
                        this.state.att = "";
                        this.state.valeurUser = "";
                        this.state.valeur = "";
                        this.state.operateur = "";

                    }
                }
                ////////////////////////////Entre///Intervalles///////////////////////////
                if (this.state.haut != "" && this.state.bas != "") {
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        this.state.totale_Dans = ""
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entre"
                        this.state.att = att






                        const valeurUser = (this.state.hautUser + "," + this.state.basUser)
                        const valeurSQL = ("" + this.state.haut + " and " + this.state.bas + "")
                        this.state.valeurUser = valeurUser

                        var a = valeurSQL.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                        var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                        var b = o.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                        var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                        var d = c.replace(/Annee/g, "year")
                        var e = d.replace(/Moi/g, "month")
                        var f = e.replace(/Semaine/g, "week")
                        var j = f.replace(/Jour/g, "day")
                        var h = j.replace(/Heure/g, "hour")
                        var k = h.replace(/Minute/g, "minute")
                        var valeur = k.replace(/seconde/g, "second")
                        this.state.valeur = valeur
                        this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);

                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser=bb
                        this.state.SQLcWhere = "where " + bb
                        this.state.SQL = (" iot.date between " + valeur)
                        ////////////
                        if (operateur == "Inclure") {

                            this.state.SQL = (" iot.date between " + valeur)
                            console.log("SQL Inclure", this.state.SQL)
                        }

                        if (operateur == "Exclure") {

                            this.state.SQL = (" iot.date not between " + valeur)
                            console.log("SQL Exclure", this.state.SQL)
                        }



                        this.state.SQLArrayEntre.push("(" + this.state.SQL + ")")
                        console.log("SQLArrayEntre", this.state.SQLArrayEntre)

                        this.state.SQLJoinEntre = this.state.SQLArrayEntre.join("or")
                        console.log("***join****SQLJoinEntre", this.state.SQLJoinEntre)
                        console.log("SQL", this.state.SQL)
                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                    } else {


                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter un autre Intervalle car pour chaque Ad hoc periodicites un seule Intervalle  '

                        })
                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";
                        this.state.keyword = "";
                        this.state.att = "";
                        this.state.valeurUser = "";
                        this.state.valeur = "";
                        this.state.operateur = "";

                    }
                }

                ////////////////////////////AdhocPeriodicites/////////////////////////////////
                if (this.state.inputPeriodicity != "") {
                    console.log(this.state.SQLJoinSelect.length)
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        console.log(this.state.SQLArrayBas.length)
                        console.log(this.state.SQLArrayHaut.length)
                        console.log(this.state.SQLArrayEntre.length)
                        this.state.SQLArrayIntervalles = this.state.SQLArrayBas.concat(this.state.SQLArrayHaut).concat(this.state.SQLArrayEntre)
                        console.log("SQLArrayIntervallessssssssssssssssss", this.state.SQLArrayIntervalles.length)
                        if (this.state.SQLArrayIntervalles.length == 1 || this.state.liste_keyword_Modifier.length == 1) {
                            if (this.state.SQLArrayDans.length == 0) {

                                ////////////////////////////AdhocPeriodicites/////////////////////////////////
                                if (this.state.AdhocPeriodicites == "Ad hoc periodicites") {

                                    const keyword = this.state.keyword;
                                    const operateur = this.state.operateur;
                                    const att = this.state.AdhocPeriodicites
                                    this.state.att = att
                                    const valeurUser = "''" + this.state.inputPeriodicity + "''"
                                    this.state.valeurUser = valeurUser
                                    var a = this.state.inputPeriodicity.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                                    var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                                    var x = o.replace("            ", "")
                                    var b = x.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                                    var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                                    var d = c.replace(/Annee/g, "year")
                                    var e = d.replace(/Moi/g, "month")
                                    var f = e.replace(/Semaine/g, "week")
                                    var j = f.replace(/Jour/g, "day")
                                    var h = j.replace(/Heure/g, "hour")
                                    var k = h.replace(/Minute/g, "minute")
                                    var valeur = k.replace(/seconde/g, "second")
                                    this.state.valeur = valeur
                                    this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                                    this.state.orderUser=""
                                    this.state.SQLcSelect = "select"
                                    this.state.SQL = ("time_bucket(''" + valeur + "'', iot.date) AS time,avg(iot.value) as valeur")

                                    this.state.SQLJoinSelect = this.state.SQL
                                    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect)

                                    this.state.valeurDecalage = "";
                                    this.state.totale_Dans = "";
                                    this.state.valeurLimite = "";
                                    this.state.haut = "";
                                    this.state.bas = "";
                                    this.state.dans = "";
                                    this.state.inputPeriodicity = "";

                                    this.state.Btnvaleurprd = [];
                                    this.state.PeriodicityPrd = "";

                                    // this.state.SQLArrayHaut=[];
                                    // this.state.SQLArrayBas=[];
                                    // this.state.SQLArrayEntre=[];

                                }
                                ////////////////////////////Ad hoc periodicites remplissait les cases vides/////////////////////////////////
                                if (this.state.AdhocPeriodicites == "Ad hoc periodicites remplissait les cases vides") {

                                    const keyword = this.state.keyword;
                                    const operateur = this.state.operateur;
                                    const att = this.state.AdhocPeriodicites
                                    this.state.att = att
                                    const valeurUser = this.state.Prd2 + " ''" + this.state.inputPeriodicity + "''"
                                    this.state.valeurUser = valeurUser
                                    var a = this.state.inputPeriodicity.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                                    var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                                    var x = o.replace("            ", "")
                                    var b = x.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                                    var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                                    var d = c.replace(/Annee/g, "year")
                                    var e = d.replace(/Moi/g, "month")
                                    var f = e.replace(/Semaine/g, "week")
                                    var j = f.replace(/Jour/g, "day")
                                    var h = j.replace(/Heure/g, "hour")
                                    var k = h.replace(/Minute/g, "minute")
                                    var valeur = k.replace(/seconde/g, "second")
                                    this.state.valeur = valeur
                                    this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                                    this.state.orderUser=""
                                    this.state.SQLcSelect = "select"
                                    if (this.state.Prd2 == "Periodicite du dernier lecteur") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(AVG(iot.value))as valeur")
                                    }
                                    if (this.state.Prd2 == "Interpoler les lecteurs manquantes") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(AVG(iot.value))as valeur")
                                    }
                                    if (this.state.Prd2 == "") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,avg(iot.value)as valeur'")
                                    }

                                    this.state.SQLJoinSelect = this.state.SQL
                                    console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect)

                                    this.state.valeurDecalage = "";
                                    this.state.totale_Dans = "";
                                    this.state.valeurLimite = "";
                                    this.state.haut = "";
                                    this.state.bas = "";
                                    this.state.dans = "";
                                    this.state.inputPeriodicity = "";
                                    this.state.Btnvaleurprd = [];
                                    this.state.PeriodicityPrd = "";

                                    // this.state.SQLArrayHaut=[];
                                    // this.state.SQLArrayBas=[];
                                    // this.state.SQLArrayEntre=[];

                                }
                            } else {

                                Swal.fire({
                                    toast: true,
                                    position: 'top',

                                    showConfirmButton: false,
                                    timer: 5000,
                                    icon: 'warning',
                                    width: 600,
                                    title: 'Pour ajouter une Ad hoc périodicité il ne faut  pas ajouter un ou pluseur ensemble'
                                })
                                this.state.keyword = "";
                                this.state.att = "";
                                this.state.valeurUser = "";
                                this.state.valeur = "";
                                this.state.operateur = "";
                            }

                        }
                        else {


                            Swal.fire({
                                toast: true,
                                position: 'top',

                                showConfirmButton: false,
                                timer: 5000,
                                icon: 'warning',
                                width: 600,
                                title: 'Pour ajouter une Ad hoc périodicité il faut ajouter un seul intervalle'
                            })

                            this.state.keyword = "";
                            this.state.att = "";
                            this.state.valeurUser = "";
                            this.state.valeur = "";
                            this.state.operateur = "";

                        }
                    }
                    else {



                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: ' Ne peut pas ajouter une autre Ad hoc périodicité '
                        })

                        this.state.keyword = "";
                        this.state.att = "";
                        this.state.valeurUser = "";
                        this.state.valeur = "";
                        this.state.operateur = "";
                    }
                }
                ///////////////////////////////////////////////////////////

                ////////////////////////////Dans///Ensemble//////////////////////////////

                if (this.state.totale_Dans != "") {
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        this.state.DansDev = (this.state.totale_Dans.slice(0, -1))
                        this.state.DansDevUser = (this.state.totale_DansUser.slice(0, -1))
                        console.log("this.state.DansDev ", this.state.DansDev);
                        const att = "Dans"
                        this.state.att = att
                        const valeurUser = (this.state.DansDevUser)
                        this.state.valeurUser = valeurUser
                        const valeur1 = (this.state.DansDev)
                        var a = valeur1.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                        var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                        var x = o.replace("            ", "")
                        var b = x.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                        var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                        var d = c.replace(/Annee/g, "year")
                        var e = d.replace(/Moi/g, "month")
                        var f = e.replace(/Semaine/g, "week")
                        var j = f.replace(/Jour/g, "day")
                        var h = j.replace(/Heure/g, "hour")
                        var k = h.replace(/Minute/g, "minute")
                        var valeur = k.replace(/seconde/g, "second")
                        this.state.valeur = valeur
                        this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser=bb
                        this.state.SQLcWhere = "where " + bb
                        //  this.state.SQL = ("in(" + valeur + ")")

                        if (operateur == "Inclure") {

                            this.state.SQL = (" date(iot.date) in(" + valeur + ")")
                            console.log("SQL Inclure", this.state.SQL)
                        }

                        if (operateur == "Exclure") {

                            this.state.SQL = (" date(iot.date) not in(" + valeur + ")")
                            console.log("SQL Exclure", this.state.SQL)
                        }


                        this.state.SQLArrayDans.push("(" + this.state.SQL + ")")
                        console.log("SQLArrayDans", this.state.SQLArrayDans)

                        this.state.SQLJoinDans = this.state.SQLArrayDans.join("and")
                        console.log("***join****SQLJoinDans", this.state.SQLJoinDans)




                        this.state.haut = "";
                        this.state.bas = "";
                        this.state.totale_Dans = ""
                        this.state.dans = ""
                        this.state.valeurLimite = "";
                        this.state.valeurDecalage = "";
                        this.state.inputPeriodicity = "";
                        this.state.Btnvaleurprd = [];
                        this.state.PeriodicityPrd = "";

                    } else {


                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter un ensemble  car il ajout  Ad hoc periodicites '
                        })
                    }
                }

                ////////////////////////////Limite//////////////////////////////
                if (this.state.valeurLimite != "") {

                    const keyword = this.state.keyword;
                    const operateur = this.state.operateur;
                    const att = "Entier"
                    this.state.att = att
                    const valeurUser = this.state.valeurLimite
                    this.state.valeurUser = valeurUser
                    var a = valeurUser.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                    var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                    var b = o.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                    var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                    var d = c.replace(/Annee/g, "year")
                    var e = d.replace(/Moi/g, "month")
                    var f = e.replace(/Semaine/g, "week")
                    var j = f.replace(/Jour/g, "day")
                    var h = j.replace(/Heure/g, "hour")
                    var k = h.replace(/Minute/g, "minute")
                    var valeur = k.replace(/seconde/g, "second")
                    this.state.valeur = valeur
                    this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                    console.log('operateur', operateur)
                    var l = operateur.replace("Ascendant", "asc")
                    var m = l.replace("Descendant", "desc")
                    console.log('M', m)
                    this.state.orderUser=""
                    this.state.SQLcLimite = "limit"
                    this.state.SQL = (m + " limit " + valeur)
                    console.log('SQL  ', this.state.SQL)
                    this.state.SQLArrayLimit.push("(" + this.state.SQL + ")")
                    console.log("SQLArrayLimit", this.state.SQLArrayLimit)

                    this.state.SQLJoinLimit = this.state.SQLArrayLimit.join("and")
                    console.log("***join****SQLJoinLimit", this.state.SQLJoinLimit)

                    this.state.valeurDecalage = "";
                    this.state.valeurLimite = "";
                    this.state.haut = "";
                    this.state.bas = "";
                    this.state.dans = "";
                    this.state.inputPeriodicity = "";
                    this.state.Btnvaleurprd = [];
                    this.state.PeriodicityPrd = "";

                }
                /////////////////////////////Decalage/////////////////////////////
                if (this.state.valeurDecalage != "") {

                    const keyword = this.state.keyword;
                    const operateur = this.state.operateur;
                    const att = "Entier"
                    this.state.att = att
                    const valeurUser = this.state.valeurDecalage
                    this.state.valeurUser = valeurUser
                    var a = valeurUser.replace(/Maintenant/g, "LOCALTIMESTAMP(0)")
                    var o = a.replace("LOCALTIMESTAMP(0)          ", "LOCALTIMESTAMP(0)")
                    var b = o.replace(/Date_Actuelle/g, "CURRENT_DATE()")
                    var c = b.replace(/Temp_Actuelle/g, "CURRENT_TIME()")
                    var d = c.replace(/Annee/g, "year")
                    var e = d.replace(/Moi/g, "month")
                    var f = e.replace(/Semaine/g, "week")
                    var j = f.replace(/Jour/g, "day")
                    var h = j.replace(/Heure/g, "hour")
                    var k = h.replace(/Minute/g, "minute")
                    var valeur = k.replace(/seconde/g, "second")
                    this.state.valeur = valeur
                    this.mytable.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                    console.log('operateur', operateur)
                    var l = operateur.replace("Ascendant", "asc")
                    var m = l.replace("Descendant", "desc")
                    console.log('M', m)
                    this.state.orderUser=""
                    this.state.SQLcOffset = "offset"
                    this.state.SQL = (m + " offset " + valeur)
                    this.state.SQLArrayOffSet.push("(" + this.state.SQL + ")")
                    console.log("SQLArrayOffSet", this.state.SQLArrayOffSet)

                    this.state.SQLJoinOffSet = this.state.SQLArrayOffSet.join("and")
                    console.log("***join****SQLJoinOffSet", this.state.SQLJoinOffSet)

                    this.state.valeurDecalage = "";
                    this.state.totale_Dans = "";
                    this.state.valeurLimite = "";
                    this.state.haut = "";
                    this.state.bas = "";
                    this.state.dans = "";
                    this.state.inputPeriodicity = "";
                    this.state.Btnvaleurprd = [];
                    this.state.PeriodicityPrd = "";

                }



                //    this.state.JsonOperateurValue.push({ "keyword": this.state.keyword, "operateur": this.state.operateur, "att": this.state.att, "valeur": this.state.valeur, "valeurUser": this.state.valeurUser, "SQLc": this.state.SQLc, "SQL":  this.state.SQL })
                if (this.state.keyword != "" && this.state.operateur != "" && this.state.valeurUser != "" && this.state.att != "" && this.state.valeur != "" && this.state.valeurUser != "") {
                    this.state.JsonOperateurValue.push({ "keyword": this.state.keyword, "operateur": this.state.operateur, "att": this.state.att, "valeur": this.state.valeur, "valeurUser": this.state.valeurUser,"order":this.state.orderUser })

                    console.log("JsonOperateurValue", this.state.JsonOperateurValue)

                }




                // this.state.JsonSQl.push({ "SQl": "", "SQLc": "" })

                var $ = require("jquery");
                $('#formulaire')[0].reset();
                $('#IntervalleTimeNouveau').hide();
                $('#EnsembleTimeNouveau').hide();
                $('#DateCalculator').hide();
                $('#ajoutHaut').hide();
                $('#ajoutBas').hide();
                $('#ajoutDans').hide();
                $('#LimiteNouveau').hide();
                $('#DecalageNouveau').hide();
                $('#prd1').hide();
                $('#prd2').hide();
                $('#Btnprd1').hide();
                $('#Btnprd2').hide();
                this.state.haut = "";
                this.state.hautUser="";
                this.state.basUser="";
                this.state.CalendarUser= ""
                this.state.dansUser= ""
                this.state.inputDateCalculaterUser= ""
                this.state.AdhocPeriodicitesUser= ""
                this.state.totale_DansUser= ""
                this.state.DansDevUser= ""
                this.state.order="";
                this.state.bas = "";
                this.state.totale_Dans = ""
                this.state.dans = ""
                this.state.valeurLimite = "";
                this.state.valeurDecalage = "";
                this.state.inputPeriodicity = "";
                this.state.Btnvaleurprd = [];
                this.state.PeriodicityPrd = "";
            }
        }
    }
    btnAjouterDans() {
        if (this.state.dans == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'le champ est vide'
            })
        } else {


            console.log(this.state.totale_Dans);
            this.setState({ totale_Dans: this.state.totale_Dans + this.state.dans + "," });
            this.setState({ totale_DansUser: this.state.totale_DansUser + this.state.dansUser + "," });
            console.log(this.state.totale_Dans);
            console.log("totale_DansUser", this.state.totale_DansUser);
            this.state.dans = ""
            this.state.dansUser = ""
        }
    }

    btndeleteDans() {

        if (this.state.totale_Dans == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'le champ est vide'
            })
        } else {
            const array = []
            array.push(this.state.totale_Dans)
            console.log(this.state.totale_Dans);

            this.setState({ totale_Dans: array.slice(0, -1) });
            const array2 = []
            array.push(this.state.totale_DansUser)
            console.log(this.state.totale_DansUser);

            this.setState({ totale_DansUser: array2.slice(0, -1) });
            console.log('deleteee')
        }
    }

    periodicites(name, event) {

        this.state.AdhocPeriodicites = name;
        console.log(this.state.AdhocPeriodicites);
        var $ = require("jquery");
        if (this.state.AdhocPeriodicites == "Ad hoc periodicites") {



            $('#prd1').show();
            $('#prd2').hide();

        }

        if (this.state.AdhocPeriodicites == "Ad hoc periodicites remplissait les cases vides") {


            $('#prd1').hide();
            $('#prd2').show();

        }


    }
    addPeriodicityPrd = (value) => {

        if (this.state.BtnValeur2prd == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Valeur est vide'
            })
        } else {
            this.state.PeriodicityPrd = value;
            console.log("Periodicity", this.state.PeriodicityPrd)
            const array = []
            array.push(this.state.inputPeriodicity)
            console.log(this.state.inputPeriodicity);
            this.setState({


                inputPeriodicity: this.state.BtnValeur2prd + " " + this.state.PeriodicityPrd,
                inputPeriodicity: array.slice(0, -1) + this.state.BtnValeur2prd + " " + this.state.PeriodicityPrd,


            });

        }

    }

    addValeurprd = (value) => {


        this.state.Btnvaleurprd.push(value)
        this.state.BtnValeur2prd = this.state.Btnvaleurprd.join("")


        console.log("value", value)
        console.log("Btnvaleurprd", this.state.Btnvaleurprd)
        console.log("BtnValeur2prd", this.state.BtnValeur2prd)
        this.setState({
            inputPeriodicity: this.state.BtnValeur2prd
        });




    }

    btndeleteinputPeriodicity() {

        if (this.state.inputPeriodicity == "") {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'le champ est vide'
            })
        } else {
            const array = []
            array.push(this.state.inputPeriodicity)
            console.log(this.state.inputPeriodicity);

            this.setState({ inputPeriodicity: array.slice(0, -1) });
            console.log('deleteee')


            this.state.Btnvaleurprd = [];
            this.state.BtnValeur2prd = "";
            this.state.PeriodicityPrd = "";
        }
    }
    addPrd2 = (value) => {



        this.state.Prd2 = value;
        console.log("Prd2", this.state.Prd2)



    }
    render() {
        const { errors } = this.state;
        return (<div>
            <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
                <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
                <MDBBreadcrumbItem > Time Intelligence</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px", width: 'auto' }}>
                {/** liste 1 */}
                
                <MDBRow >
                        <MDBCol size="6">
                <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: '920px', height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>

                    {/**************/}
                    <table border="1" style={{ marginTop: "9.5%" }} className="tab  float-right" >
                        <thead >
                            <tr>
                                <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Formulaire </b></th>
                                <th style={{ backgroundColor: "#fff" }}><h6 value={this.state.tl_name1} onChange={this.handleChange} id="1" > Nouveaux Temps </h6></th>
                                <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round ' id="btnuser" style={{ marginLeft: '4px' }} onClick={this.ajoutTab} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                            </tr>

                        </thead>
                        <tbody></tbody>
                    </table >
                    <div>

                        <form id="formulaire" >
                            <MDBRow >
                                <MDBCol size="6" style={{ marginTop: "2%" }}>
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Mot clé
                                    </label>
                                    <select
                                        className="browser-default custom-select" id="2" name="keyword" value={this.state.keyword} onChange={this.handleChange} required>
                                        <option></option>
                                        <option>Intervalles</option>
                                        <option>Ensemble</option>
                                        <option>Limite</option>
                                        <option>Decalage</option>
                                        <option>Ad hoc periodicites</option>

                                    </select>    </MDBCol>
                                <MDBCol size="6" style={{ marginTop: "2%" }}>
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Traitement
                                    </label>
                                    <select
                                        className="browser-default custom-select" name="operateur" value={this.state.operateur} onChange={this.handleChange} required>
                                        <option id="optionVide" ></option>
                                        <option id="Inclure" className="option" >Inclure</option>
                                        <option id="Exclure" className="option">Exclure</option>
                                        <option id="Ascendant" className="option">Ascendant</option>
                                        <option id="Descendant" className="option">Descendant</option>
                                        <option id="Intervalle" className="option">Intervalle</option>
                                    </select>
                                </MDBCol>

                                <MDBCol size="12">
                                    <div>   <br />
                                        <div id="IntervalleTimeNouveau" className="option">
                                            <div>
                                                <MDBInput style={{ height: '37px' }} label="Haut" outline size="sm" type="text" className="form-control" value={this.state.hautUser} onClick={this.InputHaut} placeholder="" onChange={this.handleChange} /></div>

                                            <div>
                                                <MDBInput style={{ height: '37px' }} label="Bas" outline size="sm" type="text" className="form-control" value={this.state.basUser} placeholder="" onClick={this.InputBas} onChange={this.handleChange} />
                                            </div>
                                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                                Ordre
                                            </label>
                                            <select
                                                className="browser-default custom-select" name="order" value={this.state.order} onChange={this.handleChange} required>
                                                <option></option>
                                                <option>Ascendant</option>
                                                <option>Descendant</option>
                                            </select>
                                        </div>

                                        <div id="EnsembleTimeNouveau" className="option">

                                            <MDBRow>
                                                <MDBCol size="11">    <MDBInput style={{ height: '37px', width: '100%' }} label="Dans" outline size="sm" type="text" className="form-control" name="dans" onClick={this.InputDans} value={this.state.dansUser} placeholder="" onChange={this.handleChange} />
                                                </MDBCol>
                                                <MDBCol size="1">    <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                                </MDBCol>
                                                <MDBCol size="11">       <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_DansUser" className="form-control  " value={this.state.totale_DansUser} placeholder="" onChange={this.handleChange} diabled />
                                                </MDBCol> <MDBCol size="1">     <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                                </MDBCol>


                                            </MDBRow>
                                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                                Ordre
                                            </label>
                                            <select
                                                className="browser-default custom-select" name="order" value={this.state.order} onChange={this.handleChange} required>
                                                <option id="optionVide" ></option>
                                                <option id="Ascendant" className="">Ascendant</option>
                                                <option id="Descendant" className="">Descendant</option>
                                            </select>
                                        </div>

                                    </div>



                                    <div id="LimiteNouveau" className="option">
                                        <MDBInput style={{ height: '37px' }} label="valeurLimite" min="0" outline size="sm" type="number" className="form-control" name="valeurLimite" value={this.state.valeurLimite} placeholder="" onChange={this.handleChange} />
                                    </div>
                                    <div id="DecalageNouveau" className="option">
                                        <MDBInput style={{ height: '37px' }} label="valeur Decalage" min="0" outline size="sm" type="number" className="form-control" name="valeurDecalage" value={this.state.valeurDecalage} placeholder="" onChange={this.handleChange} />
                                    </div>   </MDBCol>


                                <div id="periodicitesNouveau" className="option">



                                    <MDBRow style={{ marginLeft: "5px" }}>
                                        <MDBCol size="12" id="Btnprd1">

                                            <input type="radio" value="Ad hoc periodicites" name="AdhocPeriodicites" onClick={(e) => this.periodicites("Ad hoc periodicites", e)} /> Ad hoc periodicites
                                        </MDBCol>

                                        <div id="prd1" className="option" style={{ marginLeft: "15px" }}>

                                            <MDBCol size="12" >
                                                <input type="radio" value="moyenne" name="moyenne" checked disabled="disabled" /> Moyenne
                                            </MDBCol>

                                            <MDBContainer style={{ width: '240px', marginLeft: '65%' }}>
                                                {/* <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " style={{width:"150%"}} value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /> */}
                                                <MDBRow  >
                                                    <MDBCol size="10" style={{ marginLeft: "12%" }}>   <input type="text" id="1" id="inputPeriodicity" name="inputPeriodicity" style={{ width: "165%" }} className="form-control " value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /></MDBCol>

                                                    <MDBCol size="2" style={{ marginLeft: "115%", marginTop: "-37px" }}>     <MDBBtn style={{ height: '37px', marginLeft: "40px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteinputPeriodicity}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>
                                                </MDBRow>
                                                <br />
                                                <table style={{ marginTop: "-20px" }}>

                                                    <tr>

                                                        <td style={{ textAlign: 'center' }}><p style={{ marginLeft: "-35px" }} id="Valeur1" >Valeur</p> <p style={{ marginLeft: "-35px" }} id="Valeur" className="underline option">Valeur</p></td>
                                                        <td ><p style={{ marginLeft: "-15px" }} id="Periodicity1" >Periodicity</p> <p style={{ marginLeft: "-15px" }} id="Periodicity" className="underline option">Periodicity</p></td>
                                                    </tr>
                                                    <tr>


                                                        <td style={{ textAlign: 'center' }}><MDBContainer style={{ width: '240px', marginTop: '-10%' }}>

                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn7)} >7</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn8)}>8</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn9)}>9</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn4)} >4</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn5)}>5</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn6)}>6</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn1)} >1</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn2)}>2</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn3)}>3</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn0)}>0</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                            </MDBRow>
                                                        </MDBContainer></td>
                                                        <td style={{ textAlign: 'top' }}>
                                                            <select style={{ marginTop: '-35%', marginLeft: '-30px', width: '120px' }}

                                                                className="browser-default custom-select" name="Periodicity" value={this.state.Periodicity}
                                                                onChange={this.handleChange} onClick={() => this.addPeriodicityPrd(this.state.Periodicity)} size="7" required>

                                                                <option>Annee</option>
                                                                <option>Moi</option>
                                                                <option>Semaine</option>
                                                                <option>Jour</option>
                                                                <option>Heure</option>
                                                                <option>Minute</option>
                                                                <option>seconde</option>
                                                            </select>
                                                        </td>
                                                    </tr>


                                                </table>
                                                <br />
                                            </MDBContainer>

                                        </div>

                                        <MDBCol size="12" id="Btnprd2">
                                            <input type="radio" value="Ad hoc periodicites remplissait les cases vides" name="AdhocPeriodicites" onClick={(e) => this.periodicites("Ad hoc periodicites remplissait les cases vides", e)} /> Ad hoc periodicites remplissait les cases vides
                                        </MDBCol>

                                        <div id="prd2" className="option" style={{ marginLeft: "15px" }}>
                                            <MDBCol size="12" >
                                                <input type="radio" value="moyenne" name="moyenne2" checked disabled="disabled" /> Moyenne
                                            </MDBCol>
                                            <div style={{ marginLeft: "15px" }}>
                                                <MDBCol size="12">
                                                    <input type="radio" value="Periodicite du dernier lecteur" name="Prd2" onClick={(e) => this.addPrd2("Periodicite du dernier lecteur", e)} /> Periodicite du dernier lecteur
                                                </MDBCol>
                                                <MDBCol size="12">

                                                    <input type="radio" value="Interpoler les lecteurs manquantes" name="Prd2" onClick={(e) => this.addPrd2("Interpoler les lecteurs manquantes", e)} /> Interpoler les lecteurs manquantes
                                                </MDBCol>
                                            </div>
                                            <MDBContainer style={{ width: '240px', marginLeft: '52%' }}>
                                                {/* <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " style={{width:"150%"}} value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /> */}
                                                <MDBRow  >
                                                    <MDBCol size="10" style={{ marginLeft: "12%" }}>   <input type="text" id="1" id="inputPeriodicity" name="inputPeriodicity" style={{ width: "165%" }} className="form-control " value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /></MDBCol>

                                                    <MDBCol size="2" style={{ marginLeft: "115%", marginTop: "-37px" }}>     <MDBBtn style={{ height: '37px', marginLeft: "40px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteinputPeriodicity}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>
                                                </MDBRow>
                                                <br />
                                                <table style={{ marginTop: "-20px" }}>

                                                    <tr>

                                                        <td style={{ textAlign: 'center' }}><p style={{ marginLeft: "-35px" }} id="Valeur1" >Valeur</p> <p style={{ marginLeft: "-35px" }} id="Valeur" className="underline option">Valeur</p></td>
                                                        <td ><p style={{ marginLeft: "-15px" }} id="Periodicity1" >Periodicity</p> <p style={{ marginLeft: "-15px" }} id="Periodicity" className="underline option">Periodicity</p></td>
                                                    </tr>
                                                    <tr>


                                                        <td style={{ textAlign: 'center' }}><MDBContainer style={{ width: '240px', marginTop: '-10%' }}>

                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn7)} >7</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn8)}>8</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn9)}>9</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn4)} >4</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn5)}>5</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn6)}>6</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn1)} >1</MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn2)}>2</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn3)}>3</MDBBtn>
                                                            </MDBRow>
                                                            <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeurprd(this.state.btn0)}>0</MDBBtn>
                                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                            </MDBRow>
                                                        </MDBContainer></td>
                                                        <td style={{ textAlign: 'top' }}>
                                                            <select style={{ marginTop: '-35%', marginLeft: '-30px', width: '120px' }}

                                                                className="browser-default custom-select" name="Periodicity" value={this.state.Periodicity}
                                                                onChange={this.handleChange} onClick={() => this.addPeriodicityPrd(this.state.Periodicity)} size="7" required>

                                                                <option>Annee</option>
                                                                <option>Moi</option>
                                                                <option>Semaine</option>
                                                                <option>Jour</option>
                                                                <option>Heure</option>
                                                                <option>Minute</option>
                                                                <option>seconde</option>
                                                            </select>
                                                        </td>
                                                    </tr>


                                                </table>
                                                <br />




                                            </MDBContainer>

                                        </div>

                                    </MDBRow>






                                </div>




                                <MDBCol size="12">
                                    <label id="ajoutHaut" className="option" style={{ color: "#30ada1" }}> <u>Ajouter Haut</u></label>
                                    <label id="ajoutBas" className="option" style={{ color: "#30ada1" }}><u>Ajouter Bas</u></label>
                                    <label id="ajoutDans" className="option" style={{ color: "#30ada1" }}><u>Ajouter Dans</u></label>
                                </MDBCol>
                                <MDBCol id="DateCalculator" className="option">

                                    <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "100%" }}>

                                        <legend style={{ width: "138px", color: "#51545791", fontSize: '20px' }}>Date Calculator</legend>

                                        <MDBRow>
                                            <MDBCol size="4">
                                                <div className="shadow-box-example z-depth-1" style={{ width: "105%", height: "445px" }} >

                                                    <label id="Calendrier1" className=" option"> Calendrier</label>
                                                    <label id="Calendrier" className="underline "> Calendrier </label>

                                                    <Calendar onChange={this.updateDate} style={{ border: '0', height: "100hv" }} />


                                                    <label id="Calendrier1" className=" option"> Horloge</label>
                                                    <label id="Calendrier" className="underline "> Horloge </label>
                                                    {/* <input  style={{width:"99%"}} id="appt-time" type="time"   name="appt-time" step="2"></input> */}
                                                    <MDBInput style={{ width: "98%", marginLeft: "1%" }} outline size="sm" step="2" type="time" className="form-control" name="horloge" value={this.state.horloge} placeholder="" onChange={this.HorlogeChange} />

                                                    <MDBContainer style={{ width: '350px', marginLeft: "-14px", marginTop: "3%" }}>
                                                        <MDBRow style={{ margin: 0 + 'em', width: '350px' }}>
                                                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#eeeeee grey lighten-3" style={{ width: '24.5%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addCalendar(this.state.Maintenant)} > <MDBIcon icon="user-clock" title="Maintenant" size="lg" /> </MDBBtn>
                                                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#eeeeee grey lighten-3" style={{ width: '24.5%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addCalendar(this.state.Date_Actuelle)}> <MDBIcon icon="calendar-day" title="Date Actuelle" size="lg" /></MDBBtn>
                                                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#eeeeee grey lighten-3" style={{ width: '24.5%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addCalendar(this.state.Temp_Actuelle)}><MDBIcon icon="clock" title="Temp Actuelle" size="lg" /></MDBBtn>
                                                        </MDBRow>
                                                    </MDBContainer></div>
                                            </MDBCol>
                                            <MDBCol size="8">
                                                <MDBRow>
                                                    <MDBCol size="10">   <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " value={this.state.inputDateCalculater} onChange={this.handleChange} disabled /></MDBCol>

                                                    <MDBCol size="2">     <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDateCalculater}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>
                                                </MDBRow>
                                                <div style={{ marginTop: "-20px" }}>
                                                    <br />
                                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}><u> Intervalle </u> </label>
                                                    <table style={{ marginTop: "-20px" }}>

                                                        <tr>
                                                            <td style={{ textAlign: 'center' }}><p id="Operateur1" >Opérateur</p> <p id="Operateur" className="underline option">Opérateur</p></td>
                                                            <td style={{ textAlign: 'center' }}><p style={{ marginLeft: "-35px" }} id="Valeur1" >Valeur</p> <p style={{ marginLeft: "-35px" }} id="Valeur" className="underline option">Valeur</p></td>
                                                            <td ><p style={{ marginLeft: "-15px" }} id="Periodicity1" >Periodicity</p> <p style={{ marginLeft: "-15px" }} id="Periodicity" className="underline option">Periodicity</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td>

                                                                <MDBContainer  >
                                                                    <MDBRow style={{ marginTop: '-70%' }}>
                                                                        <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '37px', width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addOperateur(this.state.btnsubstraction)} >-</MDBBtn>

                                                                    </MDBRow>
                                                                    <MDBRow >
                                                                        <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '36px', width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addOperateur(this.state.btnaddition)} >+</MDBBtn>

                                                                    </MDBRow>
                                                                    <MDBRow >
                                                                        <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '36px', width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addOperateur(this.state.btndiv)} >/</MDBBtn>

                                                                    </MDBRow>
                                                                    <MDBRow >

                                                                        <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ height: '36px', width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addOperateur(this.state.btnmultiplication)}>*</MDBBtn>

                                                                    </MDBRow>
                                                                </MDBContainer>


                                                            </td>

                                                            <td style={{ textAlign: 'center' }}><MDBContainer style={{ width: '240px', marginTop: '-10%' }}>
                                                                <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn7)} >7</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn8)}>8</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn9)}>9</MDBBtn>
                                                                </MDBRow>
                                                                <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn4)} >4</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn5)}>5</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn6)}>6</MDBBtn>
                                                                </MDBRow>
                                                                <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn1)} >1</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn2)}>2</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn3)}>3</MDBBtn>
                                                                </MDBRow>
                                                                <MDBRow style={{ margin: 0 + 'em', width: '200px' }}>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                                    <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} onClick={() => this.addValeur(this.state.btn0)}>0</MDBBtn>
                                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '60px', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                                </MDBRow>
                                                            </MDBContainer></td>
                                                            <td style={{ textAlign: 'top' }}>
                                                                <select style={{ marginTop: '-35%', marginLeft: '-30px', width: '120px' }}
                                                                    className="browser-default custom-select" name="Periodicity" value={this.state.Periodicity} onChange={this.handleChange} onClick={() => this.addPeriodicity(this.state.Periodicity)} size="6" required>

                                                                    <option>Annee</option>
                                                                    <option>Moi</option>
                                                                    <option>Semaine</option>
                                                                    <option>Jour</option>
                                                                    <option>Heure</option>
                                                                    <option>Minute</option>
                                                                    <option>seconde</option>
                                                                </select>
                                                            </td>
                                                        </tr>


                                                    </table>
                                                    <MDBRow style={{ width: '240px', marginTop: '-2%', marginLeft: '66%' }}>

                                                        <MDBBtn outline className="   btn-md" color="#bdbdbd grey lighten-1" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.Annuler}> <MDBIcon icon="angle-double-up" title="Annuler" size="lg" /></MDBBtn>
                                                        <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurHaut} id="ajoutHautBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
                                                        <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurBas} id="ajoutBasBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
                                                        <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurDans} id="ajoutDansBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
                                                    </MDBRow>

                                                </div>


                                            </MDBCol>
                                        </MDBRow>
                                    </fieldset>

                                </MDBCol>

                            </MDBRow>
                        </form>

                    </div>

                </fieldset>
                {/** fin liste 1 */}


                </MDBCol>
              
              <MDBCol size="6">

                {/** liste 2 */}
                <fieldset className="form-group" className="float-right" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', height: 'auto', minHeight: '920px', width: '98%', backgroundColor: "#c3c3c321" }}>

                    {/*****************************Selectionnez une Liste************************* */}
                    <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle4} >Sélectionnez une Liste</MDBBtn>

                    <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered >
                        <MDBModalHeader toggle={this.toggle4} >Sélectionnez une Liste :</MDBModalHeader>
                        {/* <MDBModalBody>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                Les listes
                            </label>
                            <select className="browser-default custom-select" name="Nom" value={this.state.Nom} onChange={this.handleChange} size="8" >
                                <option></option>
                                {this.state.listes.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={(e) => this.handleClick(liste.tl_id, e)}>  {liste.tl_name} </option>)}

                            </select>

                        </MDBModalBody> */}
                        <ModalTL toggle4={this.toggle4}  listes={this.state.listes} handleClick={this.handleClick} handleChange={this.handleChange} Nom={this.state.Nom} />
                        <MDBModalFooter>

                            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.tl1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    {/************* tl_name *************/}
                    <div style={{ marginTop: "20px" }} >
                        < table border="1" className="tab  float-right" >
                            <thead >
                                <tr>
                                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}>Fichier Source</b></th>
                                    <th style={{ backgroundColor: "#fff" }}>

                                        <h6 value={this.state.tl_name} onChange={this.handleChange} >

                                            {this.state.tl_name}

                                        </h6>
                                    </th>
                                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >
                                        {/** Nouveau */}
                                        <MDBBtn className=' button_round  ' id="btnNouveau" style={{ marginLeft: '4px' }} onClick={this.toggle}><MDBIcon title="Nouveau" icon="plus" /></MDBBtn>
                                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
                                            <MDBModalHeader toggle={this.toggle} >Tapez le nom du Nouveau Time Intelligence ici :</MDBModalHeader>
                                            <MDBModalBody>
                                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                                    Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                                </label>
                                                <input type="text" id="1" id="defaultFormLoginEmailEx" name="tl_name" className="form-control" value={this.state.tl_name} onChange={this.handleChange} required />

                                                {errors.tl_name.length > 0 &&
                                                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.tl_name}</span>}

                                            </MDBModalBody>
                                            <MDBModalFooter>

                                                <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>

                                        {/** Modifier Nom liste */}
                                        <MDBBtn className=' button_round  option' id="btnModifier" style={{ marginLeft: '4px' }} onClick={this.toggle3}><MDBIcon title="Modifier Nom" icon="pencil-alt" /></MDBBtn>
                                        <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
                                            <MDBModalHeader toggle={this.toggle3} >Modifier le nom du Time Intelligence ici :</MDBModalHeader>
                                            <MDBModalBody>
                                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                                    Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                                </label>
                                                <input type="text" id="1" id="defaultFormLoginEmailEx" name="tl_name" className="form-control" value={this.state.tl_name} onChange={this.handleChange} required />
                                                {errors.tl_name.length > 0 &&
                                                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.tl_name}</span>}
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
                                                    Voulez-vous vraiment supprimer Time Intelligence selectionner ?
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






        </div>
        );

    }
}
export default TimeIntelligence;









const ModalTL = ({ toggle4, listes, handleClick, handleChange,Nom }) => {
    //console.log("Listes_Ml", Listes_Ml)

    const [filterTL_Liste, setfilterTL_Liste] = useState([])

    useEffect(() => {

        console.log("--------listes------->", listes)
    }, [listes])

    ////////////////////
    useEffect(() => {

        //console.log("jjjj",Listes_Ml.length!=0)
        if (filterTL_Liste.length == 0) {
            setfilterTL_Liste(listes)
        }
        if (listes.length != 0) {
            const FilterTlListe = (e) => {

                //console.log("Listes_Ml", Listes_Ml)
                const text = e.target.value
                //console.log("text", text)

                console.log("filter", listes.filter(
                    (el, i) => {
                        // console.log(i,el)
                        return el.tl_name.indexOf(text) >= 0
                    }
                )
                )

                setfilterTL_Liste(listes.filter((el) => el.tl_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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

    }, [listes])
    //////////////////////
    useEffect(() => {
        //if(!filterML_Liste)return
        console.log('---filterTL_Liste--->', filterTL_Liste)



    }, [filterTL_Liste])




    return (
        <>
          
            <MDBModalBody>

                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste Time Intelligence
                        </label>
                        <br />
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

                     

                        <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
                                <option></option>
                                {filterTL_Liste.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={(e) =>handleClick(liste.tl_id, e)}>  {liste.tl_name} </option>)}

                            </select>
                    </MDBCol>





                </MDBRow>
            </MDBModalBody>
        </>
    )


}