import React, { Component } from "react";
import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Datetime from 'react-datetime';
import axios from 'axios';
import uuid from 'react-uuid';
import Swal from 'sweetalert2';

class ModifyObjectiveAdvanced extends React.Component {



    el = React.createRef();

    mytable = "Tabulator"; //variable to hold your table
    tableData = [] //data for table to display


    constructor(props) {
        super(props)
        this.state = {

            Listmesureenergy: this.props.datafromcasincidents[3], //10
            listobjectivefromDB: [],
            MesureList: this.props.datafromcasincidents[0],
            CodecompteurObjective: this.props.datafromcasincidents[1],
            incidentselectedwithoutlive: this.props.datafromcasincidents[2],
            energycompteurselected: this.props.datafromcasincidents[4],
            supprimertemp: [],
            modificationtemp: [],
            datamodifier: [],
            ajoutertap: [],
            ajouterUserInterface: [],
            JsonOperateurValue: [],
            keyword: "",
            operateur: "",
            operateur2: "",
            haut: "",
            jsonhaut: "",
            bas: "",
            jsonbas: "",
            dans: "",
            jsondans: "",
            totale_Dans: [],


            att: "",
            valeur: "",
            valeur2: "",
            dateHeure: "",
            position: "",

            ///
            modal: false,

            modal3: false, //get Objective HAUT
            modal4: false,//set objective
            modal5: false,//get BAS
            modal6: false,//set
            modal7: false,// get DANS
            modal8: false,// set
            indexmesure: '',
            MesureidObjective: '',
            ListSetobjective: [],

            ////////
            modalFilterMesure3: false,
            modalFilterMesure5: false,
            modalFilterMesure7: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.ajoutTab = this.ajoutTab.bind(this);
        this.BtnNouveau = this.BtnNouveau.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getobjective = this.getobjective.bind(this);
        this.handlemesureselectedchange = this.handlemesureselectedchange.bind(this);
        this.getindexmesue = this.getindexmesue.bind(this);
        this.addvaluetomesue = this.addvaluetomesue.bind(this);
        this.Annulersendsetobjective = this.Annulersendsetobjective.bind(this);
        this.btnAjouterDans = this.btnAjouterDans.bind(this);
        this.btndeleteDans = this.btndeleteDans.bind(this);



    }

    addvaluetomesue = () => {
        console.log('mesueeeeeeeeee')
        console.log(this.state.indexmesure)
        console.log(this.state.Listmesureenergy[this.state.indexmesure])
        //var cc_m 
        const listmesure = this.state.Listmesureenergy.map((item, j) => {

            if (j === this.state.indexmesure) {
                //cc_m = item.measure_Label + ":" + this.state.valuetomesure;
                console.log(item);
                console.log(item.measure_Label.includes(':'));
                if (item.measure_Label.includes(':') === true) {
                    item.measure_Label = item.measure_Label.replace(/[^:]+$/g, this.state.valuetomesure);


                    return item;
                } else if (item.measure_Label.includes(':') === false) {
                    item.measure_Label = item.measure_Label + ':' + this.state.valuetomesure
                    return item
                }


            } else {
                return item;
            }
        });


        this.setState({ Listmesureenergy: listmesure })
        if (this.state.ListSetobjective.length != 0) {
            this.state.ListSetobjective.map((item, j) => {

                if (item.cc_m === this.state.CodecompteurObjective + ',' + this.state.MesureidObjective) {
                    item.value = this.state.valuetomesure
                    return item;


                } else {
                    return item;
                }
            });
        } else {
            this.state.ListSetobjective.push({
                "cc_m": this.state.CodecompteurObjective + ',' + this.state.MesureidObjective,
                //this.state.CodecompteurObjective+','+this.state.MesureidObjective,
                "value": this.state.valuetomesure,
            })
        }

        //////////////////////
        /* var setobjective = [{
          "cc_m": this.state.ListSetobjective,
          //this.state.CodecompteurObjective+','+this.state.MesureidObjective,
          "value": this.state.valuetomesure,
        }] *****/
        console.log(this.state.ListSetobjective)
        this.setState({ modal4: !this.state.modal4 })
        this.state.valuetomesure = ''

    }
    getindexmesue(event, value) {
        console.log('mesueeeeeeeeee')
        console.log(event)
        //this.addvaluetomesue(event)
        this.setState({ indexmesure: event })
        this.setState({ MesureidObjective: value })

        //this.toggle(4)
        this.setState({ modal4: !this.state.modal4 })

    }
    sendsetobjective() {
        /* var setobjective = [{
          "cc_m": this.state.CodecompteurObjective,
          "value": this.state.CodecompteurObjectivevalue
        }]
        console.log(setobjective) */
        axios.post(window.apiUrl + "insertiot/",

            {

                identifier: this.state.dateDMY + uuid(),
                datatoinsert: this.state.ListSetobjective,
            }


        )

            .then(
                (result) => {
                    //this.tableData = result.data;
                    console.log(result.status)
                    this.state.ListSetobjective = []
                    this.state.valuetomesure = ''
                    //this.setState({ modal4: !this.state.modal4 })

                }
            )

    }
    Annulersendsetobjective = (modalnumber) => {
        if(modalnumber == 3){
            this.setState({
                modal3: !this.state.modal3,
            })
            this.setState({
    
                ListSetobjective: []
            })

        }else if(modalnumber == 5){
            this.setState({
                modal3: !this.state.modal5,
            })
            this.setState({
    
                ListSetobjective: []
            })

        }else if(modalnumber == 7){
            this.setState({
                modal3: !this.state.modal7,
            })
            this.setState({
    
                ListSetobjective: []
            })

        }
        
    }
    handlemesureselectedchange = (event1, event2, modalnumber) => {
        console.log(event1)
        console.log(this.state.listobjectivefromDB.length)
        console.log(event1.includes(this.state.listobjectivefromDB.m_name + ':') )
        var number = 0
        if (this.state.listobjectivefromDB.length > 1) {

            this.state.listobjectivefromDB.map((item, i) => {
                if (event1.includes(item.m_name + ':') && event1.includes('null') == false) {
                    number = 1;
                    /*  this.setState({
                       U_inputobjective: ['Objective : ' + item.compteur_name + '_' + item.m_name],
                       Sys_inputobjective: [{
                         "keyword": null, "operateur": null, "att": null,
                         "valeur": [{ "type": "o", "content": item.cc_m }]
                       }
           
           
                       ],
                       Objectif: [{
                         "U_inputobjective": ['Objective : ' + item.compteur_name + '_' + item.m_name],
                         "Sys_inputobjective": [{
                           "keyword": null, "operateur": null, "att": null,
                           "valeur": [{ "type": "o", "content": item.cc_m }]
                         }
           
           
                         ]
           
                       }]
                     }); */
                    if (modalnumber == 3) {
                        this.setState({
                            jsonhaut:
                                { "type": "o", "content": item.cc_m },
                            haut: item.cc_m,

                        })
                        this.setState({ modalFilterMesure3: !this.state.modalFilterMesure3 })
                       
                    }else if(modalnumber == 5){
                        this.setState({
                            jsonbas:
                                { "type": "o", "content": item.cc_m },
                            bas: item.cc_m,

                        })
                        this.setState({ modalFilterMesure5: !this.state.modalFilterMesure5 })
                      

                    }else if(modalnumber == 7){
                        this.setState({
                            jsondans:
                                { "type": "o", "content": item.cc_m },
                            dans: item.cc_m,

                        })
                        this.setState({ modalFilterMesure6: !this.state.modalFilterMesure6 })
                    

                    } /* else {
                        this.setState({
                            jsonhaut:
                                { "type": "r", "content": this.state.haut },
                            //haut : item.cc_m,

                        })
                    } */
                    
                } else {
                    console.log('alert s\'il vous plait sélectionner une mesure possede une valeur différente 0.')

                }
            })
            if (number == 0) {
                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 4000,
                    icon: 'warning',
                    width: 400,
                    title: 'S\'il vous plaît sélectionner une mesure possède une valeur'
                })
                //console.log("alert aucun objectif declaré")
                //console.log("alert")

            }else if(number == 1){
                console.log('modelllllllll'+modalnumber)
                if (modalnumber == 3) {
                    this.setState({
                        modal3: false
                    })
                }else if(modalnumber == 5){
                    
                    this.setState({
                        modal5: false
                    })
          
                }else if(modalnumber == 7){
                   
                    this.setState({
                        modal7: false
                    })
          
                } 
            }
        } else if (this.state.listobjectivefromDB.length == 1) {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 400,
                title: 'Aucun objectif ne déclaré dans la base de donnée'
            })
            //console.log("alert aucun objectif declaré")
            //console.log("alert")
        }




    };
    sendData = () => {
        this.props.valueajoutertabcallback({
            0: this.state.ajoutertap,
            1: this.state.JsonOperateurValue
        })
        console.log(this.state.ajoutertap)
        console.log(this.JsonOperateurValue)
    }
    /*   callbackValuefromIncident = (childData) => {
          this.setState({ MesureList: childData[0] });//c
          this.setState({ CodecompteurObjective: childData[1] });//c
          this.setState({ incidentselectedwithoutlive: childData[2] });/// c
          this.setState({ Listmesureenergy: childData[3] });//c
      
         
      
         
          /////////////// 0: this.state.MesureList,//ELMAZERAA ELEC$LIVE INC
      
  
      } */

    getobjective = () => {
        /* this.setState({
           modal3: !this.state.modal3
         }); */
        axios.post(window.apiUrl + "getobjective/",

            {

                identifier: this.state.dateDMY + uuid(),
                ML: this.state.MesureList,
                CL: [{
                    "Code_Compteur": this.state.CodecompteurObjective,
                    "Le_Compteur": this.state.incidentselectedwithoutlive
                }]
            }


        )

            .then(
                (result) => {
                    this.state.listobjectivefromDB = result.data;
                    console.log('Get OBJECTIVE from database')
                    console.log(result.data)

                    console.log(this.state.listobjectivefromDB.length)
                    console.log(result.data.length)
                    //this.setState({listobjectivefromDB : result.data})

                    if (/*  prevState.listobjectivefromDB !== this.state.listobjectivefromDB && */
                        this.state.listobjectivefromDB.length > 1) {
                        //m_name
                        this.state.listobjectivefromDB.map((item1, i) => {
                            const listmesure = this.state.Listmesureenergy.map((item2, j) => {

                                if (item2.measure_Label === item1.m_name) {
                                    //var x = item2.measure_Label.substring(0, item2.measure_Label.indexOf(item1.m_name)+1)
                                    var x = item2.measure_Label + ':' + item1.value
                                    //var x = item2.measure_Label.replace(/[^:]*$/g,item1.value)
                                    console.log('extractttttttttttt')
                                    console.log(item1.m_name)
                                    console.log(item2.measure_Label)
                                    console.log(item2.measure_Label.indexOf(item1.m_name))
                                    console.log(x)
                                    //item2.replace(/[^:]*$/g,item1.value)
                                    //console.log(x + item1.value)
                                    item2.measure_Label = x


                                    return item2
                                } else if (item2.measure_Label === item1.m_name + ':0') {
                                    var x = item1.m_name + ':' + item1.value
                                    console.log('extractttttttttttt if ')
                                    console.log(item1.m_name)
                                    console.log(item2.measure_Label)
                                    //console.log(item2.measure_Label.indexOf(item1.m_name))
                                    console.log(x)
                                    item2.measure_Label = x
                                    return item2
                                } else {
                                    if (item2.measure_Label.includes(':')) { return item2; }
                                    else {
                                        var y = item2.measure_Label + ':0'
                                        item2.measure_Label = y
                                        return item2;
                                    }
                                }
                            });
                            this.setState({ Listmesureenergy: listmesure })


                        });





                    } else if (this.state.listobjectivefromDB.length === 0) {

                    }
                    //tabulator

                }
            )
    }
    componentDidMount() {
        const supprimertemp = this.state.supprimertemp;
        const datamodifier = this.state.datamodifier;
        console.log(this.props.datafromcasincidents[5])
        //tabulator
        if(this.props.datafromcasincidents[5].length != 0){
            this.state.JsonOperateurValue.push(this.props.datafromcasincidents[5][0])
        }
       this.tableData = this.props.datafromcasincidents[5]
        this.mytable = new Tabulator(this.el, {
            data: this.tableData,

            //link data to table
            reactiveData: true, //enable data reactivity
            addRowPos: "top",
            pagination: "local",
            paginationSize: 3,
            movableColumns: true,
            resizableRows: true,
            reactiveData: true,
            printRowRange: "selected",
            selectable: 1,


            paginationSizeSelector: [3, 6, 8, 10],
            columns: [

                {
                    title: "Mot clé",
                    field: "keyword",
                    width: "20%",
                    cellClick: function (e, cell, row) {
                        var position = cell.getRow().getPosition()
                        console.log(position);
                        datamodifier.splice(0, 2);
                        datamodifier.push(cell.getData(), position);
                        console.log("valider", datamodifier)

                    }
                },

                {
                    title: "Traitement",
                    field: "operateur",
                    width: "20%",
                    cellClick: function (e, cell, row) {
                        var position = cell.getRow().getPosition()
                        console.log(position);
                        datamodifier.splice(0, 2);
                        datamodifier.push(cell.getData(), position);
                        console.log("valider", datamodifier)

                    }
                },
                {
                    title: "opérateur",
                    field: "att",
                    width: "20%",
                    cellClick: function (e, cell, row) {
                        var position = cell.getRow().getPosition()
                        console.log(position);
                        datamodifier.splice(0, 2);
                        datamodifier.push(cell.getData(), position);
                        console.log("valider", datamodifier)

                    }
                },
                {
                    title: "Temp",
                    field: "user_value",
                    width: "20%",
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
                    width: "18%",
                    hozAlign: "center",
                    formatter: function () { //plain text value

                        return "<i class='fa fa-trash-alt icon'></i>";

                    },
                    cellClick: function (e, cell) {

                        cell.getData();
                        supprimertemp.push(cell.getData().valeur);
                        cell.getRow().delete();
                    },
                    hideInHtml: true,
                },
            ], //define table columns



        });
    }

    BtnNouveau() {
        var $ = require("jquery");
        $('#BtnModifier').hide();
        $('#FromModifier').hide();
        $('#BtnNouveauObjective').hide();
        $('#tabObjective').hide();
        $('#FromNouveauObjective').show();
        $('#BtnTabObjective').show();

    }
    BtnTab() {

        var $ = require("jquery");
        $('#FromNouveauObjective').hide();
        $('#FromModifier').hide();
        $('#BtnTabObjective').hide();
        $('#BtnNouveauObjective').show();
        $('#BtnModifier').show();
        $('#tabObjective').show();

    }
    ajoutTab() {

        var valeurDev = ''
        if(this.state.haut == "" && this.state.bas == ""  &&  this.state.totale_Dans == ""){
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 300,
                icon: 'warning',
                title: 'S\'il vous ajouter une valeur.'

            })
        }else{
                    //////////////////////////////////////////

        if (this.state.haut != "" && this.state.bas == "") {
            const keyword = this.state.keyword;
            const operateur = this.state.operateur;
            const att = "Haut"
            this.state.att = att
            console.log(this.state.haut)
            const valeur = this.state.haut
            this.state.valeur = valeur
            if (this.state.jsonhaut == '') {
                valeurDev = { "type": "r", "content": this.state.haut }

            } else {
                valeurDev = this.state.jsonhaut
            }
            var user_value = valeur
            this.mytable.addRow({ keyword, operateur, att, user_value , valeurDev }, true);
            this.state.haut = "";
            this.state.bas = "";
        }
        if (this.state.haut == "" && this.state.bas != "") {
            const keyword = this.state.keyword;
            const operateur = this.state.operateur;
            const att = "Bas"
            this.state.att = att



            const valeur = this.state.bas
            this.state.valeur = valuer
            if (this.state.jsonbas == '') {
                valeurDev = { "type": "r", "content": this.state.bas }

            } else {
                valeurDev = this.state.jsonbas
            }
            var user_value = valeur
            this.mytable.addRow({ keyword, operateur, att,  user_value, valeurDev }, true);
            this.state.haut = "";
            this.state.bas = "";
        }

        if (this.state.haut != "" && this.state.bas != "") {
            const keyword = this.state.keyword;
            const operateur = this.state.operateur;
            const att = "Entre"
            this.state.att = att

            const valeur = ("''" + this.state.haut + "'' and ''" + this.state.bas + "''")

            this.state.valeur = valeur
            if (this.state.jsonbas == '' && this.state.jsonhaut == '') {
                valeurDev = [{ "type": "r", "content": this.state.bas }, { "type": "r", "content": this.state.haut }]

            } else if (this.state.jsonbas == '' && this.state.jsonhaut !== '') {
                valeurDev = this.state.jsonhaut
            } else if (this.state.jsonbas !== '' && this.state.jsonhaut == '') {
                valeurDev = this.state.jsonbas
            } else {
                valeurDev = [this.state.jsonbas, this.state.jsonhaut]
            }


            var user_value = valeur
           // valeurDev = [this.state.jsonhaut, this.state.jsonbas]
            this.mytable.addRow({ keyword, operateur, att, user_value, valeurDev }, true);
            this.state.haut = "";
            this.state.bas = "";
        }

        if (this.state.totale_Dans != "") {
            const keyword = this.state.keyword;
            const operateur = this.state.operateur;


            const att = "Dans"
            this.state.att = att

            const valeur = ("(" + this.state.totale_Dans.slice(0, -1) + ")")
            this.state.valeur = valeur

            const a = this.state.dans.slice(0, -1)
            valeurDev = a.replace(/'/g, "")
            console.log({ keyword, operateur, att, valeur, valeurDev })
            valeurDev = this.state.jsondans
            var user_value = valeur
            console.log({ keyword, operateur, att, valeur, valeurDev })
            this.mytable.addRow({ keyword, operateur, att, user_value, valeurDev }, true);
            this.state.totale_Dans = ""
        }
        /////////////////////////////
        this.state.JsonOperateurValue.push({ "keyword": this.state.keyword, "operateur": this.state.operateur, "att": this.state.att, "valeur": valeurDev, "user_value": this.state.valeur })
        this.sendData();
        var $ = require("jquery");
        $('#formulaire')[0].reset();
        $('#IntervalleTime').show();
        $('#IntervalleTimeNouveau').show();
        $('#EnsembleTimeNouveau').hide();
        $('#EnsembleTime').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleNouveau').hide();
        $('#EnsembleNouveau').hide();
        ////////////



        /////////
        var $ = require("jquery");
        $('#FromNouveauObjective').hide();
        $('#FromModifier').hide();
        $('#BtnTabObjective').hide();
        $('#BtnNouveauObjective').show();
        $('#BtnModifier').show();
        $('#tabObjective').show();

        }



    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        var $ = require("jquery");
        console.log(this.state.operateur)


        if (this.state.keyword == "Ensemble") {

            $('#IntervalleNouveau').hide();
            $('#EnsembleNouveau').show();

            /*     if (e.target.value == "dateHeure") {
                    $('#IntervalleTimeNouveau').hide();
                    $('#EnsembleTimeNouveau').hide();
                    $('#IntervalleDateNouveau').hide();
                    $('#EnsembleDateNouveau').hide();
                    $('#IntervalleNouveau').hide();
                    $('#EnsembleNouveau').show();
    
    
    
                } */

        }
    }
    toggle = nr => () => {

        if (nr === 3 || nr === 7 || nr === 5) {
            if (this.state.incidentselectedwithoutlive != '') {
                let modalNumber = 'modal' + nr
                console.log(modalNumber)
                this.getobjective()
                this.setState({
                    [modalNumber]: !this.state[modalNumber]
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 4000,
                    icon: 'warning',
                    width: 400,
                    title: 'Sélectionner compteur s\'il vous plait '
                })

            }

        } else if (nr === 4 || nr === 6 || nr === 8) {
            let modalNumber = 'modal' + nr
            this.setState({
                [modalNumber]: !this.state[modalNumber]
            });

            if (this.state.modal4 === true) {
                this.state.valuetomesure = ''
            }

        } else {
            let modalNumber = 'modal' + nr
            this.setState({
                [modalNumber]: !this.state[modalNumber]
            });
        }
    }
    componentDidUpdate() {


        var $ = require("jquery");
        if (this.state.keyword == "Intervalle" && this.state.operateur == "Inclure") {

            $('#IntervalleNouveau').show();
            $('#EnsembleNouveau').hide();

        } else if (this.state.keyword == "Intervalle" && this.state.operateur == "Exclure") {

            $('#IntervalleNouveau').show();
            $('#EnsembleNouveau').hide();

        } else if (this.state.keyword == "Ensemble" && this.state.operateur == "Inclure") {

            $('#IntervalleNouveau').hide();
            $('#EnsembleNouveau').show();

        } else if (this.state.keyword == "Ensemble" && this.state.operateur == "Exclure") {

            $('#IntervalleNouveau').hide();
            $('#EnsembleNouveau').show();

        } else {
            $('#IntervalleNouveau').hide();
            $('#EnsembleNouveau').hide();
        }
        //////////////////////
        /** with delete row */
        console.log(this.props.datafromcasincidents[5])
        var data = this.state.JsonOperateurValue
        for (var i = 0; i < this.state.supprimertemp.length; i++) {

            var index = -1;
            var val = this.state.supprimertemp[i]
            console.log(val)
            var filteredObj = data.find(function (item, i) {
                if (item.valeur === val) {
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



        //this.state.ajoutertap.push({"keyword":this.state.keyword,"operateur":this.state.operateur,"att":this.state.att,"valeur":this.state.valeur})
        this.state.ajoutertap = data
        console.log("ajoutertap", this.state.ajoutertap)
        this.state.JsonOperateurValue = data
        /////
        //this.sendData();

        //localStorage.clear();
        //localStorage.setItem('ajoutertap', JSON.stringify(this.state.ajoutertap));




    }
    btnAjouterDans() {
        if (this.state.dans == "") {
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
    
    
          console.log(this.state.totale_Dans);
          this.setState({ totale_Dans: this.state.totale_Dans + "''" + this.state.dans + "''," });
          if(this.state.jsondans == []){
            this.setState({
                jsondans:
                    { "type": "r", "content": this.state.dans }
        
            })

          }else{
            this.setState({
                jsondans:
                    [...this.state.jsondans , { "type": "r", "content": this.state.dans }]
        
            })

          }
         
          console.log(this.state.totale_Dans);
          this.state.dans = ""
        }
      }
    
    btndeleteDans() {
    
        if (this.state.totale_Dans == "") {
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
          array.push(this.state.totale_Dans)
          console.log(this.state.totale_Dans);
    
          this.setState({ totale_Dans: array.slice(0, -1) });
          console.log('deleteee')
        }
      }
      toggleFilterMesure3 = () => {
        this.setState({ modalFilterMesure3: !this.state.modalFilterMesure3 })
    }

    toggleFilterMesure5 = () => {
        this.setState({ modalFilterMesure5: !this.state.modalFilterMesure5 })
    }
    toggleFilterMesure7 = () => {
        this.setState({ modalFilterMesure7: !this.state.modalFilterMesure7 })
    }


    render() {
        const scrollContainerStyle = { maxHeight: "300px" };
        return (

            <div>
            <MDBBtn id="BtnNouveauObjective" className='float-right' onClick={this.BtnNouveau} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
            <MDBBtn id="BtnTabObjective" className='float-right option' onClick={this.BtnTab} size="sm"><MDBIcon title="Tableuax" icon="table" size="lg" /></MDBBtn> <br />
            <div className="option" id="FromNouveauObjective">

                <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "100%" }}>

                    <legend style={{ width: "80px", color: "#51545791", fontSize: '20px' }}>Nouveau</legend>
                    <form id="formulaire">
                        <MDBRow>
                            <MDBCol size="4">
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Mot clé
                                </label>
                                <select
                                    className="browser-default custom-select" id="2" name="keyword" value={this.state.keyword} onChange={this.handleChange} required>
                                    <option></option>
                                    <option>Intervalle</option>
                                    <option>Ensemble</option>

                                </select>
                                <br />
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Traitement
                                </label>
                                <select
                                    className="browser-default custom-select" name="operateur" value={this.state.operateur} onChange={this.handleChange} required>
                                    <option></option>
                                    <option>Inclure</option>
                                    <option>Exclure</option>
                                </select>
                            </MDBCol>

                            <MDBCol size="5" >
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Opérateur
                                </label>
                                <br />

                                {this.state.keyword == "Intervalle" && this.state.operateur != "" &&
                                    <div id="IntervalleNouveau" >
                                        <div>
                                            <MDBInput style={{ height: '37px' }} label="Haute" outline size="sm" type="text" className="form-control" name="haut" value={this.state.haut} placeholder="" onChange={this.handleChange} /></div>
                                        <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

                                            onClick={this.toggleFilterMesure3}
                                        >Get Objective</MDBBtn>

                                        <MDBModal isOpen={this.state.modalFilterMesure3} toggle={this.toggleFilterMesure3} size="lg">
                                            <MDBModalHeader toggle={this.toggleFilterMesure3}>Get Objective</MDBModalHeader>
                                            <MDBModalBody>
                                                <div style={{ width: '99%' }}>
                                                    {this.state.dataEnergyMeasure.length != 0 ? (
                                                        <FilterV1 filterName={"Mesure"}
                                                            outSelected={this.outSelectedMesure3}
                                                            filter={[
                                                                { measure_View: "Périodicité" },
                                                                { "Measure-Category": "Catégorie" },
                                                                { "Measure-Stats": "Statistiques" },
                                                                { measure_name: "Nom Mesure" },
                                                            ]}
                                                            display={{ separator: "", elems: ["measure_Label"] }}
                                                            data={this.state.dataEnergyMeasure}
                                                            styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                            btnEdit={true} />) : null}
                                                </div>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="primary" size="sm" onClick={this.toggleFilterMesure3}>Annuler</MDBBtn>
                                                <MDBBtn color="primary" size="sm" onClick={this.toggle(3)}>Get Objective</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>




                                        <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="md">
                                            <MDBModalHeader toggle={this.toggle(3)}>Get Objective</MDBModalHeader>
                                            <MDBModalBody>
                                                <div><b>Capteur :</b> {this.state.energycompteurselected}</div>
                                                <div><b>Compteur :</b> {this.state.incidentselectedwithoutlive}</div>
                                                <div><b>Sélectionner votre mesure :</b></div>
                                                <MDBContainer style={{ padding: 0 + 'em' }}>
                                                    <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                        {this.state.Listmesureenergy.map((mesureitem, i) =>
                                                            <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                                borderLeft: '0.5px solid #d6d4d4',
                                                                borderRight: '0.5px solid #d6d4d4',
                                                                borderTop: '0.5px solid #d6d4d4',
                                                                borderBottom: 'none'
                                                            }} >
                                                                <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                    className=" w-100 bd-highlight col-example"
                                                                    hover flush
                                                                    onClick={() => this.handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 3)}  >
                                                                    {mesureitem.measure_Label}

                                                                </MDBListGroupItem>
                                                                <MDBBtn size="sm" style={{ height: "31px" }} color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                    onClick={() => this.getindexmesue(i, mesureitem.measure_ID)}
                                                                >
                                                                    <MDBIcon icon="pencil-alt" />

                                                                </MDBBtn>
                                                            </div>



                                                        )}
                                                        <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="sm">

                                                            <MDBModalBody>
                                                                <label>Value</label>

                                                                <input
                                                                    className="form-control form-control-sm"
                                                                    name="valuetomesure" value={this.state.valuetomesure}
                                                                    onChange={this.handleChange} />
                                                            </MDBModalBody>
                                                            <MDBModalFooter>
                                                                <MDBBtn color="default" size="sm" onClick={() => this.addvaluetomesue()}>Ajouter</MDBBtn>

                                                                <MDBBtn color="primary" size="sm" onClick={this.toggle(4)}>Annuler</MDBBtn>
                                                            </MDBModalFooter>
                                                        </MDBModal>

                                                    </MDBListGroup>
                                                </MDBContainer>




                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                {/*                                   <MDBBtn color="default" size="sm" onClick={() => this.sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                                <MDBBtn color="primary" size="sm" onClick={() => this.Annulersendsetobjective(3)}>Annuler</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>




                                        <div>
                                            <MDBInput style={{ height: '37px' }} label="Bas" outline size="sm" type="text" className="form-control" name="bas" value={this.state.bas} placeholder="" onChange={this.handleChange} />
                                            <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

                                                onClick={this.toggleFilterMesure5}
                                            >Get Objective</MDBBtn>



                                            <MDBModal isOpen={this.state.modalFilterMesure5} toggle={this.toggleFilterMesure5} size="lg">
                                                <MDBModalHeader toggle={this.toggleFilterMesure5}>Get Objective</MDBModalHeader>
                                                <MDBModalBody>
                                                    <div style={{ width: '99%' }}>
                                                        {this.state.dataEnergyMeasure.length != 0 ? (
                                                            <FilterV1 filterName={"Mesure"}
                                                                outSelected={this.outSelectedMesure5}
                                                                filter={[
                                                                    { measure_View: "Périodicité" },
                                                                    { "Measure-Category": "Catégorie" },
                                                                    { "Measure-Stats": "Statistiques" },
                                                                    { measure_name: "Nom Mesure" },
                                                                ]}
                                                                display={{ separator: "", elems: ["measure_Label"] }}
                                                                data={this.state.dataEnergyMeasure}
                                                                styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                                btnEdit={true} />) : null}
                                                    </div>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="primary" size="sm" onClick={this.toggleFilterMesure5}>Annuler</MDBBtn>
                                                    <MDBBtn color="primary" size="sm" onClick={this.toggle(5)}>Get Objective</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>


                                            <MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} size="md">
                                                <MDBModalHeader toggle={this.toggle(5)}>Get Objective</MDBModalHeader>
                                                <MDBModalBody>
                                                    <div><b>Capteur :</b> {this.state.energycompteurselected}</div>
                                                    <div><b>Compteur :</b> {this.state.incidentselectedwithoutlive}</div>
                                                    <div><b>Sélectionner votre mesure :</b></div>
                                                    <MDBContainer style={{ padding: 0 + 'em' }}>
                                                        <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                            {this.state.Listmesureenergy.map((mesureitem, i) =>
                                                                <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                                    borderLeft: '0.5px solid #d6d4d4',
                                                                    borderRight: '0.5px solid #d6d4d4',
                                                                    borderTop: '0.5px solid #d6d4d4',
                                                                    borderBottom: 'none'
                                                                }} >
                                                                    <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                        className=" w-100 bd-highlight col-example"
                                                                        hover flush
                                                                        onClick={() => this.handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 5)}  >
                                                                        {mesureitem.measure_Label}

                                                                    </MDBListGroupItem>
                                                                    <MDBBtn size="sm" color="default" style={{ height: "31px" }} className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                        onClick={() => this.getindexmesue(i, mesureitem.measure_ID)}
                                                                    >
                                                                        <MDBIcon icon="pencil-alt" />

                                                                    </MDBBtn>
                                                                </div>



                                                            )}
                                                            <MDBModal isOpen={this.state.modal6} toggle={this.toggle(6)} size="sm">

                                                                <MDBModalBody>
                                                                    <label>Value</label>

                                                                    <input
                                                                        className="form-control form-control-sm"
                                                                        name="valuetomesure" value={this.state.valuetomesure}
                                                                        onChange={this.handleChange} />
                                                                </MDBModalBody>
                                                                <MDBModalFooter>
                                                                    <MDBBtn color="default" size="sm" onClick={() => this.addvaluetomesue()}>Ajouter</MDBBtn>

                                                                    <MDBBtn color="primary" size="sm" onClick={this.toggle(6)}>Annuler</MDBBtn>
                                                                </MDBModalFooter>
                                                            </MDBModal>

                                                        </MDBListGroup>
                                                    </MDBContainer>




                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    {/* <MDBBtn color="default" size="sm" onClick={() => this.sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                                    <MDBBtn color="primary" size="sm" onClick={() => this.Annulersendsetobjective(5)}>Annuler</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>


                                        </div>
                                    </div>
                                }

                                {this.state.keyword == "Ensemble" && this.state.operateur != "" &&
                                    <div id="EnsembleNouveau" >


                                        <MDBRow>
                                            <MDBCol size="8">
                                                <MDBInput style={{ height: '37px' }} label="Dans" outline size="sm" type="text" className="form-control" name="dans" value={this.state.dans} placeholder="" onChange={this.handleChange} />
                                                <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

                                                    onClick={this.toggleFilterMesure7}
                                                >Get Objective</MDBBtn>


                                                <MDBModal isOpen={this.state.modalFilterMesure7} toggle={this.toggleFilterMesure7} size="lg">
                                                    <MDBModalHeader toggle={this.toggleFilterMesure7}>Get Objective</MDBModalHeader>
                                                    <MDBModalBody>
                                                        <div style={{ width: '99%' }}>
                                                            {this.state.dataEnergyMeasure.length != 0 ? (
                                                                <FilterV1 filterName={"Mesure"}
                                                                    outSelected={this.outSelectedMesure7}
                                                                    filter={[
                                                                        { measure_View: "Périodicité" },
                                                                        { "Measure-Category": "Catégorie" },
                                                                        { "Measure-Stats": "Statistiques" },
                                                                        { measure_name: "Nom Mesure" },
                                                                    ]}
                                                                    display={{ separator: "", elems: ["measure_Label"] }}
                                                                    data={this.state.dataEnergyMeasure}
                                                                    styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                                    btnEdit={true} />) : null}
                                                        </div>
                                                    </MDBModalBody>
                                                    <MDBModalFooter>
                                                        <MDBBtn color="primary" size="sm" onClick={this.toggleFilterMesure7}>Annuler</MDBBtn>
                                                        <MDBBtn color="primary" size="sm" onClick={this.toggle(7)}>Get Objective</MDBBtn>
                                                    </MDBModalFooter>
                                                </MDBModal>
                                                <MDBModal isOpen={this.state.modal7} toggle={this.toggle(7)} size="md">
                                                    <MDBModalHeader toggle={this.toggle(7)}>Get Objective</MDBModalHeader>
                                                    <MDBModalBody>
                                                        <div><b>Capteur :</b> {this.state.energycompteurselected}</div>
                                                        <div><b>Compteur :</b> {this.state.incidentselectedwithoutlive}</div>
                                                        <div><b>Sélectionner votre mesure :</b></div>
                                                        <MDBContainer style={{ padding: 0 + 'em' }}>
                                                            <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                                {this.state.Listmesureenergy.map((mesureitem, i) =>
                                                                    <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                                        borderLeft: '0.5px solid #d6d4d4',
                                                                        borderRight: '0.5px solid #d6d4d4',
                                                                        borderTop: '0.5px solid #d6d4d4',
                                                                        borderBottom: 'none'
                                                                    }} >
                                                                        <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                            className=" w-100 bd-highlight col-example"
                                                                            hover flush
                                                                            onClick={() => this.handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 7)}  >
                                                                            {mesureitem.measure_Label}

                                                                        </MDBListGroupItem>
                                                                        <MDBBtn size="sm" color="default" style={{ height: "31px" }} className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                            onClick={() => this.getindexmesue(i, mesureitem.measure_ID)}
                                                                        >
                                                                            <MDBIcon icon="pencil-alt" />

                                                                        </MDBBtn>
                                                                    </div>



                                                                )}
                                                                <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} size="sm">

                                                                    <MDBModalBody>
                                                                        <label>Value</label>

                                                                        <input
                                                                            className="form-control form-control-sm"
                                                                            name="valuetomesure" value={this.state.valuetomesure}
                                                                            onChange={this.handleChange} />
                                                                    </MDBModalBody>
                                                                    <MDBModalFooter>
                                                                        <MDBBtn color="default" size="sm" onClick={() => this.addvaluetomesue()}>Ajouter</MDBBtn>

                                                                        <MDBBtn color="primary" size="sm" onClick={this.toggle(8)}>Annuler</MDBBtn>
                                                                    </MDBModalFooter>
                                                                </MDBModal>

                                                            </MDBListGroup>
                                                        </MDBContainer>




                                                    </MDBModalBody>
                                                    <MDBModalFooter>
                                                        {/* <MDBBtn color="default" size="sm" onClick={() => this.sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                                        <MDBBtn color="primary" size="sm" onClick={() => this.Annulersendsetobjective(7)}>Annuler</MDBBtn>
                                                    </MDBModalFooter>
                                                </MDBModal>

                                            </MDBCol>
                                            <MDBCol size="4">
                                                <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                            </MDBCol>
                                            <MDBCol size="8">
                                                <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_Dans" className="form-control  " value={this.state.totale_Dans} placeholder="" onChange={this.handleChange} diabled />
                                            </MDBCol>
                                            <MDBCol size="4">
                                                <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                }

                            </MDBCol>

                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn style={{ marginTop: '-6%' }} id="BtnAjouterTab" className='float-right' onClick={this.ajoutTab} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
                            </MDBCol>
                        </MDBRow></form>
                </fieldset>
            </div>



            <div id="tabObjective" className="tabulator" className="table table-striped" ref={el => (this.el = el)} />
        </div>
        );
    }



}
export default ModifyObjectiveAdvanced;