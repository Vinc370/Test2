import axios from "axios";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { fillVenue } from "../../redux/actions/transaction/transaction";
import store from "../../redux/Store";
import { link } from "../../sources/Variables";
import Card from "../Card/Card";
import CardImage from '../Card/CardImage';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "transparent", fontSize:"60px", borderRadius:"5em", transform: 'scale(2,2)', paddingLeft: "10px"}}
        onClick={onClick}
      />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "transparent", fontSize:"60px", borderRadius:"5em", transform: 'scale(2,2)', left: "-25px"}}
        onClick={onClick}
      />
    );
}

export default class ImageSlider extends React.Component{
    constructor(props) {
        super(props);
        this.state =
        {
            venue_one_category_type: [
                {
                    venue_one_category_type_id: 0,
                    venue_one_category_type_name: '',
                    venue_category: [
                        {
                            venue_one_category_id: 0,
                            venue_one_category_name: '',
                        }
                    ]
                }
            ],
            settings:{
                dot:true,
                infinite: true,
                speed: 500,
                slidesToShow: 5.00,
                slidesToScroll: 1,
                cssEase: 'linear',
                arrows: true,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />
            },
            settingsMobile:{
                dot:true,
                infinite: true,
                speed: 500,
                slidesToShow: 2.1,
                slidesToScroll: 1,
                cssEase: 'linear',
                arrows: false
            }
        }
    }

    componentDidMount() {
        var th = this;
        axios.get(link + '/api/venue/category/one/Lokasi').then(function(result){
            th.setState({venue_one_category_type: result.data})
        });
    }

    findLocations =(locationId)=>{
        //array 0 is for the category location
        var type = this.state.venue_one_category_type

        // karena baru 1 elemen makanya ga bisa di loop dlu/ dikasi array
        // for(var i = 0; i < type.length; i++){
            if(type.venue_one_category_type_name === "Lokasi"){
                //ini jadinya type ga di []-in
                var location = type.venue_category
                for(var j = 0; j < location.length; j++){
                    if(locationId === location[j].venue_one_category_id){
                        return location[j].venue_one_category_name
                    }
                }
            }
        // }
    }

    findVenueMinimumPrice=(venue_id)=>{
        var minPrice = 0
        var venues = this.props.contents

        for(var i = 0; i < venues.length; i++){
            if(venues[i].venue_id === venue_id){
                var packages = venues[i].venue_package
                for(var j = 0; j < packages.length - 1;j++ ){
                    var curr = packages[j].venue_package_sell_price/packages[j].venue_package_total_pax
                    var next = packages[j+1].venue_package_sell_price/packages[j+1].venue_package_total_pax
                    if(curr < next){
                        minPrice = curr
                    }else{
                        minPrice = next
                    }
                }
                return minPrice
            }
        }
    }

    fillVenue=(id)=>{
        store.dispatch(fillVenue(id))
    }

    render(){
        return(
            <div className='horizontal-slider'>
                {/*this is not for mobile*/}

                {/*NOTES*/}
                {/*untuk masalah ntr tampilannya jadi kea ke double 2 slider itu karena dia belum menuhi minimal settingannya yaitu 5 image sedangkan yang kita sediakan itu kurang*/}

                <Slider {...this.state.settings} className='for-desktop'>
                    {this.props.contents?.map((item, key) => (
                        <div className="card-wrapper" key={key}>
                            {this.props.type === 'venue'?
                                <Card source={link + '/img/storage/' + item.venue_image[0]}
                                      title={item.venue_name}
                                      price={this.findVenueMinimumPrice(item.venue_id)}
                                      text={this.findLocations(item.venue_location)}
                                      link= {'/venue/'+ item.venue_id}
                                      width='90%'
                                      marginLeft='5%'
                                      marginRight='5%'
                                      bodyHeight='5em'
                                      onClick={()=>this.fillVenue(item.id)}
                                />
                                : (
                                    this.props.type === 'event' ? 
                                        <Card source={link + '/img/storage/' + item.package_event_organizer_image}
                                            title={item.package_event_organizer_name}
                                            text={''}
                                            price={item.package_event_organizer_price}
                                            link={'/event-organizer/' + item.package_event_organizer_route}
                                            width='90%'
                                            marginLeft='5%'
                                            marginRight='5%'
                                            height='100%'
                                            bodyHeight='4em'
                                        />
                                    :
                                    <CardImage
                                        title={item.venue_one_category_name}
                                        source={item.venue_one_category_image}
                                        linkDestination={''}
                                        titleStyle = {{color: 'white', fontSize: 'larger'}}
                                        textStyle = {{color: 'white', fontSize: 'larger'}}
                                        imageClass={'overlay-background'}
                                    />
                                )
                                

                            }
                        </div>
                    ))}
                </Slider>

                {/*this is for mobile*/}
                <Slider {...this.state.settingsMobile} className='for-mobile'>
                    {this.props.contents?.map((item, key) => (
                        <div className="card-wrapper" key={key}>
                            {this.props.type === 'venue'?
                                <Card source={link + '/img/storage/' + item.venue_image[0]}
                                      title={item.venue_name}
                                      price={this.findVenueMinimumPrice(item.venue_id)}
                                      text={this.findLocations(item.venue_location)}
                                      link= {'/venue/'+ item.venue_id}
                                      width='90%'
                                      marginLeft='5%'
                                      marginRight='5%'
                                      height='100%'
                                      bodyHeight='3em'
                                      onClick={()=>this.fillVenue(item.id)}
                                />
                                : (
                                    this.props.type === 'event' ? 
                                        <Card source={link + '/img/storage/' + item.package_event_organizer_image}
                                            title={item.package_event_organizer_name}
                                            text={''}
                                            price={item.package_event_organizer_price}
                                            link={'/single-event-organizer/' + item.package_event_organizer_id}
                                            width='90%'
                                            marginLeft='5%'
                                            marginRight='5%'
                                            height='100%'
                                            bodyHeight='2em'
                                        />
                                    : 
                                    <CardImage
                                        title={item.venue_one_category_name}
                                        source={item.venue_one_category_image}
                                        linkDestination={'/venue?type='+item.venue_one_category_id}
                                        titleStyle = {{color: 'white', fontSize: '1.1em'}}
                                        textStyle = {{color: 'white', fontSize: 'smaller'}}
                                        imageClass={'overlay-background'}
                                    />
                                )
                            }
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}