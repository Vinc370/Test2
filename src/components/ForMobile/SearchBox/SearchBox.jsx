import React from 'react'
import "../SearchBox/SearchBox.scss"
import {FaSearch} from "react-icons/fa";
import {withRouter} from "react-router-dom";

class SearchBox extends React.Component{

  getCurr=()=>{
    var curr = window.location.href.substring(window.location.href.lastIndexOf('/'));
    return curr
  }

  movePage=()=>{
    if(this.getCurr() === '/'){
      window.location.href = window.location.href + 'search'
    }
  }

  getBottomMargin = ()=>{
    if(this.getCurr()==='/'){
      return '5em'
    }
    return ''
  }
  render() {
    return(
      <div className="search border-bottom">
        <div className='container-search signature-color-background'>
          <div className={"search-box align-horizontally"}>
            <FaSearch size={25} color='#a3a2a2' className='padd-left'/>
            <input type="text" placeholder='Search'
                   onClick={()=>this.movePage()}
                   onChange={this.props.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBox);