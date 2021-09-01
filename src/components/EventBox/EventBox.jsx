import React  from 'react';
import "../EventBox/EventBox.scss"
import {Image} from "react-bootstrap";
import {link} from "../../sources/Variables";
import {Link} from "react-router-dom";

class EventBox extends React.Component{

    render(){
        return(
          <Link
            to={this.props.link}
            className='event-box-contain'
            style={{
              cursor: 'pointer'
            }}
          >
            <div className="image-container">
              <img src={this.props.background} alt="ilustration" />
            </div>
            <label
              className='small text-center'
              style={{
                cursor: 'pointer'
              }}
            >
              {this.props.title}
            </label>
            {/* <div
              className='event-box'
              style={this.props.background ? {
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${this.props.background})`, backgroundSize: `100% 100%`, height: '100%'
              } : undefined}
            >
              <div className="event-box-content">
                <Link to={this.props.link}>
                  <Image src={link + '/img/storage/' + this.props.source} />
                </Link>
              </div>
            </div> */}
          </Link>
        )
    }
}

export default EventBox;