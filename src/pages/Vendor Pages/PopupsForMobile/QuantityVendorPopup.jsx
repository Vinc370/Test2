import axios from "axios";
import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { fillVendorJasa, isBookingVendor } from "../../../redux/actions/transaction/transaction";
import { link } from "../../../sources/Variables";
import { getMoneyFormat } from "../../../utilities/Utilities";
import './PopupsForMobile.scss';

function QuantityVendorPopup({vendorid, service, uses, cart_vendor_detail_id, fillVendorJasa, isBookingVendor, user_id, action=false, vendor_qty=1}){
    const history = useHistory();
    const [qty, setQty] = useState(vendor_qty);
    
    const processVendorJasa=(vendor_id, vendor_jasa_id, vendor_jasa_name, vendor_jasa_variation_id, vendor_qty)=>{
        const res = {
            "vendor_id" : vendor_id,
            "vendor_jasa_id": vendor_jasa_id,
            "vendor_jasa_name": vendor_jasa_name,
            "vendor_jasa_variation_id": vendor_jasa_variation_id,
            "vendor_qty":vendor_qty
        }
        fillVendorJasa(res)
        isBookingVendor()
        history.push('/vendor')
    }

    const handlePlus = ()=>{
        setQty(parseInt(qty)+1);
    }

    const handleMinus = () =>{
        const newQty = parseInt(qty);
        if(newQty!== 1) setQty(newQty-1);
    }

    const generateTrigger = (uses) =>{
        if(uses === 'keranjang'|| uses === 'transaksi'){
            return <a className='primary-text' style={{color: '#007bff'}}> Lihat Detail</a>
        }else if(uses === "detail"){
            return <button className='signature-button'>Pesan sekarang</button>
        }else{
            return <button className='signature-button'>Rp {service.vendor_jasa_price}</button>
        }
    }

    const generateActionButton = (uses) =>{
        if(uses === 'keranjang'){
            return <div>
                <Button className='btn-success mb-2 w-100' onClick={()=>changeQuantity()}>Ubah Kuantitas</Button>
                <Button className='btn-danger w-100' onClick={()=>onDeleteCartItem()}> Hapus </Button>
            </div>
        }else if(uses === 'transaksi'){
            return
        }else{
            return <button className='btn-success button-popup' onClick={()=>processVendorJasa(service.vendor_id, service.vendor_jasa_id, service.vendor_jasa_name, null, qty)}>Pilih</button>
        }
    }

    const onDeleteCartItem = () =>{
        var url = link + '/api/keranjang/vendor/delete'

        var formData= new FormData();
        formData.append('user_id', user_id)
        formData.append('cart_vendor_detail_id', cart_vendor_detail_id)

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'application/json' },
        }).then(function(res){
            //onsuccess
            window.location.reload()
        }).then(function(res){

        })
    }

    const changeQuantity =()=>{
        var url = link + '/api/keranjang/vendor/update-quantity'

        var formData= new FormData();
        formData.append('user_id', user_id)
        formData.append('cart_vendor_detail_id', cart_vendor_detail_id)
        formData.append('vendor_qty', ((qty <= 0 || qty === "") ? 1 : qty ))

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'application/json' },
        }).then(function(res){
            window.location.reload()
        }).then(function(res){

        })
    }

    return(
    <Popup trigger={<div>{generateTrigger(uses)}</div>} modal>
        {close => (
            <div className='quantity-vendor-popup'>
                <div className='for-close' onClick={close}>
                    &times;
                </div>
                <img src={`https://lc-api.littlecloudeo.com/img/storage/${service.vendor_jasa_image}`} alt="" className={'mb-2 rounded'}/>

                <p className='small-italic-grey-text m-0 ml-2'>{service.vendor_jasa_detail}</p>
                <p className='bold-text text-success ml-2'>{getMoneyFormat(service.vendor_jasa_price)}/pax</p>

                {
                    action === true ?
                        <>
                            <h4 className='text-center bold-text'>Jumlah</h4>
                            <div className="align-horizontally align-center mb-3">
                                <FaMinus className='m-1 font-signature-color' onClick={handleMinus}/>
                                <Form.Control type="number" value={qty} className='w-25 text-center' onChange={(e)=>setQty(e.target.value)}/>
                                <FaPlus className='m-1 font-signature-color' onClick={handlePlus}/>
                            </div>
                            {generateActionButton(uses)}
                        </>
                    : null
                }

                <div className='mt-1 mb-1 small d-flex ml-2'>
                    Jumlah: &nbsp;
                    <p className='text-success m-0 font-weight-bold '>
                        {qty}x
                    </p>
                </div>
                <div className='mt-1 mb-1 small d-flex ml-2'>
                    Total harga: &nbsp;
                    <p className='text-success m-0 font-weight-bold '>
                        {getMoneyFormat(service.vendor_jasa_price * qty)}
                    </p>
                </div>
            </div>
        )}
    </Popup>
    )
}

const mapStateToProps = (state, ownProps)=>({
    vendor_qty: ownProps.vendor_qty,
    user_id: state.authentication.currentUser?.user_id
})

export default connect(mapStateToProps, {fillVendorJasa,isBookingVendor})(QuantityVendorPopup);