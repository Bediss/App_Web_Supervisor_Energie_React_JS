

import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useMemo, useRef ,useCallback} from "react"
import axios from "axios"

import FilterV1 from './filterV1';

const SetObjective = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.post(window.apiUrl+"api/filter/", {
            "tablename": "AllCompteur",
            "identifier": "12-10-2021-04-28-37-370000-a8a70b-a0-cd88-ab64-ddbfb7ade86",
            "fields": "*",
            "content": "*",
            "dataselect": "Code_Compteur;Le_Compteur;Le_Compteur_Parent;type;Point_de_Production;Point_de_Distribution;Point_de_Consommation;Energie",
            "dist": "*",
            "orderby": "*"
        }).then(({ data }) => {
            if (!Array.isArray(data)) throw "counter list error"
            setData(null)
            setTimeout(() => {
                setData(data)
            })
        }, 100);

    }, [])
    const outSelected = (s) => {
        console.log("selected",s)
    }

    const outAllFiltred = (a) => {
        console.log("all",a)
    }

    return (data ? <MDBContainer>
        <FilterV1 filterName={"aaaaaaaaaaa"}
            outSelected={outSelected}
            outAllFiltred={outAllFiltred}
            filter={[{ Le_Compteur: "aaaaa" },"Code_Compteur","Energie"]}
            display={{ separator: " - ", elems: ["Code_Compteur", "Le_Compteur"] }}
            data={data} />
    </MDBContainer> : null);
}




export default SetObjective;