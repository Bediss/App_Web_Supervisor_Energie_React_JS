
import React, { useState, useEffect, useRef } from "react"
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBListGroup, MDBListGroupItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBTooltip, MDBModal, MDBModalHeader, MDBModalBody, MDBContainer, MDBRow, MDBCol, MDBModalFooter, MDBIcon, MDBInput, MDBBtn } from "mdbreact";

import Navbar from "../navbar";
import useState2 from "react-usestateref"
import { useHistory } from "react-router-dom"
import axios from "../axios"
import { ReactTabulator, reactFormatter } from 'react-tabulator'
import Swal from "sweetalert2"
import { useStores } from "../../store"
import "./user.css"
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { getNested } from "../Rapporteur/Rapport/layoutGen/extra";
import { observer } from "mobx-react-lite"
import FilterV1 from "../filterV1"
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const ShowBu = ({ cell, bu }) => {
    const [text, setText] = useState(null)
    useEffect(() => {
        const value = cell._cell.value;
        const output = { main: "", tooltips: [] }
        if (value && value.length) {
            const filtred = value.map(e => bu.filter(_bu => _bu.Code == e).pop()).map(e => e && e.unite)
            if (filtred.length) {
                const filtredJoined = filtred.join(",")
                const add = "..."
                output.main = filtredJoined.substring(0, 20)
                if (filtredJoined.length > 20)
                    output.main += add
                output.tooltips = filtred
            }
        }
        setText(output)
    }, [])
    return (
        text ? <MDBContainer>

            <MDBTooltip
                domElement
                tag="div"
                placement="top"
            >
                <span className="blue-text">{text.main}</span>
                {<div>{text.tooltips.map((e, i) => <div key={i}>{e}</div>)}</div>}
            </MDBTooltip>

        </MDBContainer> : <></>
    );
}

const ShowTitle = ({ cell, reports, factBooks }) => {
    const [text, setText] = useState(null)
    useEffect(() => {
        const value = cell._cell.value;

        const output = { main: "", tooltips: [] }

        const type = reports ? "report" : "factBook"

        const name = type == 'report' ? reports.filter(report => report.Report_Code == value).pop().Report_Name : factBooks.filter(factbook => factbook.Code_FactBook == value).pop().Nom_FactBook

        if (name.length > 20)
            output.main = name.substring(0, 20).trim() + '...'
        else
            output.main = name
        output.tooltips = [name]
        setText(output)
    }, [])
    return (text ? <MDBContainer>
        <MDBTooltip
            domElement
            tag="div"
            placement="top"
        >
            <span className="blue-text">{text.main}</span>
            {<div>{text.tooltips.map((e, i) => <div key={i}>{e}</div>)}</div>}
        </MDBTooltip>

    </MDBContainer> : <></>)
}

const ReportFactBookModal = ({ isOpen, toggleChange = () => { }, opType, reports = null, factbooks = null, outSelectedFactbook = () => { }, outSelectedReport = () => { } }) => {
    const [text, setText] = useState(null)
    const [ready, setReady] = useState(null)
    const [selected, setSelected] = useState(null)
    useEffect(() => {
        setReady(true)
    }, [])
    useEffect(() => {

        if (!reports && !factbooks) return
        let header = ""

        if (reports) {
            header = "selectioner un Rapport"

        }
        else if (factbooks) {
            header = "selectioner un Factbook"
        }
        setText({ header })

    }, [reports, factbooks])

    const [mDBListGroupItemSelected, setMDBListGroupItemSelected] = useState(null)

    const FactBookselectedchange = (i, list) => {
        setMDBListGroupItemSelected(i)
        setSelected(list)
    }
    return ready && text ? <MDBModal size="lg" isOpen={isOpen} toggle={toggleChange} centered noValidate>
        <MDBModalHeader toggle={toggleChange} >{text.header}</MDBModalHeader>
        <MDBModalBody>
            {reports && !factbooks && <FilterV1
                filterName={"Rapport"}
                outSelected={setSelected}

                //   outAllFiltred={outAllFiltred}
                filter={[{ Report_TableauName: "Tableaux" }, { TAGS: "Mot Clé" }]}
                display={{ separator: "", elems: ["Report_Name"] }}
                data={reports || factbooks}
                styleScroll={{ width: "450px", maxHeight: "510px" }}
                btnEdit={true} />}
            {!reports && factbooks &&
                <>
                    <label htmlFor="defaultFormLoginEmailEx" style={{ marginLeft: "4%" }}   >Liste des FactBook:</label>

                    <input type="text" id="myInputFactBook" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "93%", marginRight: "4%" }} />

                    <MDBContainer style={{ padding: 0 + 'em' }} >

                        <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={{ maxHeight: "390px" }} id="myFilter">
                            {factbooks.map((list, i) => <MDBListGroupItem hover active={mDBListGroupItemSelected == i ? true : false} key={i} name="Nom_FactBook" value={list.Nom_FactBook} style={{ cursor: "pointer", padding: 0.5 + 'em' }} id={list.Code_FactBook} hover onClick={() => FactBookselectedchange(i, list)} >{list.Nom_FactBook}</MDBListGroupItem>)}
                        </MDBListGroup>
                    </MDBContainer>
                </>
            }
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
            <MDBBtn onClick={(e) => { factbooks ? outSelectedFactbook(selected) : reports ? outSelectedReport(selected) : null; toggleChange(e) }} color="#e0e0e0 grey lighten-2" >{opType == "newUser" ? "Ajouter" : "Modifier"}</MDBBtn>
        </MDBModalFooter>
    </MDBModal> : <></>
}

const UserModal = ({ isOpen, opType, toggleChange = () => { }, data = { reports: null, factBooks: null, selectedUser: {}, userTypes: [] } }) => {
    const { mainStore } = useStores()
    const [ready, setReady] = useState(false)
    const [initState] = useState({
        errors: {
            User_Master_Name: '* Obligatoire', // au moins 5 caractére
            Email_User_Master: '* Obligatoire', //email
            Password: '* Obligatoire',
            userType: '* Obligatoire',
            report: '* Obligatoire',
            factbook: '* Obligatoire'
        },
        noErrors:{
            User_Master_Name: '', // au moins 5 caractére
            Email_User_Master: '', //email
            Password: '',
            userType: '',
            report: '',
            factbook: '',
        },
        inputs:{ 
            userType: [],
            factbook: "",
            factbookName: "",
            report: "",
            reportName: "",
            SMS_User_Master: '',
            User_Master_Name: '',
            Email_User_Master: '',
            Password: '',
            BU_Master: '',
            Fonction_Master: ''
        }
    })
    const [errors, setErrors, errorsRef] = useState2(() => {
        if (opType == "newUser")
            return initState.errors
        else return initState.noErrors
    })
    const [text, setText] = useState(null)
    const [openModal_AddEditReport, setOpenModal_AddEditReport] = useState()
    const [openModal_AddEditFactBook, setOpenModal_AddEditFactBook] = useState()
    const [inputs, setInputs, inputsRef] = useState2(()=>initState.inputs)
    const [inputsChanged, setInputsChanged, inputsChangedRef] = useState2({ userType: false, factbook: false, factbookName: false, report: false, reportName: false, SMS_User_Master: false, User_Master_Name: false, Email_User_Master: false, Password: false, BU_Master: false, Fonction_Master: false })
    const handleChange = (e, op, countryData) => {
        const state = { ...inputsRef.current }
        const changes = { ...inputsChangedRef.current }
        const _errors = { ...errors }
        const value = e && e.target ? e.target.value : e
        switch (op) {
            case "BU_Master":
                changes[op] = true
                changes.bu = true
                if ((value || []).length) {
                }
                else {
                    _errors.User_Master_Name = ""
                }
                break;
            case "User_Master_Name":
                changes[op] = true
                changes.name = true

                if ((value || "").trim().indexOf(" ") == -1)
                    _errors.User_Master_Name = "nom et prénom requis"
                else
                    _errors.User_Master_Name = ""
                break;
            case "Email_User_Master":
                changes[op] = true
                changes.email = true

                const regEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "gi")
                if (!regEmail.test(value))
                    _errors.Email_User_Master = "l'email n'est pas valide"
                else
                    _errors.Email_User_Master = ""
                break;
            case "SMS_User_Master":
                changes[op] = true
                changes.tel = true

                const regSMS = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
                if (value.length) {
                    if (!regSMS.test(value))
                        _errors.SMS_User_Master = "numéro de telephone n'est pas valide"
                    else
                        _errors.SMS_User_Master = ""

                } else {
                    _errors.SMS_User_Master = ""
                }
                break;
            case "Fonction_Master":
                changes[op] = true
                changes.fonction = true

                break;
            case "Password":
                changes[op] = true
                changes.password = true

                if ((value || "").length >= 6)
                    _errors.Password = ""
                else
                    _errors.Password = "6 caractères minimum"
                break;
            case "userType":
                changes[op] = true
                changes.role = true

                if ((value || []).length) {
                    _errors.userType = ""
                }
                else {
                    _errors.userType = "un role au minimum"
                }
                break;
            case "report":
                changes[op] = true
                changes.report = true

                const report = inputsRef.current.report
                if (report)
                    _errors.report = ""
                else
                    _errors.report = "sélectionner un rapport"
                break;
            case "factbook":
                changes[op] = true
                changes.factbook = true

                if (value)
                    _errors.factbook = ""
                else
                    _errors.factbook = "sélectionner un factbook"
                break;
            default:
                break;
        }

        switch (op) {
            case "SMS_User_Master":
                const dialCode = countryData.dialCode
                const _value = `${dialCode ? `+${dialCode}` : ""}${value}`
                state[op] = _value;
                break;

            default:
                state[op] = value;
                break;
        }
        setErrors(_errors)
        setInputsChanged(changes)

        setInputs(state)
    }
    const swal = (error = false, title = "", position = "top", timer = 4000, width = 300, toast = true) => {
        return Swal.fire({
            toast,
            position,
            showConfirmButton: false,
            timer,
            width,
            icon: error === true ? 'error' : "success",
            title
        })
    }
    const handleFinalClickOp = (e) => {
        e.preventDefault()
        let ready = true
        for (let elem of Object.keys(errors)) {

            const element = errors[elem];
            if ((element || "").trim() != '') {
                ready = false;
                break;
            }
        }
        if (ready == true) {
            const email = inputsRef.current.Email_User_Master
            const password = inputsRef.current.Password
            const name = inputsRef.current.User_Master_Name
            const tel = inputsRef.current.SMS_User_Master
            const bu = (inputsRef.current.BU_Master || []).map(el => el&&el.label)
            const fonction = inputsRef.current.Fonction_Master
            const role = (inputsRef.current.userType || []).map(el => el&&el.label)
            const factbook = inputsRef.current.factbook
            const report = inputsRef.current.report
            const datatoSend = {
                email, password, name, role, tel:tel&&tel.replace(" ",""), factbook, report, fonction, bu
            }
            if (opType == "newUser") {
                return axios.post(`${mainStore.apiPath}admin/createUser/`, datatoSend)
                    .then(({ data: respData }) => {
                        const error = respData.error;
                        if (error === false) {
                            swal(false, 'utilisateur ajouté')

                            datatoSend.User_Master_Code = respData.userId
                            delete datatoSend.password
                            delete datatoSend.userId

                            toggleChange("newUser", datatoSend)
                            setInputs(initState.inputs)
                            setErrors(initState.errors)
                        }
                        else {
                            swal(true, "erreur a l'ajout de l'utilisateur")
                        }
                    })
                    .catch((err) => {
                        swal(true, "erreur a l'ajout de l'utilisateur")
                        console.log(err)
                    })

            }
            else if (opType == "modUser") {
                const finalDataToSend = { userId: data.selectedUser.User_Master_Code }
                Object.keys(datatoSend).map((e) => {
                    const key = e
                    const value = datatoSend[e]
                    if (inputsChangedRef.current[key] == true)
                        finalDataToSend[key] = value
                })
                return axios.patch(`${mainStore.apiPath}admin/editUser/`, finalDataToSend)
                    .then(({ data: respData }) => {
                        const error = respData.error;
                        if (error === false) {
                            swal(false, 'utilisateur modifié')
                            toggleChange("modUser", inputsRef.current)
                            setInputs(initState.inputs)
                            setErrors(initState.errors)
                        }
                    })
            }
        }
        else {
            swal(true, "Formulaire contient des champs invalides.")
        }
    }

    const handleAddEditReport = (e, opType) => {
        e.preventDefault()
        setOpenModal_AddEditReport(true)
    }
    const handleReportFactbookChange = (e, opType) => {
        handleChange(e, opType)

    }

    const handleAddEditFactBook = (e, opType) => {
        e.preventDefault()
        setOpenModal_AddEditFactBook(true)
    }

    useEffect(() => {
        let _texts = {}
        let _default = {
            name: "Nom de l'utilisateur",
            email: "email",
            password: "mot de passe",
            sms: "SMS",
            tel: "Telephone",
            fax: "Fax",
            buMaster: "BU_Master",
            func: "Fonction",
            userType: "type utilisateur"
        }
        if (opType == "newUser")
            _texts = {
                opType,
                header: "Nouveau Utilisateur",
                op: "Ajouter",
                addEditReport: "ajouter un Rapport",
                addEditFactBook: "ajouter un FactBook"
            }
        else
            _texts = {
                opType,
                header: "modifier Utilisateur",
                op: "Modifier",
                addEditReport: "modifier le Rapport",
                addEditFactBook: "modifier le FactBook"
            }
        setText(Object.assign({}, _default, _texts))
        setReady(true)
    }, [])

    useEffect(()=>{
        if (!isOpen) return
        if (opType == "newUser"){

            setInputs(initState.inputs)
            setErrors(initState.errors)
            
        }
        else{

            if (!data.selectedUser) return
            const { selectedUser } = { ...data }
            if (data.reports) {
                const User_Report = selectedUser.User_Report
                const filtred = data.reports.filter(u => u.Report_Code == User_Report)
                selectedUser.reportName = filtred[0].Report_Name
            }
            if (data.factBooks) {
                const User_Factbook = selectedUser.User_Factbook
                const filtred = data.factBooks.filter(u => u.Code_FactBook == User_Factbook)
                selectedUser.factbookName = filtred[0].Nom_FactBook
            }
            setInputs(selectedUser)
            setErrors(initState.noErrors)

        }


        
    },[isOpen])

    // useEffect(() => {
    //     if (!data.selectedUser) return
    //     const { selectedUser } = { ...data }
    //     if (data.reports) {
    //         const User_Report = selectedUser.User_Report
    //         const filtred = data.reports.filter(u => u.Report_Code == User_Report)
    //         selectedUser.reportName = filtred[0].Report_Name
    //     }
    //     if (data.factBooks) {
    //         const User_Factbook = selectedUser.User_Factbook
    //         const filtred = data.factBooks.filter(u => u.Code_FactBook == User_Factbook)
    //         selectedUser.factbookName = filtred[0].Nom_FactBook
    //     }

    //     setInputs(selectedUser)
    // }, [data.selectedUser])
    const handleReportSelection = (report) => {
        setInputs((prev) => {
            const _prev = { ...prev }
            _prev.report = report.Report_Code
            _prev.reportName = report.Report_Name
            return _prev
        })
        handleReportFactbookChange({ target: { value: report.Report_Code } }, "report")
    }
    const handleFactBookSelection = (factbook) => {
        setInputs((prev) => {
            const _prev = { ...prev }
            _prev.factbook = factbook.Code_FactBook
            _prev.factbookName = factbook.Nom_FactBook
            return _prev
        })
        handleReportFactbookChange({ target: { value: factbook.Code_FactBook } }, "factbook")
    }

    return (
        ready && text ? <><MDBModal size="lg" isOpen={isOpen} toggle={() => toggleChange(opType)} centered noValidate>
            <MDBModalHeader toggle={() => toggleChange(opType)} >{text.header}</MDBModalHeader>
            <MDBModalBody>
                <MDBRow>
                    <MDBCol size="12">
                        <Input1 id="User_Master_Name" name="User_Master_Name" text={text.name} handleChange={handleChange} inputsRef={inputsRef.current} errorsRef={errorsRef.current} required={true} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size="6">
                        <Input1 type="email" id="Email_User_Master" name="Email_User_Master" handleChange={handleChange} text={text.email} inputsRef={inputsRef.current} errorsRef={errorsRef.current} required={true} />
                    </MDBCol>
                    <MDBCol size="6">
                        <Input1 type={"password"} id={"Password"} name={"Password"} handleChange={handleChange} text={text.password} inputsRef={inputsRef.current} errorsRef={errorsRef.current} required={true} />
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol size="6">
                        <Input1 type={"tel"} id={"SMS_User_Master"} name={"SMS_User_Master"} handleChange={handleChange} text={text.sms} inputsRef={inputsRef.current} errorsRef={errorsRef.current} required={true} />
                    </MDBCol>
                    <MDBCol size="6">
                        {/* .map((el) => ({ value: el.Code,Code:el.Code, label: el.unite, level: el.level })) */}
                        <SelectList
                            selectedMember={data.selectedUser}
                            preSelect={{ by: "Code", list: getNested(data, "selectedUser", "BU_Master") }}
                            // listOptions={data.bu || []}
                            listOptions={(data.bu || []).map((el) => ({ value: el.Code, Code: el.Code, label: el.unite, level: el.level }))}
                            id={"BU_Master"}
                            name={"BU_Master"}
                            handleChange={handleChange}
                            text={text.buMaster}
                            inputsRef={inputsRef.current}
                            errorsRef={errorsRef.current}
                            required={true} />
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol size="6">
                        <div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                            <label htmlFor="Fonction_Master" className="grey-text" >
                                {text.func}
                            </label>
                            <input type="text" id="1" id="Fonction_Master" name="Fonction_Master" className="form-control" value={inputsRef.current.Fonction_Master} onChange={(e) => handleChange(e, "Fonction_Master")} required />
                        </div>

                    </MDBCol>
                    <MDBCol size="6">
                        <SelectList
                            selectedMember={data.selectedUser}
                            preSelect={{ by: "Code", list: getNested(data, "selectedUser", "userType") }}
                            listOptions={(data.userTypes || []).map((el) => ({ value: el, Code: el, label: el }))}
                            id={"userType"}
                            name={"userType"}
                            handleChange={handleChange}
                            text={text.userType}
                            inputsRef={inputsRef.current}
                            errorsRef={errorsRef.current}
                            required={true} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size="6" className="text-center">
                        <MDBBtn className='submit' color="#e0e0e0 grey lighten-2" onClick={(e) => handleAddEditReport(e, opType)} >{text.addEditReport}</MDBBtn>
                        <MDBInput rows="2" disabled type="textarea" value={inputs.reportName || ""} />
                        {errorsRef.current.report && errorsRef.current.report.length > 0 &&
                            <span className='text-danger userAlert' >{errorsRef.current.report}</span>}
                    </MDBCol>
                    <MDBCol size="6" className="text-center">
                        <MDBBtn className='submit' color="#e0e0e0 grey lighten-2" onClick={(e) => handleAddEditFactBook(e, opType)} >{text.addEditFactBook}</MDBBtn>
                        <MDBInput rows="2" disabled type="textarea" value={inputs.factbookName || ""} />
                        {errorsRef.current.factbook && errorsRef.current.factbook.length > 0 &&
                            <span className='text-danger userAlert' >{errorsRef.current.factbook}</span>}
                    </MDBCol>
                </MDBRow>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
                <MDBBtn className='submit' color="#e0e0e0 grey lighten-2" onClick={handleFinalClickOp}> <MDBIcon icon="plus" className="ml-1" type="submit" />{text.op}</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
            <ReportFactBookModal outSelectedReport={handleReportSelection} reports={data.reports} isOpen={openModal_AddEditReport} toggleChange={() => setOpenModal_AddEditReport(false)} opType={opType} />
            <ReportFactBookModal outSelectedFactbook={handleFactBookSelection} factbooks={data.factBooks} isOpen={openModal_AddEditFactBook} toggleChange={() => setOpenModal_AddEditFactBook(false)} opType={opType} />
        </> : <></>
    )
}

const SelectList = ({ selectedMember, preSelect = { by: "", list: [] }, fullWidth = true, name = null, id = null, listOptions = [], handleChange = () => { }, text = "", errorsRef = {} }) => {
    const [options, setOptions, refOptions] = useState2(() => null)
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (!selectedMember) return
        if (preSelect && preSelect.list) {
            const by = preSelect.by
            if (by) {
                const _preSelected = preSelect.list
                    .map(el => (refOptions.current || []).find(ell => ell[by] == el))
                    .filter(e => e)
                if (_preSelected.length)
                    setSelected(_preSelected)
            }
            else {
                setSelected(preSelect)
            }
        }
    }, [selectedMember, options])

    const [smallId] = useState(() => makeid(5))

    useEffect(() => {
        // const options = listOptions.map((el) => ({ value: el.Code,Code:el.Code, label: el.unite, level: el.level }))
        setOptions(listOptions)
        // setOptions(options)

    }, [])

    useEffect(() => {
        if (options && fullWidth === true) {
            const el = document.querySelector(`#X${smallId} button`)
            if (el)
                el.style.width = '100%'
        }
    }, [options])

    return (
        options ?
            <>
                <div id={`X${smallId}`} className="form-group" style={{ marginTop: 0.5 + 'em' }}>
                    <label htmlFor={id} className="grey-text" >
                        {text}
                    </label>
                    <ReactMultiSelectCheckboxes
                        id={id}
                        value={selected}
                        onChange={(e) => { setSelected(e); handleChange(e, id) }}
                        options={options}
                    />
                    {errorsRef[name] && errorsRef[name].length > 0 &&
                        <span className='text-danger userAlert' >{errorsRef[name]}</span>}
                </div>
            </>
            : <></>

    )
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const Input1 = ({ type = "text", id = null, name = "", required = false, handleChange = () => { }, text = "", errorsRef = {}, inputsRef = {} }) => {
    return (<div className="form-group" style={{ marginTop: 0.5 + 'em' }}>
        <label htmlFor={id} className="grey-text" >
            {text}
        </label>
        {type == "tel" ?
            <IntlTelInput
                name={name}
                defaultValue={inputsRef[name] || ""}
                id={id}
                preferredCountries={['tn', "fr"]}
                onPhoneNumberChange={(isValid, value, countryData) => {
                    const r=new RegExp(`^\\+${countryData.dialCode}`)
                    handleChange({ target: { value:value.replace(r,'')} }, name, countryData)
                }}
                required={required}
                containerClassName="intl-tel-input d-block"
                inputClassName="form-control"
            />
            :
            <input type={type} id={id} name={name} className="form-control" value={inputsRef[name] || ""} onChange={(e) => handleChange(e, name)} required={required} />
        }
        {errorsRef[name] && errorsRef[name].length > 0 &&
            <span className='text-danger userAlert' >{errorsRef[name]}</span>}
    </div>)
}

const Users = () => {
    const tabulatorRef = useRef()
    const history = useHistory()
    const [toggle, setToggle] = useState({ newUser: { open: false }, modUser: { open: false } })
    const [dataTabulator, setDataTabulator, refDataTabulator] = useState2(null)
    const [bu, setBu, refBu] = useState2([])
    const [tabulatorColumns, setTabulatorColumns, refTabulatorColumns] = useState2(null)
    const [userTypes, setUserTypes, refUserTypes] = useState2(null)
    // const [position, setPosition, refPosition] = useState2(0)
    const [selectedUser, setSelectedUser, selectedUserRef] = useState2(null)
    const [reports, setReports] = useState(null)
    const [factBooks, setFactBooks] = useState(null)
    const { mainStore } = useStores()

    const handleToggle = (e, op) => {
        e.preventDefault()
        setToggle((prev) => {
            const _prev = { ...prev }
            _prev[op].open = !_prev[op].open
            return _prev
        })
    }

    const handleToggleChange = (op, data) => {
        setToggle((prev) => {
            const _prev = { ...prev }
            _prev[op].open = !_prev[op].open
            return _prev
        })
        if (!data) return

        const formatedData = {
            BU_Master: data.bu,
            Email_User_Master: data.email,
            Fonction_Master: data.fonction,
            SMS_User_Master: data.tel,
            User_Factbook: data.factbook,
            User_Master_Code: data.userId || data.User_Master_Code,
            User_Master_Name: data.name,
            User_Report: data.report,
            userType: data.role,
        }
        switch (op) {
            case "newUser":
                tabulatorRef.current.table.addData([formatedData], false);
                break;
            case "modUser":
                if (data?.userType)
                    data.userType = data.userType.map(e => e&&e.value).filter(e=>e)
                tabulatorRef.current.table.updateData([data]);
                break;
            default:
                break;
        }
    }

    const todo = (e, cell, row) => {
        const _row = cell.getRow().getData()
        const isAdmin = _row.userType.includes("admin")
        cell.getRow().deselect()
        if (isAdmin === false)
            setSelectedUser(_row)
    }

    useEffect(() => {
        return axios.get(window.apiUrl + "admin/getUsers/")
            .then(
                ({ data }) => {
                    const users = data.users || []
                    const bu = data.bu || []
                    const reports = data.reports || []
                    const factBooks = data.factBooks || []
                    const columns = [
                        {
                            title: "",
                            field: "admin",
                            width: "3%",
                            formatter: (cell => {
                                const isAdmin = cell.getData().userType.includes("admin")
                                if (isAdmin === true)
                                    return '<i class="fab fa-autoprefixer"></i>'
                                return ""
                            }),
                            cellClick: todo
                        },
                        {
                            title: "Nom de l'utilisateur",
                            field: "User_Master_Name",
                            // width: "10%",
                            cellClick: todo
                        },

                        {
                            title: "Email",
                            field: "Email_User_Master",
                            // width: "10%",
                            cellClick: todo
                        },
                        {
                            title: "type utilisateur",
                            field: "userType",
                            // width: "10%",
                            cellClick: todo
                        },
                        {
                            title: "SMS",
                            field: "SMS_User_Master",
                            // width: "12%",
                            cellClick: todo
                        },
                        {
                            title: "Report",
                            field: "User_Report",
                            // width: "12%",
                            // cellClick: todo,
                            cssClass: "overflowVisible",

                            formatter: reactFormatter(<ShowTitle reports={reports} />),

                        },
                        {
                            title: "Factbook",
                            field: "User_Factbook",
                            cssClass: "overflowVisible",

                            // width: "12%",
                            cellClick: todo,
                            formatter: reactFormatter(<ShowTitle factBooks={factBooks} />),

                        },
                        {
                            title: "BU_Master",
                            field: "BU_Master",
                            formatter: reactFormatter(<ShowBu bu={bu} />),
                            cssClass: "overflowVisible",
                            // width: "12%",

                            cellClick: todo
                        },
                        {
                            title: "Fonction",
                            field: "Fonction_Master",
                            // width: "12%",
                            cellClick: todo
                        },
                        {
                            title: "Supprimer",
                            field: "supprimer",
                            // width: "5%",
                            hozAlign: "center",
                            formatter: (cell) => {

                                const isAdmin = cell.getData().userType.includes("admin")
                                if (isAdmin === false)
                                    return "<i class='fa fa-trash-alt icon'></i>";
                                return ""
                            },
                            cellClick: function (e, cell) {
                                const isAdmin = cell.getData().userType.includes("admin")
                                if (isAdmin === false) {
                                    return Swal.fire({
                                        title: 'Supprimer',
                                        text: "êtes-vous sûr de vouloir supprimer l'utilisateur",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        cancelButtonText: "annuler",
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'supprimer'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            const id = cell.getData().User_Master_Code
                                            return axios.delete(`${mainStore.apiPath}admin/deleteUser/`, { data: { userId: id } }).then((res) => {
                                                if (res.status == 200) {
                                                    cell.getRow().delete();
                                                    return Swal.fire(
                                                        'Supprimé!',
                                                        "l'utilisateur a été supprimé",
                                                        'success'
                                                    )
                                                }

                                            })
                                                .catch((res) => {
                                                    return Swal.fire(
                                                        'erreur !',
                                                        "une erreur est survenue lors de la suppression de l'utilisateur",
                                                        'failed'
                                                    )
                                                })
                                        }
                                    })
                                }
                            },
                            htmlOutput: true,
                        },

                    ]
                    const userTypes = data.userTypes || []
                    setUserTypes()
                    setDataTabulator(users)
                    setBu(bu)
                    setReports(reports)
                    setFactBooks(factBooks)
                    setUserTypes(userTypes)
                    setTabulatorColumns(columns)
                }
            )
            .catch((resp) => { })

    }, [])

    return (
        <>
            <Navbar history={history} />
            <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438', color: "#000", fontFamily: 'GOTHAM MEDIUM' }}>
                <MDBBreadcrumbItem>  Admin</MDBBreadcrumbItem>
                <MDBBreadcrumbItem > Utilisateurs</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <div style={{ margin: 30 }}>
                <MDBBtn color="#e0e0e0 grey lighten-2" onClick={(e) => handleToggle(e, "newUser")}>Nouveau</MDBBtn>

                <MDBBtn color="#e0e0e0 grey lighten-2" disabled={!selectedUser} onClick={(e) => handleToggle(e, "modUser")} id="btnmod"  >Modifier</MDBBtn>

                {/* <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={handleSave} > Enregistrer   <MDBIcon icon="paper-plane" className="ml-1" /></MDBBtn> */}

                <UserModal isOpen={toggle.newUser.open} opType={"newUser"} toggleChange={handleToggleChange} data={{ bu, userTypes, reports, factBooks }} />
                <UserModal isOpen={toggle.modUser.open} opType={"modUser"} toggleChange={handleToggleChange} data={{ bu, selectedUser, userTypes, reports, factBooks }} />
                {/* {tabulatorColumns.length && dataTabulator.length && <Tabulator/>} */}
                {tabulatorColumns && dataTabulator && <ReactTabulator
                    ref={tabulatorRef}
                    options={{
                        reactiveData: true, //enable data reactivity
                        addRowPos: "top",
                        pagination: "local",
                        paginationSize: 20,
                        // paginationSizeSelector: [3, 6, 8, 10],
                        printRowRange: "selected",
                        selectable: 1,
                        // rowClick:(e,row)=>{
                        //     console.log(row)
                        // },
                        index: "User_Master_Code",
                        selectablePersistence: true,
                        selectableCheck: (row) => {

                            return !row.getData().userType.includes("admin")

                        }
                        // selectablePersistence: refPosition.current,
                    }}
                    data={refDataTabulator.current}
                    columns={refTabulatorColumns.current}
                    layout={"fitData"}
                    id="tab"
                />}
            </div>
        </>
    );
}

export default Users;
