import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TagihanCardComponent from "../../../../Main/Transaction/Tagihan/Component/TagihanCardComponent";
import './DetailTagihan.scss';

function DetailTagihan({item, k}){

  return (
    <Popup trigger={<button className='button'>Lihat Detail</button>} modal>
      {close => (
        <div className='normal-vendor-popup the-container'>
          <div className='for-close' onClick={close}>
            &times;
          </div>
          <div className="event-bill-page-container">
            <TagihanCardComponent
              tagihan={item}
              key={k}
            />
          </div>
        </div>
      )}
    </Popup>
  )
}

export default DetailTagihan;