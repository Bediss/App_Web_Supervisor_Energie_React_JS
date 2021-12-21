import 'react-tabulator/lib/styles.css';
import React,{useEffect,useState} from "react"
import { ReactTabulator,reactFormatter } from 'react-tabulator'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



const A = () => {
    return (<AA/>  );
}
 
export default A;
const AAAAAA = ({toggle,modal,sss}) => {
useEffect(() => {
  console.log(sss)
}, [sss])

function sssfun(){
sss.getRow().delete();
toggle()
}
    return ( <MDBContainer>

        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
            (...) 
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={sssfun}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
       );
}
 
const SimpleButton = () => {
    return ( <div>dddd</div> );
}
 
class AA extends React.Component {
    constructor(props){
        super(props)
        this.state={
            selected:null,
            modal:false,
            sss:"",
            columns : [
                { title: "Name", field: "name", width: 150 ,cellClick:(e,cell)=>{
                this.table.current.table.updateData([{name:"Margret Marmajuke", age:"5000"}]);

                }},
                { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
                { title: "Favourite Color", field: "col" },
                { title: "Date Of Birth", field: "dob", hozAlign: "center" },
                { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
                { title: "Passed?", field: "passed", hozAlign: "center", formatter: reactFormatter(
                    <SimpleButton table={this.table} />
                  )
                  ,cellClick:(e,cell)=>{
                    console.log(cell)
                    this.toggle()
                    this.qqq(cell)
                    //this.setState({toggle:true})
                  //  cell.getRow().delete();
                } 
            }
              ],
              data : [
                {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
                {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
              ]
        }
        this.table = React.createRef();
        this.click=this.click.bind(this)
        this.click2=this.click2.bind(this)
        // this.aaa=this.aaa.bind(this)
    }

    click(e,cell){
        // console.log(cell)
        // console.log(e)
        // this.table.current.table.updateData([{name:"Margret Marmajuke", age:"5000"}]);
    }
    click2(e,row){
        // this.table.current.table.addRow({}, true);
        this.setState({selected:row.getData().name})
        console.log(row.getData().name)
        // console.log(row)
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
      qqq = (nnn)=>{
this.setState({sss:nnn})
      }
      add=()=>{
            this.table.current.table.addRow({id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"}, true);
      }
    render() { 
        return <div><ReactTabulator
        ref={this.table}
        cellClick={this.click}
        rowClick={this.click2}
        data={this.state.data}
        columns={this.state.columns}
        layout={"fitData"}
        index={"name"}
        />
        <AAAAAA toggle={this.toggle}  modal={this.state.modal} sss={this.state.sss}/>
        <button style={{width:"100px",height:"100px"}} onClick={this.add}></button>
        </div>;
    }
}
