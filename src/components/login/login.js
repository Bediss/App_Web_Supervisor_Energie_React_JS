import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBCardText, MDBCardImage, MDBCard, MDBView, MDBCardBody, MDBModal, MDBCardHeader, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import axios from 'axios';
//import axios from "../../components/axios"
import PropTypes from "prop-types"
import Moment from 'moment';
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
import { useStores } from "../../store"

const login = ({ }) => {
  const { mainStore } = useStores()

  const [email, setEmail] = useState("")
  const [pwd, setpwd] = useState("")
  const history = useHistory()
  //const [errors, setErrors] = useState({ email: '',pwd:'' })
  useEffect(() => {

  }, [email, pwd])
  function Connexion() {

    if (email != "" && pwd != "") {
      return axios.post(window.apiUrl + `login/`,
        {
          "email": email,
          "password": pwd
        })
        .then(({data}) => {
            localStorage.setItem('token', data.token);
            return mainStore.setUser()
        })
        .then((_user) => {
          const user = _user
          localStorage.setItem('User_Report', user.User_Report);
          localStorage.setItem('User_Factbook', user.User_Factbook);
        })
        // .then(
        //   (result) => {
        //     if (result.status == 200) {

        //       const data = result.data
        //       console.log("user", data.User_Report)
        //       localStorage.setItem('User_Report', data.User_Report);
        //       localStorage.setItem('User_Factbook', data.User_Factbook);
        //       return mainStore.setUser(result.data)
        //       //  window.location.assign("/Navigateur")
        //     }
        //   })
        .then(() => {
          const {saisie,user,admin,rapporteur,superUser}={...mainStore.getUI()}
          switch (true) {
            case superUser:
           
              return history.push("/Navigateur")
            case admin:
           
              return history.push("/Navigateur")
              case rapporteur:
           
                return history.push("/Navigateur")
            case user:
           
                return history.push("/Navigateur")
            case saisie:
             
                return history.push("/saisie")
            default:
             
              return history.push("/")
          }
        })

        .catch((err) => {
          console.log(err)

          const { response } = err
          console.log("login", err)
          if (response != null) {
            if (response.status == "404" || response.status == "400") {
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                icon: 'warning',
                width: 450,
                title: 'Votre email ou mot de passe sont incorrects'
              })

            }
          }
        }
        )
    } else {

      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 5000,
        icon: 'warning',
        width: 650,
        title: 'En peut remplir les champs pour connecter sur le système'
      })
    }
  }
  const keydown = (e) => {
    console.log(e.nativeEvent.code)
    if (e.nativeEvent.code == "Enter") {
      Connexion();
    }
  }
  return (
    <>
      <MDBCol>

        <MDBCard style={{ maxWidth: "36rem", marginLeft: "33%", marginTop: "8%" }}>
          <div style={{ backgroundColor: "#00c996" }}>
            <MDBCardImage className="img-fluid" src={`/login/bizeyes.png`} waves />

          </div>
          <MDBCardBody>
            <MDBCardTitle style={{ textAlign: "center", fontSize: "35px" }}><b>Login</b></MDBCardTitle>
            <MDBCardText>


              <label htmlFor="defaultFormLoginEmailEx" className="grey-text"  >
                Email
              </label>
              <input onKeyDown={keydown} type="email" id="defaultFormLoginEmailEx" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Mot de passe
              </label>
              <input onKeyDown={keydown}
                type="password" id="defaultFormLoginPasswordEx" className="form-control" name="pwd" value={pwd} onChange={(e) => setpwd(e.target.value)} />



            </MDBCardText>
            <MDBBtn
              color="#bdbdbd grey lighten-1"
              className="mb-3"
              type="submit"
              style={{ width: "98%" }}
              onClick={Connexion}
            >
              <b>Se Connecter</b>
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </>
  )


}

export default login;