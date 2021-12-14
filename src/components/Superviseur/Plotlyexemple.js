import React from 'react';
// import createPlotlyComponent from 'react-plotlyjs';
// //See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
// import Plotly from 'plotly.js/dist/plotly-cartesian';
// const PlotlyComponent = createPlotlyComponent(Plotly);
// import axios from 'axios';
// import uuid from 'react-uuid';
class Plotlyexemple extends React.Component {
  // getDate() {

  //   var date = { currentTime: new Date().toLocaleString() };
  //   this.setState({
  //     date: date
  //   });
  // }
  // componentDidMount() {
  //   //getdate
  //   this.getDate();
  
  // }
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //    data1:undefined,
  //    data2:undefined,
  //    namegraf:"",
  //    dataglobale:"",
  //    array1:[],
  //    array2:[],
  //    data_m_name:"",
  //    data_value:""

     

  //   }
  //   this.axiosData = this.axiosData.bind(this);
  
  // }

  //   axiosData(){
  //       /////
  //   axios.post(window.apiUrl + "getobjective/",

  //   {

  //     identifier: this.state.dateDMY + uuid(),
  //     ML: JSON.stringify([{"m_code":"0_1","m_name":"KWh^J"},{"m_code":"1_1","m_name":"KWh^S"},{"m_code":"2_1","m_name":"KWh^M"},{"m_code":"3_1","m_name":"KWh^A"},{"m_code":"4_1","m_name":"VARh^J"},{"m_code":"5_1","m_name":"VARh^S"},{"m_code":"6_1","m_name":"VARh^M"},{"m_code":"7_1","m_name":"VARh^A"},{"m_code":"8_1","m_name":"KWhT^J"},{"m_code":"9_1","m_name":"KWhT^S"},{"m_code":"10_1","m_name":"KWhT^M"},{"m_code":"11_1","m_name":"KWhT^A"},{"m_code":"12_1","m_name":"V1"},{"m_code":"13_1","m_name":"V2"},{"m_code":"14_1","m_name":"V3"},{"m_code":"15_1","m_name":"U1"},{"m_code":"16_1","m_name":"U2"},{"m_code":"17_1","m_name":"U3"},{"m_code":"18_1","m_name":"A1"},{"m_code":"19_1","m_name":"A2"},{"m_code":"20_1","m_name":"A3"},{"m_code":"21_1","m_name":"P1"},{"m_code":"22_1","m_name":"P2"},{"m_code":"23_1","m_name":"P3"},{"m_code":"24_1","m_name":"KWh"},{"m_code":"25_1","m_name":"VARh"},{"m_code":"26_1","m_name":"A MOY"},{"m_code":"27_1","m_name":"COS PHI Total"},{"m_code":"28_1","m_name":"INC"},{"m_code":"29_1","m_name":"INC^J"},{"m_code":"30_1","m_name":"INC^S"},{"m_code":"31_1","m_name":"INC^M"},{"m_code":"32_1","m_name":"INC^A"},{"m_code":"33_1","m_name":"KWh^J-1"},{"m_code":"34_1","m_name":"KWh^S-1"},{"m_code":"35_1","m_name":"KWh^M-1"},{"m_code":"36_1","m_name":"KWh^A-1"},{"m_code":"37_1","m_name":"VARh^J-1"},{"m_code":"38_1","m_name":"VARh^S-1"},{"m_code":"39_1","m_name":"VARh^M-1"},{"m_code":"40_1","m_name":"VARh^A-1"},{"m_code":"41_1","m_name":"Inc^J-1"},{"m_code":"42_1","m_name":"Inc^S-1"},{"m_code":"43_1","m_name":"Inc^M-1"},{"m_code":"44_1","m_name":"Inc^A-1"},{"m_code":"45_1","m_name":"KWhT^J-1"},{"m_code":"46_1","m_name":"KWhT^S-1"},{"m_code":"47_1","m_name":"KWhT^M-1"},{"m_code":"48_1","m_name":"KWhT^A-1"}]),
  //     CL: JSON.stringify([{
  //       "Code_Compteur": "OE117",
  //       "Le_Compteur": "Abattage Elec"
  //     }])
  //   }


  // )

  //   .then((response) => {
  //     console.log("getobjective");
  //     console.log(response.status);
  //     console.log(response.data);
  //     this.state.dataglobale=response.data
  //     console.log("dataglobale",this.state.dataglobale)
  //     /////
  //     this.state.namegraf= response.data[0].compteur_name
  //     console.log("namegraf",this.state.namegraf)
  //     /////
  //     for (var i=0;i<this.state.dataglobale.length;i++){
  //       this.state.data_m_name=this.state.dataglobale[i].m_name
  //       this.state.data_value=this.state.dataglobale[i].value
  //       this.state.array1.push(this.state.data_m_name)
  //       this.state.array2.push(this.state.data_value)
      

  //     }
  
  //     //this.state.data1 = this.state.array1
  //      console.log("x",this.state.data1)
  //      this.setState({ data1: this.state.array1 })
  //    //this.state.data2 = this.state.array2
  //    this.setState({ data2: this.state.array2 })
  //      console.log("y",this.state.data2)
  //   })
  //   .catch((err) => console.error(err));
  //   }
   

  render() {
    // this.axiosData()
  
    // let data = [
    //   {
    //     type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
    //     x: this.state.data2,     // more about "x": #scatter-x
    //     y: this.state.data1,     // #scatter-y
    //     marker: {         // marker is an object, valid marker keys: #scatter-marker
    //       color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
    //     }
    //   },
    //   {
    //     type: 'bar',      // all "bar" chart attributes: #bar
    //     x: this.state.data2,     // more about "x": #bar-x
    //     y:  this.state.data1,     // #bar-y
    //     name: 'bar chart example' // #bar-name
    //   }
    // ];
    // let layout = {                     // all "layout" attributes: #layout
    //   title: this.state.namegraf,  // more about "layout.title": #layout-title
    //   xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
    //     title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
    //   },
    //   annotations: [            // all "annotation" attributes: #layout-annotations
    //     {
    //       text: 'simple annotation',    // #layout-annotations-text
    //       x: 0,                         // #layout-annotations-x
    //       xref: 'paper',                // #layout-annotations-xref
    //       y: 0,                         // #layout-annotations-y
    //       yref: 'paper'                 // #layout-annotations-yref
    //     }
    //   ]
    // };
    // let config = {
    //   showLink: false,
    //   displayModeBar: true
    // };
    // console.log("------------->",this.state.data1)
    return (
     <div>example</div>
      // this.state.data1 ?<PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>:<></>
     
    );
  }
 
}
export default Plotlyexemple;