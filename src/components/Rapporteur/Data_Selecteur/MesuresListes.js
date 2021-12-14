import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from 'axios';
import uuid from 'react-uuid';
import Moment from 'moment';
import Tabulator from "tabulator-tables"; //import Tabulator library
//import "tabulator-tables/dist/css/bulma/tabulator_bulma.min.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import "../Data_Selecteur/Listes.css"
import { ThemeProvider } from "styled-components";
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
class MesuresListes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ML_Name: "",
            ML_Name1: "",
            ML_Code: "",
            ML_Energie: "",
            ML_View: "",
            Liste_ML_Energie: [],
            Liste_ML_View: [],
            validation_Code: "",
            code: "",
            listes: [],
            modal: false,
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6: false,
            listesCapteur: [],
            listesViews: [],
            listesViews_Name: [],
            Views_Name: "",
            Code_Energy: "",
            arrayCode_Energy: [],
            arrayCode_View: [],
            measure_Energy_Code: '""',
            Code_View: "",
            measure_ViewCode: "",
            measure_Label: [],
            measure_Label_Energy: "",
            Nom: "",
            ML_Membre: "",
            liste_Membres: [],
            ML_Code: "",
            ajoutertemp: [],
            modificationtemp: [],
            Membres: [],
            EMNCode: "",
            ajout: "",
            Group_Access: "163883",
            arrayMembres: {},
            supprimer: "",
            supprimertemp: [],
            listeML_Path: "",
            listeDescription: "",
            ML_Path: "",
            dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
            errors: {
                ML_Name: '* Obligatoire',
            },
            /////////////Filter//////////////
            listfieldfiltername: [],
            listfieldfiltercontent: [],
            listMeasure_Label: [],
            filterNameMesures: [],
            listEnergy: [],
            listView: [],
            listCategory: [],
            listlevel: [],
            listStats: [],
            listMeasure_name: [],
            Energy: "",
            View: "",
            Category: "",
            level: "",
            Stats: "",
            measure_name: "",
            //////////////////////Enregistrement 
            tag_user: "",
            tag_system: "",
            tag_system_Modifier: "",
            EnergySelected: "",
            ViewSelected: "",
            CategorySelected: "",
            StateSelected: "",
            measure_name_Selected: "",
            tag_system_Array: [],
            tag_system_Array_Update: [],
            ML_Membre_fin: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.ajouter = this.ajouter.bind(this);
        this.masterListes = this.masterListes.bind(this);
        this.ML1 = this.ML1.bind(this);
        this.ajouterListe = this.ajouterListe.bind(this);
        this.supprimerAll = this.supprimerAll.bind(this);
        this.addAll = this.addAll.bind(this);
        this.Enregistrer = this.Enregistrer.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Newliste = this.Newliste.bind(this);
        this.updateliste = this.updateliste.bind(this);
        this.modifierNom = this.modifierNom.bind(this);
        this.Views = this.Views.bind(this);
        this.ajouterlisteCapteur = this.ajouterlisteCapteur.bind(this)
        this.resetvalueoffilter = this.resetvalueoffilter.bind(this)
        this.measure_LabelClick = this.measure_LabelClick.bind(this)
    }

    resetvalueoffilter() {


        axios.post(window.apiUrl + "filter/",

            {
                tablename: "EnergyMeasureNormalised",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",
                dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                dist: "*",
                orderby: "*",
            }
        )

            .then(
                (result) => {

                    if (result.data !== null) {
                        this.setState({ listMeasure_Label: result.data })
                        console.log("data filter");
                        console.log(this.state.listMeasure_Label)
                    } else {
                        console.log('no data change')
                    }



                }
            )
        this.state.Energy = ""
        this.state.View = ""
        this.state.Category = ""
        this.state.level = ""
        this.state.Stats = ""
        this.state.measure_name = ""
    }

    filterRapportglobal = (filterNameRapport) => {
        //console.log('appel data')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)
        this.state.filterNameRapport = filterNameRapport;
        //console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", filterNameRapport)

        if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
            if (this.state.filterNameRapport == undefined || this.state.filterNameRapport.length == 0) {
                axios.post(window.apiUrl + "filter/",

                    {
                        tablename: "Reporting_V3",
                        identifier: this.state.dateDMY + uuid(),
                        fields: "*",
                        content: "*",
                        dataselect: "Report_Code;Report_Name",
                        dist: "*",
                        orderby: "*",
                    }
                )

                    .then(
                        (result) => {
                            this.tableData = result.data;

                            //tabulator
                            //this.setState({ dataCompteur: result.data })
                            //console.log('result data global list compteur. ')
                            //console.log('data' + this.tableData + 'data')
                            if (this.tableData !== null) {
                                this.setState({ listRapportglobal: result.data })
                                console.log("data filter");
                                console.log(this.state.listRapportglobal)
                            } else {
                                console.log('no data change')
                            }



                        }
                    )

            }
            else {
                this.setState({ listRapportglobal: this.state.filterNameRapport })
            }
        }
        else {


            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Report_Code;Report_Name",
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
                            this.setState({ listRapportglobal: result.data })
                            console.log("data filter");
                            console.log(this.state.listRapportglobal)
                        } else {
                            console.log('no data change')
                        }



                    }
                )
        }

    }
    filterTableaux = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee tableaux')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)
        console.log('filter with new data')
        if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Report_TableauCode;Report_TableauName",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listTableaux = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.Report_TableauName;
                                listTableaux.push(x)
                            });
                            this.setState({ listTableau: listTableaux })
                            console.log("data Tableaux");
                            console.log(this.state.listTableau)
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
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Report_TableauCode;Report_TableauName",
                    dist: "*;dist",
                    orderby: "*;asc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        var listTableaux = []
                        console.log("lllll", result.data)
                        if (result.data !== null) {

                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.Report_TableauName;
                                listTableaux.push(x)
                            });
                            this.setState({ listTableau: listTableaux })
                            console.log("data compteur parent");
                            console.log(this.state.listTableau)

                        } else {
                            console.log('no data recieve by compteur parent')
                        }

                    }
                )


        }
    }
    filterTAGS = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee TAGS')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Report_Code;TAGS",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listTAGSs = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.TAGS;
                                listTAGSs.push(x)
                            });
                            this.setState({ listTAGS: listTAGSs })
                            console.log("data TAGS");
                            console.log(this.state.listTAGS)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Report_Code;TAGS",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listTAGSs = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.TAGS;
                                listTAGSs.push(x)
                            });
                            this.setState({ listTAGS: listTAGSs })
                            console.log("data TAGS");
                            console.log(this.state.listTAGS)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }
    filterMaster = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee Master')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Report_Code;Report_Master",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listMasters = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.Report_Master;
                                listMasters.push(x)
                            });
                            this.setState({ listMaster: listMasters })
                            console.log("data Master");
                            console.log(this.state.listMaster)
                        } else {
                            console.log('no data change')
                        }
                    }
                )

        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "Reporting_V3",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Report_Code;Report_Master",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        //  this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listMasters = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.Report_Master;
                                listMasters.push(x)
                            });
                            this.setState({ listMaster: listMasters })
                            console.log("data Master");
                            console.log(this.state.listMaster)
                        } else {
                            console.log('no data change')
                        }

                    }
                )

        }

    }

    getlistcompteurparent = () => {
        var listeTableau = []
        var listglobalcompteur = []


        var listparentcompteurduplicate = [...new Set(listeTableau)]

        this.setState({ listTableaux: listparentcompteurduplicate })
        this.setState({ listRapportglobal: listglobalcompteur })
    }

    //////////////////////////////
    componentDidUpdate(prevProps, prevState) {

        if (prevState.Tableaux !== this.state.Tableaux) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('Report_TableauName') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {

                        if (item == 'Report_TableauName') {
                            console.log('existeeeeeeeeeeeeeeee Report_TableauName')
                            console.log(j)
                            if (this.state.Tableaux != '') {
                                this.state.listfieldfiltercontent[j] = this.state.Tableaux
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterRapportglobal();
                        }
                    }
                    );
                });
            } else if (this.state.Tableaux != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_TableauName'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Tableaux] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'Report_TableauName'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "Reporting_V3",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'Report_TableauName'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'),
                        dataselect: "Report_Code;Report_Name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //  this.tableData = result.data;

                            if (result.data !== null) {

                                this.setState({ listRapportglobal: result.data })
                                console.log("data filter");
                                console.log(this.state.listRapportglobal)
                            } else {
                                console.log('no data change')
                            }
                        }
                    )
            }


        }
        /****************************** */


        ///console.log("uniti fini", this.state.unite)
        /*************************** */
        if (prevState.TAGS !== this.state.TAGS) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('TAGS') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'TAGS') {
                            console.log('existeeeeeeeeeeeeeeee TAGS')
                            console.log(j)
                            if (this.state.TAGS != '') {
                                this.state.listfieldfiltercontent[j] = this.state.TAGS
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterRapportglobal();
                        }
                    }
                    );
                });
            } else if (this.state.TAGS != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'TAGS'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.TAGS] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'TAGS'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.TAGS].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "Reporting_V3",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'TAGS'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.TAGS].join(';'),
                        dataselect: "Report_Code;Report_Name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listRapportglobal: result.data })
                                console.log("data filter");
                                console.log(this.state.listRapportglobal)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }

        /********************** */
        if (prevState.Master !== this.state.Master) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('Report_Master') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'Report_Master') {
                            console.log('existeeeeeeeeeeeeeeee Report_Master')
                            console.log(j)
                            if (this.state.Master != '') {
                                this.state.listfieldfiltercontent[j] = this.state.Master
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterRapportglobal();
                        } /*else {
               console.log('not existttttttttttttttt')
               state.listfieldfiltername.concat('Report_TableauName')
               state.listfieldfiltercontent.concat(this.state.Tableaux)
 
             }*/
                    }
                    );
                });
            } else if (this.state.Master != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_Master'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Master] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'Report_Master'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.Master].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "Reporting_V3",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'Report_Master'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.Master].join(';'),
                        dataselect: "Report_Code;Report_Name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            // = result.data;
                            if (result.data !== null) {

                                this.setState({ listRapportglobal: result.data })
                                console.log("data filter");
                                console.log(this.state.listRapportglobal)

                            } else {
                                console.log('no data change')
                            }
                        }
                    )

            }


        }
        /********************* */





    }



    ///////////////
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
            ML_Name: ' ',

        }
    }

    toggle1 = () => {
        if (this.state.ML_Name == "") {
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


    /************ modal Liste Master **************/
    toggle2 = () => {

        if (this.state.ML_Name == "") {


            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 300,
                title: 'Créez ou Modifier une liste '
            })

        } else if (this.state.Code_Energy == "") {

            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 300,
                title: 'Sélectionnez un capteur'
            })


        } else {
            this.setState({
                modal2: !this.state.modal2
            });
        }
    }
    /******************************************** */
    toggle3 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
        this.state.errors = {
            ML_Name: ' ',

        }
    }

    toggle4 = () => {

        //////////////
        /// API ML
        axios.post(window.apiUrl + "display/",
            {
                tablename: "ML_V3",
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




        ////////////

    }
    /************ modal Liste Capteur **************/
    toggle5 = () => {
        if (this.state.ML_Name == "") {


            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 300,
                title: 'Créez ou Modifier une liste '
            })

        } else {
            this.setState({
                modal5: !this.state.modal5
            });
        }

    }
    /******************************************** */
    /*********************Model_Enregister*********************** */
    toggle6 = () => {

        console.log("this.state.validation_Code", this.state.validation_Code, "kk")
        if (this.state.ML_Code != "") {
            this.state.validation_Code = this.state.ML_Code
        } else if (this.state.code != "") {
            console.log("gggggggggggg", this.state.code)
            this.state.validation_Code = this.state.code

        } else {
            console.log("code vide")
        }

        if (this.state.validation_Code != "") {


            if (this.state.code != "") {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                var tab =[]
                console.log("this.mytable.rowManager.activeRows.length",this.mytable.rowManager.activeRows.length)

                for(var j=0;j<this.mytable.rowManager.activeRows.length;j++){
                   
                    console.log("mytable",this.mytable.rowManager.activeRows[j].component._row.data.m_name)
                    var  jsonTab = {"m_code":this.mytable.rowManager.activeRows[j].component._row.data.m_code,"m_name":this.mytable.rowManager.activeRows[j].component._row.data.m_name}
                    tab.push(jsonTab)

                }

console.log("-----------------------tab---------------------->",tab)
                const newMembres = (tab)

                /** with delete 1 row update Liste */
                var data = newMembres
                console.log("liste_ML_Membre ", this.state.liste_ML_Membre)
                console.log("this.state.Membres ", this.state.Membres)
                console.log("data ", data)
                for (var i = 0; i < this.state.supprimertemp.length; i++) {

                    var index = -1;
                    var val = this.state.supprimertemp[i]
                    console.log(val)


                    var filteredObj = data.find(function (item, i) {
                        if (item.m_name === val) {
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

                console.log(this.state.liste_ML_Membre)
                console.log("Update_newMembres", newMembres)
                const ML_Membre = newMembres;
                this.state.ML_Membre_fin = ML_Membre;



                /////////////////////////////////////////////////////////////Update Tags system  with change liste membres///////////////////////////////////////////////////////////
                var arr = []
                for (var i = 0; i < ML_Membre.length; i++) {

                    arr.push(ML_Membre[i].m_code)

                }
                console.log("--------->", arr)

                var str = arr.toString()

                axios.get(window.apiUrl + "getMesures/?mesures=" + str,

                )

                    .then(
                        (result) => {


                            if (result.data !== null) {

                                console.log('result.data result.data result.data result.data------------------------------------------> ', result.data)
                                this.state.tag_system_Array_Update = []
                                this.state.tag_system = ""
                                for (var i = 0; i < result.data.length; i++) {

                                    var EnergySelected = result.data[i].measure_Energy
                                    var ViewSelected = result.data[i].measure_View
                                    var CategorySelected = result.data[i]["Measure-Category"]
                                    var StateSelected = result.data[i]["Measure-Stats"]
                                    var measure_name_Selected = result.data[i].measure_name



                                    this.state.tag_system_Array_Update.push(EnergySelected, ViewSelected, CategorySelected, StateSelected, measure_name_Selected)

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
                 
                  console.log("mytable",this.mytable.rowManager.activeRows[j].component._row.data.m_name)
                  var  jsonTab = {"m_code":this.mytable.rowManager.activeRows[j].component._row.data.m_code,"m_name":this.mytable.rowManager.activeRows[j].component._row.data.m_name}
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
             if (item.m_name === val) {
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
     const ML_Membre = data;

     console.log("ML_Membre", ML_Membre);
     this.state.ML_Membre_fin = ML_Membre;
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

    //////////////////////////////
    Enregistrer() {

        if (this.state.code == "") {
            this.Newliste();
        }
        else {
            this.updateliste();
        }
        console.log(this.state.validation_Code)
        if (this.state.validation_Code != undefined) {
            console.log("Enregistrer")
            axios.post(window.apiUrl + "updatedelete/", {
                tablename: "ML_V3",
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
if(response.data=="op"){

    setTimeout(function () {
        window.location.reload(1);
    }, 1000);
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'success',
        title: 'Enregister avec succès'
    })
}else {

    console.log("err")
}
                    


                })
                .catch((err) => console.error(err));


           
            var $ = require("jquery");
            $('#btnNouveau').show();
            $('#btnModifier').hide();



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
    /******************* */
    ajouterlisteCapteur() {
        this.setState({
            modal5: !this.state.modal5
        });
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            width: 300,
            title: 'Sélectionnez une Périodicité '
        })

    }
    /*****data Tabulator */

    el = React.createRef();

    mytable = "Tabulator"; //variable to hold your table
    tableData = [] //data for table to display

    /************* */


    componentDidMount() {
        //getdate
        this.getDate();

        // axios.post(window.apiUrl + "filter/",

        //     {
        //         tablename: "Energy",
        //         identifier: this.state.dateDMY + uuid(),
        //         fields: "*",
        //         content: "*",
        //         dataselect: "Code_Energy;Name_Energy",
        //         dist: "*;dist",
        //         orderby: "asc",
        //     }

        // )
        //     .then(
        //         (result) => {
        //             if (result.data !== null) {
        //                 this.setState({ listesCapteur: result.data })

        //                 console.log("Energyyyyyyyy", this.state.listesCapteur)
        //             } else {
        //                 console.log("Energy est vide")
        //             }

        //         }

        //     )




        axios.post(window.apiUrl + "filter/",

            {
                tablename: "EnergyMeasureNormalised",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",
                dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                dist: "*;*;*;*;*",
                orderby: "asc",
            }

        )
            .then(
                (result) => {
                    if (result.data !== null) {

                        this.setState({ listMeasure_Label: result.data })
                        console.log("listMeasure_Label", this.state.listMeasure_Label)
                    } else {
                        console.log("EnergyMeasureNormalised est vide")
                    }

                }

            )
        ///////////////
        // axios.post(window.apiUrl + "filter/",

        //     {
        //         tablename: "Views",
        //         identifier: this.state.dateDMY + uuid(),
        //         fields: "*",
        //         content: "*",
        //         dataselect: "Code;Views_Name",
        //         dist: "*;dist",
        //         orderby: "asc",
        //     }

        // )
        //     .then(
        //         (result) => {
        //             if (result.data !== null) {

        //                 this.setState({ listesViews_Name: result.data })
        //                 console.log("Views_Name", this.state.listesViews_Name)
        //             } else {
        //                 console.log("Views est vide")
        //             }

        //         }

        //     )


    }

    ///*******function MasterListes
    masterListes() {
        console.log("masterListes");



        this.state.ML_Name1 = ("Mesure (" + this.state.Name_Energy + " | " + this.state.Views_Name + ")");

        console.log(this.state.ML_Name1)


        var $ = require("jquery");
        $('#listeuser').show();
        $('#btnuser').show();

        $('#myInput').show();
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        this.setState({
            modal2: !this.state.modal2
        });
    }
    ///********fin function MasterListes

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'ML_Name':
                errors.ML_Name =
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
                    tablename: "ML_V3",
                    identifier: this.state.dateDMY + uuid(),
                    nombermaxcode: '1',
                    primaryfield: "ML_Code",
                    fields: "*",
                    content: "*",

                }
            )

                .then(
                    (result) => {
                        if (result.data !== null) {
                            //   this.state.ML_Code = result.data.substring(1, result.data.length-1);
                            var code = result.data.split(", ")
                            this.state.ML_Code = code[0]
                            console.log("ML_Code", this.state.ML_Code)
                        } else {
                            console.log('ML_Code vide')
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
                        title: "Mesures ",
                        field: "m_name",
                        width: '70%',
                        editor:"input"
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
                            supprimertemp.push(cell.getData().m_name);
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
                timer: 4000,
                icon: 'warning',
                width: 300,
                title: 'Nom est vide'
            })
        }


    }
    ajouterListe() {
        if (this.state.ML_Name == "") {


            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 300,
                title: 'Créez ou Modifier une liste '
            })

        } else {

            const m_name = this.state.measure_Label_Energy;
            const m_code = this.state.EMNCode;
            if (m_name == "") {

                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 4000,
                    icon: 'warning',
                    width: 300,
                    title: 'Sélectionnez des Mesures '
                })
            } else {
                if (this.state.measure_Label_Energy != "" || this.state.EMNCode != "") {
                    this.mytable.addRow({ m_name,m_code }, true);
                    console.log(m_name);

                    this.state.Membres.push({ "m_name": m_name, "m_code": m_code })

                    this.state.tag_system_Array.push(this.state.EnergySelected, this.state.ViewSelected, this.state.CategorySelected, this.state.StateSelected, this.state.measure_name_Selected)
                    console.log("tag_system_Array", this.state.tag_system_Array)
                    console.log('ML_Membre push', this.state.Membres)
                    this.state.measure_Label_Energy = ""
                    this.state.EMNCode = ""
                }
            }
        }
    }


    ML1() {


        console.log(this.state.ML_Code)
        const supprimertemp = this.state.supprimertemp;

        /// API ML
        axios.post(window.apiUrl + "display/",
            {
                tablename: "ML_V3",
                identifier: this.state.dateDMY + uuid(),
                fields: "*",
                content: "*",

            }
        )
            .then(
                (result) => {

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
                                this.state.ML_Code = result.data[i].ML_Code
                                console.log(this.state.ML_Code)
                                if (this.state.code == this.state.ML_Code) {
                                    this.setState({
                                        modal4: !this.state.modal4
                                    });
                                    this.setState({ ML_Name: this.state.Nom })
                                    this.setState({ liste_ML_Membre: result.data[i].ML_Membre })
                                    this.setState({ tag_system: result.data[i].tag_system })
                                    this.setState({ tag_user: result.data[i].tag_user })
                                    //   this.state.liste_ML_Membre = result.data[i].ML_Membre;
                                    this.state.listeML_Path = result.data[i].ML_Path;
                                    this.state.listeDescription = result.data[i].Description;
                                    console.log("listeML_Path", this.state.listeML_Path)
                                    console.log("listeDescription", this.state.Description)
                                    console.log("ML_Membre", this.state.liste_ML_Membre)

                                    if (this.state.liste_ML_Membre.length == 0) {

                                        Swal.fire({
                                            toast: true,
                                            position: 'top',
                                            showConfirmButton: false,
                                            timer: 4000,
                                            width: 500,
                                            title: ('Ajouter des Mesures  dans ' + this.state.Nom)

                                        })
                                        this.mytable = new Tabulator(this.el, {
                                            data: this.tableData, //link data to table
                                            reactiveData: true, //enable data reactivity
                                            height: "450px",
                                            columns: [

                                                {
                                                    title: "Mesures ",
                                                    field: "m_name",
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

                                                        supprimertemp.push(cell.getData().m_name);

                                                        console.log("supprimertemp", supprimertemp)
                                                    }
                                                },], //define table columns
                                        });
                                        this.mytable.clearData()
                                    } else {

                                        this.tableData = result.data[i].ML_Membre;
                                        console.log(" this.tableData", this.tableData)
                                        ///tabulator 

                                        this.mytable = new Tabulator(this.el, {
                                            data: this.tableData, //link data to table
                                            reactiveData: true, //enable data reactivity
                                            height: "450px",
                                            columns: [

                                                {
                                                    title: "Mesures ",
                                                    field: "m_name",
                                                    width: '70%',
                                                    editor:"input"

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

                                                        supprimertemp.push(cell.getData().m_name);

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



    }

    supprimerAll() {
        const ML_Code = this.state.code;
        const ML_Name = this.state.ML_Name;
        const ML_Path = this.state.listeML_Path;
        const Description = this.state.listeDescription;
        const newMembres = (this.state.Membres.concat(this.state.liste_ML_Membre))

        console.log(this.state.liste_ML_Membre)
        console.log("Update_newMembres", newMembres)

        const ML_Membre = newMembres
        console.log("ML_Membre", ML_Membre);
        const Group_Access = this.state.Group_Access
        const DBAction = "3"
        this.state.supprimer = {
            "ML_Code": ML_Code,
            "ML_Name": ML_Name,
            "ML_Path": ML_Path,
            "Group_Access": Group_Access,
            "Description": Description,
            "ML_Membre": ML_Membre,
            "DBAction": DBAction
        };
        this.state.supprimertemp.push(this.state.supprimer);
        console.log(this.state.supprimertemp);
        if (newMembres.length == []) {
            this.mytable.clearData()
            console.log("Array is empty!")
        }
        this.state.ML_Name = ""
        this.setState({
            modal1: !this.state.modal1
        });



        axios.post(window.apiUrl + "updatedelete/", {
            tablename: "ML_V3",
            identifier: this.state.dateDMY + uuid(),
            datatomodified: [].concat(this.state.supprimertemp)
            //  datatodelete: ["ML_Code;ML_Name;ML_Path;Group_Access;Description;ML_Membre;DBAction"]
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
        this.state.ML_Name = this.state.Nom
        console.log(this.state.ML_Name)

        const ML_Membre = this.state.ML_Membre;

        this.mytable.addData({ ML_Membre }, true);
    }


    handleClick(id, event) {
        this.state.code = id;
        console.log("code", this.state.code)

    }


    ///////
    Newliste() {

        this.state.validation_Code = this.state.ML_Code
        // /** with delete row */
        // var data = this.state.Membres
        // for (var i = 0; i < this.state.supprimertemp.length; i++) {

        //     var index = -1;
        //     var val = this.state.supprimertemp[i]
        //     console.log(val)
        //     var filteredObj = data.find(function (item, i) {
        //         if (item.m_name === val) {
        //             index = i;
        //             return i;
        //         }
        //     });

        //     console.log(index, filteredObj);
        //     if (index > -1) {
        //         data.splice(index, 1);
        //     }
        // }
        // console.log(data);
        // /**********fin delete row  */
        // const ML_Membre = data;

        // console.log("ML_Membre", ML_Membre);

        this.state.ajout = {
            "ML_Code": this.state.ML_Code,
            "ML_Name": this.state.ML_Name,
            "ML_Path": this.state.ML_Path,
            "Group_Access": this.state.Group_Access,
            "Description": "ML",
            "ML_Membre": this.state.ML_Membre_fin,
            "tag_user": this.state.tag_user,
            "tag_system": this.state.tag_system,
            "DBAction": "2"
        };
        this.state.ajoutertemp.push(this.state.ajout);
        console.log(this.state.ajoutertemp);
    }




    /////
    updateliste() {



        const ML_Code = this.state.code;
        this.state.validation_Code = ML_Code
        const ML_Name = this.state.ML_Name;
        const ML_Path = this.state.listeML_Path;
        const Description = this.state.listeDescription;




        //         const newMembres = (this.state.Membres.concat(this.state.liste_ML_Membre))

        //         /** with delete row */


        //         //var val = this.state.supprimertemp[0]
        //         var data = newMembres
        //         console.log("liste_ML_Membre ", this.state.liste_ML_Membre)
        //         console.log("this.state.Membres ", this.state.Membres)
        //         console.log("data ", data)
        //         for (var i = 0; i < this.state.supprimertemp.length; i++) {

        //             var index = -1;
        //             var val = this.state.supprimertemp[i]
        //             console.log(val)


        //             var filteredObj = data.find(function (item, i) {
        //                 if (item.m_name === val) {
        //                     index = i;
        //                     return i;
        //                 }
        //             });

        //             console.log(index, filteredObj);
        //             if (index > -1) {
        //                 data.splice(index, 1);
        //             }
        //         }
        //         // if (data.length == 0){

        //         //     date = [null]

        //         // }
        //         console.log("ggggggggggggggggggggggggggggggggggggg", data);


        //         /**********fin delete row  */

        //         console.log(this.state.liste_ML_Membre)
        //         console.log("Update_newMembres", newMembres)
        //         const ML_Membre = newMembres;
        // // var arr=[]
        // // for (var i=0;i<ML_Membre.length;i++)
        // // {

        // // arr.push(ML_Membre[i].m_code)

        // // }
        // // console.log("--------->",arr)

        // // var str=arr.toString()

        // // axios.get(window.apiUrl + "getMesures/?mesures="+str,

        // // )

        // // .then(
        // //     (result) => {


        // //         if (result.data !== null) {

        // //             console.log('result.data result.data result.data result.data ', result.data )

        // //         } else {
        // //             console.log('no data change')
        // //         }



        // //     }
        // // )




        // console.log("supprimertemp", this.state.supprimertemp)

        // console.log("ML_Membre", ML_Membre);
        const Group_Access = this.state.Group_Access
        const DBAction = "1"
        this.state.modifier = {
            "ML_Code": ML_Code,
            "ML_Name": ML_Name,
            "ML_Path": ML_Path,
            "Group_Access": Group_Access,
            "Description": Description,
            "ML_Membre": this.state.ML_Membre_fin,
            "tag_user": this.state.tag_user,
            "tag_system": this.state.tag_system,
            "DBAction": DBAction
        };
        this.state.modificationtemp.push(this.state.modifier);
        delete this.state.modificationtemp[this.state.supprimertemp]
        console.log(this.state.modificationtemp);

    }
    //////////////////Filter///////////////




    filterMesures = (filterNameMesures) => {
        //console.log('appel data')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)
        console.log(filterNameMesures)
        this.state.filterNameMesures = filterNameMesures;
        //console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", filterNameMesures)

        if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
            if (this.state.filterNameMesures == undefined || this.state.filterNameMesures.length == 0) {
                axios.post(window.apiUrl + "filter/",

                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: "*",
                        content: "*",
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )

                    .then(
                        (result) => {


                            if (result.data !== null) {
                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else {
                                console.log('no data change')
                            }



                        }
                    )

            }
            else {
                this.setState({ listMeasure_Label: this.state.filterNameMesures })
            }
        }
        else {


            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
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
                            this.setState({ listMeasure_Label: result.data })
                            console.log("data filter");
                            console.log('listMeasure_Label', this.state.listMeasure_Label)
                        } else {
                            console.log('no data change')
                        }



                    }
                )
        }

    }
    filterEnergy = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee Energy')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)
        console.log('filter with new data')
        console.log('videeeeeeeeee')
        if (this.state.Energy == '' & this.state.View == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "measure_Energy_Code;measure_Energy",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {

                        console.log(result.data)
                        if (result.data !== null) {
                            var listEnergys = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_Energy;
                                listEnergys.push(x)
                            });
                            this.setState({ listEnergy: listEnergys })
                            console.log("data Energy");
                            console.log(this.state.listEnergy)
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
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "measure_Energy_Code;measure_Energy",
                    dist: "*;dist",
                    orderby: "*;asc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        var listEnergys = []
                        console.log("lllll", result.data)
                        if (result.data !== null) {

                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_Energy;
                                listEnergys.push(x)
                            });
                            this.setState({ listEnergy: listEnergys })
                            console.log("data compteur parent");
                            console.log(this.state.listEnergy)

                        } else {
                            console.log('no data recieve by compteur parent')
                        }

                    }
                )


        }
    }
    filterView = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee View')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Energy == '' & this.state.View == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "measure_ViewCode;measure_View",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listViews = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_View;
                                listViews.push(x)
                            });
                            this.setState({ listView: listViews })
                            console.log("data View");
                            console.log(this.state.listView)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "measure_ViewCode;measure_View",
                    dist: "*;dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listViews = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_View;
                                listViews.push(x)
                            });
                            this.setState({ listView: listViews })
                            console.log("data View");
                            console.log(this.state.listView)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }
    filterCategory = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee filterCategory')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Energy == '' & this.state.View == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Measure-Category",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listCategorys = []
                            var Measure_Category = "Measure-Category"
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem[Measure_Category];
                                listCategorys.push(x)
                            });
                            this.setState({ listCategory: listCategorys })
                            console.log("data listCategorys");
                            console.log(this.state.listCategory)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Measure-Category",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listCategorys = []
                            var Measure_Category = "Measure-Category"

                            result.data.forEach(function (arrayItem) {

                                var x = arrayItem[Measure_Category];
                                listCategorys.push(x)
                            });
                            this.setState({ listCategory: listCategorys })
                            console.log("data listCategory");
                            console.log(this.state.listCategory)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }

    filterlevel = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee level')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Energy == '' & this.state.View == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Measure-level",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listlevels = []
                            var Measure_level = "Measure-level"
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem[Measure_level];
                                listlevels.push(x)
                            });
                            this.setState({ listlevel: listlevels })
                            console.log("data listlevels");
                            console.log(this.state.listlevel)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Measure-level",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listlevels = []
                            var Measure_level = "Measure-level"

                            result.data.forEach(function (arrayItem) {

                                var x = arrayItem[Measure_level];
                                listlevels.push(x)
                            });
                            this.setState({ listlevel: listlevels })
                            console.log("data listlevel");
                            console.log(this.state.listlevel)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }
    filterState = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee Stats')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Energy == '' & this.state.View == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "Measure-Stats",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listStatss = []
                            var Measure_Stats = "Measure-Stats"
                            console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', result.data)
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem[Measure_Stats];
                                listStatss.push(x)
                            });
                            this.setState({ listStats: listStatss })
                            console.log("data listStats");
                            console.log(this.state.listStats)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "Measure-Stats",
                    dist: "dist",
                    orderby: "desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listStatss = []
                            var Measure_Stats = "Measure-Stats"
                            console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', result.data)
                            result.data.forEach(function (arrayItem) {

                                var x = arrayItem[Measure_Stats];
                                listStatss.push(x)
                            });
                            this.setState({ listStats: listStatss })
                            console.log("data listStats");
                            console.log(this.state.listStats)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }

    filterName = () => {
        console.log('listeeeeeeeeeeeeeeeeeeee measure_name')
        console.log(this.state.listfieldfiltername)
        console.log(this.state.listfieldfiltercontent)

        console.log('filter with new data')
        if (this.state.Energy == '' & this.state.measure_name == '' & this.state.Category == "" & this.state.level == "" & this.state.Stats == "" & this.state.measure_name == "") {
            console.log('videeeeeeeeee')
            axios.post(window.apiUrl + "filter/",

                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: '*',
                    content: '*',
                    dataselect: "measure_name",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listMeasure_names = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_name;
                                listMeasure_names.push(x)
                            });
                            this.setState({ listMeasure_name: listMeasure_names })
                            console.log("data View");
                            console.log(this.state.listMeasure_names)
                        } else {
                            console.log('no data change')
                        }
                    }
                )
        } else {
            axios.post(window.apiUrl + "filter/",
                {
                    tablename: "EnergyMeasureNormalised",
                    identifier: this.state.dateDMY + uuid(),
                    fields: this.state.listfieldfiltername.join(';'),
                    content: this.state.listfieldfiltercontent.join(';'),
                    dataselect: "measure_name",
                    dist: "dist",
                    orderby: "*;desc",
                }
            )
                .then(
                    (result) => {
                        // this.tableData = result.data;
                        console.log(result.data)
                        if (result.data !== null) {
                            var listMeasure_names = []
                            result.data.forEach(function (arrayItem) {
                                var x = arrayItem.measure_name;
                                listMeasure_names.push(x)
                            });
                            this.setState({ listMeasure_name: listMeasure_names })
                            console.log("data View");
                            console.log(this.state.listMeasure_name)
                        } else {
                            console.log('no data change')
                        }

                    }
                )
        }


    }


    componentDidUpdate(prevProps, prevState) {

        if (prevState.Energy !== this.state.Energy) {

            console.log('different')
            console.log(this.state.listfieldfiltername)

            if (this.state.listfieldfiltername.includes('measure_Energy') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {

                        if (item == 'measure_Energy') {
                            console.log('existeeeeeeeeeeeeeeee measure_Energy')
                            console.log(j)
                            if (this.state.Energy != '') {
                                this.state.listfieldfiltercontent[j] = this.state.Energy
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.Energy != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'measure_Energy'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Energy] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'measure_Energy'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.Energy].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'measure_Energy'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.Energy].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //  this.tableData = result.data;

                            if (result.data !== null) {

                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else {
                                console.log('no data change')
                            }
                        }
                    )
            }


        }
        /****************************** */


        ///console.log("uniti fini", this.state.unite)
        /*************************** */
        if (prevState.View !== this.state.View) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('measure_View') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'measure_View') {
                            console.log('existeeeeeeeeeeeeeeee measure_View')
                            console.log(j)
                            if (this.state.View != '') {
                                this.state.listfieldfiltercontent[j] = this.state.View
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.View != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'measure_View'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.View] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'measure_View'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.View].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'measure_View'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.View].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }

        /********************* */


        /*************************** */
        if (prevState.Category !== this.state.Category) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('Measure-Category') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'Measure-Category') {
                            console.log('existeeeeeeeeeeeeeeee Measure-Category')
                            console.log(j)
                            if (this.state.Category != '') {
                                this.state.listfieldfiltercontent[j] = this.state.Category
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.Category != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Measure-Category'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Category] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'Measure-Category'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.Category].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'Measure-Category'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.Category].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }

        /********************* */



        /*************************** */
        if (prevState.level !== this.state.level) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('Measure-level') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'Measure-level') {
                            console.log('existeeeeeeeeeeeeeeee Measure-level')
                            console.log(j)
                            if (this.state.level != '') {
                                this.state.listfieldfiltercontent[j] = this.state.level
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.level != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Measure-level'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.level] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'Measure-level'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.level].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'Measure-level'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.level].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }

        /********************* */

        /*************************** */
        if (prevState.Stats !== this.state.Stats) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('Measure-Stats') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'Measure-Stats') {
                            console.log('existeeeeeeeeeeeeeeee Measure-Stats')
                            console.log(j)
                            if (this.state.View != '') {
                                this.state.listfieldfiltercontent[j] = this.state.Stats
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.Stats != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Measure-Stats'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Stats] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'Measure-Stats'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.Stats].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'Measure-Stats'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.Stats].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }

        /********************* */
        if (prevState.measure_name !== this.state.measure_name) {

            console.log('different')
            console.log(this.state.listfieldfiltername)
            if (this.state.listfieldfiltername.includes('measure_name') == true) {
                this.setState(state => {
                    state.listfieldfiltername.map((item, j) => {
                        //console.log(this.state.equation.length - 1)
                        if (item == 'measure_name') {
                            console.log('existeeeeeeeeeeeeeeee measure_name')
                            console.log(j)
                            if (this.state.measure_name != '') {
                                this.state.listfieldfiltercontent[j] = this.state.measure_name
                            } else {
                                this.state.listfieldfiltercontent.splice(j, 1);
                                this.state.listfieldfiltername.splice(j, 1);
                                'cant change'
                            }
                            this.filterMesures();
                        }
                    }
                    );
                });
            } else if (this.state.measure_name != '') {
                this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'measure_name'] })
                this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.measure_name] })
                console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
                console.log([...this.state.listfieldfiltername, 'measure_name'].join(';'))
                console.log([...this.state.listfieldfiltercontent, this.state.measure_name].join(';'))
                axios.post(window.apiUrl + "filter/",
                    {
                        tablename: "EnergyMeasureNormalised",
                        identifier: this.state.dateDMY + uuid(),
                        fields: [...this.state.listfieldfiltername, 'measure_name'].join(';'),
                        content: [...this.state.listfieldfiltercontent, this.state.measure_name].join(';'),
                        dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                        dist: "*",
                        orderby: "*",
                    }
                )
                    .then(
                        (result) => {
                            //     result.data = result.data;
                            if (result.data !== null) {


                                this.setState({ listMeasure_Label: result.data })
                                console.log("data filter");
                                console.log('listMeasure_Label', this.state.listMeasure_Label)
                            } else { console.log('no data change') }
                        }
                    )
            }


        }


        /******************** */
    }


    modifierNom() {


        this.setState({
            modal3: !this.state.modal3
        });
    }


    CapteurClick(id, name, event) {

        /*  this.state.User_Master_Code=id;
          this.state.User_Master_Name=name;
          console.log("User_Master_Code",  this.state.User_Master_Code)
          console.log("User_Master_Name",  this.state.User_Master_Name)*/
    }
    Views_Name(id, event) {
        this.state.Code_View = id;

        this.state.arrayCode_View = [this.state.Code_View]

        console.log("Code_View", this.state.arrayCode_View)
        var array_Energy_View = []
        array_Energy_View = this.state.arrayCode_Energy.concat(this.state.arrayCode_View)
        var Code_Energy_View = array_Energy_View.join(";")
        console.log("Code_Energy_View", Code_Energy_View)
        console.log("Code_Energy", this.state.arrayCode_Energy);
        console.log("Name_Energy", this.state.Name_Energy);

        axios.post(window.apiUrl + "filter/",

            {
                tablename: "EnergyMeasureNormalised",
                identifier: this.state.dateDMY + uuid(),
                fields: "measure_Energy_Code;measure_ViewCode",
                content: Code_Energy_View,
                dataselect: "EMNCode;measure_Label;measure_Energy;measure_View;Measure-Category;Measure-Stats;measure_name",
                dist: "dist",
                orderby: "asc",
            }

        )
            .then(
                (result) => {
                    if (result.data !== null) {
                        this.setState({ measure_Label: result.data })
                        console.log("measure_Label", this.state.measure_Label)
                    }
                    else {
                        console.log("measure_Label vide ")

                    }

                }

            )




    }


    Views(id, name, event) {

        this.state.Code_Energy = id;

        this.state.arrayCode_Energy = [this.state.Code_Energy]


        console.log("Code_Energy", this.state.arrayCode_Energy);

        this.state.Name_Energy = name;



    }
    measure_LabelClick(id, name, view, energy, Category, state, name_mesure, event) {
        this.setState({ measure_Label_Energy: name })
        //this.state.measure_Label_Energy = name;
        this.setState({ EMNCode: id })
        this.setState({ EnergySelected: energy })
        this.setState({ ViewSelected: view })
        this.setState({ CategorySelected: Category })
        this.setState({ StateSelected: state })
        this.setState({ measure_name_Selected: name_mesure })
        console.log("measure_Label_Energy", this.state.measure_Label_Energy)
        console.log("EMNCode", this.state.EMNCode)
        console.log("view", view, "ViewSelected", this.state.ViewSelected)
        console.log("energy", energy, "EnergySelected", this.state.EnergySelected)
        console.log("Category", Category, "CategorySelected", this.state.CategorySelected)
        console.log("state", state, 'StateSelected', this.state.StateSelected)
        console.log("name_mesure", name_mesure, 'measure_name_Selected', this.state.measure_name_Selected)

    }

    render() {
        const { errors } = this.state;
        const scrollContainerStyle = { width: "350px", maxHeight: "410px" };
        return (
            <div>

                <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM'}}>
                    <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem > Mesures Listes</MDBBreadcrumbItem>
                </MDBBreadcrumb>
  

                <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '40px', height: 'auto', marginTop: "0px" }}>
                    {/** liste 1 */}



                    <MDBRow >
                        <MDBCol size="6">
                    <fieldset className="form-group" className="float-left" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', margin: '20px', minHeight: '650px', height: 'auto', width: '98%', backgroundColor: "#c3c3c321" }}>



                        < table border="1" style={{ marginTop: "78px" }} className="tab  float-right" >
                            <thead>
                                <tr>
                                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}> Fichier Source </b></th>
                                    <th style={{ backgroundColor: "#fff" }}><h6 value={this.state.measure_Label_Energy} onChange={this.handleChange} id="1" >{this.state.measure_Label_Energy}</h6></th>
                                    <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >  <MDBBtn className=' button_round' style={{ marginLeft: '4px' }} onClick={this.ajouterListe} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn></th>
                                </tr>
                            </thead>
                            <tbody></tbody>

                        </table >





                        {/* ********************************************FILTER******************************* */}

                        <FilterMesuresLabel
                            listfieldfiltercontent={this.state.listfieldfiltercontent}
                            filterEnergy={this.filterEnergy}
                            filterView={this.filterView}
                            filterCategory={this.filterCategory}
                            filterlevel={this.filterlevel}
                            filterState={this.filterState}
                            filterName={this.filterName}
                            listMeasure_Label={this.state.listMeasure_Label}
                            listEnergy={this.state.listEnergy}
                            listView={this.state.listView}
                            listCategory={this.state.listCategory}
                            listlevel={this.state.listlevel}
                            listStats={this.state.listStats}
                            listMeasure_name={this.state.listMeasure_name}
                            Energy={this.state.Energy}
                            View={this.state.View}
                            Category={this.state.Category}
                            level={this.state.level}
                            Stats={this.state.Stats}
                            measure_name={this.state.measure_name}
                            measure_LabelClick={this.measure_LabelClick}
                            resetvalueoffilter={this.resetvalueoffilter}
                            handleChange={this.handleChange}
                            filterMesures={this.filterMesures}
                        />





                        {/* ******************************************************************************** */}






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
                            {/* <MDBModalHeader toggle={this.toggle4} >Sélectionnez une Liste :</MDBModalHeader> */}
                            {/* <MDBModalBody>
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                    les listes
                                </label>
                                <select className="browser-default custom-select" name="Nom" value={this.state.Nom} onChange={this.handleChange} size="8" >
                                    <option></option>
                                    {this.state.listes.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={(e) => this.handleClick(liste.ML_Code, e)}>  {liste.ML_Name} </option>)}

                                </select>

                            </MDBModalBody> */}
                            <ModalML toggle4={this.toggle4} listes={this.state.listes} handleChange={this.handleChange} handleClick={this.handleClick} Nom={this.state.Nom} />


                            <MDBModalFooter>

                                <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ML1}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>

                        {/************* ML_Name *************/}
                        <div style={{ marginTop: "20px" }} >
                            < table border="1" className="tab  float-right" >
                                <thead>
                                    <tr>
                                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} > <b style={{ fontSize: "16px" }}>Fichier Source</b></th>
                                        <th style={{ backgroundColor: "#fff" }}>

                                            <h6 value={this.state.ML_Name} onChange={this.handleChange} >

                                                {this.state.ML_Name}

                                            </h6>
                                        </th>
                                        <th style={{ width: '18%', backgroundColor: "#e0e0e0e0" }} >
                                            {/** Nouveau */}
                                            <MDBBtn className=' button_round  ' id="btnNouveau" style={{ marginLeft: '4px' }} onClick={this.toggle}><MDBIcon title="Nouveau" icon="plus" /></MDBBtn>
                                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
                                                <MDBModalHeader toggle={this.toggle} >Tapez le nom du Nouveau Mesure  list ici :</MDBModalHeader>
                                                <MDBModalBody>
                                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                                        Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                                    </label>
                                                    <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Name" className="form-control" value={this.state.ML_Name} onChange={this.handleChange} required />
                                                    {errors.ML_Name.length > 0 &&
                                                        <span className='text-danger' style={{ fontSize: '12px' }}>{errors.ML_Name}</span>}
                                                </MDBModalBody>
                                                <MDBModalFooter>

                                                    <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>

                                            {/** Modifier Nom liste */}
                                            <MDBBtn className=' button_round  option' id="btnModifier" style={{ marginLeft: '4px' }} onClick={this.toggle3}><MDBIcon title="Modifier Nom" icon="pencil-alt" /></MDBBtn>
                                            <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
                                                <MDBModalHeader toggle={this.toggle3} >Modifier le nom du Mesure list ici :</MDBModalHeader>
                                                <MDBModalBody>
                                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                                                        Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                                    </label>
                                                    <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Name" className="form-control" value={this.state.ML_Name} onChange={this.handleChange} required />
                                                    {errors.ML_Name.length > 0 &&
                                                        <span className='text-danger' style={{ fontSize: '12px' }}>{errors.ML_Name}</span>}
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
                                                        Voulez-vous vraiment supprimer la Mesures Liste selectionner ?
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
                                                <MDBModalHeader toggle={this.toggle6} >Enregistrer liste des Mesuers:</MDBModalHeader>
                                                <MDBModalBody>
                                                    <MDBRow>
                                                        <MDBCol size="12">
                                                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text float-left" style={{ fontSize: "17px" }}>
                                                                Nom<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                                                            </label>

                                                            <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Name" className="form-control" value={this.state.ML_Name} onChange={this.handleChange} required />
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

                                    </tr></thead>

                                <tbody></tbody>
                            </table>

                        </div>
                        <div><div style={{ marginTop: "100px" }} className="listeValider" ref={el => (this.el = el)} /></div>
                    </fieldset>
                    {/** fin liste 2 */}
                    </MDBCol>
                    </MDBRow>
                </fieldset>
                

      
            </div>);
    }





}









const FilterMesuresLabel = ({
    listfieldfiltercontent,
    filterEnergy,
    filterView,
    filterCategory,
    filterlevel,
    filterState,
    filterName,
    listMeasure_Label,
    listEnergy,
    listView,
    listCategory,
    listlevel,
    listStats,
    listMeasure_name,
    Energy,
    View,
    Category,
    level,
    Stats,
    measure_name,
    measure_LabelClick,
    resetvalueoffilter,
    handleChange,
    filterMesures }) => {

    const scrollContainerStyle = { width: "350px", maxHeight: "410px" };


    /***************************************** */
    // useEffect(() => {
    //     //if(!filterML_Liste)return
    //     console.log('---listMeasure_Label--->', listMeasure_Label)



    // }, [listMeasure_Label])
    const [filterM_Liste, setfilterM_Liste] = useState([])
    useEffect(() => {

        //console.log("jjjj",Listes_Ml.length!=0)
        if (filterM_Liste.length == 0) {
            setfilterM_Liste(listMeasure_Label)
        }
        if (listMeasure_Label.length != 0) {
            const FilterM_Liste = (e) => {

                //console.log("Listes_Ml", Listes_Ml)
                const text = e.target.value
                //console.log("text", text)

                // console.log("filter", listMeasure_Label.filter(
                //     (el, i) => {
                //         // console.log(i,el)
                //         return el.measure_Label.indexOf(text) >= 0
                //     }
                // )
                // )

                setfilterM_Liste(listMeasure_Label.filter((el) =>

                    el.measure_Label.indexOf(text) >= 0))



            }

            const input = document.querySelector("#myInput")

            //       console.log("input", input)


            if (input) {

                input.addEventListener("keyup", FilterM_Liste)
            }

            return function cleanup() {

                input.removeEventListener("keyup", (e) => FilterM_Liste(e))
            }

        }

    }, [listMeasure_Label])
    //////////////////////
    useEffect(() => {
        //if(!filterML_Liste)return
        //   console.log('---filterM_Liste--->', filterM_Liste)

        filterMesures(filterM_Liste)

    }, [filterM_Liste])

    useEffect(() => {





        console.log("listfieldfiltercontent", listfieldfiltercontent)
    }, [listfieldfiltercontent])


    /******************************************** */

    return (<>



        <MDBRow style={{ marginTop: "166px" }}>
            <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
                <label htmlFor="defaultFormLoginEmailEx7" >
                    Filter des mesures :
                </label>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => { resetvalueoffilter(); }}>
                    <MDBIcon size='lg' icon="sync-alt" />
                </MDBBtn>

                <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>


                    <MDBInput label="Énergie :"
                        list="listEnergy" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
                        onClick={filterEnergy}
                        autoComplete="off"
                        name="Energy" value={Energy}
                        onChange={handleChange}
                    />
                    <datalist id="listEnergy">
                        {listEnergy.map((listEnergy, i) => <option key={i} value={listEnergy}></option>)}

                    </datalist>


                    <MDBInput label="Périodicité:"
                        list="listView" style={{ marginBottom: 0.8 + 'em' }}
                        onClick={filterView}
                        name="View" value={View}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <datalist id="listView">
                        {listView.map((listView, i) => <option key={i} value={listView}></option>)}
                    </datalist>


                    <MDBInput label="Catégorie:"
                        list="listCategory" style={{ marginBottom: 0.8 + 'em' }}
                        onClick={filterCategory}
                        name="Category" value={Category}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <datalist id="listCategory">
                        {listCategory.map((listCategory, i) => <option key={i} value={listCategory}></option>)}
                    </datalist>



                    <MDBInput label="Niveau:"
                        list="listlevel" style={{ marginBottom: 0.8 + 'em' }}
                        onClick={filterlevel}
                        name="level" value={level}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <datalist id="listlevel">
                        {listlevel.map((listlevel, i) => <option key={i} value={listlevel}></option>)}
                    </datalist>


                    <MDBInput label="Statistiques:"
                        list="listStats" style={{ marginBottom: 0.8 + 'em' }}
                        onClick={filterState}
                        name="Stats" value={Stats}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <datalist id="listStats">
                        {listStats.map((listStats, i) => <option key={i} value={listStats}></option>)}
                    </datalist>


                    <MDBInput label="Nom Mesure:"
                        list="listMeasure_name" style={{ marginBottom: 0.8 + 'em' }}
                        onClick={filterName}
                        name="measure_name" value={measure_name}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <datalist id="listMeasure_name">
                        {listMeasure_name.map((listMeasure_name, i) => <option key={i} value={listMeasure_name}></option>)}
                    </datalist>



                </MDBCol>


            </MDBCol>
            {/**********   This is where the magic happens     ***********/}
            <MDBCol className='p-0'>
                <MDBCol style={{ marginLeft: "1%" }}>

                    <div className="d-flex justify-content-between " >
                        <p className=" m-0 p-0">Liste des mesures : </p>

                        <input type="text" id="myInput" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "60%", marginTop: "-2%" }} />

                    </div>
                    <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }} >
                        <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle} id="myFilter">
                            {listMeasure_Label.map((listMeasure_Label, i) =>
                                <MDBListGroupItem hover
                                    key={i}
                                    name="listMeasure_Label"
                                    value={listMeasure_Label.measure_Label}
                                    style={{ padding: 0.5 + 'em' }}
                                    id={listMeasure_Label.EMNCode}
                                    hover
                                    onClick={(e) =>
                                        measure_LabelClick(
                                            listMeasure_Label.EMNCode,
                                            listMeasure_Label.measure_Label,
                                            listMeasure_Label.measure_View,
                                            listMeasure_Label.measure_Energy,
                                            listMeasure_Label["Measure-Category"],
                                            listMeasure_Label["Measure-Stats"],
                                            listMeasure_Label["measure_name"],
                                            e)}>
                                    {listMeasure_Label.measure_Label}
                                </MDBListGroupItem>)}
                        </MDBListGroup>
                    </MDBContainer>
                </MDBCol>
            </MDBCol>
        </MDBRow>


    </>)
}
const ModalML = ({ toggle4, listes, handleChange, handleClick, Nom }) => {
    //console.log("Listes_Ml", Listes_Ml)

    const [filterML_Liste, setfilterML_Liste] = useState([])

    useEffect(() => {

        console.log("--------Listes_Ml------->", listes)
    }, [listes])

    useEffect(() => {

        //console.log("jjjj",Listes_Ml.length!=0)
        if (filterML_Liste.length == 0) {
            setfilterML_Liste(listes)
        }
        if (listes.length != 0) {
            const FilterClListe = (e) => {

                //console.log("Listes_Ml", Listes_Ml)
                const text = e.target.value
                //console.log("text", text)

                console.log("filter", listes.filter(
                    (el, i) => {
                        // console.log(i,el)
                        return el.ML_Name.indexOf(text) >= 0
                    }
                )
                )

                setfilterML_Liste(listes.filter((el) => el.ML_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


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
        //if(!filterML_Liste)return
        console.log('---filterML_Liste--->', filterML_Liste)



    }, [filterML_Liste])

    return (
        <>
            <MDBModalHeader toggle={toggle4} >Sélectionnez une liste:</MDBModalHeader>
            <MDBModalBody>

                <MDBRow>
                    <MDBCol size="12">
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Liste des mesures
                        </label>
                        <br />
                        <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

                        <select className="browser-default custom-select" name="Nom" value={Nom} onChange={handleChange} size="8" >
                            <option></option>
                            {filterML_Liste.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={(e) => handleClick(liste.ML_Code, e)}>  {liste.ML_Name} </option>)}
                        </select>
                    </MDBCol>

                </MDBRow>
            </MDBModalBody>
        </>
    )


}



export default MesuresListes;


