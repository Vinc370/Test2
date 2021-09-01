import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Image } from "react-bootstrap";
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { fillVendorJasa, isBookingVendor } from "../../../redux/actions/transaction/transaction";
import UrlService from '../../../services/UrlService';
import { link } from "../../../sources/Variables";
import { getMoneyFormat } from "../../../utilities/Utilities";
import './PopupsForMobile.scss';

function ThemeVendorPopup({vendorid, serv, use, cart_vendor_detail_id, vari, fillVendorJasa, isBookingVendor, keranjang=false}){
    const history = useHistory();
    const vendorId = vendorid
    const [service, setService] = useState(serv);
    const [uses, setUses] = useState(use)
    const [cart, setCart] = useState(cart_vendor_detail_id)
    const [user, setUser] = useState(1)
    const [variation, setVariation] = useState(vari)  
    const [varIdx, setVarIdx] = useState(0);
    
    const getData = () => fetch(UrlService.vendorUrl()+'/jasa/'+service.vendor_jasa_id)
    .then(res => res.json())

    useEffect(() => {
        getData().then((data) => {
            setService(data);            
        })    
    }, [])

    var slides = [];
    service.vendor_jasa_variation?.forEach(element => {
        slides.push(<img style={{width: "95%"}} src={link + '/img/storage/' +element.vendor_jasa_variation_photo} alt=""/>);
        console.log(element)
    });

    const slideLeft = () =>{
        if(varIdx>0) setVarIdx(varIdx-1);
    }

    const slideRight = () =>{
        if(varIdx<slides.length) setVarIdx(varIdx+1);
    }
    

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
            return <button className='signature-button'>{getMoneyFormat(service.vendor_jasa_price)}</button>
        }
    }

    const generateActionButton = (uses) =>{
        if(uses === 'keranjang'){
            return <Button className='btn-danger' onClick={()=>onDeleteCartItem()}> Hapus </Button>
        }else if(uses === 'transaksi'){
            return
        }else{
            return <button className='btn-success button-popup' onClick={()=>processVendorJasa(service.vendor_id, service.vendor_jasa_id, service.vendor_jasa_name, varIdx+1, 1)}>Pilih</button>
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

    const showItems=(uses)=>{
        if(uses === "keranjang" || uses === "transaksi"){
            return <div className='rounded'>
                {variation &&
                    <div>
                        <Image className='w-100 rounded' src={link + '/img/storage/' +(variation?.vendor_jasa_variation_photo)}/>
                        <p className='text-white bold-text' style={{marginTop:"-3em",marginLeft:"1em"}}>{variation.vendor_jasa_variation_name}</p>
                    </div>
                }
            </div>
        }else{
            // return <ImageCarousel contents={variations}/>
            return <div style={{display: "flex", alignItems: "center"}}>
                <i class="fas fa-chevron-left" onClick={slideLeft}></i>
                {slides[varIdx]}
                <i class="fas fa-chevron-right" onClick={slideRight}></i>
            </div>
            
        }
    }

    return(
      <Popup trigger={<div>{generateTrigger(uses)}</div>} modal>
        {close => (
            <div className='theme-vendor-popup'>
                <div className='for-close' onClick={close}>
                    &times;
                </div>
                {showItems(uses)}
                <br/>
                <div className="pl-2">
                    <h4 className='bold-text mt-2 mb-0 '>{service.vendor_jasa_name}</h4>
                    <p className='small-italic-grey-text mb-2 '>{service.vendor_jasa_detail}</p>
                    <p className='bold-text text-success '>{getMoneyFormat(service.vendor_jasa_price)}/pax</p>
                </div>
                {generateActionButton(uses)}
            </div>
        )}
        </Popup>
    )
}

const mapStateToProps = (state, ownProps) =>({
    vendorid: ownProps.vendorid,
    serv: ownProps.service,
    use: ownProps.uses,
    cart_vendor_detail_id: ownProps.cart_vendor_detail_id,
    vari: ownProps.variation
})
export default connect(mapStateToProps, {fillVendorJasa,isBookingVendor})(ThemeVendorPopup);