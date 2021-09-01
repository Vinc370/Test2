import React from "react";
import { Container, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginAuth from '../../assets/images/login-auth.jpg';
import RoundedButton from "../../components/Button/RoundedButton";
import HeaderNavigationV2 from "../../components/ForMobile/HeaderNavigation/HeaderNavigationV2";
import NavigationBar from "../../components/ForMobile/NavigationBar/NavigationBar";
import Header from "../../components/Header/Header";
import './MustLogin.scss'

function MustLogin({ }) {
  return(
    <div>
      <Header/>
      <HeaderNavigationV2
          title={'Silakan Login'}
          isBlack
        />

      <Container className='p-5 must-login-container'>
        <div className='up-bottom-margin d-flex flex-column align-center'>
          <div className="up-bottom-padding d-flex justify-content-center">
            <Image src={LoginAuth} className='w-50'/>
          </div>

          <div className="must-login-bottom">
            <p className='text-center'><i><b>Saat ini anda belum melakukan login pada website</b></i>, mohon untuk melakukan login terlebih dahulu sebelum melakukan proses transaksi</p>

            <Link className='text-primary' to={'/login'} className="w-100">
              <RoundedButton 
                  text="Login Disini"
              />
            </Link>
          </div>
        </div>
      </Container>

      {/*  */}
      <NavigationBar/>
    </div>
  );
}

export default connect(null, {})(MustLogin)