import React, { useState, useEffect } from "react";
// import Plotly from "plotly.js";
// import Plotly from 'plotly.js-dist'
import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import "./layoutGenerator.css";
import uuid from "react-uuid";
// import "./bWLwgP.css"
import PlotHandler from "./MasterObjet";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";

//import ReactToPdf from "react-to-pdf"
const Plot = createPlotlyComponent(Plotly);
const { getNested,mergeDeep } = require("./extra");
// const Plot = createPlotlyComponent(Plotly);
import {
  queryPatcher,
  refreshQueryPatcher,
  selectionPatcher,
  pageHandler,
  dateReducer,
  dataMappingGenerator,
  temporaryDataFixer,
} from "./jsonPatcher";

const safe = true
const tempFixer = true
const GenerateTable = ({
  dummy=false,
  handleObjectjson,
  editor,
  config,
  maxRows,
  maxCols,
  style,
  className,
  Tl_Var_Fix,
  Ml_Var_Fix,
  Cl_Var_Fix,
  QueryApi,
}) => {

  const [styles, setStyles] = useState(style);
  const [ready, setReady] = useState(false);
  const [rc, setRc] = useState(null);
  const [spanList, setSpanList] = useState({});
  const [failed, setFailed] = useState(false)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [resetDisabled, setResetDisabled] = useState(true)
  const [validateDisabled, setValidateDisabled] = useState(true)
  const [doneEditing, setDoneEditing] = useState(false);
  const [rowColObjets, setRowColObjets] = useState({})
  const [spansOutput, setSpansOutput] = useState([]);
  useEffect(() => {
    if (!style) return
    setStyles(style)
  }, [style])
  useEffect(() => {
    if (!doneEditing) return;

  }, [doneEditing])
  useEffect(() => {
    const v = document.querySelector("#validate")
    if (!failed) {
      if (v) v.innerHTML = "validate"
      return
    } else {
      if (v) v.innerHTML = "reset"
      const tds = document.querySelectorAll("#generatedPlots td");
      tds.forEach((elem, i) => {
        const input = elem.querySelector("input")
        input.checked = false
        input.disabled = true
      });
      (document.querySelector("#save") || {}).disabled = true
    }
  }, [failed])

  const handleInputChange = () => {
    const elems = document.querySelectorAll(`#generatedPlots input:checked`)
    setValidateDisabled(!elems.length ? true : false)
  }

  const handleResetClick = () => {
    setResetDisabled(true)
    setSaveDisabled(true)
    const tds = document.querySelectorAll(`${className ? `.${className}` : ""} td`)
    if (!tds) return
    tds.forEach((elem, i) => {
      elem.style.display = ""
      elem.style.height = "inherit"
      elem.style.width = `${parseFloat(styles.width) / rc.maxCols}${styles.width.indexOf("%") != -1 ? "%" : "px"}`
      elem.setAttribute("colSpan", 1)
      elem.setAttribute("rowSpan", 1)
      elem.querySelector("input").style.display = ""
      elem.style.boxShadow = "";
      elem.querySelector("input").disabled = false
      elem.removeAttribute("done")
    });

    setFailed(false)

  }

  const handleValidateClick = () => {

    const checked = [];
    const checkedCoors = [];
    const allSelectedCells = [];
    document
      .querySelectorAll(`${className ? `.${className}` : ""} td`)
      .forEach((value, i) => {
        if (value.querySelector("input:checked")) {
          checked.push(value);
          const row = value.id
            ? Number(value.id.split("_")[1].split("--")[0])
            : null;
          const col = value.id
            ? Number(value.id.split("_").reverse()[0])
            : null;
          checkedCoors.push({ row, col });
        }
      });
    setValidateDisabled(true)
    setResetDisabled(false)
    if (!checked.length || !checkedCoors.length) return;

    const smallestCell = {
      row: checkedCoors[0].row,
      col: Math.min(...checkedCoors.map((value, i) => value.col)),
      id: `r_${checkedCoors[0].row}--c_${Math.min(
        ...checkedCoors.map((value, i) => value.col)
      )}`,
    };
    const bigestCell = {
      row: checkedCoors.slice(-1)[0].row,
      col: Math.max(...checkedCoors.map((value, i) => value.col)),
      id: `r_${checkedCoors.slice(-1)[0].row}--c_${Math.max(
        ...checkedCoors.map((value, i) => value.col)
      )}`,
    };
    for (let r = smallestCell.row; r <= bigestCell.row; r++) {
      for (let c = smallestCell.col; c <= bigestCell.col; c++) {
        allSelectedCells.push({ row: r, col: c });
      }
    }

    let distinctsRows = allSelectedCells.map((value, i) => {
      return value.row;
    });
    distinctsRows = [...new Set(distinctsRows)];

    let distinctsCols = allSelectedCells.map((value, i) => {
      return value.col;
    });
    distinctsCols = [...new Set(distinctsCols)];

    const todo = document.querySelector(`#${smallestCell.id}`);
    if (todo) {
      if ((todo.colSpan != "1" && todo.rowSpan != "1") || todo.style.display == "none") { setFailed(true); return }
      todo.setAttribute("rowSpan", distinctsRows.length);
      todo.setAttribute("colSpan", distinctsCols.length);
      todo.setAttribute("done", true)
      setSaveDisabled(false)
    }

    Array(allSelectedCells.length)
      .fill("")
      .map((value, i) => {
        const id = `#r_${allSelectedCells[i].row}--c_${allSelectedCells[i].col}`;
        const checked = document.querySelector(`${id} input`);
        if (checked) checked.checked = false;
        const input = document.querySelector(`${id} input`);
        if (input) input.style.display = "none";
        const elem = document.querySelector(`${id}`);
        elem.style.width = `${(parseFloat(styles.width) / rc.maxCols) * distinctsCols.length}${styles.width.indexOf("%") != -1 ? "%" : "px"}`;
        elem.style.height = `${(parseFloat(styles.height) / rc.maxCols) * distinctsRows.length}${styles.height.indexOf("%") != -1 ? "%" : "px"}`;
        elem.style.boxShadow = `0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)`;
        const temp = document.querySelector(id);
        if (i != 0) {

          if (temp && ((temp.colSpan == 1 && temp.rowSpan == 1) && temp.style.display != "none")) {
            temp.style.display = "none";
            temp.style.boxShadow = "";
            // temp.remove()
          }
          else {
            setFailed(true)
          }
        }
      });
  };

  const handleSaveClick = () => {
    const tds = document.querySelectorAll("#generatedPlots td")
    const output = {}
    setValidateDisabled(true)
    setResetDisabled(true)
    tds.forEach((elem, i) => {
      if (elem.getAttribute("done")) {
        output[elem.id] = {
          col: parseInt(elem.id.split("--")[1].split("_")[1]),
          row: parseInt(elem.id.split("--")[0].split("_")[1]),
          colSpan: parseInt(elem.colSpan),
          rowSpan: parseInt(elem.rowSpan),
          ////asma changement
          width: elem.style.width,

          height: elem.style.height

        }
      }

    })

    setDoneEditing(true)
    setRowColObjets(output)
    setSpansOutput(output)
  }

  useEffect(() => {

    let ready = true;
    if (config) {
      maxRows = config.configLayout.Masterlayout_row;
      maxCols = config.configLayout.Masterlayout_col;
    }
    if (typeof maxRows == "string" && !isNaN(maxRows))
      maxRows = parseInt(maxRows);
    if (typeof maxCols == "string" && !isNaN(maxCols))
      maxCols = parseInt(maxCols);
    if (!maxCols || !maxRows) {
      ready = false;
    }

    setRc({ maxCols, maxRows });
    if (!style && config) {
      if (typeof config.configLayout.LayoutWidth == "string" && config.configLayout.LayoutWidth.indexOf("%") == -1)
        config.configLayout.LayoutWidth = parseFloat(config.configLayout.LayoutWidth);
      if (typeof config.configLayout.LayoutHeight == "string" && config.configLayout.LayoutHeight.indexOf("%") == -1)
        config.configLayout.LayoutHeight = parseFloat(config.configLayout.LayoutHeight);

      setStyles({
        width: config.configLayout.LayoutWidth,
        height: config.configLayout.LayoutHeight,
      });
    } else setStyles(style);

    setReady(ready);

    if (!config || editor) return;
    config.objects.map((obj, i) => {
      const allSelectedCells = [];

      const smallestCell = {
        row: parseInt(obj.row),
        col: parseInt(obj.col),
        id: `r_${obj.row}--c_${obj.col}`,
      };
      const bigestCell = {
        row: parseInt(obj.row) - 1 + parseInt(obj.spanRow),
        col: parseInt(obj.col) - 1 + parseInt(obj.spanCol),
        id: `r_${parseInt(obj.row) - 1 + parseInt(obj.spanRow)}--c_${parseInt(obj.col) - 1 + parseInt(obj.spanCol)
          }`,
      };

      for (let r = smallestCell.row; r <= bigestCell.row; r++) {
        for (let c = smallestCell.col; c <= bigestCell.col; c++) {
          allSelectedCells.push({ row: r, col: c });
        }
      }

      let distinctsRows = [...new Set(allSelectedCells.map((value, i) => value.row))];
      let distinctsCols = [...new Set(allSelectedCells.map((value, i) => value.col))];

      setSpanList((prev) => {
        prev[smallestCell.id] = {
          plot: true,
          rowSpan: distinctsRows.length,
          colSpan: distinctsCols.length,
          obj,
          // spec: config.configLayout.Masterlayout_specs[i]
        };
        return prev;

      });
      Array(allSelectedCells.length)
        .fill("")
        .map((value, i) => {
          const id = `r_${allSelectedCells[i].row}--c_${allSelectedCells[i].col}`;
          if (smallestCell.id != id)
            setSpanList((prev) => {
              prev[id] = { remove: true, width: "auto" };
              return prev;
            });
        });
    });

  }, []);
  //const ref = React.createRef();
  
  return (
    ready &&
    (
      <>
   {/* {!editor && <div>
          <ReactToPdf targetRef={ref} filename="div-blue.pdf">
            {({ toPdf }) => (
              <button onClick={toPdf}>Generate pdf</button>
            )}
          </ReactToPdf>

        </div>} */}
        <table /* ref={ref} */id={"generatedPlots"} style={{ tableLayout: "fixed", margin: "auto", ...styles, textAlign: "center" }} className={className}>
          <tbody>
            {Array(rc.maxRows)
              .fill("")
              .map((row, i) => {
                return (
                  <tr
                    style={{
                      padding: 0,
                      height: `${parseFloat(styles.height) / rc.maxRows}${typeof styles.height == "string" &&
                        styles.height.indexOf("%") != -1
                        ? "%"
                        : "px"
                        }`,
                      width: "100%",
                    }}
                    key={i}
                  >
                    {Array(rc.maxCols)
                      .fill("")
                      .map((col, j) => {
                        return (
                          <td
                            style={{
                              padding: 0,
                              height: `${spanList[`r_${i + 1}--c_${j + 1}`] &&
                                spanList[`r_${i + 1}--c_${j + 1}`].plot ?
                                `${spanList[`r_${i + 1}--c_${j + 1}`].rowSpan * (parseFloat(styles.height) / rc.maxRows)}${styles.height.indexOf("%") != -1 ? "%" : "px"}` :
                                "inherit"
                                }`,
                              display: `${spanList[`r_${i + 1}--c_${j + 1}`] &&
                                spanList[`r_${i + 1}--c_${j + 1}`].remove
                                ? "none"
                                : "table-cell"
                                }`,
                              width: `${spanList[`r_${i + 1}--c_${j + 1}`] &&
                                spanList[`r_${i + 1}--c_${j + 1}`].plot
                                ? `${spanList[`r_${i + 1}--c_${j + 1}`].colSpan * (parseFloat(styles.width) / rc.maxCols)}${styles.width.indexOf("%") != -1 ? "%" : "px"}` : `${parseFloat(styles.width) / rc.maxCols}${styles.width.indexOf("%") != -1 ? "%" : "px"}`
                                }`
                            }
                            }
                            key={`${i}-${j}`}
                            id={`r_${i + 1}--c_${j + 1}`}

                            rowSpan={
                              spanList[`r_${i + 1}--c_${j + 1}`]
                                ? spanList[`r_${i + 1}--c_${j + 1}`].rowSpan
                                : "1"
                            }
                            colSpan={
                              spanList[`r_${i + 1}--c_${j + 1}`]
                                ? spanList[`r_${i + 1}--c_${j + 1}`].colSpan
                                : "1"
                            }
                          >
                            {editor ? (
                              <SingleCellMenu handleObjectjson={handleObjectjson}
                                Tl_Var_Fix={Tl_Var_Fix}
                                Ml_Var_Fix={Ml_Var_Fix}
                                Cl_Var_Fix={Cl_Var_Fix}

                                rowColObjet={rowColObjets[`r_${i + 1}--c_${j + 1}`]} rc={rc} id={`r_${i + 1}--c_${j + 1}`} componentData={spanList[`r_${i + 1}--c_${j + 1}`]} QueryApi={QueryApi} handleInputChange={handleInputChange} doneEditing={doneEditing} />
                            ) : spanList[`r_${i + 1}--c_${j + 1}`] &&
                              spanList[`r_${i + 1}--c_${j + 1}`].plot ? (
                              <DrawPlot
                                dummy={dummy}
                                id={`r_${i + 1}--c_${j + 1}`}
                                height={`${spanList[`r_${i + 1}--c_${j + 1}`] &&
                                  spanList[`r_${i + 1}--c_${j + 1}`].plot ?
                                  `${spanList[`r_${i + 1}--c_${j + 1}`].rowSpan * (parseFloat(styles.height) / rc.maxRows)}${styles.height.indexOf("%") != -1 ? "%" : "px"}` :
                                  null
                                  }`}

                                width={`${spanList[`r_${i + 1}--c_${j + 1}`] &&
                                  spanList[`r_${i + 1}--c_${j + 1}`].plot
                                  ? `${spanList[`r_${i + 1}--c_${j + 1}`].colSpan * (parseFloat(styles.width) / rc.maxCols)}${styles.width.indexOf("%") != -1 ? "%" : "px"}` : `${parseFloat(styles.width) / rc.maxCols}${styles.width.indexOf("%") != -1 ? "%" : "px"}`
                                  }`}

                                componentData={spanList[`r_${i + 1}--c_${j + 1}`]}
                                styles={styles}
                                rc={rc}
                              />
                            ) : (
                              <></>
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br /> 
        {editor && (
          <>
          <MDBRow style={{marginLeft:"-3%"}}>
            <MDBCol size="4">
            <MDBBtn
              disabled={resetDisabled}
              id="reset"
              color="#bdbdbd grey lighten-1"
             style={{ width: "100%"}}
              onClick={handleResetClick}
            >
              Réinitialiser
            </MDBBtn>
            
            </MDBCol>
            <MDBCol size="4">
            <MDBBtn
              id={"validate"}
              disabled={validateDisabled}
              color="#e0e0e0 grey lighten-2"
             style={{ width: "100%" }}
              onClick={handleValidateClick}
            >
              Valider
            </MDBBtn>
            
            </MDBCol>
            <MDBCol size="4">
            <MDBBtn
              disabled={saveDisabled}
              id={"save"}
             style={{ width: "100%" }}
              onClick={handleSaveClick}
            >
              sauvegarder
            </MDBBtn>
            </MDBCol>
            </MDBRow>
          </>
        )}
      </>
    )
  );
};
/////////////////////////////////////////////

export const DrawPlot = ({
  id,
  updateData = false,
  componentData,
  rc,
  height,
  width,
  dummy=false
}) => {

  if (pageExist) {
    height = `${parseFloat(height) - 38}px`
  }
  const [selectedPage, setSelectedPage] = useState(() => getNested(componentData, "obj", "MasterObj_Data_selection", "MasterObjPage", "selectedMember"))


  //todo
  const [fatalError, setFatalError] = useState(false);
  const [data, setData] = useState(undefined);
  const [ready, setReady] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [layout, setLayout] = useState(null);

  const [pages, setPages] = useState(null);
  const [pageExist, setPageExist] = useState(false);

  const [plotHeight, setPlotHeight] = useState(parseFloat(height));

  const [haveTitle, setHaveTitle] = useState(false);

  const [legendPos, setLegendPos] = useState(null);


  // todo
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);


  const [divId, setDivId] = useState(() =>
    `A${uuid()}--${Date.now()}`.replaceAll("-", "_")
  );
  const [isPageTL, setIsPageTL] = useState(false);

  const generateRandomData = (api, query) => {

    const getRandomNumberBetween=(min, max)=>Math.floor(Math.random() * (max - min + 1) + min);
   
    const cl = query.cross_tab == "cross_tab_cl"
    const ml = query.cross_tab == "cross_tab_ml"

    let output=[]
    if (api == "cluster") {
      if (ml){
        query.cl.map((cl, i) => {
          const _ml = {}
          _ml.Le_Compteur=cl.Le_Compteur
          query.ml.map((ml, j) => {
            _ml[ml.m_name] = getRandomNumberBetween(0, 10000)
          })
          output.push(_ml)
        })
      }else{
        query.ml.map((cl, i) => {
          const _cl = {}
          _cl.m_name=cl.m_name
          query.cl.map((cl, j) => {
            _cl[cl.Le_Compteur] = getRandomNumberBetween(0, 10000)
          })
          output.push(_cl)
        })
      }
     
    } else {
    //   {
    //     "date": "2019-12-19T00:00:00",
    //     "Collecteur_COP_Vapeur": {
    //         "Ratio": null,
    //         "Tonne": null
    //     }
    // }
      if (ml) {
        query.cl.map((cl, i) => {
          for (let ii = 0; ii < 64; ii++) {
            const _ml = {}
            _ml.date=new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
            _ml[cl.Le_Compteur]={}
            query.ml.map((ml, j) => {
              _ml[cl.Le_Compteur][ml.m_name] = getRandomNumberBetween(0, 10000)
            })
            output.push(_ml)
          }
        })
      }
      else{
        query.ml.map((ml, i) => {
          for (let ii = 0; ii < 64; ii++) {
            const _cl = {}
           
            _cl.date=new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
            _cl[ml.m_name]={}
            query.cl.map((cl, j) => {
              _cl[ml.m_name][cl.Le_Compteur] = getRandomNumberBetween(0, 10000)
            })
            output.push(_cl)
            
          }
        })
      }
      output=output.sort((a,b)=>a.date-b.date)
    }
    return output
  }

  const fontSizeCalc = (object) => {
    // const screenWidth = window.screen.availWidth;
    // const plotRatioFromScreen = width / screenWidth;

    const titlePercentage = 0.2;
    const unitsPercentage = 0.1;
    const plotWidthFromScreen = parseFloat(width);
    const minFontSize = 10;
    const maxFontSize = 16;
    const _titleFontSize = plotWidthFromScreen * titlePercentage;
    const _unitsFontSize = plotWidthFromScreen * unitsPercentage;
    const titleFontSize =
      _titleFontSize < minFontSize
        ? minFontSize
        : _titleFontSize > maxFontSize
          ? maxFontSize
          : _titleFontSize;
    const unitsFontSize =
      _unitsFontSize < minFontSize
        ? minFontSize
        : _unitsFontSize > maxFontSize
          ? maxFontSize
          : _unitsFontSize;

    if (
      object.MasterObj_Data_Mapping.xaxis &&
      getNested(object.MasterObj_Data_Mapping.xaxis, "title", "font", "size")
    )
      object.MasterObj_Data_Mapping.xaxis.title.font.size = titleFontSize;

    if (
      object.MasterObj_Data_Mapping.yaxis1 &&
      getNested(object.MasterObj_Data_Mapping.yaxis1, "title", "font", "size")
    )
      object.MasterObj_Data_Mapping.yaxis1.title.font.size = titleFontSize;

    if (
      object.MasterObj_Data_Mapping.yaxis2 &&
      getNested(object.MasterObj_Data_Mapping.yaxis2, "title", "font", "size")
    )
      object.MasterObj_Data_Mapping.yaxis2.title.font.size = titleFontSize;

    if (object.MasterObj_Data_Mapping.title)
      object.MasterObj_Data_Mapping.title.title.font.size = titleFontSize;

    // xy ticks

    if (
      object.MasterObj_Data_Mapping.xaxis &&
      getNested(object.MasterObj_Data_Mapping.yaxis2, "tickfont", "size")
    )
      object.MasterObj_Data_Mapping.xaxis.tickfont.size = unitsFontSize;

    if (
      object.MasterObj_Data_Mapping.yaxis1 &&
      getNested(object.MasterObj_Data_Mapping.yaxis2, "tickfont", "size")
    )
      object.MasterObj_Data_Mapping.yaxis1.tickfont.size = unitsFontSize;

    if (
      object.MasterObj_Data_Mapping.yaxis2 &&
      getNested(object.MasterObj_Data_Mapping.xaxis, "tickfont", "size")
    )
      object.MasterObj_Data_Mapping.yaxis2.tickfont.size = unitsFontSize;

    //legend
    if (
      object.MasterObj_Data_Mapping.legend &&
      getNested(
        object.MasterObj_Data_Mapping.xaxis,
        "legend",
        "legend",
        "font",
        "size"
      )
    )
      object.MasterObj_Data_Mapping.legend.legend.font.size = unitsFontSize;

    // object.MasterObj_Data_Mapping.legend.legend.itemwidth = plotWidthFromScreen * unitsPercentage;

    return object;
  };
  const layoutGenerator = (object, height, width) => {



    const plotOutput = { annotations: [] };
    const plotHeight = parseFloat(height);
    const plotWidth = parseFloat(width);
    const margin = object.MasterObj_Data_Mapping.margin;

    // const colorsList={
    //     1:["#003024","#005e46","#008a68","#00ad82","#00c995","#00dba5","#00f2b6","#26ffca","#7ffee0"], // green
    //     2:["#002d30","#00575e","#008b88","#00adac","#01b8ca","#00d4da","#00eaf1","#25ffff","#7fffff"], // blue
    //     3:["#31001d","#5d002c","#890044","#ad0050","#c80059","#d90175","#f20071","#fe268b","#ff7eb4"], //red
    //     4:["#302d00","#6a6104","#8e8303","#ae9f06","#d0be04","#e3d804","#f2e500","#ffee34","#fff794"], // yellow
    //     5:["#121413","#373b3a","#585e5e","#6f7372","#8c908f","#afb5b5","#c9cfcf","#dfe3e2","#ebefee"], // white
    //     6: [
    //       "#00575e",
    //       "#ad0050",
    //       // "#008a68",
    //       // "#890044",
    //       // "#d0be04",
    //       "#ae9f06",
    //       // "#c9cfcf",
    //       // "#8c908f",
    //       // "#005e46",
    //       "#008b88",
    //       "#afb5b5",
    //       "#6a6104"
    //       // "#00adac",
    //     ], // mix1
    // }


    const colorsList = {
      1: ["#302d00",
        "#003024",
        "#afb5b5",
        "#008b88",
        "#ae9f06",
        "#ad0050",
        "#6a6104",
        "#00575e"]
      ,
      2: ["#002d30",
        "#890044",
        "#00adac",
        "#00c995",
        "#dfe3e2",
        "#00dba5",
        "#373b3a",
        "#ae9f06"]
      ,
      3: ["#ad0050",
        "#7ffee0",
        "#fff794",
        "#f20071",
        "#8e8303",
        "#ff7eb4",
        "#00adac",
        "#008a68"]
      ,
      4: ["#002d30",
        "#890044",
        "#00adac",
        "#00c995",
        "#ebefee",
        "#ff7eb4",
        "#00adac",
        "#ae9f06"]
      ,
      5: ["#ad0050",
        "#7ffee0",
        "#fff794",
        "#f20071",
        "#8e8303",
        "#ff7eb4",
        "#00adac",
        "#008a68"]
      ,
      6: ["#121413",
        "#fff794",
        "#ae9f06",
        "#00adac",
        "#00dba5",
        "#302d00",
        "#003024",
        "#ad0050"],
      7: ["#ff7eb4",
        "#7ffee0",
        "#fff794",
        "#5d002c",
        "#00dba5",
        "#7fffff",
        "#afb5b5",
        "#6a6104"],
      8: ["#302d00",
        "#003024",
        "#121413",
        "#890044",
        "#01b8ca",
        "#ebefee",
        "#6f7372",
        "#d90175"],
      9: ["#f20071",
        "#121413",
        "#890044",
        "#00c995",
        "#ebefee",
        "#ff7eb4",
        "#6f7372",
        "#e3d804"],
      10: ["#002d30",
        "#ff7eb4",
        "#7fffff",
        "#7ffee0",
        "#585e5e",
        "#fff794",
        "#890044",
        "#ebefee"]
    }

    const colorsList2 = {
      1: [
        "#00575e",
        "#ad0050",
        "#ae9f06",
        "#008b88",
        "#6f7372",
        "#6a6104",
        "#003024",
        "#302d00"],


      2: ["#6a6104",
        "#afb5b5",
        "#121413",
        "#5d002c",
        "#008b88",
        "#6f7372",
        "#7ffee0",
        "#ff7eb4"],


      3: ["#f20071",
        "#121413",
        "#7ffee0",
        "#ad0050",
        "#008a68",
        "#00adac",
        "#ff7eb4",
        "#8e8303"],


      4: ["#00c995",
        "#00adac",
        "#890044",
        "#002d30",
        "#ff7eb4",
        "#ae9f06",
        "#00adac",
        "#121413"],


      5: ["#00c995",
        "#31001d",
        "#890044",
        "#002d30",
        "#00dba5",
        "#ae9f06",
        "#373b3a",
        "#01b8ca"],


      6: ["#00adac",
        "#ad0050",
        "#ae9f06",
        "#00dba5",
        "#6f7372",
        "#121413",
        "#003024",
        "#302d00"],



      7: ["#003024",
        "#6a6104",
        "#f20071",
        "#121413",
        "#890044",
        "#00c995",
        "#ff7eb4",
        "#6f7372"],


      8: ["#6a6104",
        "#302d00",
        "#003024",
        "#121413",
        "#890044",
        "#01b8ca",
        "#6f7372",
        "#d90175"],


      9: ["#01b8ca",
        "#ae9f06",
        "#ff7eb4",
        "#7ffee0",
        "#5d002c",
        "#00dba5",
        "#afb5b5",
        "#6a6104"]




    }


    const colorIndex = parseInt(getNested(object, "MasterObj_Data_Mapping", "extraLayoutConfig", "colorway"))
    delete object.MasterObj_Data_Mapping.extraLayoutConfig.colorway
    object.MasterObj_Data_Mapping.Plots.map((plot, i) => {
      const plotType = plot.function_type;
      const haveY2 = Boolean(getNested(plot, "Y", "Y2"))
      const defaultLayout = {

        colorway: isNaN(colorIndex) ? colorsList2[6] : colorsList2[colorIndex],
        // colorway: isNaN(colorIndex) ? colorsList[6] : colorsList[colorIndex],
        showlegend:
          getNested(object, "MasterObj_Data_Mapping", "legend", "showlegend") ||
          false,

        title: object.title,
        font: {
          family: "balto Book",
        },
        width,
        height,
        margin: margin
          ? margin
          : {
            t: 0, //top margin
            l: 0, //left margin
            r: 0, //right margin
            b: 0, //bottom margin
          },


      };

      if (object.title) {
        setHaveTitle(true);
        defaultLayout.title = object.title;
      }

      const defaultX1 = {
        title: {
          font: { family: "balto Book" }
        },
        layer:"below traces",
      };

      const defaultY1 = {
        side: "left",
        // anchor: 'free',
        rangemode: 'tozero',

        title: {
          font: {
            family: "balto Book"
          }
        },

      };

      const defaultY2 = {
        side: "right",
        overlaying: "y",
        // anchor: 'x',
        rangemode: 'tozero',
        title: {
          font: {
            family: "balto Book",

          }
        },
      };

      let pos = getNested(object, "MasterObj_Data_Mapping", "legend", "pos");

      let posX = {};
      let posY = {};
      let posY2 = {};
      setLegendPos(pos);
      const x = getNested(
        object,
        "MasterObj_Data_Mapping",
        "legend",
        "legend",
        "x"
      );
      const y = getNested(
        object,
        "MasterObj_Data_Mapping",
        "legend",
        "legend",
        "y"
      );

      switch (pos) {
        case "right":
          posX = { domain: [0, haveY2 ? 0.77 : 0.8] };
          if (x) object.MasterObj_Data_Mapping.legend.legend.x = x;
          else
            object.MasterObj_Data_Mapping.legend.legend.x = 0.85;

          if (y) object.MasterObj_Data_Mapping.legend.legend.y = y;
          else
            switch (true) {
              case object.spanRow <= 3:
                // object.MasterObj_Data_Mapping.legend.legend.y = 2
                object.MasterObj_Data_Mapping.legend.legend.y = 2;
                break;
              case object.spanRow <= 5:
                // object.MasterObj_Data_Mapping.legend.legend.y = 1.4
                object.MasterObj_Data_Mapping.legend.legend.y = 1.25;
              default:
                break;
            }

          // delete object.MasterObj_Data_Mapping.legend.legend.orientation
          break;
        case "bottom":
          if (x) object.MasterObj_Data_Mapping.legend.legend.x = x;
          else object.MasterObj_Data_Mapping.legend.legend.x = 0;
          if (y) object.MasterObj_Data_Mapping.legend.legend.y = y;
          // else object.MasterObj_Data_Mapping.legend.legend.y = -0.05;
          else object.MasterObj_Data_Mapping.legend.legend.y = 0;

          break;
        default:
          pos = {};
          break;
      }

      Object.assign(defaultLayout, object.MasterObj_Data_Mapping.legend || {})

      const scatterLayout = {
        grid: {
          rows: 1,
          columns: 1,
        },
        xaxis: Object.assign(
          posX,
          mergeDeep(defaultX1, object.MasterObj_Data_Mapping.xaxis || {}
            , false)
        ),
        // xaxis: Object.assign(
        //   {},
        //   posX,
        //   object.MasterObj_Data_Mapping.xaxis || {},
        //   defaultX1
        // ),
        yaxis: Object.assign({}, posY, mergeDeep(defaultY1, object.MasterObj_Data_Mapping.yaxis1 || {})),

        // yaxis: Object.assign(
        //   {},
        //   posY,
        //   object.MasterObj_Data_Mapping.yaxis1 || {},
        //   defaultY1
        // ),
        yaxis2: Object.assign({}, posY2, mergeDeep(defaultY2, object.MasterObj_Data_Mapping.yaxis2 || {})),
        // yaxis2: Object.assign(
        //   {},
        //   posY2,
        //   object.MasterObj_Data_Mapping.yaxis2 || {},
        //   defaultY2
        // ),
        // autosize: true,
        margin: margin
          ? margin
          : {
            t: 40, //top margin
            l: 50, //left margin
            r: 50, //right margin
            b: 60, //bottom margin
            autoexpand: false,
          },
      };
      const annotations = getNested(plot, "extraPlotConfig", "annotations")
      if (Array.isArray(annotations))
        plotOutput.annotations = plotOutput.annotations.concat(annotations)


      // { 
      //   text: "subplot",
      //     font: {
      //     size: 16,
      //    color: 'green',
      //   },
      //   showarrow: true,
      //   arrowhead:1,
      //   // align: 'center',
      //   x: 0,
      //   y: 0,
      //   xref: 'x',
      //   yref: 'y',
      // },

      return Object.assign(
        plotOutput,
        defaultLayout,
        scatterLayout,
        object.MasterObj_Data_Mapping.extraLayoutConfig || {}
      );

    });

    return plotOutput;
  };

  const dataGenerator = (object, data, maxCols, maxRows, isPageTL, height, width) => {
    const currentX = getNested(object, "MasterObj_Data_selection", "x");
    const currentY = getNested(object, "MasterObj_Data_selection", "y");
    const currentPage = getNested(object, "MasterObj_Data_selection", "page", "page");
    const _selectedPage = object.MasterObj_Data_selection.MasterObjPage.selectedMember;

    let outFinal = [];
    let queryType;
    let xElementToGet;
    const QueryAPI = object.QueryAPI;
    const pageType = (getNested(componentData.obj, "MasterObj_Data_selection", "page", "page") || "").toLowerCase()
    const xType = (getNested(componentData.obj, "MasterObj_Data_selection", "x") || "").toLowerCase()
    const yType = (getNested(componentData.obj, "MasterObj_Data_selection", "y") || "").toLowerCase()

    switch (object.MasterObj_Data_Query.cross_tab) {
      case "cross_tab_cl":
        {
          //cross_tab_cl
          queryType = "cl";
          switch (QueryAPI) {
            case "iotinner":
              {
                const x = object.MasterObj_Data_selection.x.toLowerCase();
                switch (x) {
                  case "ml":
                    xElementToGet = "m_name";
                    break;
                  default:
                    //tl
                    xElementToGet = "date";
                }
              }
              break;
            default:
              xElementToGet = "m_name";
              break;
          }
        }
        break;
      case "cross_tab_ml":
        {
          //cross_tab_ml
          switch (QueryAPI) {
            case "iotinner":
              {
                const x = object.MasterObj_Data_selection.x.toLowerCase();
                switch (x) {
                  case "cl":
                    xElementToGet = "Le_Compteur";
                    break;
                  default:
                    xElementToGet = "date";
                }
              }
              break;
            default:
              xElementToGet = "Le_Compteur";
              break;
          }
          queryType = "ml";
        }
        break;
      default:
        //normalised
        queryType = "norm";

        break;
    }

    maxCols = parseFloat(maxCols);
    maxRows = parseFloat(maxRows);

    const generateX = (plot, data, plotType) => {
      if (!data || !plot) return;


      let elem;

      let xOutput = [];

      switch (plotType) {
        case "table":
          {
            if (QueryAPI == "iotinner") {
              if (object.MasterObj_Data_selection.x.toLowerCase() == "tl") {
                xOutput = data.map((elem) => {
                  return elem["date"] || elem["time"]
                });
              }
              else
                plot.X.map((x) => {


                  xOutput = data.map((elem) => elem[x]);
                });
              const reducedDates = dateReducer(xOutput);
              xOutput = reducedDates.dates;
              // object.title = `${object.title} ${reducedDates.partialTitle}`;
            }
            else xOutput = plot.X;
          }
          break;
        default: {

          plot.X.map((x) => {
            // follow x order in plot object
            switch (QueryAPI) {
              case "cluster":
                {
                  elem = data.find((elem, i) => elem[xElementToGet] == x);
                  elem = safe & !elem ? [] : elem
                  xOutput.push(elem.Le_Compteur || elem.m_name);
                }
                break;
              default:
                {
                  elem = data.find((elem) => {
                    return elem[xElementToGet] == x;
                  });

                  data.map((elem) => {
                    xOutput.push(elem.date || elem.time);
                  });
                }
                break;
            }
          });

        }
      }

      // xOutput = Array.from(new Set(xOutput));
      return xOutput;
    };

    const generateY = (plot, data, plotType, xElementToGet) => {

      if (!data || !plot) return;
      const yOutput = [];
      let _y = {};
      let _yText = {};
      let _y2 = {};
      let elem;
      let key



      const prossessing = (elem, x) => {
        let xList = []
        if (QueryAPI == "cluster") {
          key = object.MasterObj_Data_selection.MasterObjPage.selectedMember;
          if (!Object.keys(key).length)
            key = x;

          key = key.Le_Compteur || key.m_name || key.compteur_name || key;

        }
        // else if (QueryAPI == "iotinner" && currentX.toLowerCase() == "tl") {
        else if (QueryAPI == "iotinner") {
          xList = currentX.toLowerCase() == "tl" ? elem.map((el) => el.date || el.time) : xList

          key = object.MasterObj_Data_selection.MasterObjPage.selectedMember;
          key = key.Le_Compteur || key.m_name || key.compteur_name
          // || key;
          if (!key) {
            const temp = (getNested(object, "MasterObj_Data_selection", "MasterObjPage", "membersList") || [{}])[0]
            key = temp.Le_Compteur ||
              temp.m_name ||
              temp.compteur_name
          }
        }

        switch (plotType) {
          case "table":
            {
              _y = [];

              if (QueryAPI == "cluster") {
                plot.Y.Y1.map((y) => {
                  _y.push(typeof elem[y] == "undefined" ? { text: y, value: null } : { text: y, value: elem[y] });
                });

                yOutput.push({
                  y1: _y,
                });
              } else if (QueryAPI == "iotinner") {
                data.map((elem) => {
                  // _y = plot.Y.Y1.map((y) =>
                  //   typeof elem[y] == "undefined" ? null : elem[y]
                  // );
                  // _y = plot.Y.Y1.map((y) => typeof elem[y] == "undefined" ? { text: y, value: null } : { text: y, value: elem[y] });
                  _y = plot.Y.Y1.map((y) => {
                    const selectedMember = _selectedPage.Le_Compteur || _selectedPage.m_name || _selectedPage.compteur_name || object.MasterObj_Data_selection.MasterObjPage.membersList[0]
                    // return typeof elem[y] == "undefined" ? { text: y, value: null } : { text: y, value: elem[y] }});
                    return typeof elem[selectedMember][y] == "undefined" ? { text: y, value: null } : { text: y, value: elem[selectedMember][y] }
                  });
                  yOutput.push({ y1: _y });
                });
              }
            }
            break;
          case "indicator":
            const temp_yText = []
            if (!_y[key]) _y[key] = []
            elem = Array.isArray(elem) && elem[0] ? elem[0] : elem
            plot.Y.Y1.map((y) => {
              let temp = elem[y]
              _y[key].push(temp);
              if (!_yText[key]) _yText[key] = [];
              temp_yText.push(typeof y == "undefined" ? null : y);

            })
            _yText[key] = [...temp_yText, ..._yText[key]]

            if (plot.Y.Y2 && plot.Y.Y2.length) {
              plot.Y.Y2.map((y2) => {
                let temp = elem[y2]
                if (!_y2["y2"]) _y2["y2"] = [];
                _y2["y2"].push(temp);
                if (!_yText[key]) _yText[key] = [];

                _yText[key].push(typeof y2 == "undefined" ? null : y2);
              });

            }
            break;
          case "pie":
            {
              const temp_yText = []
              if (!_y[key]) _y[key] = []
              if (QueryAPI == "iotinner") {
                if (!_yText[key]) _yText[key] = []
                elem.map((el) => {
                  plot.Y.Y1.map((y) => {
                    const temp = getNested(el, key, y)
                    _y[key].push(temp)
                    _yText[key].push(y)
                  })

                })
              } else {

                plot.Y.Y1.map((y) => {
                  let temp = elem[y]
                  _y[key].push(temp);
                  if (!_yText[key]) _yText[key] = [];
                  temp_yText.push(typeof y == "undefined" ? null : y);
                })
                _yText[key] = [...temp_yText, ..._yText[key]]

              }

            }
            break;
          default:
            {
              if (QueryAPI == "cluster") {

                plot.Y.Y1.map((y) => {
                  if (!_y[y]) {
                    _y[y] = [];
                  }
                  _y[y].push(typeof elem[y] == "undefined" ? null : elem[y]);


                  if (!_yText[y]) _yText[y] = [];
                  _yText[y].push(typeof y == "undefined" ? null : y);
                });

                if (plot.Y.Y2 && plot.Y.Y2.length) {
                  plot.Y.Y2.map((y2) => {
                    if (!_y2[y2]) _y2[y2] = [];

                    _y2[y2].push(
                      typeof elem[y2] == "undefined" ? null : elem[y2]
                    );
                  });
                }

              } else if (QueryAPI == "iotinner") {

                data.map((elem) => {
                  plot.Y.Y1.map((y) => {
                    if (!_y[y]) {
                      _y[y] = [];
                    }

                    const value = getNested(elem, key, y)
                    _y[y].push(
                      typeof value == "undefined" ? null : value

                      // typeof elem[y] == "undefined" ? null : elem[y]
                    );
                  });
                  if (plot.Y.Y2 && plot.Y.Y2.length) {
                    plot.Y.Y2.map((y2) => {
                      if (!_y2[y2]) _y2[y2] = [];
                      const value = getNested(elem, key, y2)
                      _y2[y2].push(
                        typeof value == "undefined" ? null : value
                      );
                    });
                  }
                });

              }
            }
            break;
        }
      }

      if (currentX == currentPage) {

        // const element = data[0] || [];
        const selectedPage = getNested(object, "MasterObj_Data_selection", "MasterObjPage", "selectedMember") || {}
        const element = data.find((value) => value[xElementToGet] == selectedPage[xElementToGet]) || data[0] || [];

        prossessing(element, xElementToGet)
      } else
        plot.X.map((x, i) => {

          switch (QueryAPI) {
            case "cluster":
              elem = data.find((elem) => elem[xElementToGet] == x);
              if (safe)
                elem = elem ? elem : []
              break;
            case "iotinner":
              let selectedPageValid
              if (isPageTL) {
                const selectedPage = object.MasterObj_Data_selection.MasterObjPage.selectedMember
                selectedPageValid = Boolean(!isNaN(selectedPage) && parseInt(selectedPage))
                // if (plot.X.length>1)
                // elem = data[selectedPage && Object.keys(selectedPage).length?selectedPage:isNaN(selectedPage)?0:selectedPage ]
                const index = data.findIndex((val, i) => val.date == selectedPage || val.time == selectedPage)
                elem = data[selectedPageValid ? selectedPage : typeof selectedPage == "string" ? index : 0]

                // else {
                //   elem=data.find((value,i)=>value.m_name==x)
                // }

              }
              else
                elem = data ? data : []
              break;
            default:
              break;
          }

          prossessing(elem, x)
        });

      if (["scatter", "bar", "pie", "indicator"].includes(plotType)) {

        if (currentX == currentPage) {
          const temp = [{ y1: { text: [], value: [] } }]
          Object.keys(_y).map((elem, i) => {
            if (plotType == "indicator") {
              // temp[0].y1.text = [temp[0].y1.text=_yText[elem][0]]
              temp[0].y1.text = [temp[0].y1.text = _yText[elem][0]]
              temp[0].y1.value = [temp[0].y1.value = _y[elem][0]]
            }
            // else if (!["scatter","bar"].includes(plotType)) {
            else {
              temp[0].y1.text = temp[0].y1.text.concat(_yText[elem])
              temp[0].y1.value = temp[0].y1.value.concat(_y[elem])
            }
          });
          Object.keys(_y2).map((elem, i) => {
            temp.push({ y2: { text: elem, value: _y2[elem] } })
          });

          return temp
        }

        Object.keys(_y).map((elem, i) => {

          yOutput.push({ y1: { text: _yText[elem], value: _y[elem] } });
        });

        Object.keys(_y2).map((elem, i) => {
          yOutput.push({ y2: { text: _yText[elem], value: _y2[elem] } });
        });

      }
      return yOutput;
    };



    const generateXYPageTl = (plot, data, plotType) => {

      let xOutput = [];
      let yOutput = [];
      let _elem;
      let _y = {};
      let _yText = {};
      const selectedMember =
        object.MasterObj_Data_selection.MasterObjPage.selectedMember;
      _elem = data.find(
        (elem, i) =>
          elem.date == selectedMember ||
          elem.time == selectedMember ||
          i == selectedMember
      );
      const elem = !_elem ? data[0] : Array.isArray(_elem) && data[0] ? data[0] : _elem;
      if (elem) {
        const key = elem.m_name || elem.Le_Compteur || elem.compteur_name || elem.date || elem.time;
        switch (plotType) {
          case "table":
            {

              delete elem.date;
              delete elem.time;
              delete elem.Le_Compteur;
              delete elem.compteur_name
              delete elem.m_name;
              delete elem.m_code;
              xOutput = plot.Y.Y1;
              plot.Y.Y1.map((y) => {
                const _y = plot.X.map((_key, i) => {
                  const element = getNested(elem, _key, y)
                  return isNaN(element) ? null : element
                })

                yOutput.push({ y1: _y });
              })
            }
            break;
          case "indicator": {

            const key = plot.Y.Y1[0]
            const x = plot.X[0]
            yOutput.push({ y1: { text: [key], value: elem[x][key] } });
            if (getNested(plot, "Y", "Y2")) {
              const min = elem[x][plot.Y.Y2[0]]
              const max = elem[x][plot.Y.Y2[1]]
              const delta = elem[x][plot.Y.Y2[2]]
              const objectif = elem[x][plot.Y.Y2[3]]
              yOutput.push({ y2: { text: plot.Y.Y2.slice(0, 3), value: [min, max, delta, objectif] } });

            }
          }
            break;
          case "pie": {
            const temp_yText = []
            plot.X.map((x) => {
              plot.Y.Y1.map((y) => {
                let temp = elem[x][y]
                if (!_y[key]) _y[key] = []
                _y[key].push(temp);
                if (!_yText[key]) _yText[key] = [];
                temp_yText.push(typeof y == "undefined" ? null : y);
              })

            })
            xOutput = temp_yText
            yOutput = _y[key]
            _yText[key] = [...temp_yText, ..._yText[key]]
            // }

          } break;
          default:
            xOutput = plot.Y.Y1;
            plot.X.map((_x) => {
              plot.Y.Y1.map((element) => {
                if (!_y[_x])
                  _y[_x] = [];

                if (!_yText[_x])
                  _yText[_x] = [];

                _y[_x].push(elem[_x][element]);
                _yText[_x].push(element);
              });

            })
            Object.keys(_y).map((elem, i) => {
              yOutput.push({ y1: { text: _yText[elem], value: _y[elem], x: elem } });
            });
        }

      }



      return { xData: xOutput, yData: yOutput };
    }

    const lineColor = object.MasterObj_Data_Mapping.ColorChart;

    const defaultIndicatorDataConfig = {
      mode: "number+gauge+delta",
      delta: { reference: 0 },
      gauge: {
        axis: {
          visible: true,
          range: [null, null],
        },
        threshold: { thickness: 5, value: 15000000 },
      },
      align: "center",
      domain: { x: [0.1, 0.9], y: [0.1, 0.8] }
      // domain: { x: [0.1, 0.9], y: [0.1, 0.9] }
    };

    object.MasterObj_Data_Mapping.Plots.map((plot, i) => {

      const plotType = plot.function_type;
      switch (plotType) {
        case "table":
          {
            let header;
            let values;
            let additionalColumn;

            let table = {
              type: "table",
              header: {
                values: [],
                align: "center",
                line: {
                  width: 1,
                  color: "black",
                },
                fill: {
                  color: "grey",
                },
                font: {
                  family: "balto",
                  size: 12,
                  color: "white",
                },
              },
              cells: {
                values: [],
                align: [],
                line: {
                  color: "black",
                  width: 1,
                },
                font: {
                  family: "balto",
                  size: 11,
                  color: ["black"],
                },
              },
            };
            table = Object.assign({}, table, plot.extraPlotConfig || {})
            if (isPageTL && QueryAPI == "iotinner") {
              const temp = generateXYPageTl(plot, data, "table");
              header = temp.xData;
              values = temp.yData.map((value) => getNested(value, "y1"));
              additionalColumn = plot.X;
            }
            else if (QueryAPI == "iotinner") {

              const firstColumn = generateX(plot, data, plotType);
              const Y = generateY(plot, data, plotType, xElementToGet);

              let tempSortedValues = []
              values = Y.map((valuesList) => getNested(valuesList, "y1"))
              header = (Array.isArray(values) && values.length >= 1 ? values[0] : []).map((head) => head.text)

              values.map((value) => {
                header.map((header, i) => {
                  const result = value.find((value) => value.text == header)
                  if (!tempSortedValues[i]) tempSortedValues[i] = []
                  tempSortedValues[i].push((result && !isNaN(result.value)) ? result.value : null)
                })

              })
              values = tempSortedValues
              additionalColumn = firstColumn;
            }
            else {
              // header = generateX(plot, data, plotType);
              const Y = generateY(plot, data, plotType, xElementToGet);
              header = Y.map((valuesList) => getNested(valuesList, "y1"))

              values = Y.map((valuesList) => getNested(valuesList, "y1"))
              header = (Array.isArray(header[0]) && header[0] || []).map((header) => header.text)
              let tempSortedValues = []
              values.map((value) => {
                header.map((header, i) => {
                  const result = value.find((value) => value.text == header)
                  if (!tempSortedValues[i]) tempSortedValues[i] = []
                  tempSortedValues[i].push((result && !isNaN(result.value)) ? result.value : null)
                })

              })
              values = tempSortedValues

              additionalColumn = plot.X;
            }

            header = ["names", ...header];
            values = [additionalColumn, ...values];
            table.header.values = header;
            table.cells.values = values;
            table.cells.align = ["left", "right"];
            const cellHeight =
              ((parseFloat(height) / maxRows) * object.spanRow) /
              table.cells.values[0].length;
            const minCellHeight = 28;
            const maxCellHeight = 28;
            const cellWidth =
              ((parseFloat(width) / maxCols) * object.spanCol) /
              table.cells.values[0].length;
            const minCellWidth = 50;
            const maxCellWidth = 25;
            table.cells.width =
              cellWidth > minCellWidth ? cellWidth : minCellWidth;
            table.cells.height =
              cellHeight > minCellHeight
                ? cellHeight < maxCellHeight
                  ? cellHeight
                  : maxCellHeight
                : minCellHeight;
            outFinal.push(table);
          }
          break;
        case "indicator":
          {
            let x, y
            let outTemp = {};
            Object.assign(
              outTemp,
              defaultIndicatorDataConfig,
              plot.extraPlotConfig
            );

            if (isPageTL && QueryAPI == "iotinner") {
              const temp = generateXYPageTl(plot, data, plotType)
              x = temp.xData;
              y = temp.yData;
            }
            else {
              x = generateX(plot, data, plotType);
              y = generateY(plot, data, plotType, xElementToGet);
            }
            const backupYs = getNested(plot, "Y", "Y2")

            let text = getNested(y[0], "y1", "text") || [];


            const value = parseFloat(getNested(y[0], "y1", "value")) || 0
            let min, max, delta, objectif
            if (backupYs && y && getNested(y[1], "y2")) {
              min = !isNaN(parseFloat(backupYs[0])) ? parseFloat(backupYs[0]) : false || parseFloat(getNested(y[1], "y2", "value")[0])
              max = !isNaN(parseFloat(backupYs[1])) ? parseFloat(backupYs[1]) : false || parseFloat(getNested(y[1], "y2", "value")[1])
              delta = !isNaN(parseFloat(backupYs[2])) ? parseFloat(backupYs[2]) : false || parseFloat(getNested(y[1], "y2", "value")[2])
              objectif = !isNaN(parseFloat(backupYs[3])) ? parseFloat(backupYs[3]) : false || parseFloat(getNested(y[1], "y2", "value")[3])
            }
            const gauge = getNested(outTemp, "gauge", "shape")
            Object.assign(outTemp, {
              // title: { text: text[0] },
              title: { text: Boolean(getNested(plot, "extraPlotConfig", "showTitle")) ? text[0] : "" },
              type: "indicator",
              value: value,
              delta: { reference: delta },
              gauge: {
                shape: gauge,
                axis: {
                  range: [min, max]
                },
                threshold: { thickness: 5, value: objectif }
              },
              mode: [gauge ? "gauge" : "", !isNaN(value) ? "number" : "", !isNaN(delta) ? "delta" : ""].filter((value) => value).join("+")
            });
            // setInterval(() => {
            //   if (document.querySelector(`#${divId}`))
            //     Plotly.update(divId, { delta: { reference: Math.random() * 10 }, value: parseInt(Math.random() * 100) }, {}, [0])
            // }, 1000);
            outFinal.push(outTemp);
          }
          break;
        case "pie":
          {
            let outTemp = {};
            let values
            outTemp = Object.assign({}, outTemp, plot.extraPlotConfig);
            if (isPageTL) {
              const xyData = generateXYPageTl(plot, data, plotType, xElementToGet);
              outTemp.values = xyData.yData
              outTemp.labels = xyData.xData
            }
            else {
              values = generateY(plot, data, plotType, xElementToGet);
              outTemp.values = values.map((elem, i) => getNested(elem, "y1", "value"));
              outTemp.values = outTemp.values.filter((value, i) => typeof value != "undefined");

              outTemp.values = outTemp.values.length ? outTemp.values.flat() : []
              outTemp.labels = values.map((elem, i) => getNested(elem, "y1", "text"));
              outTemp.labels = outTemp.labels.filter((value, i) => typeof value != "undefined");
              outTemp.labels = outTemp.labels.length ? outTemp.labels.flat() : []
            }
            outTemp.type = "pie";
            outFinal.push(outTemp);
          }
          break;
        default:
          {
            let xData, yData;
            const plotType = plot.function_type;
            if (isPageTL && QueryAPI == "iotinner") {
              const tempXYData = generateXYPageTl(plot, data, plotType);
              xData = tempXYData.xData;
              yData = tempXYData.yData;
            } else {
              yData = generateY(plot, data, plotType, xElementToGet);
              if (currentX != currentPage) {
                xData = generateX(plot, data, plotType)
              }
              else {

                xData = yData.map((x) => getNested(x, "y1", "text")).flat()

              }
            }


            let y1Index = 0;
            let y2Index = 0;
            yData.map((yDataSingleArray, i) => {
              let outTemp = {connectgaps:true};

              outTemp = Object.assign({}, outTemp, plot.extraPlotConfig);
              let y = Object.keys(yDataSingleArray)[0].toUpperCase();
              
              outTemp.x = xData;
              switch (y) {
                case "Y1":
                  y = plot.Y[y][y1Index];
                  if (!outTemp.name) outTemp.name = getNested(yDataSingleArray, "y1", "x") || y;

                  y1Index++;
                  break;
                case "Y2":
                  y = plot.Y[y][y2Index];
                  if (!outTemp.name) outTemp.name = getNested(yDataSingleArray, "y2", "x") || y;

                  y2Index++;
                  break;
                default:
                  break;
              }


              // if (!outTemp.name) outTemp.name = plot.X[i];

              if (yDataSingleArray.y1) {
                outTemp.y = yDataSingleArray.y1.value;

                if (getNested(plot, "extraPlotConfig", "addTexts")) {
                  outTemp.text = yDataSingleArray.y1.text;
                }
              } else {
                outTemp.y = yDataSingleArray.y2.value;
                outTemp.yaxis = "y2";
              }
              // outTemp.xaxis = "x";
              if (lineColor)
                outTemp.line = {
                  color: lineColor,
                };
              outTemp.type = plot.function_type;
              // outTemp.transforms = [{
              //   type: 'sort',
              //   target: 'y',
              //   order: 'descending'
              // }]
              const orientation = getNested(
                plot,
                "extraPlotConfig",
                "orientation"
              );
              if (plotType == "bar" && orientation == "h") {
                const temp = outTemp.x;
                outTemp.x = outTemp.y;
                outTemp.y = temp;
              }

              outFinal.push(outTemp);
            });
          }
          break;
      }
    });

    return outFinal;
  };

  const extraTLPage = (data, obj) => {
    const pageOutput = data.map((elem) => elem.date || elem.time).filter(el => el);

    setPages(pageOutput);


    setPageExist(Boolean(((JSON.stringify(pages || [])) + "").replace(/"name":/gi, "").replace(/"code":/, "").replace(/[",\[\]{}]/gi, "")))

  };

  const plotDataTreatement = (
    data,
    obj,
    isPageTL,
    _height,
    _width,
    redraw = false
  ) => {


    obj = fontSizeCalc(obj);
    const sp = getNested(obj, "MasterObj_Data_selection", "MasterObjPage", "selectedMember")

    // obj.MasterObj_Data_Mapping = dataMappingGenerator(obj, selectedPage);
    obj.MasterObj_Data_Mapping = dataMappingGenerator(obj, sp);
    if (isPageTL) {
      extraTLPage(data, obj);
    }

    const maxCols = rc.maxCols; // config.configLayout.Masterlayout_col
    const maxRows = rc.maxRows; //config.configLayout.Masterlayout_row
    const _data = dataGenerator(obj, data, maxCols, maxRows, isPageTL, _height, _width);
    const _layout = layoutGenerator(obj, _height, _width);
    setLayout(_layout);
    setData(_data);
    setReady(false);
    setTimeout(() => {
      setReady(true);
    }, 1000);

    if (redraw === true) {
      // Plotly.update(divId,_data,_layout,Array(_data.length).fill("").map((v,i)=>i))
      // Plotly.newPlot(divId,_data,_layout)
      // Plotly.purge(divId)
    }
  };

  const percentToPX = (value, total) => {
    return Math.floor(
      value.indexOf("%") != -1
        ? total * (parseFloat(value) / 100)
        : parseFloat(value)
    )
  };

  const fillInTheBlanks = (data, query) => {
    const crossTab = query.cross_tab

    let first, second

    if (crossTab == "cross_tab_ml") {
      first = query.cl || query.CL
      second = query.ml || query.ML
    } else {
      first = query.ml || query.ML
      second = query.cl || query.CL
    }

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      for (let ii = 0; ii < first.length; ii++) {
        const _first = first[ii].Le_Compteur || first[ii].m_name
        for (let jj = 0; jj < second.length; jj++) {
          const _second = second[jj].Le_Compteur || second[jj].m_name
          if (!element[_first])
            element[_first] = {}
          if (!element[_first][_second])
            element[_first][_second] = null
        }
      }
      data[i] = element
    }
    return data
  };

  const generatePlotData = async (
    selectedMember,
    isPageTL,
    refreshData = true
  ) => {
    const generatedPlots = document.querySelector("#generatedPlots");
    const layoutWidth = generatedPlots.clientWidth;
    const layoutHeight = generatedPlots.clientHeight;
    const _width = percentToPX(width, layoutWidth)
    const _height = percentToPX(height, layoutHeight)
    // const _width = Math.floor(
    //   width.indexOf("%") != -1
    //     ? layoutWidth * (parseFloat(width) / 100)
    //     : parseFloat(width)
    // );
    // const _height = Math.floor(
    //   height.indexOf("%") != -1
    //     ? layoutHeight * (parseFloat(height) / 100) - dropDownHeight
    //     : parseFloat(height) - dropDownHeight
    // );
    setPlotHeight(parseFloat(_height));
    let obj = componentData.obj;
    obj.MasterObj_Data_Query = queryPatcher(obj, selectedMember);

    if (selectedMember)
      obj.MasterObj_Data_selection = selectionPatcher(obj, selectedMember);
    if (dummy) {
      let data = generateRandomData(obj.QueryAPI, obj.MasterObj_Data_Query)

      if (Array.isArray(data) && data.length == 1 && Array.isArray(data[0]))
        data = data[0]
        
      data = Array.isArray(data) ? fillInTheBlanks(data, obj.MasterObj_Data_Query) : []

      setRawData(data.length || "noData");
      plotDataTreatement(data, obj, isPageTL, _height, _width);

    }
    else if (refreshData === true)
      return axios
        .post(
          window.apiUrl + `${obj.QueryAPI}/`,
          obj.MasterObj_Data_Query)
        .then(({ data }) => {

          if (Array.isArray(data) && data.length == 1 && Array.isArray(data[0]))
            data = data[0]

          data = Array.isArray(data) ? fillInTheBlanks(data, obj.MasterObj_Data_Query) : []

          setRawData(data.length || "noData");
          plotDataTreatement(data, obj, isPageTL, _height, _width);

        });
    // .catch((err) => console.log(err.message))
    else {
      const redraw = true;
      return plotDataTreatement(
        rawData,
        obj,
        isPageTL,
        _height,
        _width,
        redraw
      );
    }
  };

  const generatePlotDataDynamic = async (id, obj) => {
    return setTimeout(async () => {
      //--------------------
      obj.MasterObj_Data_Query = refreshQueryPatcher(obj);
      await axios
        .post(
          window.apiUrl + `${obj.QueryAPI}/`,
          obj.MasterObj_Data_Query,
          {}
        )
        .then(({ data }) => {
          if (
            Array.isArray(data) &&
            data.length == 1 &&
            Array.isArray(data[0])
          ) {
            data = data[0];
          }
          data = data ? data : [];

          const maxCols = rc.maxCols; // config.configLayout.Masterlayout_col
          const maxRows = rc.maxRows; //config.configLayout.Masterlayout_row

          const _data = dataGenerator(obj, data, maxCols, maxRows);
          function rand() {
            return Math.random();
          }

          var update = {
            x: [],
            y: [],
          };

          var date = new Date();
          // var olderTime = date.setHours(date.getHours() - 12);
          // var futureTime = date.setHours(date.getHours() + 12);

          const dateMin = new Date(data[0].date);
          const dateMax = new Date(data[data.length - 1].date);
          var olderTime = dateMin.setHours(dateMin.getHours() - 12);
          var futureTime = dateMax.setHours(dateMax.getHours() + 12);

          _data.map((elem, i) => {
            update.x.push([date]);
            update.y.push([rand() * 10000]);
            // update.y.push([rand() * 10000])
          });

          var view24hours = {
            xaxis: {
              range: [olderTime, futureTime],
            },
          };

          view24hours.xaxis = Object.assign(
            {},
            obj.MasterObj_Data_Mapping.xaxis,
            view24hours.xaxis
          );
          if (view24hours.xaxis.autorange) delete view24hours.xaxis.autorange;
          view24hours = Object.assign(
            {},
            { yaxis1: obj.MasterObj_Data_Mapping.yaxis1 },
            view24hours
          );
          view24hours = Object.assign(
            {},
            { yaxis2: obj.MasterObj_Data_Mapping.yaxis2 },
            view24hours
          );
          if (layout) {
            view24hours = Object.assign(
              {},
              { legend: layout.legend },
              view24hours
            );
          }

          Plotly.relayout(id, view24hours);

          const trances = [...Array(update.x.length).keys()];

          if (document.querySelector(`#${id}`))
            Plotly.extendTraces(id, update, trances).then(() =>
              generatePlotDataDynamic(id, obj)
            );
        });
      //--------------------
    }, refreshInterval);
  };

  useEffect(() => {
    let intervalID;
    // api
    let isPageTL = false;
    const pageType = (getNested(componentData.obj, "MasterObj_Data_selection", "page", "page") || "").toLowerCase()
    const pageDim = (getNested(componentData.obj, "MasterObj_Data_selection", "page", "type") || "").toLowerCase()
    if (pageType == "tl" && pageDim == "dim") {
      isPageTL = true;

      setIsPageTL(true);
    } else {
      const pages = pageHandler(componentData.obj);
      setPages(pages);
      setPageExist(Boolean(((JSON.stringify(pages || [])) + "").replace(/"name":/gi, "").replace(/"code":/, "").replace(/[",\[\]{}]/gi, "")))

    }
    const defaultSelectedMember = getNested(componentData, "obj", "MasterObj_Data_selection", "membersList")
    const _selectedMember = getNested(componentData, "obj", "MasterObj_Data_selection", "MasterObjPage", "selectedMember")

    const selectedMember = isNaN(_selectedMember) ? Object.keys(_selectedMember || {}).length ? _selectedMember : defaultSelectedMember : _selectedMember

    generatePlotData(selectedMember, isPageTL).then(() => {
      //todo
      if (updateData && false) {
        intervalID = generatePlotDataDynamic(divId, componentData.obj);
      }
    });

    // Plotly.newPlot(divId, data, layout)
    return function cleanup() {
      clearTimeout(intervalID);
      clearInterval(intervalID);
    };
  }, []);

  const handleChange = (e) => {
    const selectedPage = pages[e.target.selectedIndex];
    setSelectedPage(selectedPage)
    setReady(false);
    // ready=false
    if (!isPageTL) {
      setData(undefined);
    }
    generatePlotData(selectedPage, isPageTL, !isPageTL);
  };

  const init_editSVGonRuntime = () => {
    const elem = document.querySelector(`#${id}`);
    if (elem) {
      if (haveTitle) {
        const elem2 = elem.querySelector(`.cartesianlayer`);
        if (elem2) elem2.style.transform = "translateY(-10px)";
      } else {
        const elem2 = elem.querySelector(`.cartesianlayer`);
        if (elem2) elem2.style.transform = "translateY(-30px)";

        // const elem3 = elem.querySelector(`.infolayer`)
        // if (elem3) elem3.style.transform = "translateY(-20px)";
      }
      const elem4 = elem.querySelector(".g-xtitle");
      if (elem4) {
        if (legendPos == "right") {
          elem4.style.transform = "translateY(-20px)";
        } else {
          elem4.style.transform = "translateY(-30px)";
        }
      }
    }
  };
  // console.log("pagespagespagespagespagesv", pages)

  return (
    <>
      {pages ? (
        <DropDownPageMenu id={`${divId}-selection`} extraConfig={getNested(componentData, "obj", "MasterObj_Data_Mapping", "extraLayoutConfig")} pages={pages} selectedPage={selectedPage} handleChange={handleChange} />
      ) : null}
      {ready ? fatalError ? <PlotError className={"plotError"} style={{ fontSize: "80px" }} height={plotHeight} message={"00000000000"} /> : (
        <Plot
          divId={divId}
          // onUpdate={init_editSVGonRuntime}
          // onInitialized={init_editSVGonRuntime}
          data={data}
          layout={layout}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
        />
      ) : (
        <Spinner height={plotHeight} />
      )}
    </>
  );
};


const PlotError = ({ className, message, height, style = {} }) => {
  return <div style={{ height, width: "100%", display: "block" }}>
    <span className={className} style={Object.assign({ height: "inherit", width: "inherit", }, style)}>{message}</span>
  </div>
}

const DropDownPageMenu = ({ id, pages, extraConfig, selectedPage, handleChange }) => {
  extraConfig = extraConfig ? extraConfig : {}
  const [_pages, _setPages] = useState(null);
  const [defaultPage, setDefaultPage] = useState(null);
  const [haveBorder, setHaveBorder] = useState(false);


  useEffect(() => {
    const generatedPages = pages.map((page, i) => (
      // if (!page) return { name: "", code: "" }
      // if (page.m_name) return { name: page.m_name, code: page.m_code };
      // else if (page.Le_Compteur)
      //   return { name: page.Le_Compteur, code: page.Code_Compteur };
      // else return { name: page };
      { name: page.Le_Compteur || page.m_name || page, code: page.Code_Compteur || page.m_code || "" }
    ));
    const _defaultPage = generatedPages.find((elem, i) => isNaN(selectedPage) ? selectedPage && elem.code == (selectedPage.m_code || selectedPage.Code_Compteur) : i == selectedPage)
    // const _defaultPage = generatedPages.find((elem, i) => selectedPage && elem.code == (selectedPage.m_code || selectedPage.Code_Compteur))
    const defaultPage = `${_defaultPage && _defaultPage.name || ""}${_defaultPage && _defaultPage.code ? ` [${_defaultPage.code}]` : ""}`
    if (extraConfig.addBorder == true) {
      setHaveBorder(true)
    }
    setDefaultPage(defaultPage)
    _setPages(generatedPages);
  }, []);
  return _pages ? (
    _pages.length > 1 ? (
      <select
        defaultValue={defaultPage}

        id={id}
        onChange={handleChange}
        style={{ textAlign: "center", padding: 0, height: "38px", fontFamily: "balto Book" }}
        className="browser-default custom-select bizStyles bizStylesSelect"
      >
        {_pages.map((page, i) => (
          <option
            key={i}
            value={`${page.name}${page.code ? ` [${page.code}]` : ""}`}
          >{`${page.name}${page.code ? ` [${page.code}]` : ""}`}</option>
        ))}
      </select>
    ) : (
      _pages && _pages.length ? <span
        className={`page01 ${haveBorder ? "pageHeaderBox" : ""}`}

      >{`${_pages[0].name} ${_pages[0].code ? `[${_pages[0].code}]` : ""
        }`}</span> : null
    )
  ) : (
    <></>
  );
};

const Spinner = ({ height }) => (
  <div className="text-center layoutGenerator-bg-loading" style={{ height }}>
    <div className="loadingBG" />
    <div
      className="spinner-border text-primary"
      style={{ opacity: 1, zIndex: 1000 }}
      role="status"
    >
      <span className="visually-hidden" />
    </div>
  </div>
);

const SingleCellMenu = ({ rowColObjet, handleObjectjson, id, componentData, rc, handleInputChange, doneEditing, Tl_Var_Fix, QueryApi, Ml_Var_Fix, Cl_Var_Fix }) => {
  const [startRender, setStartRender] = useState(false)
  const [plotData, setPlotData] = useState(false)
  const [heightObj, setHeightObj] = useState("")
  const [widthObj, setWidthObj] = useState("")
  const [arrayobj, setArrayobj] = useState([])
  useEffect(() => {
    const elem = document.querySelector(`#${id}`)
    if (elem && elem.getAttribute("done") == "true")
      setStartRender(true)
  }, [doneEditing])
  const handleShowPlot = (Objectjson, heightObj, widthObj) => {
    setPlotData(Objectjson)
    setHeightObj(heightObj)
    setWidthObj(widthObj)


  }
  //   useEffect(() => {
  //     if (!plotData)return
  //     ////console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",plotData)

  // setArrayobj((arrayobj) => {
  //   //plotData //<==== previous object
  //   arrayobj.push(plotData)
  //   ////console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",arrayobj)
  //   return arrayobj;
  // });

  //    // arrayobj.push(plotData)

  //   }, [plotData,arrayobj])
  return (doneEditing && startRender
    ? plotData ? <><DrawPlot
      id={id}
      height={heightObj}

      width={widthObj}
      //     config={Objectjson}
      //   componentData={{obj:Objectjson}}
      componentData={{ obj: plotData }}

      rc={rc}
    /></> : <PlotHandler handleShowPlot={handleShowPlot}
      handleObjectjson={handleObjectjson}

      rowColObjet={rowColObjet}
      QueryApi={QueryApi}
      Tl_Var_Fix={Tl_Var_Fix}
      Ml_Var_Fix={Ml_Var_Fix}
      Cl_Var_Fix={Cl_Var_Fix}
      id={id}
      rc={rc}
      componentData={componentData}
    />
    : doneEditing
      ? <></>
      : <><input onChange={handleInputChange} type="checkbox" name="check" value="" /></>)
};


export default GenerateTable;
