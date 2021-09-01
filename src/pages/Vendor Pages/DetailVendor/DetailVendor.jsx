import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './DetailVendor.scss';
import { Card } from 'react-bootstrap';
import UrlService from '../../../services/UrlService';
import {fillVendorJasa, isBookingVendor} from "../../../redux/actions/transaction/transaction";
import { connect } from 'react-redux'
import {useHistory} from 'react-router'
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import NavigationBar from "../../../components/ForMobile/NavigationBar/NavigationBar";
import { getMoneyFormat } from '../../../utilities/Utilities';
import VariasiPopup from './VariasiPopup';
import { storeVendorToCart } from '../../../services/KeranjangService';
import {link} from "../../../sources/Variables";
import Swal from "sweetalert2";


function DetailVendor({fillVendorJasa, isBookingVendor}){

    const history = useHistory();    
    const [optionIdx, setOptionIdx] = useState(0);
    const [width] = useState("100vw");
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();
    const [service, setService] = useState([]);
    const [variations, setVariations] = useState([]);
    const [vendorJasaVariation, setVendorJasaVariation] = useState(null);
    const [variationId, setVariationId] = useState(null);
    const [variationName, setVariationName] = useState('+Pilih Variasi')
    let option = [];

    const getData = () => fetch(UrlService.vendorUrl()+'/jasa/'+id)
    .then(res => res.json())

    const changeOpt = (opt)=>{
        if(opt === "single"){
            setOptionIdx(0);
        }else if(opt === "variation"){
            setOptionIdx(1);
        }else if(opt === "counter"){
            setOptionIdx(2);
        }
    }

    useEffect(() => {
        getData().then((data) => {
            setService(data);            
            changeOpt(data.vendor_jasa_type);
            setVariations(data.vendor_jasa_variation)
        })    
    }, [])

    option = [];
    option.push("");
    option.push(
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', margin: '10px 0'}}>
            <h3 style={{fontSize: '15pt'}}>Pilih Tema:</h3>
            <div className='d-flex'>
                {
                    variations?.map(variation =>(
                      <div onClick={() => setVendorJasaVariation(variation.vendor_jasa_variation_id)} style={{cursor: "pointer"}}>
                          <img className="theme-img"
                               src= {`https://lc-api.littlecloudeo.com/img/storage/${variation.vendor_jasa_variation_photo}`}
                               alt="" />
                      </div>
                    ))
                }
            </div>
        </div>);
    option.push(
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', margin: '10px 0'}}>
            <h3 style={{fontSize: '15pt'}}>Jumlah:</h3>
            <div>
            <button className="qty-button" onClick={()=>{
            if(quantity>1){
                setQuantity(quantity - 1)
            }
            }}>-</button>
            <input type="number" name="" id="" class="vendor-qty" value={quantity}/>
            <button className="qty-button" onClick={()=>setQuantity(quantity + 1)}>+</button>
            </div>
        </div>
    )

    const processVendorJasa=async (vendor_id, vendor_jasa_id, vendor_jasa_name, vendor_jasa_variation_id, vendor_qty)=>{

        if(service.vendor_jasa_type === "variation"){
            if(variationId === null){
                Swal.fire({
                    icon: 'warning',
                    title: 'Pilih variasi',
                    text: 'Jika kamu ingin melanjutkan untuk memesan, maka pastikan untuk memilih variasi terlebih dahulu',
                })
                return
            }
        }
        const res = {
            'vendor_jasa_id': vendor_jasa_id,
            'vendor_jasa_variation_id': service.vendor_jasa_type === 'variation' ? variationId : null,
            'vendor_qty': service.vendor_jasa_type === 'counter' ? vendor_qty : null
        }

        try{
            await storeVendorToCart(res)
        }catch(err){
            if(err.response.status === 401) {
                history.push('/login')
            }
        }
        history.push('/keranjang')
    }

    const onSelectVariasiPopup = (variation)=>{
        setVariationId(variation.vendor_jasa_variation_id)
        setVariationName(variation.vendor_jasa_variation_name)
    }

    return(
        <React.Fragment>
            <Header />
            <HeaderNavigation title="vendor"/>
            <div className="detail-vendor-main-container general-desktop-container">
                <div className="header">
                    <div className="image-container">
                        <img
                            src={`https://lc-api.littlecloudeo.com/img/storage/${service.vendor_jasa_image}`}
                        />
                    </div>
                    <div className="price-card-container">
                        <div className="price-card">
                            {
                                service.vfendor_jasa_type === 'counter' ?
                                    <div className="counter">
                                        <p>
                                            Count
                                        </p>
                                        <div className="counter-buttons">
                                            <button
                                                className={`button ${quantity <= 0 ? 'disabled' : ''}`}
                                                onClick={() => setQuantity(prev => prev - 1)}
                                                disabled={quantity <= 0}
                                            >
                                                -
                                            </button>
                                            <div className="counter">
                                                {quantity}
                                            </div>
                                            <button
                                                className="button"
                                                onClick={() => setQuantity(prev => prev + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    service.vendor_jasa_type !== 'single' ?
                                        <div className="variation">
                                            <p>
                                                Variasi
                                            </p>
                                            <VariasiPopup
                                                variation={variations}
                                                onSelected={variasi => onSelectVariasiPopup(variasi)}
                                                variationName={variationName}
                                            />
                                            {/* <button
                                                onClick={() => setIsVariasiPopupOpen(true)}
                                            >
                                                +Pilih Variasi
                                            </button> */}
                                        </div>
                                        :
                                        <div className="spacer" />
                            }
                            <div className="total-price">
                                <p>
                                    Total Price
                                </p>
                                <p>
                                    {getMoneyFormat(service.vendor_jasa_price)}
                                </p>
                            </div>
                            <button
                                className="order-button"
                                onClick={()=>processVendorJasa(service.vendor_id, service.vendor_jasa_id, service.vendor_jasa_name, vendorJasaVariation, quantity)}
                            >
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
                {/* <Card className="detail-card" style={{ width: {width} }} >
                    <Card.Body>
                        <Card.Title>
                            {service.vendor_jasa_name}
                        </Card.Title>
                        <Card.Text>
                            Rp. {service.vendor_jasa_price}
                        </Card.Text>
                        {option[optionIdx]}
                        <button className="signature-button" onClick={()=>processVendorJasa(service.vendor_id, service.vendor_jasa_id, service.vendor_jasa_name, vendorJasaVariation, quantity)}>Pesan Sekarang</button>
                    </Card.Body>
                </Card> */}
                
                <div className="detail-container">
                    <h1 className="title">
                        {service.vendor_jasa_name}
                    </h1>
                    <div className="description-container">
                        <h3 className="section-title__primary">Deskripsi Paket</h3>
                        <p>{service.vendor_jasa_detail}</p>
                    </div>
                    {
                        (service.vendor_jasa_type !== 'counter' && service.vendor_jasa_type !== 'single') &&
                        <>
                            <hr className="divider" />
                            <div className="variation-container">
                                <h3 className="section-title__primary">Variasi</h3>
                                <div className="variation-item-container">
                                    {console.log(variations)}
                                    {
                                        variations?.map(variasi =>
                                            <div key={variasi.vendor_jasa_variation_id} className="variation-item">
                                                <div className="image-container">
                                                    <img
                                                        src={link+'/img/storage/'+variasi.vendor_jasa_variation_photo}
                                                        alt="variation"
                                                    />
                                                </div>
                                                <p className="variation-title">
                                                    {variasi.vendor_jasa_variation_name}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {/* <div className="info-container">
                        <Card className="info-card">
                            <Card.Body>
                                <Card.Title>Cara Memesan</Card.Title>
                                <Card.Text>
                                    Anda dapat melakukan meeting dan berkonsultasi terlebih dahulu bersama sales kami / langsung melakukan transaksi di website
                                </Card.Text>
                                <Card.Link href="#">Butuh Bantuan? Hubungi CS Kami</Card.Link>
                            </Card.Body>
                        </Card>
                        <Card className="info-card">
                            <Card.Body>
                                <Card.Title>Kebijakan Pembatalan</Card.Title>
                                <Card.Text>
                                    Apabila anda sudah melakukan transaksi melalui website kami dan anda ingin membatalkan transaksi tersebut, anda dapat melihat kebijakan pembatalan kami
                                </Card.Text>
                                <Card.Link href="#">Lihat Kebijakan Pembatalan Kami</Card.Link>
                            </Card.Body>
                        </Card>
                    </div> */}
                </div>
            </div>
            
        </React.Fragment>
    )
    
}

export default connect(null, {fillVendorJasa,isBookingVendor})(DetailVendor)