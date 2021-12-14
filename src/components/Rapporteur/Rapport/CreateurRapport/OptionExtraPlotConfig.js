import { MDBCol, MDBRow } from "mdbreact"
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
const OptionExtraPlotConfig =({function_type,extraPlotConfigFin,IndicateurY2array=[],Y2_Indicateur_fin})=>{



function extraPlotConfigFunction(extraPlotConfig){
console.log("*********************>>>>",extraPlotConfig)

extraPlotConfigFin(extraPlotConfig)

}
function Y2_Indicateur_Function(Y2_Array,Y1_Array){
    console.log("*Y2_Array*",Y2_Array)
    console.log("*Y2_Array*",Y1_Array)
    Y2_Indicateur_fin(Y2_Array,Y1_Array)
}

    switch (function_type) {
        case "Bar":
                return (<Bar extraPlotConfigFunction={extraPlotConfigFunction}/>)
        case "ScatterBar":
                    return (<Bar extraPlotConfigFunction={extraPlotConfigFunction}/>)  
        
        case "Indicator":
            return (<Indicator extraPlotConfigFunction={extraPlotConfigFunction} IndicateurY2array={IndicateurY2array} Y2_Indicateur_Function={Y2_Indicateur_Function}/>)
        
    
        default:
            return <></>
    }


}
export default OptionExtraPlotConfig



const Bar = ({extraPlotConfigFunction}) => {
const [Orientation,setOrientation]=useState("v")
const [text,setText]=useState("true")
const [axe,setAxe]=useState("true")
const [ordre,setOrdre]=useState("ascending")
const [type,setType]=useState("")
const [chcboxValue,setChcboxValue]=useState(false)
const [extraPlotConfig,setExtraPlotConfig]=useState(null)

 function   onChangeOrientation(e){

    const value = e.target.value;
    setOrientation(value)

 }
 function   onChangeText(e){

    const value = e.target.value;
    setText(value)

 }
 function   onChangeAxe(e){

    const value = e.target.value;
    setAxe(value)

 }
 function   onChangeOrdre(e){

    const value = e.target.value;
    setOrdre(value)

 }
 function   onChangeType(e){

   // const value = e.target.value;
    

    
    setChcboxValue(!chcboxValue)
    
 }

 useEffect(() =>{
    console.log("---------------------------->",type)
 },[type])
 useEffect(() =>{


    console.log("-----------chcboxValue----------------->",chcboxValue)
    if (chcboxValue==true){
        setType("sort")
    }else {
        setType("")
    }
 },[chcboxValue])
 useEffect(() =>{
   var extraPlotConfig=null
    if (chcboxValue==true){
        extraPlotConfig={
            "orientation":Orientation,
       //     "addTexts":text,
       "addTexts":true,
            "transforms" : [{
                "type":type ,
               // "target": axe,
               "target": true,
                "order": ordre
              }]
        }
    }else {
        extraPlotConfig={
            "orientation":Orientation,
            "addTexts":text
        }
    }
    setExtraPlotConfig(extraPlotConfig)
 },[chcboxValue,Orientation,text,type,axe,ordre])

 useEffect(()=>{

console.log("extraPlotConfigextraPlotConfigextraPlotConfig",extraPlotConfig)
extraPlotConfigFunction(extraPlotConfig)
 },[extraPlotConfig,chcboxValue,Orientation,text,type,axe,ordre])

    return ( 
<>
<fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

<legend style={{ width: "304px", color: "#51545791", fontSize: "20px", textAlign: "center" }} >Les options pour la fonction bar </legend>

<MDBRow>
<MDBCol size="6">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Orientation</label>
<select  id="select2"  className="browser-default custom-select" name="Orientation"  value={Orientation}  onChange={onChangeOrientation} style={{width: "100%"}} >
                      <option value="v">Vertical </option>
                      <option value="h">Horizontale</option>
</select>
</MDBCol>

<MDBCol size="6">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Text</label>
<select  id="select2"  className="browser-default custom-select" name="text"  value={text}  onChange={onChangeText} style={{width: "100%"}} >
                      <option value="true">Oui </option>
                      <option value="false">Non</option>
</select>
</MDBCol>
<MDBCol size="4">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Type</label>

<div style={{marginTop:"2%"}}>
<input style={{marginLeft:"-10px"}} type="checkbox"  name="Sort" value="sort"  onChange={onChangeType} checked={chcboxValue}  />
<label htmlFor="defaultFormLoginEmailEx"  style={{ fontSize: "17px",marginLeft:"10px" }}  >Sorte</label>
</div>
</MDBCol>
<MDBCol size="4">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Axe</label>
<select  id="select2" className="browser-default custom-select" name="axe"  value={axe}  onChange={onChangeAxe} style={{width: "100%"}} disabled={!chcboxValue}>
                      <option value="true">Oui </option>
                      <option value="false">Non</option>
</select>
</MDBCol>
<MDBCol size="4">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Ordre</label>
<select  id="select2" className="browser-default custom-select" name="ordre"  value={ordre}  onChange={onChangeOrdre} style={{width: "100%"}} disabled={!chcboxValue}>
                      <option value="ascending">Ascendant</option>
                      <option value="descending">Descendant</option>
</select>
</MDBCol>
</MDBRow>
</fieldset>
</>


     )
}

const Indicator =({extraPlotConfigFunction,IndicateurY2array=[],Y2_Indicateur_Function})=>{

    const [forme,setForme]=useState("")
    const [min,setMin]=useState("")
    const [max,setMax]=useState("")
    const [delta,setDelta]=useState("")
    const [objectif,setObjectif]=useState("")
    const [Y2_Indicateur,setY2_Indicateur]=useState([])
    const [text,setText]=useState("true")
    const [extraPlotConfig,setExtraPlotConfig]=useState(null)
    const [Y1_selected,setY1_selected]=useState([])
    function   onChangeForme(e){
        const value = e.target.value;
        setForme(value)
    
     }
     function   onChangeY1_selected(e){
      const value = e.target.value;
      setY1_selected(value)
  
   }
     function   onChangeMin(e){
        const value = e.target.value;
        setMin(value)
    
     }
     function   onChangeObjectif(e){
        const value = e.target.value;
        setObjectif(value)
    
     }
     function   onChangeMax(e){
        const value = e.target.value;
        setMax(value)
    
     }
     function   onChangeDelta(e){
        const value = e.target.value;
        setDelta(value)
    
     }
     function   onChangeText(e){

      const value = e.target.value;
      setText(value)
  
   }
     useEffect(() =>{
        var extraPlotConfig={}
  if (forme!=""){
   extraPlotConfig={
      "gauge": {
         
          "shape": forme,
      },
      "showTitle": text
   }
  }else {
   extraPlotConfig={
      "showTitle": text
   }
  }
           
            
         setExtraPlotConfig(extraPlotConfig)
      },[forme,text])

      useEffect(()=>{

        console.log("extraPlotConfigextraPlotConfigextraPlotConfig",extraPlotConfig)
        extraPlotConfigFunction(extraPlotConfig)
         },[extraPlotConfig,forme,text])
         useEffect(()=>{

            console.log("IndicateurY2array",IndicateurY2array)
         
             },[IndicateurY2array])

             useEffect(()=>{
                setY2_Indicateur([min,max,delta,objectif])
             },[min,max,delta,objectif,extraPlotConfig,forme,text])


             useEffect(()=>{
                console.log(Y2_Indicateur)
                Y2_Indicateur_Function(Y2_Indicateur,[Y1_selected])
             },[Y2_Indicateur,Y1_selected,min,max,delta,objectif,extraPlotConfig,forme,text])

useEffect(()=>{
console.log("Y1_selected",Y1_selected)
},[Y1_selected])
    return ( 
        <>
   <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>
        
        <legend style={{ width: "384px", color: "#51545791", fontSize: "20px", textAlign: "center" }} >Les options pour la fonction Indicator</legend>
        
        <MDBRow>
      
        
        <MDBCol size="6">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Forme</label>
        <select  id="select2"  className="browser-default custom-select" name="forme"  value={forme}  onChange={onChangeForme} style={{width: "100%"}} >
                              <option value=""></option>
                              <option value="angular">angulaire </option>
                              <option value="bullet">balle</option>
        </select>
        </MDBCol>

        <MDBCol size="6">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Titre</label>
<select  id="select2"  className="browser-default custom-select" name="text"  value={text}  onChange={onChangeText} style={{width: "100%"}} >
                      <option value="true">Oui </option>
                      <option value="false">Non</option>
</select>
</MDBCol>
        <MDBCol size="3">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Minimum</label>
        <select  id="select2"  className="browser-default custom-select" name="min"  value={min}  onChange={onChangeMin} style={{width: "100%"}} >
        <option></option>
        {  IndicateurY2array.map(liste =>
                      <option>{liste}</option>)}
        </select>
        </MDBCol>
        <MDBCol size="3">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Maximum</label>
        <select  id="select2"  className="browser-default custom-select" name="max"  value={max}  onChange={onChangeMax} style={{width: "100%"}} >
        <option></option>

      {  IndicateurY2array.map(liste =>
                      <option>{liste}</option>)}
        </select>
        </MDBCol>
        <MDBCol size="3">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Delta</label>
        <select  id="select2"  className="browser-default custom-select" name="delta"  value={delta}  onChange={onChangeDelta} style={{width: "100%"}} >
        <option></option>

        {  IndicateurY2array.map(liste =>
                      <option>{liste}</option>)}
        </select>
        </MDBCol>
        <MDBCol size="3">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >Objectif</label>
        <select  id="select2"  className="browser-default custom-select" name="objectif"  value={objectif}  onChange={onChangeObjectif} style={{width: "100%"}} >
        <option></option>

        {  IndicateurY2array.map(liste =>
                      <option>{liste}</option>)}
        </select>
        </MDBCol>


        <MDBCol size="12">
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ fontSize: "17px" }}  >valeur</label>
        <select  id="select2"  className="browser-default custom-select" name="Y1_selected"  value={Y1_selected}  onChange={onChangeY1_selected} style={{width: "100%"}} >
        <option></option>

        {  IndicateurY2array.map(liste =>
                      <option>{liste}</option>)}
        </select>
        </MDBCol>
        </MDBRow>
        </fieldset>
        </>
        
        
             )
}