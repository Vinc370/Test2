import React, {useState, useEffect}  from 'react';
import HeaderNavigation from "../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import Header from "../../components/Header/Header";
import './Voucher.scss'
import Footer from "../../components/Footer/Footer";
import { connect } from 'react-redux'
import {Card, Button} from "react-bootstrap";

function MyVoucher({currentUser}){
    const endpoint = `https://lc-api.littlecloudeo.com/api/promo/claimed`;
    const [code, setCode] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const uid = currentUser.user_id;
    const getData = () => fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            user_id: uid,
        })
    })
    .then(res => res.json());


    useEffect(() => {
        getData().then((data) => {
            setVouchers(data);
        })
  
    }, [])

    const claimRefferal = (e)=>{

    }
    const handleCode = (e)=>{
        setCode(e.target.value);
    }

    const uPromo = (id,e)=>{
        fetch(`https://lc-api.littlecloudeo.com/api/promo/use`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id: uid,
                promo_id: id
            })
        }).then(()=>{
            window.location.reload();
        })
    }
    
    return(
        <div className='manage-voucher'>
            <Header/>
            <HeaderNavigation title='Klaim Voucher'/>
            <div className="up-bottom-margin"/>
            <div className="container-voucher">
                <h5>Referral code</h5>

                <div className="up-bottom-margin">
                    <div className='align-horizontally'>
                        <form onSubmit={e => claimRefferal(e)}>
                            <input type="text" name="code" style={{minWidth: "150px"}} onChange={handleCode}/>
                            <button className="btn btn-primary">Claim</button>
                        </form>
                    </div>
                </div>
                <h5>Voucher</h5>

                <div className="vouchers up-bottom-margin">

                    {
                        vouchers?.map((v,key)=>{
                            return(
                                <Card className="up-bottom-margin" key={key} style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{v.promo_name}</Card.Title>
                                        <Card.Text className='small-italic-grey-text'>
                                            {v.promo_code}
                                        </Card.Text>
                                        <Button variant="primary" style={{
                                            margin: "0"
                                        }} onClick={(e)=> uPromo(v.promo_id,e)}>Use</Button>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    }
                </div>

            </div>

            
        </div>
    );
    
}

const mapStateToProps = state => ({
    currentUser: state.authentication.currentUser
})

export default connect(mapStateToProps, null)(MyVoucher)