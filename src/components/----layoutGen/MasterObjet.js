
import React, { useEffect, useState } from "react";
import { MDBBtn, MDBRow, MDBIcon, MDBModal, MDBTabContent, MDBModalBody, MDBTabPane, MDBNavItem, MDBModalHeader, MDBNavLink, MDBNav, MDBModalFooter, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from "mdbreact";
import { PlotScatter, PlotBar } from "./PlotMaster"
import { DrawPlot } from "./layoutGenerator";
import axios from "axios";
import "./layoutGenerator.css";
import Swal from 'sweetalert2';
import uuid from 'react-uuid';
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import LayoutGenerator from "./layoutGenerator"
import $ from "jquery"
import { queryPatcher, pageHandler, dateReducer, dataMappingGenerator, temporaryDataFixer } from "./jsonPatcher"
import { set } from "react-hook-form";

import ModalML from '../Rapporteur/CreateurRapport/MLModle'
import ModalCL from "../Rapporteur/CreateurRapport/CLModle";
import ModalTL from "../Rapporteur/CreateurRapport/TLModle";
import OptionExtraPlotConfig from "../Rapporteur/CreateurRapport/OptionExtraPlotConfig";
import { array } from "prop-types";
import{ removeUndefined} from "./extra"
const Plot = createPlotlyComponent(Plotly);


const PlotHandler = ({ handleShowPlot, handleObjectjson, rowColObjet, Tl_Var_Fix, Ml_Var_Fix, Cl_Var_Fix, id, rc }) => {
  //////////
  const [errors,setErrors]=useState({ValidateObject:true});
  /////Modal
  const [ValidateObject,setValidteObject]=useState(false)
  const [ValidateAjouterObject,setValidateAjouterObject]=useState(false)
  const [modal, setmodal] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [modal3, setmodal3] = useState(false);
  const [modal1, setmodal1] = useState(false);
  ////Listes
  const [ListesTL, setListesTL] = useState([]);
  const [ListesMl, setListesMl] = useState([]);
  const [ListesCl, setListesCl] = useState([]);
  const [tl_id, setTl_id] = useState("");
  const [tl_name, setTl_name] = useState("");
  const [ML_Code, setML_Code] = useState("");
  const [ML_Name, setML_Name] = useState("");
  const [CompteurList_Code, setCompteurList_Code] = useState("");
  const [CompteurListI_Name, setCompteurListI_Name] = useState("");
  const [CL_Membre, setCL_Membre] = useState([]);
  const [ML_Membre, setML_Membre] = useState([]);
  const [tl_membres, setTl_membres] = useState([]);
  const [TlDisabled, setTlDisabled] = useState(false);
  const [TlDisabled2, setTlDisabled2] = useState(false);
  const [ClDisabled, setClDisabled] = useState(false);
  const [MlDisabled, setMlDisabled] = useState(false);
  const [QueryApi, setQueryApi] = useState("iotinner");
  const [FilterListe, setFilterListe] = useState("cross_tab_ml");
  const [selectMemberPage, setSelectMemberPage] = useState(0);
  const [listePageMl, setListePageMl] = useState([]);
  const [listePageCl, setListePageCl] = useState([]);
  const [listePageTl, setListePageTl] = useState([]);
  const [page, setPage] = useState("");
  const [ListeMasterObject, setListeMasterObject] = useState([]);
  const [ListeMasterObject2, setListeMasterObject2] = useState([])
  const [objet, setObjet] = useState([]);
  const [Objectjson, setObjectjson] = useState(null);
  const [test, setTest] = useState({});
  const [renderPlot, setRenderPlot] = useState(null)
  const [arrayjsonBody, setArrayjsonBody] = useState([])
  const [filterMasterObj, setFilterMasterObj] = useState([])
  const [selectedMemberJsonML, setSelectedMemberJsonML] = useState({})
  const [selectedMemberJsonCL, setSelectedMemberJsonCL] = useState({})
  const [Y2, setY2] = useState(undefined)
  const [select_Y_Liste, setSelect_Y_Liste] = useState("")
  const [select_Y2_Liste, setSelect_Y2_Liste] = useState("")
  const [select_Y1_Liste, setSelect_Y1_Liste] = useState("")
  const [array_Y, setArray_Y] = useState([])
  const [listeArray_Y1, setListeArray_Y1] = useState([])
  const [listeArray_Y2, setListeArray_Y2] = useState([])
  const [liste_Plote, setListe_Plote] = useState([])
  const [PageCluster,setPageCluster] = useState("")
  const [Y1_name,setY1_name] = useState("")
  const [Y2_name,setY2_name] = useState("")
  const [extraPlotConfig,setExtraPlotConfig]=useState({})
  const [dateDMY, setdateDMY] = useState(null);
  const [items, setItems] = useState(() => ({ default: "1" }))
  const [Name_Tl,setName_Tl]=useState("")
  const [Code_Tl,setCode_Tl]=useState("")
  const [MasterObj_Data_MappingJson,setMasterObj_Data_MappingJson]=useState(null)
  const [Code_Ml,setCode_Ml]=useState("")
  const [ml_Membre_Select_fin,setMl_Membre_Select_fin]=useState([])
  const [Name_Ml,setName_Ml]=useState("")

  const [Code_Cl,setCode_Cl]=useState("")
  const [cl_Membre_Select_fin,setCl_Membre_Select_fin]=useState([])
  const [Name_Cl,setName_Cl]=useState("")

  const [plotName, setPlotName] = useState("")
  const [MasterObj_Name, setMasterObj_Name] = useState("")
  const [widthObj, setwidthObj] = useState(null)
  const [heightObj, setheightObj] = useState(null)
  const [nameImage,setNameImage]=useState("")
const [indicateurY2array,setIndicateurY2array]=useState([])
const [cross_tab,setCross_tab]=useState("")

const [y2_Indicateur_Array, setY2_Indicateur_Array] = useState([])
const [y1_Indicateur_Array, setY1_Indicateur_Array] = useState([])
useEffect(() => {
  //console.log("-------ml_Membre_Select_fin------------------->",ml_Membre_Select_fin)
  //console.log("-------cl_Membre_Select_fin------------------->",cl_Membre_Select_fin)
}, [ml_Membre_Select_fin,cl_Membre_Select_fin])
useEffect(() => {

}, [Tl_Var_Fix, Ml_Var_Fix, Cl_Var_Fix])
useEffect(() => {
  if (Tl_Var_Fix === "Fixe") {
    setTlDisabled2(true)
  } else {
    setTlDisabled2(false)
  }
  if (Ml_Var_Fix === "Fixe") {
    setMlDisabled(true)
    
  } else {
    setMlDisabled(false)
  
  }
  if (Cl_Var_Fix === "Fixe") {
    setClDisabled(true)
  } else {
    setClDisabled(false)
  }
}, [Tl_Var_Fix, Ml_Var_Fix, Cl_Var_Fix])

  function togglePills(type, tab, e) {
    e.preventDefault();
    if (tab == "2") {
     
      if (items[type] !== "2") {
        
            if (Objectjson != null) {

          let item = { ...items };
          item[type] = "2";
          setItems(item)
          console.log('json', Objectjson)
          setRenderPlot(null)
          setTimeout(() => {
            setRenderPlot(true);
          }, 100);
          setValidateAjouterObject(true)
        } else {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 320,
            title: 'En peut Selectioner un objet'
          })
        }

      
    
    }
  }
   else {
      let item = { ...items };
      item[type] = tab;
      setItems(item)
      ////console.log('1111')
    }
  

  }
  function handleTl_Click(id, name, membre, e) {

    setTl_id(id);
    setTl_name(name);
    setName_Tl(name);
    setCode_Tl(id);
    setTl_membres(membre[0].Tl_Sql)
    ////console.log("tl_id", tl_id)
    ////console.log("tl_name", tl_name)
    ////console.log("tl_membres", tl_membres)
  }
  function handleMlClick(id, name, membre, e) {
    setML_Code(id);
    setCode_Ml(id);
    setML_Name(name);
    setName_Ml(name);
    setML_Membre(membre);
  }
  function handleListeCompteurClick(id, name, membre, e) {
    setCompteurList_Code(id);
    setCompteurListI_Name(name);
    setName_Cl(name)
    setCode_Cl(id)
    setCL_Membre(membre)
  }
  function toggle() {
    setmodal(!modal);
    ////console.log(rowColObjet)
//console.log("ListeMasterObject2.length",ListeMasterObject2.length)
    if (ListeMasterObject2.length==0){
      setValidteObject(false)
      setErrors({
        ValidateObject:false
      })
    }

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "MasterObject",
        identifier: dateDMY + uuid(),
        fields: "QueryAPI",
        content: QueryApi,
        dataselect: "MasterObj_Code;MasterObj_Name;MasterObj_Data_selection;MasterObj_Data_Query;MasterObj_Data_Mapping;QueryAPI",
        dist: "dist",
        orderby: "asc",
      }

    )
      .then(
        (result) => {
          if (result.data !== null) {
            ////console.log("result.dataaaaaaaaaaaaaaa", result.data)
            setListeMasterObject(result.data)
            ////console.log("ListeMasterObject", ListeMasterObject)
          }
          else {
            //console.log("ListeMasterObject vide ")

          }

        }

      )
  }
  ///////////////tl
  function toggle1() {
    setmodal1(!modal1);

    /////////tL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "tl",
        identifier: dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            //this.setState({ ListesTL: result.data })
            setListesTL(result.data)
            //   ListesTableaux = result.data;

          } else {
            //console.log('ListesTL vide')
          }

        })
  }
  ///////////////Ml
  function toggle2() {
    setmodal2(!modal2);

    /////////ML
    axios.post(window.apiUrl + "display/",
      {
        tablename: "ML_V3",
        identifier: dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {

            setListesMl(result.data)

            ////console.log("ListesMl", ListesMl)
            //       //console.log("ListesMl ML_Name",ListesMl[0].ML_Name)
          } else {
            //console.log('ListesMl vide')
          }

        })
  }
  ///////////////ml
  function toggle3() {
    setmodal3(!modal3);

    /////////CL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
        identifier: dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            //this.setState({ ListesCl: result.data })
            setListesCl(result.data)
            //   ListesTableaux = result.data;
            ////console.log("ListesCl")
            ////console.log(ListesCl)
          } else {
            //console.log('ListesCl vide')
          }

        })

    ///////////////


  }
  function ML_Tags_Function(name){
    if (name!=""){
     setName_Ml(name)
     setCode_Ml("*")
    }
  }
  function modelMl(ml_Membre_Select){
    setMl_Membre_Select_fin(ml_Membre_Select)
  }

  function CL_Tags_Function(name){
    if (name!=""){
     setName_Cl(name)
     setCode_Cl("*")
    }
  }
  function modelCl(cl_Membre_Select){
    setCl_Membre_Select_fin(cl_Membre_Select)
  }
  function handleObjetClick(e, type,nameImage) {
    setwidthObj(rowColObjet.width)
    setheightObj(rowColObjet.height)
    ////console.log("widthObj", widthObj)
    ////console.log("heightObj", heightObj)
    setMasterObj_Name(type)
    setNameImage(nameImage)
    //console.log('click Scatter', MasterObj_Name)
    ///////////////////

  }
  function AjouterObjetClick() {

    setmodal(!modal);
    handleShowPlot(Objectjson, heightObj, widthObj)
    handleObjectjson(Objectjson)
  }
  useEffect(() => {
    if (!arrayjsonBody) return
  }, [arrayjsonBody])
  useEffect(() => {

    //console.log('MasterObj_Name', MasterObj_Name)
    axios.post(window.apiUrl + "filter/",

      {
        tablename: "MasterObject",
        identifier: dateDMY + uuid(),
        fields: "MasterObj_Name",
        content: MasterObj_Name,
        dataselect: "MasterObj_Code;MasterObj_Name;MasterObj_Data_selection;MasterObj_Data_Query;MasterObj_Data_Mapping;QueryAPI",
        dist: "dist",
        orderby: "asc",
      }

    )
      .then(
        ({ data }) => {
          if (data !== null) {
            //console.log("datadatadatadatadatadatadatadatadata",data)
            ////console.log("result.dataaaaaaaaaaaaaaa222222222", result.data)

            // delete data[0].MasterObj_Data_selection.masterObjectY[0]
            // delete data[0].MasterObj_Data_selection.masterObjectY[2]
            // data[0].MasterObj_Data_selection.masterObjectY=data[0].MasterObj_Data_selection.masterObjectY.filter((elem,i)=>
            //   elem.Le_Compteur!="ElMazraa_Cons_Vapeur" || elem.Le_Compteur!="BâcheAEau_Vapeur"
            // )
            // //console.log("datadatadatadatadatadatadatadatadata", data[0].MasterObj_Data_selection.masterObjectY)
            setListeMasterObject2(data)

          }
          else {
            //console.log("ListeMasterObject vide222222222 ")

          }

        }

      )
  }, [MasterObj_Name])
  useEffect(() => {
    if (ListeMasterObject2.length==0){
      setValidteObject(false)
      setErrors({
        ValidateObject:false
      })
    }else{
      setValidteObject(true)
      setErrors({
        ValidateObject:true
      })
    }
    if (!ListeMasterObject2.length) return
    var rowColObjetArray = [rowColObjet]
    var col = rowColObjetArray[0].col
    var row = rowColObjetArray[0].row
    var spanRow = rowColObjetArray[0].rowSpan
    var spanCol = rowColObjetArray[0].colSpan
    ////////////////////////////////////////
    //////////////////////////////////////////////Data with Master objet
    ////////////////// var ///////////////////
    var MasterObj_Code = ""
    var MasterObj_Data_selection = []
    var Page = {}
    var x = ""
    var y = ""
    var MasterObjPage = {}
    var membersList = {}
    var selectedMember = []
    var masterObjectX = []
    var masterObjectY = []
    var MasterObj_Data_Query = {}
    var retour = ""
    var cross_tab = ""
    var MasterObj_Data_Mapping = {}
    var QueryAPI = ""
    var xaxis = {}
    var yaxis1 = {}
    var yaxis2 = {}
    var Plots = []
    var margin = {}
    var legend = {}
    var extraLayoutConfig = {}
    
    ////////////////////////////////////////
    //////////////// data ////////////////
    MasterObj_Code = ListeMasterObject2[0].MasterObj_Code
    MasterObj_Data_selection = ListeMasterObject2[0].MasterObj_Data_selection
    QueryAPI = ListeMasterObject2[0].QueryAPI
    Page = MasterObj_Data_selection.page

    x = MasterObj_Data_selection.x
   
    y = MasterObj_Data_selection.y
    
    MasterObjPage = MasterObj_Data_selection.MasterObjPage
  
    MasterObj_Data_Query = ListeMasterObject2[0].MasterObj_Data_Query
    retour = MasterObj_Data_Query.retour
    cross_tab = MasterObj_Data_Query.cross_tab
    setCross_tab(cross_tab)
    MasterObj_Data_Mapping = ListeMasterObject2[0].MasterObj_Data_Mapping
    xaxis = MasterObj_Data_Mapping.xaxis
    yaxis1 = MasterObj_Data_Mapping.yaxis1
    yaxis2 = MasterObj_Data_Mapping.yaxis2
    margin = MasterObj_Data_Mapping.margin
    legend = MasterObj_Data_Mapping.legend
    extraLayoutConfig = MasterObj_Data_Mapping.extraLayoutConfig
    Plots = MasterObj_Data_Mapping.Plots

    
    switch (cross_tab) {
      case "cross_tab_cl": {
        switch (QueryAPI) {
          case "iotinner":
            if (cl_Membre_Select_fin.length != 0) {
              masterObjectY = cl_Membre_Select_fin 
            } else {
              MasterObj_Data_Query = ListeMasterObject2[0].MasterObj_Data_Query
              masterObjectY = MasterObj_Data_selection.masterObjectY 
              var arrayMembre=[]  
                  
              if(nameImage=="Indicator"){
                setIndicateurY2array()
                for (var i=0;i<masterObjectY.length;i++){

                  arrayMembre.push(masterObjectY[i].Le_Compteur)
                 }
                setIndicateurY2array(arrayMembre)

              }
            }
            if (x == "ML" && ml_Membre_Select_fin.length != 0) {
              masterObjectX = ml_Membre_Select_fin //ml_mb ou tl_mb
            }
            else if (x == "TL" && tl_membres.length != 0) {
              //console.log("tl_membres", tl_membres)
              masterObjectX = tl_membres //ml_mb ou tl_mb
            }
            else {
              masterObjectX = MasterObj_Data_selection.masterObjectX
            }
            if (x == "TL") {
              if (ml_Membre_Select_fin.length != 0) {


                membersList = ml_Membre_Select_fin //tl_mb ou Ml_mb
              } else {
                membersList = MasterObjPage.membersList
                selectedMember = MasterObjPage.selectedMember
              }
              if (Object.keys(selectedMemberJsonML).length != 0) {
                selectedMember = selectedMemberJsonML
              } else {
                if (ml_Membre_Select_fin.length != 0) {
                  selectedMember = ml_Membre_Select_fin[0]//// UN SEUL Ml_mb
                }
              }
            } else if (x == "ML" && tl_membres.length != 0) {
              ////console.log("tl_membres", tl_membres)
              membersList = tl_membres //tl_mb ou Ml_mb
              selectedMember = "0"//// UN SEUL Ml_mb
            } else {
              membersList = MasterObjPage.membersList
              selectedMember = MasterObjPage.selectedMember
            }
            break;

          default:
            /////cluster
            if (cl_Membre_Select_fin.length != 0) {
              masterObjectY = cl_Membre_Select_fin //cl_mb
            } else {
              masterObjectY = MasterObj_Data_selection.masterObjectY
var arrayMembre=[]
if(nameImage=="Indicator"){
              setIndicateurY2array()

              for (var i=0;i<masterObjectY.length;i++){
              
               arrayMembre.push(masterObjectY[i].Le_Compteur)
              }
             
             
             
                 setIndicateurY2array(arrayMembre)
            }
            }
            if (ml_Membre_Select_fin.length != 0) {
   
              masterObjectX = ml_Membre_Select_fin //ml_mb
            } else {
              masterObjectX = MasterObj_Data_selection.masterObjectX
            }
            membersList = [] ///vide
            selectedMember = {}///vide
            break;
        }
      }
        break;
      case "cross_tab_ml": {
        switch (QueryAPI) {
          case "iotinner":
            if (ml_Membre_Select_fin.length != 0) {
           
              masterObjectY = ml_Membre_Select_fin //ml_mb
            } else {
              masterObjectY = MasterObj_Data_selection.masterObjectY

              var arrayMembre=[]
              if(nameImage=="Indicator"){
                            setIndicateurY2array()
              
                            for (var i=0;i<masterObjectY.length;i++){
                            
                             arrayMembre.push(masterObjectY[i].m_name)
                            }
                           
                           
                           
                               setIndicateurY2array(arrayMembre)
                          }

            }
            if (x == "CL" && cl_Membre_Select_fin.length != 0) {
            
              masterObjectX = cl_Membre_Select_fin //Cl_mb ou tl_mb
            }
            else if (x == "TL" && tl_membres.length != 0) {
          
              masterObjectX = tl_membres //Cl_mb ou tl_mb

            }
            else {
              masterObjectX = MasterObj_Data_selection.masterObjectX
            }

            if (x == "TL") {
        
              if (cl_Membre_Select_fin.length != 0) {
                membersList = cl_Membre_Select_fin //tl_mb ou Cl_mb
              } else {
                membersList = MasterObjPage.membersList
                selectedMember = MasterObjPage.selectedMember
              }
              ////console.log("selectedMemberJsonCL", Object.keys(selectedMemberJsonCL).length)
              if (Object.keys(selectedMemberJsonCL).length != 0) {
                selectedMember = selectedMemberJsonCL
                ////console.log("1111111111", selectedMember)
              } else {
                if (cl_Membre_Select_fin.length != 0) {
                  selectedMember = cl_Membre_Select_fin[0]//// UN SEUL Cl_mb
                  ////console.log("22222", selectedMember)
                }
              }

            } else if (x == "CL" && tl_membres.length != 0) {
              ////console.log("tl_membres", tl_membres)
              membersList = tl_membres //tl_mb ou Cl_mb
              selectedMember = "0"//// UN SEUL Cl_mb
            } else {
              membersList = MasterObjPage.membersList
              selectedMember = MasterObjPage.selectedMember
            }
            ////console.log("masterObjectY", masterObjectY)

            break;
          default:
            /////cluster
            if (ml_Membre_Select_fin.length != 0) {
          
              masterObjectY = ml_Membre_Select_fin //ml_mb
            } else {
              masterObjectY = MasterObj_Data_selection.masterObjectY
              var arrayMembre=[]
              if(nameImage=="Indicator"){
                            setIndicateurY2array()
              
                            for (var i=0;i<masterObjectY.length;i++){
                            
                             arrayMembre.push(masterObjectY[i].m_name)
                            }
                           
                           
                           
                               setIndicateurY2array(arrayMembre)
                          }

            }
            if (cl_Membre_Select_fin.length != 0) {
          
              masterObjectX = cl_Membre_Select_fin //ml_mb
            } else {
              masterObjectX = MasterObj_Data_selection.masterObjectX
            }
            membersList = [] ///vide
            selectedMember = {}///vide
            break;
        }
      }
        break;
      default:

        break;
    }
    if(QueryApi=="iotinner"){
    if (Page.page != "") {
      setPage(Page.page)
      if (Page.page == "ML") {
        if (ml_Membre_Select_fin.length != 0) {
          setListePageMl(ml_Membre_Select_fin)

        } else {
          setListePageMl(membersList)
        }
      }
      else if (Page.page == "CL") {
        if (cl_Membre_Select_fin.length != 0) {
          setListePageCl(cl_Membre_Select_fin)

        } else {
          setListePageCl(membersList)
        }

      } else if (Page.page == "TL") {
        if (tl_membres.length != 0) {

          setListePageTl(tl_membres)
        } else {
          setListePageTl(membersList)
        }

      }
      else {
        ////console.log("vide")
      }
    } else {
      ////console.log('page vide')
      setListePageTl([])
      setListePageCl([])
      setListePageMl([])
    }}
    else if (QueryApi=="cluster"){
      if(PageCluster.length!=0){
      Page.page= PageCluster
    }else 
    if(Page.page!=""){
    {setPageCluster(Page.page)}}
    }
    else {
      //console.log("vide")
    }

    setY2(undefined)
    if (Plots.length != 0) {
      for (var i = 0; i < Plots.length; i++) {
  
          //console.log("Plots[i].Y.Y2 bbbbbbb ",Plots[i].Y.Y2 )
          if (Plots[i].Y.Y2 != undefined) {
            //console.log("Plots[i].Y.Y2 llllllllll", Plots[i].Y.Y2)
            setY2(Plots[i].Y.Y2)
          } else {

            //console.log(" y2 undefined")
          }
  
  
      }
     
    } else {
      
      //console.log("vide")
    }
    //////////////////////////////
    ///////////////// json with data /////////
    ////////////////////////////////////
    //console.log("selectedMemberJsonML", selectedMemberJsonML)
    if(!liste_Plote&&!ListeMasterObject2)return
    //console.log("Page.pagePage.pagePage.pagePage.pagePage.page",Page)
    if (QueryApi=="cluster"){
      var objectjson = {
        "MasterObj_Code": MasterObj_Code,
        "row": row,
        "col": col,
        "spanRow": spanRow,
        "spanCol": spanCol,
        "QueryAPI": QueryAPI,
        "MasterObj_Data_selection": {
          "page": {page:Page.page, type: Page.type},
          "x": x,
          "y": y,
          "MasterObjPage": {
            "membersList": membersList,
            "selectedMember": selectedMember
          },
          "masterObjectX": masterObjectX,
          "masterObjectY": masterObjectY,
        },
        "MasterObj_Data_Query": {
          "ml": [],
          "cl": [],
          "retour": retour,
          "cross_tab": cross_tab
        },
        "MasterObj_Data_Mapping": MasterObj_Data_MappingJson
      }

    }else if (QueryApi=="iotinner"){

      var objectjson = {
        "MasterObj_Code": MasterObj_Code,
        "row": row,
        "col": col,
        "spanRow": spanRow,
        "spanCol": spanCol,
        "QueryAPI": QueryAPI,
        "MasterObj_Data_selection": {
          "page": {page:Page.page, type: Page.type},
          "x": x,
          "y": y,
          "MasterObjPage": {
            "membersList": membersList,
            "selectedMember": selectedMember
          },
          "masterObjectX": masterObjectX,
          "masterObjectY": masterObjectY,
        },
        "MasterObj_Data_Query": {
          "ml": [],
          "cl": [],
          "tl":[],
          "retour": retour,
          "cross_tab": cross_tab
        },
        "MasterObj_Data_Mapping": MasterObj_Data_MappingJson
      }

    }


    setObjectjson(objectjson);

    //  setPlot(objectjson)
    //console.log("-------------variable----objectjson", JSON.stringify(objectjson))
    //console.log("-----------------tl_membres------------------------>", tl_membres)

  }, [ListeMasterObject,extraPlotConfig, ListeMasterObject2,nameImage,QueryApi,ValidateObject, CL_Membre, ML_Membre,cl_Membre_Select_fin,ml_Membre_Select_fin, tl_membres, selectedMemberJsonML, selectedMemberJsonCL,liste_Plote,PageCluster,Y2]) 
  useEffect(() => {
    //console.log("---------------------------->>>",Y2,"<<<<----------------------------------")

  },[Y2])
  useEffect(() => {
    //console.log("---------------------------->>>",ValidateObject,"<<<<----------------------------------")

  },[ValidateObject])
  useEffect(() => {
    if (!ListeMasterObject2.length)return
  var  cross_tab = ""
  cross_tab =ListeMasterObject2[0].MasterObj_Data_Query.cross_tab
  var  masterObjectY = []
  masterObjectY =ListeMasterObject2[0].MasterObj_Data_selection.masterObjectY
  var Y_Array=[]
    switch (cross_tab) {
      case "cross_tab_cl":
        //console.log("cross_tab_cl")
        if (cl_Membre_Select_fin.length!=0){
          for (var i = 0; i < cl_Membre_Select_fin.length; i++) {
            var Le_Compteur = cl_Membre_Select_fin[i].Le_Compteur
            Y_Array.push(Le_Compteur)
          }
  
       
        }else {
   
          for (var i = 0; i < masterObjectY.length; i++) {
            Y_Array.push(masterObjectY[i].Le_Compteur)
          
          }
  
        }
        setArray_Y(Y_Array)
        //console.log("Y_Array",Y_Array)
        break;
        case "cross_tab_ml":
          //console.log("cross_tab_ml")
          if (ml_Membre_Select_fin.length!=0){
            for (var i = 0; i < ml_Membre_Select_fin.length; i++) {
              var m_name = ml_Membre_Select_fin[i].m_name
              Y_Array.push(m_name)
            }
    
         
          }else {
     
            for (var i = 0; i < masterObjectY.length; i++) {
              Y_Array.push(masterObjectY[i].m_name)
            
            }
    
          }
          setArray_Y(Y_Array)
          //console.log("Y_Array",Y_Array)
          break;
      default://console.log("videe")
        break;
    }
  }, [ListeMasterObject2,cl_Membre_Select_fin,ml_Membre_Select_fin])
  useEffect(() => {
    if (!Objectjson) return
    
    console.log('Objectjson---------------------------------------------->', Objectjson)
  }, [Objectjson])
  useEffect(() => {
    //console.log("++++++++++listePageMl++++++", listePageMl)
  }, [listePageMl])
  useEffect(() => {
    //console.log("++++++++++array_Y++++++", array_Y)
  }, [array_Y])
  useEffect(() => {
    ////console.log("QueryApi", QueryApi)
    if (QueryApi === "cluster") {
      setTlDisabled(true)
      setTlDisabled2(true)
      ////console.log('disabled', TlDisabled2)
      // setTl_Var_Fix("")
      $('#blockIotinner').hide();
      $('#blockCluster').show();
      if (FilterListe === "cross_tab_cl") {
        $('#block_Ml_Liste_cluster').hide();
        $('#block_Cl_Liste_cluster').show();
      } if (FilterListe === "cross_tab_ml") {
        $('#block_Cl_Liste_cluster').hide();
        $('#block_Ml_Liste_cluster').show();
      }
    } else {
      if (Tl_Var_Fix === "Variable") {
        setTlDisabled2(false)

        ////console.log('notdisabled', TlDisabled2)
        //  setTl_Var_Fix("Variable")
      }
      $('#blockIotinner').show();
      $('#blockCluster').hide();
      if (FilterListe === "cross_tab_cl") {
        $('#block_Ml_Liste_Iotinner').hide();
        $('#block_Cl_Liste_Iotinner').show();
      } if (FilterListe === "cross_tab_ml") {
        $('#block_Cl_Liste_Iotinner').hide();
        $('#block_Ml_Liste_Iotinner').show();
      }
    }

    if (!FilterListe && !QueryApi) return
    ////console.log("FilterListe", FilterListe)
    axios.post(window.apiUrl + "filter/",

      {
        tablename: "MasterObject",
        identifier: dateDMY + uuid(),
        fields: "QueryAPI;cross_tab;synoptic",
        content: QueryApi + ';' + FilterListe + ';false',
        dataselect: "MasterObj_Code;MasterObj_Name;Image",
        dist: "*;dist",
        orderby: "asc",
      }

    )
      .then(
        (result) => {
          if (result.data !== null) {
            ////console.log("QueryAPI;cross_tab;synoptic", result.data)

            setFilterMasterObj(result.data)
            //  //console.log("ListeMasterObject", filterMasterObj)
          }
          else {
            //console.log("ListeMasterObject vide ")

          }

        }

      )

  }, [QueryApi, FilterListe, TlDisabled, TlDisabled2, selectedMemberJsonML, selectedMemberJsonCL])
  const handleChangeQueryApi = (e) => {
    const value = e.target.value;
    setQueryApi(value);
    setMasterObj_Name("")
  };
  const handleChangeFilterListe = (e) => {
    const value = e.target.value;
    setFilterListe(value);
    setMasterObj_Name("")
  };
  const handleChangeSelectMemberPage = (e) => {
    const selectedPageName = e.target.value;
    if (typeof selectedPageName == "undefined") return
    let selected
    if (page == "CL")
      selected = listePageCl.find((value, i) => value.Le_Compteur == selectedPageName)
    else
      selected = listePageMl.find((value, i) => value.m_name == selectedPageName)

    setSelectMemberPage(selectedPageName);
    if (selected.m_name)
      setSelectedMemberJsonML(selected)
    else
      setSelectedMemberJsonCL(selected)
  };
  function AjouterMl() {
    console.log(Name_Ml)
    if (Name_Ml != "" && ml_Membre_Select_fin.length != 0 ) {
      setmodal2(!modal2);
      setML_Name(Name_Ml);   
  }else {
    Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 350,
          title: 'En peut sélectionner une liste'
        })
  }
    setListeArray_Y2([])
    setListeArray_Y1([])
 
  }
  function AjouterCl() {
    console.log(Name_Cl)
    if (Name_Cl != "" && cl_Membre_Select_fin.length != 0 ) {
      setmodal3(!modal3);
      setCompteurListI_Name(Name_Cl);   
  }
    else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'En peut sélectionner une liste'
      })
    }
    setListeArray_Y2([])
    setListeArray_Y1([])
   
  }
  function AjouterTl() {
    if (tl_membres.length != 0) {
      setmodal1(!modal1);
      //console.log("+++++++++++++++++++TL_Membre+++++++++++++++", tl_membres)
      //console.log("++++++++++++++++++++Objectjson++++++++++++++", Objectjson)
    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'En peut sélectionner une liste'
      })
    }
    setListeArray_Y2([])
    setListeArray_Y1([])
  }
  function Ajouter_Y() {
    const elem=document.querySelector(`#selectWestania`)
    if (elem){
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex=-1
    }
    //console.log("ajouter y1")
    const array = []
    if (!select_Y_Liste.length) return
    if (listeArray_Y1.length == 0) {
      array.push(select_Y_Liste)
      setListeArray_Y1(array)
    }
    else {
      if(!listeArray_Y1)return
        if (listeArray_Y1[0]!=select_Y_Liste){
          array.push(select_Y_Liste)
          setListeArray_Y1(array.concat(listeArray_Y1))
        }else {
          //console.log("vvvvvvvvviiiiiiiiidddddeeeeeee",select_Y_Liste,listeArray_Y1[0])
        }
      
 
    }

    for (var i = 0; i < array_Y.length; i++) {

      if (array_Y[i] === array[0]) {

        array_Y.splice(i, 1);
      }

    }
    setSelect_Y_Liste("")
  }
  function Ajouter_Y2() {
    const elem=document.querySelector(`#selectWestania`)
    if (elem){
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex=-1
    }
    //console.log("ajouter y2")
    const array = []
    if (!select_Y_Liste.length) return
    if (listeArray_Y2.length == 0) {
      array.push(select_Y_Liste)
      setListeArray_Y2(array)
    }
    else {
      if(!listeArray_Y2)return
        if (listeArray_Y2[0]!=select_Y_Liste){
          array.push(select_Y_Liste)
          setListeArray_Y2(array.concat(listeArray_Y2))
        }else {
          //console.log("vvvvvvvvviiiiiiiiidddddeeeeeee")
        }
      
 
    }
    for (var i = 0; i < array_Y.length; i++) {

      if (array_Y[i] === array[0]) {

        array_Y.splice(i, 1);
      }

    }
    setSelect_Y_Liste("")
  }
  function Ajouter_Y_delete(){
    const elem=document.querySelector(`#select1`)
    if (elem){
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex=-1
    }
    //console.log("delete y1")
    const array = []
    if (!select_Y1_Liste.length) return
    if (array_Y.length == 0) {
      array.push(select_Y1_Liste)
      setArray_Y(array)
    }
    else {
      if(!array_Y)return
        if (array_Y[0]!=select_Y1_Liste){
          array.push(select_Y1_Liste)
          setArray_Y(array.concat(array_Y))
        }else {
          //console.log("vvvvvvvvviiiiiiiiidddddeeeeeee",select_Y1_Liste,array_Y[0])
        }
      
 
    }
    for (var i = 0; i < listeArray_Y1.length; i++) {

      if (listeArray_Y1[i] === array[0]) {

        listeArray_Y1.splice(i, 1);
      }

    }
    setSelect_Y1_Liste("")
  }
  function Ajouter_Y2_delete(){
    const elem=document.querySelector(`#select2`)
    if (elem){
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex=-1
    }
    //console.log("ajouter y2")
    const array = []
    if (!select_Y2_Liste.length) return
    if (array_Y.length == 0) {
      array.push(select_Y2_Liste)
      setArray_Y(array)
    }
    else {
      if(!array_Y)return
        if (array_Y[0]!=select_Y2_Liste){
          array.push(select_Y2_Liste)
          setArray_Y(array.concat(array_Y))
        }else {
          //console.log("vvvvvvvvviiiiiiiiidddddeeeeeee",select_Y2_Liste,array_Y[0])
        }
      
 
    }
    for (var i = 0; i < listeArray_Y2.length; i++) {

      if (listeArray_Y2[i] === array[0]) {

        listeArray_Y2.splice(i, 1);
      }

    }
    setSelect_Y2_Liste("")
  }
  const handleChangeSelect_Y = (e) => {
    const value = e.target.value;

    setSelect_Y_Liste(value)
    //console.log("value", value)
  }
  const handleChangeSelect_Y1 = (e) => {
    const value = e.target.value;

    setSelect_Y1_Liste(value)
    //console.log("value", value)
  }
  const handleChangeSelect_Y2 = (e) => {
    const value = e.target.value;

    setSelect_Y2_Liste(value)
    //console.log("value", value)
  }
  useEffect(() => {
    ////console.log("++++++++++RenderPlot++++++", renderPlot)
  }, [renderPlot])
  useEffect(() => {
    ////console.log("++++++++++Y2++++++", Y2)
  }, [Y2])
  useEffect(() => {
    //console.log("++++++++++listeArray_Y1++++++", listeArray_Y1)
    //console.log("++++++++++listeArray_Y2++++++", listeArray_Y2)
    if (!ListeMasterObject2.length)return
   var function_type=""
 //   var extraPlotConfig={}
   var X=null
   var Y=null
   var PlotsJSON=[]
   var MasterObj_Data_MappingJson=null
   var Plots= []
   var margin=null
   var legend=null
   var xaxis=null
   var yaxis1=null
   var yaxis2=null
   var extraLayoutConfig=null
  var x_data= ListeMasterObject2[0].MasterObj_Data_selection.x
//console.log("--------------------------------------------------------------------------------------------->",x_data)

   Plots=ListeMasterObject2[0].MasterObj_Data_Mapping.Plots
   margin=ListeMasterObject2[0].MasterObj_Data_Mapping.margin
   legend=ListeMasterObject2[0].MasterObj_Data_Mapping.legend
   xaxis=ListeMasterObject2[0].MasterObj_Data_Mapping.xaxis
   yaxis1=ListeMasterObject2[0].MasterObj_Data_Mapping.yaxis1
   yaxis2=ListeMasterObject2[0].MasterObj_Data_Mapping.yaxis2
   extraLayoutConfig=ListeMasterObject2[0].MasterObj_Data_Mapping.extraLayoutConfig
   console.log("---------------extraLayoutConfig----------------->")
   console.log('nameImage',nameImage)
   if(nameImage!="Indicator"){
   if (x_data=="CL" ){
  
    xaxis.title.text=CompteurListI_Name
  
  }else if (x_data=="ML")
  {
    xaxis.title.text=ML_Name
  }else if (x_data=="TL"){
  
    xaxis.title.text=tl_name
  } else {
  
  //  xaxis.title.text= xaxis.title.text
  }
}else 
{
  console.log('nameImage',nameImage)
}
  
 // console.log("--------------------------------------------------------------------------------------------->",xaxis.title.text)
  var cross_tab =""
  cross_tab =ListeMasterObject2[0].MasterObj_Data_Query.cross_tab
  var  array =[]
  var Y_json ={}
    //console.log("Plots",Plots)
    for (var i = 0; i < Plots.length; i++) {
      function_type = Plots[i].function_type
//      extraPlotConfig = Plots[i].extraPlotConfig
      X = Plots[i].X
      if (Plots[i].Y.Y2 != undefined && Y2!=undefined && nameImage!="Indicator" ){ 
      Plots[i].Y={"Y1":listeArray_Y1,"Y2":listeArray_Y2}
      Y= Plots[i].Y
      yaxis2.title.text= Y2_name;
      yaxis1.title.text= Y1_name;  
      }
   
    else  if (cl_Membre_Select_fin.length!=0 && Plots[i].Y.Y2==undefined && cross_tab=="cross_tab_cl"){
 
        for (var i = 0; i < cl_Membre_Select_fin.length; i++) {
          var Le_Compteur = cl_Membre_Select_fin[i].Le_Compteur
       
          array.push(Le_Compteur)
          Y_json={"Y1":array}
        }
        //console.log ('Y_json Cl',Y_json)
        Y= Y_json
        if (Y1_name!=""){
          yaxis1.title.text= Y1_name;  
        }else {
          yaxis1.title.text= CompteurListI_Name;  
        }
      }
    else  if (ml_Membre_Select_fin.length!=0 && Plots[i].Y.Y2==undefined  && cross_tab=="cross_tab_ml"){
 
        for (var i = 0; i < ml_Membre_Select_fin.length; i++) {
          var m_name = ml_Membre_Select_fin[i].m_name
          array.push(m_name)
          Y_json={"Y1":array}
         
        }
        //console.log ('Y_json Ml',Y_json)
        Y= Y_json
    if (nameImage!="Indicator")
        if (Y1_name!="" ){
          yaxis1.title.text= Y1_name;  
        }else {
          yaxis1.title.text= ML_Name;  
        }

      }
      else if (nameImage=="Indicator"){
       if ((cl_Membre_Select_fin.length!=0&& cross_tab=="cross_tab_cl")||(y1_Indicateur_Array.length!=0&&y2_Indicateur_Array.length!=0)){
        Plots[i].Y={"Y1":y1_Indicateur_Array,"Y2":y2_Indicateur_Array}
        Y= Plots[i].Y
       }else if ((ml_Membre_Select_fin.length!=0&& cross_tab=="cross_tab_ml")||(y1_Indicateur_Array.length!=0&&y2_Indicateur_Array.length!=0)){
        Plots[i].Y={"Y1":y1_Indicateur_Array,"Y2":y2_Indicateur_Array}
        Y= Plots[i].Y
       }else if ( Plots[i].Y.Y2=undefined &&(ml_Membre_Select_fin.length==0||cl_Membre_Select_fin.length==0)){
        Plots[i].Y={"Y1": Plots[i].Y.Y1}
        Y= Plots[i].Y
       }
       else {
        Plots[i].Y={"Y1": Plots[i].Y.Y1,"Y2": Plots[i].Y.Y2}
        Y= Plots[i].Y
       }
      }
    else  {
        array =[]
        Y_json ={}
        Y=null


        //console.log(!Plots[i].Y)
     if (!Plots[i].Y)return
        //console.log("=======================================")
        //console.log(Y)
        Y=Plots[i].Y
 
        //console.log("=======================================>  Y=Plots[i].Y" , Y=Plots[i].Y)
      }

      PlotsJSON.push({
            "extraPlotConfig":extraPlotConfig,
            "function_type": function_type,
            "X": X,
            "Y": Y
          })
     
   // setListe_Plote(PlotsJSON)

   }
    //console.log("test",function_type,X,Y,Y2)
    
    if(extraLayoutConfig==undefined){
      extraLayoutConfig={}
    }


    if(nameImage!="Indicator"){
    if(yaxis2!=undefined){
      MasterObj_Data_MappingJson= {
        "margin": margin,
        "legend": legend,
        "xaxis": {
          "title": {
            "font": xaxis.title.font,
            "text":  xaxis.title.text,
            "standoff": xaxis.title.standoff,
            "automargin": xaxis.title.automargin
        },
        "domain":xaxis.domain,
        "tickfont": xaxis.tickfont,
        "autorange": xaxis.autorange,
        "linecolor": xaxis.linecolor,
        "linewidth": xaxis.linewidth
        },
        "yaxis1": {
          "title": {
            "font": yaxis1.title.font,
            "text":  yaxis1.title.text,
            "standoff": yaxis1.title.standoff,
            "automargin": yaxis1.title.automargin
        },
        "domain":yaxis1.domain,
        "tickfont": yaxis1.tickfont,
        "autorange": yaxis1.autorange,
        "linecolor": yaxis1.linecolor,
        "linewidth": yaxis1.linewidth
        },
        "yaxis2": {
          "title": {
            "font": yaxis2.title.font,
            "text":  yaxis2.title.text,
            "standoff": yaxis2.title.standoff,
            "automargin": yaxis2.title.automargin
        },
        "domain":yaxis2.domain,
        "tickfont": yaxis2.tickfont,
        "autorange": yaxis2.autorange,
        "linecolor": yaxis2.linecolor,
        "linewidth": yaxis2.linewidth
        },
        "Plots": PlotsJSON,
        "extraLayoutConfig": extraLayoutConfig,

      }
    }else
    {
      MasterObj_Data_MappingJson= {
        "margin": margin,
        "legend": legend,
       
        "xaxis": {
          "title": {
            "font": xaxis.title.font,
            "text": xaxis.title.text,
            "standoff": xaxis.title.standoff,
            "automargin": xaxis.title.automargin
        },
        "domain":xaxis.domain,
        "tickfont": xaxis.tickfont,
        "autorange": xaxis.autorange,
        "linecolor": xaxis.linecolor,
        "linewidth": xaxis.linewidth
        },
        "yaxis1": {
          "title": {
            "font": yaxis1.title.font,
            "text":  yaxis1.title.text,
            "standoff": yaxis1.title.standoff,
            "automargin": yaxis1.title.automargin
        },
        "domain":yaxis1.domain,
        "tickfont": yaxis1.tickfont,
        "autorange": yaxis1.autorange,
        "linecolor": yaxis1.linecolor,
        "linewidth": yaxis1.linewidth
        },
        "Plots": PlotsJSON,
        "extraLayoutConfig": extraLayoutConfig,

      }
    }
  }else {
    MasterObj_Data_MappingJson= {
      "margin": margin,
      "legend": legend,
      "Plots": PlotsJSON,
      "extraLayoutConfig": extraLayoutConfig,

    }

  }
  console.log("-----------MasterObj_Data_MappingJson------------->",MasterObj_Data_MappingJson)
var variable = null 
variable = removeUndefined(MasterObj_Data_MappingJson)
console.log('variable',variable)
    setMasterObj_Data_MappingJson(variable)

   //console.log("PlotsJSON",PlotsJSON)
   
  }, [listeArray_Y1,listeArray_Y2,y2_Indicateur_Array,y1_Indicateur_Array,ListeMasterObject2,ML_Membre,extraPlotConfig,CL_Membre,Y2,ml_Membre_Select_fin,cl_Membre_Select_fin,Y2_name,Name_Tl,Y1_name,tl_name,ML_Name,CompteurListI_Name,Name_Ml,Name_Cl])
  useEffect(() => {
    if (!Objectjson) return
    if (!selectedMemberJsonML) return
    ////console.log("++++++++++SelectedMemberJsonML++++++", selectedMemberJsonML)
    ////console.log('Objectjson', Objectjson)
  }, [selectedMemberJsonML])
  useEffect(() => {
    if (!Objectjson) return
    if (!selectedMemberJsonCL) return
    ////console.log("++++++++++SelectedMemberJsonCL++++++", selectedMemberJsonCL)
    ////console.log('Objectjson', Objectjson)
  }, [selectedMemberJsonCL])
  useEffect(() => {
    //console.log("++++++++++liste_Plote++++++", liste_Plote)
  
  }, [liste_Plote])


  const scrollContainerStyle = { width: "100%", maxHeight: "200px" };
  const scrollContainerStyle2 = { width: "100%", maxHeight: "630px" };

 function MesuresListes(){
    window.open("/Rapporteur/MesuresListes")
}
function CL(){
    window.open("/Rapporteur/Compteur_Listes")
}
function tl(){
    window.open("/Rapporteur/TimeIntelligence")
}

function extraPlotConfigFin(extraPlotConfig){
  setExtraPlotConfig(extraPlotConfig)
 // console.log("-----extraPlotConfig---------extraPlotConfig------------",extraPlotConfig)
}

useEffect(()=>{
var  arrayMembre =[]
  if (cl_Membre_Select_fin.length!=0 && cross_tab=="cross_tab_cl"){
    setIndicateurY2array()
    for (var i=0;i<cl_Membre_Select_fin.length;i++){

      arrayMembre.push(cl_Membre_Select_fin[i].Le_Compteur)
     }
    setIndicateurY2array(arrayMembre)


   }else if (ml_Membre_Select_fin.length && cross_tab=="cross_tab_ml"){
    setIndicateurY2array()

 for (var i=0;i<ml_Membre_Select_fin.length;i++){
 
  arrayMembre.push(ml_Membre_Select_fin[i].m_name)
 }



    setIndicateurY2array(arrayMembre)
   }else {
     console.log("vide")
   
   }
   
  },[cl_Membre_Select_fin,ml_Membre_Select_fin,cross_tab])


function Y2_Indicateur_fin(Y2,Y1){
  console.log("master Object ->IndicateurY2array->membre ",Y2)
  console.log("master Object ->IndicateurY2array->membre ",Y1)
  setY2_Indicateur_Array(Y2)
  setY1_Indicateur_Array(Y1)
}
  return <MDBContainer>
    <MDBBtn onClick={toggle} style={{width:"10%",height:"47px"}} outline  ><MDBIcon icon="chart-line" size="2x" style={{marginLeft:"-11px"}}/> </MDBBtn>
    <MDBModal isOpen={modal} toggle={toggle} centered size="lg">
      <MDBModalHeader toggle={toggle}>Sélectionnez </MDBModalHeader>
      <MDBModalBody className="scrollbar scrollbar-primary  mx-auto " style={scrollContainerStyle2}>
        <MDBTabContent activeItem={items["default"]}>
          <MDBTabPane tabId="1">
            <MDBRow>

              <MDBCol size="12">
                <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

                  <legend style={{ width: "60px", color: "#51545791", fontSize: "20px", textAlign: "center" }} >Filtre</legend>


                  <MDBRow style={{ marginTop: "-15px" }}>
                    <MDBCol size="6">


                      <label htmlFor="defaultFormLoginEmailEx" className="grey-text"  >
                Actualisation
                      </label>
                      <select className="browser-default custom-select" name="QueryApi" value={QueryApi} onChange={handleChangeQueryApi}>

                        <option value="iotinner">Variations dans les temps</option>
                        <option value="cluster">Valeur instantanée</option>
                      </select>

                    </MDBCol>
                    <MDBCol size="6">
                      <label htmlFor="defaultFormLoginEmailEx" className="grey-text"  >
                      Tabulation
                      </label>
                      <select className="browser-default custom-select" name="FilterListe" value={FilterListe} onChange={handleChangeFilterListe}>
                        <option value="cross_tab_ml">Mesures Listes</option>
                        <option value="cross_tab_cl">Compteur Listes</option>
                      </select>

                    </MDBCol>
                  </MDBRow>
                </fieldset>
              </MDBCol>

            </MDBRow>
            <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>
              <legend style={{ width: "240px", color: "#51545791", fontSize: "20px", textAlign: "center" }}>Sélectionner un objet  <span className='text-danger' style={{ fontSize: '12px' }}>*</span></legend>
              <div >
                <MDBRow  className="scrollbar scrollbar-primary  mx-auto " style={scrollContainerStyle} >

                  {filterMasterObj.map(liste => <MDBCol size="3">
                    <MDBCard style={{ width: "110%", marginLeft: "-10px", marginTop: "10px",height: "190px" }} onClick={(e) => handleObjetClick(e, liste.MasterObj_Name,liste.Image)}>
                      <MDBCardImage className="img-fluid" style={{ height: "110px" }} src={`/img/${liste.Image}.PNG`} waves />
                      <MDBCardBody>
                        <MDBCardTitle style={{ fontSize: "13px" }} >{liste.MasterObj_Name}</MDBCardTitle>
                        <MDBCardText>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>)}
                </MDBRow>
              </div>
            </fieldset>

            {MasterObj_Name != "" ? (
              <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

                <legend style={{ width: "352px", color: "#51545791", fontSize: "20px", textAlign: "center" }} >Sélectionner les données globales</legend>

                <MDBRow style={{ marginTop: "-30px" }}>
                  <MDBCol size="12">
                    <br />
                    <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>



                      <MDBRow >
                        <MDBCol size="4" >
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={ClDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={toggle3}>
                            Compteurs Listes
                          </MDBBtn>
                        </MDBCol >
                        <MDBCol size="8" style={{ marginTop: "14px" }}>
                          <b style={{ fontSize: "16px" }} >{CompteurListI_Name}</b>
                        </MDBCol >
                        <MDBCol size="4"  >
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={MlDisabled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={toggle2}>
                            Mesures Listes
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol size="8" style={{ marginTop: "14px" }} >
                          <b style={{ fontSize: "16px" }} >{ML_Name}</b>
                        </MDBCol>
                        <MDBCol size="4" >
                          <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={TlDisabled2} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={toggle1}>
                            Time Intelligence
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol size="8" style={{ marginTop: "14px" }} >
                          <b style={{ fontSize: "16px" }} >{tl_name}</b>
                        </MDBCol>
                      </MDBRow>
                    </fieldset>
                  </MDBCol>
                </MDBRow>

                {QueryApi == "iotinner" ? (<MDBRow style={{ marginTop: "-10px" }}>     <MDBCol size="12">

                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >
                    Page
                  </label>

                  <select size='1' className="browser-default custom-select" name="selectMemberPage" value={selectMemberPage} onChange={handleChangeSelectMemberPage}>                
                    {page == "CL" ? listePageCl.map(liste =>
                      <option key={liste.Code_Compteur} id={liste.Code_Compteur} >{liste.Le_Compteur}</option>
                    ) : page == "ML" ? listePageMl.map(liste =>
                      <option key={liste.m_code} id={liste.m_code} >{liste.m_name}</option>)
                      : null}
                  </select>
                </MDBCol></MDBRow>) : 
                QueryApi == "cluster"?(<MDBRow style={{ marginTop: "-10px" }}>     <MDBCol size="12">

                <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >
                  Page cluster
                </label>
                <input type="text" id="1" id="defaultFormLoginEmailEx" name="PageCluster"  value={PageCluster} onChange={e => setPageCluster(e.target.value)} className="form-control" required />
               
              </MDBCol></MDBRow>): null}
              
              
              
                {Y2 != undefined && nameImage != "Indicator"  ? 

                  <MDBRow style={{ marginTop: "8px" }}>

                    <MDBCol size="3" style={{ marginLeft: "4%" }}>
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >
                        Y1
                      </label>
                <input type="text" id="1" id="defaultFormLoginEmailEx"  name="Y1_name"  autoComplete="off" placeholder="Nom Y1"  value={Y1_name} onChange={e => setY1_name(e.target.value)} className="form-control" required style={{marginLeft: "-18%",width: "130%"}}/>
               
                    <select  id="select2" size='5' className="browser-default custom-select" name="select_Y1_Liste"  value={select_Y1_Liste}  onChange={handleChangeSelect_Y1} style={{marginLeft: "-18%",width: "130%"}} >
                      <option style={{display:"none"}} selected value> -- select an option -- </option>

                        {listeArray_Y1.length != 0 ? listeArray_Y1.map(liste => <option>{liste}</option>
                        ) : null}
                      </select>
                    </MDBCol>
                    <MDBCol size="1" style={{ marginTop: '78px' }} >
                      <MDBBtn className=' button_round ' id="btnuser" onClick={Ajouter_Y} ><MDBIcon icon="angle-left" size="2x" /></MDBBtn>
                      <MDBBtn style={{ marginTop: '20px' }} className='  button_round ' id="btnuser" onClick={Ajouter_Y_delete} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
                    </MDBCol>
                    <MDBCol size="3" style={{ marginLeft: "4px" }}>
                      <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >
                        Listes
                      </label>

                      <select id="selectWestania" size='5' className="browser-default custom-select" name="select_Y_Liste" value={select_Y_Liste} onChange={handleChangeSelect_Y} style={{ height: "17vh",
    width: "130%",
    marginLeft: "-25px",
}}>
                                   {/* <option></option> */}
                                   <option style={{display:"none"}} selected value> -- select an option -- </option>
                        {array_Y.length != 0 ? array_Y.map((liste,i) =>
                        
                          <option key={i}>{liste}</option>
                        ) : null}
                      </select>
                    </MDBCol>
                    <MDBCol size="1" style={{ marginTop: '78px' }}>
                      <MDBBtn className=' button_round ' id="btnuser" onClick={Ajouter_Y2} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
                      <MDBBtn style={{ marginTop: '20px' }} className=' button_round ' id="btnuser" onClick={Ajouter_Y2_delete} ><MDBIcon icon="angle-left" size="2x" /></MDBBtn>
                    
                    </MDBCol>
                    <MDBCol size="3">
                      <label  htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >
                        Y2
                      </label>
                      <input type="text" id="1" id="defaultFormLoginEmailEx"  autoComplete="off" placeholder="Nom Y2"  name="Y2_name" value={Y2_name} onChange={e => setY2_name(e.target.value)} className="form-control" required style={{marginLeft: "-14%",width: "130%"}}/>

                      <select  id="select2" size='5' className="browser-default custom-select" name="select_Y2_Liste" value={select_Y2_Liste}  onChange={handleChangeSelect_Y2}  style={{marginLeft: "-14%",marginTop: "6px",width: "130%"}}>
                      <option style={{display:"none"}} selected value> -- select an option -- </option>

                        {listeArray_Y2.length != 0 ? listeArray_Y2.map(liste => <option>{liste}</option>
                        ) : null}
                      </select>
                    </MDBCol>
                  </MDBRow> : null}

                  <OptionExtraPlotConfig function_type={nameImage} extraPlotConfigFin={extraPlotConfigFin} IndicateurY2array={indicateurY2array} Y2_Indicateur_fin={Y2_Indicateur_fin}/>

              </fieldset>

            ) : null}

          </MDBTabPane>
          <MDBTabPane tabId="2">
            <div>

              <MDBCard style={{ width: "100%", height: "450px", marginTop: "10px" }}>
                <MDBCardBody style={{ height: "450px", width: "100%" }}>
                  {plotName && <MDBCardTitle>{plotName}</MDBCardTitle>}
                  <MDBCardText style={{ margin: "3%" }}>


                    {renderPlot ? <DrawPlot
                      style={{ textAlign: "center" }}
                      id={id}
                      height="350px"
                      width="92%"
                      componentData={{ obj: Objectjson }}

                      rc={rc}
                    /> :
                      <></>
                    }
                  </MDBCardText>

                </MDBCardBody>
                {/* <LayoutGenerator style={{height:"100%",width:"100%"}} config={c} editor={false} /> */}
              </MDBCard>
            </div>
            <br />
          </MDBTabPane>
        </MDBTabContent>
      </MDBModalBody>
      <MDBNav className="nav-tabs mt-5" /*color='indigo'*/  style={{ backgroundColor: "#e0e0e0" }} >
        <MDBNavItem style={{width:"50%",textAlign: "center"}}>
          <MDBNavLink link to="#" active={items["default"] === "1"} onClick={(e) => togglePills("default", "1", e)} style={{color:"#000"}}>
            Selectionnez
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem style={{width:"50%",textAlign: "center"}}>
          <MDBNavLink link to="#" active={items["default"] === "2"} onClick={(e) => togglePills("default", "2", e)} style={{color:"#000"}}>
            Vue
          </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBModalFooter>
{ValidateAjouterObject==true?(
        <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={() => AjouterObjetClick()}><MDBIcon icon="plus" className="ml-1" />Ajouter</MDBBtn>

):null}
      </MDBModalFooter>
    </MDBModal>

    <div>
      {/**    Mesures Listes Modale */}
      <MDBModal isOpen={modal2} toggle={toggle2} size="lg" centered>

       <ModalML toggle2={toggle2} ML_Tags_Function={ML_Tags_Function} Code_Ml={Code_Ml} Name_Ml={Name_Ml}  modelMl={modelMl}  Listes_Ml={ListesMl} handleListeMLClick={handleMlClick} ML_Membre={ML_Membre} />


        <MDBNav tabs className="nav-tabs mt-5" style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem style={{width:"100%",textAlign: "center"}}>
            <MDBNavLink link  onClick={()=>MesuresListes()} style={{color:"#000"}}>
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>


        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterMl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      {/**    Compteurs Listes Modale */}
      <MDBModal isOpen={modal3} toggle={toggle3}  size="lg" centered >
       
             <ModalCL toggle4={toggle3} CL_Tags_Function={CL_Tags_Function} modelCl={modelCl} Listes_Cl={ListesCl} handleListeCompteurClick={handleListeCompteurClick} CL_Membre={CL_Membre} />


        <MDBNav tabs className="nav-tabs mt-5"  style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem style={{width:"100%",textAlign: "center"}}>
            <MDBNavLink link  onClick={()=>CL()} style={{color:"#000"}}>
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterCl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      {/**    Time Intelligence Modale */}
      <MDBModal isOpen={modal1} toggle={toggle1} centered  size="lg">

        <ModalTL Listes_TL={ListesTL}  handleListeTLClick={handleTl_Click} toggle1={toggle1} />

        <MDBNav tabs className="nav-tabs mt-5" style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem style={{width:"100%",textAlign: "center"}}>
            <MDBNavLink link  onClick={()=>tl()} style={{color:"#000"}}>
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterTl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
   
  </MDBContainer>
}


export default PlotHandler
