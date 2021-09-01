import React  from 'react';
import {FaAngleLeft} from "react-icons/fa";
import './HeaderNavigation.scss'
import { withRouter } from 'react-router-dom'

class HeaderNavigation extends React.Component{
    render() {
        return(
          <div className='container-header-navigation' style={{
            width: "100vw"
          }}>
            <div className='header-navigation signature-color-background align-horizontally'>
              <div className='text-white p-3' onClick={()=>this.props.history.goBack()}>
                &lt;
              </div>
              <p className='text-white vertical-center m-0'>{this.props.title}</p>
            </div>
          </div>
        );
    }
}

export default withRouter(HeaderNavigation);