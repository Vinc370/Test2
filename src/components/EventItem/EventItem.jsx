import React  from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import '../EventItem/EventItem.scss';
import { link } from '../../sources/Variables';
import {Link} from "react-router-dom";

class EventItem extends React.Component {
	render() {
		return (
			<Link to={this.props.link} >
				<div className="up-bottom-padding event-item-component">
					<Container fluid className="event-item">
						<Row>
							<Col sm={6}>
								<Image src={link + '/img/storage/' + this.props.image} />
							</Col>
							<Col sm={6} className='vertical-center'>
								<div className="description-event-box">
									<div className="for-col">
										<h1 className='font-weight-bold'>{this.props.name}</h1>
										<p className="subtitle-text font-weight-bold text-success m-0">{this.props.price}</p>
										<p className="font-italic text-secondary m-0">{this.props.description}</p>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</Link>
		);
	}
}

export default EventItem;
