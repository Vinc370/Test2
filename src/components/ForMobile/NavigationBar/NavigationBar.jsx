import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import CartIcon from '../../../assets/icons/CartIcon';
import HomeIcon from '../../../assets/icons/HomeIcon';
import NotificationAlertIcon from '../../../assets/icons/NotificationAlertIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import "../NavigationBar/NavigationBar.scss";

class NavigationBar extends React.Component{
    render(){
        return(
          <div className="navigation-bar">
              <div className='align-horizontally'>
                  <Col className='align-vertically align-center menu'>
                      <Link to='/'>
                          <div className={`d-flex align-center icon ${this.props?.active === 'home' ? 'active' : ''}`}>
                            <HomeIcon />
                          </div>
                          <p className={`text-center text ${this.props?.active === 'home' ? 'active' : ''}`}>Home</p>
                      </Link>
                  </Col>

                  <Col className='align-vertically align-center menu' >
                      <Link to='/keranjang'>
                          <div className={`d-flex align-center icon ${this.props?.active === 'keranjang' ? 'active' : ''}`}>
                            <CartIcon />
                            {
                                this.props.customOrder !== "" && this.props.customOrder !== null &&
                                <NotificationAlertIcon string="!" className="position-absolute mb-3 ml-3"/>
                            }
                          </div>
                          <p className={`text-center text ${this.props?.active === 'keranjang' ? 'active' : ''}`}>Keranjang</p>
                      </Link>
                  </Col>

                  <Col className='align-vertically align-center menu '>
                      <Link to='/akun'>
                          <div className={`d-flex align-center icon ${this.props?.active === 'akun' ? 'active' : ''}`}>
                            <ProfileIcon />
                            {
                                this.props.accountAlert === true &&
                                <NotificationAlertIcon string="!" className="position-absolute mb-3 ml-3"/>
                            }
                          </div>
                          <p className={`text-center text ${this.props?.active === 'akun' ? 'active' : ''}`}>Akun</p>
                      </Link>
                  </Col>

                  {/* <Col className='align-vertically align-center menu'>
                      <a href='https://littlecloudeo.com/company/faq' target='_blank'>
                          <div className="d-flex align-center">
                            <Image src={BlogIcon} style={{height: "18"}}/>
                          </div>
                          <p className='text-center'>Blog</p>
                      </a>
                  </Col> */}
              </div>
          </div>
        );
    }
}

const mapStateToProps = state =>({
    customOrder: state.authentication.customOrder,
    accountAlert: state.authentication.accountAlert
})
  
export default connect(mapStateToProps, null)(NavigationBar);