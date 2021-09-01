import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../hooks/ScrollToTop';
import Akun from '../pages/Account/Akun/Akun';
import ChangePassword from '../pages/Account/ChangePassword/ChangePassword';
import ForgotPassword from '../pages/Account/ForgotPassword/ForgotPassword';
import UpdateAkunSaya from '../pages/Account/UpdateAkunSaya/UpdateAkunSaya';
import ForgotForm from '../pages/Authentication/Forgot/ForgotForm';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import Booklet from '../pages/Booklet/Booklet';
import CreateEvent from '../pages/Create Event/CreateEvent';
import CustomOrder from '../pages/CustomOrder/CustomOrder';
import DashboardPage from '../pages/Dashboard/Dashboard';
import AllEO from '../pages/EO Pages/AllEO/AllEO';
import PackageEO from '../pages/EO Pages/PackageEO/PackageEO';
import SingleEO from '../pages/EO Pages/SingleEO/SingleEO';
import EventPlanning from '../pages/EventPlanning/EventPlanning';
import EventPlanningType from '../pages/EventPlanning/EventPlanningType';
import Home from '../pages/Home/Home';
import SearchPage from '../pages/Home/SearchPage';
import MustLogin from '../pages/MustLogin/MustLogin';
import KonfirmasiPembayaran from '../pages/Transactions/Konfirmasi Pembayaran/KonfirmasiPembayaran';
import MenungguPembayaranMain from '../pages/Transactions/Main/Transaction/MenungguPembayaran/MenungguPembayaranMain';
import RiwayatMain from '../pages/Transactions/Main/Transaction/Riwayat/RiwayatMain';
import TagihanMain from '../pages/Transactions/Main/Transaction/Tagihan/TagihanMain';
import MenungguPembayaranDetail from '../pages/Transactions/Menunggu Pembayaran/Detail/MenungguPembayaranDetail';
import RiwayatDetail from '../pages/Transactions/Mobile/Riwayat/Detail/RiwayatDetail';
import EventList from '../pages/Transactions/Pemesanan/EventList';
import BuatEventSaya from '../pages/Transactions/Pemesanan/EventSaya/BuatEventSaya';
import Pemesanan from '../pages/Transactions/Pemesanan/Pemesanan';
import RiwayatTransaksi from '../pages/Transactions/Riwayat/RiwayatTransaksi';
import TagihanDetail from '../pages/Transactions/Tagihan/Detail/TagihanDetail';
import AllVendor from '../pages/Vendor Pages/AllVendor/AllVendor';
import DetailVendor from '../pages/Vendor Pages/DetailVendor/DetailVendor';
import SingleVendor from '../pages/Vendor Pages/SingleVendor/SingleVendor';
import SemuaVenue from '../pages/Venue/SemuaVenue/SemuaVenue';
import SingleVenue from '../pages/Venue/SingleVenue/SingleVenue';
import TambahVenue from '../pages/Venue/TambahVenue/TambahVenue';
import SingleBanner from '../pages/Vouchers/Banner/SinglePromoBanner';
import ClaimVoucher from '../pages/Vouchers/ClaimVoucher';
import MyVoucher from '../pages/Vouchers/MyVoucher';
import WhatsappForm from '../pages/Whatsapp/WhatsappForm';
import { initAllCulinaries } from '../redux/actions/culinary/culinary';
import { initAllUsedFacilities } from '../redux/actions/facility/facility';
import { initAllLocations } from '../redux/actions/location/location';
import { initAllTypes } from '../redux/actions/type/type';
import { checkUserLoginFromToken } from '../services/AuthService';
import GuestRoute from './GuestRoute';
import LoggedInRoute from './LoggedInRoute';

function Routes({ initAllLocations, initAllCulinaries, initAllUsedFacilities, initAllTypes }) {
    useEffect(() => {
        const init = () => {
            checkUserLoginFromToken()
            initAllLocations()
            initAllCulinaries()
            initAllTypes()
            initAllUsedFacilities()
        }

        init()
    }, [initAllLocations, initAllCulinaries, initAllTypes, initAllUsedFacilities])
    
    return (
        <Router>
            <ScrollToTop />
            <LastLocationProvider>
                {/* TODO: refactor to different files, change primitive string to constants */}
                <Switch>
                    <Route path='/' exact component = {Home}/>
                    <Route path='/event-organizer' exact component={AllEO}/>
                    <Route path='/event-organizer/:event_organizer_route' exact component={PackageEO} />
                    <Route path='/event-organizer/:event_organizer_name/:name/:id' exact component={SingleEO} />
                    <Route path='/venue' exact component = {SemuaVenue}/>
                    <Route path='/venue/:venue_route' exact component = {SingleVenue}/>
                    <Route path='/vendor' exact component={AllVendor}/>
                    <Route path='/vendor/:vendor_route' exact children={<SingleVendor/>}/>
                    <Route path='/vendor/:vendor_name/:name/:id' exact children={<DetailVendor/>} />
                    <Route path='/request-meeting' exact component = {WhatsappForm}/>
                    <Route path='/forgot-password' exact component = {ForgotPassword}/>
                    <Route path='/search' exact component={SearchPage}/>
                    <Route path='/promo/:url' exact component={SingleBanner}/>
                    
                    <GuestRoute path='/login' exact component = {Login}/>
                    <GuestRoute path='/register' exact component = {Register}/>
                    <GuestRoute path='/forgot' exact component = {ForgotForm}/>
                    {/* Dihide untuk sementara */}
                    <GuestRoute path='/login-first' exact component={ MustLogin}/>
                    
                    <LoggedInRoute path='/tambah-venue' redirectPath='/login' exact component = {TambahVenue}/>
                    <LoggedInRoute path='/riwayat-transaksi' redirectPath='/login' exact component={RiwayatTransaksi} />
                    <LoggedInRoute path='/custom-order/:id' redirectPath='/login' exact component={CustomOrder} />
                    <LoggedInRoute path='/keranjang' redirectPath='/login' exact component = {Pemesanan}/>
                    {/*<LoggedInRoute path='/transaksi' redirectPath='/login' exact component = {Transaksi}/>*/}
                    <LoggedInRoute path='/konfirmasi-pembayaran' redirectPath='/login' exact component = {KonfirmasiPembayaran}/>
                    
                    <LoggedInRoute path='/change-password' redirectPath='/login' exact component={ChangePassword} authType='login' />
                    <LoggedInRoute path='/akun' redirectPath='/login' exact component = {Akun}/>
                    <LoggedInRoute path='/update-akun' redirectPath='/login' exact component = {UpdateAkunSaya}/>

                    <LoggedInRoute path='/transaksi/tagihan' redirectPath='/login' exact component = {TagihanMain}/>
                    <LoggedInRoute path='/transaksi/tagihan/:id' redirectPath='/login' exact component={TagihanDetail}/>
                    <LoggedInRoute path='/transaksi/riwayat' redirectPath='/login' exact component = {RiwayatMain}/>
                    <LoggedInRoute path='/transaksi/riwayat/:id' redirectPath='/login' exact component = {RiwayatDetail}/>
                    <LoggedInRoute path='/transaksi/menunggu-pembayaran' redirectPath='/login' exact component = {MenungguPembayaranMain}/>
                    <LoggedInRoute path='/transaksi/menunggu-pembayaran/:id' redirectPath='/login' exact component={MenungguPembayaranDetail}/>

                    <LoggedInRoute path='/claim-voucher' redirectPath='/login' exact component={ClaimVoucher} />
                    <LoggedInRoute path='/my-voucher' redirectPath='/login' exact component={MyVoucher} />
                    <LoggedInRoute path='/event-planning' redirectPath='/login' exact component={EventPlanning}/>
                    <LoggedInRoute path='/event-planning/:type' redirectPath='/login' exact component={EventPlanningType} />
                    <LoggedInRoute path='/event-saya' redirectPath='/login' exact component={EventList}/>
                    <LoggedInRoute path='/buat-event-saya' redirectPath='/login' exact component={BuatEventSaya}/>

                    <LoggedInRoute path='/dashboard/:event_id' redirectPath='/login' exact component={DashboardPage} />
                    <LoggedInRoute path='/booklet/:event_id/:type' redirectPath='/login' exact component={Booklet} />
                    <LoggedInRoute path='/create-event' redirectPath='/login' exact component={CreateEvent}/>
                    
                    
                    {/* TODO: Error page */}
                    <Route path='/' component = {Home}/>
                </Switch>
            <Footer/>
            </LastLocationProvider>
        </Router>
    )
}

export default connect(null, {initAllLocations, initAllCulinaries, initAllTypes, initAllUsedFacilities})(Routes)
