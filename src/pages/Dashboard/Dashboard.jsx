import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { IoMdSearch } from 'react-icons/io'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import DashboardDotsIcon from '../../assets/icons/DashboardDotsIcon'
import DashboardHeartIcon from '../../assets/icons/DashboardHeartIcon'
import DashboardTagIcon from '../../assets/icons/DashboardTagIcon'
import DashboardTrendUpIcon from '../../assets/icons/DashboardTrendUpIcon'
import HeaderNavigationV2 from '../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import { getUserEventByID } from '../../services/EventService'
import { getDateFormat, getDifferenceDate } from '../../utilities/Utilities'
import './Dashboard.scss'

const DashboardPage = ({user}) => {
    const [value, setValue] = useState(new Date());
    const { event_id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        getUserEventByID(event_id).then((response) => {     
            setEvent(response.data)
        });
    }, []);

    const onChange = (nextValue) => {
      setValue(nextValue)
    }

    return (
        <>
            <div className="dashboard-page">
                <div className="sidebar">
                    <Link to={'/'}>
                        <img
                            src={`/logo-dark.png`}
                            alt="LittleCloud"
                            width="186"
                            height="44"
                            className="img-transparent"
                            id="logo"
                        />
                    </Link>
                    <p className="title">
                        Wedding<br/> Events
                    </p>
                    <Link to="/dashboard" className="sidebar-item active">
                        <DashboardHeartIcon className="icon" />
                        <p className="label">
                            Home
                        </p>
                    </Link>
                    <Link to={"/booklet/"+event?.event_id+"/lokasi"} className="sidebar-item">
                        <DashboardHeartIcon className="icon" />
                        <p className="label">
                            Booklet Saya
                        </p>
                    </Link>
                    {/* <Link to="/dashboard" className="sidebar-item">
                        <DashboardTagIcon className="icon smaller" />
                        <p className="label">
                            Rundown
                        </p>
                    </Link>
                    <Link to="/dashboard" className="sidebar-item">
                        <DashboardHeartIcon className="icon" />
                        <p className="label">
                            Jadwal Meeting
                        </p>
                    </Link>
                    <Link to="/dashboard" className="sidebar-item">
                        <DashboardHeartIcon className="icon" />
                        <p className="label">
                            E-Invitation
                        </p>
                    </Link>
                    <Link to="/dashboard" className="sidebar-item">
                        <DashboardHeartIcon className="icon" />
                        <p className="label">
                            List Tamu
                        </p>
                    </Link> */}
                </div>
                <div className="content">
                    <div className="dashboard-header">
                        <div className="page-title">
                            <HeaderNavigationV2
                                isTransparent
                                title={'Dashboard'}
                            />
                        </div>
                        <div className="search-bar">
                            <IoMdSearch className="icon" />
                            <input
                                type="text"
                                placeholder="Cari sesuatu disini..."
                            />
                        </div>
                        <p className="welcome">
                            Selamat datang, {user?.name}
                        </p>
                        <p className="wedding-reminder">
                            <strong>{getDifferenceDate(event?.event_date)} hari lagi</strong>, menjelang pernikahanmu!
                        </p>
                    </div>
                    <div className="menu-container">
                        <div className="menu-wrapper">
                            <Link to={"/booklet/"+event?.event_id+"/lokasi"} className="menu-item">
                                <div className="icon-container">
                                    <DashboardHeartIcon className="icon" />
                                </div>
                                <p className="label">
                                    Booklet<br/> Saya
                                </p>
                            </Link>
                            {/* <Link to="/dashboard" className="menu-item">
                                <div className="icon-container">
                                    <DashboardTagIcon className="icon smaller" />
                                </div>
                                <p className="label">
                                    Rundown
                                </p>
                            </Link>
                            <Link to="/dashboard" className="menu-item">
                                <div className="icon-container">
                                    <DashboardTrendUpIcon className="icon smaller" />
                                </div>
                                <p className="label">
                                    Jadwal<br/> Meeting
                                </p>
                            </Link>
                            <Link to="/dashboard" className="menu-item">
                                <div className="icon-container">
                                    <DashboardDotsIcon className="icon" />
                                </div>
                                <p className="label">
                                    More
                                </p>
                            </Link> */}
                        </div>
                    </div>
                    <div className="top-cards">
                        <div className="reminder">
                            <p className="title">
                                Pengingat
                            </p>
                            <div className="list">
                                <div className="item">
                                    <div className="date-time">
                                        <p className="date">
                                            24 Aug
                                        </p>
                                        <p className="time">
                                            10:00
                                        </p>
                                    </div>
                                    <div className="detail">
                                        <p className="title">
                                            Lengkapi Daftar Kontak
                                        </p>
                                        <p className="subtitle">
                                            Booklet
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="date-time">
                                        <p className="date">
                                            24 Aug
                                        </p>
                                        <p className="time">
                                            10:00
                                        </p>
                                    </div>
                                    <div className="detail">
                                        <p className="title">
                                            Lengkapi Daftar Kontak
                                        </p>
                                        <p className="subtitle">
                                            Booklet
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="date-time">
                                        <p className="date">
                                            21 Sep
                                        </p>
                                        <p className="time">
                                            15:00
                                        </p>
                                    </div>
                                    <div className="detail">
                                        <p className="title">
                                            Meeting 2 Acara
                                        </p>
                                        <p className="subtitle">
                                            Meeting
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="date-time">
                                        <p className="date">
                                            01 Okt
                                        </p>
                                        <p className="time">
                                            10:00
                                        </p>
                                    </div>
                                    <div className="detail">
                                        <p className="title">
                                            Meeting 3 Acara
                                        </p>
                                        <p className="subtitle">
                                            Meeting
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="calendar">
                            <p className="title">
                                Kalender
                            </p>
                            <Calendar
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="update-history">
                        <p className="title">
                            Histori Perubahan
                        </p>
                        <div className="list">
                            <table>
                                <tbody>
                                    {
                                        event?.wedding_booklet_histories?.length === 0 ? 
                                            <tr>
                                                <td>Belum ada histori perubahan booklet</td>
                                            </tr>
                                        :
                                        event?.wedding_booklet_histories?.map((history, k) => (
                                            <tr key={k}>
                                                <td>
                                                    {getDateFormat(history?.updated_at, true, true, "mmmm", true, true, true, true, "pada")}
                                                </td>
                                                <td>
                                                    {history?.description}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.authentication.currentUser,
})

export default connect(
    mapStateToProps,
    null
)(DashboardPage)