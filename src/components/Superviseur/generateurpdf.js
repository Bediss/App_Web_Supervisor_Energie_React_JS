import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
//import { Spin, Button, Alert, Typography } from "antd";
//import * as jsPDF from 'jspdf';
//import jsPDF from 'jspdf';
//const pdfConverterr = new jsPDF;
import { jsPDF } from 'jspdf';
// const jsPDF = require('jspdf')
var pdf = new jsPDF('1', 'pt', 'letter')

class Chart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Sys_equationwithTilde: ["ca01", "+", 1, 2,3,5,6,"-",9,'*',1,0,3,2],
      modal1: false,
    }
  
  }
componentDidMount(){
  console.log('number')
  this.state.Sys_equationwithTilde.map((item, j) =>{
    while(typeof this.state.Sys_equationwithTilde[j] ==='number' && typeof this.state.Sys_equationwithTilde[j+1] ==='number'){
   //console.log(this.state.Sys_equationwithTilde[j]+'number')
   this.state.Sys_equationwithTilde[j] = Number(this.state.Sys_equationwithTilde[j] +""+ this.state.Sys_equationwithTilde[j+1])
  
   this.state.Sys_equationwithTilde.splice(j+1, 1);
  }
  }
  )
  this.state.Sys_equationwithTilde.map((item, j) =>{
    while(typeof this.state.Sys_equationwithTilde[j] ==='number'){
   //console.log(this.state.Sys_equationwithTilde[j]+'number')
   this.state.Sys_equationwithTilde[j] = "#"+this.state.Sys_equationwithTilde[j]
   
  }
  }
  )
  console.log(this.state.Sys_equationwithTilde.join('~')+'~')

}
  cData = {
    labels: ["L 1", "L 2", "L 3", "L 4", "L 5"],
    datasets: [
      {
        label: "Label",
        data: [100, 150, 123, 170, 162],
        backgroundColor: ["red", "green", "yellow", "blue", "orange", "red"]
      }
    ]
  };

  div2PDF = e => {
    /////////////////////////////
    // Hide/show button if you need
    /////////////////////////////

    const but = e.target;
    but.style.display = "none";
    let input = window.document.getElementsByClassName("div2PDF")[0];

    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      //      const pdf = new pdff("l", "pt");
      pdf.addImage(
        img,
        "png",
        input.offsetLeft,
        input.offsetTop,
        //input.clientWidth,
        //input.clientHeight
      );
      pdf.save("chart.pdf");
      but.style.display = "block";
    });
  };

  render() {

    return (
      <div>
        <div>
         
           {/*  <Button type="primary" size="large" icon="plus">
              Add chart
            </Button> */}
          
        </div>
        <div className="div2PDF">
          <Bar
            data={this.cData}
            options={{
              title: {
                display: true,
                text: "Chart to PDF Demo",
                fontSize: 32
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
            height={200}
          />
        </div>
        <div>
          <button onClick={(e) => this.div2PDF(e)}>Export 2 PDF</button>
        </div>
      </div>
    );
  }
}

export default Chart;

ReactDOM.render(<Chart />, document.getElementById("root"));