import React from 'react'
import Header from "../../components/Header/Header";
import {FaWhatsapp} from "react-icons/all";
import {Button, Container, Form} from "react-bootstrap";
import HeaderNavigation from "../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import ReactWhatsapp from "react-whatsapp";
import Footer from "../../components/Footer/Footer";

class WhatsappForm extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            name:'',
            message: '',
        }
    }

    handleMessage=(event)=>{
        this.setState({name: event.target.value, message:
              "Halo nama saya "+this.state.name+ ", saya ingin melakukan " +
              "request meeting untuk mendiskusikan berjalannya acara saya nanti" +
              " dengan jasa event organizer yang anda sediakan. "})
    }

    render(){
        return(
            <div className='request-meeting'>
                <Header/>
                <HeaderNavigation title='Request Meeting'/>

                <div className="up-bottom-margin mt-sm-5 mb-sm-5">
                    <div className="d-flex align-center up-bottom-margin">
                        <FaWhatsapp size={80} className='text-success'/>
                    </div>

                    <p className='text-center bold-text bigger-text'>Silahkan isi data anda di bawah ini untuk terhubung dengan Whatsapp kami</p>

                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Alamat e-mail</Form.Label>
                                <Form.Control type="email" placeholder="Isi email" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" placeholder="Isi nama" value={this.state.name} onChange={this.handleMessage} />
                            </Form.Group>

                            <div className="d-flex align-center">
                                <ReactWhatsapp number='0833847298347'
                                    message={this.state.message}>
                                    <Button variant="success" type="submit">
                                        <FaWhatsapp size={30}/>
                                        &nbsp;Whatsapp
                                    </Button>
                                </ReactWhatsapp>
                            </div>
                        </Form>
                    </Container>
                </div>
                
            </div>
        );
    }
}

export default WhatsappForm