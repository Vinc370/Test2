import React from 'react'
import SearchBox from "../../components/ForMobile/SearchBox/SearchBox";
import {Link} from "react-router-dom";
import {link} from "../../sources/Variables";
import axios from "axios";
import NavigationBar from "../../components/ForMobile/NavigationBar/NavigationBar";
import { processWords } from '../../utilities/Utilities';

class SearchPage extends React.Component{

  state = {
    keyword:'',
    data:[]
  }

  handleInput=(name, input)=>{

    if(input === ''){
      return this.clearData()
    }

    var th= this;
    var url = link + '/api/search'

    var formData = new FormData()
    this.setState({[name]: input}, ()=>{
      formData.append('keyword', this.state.keyword)
    })

    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: { 'Content-Type': 'application/json' },
    }).then(function(response) {
      th.setState({
        data: response.data
      })
    })
  }

  clearData=()=>{
    this.setState({
      data: []
    })
  }
  render() {
    return(
      <div className="search__container">
        <SearchBox handleChange={(e)=>this.handleInput('keyword', e.currentTarget.value)}/>

        {this.state.data.map((data)=>(
          <div className='m-4 search-result'>
            <Link to={processWords(data.prefix + data.link)} className='text-info'>{data.name}</Link>
          </div>
        ))}

        <NavigationBar/>
      </div>
    )
  }
}

export default SearchPage