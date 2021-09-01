import React from 'react';
import { Carousel } from "react-bootstrap";
import MetaTags from 'react-meta-tags';
import CardImage from '../../../components/Card/CardImage';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Header from "../../../components/Header/Header";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { getAllEventPackages } from "../../../services/EventService";
import UrlService from '../../../services/UrlService';
import { getAllMappingVendors } from '../../../services/VendorService';
import { getMoneyFormat, processWords } from "../../../utilities/Utilities";
import './PackageEO.scss';

class PackageEO extends React.Component{
    constructor(props) {
			super(props);
			this.state = {
				event_organizer: {
					package_event_organizer: [],
				},
				content: <LoadingSpinner className="my-5" />,
				vendors: [],
			};
    }

    async componentDidMount() {
		let response = await getAllEventPackages(this.props.match.params.event_organizer_route)

		let vendorResponse = await getAllMappingVendors({vendor_connect_type: 'event_organizers', event_organizer_id: response.data.event_organizer_id});
        this.setState({vendors: vendorResponse.data})

			this.setState({event_organizer: response.data},()=>{
				this.setState({content:
					<>
						<MetaTags>
							<meta name="title" content={"Tes"}/>
							<meta name="description" content={this.state.event_organizer.event_organizer_meta_description} />
						</MetaTags>
						<Header
							showNewMobile
							type="white"
						/>
						<div className="package-eo">
							<Carousel>
								{this.state.event_organizer.event_organizer_banner_description?.map((banner, key) => (
									<Carousel.Item>
										<div className="package-eo__carousel-item" key={key}>
											<img
												className="d-block w-100"
												src={UrlService.getImageUrl(banner.source)}
												alt={banner.description}
											/>
											<div className="backdrop" />
											<div className="details">
												{/* TODO: --demas-- ini masih placeholder */}
												<p className="title">
													{banner.description}
												</p>
												<a href="https://www.instagram.com/littlecloudeo" className="subtitle" target="_blank" rel="noopener noreferrer">
													+ LIHAT SELENGKAPNYA
												</a>
											</div>
										</div>
									</Carousel.Item>
								))}
							</Carousel>

							<div className="container-alleo general-desktop-container">
								{/*<div className="d-mobile-p-eo top-card-container">*/}
								{/*	/!* TODO: --demas-- belum ada endpoint nya dan data masih placeholder *!/*/}
								{/*	<Link*/}
								{/*		to="/"*/}
								{/*		className="top-card"*/}
								{/*	>*/}
								{/*		<img*/}
								{/*			src="https://placeimg.com/200/200/any"*/}
								{/*			alt="card images"*/}
								{/*		/>*/}
								{/*		<div className="backdrop" />*/}
								{/*		<div className="title">*/}
								{/*			Konsul Acara & Dekor*/}
								{/*			<RightArrowBold className="icon" />*/}
								{/*		</div>*/}
								{/*	</Link>*/}
								{/*	/!* TODO: --demas-- belum ada endpoint nya *!/*/}
								{/*	<Link*/}
								{/*		to="/"*/}
								{/*		className="top-card"*/}
								{/*	>*/}
								{/*		<img*/}
								{/*			src="https://placeimg.com/201/201/any"*/}
								{/*			alt="card images"*/}
								{/*		/>*/}
								{/*		<div className="backdrop" />*/}
								{/*		<div className="title">*/}
								{/*			Susun Booklet*/}
								{/*			<RightArrowBold className="icon" />*/}
								{/*		</div>*/}
								{/*	</Link>*/}
								{/*</div>*/}
								{/* <div className="d-desktop-p-eo sub-header-container">
									<p>Mulai Perencanaan untuk Pernikahanmu!</p>
									<div className="package-eo-images-container">
										<div
											className="image-item"
											style={{
												backgroundImage: 'url(https://placeimg.com/400/400/any)'
											}}
										>
											<div className="overlay" />
											<p>
												Konsul Acara & Dekor
											</p>
										</div>
										<div
											className="image-item"
											style={{
												backgroundImage: 'url(https://placeimg.com/401/401/any)'
											}}
										>
											<div className="overlay" />
											<p>
												Susun Booklet
											</p>
										</div>
									</div>
								</div> */}

								<div className="section-title__container">
									<h5 className='section-title__primary event-package'>Event Package</h5>
									<div className="see-all d-desktop-p-eo">
										{/* See All <span className="chevron-icon"><ChevronIcon /></span> */}
									</div>
								</div>

								{/* <div className="d-desktop-p-eo">
									{this.state.event_organizer.package_event_organizer?.map((package_event_organizer, key) => (
										<EventItem
											key={key}
											image={package_event_organizer.package_event_organizer_image}
											name={package_event_organizer.package_event_organizer_name}
											price={getMoneyFormat(package_event_organizer.package_event_organizer_price)}
											link={
												'/event-organizer/' + processWords(this.state.event_organizer.event_organizer_name) + '/' + processWords(package_event_organizer.package_event_organizer_name) + "/" +
												package_event_organizer.package_event_organizer_id
											}
											description={package_event_organizer.package_event_organizer_description}
										/>
									))}
								</div> */}

								<div className="event-package-list">
									{this.state.event_organizer.package_event_organizer?.map((package_event_organizer, key) => (
										<div className="item rounded-2" key={key}>
											<CardImage
												key={key}
												title={(
													<>
														<span className="eo-package-title">
															{package_event_organizer.package_event_organizer_name}
														</span>
														<span className="eo-package-capacity">
															{package_event_organizer.package_event_organizers_min_pax} - {package_event_organizer.package_event_organizers_max_pax} pax
														</span>
													</>
												)}
												text={(
													<>
														<span className="eo-package-price-promo">
															{getMoneyFormat(package_event_organizer.package_event_organizer_price_promo)}
														</span>
														{
															package_event_organizer.package_event_organizer_price !== package_event_organizer.package_event_organizer_price_promo &&
																<span className="eo-package-price">
																	{getMoneyFormat(package_event_organizer.package_event_organizer_price)}
																</span>
														}
													</>
												)}
												isPromo={package_event_organizer.promotion_id !== null}
												promoLeft={Math.round((new Date(package_event_organizer.promotion?.promotion_end_date) - new Date())/86400000)}
												source={package_event_organizer.package_event_organizer_image}
												linkDestination={'/event-organizer/' + processWords(this.state.event_organizer.event_organizer_name)  + '/' + processWords(package_event_organizer.package_event_organizer_name) + '/' + package_event_organizer.package_event_organizer_id}
												titleStyle = {{color: 'white', fontSize: 'larger'}}
												textStyle = {{color: 'white', fontSize: 'larger'}}
												imageClass={'overlay-background'}
											/>
										</div>
									))}
								</div>

								{/* <div className="section-title__container">
									<h5 className='section-title__primary event-package'>Pilih Konsep Acaramu!</h5>
									<div className="see-all d-desktop-p-eo">
										See All <span className="chevron-icon"><ChevronIcon /></span>
									</div>
								</div>
								<div className="slider-container d-mobile-p-eo">
									<Slider
										infinite={false}
										slidesToShow={1.2}
										slidesToScroll={1}
										cssEase='linear'
										arrows={false}
									>
										<DecorationThemeCard
											title="Sage Green"
											imgUrl="https://placeimg.com/400/400/people"
											colors={['#C4C4C4', '#A2D13F', '#4E6421']}
										/>
										<DecorationThemeCard
											title="Sage Green"
											imgUrl="https://placeimg.com/400/400/people"
											colors={['#C4C4C4', '#A2D13F', '#4E6421']}
										/>
										<DecorationThemeCard
											title="Sage Green"
											imgUrl="https://placeimg.com/400/400/people"
											colors={['#C4C4C4', '#A2D13F', '#4E6421']}
										/>
									</Slider>
								</div>
								<div className="event-concept d-desktop-p-eo">
									<DecorationThemeCard
										title="Sage Green"
										imgUrl="https://placeimg.com/400/400/people"
										colors={['#C4C4C4', '#A2D13F', '#4E6421']}
									/>
									<DecorationThemeCard
										title="Sage Green"
										imgUrl="https://placeimg.com/400/400/people"
										colors={['#C4C4C4', '#A2D13F', '#4E6421']}
									/>
									<DecorationThemeCard
										title="Sage Green"
										imgUrl="https://placeimg.com/400/400/people"
										colors={['#C4C4C4', '#A2D13F', '#4E6421']}
									/>
								</div> */}

								<h5 className='section-title__primary event-package'>
									Vendor
								</h5>
								<div className="vendor-acara">
									{this.state.vendors?.slice(0, 4)?.map((vendor, key) => (
									<CustomImage
										source={vendor.vendor_image}
										link={'/vendor/' + vendor.vendor_route}
										customContent={(
											<>
											<div className="overlay" />
											<p >{vendor.vendor_name}</p>
											</>
										)}
									/>
									))}
								</div>
							</div>
						</div>
					</>
				})
			})
    }

    render(){
    	return (
    		<React.Fragment>
				{this.state.content}
			</React.Fragment>
			);
    }
}

export default PackageEO;