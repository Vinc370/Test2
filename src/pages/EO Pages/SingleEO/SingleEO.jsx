import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaAngleRight } from "react-icons/fa";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ShareIcon from '../../../../src/assets/icons/ShareIcon';
import GalleryIcon from '../../../assets/icons/GalleryIcon';
import RightArrowBold from "../../../assets/icons/RightArrowBold";
import DecorationThemeCard from "../../../components/Card/DecorationThemeCard";
import NewCarousel from "../../../components/Carousel/NewCarousel";
import CustomImage from '../../../components/CustomImage/CustomImage';
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import Header from '../../../components/Header/Header';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ShareModal from '../../../components/ShareModal/ShareModal';
import useWindowSize from '../../../hooks/useWindowSize';
import { fillEventNotes, fillEventOrganizer, fillPackageEventOrganizer, isBookingEvent } from "../../../redux/actions/transaction/transaction";
import { getSingleEvent } from "../../../services/EventService";
import { getCartInformation, getUserCart, insertNewCart, updateEventToCart } from "../../../services/KeranjangService";
import UrlService from '../../../services/UrlService';
import { clickGAHandler, getMoneyFormat, setLoadingText } from "../../../utilities/Utilities";
import '../SingleEO/SingleEO.scss';

function SingleEO({ currentUser, transaction, fillEventNotes, fillEventOrganizer, fillPackageEventOrganizer, isBookingEvent }) {
	const { id } = useParams();
	const history = useHistory();

	const {isMobile, size} = useWindowSize();

	const [event_notes, setEventNotes] = useState('');
	const [package_event_organizer, setPackageEventOrganizer] = useState(null);
	const [carts, setCarts] = useState(null);
	const [informations, setInformations] = useState(null);
	const [content, setContent] = useState(<LoadingSpinner />);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);

	const setInitialRedux = () => {
		fillEventOrganizer(id)
		fillPackageEventOrganizer(id)
	}

	useEffect(() => {
		// setInitialRedux();

		const fetchData = async () => {
			try {
				const response = await getSingleEvent(id)
				setPackageEventOrganizer(response.data);
	
				if(currentUser !== null) {
					const response2 = getUserCart({'user_id':currentUser.user_id});
					setCarts(response2.data);
	
					const response3 = getCartInformation();
					setInformations(response3.data);
				}
			} catch (error) {
				setContent(<h4>Something went wrong when trying to display</h4>)
			}
		}

		fetchData()

    }, [id])

	const processEvent = async () => {
		var transaction = transaction
		var currentUser = currentUser

		if(currentUser !== null){
			fillEventNotes(event_notes)
			isBookingEvent()

			var formData = new FormData();
			formData.append("user_id", currentUser.user_id)
			formData.append('event_organizer_id', transaction.transaction_event_organizer_id)
			formData.append('package_event_organizer_id', transaction.transaction_package_event_organizer_id)
			if(transaction.transaction_package_event_organizer_theme_id !== null){
				formData.append('package_event_organizer_theme_id', transaction.transaction_package_event_organizer_theme_id)
			}
			formData.append('event_notes', transaction.event_notes)

			if(informations !== ""){
				if(informations.status !== "Pending"){
					return fireSwal('Your transactions is being processed')
				}
			}

			if(carts.cart_event_organizer_detail.length !== 0 ){
				//update the event
				try{
					await updateEventToCart(formData)
					pushToAnotherPath(transaction)
				}catch (e){
					fireSwal('')
				}
			}else{
				//insert the event
				try{
					await insertNewCart(formData)
					pushToAnotherPath(transaction)
				}catch (e){
					fireSwal('')
				}
			}
		}else{
			return history.push('/login')
		}
	}

	const fireSwal = (text) => {
		Swal.fire({
			icon: 'error',
			title: 'Something Wrong Happened',
			text: text === '' ? 'Please try again' : text,
			timer: 3000,
		})
	}

	const pushToAnotherPath = (transaction) => {
		if(transaction.have_seen_venue === false){
			return history.push('/venue-notification')
		}
		if(transaction.have_seen_vendor === false){
			return history.push('/vendor-notification')
		}
		return history.push('/keranjang')
	}

	const togglePopUp = () => {
		setIsPopUpOpen(prev => !prev)
	}

	return (
		<>
			<ShareModal
				isOpen={isPopUpOpen}
				close={()=>togglePopUp()}
			/>
			<>
				<div className="single-eo new-single-eo">
					{!isMobile && <Header/>}
					<HeaderNavigationV2
						sticky={false}
						fixed={true}
						isTransparent
					/>
					<div className="header-view container-singleeo general-desktop-container">
						{/*section 1*/}
						<Row className='up-bottom-margin header-image'>
							<Col>
								<CustomImage
									source={package_event_organizer?.package_event_organizer_image}
									width="100%"
									margin="0"
								/>
								{isMobile && <a href="https://www.instagram.com/littlecloudeo/" target='_blank' onClick={clickGAHandler('Event Organizer - '+package_event_organizer.event_organizer?.event_organizer_name+' - '+package_event_organizer?.package_event_organizer_name, 'Gallery')}  className="gallery-button">
									<GalleryIcon className="gallery-icon" /> Gallery
								</a>}
							</Col>
						</Row>

						{/*section 2*/}
						<div className="up-bottom-margin header-section d-desktop">
							<div className="event-description p-3">
								<h1 className='event-name'>
									{setLoadingText(package_event_organizer?.event_organizer.event_organizer_name)+" "+setLoadingText(package_event_organizer?.package_event_organizer_name)}
								</h1>
								<p className="bigger-text mb-1 bold-text">
									<span>Mulai dari</span>&nbsp;<span className={package_event_organizer?.promotion_id && 'text-decoration-line-through'}>{getMoneyFormat(package_event_organizer?.package_event_organizer_price)}</span>
								</p>

								{
									package_event_organizer?.promotion_id &&
										<div>
											<div className="align-horizontally">
												<p className='promo-text'>{getMoneyFormat(package_event_organizer?.package_event_organizer_price_promo)}</p>
												<h6><span className="badge badge-red">Hemat {getMoneyFormat(package_event_organizer?.package_event_organizer_price - package_event_organizer?.package_event_organizer_price_promo)}</span></h6>
											</div>
											<div className="mb-4">
												<p className='m-0 promo-text text-red'>Promo Spesial</p>
												<p className='m-0 promo-small-text text-red'>Berakhir dalam: {Math.round((new Date(package_event_organizer?.promotion?.promotion_end_date) - new Date())/86400000)} hari</p>
											</div>
										</div>
								}

								<div className="contact-us d-desktop">
									<a className="contact-button text-center" href={"https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya tertarik dengan paket Event Organizer "+package_event_organizer?.event_organizer.event_organizer_name+" - "+package_event_organizer?.package_event_organizer_name+"%0A%0A"+window.location.href} target="_blank" rel="noopener noreferrer" onClick={clickGAHandler('Event Organizer - '+package_event_organizer?.event_organizer.event_organizer_name+' - '+package_event_organizer?.package_event_organizer_name, 'Chat dan Pesan')}>
										Chat dan Pesan
									</a>
									<p className='m-0'>** untuk bertanya lebih lanjut</p>
								</div>
							</div>
						</div>

						<div className="up-bottom-margin header-section d-mobile">
							<div className="event-description p-3">
								<h1 className='event-name'>
									{package_event_organizer?.event_organizer.event_organizer_name} {package_event_organizer?.package_event_organizer_name}
								</h1>
								{/* <hr className='m-2'/> */}
								<p className="event-pricing money-text">
									<span>Mulai dari</span>&nbsp;<span className={package_event_organizer?.promotion_id && 'text-decoration-line-through'}>{getMoneyFormat(package_event_organizer?.package_event_organizer_price)}</span>
								</p>

								{/* promo notifier */}
								{
									package_event_organizer?.promotion_id &&
										<div className="align-horizontally">
											<p className='promo-text'>{getMoneyFormat(package_event_organizer?.package_event_organizer_price_promo)}</p>
											<h6><span className="badge badge-red">Hemat {getMoneyFormat(package_event_organizer?.package_event_organizer_price - package_event_organizer?.package_event_organizer_price_promo)}</span></h6>
										</div>
								}

							</div>

								{
									package_event_organizer?.promotion_id &&
										<div className="promo-box">
											<div className="align-horizontally">
												<div>
													<p className='m-0 promo-text'>Promo Spesial</p>
													<p className='m-0 promo-small-text'>Berakhir dalam: {Math.round((new Date(package_event_organizer?.promotion?.promotion_end_date) - new Date())/86400000)} hari</p>
												</div>
												<div className='align-horizontally promo-top'>
													<div className="vertical-center">
														<Link to={'/promo/'+package_event_organizer?.promotion.promotion_url}>
															<p className='m-0 align-right promo-small-text promo-bold'>S&K Promo
																<FaAngleRight color={'white'} size={20} className='bold-text'/>
															</p>
														</Link>
													</div>
												</div>
											</div>
										</div>
								}

							<div>
								<div className="contact-us d-desktop">
									<a className="contact-button text-center" href={"https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya tertarik dengan paket Event Organizer "+package_event_organizer?.event_organizer.event_organizer_name+" - "+package_event_organizer?.package_event_organizer_name+"%0A%0A"+window.location.href} target="_blank" rel="noopener noreferrer" onClick={clickGAHandler('Event Organizer - '+package_event_organizer?.event_organizer.event_organizer_name+' - '+package_event_organizer?.package_event_organizer_name, 'Chat dan Pesan')}>
										Chat dan Pesan
									</a>
									{/*<button className="variation-button">*/}
									{/*	Lihat Variasi*/}
									{/*</button>*/}
									<p className='m-0'>** untuk bertanya lebih lanjut</p>
								</div>
							</div>
						</div>

						<div className="content-section">
							<p className='event-name d-desktop'>
								{package_event_organizer?.event_organizer.event_organizer_name} {package_event_organizer?.package_event_organizer_name}
							</p>
							<div className="d-mobile contact-us">
								<a className="contact-button text-center" href={"https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya tertarik dengan paket Event Organizer "+package_event_organizer?.event_organizer.event_organizer_name+" - "+package_event_organizer?.package_event_organizer_name+"%0A%0A"+window.location.href} target="_blank" rel="noopener noreferrer" onClick={clickGAHandler('Event Organizer - '+package_event_organizer?.event_organizer.event_organizer_name+' - '+package_event_organizer?.package_event_organizer_name, 'Chat dan Pesan')}> 
									Chat dan Pesan
								</a>

								<button className="share-button" onClick={()=>togglePopUp()}>
									<ShareIcon className="icon" />
								</button>
							</div>

							<div className="deskripsi-paket">
								<h5 className='paket-title section-title__primary'>Deskripsi Paket</h5>
								<div className="paket-list">
									{package_event_organizer?.package_event_organizer_description?.map(
										(description, key) => (
											<div className="paket-item__container" key={key}>
												<h6 className="paket-item__title">
													{description.package_event_organizer_description_title}
												</h6>
												<p className="paket-item__description">
													{description.package_event_organizer_description_name}
												</p>
											</div>
										)
									)}
								</div>
							</div>
							
							{/* TODO: Sedang Mencari Inspirasi */}
							<div className="d-flex justify-content-center d-mobile shadow-banner">
								<a href="https://www.instagram.com/littlecloudeo/" target="_blank" onClick={clickGAHandler('Event Organizer - '+package_event_organizer?.event_organizer.event_organizer_name+' - '+package_event_organizer?.package_event_organizer_name, 'Inspirasi')}>
									<img className="w-100" src={UrlService.getImageUrl(package_event_organizer?.event_organizer?.event_organizer_inspiration)} alt="not found" />
								</a>
							</div>

							<div className="mb-5 d-mobile"></div>
							<div className="decoration-theme">
								<h5 className="decoration-theme__title section-title__primary">Pilih Konsep Acaramu!</h5>
								<div className="decoration-theme__slider-container-desktop d-desktop">
									<NewCarousel
										show={3}
										renderPreviousButton={(previousItem, defaultClass, disabled) => (
											<button onClick={previousItem} className={defaultClass} disabled={disabled}>
												<RightArrowBold />
											</button>
										)}
										renderNextButton={(nextItem, defaultClass, disabled) => (
											<button onClick={nextItem} className={defaultClass} disabled={disabled}>
												<RightArrowBold />
											</button>
										)}
									>
										{package_event_organizer?.package_event_organizer_theme?.map((theme, key) => (
											<div className="decoration-theme-card__container-desktop" key={key}>
												<DecorationThemeCard
													title={theme.package_event_organizer_theme_name}
													imgUrl={UrlService.getImageUrl(theme.package_event_organizer_theme_photo)}
													price={theme.package_event_organizer_theme_price}
													colors={theme.package_event_organizer_theme_color}
												/>
											</div>
										))}
									</NewCarousel>
								</div>
								<div className="decoration-theme__slider-container d-mobile">
									{package_event_organizer?.package_event_organizer_theme?.map((theme, key) => (
										<div className="p-3" key={key}>
											<DecorationThemeCard
												title={theme.package_event_organizer_theme_name}
												imgUrl={UrlService.getImageUrl(theme.package_event_organizer_theme_photo)}
												price={theme.package_event_organizer_theme_price}
												colors={theme.package_event_organizer_theme_color}
											/>
										</div>
									))}
									{/*<Slider*/}
									{/*	infinite={false}*/}
									{/*	slidesToShow={1.2}*/}
									{/*	slidesToScroll={1}*/}
									{/*	cssEase='linear'*/}
									{/*	arrows={false}*/}
									{/*>*/}
									{/*	<DecorationThemeCard*/}
									{/*		title="Sage Green"*/}
									{/*		imgUrl="https://placeimg.com/400/400/people"*/}
									{/*		price={7000000}*/}
									{/*		colors={['#C4C4C4', '#A2D13F', '#4E6421']}*/}
									{/*	/>*/}
									{/*	<DecorationThemeCard*/}
									{/*		title="Sage Green"*/}
									{/*		imgUrl="https://placeimg.com/400/400/people"*/}
									{/*		price={7000000}*/}
									{/*		colors={['#C4C4C4', '#A2D13F', '#4E6421']}*/}
									{/*	/>*/}
									{/*	<DecorationThemeCard*/}
									{/*		title="Sage Green"*/}
									{/*		imgUrl="https://placeimg.com/400/400/people"*/}
									{/*		price={7000000}*/}
									{/*		colors={['#C4C4C4', '#A2D13F', '#4E6421']}*/}
									{/*	/>*/}
									{/*</Slider>*/}
								</div>
							</div>

							{/* <div className='information-box'>
								<CardNoImage
									title='Cara Memesan'
									text='Anda dapat melakukan meeting dan berkonsultasi terlebih dahulu bersama sales kami / langsung melakukan transaksi di website'
									link='Butuh bantuan? Hubungi CS kami'
									linkDestination='https://littlecloudeo.com/company/tutorial'
								/>
								<CardNoImage
									title='Kebijakan Pembatalan'
									text='Apabila anda sudah melakukan transaksi melalui website kami dan anda ingin membatalkan transaksi tersebut, anda dapat melihat kebijakan pembatalan kami'
									link='Lihat kebijakan pembatalan'
									linkDestination='https://littlecloudeo.com/company/2020/12/11/kebijakan-pembatalan/'
								/>
							</div> */}
						</div>

						{/*section theme: 3*/}
						{/* <div className="mt-5 mb-5 main">
							{package_event_organizer?.package_event_organizer_theme.length === 0?
								<div></div>
								:
								<SliderWithDescriptionForEO
									package_event_organizer_theme={
										package_event_organizer?.package_event_organizer_theme
									}
								/>
							}

							<Row className='mt-5'>
								<h5>Tambahkan catatan: </h5>
							</Row>
							<Row>
								<textarea placeholder="Request sesuatu disini..." onChange={(e)=>handleInput('event_notes', e.currentTarget.value)}></textarea>
							</Row>
						</div> */}
					</div>

					{/*section 4: buat mesen*/}
					{/* <div className="signature-color-background align-horizontally buat-beli">
						<Col lg={6} className="text">
							<p className="font-white bold-text m-0">
								<div className="font-size-6 font-size-sm-8 d-lg-none">{package_event_organizer?.event_organizer.event_organizer_name}</div>
								<div className="font-size-8 font-size-sm-10">{package_event_organizer?.package_event_organizer_name}</div>
							</p>
						</Col>
						<Col xs={6} lg={3}>
							<p className="font-white bold-text m-0 ">
								<div className="text-white">
									<div className="font-size-6 font-size-sm-8 d-lg-none">Total Harga</div>
									<div className="font-size-8 font-size-sm-10">{getMoneyFormat(package_event_organizer?.package_event_organizer_price)}</div>
								</div>
							</p>
						</Col>
						<Col xs={6} lg={3} className="bold-text right-button pb-3">
							<ReactWhatsapp number='0833847298347'
														message={"Halo, saya tertarik pada paket event organizer dengan tema " + package_event_organizer?.package_event_organizer_name} className='p-0 m-0 rounded'>
								<div className='btn-success pr-2 pl-2 pb-1 pt-1 rounded'>
									<FaWhatsapp size={15}/>
									&nbsp;&nbsp;Chat dan Pesan
								</div>
							</ReactWhatsapp>
							<SemiRoundedButton
								text="Selanjutnya"
								color="orange"
								className="font-size-9 font-size-sm-10"
								onClick={() => processEvent()}
							/>
						</Col>
					</div> */}
				</div>
			</>
		</>
	);
}

const mapStateToProps = state =>({
	currentUser: state.authentication.currentUser,
	transaction: state.transaction
})

export default connect(mapStateToProps, {fillEventNotes, fillEventOrganizer, fillPackageEventOrganizer, isBookingEvent})(SingleEO);