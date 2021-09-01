import React from 'react';
import {Card as CardBootstrap} from 'react-bootstrap'
import './Card.scss'
import {withRouter} from 'react-router-dom'

class Card extends React.Component{

    state = {
        mouseMoved: false
    }
    handleClick = () => {
        if (!this.state.mouseMoved) {
            this.props.history.push(this.props.link);
        }
    };

    setMouseMovedTrue=()=>{
        this.setState({
            mouseMoved: true
        })
    }

    setMouseMovedFalse=()=>{
        this.setState({
            mouseMoved: false
        })
    }

    formatRupiah=(money)=>{
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    render() {

        return(
            <div to={this.props.link}
                onMouseMove={()=>this.setMouseMovedTrue()}
                onMouseDown={()=>this.setMouseMovedFalse()}
                onMouseUp={()=>this.handleClick()}
                style={{cursor:"pointer"}}
            >
                <CardBootstrap className='card-decorate rounded' style={{ width: this.props.width, margin: this.props.margin , height:this.props.height, marginLeft: this.props.marginLeft, marginRight: this.props.marginRight}}>
                    <CardBootstrap.Img variant="top" src={this.props.source} className='rounded'/>
                </CardBootstrap>
                <div style={{marginLeft:"0em", minHeight:this.props.bodyHeight, marginLeft: this.props.marginLeft, marginRight: this.props.marginRight}}>
                    <p className='small m-0 ellipsis'>{this.props.title}</p>
                    <p className='small-italic-grey-text m-0 pb-1'>{this.props.text}</p>
                    <p className='mb-1 font-weight-bold small'>{this.formatRupiah(this.props.price)}</p>
                </div>
            </div>
        );
    }
}
export default withRouter(Card);