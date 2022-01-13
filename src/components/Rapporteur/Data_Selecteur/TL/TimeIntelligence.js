import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

import axios from 'axios';
import axios1 from '../../../axios';
import uuid from 'react-uuid';
import Moment from 'moment';
//import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Datetime from 'react-datetime';
import { DatetimePicker } from 'rc-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import moment from 'moment';
import Navbar from "../../../navbar";
import ModalTListeUser from "./ModalTListeUser";
import ModalTListeDev from "./ModalTListeDev";
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

class TimeIntelligence extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columnsReactTabulator: [
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
                    formatter: this.supprimerFunIcon,
                    cellClick: this.supprimerFunclick,
                }],
            tableData: [],
            history: props.history,
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
            liste_tl_members: null,
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
            orderUser: "",
            AdhocPeriodicites: "",
            AdhocPeriodicites2: "",
            Prd2: "",
            moment: moment(),
            SQLArrayBas2: [],
            SQLArrayHaut2: [],
            SQLArrayEntre2: [],
            SQLArrayLimit2: [],
            SQLArrayDecalage2: [],
            SQLJoinSelect2: [],
            SQLArrayDans2: [],
            SQLDeclage2: [],
            SQLHaut2: [],
            SQLBas2: [],
            SQLEntre2: [],
            SQLDans2: [],
            SQLLimit2: [],
            SQLSelect2: [],
            SQLDeclage2: [],
            dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
            errors: {
                tl_name: '* Obligatoire',
            },
            fonction: "AVG",
            ListeClusterUser: [],
            ListeIotUser: [],
            ListeClusterDev: [],
            ListeIotDev: [],
            modalDev: false,
            liste_Limite_Modifier: [],
            liste_Decalage_Modifier: [],
            tabulatorAfficher: false,
            modaledateCal: false,
            modaledateCalDans: false,
            modaledateCalBas: false,
            modalAddAdhoc: false,
            modalAddAdhocRCV: false,
            inputAdhok: "",
        }
        this.mytable = React.createRef();
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

    //   el = React.createRef();



    //    mytable = "Tabulator"; //variable to hold your table
    //    tableData = [] //data for table to display

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
    toggleDateCal = () => {
        this.setState({
            modaledateCal: !this.state.modaledateCal
        });



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
    getTl = () => {
        axios1.get(window.apiUrl + "getTl/?all")
            .then(
                (result) => {
                    if (result.data.length !== 0) {

                        console.log("listes", result.data)
                        this.setState({ listes: result.data.cluster })

                        var dataCluster = result.data.cluster
                        var dataIot = result.data.iot_inner

                        var arrayClusterDev = []
                        var arrayClusteruser = []
                        var arrayIotDev = []
                        var arrayIotUser = []
                        dataCluster.map((item, i) => {
                            console.log("-----------", item.code.slice(0, 2))
                            if (item.code.slice(0, 3) == "DTL") {

                                arrayClusterDev.push(item)
                                this.setState({ ListeClusterDev: arrayClusterDev })
                            }

                            if (item.code.slice(0, 2) == "TL") {

                                arrayClusteruser.push(item)
                                this.setState({ ListeClusterUser: arrayClusteruser })
                                //console.log("-----ListeClusterUser------",item)
                            }
                        })
                        console.log("-----ListeClusterDev------", arrayClusterDev)


                        dataIot.map((item, i) => {


                            console.log("-----------", item.code.slice(0, 2))
                            if (item.code.slice(0, 3) == "DTL") {

                                arrayIotDev.push(item)
                                this.setState({ ListeIotDev: arrayIotDev })
                                //   console.log("-----ListeIotDev------",item)
                            }
                            if (item.code.slice(0, 2) == "TL") {

                                arrayIotUser.push(item)
                                this.setState({ ListeIotUser: arrayIotUser })
                                console.log("-----ListeIotUser------", item)
                            }
                        })




                        //this.state.listes = result.data


                    }
                    // else {
                    //     Swal.fire({
                    //         toast: true,
                    //         position: 'top',
                    //         showConfirmButton: false,
                    //         timer: 5000,
                    //         icon: 'warning',
                    //         width: 300,
                    //         title: "Il n'a pas des listes"
                    //     })
                    // }

                }

            )
            .catch(({ response }) => {

                console.log("---------", response)
                if (response != null) {
                    if (response.status == "401") {

                        window.location.assign("/")
                        localStorage.clear();
                    }
                }
            })
    }

    toggle4 = () => {



        /// API tl
        if (this.state.modal4 == false) {

            this.getTl()
            this.setState({
                modal4: !this.state.modal4
            });
        } else {
            this.setState({
                modal4: !this.state.modal4
            });
        }
        /// FIN API tl
    }
    toggleDev = () => {



        /// API tl
        if (this.state.modalDev == false) {
            if (this.state.ListeIotDev.length == 0 && this.state.ListeClusterDev.length == 0) {
                this.getTl()
            }
            this.setState({
                modalDev: !this.state.modalDev
            });
        } else {
            this.setState({
                modalDev: !this.state.modalDev
            });
        }
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
            $('#Btnprd1').show();
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

    Getsendid = () => {
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


            this.Getsendid()
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
        axios1.get(window.apiUrl + `getTl/?all&id=${this.state.code}`)
            .then(
                (result) => {
                    console.log('result data')
                    console.log(result.data)

                    if (result.data != null) {
                        if (this.state.Nom == "") {
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
                        } else {


                            this.setState({
                                modal4: !this.state.modal4,
                                tabulatorAfficher: true
                            });

                            this.setState({ tl_name: this.state.Nom })

                            var dataTl = {}
                            Object.keys(result.data).map((key, ii, aa) => {
                                dataTl = result.data[key]


                            })

                            console.log("value maseur avec energie", dataTl)

                            var liste_tl_membersVar = dataTl.members
                            this.setState({ liste_tl_members: liste_tl_membersVar })
                            //    this.state.liste_tl_members = result.data[i].tl_members;

                            console.log("this.state.liste_tl_members", this.state.liste_tl_members)
                            this.setState({ liste_tl_members_Modifier_Tl_User: liste_tl_membersVar.Tl_User })
                            this.setState({ liste_tl_members_Modifier_Tl_SQL: liste_tl_membersVar.Tl_Sql })

                            /////////////



                            const Tl_UserG = dataTl.members
                            if (Tl_UserG == null) {

                                console.log("vide")

                            } else {
                                this.state.Tl_User_tab = dataTl.members.Tl_User



                            }
                            // this.state.tl_name = this.state.Nom;

                            console.log("this.state.Tl_User_tab", this.state.Tl_User_tab)

                            ///this.state.tl_description = result.data[i].tl_description;

                            //console.log("tl_description", this.state.tl_description)
                            console.log("tl_members", this.state.Tl_User_tab)


                            this.setState({ tableData: this.state.Tl_User_tab })

                            ///tabulator 




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
        this.setState({
            tableData: []
        });

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



        // setTimeout(function () {
        //     window.location.reload(1);

        // }, 1000);

        var $ = require("jquery");
        $('#btnNouveau').show();
        $('#btnModifier').hide();
    }
    handleClick(id, name, event) {

        this.setState({ Nom: name })
        this.setState({ code: id })


    }
    ///////
    Newliste() {
        const tl_id = this.state.tl_Code[0];
        console.log("id", tl_id)
        this.state.validation_Code = tl_id
        const tl_name = this.state.tl_name;
        const tl_description = this.state.tl_description;
        const tl_access = this.state.tl_access;
         var inSelect=false
        /** with delete row */
        if (this.state.liste_tl_members != null) {
            console.log("this.state.liste_tl_members----------------------------------------------------------------------", this.state.liste_tl_members)
            var o = JSON.stringify(this.state.liste_tl_members).replace(/'/g, "''");
            console.log("liste_tl_members string", o)
            var w = JSON.parse(o)
            console.log("liste_tl_members json", w)
            var Tl_User_List_Modifier = {};
            var Tl_Sql_List_Modifier = {};

            var Tl_User_List_Modifier = w.Tl_User
            var Tl_Sql_List_Modifier = w.Tl_Sql
            console.log("liste_tl_members Tl_User", Tl_User_List_Modifier)
            console.log("liste_tl_members Tl_Sql", Tl_Sql_List_Modifier)


            var Tl_User = this.state.JsonOperateurValue.concat(Tl_User_List_Modifier)

        } else {
            var Tl_User = this.state.JsonOperateurValue


        }




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
        console.log("Tl_Userrrrrrrrrrrrrrrrrrrrr", Tl_User)



        Tl_User.map((item,i)=>{

         console.log("4444444444444444444",item.keyword)
             if(item.keyword=="Ad hoc periodicites"){
                inSelect=true
             }else if(item.keyword=="Ad hoc periodicites remplissait les cases vides"){
                inSelect=true
             }else{
                inSelect=false
             }
        })


        for (i = 0; i < Tl_User.length; i++) {
            const att = Tl_User[i].att
            const operateur = Tl_User[i].operateur
            const valeur = Tl_User[i].valeur
            const valeurUser = Tl_User[i].valeurUser
            const keyword = Tl_User[i].keyword
            const order = Tl_User[i].order

            if (att == "Entre") {

                this.state.SQLcWhere2 = "where " + order
                if (operateur == "Inclure") {

                    this.state.SQLEntre2 = ("( iot.date between " + valeur + ")")
                    console.log("SQL Inclure", this.state.SQLEntre2)
                }

                if (operateur == "Exclure") {

                    this.state.SQLEntre2 = ("( iot.date not between " + valeur + ")")
                    console.log("SQL Exclure", this.state.SQLEntre2)
                }
                this.state.SQLArrayEntre2.push(this.state.SQLEntre2)
                console.log("SQLArrayBas2", this.state.SQLArrayEntre2)
            }
            if (att == "Ad hoc periodicites") {
                inSelect=true
                this.state.SQLcSelect2 = "select"
                this.state.SQLSelect2 = ("time_bucket(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value) as valeur")
                this.state.SQLJoinSelect2 = this.state.SQLSelect2
                console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
            }
            if (att == "Ad hoc periodicites remplissait les cases vides") {
                inSelect=true
                const Prd30 = valeurUser.slice(0, 30)
                const Prd0 = valeurUser.slice(0, 1)
                const Prd34 = valeurUser.slice(0, 34)
                this.state.SQLcSelect2 = "select"

                if (Prd30 == "Periodicite du dernier lecteur") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(" + this.state.fonction + "(iot.value))as valeur")
                }
                if (Prd34 == "Interpoler les lecteurs manquantes") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(" + this.state.fonction + "(iot.value))as valeur")
                }
                if (Prd0 == " ") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value)as valeur")
                }
                this.state.SQLJoinSelect2 = this.state.SQLSelect2
                console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
            }
            if (att == "Dans") {
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


            if (att == "Entier" && keyword == "Limite") {
                var l = operateur.replace("Ascendant", "asc")
                var m = l.replace("Descendant", "desc")
                console.log('M', m)
                this.state.SQLcLimite2 = "limit"
                console.log("--------------------",inSelect)
                if( inSelect==true){
                this.state.SQLLimit2 = ("order by cc_m,time "+ m +",valeur asc limit " + valeur )
            }else {
                this.state.SQLLimit2 = ("order by cc_m,date "+ m +",valeur asc limit " + valeur )

            }
                this.state.SQLArrayLimit2.push(this.state.SQLLimit2)
                console.log("SQLArrayLimit2", this.state.SQLArrayLimit2)
            }
            if (att == "Entier" && keyword == "Decalage") {
                var l = operateur.replace("Ascendant", "asc")
                var m = l.replace("Descendant", "desc")
                console.log('M', m)
                this.state.SQLcOffset2 = "offset"
                
                if(inSelect==true){
                this.state.SQLDeclage2 = ( "order by cc_m,time "+ m +",valeur asc offset " + valeur )
                }else{
                    this.state.SQLDeclage2 = ( "order by cc_m,date "+ m +",valeur asc offset " + valeur )
                   
                }
                this.state.SQLArrayDecalage2.push(this.state.SQLDeclage2)
                console.log("SQLArrayBas2", this.state.SQLArrayDecalage2)
            }

        }
        //////////////
        ///////////////////////////////////////////Where/////////////////////////////////////////////////////

        const arraysqlIntarvalle = this.state.SQLArrayEntre2

        var c = arraysqlIntarvalle.join("or")
        if (arraysqlIntarvalle.length != 0) {
            this.state.SQLWhere.push(c);
            console.log("SQLWhere", this.state.SQLWhere)
            console.log("SQLWhere.length", this.state.SQLWhere.length)
        }
        const arraysqlWhere = this.state.SQLWhere.concat(this.state.SQLArrayDans2)

        var Where = arraysqlWhere.join("and")
        this.state.JsonWhere = [{ "SQL": Where, "SQLc": this.state.SQLcWhere2 }]

        //////////////////////////////////////////Limit//////////////////////////////////////////////////////

        const arraysqlLimit = (this.state.SQLArrayLimit2)

        var Limit = arraysqlLimit.join("and")
        this.state.SQLLimit.push(Limit);
        this.state.JsonLimit = [{ "SQL": Limit, "SQLc": this.state.SQLcLimite2 }]




        ////////////////////////////////////////////Offset////////////////////////////////////////////////////

        const arraysqlOffset = (this.state.SQLArrayDecalage2)
        console.log("arraysql", arraysqlOffset)
        var Offset = arraysqlOffset.join("and")
        this.state.SQLOffSet.push(Offset);
        this.state.JsonOffSet = [{ "SQL": Offset, "SQLc": this.state.SQLcoffset2 }]


        ////////////////////////////////////////////Select////////////////////////////////////////////////////
        this.state.JsonSelect = [{ "SQL": this.state.SQLJoinSelect2, "SQLc": this.state.SQLcSelect2 }]



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
        if (arraysqlWhere.length == 0 && arraysqlLimit.length == 0 && arraysqlOffset.length == 0 && this.state.SQLJoinSelect.length == 0) {
            this.state.TlSQL = []
            console.log("vide TlSQL ")
        }

        ///////////////////////////////
        this.state.Membres.push({ Tl_User: Tl_User, Tl_Sql: this.state.TlSQL })

        /**********fin delete row  */
        const tl_members = this.state.Membres;


        const DBAction = "2";
        // this.state.ajout = (tl_id + ";" + tl_name + ";" + tl_description + ";" + tl_access + ";" + tl_members + ";" + DBAction);
        this.state.ajout = {
            "tl_id": tl_id,
            "tl_name": tl_name,
            "tl_description": tl_description,
            "tl_access": tl_access,
            "tl_members": tl_members,
            "pair": "",
            "tlConfig": {},
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
        var inSelect=false
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log("liste_tl_members", this.state.liste_tl_members)


        var o = JSON.stringify(this.state.liste_tl_members).replace(/'/g, "''");
        console.log("liste_tl_members string", o)
        var w = JSON.parse(o)
        console.log("liste_tl_members json", w)
        var Tl_User_List_Modifier = {};
        var Tl_Sql_List_Modifier = {};

        var Tl_User_List_Modifier = w.Tl_User
        var Tl_Sql_List_Modifier = w.Tl_Sql
        console.log("liste_tl_members Tl_User", Tl_User_List_Modifier)
        console.log("liste_tl_members Tl_Sql", Tl_Sql_List_Modifier)


        //  const newMembres = (this.state.Membres.concat(w))

        /** with delete row */


        //var val = this.state.supprimertemp[0]
        var Tl_User = this.state.JsonOperateurValue.concat(Tl_User_List_Modifier)
        console.log("Tl_User_debut", Tl_User)
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var val = this.state.supprimertemp[i]
            var val1 = val.replace(/'/g, "''");

            console.log("supp", val1)

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

        console.log("Tl_User_fin", Tl_User)
        Tl_User.map((item,i)=>{

            console.log("4444444444444444444",item.keyword)
                if(item.keyword=="Ad hoc periodicites"){
                   inSelect=true
                }else if(item.keyword=="Ad hoc periodicites remplissait les cases vides"){
                   inSelect=true
                }else{
                   inSelect=false
                }
           })
        for (i = 0; i < Tl_User.length; i++) {
            const att = Tl_User[i].att
            const operateur = Tl_User[i].operateur
            const valeur = Tl_User[i].valeur
            const valeurUser = Tl_User[i].valeurUser
            const keyword = Tl_User[i].keyword
            const order = Tl_User[i].order

            if (att == "Entre") {

                this.state.SQLcWhere2 = "where " + order
                if (operateur == "Inclure") {

                    this.state.SQLEntre2 = ("( iot.date between " + valeur + ")")
                    console.log("SQL Inclure", this.state.SQLEntre2)
                }

                if (operateur == "Exclure") {

                    this.state.SQLEntre2 = ("( iot.date not between " + valeur + ")")
                    console.log("SQL Exclure", this.state.SQLEntre2)
                }
                this.state.SQLArrayEntre2.push(this.state.SQLEntre2)
                console.log("SQLArrayBas2", this.state.SQLArrayEntre2)
            }
            if (att == "Ad hoc periodicites") {
                inSelect=true
                this.state.SQLcSelect2 = "select"
                this.state.SQLSelect2 = ("time_bucket(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value) as valeur")
                this.state.SQLJoinSelect2 = this.state.SQLSelect2
                console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
            }
            if (att == "Ad hoc periodicites remplissait les cases vides") {
                inSelect=true
                const Prd30 = valeurUser.slice(0, 30)
                const Prd0 = valeurUser.slice(0, 1)
                const Prd34 = valeurUser.slice(0, 34)
                this.state.SQLcSelect2 = "select"

                if (Prd30 == "Periodicite du dernier lecteur") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(" + this.state.fonction + "(iot.value))as valeur")
                }
                if (Prd34 == "Interpoler les lecteurs manquantes") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(" + this.state.fonction + "(iot.value))as valeur")
                }
                if (Prd0 == " ") {
                    this.state.SQLSelect2 = ("time_bucket_gapfill(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value)as valeur")
                }
                this.state.SQLJoinSelect2 = this.state.SQLSelect2
                console.log("***join****SQLJoinSelect", this.state.SQLJoinSelect2)
            }
            if (att == "Dans") {
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
            if (att == "Entier" && keyword == "Limite") {
                var l = operateur.replace("Ascendant", "asc")
                var m = l.replace("Descendant", "desc")
                console.log('M', m)
                this.state.SQLcLimite2 = "limit"
                if( inSelect==true){
                this.state.SQLLimit2 = ("order by cc_m,time "+ m +",valeur asc limit " + valeur )
            }else {
                this.state.SQLLimit2 = ("order by cc_m,date "+ m +",valeur asc limit " + valeur )

            }
                this.state.SQLArrayLimit2.push(this.state.SQLLimit2)
                console.log("SQLArrayBas2", this.state.SQLArrayLimit2)
            }
            if (att == "Entier" && keyword == "Decalage") {
                var l = operateur.replace("Ascendant", "asc")
                var m = l.replace("Descendant", "desc")
                console.log('M', m)
                this.state.SQLcOffset2 = "offset"
                if( inSelect==true){
                this.state.SQLDeclage2 = ( "order by cc_m,time "+ m +",valeur asc offset " + valeur )
                }else{
                    this.state.SQLDeclage2 = ( "order by cc_m,date "+ m +",valeur asc offset " + valeur )
                   
                }
                this.state.SQLArrayDecalage2.push(this.state.SQLDeclage2)
                console.log("SQLArrayBas2", this.state.SQLArrayDecalage2)
            }

        }
        //////////////
        ///////////////////////////////////////////Where/////////////////////////////////////////////////////

        const arraysqlIntarvalle = this.state.SQLArrayEntre2

        var c = arraysqlIntarvalle.join("or")
        if (arraysqlIntarvalle.length != 0) {
            this.state.SQLWhere.push(c);
            console.log("SQLWhere", this.state.SQLWhere)
            console.log("SQLWhere.length", this.state.SQLWhere.length)
        }
        const arraysqlWhere = this.state.SQLWhere.concat(this.state.SQLArrayDans2)

        var Where = arraysqlWhere.join("and")
        this.state.JsonWhere = [{ "SQL": Where, "SQLc": this.state.SQLcWhere2 }]

        //////////////////////////////////////////Limit//////////////////////////////////////////////////////

        const arraysqlLimit = (this.state.SQLArrayLimit2)

        var Limit = arraysqlLimit.join("and")
        this.state.SQLLimit.push(Limit);
        this.state.JsonLimit = [{ "SQL": Limit, "SQLc": this.state.SQLcLimite2 }]


        ////////////////////////////////////////////Offset////////////////////////////////////////////////////

        const arraysqlOffset = (this.state.SQLArrayDecalage2)

        var Offset = arraysqlOffset.join("and")
        this.state.SQLOffSet.push(Offset);
        this.state.JsonOffSet = [{ "SQL": Offset, "SQLc": this.state.SQLcoffset2 }]



        ////////////////////////////////////////////Select////////////////////////////////////////////////////
        this.state.JsonSelect = [{ "SQL": this.state.SQLJoinSelect2, "SQLc": this.state.SQLcSelect2 }]

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
        if (this.state.validation_Code == "" || this.state.validation_Code == undefined) {

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
                    if (response.status == 200) {
                        this.setState({
                            ajoutertemp: [],
                            modificationtemp: [],
                            tl_id: "",
                            tl_Code: "",
                            tl_name: "",
                            tl_members: [],
                            validation_Code: ""

                        })
                        this.mytable.current.table.clearData()

                        this.setState({ tableData: [] })
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            width: 300,
                            icon: 'success',
                            title: 'Enregistrer avec succès'
                        })




                    }


                })
                .catch((err) => console.error(err));

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
    InputHaut = () => {
        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').show();
        $('#ajoutBas').hide();
        $('#ajoutDans').hide();
        $('#ajoutHautBtn').show();
        $('#ajoutBasBtn').hide();
        $('#ajoutDansBtn').hide();

        this.setState({ modaledateCal: !this.state.modaledateCal })
    }
    InputBas = () => {

        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').hide();
        $('#ajoutBas').show();
        $('#ajoutDans').hide();
        $('#ajoutHautBtn').hide();
        $('#ajoutBasBtn').show();
        $('#ajoutDansBtn').hide();
        this.setState({ modaledateCalBas: !this.state.modaledateCalBas })
    }
    InputDans = () => {

        var $ = require("jquery");
        $('#DateCalculator').show();
        $('#ajoutHaut').hide();
        $('#ajoutBas').hide();
        $('#ajoutDans').show();
        $('#ajoutHautBtn').hide();
        $('#ajoutBasBtn').hide();
        $('#ajoutDansBtn').show();
        this.setState({ modaledateCalDans: !this.state.modaledateCalDans })
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
        if (this.state.inputDateCalculater <= this.state.bas || this.state.haut == "") {
            this.setState({ haut: this.state.inputDateCalculater });
            var a = this.state.inputDateCalculater.replace("date", "")
            var b = a.replace("::timestamp", "")
            var c = b.replace(/''/g, "")
            console.log("bbbbbbbbbbbbbbb", c)

            this.state.inputDateCalculaterUser = c;
            this.state.hautUser = this.state.inputDateCalculaterUser
            this.setState({ modaledateCal: !this.state.modaledateCal })

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
                title: 'Il faut ajouter la valeur Bas Supérieur à la valeur Haut'
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
        if (this.state.inputDateCalculater >= this.state.haut || this.state.haut == "") {
            this.setState({ bas: this.state.inputDateCalculater });
            var a = this.state.inputDateCalculater.replace("date", "")
            var b = a.replace("::timestamp", "")
            var c = b.replace(/''/g, "")
            console.log("bbbbbbbbbbbbbbb", c)
            this.state.inputDateCalculaterUser = c;
            this.state.basUser = this.state.inputDateCalculaterUser
            this.setState({ modaledateCalBas: !this.state.modaledateCalBas })
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
                title: 'Il faut ajouter la valeur Haut inférieure à la valeur Bas'
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
        this.setState({ modaledateCalDans: !this.state.modaledateCalDans })
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

        var Tl_User = []
        /** with delete row */
        if (this.state.liste_tl_members != null) {
            console.log("this.state.liste_tl_members----------------------------------------------------------------------", this.state.liste_tl_members)
            var o = JSON.stringify(this.state.liste_tl_members).replace(/'/g, "''");
            console.log("liste_tl_members string", o)
            var w = JSON.parse(o)
            console.log("liste_tl_members json", w)
            var Tl_User_List_Modifier = {};
            var Tl_Sql_List_Modifier = {};

            var Tl_User_List_Modifier = w.Tl_User
            var Tl_Sql_List_Modifier = w.Tl_Sql
            console.log("liste_tl_members Tl_User", Tl_User_List_Modifier)
            console.log("liste_tl_members Tl_Sql", Tl_Sql_List_Modifier)


            Tl_User = this.state.JsonOperateurValue.concat(Tl_User_List_Modifier)

        } else {
            Tl_User = this.state.JsonOperateurValue


        }
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var indexdelete = -1;
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

            var filteredObjDelete = this.state.supprimertemp.find(function (item, i) {
                console.log("item", item)
                console.log("item Tl_User", item.valeur)
                if (item === val) {
                    index = i;
                    return i;
                }
            });

            console.log("delete row", index, filteredObj);
            console.log("delete row", indexdelete, filteredObjDelete);
            if (index > -1) {
                Tl_User.splice(index, 1);
            }
            if (indexdelete > -1) {
                Tl_User.splice(indexdelete, 1);
            }
        }


        /************** */
        for (var i = 0; i < Tl_User.length; i++) {
            const keyword = Tl_User[i].keyword
            const att = Tl_User[i].att
            console.log("keyword", keyword)
            if (keyword == "Intervalles" && att == "Entre") {
                this.state.liste_keyword_Modifier.push(keyword)
            }

            if (keyword == "Limite") {
                this.state.liste_Limite_Modifier.push(keyword)
            }
            if (keyword == "Decalage") {
                this.state.liste_Decalage_Modifier.push(keyword)
            }
            if (keyword == "Ad hoc periodicites") {
                this.state.liste_Select_Modifier.push(keyword)
            }
        }
        console.log("liste_keyword_Modifier", this.state.liste_keyword_Modifier)


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
                    title: 'le champ Mot clé est vide'
                })
            } else if (this.state.operateur == "") {

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
                ////////////////////////////Entre///Intervalles///////////////////////////
                if (this.state.haut != "" && this.state.bas != "") {
                    console.log()
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0 && this.state.SQLJoinEntre.length == 0) {
                        this.state.totale_Dans = ""
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entre"
                        this.state.att = att
                        const valeurUser = (this.state.hautUser + "," + this.state.basUser)
                        
                        const valeurSQL = ("" + this.state.haut + " and " + this.state.bas + "")
                        this.state.valeurUser = valeurUser

                        var a = valeurSQL.replace(/Maintenant/g, "now()")
                        var o = a.replace("now()          ", "now()")
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
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);

                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser = bb
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
                    }
                    else if (this.state.liste_Decalage_Modifier.length == 0 && this.state.SQLJoinOffSet.length == 0 && this.state.SQLJoinEntre.length == 0) {



                    }
                    else if (this.state.liste_Limite_Modifier.length == 0 && this.state.SQLJoinLimit.length == 0 && this.state.SQLJoinEntre.length == 0) {



                    } else {

                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter un autre Intervalle '

                        })

                    }
                } else if (this.state.keyword == "Intervalles") {

                    if (this.state.haut == "" && this.state.bas == "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir les champs haut et bas'
                        })
                    } else if (this.state.haut == "" && this.state.bas != "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir le champ haut'
                        })
                    } else if (this.state.haut != "" && this.state.bas == "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir le champ bas'
                        })
                    }

                }

                ////////////////////////////AdhocPeriodicites/////////////////////////////////
                if (this.state.inputPeriodicity != "") {
                    console.log(this.state.SQLJoinSelect.length)
                    if (this.state.SQLJoinSelect.length == 0 && this.state.liste_Select_Modifier.length == 0) {
                        console.log(this.state.SQLArrayBas.length)
                        console.log(this.state.SQLArrayHaut.length)
                        console.log(this.state.SQLArrayEntre.length)
                        this.state.SQLArrayIntervalles = this.state.SQLArrayEntre
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
                                    var a = this.state.inputPeriodicity.replace(/Maintenant/g, "now()")
                                    var o = a.replace("now()          ", "now()")
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
                                    this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                                    this.state.orderUser = ""
                                    this.state.SQLcSelect = "select"
                                    this.state.SQL = ("time_bucket(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value) as valeur")

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
                                    var a = this.state.inputPeriodicity.replace(/Maintenant/g, "now()")
                                    var o = a.replace("now()          ", "now()")
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
                                    this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                                    this.state.orderUser = ""
                                    this.state.SQLcSelect = "select"
                                    if (this.state.Prd2 == "Periodicite du dernier lecteur") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,LOCF(" + this.state.fonction + "(iot.value))as valeur")
                                    }
                                    if (this.state.Prd2 == "Interpoler les lecteurs manquantes") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time,interpolate(" + this.state.fonction + "(iot.value))as valeur")
                                    }
                                    if (this.state.Prd2 == "") {
                                        this.state.SQL = ("  time_bucket_gapfill(''" + valeur + "'', iot.date) AS time," + this.state.fonction + "(iot.value)as valeur'")
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
                                    title: 'Ne peut pas ajouter car pour chaque Ad hoc periodicites un seule Intervalle'
                                })

                                this.setState({ keyword: "", att: "", valeurUser: "", valeur: "", operateur: "" })

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
                                title: 'Pour ajouter une Ad hoc périodicité il faut ajouter un seul intervalle avec opérateur Entre'
                            })

                            this.setState({ keyword: "", att: "", valeurUser: "", valeur: "", operateur: "" })

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

                        this.setState({ keyword: "", att: "", valeurUser: "", valeur: "", operateur: "" })
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
                        var a = valeur1.replace(/Maintenant/g, "now()")
                        var o = a.replace("now()          ", "now()")
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
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var aa = this.state.order.replace("Ascendant", "asc")
                        var bb = aa.replace("Descendant", "desc")
                        this.state.orderUser = bb
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
                } else if (this.state.keyword == "Ensemble") {

                    if (this.state.totale_Dans == "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir le champ  liste Dans'
                        })
                    }

                }

                ////////////////////////////Limite//////////////////////////////
                if (this.state.valeurLimite != "") {

                    this.state.SQLArrayIntervalles = this.state.SQLArrayEntre
                    if (this.state.liste_Limite_Modifier.length == 0 && this.state.SQLJoinLimit.length == 0 && this.state.SQLArrayEntre.length == 1) {

                        console.log("-----111")
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurLimite
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")
                        this.state.orderUser = ""
                        this.state.SQLcLimite = "limit"
                        this.state.SQL = (m + " limit " + valeur)
                        this.state.SQLArrayLimit.push("(" + this.state.SQL + ")")
                        this.state.SQLJoinLimit = this.state.SQLArrayLimit.join("and")


                    } else if (this.state.liste_Limite_Modifier.length == 0 && this.state.SQLJoinLimit.length >= 1 && this.state.SQLArrayEntre.length == 1) {
                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter car pour chaque Limite un seule Intervalle'
                        })

                    } else if (this.state.liste_Limite_Modifier.length >= 1 && this.state.SQLJoinLimit.length >= 0 && this.state.SQLArrayEntre.length == 1) {
                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter car pour chaque Limite un seule Intervalle'
                        })

                    } else if (this.state.liste_Limite_Modifier.length == 0 && this.state.SQLJoinLimit.length == 0 && this.state.SQLArrayEntre.length == 0) {


                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurLimite
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")
                        this.state.orderUser = ""
                        this.state.SQLcLimite = "limit"
                        this.state.SQL = (m + " limit " + valeur)
                        this.state.SQLArrayLimit.push("(" + this.state.SQL + ")")
                        this.state.SQLJoinLimit = this.state.SQLArrayLimit.join("and")

                    } else if (this.state.liste_Limite_Modifier.length == 0 && this.state.SQLJoinLimit.length != 0 && this.state.SQLArrayEntre.length == 0) {

                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurLimite
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);
                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")
                        this.state.orderUser = ""
                        this.state.SQLcLimite = "limit"
                        this.state.SQL = (m + " limit " + valeur)
                        this.state.SQLArrayLimit.push("(" + this.state.SQL + ")")
                        this.state.SQLJoinLimit = this.state.SQLArrayLimit.join("and")

                    } else {

                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter'
                        })
                    }









                } else if (this.state.keyword == "Limite") {
                    if (this.state.valeurLimite == "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir le champ Valeur'
                        })
                    }

                }
                /////////////////////////////Decalage/////////////////////////////
                if (this.state.valeurDecalage != "") {
                    this.state.SQLArrayIntervalles = this.state.SQLArrayEntre
                    console.log("this.state.SQLArrayEntre--", this.state.SQLArrayEntre.length)
                    console.log("this.state.SQLArrayEntre--", this.state.SQLJoinOffSet.length)
                    if (this.state.liste_Decalage_Modifier.length == 0 && this.state.SQLJoinOffSet.length == 0 && this.state.SQLArrayEntre.length == 1) {

                        console.log("-----111")
                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurDecalage
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);

                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")

                        this.state.orderUser = ""
                        this.state.SQLcOffset = "offset"
                        this.state.SQL = (m + " offset " + valeur)
                        this.state.SQLArrayOffSet.push("(" + this.state.SQL + ")")


                        this.state.SQLJoinOffSet = this.state.SQLArrayOffSet.join("and")


                    } else if (this.state.liste_Decalage_Modifier.length == 0 && this.state.SQLJoinOffSet.length >= 1 && this.state.SQLArrayEntre.length == 1) {
                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter car pour chaque décalage un seule Intervalle'
                        })

                    }
                    else if (this.state.liste_Decalage_Modifier.length >= 1 && this.state.SQLJoinOffSet.length >= 0 && this.state.SQLArrayEntre.length == 1) {
                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter car pour chaque décalage un seule Intervalle'
                        })

                    }



                    else if (this.state.liste_Decalage_Modifier.length == 0 && this.state.SQLJoinOffSet.length == 0 && this.state.SQLArrayEntre.length == 0) {

                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurDecalage
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);

                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")

                        this.state.orderUser = ""
                        this.state.SQLcOffset = "offset"
                        this.state.SQL = (m + " offset " + valeur)
                        this.state.SQLArrayOffSet.push("(" + this.state.SQL + ")")


                        this.state.SQLJoinOffSet = this.state.SQLArrayOffSet.join("and")

                    } else if (this.state.liste_Decalage_Modifier.length == 0 && this.state.SQLJoinOffSet.length != 0 && this.state.SQLArrayEntre.length == 0) {

                        const keyword = this.state.keyword;
                        const operateur = this.state.operateur;
                        const att = "Entier"
                        this.state.att = att
                        const valeurUser = this.state.valeurDecalage
                        this.state.valeurUser = valeurUser
                        var valeur = valeurUser
                        this.state.valeur = valeur
                        this.mytable.current.table.addRow({ keyword, operateur, att, valeur, valeurUser }, true);

                        var l = operateur.replace("Ascendant", "asc")
                        var m = l.replace("Descendant", "desc")

                        this.state.orderUser = ""
                        this.state.SQLcOffset = "offset"
                        this.state.SQL = (m + " offset " + valeur)
                        this.state.SQLArrayOffSet.push("(" + this.state.SQL + ")")


                        this.state.SQLJoinOffSet = this.state.SQLArrayOffSet.join("and")

                    } else {

                        Swal.fire({
                            toast: true,
                            position: 'top',

                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 600,
                            title: 'Ne peut pas ajouter'
                        })
                    }








                    /******************** */


                } else if (this.state.keyword == "Decalage") {
                    if (this.state.valeurDecalage == "") {
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 5000,
                            icon: 'warning',
                            width: 400,
                            title: 'Remplir le champ Valeur'
                        })
                    }

                }



                //    this.state.JsonOperateurValue.push({ "keyword": this.state.keyword, "operateur": this.state.operateur, "att": this.state.att, "valeur": this.state.valeur, "valeurUser": this.state.valeurUser, "SQLc": this.state.SQLc, "SQL":  this.state.SQL })
                if (this.state.keyword != "" && this.state.operateur != "" && this.state.valeurUser != "" && this.state.att != "" && this.state.valeur != "" && this.state.valeurUser != "") {
                    this.state.JsonOperateurValue.push({ "keyword": this.state.keyword, "operateur": this.state.operateur, "att": this.state.att, "valeur": this.state.valeur, "valeurUser": this.state.valeurUser, "order": this.state.orderUser })

                    console.log("JsonOperateurValue", this.state.JsonOperateurValue)



                    // this.state.JsonSQl.push({ "SQl": "", "SQLc": "" })

                    var $ = require("jquery");
//                    $('#formulaire')[0].reset();
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
                    $('#Btnprd3').hide();
                    this.setState({

                        haut: "",
                        hautUser: "",
                        basUser: "",
                        CalendarUser: "",
                        dansUser: "",
                        inputDateCalculaterUser: "",
                        AdhocPeriodicitesUser: "",
                        DansDevUser: "",
                        order: "",
                        totale_Dans: "",
                        dans: "",
                        valeurLimite: "",
                        valeurDecalage: "",
                        inputPeriodicity: "",
                        Btnvaleurprd: [],
                        PeriodicityPrd: "",
                        operateur: "",
                        keyword: "",

                    })
                }
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

    periodicites = (name, event) => {

        this.state.AdhocPeriodicites = name;

        // this.setState({modalAddAdhoc:!this.state.modalAddAdhoc})
        var $ = require("jquery");
        if (name == "Ad hoc periodicites") {



            $('#prd1').show();
            $('#prd2').hide();

            // this.setState({modalAddAdhoc:!this.state.modalAddAdhoc})
            this.addAdhoc()
        }

        if (name == "Ad hoc periodicites remplissait les cases vides") {

            this.addAdhocRCV()
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

        this.setState({ Prd2: value })

        //this.state.Prd2 = value;
        //console.log("Prd2", this.state.Prd2)



    }

    CopierTLTemplate = () => {

        const supprimertemp = this.state.supprimertemp;

        /// API tl
        axios1.get(window.apiUrl + `getTl/?all&id=${this.state.code}`)
            .then(
                (result) => {
                    console.log('result data')
                    console.log(result.data)

                    if (result.data != null) {
                        if (this.state.Nom == "") {
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
                        } else {


                            this.setState({
                                modalDev: !this.state.modalDev,
                                tabulatorAfficher: true
                            });
                            this.setState({ tl_name: this.state.Nom })
                            var dataTl = {}
                            Object.keys(result.data).map((key, ii, aa) => {
                                dataTl = result.data[key]
                                //   console.log("value maseur avec energie",value)

                            })

                            console.log("result.data", dataTl)



                            var liste_tl_membersVar = dataTl.members
                            console.log("item", dataTl.members.Tl_User)
                            this.setState({ liste_tl_members: dataTl.members })



                            this.setState({ liste_tl_members_Modifier_Tl_User: liste_tl_membersVar.Tl_User })
                            this.setState({ liste_tl_members_Modifier_Tl_SQL: liste_tl_membersVar.Tl_Sql })

                            /////////////





                            const Tl_UserG = dataTl.members
                            console.log("item", dataTl)
                            if (Tl_UserG == null) {

                                console.log("vide")

                            } else {



                                this.state.Tl_User_tab = dataTl.members.Tl_User

                                this.Getsendid()
                                this.state.code = ""

                            }
                            // this.state.tl_name = this.state.Nom;

                            console.log("this.state.Tl_User_tab", this.state.Tl_User_tab)

                            ///this.state.tl_description = result.data[i].tl_description;

                            //console.log("tl_description", this.state.tl_description)
                            console.log("tl_members", this.state.Tl_User_tab)



                            this.setState({ tableData: this.state.Tl_User_tab })



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
    toggleDelete = () => {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
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
    CellTableFun = (cell) => {
        this.setState({ cellTable: cell })
        this.setState({ cellName: cell.getData().keyword + " " + cell.getData().valeurUser })
    }


    deletetab = () => {

        this.toggleDelete()
        this.state.cellTable.getRow().delete();
        this.state.supprimertemp.push(this.state.cellTable.getData().valeur);
    }

    addAdhoc = () => {
        this.setState({ modalAddAdhoc: !this.state.modalAddAdhoc })
       
    }
    addAdhocRCV = () => {
        
        this.setState({ modalAddAdhocRCV: !this.state.modalAddAdhocRCV })
             }
    btnajouterAdhocRCV=()=>{
        if (this.state.Prd2!=""&&this.state.BtnValeur2prd!=""&&this.state.PeriodicityPrd!="") {

            var a = this.state.fonction.replace("AVG", "Moyenne").replace("min", "Min").replace("max", "Max")
            this.setState({ modalAddAdhocRCV: !this.state.modalAddAdhocRCV })
            this.setState({ inputAdhok: this.state.Prd2 + " " + a + " " + this.state.BtnValeur2prd + " " + this.state.PeriodicityPrd })
        }else {
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Vérifier les champs'
            })
        }
    }
    btnajouterAdhoc=()=>{
        if (this.state.BtnValeur2prd!=""&&this.state.PeriodicityPrd!="") {

            var a = this.state.fonction.replace("AVG", "Moyenne").replace("min", "Min").replace("max", "Max")
            this.setState({ modalAddAdhoc: !this.state.modalAddAdhoc })
            this.setState({ inputAdhok: a + " " + this.state.BtnValeur2prd + " " + this.state.PeriodicityPrd })
        }else {
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'Vérifier les champs'
            })
        }
    }
    render() {
        const { errors } = this.state;
        return (<>
            <Navbar history={this.state.history} />
            <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438', color: "#000", fontFamily: 'GOTHAM MEDIUM' }}>
                <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
                <MDBBreadcrumbItem > Time Intelligence</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px", width: 'auto' }}>
                {/** liste 1 */}

                <MDBRow >
                    <MDBCol size="6">
                        <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: window.screen.availHeight / 1.56 + `px`, height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>

                            {/**************/}
                            <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggleDev} >Bizeyes Templates</MDBBtn>

                            <MDBModal isOpen={this.state.modalDev} toggle={this.toggleDev} centered size="lg">
                                <MDBModalHeader toggle={this.toggleDev} >Bizeyes Templates :</MDBModalHeader>

                                <ModalTListeDev toggle4={this.toggleDev} listesCluster={this.state.ListeClusterDev} listesIot={this.state.ListeIotDev} handleClick={this.handleClick} handleChange={this.handleChange} Nom={this.state.Nom} />
                                <MDBModalFooter>

                                    <MDBBtn style={{ marginRight: "40%" }} onClick={this.CopierTLTemplate}> Sélectionner</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                            <table border="1" style={{ marginTop: "20px" }} className="tab  float-right" >
                                <thead >
                                    <tr>
                                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Formulaire </b></th>
                                        <th style={{ backgroundColor: "#fff" }}><h6 value={this.state.tl_name1} onChange={this.handleChange} id="1" > Nouveaux Temps </h6></th>
                                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round ' id="btnuser" style={{ marginLeft: '4px' }} onClick={this.ajoutTab} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                                    </tr>

                                </thead>
                                <tbody></tbody>
                            </table >



                            <MDBRow >
                                <MDBCol size="6" style={{ marginTop: "2%" }}>
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Mot clé
                                    </label>
                                    <select
                                        className="browser-default custom-select" id="2" name="keyword" value={this.state.keyword} onChange={this.handleChange} required>
                                        <option></option>
                                        <option>Intervalles</option>
                                        {/* <option >Ensemble</option> */}
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
                                        {/********************************************************************************************************************************* */}

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






                                <MDBRow style={{ marginLeft: "20%" }} id="periodicitesNouveau" className="option">
                                    <MDBCol size="12" id="Btnprd1">

                                        {/* <input type="radio" value="Ad hoc periodicites" name="AdhocPeriodicites" onClick={(e) => this.periodicites("Ad hoc periodicites", e)} /> Ad hoc periodicites */}

                                        <MDBBtn color="#bdbdbd grey lighten-1" style={{ width: "100%" }} onClick={(e) => this.periodicites("Ad hoc periodicites", e)}>Ad hoc periodicites</MDBBtn>
                                    </MDBCol>


                                    <MDBCol size="12" id="Btnprd2" >
                                        {/* <input type="radio" value="Ad hoc periodicites remplissait les cases vides" name="AdhocPeriodicites" onClick={(e) => this.periodicites("Ad hoc periodicites remplissait les cases vides", e)} /> Ad hoc periodicites remplissait les cases vides */}
                                        <MDBBtn color="#bdbdbd grey lighten-1" style={{ width: "100%" }} onClick={(e) => this.periodicites("Ad hoc periodicites remplissait les cases vides", e)}>Ad hoc periodicites remplissait les cases vides</MDBBtn>


                                    </MDBCol>

                                    {this.state.inputAdhok && <MDBCol size="12" id="Btnprd3">

                                        <MDBInput size="sm" type="text" outline className="form-control" style={{ width: "100%", marginLeft: "2px", marginTop: "20px" }} name="valeurLimite" value={this.state.inputAdhok} placeholder="" onChange={this.handleChange} disabled />

                                    </MDBCol>}


                                </MDBRow>








                                {/***************Modal haut bas dans ******************************/}







                                <MDBModal isOpen={this.state.modaledateCal} toggle={this.InputHaut} centered size="lg">

                                    <MDBModalHeader toggle={this.InputHaut} >Ajouter Haut / Date Calculator</MDBModalHeader>
                                    <DateCalculator

                                        handleChange={this.handleChange}


                                        inputDateCalculater={this.state.inputDateCalculater}


                                        btndeleteDateCalculater={this.btndeleteDateCalculater}
                                        updateDate={this.updateDate}
                                        HorlogeChange={this.HorlogeChange}
                                        horloge={this.state.horloge}
                                        addCalendar={this.addCalendar}
                                        Maintenant={this.state.Maintenant}
                                        Date_Actuelle={this.state.Date_Actuelle}
                                        Temp_Actuelle={this.state.Temp_Actuelle}
                                        addOperateur={this.addOperateur}
                                        Periodicity={this.state.Periodicity}
                                        addPeriodicity={this.addPeriodicity}
                                        addValeur={this.addValeur}

                                    />
                                    <MDBModalFooter>

                                        <MDBBtn style={{ marginRight: "40%" }} onClick={this.AddDataCalculateurHaut} > Ajouter</MDBBtn>


                                    </MDBModalFooter>
                                </MDBModal>

                                <MDBModal isOpen={this.state.modaledateCalBas} toggle={this.InputBas} centered size="lg">

                                    <MDBModalHeader toggle={this.InputBas} >Ajouter Bas / Date Calculator</MDBModalHeader>
                                    <DateCalculator

                                        handleChange={this.handleChange}


                                        inputDateCalculater={this.state.inputDateCalculater}


                                        btndeleteDateCalculater={this.btndeleteDateCalculater}
                                        updateDate={this.updateDate}
                                        HorlogeChange={this.HorlogeChange}
                                        horloge={this.state.horloge}
                                        addCalendar={this.addCalendar}
                                        Maintenant={this.state.Maintenant}
                                        Date_Actuelle={this.state.Date_Actuelle}
                                        Temp_Actuelle={this.state.Temp_Actuelle}
                                        addOperateur={this.addOperateur}
                                        Periodicity={this.state.Periodicity}
                                        addPeriodicity={this.addPeriodicity}
                                        addValeur={this.addValeur}

                                    />
                                    <MDBModalFooter>


                                        <MDBBtn style={{ marginRight: "40%" }} onClick={this.AddDataCalculateurBas} > Ajouter</MDBBtn>


                                    </MDBModalFooter>
                                </MDBModal>
                                <MDBModal isOpen={this.state.modaledateCalDans} toggle={this.InputDans} centered size="lg">

                                    <MDBModalHeader toggle={this.InputDans} >Ajouter Dans / Date Calculator</MDBModalHeader>
                                    <DateCalculator

                                        handleChange={this.handleChange}


                                        inputDateCalculater={this.state.inputDateCalculater}


                                        btndeleteDateCalculater={this.btndeleteDateCalculater}
                                        updateDate={this.updateDate}
                                        HorlogeChange={this.HorlogeChange}
                                        horloge={this.state.horloge}
                                        addCalendar={this.addCalendar}
                                        Maintenant={this.state.Maintenant}
                                        Date_Actuelle={this.state.Date_Actuelle}
                                        Temp_Actuelle={this.state.Temp_Actuelle}
                                        addOperateur={this.addOperateur}
                                        Periodicity={this.state.Periodicity}
                                        addPeriodicity={this.addPeriodicity}
                                        addValeur={this.addValeur}

                                    />
                                    <MDBModalFooter>


                                        <MDBBtn style={{ marginRight: "40%" }} onClick={this.AddDataCalculateurDans} > Ajouter</MDBBtn>

                                    </MDBModalFooter>
                                </MDBModal>




                                {/***********************************************************************/}

                                {/***************Modal Adhoc ******************************/}
                                <MDBModal isOpen={this.state.modalAddAdhoc} toggle={this.addAdhoc} centered size="lg">

                                    <MDBModalHeader toggle={this.addAdhoc} >Ajouter AdHoc</MDBModalHeader>
                                    <AdHocModale

                                        handleChange={this.handleChange}


                                        addValeurprd={this.addValeurprd} Periodicity={this.state.Periodicity}
                                        addPeriodicityPrd={this.addPeriodicityPrd}
                                        addAdhoc={this.addAdhoc}
                                        fonction={this.state.fonction}
                                        inputPeriodicity={this.state.inputPeriodicity}
                                        btndeleteinputPeriodicity={this.btndeleteinputPeriodicity}
                                        btnajouterAdhoc={this.btnajouterAdhoc}
                                    />

                                </MDBModal>


                                <MDBModal isOpen={this.state.modalAddAdhocRCV} toggle={this.addAdhocRCV} centered size="lg">

                                    <MDBModalHeader toggle={this.addAdhocRCV} >Ajouter AdHoc</MDBModalHeader>
                                    <AdHocModaleRCV

                                        handleChange={this.handleChange}


                                        addValeurprd={this.addValeurprd} Periodicity={this.state.Periodicity}
                                        addPeriodicityPrd={this.addPeriodicityPrd}
                                        addAdhocRCV={this.addAdhocRCV}
                                        fonction={this.state.fonction}
                                        inputPeriodicity={this.state.inputPeriodicity}
                                        btndeleteinputPeriodicity={this.btndeleteinputPeriodicity}
                                        addPrd2={this.addPrd2}
                                        Prd2={this.state.Prd2}
                                        btnajouterAdhocRCV={this.btnajouterAdhocRCV}
                                    />

                                </MDBModal>

                                {/********************************************************** */}


                            </MDBRow>




                        </fieldset>
                        {/** fin liste 1 */}


                    </MDBCol>

                    <MDBCol size="6">

                        {/** liste 2 */}
                        <fieldset className="form-group" className="float-right" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', height: 'auto', minHeight: window.screen.availHeight / 1.56 + `px`, width: '98%', backgroundColor: "#c3c3c321" }}>

                            {/*****************************Selectionnez une Liste************************* */}
                            <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle4} >Sélectionnez une Liste</MDBBtn>

                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered size="lg" >
                                <MDBModalHeader toggle={this.toggle4} >Sélectionnez une Liste :</MDBModalHeader>

                                <ModalTListeUser toggle4={this.toggle4} listesCluster={this.state.ListeClusterUser} listesIot={this.state.ListeIotUser} handleClick={this.handleClick} handleChange={this.handleChange} Nom={this.state.Nom} />
                                <MDBModalFooter>

                                    <MDBBtn style={{ marginRight: "40%" }} onClick={this.tl1}>  Sélectionner</MDBBtn>
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


                            {/* <div style={{ marginTop: "100px" }} className="listeValider" ref={el => (this.el = el)} /> */}

                            {this.state.tabulatorAfficher == true && <ReactTabulator style={{ marginTop: "100px" }} className="listeValider"
                                ref={this.mytable}
                                data={this.state.tableData}
                                columns={this.state.columnsReactTabulator}
                                layout={"fitData"}
                                index={"valeur"}
                                options={{
                                    pagination: true,
                                    paginationSize: 8,
                                    paginationSizeSelector: [8, 10, 12],
                                    pagination: "local",
                                    selectable: 1,
                                    movableColumns: true,
                                    resizableRows: true,
                                    reactiveData: true,
                                }}
                            />}


                        </fieldset>
                        {/** fin liste 2 */}

                    </MDBCol>
                </MDBRow>
            </fieldset>
            <DeleteRow toggle={this.toggleDelete} modal={this.state.modalDelete} deletetab={this.deletetab} cellTable={this.state.cellTable} cellName={this.state.cellName} />

        </>
        );

    }
}
export default TimeIntelligence;

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

const DateCalculator = ({ handleChange, inputDateCalculater, btndeleteDateCalculater, updateDate, HorlogeChange, horloge, addCalendar, Maintenant, Date_Actuelle, Temp_Actuelle, addOperateur, btnmultiplication, Periodicity, addPeriodicity, addValeur }) => {



    return (
        <>
            <MDBModalBody >
                <MDBRow>
                    <MDBCol size="11">   <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " value={inputDateCalculater} onChange={handleChange} disabled /></MDBCol>
                    <MDBCol size="1">     <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "-1px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDateCalculater}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>

                    <MDBCol size="12">

                        <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "100%", marginTop: "10px" }}>

                            {/* <legend style={{ width: "18%", color: "#51545791", fontSize: '116%' }}></legend> */}
                            <label id="Calendrier1" className=" option"> Calendrier</label>
                            <label id="Calendrier" className="underline "> Calendrier </label>

                            {/* <Calendar onChange={this.updateDate} style={{ border: '0', height: "100hv" }} /> */}
                            <MDBInput style={{ width: "98%", marginLeft: "1%" }} outline size="sm" type="date" className="form-control" /*name="horloge" value={this.state.horloge}*/ placeholder="" onChange={updateDate} />


                            <label id="Calendrier1" className=" option"> Horloge</label>
                            <label id="Calendrier" className="underline "> Horloge </label>
                            {/* <input  style={{width:"99%"}} id="appt-time" type="time"   name="appt-time" step="2"></input> */}
                            <MDBInput style={{ width: "98%", marginLeft: "1%" }} outline size="sm" step="2" type="time" className="form-control" name="horloge" value={horloge} placeholder="" onChange={HorlogeChange} />

                            <MDBContainer style={{ width: '100%', marginTop: "3%", marginLeft: "13%" }}>
                                <MDBRow style={{ margin: 0 + 'em', width: '100%' }}>
                                    <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: '24.5%', textAlign: 'center' }} onClick={() => addCalendar(Maintenant)} > <MDBIcon icon="user-clock" title="Maintenant" size="lg" /> </MDBBtn>
                                    <MDBBtn outline className=" m-0 px-0  btn-md" style={{ width: '24.5%', textAlign: 'center' }} onClick={() => addCalendar(Date_Actuelle)}> <MDBIcon icon="calendar-day" title="Date Actuelle" size="lg" /></MDBBtn>
                                    <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: '24.5%', textAlign: 'center' }} onClick={() => addCalendar(Temp_Actuelle)}><MDBIcon icon="clock" title="Temp Actuelle" size="lg" /></MDBBtn>
                                </MDBRow>
                            </MDBContainer>
                        </fieldset>
                    </MDBCol>
                    <MDBCol size="12">
                        

                        <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "100%" }}>
                            <legend style={{ width: "12%", color: "#51545791", fontSize: '116%' }}>  Intervalle </legend>
                        
                                <MDBRow style={{marginLeft:"7%"}}>



                                <MDBCol size="4">
                                  <p id="Operateur1" style={{ marginLeft:"-10%" }} >Opérateur</p> <p style={{ marginLeft:"-10%" }}id="Operateur" className="underline option">Opérateur</p>
                                  </MDBCol>   
                                  <MDBCol size="4">
                                   <p id="Valeur1" style={{  marginLeft:"16%" }} >Valeur</p> <p  style={{  marginLeft:"16%" }} id="Valeur" className="underline option">Valeur</p>
                                     </MDBCol>
                                     <MDBCol size="4" > 
                                      <p  id="Periodicity1" style={{  marginLeft:"16%"}} >Periodicity</p> <p style={{  marginLeft:"16%"}}  id="Periodicity" className="underline option">Periodicity</p>
                              
                                   </MDBCol>
                                   <MDBCol size="4"> 
                                          
                                                <MDBRow >
                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '37px', width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addOperateur("-")} >-</MDBBtn>

                                                </MDBRow>
                                                <MDBRow >
                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '36px', width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addOperateur("+")} >+</MDBBtn>

                                                </MDBRow>
                                                <MDBRow >
                                                    <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ height: '36px', width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addOperateur("/")} >/</MDBBtn>

                                                </MDBRow>
                                                <MDBRow >

                                                    <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ height: '36px', width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addOperateur(btnmultiplication)}>*</MDBBtn>

                                                </MDBRow>
                                         

                                            </MDBCol>
                                            <MDBCol size="4"> 

                               
                                            <MDBRow style={{  width: '81%' }}>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("7")} >7</MDBBtn>
                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("8")}>8</MDBBtn>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("9")}>9</MDBBtn>
                                            </MDBRow>
                                            <MDBRow style={{ width: '81%' }}>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("4")} >4</MDBBtn>
                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("5")}>5</MDBBtn>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("6")}>6</MDBBtn>
                                            </MDBRow>
                                            <MDBRow style={{  width: '81%' }}>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("1")} >1</MDBBtn>
                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("2")}>2</MDBBtn>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("3")}>3</MDBBtn>
                                            </MDBRow>
                                            <MDBRow style={{  width: '81%' }}>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                                <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeur("0")}>0</MDBBtn>
                                                <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                                            </MDBRow>
                                   
                                        </MDBCol>
                                        <MDBCol size="4"> 
                                            <select style={{  width: '80%' }}
                                                className="browser-default custom-select" name="Periodicity" value={Periodicity} onChange={handleChange} onClick={() => addPeriodicity(Periodicity)} size="6" required>

                                                <option>Annee</option>
                                                <option>Moi</option>
                                                <option>Semaine</option>
                                                <option>Jour</option>
                                                <option>Heure</option>
                                                <option>Minute</option>
                                                <option>seconde</option>
                                            </select>
                                            </MDBCol>
                                            </MDBRow>


                           
                                {/* <MDBRow style={{ width: '240px', marginTop: '-2%', marginLeft: '66%' }}>

                <MDBBtn outline className="   btn-md" color="#bdbdbd grey lighten-1" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.Annuler}> <MDBIcon icon="angle-double-up" title="Annuler" size="lg" /></MDBBtn>
                <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurHaut} id="ajoutHautBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
                <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurBas} id="ajoutBasBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
                <MDBBtn outline className="   btn-md" color="#b2dfdb teal lighten-4" style={{ width: '75px', fontSize: '12px', textAlign: 'center' }} onClick={this.AddDataCalculateurDans} id="ajoutDansBtn" className="option"> <MDBIcon icon="plus" title="Ajouter" size="lg" /></MDBBtn>
            </MDBRow> */}

                      
                        </fieldset>

                    </MDBCol>
                </MDBRow>

            </MDBModalBody>

        </>

    )




}



const AdHocModale = ({ addValeurprd, Periodicity, addPeriodicityPrd, handleChange, addAdhoc, fonction, inputPeriodicity, btndeleteinputPeriodicity,btnajouterAdhoc }) => {


    return (
        <>
            <MDBModalBody >
                <MDBRow>
                    <MDBCol size="12"  >


                        <select className="browser-default custom-select" name="fonction" value={fonction} style={{ width: "100%" }} onChange={handleChange} required>


                            <option value="AVG">Moyenne</option>
                            <option value="min" >Min</option>
                            <option value="max">Max</option>


                        </select>


                    </MDBCol>

                    <MDBCol size="10" style={{  marginTop: "5px" }} >   
                    
                    <input type="text" id="1" id="inputPeriodicity" name="inputPeriodicity" style={{ width: "100%" }} className="form-control " value={inputPeriodicity} onChange={handleChange} disabled /></MDBCol>

                    <MDBCol size="2" >  
                    
                   <MDBBtn style={{ height: '37px', marginTop: "5px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteinputPeriodicity}> 
                   <MDBIcon  title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>






                    <MDBCol size="6"  >
                        <p style={{ textAlign: 'center' }} id="Valeur1" >Valeur</p> <p id="Valeur" className="underline option">Valeur</p>
                    </MDBCol>
                    <MDBCol size="6"  >
                        <p style={{ textAlign: 'center'}} id="Periodicity1" >Periodicity</p> <p  id="Periodicity" className="underline option">Periodicity</p>

                    </MDBCol>

                    {/* <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " style={{width:"150%"}} value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /> */}



                    <MDBCol size="6"  >

                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("7")} >7</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("8")}>8</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("9")}>9</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("4")} >4</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("5")}>5</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("6")}>6</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("1")} >1</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("2")}>2</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("3")}>3</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("0")}>0</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="6"  >
                        <select style={{  width: '98%' }}

                            className="browser-default custom-select" name="Periodicity" value={Periodicity}
                            onChange={handleChange} onClick={() => addPeriodicityPrd(Periodicity)} size="7" required>

                            <option>Annee</option>
                            <option>Moi</option>
                            <option>Semaine</option>
                            <option>Jour</option>
                            <option>Heure</option>
                            <option>Minute</option>
                            <option>seconde</option>
                        </select>

                    </MDBCol>

                </MDBRow>



            </MDBModalBody>
            <MDBModalFooter>


                <MDBBtn style={{ marginRight: "40%" }} onClick={btnajouterAdhoc} > Ajouter</MDBBtn>

            </MDBModalFooter>

        </>
    )
}


const AdHocModaleRCV = ({ addValeurprd, Periodicity, addPeriodicityPrd, handleChange, addAdhocRCV, fonction, inputPeriodicity, btndeleteinputPeriodicity, addPrd2, Prd2,btnajouterAdhocRCV }) => {

    useEffect(() => {
        console.log("this.staete", Prd2)
    }, [Prd2])
    return (
        <>
            <MDBModalBody >
                <MDBRow>  
                    <MDBCol size="12">
                        <input type="radio" value="Periodicite du dernier lecteur" name="Prd2" onClick={(e) => addPrd2("Periodicite du dernier lecteur", e)} /> Periodicite du dernier lecteur
                    </MDBCol>
                    <MDBCol size="12">

                        <input type="radio" value="Interpoler les lecteurs manquantes" name="Prd2" onClick={(e) => addPrd2("Interpoler les lecteurs manquantes", e)} /> Interpoler les lecteurs manquantes
                    </MDBCol>
               
                {Prd2 != "" ?
                    <>
                                   
                    <MDBCol size="12"  >


                        <select className="browser-default custom-select" name="fonction" value={fonction} style={{ width: "100%" }} onChange={handleChange} required>


                            <option value="AVG">Moyenne</option>
                            <option value="min" >Min</option>
                            <option value="max">Max</option>


                        </select>


                    </MDBCol>

                    <MDBCol size="10" style={{  marginTop: "5px" }} >   
                    
                    <input type="text" id="1" id="inputPeriodicity" name="inputPeriodicity" style={{ width: "100%" }} className="form-control " value={inputPeriodicity} onChange={handleChange} disabled /></MDBCol>

                    <MDBCol size="2" >  
                    
                   <MDBBtn style={{ height: '37px', marginTop: "5px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteinputPeriodicity}> 
                   <MDBIcon  title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn></MDBCol>






                    <MDBCol size="6"  >
                        <p style={{ textAlign: 'center' }} id="Valeur1" >Valeur</p> <p  style={{ textAlign: 'center'  }}id="Valeur" className="underline option">Valeur</p>
                    </MDBCol>
                    <MDBCol size="6"  >
                        <p style={{ textAlign: 'center'}} id="Periodicity1" >Periodicity</p> <p  style={{ textAlign: 'center'  }} id="Periodicity" className="underline option">Periodicity</p>

                    </MDBCol>

                    {/* <input type="text" id="1" id="Temps_Reel" name="Unte_temps" className="form-control " style={{width:"150%"}} value={this.state.inputPeriodicity} onChange={this.handleChange} disabled /> */}



                    <MDBCol size="6"  >

                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("7")} >7</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#ffffffff" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("8")}>8</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("9")}>9</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("4")} >4</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("5")}>5</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("6")}>6</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("1")} >1</MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("2")}>2</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("3")}>3</MDBBtn>
                        </MDBRow>
                        <MDBRow style={{ marginLeft:"10%", width: '81%' }}>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                            <MDBBtn outline className=" m-0 px-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} onClick={() => addValeurprd("0")}>0</MDBBtn>
                            <MDBBtn outline className=" m-0 p-0  btn-md" color="#51545791" style={{ width: '30%', fontSize: '12px', textAlign: 'center' }} disabled></MDBBtn>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="6"  >
                        <select style={{  width: '98%' }}

                            className="browser-default custom-select" name="Periodicity" value={Periodicity}
                            onChange={handleChange} onClick={() => addPeriodicityPrd(Periodicity)} size="7" required>

                            <option>Annee</option>
                            <option>Moi</option>
                            <option>Semaine</option>
                            <option>Jour</option>
                            <option>Heure</option>
                            <option>Minute</option>
                            <option>seconde</option>
                        </select>
                        
                    </MDBCol>

                </> : <></>}</MDBRow>
            </MDBModalBody>
            <MDBModalFooter>


                <MDBBtn style={{ marginRight: "40%" }} onClick={btnajouterAdhocRCV} > Ajouter</MDBBtn>

            </MDBModalFooter>

        </>
    )
}