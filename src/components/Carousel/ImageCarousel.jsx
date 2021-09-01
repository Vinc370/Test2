import React  from 'react';
import {Carousel, Image} from 'react-bootstrap'
import './Carousel.scss'
import {link} from "../../sources/Variables";
import { Link } from 'react-router-dom';

class ImageCarousel extends React.Component{

    render() {
        return(
            <Carousel className='carousel-decorate'>
                {this.props.contents?.map((item, key) => (
                    <Carousel.Item key={key}>
                        <Link to={'/promo/'+item.promotion_url} key={key}>
                            <Image
                                className={"d-block w-100 "+this.props.className}
                                src={link + '/img/storage/' + item.promotion_image}
                                alt="Image not found"
                            />
                            {/*<Carousel.Caption>*/}
                            {/*    <h3>{'Name '+item.promotion_id}</h3>*/}
                            {/*    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                            {/*</Carousel.Caption>*/}
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

export default ImageCarousel;