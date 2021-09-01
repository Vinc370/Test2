import React, {useState, useEffect} from 'react';
import HeaderNavigation from "../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import './Voucher.scss'
import Footer from "../../components/Footer/Footer";
import { connect } from 'react-redux'
import {Card, Button} from "react-bootstrap";

function ClaimVoucher({currentUser}){
    const [vouchers, setVouchers] = useState([]);
    const history = useHistory();
    const endpoint = 'https://lc-api.littlecloudeo.com/api/promo';
    const uid = 1;
    const getData = () => fetch(`${endpoint}/user/${uid}`)
    .then(res => res.json());

    useEffect(()=>{
        getData().then((data)=>{
            setVouchers(data);
        })
    }, [])

    const claimVoucher = (code,e)=>{
        e.preventDefault();
        fetch(`${endpoint}/claim/code`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id: uid,
                promo_code: code,
            })
        }).then(()=>{
            history.push("/my-voucher");
        })
        
    }

    return (
        <div className='manage-voucher'>
            <Header/>
            <HeaderNavigation title='Klaim Voucher'/>

            <div className="up-bottom-margin"/>

            <div className="container-voucher">
                <h5>Voucher</h5>
                <div className="vouchers up-bottom-margin">

                    {
                        vouchers?.map((v, key)=>{
                            return(
                                <Card className="up-bottom-margin" key={key} style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{v.promo_name}</Card.Title>
                                        <Card.Text className='small-italic-grey-text'>
                                            {v.promo_code}
                                        </Card.Text>
                                        <Button variant="primary" style={{
                                            margin: "0"
                                        }} onClick={(e)=> claimVoucher(v.promo_code,e)}>Claim Voucher</Button>
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

export default connect(mapStateToProps, null)(ClaimVoucher)