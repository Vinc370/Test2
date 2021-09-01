import React from 'react'
import { Image } from 'react-bootstrap'
import UrlService from '../../../../../../services/UrlService'

function Vendor({ vendors }) {
    const getVendors = () => {
        return vendors?.map(vendor => (
            <div key={vendor.order_vendor_detail_id}>
                <h4 className='bold-text text-center mt-2 mb-3'>{vendor.vendor_jasa.vendor_jasa_name}</h4>
                <p className='bold-text text-center text-success'>Rp. {vendor.vendor_jasa.vendor_jasa_price} Nett</p>

                <br/>
                <h5>Deskripsi Paket:</h5>
                <p className='small-italic-grey-text'>{vendor.vendor_jasa.vendor_jasa_detail}</p>

                {getVendorTypeDetail(vendor)}
            </div>
        ))
    }

    const getVendorTypeDetail = vendor => {
        // normal do nothing
        if (vendor.vendor_jasa.vendor_jasa_type === 'variation') {
            return getVariationDetail(vendor)
        } else if (vendor.vendor_jasa.vendor_jasa_type === 'counter') {
            return getCounterDetail(vendor)
        }
    }

    const getVariationDetail= vendor => {
        const variation = vendor.vendor_jasa_variation
        return <div>
            <Image className='w-100 rounded' src={UrlService.getImageUrl(variation.vendor_jasa_variation_photo)}/>
            <p className='text-white bold-text' style={{marginTop:"-3em",marginLeft:"1em"}}>{variation.vendor_jasa_variation_name}</p>
        </div>
    }

    const getCounterDetail = vendor => {
        return <div>
            <h5>Jumlah:</h5>
            <p className='small-italic-grey-text'>{vendor.vendor_qty}</p>
        </div>
    }

    return (
        <div>
            {getVendors()}
        </div>
    )
}

export default Vendor
