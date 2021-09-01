import React from 'react';
import { connect } from 'react-redux';
import HeaderNavigationV2 from "../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2";
import Header from "../../../components/Header/Header";
import DesktopAccountSidebar from '../components/DesktopAccountSidebar';

function AccountMain({ title, sidebar, item }) {
  
  return (
    <>
        <>

        <Header/>
        <HeaderNavigationV2 title={title} isBlack/>

        <div className="update-akun-saya general-container">
          <div className="d-desktop title">
            <h1 className="section-title__primary">{title}</h1>
          </div>

          <DesktopAccountSidebar
            active={sidebar}
          />

        <span className="right-container">
            {item}
        </span>
        </div>
      </>
    </>
  );
}

export default connect(null,null)(AccountMain)
