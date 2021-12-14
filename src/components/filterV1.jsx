
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef, useCallback } from "react"
import "./filterV1.css"
export const isJson = (obj) => (Array.isArray(obj) == false && typeof obj == "object")
const FilterV1 = ({ Button = null, style = {}, styleScroll = {}, className = "", filterName = "", filter = [], display = { separator: " ", elems: [] }, data = [], outAllFiltred = () => { }, outSelected = () => { } }) => {
    const scrollContainerStyle = Object.keys(styleScroll).length ? styleScroll : { width: "250px", maxHeight: "410px" };

    const [_filter, _setFilter] = useState(null)
    const [ids, setIds] = useState(null)
    const [filterConds, setFilterConds] = useState({})
    const [filtredData, setFiltredData] = useState(data)
    const [filtredSearchedData, setFiltredSearchedData] = useState(filtredData)
    const [inputs, setInputs] = useState({})
    const [searchStr, setSearchStr] = useState("")
    const searchInputRef = useRef(null)
    const [mDBListGroupItemSelected, setMDBListGroupItemSelected] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        try {
            // const filterPrep = !filter.length ? Object.keys(data[0]).map((el) => {
            //     const elem = { [el]: isJson(el)?el:{name:el,fixed:false} }
            //     return elem
            // }
            // ) : filter

            const filterPrep = !filter.length ? Object.keys(data[0]).map((el) => {
                const elem = { [el]: isJson(el) ? el : { name: el, fixed: false } }
                return elem
            }
            ) : Object.keys(filter).map((el) => {
                const elName = Object.keys(filter[el]).shift()
                const elData = filter[el]
                return isJson(elData) && isJson(elData[elName]) ? elData : { [elName]: { name: elData[elName], fixed: false } }
            })
            _setFilter(filterPrep)
            const ids = filterPrep.map((fp, i) => `${makeid(10)}_${i}`)
            ids.unshift(makeid(10))
            setIds(ids)
            outAllFiltred(data)
            setFiltredData(data)
            setReady(true)
        }
        catch (err) {
            console.log(err)
            setReady(false)
        }

    }, [])

    const resetvalueoffilter = () => {
        setInputs((prev) => {
            const p = { ...prev }
            Object.keys(p).map((key) => {
                p[key] = ""
            })
            return p
        })
        setFilterConds({})
        setSearchStr("")
    }
    const filterBy = (e, key, id,fixed) => {
        const value = e.target.value
        if (typeof value == "undefined")
            return

        setInputs((prev) => {
            const p = { ...prev }
            p[id] = value
            return p
        })
        setSearchStr("")

        setFilterConds((prevState) => {
            const s = { ...prevState }
            if (value == "")
                delete s[key]
            else
                s[key] = value
            return s
        })
    }

    useEffect(() => {
        setMDBListGroupItemSelected(null)
        // const fixedElems=_filter.filter(e=>e[Object.keys(e).pop()].fixed)
        if (_filter){
            const fixedElems=_filter.filter(e=>e[Object.keys(e).pop()].fixed)
            fixedElems.map((e)=>{
                const name=Object.keys(e).pop()              
                data=data.filter((v,i,a)=>{
                    return v[name]==e[name].value
                })
            })
        }
        const _filtredData = data.filter((v, i, a) => {
            let result = true
            Object.keys(filterConds).map((key, ii, aa) => {
                const value = filterConds[key].toLowerCase()
                if (!v[key])
                    result = false
                else
                    if (v[key].toLowerCase().indexOf(value) == -1) result = false

            })
            return result
        })
        const filtredData = _filtredData

        const filtredSearchedData = filtredData.filter((v, i, a) => {
            let result = false
            // const quoteReg=searchStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/"(.*?)"/gi).map((e)=>`"${e.replace(/"/gi,"").trim()}"`)
            let workStr = searchStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

            let quoteReg = workStr.match(/"(.*?)"/gi)
            quoteReg = quoteReg ? quoteReg : ""
            let reg = workStr
            if (quoteReg) {
                quoteReg.map((e) => reg = reg.replace(new RegExp(e), ""))
                quoteReg = quoteReg.map((e) => `${e.replace(/"/gi, "").trim()}`).map(e => `(\\b${e}\\b)`).join("|")
            }

            reg = reg.split(" ").filter(e => e.trim().length).map((el) => `(${el})`).join("|")
            const allReg = [quoteReg, reg].filter(e => e).join("|")

            display.elems.filter(e => v[e])
                .map((d) => {
                    if (allReg) {
                        const re = new RegExp(allReg, "gi");
                        return new Set(v[d].toLowerCase()
                            //.replace(/ /g, "")
                            .match(re)).size == searchStr.split(" ").filter(e => e.trim()).length
                    }
                    return true

                })
                .map((d) => {
                    if (d === true)
                        result = true
                })
            return result
        })
        outAllFiltred(filtredSearchedData)
        setFiltredData(filtredData)
        setFiltredSearchedData(filtredSearchedData)
    }, [filterConds, searchStr,_filter])

    function makeid(length) {
        var result = 'x';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const handleMDBListGroupItemClick = (e, d, i) => {
        e.preventDefault();
        outSelected(d);
        setMDBListGroupItemSelected(i)
    }

    return (ready && _filter && ids ?
        <MDBRow style={style} className={className}>

            <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
                <label htmlFor="defaultFormLoginEmailEx7" >{`Filter ${filterName}:`}</label>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => resetvalueoffilter()}>
                    <MDBIcon size='lg' icon="sync-alt" />
                </MDBBtn>
                <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>
                    {
                        _filter.map((f, i) => {
                            // console.log("f",f)

                            const key = typeof f == "object" ? Object.keys(f)[0] : f
                            const label = typeof f == "object" ? f[key].name : f
                            const fixed = typeof f == "object" ? f[key].fixed : false
                            const value = typeof f == "object" ? f[key].value : null
                            const id = ids[i + 1]

                            return <React.Fragment key={i} >
                                <MDBInput
                                    id={`${id}__input`}
                                    label={label}
                                    autoComplete="off"
                                    list={`${id}`} style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
                                    value={fixed ? value : inputs[`${id}__input`]}
                                    disabled={fixed}
                                    
                                    onChange={(e) => filterBy(e, key, `${id}__input`,fixed)}
                                />
                                {/* {[...new Map(filtredData.map(item => [item[key], item])).values()].map((e, i) => <option  key={i} value={e[key]}></option>)} */}
                                <datalist id={`${id}`} >
                                    {Array.from(new Set(filtredData.map((e) => e[key]))).map((e, i) => <option key={i} value={e}></option>)}
                                </datalist>
                            </React.Fragment>
                        })
                    }
                </MDBCol>

            </MDBCol>
            <MDBCol className='p-0'>
                <MDBCol style={{ marginLeft: "1%" }}>

                    <div className="d-flex justify-content-between " style={{ marginLeft: "0%" }} >
                        <p className=" m-0 p-0">{`Liste ${filterName} :`}</p>
                        <input ref={searchInputRef}
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                            type="text" id={`${ids[0]}__input`} autoComplete="off" placeholder="Recherche..." className="form-control float-right " style={{ width: "60%" }} />
                    </div>
                    <MDBContainer style={{ padding: 0 + 'em',marginTop:"-35px" }}>
                        <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary mt-5 mx-auto" style={scrollContainerStyle}>
                            {

                                filtredSearchedData.map((d, i) => {
                                    const displayName = (display.elems || []).map((dd) => d[dd]).join(display.separator || " ")
                                    return <MDBListGroupItem active={mDBListGroupItemSelected == i ? true : false} className={`pointer`} hover key={i} name={displayName} value={displayName} style={{ padding: 0.5 + 'em' }} id={displayName} hover
                                        onClick={(e) => handleMDBListGroupItemClick(e, d, i)}
                                    ><DisplayItem displayName={displayName} Button={Button} /></MDBListGroupItem>
                                })
                            }
                        </MDBListGroup>
                    </MDBContainer>
                </MDBCol>
            </MDBCol>
        </MDBRow>
        : null)
}

const DisplayItem = ({ displayName, Button = null }) => {
    return (
        <div className="filterdisplay">
            <div style={Button ? { width: "90%" } : {}} >{displayName}</div>
            {Button && <Button />}
        </div>);
}



export default FilterV1