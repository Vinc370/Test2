import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import Header from '../../../components/Header/Header'
import useWindowSize from '../../../hooks/useWindowSize'
import { requestNewVenue } from '../../../services/VenueService'
import Addons from './Components/Addons/Addons'
import AllInputs from './Components/AllInputs'
import Packages from './Components/Packages/Packages'
import UploadImage from './Components/UploadImage/UploadImage'

function TambahVenue() {
    // TODO: refactor
    // TODO: add validation
    
    const history = useHistory()
    const {isMobile, size} = useWindowSize();

    const initialData = {
        venue_name: '',
        venue_address: '',
        venue_phone: '',
        venue_location: '',
        venue_culinary: '',
        venue_type: '',
        venue_email: '',
        venue_max_capacity: 1,
        venue_service_charge: 0,
        venue_service_charge_detail: '',
        venue_addons: [],
        venue_package: [],
        images: [],
    }

    const [data, setData] = useState(initialData)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onChange = event => {
        let value = event.target.value
        if (!isNaN(value)) {
            value = parseInt(value)
        }
        setData(data => ({
            ...data,
            [event.target.name]: value
        }))
    }

    const addAddons = newAddon => {
        const newAddons = data.venue_addons
        newAddons.push(newAddon)

        setData(data => ({
            ...data,
            venue_addons: newAddons
        }))
    }

    const removeAddons = idx => {
        const newAddons = data.venue_addons
        newAddons.splice(idx, 1)

        setData(data => ({
            ...data,
            venue_addons: newAddons
        }))
    }
    
    const addPackages = newPackage => {
        const newPackages = data.venue_package
        newPackages.push(newPackage)

        setData(data => ({
            ...data,
            venue_package: newPackages,
        }))
    }

    const removePackages = idx => {
        const newPackages = data.venue_package
        newPackages.splice(idx, 1)

        setData(data => ({
            ...data,
            venue_package: newPackages,
        }))
    }

    const onSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData()
        for (const [key, value] of Object.entries(data)) {
            if (key === 'images') {
                for (let index = 0; index < value.length; index++) {
                    formData.append(`${key}[${index}]`, value[index])
                }
            } else {
                let val = value
                if (Array.isArray(value)) {
                    val = JSON.stringify(val)
                }
                formData.append(key, val)
            }
        }

        try {
            await requestNewVenue(formData)
            setData(initialData)
            setError(null)
            setIsLoading(false)
            displaySuccessMessage()
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    history.push('/login?redirect=/tambah-venue')
                    setIsLoading(false)
                    return
                }

                // validation error
                setIsLoading(false)
            } else {
                setError('Connection error, please try again')
                setIsLoading(false)
            }
        }
    }

    const displaySuccessMessage = () => {
        Swal.fire({
            icon: 'success',
            title: 'Request Sent',
            timer: 4000,
            willClose: () => history.push('/')
        })
    }

    return (
        <div>
            {
                isMobile
                ? <HeaderNavigationV2 title="Tambah Venue" isBlack sticky={true} />
                : <Header />
            }
            <main className="px-4 px-lg-7 mb-4 mb-lg-6">
                <h1 className="my-4 my-lg-5 font-size-15 font-size-lg-25 text-center">Form Pendaftaran Mitra Baru</h1>
                <Form onSubmit={onSubmit}>
                    <AllInputs 
                        onChange={onChange} 
                        data={data} 
                        setData={setData}
                        isLoading={isLoading}
                    />
                    <Addons
                        addons={data.venue_addons}
                        addAddons={addAddons}
                        removeAddons={removeAddons}
                        isLoading={isLoading}
                    />
                    <Packages
                        packages={data.venue_package}
                        addPackages={addPackages}
                        removePackages={removePackages}
                        isLoading={isLoading}
                    />
                    <UploadImage 
                        setData={setData} 
                        isLoading={isLoading}
                    />
                    { error 
                        &&
                        <div className="text-danger">
                            {error}
                        </div>
                    }
                    <div className="d-flex justify-content-end mt-3">
                        <input 
                            type="submit" 
                            className="btn btn-green rounded-0 px-4 px-lg-6 font-size-7 font-size-lg-8" 
                            value="Submit" 
                            disabled={isLoading}
                        />
                    </div>
                </Form>
            </main>
        </div>
    )
}

export default TambahVenue
