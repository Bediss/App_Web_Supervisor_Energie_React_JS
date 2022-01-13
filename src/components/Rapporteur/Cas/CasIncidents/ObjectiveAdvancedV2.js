import React, { useEffect, useState } from "react";
import Tabulator from "tabulator-tables";

//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Datetime from 'react-datetime';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ReactTabulator } from 'react-tabulator'
import { contains } from "jquery";
import { set } from "react-hook-form";
import FilterV1 from '../../../filterV1';
const ObjectiveAdvanced = ({ datafromcasincidents ,valueajoutertabcallback,dataEnergyMeasure,toggleFilterMesure3,modalFilterMesure3,toggleFilterMesure5,modalFilterMesure5,toggleFilterMesure7,modalFilterMesure7,funModale }) => {


    useEffect(() => {
     
      console.log("modalFilterMesure3-------------->",modalFilterMesure3)
   }, [modalFilterMesure3])

    const [dataTabulator, setdataTabulator] = useState([])

    const columns = [
        {
            title: "Mot clé",
            field: "keyword",
            width: "20%",
            cellClick: function (e, cell, row) { 
                var position = cell.getRow().getPosition()
                datamodifier.splice(0, 2);
                datamodifier.push(cell.getData(), position);
            }
        },

        {
            title: "Traitement",
            field: "operateur",
            width: "20%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
                datamodifier.splice(0, 2);
                datamodifier.push(cell.getData(), position);

            }
        },
        {
            title: "opérateur",
            field: "att",
            width: "20%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
                datamodifier.splice(0, 2);
                datamodifier.push(cell.getData(), position);

            }
        },
        {
            title: "Temp",
            field: "user_value",
            width: "20%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
                datamodifier.splice(0, 2);
                datamodifier.push(cell.getData(), position);

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
                console.log("supprimertemp")
                supprimertemp.push(cell.getData().user_value);
                console.log("supprimertemp", supprimertemp)

                for (var i = 0; i < supprimertemp.length; i++) {

                    var index = -1;
                    var val = supprimertemp[i]
                    console.log("val",val)
                    var filteredObj = JsonOperateurValue.find(function (item, i) {
                        console.log("val",item.user_value)
                        if (item.user_value === val) {
                            index = i;
                            return i;
                        }
                    });

                  console.log("filteredObj",index, filteredObj);
                    if (index > -1) {
                        JsonOperateurValue.splice(index, 1);
                    }
                }


                for (var i = 0; i < supprimertemp.length; i++) {

                    var index = -1;
                    var val = supprimertemp[i]
                    console.log(val)
                    var filteredObj = dataTabulator.find(function (item, i) {
                        if (item.user_value === val) {
                            index = i;
                            return i;
                        }
                    });

                   console.log(index, filteredObj);
                    if (index > -1) {
                        dataTabulator.splice(index, 1);
                    }
                }
              console.log("JsonOperateurValue", JsonOperateurValue, "----------------------dataTabulator", dataTabulator)
                setJsonOperateurValue(JsonOperateurValue)
                setdataTabulator(dataTabulator)
                //AjoutTab(JsonOperateurValue)
                setajoutertap(JsonOperateurValue)
                cell.getRow().delete();
            }
        },
    ]
////////////////////////////////////
const [Listmesureenergy, setListmesureenergy] = useState([])
const [listobjectivefromDB, setlistobjectivefromDB] = useState([])
const [MesureList, setMesureList] = useState(datafromcasincidents[0])
const [CodecompteurObjective, setCodecompteurObjective] = useState("")
const [incidentselectedwithoutlive, setincidentselectedwithoutlive] = useState("")//compteur selected dans calculatrice
const [energycompteurselected, setenergycompteurselected] = useState("")//Energy compteur selected dans calculatrice
const [supprimertemp, setsupprimertemp] = useState([])
const [datamodifier, setdatamodifier] = useState([])
const [ajoutertap, setajoutertap] = useState([])
const [ajouterUserInterface, setajouterUserInterface] = useState([])
const [JsonOperateurValue, setJsonOperateurValue] = useState([])
const [keyword, setkeyword] = useState("")
const [operateur, setoperateur] = useState("")
const [haut, sethaut] = useState("")
const [jsonhaut, setjsonhaut] = useState("")
const [bas, setbas] = useState("")
const [jsonbas, setjsonbas] = useState("")
const [dans, setdans] = useState("")
const [jsondans, setjsondans] = useState([])
const [totale_Dans, settotale_Dans] = useState([])
const [Att, setAtt] = useState("")
const [valeur, setvaleur] = useState("")
const [valeur2, setvaleur2] = useState("")
const [position,setposition]=useState("")
const [modal,setmodal]=useState(false)
const [modal3,setmodal3]=useState(false)
const [modal4,setmodal4]=useState(false)
const [modal5,setmodal5]=useState(false)
const [modal6,setmodal6]=useState(false)
const [modal7,setmodal7]=useState(false)
const [modal8,setmodal8]=useState(false)
const [indexmesure,setindexmesure]=useState("")
const [MesureidObjective,setMesureidObjective]=useState("")
const [ListSetobjective,setListSetobjective]=useState("")
const [valuetomesure,setvaluetomesure]=useState('')

const[MeasureGetObject,setMeasureGetObject]=useState([])

////////////////////////
const [inputValueType, setinputValueType] = useState("number")
const [inputValueDisabled, setinputValueDisabled] = useState(false)
const [inputNumberDisabled, setinputNumberDisabled] = useState(false)
const[inputColorDisabled,setinputColorDisabled]=useState({})
/////////////////
useEffect(() => {
    if(datafromcasincidents.length!=0){

    
    setCodecompteurObjective(datafromcasincidents[1])
    setincidentselectedwithoutlive(datafromcasincidents[2])
    setenergycompteurselected(datafromcasincidents[4])
  //  setListmesureenergy(datafromcasincidents[3])
        
}
}, [datafromcasincidents])


useEffect(() => {
   console.log("ajoutertap---------->",ajoutertap)
}, [ajoutertap])
/////////////////////////////////
   function  addvaluetomesue (nbToggle) {
        //var cc_m 
        const listmesure = Listmesureenergy.map((item, j) => {

            if (j === indexmesure) {
                //cc_m = item.measure_Label + ":" + valuetomesure;
                if (item.measure_Label.includes(':') === true) {
                    item.measure_Label = item.measure_Label.replace(/[^:]+$/g, valuetomesure);


                    return item;
                } else if (item.measure_Label.includes(':') === false) {
                    item.measure_Label = item.measure_Label + ':' + valuetomesure
                    return item
                }


            } else {
                return item;
            }
        });

        setListmesureenergy(listmesure)
      
        if (ListSetobjective.length != 0) {
            ListSetobjective.map((item, j) => {

                if (item.cc_m === CodecompteurObjective + ',' + MesureidObjective) {
                    item.value = valuetomesure
                    return item;


                } else {
                    return item;
                }
            });
        } else {
           var array =[]
           array.push({
                "cc_m": CodecompteurObjective + ',' + MesureidObjective,
                //CodecompteurObjective+','+MesureidObjective,
                "value": valuetomesure,
            })
            setListSetobjective(array)
            sendsetobjective(array) 
        }

        //////////////////////
        /* var setobjective = [{
          "cc_m": ListSetobjective,
          //CodecompteurObjective+','+MesureidObjective,
          "value": valuetomesure,
        }] *****/
        if(nbToggle==4){
        setmodal4(!modal4)
        setvaluetomesure("")
       }else if(nbToggle==6){
        setmodal6(!modal6)
        setvaluetomesure("")
       }else if(nbToggle==8){
        setmodal8(!modal8)
        setvaluetomesure("")
       }

    }
    function getindexmesue(event, value ,nbToggle) {
        //this.addvaluetomesue(event)

        setindexmesure(event)
        setMesureidObjective(value)
        if(nbToggle==4){
        setmodal4(!modal4)
    }else if(nbToggle==6){
        setmodal6(!modal6)
    }else if(nbToggle==8){
        setmodal8(!modal8)
    }
    
    }
    function sendsetobjective(ListSetobjectiveArray) {
       
        axios.post(window.apiUrl + "insertiot/",

            {

        
                datatoinsert: ListSetobjectiveArray,
            }


        )

            .then(
                (result) => {
                    setListSetobjective([])
                
                    setvaluetomesure("")

                   

                }
            )

    }
    function Annulersendsetobjective  (modalnumber) {
        if(modalnumber == 3){

             setmodal3(!modal3)
             setListSetobjective([])
        
        }else if(modalnumber == 5){
            setmodal5(!modal5)
            setListSetobjective([])
         
        }else if(modalnumber == 7){
            setmodal7(!modal7)
          
            setListSetobjective([])

        }
        
    }
    function handlemesureselectedchange  (event1, event2, modalnumber)  {
        console.log("----------modalnumber---------",modalnumber)
        var number = 0
        if (listobjectivefromDB.length > 0) {

            listobjectivefromDB.map((item, i) => {
                if (event1.includes(item.m_name + ':') && event1.includes('null') == false) {
                    number = 1;
    
                    if (modalnumber == 3) {
                        setjsonhaut({ "type": "o", "content": item.cc_m })
                        sethaut(event1)
                        // this.setState({
                        //     jsonhaut:
                        //         { "type": "o", "content": item.cc_m },
                        //     haut: item.cc_m,

                        // })
                        setinputValueType("text")
                        setinputValueDisabled(true)
                        setinputColorDisabled( {backgroundColor: "#00000012"})
                    }else if(modalnumber == 5){
                        setjsonbas({ "type": "o", "content": item.cc_m })
                        setbas(event1)
                        // this.setState({
                        //     jsonbas:
                        //         { "type": "o", "content": item.cc_m },
                        //     bas: item.cc_m,

                        // })
                        setinputValueType("text")
                        setinputValueDisabled(true)

                    }else if(modalnumber == 7){
                        setjsondans({ "type": "o", "content": item.cc_m })
                        //settotale_Dans(event1)
                        setdans(event1)
                       
                        setinputValueType("text")
                        setinputValueDisabled(true)
                    } 
                    
                } else {
                    console.log('alert s\'il vous plait sélectionner une mesure possede une valeur différente 0.')

                }
            })
            if (number == 0) {
                Swal.fire({
                    toast: true,
                    position: 'top',

                    showConfirmButton: false,
                    timer: 5000,
                    icon: 'warning',
                    width: 600,
                    title: "Veuillez saisir une entrée d'objectif valide"
                })
      

            }else if(number == 1){
                if (modalnumber == 3) {
                    setmodal3(false)
                  //  modalFilterMesure3= false 
                    funModale(modalFilterMesure3,3)
                    console.log("modalFilterMesure",modalFilterMesure3)
                }else if(modalnumber == 5){
                    setmodal5(false)
               //  modalFilterMesure5= false
                 console.log("modalFilterMesure",modalFilterMesure5)
                 funModale(modalFilterMesure5,5)
                }else if(modalnumber == 7){
                    setmodal7(false)
                //  modalFilterMesure7= false 
                  funModale(modalFilterMesure7,7)
                  console.log("modalFilterMesure",modalFilterMesure7)

                   
                } 
            }
        } else if (listobjectivefromDB.length == 0) {
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 400,
                title: 'Aucun objectif ne déclaré dans la base de donnée'
            })
       
        }




    };
    function  sendData () {
        valueajoutertabcallback({
            0: ajoutertap,
            1: JsonOperateurValue
        })
    
    }
    function getobjective () {
        /* this.setState({
           modal3: !modal3
         }); */
        axios.post(window.apiUrl + "getobjective/",

            {
                ML: [{"m_code": MeasureGetObject.m_code, "m_name":MeasureGetObject.m_name}],
                CL: [{
                    "Code_Compteur": CodecompteurObjective,
                    "Le_Compteur": incidentselectedwithoutlive
                }]
            }
        )
            .then(
                (result) => {
                    if (result.data !== null) {
                       var listobjectivefromDBVariable = result.data;
                       setlistobjectivefromDB(result.data)
                        if (/*  prevState.listobjectivefromDB !== listobjectiv
                            efromDB && */
                            listobjectivefromDBVariable.length > 0) {
                                console.log("measure_ID",MeasureGetObject)
                            const listmesure = [{"measure_ID": MeasureGetObject.measure_ID, "measure_Label": listobjectivefromDBVariable[0].m_name +":"+listobjectivefromDBVariable[0].value}]

                            //m_name
                            // listobjectivefromDB.map((item1, i) => {
                            //     const listmesure = Listmesureenergy.map((item2, j) => {

                            //         if (item2.measure_Label === item1.m_name) {
                            //             //var x = item2.measure_Label.substring(0, item2.measure_Label.indexOf(item1.m_name)+1)
                            //             var x = item2.measure_Label + ':' + item1.value
                            //             //var x = item2.measure_Label.replace(/[^:]*$/g,item1.value)
                                   
                            //             item2.measure_Label = x
                            //             return item2
                            //         } else if (item2.measure_Label === item1.m_name + ':0') {
                            //             var x = item1.m_name + ':' + item1.value
                                      
                            //             item2.measure_Label = x
                            //             return item2
                            //         } else {
                            //             if (item2.measure_Label.includes(':')) { return item2; }
                            //             else {
                            //                 var y = item2.measure_Label + ':0'
                            //                 item2.measure_Label = y
                            //                 return item2;
                            //             }
                            //         }
                            //     });
                                setListmesureenergy(listmesure)
                           // });
                        } else if (listobjectivefromDBVariable.length === 0) {

                        }
                        //tabulator

                    }
                
                }
            )
    }

    function BtnNouveau() {
        var $ = require("jquery");
        $('#BtnModifier').hide();
        $('#FromModifier').hide();
        $('#BtnNouveauObjective').hide();
        $('#FromNouveauObjective').show();
        $('#BtnTabObjective').show();
        $('#tab').hide();
        setkeyword("")
        setoperateur('')
        setdans('')
        sethaut('')
        setAtt('')
        setbas('')
        settotale_Dans([])
    }
    function BtnTab() {
        var $ = require("jquery");
        $('#FromNouveauObjective').hide();
        $('#FromModifier').hide();
        $('#BtnTabObjective').hide();
        $('#BtnNouveauObjective').show();
        $('#BtnModifier').show();
  
        $('#tab').show();
    }
    function ajoutTab() {
        var validierAjoutTab=false
        var valeurDev = null
        var att =""
        var valeur=""
        if(haut == "" && bas == ""  &&  totale_Dans == ""){
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
        //     if (haut != "" && bas == "") {
        // //        const keyword = keyword;
        //  //       const operateur = operateur;
        //          att = "Haut"
        //         setAtt(att)
        //         valeur = ( haut )
           
        //         setvaleur(valeur)
        //         if (jsonhaut == '') {
        //             valeurDev = { "type": "r", "content": haut }
        //         } else {
        //             valeurDev = jsonhaut
        //         }
        //         var user_value = haut
        //         dataTabulator.push({ keyword, operateur, att, user_value, valeurDev,valeur });
        //         sethaut('')
        //         setbas('')
        //         validierAjoutTab=true
        //     }
    //         if (haut == "" && bas != "") {
    //   //         const keyword = keyword;
    //     //        const operateur = operateur;
    //             att = "Bas"
    //             setAtt(att)
    
    
    
    //             valeur = ( bas )
    //             setvaleur(valeur)
    //             if (jsonbas == '') {
    //                 valeurDev = { "type": "r", "content": bas }
    
    //             } else {
    //                 valeurDev = jsonbas
    //             }
    //             var user_value = bas
    //             dataTabulator.push({ keyword, operateur, att, user_value, valeurDev,valeur });
    //             sethaut('')
    //             setbas('')
    //             validierAjoutTab=true
    //         }
    
            if (haut != "" && bas != "") {
             //   const keyword = keyword;
              //  const operateur = operateur;
                 att = "Entre"
                setAtt(att)
    
                valeur = ( haut + "," + bas )
    
                setvaleur(valeur)
                if (jsonbas == '' && jsonhaut == '') {
                    valeurDev = [{ "type": "r", "content": bas }, { "type": "r", "content": haut }]
                } else {
                    valeurDev = [jsonbas, jsonhaut]
                }
    
                var user_value =  haut + ',' + bas
    
               // valeurDev = [jsonhaut, jsonbas]
               dataTabulator.push({ keyword, operateur, att, user_value, valeurDev,valeur });
               sethaut('')
                setbas('')
                validierAjoutTab=true
            }
            
            if (totale_Dans != "") {
               // const keyword = keyword;
                //const operateur = operateur;
    
    
                att = "Dans"
                setAtt(att)
    
                 valeur = (  totale_Dans.slice(0, -1)  )
                setvaleur(valeur)
    
                const a = totale_Dans.slice(0, -1)
                var user_value = a.replace(/'/g, "")
                console.log("user_value----totale_Dans",user_value)
                if (jsondans == '') {
                    valeurDev = [{ "type": "r", "content": dans }]
                }else{
                valeurDev = jsondans
            
    
                }
                dataTabulator.push({ keyword, operateur, att, user_value  , valeurDev,valeur });
                setdans("")
                validierAjoutTab=true
            }
            /////////////////////////////
            console.log("validierAjoutTab",validierAjoutTab)
            console.log("valeurDev",valeurDev)
            console.log("valeur",valeur)
           if(validierAjoutTab==true){
            JsonOperateurValue.push({ "keyword": keyword, "operateur": operateur, "att": att, "valeur": valeurDev, "user_value": valeur })
            setajoutertap(JsonOperateurValue)
            console.log("JsonOperateurValue----AjoutTab--->",JsonOperateurValue)
            sendData();
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
           // $('#tabObjective').show();
            $('#tab').show();

           }
           else{
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Vérifier les champs'
            })
           }
        }
    }


    function toggle3 (){
        setmodal3(!modal3)
        if(modal3==false){
        getobjective()
        
        }
    }
    function toggle5 (){
        setmodal5(!modal5)
        if(modal5==false){
            getobjective()
            }
    }

    function toggle7 (){
        setmodal7(!modal7)
        if(modal7==false){
            getobjective()
            }
    }

    function toggle4 (){
        setmodal4(!modal4)
    }
    function toggle6 (){
        setmodal6(!modal6)
    }

    function toggle8 (){
        setmodal8(!modal8)
    }




    function btnAjouterDans() {
        if (dans == "") {
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
    
        //settotale_Dans([totale_Dans + "''" + dans + "'',"] )
        //settotale_Dans(totale_Dans.concat(["''" + dans + "'',"]))
        settotale_Dans(totale_Dans + "''" + dans + "'',")

        //  this.setState({ totale_Dans: totale_Dans + "''" + dans + "''," });
          if(jsondans.length == 0){
              setjsondans( { "type": "r", "content": dans })
           
          }else{
          // setjsondans(  [...jsondans , { "type": "r", "content": dans }])
          setjsondans([jsondans].concat([{ "type": "r", "content": dans }]) )
          }

         setdans("")

        }
        
      }
    
      function btndeleteDans() {
    
        if (totale_Dans == "") {
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
          array.push(totale_Dans)
    settotale_Dans(array.slice(0, -1))
        }
      }



   function outSelectedMesure3(json){
    console.log('json----------------->',json,{"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
    setMeasureGetObject({"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})

   }
   function outSelectedMesure5(json){
    console.log('json----------------->',json,{"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
    setMeasureGetObject({"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
   }
   function outSelectedMesure7(json){
    console.log('json----------------->',json,{"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
    setMeasureGetObject({"m_code": json.EMNCode, "m_name": json.measure_Label,"measure_ID":json.measure_ID})
   }


   useEffect(() => {
   console.log("+++++++++++MeasureGetObject-----------",MeasureGetObject)
   }, [MeasureGetObject])
   useEffect(() => {
    console.log("+++++++++++Listmesureenergy-----------",Listmesureenergy)
    }, [Listmesureenergy])

    useEffect(() => {
       console.log("dans",dans)
    }, [dans])

      const scrollContainerStyle = { maxHeight: "300px" };



      useEffect(() => {
console.log("---------------------------bas.length------------",bas.length,"haut.length",haut.length)
 if( (bas.length>=1||haut.length>=1) && inputValueDisabled==false && inputValueType=="number" ){

    setinputNumberDisabled(true)

 }else {
    setinputNumberDisabled(false)
 }


        
     }, [haut,bas,inputValueDisabled,inputValueType])



    return (

        <div>
            <MDBBtn id="BtnNouveauObjective" className='float-right' onClick={BtnNouveau} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
            <MDBBtn id="BtnTabObjective" className='float-right option' onClick={BtnTab} size="sm"><MDBIcon title="Tableuax" icon="table" size="lg" /></MDBBtn> <br />
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
                                    className="browser-default custom-select" id="2" name="keyword" value={keyword} onChange={(e)=>setkeyword(e.target.value)} required>
                                    <option></option>
                                    <option>Intervalle</option>
                                    {/* <option>Ensemble</option> */}

                                </select>
                                <br />
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Traitement
                                </label>
                                <select
                                    className="browser-default custom-select" name="operateur" value={operateur} onChange={(e)=>setoperateur(e.target.value)}required>
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
             {keyword == "Intervalle" && operateur != "" &&
                                <div  >
                                    <div>
                                        <MDBInput style={inputColorDisabled} label="Haut" autoComplete="off" outline size="sm"  type={inputValueType} disabled={inputValueDisabled} className="form-control" name="haut" value={haut} placeholder=""  onChange={(e)=>sethaut(e.target.value)}  />
                                        </div>
                                    <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}
                                        disabled={inputNumberDisabled}
                                        onClick={toggleFilterMesure3}
                                    >Get Objective</MDBBtn>

                       <MDBModal isOpen={modalFilterMesure3} toggle={toggleFilterMesure3} size="lg">
                                                <MDBModalHeader toggle={toggleFilterMesure3}>Get Objective</MDBModalHeader>
                                                <MDBModalBody>
                                                    <div style={{ width: '99%' }}>
                                                        {dataEnergyMeasure.length != 0 ? (
                                                            <FilterV1 filterName={"Mesure"}
                                                                outSelected={outSelectedMesure3}
                                                                filter={[
                                                                    { measure_View: "Périodicité" },
                                                                    { "Measure-Category": "Catégorie" },
                                                                    { "Measure-Stats": "Statistiques" },
                                                                    { measure_name: "Nom Mesure" },
                                                                ]}
                                                                display={{ separator: "", elems: ["measure_Label"] }}
                                                                data={dataEnergyMeasure}
                                                                styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                                btnEdit={true} />) : null}
                                                    </div>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="primary" size="sm" onClick={toggle3}>Get Objective</MDBBtn>
                                                    <MDBBtn color="primary" size="sm" onClick={toggleFilterMesure3}>Annuler</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>


                                    <MDBModal isOpen={modal3} toggle={toggle3} size="md">
                                        <MDBModalHeader toggle={toggle3}>Get Objective</MDBModalHeader>
                                        <MDBModalBody>
                                            <div><b>Capteur :</b> {energycompteurselected}</div>
                                            <div><b>Compteur :</b> {incidentselectedwithoutlive}</div>
                                            <div><b>Sélectionner votre mesure :</b></div>
                                            <MDBContainer style={{ padding: 0 + 'em' }}>
                                                <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                    {Listmesureenergy.map((mesureitem, i) =>
                                                        <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                            borderLeft: '0.5px solid #d6d4d4',
                                                            borderRight: '0.5px solid #d6d4d4',
                                                            borderTop: '0.5px solid #d6d4d4',
                                                            borderBottom: 'none'
                                                        }} >
                                                            <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                className=" w-100 bd-highlight col-example"
                                                                hover flush
                                                                onClick={() => handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 3)}  >
                                                                {mesureitem.measure_Label}

                                                            </MDBListGroupItem>
                                                            <MDBBtn size="sm" color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                onClick={() => getindexmesue(i, mesureitem.measure_ID,4)}
                                                            >
                                                                <MDBIcon icon="pencil-alt" />

                                                            </MDBBtn>
                                                        </div>



                                                    )}
                                                    <MDBModal isOpen={modal4} toggle={toggle4} size="sm">

                                                        <MDBModalBody>
                                                            <label>Value</label>

                                                            <input
                                                                className="form-control form-control-sm"
                                                                name="valuetomesure" value={valuetomesure}
                                                                onChange={(e)=>setvaluetomesure(e.target.value)}  />
                                                        </MDBModalBody>
                                                        <MDBModalFooter>
                                                            <MDBBtn color="default" size="sm" onClick={() => addvaluetomesue(4)}>Ajouter</MDBBtn>

                                                            <MDBBtn color="primary" size="sm" onClick={toggle4}>Annuler</MDBBtn>
                                                        </MDBModalFooter>
                                                    </MDBModal>

                                                </MDBListGroup>
                                            </MDBContainer>




                                        </MDBModalBody>
                                        <MDBModalFooter>
          {/*                                   <MDBBtn color="default" size="sm" onClick={() => sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                            <MDBBtn color="primary" size="sm" onClick={() => Annulersendsetobjective(3)}>Annuler</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>




                                    <div>
                                        <MDBInput style={inputColorDisabled} label="Bas" outline size="sm" autoComplete="off" type={inputValueType} disabled={inputValueDisabled} className="form-control" name="bas" value={bas} placeholder="" onChange={(e)=>setbas(e.target.value)} />
                                        <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}
                                            disabled={inputNumberDisabled}
                                            onClick={toggleFilterMesure5}
                                        >Get Objective</MDBBtn>
                                         <MDBModal isOpen={modalFilterMesure5} toggle={toggleFilterMesure5} size="lg">
                                                <MDBModalHeader toggle={toggleFilterMesure5}>Get Objective</MDBModalHeader>
                                                <MDBModalBody>
                                                    <div style={{ width: '99%' }}>
                                                        {dataEnergyMeasure.length != 0 ? (
                                                            <FilterV1 filterName={"Mesure"}
                                                                outSelected={outSelectedMesure5}
                                                                filter={[
                                                                    { measure_View: "Périodicité" },
                                                                    { "Measure-Category": "Catégorie" },
                                                                    { "Measure-Stats": "Statistiques" },
                                                                    { measure_name: "Nom Mesure" },
                                                                ]}
                                                                display={{ separator: "", elems: ["measure_Label"] }}
                                                                data={dataEnergyMeasure}
                                                                styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                                btnEdit={true} />) : null}
                                                    </div>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="primary" size="sm" onClick={toggle5}>Get Objective</MDBBtn>
                                                    <MDBBtn color="primary" size="sm" onClick={toggleFilterMesure5}>Annuler</MDBBtn>

                                                </MDBModalFooter>
                                            </MDBModal>
                                        <MDBModal isOpen={modal5} toggle={toggle5} size="md">
                                            <MDBModalHeader toggle={toggle5}>Get Objective</MDBModalHeader>
                                            <MDBModalBody>
                                                <div><b>Capteur :</b> {energycompteurselected}</div>
                                                <div><b>Compteur :</b> {incidentselectedwithoutlive}</div>
                                                <div><b>Sélectionner votre mesure :</b></div>
                                                <MDBContainer style={{ padding: 0 + 'em' }}>
                                                    <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                        {Listmesureenergy.map((mesureitem, i) =>
                                                            <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                                borderLeft: '0.5px solid #d6d4d4',
                                                                borderRight: '0.5px solid #d6d4d4',
                                                                borderTop: '0.5px solid #d6d4d4',
                                                                borderBottom: 'none'
                                                            }} >
                                                                <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                    className=" w-100 bd-highlight col-example"
                                                                    hover flush
                                                                    onClick={() => handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 5)}  >
                                                                    {mesureitem.measure_Label}

                                                                </MDBListGroupItem>
                                                                <MDBBtn size="sm" color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                    onClick={() => getindexmesue(i, mesureitem.measure_ID,6)}
                                                                >
                                                                    <MDBIcon icon="pencil-alt" />

                                                                </MDBBtn>
                                                            </div>



                                                        )}
                                                        <MDBModal isOpen={modal6} toggle={toggle6} size="sm">

                                                            <MDBModalBody>
                                                                <label>Value</label>

                                                                <input
                                                                    className="form-control form-control-sm"
                                                                    name="valuetomesure" value={valuetomesure}
                                                                    onChange={(e)=>setvaluetomesure(e.target.value)} />
                                                            </MDBModalBody>
                                                            <MDBModalFooter>
                                                                <MDBBtn color="default" size="sm" onClick={() => addvaluetomesue(6)}>Ajouter</MDBBtn>

                                                                <MDBBtn color="primary" size="sm" onClick={toggle6}>Annuler</MDBBtn>
                                                            </MDBModalFooter>
                                                        </MDBModal>

                                                    </MDBListGroup>
                                                </MDBContainer>




                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                {/* <MDBBtn color="default" size="sm" onClick={() => sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                                <MDBBtn color="primary" size="sm" onClick={() => Annulersendsetobjective(5)}>Annuler</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>


                                    </div>
                                </div>
                        }    
                         {keyword == "Ensemble" && operateur != "" &&
                                <div  >


                                        <MDBRow>
                                            <MDBCol size="8">
                                            <MDBInput style={{ height: '37px' }} label="Dans" outline size="sm" type="text" className="form-control" name="dans" value={dans} placeholder=""   onChange={(e)=>setdans(e.target.value)} />
                                    <MDBBtn className="p-0 flex-grow-1 bd-highlight col-example" style={{ width: '100%', marginLeft: 0 + 'px' }}

                                        onClick={toggleFilterMesure7}
                                    >Get Objective</MDBBtn>

                                      <MDBModal isOpen={modalFilterMesure7} toggle={toggleFilterMesure7} size="lg">
                                                <MDBModalHeader toggle={toggleFilterMesure7}>Get Objective</MDBModalHeader>
                                                <MDBModalBody>
                                                    <div style={{ width: '99%' }}>
                                                        {dataEnergyMeasure.length != 0 ? (
                                                            <FilterV1 filterName={"Mesure"}
                                                                outSelected={outSelectedMesure7}
                                                                filter={[
                                                                    { measure_View: "Périodicité" },
                                                                    { "Measure-Category": "Catégorie" },
                                                                    { "Measure-Stats": "Statistiques" },
                                                                    { measure_name: "Nom Mesure" },
                                                                ]}
                                                                display={{ separator: "", elems: ["measure_Label"] }}
                                                                data={dataEnergyMeasure}
                                                                styleScroll={{ width: "100%", maxHeight: "295px" }}
                                                                btnEdit={true} />) : null}
                                                    </div>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="primary" size="sm" onClick={toggle7}>Get Objective</MDBBtn>
                                                    <MDBBtn color="primary" size="sm" onClick={toggleFilterMesure7}>Annuler</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>
                                     <MDBModal isOpen={modal7} toggle={toggle7} size="md">
                                            <MDBModalHeader toggle={toggle7}>Get Objective</MDBModalHeader>
                                            <MDBModalBody>
                                                <div><b>Capteur :</b> {energycompteurselected}</div>
                                                <div><b>Compteur :</b> {incidentselectedwithoutlive}</div>
                                                <div><b>Sélectionner votre mesure :</b></div>
                                                <MDBContainer style={{ padding: 0 + 'em' }}>
                                                    <MDBListGroup flush style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                                                        {Listmesureenergy.map((mesureitem, i) =>
                                                            <div className="d-flex d-flex bd-highlight example-parent" style={{
                                                                borderLeft: '0.5px solid #d6d4d4',
                                                                borderRight: '0.5px solid #d6d4d4',
                                                                borderTop: '0.5px solid #d6d4d4',
                                                                borderBottom: 'none'
                                                            }} >
                                                                <MDBListGroupItem key={i} style={{ padding: 0.5 + 'em', border: 'none' }}
                                                                    className=" w-100 bd-highlight col-example"
                                                                    hover flush
                                                                    onClick={() => handlemesureselectedchange(mesureitem.measure_Label, mesureitem.measure_ID, 7)}  >
                                                                    {mesureitem.measure_Label}

                                                                </MDBListGroupItem>
                                                                <MDBBtn size="sm" color="default" className="float-right" className="flex-shrink-1 bd-highlight col-example"

                                                                    onClick={() => getindexmesue(i, mesureitem.measure_ID,8)}
                                                                >
                                                                    <MDBIcon icon="pencil-alt" />

                                                                </MDBBtn>
                                                            </div>



                                                        )}
                                                        <MDBModal isOpen={modal8} toggle={toggle8} size="sm">

                                                            <MDBModalBody>
                                                                <label>Value</label>

                                                                <input
                                                                    className="form-control form-control-sm"
                                                                    name="valuetomesure" value={valuetomesure}
                                                                    onChange={(e)=>setvaluetomesure(e.target.value)} />
                                                            </MDBModalBody>
                                                            <MDBModalFooter>
                                                                <MDBBtn color="default" size="sm" onClick={() => addvaluetomesue(8)}>Ajouter</MDBBtn>

                                                                <MDBBtn color="primary" size="sm" onClick={toggle8}>Annuler</MDBBtn>
                                                            </MDBModalFooter>
                                                        </MDBModal>

                                                    </MDBListGroup>
                                                </MDBContainer>




                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                {/* <MDBBtn color="default" size="sm" onClick={() => sendsetobjective()}>Enregistrer</MDBBtn>
*/}
                                                <MDBBtn color="primary" size="sm" onClick={() => Annulersendsetobjective(7)}>Annuler</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>

                                            </MDBCol>
                                            <MDBCol size="4">
                                            <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                            </MDBCol>
                                            <MDBCol size="8">
                                            <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_Dans" className="form-control  " value={totale_Dans} placeholder="" diabled />
                                            </MDBCol>
                                            <MDBCol size="4">
                                            <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                </div>
}

                            </MDBCol>

                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn style={{ marginTop: '-6%' }} id="BtnAjouterTab" className='float-right' onClick={ajoutTab} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
                            </MDBCol>
                        </MDBRow></form>
                </fieldset>
            </div>



            <ReactTabulator
                data={dataTabulator}
                columns={columns}
                layout={"fitData"}
                id="tab"
            />
        </div>
    );
}



export default ObjectiveAdvanced