import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem} from "mdbreact";
import RapportRoute from '../RapportRoute';
import { set } from 'react-hook-form';
import { parseParams } from '../Rapporteur/Rapport/layoutGen/extra'
import Navbar from "../../components/navbar";

class  HotListe extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          history: props.history,
        }
      }
    VisualiserRapportIdFunction=()=>{

    }
    EnregisterNew=()=>{

    }
    render() {
        return (
<>

<Navbar history={this.state.history} EnregisterNew={this.EnregisterNew} Visualiser_Rapport_Id_function={this.VisualiserRapportIdFunction} />
<NavigateurHotListe history={this.state.history} />
</>
        )
        }


}




export default HotListe;


const NavigateurHotListe = ({history}) => {
const [layoutFormat,setLayoutFormat]=useState(null)
const [Report_Name_Affichage, setReport_Name_Affichage] = useState("")
const [Report_TableauName_Affichage, setReport_TableauName_Affichage] = useState("")

useEffect(()=>{
    setLayoutFormat({ height: window.screen.availHeight / 1.56 + `px`, width: `${window.screen.availWidth - 90}px` })

},[])



function callback(data) {
    console.log("--------------------------------------",data)
    if (data.Report_TableauName!=undefined&&data.Report_Name!=undefined){
    setReport_TableauName_Affichage(data.Report_TableauName)
    setReport_Name_Affichage(data.Report_Name)
}else {
  //  console.log("FactBook",data.configLayout)

  if(data.configLayout!=undefined){
      console.log("--------------------------22------------",data)
     setReport_Name_Affichage(data.configLayout.title)
   setReport_TableauName_Affichage(undefined)    
  }

}
  }
    return(<>
       <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  HotListe </MDBBreadcrumbItem>
          {Report_TableauName_Affichage != undefined ?(<MDBBreadcrumbItem > Tableaux: {Report_TableauName_Affichage} </MDBBreadcrumbItem>) : null}
         { Report_Name_Affichage != undefined ? (   <MDBBreadcrumbItem > Rapport: {Report_Name_Affichage}</MDBBreadcrumbItem>) : null}
        </MDBBreadcrumb>

        <RapportRoute history={history} layoutFormat={layoutFormat} callback={callback} />
    </>);
}
