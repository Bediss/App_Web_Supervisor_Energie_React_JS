

import React, { useEffect, useState } from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer,MDBAlert, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";
import "./calculatrice.css"
import axios from 'axios';
import axios1 from '../../../../axios.js'
import uuid from 'react-uuid';
import autosize from 'autosize';
import FilterV1 from '../../../../filterV1';
import Moment from 'moment';
import left from "../images/left-arrow (1).png"
import functionsymbol from "../images/function.png"
import sigmasymbol from "../images/sigma.png"
import Carousel from 'react-bootstrap/Carousel'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from "./component/Buttons.js"
import Fetching from '../../../../Fetching';
import Swal from 'sweetalert2';
import { set } from "react-hook-form";


const  Calculatrice =({valueincidentcallback,closemodel,datafromcasincidenttocalculatrice,componentcalculator,datamodifier})=>{
 
const[dataEnergyMeasureFilter,setdataEnergyMeasureFilter]=useState(false)
const[dataEnergyCompteurFilter,setdataEnergyCompteurFilter]=useState(false)

const [closemodal1,setclosemodal1]=useState(true)
const [equation,setequation]=useState([])
const [equationwithTilde,setequationwithTilde]=useState([])
const [Sys_equation,setSys_equation]=useState([])
const [Sys_equationwithTilde,setSys_equationwithTilde]=useState([])
const [TAGFormule,setTAGFormule]=useState("")
const [listvalequation,setlistvalequation]=useState("")
const [nbrparenthopen,setnbrparenthopen]=useState(0)
const [nbrparenthclose,setnbrparenthclose]=useState(0)
const [messageconseil,setmessageconseil]=useState("")
const [data,setdata]=useState("hiiiii nourhene")
const [modal,setmodal]=useState(true)
const [selectionStart,setselectionStart]=useState(false)
const [selectionEnd,setselectionEnd]=useState(false)
const [countright,setcountright]=useState(0)
const [itemlengthright,setitemlengthright]=useState(0)
const [countleft,setcountleft]=useState(0)
const [itemlengthleft,setitemlengthleft]=useState(0)

const [EnergyMeasure,setEnergyMeasure]=useState("")
const [NameEnergy,setNameEnergy]=useState("")

const [Sys_mesureid,setSys_mesureid]=useState("")
const [U_compteurselected,setU_compteurselected]=useState("")
const [Sys_compteurselected,setSys_compteurselected]=useState("")
const [Sys_compteurselectedwithoutid,setSys_compteurselectedwithoutid]=useState("")
const [IdCompteurIncidente,setIdCompteurIncidente]=useState("")
const[codecompteurobjective,setcodecompteurobjective]=useState('')
const[mesureidobjective,setmesureidobjective]=useState("")
const[compteurselected1,setcompteurselected1]=useState("")
const[U_incidentselectedwithoutLive,setU_incidentselectedwithoutLive]=useState("")
const[U_incidentselected,setU_incidentselected]=useState(datafromcasincidenttocalculatrice[0])
const[testvalue,settestvalue]=useState(datafromcasincidenttocalculatrice[3])
const[Sys_incidentselected,setSys_incidentselected]=useState(datafromcasincidenttocalculatrice[1])
const[Parsed_incidentselected,setParsed_incidentselected]=useState("")
const[Listmesureenergy,setListmesureenergy]=useState([])
const[MesureList,setMesureList]=useState([])
const[dataEnergyMeasure,setdataEnergyMeasure]=useState([])
const[dataEnergy,setdataEnergy]=useState([])
const[listcompteurglobal,setlistcompteurglobal]=useState([])
const[listEnergyMeasureNormalised,setlistEnergyMeasureNormalised]=useState([])
const[listNameEnergy,setlistNameEnergy]=useState([])
const[U_measurelabel,setU_measurelabel]=useState("")

    
useEffect(() => {
  if(datafromcasincidenttocalculatrice[4].length!=0){
    setTAGFormule("")
    setTAGFormule(datafromcasincidenttocalculatrice[4])
  }
}, [datafromcasincidenttocalculatrice[4]])

  useEffect(() => {
    setSys_equationwithTilde(Sys_equation)
    setequationwithTilde(equation)
    console.log("Sys_equation",Sys_equation)
    console.log("equation",equation)
  }, [equation,Sys_equation])

  useEffect(() => {

console.log("Sys_equationwithTilde",Sys_equationwithTilde)
  }, [equationwithTilde,Sys_equationwithTilde])

    function sendData () {
  
      //equationwithTilde = equation
      console.log("equationwithTilde  sendData",equationwithTilde)
      equation.map((item, j) => {
        while (typeof equationwithTilde[j] === 'number' && typeof equationwithTilde[j + 1] === 'number') {
     
            equationwithTilde[j] = Number(equationwithTilde[j] + "" + equationwithTilde[j + 1])
  
          equationwithTilde.splice(j + 1, 1);
        }
      }
      )
      equationwithTilde.map((item, j) => {
        while (typeof  equationwithTilde[j] === 'number') {
     
           equationwithTilde[j] = "#" +  equationwithTilde[j]
        }
      }
      )
      console.log("Sys_equationwithTilde  sendData" ,Sys_equationwithTilde)
     
      //Sys_equationwithTilde = Sys_equation

      Sys_equationwithTilde.map((item, j) => {
        while (typeof Sys_equationwithTilde[j] === 'number' && typeof Sys_equationwithTilde[j + 1] === 'number') {
          
          Sys_equationwithTilde[j] = Number(Sys_equationwithTilde[j] + "" + Sys_equationwithTilde[j + 1])
  
          Sys_equationwithTilde.splice(j + 1, 1);
        }
      }
      )
  
  
      console.log(Sys_equationwithTilde)
      Sys_equationwithTilde.map((item, j) => {
        while (typeof Sys_equationwithTilde[j] === 'number') {
    
          Sys_equationwithTilde[j] = "#" + Sys_equationwithTilde[j]
        }
      }
      )
console.log("++++++MesureList++++Calculatrice++++",MesureList)
      valueincidentcallback({
        0: U_incidentselected,//ELMAZERAA ELEC$LIVE INC
        1: equation.join(''),
        2: Sys_incidentselected,//CC1$28
        3: Sys_equation.join(''),
        4: Parsed_incidentselected,//E11$28
        5: codecompteurobjective,//OE11
        6: mesureidobjective,//1
        7: false,
        8: NameEnergy,//Electrique
        9: U_incidentselectedwithoutLive,//ELMAZERAA ELEC
        10: Listmesureenergy,
        11: MesureList,
  
        12: TAGFormule,
        13:  U_measurelabel, //KWHJ
  
        14:  equationwithTilde.join('~') + '~',
        15:  Sys_equationwithTilde.join('~') + '~',
        16: equationwithTilde.join('~'),
        17: dataEnergyMeasure,
        18:IdCompteurIncidente
      
       
      });
    }
   function callbackvaluecalcFcasincident (childData) {

         setU_incidentselected(childData[0])
         setSys_incidentselected(childData[1])

    }

    function callbackFunction (childData) {
  
      setlistvalequation(listvalequation + childData)
      if ( selectionStart == true) {

         setequation([childData, ...equation])
         setSys_equation( [childData, ...Sys_equation])
      } else {
        //add number
        setequation([...equation, childData])
        setSys_equation( [...Sys_equation, childData])
      }
      
    }
    function callbackOperatorFunction (childData){
        setlistvalequation(listvalequation + childData[0] + childData[1])

      if ( selectionStart == true) {
        setequation([childData[0], childData[1], equation])
        setSys_equation( [childData[0], childData[1], ...Sys_equation])
      } else {
        //add number
        setequation([...equation,childData[0], childData[1]])
        setSys_equation( [...Sys_equation,childData[0], childData[1]])
      }
    }
    function callbackoperator  (childData)  {
  
  
      var lastval = equation[equation.length - 1]
      if (equation[equation.length - 1] !== childData && equation.length != 0) {
  
        if (lastval == '+' || lastval == '-' || lastval == '*' || lastval == '/') {
            
            console.log("equation",equation)
            console.log("equation.length - 1",equation.length - 1)
             console.log("childData",childData)

             console.log("childData",childData)

             var equationVar = equation.map((item, j) => {
                                if (j === equation.length - 1) {
                                  return item = childData;
                                } else {
                                  return item;
                                }
                              });
                              console.log("-------",equationVar)
                              setequation(equationVar)

                              var Sys_equationVar = Sys_equation.map((item, j) => {
                                        console.log(Sys_equation.length - 1)
                                        if (j === Sys_equation.length - 1) {
                                          return item = childData;
                                        } else {
                                          return item;
                                        }
                                      });
                                      console.log("-Sys_equationVar------",Sys_equationVar)

                                      setSys_equation(Sys_equationVar)
        } else {
          if ( selectionStart == true) {
              setequation([childData, ...equation])
              setSys_equation([childData, ...Sys_equation])
          } else {

            setequation([ ...equation,childData])
            setSys_equation([...Sys_equation,childData])
       
        
  
          }
        }
  
      }
  

    }
    function clearequation ()  {
        setequation([])
        setSys_equation([])
    }
    function deleteequation  ()  {
        setequation(equation.slice(0, -1) )
        setSys_equation(Sys_equation.slice(0, -1))
    }
    function close  ()  {
      closemodel(false)
      setmodal(!modal)
      setclosemodal1(!modal)
    }
    // function onClick () {
    //   this.display.current.getAlert();
    // };
    // function onSelect (key) {
    //   this.setState({ selected: key });
    // }
  
    function  addfilscompteur () {
      if ( U_compteurselected == "") {
        setmessageconseil("Il faut d'abord selectionner un compteur ")
      } else if ( NameEnergy == "" &&  EnergyMeasure == "") {
        setmessageconseil("S'il vous plaît sélectionner un capteur énergie et mesure")
      } else if (EnergyMeasure == "") {
        setmessageconseil("S'il vous plait sélectionner une mesure")
      } else {
        setmessageconseil("")
        setequation([... equation, "Fils", "(",  U_compteurselected + '$' +  EnergyMeasure, ")"])
        setSys_equation([... Sys_equation, "F", "(", '@' +  Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ")"])
      }
    }
    function addincidentcompteur (){
      if ( U_incidentselected == "") {
        setmessageconseil("Il faut d'abord selectionner un incident ")
      } else {
        setequation([...equation, "Sigma", "(", U_incidentselected, ")"])
        setSys_equation([...Sys_equation, "I", "(", '€' + Sys_incidentselected, ")"])
      }
    }
    function addincident () {
      if ( U_compteurselected == "") {

        setmessageconseil("Il faut d'abord sélectionner un incident ")
  
      } else if ( NameEnergy == "") {
        setmessageconseil("S'il vous plaît sélectionner un capteur énergie ")
      } else {
        setmessageconseil("")
        var EMNcode = ''
        var incidentlive = ''
        var nameenergyinput =  NameEnergy
        var energylivelist = ''
        var mesureid = ''
        var outputprefix = ''
        var inputprefix = ''
        var listmesureenergy1 = []
        var mesurelistVar = []
        var mesurelabel = ''
         dataEnergy.forEach(function (arrayItem) {
          if (arrayItem.Name_Energy == nameenergyinput) {
            energylivelist = arrayItem.Energy_LIVEInc_List; //28
            var y = arrayItem.Code_Energy; //1
            EMNcode = energylivelist + '_' + y; //28_1
            outputprefix = arrayItem.OUTP_Prefix_Energy;
            inputprefix = arrayItem.INP_Prefix_Energy;
          }
  
        })
  
         dataEnergyMeasure.forEach(function (arrayItem) {
          if (arrayItem.EMNCode == EMNcode) {   
            var x = arrayItem.measure_Label; //INC
            var y = arrayItem.measure_View; //LIVE
            mesureid = arrayItem.measure_ID; //1
            incidentlive = x + '_' + y;
          }
        })
  
         dataEnergyMeasure.forEach(function (arrayItem) {
            //console.log("111111",arrayItem)
            //console.log("nameenergyinput",nameenergyinput)
           // console.log("nameenergyinput",arrayItem.measure_Energy)
      //    if (arrayItem.Energie == nameenergyinput) {
          //  console.log("2222222",arrayItem)
            var x = arrayItem.measure_ID; //1
            var y = arrayItem.measure_Label; //kwh
            var z = arrayItem.EMNCode; //2-1
            mesurelabel = y
            listmesureenergy1.push({
              "measure_ID": x,
              "measure_Label": y
            })
            mesurelistVar.push({
              "m_code": z,
              "m_name": y
            })
         // }
        })
        setListmesureenergy(listmesureenergy1)
        setMesureList(mesurelistVar)
        setU_incidentselected(U_compteurselected + '$' + incidentlive)
        setU_measurelabel(mesurelabel)
        setU_incidentselectedwithoutLive(U_compteurselected)
        setSys_incidentselected(Sys_compteurselectedwithoutid + '$' + energylivelist)
        setIdCompteurIncidente(Sys_compteurselectedwithoutid)
        setParsed_incidentselected(Sys_compteurselectedwithoutid.replace(outputprefix, inputprefix) + '$' + energylivelist)
        
        setcodecompteurobjective('O' + Sys_compteurselectedwithoutid.replace(outputprefix, inputprefix))
        setmesureidobjective(mesureid)
      }
    }
    function addcompteurselected  ()  {
      //In ES6 you can use the Spread Operator:
      let lastvalue =  equation[ equation.length - 1]
      console.log(lastvalue)
      if ( NameEnergy == "" &&  EnergyMeasure == "") {
        setmessageconseil("S'il vous plaît sélectionner un capteur énergie et mesure")
      } else if ( EnergyMeasure == "") {
        setmessageconseil("S'il vous plait sélectionner une mesure")
      }else if ( U_compteurselected == "") {
        setmessageconseil("Il faut d'abord selectionner un compteur ")
      }  else if (!equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
        || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
        || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
        || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {
            setmessageconseil("")
    
        if ( selectionStart == true) {
            setSys_equation([Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ... Sys_equation])
            setequation([ U_compteurselected + '$' +  EnergyMeasure, ... equation])
        } else {
  
            setSys_equation([... Sys_equation,  Sys_compteurselectedwithoutid + '$' + Sys_mesureid])
            setequation([...equation,  U_compteurselected + '$' +  EnergyMeasure])
        }
  
      } else {
        setmessageconseil("Vous devez sélectionner un opérande")
      
      }
    }
    function moveCursorToEnd(el) {
      var len = el.value.length;
  
      console.log(len)
  
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(len, len);
        setselectionEnd(true)
        setselectionStart(false)
      } else if (el.createTextRange) {
        var t = el.createTextRange();
        t.collapse(true);
        t.moveEnd('character', len);
        t.moveStart('character', len);
        t.select();
      }
    }
    function moveCursorToStart(el) {
      var len = el.value.length;
      console.log(len)
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(0, 0);
        setselectionStart(true)
     
      } else if (el.createTextRange) {
        var t = el.createTextRange();
        t.collapse(true);
        t.moveEnd('character', len);
        t.moveStart('character', len);
        t.select();
      }
    }
    function moveCursorRight(el) {
      var len = el.value.length;
      console.log(len)
      var itemlength
       equation.map(/*(item, j)*/(item, j) => {
        //console.log(item.length)
        if (j ==  countright) {
      
          itemlength =  itemlengthright + item.length
      
        }
      });
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(itemlength, itemlength);
        /* this.setState({
          selectionStart: true
        }) */
  
      } else if (el.createTextRange) {
        var t = el.createTextRange();
        t.collapse(true);
        t.moveEnd('character', len);
        t.moveStart('character', len);
        t.select();
      }
     setcountright(countright + 1)
     setitemlengthright(itemlength)
    }
    function moveCursorLeft(el) {
      var len = el.value.length;
      console.log(len)
      var itemlength
       equation.map(/*(item, j)*/(item, j) => {
        //console.log(item.length)
        if (j ==  countleft) {
    
          itemlength =  itemlengthleft + item.length
       
        }
      });
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(itemlength, itemlength);
   
      } else if (el.createTextRange) {
        var t = el.createTextRange();
        t.collapse(true);
        t.moveEnd('character', len);
        t.moveStart('character', len);
        t.select();
      }
        
      setcountleft(countleft + 1)
      setitemlengthleft(itemlength)
    }
    useEffect(() => {
     
    }, [])

   function outSelectedCompteur(data){
        console.log("outSelectedCompteur",data)
        setU_compteurselected(data.Le_Compteur)
        setNameEnergy(data.Energie)
        setSys_compteurselectedwithoutid(data.Code_Compteur)
      }
      function outSelectedMesure(data){

        console.log("outSelectedCompteur",data)
        setEnergyMeasure(data.measure_Label)
        setSys_mesureid(data.measure_ID)
     //   setEnergyMeasureFilter(data.measure_Energy)
      }




      function selectionner(){

        var nbrparenthopenInt=0
     var nbrparenthcloseInt=0
     console.log("equation",equation)
      if(equation.length!=0){
    //  for ( var i = 0; i < equation.length; i++) {
          console.log("equation",equation)
          var equationVar =equation.toString()
        if (equationVar.match(/\(/gi) == "(") {
       
     
          nbrparenthopenInt +=1
     
        }else {
          nbrparenthopenInt=0
        }
        if (equationVar.match(/\)/gi) == ")") {
          nbrparenthcloseInt += 1
         
        }else {
          nbrparenthcloseInt=0
        }
      }
    //}

      console.log("-----------------",nbrparenthcloseInt,nbrparenthopenInt)
      if (nbrparenthopenInt == nbrparenthcloseInt) {
        setmessageconseil('')
        if(U_incidentselected.length!=0){
          sendData()
         close()
        
        }else
        {
            console.log("U_incidentselected  videee")
            Swal.fire({
              toast: true,
              position: 'top',
              
              showConfirmButton: false,
              timer: 4000,
              icon: 'warning',
              width:400,
              title: "S'il vous plaît sélectionner un incident"})
        }
      } else if (nbrparenthopenInt > nbrparenthcloseInt) {
        setmessageconseil('Il faut ajouter ")"')
      } else if (nbrparenthopenInt < nbrparenthcloseInt) {
        setmessageconseil('Il faut effacer ")"')
      }
      else {
        console.log("no")
      }
         
        
      }
    const style = {
        maxHeight: "75px",
        minHeight: "38px",
        resize: "none",
        border: "none",
        backgroundColor: "#11ffee00",
      };

      useEffect(() => {
        // textarea.focus();
        // autosize(textarea);

        if (datafromcasincidenttocalculatrice[2][0].length != 0 /*&& datamodifier.length!=0*/) {
          console.log("datafromcasincidenttocalculatrice[2]",datafromcasincidenttocalculatrice[2])
        
          // if(datamodifier.length!=0){
          //   var equationString=datafromcasincidenttocalculatrice[2].toString()
          //   var equationArray=equationString.split(' ').filter(e=>e)
          //   setequation(equationArray)
          //   setSys_equation(datafromcasincidenttocalculatrice[3])
          // }else{
            console.log("datafromcasincidenttocalculatrice" , datafromcasincidenttocalculatrice[3])
          setequation(datafromcasincidenttocalculatrice[2])
          setSys_equation(datafromcasincidenttocalculatrice[3])
      // }
        }else if(datafromcasincidenttocalculatrice[2][0].length == 0)
        {
          setequation([])
          setSys_equation([])
        }


              axios1.get(window.apiUrl + "getAllEnergies/")
              .then(
                (result) => {
                  console.log('Energy')
                  console.log(result.data)
                  //tabulator
                  if (result.data.length !== null) {
                      setdataEnergy(result.data)
                  //  this.setState({ dataEnergy: result.data })
                    var datalist = []
        
                    result.data.forEach(function (arrayItem) {
                      var x = arrayItem.Name_Energy;
                      datalist.push(x)
                      //console.log(x);
                    });
                    console.log('list of Name Energy')
                    console.log(listNameEnergy)
                    setlistNameEnergy(datalist)
                  } else {
                    console.log('no data change')
                  }
                }
              )
    
      }, [])

      useEffect(() => {
          console.log("NameEnergy",NameEnergy)
        if(NameEnergy!=""){
                setdataEnergyMeasureFilter(false)
             
                  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${NameEnergy}`)
            
                  .then(
                    ({data})=>{
                
                  Object.keys(data).map((key, ii, aa) => {
                    const value = data[key]
                    console.log("value maseur avec energie",value)
                    setdataEnergyMeasure(value)
                   
                    setdataEnergyMeasureFilter(true)
                })
              
                  })
                  .catch(({ response }) => {

                    // console.log("------------",response)
                    if (response != null) {
                      if (response.status == "401") {
            
                        window.location.assign("/login")
                        localStorage.clear();
            
                      }
                    }
                  }
                  )   
                 //////////////////
                 setdataEnergyCompteurFilter(false)
                 axios1.get(window.apiUrl+`getAllCounters/?energie=${NameEnergy}`)
                 .then(
                   ({data}) => {
           
                     if (data!== null) {
                      Object.keys(data).map((key, ii, aa) => {
                        const value = data[key]
                         setlistcompteurglobal(value)
                         console.log("value maseur avec energie",value)
                         setdataEnergyCompteurFilter(true)
                      })
                     } else {
                       console.log('no data change')
                     }
           
           
           
                   }
                 )
                 .catch(({ response }) => {

                  // console.log("------------",response)
                  if (response != null) {
                    if (response.status == "401") {
          
                      window.location.assign("/login")
                      localStorage.clear();
          
                    }
                  }
                }
                )

                }
      }, [NameEnergy,listNameEnergy])
      useEffect(() => {
        console.log("dataEnergyMeasure",dataEnergyMeasure,"dataEnergyMeasureFilter" ,dataEnergyMeasureFilter)
    }, [dataEnergyMeasure,dataEnergyMeasureFilter])
    useEffect(() => {
      console.log("listcompteurglobal",listcompteurglobal,"dataEnergyCompteurFilter" ,dataEnergyCompteurFilter)
  }, [dataEnergyCompteurFilter,listcompteurglobal])
      return (<div>
        <MDBModal isOpen={ modal} toggle={componentcalculator} size="fluid" centered>
       
            <MDBModalHeader toggle={componentcalculator} >Calculatrice Cas Incidents</MDBModalHeader>
            <MDBModalBody >
              <div className="screen" style={{ marginTop: 0 + 'em', fontSize: "14px", fontFamily: 'Gotham Book' }} >
                <MDBRow>
                  <MDBCol size="12" style={{ marginBottom: 0 + 'em' }}>
                    <label style={{ fontSize: "12px", fontFamily: 'Gotham Book' }}>Conseil : </label>
                    <input style={{ width: '629px', border: "#7dd2d9" }} value={ messageconseil} ></input>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol style={{ padding: 0 + 'em', marginLeft: 1.5 + 'em', marginRight: 1 + 'em' }}>
                    <table  /* style={{ marginTop: "9.5%" }} */ style={{ height: 'auto', minHeight: "77px" }} className="borferradius" >
                      <thead >
                        <tr >
                          <th style={{ width: '25%' }} className="gradient-custom-th p-0 " >{ U_incidentselected} </th>
                          <th style={{ width: '5%' }} className="gradient-custom-th p-0"><span className=" text-center" style={{ color: "#131413", fontSize: "14px" }}>=</span></th>
                          <th style={{ width: '60%' }} className="gradient-custom-th p-0" ><textarea
                            style={style}
                           
                            value={equation.join('')}
                            rows={4}
                            style={{
                              width: '100%', backgroundColor: "#11ffee00", border: "none", maxHeight: "75px",
                              minHeight: "38px"
                            }}
  
                          />
  
  
                          </th>
  
                        </tr>
  
                      </thead>
                      {/* <tbody></tbody> */}
                    </table >
                  </MDBCol>
  
                </MDBRow>
  
                <MDBRow className='d-flex justify-content-center' style={{ marginTop: 0.5 + 'em' }} >
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={() => {  moveCursorToStart(textformule); }} disabled>
                    <MDBIcon size='lg' fas icon='angle-double-left'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() => {  moveCursorLeft(textformule); }} disabled >
                    <MDBIcon size='lg' fas icon='caret-left'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() =>  deleteequation()}>
                    <MDBIcon size='lg' fas icon='times-circle'></MDBIcon>
                  </MDBBtn>
  
                  <MDBInput label="TAG :" outline size="sm" type="text" placeholder="" name="TAGFormule" value={ TAGFormule}   onChange={(e) => setTAGFormule(e.target.value)} style={{ margin: 0 + 'em', fontFamily: 'Gotham Book' }} className='' />
  
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() =>  clearequation()}>
                    <MDBIcon size='lg' fas icon='trash-alt' ></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating ' style={{ width: '28px', height: '28px' }} onClick={() => {  moveCursorRight(textformule); }} disabled >
                    <MDBIcon size='lg' fas icon='caret-right'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={() => {  moveCursorToEnd(textformule); }} disabled>
                    <MDBIcon size='lg' fas icon='angle-double-right'></MDBIcon>
                  </MDBBtn>
  
                </MDBRow>
  
              </div>
  
              <div className="screen" style={{ marginTop: 1 + 'em', fontSize: "14px", fontFamily: 'Gotham Book' ,backgroundColor:"#c3c3c321"}}>
  
                <MDBRow>
                  <MDBCol size="5" >
                    <MDBRow >
                      <div className="screen" style={{width:"98%",marginLeft:"15px",backgroundColor:"#fff",minHeight:"460px"}}>
                      <MDBCol size="12" >
                        <MDBRow>
                          <MDBCol size="4">
                            <Dropdown className='' style={{ marginTop: "18px" }}  >
                              <Dropdown.Toggle className='m-0' id="dropdown-basic" variant='#2BBBAD'>
                                <img src={functionsymbol} alt="functionsymbol" /> :  <span style={{ textTransform: 'capitalize' }}>Fonctions</span>
                              </Dropdown.Toggle>
  
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() =>  addincident()}>
                                  <span style={{ color: '#2BBBAD' }}><b>I</b></span>ncident<span style={{ color: '#2BBBAD' }}></span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() =>  addfilscompteur()}>
                                  <span style={{ color: '#2BBBAD' }}><b>Fils(</b></span> Compteur <span style={{ color: '#2BBBAD' }}><b>)</b></span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() =>  addincidentcompteur()}><img src={sigmasymbol} alt="functionsymbol" />
                                  <span style={{ color: '#2BBBAD' }}><b>(</b></span> Incidents <span style={{ color: '#2BBBAD' }}><b>)</b></span>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </MDBCol>
                          <MDBCol size="8">
                            <div className="form-group my-0" style={{ marginLeft: "27%" }}>
                              <label htmlFor="example2">Compteur Selectionner :</label>
  
                              <div className=' d-flex align-items-end' style={{ width: "100%" }}>
                                <input list="listenergy" type="text"
  
                                  className="form-control form-control-sm" disabled
                                  name="U_compteurselected" value={ U_compteurselected}
                            
                                  onChange={(e) => setU_compteurselected(e.target.value)}
                                  />
                                {/* <MDBBtn className=' button_round btn-floating'
                                  style={{ width: '29px', height: '29px' }}
                                  onClick={() =>  addcompteurselected()}>
                                  <MDBIcon size='lg' fas icon='chevron-up'></MDBIcon>
                                </MDBBtn> */}
                              </div>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="12">
                        <br />
                        { dataEnergyCompteurFilter==true&&listcompteurglobal.length != 0 && <FilterV1 filterName={"Compteur"}
                          outSelected={ outSelectedCompteur}
                      
                          filter={[
                            { Le_Compteur_Parent: "Compteur Parent" },
                            { type: "Secteur" },
                            { Point_de_Production: "Point de Production" },
                            { Point_de_Distribution: "Point de Distribution" },
                            { Point_de_Consommation: "Point de Consommation" },
                          ]}
                          display={{ separator: "", elems: ["Le_Compteur"] }}
                          data={ listcompteurglobal}
                          styleScroll={{ width: "100%", maxHeight: "295px" }}
                          btnEdit={true} />}
                      </MDBCol>  
                       </div>
                    </MDBRow>
                  </MDBCol>
               
                  <MDBCol size="2">
                        {/* <div className=' d-flex align-items-end mb-2' style={{ marginLeft: "0%" }}> */}
                  
                    <div className="form-group my-0 mr-3" >
                      <label htmlFor="example2">Énergie :</label>
                      <input list="listenergy" type="text"
                        className="form-control form-control-sm"
                        name="NameEnergy" value={ NameEnergy}
                        onChange={(e) => setNameEnergy(e.target.value)}
                     
                        autoComplete="off"
                        style={{width:"117%",marginLeft: '-4px',marginTop:"-5px"}}/>
                      <datalist id="listenergy">
                        { listNameEnergy.map((listNameEnergy, i) => <option key={i}  value={listNameEnergy}></option>)}
                      </datalist>
                    </div>
                    <div className="form-group my-0">
                    <label htmlFor="example2"style={{marginTop: '15px'}}>Ajouter compteur et mesure :</label>
                                <MDBBtn 
                                     size="sm"
                                     style={{width:"108%",marginLeft: '-2px',marginTop:"-4px"}}
                                     onClick={() =>  addcompteurselected()}>
                                  <MDBIcon size='lg' fas icon='chevron-up'></MDBIcon>
                                </MDBBtn>
                            
                              
                        
                            </div>
                    <div style={{ padding: 0 + 'em', width: '117%', marginTop: '10px', marginLeft: "-4%" }}>
                      {/* Recieve data from button component  */}
  
                      <Button parentCallback={ callbackFunction}
                        sendoperator={ callbackoperator} operatorfunction={ callbackOperatorFunction}
                      ></Button>
  
                    </div>
                  </MDBCol>
                  <MDBCol size="5">
                      <MDBRow>
                      <div className="screen" style={{width:"95.5%",backgroundColor:"#fff",minHeight:"460px",marginLeft: "12px",marginRight: '10px'}}>
                       
                         <MDBCol size="12">    <div style={{marginLeft:"56%"}}>    <label htmlFor="example2">Mesure Selectionner :</label>
  
  <input type="text"
    className="form-control form-control-sm" disabled
    name="EnergyMeasure" value={EnergyMeasure}
    />
    </div>
                  </MDBCol>
                         <MDBCol size="12"><div style={{ marginTop: "15px" }}>
         
         {dataEnergyMeasureFilter==true&& dataEnergyMeasure.length != 0 ? (   <FilterV1 filterName={"Mesure"}

               outSelected={ outSelectedMesure}
    

               filter={[
                 { measure_View: "Périodicité" },
                 { "Measure-Category": "Catégorie" },
                 { "Measure-Stats": "Statistiques" },
                 { measure_name: "Nom Mesure" },
               ]}
               display={{ separator: "", elems: ["measure_Label"] }}
               data={ dataEnergyMeasure}
               styleScroll={{ width: "100%", maxHeight: "295px" }}
               btnEdit={true} />):null}

               
           </div></MDBCol></div>
                      </MDBRow>
                               
                       
                    
                  </MDBCol>
                </MDBRow>
  
  
  
              </div>
  
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="default" onClick={ selectionner}  /*onClick={() =>  evalequation()} onClick={() =>  sendData()}*/ >Sélectionner</MDBBtn>
              <MDBBtn color="primary" onClick={ close} >Annuler</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
      </div>);
  
  }
  export default Calculatrice;