import React from 'react'
import { connect } from "react-redux"
import RestaurantIcon from '../../../../../../../../assets/icons/RestaurantIcon'
import UserIcon from '../../../../../../../../assets/icons/UserIcon'
import { clickGAHandler, getMoneyFormat } from '../../../../../../../../utilities/Utilities'
import './RightPart.scss'


function RightPart({ singleVenue }) {
    const getSmallestPricedPackage = () => {
        return singleVenue.data.venue_package.reduce((accumulator, currentPackage) => {
            return (currentPackage.venue_package_sell_price / currentPackage.venue_package_total_pax) < (accumulator.venue_package_sell_price / accumulator.venue_package_total_pax) ? currentPackage : accumulator
        })
    }
    
    return (
        <div className="right-part-container">
            <div className="right-part-card">
                <div className="price-start-container">
                    <p className="label">
                        Mulai Dari
                    </p>
                    <p className="price">
                        {getMoneyFormat((getSmallestPricedPackage().venue_package_sell_price / getSmallestPricedPackage().venue_package_total_pax))}
                    </p>
                </div>
                <div className="pax-and-style">
                    <div className="pax-count">
                        <UserIcon />
                        <p>{singleVenue.data.venue_max_capacity} pax</p>
                    </div>
                    <div className="food-style">
                        <RestaurantIcon />
                        <p>{singleVenue.data.culinary.venue_one_category_name}</p>
                    </div>
                </div>
                <a onClick={clickGAHandler('Venue - '+singleVenue.data.venue_name, 'Chat dan Pesan')} target="_blank" rel="noopener noreferrer" className="contact-button text-center" href={"https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya tertarik dengan Venue "+singleVenue.data.venue_name+"%0A%0A"+window.location.href}>Chat dan Pesan</a>
            </div>
            {/* <div className="border rounded mb-5">
                <div className="p-3 font-weight-bold border-bottom">
                    Cara Memesan
                </div>
                <p className="py-3 pl-5 pl-xl-6 pr-1 font-weight-light font-size-9">
                    Anda dapat melakukan meeting dan berkonsultasi terlebih dahulu bersama dengan sales kami langsung melakukan transaksi di website
                </p>
                <div className="p-3 border-top">
                    <Link to="">
                        <u>
                            <em className="text-signature font-size-8">Butuh Bantuan? Hubungi CS Kami</em>
                        </u>
                    </Link>
                </div>
            </div>
            <div className="border rounded">
                <div className="p-3 font-weight-bold border-bottom">
                    Kebijakan Pembatalan
                </div>
                <p className="p-3 font-weight-light">
                    Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf
                </p>
                <div className="p-3 border-top">
                    <Link to="">
                        <u>
                            <em className="text-signature font-size-8">Butuh Bantuan? Hubungi CS Kami</em>
                        </u>
                    </Link>
                </div>
            </div> */}
        </div>
    )
}

const mapStateToProps = state => ({
    singleVenue: state.singleVenue
})

export default connect(
  mapStateToProps
)(RightPart)
