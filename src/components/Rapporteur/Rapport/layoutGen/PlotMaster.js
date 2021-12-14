const PlotScatter = (widthObj,heightObj) => {
  console.log("widthObj2",widthObj*7)
    console.log("heightObj2",heightObj)
    var heightObjUpdate
    if (heightObj<300){
      heightObjUpdate=heightObj-5
    }
    if (heightObj>300){
      heightObjUpdate=heightObj-50
    }
    console.log("heightObj2",heightObj)
    return ({
      data: [
        {
          x: [2,5,6],
          y: [1,3,8],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        {
          x: [2,5,6],
          y: [1,9,14],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
        },
        {
          x: [2,5,6],
          y: [1,8,10],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#000' },
        },
      ],
      layout: { width:widthObj*6, height:heightObjUpdate , title: '' }
    }
    )
  }
  const PlotBar = (widthObj,heightObj) => {
    console.log("widthObj2",widthObj*7)
    console.log("heightObj2",heightObj)
    var heightObjUpdate
    if (heightObj<300){
      heightObjUpdate=heightObj-5
    }
    if (heightObj>300){
      heightObjUpdate=heightObj-50
    }
    console.log("heightObj2",heightObj)
    return ({
      data: [
        {
          type: 'bar', 
          x: [1, 2, 3,4,5,6], 
          y: [1,8,3,4,9,6],
          color:"green"
         
        },
       
      ],
      layout: { width:widthObj*6, height:heightObjUpdate, title: '' }
    }
    )
  }
  module.exports={PlotScatter,PlotBar}

