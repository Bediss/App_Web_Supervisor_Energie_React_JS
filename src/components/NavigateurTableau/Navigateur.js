import React, { useEffect, useState } from 'react';
import GenerateTable from '../Rapporteur/Rapport/layoutGen/layoutGenerator';
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import RapportRoute from '../RapportRoute';
import { parseParams } from '../Rapporteur/Rapport/layoutGen/extra'
import Navbar from "../../components/navbar";
import "../NavigateurTableau/NavigateurCss.css"
class NavigateurRapport extends React.Component {
  /***********************************************************Variable********************************************************** */
  constructor(props) {
    super(props)
    this.state = {
      AjouterRapport: false,
      screen: "",
      layoutFormat: null,
      history: props.history,
      jsonNewRappoer: null,
    }
  }
  /*************************************************************************************************************************** */
  /*********************************************componentDidMount*******************history.location.search********************* */
  componentDidMount() {
    const query = parseParams(this.state.history.location.search)
    console.log("localStorage.getItem('User_Report')", localStorage.getItem('User_Report'))
    if (!("reportId" in query || "reportName" in query)) {


      this.state.history.push({ search: `?reportId=${localStorage.getItem('User_Report')}` })
    }
    this.setState({ screen: window.screen.availHeight / (0.850 * 2.02) })
    this.setState({ layoutFormat: { height: window.screen.availHeight / 1.56 + `px`, width: `${window.screen.availWidth - 90}px` } })
  }
  /************************************************************************************************************************** */
  /*************************************************New report save************************************************************ */
  EnregisterNew = (EnregisterTemp) => {
    this.setState({ AjouterRapport: true })
    this.setState({ jsonNewRappoer: EnregisterTemp })
  }
  VisualiserRapportIdFunction = (type) => {
    this.setState({ AjouterRapport: type })
  }
  /****************************************************************************************************************************** */
  render() {
    return (
      <>
        <Navbar history={this.state.history} EnregisterNew={this.EnregisterNew} Visualiser_Rapport_Id_function={this.VisualiserRapportIdFunction} />
        <Visualiser_Rapport
          AjouterRapport={this.state.AjouterRapport}
          history={this.state.history}
          layoutFormat={this.state.layoutFormat}
          jsonNewRappoer={this.state.jsonNewRappoer}
        />
      </>)
  }
}

export default NavigateurRapport;

const Visualiser_Rapport = ({ AjouterRapport, history, layoutFormat, jsonNewRappoer }) => {
  /***********************************************Variable************************************************** */
  const [Report_Name_Affichage, setReport_Name_Affichage] = useState("")
  const [Report_TableauName_Affichage, setReport_TableauName_Affichage] = useState("")
  const [reportI_href, setReportI_href] = useState("")
  const [config, setConfig] = useState(null)
  const [GenerateTableActive, setGenerateTableActive] = useState(false)
  /************************************************************************************************************************* */
  /****************************************************New json Rapport**************************************************** */
  useEffect(() => {
    if (jsonNewRappoer != null) {
      setConfig(jsonNewRappoer[0].Body)
      setReport_TableauName_Affichage(jsonNewRappoer[0].Report_TableauName)
      setReport_Name_Affichage(jsonNewRappoer[0].Report_Name)
      setGenerateTableActive(false)
      setTimeout(() => setGenerateTableActive(true), 1000)
      history.push({ search: `` })
    }
  }, [jsonNewRappoer])
  /********************************************************************************************************************** */
  /****************************************************history.location.search******************************************* */
  useEffect(() => {

    const queryVariavle = parseParams(history.location.search)
    const { reportId } = { ...queryVariavle }
    if (reportId != "") {
      setReportI_href(reportId)
    }
    console.log('reportId', reportId)

  }, [history.location.search])
  /************************************************************************************************************* */
  /*****************************************callback donée d'un rapport***************************************** */
  useEffect(() => {
  }, [Report_TableauName_Affichage, Report_Name_Affichage, jsonNewRappoer, AjouterRapport])
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
    AjouterRapport = false
  }
  /***************************************************************************************************************** */
  return (
    <>
      <MDBBreadcrumb className="NavigateurBread" style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
        <MDBBreadcrumbItem>Tableau de bord</MDBBreadcrumbItem>
        
          {Report_TableauName_Affichage != undefined ?(<MDBBreadcrumbItem > Tableaux: {Report_TableauName_Affichage} </MDBBreadcrumbItem>) : null}
         { Report_Name_Affichage != undefined ? (   <MDBBreadcrumbItem > Rapport: {Report_Name_Affichage}</MDBBreadcrumbItem>) : null}

      

      </MDBBreadcrumb>
      <div className="rapportNavigateur">
        {AjouterRapport == false&&reportI_href!=undefined ? (<RapportRoute history={history} layoutFormat={layoutFormat} callback={callback} />) :
          AjouterRapport == true ? (
            layoutFormat && GenerateTableActive &&
            <GenerateTable  dummy={false} editor={false} supervisor={true} config={config} maxCols={5} maxRows={5} style={{ width: layoutFormat.width, height: layoutFormat.height }} />
          ) : null
        }

      </div>
    </>
  )
}