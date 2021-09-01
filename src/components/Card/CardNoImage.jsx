import React  from 'react';
import {Card} from "react-bootstrap";

class CardNoImage extends React.Component{
    render() {
        return(
            <Card className='w-100 mb-4'>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text className='small-italic-grey-text'>
                        {this.props.text}
                    </Card.Text>
                    <Card.Link href={this.props.linkDestination} style={{color: '#007bff'}} target='_blank'>
                        {this.props.link}
                    </Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

export default CardNoImage;