import React from 'react';
import { link } from '../../sources/Variables';
import './CardImage.scss';

class CardImage extends React.Component{
    render() {
        return(
            <a href={this.props.linkDestination} className="">
                <div style={{ 
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url("${link+'/img/storage/'+this.props.source}")`
                }} className={"d-flex align-items-end shadow card-image position-relative"}>
                    {
                        this.props.isPromo && <div className="card-promo-special">Promo Spesial</div>
                    }
                    <div className={"w-100 h-100 position-absolute shadow  "+this.props.imageClass}></div>
                    <div className="w-100 bottom-text" style={{backgroundColor: this.props.textBackground}}>
                        <div className="title" style={this.props.titleStyle}>
                            {this.props.title}
                        </div>
                        <div className="text" style={this.props.textStyle}>
                            {this.props.text}
                        </div>
                    </div>
                </div>
                {
                    this.props.isPromo && <div className="card-promo-info">
                        Promo berakhir dalam: {this.props.promoLeft} hari
                    </div>
                }
            </a>
        );
    }
}

export default CardImage;