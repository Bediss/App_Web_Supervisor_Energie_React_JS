import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import axios from 'axios';

const MultiSelectAll = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [listaccessselect, setListaccessselect] = useState([]);
  const [options, setoptions] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  ////console.log(selectedOptions)

  if(selectedOptions.length !== 0) {
    var listselect=[]
    var listinitial=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    //console.log(selectedOptions[0].value)
    for (var key in selectedOptions) {
      //console.log('key'+key)
      var obj = selectedOptions[key];
      //console.log(obj.value)
      listselect.push(obj.value)
      listinitial[14-obj.value] = 1
      //console.log(listselect)
      //console.log(listinitial[14-obj.value])
      //console.log(listinitial)
      var  x = listinitial.join("");
      var accessgroupvalue= parseInt(x, 2);
      //console.log('digit'+accessgroupvalue);
      localStorage.setItem("acesscode", accessgroupvalue);
        // ...
    }

  
 }

  useEffect(() => {
    /* for (var i = 0; i < listaccess.length; i++) {
      var labelval = optionss[i];
      print(labelval)
      //const options = [{ label: labelval, value: 1 }] 
  } */
    var binary = '110000000000000'
    var digit = parseInt(binary, 2);
    //console.log(digit)
    axios.get(window.apiUrl+"getlistaccess/")
      .then(res => {
        // const persons = res.data;
        //console.log(res.data);
        //console.log(res.data.length)
        //setoptions(res.data)
        //console.log(Object.keys(res.data)[0])
       
        setoptions([  { label: res.data[0], value: Object.keys(res.data)[0] },
                      { label: res.data[1], value: Object.keys(res.data)[1] },
                      { label: res.data[2], value: Object.keys(res.data)[2] },
                      { label: res.data[3], value: Object.keys(res.data)[3] },
                      { label: res.data[4], value: Object.keys(res.data)[4] },
                      { label: res.data[5], value: Object.keys(res.data)[5] },
                      { label: res.data[6], value: Object.keys(res.data)[6] },
                      { label: res.data[7], value: Object.keys(res.data)[7] },
                      { label: res.data[8], value: Object.keys(res.data)[8] },
                      { label: res.data[9], value: Object.keys(res.data)[9] },
                      { label: res.data[10], value: Object.keys(res.data)[10] },
                      { label: res.data[11], value: Object.keys(res.data)[11] },
                      { label: res.data[12], value: Object.keys(res.data)[12] },
                      { label: res.data[13], value: Object.keys(res.data)[13] },
                      //{ label: res.data[14], value: Object.keys(res.data)[14] },
                    ]) 

        
        //console.log(res.data)
        //looplistaccess();
        //this.setState({ persons });
      })




    //setSelectedOptions([{ label: "Tous les Groupes", value: "*" }, ...options]);
    
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: Tous les Groupes`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} sélectionné`;
    }
  } 
  //${accessgroupvalue} 
  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }
  function onClose(){
    //console.log('closed'+selectedOptions)
  }
  
  
  return (
    <div>
      
      <ReactMultiSelectCheckboxes
      options={[{ label: "Tous les Groupes", value: "*" }, ...options]}
      placeholderButtonLabel="Access Group"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      name="Access_Groupe_User"
      //onClose={onClose}
      //rightAligned={true}
    />
    </div>
    
    
    
  );
};

export default MultiSelectAll;