import React, { useEffect, useState } from "react";
import Tabulator from "tabulator-tables";

//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Datetime from 'react-datetime';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ReactTabulator } from 'react-tabulator'
import { contains } from "jquery";
const Emploi_Temps = ({ AjoutTab }) => {

    //var data = [];
    const [dataTabulator, setdataTabulator] = useState([])

    const columns = [

        {
            title: "Mot clé",
            field: "keyword",
            width: "20%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
               // console.log(position);
                // datamodifier.splice(0, 2); 
                // datamodifier.push(cell.getData(), position);
                // console.log("valider",datamodifier)

            }
        },

        {
            title: "Traitement",
            field: "operateur",
            width: "20%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
              //  console.log(position);
                // datamodifier.splice(0, 2); 
                // datamodifier.push(cell.getData(), position);
                // console.log("valider",datamodifier)

            }
        },
        {
            title: "opérateur",
            field: "att",
            width: "17%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
              //  console.log(position);
                // datamodifier.splice(0, 2); 
                // datamodifier.push(cell.getData(), position);
                // console.log("valider",datamodifier)

            }
        },
        {
            title: "Temp",
            field: "valeurDev",
            width: "23%",
            cellClick: function (e, cell, row) {
                var position = cell.getRow().getPosition()
                //console.log(position);
                // datamodifier.splice(0, 2); 
                // datamodifier.push(cell.getData(), position);
                // console.log("valider",datamodifier)

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
                supprimertemp.push(cell.getData().valeur);
           //     console.log("supprimertemp", supprimertemp)

                for (var i = 0; i < supprimertemp.length; i++) {

                    var index = -1;
                    var val = supprimertemp[i]
            //        console.log(val)
                    var filteredObj = JsonOperateurValue.find(function (item, i) {
                        if (item.valeur === val) {
                            index = i;
                            return i;
                        }
                    });

             //       console.log(index, filteredObj);
                    if (index > -1) {
                        JsonOperateurValue.splice(index, 1);
                    }
                }


                for (var i = 0; i < supprimertemp.length; i++) {

                    var index = -1;
                    var val = supprimertemp[i]
       //             console.log(val)
                    var filteredObj = dataTabulator.find(function (item, i) {
                        if (item.valeur === val) {
                            index = i;
                            return i;
                        }
                    });

              //      console.log(index, filteredObj);
                    if (index > -1) {
                        dataTabulator.splice(index, 1);
                    }
                }
        //        console.log("JsonOperateurValue", JsonOperateurValue, "dataTabulator", dataTabulator)
                setJsonOperateurValue(JsonOperateurValue)
                setdataTabulator(dataTabulator)
                AjoutTab(JsonOperateurValue)
                cell.getRow().delete();
            }
        },
    ];

    const [jourArrayHaut,setJourArrayHaut]=useState(["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"])
    const [jourArrayDans,setJourArrayDans]=useState([])
    const [jourArrayBas,setJourArrayBas]=useState([])
    const [minimumDateHeure,setMinimumDateHeure]=useState([])
    const [minimumDate,setMinimumDate]=useState([])
    const [supprimertemp, setsupprimertemp] = useState([])
    const [modificationtemp, setmodificationtemp] = useState([])
    const [datamodifier, setdatamodifier] = useState([])
    const [ajoutertap, setajoutertap] = useState([])
    const [ajouterUserInterface, setajouterUserInterface] = useState([])
    const [totale_Dans, settotale_Dans] = useState([])
    const [totale_DansJour, settotale_DansJour] = useState([])
    const [JsonOperateurValue, setJsonOperateurValue] = useState([])
    const [keyword, setkeyword] = useState("")
    const [heure, setheure] = useState("")
    const [dateHeure, setdateHeure] = useState("")
    const [date, setdate] = useState("")
    const [operateur, setoperateur] = useState("")
    const [operateur2, setoperateur2] = useState("")
    const [haut, sethaut] = useState("")
    const [bas, setbas] = useState("")
    const [dans, setdans] = useState("")
    const [hautJour, sethautJour] = useState("")
    const [basJour, setbasJour] = useState("")
    const [dansJour, setdansJour] = useState("")
    const [Att, setAtt] = useState("")
    const [Valeur, setValeur] = useState("")
    const [valeur2, setvaleur2] = useState("")
    //const [valeur_format, setvaleur_format] = useState("")
    const [position, setposition] = useState("")
    const [fleche, setfleche] = useState("")
    const [DansDev, setDansDev] = useState([])
    const [timeVar, settimeVar] = useState("")

    function BtnNouveau() {
        var $ = require("jquery");
        $('#BtnModifier').hide();
        $('#FromModifier').hide();
        $('#BtnNouveau').hide();
        $('#tab').hide();
        $('#FromNouveau').show();
        $('#BtnTab').show();
        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').hide();
        $('#EnsembleDateHeureNouveau').hide();
        setkeyword("");
        setoperateur("");
        setheure("");
        setdateHeure("")
        setdate("")
    }
    function BtnTab() {

        var $ = require("jquery");
        $('#FromNouveau').hide();
        $('#FromModifier').hide();
        $('#BtnTab').hide();
        $('#BtnNouveau').show();
        $('#BtnModifier').show();
        $('#tab').show();

    }

    function ajoutTab() {
        var validierAjoutTab = false
      
        var validierAjoutTabEntre = false
     
        var att = ""
        var valeur = ""
        var valeur_format=""
            console.log("timeVar",timeVar)
            if(timeVar=="heure"){
                valeur_format="time"
            }else if(timeVar=="date")
            {
                valeur_format="date"
            }else if(timeVar=="dateHeure"){
                valeur_format="timestamp"
            }else if(timeVar=="jour"){
                valeur_format="date"
            }





        if (haut != "" && bas == "") {
 
            att = "Haut"
            setAtt(att)
            




            valeur = ("''" + haut + "''")
            setValeur(valeur)
            var valeurDev =""
            if (timeVar == "jour"){
             valeurDev = hautJour

            }else{
            valeurDev = haut
            }



            dataTabulator.push({ keyword, operateur, att, valeur, valeurDev });
            sethaut("")
            setbas("")
            validierAjoutTab=true
            validierAjoutTabEntre=true
        }
        if (haut == "" && bas != "") {

            att = "Bas"
            setAtt(att)


            valeur = ("''" + bas + "''")
            setValeur(valeur)


            var valeurDev =""
            if (timeVar == "jour"){
             valeurDev = basJour

            }else{
            valeurDev = bas
            }


            dataTabulator.push({ keyword, operateur, att, valeur, valeurDev });
            sethaut("")
            setbas("")
            validierAjoutTab = true
            validierAjoutTabEntre = true
        }
        if(timeVar=="jour"){
var hautValeur= 0
var basValeur=0

 if (hautJour != "" && basJour != "") {

console.log("hautJour",hautJour,"basJour",basJour)
if(hautJour=="Lundi"){
    hautValeur=1
}else if(hautJour=="Mardi"){
    hautValeur=2
}
else if(hautJour=="Mercredi"){
    hautValeur=3
}
else if(hautJour=="Jeudi"){
    hautValeur=4
}
else if(hautJour=="Vendredi"){
    hautValeur=5
}
else if(hautJour=="Samedi"){
    hautValeur=6
}
else if(hautJour=="Dimanche"){
    hautValeur=7
}



if(basJour=="Lundi"){
    basValeur=1
    }else if(basJour=="Mardi"){
        basValeur=2
    }
    else if(basJour=="Mercredi"){
        basValeur=3
    }
    else if(basJour=="Jeudi"){
        basValeur=4
    }
    else if(basJour=="Vendredi"){
        basValeur=5
    }
    else if(basJour=="Samedi"){
        basValeur=6
    }
    else if(basJour=="Dimanche"){
        basValeur=7
    }
console.log("basValeur",basValeur)
console.log("hautValeur",hautValeur)
            if(basValeur>hautValeur){
            att = "Entre"
            setAtt(att)
            valeur = ("''" + haut + "'' and ''" + bas + "''")
            setValeur(valeur)
            var valeurDev =""
             valeurDev = hautJour + ',' +basJour
            dataTabulator.push({ keyword, operateur, att, valeur, valeurDev });
            sethaut("")
            setbas("")
            validierAjoutTab=true
            validierAjoutTabEntre=true
        }
        }else if(hautJour!=""&&basJour!=""){
            if(basValeur<=hautValeur){
                Swal.fire({
                    toast: true,
                    position: 'top',
    
                    showConfirmButton: false,
                    timer: 6000,
                    icon: 'warning',
                    width: 600,
                    title: 'Il faut ajouter la valeur Bas Supérieur à la valeur Haut'
                })
              }
              validierAjoutTab = false
              validierAjoutTabEntre = false
        }
}else{
    if (haut != "" && bas != "") {
        if(bas>haut){
        att = "Entre"
        setAtt(att)
        valeur = ("''" + haut + "'' and ''" + bas + "''")
        setValeur(valeur)
    
       var valeurDev = haut + ',' + bas
      

        dataTabulator.push({ keyword, operateur, att, valeur, valeurDev });
        sethaut("")
        setbas("")
        validierAjoutTab=true
        validierAjoutTabEntre=true
    }
    }else if(haut!=""&&bas!=""){
        if(bas<=haut){
   
            Swal.fire({
                toast: true,
                position: 'top',

                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Il faut ajouter la valeur Bas Supérieur à la valeur Haut'
            })
          }
          validierAjoutTab=false
          validierAjoutTabEntre=false
    }
}
       

        if (totale_Dans != "") {

            att = "Dans"
            setAtt(att)
            var b = totale_Dans.toString().replace("Dimanche","(date_trunc('week', now())::date + interval '6 day')::date")
            .replace("Samedi","(date_trunc('week', now())::date + interval '5 day')::date")
            .replace("Vendredi","(date_trunc('week', now())::date + interval '4 day')::date")
            .replace("Jeudi","(date_trunc('week', now())::date + interval '3 day')::date")
            .replace("Mercredi","(date_trunc('week', now())::date + interval '2 day')::date")
            .replace("Mardi","(date_trunc('week', now())::date + interval '1 day')::date")
            .replace("Lundi","(date_trunc('week', now())::date)::date")
            .replace(/'/g,"''")
            valeur = ("(" + b.slice(0, -1) + ")")
            setValeur(valeur)

            var valeurDev =""
           

            const a = totale_Dans.slice(0, -1)
            valeurDev = a.replace(/'/g, "")

       
            console.log("valeurDev----totale_Dans",valeurDev)
            dataTabulator.push({ keyword, operateur, att, valeur, valeurDev });
            settotale_Dans("")
            validierAjoutTab=true
            validierAjoutTabEntre = true
        }
        console.log("validierAjoutTab",validierAjoutTab)
        console.log("timeVar",timeVar)
           if(validierAjoutTab==true&&keyword!=""&&operateur!=""&&validierAjoutTabEntre==true){
               console.log("valeur",valeur)
        JsonOperateurValue.push({ "keyword": keyword, "operateur": operateur, "att": att, "valeur": valeur, "valeur_format": valeur_format })
       console.log("JsonOperateurValue", JsonOperateurValue)
        AjoutTab(JsonOperateurValue)
        var $ = require("jquery");
        $('#formulaire')[0].reset();
        $('#IntervalleTime').show();
        $('#IntervalleTimeNouveau').show();
        $('#EnsembleTimeNouveau').hide();
        $('#EnsembleTime').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').hide();
        $('#EnsembleDateHeureNouveau').hide();
        ////////////
        /////////
        var $ = require("jquery");
        $('#FromNouveau').hide();
        $('#FromModifier').hide();
        $('#BtnTab').hide();
        $('#BtnNouveau').show();
        $('#BtnModifier').show();
        $('#tab').show();

           }else if (keyword==""){
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Remplir le champ Mot clé'
            })

           }else if (operateur==""){
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Remplir le champ Traitement'
            })

           }else if(timeVar==""){
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Remplir le champ operateur'
            })
           }else if (validierAjoutTabEntre==false&&keyword=="Intervalle"){
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Il faut ajouter la valeur Bas Supérieur à la valeur Haut'
            })

           }
           else{
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 6000,
                icon: 'warning',
                width: 600,
                title: 'Remplir le champ operateur'
            })
           }
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


        //    console.log(totale_Dans);

            settotale_Dans(totale_Dans + "''" + dans + "'',")
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

    useEffect(() => {

        console.log('JsonOperateurValue useEffect', JsonOperateurValue)
    }, [JsonOperateurValue])

    useEffect(() => {

       console.log('dataTabulator useEffect', dataTabulator)
    }, [dataTabulator])

    useEffect(() => {
        let d = new Date().toJSON();
        let a = d.slice(0,16)
        setMinimumDateHeure(a)
        let c = d.slice(0,10)
        setMinimumDate(c)
     
    }, [])
    useEffect(() => {
    if(timeVar=="jour"&&keyword=="Intervalle"&&hautJour!=""){
        
    console.log("haut",hautJour)
     var arrayTemp=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"] 
    var indexSelect=0
    arrayTemp.forEach(function(item, index, array) {
     

 
        if (item==hautJour){
            console.log(item, index,array);
            indexSelect =index+1
      
        }
        
      });
      arrayTemp.splice(0, indexSelect)
        console.log("arrayTemp",arrayTemp)
        setJourArrayBas(arrayTemp)
    }
   
    }, [hautJour])

    useEffect(() => {
        console.log("jourArrayBas",jourArrayBas)
    }, [jourArrayBas])

    useEffect(() => {
        if(haut!=""&&bas!=""&&timeVar!="jour")
        {
            if(bas<=haut){
       
                Swal.fire({
                    toast: true,
                    position: 'top',
    
                    showConfirmButton: false,
                    timer: 6000,
                    icon: 'warning',
                    width: 600,
                    title: 'Il faut ajouter la valeur Bas Supérieur à la valeur Haut'
                })
              }
            
        }
    }, [haut,bas])


    
    useEffect(() => {
        if(timeVar=="jour"){
      if(hautJour=="Dimanche"){
        sethaut("(date_trunc(''week'', now())::date + interval ''6 day'')::date")
      }else if(hautJour=="Samedi"){
        sethaut("(date_trunc(''week'', now())::date + interval ''5 day'')::date")
      }
      else if(hautJour=="Vendredi"){
        sethaut("(date_trunc(''week'', now())::date + interval ''4 day'')::date")
      }
      else if(hautJour=="Jeudi"){
        sethaut("(date_trunc(''week'', now())::date + interval ''3 day'')::date")
      }
      else if(hautJour=="Mercredi"){
        sethaut("(date_trunc(''week'', now())::date + interval ''2 day'')::date")
      }
      else if(hautJour=="Mardi"){
        sethaut("(date_trunc(''week'', now())::date + interval ''1 day'')::date")
      }
      else if(hautJour=="Lundi"){
        sethaut("(date_trunc(''week'', now())::date)::date ")
      }
        }
    }, [timeVar,hautJour])


    useEffect(() => {
        if(timeVar=="jour"){
      if(basJour=="Dimanche"){
        setbas("(date_trunc(''week'', now())::date + interval ''6 day'')::date")
      }else if(basJour=="Samedi"){
        setbas("(date_trunc(''week'', now())::date + interval ''5 day'')::date")
      }
      else if(basJour=="Vendredi"){
        setbas("(date_trunc(''week'', now())::date + interval ''4 day'')::date")
      }
      else if(basJour=="Jeudi"){
        setbas("(date_trunc(''week'', now())::date + interval ''3 day'')::date")
      }
      else if(basJour=="Mercredi"){
        setbas("(date_trunc(''week'', now())::date + interval ''2 day'')::date")
      }
      else if(basJour=="Mardi"){
        setbas("(date_trunc(''week'', now())::date + interval ''1 day'')::date")
      }
      else if(basJour=="Lundi"){
        setbas("(date_trunc(''week'', now())::date)::date ")
      }
        }
    }, [timeVar,basJour])

    useEffect(() => {
        if(timeVar=="jour"){
     
    if(jourArrayDans.length==0){
        var array =["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
       const index = array.indexOf(dans);
       if (index > -1) {
         array.splice(index, 1);
       }
       setJourArrayDans(array)
       
    }else{

     
        const index = jourArrayDans.indexOf(dans);
        if (index > -1) {
        jourArrayDans.splice(index, 1);
    }
      
       setJourArrayDans(jourArrayDans)
    }
    }
    }, [timeVar,dans])
    useEffect(() => {
       console.log("jourArrayDans",jourArrayDans)
    }, [jourArrayDans])
    return (
        <>

            <div>


                <MDBBtn id="BtnNouveau" className='float-right' onClick={BtnNouveau} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
                <MDBBtn id="BtnTab" className='float-right option' onClick={BtnTab} size="sm"><MDBIcon title="Tableuax" icon="table" size="lg" /></MDBBtn> <br />



                <div className="option" id="FromNouveau">

                    <fieldset className="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "100%" }}>

                        <legend style={{ width: "80px", color: "#51545791", fontSize: '20px' }}>Nouveau</legend>
                        <form id="formulaire">
                            <MDBRow>
                                <MDBCol size="4">
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Mot clé
                                    </label>
                                    <select
                                        className="browser-default custom-select" id="2" name="keyword" value={keyword} onChange={(e) => setkeyword(e.target.value)} required>
                                        <option></option>
                                        <option>Intervalle</option>
                                        <option>Ensemble</option>

                                    </select>
                                    <br />
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Traitement
                                    </label>
                                    <select
                                        className="browser-default custom-select" name="operateur" value={operateur}  onChange={(e) => setoperateur(e.target.value)} required>
                                        <option></option>
                                        <option>Inclure</option>
                                        <option>Exclure</option>
                                    </select>
                                </MDBCol>

                                <MDBCol size="6" >
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Opérateur
                                    </label>
                                    <br />

                                    <div>
                                        <input type="radio" id="heure" name="time" value="heure" onChange={(e) => settimeVar("heure")} />
                                        <label htmlFor="heure">Heure  </label>

                                        <input style={{ marginLeft: "5px" }} type="radio" id="date" name="time" value="date" onChange={(e) => settimeVar("date")} />
                                        <label htmlFor="date">Date  </label>

                                        <input style={{ marginLeft: "5px" }} type="radio" id="dateHeure" name="time" value="dateHeure" onChange={(e) => settimeVar("dateHeure")} />
                                        <label htmlFor="dateHeure">Date et Heure  </label>
                                        <input style={{ marginLeft: "5px" }} type="radio" id="jour" name="time" value="jour" onChange={(e) => settimeVar("jour")} />
                                        <label htmlFor="jour">Jour</label>
                                    </div>


                                    <div>
                                        {timeVar == "heure" && keyword == "Intervalle" &&
                                            <div id="IntervalleTimeNouveau" >
                                                <div>
                                                    <MDBInput style={{ height: '37px' }} label="Haute" outline size="sm" type="time" className="form-control" name="haut" value={haut} placeholder="" onChange={(e) => sethaut(e.target.value)} /></div>

                                                <div>
                                                    <MDBInput style={{ height: '37px' }} label="Bas" outline size="sm" type="time" className="form-control" name="bas" value={bas} placeholder="" onChange={(e) => setbas(e.target.value)} />
                                                </div>
                                            </div>}
                                        {timeVar == "heure" && keyword == "Ensemble" &&
                                            <div id="EnsembleTimeNouveau" >
                                                <MDBRow>
                                                    <MDBCol size="8">
                                                        <MDBInput style={{ height: '37px', width: '100%' }} label="Dans" outline size="sm" type="time" className="form-control" name="dans" value={dans} placeholder="" onChange={(e) => setdans(e.target.value)} />
                                                    </MDBCol> <MDBCol size="4">    <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                                    </MDBCol>     <MDBCol size="8">       <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_Dans" className="form-control  " value={totale_Dans} placeholder="" onChange={(e) => settotale_Dans(e.target.value)} disabled />
                                                    </MDBCol> <MDBCol size="4">     <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                                    </MDBCol>    </MDBRow>

                                            </div>
                                        }
                                    </div>
                                    {timeVar == "date" && keyword == "Intervalle" &&
                                        <div id="IntervalleDateNouveau" >
                                            <div>
                                                <MDBInput style={{ height: '37px' }}  min={minimumDate} max='2100-12-30' label="Haute" outline size="sm" type="date" className="form-control" name="haut" value={haut} placeholder="" onChange={(e) => sethaut(e.target.value)} /></div>

                                            <div >
                                                <MDBInput style={{ height: '37px' }} min={minimumDate} max='2100-12-30' label="Bas" outline size="sm" type="date" className="form-control" name="bas" value={bas} placeholder="" onChange={(e) => setbas(e.target.value)} />
                                            </div>
                                        </div>

                                    }
                                    {timeVar == "date" && keyword == "Ensemble" &&
                                        <div id="EnsembleDateNouveau">
                                            <MDBRow>
                                                <MDBCol size="8">   
                                                 <MDBInput style={{ height: '37px', width: '100%' }} label="Dans" outline size="sm" min={minimumDate} max='2100-12-30' type="date" className="form-control" name="dans" value={dans} placeholder="" onChange={(e) => setdans(e.target.value)} />
                                                </MDBCol> 
                                                <MDBCol size="4">   
                                                 <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                                </MDBCol>     <MDBCol size="8">       <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_Dans" className="form-control  " value={totale_Dans} placeholder="" onChange={(e) => settotale_Dans(e.target.value)} diabled />
                                                </MDBCol> <MDBCol size="4">     <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                                </MDBCol>    </MDBRow>
                                        </div>
                                    }
                                    {timeVar == "dateHeure" && keyword == "Intervalle" &&
                                        <div id="IntervalleDateHeureNouveau">
                                            <div>
                                                <MDBInput style={{ height: '37px' }} label="Haute" min={minimumDateHeure} max='2100-12-30T23:59' outline size="sm" type="datetime-local" className="form-control" name="haut" value={haut} placeholder="" onChange={(e) => sethaut(e.target.value)} /></div>

                                            <div>
                                                <MDBInput style={{ height: '37px' }} label="Bas" min={minimumDateHeure} max='2100-12-30T23:59' outline size="sm" type="datetime-local" className="form-control" name="bas" value={bas} placeholder="" onChange={(e) => setbas(e.target.value)} />
                                            </div>
                                        </div>

                                    }
                                    {timeVar == "dateHeure" && keyword == "Ensemble" &&
                                        <div id="EnsembleDateHeureNouveau">
                                            <MDBRow>
                                                <MDBCol size="8">    <MDBInput style={{ height: '37px', width: '100%' }} min={minimumDateHeure} max='2100-12-30T23:59' label="Dans" outline size="sm" type="datetime-local" className="form-control" name="dans" value={dans} placeholder="" onChange={(e) => setdans(e.target.value)} />
                                                </MDBCol> <MDBCol size="4">    <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                                </MDBCol>     <MDBCol size="8">       <MDBInput style={{ height: '37px', width: '100%' }} type="textarea" name="totale_Dans" className="form-control  " value={totale_Dans} placeholder="" onChange={(e) => settotale_Dans(e.target.value)} diabled />
                                                </MDBCol> <MDBCol size="4">     <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                                </MDBCol>    </MDBRow>
                                        </div>

                                    }
                                   {timeVar == "jour" && keyword == "Intervalle" &&
                                        
                                            <div>
                                                <MDBRow>
                                                    <MDBCol size="2">
                                                       <label  className="grey-text" style={{ marginLeft: "44%"}}>
                                      Haut
                                    </label>
                                    </MDBCol>
                                    <MDBCol size="10">
                                    <select
                                     style={{height:"90%"}}    className="browser-default custom-select" name="hautJour" value={hautJour} onChange={(e) => sethautJour(e.target.value)}required>
                                        <option></option>
                                        {jourArrayHaut.map((jour, i) =><option>{jour}</option>)}
                                        
                                   
                                    </select>
                                    </MDBCol>
                                    <MDBCol size="2">
                                    <label className="grey-text" style={{ marginLeft: "44%"}}>
                                      Bas
                                    </label>
                                    </MDBCol>
                                    <MDBCol size="10">
                                    <select
                                       style={{height:"90%"}}    className="browser-default custom-select" name="basJour" value={basJour} onChange={(e) => setbasJour(e.target.value)}required>
                                        <option></option>
                                        {jourArrayBas.map((jour, i) =><option>{jour}</option>)}
                                    </select>
                                    </MDBCol>
                                    </MDBRow>
                                            </div>
                                         }

                                   {timeVar == "jour" && keyword == "Ensemble" &&
                                        <div id="EnsembleDateHeureNouveau">
                                            <MDBRow>
                                                <MDBCol size="8">   
                                                <div>
                                                <MDBRow>
                                          
                                    <MDBCol size="12">
                                    <select
                                     style={{height:"90%"}}    className="browser-default custom-select" name="dans" value={dans} onChange={(e) => setdans(e.target.value)}required>
                                        <option></option>
                                        {jourArrayDans.map((jour, i) =><option>{jour}</option>)}
                                        
                                   
                                    </select>
                                    </MDBCol>

                                    </MDBRow>
                                            </div>
                                                 {/* <MDBInput style={{ height: '37px', width: '100%' }} min={minimumDateHeure} max='2100-12-30T23:59' label="Dans" outline size="sm" type="datetime-local" className="form-control" name="dans" value={dans} placeholder="" onChange={(e) => setdans(e.target.value)} /> */}
                                                </MDBCol>
                                                 <MDBCol size="4">  
                                                   <MDBBtn style={{ height: '30px', marginTop: "-0%" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btnAjouterDans}><MDBIcon style={{ marginLeft: '-4px' }} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                                                </MDBCol>   
                                                  <MDBCol size="8">       
                                                  <MDBInput style={{ height: '21px', width: '100%',marginTop: "11px" }} type="textarea" name="totale_DansJour" className="form-control  " value={totale_Dans} placeholder="" onChange={(e) => settotale_Dans(e.target.value)} diabled />
                                                </MDBCol> 
                                                <MDBCol size="4">    
                                                 <MDBBtn style={{ height: '30px' }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndeleteDans}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
                                                </MDBCol>    </MDBRow>
                                        </div>

                                    }

                                </MDBCol>
                                <MDBCol size="2">
                                <MDBBtn style={{ marginTop: '108%' }} id="BtnAjouterTab" className='float-right' onClick={ajoutTab} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn>
                            </MDBCol>
                            </MDBRow>
                          </form>
                    </fieldset>
                </div>




            </div>
            <ReactTabulator
                data={dataTabulator}
                columns={columns}
                layout={"fitData"}
                id="tab"
            />

        </>

    )
}

export default Emploi_Temps;