import React from 'react';
import {Alert} from "react-bootstrap";

class DraftInformation extends React.Component{
    render(){
        return(
            <Alert variant={this.props.variant} className='mt-0'>
                <div className="align-horizontally">
                    <p className='m-0 '>{this.props.information}</p>
                </div>
            </Alert>
        );
    }
}

export default DraftInformation;