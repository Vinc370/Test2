import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopupsForMobile.scss'
import {Button} from "react-bootstrap";
import {link} from "../../../sources/Variables";
import {fillVendorJasa, isBookingVendor} from "../../../redux/actions/transaction/transaction";
import axios from "axios";
import {useHistory} from 'react-router'
import { connect } from 'react-redux';
import {getMoneyFormat} from "../../../utilities/Utilities";

function NormalVendorPopup({vendorid, serv, use,cart_vendor_detail_id, fillVendorJasa, isBookingVendor}){
    const history = useHistory(); 
    const vendorId = useState(vendorid);
    const [service, setService] = useState(serv);
    const [quantity, setQuantity] = useState(1);
    const [vendorJasaVariation, setVendorJasaVariation] = useState(null);
    const [uses, setUses] = useState(use);
    const [cart, setCart] = useState(cart_vendor_detail_id)
    const [user, setUser] = useState(1)

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

    const generateTrigger = (uses) =>{
        if(uses === 'keranjang' || uses === 'transaksi'){
            return <a className='primary-text' style={{color: '#007bff'}}> Lihat Detail</a>
        }else if(uses === "detail"){
            return <button className='signature-button'>Pesan sekarang</button>
        }else{
            return <button className='signature-button'>Rp {service.vendor_jasa_price}</button>
        }
    }

    const generateActionButton = (uses) =>{
        if(uses === 'keranjang'){
            return <Button className='btn-danger' onClick={()=>onDeleteCartItem()}> Hapus </Button>
        }else if(uses === 'transaksi'){
            return
        }else{
            return <button className='btn-success button-popup' onClick={()=>processVendorJasa(service.vendor_id, service.vendor_jasa_id, service.vendor_jasa_name, vendorJasaVariation, quantity)}>Pilih</button>
        }
    }
    const onDeleteCartItem = () =>{
        var url = link + '/api/keranjang/vendor/delete'

        var formData= new FormData();
        formData.append('user_id', user)
        formData.append('cart_vendor_detail_id', cart)

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

    return (
        <Popup trigger={<div>{generateTrigger(uses)}</div>} modal>
        {close => (
            <div className='normal-vendor-popup'>
                <div className='for-close' onClick={close}>
                    &times;
                </div>
                <img src={`https://lc-api.littlecloudeo.com/img/storage/${service.vendor_jasa_image}`} alt="" className='rounded'/>
                <p className='small-italic-grey-text mt-1 mb-1'>
                    {service.vendor_jasa_detail}
                </p>
                <p className='bold-text text-success mb-4'>{getMoneyFormat(service.vendor_jasa_price)}</p>

                {generateActionButton(uses)}
            </div>
        )}
    </Popup>
    )
}
const mapStateToProps = (state, ownProps)=>({
    vendorid: ownProps.vendorid,
    serv: ownProps.service,
    use: ownProps.uses,
    cart_vendor_detail_id: ownProps.cart_vendor_detail_id
})
export default connect(mapStateToProps, {fillVendorJasa,isBookingVendor})(NormalVendorPopup);