import { Col } from "react-bootstrap";
import './TransactionComponent.scss';

function TransactionComponent({usage= "menunggu pembayaran", name, location, event_date, description, date, amount, status, action = null, action2 = null}) {
  return(
    <div className='menunggu-pembayaran '>
      <div className="container-menunggu-pembayaran">
        <Col xs={6}>
          <p className='title'>{name}</p>
          <p  className='subtitle'>{description}</p>
          <p className='subtitle'>Lokasi: {location}</p>
          <p className='information-text'>{event_date}</p>
          {action2}
        </Col>
        <Col xs={6}>
          <div className="menunggu-pembayaran-right">
            <p className='status'>
              {status}
            </p>
            <div className="bottom-right">
              <p className='subtitle'>Jumlah Tagihan</p>
              <p className='price'>{amount}</p>
              {usage === 'tagihan' ?
                <></>
                :
                <p className='information-text'>
                  {usage === 'riwayat' ? 'Dibayar pada' : 'Bayar sebelum'} {date}
                </p>
              }
              {action}
            </div>
          </div>
        </Col>
      </div>

    </div>
  )
}

export default TransactionComponent;