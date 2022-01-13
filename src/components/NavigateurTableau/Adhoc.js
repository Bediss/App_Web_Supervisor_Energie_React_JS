


import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { MDBNav, MDBNavItem, MDBNavLink, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Swal from 'sweetalert2';
import Modal_TL_V2 from '../Modal/Modal_TL_V2.js';
import Modal_CL_V2 from '../Modal/Modal_CL_V2.js';
import Modal_ML_V2 from '../Modal/Modal_ML_V2.js';
import { array } from 'prop-types';
import { useHistory } from "react-router-dom"
import EditerRapportTableau from './EditerRapport';
import Modal_TL_Adhoc from '../../components/Modal/Modal_TL_Adhoc';


const Adhoc =({toggle,modal,reportI_href,toggleEditeur,EnregisterNewRapport,Visualiser_Rapport_Id  , 
     BtnClDesibled ,BtnMlDesibled, BtnTlDesibled,
     nameCl,
     nameMl,
     nameTl
    })=>{
    const history = useHistory()

    const [modalCL, setmodalCL] = useState(false)
    const [modalTL, setmodalTL] = useState(false)
    const [modalTLAdHoc, setmodalTLAdHoc] = useState(false)
    const [modalML, setmodalML] = useState(false)
    const [CompteurListI_Name, setCompteurListI_Name] = useState(nameCl)
    const [ML_Name, setML_Name] = useState(nameMl)
    const [tl_name, settl_name] = useState(nameTl)
    const [tl_id, settl_id] = useState("")
    const [tl_name_IOT, settl_name_IOT] = useState("")
    const [tl_id_IOT, settl_id_IOT] = useState("")
    const [tl_name_cluster, settl_name_cluster] = useState("")
    const [tl_id_cluster, settl_id_cluster] = useState("")
    const [Listes_Cl, setListes_Cl] = useState([])
    const [Listes_Ml, setListes_Ml] = useState([])
    const [CL_Membre, setCL_Membre] = useState([])
    const [ML_Membre, setML_Membre] = useState([])
    const [Code_Cl, setCode_Cl] = useState("")
    const [Name_Cl, setName_Cl] = useState("")
    const [Code_Cl_Tags, setCode_Cl_Tags] = useState("")
    const [Name_Cl_Tags, setName_Cl_Tags] = useState("")
    const [Code_Ml_Tags, setCode_Ml_Tags] = useState("")
    const [Name_Ml_Tags, setName_Ml_Tags] = useState("")
    const [Code_Ml, setCode_Ml] = useState("")
    const [Name_Ml, setName_Ml] = useState("")
    const [cl_Membre_Select_fin, setCl_Membre_Select_fin] = useState("")
    const [ml_Membre_Select_fin, setMl_Membre_Select_fin] = useState("")
    const [showTAGS_CL, setShowTAGS_CL] = useState(false)
    const [showTAGS_ML, setShowTAGS_ML] = useState(false)
    const [modelEditerRapport, setModelEditerRapport] = useState(false)
    const [btn_Editer_Rapport, setBtn_Editer_Rapport] = useState(false)
    const [dataClone,setDataClone]=useState(null)
    const[dataTlTemp,setdataTlTemp]=useState(null)
    /*****Modal cl*****/
  function toggleCL() {
    setmodalCL(!modalCL)

    /////////CL
    document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + "getCountersList/"
    )

      .then(
        (result) => {
          if (result.data !== null) {
            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

            setListes_Cl(result.data)

            }
          } else {
          }

        })
      .catch(({ response }) => {

        // console.log("------------",response)
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/")
            localStorage.clear();

          }
        }
      }
      )

  }
  /******************/
   /*****Modal ml*****/
   function toggleML() {
    setmodalML(!modalML)

    /////////ML
    document.querySelector("body").classList.add("isLoading")
    axios.get(window.apiUrl + "getMeasureList/"
    )

      .then(
        (result) => {
          if (result.data !== null) {

            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

            setListes_Ml(result.data)
            }
          } else {
          }

        })
      .catch(({ response }) => {

        console.log("---------", response)
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/")
            localStorage.clear();

          }
        }
      }
      )

  }
        /*****************************************Modal Edit Report****************************************************/
  function toggleEditerRapport() {
    setModelEditerRapport(!modelEditerRapport)
  }
  /************************************************************************************************************ */
  function handleListeCompteurClick(id, name, membre) {
    setCode_Cl(id)
    setName_Cl(name)
    setCL_Membre(membre)
  }
  function CL_Tags_Function(name, showTAGS_CL) {
    setShowTAGS_CL(showTAGS_CL)
    if (name != "" && showTAGS_CL == true) {
      setCode_Cl_Tags("*")
      setName_Cl_Tags(name)
    }
  }
  function ModelCl(cl_Membre_Select) {
    setCl_Membre_Select_fin(cl_Membre_Select)
  }
  function ML_Tags_Function(name, showTAGS_ML) {
    setShowTAGS_ML(showTAGS_ML)
    if (name != "" && showTAGS_ML == true) {
      setCode_Ml_Tags("*")
      setName_Ml_Tags(name)
    }
  }
  function ModelMl(ml_Membre_Select) {
    setMl_Membre_Select_fin(ml_Membre_Select)

  }
  function handleListeMLClick(id, name, membre) {
    setCode_Ml(id)
    setName_Ml(name)
    setML_Membre(membre)
  }
  function AjouterCl() {

    if (showTAGS_CL == false) {

      if (Name_Cl != "" && cl_Membre_Select_fin.length != 0) {
        setmodalCL(!modalCL)
        setCompteurListI_Name(Name_Cl)
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 350,
          title: 'Veuillez sélectionner une liste'
        })
      }


    } else if (showTAGS_CL == true) {
      if (Name_Cl_Tags.length != 0 && cl_Membre_Select_fin.length != 0) {
        if (Name_Cl_Tags.length < 5) {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 750,
            title: "Mot clé d'une nouvelle liste compteur doit comporter au moins 5 caractères!"
          })
        } else {
          setmodalCL(!modalCL)
          setCompteurListI_Name(Name_Cl_Tags)
        }
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 500,
          title: "Mot clé d'une nouvelle liste compteur est vide"
        })
      }
    }
    else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'Veuillez sélectionner une liste'
      })
    }
  }
  function AjouterMl() {
    console.log('showTAGS_ML', showTAGS_ML)
    if (showTAGS_ML == false) {

      if (Name_Ml != "" && ml_Membre_Select_fin.length != 0) {
        setmodalML(!modalML)
        setML_Name(Name_Ml)
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 350,
          title: 'Veuillez sélectionner une liste 1'
        })
      }


    } else if (showTAGS_ML == true) {
      if (Name_Ml_Tags.length != 0 && ml_Membre_Select_fin.length != 0) {
        if (Name_Ml_Tags.length < 5) {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 750,
            title: "Mot clé d'une nouvelle liste measures doit comporter au moins 5 caractères!"
          })
        } else {
          setmodalML(!modalML)
          setML_Name(Name_Ml_Tags)
        }
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          icon: 'warning',
          width: 500,
          title: "Mot clé d'une nouvelle liste measures est vide"
        })
      }
    }
    else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'Veuillez sélectionner une liste 2'
      })
    }


  }

  function toggleTLAdhoc(){
    setmodalTLAdHoc(!modalTLAdHoc)
  }
  function EnregisterNewRapportFunction(EnregisterTemp) {
    EnregisterNewRapport(EnregisterTemp)
  }
  function Rapportnewclone(type) {
    Visualiser_Rapport_Id(type)
  }

function CloneTlTemp(json,tagIot){
    console.log("json-------------------->",json)

    setdataTlTemp(json)

    settl_name(tagIot)
}


useEffect(()=>{




if(dataTlTemp!=null && cl_Membre_Select_fin.length == 0 &&  ml_Membre_Select_fin.length == 0 ){
    setDataClone(
{
    "adHocTl": false,
    "tlCluster":dataTlTemp.tlCluster,
    "tlIot":dataTlTemp.tlIot
})
}
else if (cl_Membre_Select_fin.length == 0 &&  ml_Membre_Select_fin.length != 0 && dataTlTemp==null ){
    setDataClone(
        {
            "adHocTl": false,
    "ml": {
        "tag": ML_Name,
        "members": ml_Membre_Select_fin
    
      }
    })
}
else if (cl_Membre_Select_fin.length != 0 &&  ml_Membre_Select_fin.length == 0 && dataTlTemp==null ){
    setDataClone(
        {
            "adHocTl": false,
            "cl": {
                "tag": CompteurListI_Name,
                "members": cl_Membre_Select_fin
              },
    })
}else if(dataTlTemp!=null && ml_Membre_Select_fin.length != 0 && cl_Membre_Select_fin.length == 0 ){

    setDataClone(
        {
            "adHocTl": false,
            "ml": {
                "tag": ML_Name,
                "members": ml_Membre_Select_fin
            
              },
            "tlCluster":dataTlTemp.tlCluster,
            "tlIot":dataTlTemp.tlIot
        })

}else if(dataTlTemp!=null && ml_Membre_Select_fin.length == 0 && cl_Membre_Select_fin.length != 0 ){
    setDataClone(
        {
            "adHocTl": false,
            "cl": {
                "tag": CompteurListI_Name,
                "members": cl_Membre_Select_fin
              },
            "tlCluster":dataTlTemp.tlCluster,
            "tlIot":dataTlTemp.tlIot
        })


}

else if(dataTlTemp==null && ml_Membre_Select_fin.length != 0 && cl_Membre_Select_fin.length != 0 ){
    setDataClone(
        {
            "adHocTl": false,
            "cl": {
                "tag": CompteurListI_Name,
                "members": cl_Membre_Select_fin
              },
              "ml": {
                "tag": ML_Name,
                "members": ml_Membre_Select_fin
            
              }
        })


}
else if(dataTlTemp!=null && ml_Membre_Select_fin.length != 0 && cl_Membre_Select_fin.length != 0 ){
    setDataClone(
        {
            "adHocTl": false,
            "cl": {
                "tag": CompteurListI_Name,
                "members": cl_Membre_Select_fin
              },
              "ml": {
                "tag": ML_Name,
                "members": ml_Membre_Select_fin
            
              },
              "tlCluster":dataTlTemp.tlCluster,
              "tlIot":dataTlTemp.tlIot
        })


}else {
    setDataClone([])
}


},[dataTlTemp,ml_Membre_Select_fin,cl_Membre_Select_fin])



useEffect(()=>{
    console.log("----ccc--",dataClone)
},[dataClone])





function Visualiser_Rapport() {
  console.log("------",dataClone)

if(reportI_href!=""&&dataClone.length!=0){
  
    document.querySelector("body").classList.add("isLoading")
    axios.post(window.apiUrl + "clone/",

      {
        "IDs": [reportI_href],
        //"data": [{"adHocTl": true}]
        "data":[dataClone]

      }


    )

      .then(
        (result) => {

     

            if (result.status == 200) {
              document.querySelector("body").classList.remove("isLoading")

         
               console.log("-----",result.date)
             
               var EnregisterTemp = []
               var Body=null
               var Report_Name=""
               if (result.data != 0) {
                Body = result.data[0]
                Report_Name=result.data[0].configLayout.title
              }
               EnregisterTemp.push(
                {
                  "Report_Name": Report_Name,
                  "Report_TableauName": "",
                  "Body": Body,
      
                }
              )
               EnregisterNewRapport(EnregisterTemp)
               toggle()
        }
    }
    )
    
      
}else {
  Swal.fire({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    icon: 'warning',
    width: 450,
    title: 'Aucun changement des données'
  })
}


}
useEffect(()=>{},[modalTLAdHoc])
    return(

    <>
      <MDBModalHeader toggle={toggle}>Ad hoc </MDBModalHeader>
       <MDBModalBody>


<MDBRow>
  <MDBCol size="4" style={{ marginTop: "-10px" }}>
    <MDBBtn size="sm" color="#eeeeee grey lighten-3"
      disabled={BtnClDesibled}
      style={{ fontSize: "13px", textAlign: "center", width: "90%" }}
      onClick={toggleCL}>
      Compteurs Listes
    </MDBBtn>
  </MDBCol >
  <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >
    {CompteurListI_Name}
  </b></MDBCol>
</MDBRow>
<MDBRow>
  <MDBCol size="4" >
    <MDBBtn size="sm" color="#eeeeee grey lighten-3"
      disabled={BtnMlDesibled}
      style={{ fontSize: "13px", textAlign: "center", width: "90%" }}
      onClick={toggleML}>
      Mesures Listes
    </MDBBtn>

  </MDBCol>
  <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >
    {ML_Name}
  </b></MDBCol>
</MDBRow>
<MDBRow>

  <MDBCol size="4" >
    <MDBBtn size="sm" color="#eeeeee grey lighten-3"
      disabled={BtnTlDesibled}
  //  disabled={true}
      style={{ fontSize: "13px", textAlign: "center", width: "90%" }}
      onClick={toggleTLAdhoc}>
      Time Intelligence
    </MDBBtn>

  </MDBCol>
  <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >
    {tl_name}
  </b></MDBCol>
</MDBRow>




       </MDBModalBody>
    
    
       <MDBModalFooter>
       <MDBRow >
        <MDBCol size="6" style={{ marginLeft: "-12%" }}>
          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ width: "270px" }} onClick={Visualiser_Rapport}> Visualiser Rapport <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
        </MDBCol>
        <MDBCol size="6">
          <MDBBtn style={{ width: "270px" }} onClick={toggleEditerRapport} /*disabled={true} */disabled={btn_Editer_Rapport} > Avancée <MDBIcon icon="edit" className="ml-1" /></MDBBtn>
        </MDBCol>
      </MDBRow>
       </MDBModalFooter>
       <MDBModal isOpen={modelEditerRapport} toggle={toggleEditerRapport} size="lg" centered>
      <EditerRapportTableau historyProps={history} toggleEditerRapport={toggleEditerRapport}  Report_Code={reportI_href} toggle={toggleEditeur}EnregisterNewRapportFunction={EnregisterNewRapportFunction} Rapportnewclone={Rapportnewclone} modalTLAdHoc={modal} toggleTLAdhoc={toggle} />
    </MDBModal>

      <MDBModal isOpen={modalML} toggle={toggleML} centered size="lg">

        <Modal_ML_V2 toggle2={toggleML} ML_Tags_Function={ML_Tags_Function} modelMl={ModelMl} Listes_Ml={Listes_Ml} handleListeMLClick={handleListeMLClick} ML_Membre={ML_Membre} />

        <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem>
            <MDBNavLink link onClick={() => window.open("/Rapporteur/MesuresListes")} style={{ color: "#000" }} >
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>


        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterMl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={modalCL} toggle={toggleCL} centered size="lg">


        <Modal_CL_V2 toggle4={toggleCL} CL_Tags_Function={CL_Tags_Function} modelCl={ModelCl} Listes_Cl={Listes_Cl} handleListeCompteurClick={handleListeCompteurClick} CL_Membre={CL_Membre} />

        <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem>
            <MDBNavLink link onClick={() => window.open("/Rapporteur/Compteur_Listes")} style={{ color: "#000" }} >
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterCl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={modalTLAdHoc} toggle={toggleTLAdhoc} centered size="lg">

        <Modal_TL_Adhoc toggle={toggleTLAdhoc} CloneTlTemp={CloneTlTemp} />

      </MDBModal>
    </>

)
}
export default Adhoc