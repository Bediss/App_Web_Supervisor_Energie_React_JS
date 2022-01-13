import React, { useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBCardTitle, MDBCardText, MDBCardImage, MDBCard, MDBCardBody, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from "../axios"
import Swal from 'sweetalert2';
import Navbar from "../navbar";
import { useHistory } from "react-router";


const Saisie = () => {

  const history = useHistory()
  const [poids, setPoids] = useState('')
  const [date, setDate] = useState('')
  const [modal, setModel] = useState(false)
  const [maxmumDate, setmaxmumDate] = useState("")


  useEffect(() => {

  }, [date])

  useEffect(() => {
    let d = new Date().toJSON();
    let c = d.slice(0, 10)
    setmaxmumDate(c)
  }, [])
  useEffect(() => {
  }, [maxmumDate])


  function Enregistrer() {

    axios.put(window.apiUrl + "saisiePMG/", {
      date: date,
      poids: parseFloat(poids)
    })


    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'success',
      title: 'Enregister avec succès'
    })
    setDate('')
    setPoids('')
    ToggleEnregistrer()


    // .then(
    //   (response) => {
    //       if (response.status == "200") {
    //       Swal.fire({
    //           toast: true,
    //           position: 'top',
    //           showConfirmButton: false,
    //           timer: 4000,
    //           width: 300,
    //           icon: 'success',
    //           title: 'Enregister avec succès'
    //         })
    //         setDate('')
    //         setPoids('')
    //         ToggleEnregistrer()
    //       }
    //   })
    // .catch(({ response }) => {
    //   if (response != null) {
    //     if (response.status == "401") {

    //        history.push("/")
    //       localStorage.clear();

    //     }
    //   }
    // }
    // )   
  }
  function ToggleEnregistrer() {
    if (poids != "" && date != "") {
      setModel(!modal)
    } else if (poids == "" && date == "") {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Remplir les champs'
      })
    } else if (date == "") {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Remplir le champ Date'
      })

    } else if (poids == "") {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Remplir le champ Poids'
      })
    }

  }

  return (<>
    <Navbar history={history} />
    <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438', color: "#000", fontFamily: 'GOTHAM MEDIUM' }}>
      <MDBBreadcrumbItem>  Saisie</MDBBreadcrumbItem>
      <MDBBreadcrumbItem > Poids Matière Grasse </MDBBreadcrumbItem>
    </MDBBreadcrumb>

    <MDBCol>

      <MDBCard style={{ maxWidth: "45rem", marginLeft: "30%", marginTop: "5%", backgroundColor: '#b1b5b438' }}>
        <MDBCardBody>
          <MDBCardTitle style={{ textAlign: "center", fontSize: "35px" }}>Outils saisie des données</MDBCardTitle>
          <MDBCardTitle style={{ textAlign: "center", fontSize: "35px" }}>Poids Matière Grasse</MDBCardTitle>

          <MDBCardText>


            <label htmlFor="defaultFormLoginEmailEx" style={{ fontSize: "20px" }} >
              <b>Date</b><span className='text-danger' style={{ fontSize: '20px' }}>*</span>
            </label>
            <input type="date" id="defaultFormLoginEmailEx" max={maxmumDate} className="form-control" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" style={{ fontSize: "20px" }}>
              <b> Poids/Kg</b><span className='text-danger' style={{ fontSize: '20px' }}>*</span>
            </label>
            <MDBRow>
              <MDBCol size="12">
                <input
                  type="number" id="defaultFormLoginPasswordEx" className="form-control" name="poids" value={poids} onChange={(e) => setPoids(e.target.value)} />
              </MDBCol>

            </MDBRow>


          </MDBCardText>
          <MDBBtn
            color="#00695c teal darken-3"
            className="mb-3"
            //size="lg"
            type="submit"
            style={{ width: "37%", marginLeft: "33%" }}
            onClick={ToggleEnregistrer}
          >
            <b style={{ color: "#fff" }}>Enregistrer </b>
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <MDBModal isOpen={modal} toggle={ToggleEnregistrer} centered>
        <MDBModalHeader toggle={ToggleEnregistrer}>Confirmation d'enregistrement</MDBModalHeader>
        <MDBModalBody>
          Voulez-vous enregistrer le poids {poids} kg ?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="#eeeeee grey lighten-3" onClick={ToggleEnregistrer}>Annuler</MDBBtn>
          <MDBBtn onClick={Enregistrer}>Enregistrer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBCol>
  </>)
}

export default Saisie;