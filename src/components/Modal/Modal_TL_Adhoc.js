



import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { MDBNav, MDBNavItem, MDBNavLink,MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Swal from 'sweetalert2';
import Modal_TL_V2 from '../Modal/Modal_TL_V2';

import { array } from 'prop-types';
import { useHistory } from "react-router-dom"
import { setDate } from 'date-fns';







const Modal_TL_Adhoc=({toggle, CloneTlTemp})=>{
    const [date,setdate]=useState("")
    const [dateNow,setdateNow]=useState("")
    const [periodicity,setPeriodicity]=useState("Minute")
    const [fonction,setFonction]=useState("max")
    const [periodicityNum,setPeriodicityNum]=useState("1")
    const [operator,setOperator]=useState("-")
    const [intervalleNum,setIntervalleNum]=useState("1")
    const [periodeIntervalle,setPeriodeIntervalle]=useState("Heure")
    const [arrayPer,serArrayPer]=useState([])
    const [arrayInt,serArrayInt]=useState(["Annee","Moi","Semaine","Jour","Heure","Minute"])
    const [optionAvencee,setOptionAvencee]=useState("LOCF")
    const [optionAvenceeBoolean,setOptionAvenceeBoolean]=useState(false)
useEffect(()=>{
        if(date==""){
            // let h = new Date().toJSON();
            // setdateNow(h)
            //   console.log("---->",h)
        let d = new Date().toLocaleString('fr-CA').replace(", ","T").replace(" h ",":").replace(" min ",":")
         console.log("---ddd->",d)
        let c = d.slice(0,16)
        setdateNow(d.slice(0,13))
        setdate(d.slice(0,16))
    console.log("---fffff->",d.slice(0,13),"---",c)
     

        
    }
     },[date])
useEffect(()=>{
    if(periodeIntervalle!=""){
if(periodeIntervalle=="Moi"){
serArrayPer(["Moi","Semaine","Jour","Heure","Minute","seconde"])
}else if(periodeIntervalle=="Semaine"){
    serArrayPer(["Semaine","Jour","Heure","Minute","seconde"])
}else if(periodeIntervalle=="Jour"){
    serArrayPer(["Jour","Heure","Minute","seconde"])
}else if(periodeIntervalle=="Heure"){
    serArrayPer(["Heure","Minute","seconde"])
}else if(periodeIntervalle=="Minute"){
    serArrayPer(["Minute","seconde"])
}else if(periodeIntervalle=="seconde"){
    serArrayPer(["seconde"])
}else {
    serArrayPer(["Annee","Moi","Semaine","Jour","Heure","Minute","seconde"])
}

}

},[periodeIntervalle])
useEffect(()=>{},[arrayPer])

function AjouterTlAdhoc(){
   
    var json ={}
    var b = periodeIntervalle.replace(/Annee/g, "year").replace(/Moi/g, "month").replace(/Semaine/g, "week").replace(/Jour/g, "day").replace(/Heure/g, "hour").replace(/Minute/g, "minute")
    var perTnt = b
    var SqlNow=""
    var dateTimeSQL=""
   var dateTimeUser=[]
    var SQLInt=""
    var userInt=[]
    var userNow=[]
    var tagIot = ""
    var tagCluster = ""
    if(date.slice(0,13)==dateNow){
    if(operator=="-"){
        SqlNow = "iot.date between now()::timestamp-INTERVAL ''"+intervalleNum+perTnt+"'' and now()::timestamp "
        SQLInt=SqlNow
        userNow=[{
            "att": "Entre",
            "order": "asc",
            "valeur": "now() -INTERVAL 'day' and now() ",
            "keyword": "Intervalles",
            "operateur": "Inclure",
            "valeurUser": "Maintenant -INTERVAL "+intervalleNum+periodeIntervalle+ " ,Maintenant"
        }]
        userInt=userNow

    }else {
        SqlNow = "iot.date between now()::timestamp and now()::timestamp + INTERVAL ''"+intervalleNum+perTnt+"'' "
        SQLInt=SqlNow
        userNow=[{
            "att": "Entre",
            "order": "asc",
            "valeur": "now() +INTERVAL 'day' and now() ",
            "keyword": "Intervalles",
            "operateur": "Inclure",
            "valeurUser": "Maintenant +INTERVAL "+intervalleNum+periodeIntervalle+ " ,Maintenant"
        }]
        userInt=userNow
  }  }else{
   

        dateTimeSQL = "iot.date between  ''"+date+"''::timestamp"+operator+"INTERVAL ''"+intervalleNum+perTnt+"'' and ''"+date+"''::timestamp"
        SQLInt=dateTimeSQL
        dateTimeUser=[{
            "att": "Entre",
            "order": "asc",
            "valeur": "now() +INTERVAL 'day' and now() ",
            "keyword": "Intervalles",
            "operateur": "Inclure",
            "valeurUser": "Maintenant -INTERVAL "+intervalleNum+periodeIntervalle+ " ,Maintenant"
        }]
        userInt=dateTimeUser
    

        console.log("json",SqlNow)
        console.log("dateTimeSQL",dateTimeSQL)
   }
    var d = periodicity.replace(/Annee/g, "year").replace(/Moi/g, "month").replace(/Semaine/g, "week").replace(/Jour/g, "day").replace(/Heure/g, "hour").replace(/Minute/g, "minute").replace(/seconde/g, "second")
    var per = d
    var sqlTimeBucket =""
    if(optionAvencee=="INTERPOLATE"){
        sqlTimeBucket="time_bucket_gapfill(''"+periodicityNum+per+"'', iot.date) AS time,INTERPOLATE("+fonction+"(iot.value))as valeur"
    }else if(optionAvencee=="LOCF") {
        sqlTimeBucket="time_bucket_gapfill(''"+periodicityNum+per+"'', iot.date) AS time,LOCF("+fonction+"(iot.value))as valeur"
    }

    var SqlIot=[
        {
            "SQL": SQLInt ,
            "SQLc": "where asc"
        },
   
        {
         
            "SQL":sqlTimeBucket ,   
            "SQLc": "select"
        }
    ]
    var SqlCluster=[
        {
            "SQL": "order by cc_m,time desc limit 1" ,
            "SQLc": "limit"
        }
       
    ].concat(SqlIot)

    console.log("dateTimeSQL",SqlCluster)
    console.log("dateTimeSQL  SqlIot",SqlIot)
    var userIot=userInt.concat([
        {
            "att": "Ad hoc periodicites remplissait les cases vides",
            "order": "",
            "valeur": periodicityNum+per,
            "keyword": "Ad hoc periodicites",
            "operateur": "Intervalle",
            "valeurUser": periodicityNum+periodicity
        }
    ])
    var UserCluster=userIot.concat([
        {
            "att": "Entier",
            "order": "",
            "valeur": "1",
            "keyword": "Limite",
            "operateur": "Ascendant",
            "valeurUser": "1"
        }
    ])

  
    
    console.log("json",json)
    if(operator=="-"){
        var fonctionVar = fonction.replace("AVG","moyenne")
        tagIot=("Dernières "+intervalleNum+" "+periodeIntervalle+" par "+periodicityNum+" "+periodicity+" à partir du " +date.replace("T"," "))
        tagCluster=("Dernières "+intervalleNum+" "+periodeIntervalle+" "+fonctionVar+" valeur à partir du " +date.replace("T"," "))
    }else{
        tagIot=("prochaines "+intervalleNum+" "+periodeIntervalle+" par "+periodicityNum+" "+periodicity+" à partir du " +date.replace("T"," "))
        tagCluster=("prochaines "+intervalleNum+" "+periodeIntervalle+" "+fonctionVar+" valeur à partir du " +date.replace("T"," "))
    }
    console.log("tagIot",tagIot)
    console.log("tagCluster",tagCluster)
    var json ={
        "tlCluster":{
            "tag": tagCluster,
            "tl_members":[{
            "Tl_Sql": SqlCluster,
            "Tl_User": UserCluster
        }]
        },
        "tlIot":{
            "tag": tagIot,
            "tl_members":[
         {  
              "Tl_Sql": SqlIot,
            "Tl_User": userIot
        }
            ]
        }
    }

    CloneTlTemp(json,tagIot)

    toggle()
 
}

function optionAvenceeFun(){
    setOptionAvenceeBoolean(!optionAvenceeBoolean)
    if (optionAvenceeBoolean == false) {
        setOptionAvencee("INTERPOLATE")
    }else {
        setOptionAvencee("LOCF")
    }

}
useEffect(() => {
console.log("--------------------------optionAvencee--------",optionAvencee,optionAvenceeBoolean)
}, [optionAvenceeBoolean,optionAvencee])

return(

<>
<MDBModalHeader toggle={toggle}>Ad hoc Time Intelligence </MDBModalHeader>
<MDBModalBody>

<MDBRow>
<MDBCol size="12">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text">
             Date
            </label>
            <MDBInput style={{ width: "100%", marginLeft: "0%",height:"37px" }} outline size="sm"  type="datetime-local" className="form-control" name="date" value={date} placeholder="" onChange={(e) => setdate(e.target.value)} />

</MDBCol>
<MDBCol size="12">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Intervalle
            </label>
            <MDBRow>     
            <MDBCol size="4"> 
<select className="browser-default custom-select" name="operator" value={operator} style={{ width: "100%",textAlign:"center" }} onChange={(e) => setOperator(e.target.value)} required >
<option value="-" >-</option>
<option value="+" >+</option>
</select>

</MDBCol >

<MDBCol size="4"> 
<input type="number" style={{height:"37px"}}  className="form-control form-control-sm" name="intervalleNum" value={intervalleNum} onChange={(e) => setIntervalleNum(e.target.value)} />
</MDBCol >
<MDBCol size="4"> 
<select className="browser-default custom-select" name="periodeIntervalle" value={periodeIntervalle} style={{ width: "100%",textAlign:"center" }} onChange={(e) => setPeriodeIntervalle(e.target.value)} required>

{arrayInt.map((list, i) =>
<option >{list}</option>
)}

</select>
</MDBCol >
</MDBRow>

</MDBCol>

<MDBCol size="12">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ marginTop: "1%" }}>
Periodicity
            </label>
            <MDBRow>     
            <MDBCol size="4"> 
<select className="browser-default custom-select" name="fonction" value={fonction} style={{ width: "100%",textAlign:"center" }} onChange={(e) => setFonction(e.target.value)} required>
<option value="max">Max</option>
<option value="min" >Min</option>
<option value="AVG">Moyenne</option>
</select>
</MDBCol >

<MDBCol size="4"> 
<input type="number" style={{height:"37px"}}  className="form-control form-control-sm" name="periodicityNum" value={periodicityNum} onChange={(e) => setPeriodicityNum(e.target.value)} />

</MDBCol >
<MDBCol size="4"> 
<select className="browser-default custom-select" name="periodicity" value={periodicity} style={{ width: "100%",textAlign:"center" }} onChange={(e) => setPeriodicity(e.target.value)} required>



{arrayPer.map((list, i) =>
<option >{list}</option>
)}


</select>
</MDBCol >

<MDBCol size="12"> 


<div style={{ marginTop: "2%" }}>
                                <input  type="checkbox" name="optionAvencee" value={optionAvencee} checked= {optionAvenceeBoolean}  onChange={optionAvenceeFun} />
                                <label htmlFor="defaultFormLoginEmailEx" style={{ fontSize: "17px", marginLeft: "10px" }}  >lisser le tracé du graphique</label>
                            </div>


</MDBCol >
</MDBRow>
</MDBCol>


<MDBCol size="12">
<label htmlFor="defaultFormLoginEmailEx" className="grey-text" style={{ marginTop: "1%" }}>
valeur instantanée
            </label>

            
            <div style={{ marginTop: "0%" }}>
                                <input  type="checkbox" name="now" value="now"  checked="true" disabled />
                                <label htmlFor="defaultFormLoginEmailEx" style={{ fontSize: "17px", marginLeft: "10px" }}  >Derniéres lectures</label>
                            </div>
</MDBCol>


</MDBRow>


</MDBModalBody>
<MDBModalFooter>
    
  <MDBBtn color="#e0e0e0 grey lighten-2" style={{marginRight: "40%"}} onClick={AjouterTlAdhoc}
  > <MDBIcon icon="plus" className="ml-1"  /> Ajouter</MDBBtn>

    </MDBModalFooter>
   


</>


)








}

export default Modal_TL_Adhoc