import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ChevronIcon from '../../assets/icons/ChevronIcon';
import ClipBoardIcon from '../../assets/icons/ClipBoardIcon';
import RightArrowBold from '../../assets/icons/RightArrowBold';
import VenueHomeCard from '../../components/Card/VenueHomeCard';
import ImageSlider from '../../components/Carousel/HorizontalSlider';
import ImageCarousel from "../../components/Carousel/ImageCarousel";
import NewCarousel from '../../components/Carousel/NewCarousel';
import CustomImage from "../../components/CustomImage/CustomImage";
import EventBox from "../../components/EventBox/EventBox";
import NavigationBar from "../../components/ForMobile/NavigationBar/NavigationBar";
import Header from "../../components/Header/Header";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useWindowSize from "../../hooks/useWindowSize";
import { getAllEvents } from "../../services/EventService";
import UrlService from '../../services/UrlService';
import { getAllPromotions } from '../../services/UserService';
import { getAllMappingVendors } from '../../services/VendorService';
import { getAllTypes } from '../../services/VenueService';
import { link } from '../../sources/Variables';
import { processWords } from "../../utilities/Utilities";
import '../Home/Home.scss';

function Home({ }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)
    const {isMobile, size} = useWindowSize();

    const [event_organizers, setEventOrganizer] = useState([]);
    const [vendors, setVendor] = useState([]);
    const [promotions, setPromotion] = useState([]);
    const [venue_type, setVenueType] = useState([]);

    useEffect(() => {
        try {
            getAllEvents().then((data) => { setEventOrganizer(data.data) });
            getAllMappingVendors({vendor_connect_type: 'home'}).then((data) => { setVendor(data.data) });
            getAllPromotions().then((data) => { setPromotion(data.data) });
            getAllTypes().then((data) => { setVenueType(data.data) });
        } finally {
            setIsLoading(false);
        }

    }, [])

    const [keyword, setKeyword] = useState("")
    const [data, setData] = useState([])
    const [isHeaderSearchFocus, setIsHeaderSearchFocus] = useState(false)

    const handleSearch =(input) =>{

        if(input === ''){
            return clearData()
        }
        const url = link + '/api/search'
        const formData = new FormData()

        setKeyword(input)
        formData.append('keyword', keyword)
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'application/json' },
        }).then(function(response) {
            setData(response.data)
        })
    }

    const clearData=()=>{
        setData([])
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onHeaderInputFocus = () => setIsHeaderSearchFocus(true)
    const onHeaderInputBlur = () => setIsHeaderSearchFocus(false)

    const [activeHeaderImage, setActiveHeaderImage] = useState(0)

    const headerImages = [
        link+'/img/storage/wedding-bg.jpg',
        link+'/img/storage/sangjit-bg.jpg',
        link+'/img/storage/sweet-17-bg.jpg',
        link+'/img/storage/birthday-bg.jpg',
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHeaderImage(prev => prev + 1)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            {isLoading && <LoadingSpinner className="mt-5" />}
            {!isLoading &&
                <div className='container-home'>
                    <Header
                        showNewMobile
                        type={scrollPosition >= 100 ? 'white' : 'black'}
                        sticky={false}
                        fixed={true}
                    />
                  <div className='home'>
                      {/* <SearchBox /> */}
                      <div className='home-header'>
                          {
                              headerImages.map((image, index) =>
                                <img
                                    key={index}
                                    src={image}
                                    alt="home header"
                                    className={`home-header-image ${index === (activeHeaderImage % headerImages.length) ? 'active' : ''}`}
                                />
                              )
                          }
                          <div className="overlay" />
                          <div className="d-mobile text-white">
                            <p className="title">Eksplorasi Semua Acara<br />Didalam Satu Aplikasi</p>
                            <p className="subtitle">Mulai Perencanaan Acaramu Bersama Littlecloud!</p>
                          </div>
                          <div className="d-desktop">
                              <div className="content-container general-container">
                                <p className="title">Eksplorasi Semua Acara<br />Didalam Satu Aplikasi</p>
                                <p className="subtitle">Mulai Perencanaan Acaramu Bersama Littlecloud!</p>
                                <div className={"search-container"} onMouseOver={onHeaderInputFocus} onMouseLeave={onHeaderInputBlur}>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            placeholder="Cari Photographer, Katering, dsb"
                                            onChange={e=>handleSearch(e.currentTarget.value)}
                                        />
                                        <button>
                                            <BiSearch />
                                        </button>
                                    </div>
                                    <div className={'home-search-result header-search '+(isHeaderSearchFocus ? '' : 'd-none')}>
                                    {data.map((data, key)=>(
                                        <div className='search-result-container' key={key}>
                                            <Link to={processWords(data.prefix + data.link)} className='text-info'>{data.name}</Link>
                                            <br/>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                {/* belum ada link nya */}
                                <Link to="/event-saya" className="dashboard-button">
                                    <ClipBoardIcon className="icon" />
                                    Dashboard
                                </Link>
                              </div>
                          </div>
                      </div>
                      <div>
                          <div className=''>
                            <div className="promotion-and-event general-container">
                                <p className="title">
                                    Pilihan Acaramu
                                </p>

                                {/*banner*/}
                                {/* <div className='align-horizontally d-desktop'>
                                    <Col sm={8} className='mobile-100'>
                                        <ImageCarousel
                                        contents={promotions}
                                        />
                                    </Col>
                                </div> */}

                                {/*event box*/}
                                <div className='event-box-container mb-lg-5'>
                                    <div className='align-horizontally event-box'>
                                        {event_organizers?.slice(0,4)?.map((event_organizer, key) => (
                                        <div key={key} className="d-flex justify-content-center align-items-center">
                                            <EventBox
                                                key={key}
                                                source={'mob-'+event_organizer.event_organizer_image}
                                                link={'/event-organizer/' + event_organizer.event_organizer_route }
                                                title={event_organizer.event_organizer_name}
                                                // TODO: ini masih placeholder, datanya perlu diambil dari API langsung
                                                background={UrlService.getImageUrl('logo-home-background-'+event_organizer.event_organizer_image)}
                                            />
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='d-mobile mb-3 carousel-home'>
                                <ImageCarousel
                                    contents={promotions}
                                />
                            </div>
                            <div className="d-desktop desktop-carousel">
                                {
                                    promotions.length > 0 ?
                                        <NewCarousel
                                            show={1}
                                            infiniteLoop
                                            autoMove={5000}
                                            withIndicator
                                            transformCalculation={(currentIndex, show) => 25 + (currentIndex * -50)}
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
                                            {
                                                promotions.map((promotion, key) =>
                                                    <Link to={'/promo/'+promotion.promotion_url} key={key} className="carousel__item-container">
                                                        <div className="carousel__item-content">
                                                            <img
                                                                src={link + '/img/storage/' + promotion.promotion_image}
                                                                alt={promotion.promotion_image}
                                                            />
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        </NewCarousel> : null
                                }
                            </div>

                            <div className="container-home general-container">
                              {/*<div classNamef="mb-4">*/}
                              {/*    <div className="align-horizontally text-evenly section-title">*/}
                              {/*        <div>*/}
                              {/*            <h5 className='font-weight-bold'>Konsultasi Acaramu</h5>*/}
                              {/*        </div>*/}
                              {/*    </div>*/}
                              {/*    /!* {this.findPopularVenue()} *!/*/}
                              {/*    <div className="konsultasi-acara">*/}
                              {/*          <KonsultasiAcaraCard*/}
                              {/*              img="https://placeimg.com/400/400/people"*/}
                              {/*              title="Rekomendasi Tempat"*/}
                              {/*              time="3 menit"*/}
                              {/*              to="/"*/}
                              {/*          />*/}
                              {/*          <KonsultasiAcaraCard*/}
                              {/*              img="https://placeimg.com/401/401/arch"*/}
                              {/*              title="Konsep Acara & Dekorasi"*/}
                              {/*              time="3 menit"*/}
                              {/*              to="/"*/}
                              {/*          />*/}
                              {/*    </div>*/}
                              {/*</div>*/}

                              {/*<div className="mb-4 mb-lg-0">*/}
                                  {/*<div className="d-desktop align-horizontally text-evenly section-title">*/}
                                  {/*    <div>*/}
                                  {/*        <h5 className='font-weight-bold'>Mudahkan Pencarian Acaramu!</h5>*/}
                                  {/*    </div>*/}
                                  {/*    <div className="center-vertical-text" style={{cursor:"pointer"}}>*/}
                                  {/*        /!* TODO: --demas-- ini gatau endpoint nya kemana *!/*/}
                                  {/*        <p onClick={()=> {history.push('/venue')}} className='font-signature-color small m-0 '>*/}
                                  {/*            Lihat semua <span className="chevron-icon"><ChevronIcon /></span>*/}
                                  {/*        </p>*/}
                                  {/*    </div>*/}
                                  {/*</div>*/}
                                  {/* {this.findPopularVenue()} */}
                                  {/*<div className="d-desktop mudahkan-pencarian">*/}
                                  {/*    /!* TODO: --demas-- data masih placeholder *!/*/}
                                  {/*      <MudahkanPencarianHomeCard*/}
                                  {/*          img="https://placeimg.com/400/400/any"*/}
                                  {/*          title="Rekomendasi Tempat"*/}
                                  {/*          subtitle="3 menit"*/}
                                  {/*          to="/"*/}
                                  {/*      />*/}
                                  {/*      <MudahkanPencarianHomeCard*/}
                                  {/*          img="https://placeimg.com/400/400/any"*/}
                                  {/*          title="Konsep Acara dan Dekorasi"*/}
                                  {/*          subtitle="3 menit"*/}
                                  {/*          to="/"*/}
                                  {/*      />*/}
                                  {/*      <MudahkanPencarianHomeCard*/}
                                  {/*          img="https://placeimg.com/400/400/any"*/}
                                  {/*          title="Baca Artikel Untukmu!"*/}
                                  {/*          subtitle="Kunjungi blog kami >"*/}
                                  {/*          to="/"*/}
                                  {/*      />*/}
                                  {/*</div>*/}
                              {/*</div>*/}

                              <div className="mb-4">
                                  <div className="align-horizontally text-evenly section-title">
                                      <div>
                                          <h5 className='font-weight-bold'>Venue di Jakarta</h5>
                                      </div>
                                      <div className="center-vertical-text" style={{cursor:"pointer"}}>
                                          <p onClick={()=> {history.push('/venue')}} className='font-signature-color small m-0 '>
                                              Lihat semua <span className="chevron-icon"><ChevronIcon /></span>
                                          </p>
                                      </div>
                                  </div>
                                  {/* {this.findPopularVenue()} */}
                                  <div className="venue-type d-mobile">
                                    {
                                        venue_type !== null && <ImageSlider contents={venue_type} type={'venue_type'} />
                                    }
                                  </div>
                                  <div className="venue-type-576px d-576px">
                                      {
                                          venue_type?.slice(0,3)?.map(venue =>
                                            <VenueHomeCard
                                                key={venue.venue_one_category_id}
                                                img={link + '/img/storage/' + venue.venue_one_category_image}
                                                title={venue.venue_one_category_name}
                                                to={`/venue?type=${venue.venue_one_category_id}`}
                                            />
                                          )
                                      }
                                  </div>
                                  <div className="venue-type-desktop d-desktop">
                                      {
                                          venue_type?.slice(0,4)?.map((venue, key) =>
                                            <VenueHomeCard
                                                key={key}
                                                img={link + '/img/storage/' + venue.venue_one_category_image}
                                                title={venue.venue_one_category_name}
                                                to={`/venue?type=${venue.venue_one_category_id}`}
                                            />
                                          )
                                      }
                                  </div>
                              </div>

                              {/* <div className="mb-4">
                                  <h5 className='font-weight-bold'>Event Populer</h5>
                                  {this.findPopulerEvent()}
                              </div> */}

                              {/* <hr className='m-0'/><br/> */}
                              {/*vendor acara*/}
                              <div className="mb-4">
                                  <div className="align-horizontally text-evenly section-title">
                                      <div>
                                          <h5 className='font-weight-bold'>Vendor</h5>
                                      </div>
                                      <div className="center-vertical-text" style={{cursor:"pointer"}}>
                                          {/* TODO: demas--- url nya kemana */}
                                          <p onClick={()=> {history.push('/vendor')}} className='font-signature-color small m-0 '>
                                              Lihat semua <span className="chevron-icon"><ChevronIcon /></span>
                                          </p>
                                      </div>
                                  </div>
                                  <div className="align-horizontally  vendor-acara">
                                      {vendors?.slice(0, (isMobile ? 6 : 8))?.map((vendor, key) => (
                                        <CustomImage
                                          key={key}
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

                          </div>

                            {/* <div className="py-5 bg-light-gray">
                                <div className="container-home d-flex justify-content-center">
                                    <CardImage
                                        title="Corporate Event"
                                        text="Jasa event untuk peresmian atau tahunan perusahaan"
                                        source={'corporate-event-home.png'}
                                        textBackground={'white'}
                                    />
                                </div>
                            </div> */}

                          {/*ajakan untuk menjadi mitra*/}
                          {/*<div className='invitation-container mt-5'>*/}
                          {/*    <Image src={'https://www.elitetraveler.com/wp-content/uploads/2007/02/Alain-Ducasse-scaled.jpg'}*/}
                          {/*           className='invitation-image'*/}
                          {/*    />*/}
                          {/*    <div className='centered'>*/}
                          {/*        <p className='font-white font-weight-bold'>Daftarkan Restoranmu, Dapatkan Banyak Keuntungan</p>*/}
                          {/*        <p className='font-white mt-2 mb-2'>*/}
                          {/*            Segera daftarkan dirimu menjadi mitra Littlecloud Event Organizer untuk mendapatkan berbagai macam keuntungan*/}
                          {/*        </p>*/}
                          {/*        <Button variant='light' onClick={()=> {history.push('/tambah-venue')}}>*/}
                          {/*            <p className='m-0 font-weight-bold'>Daftar Menjadi Mitra</p>*/}
                          {/*        </Button>*/}
                          {/*    </div>*/}
                          {/*</div>*/}
                      </div>

                      <NavigationBar active="home" />
                  </div>
                </div>
            }
        </>
    )
}

export default connect(null, {})(Home)
