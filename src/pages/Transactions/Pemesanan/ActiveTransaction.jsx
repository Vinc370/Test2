import React from 'react'
import TransactionCard from "../../../components/TransactionCard/TransactionCard";
import {getTransactionDetail} from "../../../redux/actions/cart/cart";
import { getPrice } from '../../../utilities/OrderUtilities'
import {connect} from 'react-redux'
import {getAllOrders} from "../../../services/OrderService";
import transaction from "../../../redux/reducers/transaction/transaction";

class ActiveTransaction extends React.Component{
  state= {
    transactions: [],
    userData:this.props.currentUser.user_id,
  }

  async componentDidMount() {
    let res = await getAllOrders({user_id : this.state.userData})
    this.setState({transactions: res.data})
  }

  getDetailTransaction=(transaction)=>{
    this.props.getTransactionDetail(transaction)
  }

  render(){
    return(
      <div className='transactions-history'>
        {this.state.transactions.map((transaction)=>(
          <React.Fragment>
            <span className="time-line" />
            <div className="transactions-history__list-container" onClick={()=>this.getDetailTransaction(transaction)}>
              <div className="transactions-history__date-container">
                <span className="marker" />
                <p className="date">
                  Monday
                </p>
              </div>
              <div className="transactions-history__card-container">
                <div className="header-container">
                  <p className="title">
                    Pemesanan Event {transaction.tanggal_acara}
                  </p>
                  <p className="time">
                    {transaction.event_start_time}
                  </p>
                </div>
                <div className="content-container">
                  <div className="list">

                    <p className="item">
                      {transaction.order_event_organizer.length === 0 ?
                        "No event organizer":
                        transaction.order_event_organizer[0].event_organizer.event_organizer_name
                      }
                      {/*{transaction.order_event_organizer[0].event_organizer.event_organizer_name}*/}
                    </p>
                    <p className="item">
                      {transaction.order_vendor.length === 0 ?
                        "No vendor":
                        transaction.order_vendor[0].vendor.vendor_name
                      }

                      {transaction.order_vendor.length - 1 > 0 ?
                        <span className="extra">(+{transaction.order_vendor.length - 1} more)</span>
                        :
                        <span/>
                      }
                    </p>
                  </div>
                  {/* TODO: --demas-- belum ada action nya */}
                  <button className="see-detail" onClick={this.props.change_state}>
                    <div onClick={()=>this.getDetailTransaction(transaction)}>
                      See Details
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {/*<div className='card' onClick={this.props.change_state} role='button'>*/}
            {/*  <div onClick={()=>this.getDetailTransaction(transaction)}>*/}
            {/*    <TransactionCard title={transaction.order_name} date={transaction.tanggal_acara} status={transaction.order_status}*/}
            {/*      price={getPrice(transaction)}*/}
            {/*      ok = {transaction.order_status === "Lunas" || transaction.order_status=== "Done"? "yes": "no"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div><br/>*/}
          </React.Fragment>
        ))}
        {/* Ini design placeholdernya ya */}
        
        {/*<div className="transactions-history__list-container">*/}
        {/*  <div className="transactions-history__date-container">*/}
        {/*    <span className="marker" />*/}
        {/*    <p className="date">*/}
        {/*      10th January 2021*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="transactions-history__card-container">*/}
        {/*    <div className="header-container">*/}
        {/*      <p className="title">*/}
        {/*        Pemesanan Event 31 Februari 2021*/}
        {/*      </p>*/}
        {/*      <p className="time">*/}
        {/*        18:00*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <div className="content-container">*/}
        {/*      <div className="list">*/}
        {/*        <p className="item">*/}
        {/*          Sweet 17 Mini Party*/}
        {/*        </p>*/}
        {/*        <p className="item">*/}
        {/*          Sound System 1000 Watt <span className="extra">(+2 more)</span>*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      /!* TODO: --demas-- belum ada action nya *!/*/}
        {/*      <button className="see-detail">*/}
        {/*        See Details*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = state =>({
  currentUser: state.authentication.currentUser
})

export default connect(mapStateToProps, {getTransactionDetail})(ActiveTransaction)