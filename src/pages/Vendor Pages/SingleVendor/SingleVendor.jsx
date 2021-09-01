import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import RightArrowBold from '../../../assets/icons/RightArrowBold';
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import Header from '../../../components/Header/Header';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useWindowSize from '../../../hooks/useWindowSize';
import '../../../index.css';
import { forceStoreVendorToCart, getUserCart, storeVendorToCart } from '../../../services/KeranjangService';
import { getVendor } from '../../../services/VendorService';
import { getMoneyFormat, processWords } from "../../../utilities/Utilities";
import VendorPopUp from '../PopupsForMobile/VendorPopUp';
import './SingleVendor.scss';
import {getCurrentUser} from "../../../services/AuthService";

function SingleVendor(){
  const {isMobile, size} = useWindowSize();
  
  const history = useHistory();
  const {vendor_route} = useParams();
  const [vendor, setVendor] = useState("");
  const [services, setServices] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [totalCartVendor, setTotalCartVendor] = useState(0)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  
  const getData = () => getVendor(vendor_route)
  const getVendorCart = () => getUserCart()
  
  useDocumentTitle((services?.vendor_jasa_name ?? 'Vendor') + ' - Vendor - Littlecloud');
  
    useEffect(() => {
      getData().then((response) => {
        setVendor(response.data.vendor_name);
        setServices(response.data.vendor_jasa)
      })

      getVendorCart().then((response) => {
        setTotalCartVendor(response.data.cart_vendor_detail.length)
      })
    }, [])

    const onClick = (service) => {
      if (isMobile) {
        openPopUp(service)
      } else {
        history.push(`/vendor/${processWords(service.vendor.vendor_name)}/${processWords(service.vendor_jasa_name)}/${service.vendor_jasa_id}`)
      }
    }

    const items =
    services?.map(service => (
        <div onClick={() => onClick(service)} key={service.vendor_jasa_id} className='vendor-card__container'>
          <div
            className="vendor-card__wrapper"
            style={{
              backgroundImage: `url("https://lc-api.littlecloudeo.com/img/storage/${service.vendor_jasa_image}")`
            }}
          >
            <div className="vendor-card__content">
              <p className="vendor-card__title">
                {service.vendor_jasa_name}
              </p>
              <p className="vendor-card__price">
                {getMoneyFormat(service.vendor_jasa_price)}
              </p>
            </div>
          </div>
        </div>
    ))

    const orderService = async (service, variation_idx, count) => {
      if(await getCurrentUser() == null){
        history.push("/login");
        return
      }
      setIsPopUpOpen(false)

      const res = {
        'vendor_jasa_id': service.vendor_jasa_id,
        'vendor_jasa_variation_id': service.vendor_jasa_type === 'variation' ? service.vendor_jasa_variation[variation_idx].vendor_jasa_variation_id : null,
        'vendor_qty': service.vendor_jasa_type === 'counter' ? count : 1
      }

      setIsLoading(true)
        try{
          await storeVendorToCart(res)
            .then((response) => {  
              getVendorCart().then((response) => {
                setTotalCartVendor(response.data.cart_vendor_detail.length)
              })
            })
            .catch((error) => {
              if(error.response.status === 422) {
                Swal.fire({
                  icon: 'warning',
                  title: error.response.data.message,
                  text: 'Jika kamu melanjutkan maka semua barang di keranjang akan dihapus dan silakan melakukan pemesanan ulang',
                  footer: '<a href="https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya mengalami kesulitan ketika ingin memesan event." target="_blank">Hubungi kami</a>',
                  showCancelButton: true,
                  confirmButtonText: 'Lanjutkan',
                  cancelButtonText: 'Kembali',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    forceStoreVendorToCart(res).then((res2) => {
                      getVendorCart().then((res3) => {
                        setTotalCartVendor(res3.data.cart_vendor_detail.length)
                      })
                    })
                  }
                });
              }
            })

        }catch(err){
          if(err.response?.status === 401) {
            history.push('/login')
          }
        }
        setIsLoading(false)
    }

    const openPopUp = (service) => {
      setSelectedData(service)
      setIsPopUpOpen(true)
    }

    const closePopUp = () => {
      setIsPopUpOpen(false)
    }

    return(
      <>
        <VendorPopUp
          isOpen={isPopUpOpen}
          data={selectedData}
          close={closePopUp}
          submit={orderService}
        />
        {!isMobile && <Header/>}
        <HeaderNavigationV2
          title={vendor}
          isBlack
          sticky={true}
        />
        <div className="single-vendor-main-container single-vendor">
            {/* <div className="for-decor d-lg-none d-xl-none"></div> */}
            {/* <div className="vendor-container signature-color-background flex-column w-75 d-lg-none d-xl-none">
              <h3 className='font-weight-bold text-center'>{vendor}</h3>
              <p className='m-0 text-left'>These are the packages of the various vendors to create a lively event</p>
            </div> */}
            <div className="item-container general-desktop-container">
                <h1 className="title section-title__primary">
                  {vendor}
                </h1>
                {
                  items
                }               
            </div>
            {/*  */}
            {/* <NavigationBar/> */}
            {
              isMobile ? 
                totalCartVendor > 0 &&
                <Link to="/keranjang" className="selected-vendor">
                  <span>
                    {totalCartVendor} Vendor Dalam Draft
                  </span>
                  <RightArrowBold className="icon" />
                </Link>
                : null
            }
        </div>
      </>
    )
    
}

export default SingleVendor