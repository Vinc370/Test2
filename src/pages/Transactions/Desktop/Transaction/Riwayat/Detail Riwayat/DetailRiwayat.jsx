import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import RiwayatCardComponent from '../../../../Main/Transaction/Riwayat/Component/RiwayatCardComponent';

function DetailRiwayat({riwayatPayment}){

  return (
    <Popup trigger={<button className='button'>Lihat Detail</button>} modal>
      {close => (
        <div className='normal-vendor-popup'>
          <div className='for-close' onClick={close}>
            &times;
          </div>
          <RiwayatCardComponent
            riwayatPayment={riwayatPayment}
          />
        </div>
      )}
    </Popup>
  )
}

export default DetailRiwayat;