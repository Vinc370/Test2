import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import {link} from "../../../sources/Variables";
import store from '../../../redux/Store'
import {Link} from "react-router-dom";

export default class PopupCancel extends React.Component {

    state={
        reason:''
    }

    handleInput=(name, input)=>{
        this.setState({[name]: input})
    }

    removeCart=()=>{
        var url = link + '/api/keranjang/all/delete'

        var formData= new FormData();
        formData.append('user_id', store.getState().authentication.currentUser.user_id)

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    render(){
        return(
          <Popup trigger={<p className='text-center text-danger'>Batalkan pesanan</p>} modal>
              {close => (
                <div className='batalkan-pesanan'>
                    <div className='for-close border-bottom' onClick={close}>
                        &times;
                    </div>
                    <h4 className='bold-text text-center border-bottom py-3'>Alasan Pembatalan: </h4>

                    <div className="align-horizontally">
                        <input className='mr-2 mt-1' type="radio" value="ganti promo" name="alasan" onChange={(e)=>this.handleInput('reason', e.currentTarget.value)}/> <p>Saya ingin mengganti promo</p>
                    </div>
                    <div className="align-horizontally">
                        <input className='mr-2 mt-1' type="radio" value="ubah pesanan" name="alasan" onChange={(e)=>this.handleInput('reason', e.currentTarget.value)}/> <p>Saya ingin merubah pesanan</p>
                    </div>
                    <div className="align-horizontally">
                        <input className='mr-2 mt-1' type="radio" value="nunggu lama" name="alasan" onChange={(e)=>this.handleInput('reason', e.currentTarget.value)}/> <p>Saya menunggu terlalu lama</p>
                    </div>
                    <div className="align-horizontally">
                        <input className='mr-2 mt-1' type="radio" value="" name="alasan" /> <p>Lainnya: </p>
                    </div>
                    <input className='p-2 border-top-0 border-left-0 border-right-0' type="text" name='alasan-lainnya' placeholder='Silahkan tuliskan alasan kalian disini' onChange={(e)=>this.handleInput('reason', e.currentTarget.value)}/>

                    <br/>

                    <p className='text-center text-danger bold-text' onClick={()=>this.removeCart()}>
                        <Link to={'/keranjang'}>
                            Batalkan pesanan
                        </Link>
                    </p>

                </div>
              )}
          </Popup>
        )
    }
}