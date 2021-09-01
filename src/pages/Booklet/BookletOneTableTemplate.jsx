import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CircleAdd from '../../assets/icons/CircleAdd'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import useWindowSize from '../../hooks/useWindowSize'
import './booklet.scss'
import BookletButton from './components/BookletButtons'
import Notes from './components/Notes'

const BookletOneTableTemplate = ({event_id, getData, storeData, detail, detailTitle, type}) => {
    const history = useHistory()
    const {isMobile, size} = useWindowSize();

    const [editMode, setEditMode] = useState(false)
    const [dataList, setDataList] = useState([])
    const [booklet, setBooklet] = useState({
        notes_id: '',
        notes: ''
    })

    useEffect(() => {
        loadPage()
    }, [])

    useEffect(() => {
        tableEditable(editMode)
    }, [dataList])

    function getBookletData() {
        const id = document.querySelector('.notes_id')?.textContent
        const notes = document.querySelector('.notes')?.textContent

        return {id, notes}
    }

    function getDetailsData() {
        return [ ...getDetailData() ]
    }

    function getDetailData() {
        const fillDetail = {}
        const listData = []

        const ids = document.querySelectorAll('[data-key]')
        detail.forEach((d, k) => {
            fillDetail[k] = document.querySelectorAll(`.${d}Form`);
        });

        for (let index = 0; index < ids.length; index++) {
            let detailData = {};
            detailData["id"] = ids[index].dataset.key;

            detail.forEach((d, k) => {
                detailData[d] = fillDetail[k][index]?.textContent;
            });

            listData.push(detailData)
        }

        return listData
    }

    async function saveData() {
        const finalData = {
            ...getBookletData(),
            details: getDetailsData()
        }

        try {
            setLoading()
            await storeData(event_id, finalData)
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
        saveData()
    }

    async function getAndSetData() {
        const responseData = await getData(event_id)
        const bookletData = responseData.data.booklet
        const data = responseData.data[type.plural]
        
        setBooklet({
            notes_id: bookletData.notes_id,
            notes: bookletData.notes,
        })

        setDataList(data)
    }

    function setDetailData(idText, otherText) {
        let detailData = {};
        detailData["id"] = idText;

        detail.forEach(d => {
            detailData[d] = otherText;
        });

        return detailData;
    }

    function setLoading() {
        setBooklet({
            notes: 'Loading...'
        })

        setDataList([setDetailData('Loading...', 'Loading...')])
    }

    function loadPage() {
        setLoading()
        getAndSetData()
    }
    
    function generatePDF() {
        const doc = new jsPDF()
        doc.text(`Booklet ${type.indonesian}`, 15, 12)
        doc.autoTable({html: '#tablePDF', margin: {top: 20}});
        doc.save(`Booklet ${type.indonesian}.pdf`)
    }
    
    const addData = () => {
        setDataList(prev => prev.concat(
            setDetailData('0', '')
        ))
    }

    const deleteData = (idx) => {
        setDataList(prev => prev.filter((_, k) => k !== idx))
    }

    return (
        <>
            <div className="booklet-content">
                <div className="content">
                    <div className="title-and-button">
                        <p className="title d-desktop">
                            {type.indonesian}
                        </p>
                        <BookletButton editMode={editMode} enterEditMode={enterEditMode} outEditMode={outEditMode} generatePDF={generatePDF} />
                    </div>
                    <Notes notesData={booklet} editMode={editMode}/>
                    {
                        !isMobile ?
                            <table className="booklet-table">
                                <thead>
                                    <tr>
                                        {
                                            detailTitle?.map((dt, k) => (
                                                <th height="40" key={k}>
                                                    {dt}
                                                </th>
                                            ))
                                        }
                                        {
                                            editMode &&
                                            <th height="40"></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataList?.map((data, k) => (
                                            <tr key={k} data-key={data?.id}>
                                                {
                                                    detail?.map((d, k2) => (
                                                        <td height="40" key={k2} className={`${d}Form editableContent`}>{data[d]}</td>
                                                    ))
                                                }
                                                {
                                                    editMode &&
                                                    <td height="40">
                                                        <button onClick={() => deleteData(k)} className="delete-button">
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
                                {
                                    dataList?.map((data, k) => (
                                        <div key={k}>
                                            <p className="font-weight-bold d-flex justify-content-between">
                                                {"Data "+(k+1)}
                                                {
                                                    editMode &&
                                                    <button onClick={() => deleteData(k)} className="delete-button">
                                                        <DeleteIcon className="delete-icon" />
                                                    </button>
                                                }
                                            </p>
                                            <table className="booklet-table" data-key={data?.id}>
                                                <thead>
                                                    {
                                                        detailTitle?.map((title, k2) => (
                                                            <tr key={k2}>
                                                                <th>
                                                                    {title}
                                                                </th>
                                                                <td className={detail[k2]+"Form editableContent"}>
                                                                    {data[detail[k2]]}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </thead>
                                            </table>
                                        </div>
                                    ))
                                }
                            </> 
                        }
                        {
                            editMode &&
                            <button onClick={()=>addData()} className="add-button">
                                <CircleAdd className="add-icon" /> Tambah
                            </button>
                        }

                        <table id="tablePDF" className="d-none">
                            <thead>
                                <tr>
                                    {
                                        detailTitle?.map((dt, k) => (
                                            <th key={k}>
                                                {dt}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataList?.map((data, k) => (
                                        <tr key={k}>
                                            {
                                                detail?.map((d, k2) => (
                                                    <td key={k2}>{data[d]}</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    )
}

export default BookletOneTableTemplate