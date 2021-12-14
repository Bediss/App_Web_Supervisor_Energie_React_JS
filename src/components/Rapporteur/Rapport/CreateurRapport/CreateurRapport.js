import 'react-tabulator/lib/styles.css';
import React, { useState } from "react";
import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import axios from 'axios';
//import "../Rapporteur/CreateurRapport/CreateurRapport.css"
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBInput, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import uuid from 'react-uuid';
import Moment from 'moment';
import { Prompt } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import Swal from 'sweetalert2';
import $ from "jquery"
//import ConfirmNavigationModal from "./your-own-code";
class CreateurRapport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {


            matrix: null
        }
    }
    handleClick = (maxRows,maxCols) => {

        // nbr of checked elems
        const checked = []
        // nbr of rows in checked list
        const rowChecked = []
        // total rows in check list
        let totalRowsInCheckList = 0
        // total cols in check list
        let totalColsInCheckList = 0
        $("#c td").each((i, elem) => {
            if ($(elem).find("input")[0].checked) {
                checked.push(elem)
            }
        })

        $("#c tr").each((i, elem) => {
            $(elem).find("input").each((i, elem) => {
                if (elem.checked) {
                    totalRowsInCheckList++
                    return false
                }
            })
        })
        // for (let i = 0; i < maxCols; i++) {
        //     $("#c td")
        //     console.log("elem")
        // }

        // for (let checkedElem of checked){
        //     console.log(checkedElem)
        // }

        $("#c tr").each((i, elem) => {
            $(elem).find("td").each((i, elem) => {

                if ($(elem).find("input").is(":checked")) {
                    totalColsInCheckList++
                }
                //    if ($(elem).find("input")[0].checked){
                //     totalColsInCheckList++
                //     return false
                //    }
            })
        })



        // $(checked[0]).attr("rowspan",totalRowsInCheckList).attr("colspan",totalColsInCheckList)
        console.log("totalRowsInCheckList", totalRowsInCheckList)
        console.log("totalColsInCheckList", totalColsInCheckList)
        // checked.map((td,i)=>{
        //     if (i!=0){
        //         td.remove()
        //     }
        // })

    }

    render() {

        return (
            <>
                <MDBBreadcrumb style={{ backgroundColor: '#fff' }}>
                    <MDBBreadcrumbItem >  Rapporteur</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active> Création de rapport</MDBBreadcrumbItem>
                </MDBBreadcrumb>
                <button  onClick={() => this.handleClick()} >aaaaaa</button>
                <GenerateTable dummy={false} maxRows={3} maxCols={3} className={""} style={{ width: "100%", height: "500px", border: "1px solid black", textAlign: "center" }} />
            </>
        );
    }
}
export default CreateurRapport;

class GenerateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxRows:props.maxRows,
            maxCols:props.maxCols,
            style:props.style,
            className:props.className
          }
    }
    render() {
        return (
        <table style={this.props.style}>
        <tbody>
        {Array(this.state.maxRows).fill("").map((row,i)=>(
             <tr key={i}>
                 {Array(this.state.maxCols).fill("").map((col,j)=>(
                    <td key={`${i}-${j}`} id={`r_${i + 1}--c_${j + 1}`} rowSpan="1" colSpan="1">
                      <input type="checkbox" name="" value="" />
                  </td>
                 ))}
             </tr>
        )
        )}
        </tbody>

    </table> );
    }
}