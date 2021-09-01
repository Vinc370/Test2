import React from 'react'
import Fasilitas from '../../../../../Components/Fasilitas/Fasilitas'
import Paket from '../../../../../Components/Paket'
import AddOns from '../../../../../Components/AddOns/AddOns'
import InformasiTambahan from '../../../../../Components/InformasiTambahan'
import NumberInputWithButtons from '../../../../../../../../components/Form/Input/NumberInputWithButtons'
import { connect } from 'react-redux'
import {
    increaseGuestCount,
    decreaseGuestCount,
    changeGuestCount,
} from '../../../../../../../../redux/actions/venue/venueDetailData'
import Description from '../../../TopPart/Components/Description/Description'

import './LeftPart.scss'

function LeftPart({ venue, guestCount, increaseGuestCount, decreaseGuestCount, changeGuestCount }) {
    return (
        <div className="left-part-container">
            <Description />
            <div className="fasilitas-container">
                <h3 className="section-title__primary">Fasilitas</h3>
                <Fasilitas className="desktop" />
            </div>
            {/*<div className="mb-5">*/}
            {/*    <h3 className="font-weight-bold font-size-12 border-bottom pb-3 border-2 mb-5">Paket Tersedia</h3>*/}
            {/*    <div className="px-md-4">*/}
            {/*        <Paket height={450} />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* <div className="d-flex align-items-center flex-column mb-5">
                <h3 className="font-weight-bold font-size-12 mb-3">Jumlah Tamu</h3>
                <NumberInputWithButtons 
                    value={guestCount}
                    onIncrease={increaseGuestCount}
                    onDecrease={decreaseGuestCount}
                    onChange={changeGuestCount}
                    className="p-1"
                />
            </div> */}
            {/* <div className="text-grey text-center font-size-6 font-size-sm-7 border-bottom border-2 pb-3">
                <em>{venue.venue_name} menetapkan service charge sebesar {venue.venue_service_charge}%</em>
            </div> */}
            {/*<div className="py-5 border-bottom border-2">*/}
            {/*    <h3 className="font-weight-bold font-size-12 mb-3">Add-ons</h3>*/}
            {/*    <AddOns />*/}
            {/*</div>*/}
            <InformasiTambahan className="desktop" />
        </div>
    )
}

const mapStateToProps = state => ({
    guestCount: state.venueDetailData.guestCount,
    venue: state.singleVenue.data,
})

export default connect(
    mapStateToProps,
    {
        increaseGuestCount,
        decreaseGuestCount,
        changeGuestCount,
    }
)(LeftPart)
