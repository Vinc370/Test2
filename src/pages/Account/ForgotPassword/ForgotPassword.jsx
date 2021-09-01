import React, {Component} from 'react';
import {Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import LogoHeader from "../../../components/Header/Desktop/LogoHeader/LogoHeader";
import RoundedButton from "../../../components/Button/RoundedButton";
import {getOTP, resetPassword} from "../../../services/UserService";
import Swal from "sweetalert2";
import "./ForgotPassword.scss"

class ForgotPassword extends Component {

  state = {
    email: '',
    otp: '',
    new_password: '',
    step: 1
  }

  constructor(props) {
    super(props);
    this.getOTP = this.getOTP.bind(this)
    this.setNewPassword = this.setNewPassword.bind(this)
  }

  handleInput=(name, value)=>{
    this.setState({[name]: value})
  }

  renderForm=(name,type,buttonFor, action, input)=>{
    return (
      <Form
        id='reset'
        className="my-3 position-relative"
        onSubmit={e=>action(e)}
      >
        <FormLabel className="font-signature-color mb-3 bigger-text font-weight-bold">Reset Password</FormLabel>
        <FormGroup>
          <FormControl type={type}
             onChange={ e=> this.handleInput(input, e.currentTarget.value)}
             border={['bottom']}
             placeholder={name}
          />
        </FormGroup>

        <div className="text-danger text-center small font-italic">
        </div>

        <Container className="d-flex justify-content-center mt-5 mt-md-6">
          <RoundedButton
            text={buttonFor}
            color="orange"
            large
            style={{
              width: '75%'
            }}
            type="submit"
          />
        </Container>
      </Form>
    )
  }

  async getOTP(e){
    e.preventDefault();
    var body = new FormData()
    body.append('email',this.state.email)
    try{
      await getOTP(body)
      this.setState({
        step: 2
      })
      document.getElementById('reset').reset()
    }catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Email is not registered',
        text: 'Please make sure you input the right email',
        timer: 3000,
      })
    }
  }

  setOTP=(e)=>{
    e.preventDefault()

    this.setState({
      step: 3
    })
    document.getElementById('reset').reset()
  }

  async setNewPassword(e){
    e.preventDefault()

    var body = new FormData()
    body.append('email', this.state.email)
    body.append('otp', this.state.otp)
    body.append('newPassword', this.state.new_password)
    let response = await resetPassword(body)

    if(response.data === "Expire OTP"){
      Swal.fire({
        icon: 'error',
        title: 'Your OTP has expired',
        text: 'Please repeat the steps again',
        timer: 3000,
      })
    }else if(response.data === "Wrong OTP"){
      Swal.fire({
        icon: 'error',
        title: 'Wrong OTP',
        text: 'Please make sure you input the right OTP',
        timer: 3000,
      })
    }

    this.props.history.push('/login')
  }

  renderStep = () => {
    if(this.state.step === 1){
      return this.renderForm("Email","email","Get OTP", this.getOTP, "email")
    }else if(this.state.step === 2){
      return this.renderForm("OTP","otp","Send OTP",this.setOTP, "otp")
    }else if(this.state.step === 3){
      return this.renderForm("New Password","password","Create new password", this.setNewPassword,"new_password")
    }
  }

  render() {
    return (
      <div className='forgot-password'>
        <div className='header'>
          <LogoHeader/>
        </div>
        <HeaderNavigation title="Forgot Password"/>
        <Container className='py-3 py-sm-4 py-md-5'>
          <Row>
            <Col lg={7}>
              {this.renderStep()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;