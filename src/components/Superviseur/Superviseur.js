
import axios from 'axios';
import uuid from 'react-uuid';
import * as React from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBListGroupItem, MDBContainer, MDBListGroup, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import { BrowserRouter } from 'react-router-dom';
import Moment from 'moment';
import "../Superviseur/Superviseur.css"
import GenerateTable from "../Rapporteur/Rapport/layoutGen/layoutGenerator";
import SynopticRender from "../synoptic/synopticRender"
class Superviseur extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      code: "",
      synopticObject:null,
      listesCapteur: [],
      listesViews: [],
      listesViews_Name: [],
      ListesTableaux: [],
      ListesMl: [],
      ListesCl: [],
      ListesTL: [],
      Ml: "",
      Cl: "",
      Tl: "",
      Code_View: "",
      arrayCode_View: [],
      arrayCode_Energy: [],
      Name_Energy: "",
      Code_Energy: "",
      listcompteurglobal: [],
      tableaux: "",
      Nametableaux: "",
      measure_Label: "",
      measure_Label_Liste: [],
      listNameEnergy: [],
      dataEnergy: [],
      Report_TableauCode: "",
      CompteurListI_Name: "",
      listcompteurglobal: [],
      tl_id: "",
      tl_name: "",
      listfieldfiltername: [],
      listfieldfiltercontent: [],
      listcompteurParent: [],
      listsecteur: [],
      listpointproduction: [],
      listpointdistribution: [],
      listpointconsommation: [],
      U_compteurselected: "",
      items: {
        default: "1",
      },
      config: null,
      data: null,
      calculatedPlots: null,
      ready: false,
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      GenerateTableActive: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.AjouterTableau = this.AjouterTableau.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AjouterCl = this.AjouterCl.bind(this);
    this.handleListeCompteurClick = this.handleListeCompteurClick.bind(this);
    this.handleTl_Click = this.handleTl_Click.bind(this);
    this.AjouterTl = this.AjouterTl.bind(this);
    this.dataConfig = this.dataConfig.bind(this);
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });

    axios.post(window.apiUrl + "filter/",

    {
      tablename: "Reporting_V3",
      identifier: this.state.dateDMY + uuid(),
      fields: "*",
      content: "*",
      dataselect: "Report_TableauCode;Report_TableauName",
      dist: "*;dist",
      orderby: "*",
    }
  )

    .then(
      (result) => {
            if (result.data !== null) {
    
               this.setState({ listesTableaux: result.data })
                console.log(this.state.listesTableaux)
              } else {
                console.log('Tableaux vide')
              }
    
    
            })
  }

  //////////////
  toggle1 = () => {
    this.setState({
      modal1: !this.state.modal1
    });


    axios.post(window.apiUrl + "display/",
      {
        tablename: "tl",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ ListesTL: result.data })
            //   this.state.ListesTableaux = result.data;
            console.log("ListesTL")
            console.log(this.state.ListesTL)
          } else {
            console.log('ListesTL vide')
          }

        })
  }
  /////////////
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });

    /////////ML
    axios.post(window.apiUrl + "display/",
      {
        tablename: "ML_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ ListesMl: result.data })
            //   this.state.ListesTableaux = result.data;
            console.log("ListesMl")
            console.log(this.state.ListesMl)
          } else {
            console.log('ListesMl vide')
          }

        })

    ///////////////



  }
  ///////////
  toggle3 = () => {
    this.setState({
      modal3: !this.state.modal3
    });

    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ ListesCl: result.data })
            //   this.state.ListesTableaux = result.data;
            console.log("ListesCl")
            console.log(this.state.ListesCl)
          } else {
            console.log('ListesCl vide')
          }

        })



    //////////////////////////////////////////////////////////////////////////////////////////////

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });





  }


  handleClick(id, name, event) {
    this.state.code = id;
    this.state.Nametableaux = name;
    console.log("code", this.state.code)

  }

  handle1Click(id, name, event) {
    this.state.code = id;
    console.log("code", this.state.code)

  }

  handle2Click(id, name, event) {
    this.state.code = id;
    console.log("code", this.state.code)

  }

  handleTl_Click(id, name, event) {
    this.state.tl_id = id;
    this.state.tl_name = name
    console.log("tl_id", this.state.tl_id)
    console.log("tl_name", this.state.tl_name)

  }

  handleListeCompteurClick(id, name, event) {



  }


  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }

  AjouterTableau() {
    this.state.tableaux = this.state.Nametableaux;
    this.setState({
      modal: !this.state.modal
    });
  }
  AjouterCl() {


    this.setState({ Cl: this.state.CompteurListI_Name })



    // this.state.Cl=  this.state.U_compteurselected
    this.setState({
      modal3: !this.state.modal3
    });
  }
  AjouterTl() {
    this.setState({ Tl: this.state.tl_name })

    this.setState({
      modal1: !this.state.modal1
    });

  }

  togglePills = (type, tab) => e => {
    e.preventDefault();
    if (this.state.items[type] !== tab) {
      let items = { ...this.state.items };
      items[type] = tab;
      this.setState({ items });
    }
  };

  componentDidMount() {


    const synopticId = "_O1"

    true && axios.post(`${window.apiUrl}filter/`, {
      tablename: "MasterObject",
      fields: "MasterObj_Code",
      identifier: "",
      content: synopticId,
      dataselect: "QueryAPI;MasterObj_Header;MasterObj_Name;Image;MasterObj_Data_Query;RefreshRate",
      dist: "*",
      orderby: "asc",
    }).then(({ data }) => {
      if (!data) return
      data = Array.isArray(data) && data.length == 1 ? data[0] : data;

      this.setState({ synopticObject: data })
    })
    ///////////////////
    this.getDate();

    // const calculatedPlots=this.dataConfig(config, data)
    // this.setState({calculatedPlots,data:data11111,config:config2_mini})
    const config = {
      "configLayout": {
        "Masterlayout_row": 10,
        "Masterlayout_col": 10,
        //Portrait or Paysage for A4 print
        "Orientation": "Portrait",
        //title with layout
        "title": "Analyse Technique",
      },
      objects: [
      //table_ML_1Y_pageTL_iotinner
{
  "MasterObj_Code": "O13",
  "row": 1,
  "col": 1,
  "spanRow": 10,
  "spanCol": 10,
  QueryAPI: "iotinner",
  "MasterObj_Data_selection": {
    "page": {
      "type": "dim",
      "page": "TL"
    },
    "x": "CL",
    "y": "ML",
    "MasterObjPage": {
      "membersList": [
        {
          "SQL": "( iot.date between date'2021-08-1' -INTERVAL '24 hour' and date'2021-08-1' -INTERVAL '59 min'          )",
          "SQLc": "where asc"
      },
      {
          "SQL": "time_bucket('1 hour', iot.date) AS time,avg(iot.value) as valeur",
          "SQLc": "select"
      }
      ],
      "selectedMember": 2
    },
    "masterObjectX":[
      {
        "Le_Compteur": "Collecteur_COP_Vapeur",
        "Code_Compteur": "MZV002"
      },
      {
        "Le_Compteur": "ElMazraa_Cons_Vapeur",
        "Code_Compteur": "MZV00A"
      },
      {
        "Le_Compteur": "BâcheAEau_Vapeur",
        "Code_Compteur": "MZVB12"
      },
      {
        "Le_Compteur": "Abattoir_Vapeur",
        "Code_Compteur": "MZVA10"
      },
      {
        "Le_Compteur": "LaveCaisse_Vapeur",
        "Code_Compteur": "MZVA12"
      },
      {
        "Le_Compteur": "Abattage_vapeur",
        "Code_Compteur": "MZVA11"
      },
      {
        "Le_Compteur": "Conserve_Vapeur",
        "Code_Compteur": "MZVA2B"
      },
      {
        "Le_Compteur": "Surgule_Vapeur",
        "Code_Compteur": "MZVA2A"
      },
      {
        "Le_Compteur": "RestTransforme_Vapeur",
        "Code_Compteur": "MZVA21"
      },
      {
        "Le_Compteur": "Autoclave_Vapeur",
        "Code_Compteur": "MZVA2C"
      },
      {
        "Le_Compteur": "UCPC_Vapeur",
        "Code_Compteur": "MZVA2D"
      },
      {
        "Le_Compteur": "Charcuterie_Vapeur",
        "Code_Compteur": "MZVA2E"
      },
      {
        "Le_Compteur": "Transforme_Vapeur",
        "Code_Compteur": "MZVA20"
      },
      {
        "Le_Compteur": "Petfood_Vapeur",
        "Code_Compteur": "MZVA22"
      }
    ]  ,
    "masterObjectY":[
      {
        "m_code": "11_2",
        "m_name": "Kg/h_J"
      },
      {
        "m_code": "2011_2",
        "m_name": "Kg/h_J/ PARENT"
      },
      {
        "m_code": "12_2",
        "m_name": "INC_J"
      }
    ]
  },
  "MasterObj_Data_Query": {
    "ml": [],
    "cl": [],
    "tl": [],
    "retour": "json",
    "cross_tab": "cross_tab_ml"
  },

  // title: { text: "Scatter_ML_Y1_IOT_Inner" },
  MasterObj_Data_Mapping: {
    margin: {
      t: 40, //top margin
      l: 70, //left margin
      r: 50, //right margin
      b: 60, //bottom margin
      autoexpand: true
    },
    legend: {
      pos: 'bottom',
      showlegend: true,
      legend: {
        yanchor: "top",
        font: { size: 10 },
        orientation: "v",
        x:1,
        y:1,
        bgcolor: 'transparent',
        itemwidth: 30,
      }
    },
    xaxis: {
      "color": "red",
      "title": { text: "xaxis title1", font: { size: 18 } },
      tickfont: { size: 10 },
      autorange: true,
    },
    yaxis1: {
      "color": "green",
      "title": { text: "yaxis1 title1", font: { size: 18 } },
      tickfont: { size: 10 },

      autorange: true,

    },
    yaxis2: {
      "color": "blue",
      "title": { text: "yaxis2 title1", font: { size: 18 } },
      tickfont: { size: 10 },

      autorange: true,

    },
    extraLayoutConfig: {
      dragmode: true,
    },
    "Plots": [
      {
        "function_type": "scatter",
        "X": "*",
        "Y": {
          "Y1": "*",

        },
        extraPlotConfig: {
        },
      },
    ]
  },
},
      ]
    }
    this.setState({ config })
    this.setState({ GenerateTableActive: true })
  }

  dataConfig = (config, data) => {
    let x = 0
    let y = 0
    let backupXData = null

    const getNewXY = (op) => {
      switch (op) {
        case "x": {
          x++
          return `x${x < 2 ? "" : x}`
        }
        case "y": {
          y++
          return `y${y < 2 ? "" : y}`
        }
        default:
          break;
      }
    }

    const generateX = (plot, data, i, j) => {
      let x = []
      if (plot.X == "time" && backupXData)
        return backupXData
      else {
        if (plot.X == "time") {
          data.map((elem, i) => {
            if (elem.time) {
              const date = new Date(elem.time)
              x.push(date)
            }
            else
              x.push(date)
          })
        }
      }
      return x
    }

    const generateY = (plot, data, i, j, Globalfunction_type) => {
      const y = []
      data.map((elem, i) => {
        if (Globalfunction_type == "*") {
          if (typeof (elem[plot.Y]) == "undefined") throw new Error(`plot.Y=${plot.Y} missing`)
          y.push(elem[plot.Y])
        }
        else {
          if (typeof (elem[Globalfunction_type]) == "undefined") throw new Error(`Globalfunction_type=${Globalfunction_type} missing`)
          y.push(elem[Globalfunction_type])
        }
      })
      return y
    }

    const layoutGenerator = (config, data, generatedData) => {

      let _layout = { dragmode: false, grid: { rows: config.configLayout.rowG, columns: config.configLayout.colG, pattern: 'independent' }, }
      for (let _data of generatedData) {
        let code = "x"
        let num = _data.xaxis.split("")[1]
        _layout[`${code}axis${num ? num : ""}`] = { title: _data.X_title, fixedrange: true }
        code = "y"
        num = _data.yaxis.split("")[1]
        _layout[`${code}axis${num ? num : ""}`] = { fixedrange: true }
        if (_data.Y_title) {
          _layout[`${code}axis${num ? num : ""}`].title = _data.Y_title[`Y${num ? num : "1"}_title`]
          _layout[`${code}axis${num ? num : ""}`].side = "right"
        }
        _layout.title = config.configLayout.title

      }
      return _layout
      // return {
      //   grid: { rows: config.configLayout.rowG, columns: config.configLayout.colG, pattern: 'independent' },
      //   // xaxis: { title: "xaxis" },
      //   // yaxis: { title: 'yaxis', },
      //   // xaxis2: { title: "xaxis2" },
      //   // yaxis2: { title: 'yaxis2', side: "right" }
      //   xaxis: { title: "xaxis" },
      //   yaxis: { title: 'yaxis', },
      //   xaxis2: { title: "xaxis2" },
      //   yaxis2: { title: 'yaxis2', side: "right" }
      // }

    }

    const dataGenerator = (config, data) => {
      let outFinal = []
      let outTemp = {}
      config.objects.map((obj, i) => {
        const secondary = Object.keys(config.configLayout.specs[i]).length ? true : false
        const x = getNewXY("x")
        const y = getNewXY("y")
        obj.Data_Maping.Plots.map((plot, j) => {
          outTemp = {}
          const xData = generateX(plot, data, i, j)
          const yData = generateY(plot, data, i, j, obj.Data_Maping.Globalfunction_type)
          outTemp.x = xData
          outTemp.y = yData

          if (j != 0 && secondary) {

            outTemp.xaxis = x
            outTemp.yaxis = y

          }
          else {

            outTemp.xaxis = x
            outTemp.yaxis = y

          }

          outTemp.type = plot.function_type
          outTemp.id = obj.id
          outTemp.Page_title = obj.Page_title
          outTemp.X_title = obj.X_title
          outTemp.X_unite = obj.X_unite
          if (obj.Y_title) {
            outTemp.Y_title = obj.Y_title
            outTemp.Y_unite = obj.Y_unite
          }

          outFinal.push(outTemp)
        })
      })
      return outFinal
    }

    const _data = dataGenerator(config, data)
    let output = {
      data: _data,
      layout: layoutGenerator(config, data, _data)
    }

    return output
  }

  render() {
    const scrollContainerStyle = { width: "300px", maxHeight: "400px" };

    return (
      <div>
        {/* ****************************************************************************Bar Config***************************************************************************** */}

        <MDBBreadcrumb style={{ backgroundColor: "#fff", height: "50px" }}>

          <MDBCol size="3" style={{ marginTop: "-10px" }}>
            <MDBBtn size="sm" color="#eeeeee grey lighten-3" style={{ fontSize: "13px" }} onClick={this.toggle}>
              Tableaux
            </MDBBtn>
            <b style={{ fontSize: "16px" }} >{this.state.tableaux}</b>
          </MDBCol>
          <MDBCol size="3" style={{ marginTop: "-10px" }}>
            <MDBBtn size="sm" color="#eeeeee grey lighten-3" style={{ fontSize: "13px" }} onClick={this.toggle2}>
              Mesures
            </MDBBtn>
            <b style={{ fontSize: "16px" }} >{this.state.Ml}</b>
          </MDBCol>

          <MDBCol size="3" style={{ marginTop: "-10px" }}>
            <MDBBtn size="sm" color="#eeeeee grey lighten-3" style={{ fontSize: "13px" }} onClick={this.toggle3}>
              Compteurs
            </MDBBtn>                  <b style={{ fontSize: "16px" }} >{this.state.Cl}</b>
          </MDBCol >
          <MDBCol size="3" style={{ marginTop: "-10px" }}>
            <MDBBtn size="sm" color="#eeeeee grey lighten-3" style={{ fontSize: "13px" }} onClick={this.toggle1}>
              Time Intelligence
            </MDBBtn>
            <b style={{ fontSize: "16px" }} >{this.state.Tl}</b>
          </MDBCol>

        </MDBBreadcrumb>
        {/* ****************************************************************************Body***************************************************************************** */}

        <MDBCard style={{ width: "auto", height: "auto", margin: "1%" }}>
          <b>Nom de la tableau: {this.state.tableaux}</b>
        </MDBCard>
        {/* <div style={{ height: "600px" }}>
          {this.state.GenerateTableActive && <GenerateTable editor={false} supervisor={true} config={this.state.config} maxCols={5} maxRows={5} style={{ width: "100%", height: "100%" }} />}
        </div> */}
{this.state.synopticObject && <SynopticRender  synopticObject={this.state.synopticObject} />}

        {/* ****************************************************************************Modale***************************************************************************** */}
        {/**    Tableaux Modale */}
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered >
          <MDBModalHeader toggle={this.toggle} >Sélectionnez un Tableaux :</MDBModalHeader>
          <MDBModalBody>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
              Les Tableaux
            </label>
            <select className="browser-default custom-select" name="Nametableaux" value={this.state.Nametableaux} onChange={this.handleChange} size="8" >
              {this.state.ListesTableaux.map(liste => <option key={liste.Report_TableauCode} id={liste.Report_TableauCode} onClick={(e) => this.handleClick(liste.Report_TableauCode, liste.Report_TableauName, e)}>  {liste.Report_TableauName} </option>)}

            </select>

          </MDBModalBody>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterTableau}> <MDBIcon icon="plus" className="ml-1" />Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        {/**    Mesures Listes Modale */}
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} centered>
          <MDBModalHeader toggle={this.toggle2} >Sélectionnez:</MDBModalHeader>
          <MDBModalBody>
            <MDBTabContent activeItem={this.state.items["default"]}>
              <MDBTabPane tabId="1">

                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                  measure Listes
                </label>
                <select className="browser-default custom-select" name="Nom" value={this.state.Nom} onChange={this.handleChange} size="8" >
                  {this.state.ListesMl.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={(e) => this.handle2Click(liste.ML_Code, ML_Name, e)}>  {liste.ML_Name} </option>)}

                </select>

              </MDBTabPane>

            </MDBTabContent>

          </MDBModalBody>

          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link to="/Rapporteur/MesuresListes" >
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>


          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterMl}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        {/**    Time Intelligence Modale */}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} centered  >
          <MDBModalHeader toggle={this.toggle1} >Sélectionnez Time Intelligence:</MDBModalHeader>
          <MDBModalBody>
            <MDBTabContent activeItem={this.state.items["default"]}>
              <MDBTabPane tabId="1">

                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                  Time Intelligence
                </label>
                <select className="browser-default custom-select" name="Nom" value={this.state.Nom} onChange={this.handleChange} size="8" >
                  {this.state.ListesTL.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={(e) => this.handleTl_Click(liste.tl_id, liste.tl_name, e)}>  {liste.tl_name} </option>)}

                </select>

              </MDBTabPane>

            </MDBTabContent>

          </MDBModalBody>

          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link to="/Rapporteur/TimeIntelligence" /*active={this.state.items["default"] === "2"} value={this.state.Disposition} onClick={this.togglePills("default", "2", this.state.Disposition)} */>
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterTl}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        {/**    Compteurs Listes Modale */}
        <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered >
          <MDBModalHeader toggle={this.toggle3} >Sélectionnez Compteur Liste:</MDBModalHeader>
          <MDBModalBody>


            <MDBTabContent activeItem={this.state.items["default"]}>
              <MDBTabPane tabId="1">

                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "20px" }}>
                  Les Compteurs Listes
                </label>
                <select className="browser-default custom-select" name="CompteurListI_Name" value={this.state.CompteurListI_Name} onChange={this.handleChange} size="8" >
                  {this.state.ListesCl.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={(e) => this.handleListeCompteurClick(liste.CompteurList_Code, liste.CompteurListI_Name, e)}>  {liste.CompteurListI_Name} </option>)}

                </select>

              </MDBTabPane>

            </MDBTabContent>

          </MDBModalBody>

          <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

            <MDBNavItem>
              <MDBNavLink link to="/Rapporteur/Compteur_Listes" /*active={this.state.items["default"] === "2"} value={this.state.Disposition} onClick={this.togglePills("default", "2", this.state.Disposition)} */>
                liste d'éditeurs
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBModalFooter>

            <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterCl}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

      </div>
    );




  }
}
export default Superviseur;