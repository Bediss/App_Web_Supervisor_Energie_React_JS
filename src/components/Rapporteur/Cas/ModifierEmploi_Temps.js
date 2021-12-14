import React, { Component } from "react";
import Tabulator from "tabulator-tables";
//import "tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
import { MDBContainer, MDBBtn, MDBIcon, MDBModal,MDBListGroup,MDBListGroupItem, MDBModalBody,MDBInput, MDBModalHeader,MDBRow,MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Datetime from 'react-datetime';
import axios from 'axios';
import Swal from 'sweetalert2';
class Emploi_Temps extends React.Component {



    el = React.createRef();

    mytable = "Tabulator"; //variable to hold your table
    tableData = []//[{"att":"Entre","valeur":"17:43,19:43","keyword":"Intervalle","operateur":"Inclure"},{"att":"Haute","valeur":"17:44","keyword":"Intervalle","operateur":"Exclure"},{"att":"Bas","valeur":"18:44","keyword":"Intervalle","operateur":"Inclure"},{"att":"Dans","valeur":"17:44","keyword":"Ensemble","operateur":"Exclure"}] //data for table to display

  
    constructor(props) {
        super(props)
        this.state = {

            supprimertemp: [],
            modificationtemp: [],
            datamodifier: [],
            modifiertap: [],
            modifierUserInterface:[],
            JsonOperateurValue:[],
            OperateurValue:[],
            keyword:"",
            operateur:"",
            operateur2:"",
            haut:"",
            bas:"",
            dans:"",
            att:"",
            valeur:"",
            valeur2:"",
            valeur_format:"",
            dateHeure:"",
            position:"",
            data:[],
            data2:[],
            totale_Dans:[],
            DansDev:[],
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.modifierTab=this.modifierTab.bind(this);
        this.BtnNouveau=this.BtnNouveau.bind(this);    
        this.btnAjouterDans=this.btnAjouterDans.bind(this);
        this.btndeleteDans=this.btndeleteDans.bind(this);
    }



    componentDidMount() {
        const supprimertemp = this.state.supprimertemp;
        const datamodifier = this.state.datamodifier;

 //tabulator
 this.state.OperateurValue = localStorage.getItem('OperateurValue'); 
 console.log(" localStorage OperateurValue",this.state.OperateurValue )
/* const c = this.state.OperateurValue.replace(/'/g,"")
 const d= c.replace("(","")
 const e= d.replace(")","")
 const f= e.replace("and ",",") */
this.state.data=JSON.parse( this.state.OperateurValue) ;
for (var i=0;i<this.state.data.length;i++){
 var keyword= this.state.data[i].keyword
 var valeur= this.state.data[i].valeur
 var att= this.state.data[i].att
 var operateur= this.state.data[i].operateur

 const d = valeur.replace("(","")
 const a =d.replace(/'/g,"")
 const e= a.replace(")","")
 var valeurDev= e.replace("and ",",")
 console.log(keyword,valeur,att,operateur,valeurDev)
 this.state.data2.push({'keyword':keyword,'valeur':valeur,'att':att,'operateur':operateur,'valeurDev':valeurDev})
}



this.tableData=this.state.data2

console.log("datttaaaaaaaaaa ",this.tableData)

//if(this.state.data.length != []){
 //this.tableData=this.state.data 
 this.mytable = new Tabulator(this.el, {
    data: this.tableData,

    //link data to table
    reactiveData: true, //enable data reactivity
    addRowPos: "top",
    pagination: "local",
    paginationSize: 3,
    movableColumns: true,      
    resizableRows: true,
    reactiveData: true,
    printRowRange: "selected",
    selectable: 1,

    
    paginationSizeSelector: [3, 6, 8, 10],
    columns: [
    
      {
        title: "Mot clé",
        field: "keyword",
        width: "20%",
        cellClick: function (e, cell, row) {
          var position = cell.getRow().getPosition()
          console.log(position);
          datamodifier.splice(0, 2); 
          datamodifier.push(cell.getData(), position);
          console.log("valider",datamodifier)

        }
      },

      {
        title: "Traitement",
        field: "operateur",
        width: "20%",
        cellClick: function (e, cell, row) {
          var position = cell.getRow().getPosition()
          console.log(position);
          datamodifier.splice(0, 2); 
          datamodifier.push(cell.getData(), position);
          console.log("valider",datamodifier)

        }
      },
      {
        title: "opérateur",
        field: "att",
        width: "20%",
        cellClick: function (e, cell, row) {
          var position = cell.getRow().getPosition()
          console.log(position);
          datamodifier.splice(0, 2); 
          datamodifier.push(cell.getData(), position);
          console.log("valider",datamodifier)

        }
      },
      {
        title: "Temp",
        field: "valeurDev",
        width: "20%",
        cellClick: function (e, cell, row) {
          var position = cell.getRow().getPosition()
          console.log(position);
          datamodifier.splice(0, 2); 
          datamodifier.push(cell.getData(), position);
          console.log("valider",datamodifier)

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
          cell.getRow().delete();
        },
        hideInHtml: true,
      },
    ], //define table columns



});}//}

BtnNouveau(){
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
    this.state.keyword="";
    this.state.operateur="";
    this.state.heure="";
    this.state.dateHeure="";
    this.state.date="";
}
BtnTab(){

    var $ = require("jquery");
    $('#FromNouveau').hide();
    $('#FromModifier').hide(); 
    $('#BtnTab').hide();
    $('#BtnNouveau').show();  
    $('#BtnModifier').show();  
    $('#tab').show();
  
}
modifierTab(){
    
  if(this.state.haut!=""&&this.state.bas ==""){
    const keyword =this.state.keyword;
  const operateur =this.state.operateur;
  const att ="Haut"
  this.state.att=att
  const valeur= ("''"+this.state.haut+"''")
  this.state.valeur=valeur
  const valeurDev=this.state.haut
  this.mytable.addRow({ keyword,operateur,att,valeur,valeurDev}, true);
  this.state.haut="";
  this.state.bas="";
  } 
  if(this.state.haut==""&&this.state.bas !=""){
    const keyword =this.state.keyword;
  const operateur =this.state.operateur;
  const att ="Bas"
  this.state.att=att
  
  
  
  const valeur= ("''"+this.state.bas+"''")
  this.state.valeur= valuer
  const valeurDev=this.state.bas
  this.mytable.addRow({ keyword,operateur,att,valeur,valeurDev}, true);
  this.state.haut="";
  this.state.bas="";
  }

if(this.state.haut!=""&&this.state.bas!=""){
const keyword =this.state.keyword;
const operateur =this.state.operateur;
const att ="Entre"
this.state.att=att

const valeur= ("''"+this.state.haut+"'' and ''"+this.state.bas+"''")
this.state.valeur=valeur
const valeurDev=this.state.haut+','+this.state.bas
this.mytable.addRow({ keyword,operateur,att,valeur,valeurDev}, true);
this.state.haut="";
this.state.bas="";
}

if(this.state.totale_Dans!=""){
  const keyword =this.state.keyword;
const operateur =this.state.operateur;


  const att ="Dans"
  this.state.att=att

const valeur= ("("+this.state.totale_Dans.slice(0, -1)+")")
this.state.valeur=valeur

const a=this.state.totale_Dans.slice(0, -1)
const valeurDev = a.replace(/'/g,"")
this.mytable.addRow({ keyword,operateur,att,valeur,valeurDev}, true);
this.state.totale_Dans=""
}
this.state.JsonOperateurValue.push({"keyword":this.state.keyword,"operateur":this.state.operateur,"att":this.state.att,"valeur":this.state.valeur,"valeur_format":this.state.valeur_format})

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

}
handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    var $ = require("jquery");
    
    if(this.state.keyword == "Intervalle"){

      if(e.target.value=="heure"){
      $('#IntervalleTimeNouveau').show();
      $('#EnsembleTimeNouveau').hide();
      $('#IntervalleDateNouveau').hide();
      $('#EnsembleDateNouveau').hide();
      $('#IntervalleDateHeureNouveau').hide();
      $('#EnsembleDateHeureNouveau').hide();
      this.state.valeur_format="time";
      console.log(" this.state.valeur_format", this.state.valeur_format)
    }
      if(e.target.value=="date"){

        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').hide();
        $('#IntervalleDateNouveau').show();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').hide();
        $('#EnsembleDateHeureNouveau').hide(); 
        this.state.valeur_format="date";
        console.log(" this.state.valeur_format", this.state.valeur_format)
     
      }
      if(e.target.value=="dateHeure"){

        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').show();
        $('#EnsembleDateHeureNouveau').hide(); 
        
        this.state.valeur_format="timestamp";
        console.log(" this.state.valeur_format", this.state.valeur_format)
     

      }

    }

    if(this.state.keyword == "Ensemble"){
     
      if(e.target.value=="heure"){
        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').show();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').hide();
        $('#EnsembleDateHeureNouveau').hide();
        this.state.valeur_format="time";
        console.log(" this.state.valeur_format", this.state.valeur_format)
     
    }
      if(e.target.value=="date"){

        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').show();
         $('#IntervalleDateHeureNouveau').hide();
         $('#EnsembleDateHeureNouveau').hide();  
         this.state.valeur_format="date";
         console.log(" this.state.valeur_format", this.state.valeur_format)
      

      }
      if(e.target.value=="dateHeure"){
        $('#IntervalleTimeNouveau').hide();
        $('#EnsembleTimeNouveau').hide();
        $('#IntervalleDateNouveau').hide();
        $('#EnsembleDateNouveau').hide();
        $('#IntervalleDateHeureNouveau').hide();
        $('#EnsembleDateHeureNouveau').show(); 
        this.state.valeur_format="timestamp";
        console.log(" this.state.valeur_format", this.state.valeur_format)
     
        


      }

    }
       }
componentDidUpdate(){

 /** with delete row */
 var data = this.state.JsonOperateurValue.concat(JSON.parse(this.state.OperateurValue))
 for (var i = 0; i < this.state.supprimertemp.length; i++) 
 {

 var index = -1;
 var val=this.state.supprimertemp[i]
 console.log("this.state.supprimertemp",val)
 var filteredObj = data.find(function(item, i){
   
   if(item.valeur == val){
     index = i;
     return i;
   }
 });
 
 console.log(index, filteredObj);
 if (index > -1) {
   data.splice(index, 1);
 }
}
 console.log(data);
/**********fin delete row  */



//this.state.modifiertap.push({"keyword":this.state.keyword,"operateur":this.state.operateur,"att":this.state.att,"valeur":this.state.valeur})
this.state.modifiertap =data
console.log("modifiertap",this.state.modifiertap)
/////

 

localStorage.setItem('modifiertap', JSON.stringify(this.state.modifiertap));

       }

       btnAjouterDans(){
        if (this.state.dans==""){
          Swal.fire({
            toast: true,
            position: 'top',
            
            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width:400,
            title: 'le champ est vide'})
        }else{
        
          
          console.log(this.state.totale_Dans);
          this.setState({ totale_Dans: this.state.totale_Dans+"''"+this.state.dans+"''," });
         
         console.log(this.state.totale_Dans);
          this.state.dans=""
        }
        }
        
        btndeleteDans(){
        
            if (this.state.totale_Dans==""){
              Swal.fire({
                toast: true,
                position: 'top',
                
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width:400,
                title: 'le champ est vide'})
            }else{
        const array =[]
        array.push(this.state.totale_Dans)
          console.log(this.state.totale_Dans);
        
            this.setState({ totale_Dans: array.slice(0, -1) });
            console.log('deleteee')}
        }

    
render(){

    return(

        <div>
 
   
          <MDBBtn id="BtnNouveau" className='float-right' onClick={this.BtnNouveau} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn> 
           <MDBBtn id="BtnTab" className='float-right option' onClick={this.BtnTab} size="sm"><MDBIcon title="Tableuax" icon="table" size="lg" /></MDBBtn> <br/> 
          
               
   
       <div className="option" id="FromNouveau">
           
       <fieldset class="form-group" style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0",borderStyle: "solid",  borderRadius: '4px', width:"100%"}}>
             
              <legend style={{  width:"80px", color: "#51545791",fontSize:'20px'}}>Nouveau</legend>  
              <form id="formulaire">
              <MDBRow>
              <MDBCol size="4">   
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Mot clé
              </label>
               <select  
                className="browser-default custom-select" id="2" name="keyword" value={this.state.keyword} onChange={this.handleChange} required>
                  <option></option>
                  <option>Intervalle</option>
                  <option>Ensemble</option>
               
              </select> 
              <br/>
               <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Traitement
              </label>
               <select  
                className="browser-default custom-select"  name="operateur" value={this.state.operateur} onChange={this.handleChange} required>
                  <option></option>
                  <option>Inclure</option>
                  <option>Exclure</option>
              </select> 
              </MDBCol> 
          
              <MDBCol size="5" > 
               <label  htmlFor="defaultFormLoginEmailEx" className="grey-text">
               Opérateur
              </label>
           <br/>
      
              <div>
              <input type="radio" id="heure" name="time" value="heure" onChange={this.handleChange} />
              <label for="heure">Heure  </label>
 
                  <input style={{marginLeft:"10px"}} type="radio" id="date" name="time" value="date" onChange={this.handleChange}  />
                 <label for="date">Date  </label>
             
             <input style={{marginLeft:"10px"}} type="radio" id="dateHeure" name="time" value="dateHeure" onChange={this.handleChange} />
             <label for="dateHeure">Date et Heure  </label>
             </div>

              {/******************************************Heure****************************************/}
              <div>
                 <div id="IntervalleTimeNouveau" className="option">
                    <div>
                      <MDBInput style={{height: '37px'}} label="Haute" outline size="sm" type="time" className="form-control" name="haut" value={this.state.haut} placeholder="" onChange={this.handleChange} /></div>
              
                    <div>
                     <MDBInput  style={{height: '37px'}} label="Bas" outline size="sm" type="time" className="form-control" name="bas" value={this.state.bas} placeholder="" onChange={this.handleChange} />
                  </div>
                </div>
          
              <div id="EnsembleTimeNouveau" className="option">
              <MDBRow>
              <MDBCol size ="8">    <MDBInput style={{height: '37px',width: '100%'}}  label="Dans" outline size="sm" type="time" className="form-control" name="dans" value={this.state.dans}  placeholder="" onChange={this.handleChange} />
              </MDBCol> <MDBCol size ="4">    <MDBBtn style={{ height: '30px',marginTop: "-0%"}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btnAjouterDans}><MDBIcon style={{marginLeft: '-4px'}} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                   </MDBCol>     <MDBCol size ="8">       <MDBInput style={{height: '37px',width: '100%'}}  type="textarea"   name="totale_Dans" className="form-control  " value={this.state.totale_Dans}placeholder="" onChange={this.handleChange} diabled />    
                   </MDBCol> <MDBCol size ="4">     <MDBBtn style={{ height: '30px'}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDans}> <MDBIcon  style={{marginLeft: '-4px'}}title="Supprimer" icon="trash-alt"  size="lg"/></MDBBtn>
                     </MDBCol>    </MDBRow>
              </div>  
              </div>
              {/******************************************Date****************************************/}
              <div id="IntervalleDateNouveau" className="option">
                <div>
                      <MDBInput style={{height: '37px'}} label="Haute" outline size="sm" type="date" className="form-control" name="haut" value={this.state.haut} placeholder="" onChange={this.handleChange} /></div>
              
                <div >
                     <MDBInput  style={{height: '37px'}} label="Bas" outline size="sm" type="date" className="form-control" name="bas" value={this.state.bas} placeholder="" onChange={this.handleChange} />
                </div>
              </div>
              <div id="EnsembleDateNouveau" className="option">
              <MDBRow>
              <MDBCol size ="8">    <MDBInput style={{height: '37px',width: '100%'}}  label="Dans" outline size="sm" type="date" className="form-control" name="dans" value={this.state.dans}  placeholder="" onChange={this.handleChange} />
              </MDBCol> <MDBCol size ="4">    <MDBBtn style={{ height: '30px',marginTop: "-0%"}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btnAjouterDans}><MDBIcon style={{marginLeft: '-4px'}} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                   </MDBCol>     <MDBCol size ="8">       <MDBInput style={{height: '37px',width: '100%'}}  type="textarea"   name="totale_Dans" className="form-control  " value={this.state.totale_Dans}placeholder="" onChange={this.handleChange} diabled />    
                   </MDBCol> <MDBCol size ="4">     <MDBBtn style={{ height: '30px'}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDans}> <MDBIcon  style={{marginLeft: '-4px'}}title="Supprimer" icon="trash-alt"  size="lg"/></MDBBtn>
                     </MDBCol>    </MDBRow>
              </div>
              
                 {/******************************************DateHeure****************************************/}
                 <div id="IntervalleDateHeureNouveau" className="option">
                <div>
                <MDBInput style={{height: '37px'}} label="Haute" outline size="sm" type="datetime-local" className="form-control" name="haut" value={this.state.haut} placeholder="" onChange={this.handleChange} /></div>
                  
                <div>
                <MDBInput  style={{height: '37px'}} label="Bas" outline size="sm" type="datetime-local" className="form-control" name="bas" value={this.state.bas} placeholder="" onChange={this.handleChange} />
                </div>
              </div>
              <div id="EnsembleDateHeureNouveau" className="option">
              <MDBRow>
              <MDBCol size ="8">    <MDBInput style={{height: '37px',width: '100%'}}  label="Dans" outline size="sm" type="datetime-local" className="form-control" name="dans" value={this.state.dans}  placeholder="" onChange={this.handleChange} />
              </MDBCol> <MDBCol size ="4">    <MDBBtn style={{ height: '30px',marginTop: "-0%"}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btnAjouterDans}><MDBIcon style={{marginLeft: '-4px'}} title="Ajouter" icon="plus" size="lg" /></MDBBtn>
                   </MDBCol>     <MDBCol size ="8">       <MDBInput style={{height: '37px',width: '100%'}}  type="textarea"   name="totale_Dans" className="form-control  " value={this.state.totale_Dans}placeholder="" onChange={this.handleChange} diabled />    
                   </MDBCol> <MDBCol size ="4">     <MDBBtn style={{ height: '30px'}} color="#e0e0e0 grey lighten-2" size="sm" onClick={this.btndeleteDans}> <MDBIcon  style={{marginLeft: '-4px'}}title="Supprimer" icon="trash-alt"  size="lg"/></MDBBtn>
                     </MDBCol>    </MDBRow>
              </div>
         </MDBCol> 
         
              </MDBRow>
              <MDBRow><MDBCol>
              <MDBBtn  style={{marginTop: '-6%'}} id="BtnAjouterTab" className='float-right' onClick={this.modifierTab} size="sm"><MDBIcon title="Nouveau" icon="plus" size="lg" /></MDBBtn> 
                  </MDBCol></MDBRow></form>
   </fieldset>   
       </div>
    
      
  
        <div id="tab" className="tabulator" className="table table-striped" ref={el => (this.el = el)} />
        </div>
    );
}



}
export default Emploi_Temps;