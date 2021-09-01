import React from 'react';
import { connect } from 'react-redux';
import EventItem from '../../../components/EventItem/EventItem';
import Footer from '../../../components/Footer/Footer';
import NavigationBar from "../../../components/ForMobile/NavigationBar/NavigationBar";
import Header from '../../../components/Header/Header';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { fillEventOrganizer } from "../../../redux/actions/transaction/transaction";
import { getAllEvents } from "../../../services/EventService";
import '../AllEO/AllEO.scss';

class AllEO extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			event_organizers: [],
			content: <LoadingSpinner className="my-5" />,
		};
	}

	async componentDidMount() {
		let response = await getAllEvents()
		this.setState({event_organizers: response.data},()=>{
			this.setState({content:
					<div className="all-eo">
						<Header />
						<div className="eo-header">
							<div className="first-comp"></div>
							<div className="second-comp">
								<div className="signature-color-background">
									<h1 className="text-white bold-text">Event Organizers</h1>
									<p className="text-white">
										We offers you various event organizers service for your events to be memorable and special
									</p>
								</div>
							</div>
						</div>

						<div className='container-alleo mt-5 mb-5'>
							<h5>Pilih Event</h5>

							{this.state.event_organizers?.map((event_organizer, key) => (
								<div onClick={()=>this.props.fillEventOrganizer(event_organizer.event_organizer_id)}>
									<EventItem
										key={key}
										image={event_organizer.event_organizer_image}
										name={event_organizer.event_organizer_name}
										link={'/event-organizer/' + event_organizer.event_organizer_route}
										description={event_organizer.event_organizer_description}
									/>
								</div>
							))}
						</div>

						<NavigationBar/>
					</div>
					})
		})
	}

	render() {
		return (
			<React.Fragment>
				{this.state.content}
			</React.Fragment>
		);
	}
}

export default connect(null, {fillEventOrganizer})(AllEO);
