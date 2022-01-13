
import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBRow, MDBCol, MDBInput } from "mdbreact";
import square from "../../images/squaresymbol.png"
import divide from "../../images/divide.png"
import "./button.css"
class Button extends React.Component {
    //send number
    sendData = (param) => {
       
        this.props.parentCallback(param);
        //this.props.
        console.log(param)
        this.setState({ prevvalue: param });
        //this.setState({ typeprevvalue: param });

        //console.log(parentCallback)
    }
    //exemple cos sin ...
    sendfunction = (param) => {     
        console.log('---------------------------',param)
        this.props.operatorfunction([param,'(']);
        //this.props.
        console.log([param,'('])
        // this.setState({ prevvalue: param });
        //this.setState({ typeprevvalue: param });
        //console.log(parentCallback)
    }
    // exemple + - * 
    sendoperator = (param) =>{
       // if(this.state.prevvalue !== param ){
            this.props.sendoperator(param);
            //this.props.parentCallback(type);
            console.log(param)
            //console.log(type)
            //console.log(this.state.param)
            this.setState({ prevvalue: param });
            
           // }
    }
    /*  handleChange(event) {
         this.setState({ [event.target.name]: event.target.value });
       } */
    
    constructor(props) {
        super(props);
        this.state = {
            operateur:'operateur',
            prevvalue: '',
            //typeprevvalue:'',
            btnsin1: 'ArcSin',
            btnsin: 'Sin',
            btncos: 'Cos',
            btntan: 'Tan',

            btncos1: 'ArcCos',
            btnlog: 'Log',
            btnexp: 'Exp',
            btntan1: 'ArcTan',

            btnmod: 'Mod',
            btnsqrt: 'Sqrt',
            btnvide: '',
            btndiv: '/',

            btn7: 7,
            btn8: 8,
            btn9: 9,
            btnmultiplication: '*',

            btn4: 4,
            btn5: 5,
            btn6: 6,
            btnsubstraction: '-',

            btn1: 1,
            btn2: 2,
            btn3: 3,
            btnaddition: '+',

            btnvirgule: '.',
            btn0: 0,
            btnparenthesisopen: '(',
            btnparenthesisclose: ')',






        };
        this.sendData = this.sendData.bind(this);
        this.sendfunction = this.sendfunction.bind(this);
        //     this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div style={{ margin: 0 + 'px', padding: 0 + 'px' }} >
                
                <MDBContainer style={{ margin: 0 + 'px', padding: 0 + 'px',backgroundColor: "#fff" }}>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: '25%', fontSize: '12px', textAlign: 'center' }} name='sin-1' onClick={() => this.sendfunction(this.state.btnsin1)} >sin-1</MDBBtn>
                        <MDBBtn outline className=" m-0 px-0  btn-md" style={{ width: '25%', fontSize: '12px', textAlign: 'center' }} /*onClick={() => this.sendfunction({ count: this.state.count + 1 })}*/ onClick={() => this.sendfunction(this.state.btnsin)}>sin</MDBBtn>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btncos)}>cos</MDBBtn>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btntan)}>tan</MDBBtn>
                    </MDBRow>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btncos1)}>cos-1</MDBBtn>
                        <MDBBtn outline className=" m-0 px-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btnlog)}>log</MDBBtn>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btnexp)}>Exp</MDBBtn>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btntan1)}>tan-1</MDBBtn>
                    </MDBRow>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0 p-0  btn-md" style={{ width: ' 25%', fontSize: '12px', textAlign: 'center' }} onClick={() => this.sendfunction(this.state.btnmod)} >Mod</MDBBtn>
                        <MDBBtn outline className=" m-0 px-0 btn-md" style={{ width: ' 25%', textAlign: 'center' }}><img src={square} alt="square" onClick={() => this.sendfunction(this.state.btnsqrt)} /></MDBBtn>
                        <MDBBtn outline className=" m-0 p-0 btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btnvide)}></MDBBtn>
                        <MDBBtn outline className=" m-0 px-0 btn-md" style={{ width: ' 25%', textAlign: 'center' }}><img src={divide} alt="divide" onClick={() => this.sendoperator(this.state.btndiv)} /></MDBBtn>
                    </MDBRow>

                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn7)}>7</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn8)}>8</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn9)}>9</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendoperator(this.state.btnmultiplication)}>*</MDBBtn>
                    </MDBRow>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn4)}>4</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn5)}>5</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn6)}>6</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendoperator(this.state.btnsubstraction)}>-</MDBBtn>
                    </MDBRow>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn1)}>1</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn2)}>2</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn3)}>3</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendoperator(this.state.btnaddition)}>+</MDBBtn>
                    </MDBRow>
                    <MDBRow style={{ margin: 0 + 'em', width: '98%' }}>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendoperator(this.state.btnvirgule)}>,</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btn0)}>0</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btnparenthesisopen)}>(</MDBBtn>
                        <MDBBtn outline className=" m-0  btn-md" style={{ width: ' 25%' }} onClick={() => this.sendData(this.state.btnparenthesisclose)}>)</MDBBtn>
                    </MDBRow>

                </MDBContainer>
            </div>
        );
    }
};

export default Button;


