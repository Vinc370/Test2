import React from 'react'
import { connect } from 'react-redux'
import './Transaction.scss'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MenungguPembayaran from "../../../../../assets/images/menunggu-pembayaran.png";
import Riwayat from "../../../../../assets/images/pesanan-berlangsung.png";
import TagihanLittlecloud from "../../../../../assets/images/tagihan.png";

function Transaction({ countMenunggu = 0, countTagihan = 0, existNewRiwayat = false}) {
    return (
        <div className="transaction__container">
            <h1 className="title">Transaksi</h1>
            <div className="container-card">
                <Link to="/transaksi/menunggu-pembayaran" className="item">
                    {countMenunggu === 0 ?
                      <></>
                      :
                      <div className='notifications'>
                          {countMenunggu}
                      </div>
                    }
                    <Image 
                        src={MenungguPembayaran}
                        className="img-transparent"
                    />
                    <label className="label-item">Menunggu Pembayaran</label>
                </Link>
                <Link to="/transaksi/tagihan" className="item">
                    {countTagihan === 0 ?
                      <></>
                      :
                      <div className='notifications'>
                          {countTagihan}
                      </div>
                    }
                    <Image 
                        src={TagihanLittlecloud}
                        className="img-transparent"
                    />
                    <label className="label-item">Tagihan</label>
                </Link>
                <Link to="/transaksi/riwayat" className="item">
                    {existNewRiwayat === true ?
                      <div className='notifications'>
                          !
                      </div>
                      :
                      <></>
                    }
                    <Image 
                        src={Riwayat}
                        className="img-transparent"
                    />
                    <label className="label-item">Riwayat</label>
                </Link>
            </div>
        </div>
    )
}

export default connect(null, null)(Transaction)
