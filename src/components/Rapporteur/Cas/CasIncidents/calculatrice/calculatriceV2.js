

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
import useState2 from "react-usestateref"

const  Calculatrice =({valueincidentcallback,closemodel,datafromcasincidenttocalculatrice,componentcalculator,datamodifier,energycompteurselected})=>{
 
const[dataEnergyMeasureFilter,setdataEnergyMeasureFilter]=useState(false)
const[dataEnergyCompteurFilter,setdataEnergyCompteurFilter]=useState(false)

const [closemodal1,setclosemodal1]=useState(true)
const [equation,setequation,equationRef]=useState2([])
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
const [NameEnergy,setNameEnergy]=useState(energycompteurselected)

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
  if(datafromcasincidenttocalculatrice[4].length!=0&&datafromcasincidenttocalculatrice[5]!=""){
    console.log("----------->",datafromcasincidenttocalculatrice)
    var codeCompteur = datafromcasincidenttocalculatrice[5].substring(0, datafromcasincidenttocalculatrice[5].indexOf("$"))
 //console.log("lllllllllllllllllllllllllllllllllllllllllllllllll",datafromcasincidenttocalculatrice[5].substring(0, datafromcasincidenttocalculatrice[5].indexOf("$")))
    setTAGFormule("")
    setTAGFormule(datafromcasincidenttocalculatrice[4])
    setParsed_incidentselected(codeCompteur)
  }
}, [])

  useEffect(() => {
        console.log("Sys_equation2",Sys_equation)
    console.log("equation2",equation)
    setSys_equationwithTilde(Sys_equation)
    setequationwithTilde(equation)

  }, [equation,Sys_equation])

  useEffect(() => {

console.log("Sys_equationwithTilde",Sys_equationwithTilde)
  }, [equationwithTilde,Sys_equationwithTilde])
  useEffect(() => {
    // textarea.focus();
    // autosize(textarea);
    console.log("---datafromcasincidenttocalculatrice-------",datafromcasincidenttocalculatrice[2])
    console.log("---datafromcasincidenttocalculatrice----0---",datafromcasincidenttocalculatrice[2][0])
  
    if (datafromcasincidenttocalculatrice[2][0].length != 0 /*&& datamodifier.length!=0*/) {
      console.log("datafromcasincidenttocalculatrice[2]----->",datafromcasincidenttocalculatrice[2][0].split(" "))
      var arrayEquation =datafromcasincidenttocalculatrice[2].concat("|")
      var arraySysEquation =datafromcasincidenttocalculatrice[3].concat("|")
     // var arraySysEquation =[aa].concat("|")
      console.log("datafromcasincidenttocalculatrice[2]",arrayEquation)
      console.log("datafromcasincidenttocalculatrice[3]" , arraySysEquation)
  
      setequation(arrayEquation)
      setSys_equation(arraySysEquation)
  // }
    }else if(datafromcasincidenttocalculatrice[2][0].length == 0)
    {
      setequation(["|"])
      setSys_equation(["|"])
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
      
    function sendData () {
  /******************************************************************** */
var equationFinal=equation
//console.log("equationFinal1",equationFinal)
var index=equationFinal.indexOf("|")
console.log(index)
if ( equationFinal[index] === "|") { 
  equationFinal.splice(index, 1); 
}
console.log("equationFinal2",equationFinal)
/******************************************************************* */
var SysequationFinal=Sys_equation
//console.log("SysequationFinal1",SysequationFinal)
var index=SysequationFinal.indexOf("|")
console.log(index)
if ( SysequationFinal[index] === "|") { 
  SysequationFinal.splice(index, 1); 
}
console.log("SysequationFinal2",SysequationFinal)


      //equationwithTilde = equation
      console.log("equationwithTilde  sendData---------------------------------",equationwithTilde)
      equationFinal.map((item, j) => {
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
      console.log("Sys_equationwithTilde  sendData------------------------" ,Sys_equationwithTilde)
     
      //Sys_equationwithTilde = Sys_equation

      SysequationFinal.map((item, j) => {
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

/******************************************************************* */

//var SysequationwithTildeFinal=Sys_equationwithTilde
//console.log("SysequationFinal1",SysequationFinal)
// var index=SysequationwithTildeFinal.indexOf("|")
// console.log(index)
// if ( SysequationwithTildeFinal[index] === "|") { 

//   SysequationwithTildeFinal.splice(index, 1);  
// }
console.log("SysequationwithTildeFinal---------------------",Sys_equationwithTilde)
Sys_equationwithTilde.map((item, j) => {

  console.log("item",item)
  if ( Sys_equationwithTilde[index] === "|") { 
    Sys_equationwithTilde.splice(index, 1); 
  }
})
console.log("SysequationwithTildeFinal",Sys_equationwithTilde)

/******************************************************************* */


//console.log("SysequationFinal1",SysequationFinal)
var index=equationwithTilde.indexOf("|")
console.log("equationwithTildeFinal index",index)
if ( equationwithTilde[index] === "|") { 
  equationwithTilde.splice(index, 1); 
}

console.log("equationwithTildeFinal",equationwithTilde)
/******************************************************************* */


console.log("++++++MesureList++++Calculatrice++++",MesureList)
//console.log("equationwithTildeFinal",equationFinal.join('~'))
console.log("Parsed_incidentselected-------------------------------",Parsed_incidentselected)



      valueincidentcallback({
        0: U_incidentselected,//ELMAZERAA ELEC$LIVE INC
        1: equationFinal.join(''),
        2: Sys_incidentselected,//CC1$28
        3: SysequationFinal.join(''),
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
        14: equationwithTilde.join('~') + '~',
        15: Sys_equationwithTilde.join('~') + '~',
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
  console.log("callbackFunction childData ",childData)

  var index=equation.indexOf("|")

  if ( equation[index] == "|") { 
    equation.splice(index, 1); 
  }
  if ( Sys_equation[index] == "|") { 
    Sys_equation.splice(index, 1); 
  }
  var insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
  ]
  //const result = insert(equation,index+1, "|")
  //setequation(result)

      setlistvalequation(listvalequation + childData)
      // if ( selectionStart == true) {

      //    setequation([childData, ...equation])
      //    setSys_equation( [childData, ...Sys_equation])
      // } else {
        //add number
/////////////////////////////////////////////////////////////////////////
       // setequation([...equation, childData])
       if(childData==")"&&(index==0||index==-1)){

        console.log("------------",childData,index)
        setmessageconseil("Ne peut pas ajouter ')'")
        const result = insert(equation,index, "|")
        setequation(result)
        const resultSys = insert(Sys_equation,index, "|")
        setSys_equation(resultSys)
       }else{
         console.log('-----------',equation[index-1], childData)
        if(equation[index-1]=="("&&childData==")"){

          setmessageconseil("Ne peut pas ajouter')'")
          const result = insert(equation,index, "|")
          setequation(result)
          const resultSys = insert(Sys_equation,index, "|")
          setSys_equation(resultSys)

        }else{
       if ( selectionStart == false) {
          const res = insert(equation,index+1,(childData))
          const result = insert(res,index+2, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index+1,(childData))
          const resultSys = insert(resSys,index+2, "|")
          setSys_equation(resultSys)
       }else{
        const res = insert(equation,index,(childData))
        const result = insert(res,index+1, "|")
        setequation(result)
        const resSys = insert(Sys_equation,index,(childData))
        const resultSys = insert(resSys,index+1, "|")
        setSys_equation(resultSys)
       }
      
       
      }
    }
     // }
      
    }
    function callbackOperatorFunction (childData){

console.log("childData",childData)

      var index=equation.indexOf("|")
      console.log(index)
      if ( equation[index] === "|") { 
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] === "|") { 
        Sys_equation.splice(index, 1); 
      }
      var insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]
      let lastvalue =  equation[ index - 1]
      console.log(lastvalue)
      if (!equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
      || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
      || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
      || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {

        setlistvalequation(listvalequation + childData[0]+childData[1])
console.log("childData[0] + childData[1]",childData)

        if ( selectionStart == false) {
    
          const res = insert(equation,index+1,childData[0])
          const res2 = insert(res,index+1,childData[1])
          const result = insert(res2,index+2, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index+1,childData[0])
          const resSys2 = insert(resSys,index+1,childData[1])
          const resultSys = insert(resSys2,index+2, "|")
         setSys_equation(resultSys)
       }else{
        
        //add number
        const res = insert(equation,index,childData[0])
        const res2 = insert(res,index+1,childData[1])
        const result = insert(res2,index+2, "|")
        setequation(result)
        const resSys = insert(Sys_equation,index,childData[0])
        const resSys2 = insert(resSys,index+1,childData[1])
        const resultSys = insert(resSys2,index+2, "|")
       setSys_equation(resultSys)

       }

      }else{
        setmessageconseil("Veuillez sélectionner un opérande avant de sélectionner un autre opérateur dans votre formule")
        const result = insert(equation,index, "|")
        setequation(result)
        const resultSys = insert(Sys_equation,index, "|")
        setSys_equation(resultSys)
      }
    
    }
    function callbackoperator  (childData)  {
  
  
      var index=equation.indexOf("|")
      console.log("kkkkkkkk",index)
      if ( equation[index] == "|") { 
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] == "|") { 
        Sys_equation.splice(index, 1); 
      }

      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]

      ///////
      var lastval = equation[index- 1]
      if (equation[lastval] !== childData && equation.length != 0) {
  
        if (lastval == '+' || lastval == '-' || lastval == '*' || lastval == '/') {
            
            console.log("equation",equation)
            console.log("index- 1",index- 1)
             console.log("childData",childData)

             if(index==0||index==-1){

              setmessageconseil('Veuillez sélectionner un opérande avant de sélectionner un autre compteur')
              const result = insert(equation,index, "|")
              setequation(result)
              const resultSys = insert(Sys_equation,index, "|")
              setSys_equation(resultSys)
            }else{

                           var equationVar = equation.map((item, j) => {
                                if (j === index-1) {
                                  return item = childData;
                                } else {
                                  return item;
                                }
                              });
                            console.log("-------",equationVar)

                            var Sys_equationVar = Sys_equation.map((item, j) => {
                              if (j === index-1) {
                                return item = childData;
                              } else {
                                return item;
                              }
                            });
                          console.log("-------",Sys_equationVar)
                            //console.log("-------",childData)
                             // if(index - 1== childData)
             //                 setequation(equationVar)
             
                              //const res = insert(equation,index,(childData))
                              const result = insert(equationVar,index, "|")
                              setequation(result)
                             const result2 = insert(Sys_equationVar,index, "|")
                             setSys_equation(result2)
                           
                           

                          }
/*
                              var Sys_equationVar = Sys_equation.map((item, j) => {
                                        console.log(Sys_equation.length - 1)
                                        if (j === Sys_equation.length - 1) {
                                          return item = childData;
                                        } else {
                                          return item;
                                        }
                                      });
                                      console.log("-Sys_equationVar------",Sys_equationVar)

                                      setSys_equation(Sys_equationVar)*/
        } else {
          // if ( selectionStart == true) {
          //     setequation([childData, ...equation])
          //     setSys_equation([childData, ...Sys_equation])
          // } else {

          //   setequation([ ...equation,childData])
          //   setSys_equation([...Sys_equation,childData])
       
        
  
          // }
          console.log("index--------->",index)
          
          if(index==0||index==-1){

  setmessageconseil('Veuillez sélectionner un opérande avant de sélectionner un autre compteur')
  const result = insert(equation,index, "|")
  setequation(result)
  const resultSys = insert(Sys_equation,index, "|")
  setSys_equation(resultSys)
}else{
          if ( selectionStart == false) {
            const res = insert(equation,index+1,(childData))
            const result = insert(res,index+2, "|")
            setequation(result)
            const resSys = insert(Sys_equation,index+1,(childData))
            const resultSys = insert(resSys,index+2, "|")
           setSys_equation(resultSys)
         }else{
          //add number
          const res = insert(equation,index,(childData))
          const result = insert(res,index+1, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index,(childData))
          const resultSys = insert(resSys,index+1, "|")
         setSys_equation(resultSys)
  
         }
        }
      }
  
      }
  

    }
    function clearequation ()  {
        setequation(["|"])
        setSys_equation(["|"])
    }
    function deleteequation  ()  {
      var index=equation.indexOf("|")

      console.log("------->",index-1)
      if (index-1 > -1) {
        setequation((prev)=>{
          const _prev=prev.concat()
          console.log('"---------*****----->',equation[index-2],index-2)
          console.log('"---------*****----->',equation[index-1],index-1)
         
    //      var array =["Sin","Cos", "ArcSin", "Tan", "ArcCos", "Log", "Exp", "ArcTan", "Mod", "Sqrt"]
          //array.map((item,i)=>{
        //    console.log('"---------**item***----->',item)
          if (equation[index-2] == "Sin"||equation[index-2] == "Cos"||equation[index-2] == "ArcSin"||equation[index-2] == "Tan"
          ||equation[index-2] == "ArcCos"||equation[index-2] == "Log"||equation[index-2] == "Exp"||equation[index-2] == "ArcTan"||
          equation[index-2] == "Mod"||equation[index-2] == "Sqrt") {
           console.log('"-----------_prev-----Sin----->',_prev)
          // _prev.splice(index-1, 1);
          //console.log("----------------------------------->",_prev);
          _prev.splice(index-2,2)


          }else {
            console.log('"-----------_prev---------->',_prev)
            // _prev.splice(index-1, 1);
          //  console.log("----------------------------------->",_prev);
            _prev.splice(index-1,1)
          }
        //})
          return _prev
          // return _prev
        })
    
        setSys_equation((prev)=>{
          const _prev=prev.concat()
          if (Sys_equation[index-2] == "Sin"||Sys_equation[index-2] == "Cos"||Sys_equation[index-2] == "ArcSin"||Sys_equation[index-2] == "Tan"
          ||Sys_equation[index-2] == "ArcCos"||Sys_equation[index-2] == "Log"||Sys_equation[index-2] == "Exp"||Sys_equation[index-2] == "ArcTan"||
          Sys_equation[index-2] == "Mod"||Sys_equation[index-2] == "Sqrt") {

            _prev.splice(index-2,2)
          }else{
          // console.log('"--------------------->',_prev)
          // _prev.splice(index-1, 1);
          console.log("----------------------------------->",_prev);
          _prev.splice(index-1,1)
        }
          return _prev
          // return _prev
        })
        //Sys_equation.splice(index-1, 1)
      }
   
    
    }
    useEffect(() => {

  }, [equation,Sys_equation])
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
      var index=equation.indexOf("|")
      console.log(index)
      if ( equation[index] == "|") { 
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] == "|") { 
        Sys_equation.splice(index, 1); 
      }
      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]
      if ( U_compteurselected == "") {
        setmessageconseil("Veuillez d'abord sélectionner un compteur")
        const result = insert(equation,index+1, "|")
        setequation(result)
      } else if ( NameEnergy == "" &&  EnergyMeasure == "") {
        setmessageconseil("Veuillez sélectionner un Compteur et une mesure, en couple.")
        const result = insert(equation,index+1, "|")
        setequation(result)
      } else if (EnergyMeasure == "") {
        setmessageconseil("Veuillez sélectionner une mesure.")
        const result = insert(equation,index+1, "|")
        setequation(result)
      } else {
        let lastvalue =  equation[ index - 1]
        console.log(lastvalue)
        if (!equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
        || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
        || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
        || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {
        setmessageconseil("")
        // setequation([... equation, "Fils", "(",  U_compteurselected + '$' +  EnergyMeasure, ")"])
        // setSys_equation([... Sys_equation, "F", "(", '@' +  Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ")"])
        var filsEquation=("Fils"+ "("+  U_compteurselected + '$' +  EnergyMeasure+ ")")
        var filsSysEquation=("F"+ "("+ '@' +  Sys_compteurselectedwithoutid + '$' + Sys_mesureid+ ")")
        if ( selectionStart == false) {

          const res = insert(equation,index+1,filsEquation)
          const result = insert(res,index+2, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index+1,filsSysEquation)
          const resultSys = insert(resSys,index+2, "|")
          setSys_equation(resultSys)
       }else{
        //add number
        const res = insert(equation,index,filsEquation)
        const result = insert(res,index+1, "|")
        setequation(result)
        const resSys = insert(Sys_equation,index,filsSysEquation)
        const resultSys = insert(resSys,index+1, "|")
        setSys_equation(resultSys)

       }
      }else{
        setmessageconseil("Veuillez sélectionner un opérande avant de sélectionner un autre opérateur dans votre formule")
        const result = insert(equation,index, "|")
        setequation(result)
        const resultSys = insert(Sys_equation,index, "|")
        setSys_equation(resultSys)
      }
    
      }
    }
    function addincidentcompteur (){
      var index=equation.indexOf("|")
      console.log(index)
      if ( equation[index] == "|") { 
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] == "|") { 
        Sys_equation.splice(index, 1); 
      }
      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]
      if ( U_incidentselected == "") {
        setmessageconseil("Veuillez d'abord sélectionner un incident pour continuer")
        const result = insert(equation,index+1, "|")
        setequation(result)
      } else {
        // setequation([...equation, "Sigma", "(", U_incidentselected, ")"])
        // setSys_equation([...Sys_equation, "I", "(", '€' + Sys_incidentselected, ")"])
        let lastvalue =  equation[ index - 1]
        console.log(lastvalue)
        if (!equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
        || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
        || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
        || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {
        var SigmaEquation=("Sigma"+"("+U_incidentselected+")")
        var SigmaSysEquation=("I"+"("+'€' + Sys_incidentselected+")")
        if ( selectionStart == false) {

          const res = insert(equation,index+1,SigmaEquation)
          const result = insert(res,index+2, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index+1,SigmaSysEquation)
          const resultSys = insert(resSys,index+2, "|")
          setSys_equation(resultSys)
       }else{
        //add number
        const res = insert(equation,index,SigmaEquation)
        const result = insert(res,index+1, "|")
        setequation(result)
        const resSys = insert(Sys_equation,index,SigmaSysEquation)
        const resultSys = insert(resSys,index+1, "|")
        setSys_equation(resultSys)

       }}else{
        setmessageconseil("Veuillez sélectionner un opérande avant de sélectionner un autre opérateur dans votre formule")
        const result = insert(equation,index, "|")
        setequation(result)
        const resultSys = insert(Sys_equation,index, "|")
        setSys_equation(resultSys)
      }
       
      }
    }
    function addincident () {
      if ( U_compteurselected == "") {

        setmessageconseil("Veuillez d'abord sélectionner un incident pour continuer")
  
      } else if ( NameEnergy == "") {
        setmessageconseil("Veuillez d'abord sélectionner un compteur pour continuer ")
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
      var index=equation.indexOf("|")
      console.log(index)
      if ( equation[index] == "|") { 
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] == "|") { 
        Sys_equation.splice(index, 1); 
      }
      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]
      let lastvalue =  equation[ index - 1]
      console.log(lastvalue)
      if ( NameEnergy == "" &&  EnergyMeasure == "") {
        setmessageconseil("Veuillez d'abord sélectionner un compteur pour continuer et une mesure")
        const result = insert(equation,index, "|")
        setequation(result)
      } else if ( EnergyMeasure == "") {
        setmessageconseil("Veuillez sélectionner  une mesure.")
        const result = insert(equation,index, "|")
        setequation(result)
      }else if ( U_compteurselected == "") {
        setmessageconseil("Il faut d'abord sélectionner  un compteur ")
        const result = insert(equation,index, "|")
        setequation(result)
      }  else if (!equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
        || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
        || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
        || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {
            setmessageconseil("")
    
        // if ( selectionStart == true) {
        //     setSys_equation([Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ... Sys_equation])
        //     setequation([ U_compteurselected + '$' +  EnergyMeasure, ... equation])
        // } else {
  
        //     setSys_equation([... Sys_equation,  Sys_compteurselectedwithoutid + '$' + Sys_mesureid])
        //     setequation([...equation,  U_compteurselected + '$' +  EnergyMeasure])
        // }
  
        if ( selectionStart == false) {
         
          const res = insert(equation,index+1,(U_compteurselected + '$' +  EnergyMeasure))
          const result = insert(res,index+2, "|")
          setequation(result)
          const resSys = insert(Sys_equation,index+2,(Sys_compteurselectedwithoutid + '$' + Sys_mesureid))
          const resultSys = insert(resSys,index+2, "|")
       setSys_equation(resultSys)
       }else{
      
        //add number
        const res = insert(equation,index,(U_compteurselected + '$' +  EnergyMeasure))
        const result = insert(res,index+1, "|")
        setequation(result)
        const resSys = insert(Sys_equation,index+1,(Sys_compteurselectedwithoutid + '$' + Sys_mesureid))
        const resultSys = insert(resSys,index+2, "|")
       setSys_equation(resultSys)

       }



      } else {
        setmessageconseil("Veuillez sélectionner un opérande avant de sélectionner un autre opérateur dans votre formule")
        const result = insert(equation,index, "|")
        setequation(result)
        const resultSys = insert(Sys_equation,index, "|")
        setSys_equation(resultSys)
      }
    }
    function moveCursorToEnd(el) {
      var index=equation.indexOf("|")

      console.log(index)
      if ( equation[index] === "|") { 
          
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] === "|") { 
        Sys_equation.splice(index, 1); 
      }
      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]
      const result = insert(equation,equation.length, "|")
      setequation(result)
      const result2 = insert(Sys_equation,Sys_equation.length, "|")
      setSys_equation(result2)
      // var len = el.value.length;
  
      // console.log(len)
  
      // if (el.setSelectionRange) {
      //   el.focus();
      //   el.setSelectionRange(len, len);
      //   setselectionEnd(true)
      setselectionStart(false)
      // } else if (el.createTextRange) {
      //   var t = el.createTextRange();
      //   t.collapse(true);
      //   t.moveEnd('character', len);
      //   t.moveStart('character', len);
      //   t.select();
      // }
    }
    function moveCursorToStart(el) {
     
      //equation.insert(index+1, "|")
      var index=equation.indexOf("|")

      console.log(index)
      if ( equation[index] === "|") { 
          
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] === "|") { 
        Sys_equation.splice(index, 1); 
      }
      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]
      const result = insert(equation,0, "|")
      setequation(result)
      const result2 = insert(Sys_equation,0, "|")
      setSys_equation(result2)
      // var len = el.value.length;
      // console.log(len)
      // if (el) {
      //   el.focus();
      //   el.setSelectionRange(0, 0);
      setselectionStart(true)
     
      // } else if (el) {
      //   var t = el.createTextRange();
      //   t.collapse(true);
      //   t.moveEnd('character', len);
      //   t.moveStart('character', len);
      //   t.select();
      // }
    }

    // useEffect(() => {
    //   if (equation.length==0 && Sys_equation.length==0 ){
    //      setequation(["|"])

    //      setSys_equation(["|"])
    //   }
    // }, [equation,Sys_equation])


    function moveCursorRight(el) {
var index=equation.indexOf("|")

console.log(index)
if ( equation[index] === "|") { 
  equation.splice(index, 1); 
}
if ( Sys_equation[index] === "|") { 
  Sys_equation.splice(index, 1); 
}
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
]
const result = insert(equation,index+1, "|")
setequation(result)
const result2 = insert(Sys_equation,index+1, "|")
setSys_equation(result2)
setselectionStart(true)

    //   var len = el.value.length;
    //   console.log(len)
    //   var itemlength
    //    equation.map(/*(item, j)*/(item, j) => {
    //     //console.log(item.length)
    //     if (j ==  countright) {
      
    //       itemlength =  itemlengthright + item.length
      
    //     }
    //   });
    //   if (el.setSelectionRange) {
    //     el.focus();
    //     el.setSelectionRange(itemlength, itemlength);
    //     /* this.setState({
    //       selectionStart: true
    //     }) */
  
    //   } else if (el.createTextRange) {
    //     var t = el.createTextRange();
    //     t.collapse(true);
    //     t.moveEnd('character', len);
    //     t.moveStart('character', len);
    //     t.select();
    //   }
    //  setcountright(countright + 1)
    //  setitemlengthright(itemlength)
    }


    function moveCursorLeft(e) {
     
      var index=equation.indexOf("|")
      
      console.log(index)
      if ( equation[index] === "|") { 
          
        equation.splice(index, 1); 
      }
      if ( Sys_equation[index] === "|") { 
        Sys_equation.splice(index, 1); 
      }
      //equation.insert(index+1, "|")
      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]
      const result = insert(equation,index-1, "|")
      setequation(result)

      const result2 = insert(Sys_equation,index-1, "|")
      setSys_equation(result2)
      setselectionStart(true)


//var index = 





      //console.log("equation",equation.concat(["|"]))




      //    console.log("--",len)  
      // var len = el.value.length;
 
      // var itemlength =""
      //  equation.map((item, j) => {
      //   console.log(item.length)
      //  if (j ==  countleft) {
      //       itemlength =  itemlengthleft + item.length
      //     console.log("itemlength",itemlength)
      //   }
      // });
      // if (el.setSelectionRange) {
      //   el.focus();
      //   el.setSelectionRange(itemlength, itemlength);
   
      // } else if (el.createTextRange) {
      //   var t = el.createTextRange();
      //   t.collapse(true);
      //   t.moveEnd('character', len);
      //   t.moveStart('character', len);
      //   t.select();
      // }
        
      // setcountleft(countleft + 1)
      // setitemlengthleft(itemlength)
    }
 
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

      if(equation.length!=0){
     for ( var i = 0; i < equation.length; i++) {
          console.log("equation",equation[i])
          // var equationVar =equation.toString()
          // console.log("equationVar",equationVar)

        if (equation[i] == "(") {
       
     
          nbrparenthopenInt +=1
     
        }
        if (equation[i] == ")") {
          nbrparenthcloseInt += 1
         
        }

  
      }
    }
    var index=equation.length
    console.log("------------------>",index)
    console.log("------------------>",equation[index-2])
    if ( equation[index-2] == "+" || equation[index-2] == "-" || equation[index-2] == "/" || equation[index-2] == "*" ) { 
      equation.splice(index-2, 1); 
      Sys_equation.splice(index-2, 1); 
    }
    
      if (nbrparenthopenInt == nbrparenthcloseInt) {
        setmessageconseil('')
        if(U_incidentselected.length!=0&& TAGFormule!="" && equation.length!=1){
          sendData()
         close()
        
        }else
        {
          if(U_incidentselected.length==0){
            console.log("U_incidentselected  videee")
            Swal.fire({
              toast: true,
              position: 'top',
              
              showConfirmButton: false,
              timer: 4000,
              icon: 'warning',
              width:400,
              title: "Veuillez d'abord sélectionner un incident pour continuer"})
            }
            else if(equation.length==1){
              Swal.fire({
                toast: true,
                position: 'top',
                
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width:400,
                title: "Veuillez remplir votre entrée de formule "
              })
              
            }
            else if(TAGFormule==""){
              Swal.fire({
                toast: true,
                position: 'top',
                
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width:400,
                title: "Veuillez remplir votre TAG de formule"
              })
              
            }
        }
      } else if (nbrparenthopenInt > nbrparenthcloseInt) {
        setmessageconseil('Veuillez ajouter ")" avant de continuer')
      } else if (nbrparenthopenInt < nbrparenthcloseInt) {
        setmessageconseil('Veuillez supprimer  ")" avant de continuer')
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
          console.log("NameEnergy",NameEnergy)
        if(NameEnergy!=""){
                setdataEnergyMeasureFilter(false)
             
                  axios1.get(window.apiUrl+`getMLByEnergy/?energies=${NameEnergy}`)
            
                  .then(
                    ({data})=>{
                
                  Object.keys(data).map((key, ii, aa) => {
                    const value = data[key]
                 //   console.log("value maseur avec energie",value)
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
                        // console.log("value maseur avec energie",value)
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
      //  console.log("dataEnergyMeasure",dataEnergyMeasure,"dataEnergyMeasureFilter" ,dataEnergyMeasureFilter)
    }, [dataEnergyMeasure,dataEnergyMeasureFilter])
    useEffect(() => {
   //   console.log("listcompteurglobal",listcompteurglobal,"dataEnergyCompteurFilter" ,dataEnergyCompteurFilter)
  }, [dataEnergyCompteurFilter,listcompteurglobal])

  useEffect(() => {
  if(TAGFormule.length==20){
    Swal.fire({
      toast: true,
      position: 'top',
      
      showConfirmButton: false,
      timer: 4000,
      icon: 'warning',
      width:600,
      title: "Un TAG  de formule ne peut pas comporter plus de 20 caractères"})
    
  }
   }, [TAGFormule])

      return (<>

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
                          <th style={{ width: '60%' }} className="gradient-custom-th p-0" >
                            {/* <textarea
                            style={style}
                            id="mytextarea"
                            autofocus
          
                            value={equationRef.current.map(e=>{
                              if (e=="|"){
                                return '<span>|</span>'
                              }
                              else{
                                return e
                              }
                            
                            })}
                            rows={4}
                            style={{
                              width: '100%', backgroundColor: "#11ffee00", border: "none", maxHeight: "75px",
                              minHeight: "38px"
                            }}
                            disabled
                          />   */}
                            <div
                            style={style}
                            id="mytextarea"
                            // autofocus
                            style={{
                              width: '100%', backgroundColor: "#11ffee00", border: "none", textAlign:"left",
                              
                            }}
                            disabled
                          >
                            {equationRef.current.map(e=>{
                              if (e=="|"){
                                return <span className={"klinklin1"}>|</span>
                              }
                              else{
                                return <span>{e}</span>
                              }
                            
                            })}
                            </div> 
                          </th>
  
                        </tr>
  
                      </thead>
                      {/* <tbody></tbody> */}
                    </table >
                  </MDBCol>
  
                </MDBRow>
  
                <MDBRow className='d-flex justify-content-center' style={{ marginTop: 0.5 + 'em' }} >
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={(e) => moveCursorToStart(e)}  >
                    <MDBIcon size='lg' fas icon='angle-double-left'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating'  style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={(e) => moveCursorLeft(e)}  >
                    <MDBIcon size='lg' fas icon='caret-left'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() =>  deleteequation()}>
                    <MDBIcon size='lg' fas icon='times-circle'></MDBIcon>
                  </MDBBtn>
  
                  <MDBInput label="TAG :" outline size="sm" maxlength="20" type="text" placeholder="" name="TAGFormule" value={ TAGFormule} autoComplete="off"   onChange={(e) => setTAGFormule(e.target.value)} style={{ margin: 0 + 'em', fontFamily: 'Gotham Book' }} className='' />
  
                 
                 <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() =>  clearequation()}>
                    <MDBIcon size='lg' fas icon='trash-alt' ></MDBIcon>
                 
                 
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating ' style={{ width: '28px', height: '28px' }} onClick={(e) => {  moveCursorRight(e); }}  >
                    <MDBIcon size='lg' fas icon='caret-right'></MDBIcon>
                  </MDBBtn>
                  <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={(e) => {  moveCursorToEnd(e); }} >
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
                              <label htmlFor="example2">Compteur sélectionner  :</label>
  
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
                       
                         <MDBCol size="12">    <div style={{marginLeft:"56%"}}>    <label htmlFor="example2">Mesure sélectionner  :</label>
  
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
      </>);
  
  }
  export default Calculatrice;