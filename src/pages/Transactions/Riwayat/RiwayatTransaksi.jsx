import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import CardNoImage from '../../../components/Card/CardNoImage';
import Header from '../../../components/Header/Header';
import CurrentPageHeader from '../../../components/Header/Mobile/CurrentPageHeader/CurrentPageHeader';
import useWindowSize from '../../../hooks/useWindowSize';
import OrderInformation from './Components/OrderInformation/OrderInformation';
import OrderList from './Components/OrderList';
import styles from './RiwayatTransaksi.module.scss';

function RiwayatTransaksi() {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const {isMobile, size} = useWindowSize();
    
    const resetView = () => {
        setSelectedOrder(null)
    }

    return (
        <div className='min-height-95'>
            {
                isMobile
                ? <CurrentPageHeader currentPage="Keranjang Saya" />
                : <Header />
            }

            <main className='my-5 px-3 px-md-6'>
                <div>
                    <div className='align-horizontally'>
                        <Col md={8}>
                            <div className='align-horizontally w-100'>
                                <div className="border-bottom border-2 border-lg-0 border-signature p-2 p-lg-0 mb-3 mb-lg-0 d-flex align-items-center mr-2">
                                    <div 
                                        className={`font-weight-bold rounded px-4 py-2 ${styles.greyHeader}`}
                                        role="button"
                                        onClick={() => resetView()}
                                    >
                                        Riwayat Transaksi
                                    </div>
                                </div>
                            </div>
        
                            <hr className="d-none d-lg-block" />

                            <div className='px-md-3 mt-4'>
                                {
                                    selectedOrder
                                    ? <OrderInformation order={selectedOrder} />
                                    : <OrderList onClick={setSelectedOrder} />
                                }
                            </div>
                        </Col>
        
                        <Col md={4} className="d-none d-md-block">
                            <div className="up-bottom-margin">
                            <CardNoImage
                                title="Cara Memesan"
                                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, delectus dolor doloremque earum explicabo in molestiae perferendis similique. Dignissimos earum expedita magnam, necessitatibus nisi nobis nostrum. Inventore reiciendis vero voluptates!"
                                link="Butuh bantuan? Hubungi Kami"
                                className='up-bottom-margin'
                            />
                            </div>
        
                            <div className="up-bottom-margin">
                            <CardNoImage
                                title="Cara Memesan"
                                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, delectus dolor doloremque earum explicabo in molestiae perferendis similique. Dignissimos earum expedita magnam, necessitatibus nisi nobis nostrum. Inventore reiciendis vero voluptates!"
                                link="Butuh bantuan? Hubungi Kami"
                                className='up-bottom-margin'
                            />
                            </div>
        
                            <div className="up-bottom-margin">
                            <CardNoImage
                                title="Cara Memesan"
                                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, delectus dolor doloremque earum explicabo in molestiae perferendis similique. Dignissimos earum expedita magnam, necessitatibus nisi nobis nostrum. Inventore reiciendis vero voluptates!"
                                link="Butuh bantuan? Hubungi Kami"
                                className='up-bottom-margin'
                            />
                            </div>
                        </Col>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RiwayatTransaksi
