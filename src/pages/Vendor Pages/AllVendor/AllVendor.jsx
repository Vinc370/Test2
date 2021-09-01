import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from "sweetalert2";
import CustomImage from "../../../components/CustomImage/CustomImage";
import HeaderNavigationV2 from "../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2";
import NavigationBar from "../../../components/ForMobile/NavigationBar/NavigationBar";
import Header from "../../../components/Header/Header";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { isBookingVendor, removeVendorJasa } from "../../../redux/actions/transaction/transaction";
import store from "../../../redux/Store";
import { getAllMappingVendors } from "../../../services/VendorService";
import { link } from "../../../sources/Variables";
import './AllVendor.scss';

function AllVendor(){
    useDocumentTitle('Vendor - Littlecloud');

    const history = useHistory();
    const [vendors, setVendor] = useState(null);
    const [datas, setDatas] = useState([]);
    
    useEffect(() => {
        getAllMappingVendors({vendor_connect_type: 'home'}).then((data) => { setVendor(data.data) });
        let reduxDatas = store.getState().transaction.transaction_vendor
        setDatas(reduxDatas)
    }, [])

    const remove=(id)=>{
        store.dispatch(removeVendorJasa(id))
        setDatas(datas.filter(item => item.vendor_jasa_id !== id))
    }

    const processVendor=()=>{

        if(store.getState().authentication.currentUser !== null){
            var url = link + '/api/keranjang/store';
            store.dispatch(isBookingVendor())

            let eoAndVendorData = store.getState().transaction;
            var formData = new FormData();
            formData.append("user_id", store.getState().authentication.currentUser.user_id)
            formData.append('vendor_jasas', JSON.stringify(eoAndVendorData.transaction_vendor))

            axios({
                method: 'post',
                url: url,
                data: formData,
                headers: { 'Content-Type': 'application/json' },
            })
              .then(function(response) {
              })
              .catch(function(error) {
                  fireSwal(error)
              });

            if(store.getState().transaction.have_seen_event === false){
                return history.push('/event-notification')
            }
            if(store.getState().transaction.have_seen_venue === false){
                return history.push('/venue-notification')
            }
            return history.push('/keranjang')
        }else{
            return history.push('/login');
        }

    }

    const fireSwal=(error)=>{
        Swal.fire({
            icon: 'error',
            title: 'Something Wrong Happened',
            text: error,
            timer: 3000,
        })
    }
    const GetTransactionVendorData=()=>{
        return(
          <React.Fragment>
              {datas.length === 0 ?
                <div/>
                :
                <div className='alert-info rounded p-2 position-sticky book-vendor-information' style={{
                    bottom:"0",
                    margin: "0"}}>
                    <p className='text-center bold-text m-0'>{datas.length} Vendor terpilih</p>
                    <div className="d-flex align-center">
                    <Popup trigger={<Button className='btn-primary' style={{
                                minWidth: "150px",
                                margin: "15px"
                            }}>Lihat Detail</Button>} modal>
                        {close => (
                            <table class="table table-striped table-borderless table-hover" style={{
                                width: "100%",

                            }}>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                                {datas?.map((data)=>(
                                <tr>
                                    <td>{data.vendor_jasa_name}</td>
                                    <td>{data.vendor_qty} pax</td>
                                    <td><Button className='btn-danger' onClick={()=>remove(data.vendor_jasa_id)}>remove</Button></td>
                                </tr>
                              ))}
                            </table>
                        )}
                    </Popup>
                    </div>
                    <div className="d-flex align-center">
                        <Button className='btn-signature' style={{
                            minWidth: "150px"
                        }} onClick={()=>processVendor()}>Process</Button>
                    </div>
                </div>
              }
          </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Header />
            <HeaderNavigationV2 title="Vendor" isBlack/>
            <div className='all-vendor mt-4 mt-lg-0'>
                <div className="">
                    <div className="align-horizontally text-evenly section-title">
                        <div>
                            <h5 className='font-weight-bold'>Vendor</h5>
                        </div>
                    </div>
                    <div className=''>
                        <div className="align-horizontally vendor-acara">
                            {vendors?.map((vendor, key) => (
                              <CustomImage
                                source={vendor.vendor_image}
                                link={'/vendor/' + vendor.vendor_route}
                                customContent={(
                                  <>
                                      <div className="overlay" />
                                      <p >{vendor.vendor_name}</p>
                                  </>
                                )}
                              />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {GetTransactionVendorData()}
            
            <NavigationBar/>
        </React.Fragment>
    )
}

export default AllVendor;
