import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AccountMain from '../../../Account/AccountMain/AccountMain';

function TransactionMain({type, item=null}) {
  const [chosen, setChosen] = useState("menunggu-pembayaran");
  const [leftOption, setLeftOption] = useState("active-border");
  const [centerOption, setCenterOption] = useState("");
  const [rightOption, setRightOption] = useState("");
  const [leftButton, setLeftButton] = useState("grey-button");
  const [centerButton, setCenterButton] = useState("white-button");
  const [rightButton, setRightButton] = useState("white-button");

  useEffect(()=>{
    map_state[type]()
  }, [])

  const state_menunggu_pembayaran = () => {
    setChosen("menunggu-pembayaran");
    setLeftOption("active-border");
    setCenterOption("");
    setRightOption("");
    setLeftButton("grey-button");
    setCenterButton("white-button");
    setRightButton("white-button");
  };

  const state_tagihan = () =>{
    setChosen("tagihan");
    setLeftOption("");
    setCenterOption("active-border");
    setRightOption("");
    setLeftButton("white-button");
    setCenterButton("grey-button");
    setRightButton("white-button");
  }

  const state_riwayat = () => {
    setChosen("riwayat");
    setLeftOption("");
    setCenterOption("");
    setRightOption("active-border");
    setLeftButton("white-button");
    setCenterButton("white-button");
    setRightButton("grey-button");
  };

  const map_state = {
    'menunggu-pembayaran': event => state_menunggu_pembayaran(),
    'riwayat': event => state_riwayat(),
    'tagihan': event => state_tagihan()
  }

  return (
    <>
        <AccountMain
          title='Transaksi Saya'
          sidebar='transaksi'
          item={
          <>
            <div className='right-container w-100'>
              <div className='container-keranjang general-desktop-container '>
                <div className='align-horizontally'>
                  <div className="w-100">
                    <div className='align-horizontally for-options'>
                      <div className={"transaksi-button d-flex align-items-center mr-2 " + leftOption}>
                        <Link to={'/transaksi/menunggu-pembayaran'} className={leftButton+' m-auto my-button'}>Menunggu Pembayaran</Link>
                      </div>
                      <div className={"transaksi-button d-flex align-items-center mr-2 " + centerOption}>
                      <Link to={'/transaksi/tagihan'} className={centerButton+' m-auto my-button'}>Tagihan</Link>
                      </div>
                      <div className={"transaksi-button d-flex align-items-center mr-2 " + rightOption}>
                      <Link to={'/transaksi/riwayat'} className={rightButton+' m-auto my-button'}>Riwayat</Link>
                      </div>
                    </div>
                  </div>
                </div>
                {item}
              </div>
            </div>
        </>
        }
        />
    </>
  );
}

export default withRouter(TransactionMain)