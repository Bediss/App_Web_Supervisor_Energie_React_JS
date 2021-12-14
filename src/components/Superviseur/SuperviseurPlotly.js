
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationTooltip, Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from "@syncfusion/ej2-react-charts";
// import { DashboardLayoutComponent, PanelDirective, PanelsDirective } from '@syncfusion/ej2-react-layouts';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
// import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
// import "../Superviseur/Superviseur.css"
// import createPlotlyComponent from 'react-plotlyjs';
// import Plotly from 'plotly.js/dist/plotly-cartesian';
// import Plotlyexemple from './Plotlyexemple'
// const PlotlyComponent = createPlotlyComponent(Plotly);
// import axios from 'axios';
// import uuid from 'react-uuid';
import * as React from 'react';
// import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
class SuperviseurPlotly extends React.Component {   
//   constructor() {
//     super(...arguments);
//     this.state={
//         panels:[]
//     }
//     this.cellSpacing = [10, 10];
//     this.count = 7;
//     this.resize = ['e-south-east', 'e-east', 'e-west', 'e-north', 'e-south'];
//     this.panels = [
        
//     { 'id': 'Sales increase percentage', 'sizeX': 4, 'sizeY': 4, 'row': 0, 'col': 0,header: '<div>Sales increase percentage</div>', content:this.lineTemplate },
//     { 'id': 'Product usage ratio', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 1,header: '<div>Product usage ratio</div>', content: this.pieTemplate},
//     { 'id': 'Mobile browsers usage', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0,header: '<div>Mobile browsers usage</div>', content: this.pieTemplate1 },
//     { 'id': 'Last year Sales Comparison', 'sizeX': 4, 'sizeY': 2, 'row': 0, 'col': 0,header: '<div>Last year Sales Comparison</div>', content: this.columnTemplate },
//         ];
//         this.data = ["Sales increase percentage", "Product usage ratio", "Mobile browsers usage", "Last year Sales Comparison"];
//         this.onAdd = this.onAdd.bind(this);
//         this.onRemove = this.onRemove.bind(this);
//         this.panelsJson=this.panelsJson.bind(this);
// }
// // Template for line Chart 
// onAdd(args) {
//   let proxy = this;
//   let panel = [{
//           'id': this.count.toString() + '_layout', 'sizeX': this.sizeXObj.value, 'sizeY': this.sizeYObj.value, 'row': this.rowObj.value, 'col': this.colsObj.value, header: '<div>Product usage ratio</div>',
//           content: this.pieTemplate
//       }];
//   proxy.dashboardObj.addPanel(panel[0]);
//   this.count = this.count + 1;
// }
// // Removeing selected panels for DashboardLayout
// panelsJson(){
//     this.state.panels=this.panels
//     console.log("aaaaaaa",this.state.panels)

// }
// componentDidMount() {

//     this.panelsJson();
// }
// onRemove(args) {
//   this.dashboardObj.removePanel(this.paneObj.value.toString());
//   console.log(args)
//   console.log(this.paneObj.value.toString())
// }
// lineTemplate() {
//     return (<Plotlyexemple/>);
// }
// // Template for Pie Chart
// pieTemplate() {
//     const pieData = [
//         { x: 'TypeScript', y: 60, text: 'TS 60%' },
//         { x: 'React', y: 12.5, text: 'React 12.5%' },
//         { x: 'MVC', y: 12, text: 'MVC 12%' },
//         { x: 'Core', y: 12.5, text: 'Core 12.5%' },
//         { x: 'Vue', y: 80, text: 'Vue 80%' },
//         { x: 'Angular', y: 40, text: 'Angular 40%' }
//     ];
//     return (<div className="template">
//         <AccumulationChartComponent style={{ "height": "140px" }} tooltip={{ enable: true }}><Inject services={[AccumulationTooltip]}/>
//             <AccumulationSeriesCollectionDirective>
//                 <AccumulationSeriesDirective dataSource={pieData} xName='x' yName='y' innerRadius="20%"/>
//             </AccumulationSeriesCollectionDirective>
//         </AccumulationChartComponent>
//     </div>);
// }
// // Template for Pie Chart 1
// pieTemplate1() {
//     const pieData = [
//         { 'x': 'Chrome', y: 90, text: '90%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
//         { 'x': 'iPhone', y: 19, text: '19%' },
//         { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
//         { 'x': 'Android', y: 12, text: '12%' }
//     ];
//     const dataLabel = { visible: true, position: 'Inside', name: 'text', font: { fontWeight: '1000' } };
//     return (<div className="template">
//         <AccumulationChartComponent style={{ "height": "140px" }} tooltip={{ enable: true }}>
//             <Inject services={[AccumulationTooltip]}/>
//             <AccumulationSeriesCollectionDirective>
//                 <AccumulationSeriesDirective dataSource={pieData} dataLabel={dataLabel} xName='x' yName='y' radius="70%" name='Browser'/>
//             </AccumulationSeriesCollectionDirective>
//         </AccumulationChartComponent>
//     </div>);
// }
// columnTemplate() {
//     const chartData = [
//         { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
//         { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
//         { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
//         { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
//         { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
//         { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
//     ];
//     return (<div className="template">
//             <ChartComponent style={{ "height": "140px" }} primaryXAxis={{ valueType: 'Category' }}>
//                 <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}/>
//                 <SeriesCollectionDirective>
//                     <SeriesDirective dataSource={chartData} xName='month' yName='sales' type='Column'/>
//                 </SeriesCollectionDirective>
//             </ChartComponent>
//         </div>);
// }
render() {
    return (<div>
    
      <MDBBreadcrumb style={{ backgroundColor: '#fff' }}>
                <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active> Dashboard</MDBBreadcrumbItem>
            </MDBBreadcrumb>  
        
        {/* <MDBContainer size="lg">
            <div>
        <div className="inline" id="control">
          <DashboardLayoutComponent id='dashboard_layout' ref={s => (this.dashboardObj = s)} cellSpacing={this.cellSpacing} panels={this.panels} allowResizing={true} columns={4} resizableHandles={this.resize}/>
        </div>
        <div className="inline" id="properties">
            <table>
              <tbody>
                <tr>
                    <td>SizeX</td>
                    <td> <NumericTextBoxComponent ref={s => (this.sizeXObj = s)} className="col-sm-4" placeholder={"Ex: 10"} value={1} min={1} max={4} floatLabelType="Never" id="sizeX"/></td>
                </tr>
                <tr>
                    <td>SizeY</td>
                    <td> <NumericTextBoxComponent ref={s => (this.sizeYObj = s)} className="col-sm-4" placeholder={"Ex: 10"} value={1} min={1} max={4} floatLabelType="Never" id="sizeY"/></td>
                </tr>
                <tr>
                    <td>Row</td>
                    <td> <NumericTextBoxComponent ref={s => (this.rowObj = s)} className="col-sm-4" placeholder={"Ex: 10"} value={0} min={0} max={3} floatLabelType="Never" id="row"/></td>
                </tr>
                <tr>
                    <td>Column</td>
                    <td> <NumericTextBoxComponent ref={s => (this.colsObj = s)} className="col-sm-4" placeholder={"Ex: 10"} value={0} min={0} max={3} floatLabelType="Never" id="column"/></td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <button onClick={this.onAdd}>Add Panel</button>
                    </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                    <td>Id</td>
                    <td> <DropDownListComponent ref={s => (this.paneObj = s)} className="col-sm-4" placeholder={"panel id"} dataSource={this.data} floatLabelType="Never" id="panel_id"/>
                    
                    
                    </td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <button onClick={this.onRemove}>Remove Panel</button>
                    </td>
                </tr>
              </tbody>
            </table>
        </div></div>

        <Plotlyexemple/>

        </MDBContainer> */}
    </div>);
}
}
export default SuperviseurPlotly;