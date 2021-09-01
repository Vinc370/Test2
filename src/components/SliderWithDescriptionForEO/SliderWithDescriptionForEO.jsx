import React  from 'react';
import './/SliderWithDescriptionForEO.scss';
import { link } from '../../sources/Variables';
import {Button, Col, Row} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {fillPackageEventOrganizerTheme} from "../../redux/actions/transaction/transaction";
import {connect} from 'react-redux'

class SliderWithDescriptionForEO extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currImg: 0,
		};
	}

	leftClick = () => {
		this.setState((prevState) => ({
			currImg: prevState.currImg === 0 ? this.props.package_event_organizer_theme.length - 1 : prevState.currImg - 1,
		}));
	};

	rightClick = () => {
		this.setState((prevState) => ({
			currImg: prevState.currImg === this.props.package_event_organizer_theme.length - 1 ? 0 : prevState.currImg + 1,
		}));
	};

	processPackageEventOrganizerTheme=(id)=>{
		this.props.fillPackageEventOrganizerTheme(id)
	}

	render() {
    return (
		<Row className='slider'>
			<Col>
				<h5 className='mb-3'>Pilih tema: </h5>
				<div className='d-flex'>
					<Col xs={1} className='d-flex align-items-center'>
						<i className="fa fa-chevron-left fa-2x hover-gray" onClick={() => this.leftClick()}></i>
					</Col>
					<Col xs={10} className='d-flex align-center image-container' >
						<img
							src={
								link + '/img/storage/' + this.props.package_event_organizer_theme[this.state.currImg].package_event_organizer_theme_photo
							}
							alt={this.props.package_event_organizer_theme.package_event_organizer_theme_name}
							className="pl-2 pr-2"/>
					</Col>
					<Col xs={1} className='d-flex align-items-center'>
						<i className="fa fa-chevron-right fa-2x hover-gray" onClick={() => this.rightClick()}></i>
					</Col>
				</div>
			</Col>
			<br/>
			<Col className="">
				<div className='event-theme-description'>
					<h4>{this.props.package_event_organizer_theme[this.state.currImg].package_event_organizer_theme_name}</h4>
						<Button className="btn-success m-2" onClick={()=>this.processPackageEventOrganizerTheme(this.props.package_event_organizer_theme[this.state.currImg].package_event_organizer_theme_id)}>
							<Link>
								Pilih
							</Link>
						</Button>
					<div className="align-horizontally">
						<div className="left-right-padding">
							<input type="checkbox"/>
						</div>
						<p>Saya ingin mengcustom dekorasi</p>
					</div>
				</div>
			</Col>
		</Row>
	);
	}
}

export default connect(null,{fillPackageEventOrganizerTheme})(SliderWithDescriptionForEO);
