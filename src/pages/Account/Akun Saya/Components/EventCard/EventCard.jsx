import { Col } from "react-bootstrap"
import { connect } from "react-redux"
import BlackCalendarIcon from '../../../../../assets/icons/BlackCalendarIcon'
import ChevronIcon from "../../../../../assets/icons/ChevronIcon"
import { setLoadingText } from "../../../../../utilities/Utilities"

function EventCard({ filled, action, bottom = false }) {
    return (
        <>
            <div onClick={()=>action()} className='d-flex rounded px-1 py-2 item-card-full align-items-center cursor-pointer' style={{border: '1px solid lightgrey'}}>
                <Col xs={1}>
                    <BlackCalendarIcon />
                </Col>
                <Col xs={9}>
                    {
                        filled?.map((item, k) => (
                            <p 
                                className='mb-0' 
                                style={{fontSize:'0.8125rem', fontWeight: 'bold'}} 
                                key={k}
                            >
                                {setLoadingText(item)}
                            </p>
                        ))
                    }
                </Col>
                <Col xs={2}>
                    <p className='text-right mb-0'><ChevronIcon color={'#282250'} style={{fontWeight: 100}}/></p>
                </Col>
            </div>
            {
                bottom === true ? 
                    <div className="mb-3"></div>
                    : null
            }
        </>
    )
}

export default connect(null, null)(EventCard)