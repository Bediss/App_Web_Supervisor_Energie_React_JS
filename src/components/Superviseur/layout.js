import * as React from "react";
// //import { SampleBase } from "../common/sample-base";
// import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts";
// import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
// //import { panelData } from './panel-data';
// //import "./predefined-layouts.component.css";
// import "../Superviseur/Superviseur.css"
export class Layout extends React.Component {
    // constructor() {
    //     super(...arguments);
    //     this.headerCount = 1;
    //     this.panels =  [
    //         {
    //             'panel1': { 'sizeX': 4, 'sizeY': 3, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4 },
    //             'panel3': { 'sizeX': 6, 'sizeY': 1, 'row': 3, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 6, 'sizeY': 1, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 1, 'col': 0 },
    //             'panel3': { 'sizeX': 4, 'sizeY': 3, 'row': 1, 'col': 2 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 4, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 6, 'sizeY': 1, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 3, 'sizeY': 3, 'row': 1, 'col': 0 },
    //             'panel3': { 'sizeX': 3, 'sizeY': 3, 'row': 1, 'col': 3 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 4, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 6, 'sizeY': 1, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 1, 'col': 0 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 1, 'col': 2 },
    //             'panel4': { 'sizeX': 2, 'sizeY': 3, 'row': 1, 'col': 4 },
    //             'panel5': { 'sizeX': 6, 'sizeY': 1, 'row': 4, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 6, 'sizeY': 1, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 4, 'sizeY': 3, 'row': 1, 'col': 0 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 1, 'col': 4 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 4, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 2 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 2, 'row': 3, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 2 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 3, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 2 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 3, 'col': 0 }
    //         },
    //         {
    //             'panel1': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 0 },
    //             'panel2': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 2 },
    //             'panel3': { 'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4 },
    //             'panel4': { 'sizeX': 6, 'sizeY': 1, 'row': 3, 'col': 0 }
    //         }
    //     ];
    //     this.cellSpacing = [5, 5];
    // }
    // reset() {
    //     var proxy = this;
    //     let selectedElement = document.getElementsByClassName('e-selected-style');
    //     this.dashboardObj.removeAll();
    //     this.initializeTemplate(selectedElement[0], proxy);
    // }
    // initializeTemplate(element, proxy) {
    //     let updatePanels = [];
    //     let index = parseInt(element.getAttribute('data-id'), 10) - 1;
    //     let panel = Object.keys(proxy.panels[index]).map((panelIndex) => {
    //         return proxy.panels[index][panelIndex];
    //     });
    //     for (let i = 0; i < panel.length; i++) {
    //         let panelModelValue = {
    //             id: i.toString(),
    //             row: panel[i].row,
    //             col: panel[i].col,
    //             sizeX: panel[i].sizeX,
    //             sizeY: panel[i].sizeY,
    //             header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
    //             content: '<div class="panel-content">Content Area</div>'
    //         };
    //         updatePanels.push(panelModelValue);
    //     }
    //     proxy.dashboardObj.panels = updatePanels;
    // }
    // rendereComplete() {
    //     var proxy = this;
    //     document.getElementById('templateContainer').onclick = (args) => {
    //         let target = args.target;
    //         let selectedElement = document.getElementsByClassName('e-selected-style');
    //         if (selectedElement.length) {
    //             selectedElement[0].classList.remove('e-selected-style');
    //         }
    //         if (target.className === 'image-pattern-style') {
    //             proxy.dashboardObj.removeAll();
    //             proxy.initializeTemplate(args.target, proxy);
    //         }
    //         target.classList.add('e-selected-style');
    //     };
    // }
    render() {
        return (<div>
            example
{/*             
            <br/>
        <div className="col-lg-8 control-section" id="predefine_control">
          <div className="content-wrapper" style={{ "max-width": "100%" }} >
            <DashboardLayoutComponent ///created={this.onCreate.bind(this)} 
            columns={6} ref={(scope) => { this.dashboardObj = scope; }} id="predefine_dashboard" cellSpacing={this.cellSpacing}>
              <PanelsDirective>
                <PanelDirective row={0} col={0} sizeX={4} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
                <PanelDirective row={0} col={4} sizeX={2} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
                <PanelDirective row={3} col={0} sizeX={6} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>">
                </PanelDirective>
              </PanelsDirective>
            </DashboardLayoutComponent>
          </div>
        </div>
        <div className="col-lg-4 property-section dashboard" id="dash_property" style={{    marginLeft: '70%',marginTop: '-60%'}}>
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content">
            <div className="row row-header">Choose dashboard layout</div>
            <div id="templateContainer">
              <div className="row" style={{ "padding-top": "3px" }}>
                <div className="image-pattern-style e-selected-style" id="template1" data-id="1"/>
                <div className="image-pattern-style" id="template2" data-id="2"/>
                <div className="image-pattern-style" id="template3" data-id="3"/>
              </div>
              <div className="row" style={{ "padding-top": "3px" }}>
                <div className="image-pattern-style" id="template4" data-id="4"/>
                <div className="image-pattern-style" id="template5" data-id="5"/>
                <div className="image-pattern-style" id="template6" data-id="6"/>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-xs-12 col-lg-12 col-md-12 reset" style={{ "padding": "10px" }}>
            <ButtonComponent id="reset" onClick={this.reset.bind(this)}>Reset</ButtonComponent>
          </div>
        </div> */}
      </div>);
    }
}
export default Layout;