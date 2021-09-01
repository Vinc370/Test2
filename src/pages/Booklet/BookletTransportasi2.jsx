import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CircleAdd from '../../assets/icons/CircleAdd'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import useWindowSize from '../../hooks/useWindowSize'
import { getTransportations, storeTransportations } from '../../services/BookletService'
import './booklet.scss'
import BookletButton from './components/BookletButtons'
import Notes from './components/Notes'

const BookletTransportasi = ({event_id}) => {
    const history = useHistory()
    const {isMobile, size} = useWindowSize();

    const [editMode, setEditMode] = useState(false)
    const [menujuPemberkatan, setMenujuPemberkatan] = useState([])
    const [pulangPemberkatan, setPulangPemberkatan] = useState([])
    const [booklet, setBooklet] = useState({
        notes_id: '',
        notes: ''
    })

    useEffect(() => {
        loadPage()
    }, [])

    useEffect(() => {
        tableEditable(editMode)
    }, [menujuPemberkatan, pulangPemberkatan])

    function getBookletData() {
        const id = document.querySelector('.notes_id')?.textContent
        const notes = document.querySelector('.notes')?.textContent

        return {id, notes}
    }

    function getDetailsData() {
        return [ ...getMenujuPemberkatanData(), ...getPulangPemberkatanData() ]
    }

    function setDetailsDataBySide(ids, name, passanger, stuff, plat, type) {
        const listData = []
        
        for (let index = 0; index < ids.length; index++) {
            const detailData = {
                id: ids[index].dataset.key,
                name: name[index]?.textContent,
                passanger: passanger[index]?.textContent,
                stuff: stuff[index]?.textContent,
                plat: plat[index]?.textContent,
                type
            }
            listData.push(detailData)
        }

        return listData
    }

    function getMenujuPemberkatanData() {
        const ids = document.querySelectorAll('.menujuPemberkatanData[data-key]')
        const name = document.querySelectorAll('.nameMenujuForm')
        const passanger = document.querySelectorAll('.passangerMenujuForm')
        const stuff = document.querySelectorAll('.stuffMenujuForm')
        const plat = document.querySelectorAll('.platMenujuForm')

        return setDetailsDataBySide(ids, name, passanger, stuff, plat, "Menuju Ke Pemberkatan")
    }

    function getPulangPemberkatanData() {
        const ids = document.querySelectorAll('.pulangPemberkatanData[data-key]')
        const name = document.querySelectorAll('.namePulangForm')
        const passanger = document.querySelectorAll('.passangerPulangForm')
        const stuff = document.querySelectorAll('.stuffPulangForm')
        const plat = document.querySelectorAll('.platPulangForm')
        return setDetailsDataBySide(ids, name, passanger, stuff, plat, "Pulang Dari Pemberkatan")
    }

    async function saveTransportations() {
        const finalData = {
            ...getBookletData(),
            details: getDetailsData()
        }
        
        storeTransportationsData(finalData)
    }

    async function storeTransportationsData(finalData) {
        try {
            setLoading()
            await storeTransportations(event_id, finalData)
            loadPage()
        } catch (error) {
            if (error.response.status === 401) {
                history.push('/login')
            }
        }
    }

    function enterEditMode() {
        setEditMode(true)
        tableEditable(true)
    }

    function tableEditable(flag){
        const contents = document.querySelectorAll('.editableContent')
        contents.forEach(content => {
            if(flag) content.setAttribute('contenteditable', 'true')
            else content.removeAttribute('contenteditable')
        })
    }

    function outEditMode() {
        setEditMode(false)
        tableEditable(false)
        saveTransportations()
    }

    async function getTransportationData() {
        const responseData = await getTransportations(event_id)
        const bookletData = responseData.data.booklet
        const transportationsData = responseData.data.transports
        
        setBooklet({
            notes_id: bookletData.notes_id,
            notes: bookletData.notes,
        })

        setTransportationsData(transportationsData)
    }

    function setTransportationsData(transportationList) {
        const menujuKePemberkatan = []
        const pulangDariPemberkatan = []

        transportationList.forEach(transportation => {
            if (transportation.type === 'Pulang Dari Pemberkatan') pulangDariPemberkatan.push(transportation)
            else menujuKePemberkatan.push(transportation)
        })
        
        setMenujuPemberkatan(menujuKePemberkatan)
        setPulangPemberkatan(pulangDariPemberkatan)
    }

    function setLoading() {
        setBooklet({
            notes: 'Loading...'
        })

        const loadingData = {
            id: 'Loading...',
            name: 'Loading...',
            passanger: 'Loading...',
            stuff: 'Loading...',
            plat: 'Loading...',
        }

        setMenujuPemberkatan([loadingData])
        setPulangPemberkatan([loadingData])
    }

    function loadPage() {
        setLoading()
        getTransportationData()
    }

    function generatePDF() {
        const doc = new jsPDF()
        doc.text('Booklet Transportasi', 15, 12)
        doc.autoTable({html: '#menujuTable', margin: {top: 20}});
        doc.autoTable({html: '#pulangTable'});
        doc.save('Booklet Transportasi.pdf')
    }

    const addData = (side) => {
        const emptyData = {
            id: '0',
            name: '',
            passanger: '',
            stuff: '',
            plat: '',
            type: side,
        }

        if(side === 'Menuju Ke Pemberkatan') setMenujuPemberkatan(prev => prev.concat(emptyData))
        if(side === 'Pulang Dari Pemberkatan') setPulangPemberkatan(prev => prev.concat(emptyData))
    }

    const deleteData = (side, idx) => {
        if(side === 'Menuju Ke Pemberkatan') setMenujuPemberkatan(prev => prev.filter((_, k) => k !== idx))
        if(side === 'Pulang Dari Pemberkatan') setPulangPemberkatan(prev => prev.filter((_, k) => k !== idx))
    }

    return (
        <>
            <div className="booklet-content">
                <div className="content">
                    <div className="title-and-button">
                        <p className="title d-desktop">
                            Transportasi
                        </p>
                        <BookletButton editMode={editMode} enterEditMode={enterEditMode} outEditMode={outEditMode} generatePDF={generatePDF} />
                    </div>
                    <Notes notesData={booklet} editMode={editMode}/>
                    {
                        !isMobile ? 
                            <table id="menujuTable" className="booklet-table mt-3 border-top-0">
                                <thead>
                                    <tr>
                                        <th colSpan={editMode ? "5" : "4"}>Menuju ke Pemberkatan</th>
                                    </tr>
                                    <tr>
                                        <th height="40">Nama</th>
                                        <th height="40">Penumpang</th>
                                        <th height="40">Barang / Titipan</th>
                                        <th height="40">Plat</th>
                                        {
                                            editMode &&
                                            <th height="40"></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        menujuPemberkatan.map((transportation, k) => (
                                            <tr key={k} className="menujuPemberkatanForm menujuPemberkatanData" data-key={transportation.id}>
                                                <td height="40" className="nameMenujuForm editableContent title">{transportation.name}</td>
                                                <td height="40" className="passangerMenujuForm editableContent">{transportation.passanger}</td>
                                                <td height="40" className="stuffMenujuForm editableContent">{transportation.stuff}</td>
                                                <td height="40" className="platMenujuForm editableContent">{transportation.plat}</td>
                                                {
                                                    editMode &&
                                                    <td height="40">
                                                        <button onClick={() => deleteData('Menuju Ke Pemberkatan', k)} className="delete-button">
                                                            <DeleteIcon className="delete-icon" />
                                                        </button>
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        : 
                        <>
                            <p className="text-grey-soft">Menuju ke Pemberkatan</p>
                            {
                                menujuPemberkatan.length === 0 ? 
                                <p>Belum ada data</p>
                                :
                                menujuPemberkatan.map((transportation, k) => (
                                    <div key={k}>
                                        <p className="font-weight-bold d-flex justify-content-between">
                                            {"Data "+(k+1)}
                                            {
                                                editMode &&
                                                <button onClick={() => deleteData('Menuju Ke Pemberkatan', k)} className="delete-button">
                                                    <DeleteIcon className="delete-icon" />
                                                </button>
                                            }
                                        </p>
                                        <table className="booklet-table menujuPemberkatanData" data-key={transportation.id}>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Nama
                                                    </th>
                                                    <td className={"nameMenujuForm editableContent"}>
                                                        {transportation.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Penumpang
                                                    </th>
                                                    <td className={"passangerMenujuForm editableContent"}>
                                                        {transportation.passanger}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Barang / Titipan
                                                    </th>
                                                    <td className={"stuffMenujuForm editableContent"}>
                                                        {transportation.stuff}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Plat
                                                    </th>
                                                    <td className={"platMenujuForm editableContent"}>
                                                        {transportation.plat}
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                ))
                            }
                        </>
                    }
                    {
                        editMode &&
                        <button onClick={()=>addData('Menuju Ke Pemberkatan')} className="add-button">
                            <CircleAdd className="add-icon" /> Tambah
                        </button>
                    }

                    {
                        !isMobile ? 
                            <table id="pulangTable" className="booklet-table mt-3 border-top-0">
                                <thead>
                                    <tr>
                                        <th colSpan={editMode ? "5" : "4"}>Pulang dari Pemberkatan</th>
                                    </tr>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Penumpang</th>
                                        <th>Barang / Titipan</th>
                                        <th>Plat</th>
                                        {
                                            editMode &&
                                            <th height="40"></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pulangPemberkatan.map((transportation, k) => (
                                            <tr key={k} className="pulangPemberkatanForm pulangPemberkatanData" data-key={transportation.id}>
                                                <td height="40" className="namePulangForm editableContent title">{transportation.name}</td>
                                                <td height="40" className="passangerPulangForm editableContent">{transportation.passanger}</td>
                                                <td height="40" className="stuffPulangForm editableContent">{transportation.stuff}</td>
                                                <td height="40" className="platPulangForm editableContent">{transportation.plat}</td>
                                                {
                                                    editMode &&
                                                    <td height="40">
                                                        <button onClick={() => deleteData('Pulang Dari Pemberkatan', k)} className="delete-button">
                                                            <DeleteIcon className="delete-icon" />
                                                        </button>
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        : 
                        <>
                            <p className="text-grey-soft">Pulang dari Pemberkatan</p>
                            {
                                pulangPemberkatan.length === 0 ? 
                                <p>Belum ada data</p>
                                :
                                pulangPemberkatan.map((transportation, k) => (
                                    <div key={k}>
                                        <p className="font-weight-bold d-flex justify-content-between">
                                            {"Data "+(k+1)}
                                            {
                                                editMode &&
                                                <button onClick={() => deleteData('Pulang Dari Pemberkatan', k)} className="delete-button">
                                                    <DeleteIcon className="delete-icon" />
                                                </button>
                                            }
                                        </p>
                                        <table className="booklet-table pulangPemberkatanData" data-key={transportation.id}>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Nama
                                                    </th>
                                                    <td className={"namePulangForm editableContent"}>
                                                        {transportation.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Penumpang
                                                    </th>
                                                    <td className={"passangerPulangForm editableContent"}>
                                                        {transportation.passanger}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Barang / Titipan
                                                    </th>
                                                    <td className={"stuffPulangForm editableContent"}>
                                                        {transportation.stuff}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Plat
                                                    </th>
                                                    <td className={"platPulangForm editableContent"}>
                                                        {transportation.plat}
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                ))
                            }
                        </>
                    }
                    {
                        editMode &&
                        <button onClick={()=>addData('Pulang Dari Pemberkatan')} className="add-button">
                            <CircleAdd className="add-icon" /> Tambah
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default BookletTransportasi