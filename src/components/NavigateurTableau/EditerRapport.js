
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { MDBNav, MDBNavItem, MDBNavLink, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Swal from 'sweetalert2';
import Modal_TL_V2 from '../Modal/Modal_TL_V2.js';
import Modal_CL_V2 from '../Modal/Modal_CL_V2.js';
import Modal_ML_V2 from '../Modal/Modal_ML_V2.js';
import { array } from 'prop-types';

const EditerRapportTableau = ({ toggleEditerRapport, toggle, Report_Code, EnregisterNewRapportFunction, historyProps, Rapportnewclone }) => {
  /*********************************************Variable********************************************* */
  const [Report_Name_Enregistrer, setReport_Name_Enregistrer] = useState("")
  const [TAGS_New, setTAGS_New] = useState("")
  const [Report_Description, setReport_Description] = useState("")
  const [data_rapport, setData_Rapport] = useState("")
  const [BtnMlDesibled, setBtnMlDesibled] = useState(false)
  const [BtnClDesibled, setBtnClDesibled] = useState(false)
  const [BtnTlDesibled, setBtnTlDesibled] = useState(false)
  const [modalCL, setmodalCL] = useState(false)
  const [modalTL, setmodalTL] = useState(false)
  const [modalML, setmodalML] = useState(false)
  const [CompteurListI_Name, setCompteurListI_Name] = useState("")
  const [ML_Name, setML_Name] = useState("")
  const [tl_name, settl_name] = useState("")
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
  const [errors, setErrors] = useState({ Report_Name_Enregistrer: '' })
  const [cl_Membre_Select_fin, setCl_Membre_Select_fin] = useState("")
  const [ml_Membre_Select_fin, setMl_Membre_Select_fin] = useState("")
  const [dataClone, setDataClone] = useState([])
  const [config, setConfig] = useState(null)
  const [showTAGS_CL, setShowTAGS_CL] = useState(false)
  const [showTAGS_ML, setShowTAGS_ML] = useState(false)
  /******************************************************************************************** */
  /***************************************CL***************************************************** */
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
  /******************************************************************************************** */
  /******************************************ML************************************************** */
  function handleListeMLClick(id, name, membre) {
    setCode_Ml(id)
    setName_Ml(name)
    setML_Membre(membre)
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
  /******************/
  /******************************************************************************************** */
  /**********************************************TL********************************************** */
  function handleListeTLClick(json) {
    if (json != null) {
      if (json.cluster.id != "" && json.iotinner.id == "") {
        settl_name_IOT("")
        settl_id_IOT("")
        settl_name_cluster(json.cluster.name)
        settl_id_cluster(json.cluster.id)

      } else if (json.cluster.id == "" && json.iotinner.id != "") {
        settl_name_IOT(json.iotinner.name)
        settl_id_IOT(json.iotinner.id)
        settl_name_cluster("")
        settl_id_cluster("")
      } else if (json.cluster.id != "" && json.iotinner.id != "") {

        settl_name_IOT(json.iotinner.name)
        settl_id_IOT(json.iotinner.id)
        settl_name_cluster(json.cluster.name)
        settl_id_cluster(json.cluster.id)
      } else {
        settl_name_IOT("")
        settl_id_IOT("")
        settl_name_cluster("")
        settl_id_cluster("")
      }
    }
  }

  /*****Modal Tl*****/
  function toggleTL() {
    setmodalTL(!modalTL)
  }
  /******************/
  /******************************************************************************************** */
  /**************************************Ajouter pour ML ,CL et TL**************************** */
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
          title: 'En peut sélectionner une liste'
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
        title: 'En peut sélectionner une liste'
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
          title: 'En peut sélectionner une liste 1'
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
        title: 'En peut sélectionner une liste 2'
      })
    }


  }
  function AjouterTl() {
    if (tl_id_IOT != "" && tl_id_cluster != "" && tl_name_IOT != "" && tl_name_cluster != "") {
      setmodalTL(!modalTL)
      var name_Tl = (tl_name_IOT + " et " + tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
      settl_name(name_Tl2)

    } else if (tl_id_IOT != "" && tl_id_cluster == "" && tl_name_IOT != "" && tl_name_cluster == "") {
      setmodalTL(!modalTL)
      settl_name(tl_name_IOT)

    } else if (tl_id_IOT == "" && tl_id_cluster != "" && tl_name_IOT == "" && tl_name_cluster != "") {
      setmodalTL(!modalTL)
      var name_Tl = (tl_name_cluster)
      var name_Tl2 = name_Tl.replace("now", "Derniéres lectures")
      settl_name(name_Tl2)

    }
  }
  useEffect(() => {
  }, [tl_id_IOT, tl_id_cluster, tl_name_IOT, tl_name_cluster])
  useEffect(() => {
  }, [Listes_Cl, Listes_Ml])
  /******************************************************************************************** */
  /*********************************************Rapport get par id*********************************************** */
  useEffect(() => {

    axios.get(window.apiUrl + `getReportById/?reportId=${Report_Code}&b&g&n&d&tn&tc&di`)
      .then(

        (result) => {
          if (result.data !== null) {
            setData_Rapport(result.data)

            setReport_Name_Enregistrer(result.data.Report_Name)
            for (var i = 0; i < result.data.Selected_Global.length; i++) {
              if (result.data.Selected_Global[i].Dim == "CL") {
                setCompteurListI_Name(result.data.Selected_Global[i].Dim_label)
              } else if (result.data.Selected_Global[i].Dim == "ML") {
                setML_Name(result.data.Selected_Global[i].Dim_label)
              } else if (result.data.Selected_Global[i].Dim == "TL") {
                settl_name(result.data.Selected_Global[i].Dim_label.iot_name + "," + result.data.Selected_Global[i].Dim_label.cluster_name)
              }
            }

          }

        }

      )
      .catch(({ response }) => {
        if (response != null) {
          if (response.status == "401") {

            window.location.assign("/")
            localStorage.clear();
          }
        }
      }
      )

  }, [])
  /******************************************************************************************** */
  /*********************************************Data report*********************************************** */
  useEffect(() => {
    if (!data_rapport) return
    var Selected_Global = []
    var objects = []
    var Plots = []
    objects = data_rapport.Body.objects
    Selected_Global = data_rapport.Selected_Global
    if (objects.length != 0) {
      for (var i = 0; i < objects.length; i++) {
        Plots = objects[i].MasterObj_Data_Mapping.Plots
        if (Plots.length != 0) {
          for (var j = 0; j < Plots.length; j++) {
            if (Selected_Global != null) {
              for (var k = 0; k < Selected_Global.length; k++) {
                if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 == undefined) {

                  if (Selected_Global[k].Dim == "CL") {

                    setBtnClDesibled(false)

                  } else if (Selected_Global[k].Dim == "ML") {

                    setBtnMlDesibled(false)

                  } else if (Selected_Global[k].Dim == "TL") {

                    setBtnTlDesibled(false)

                  } else {


                  }

                } else if (Selected_Global[k].Dim_type == "VAR" && Plots[j].Y.Y2 != undefined) {

                  if (objects[i].MasterObj_Data_selection.y == "ML") {
                    setBtnMlDesibled(true)
                  } else if (objects[i].MasterObj_Data_selection.y == "CL") {
                    setBtnClDesibled(true)
                  }
                }
                else {
                  if (Selected_Global[k].Dim == "CL") {


                    setBtnClDesibled(true)

                  } else if (Selected_Global[k].Dim == "ML") {


                    setBtnMlDesibled(true)


                  } else if (Selected_Global[k].Dim == "TL") {
                    setBtnTlDesibled(true)
                  } else {


                  }

                }
              }

            }
          }
        }
      }
    }
  }, [data_rapport])
  /******************************************************************************************** */
  /*********************************************Parametre Clone*********************************************** */
  useEffect(() => {

    if (Report_Name_Enregistrer != "") {
      if (cl_Membre_Select_fin.length != 0 || ml_Membre_Select_fin.length != 0 || tl_id_cluster != "" || tl_id_IOT != "") {
        if (cl_Membre_Select_fin.length != 0 && ml_Membre_Select_fin.length == 0 && tl_id_IOT.length == 0 && tl_id_cluster.length == 0) {
          /////CL
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            }
          }])
        } else if (ml_Membre_Select_fin.length != 0 && tl_id_IOT.length == 0 && tl_id_cluster.length == 0 && cl_Membre_Select_fin.length == 0) {
          /////ML
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            }
          }])
        } else if (tl_id_IOT.length != 0 && tl_id_cluster.length == 0 && cl_Membre_Select_fin.length == 0 && ml_Membre_Select_fin.length == 0) {
          /////TL



          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])

        } else if (cl_Membre_Select_fin.length != 0 && ml_Membre_Select_fin.length != 0 && tl_id_IOT.length == 0 && tl_id_cluster.length == 0) {
          ////// cl & ml
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            }
          }])
        } else if (cl_Membre_Select_fin.length != 0 && tl_id_IOT.length != 0 && tl_id_cluster.length == 0 && ml_Membre_Select_fin.length == 0) {
          /////cl & tl      


          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])
        } else if (ml_Membre_Select_fin.length != 0 && tl_id_IOT.length != 0 && tl_id_cluster.length == 0 && cl_Membre_Select_fin.length == 0) {
          //// ml & tl    


          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])

        } else if (cl_Membre_Select_fin.length != 0 && tl_id_IOT.length != 0 && ml_Membre_Select_fin.length != 0 && tl_id_cluster.length == 0) {
          //      cl & tl & ml     
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])
        } else if (cl_Membre_Select_fin.length != 0 && tl_id_IOT.length != 0 && ml_Membre_Select_fin.length != 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])
        } else if (cl_Membre_Select_fin.length != 0 && tl_id_IOT.length == 0 && ml_Membre_Select_fin.length != 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            }
          }])
        } else if (cl_Membre_Select_fin.length == 0 && tl_id_IOT.length != 0 && ml_Membre_Select_fin.length != 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])
        } else if (cl_Membre_Select_fin.length != 0 && tl_id_IOT.length != 0 && ml_Membre_Select_fin.length == 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "cl": {
              "tag": CompteurListI_Name,
              "members": cl_Membre_Select_fin
            },
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])

        } else if (cl_Membre_Select_fin.length == 0 && tl_id_IOT.length == 0 && ml_Membre_Select_fin.length != 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "ml": {
              "tag": ML_Name,
              "members": ml_Membre_Select_fin
            },
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            }
          }])
        } else if (cl_Membre_Select_fin.length == 0 && tl_id_IOT.length == 0 && ml_Membre_Select_fin.length == 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            }
          }])
        } else if (cl_Membre_Select_fin.length == 0 && tl_id_IOT.length != 0 && ml_Membre_Select_fin.length == 0 && tl_id_cluster.length != 0) {
          setDataClone([{
            "title": Report_Name_Enregistrer,
            "tags": TAGS_New,
            "description": Report_Description,
            "tlCluster": {
              "id": tl_id_cluster,
              "tag": tl_name_cluster,
            },
            "tlIot": {
              "tag": tl_name_IOT,
              "id": tl_id_IOT
            }
          }])

        } else {
          console.log("data vide")
          setDataClone([])
        }
      }
    }


  }, [ml_Membre_Select_fin, cl_Membre_Select_fin, tl_id_IOT, tl_id_cluster, Report_Name_Enregistrer, CompteurListI_Name, ML_Name, tl_name])

  useEffect(() => {
  }, [dataClone])
  /******************************************************************************************** */
  /**********************************************EnregisterNewRapport********************************************** */

  function EnregisterNewRapport() {

    if (Report_Name_Enregistrer != "" && Report_Name_Enregistrer.length > 5) {

      document.querySelector("body").classList.add("isLoading")

      axios.get(window.apiUrl + `getReportByName/?reportName=${Report_Name_Enregistrer}`)
        .then(
          (result) => {
            if (result.data.length !== null) {
              if (result.status == 200) {
                document.querySelector("body").classList.remove("isLoading")

              }
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 450,
                title: 'Nom de Rapport déjà utilisé'
              })

            }
          })

        .catch((err) => {


          if (Report_Code != "" && dataClone.length != 0) {
            document.querySelector("body").classList.add("isLoading")
            axios.put(window.apiUrl + "cloneV5/",

              {
                "R_IDs": [Report_Code],
                "data": dataClone

              }


            )

              .then(
                (result) => {
                  //   this.tableData = result.data;
                  if (result.data !== null) {
                    if (result.status == 200) {
                      document.querySelector("body").classList.remove("isLoading")

                    toggleEditerRapport()
                    toggle()

                    historyProps.push({
                      search: `?reportId=${result.data.IDs[0]}`,

                    })
                    Rapportnewclone(false)
                  } else {
                  }

                }

                }
              )
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
          } else {
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
        )

    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'Vérifier le champ nom de rapport'
      })
    }
  }
  useEffect(() => {

  }, [config])
  /******************************************************************************************** */
  /******************************************Btn VisualiserNewRapport************************************************** */
  function VisualiserNewRapport() {

    if (Report_Name_Enregistrer != "" && Report_Name_Enregistrer.length > 5) {


      document.querySelector("body").classList.add("isLoading")
      axios.get(window.apiUrl + `getReportByName/?reportName=${Report_Name_Enregistrer}`)
        .then(
          (result) => {
            if (result.data.length !== null) {

              if (result.status == 200) {
                document.querySelector("body").classList.remove("isLoading")

              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 450,
                title: 'Nom de Rapport déjà utilisé'
              })
            }
            }
          })

        .catch((err) => {
          if (Report_Code != "" && dataClone.length != 0) {
            document.querySelector("body").classList.add("isLoading")
            axios.post(window.apiUrl + "cloneV5/",

              {
                "R_IDs": [Report_Code],
                "data": dataClone

              }


            )

              .then(
                (result) => {

                  if (result.data !== null) {

                    if (result.status == 200) {
                      document.querySelector("body").classList.remove("isLoading")

                    var EnregisterTemp = []
                    var Selected_Global = []

                    var Selected_Global2 = data_rapport.Selected_Global
                    if (Selected_Global2.length != 0) {
                      var CL_Selected = null
                      var ML_Selected = null
                      var TL_Selected = null
                      for (var i = 0; i < Selected_Global2.length; i++) {
                        if (Selected_Global2[i].Dim_type == "VAR") {
                          if (Selected_Global2[i].Dim == "CL") {

                            if (Code_Cl != "" && CompteurListI_Name != "") {
                              CL_Selected = {
                                "Dim": "CL",
                                "Dim_type": "VAR",
                                "Dim_code": Code_Cl,
                                "Dim_label": CompteurListI_Name,
                                "Dim_Member": cl_Membre_Select_fin,
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            } else {

                              CL_Selected = {
                                "Dim": "CL",
                                "Dim_type": "VAR",
                                "Dim_code": Selected_Global2[i].Dim_code,
                                "Dim_label": Selected_Global2[i].Dim_label,
                                "Dim_Member": Selected_Global2[i].Dim_Member,
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            }
                          } else if (Selected_Global2[i].Dim == "ML") {

                            if (Code_Ml != "" && ML_Name != "") {
                              ML_Selected = {
                                "Dim": "ML",
                                "Dim_type": "VAR",
                                "Dim_code": Code_Ml,
                                "Dim_label": ML_Name,
                                "Dim_Member": ml_Membre_Select_fin,
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            } else {

                              ML_Selected = {
                                "Dim": "ML",
                                "Dim_type": "VAR",
                                "Dim_code": Selected_Global2[i].Dim_code,
                                "Dim_label": Selected_Global2[i].Dim_label,
                                "Dim_Member": Selected_Global2[i].Dim_Member,
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            }

                          } else if (Selected_Global2[i].Dim == "TL") {


                            if (tl_id_IOT != "" && tl_name_IOT != "" && tl_id_cluster == "" && tl_name_cluster == "") {
                              TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": { "cluster_code": Selected_Global2[i].Dim_code.cluster_code, "iot_code": tl_id_IOT },
                                "Dim_label": { "cluster_name": Selected_Global2[i].Dim_label.cluster_name, "iot_name": tl_name_IOT },
                                "Dim_Member": { "clusterMembers": Selected_Global2[i].Dim_Member.clusterMembers, "iotinnerMembers": [tl_id_IOT] },
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }


                            } else if (tl_id_IOT == "" && tl_name_IOT == "" && tl_id_cluster != "" && tl_name_cluster != "") {
                              TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": { "cluster_code": tl_id_cluster, "iot_code": Selected_Global2[i].Dim_code.iot_code },
                                "Dim_label": { "cluster_name": tl_name_cluster, "iot_name": Selected_Global2[i].Dim_label.iot_name },
                                "Dim_Member": { "clusterMembers": [tl_id_cluster], "iotinnerMembers": Selected_Global2[i].Dim_Member.iotinnerMembers },
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }

                            } else if (tl_id_IOT != "" && tl_name_IOT != "" && tl_id_cluster != "" && tl_name_cluster != "") {

                              TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": { "cluster_code": tl_id_cluster, "iot_code": tl_id_IOT },
                                "Dim_label": { "cluster_name": tl_name_cluster, "iot_name": tl_name_IOT },
                                "Dim_Member": { "clusterMembers": [tl_id_cluster], "iotinnerMembers": [tl_id_IOT] },
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            }
                            else {

                              TL_Selected = {
                                "Dim": "TL",
                                "Dim_type": "VAR",
                                "Dim_code": Selected_Global2[i].Dim_code,
                                "Dim_label": Selected_Global2[i].Dim_label,
                                "Dim_Member": Selected_Global2[i].Dim_Member,
                                "Dim_Clone": Selected_Global2[i].Dim_Clone,
                              }
                            }


                          } else {

                            console.log("vide")

                          }


                        } else {

                          if (Selected_Global2[i].Dim == "CL") {
                            CL_Selected = {
                              "Dim": "Cl",
                              "Dim_type": "Fix",
                              "Dim_code": Selected_Global2[i].Dim_code,
                              "Dim_label": Selected_Global2[i].Dim_label,
                              "Dim_Member": Selected_Global2[i].Dim_Member,
                              "Dim_Clone": Selected_Global2[i].Dim_Clone,
                            }


                          } else if (Selected_Global2[i].Dim == "ML") {
                            ML_Selected = {
                              "Dim": "ML",
                              "Dim_type": "VAR",
                              "Dim_code": Selected_Global2[i].Dim_code,
                              "Dim_label": Selected_Global2[i].Dim_label,
                              "Dim_Member": Selected_Global2[i].Dim_Member,
                              "Dim_Clone": Selected_Global2[i].Dim_Clone,
                            }

                          } else if (Selected_Global2[i].Dim == "TL") {


                            TL_Selected = {
                              "Dim": "TL",
                              "Dim_type": "Fix",
                              "Dim_code": Selected_Global2[i].Dim_code,
                              "Dim_label": Selected_Global2[i].Dim_label,
                              "Dim_Member": Selected_Global2[i].Dim_Member,
                              "Dim_Clone": Selected_Global2[i].Dim_Clone,
                            }
                          } else {


                          }
                        }


                      }
                      Selected_Global = [CL_Selected, ML_Selected, TL_Selected]
                    } else {
                    }

                    /////////////////////////////////////////////////////////////
                    var Body = {}
                    if (result.data != 0) {
                      Body = result.data[0]
                    }
                    EnregisterTemp.push(
                      {
                        "Report_Name": Report_Name_Enregistrer,
                        "Report_TableauName": data_rapport.Report_TableauName,
                        "Report_TableauCode": data_rapport.Report_TableauCode,
                        "Report_Description": Report_Description,
                        "Body": Body,
                        "Selected_Global": Selected_Global,
                        "TAGS": TAGS_New,
                        "disposition": data_rapport.disposition,
                      }
                    )
                    EnregisterNewRapportFunction(EnregisterTemp)
                    toggleEditerRapport()
                    toggle()



                  } else {
                    console.log('no data change')
                  }
                }
                }
              )

          } else {
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
        )

    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 350,
        title: 'Vérifier le champ nom de rapport'
      })
    }
  }
  useEffect(() => {
    if (!Report_Name_Enregistrer) return
    switch ("Report_Name_Enregistrer") {
      case 'Report_Name_Enregistrer':
        errors.Report_Name_Enregistrer =
          (Report_Name_Enregistrer.length < 5
            ? 'Nom doit comporter au moins 5 caractères!'
            : ' ');
        break;
      default:
        break;
    }

  }, [Report_Name_Enregistrer, errors])
  /******************************************************************************************** */
  return (<>
    <MDBModalHeader toggle={toggleEditerRapport}>Éditer Rapport</MDBModalHeader>
    <MDBModalBody>
      {Report_Code ? (
        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
            </label>

            <input type="text" id="defaultFormLoginEmailEx" autoComplete="off" name="Report_Name_Enregistrer" value={Report_Name_Enregistrer} onChange={(e) => setReport_Name_Enregistrer(e.target.value)} className="form-control" required />
            {errors.Report_Name_Enregistrer.length > 0 &&
              <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Report_Name_Enregistrer}</span>}
          </MDBCol>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Mots clés
            </label>
            <input type="textarea" id="defaultFormLoginEmailEx" autoComplete="off" name="TAGS_New" value={TAGS_New} onChange={(e) => setTAGS_New(e.target.value)} className="form-control" required />
          </MDBCol>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Description
            </label>

            <input type="textarea" id="defaultFormLoginEmailEx" autoComplete="off" name="Report_Description" value={Report_Description} onChange={(e) => setReport_Description(e.target.value)} className="form-control" required />
          </MDBCol>
          <MDBCol size="12">
            <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

              <legend style={{ width: "264px", color: "#51545791", fontSize: "20px" }}>Sélectionner les données <span className='text-danger' style={{ fontSize: '20px' }}>*</span> </legend>

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
                  //  disabled={BtnTlDesibled}
                  disabled={true}
                    style={{ fontSize: "13px", textAlign: "center", width: "90%" }}
                    onClick={toggleTL}>
                    Time Intelligence
                  </MDBBtn>

                </MDBCol>
                <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >
                  {tl_name}
                </b></MDBCol>
              </MDBRow>

            </fieldset>
          </MDBCol>
        </MDBRow>
      ) : null}
    </MDBModalBody>

    <MDBModalFooter>
      <MDBRow >
        <MDBCol size="6" style={{ marginLeft: "-12%" }}>
          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ width: "270px" }} onClick={VisualiserNewRapport}> Visualiser Rapport <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
        </MDBCol>
        <MDBCol size="6">
          <MDBBtn style={{ width: "270px" }} onClick={toggleEditerRapport} onClick={EnregisterNewRapport} > Enregister Rapport <MDBIcon icon="save" className="ml-1" /></MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBModalFooter>

    <div>


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

      <MDBModal isOpen={modalTL} toggle={toggleTL} centered size="lg">

        <Modal_TL_V2 toggle={toggleTL} handleListeTLClick={handleListeTLClick} />


        <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

          <MDBNavItem>
            <MDBNavLink link onClick={() => window.open("/Rapporteur/TimeIntelligence")} style={{ color: "#000" }} >
              liste d'éditeurs
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBModalFooter>

          <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={AjouterTl}
          > <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>

  </>)

}
export default EditerRapportTableau