import React, { Component, CSSProperties } from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";
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
class Calculatrice extends React.Component {
  constructor(props) {
    super(props)
    this.display = React.createRef()
    this.state = {  
      closemodal: true,
      //equation : [],

      equation: [],
      equationwithTilde: [],
      Sys_equation: [],
      Sys_equationwithTilde: [],
      TAGFormule: '',

      listvalequation: "",

      nbrparenthopen: 0,
      nbrparenthclose: 0,
      messageconseil: '',
      data: 'hiiiii nourhene',
      modal: true,
   
      selectionStart: false,
      selectionEnd: false,

      countright: 0,
      itemlengthright: 0,



      countleft: 0,
      itemlengthleft: 0,
  

    
   
      NameEnergy: '',
      EnergyMeasure: '',
   
      
    
   
    
      Sys_mesureid: '',

      U_measurelabel: '',

      U_compteurselected: "",
      Sys_compteurselected: "",
      Sys_compteurselectedwithoutid: '',
      codecompteurobjective: '',
      mesureidobjective: '',
      compteurselected1: "",
      U_incidentselectedwithoutLive: '',

      U_incidentselected: this.props.datafromcasincidenttocalculatrice[0],
      testvalue: this.props.datafromcasincidenttocalculatrice[3],
      Sys_incidentselected: '',
      Parsed_incidentselected: '',

      Listmesureenergy: [],//on a besoin pour cas incident field objective formule
      MesureList: [],//ML
    
    
      dataEnergyMeasure: [],
      dataEnergy: [],
      listcompteurglobal: [],

      listEnergyMeasureNormalised: [],
      listNameEnergy: [],
   
     
      
    
      


      /////////////////////////////////
      EnergyMeasureFilter:"",
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.clearequation = this.clearequation.bind(this);
    this.deleteequation = this.deleteequation.bind(this);
    this.evalequation = this.evalequation.bind(this);
    this.addcompteurselected = this.addcompteurselected.bind(this);
    this.moveCursorToEnd = this.moveCursorToEnd.bind(this);
    this.moveCursorToStart = this.moveCursorToStart.bind(this);
    this.moveCursorRight = this.moveCursorRight.bind(this);
    this.moveCursorLeft = this.moveCursorLeft.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  sendData = () => {
    console.log("sendData")
    this.state.equationwithTilde = this.state.equation
    this.state.equationwithTilde.map((item, j) => {
      while (typeof this.state.equationwithTilde[j] === 'number' && typeof this.state.equationwithTilde[j + 1] === 'number') {
        //console.log(this.state.equation[j]+'number')
        this.state.equationwithTilde[j] = Number(this.state.equationwithTilde[j] + "" + this.state.equationwithTilde[j + 1])

        this.state.equationwithTilde.splice(j + 1, 1);
      }
    }
    )
    this.state.equationwithTilde.map((item, j) => {
      while (typeof this.state.equationwithTilde[j] === 'number') {
        //console.log(this.state.equation[j]+'number')
        this.state.equationwithTilde[j] = "#" + this.state.equationwithTilde[j]
      }
    }
    )
    //this.state.equationwithTilde.join('~') + '~'
    //console.log(this.state.equationwithTilde)
    //console.log(this.state.Sys_equation)

    this.state.Sys_equationwithTilde = this.state.Sys_equation
    //console.log(this.state.Sys_equationwithTilde)
    this.state.Sys_equationwithTilde.map((item, j) => {
      while (typeof this.state.Sys_equationwithTilde[j] === 'number' && typeof this.state.Sys_equationwithTilde[j + 1] === 'number') {
        // console.log(this.state.Sys_equationwithTilde[j]+'number')
        this.state.Sys_equationwithTilde[j] = Number(this.state.Sys_equationwithTilde[j] + "" + this.state.Sys_equationwithTilde[j + 1])

        this.state.Sys_equationwithTilde.splice(j + 1, 1);
      }
    }
    )


    console.log(this.state.Sys_equationwithTilde)
    this.state.Sys_equationwithTilde.map((item, j) => {
      while (typeof this.state.Sys_equationwithTilde[j] === 'number') {
        //console.log(this.state.equation[j]+'number')
        this.state.Sys_equationwithTilde[j] = "#" + this.state.Sys_equationwithTilde[j]
      }
    }
    )
    //console.log(this.state.Sys_equationwithTilde)
    this.props.valueincidentcallback({
      0: this.state.U_incidentselected,//ELMAZERAA ELEC$LIVE INC
      1: this.state.equation.join(''),
      2: this.state.Sys_incidentselected,//CC1$28
      3: this.state.Sys_equation.join(''),
      4: this.state.Parsed_incidentselected,//E11$28
      5: this.state.codecompteurobjective,//OE11
      6: this.state.mesureidobjective,//1
      7: false,
      8: this.state.NameEnergy,//Electrique
      9: this.state.U_incidentselectedwithoutLive,//ELMAZERAA ELEC
      10: this.state.Listmesureenergy,
      11: this.state.MesureList,

      12: 'TAG : ' + this.state.TAGFormule,
      13: this.state.U_measurelabel, //KWHJ

      14: this.state.equationwithTilde.join('~') + '~',
      15: this.state.Sys_equationwithTilde.join('~') + '~',
      16: this.state.equationwithTilde.join('~'),
      //4:this.state.Sys_formule
    });


    console.log(this.state.U_incidentselected)
    console.log(this.state.Listmesureenergy)
    console.log(this.state.MesureList)
    console.log('equation')
    console.log(this.state.equation)
    console.log(this.state.equationwithTilde)
    console.log(this.state.Sys_equationwithTilde)
  }
  callbackvaluecalcFcasincident = (childData) => {
    this.setState({ U_incidentselected: childData[0] });//c
    this.setState({ Sys_incidentselected: childData[1] });/// c

  }
  callbackFunction = (childData) => {
    console.log(childData.length)

    //this.setState({ equation: this.state.equation + childData });
    this.setState({ listvalequation: this.state.listvalequation + childData });
    //this.state.listvalequation.push(childData)
    //this.state.equation.push(childData)
    //if(this.state.equation[this.state.equation.length - 1] !== childData){

    if (this.state.selectionStart == true) {
      this.setState({
        equation: [childData, ...this.state.equation]
      });

      this.setState({
        Sys_equation: [childData, ...this.state.Sys_equation]
      });



      console.log(this.state.equation)
      console.log(this.state.Sys_equation)
      console.log('hiiiiiiiiiiiiiiiiiiiii')
      console.log(childData)

      //console.log(this.state.listvalequation)
      //console.log(this.state.equation)
    } else {
      //add number
      this.setState({
        equation: [...this.state.equation, childData]
      });

      this.setState({
        Sys_equation: [...this.state.Sys_equation, childData]
      });

      //}
      console.log(childData)
      console.log(this.state.equation)
      console.log(this.state.Sys_equation)

    }
    /*if(this.state.listvalequation.length>0){
      console.log(this.state.listvalequation.match(/\(/gi).length) 
    }*/


    //console.log((this.state.equation.match(/./g) || []).length);
  }
  callbackOperatorFunction = (childData) => {
    console.log(childData.length)
    console.log(childData[0])
    console.log(childData[1])

    this.setState({ listvalequation: this.state.listvalequation + childData[0] + childData[1] });

    if (this.state.selectionStart == true) {
      this.setState({
        equation: [childData[0], childData[1], ...this.state.equation]
      });

      this.setState({
        Sys_equation: [childData[0], childData[1], ...this.state.Sys_equation]
      });
      console.log(this.state.equation)
      console.log(this.state.Sys_equation)
      console.log('hiiiiiiiiiiiiiiiiiiiii')
      console.log(childData[0], childData[1])

    } else {
      //add number
      this.setState({
        equation: [...this.state.equation, childData[0], childData[1]]
      });

      this.setState({
        Sys_equation: [...this.state.Sys_equation, childData[0], childData[1]]
      });
      console.log(this.state.equation)
      console.log(this.state.Sys_equation)


    }
    /*if(this.state.listvalequation.length>0){
      console.log(this.state.listvalequation.match(/\(/gi).length) 
    }*/

    //console.log((this.state.equation.match(/./g) || []).length);
  }
  callbackoperator = (childData) => {


    var lastval = this.state.equation[this.state.equation.length - 1]
    if (this.state.equation[this.state.equation.length - 1] !== childData && this.state.equation.length != 0) {

      if (lastval == '+' || lastval == '-' || lastval == '*' || lastval == '/') {
        this.setState(state => {
          const equation = state.equation.map((item, j) => {
            console.log(this.state.equation.length - 1)
            if (j === this.state.equation.length - 1) {
              return item = childData;
            } else {
              return item;
            }
          });

          return {
            equation,
          };
        });
        this.setState(state => {
          const Sys_equation = state.Sys_equation.map((item, j) => {
            console.log(this.state.Sys_equation.length - 1)
            if (j === this.state.Sys_equation.length - 1) {
              return item = childData;
            } else {
              return item;
            }
          });

          return {
            Sys_equation,
          };
        });


      } else {

        /*console.log('listtttttttttttttt')
        console.log(this.state.list)
        this.setState({
          equation: [...this.state.equation, childData]
        });

        this.setState({
          Sys_equation: [...this.state.Sys_equation, childData]
        }); */

        if (this.state.selectionStart == true) {
          this.setState({
            equation: [childData, ...this.state.equation]
          });

          this.setState({
            Sys_equation: [childData, ...this.state.Sys_equation]
          });


          //}

          console.log(this.state.equation)
          console.log(this.state.Sys_equation)

          console.log('hiiiiiiiiiiiiiiiiiiiii')
          console.log(childData)
          //console.log(this.state.listvalequation)
          //console.log(this.state.equation)
        } else {
          this.setState({
            equation: [...this.state.equation, childData]
          });

          this.setState({
            Sys_equation: [...this.state.Sys_equation, childData]
          });

          //}

          console.log(this.state.equation)
          console.log(this.state.Sys_equation)

        }
      }

    }

    //console.log(this.state.equation)
  }
  clearequation = () => {
    this.setState({ equation: [] });
    this.setState({ Sys_equation: [] });

    console.log('clearrrrrrrrrrrrr')
  }
  deleteequation = () => {
    console.log(this.state.equation)
    this.setState({ equation: this.state.equation.slice(0, -1) });
    this.setState({ Sys_equation: this.state.Sys_equation.slice(0, -1) });
    console.log('deleteee')
  }
  evalequation = () => {
console.log("evalequation")
    //this.setState({ equation: eval(this.state.equation) });
    var i;
    this.setState({ nbrparenthopen: 0 })
    this.setState({ nbrparenthclose: 0 })
    for (i = 0; i < this.state.equation.length; i++) {

      if (this.state.equation[i].match(/\(/gi) == "(") {
        this.state.nbrparenthopen += 1
        console.log(this.state.nbrparenthopen)
      }
      if (this.state.equation[i].match(/\)/gi) == ")") {
        this.state.nbrparenthclose += 1
        console.log(this.state.nbrparenthclose)
      }

      /* this.state.nbrparenthopen.push(this.state.equation[i].match(/\(/gi).length);
      console.log("texteeeeeeeee")
      console.log(this.state.nbrparenthopen) */
    }
    if (this.state.nbrparenthopen == this.state.nbrparenthclose) {
      this.setState({ messageconseil: '' })
      this.close()
    } else if (this.state.nbrparenthopen > this.state.nbrparenthclose) {

      this.setState({ messageconseil: 'Il faut ajouter ")"' })
    } else if (this.state.nbrparenthopen < this.state.nbrparenthclose) {

      this.setState({ messageconseil: 'Il faut effacer ")"' })
    }
    else {
      console.log("no")
    }
  }

  selectionner=()=>{
    this.evalequation()
    this.sendData()
  }
  // handlecompteurselectedchange(event1, event2) {
  
  //   this.setState({
  //     U_compteurselected: event1,
  //   });
  //   this.setState({
  //     Sys_compteurselectedwithoutid: event2,
  //   });
 
  //   console.log(this.state.U_compteurselected)
  //   console.log(this.state.Sys_compteurselectedwithoutid)
  // }
  close = () => {
    this.props.closemodel(false)
    this.setState({
      modal: !this.state.modal
    });
    this.setState({
      closemodal: !this.state.modal
    });
  }
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
    console.log(this.props.datafromcasincidenttocalculatrice[2][0].length)
    if (this.props.datafromcasincidenttocalculatrice[2][0].length == 0) {
      this.state.equation = []
    } else {
      this.state.equation = this.props.datafromcasincidenttocalculatrice[2]
    }
    //const NameEnergy = this.state.supprimertemp;
    //this.textarea.focus();
    console.log(this.props.datafromcasincidenttocalculatrice)
    autosize(this.textarea);
    /// api tabulator
    //this.callbackFunction();
    axios.defaults.withCredentials = true;

    //this.filtercompteurglobal

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "AllCompteur",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Code_Compteur;Le_Compteur;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation;Energie",
        dist: "*",
        orderby: "*",
      }


    )

      .then(
        (result) => {
          this.tableData = result.data;

          //tabulator
          //this.setState({ dataCompteur: result.data })
          if (this.tableData !== null) {
            this.setState({ listcompteurglobal: result.data })
            console.log("data filter");
            console.log(this.state.listcompteurglobal)
          } else {
            console.log('no data change')
          }



        }
      )

      axios1.get(window.apiUrl+`getEnergies/`)

       .then(
       (result)=>{
         this.setState({ listNameEnergy: result.data })
          })


  }
  onClick = () => {
    this.display.current.getAlert();
  };
  onSelect = key => {
    this.setState({ selected: key });
  }

  addfilscompteur = () => {
    if (this.state.U_compteurselected == "") {
      this.setState({ messageconseil: 'Il faut d\'abord selectionner un compteur ' })
    } else if (this.state.NameEnergy == "" && this.state.EnergyMeasure == "") {
      this.setState({ messageconseil: 'S\'il vous plaît sélectionner un capteur énergie et mesure' })
    } else if (this.state.EnergyMeasure == "") {
      this.setState({ messageconseil: 'S\'il vous plait sélectionner une mesure' })
    } else {
      this.setState({ messageconseil: '' })
      console.log(this.state.equation)
      console.log(this.state.U_compteurselected)
      console.log(this.state.equation)
      var nameenergyinput = this.state.NameEnergy
      var energymeasureinput = this.state.EnergyMeasure
      var Sys_mesureid
      this.state.dataEnergyMeasure.forEach(function (arrayItem) {
        if (arrayItem.measure_Energy == nameenergyinput && arrayItem.measure_Label == energymeasureinput) {
          Sys_mesureid = arrayItem.measure_ID;
        }
      })
      this.setState({
        equation: [...this.state.equation, "Fils", "(", this.state.U_compteurselected + '$' + this.state.EnergyMeasure, ")"]

      })
      this.setState({
        Sys_equation: [...this.state.Sys_equation, "F", "(", '@' + this.state.Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ")"]

      })

      ////this.state.equation.push("Fils(" + this.state.compteurselected + ")")



    }
  }
  addincidentcompteur = () => {
    if (this.state.U_incidentselected == "") {
      this.setState({ messageconseil: 'Il faut d\'abord selectionner un incident ' })
    } else {
      //this.state.equation.push("Sigma(" + this.state.U_incidentselected + ")")
      this.setState({
        equation: [...this.state.equation, "Sigma", "(", this.state.U_incidentselected, ")"]
      })
      this.setState({
        Sys_equation: [...this.state.Sys_equation, "I", "(", '€' + this.state.Sys_incidentselected, ")"]
      })

    }
  }
  addincident = () => {
    //this.state.equation.push(this.state.compteurselected1)
    if (this.state.U_compteurselected == "") {
      this.setState({ messageconseil: 'Il faut d\'abord sélectionner un incident ' })


    } else if (this.state.NameEnergy == "") {
      this.setState({ messageconseil: 'S\'il vous plaît sélectionner un capteur énergie' })

    } else {
      this.setState({ messageconseil: '' })
      console.log(this.state.U_compteurselected)
      console.log(this.state.equation)
      console.log(this.state.Sys_compteurselectedwithoutid)
      var EMNcode = ''
      var incidentlive = ''
      var nameenergyinput = this.state.NameEnergy
      var energylivelist = ''
      var mesureid = ''
      var outputprefix = ''
      var inputprefix = ''
      var listmesureenergy = []
      var mesurelist = []
      var mesurelabel = ''
      this.state.dataEnergy.forEach(function (arrayItem) {
        if (arrayItem.Name_Energy == nameenergyinput) {
          energylivelist = arrayItem.Energy_LIVEInc_List; //28
          var y = arrayItem.Code_Energy; //1
          EMNcode = energylivelist + '_' + y; //28_1
          outputprefix = arrayItem.OUTP_Prefix_Energy;
          inputprefix = arrayItem.INP_Prefix_Energy;
        }

      })

      this.state.dataEnergyMeasure.forEach(function (arrayItem) {
        if (arrayItem.EMNCode == EMNcode) {
          var x = arrayItem.measure_Label; //INC
          var y = arrayItem.measure_View; //LIVE
          mesureid = arrayItem.measure_ID; //1
          incidentlive = x + '_' + y;
        }
      })

      this.state.dataEnergyMeasure.forEach(function (arrayItem) {
        if (arrayItem.measure_Energy == nameenergyinput) {
          var x = arrayItem.measure_ID; //1
          var y = arrayItem.measure_Label; //kwh
          var z = arrayItem.EMNCode; //2-1
          mesurelabel = y
          listmesureenergy.push({
            "measure_ID": x,
            "measure_Label": y
          })
          mesurelist.push({
            "m_code": z,
            "m_name": y
          })
        }
      })
      this.setState({
        Listmesureenergy: listmesureenergy
      });
      this.setState({
        MesureList: mesurelist
      });

      this.setState({
        U_incidentselected: this.state.U_compteurselected + '$' + incidentlive
      });
      this.setState({
        U_measurelabel: mesurelabel
      });
      this.setState({
        U_incidentselectedwithoutLive: this.state.U_compteurselected
      })
      this.setState({
        Sys_incidentselected: this.state.Sys_compteurselectedwithoutid + '$' + energylivelist
      });
      this.setState({
        Parsed_incidentselected: this.state.Sys_compteurselectedwithoutid.replace(outputprefix, inputprefix) + '$' + energylivelist
      });
      this.setState({
        codecompteurobjective: 'O' + this.state.Sys_compteurselectedwithoutid.replace(outputprefix, inputprefix)
      });
      this.setState({
        mesureidobjective: mesureid
      });
      //Parsed_incidentselected
      console.log('sys selected')
      console.log(this.state.Sys_compteurselectedwithoutid)
      console.log(this.state.Parsed_incidentselected)
      /* this.setState({
        Sys_formule: this.state.Sys_compteurselected + '$' + mesureid
      }); */
      console.log(this.state.Sys_incidentselected)



    }
  }
  moveCursorToEnd(el) {
    /* if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
    } */
    var len = el.value.length;

    console.log(len)

    if (el.setSelectionRange) {
      el.focus();
      el.setSelectionRange(len, len);
      this.setState({
        selectionEnd: true,
      })
      this.setState({
        selectionStart: false,
      })
    } else if (el.createTextRange) {
      var t = el.createTextRange();
      t.collapse(true);
      t.moveEnd('character', len);
      t.moveStart('character', len);
      t.select();
    }
  }
  moveCursorToStart(el) {
    var len = el.value.length;
    console.log(len)
    if (el.setSelectionRange) {
      el.focus();
      el.setSelectionRange(0, 0);
      this.setState({
        selectionStart: true
      })
    } else if (el.createTextRange) {
      var t = el.createTextRange();
      t.collapse(true);
      t.moveEnd('character', len);
      t.moveStart('character', len);
      t.select();
    }
  }
  moveCursorRight(el) {
    var len = el.value.length;
    console.log(len)
    var itemlength
    this.state.equation.map(/*(item, j)*/(item, j) => {
      //console.log(item.length)
      if (j == this.state.countright) {
        console.log('item.length')
        console.log(item.length)
        itemlength = this.state.itemlengthright + item.length
        console.log('itemlength')
        console.log(itemlength)
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

    console.log('this.state.countright')
    console.log(this.state.countright)
    console.log('this.state.itemlength')
    console.log(this.state.itemlengthright)
    this.setState({ countright: this.state.countright + 1 })
    this.setState({ itemlengthright: itemlength })
  }
  moveCursorLeft(el) {
    var len = el.value.length;
    console.log(len)
    var itemlength
    this.state.equation.map(/*(item, j)*/(item, j) => {
      //console.log(item.length)
      if (j == this.state.countleft) {
        console.log('item.length')
        console.log(item.length)
        itemlength = this.state.itemlengthleft + item.length
        console.log('itemlength')
        console.log(itemlength)
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

    console.log('this.state.countleft')
    console.log(this.state.countleft)
    console.log('this.state.itemlength')
    console.log(this.state.itemlengthleft)
    this.setState({ countleft: this.state.countleft + 1 })
    this.setState({ itemlengthleft: itemlength })
  }
  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });

  if(this.state.NameEnergy!=""){
    
      console.log("------------",this.state.NameEnergy)

      axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.NameEnergy}`)

      .then(
        ({data})=>{
          var ss = this.state.NameEnergy
          console.log("fff",data)
          
      Object.keys(data).map((key, ii, aa) => {
        const value = data[key]
        console.log("value maseur avec energie",value)
  this.setState({ dataEnergyMeasure: value })
    })
     
      })



    }
  }
  //pour test
  onChangeHandler(e) {
    //const target = e.target as HTMLTextAreaElement;
    e.target.style.height = "500px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    console.log(e)
  }

  /************************************Data-selected-filter********************************/
  outSelectedCompteur=(data)=>{
    console.log("outSelectedCompteur",data)
    this.setState({U_compteurselected:data.Le_Compteur})
    this.setState({NameEnergy:data.Energie})
    this.setState({Sys_compteurselectedwithoutid: data.Code_Compteur});
  }
   outSelectedMesure=(data)=>{
    console.log("outSelectedCompteur",data)
    this.setState({EnergyMeasure:data.measure_Label})
    this.setState({EnergyMeasureFilter:data.measure_Energy})
  }

  /************************************************************************************* */
  /**************************************************************************************** */
  addcompteurselected = () => {

    console.log("-----------------------",this.state.EnergyMeasureFilter,this.state.NameEnergy,this.state.EnergyMeasureFilter==this.state.NameEnergy)
    //In ES6 you can use the Spread Operator:
    let lastvalue = this.state.equation[this.state.equation.length - 1]
    console.log(lastvalue)
    if (this.state.NameEnergy == "" && this.state.EnergyMeasure == "") {
      this.setState({ messageconseil: 'S\'il vous plaît sélectionner un capteur énergie et mesure' })

    } else if (this.state.EnergyMeasure == "") {
      this.setState({ messageconseil: 'S\'il vous plait sélectionner une mesure' })
    } else if (!this.state.equation.length || lastvalue == '+' || lastvalue == '-' || lastvalue == '*' || lastvalue == '(' || lastvalue == ')'
      || lastvalue == '/' || lastvalue == 'VIDE(' || lastvalue == 'Sqrt(' || lastvalue == 'Mod('
      || lastvalue == 'ArcCos(' || lastvalue == 'Log(' || lastvalue == 'Exp(' || lastvalue == 'ArcTan('
      || lastvalue == 'ArcSin(' || lastvalue == 'Sin(' || lastvalue == 'Cos(' || lastvalue == 'Tan(') {

      this.setState({ messageconseil: '' })

      var nameenergyinput = this.state.NameEnergy
      var energymeasureinput = this.state.EnergyMeasure
      var Sys_mesureid
      this.state.dataEnergyMeasure.forEach(function (arrayItem) {
        if (arrayItem.measure_Energy == nameenergyinput && arrayItem.measure_Label == energymeasureinput) {
          Sys_mesureid = arrayItem.measure_ID;
        }
      })
      var Ucompteurselected = this.state.U_compteurselected
      /* var Syscompteurselected = ''
      this.state.listcompteurglobal.forEach(function (arrayItem) {
        
        if (arrayItem.Le_Compteur == Ucompteurselected) {
          Syscompteurselected = arrayItem.Code_Compteur;
          console.log("system comteurrrrrr")
          console.log(Syscompteurselected)// cc1 //INC        
        }
      }) */

      if (this.state.selectionStart == true) {
        this.setState({
          Sys_equation: [Sys_compteurselectedwithoutid + '$' + Sys_mesureid, ...this.state.Sys_equation]
        });

        this.setState({
          equation: [this.state.U_compteurselected + '$' + this.state.EnergyMeasure, ...this.state.equation,]
        });
        console.log(this.state.equation)
        console.log(this.state.Sys_equation)

      } else {


        this.setState({
          equation: [...this.state.equation, this.state.U_compteurselected + '$' + this.state.EnergyMeasure]
        });
        /* this.setState({
          Sys_compteurselected: Sys_compteurselectedwithoutid + '$' + Sys_mesureid
         }); */
        this.setState({
          Sys_equation: [...this.state.Sys_equation, this.state.Sys_compteurselectedwithoutid + '$' + Sys_mesureid]
        });


        console.log(this.state.equation)
        console.log(this.state.Sys_equation)


      }

    } else {
      console.log(this.state.equation)
      this.setState({ messageconseil: 'Vous devez sélectionner un opérande' })
    }
  }
  /**************************************************************************************** */
  componentDidUpdate(){
//     if(this.state.NameEnergy!=""){
//       console.log("------------",this.state.NameEnergy)
// if (this.state.NameEnergy!=array[1]){
//       axios1.get(window.apiUrl+`getMLByEnergy/?energies=${this.state.NameEnergy}`)

//       .then(
//         ({data})=>{
//           console.log("fff",data)
          
//       Object.keys(data).map((key, ii, aa) => {
//         const value = data[key]
//         console.log("value maseur avec energie",value)
//   this.setState({ dataEnergyMeasure: value })
//     })
  
//       })   }
//     }
  }
  render() {
    const style = {
      maxHeight: "75px",
      minHeight: "38px",
      resize: "none",
      border: "none",
      backgroundColor: "#11ffee00",
    };
    return (<div >
      <MDBModal isOpen={this.state.modal} toggle={this.props.componentcalculator} size="fluid" centered>
     
          <MDBModalHeader toggle={this.props.componentcalculator} >Calculatrice Cas Incidents</MDBModalHeader>
          <MDBModalBody >
            <div className="screen" style={{ marginTop: 0 + 'em', fontSize: "14px", fontFamily: 'Gotham Book' }} >
              <MDBRow>
                <MDBCol size="12" style={{ marginBottom: 0 + 'em' }}>
                  <label style={{ fontSize: "12px", fontFamily: 'Gotham Book' }}>Conseil : </label>
                  <input style={{ width: '629px', border: "#7dd2d9" }} value={this.state.messageconseil} ></input>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol style={{ padding: 0 + 'em', marginLeft: 1.5 + 'em', marginRight: 1 + 'em' }}>
                  <table  /* style={{ marginTop: "9.5%" }} */ style={{ height: 'auto', minHeight: "100px" }} className="borferradius" >
                    <thead >
                      <tr >
                        <th style={{ width: '25%' }} className="gradient-custom-th p-0 " >{this.state.U_incidentselected} </th>
                        <th style={{ width: '5%' }} className="gradient-custom-th p-0"><span className=" text-center" style={{ color: "#131413", fontSize: "14px" }}>=</span></th>
                        <th style={{ width: '60%' }} className="gradient-custom-th p-0" ><textarea
                          style={style}
                          ref={c => (this.textarea = c)}
                          value={this.state.equation.join('')}
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
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={() => { this.moveCursorToStart(textformule); }}>
                  <MDBIcon size='lg' fas icon='angle-double-left'></MDBIcon>
                </MDBBtn>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() => { this.moveCursorLeft(textformule); }} >
                  <MDBIcon size='lg' fas icon='caret-left'></MDBIcon>
                </MDBBtn>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() => this.deleteequation()}>
                  <MDBIcon size='lg' fas icon='times-circle'></MDBIcon>
                </MDBBtn>

                <MDBInput label="TAG :" outline size="sm" type="text" placeholder="" name="TAGFormule" value={this.state.TAGFormule} onChange={this.handleChange} style={{ margin: 0 + 'em', fontFamily: 'Gotham Book' }} className='' />

                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', backgroundColor: '#7dd2d9' }} onClick={() => this.clearequation()}>
                  <MDBIcon size='lg' fas icon='trash-alt' ></MDBIcon>
                </MDBBtn>
                <MDBBtn className=' button_round btn-floating ' style={{ width: '28px', height: '28px' }} onClick={() => { this.moveCursorRight(textformule); }} >
                  <MDBIcon size='lg' fas icon='caret-right'></MDBIcon>
                </MDBBtn>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px' }} onClick={() => { this.moveCursorToEnd(textformule); }}>
                  <MDBIcon size='lg' fas icon='angle-double-right'></MDBIcon>
                </MDBBtn>

              </MDBRow>

            </div>

            <div className="screen" style={{ marginTop: 1 + 'em', fontSize: "14px", fontFamily: 'Gotham Book' ,backgroundColor:"#c3c3c321"}}>

              <MDBRow>
                <MDBCol size="5" >
                  <MDBRow >
                    <div className="screen" style={{width:"98%",marginLeft:"15px",backgroundColor:"#fff"}}>
                    <MDBCol size="12" >
                      <MDBRow>
                        <MDBCol size="4">
                          <Dropdown className='' style={{ marginTop: "18px" }}  >
                            <Dropdown.Toggle className='m-0' id="dropdown-basic" variant='#2BBBAD'>
                              <img src={functionsymbol} alt="functionsymbol" /> :  <span style={{ textTransform: 'capitalize' }}>Fonctions</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => this.addincident()}>
                                <span style={{ color: '#2BBBAD' }}><b>I</b></span>ncident<span style={{ color: '#2BBBAD' }}></span>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => this.addfilscompteur()}>
                                <span style={{ color: '#2BBBAD' }}><b>Fils(</b></span> Compteur <span style={{ color: '#2BBBAD' }}><b>)</b></span>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => this.addincidentcompteur()}><img src={sigmasymbol} alt="functionsymbol" />
                                <span style={{ color: '#2BBBAD' }}><b>(</b></span> Incidents <span style={{ color: '#2BBBAD' }}><b>)</b></span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </MDBCol>
                        <MDBCol size="8">
                          <div className="form-group my-0" style={{ marginLeft: "22%" }}>
                            <label htmlFor="example2">Compteur Selectionner :</label>

                            <div className=' d-flex align-items-end' style={{ width: "100%" }}>
                              <input list="listenergy" type="text"

                                className="form-control form-control-sm" disabled
                                name="U_compteurselected" value={this.state.U_compteurselected}
                                onChange={this.handleChange} />
                              <MDBBtn className=' button_round btn-floating'
                                style={{ width: '29px', height: '29px' }}
                                onClick={() => this.addcompteurselected()}>
                                <MDBIcon size='lg' fas icon='chevron-up'></MDBIcon>
                              </MDBBtn>
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol size="12">
                      <br />
                      {this.state.listcompteurglobal.length != 0 && <FilterV1 filterName={"Compteur"}
                        outSelected={this.outSelectedCompteur}
                        outAllFiltred={this.outAllFiltred}
                        filter={[
                          { Le_Compteur_Parent: "Compteur Parent" },
                          { type: "Secteur" },
                          { Point_de_Production: "Point de Production" },
                          { Point_de_Distribution: "Point de Distribution" },
                          { Point_de_Consommation: "Point de Consommation" },
                        ]}
                        display={{ separator: "", elems: ["Le_Compteur"] }}
                        data={this.state.listcompteurglobal}
                        styleScroll={{ width: "290px", maxHeight: "380px" }}
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
                      name="NameEnergy" value={this.state.NameEnergy}
                      onChange={this.handleChange} 
                      autoComplete="off"
                      style={{width:"117%"}}/>
                    <datalist id="listenergy">
                      {this.state.listNameEnergy.map((listNameEnergy, i) => <option key={i}  value={listNameEnergy}></option>)}
                    </datalist>
                  </div>

                    {/* <div className="form-group my-0" >
                    <label htmlFor="example2">Mesure :</label>
                    <input list="listenergymesure" type="text"
                      className="form-control form-control-sm"
                      onClick={this.getlistEnergyMeasureNormalised}
                      name="EnergyMeasure" value={this.state.EnergyMeasure}
                      onChange={this.handleChange} />
                    <datalist id="listenergymesure">
                      {this.state.listEnergyMeasureNormalised.map((listEnergyMeasureNormalised, i) => <option key={i} value={listEnergyMeasureNormalised}></option>)}
                    </datalist>
                  </div> 
                  </div>*/}

  
                  <div style={{ padding: 0 + 'em', width: '240px', marginTop: '100px', marginLeft: "-4%" }}>
                    {/* Recieve data from button component  */}

                    <Button parentCallback={this.callbackFunction}
                      sendoperator={this.callbackoperator} operatorfunction={this.callbackOperatorFunction}
                    ></Button>

                  </div>
                </MDBCol>
                <MDBCol size="5">
                <div className="screen" style={{width:"100%",backgroundColor:"#fff"}}>
                  <div style={{ marginTop: "80px", marginLeft: "9px", marginRight: '10px' }}>
                    {this.state.dataEnergyMeasure.length != 0 && <FilterV1 filterName={"Mesure"}

                      outSelected={this.outSelectedMesure}
                      outAllFiltred={this.outAllFiltred}

                      filter={[
                        { measure_View: "Périodicité" },
                        { "Measure-Category": "Catégorie" },
                        { "Measure-Stats": "Statistiques" },
                        { measure_name: "Nom Mesure" },
                      ]}
                      display={{ separator: "", elems: ["measure_Label"] }}
                      data={this.state.dataEnergyMeasure}
                      styleScroll={{ width: "290px", maxHeight: "390px" }}
                      btnEdit={true} />}
                  </div>
                  </div>
                </MDBCol>
              </MDBRow>



            </div>

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="default" onClick={this.selectionner}  /*onClick={() => this.evalequation()} onClick={() => this.sendData()}*/ >Sélectionner</MDBBtn>
            <MDBBtn color="primary" onClick={this.close} >Annuler</MDBBtn>
          </MDBModalFooter>
      </MDBModal>
    </div>);
  }
}
export default Calculatrice;