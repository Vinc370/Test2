import React from 'react';
import '././TransactionCard.scss'
import {getMoneyFormat} from "../../utilities/Utilities";
import {Col} from "react-bootstrap";

class TransactionCard extends React.Component{
    render(){
        return(
            <div className='transaction-card align-horizontally'>
                <Col className='transaction-info'>
                    <p className='bold-text m-0 ellipsis'>{this.props.title}</p>
                    <p className='small-italic-grey-text'>{this.props.date}</p>
                    <p className='bold-text text-success m-0'>{getMoneyFormat(this.props.price)}</p>
                </Col>

                {this.props.ok === "yes" ?
                    <Col className='status-info'>
                        <p className='text-success m-0'>{this.props.status}</p>
                    </Col>
                    :
                    <Col className='status-info'>
                        <p className='text-danger m-0'>{this.props.status}</p>
                    </Col>
                }
            </div>
        );
    }
}

export default TransactionCard;