import React  from 'react';
import ".//CustomImage.scss"
import {Image} from "react-bootstrap";
import {link} from "../../sources/Variables";
import {Link} from "react-router-dom";

class CustomImage extends React.Component{

    render(){
        return(
            <div className='small-image-banner' style={{ width: this.props.width, height: this.props.height, margin: this.props.margin }}>
                <Link to={this.props.link ?? '/'}>
                    <Image src={link + '/img/storage/' + this.props.source} fluid style={{borderRadius:this.props.borderRadius}}/>
                    {
                        this.props.customContent || null
                    }
                </Link>
            </div>
        );
    }
}

export default CustomImage;