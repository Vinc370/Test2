import React, { useState } from "react";
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import Button from '../../../components/Button/Button'
import {Container, Form} from "react-bootstrap";
import BasicInput from '../../../components/Form/Input/BasicInput'
import { changePassword } from '../../../services/UserService'
import { useHistory } from "react-router-dom";

function ChangePassword() {
  const history = useHistory()

  const [data, setData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
    errors: {},
  })

  const [isLoading, setIsLoading] = useState(false)

  const onChange = e => {
    setData(data => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }
  
  const onSubmit = async e => {
    e.preventDefault()
    if (!checkConfirmation()) {
      return
    }

    setIsLoading(true)
    
    try {
      await changePassword(data)
      history.push('/akun')
    } catch (error) {
      handleError(error)
    }

    setIsLoading(false)
  }

  const checkConfirmation = e => {
    if (data.new_password !== data.new_password_confirm) {
      setData(data => ({
        ...data,
        errors: {
          new_password_confirm: 'The new password confirm and new password must match'
        }
      }))

      return false
    }

    return true
  }

  const handleError = error => {
      if (error.response) {
        if (error.response.status === 422) {
          setData(data => ({
            ...data,
            errors: error.response.data.errors
          }))
          return
        }
      }

      setData(data => ({
        ...data,
        errors: {
          server: 'Connection error, please try again'
        }
      }))
      return
  } 

  return (
    <div>
      <HeaderNavigation title={'Change Password'}/>

      <Container className='up-bottom-margin up-bottom-padding'>
        <h1 className="text-center mb-5 font-size-20 font-size-lg-25">Change Password</h1>

        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group className="mb-3 mb-lg-4">
            <Form.Label className="mb-2">Current Password</Form.Label>
            <BasicInput 
              type="password"
              name="old_password"
              value={data.old_password}
              onChange={e => onChange(e)}
              disabled={isLoading}
              required
            />
          </Form.Group>
          {
            data.errors.old_password
              &&
              <div class="text-danger mb-3 mb-lg-4 font-size-8">{data.errors.old_password}</div>
          }

          <Form.Group className="mb-3 mb-lg-4">
            <Form.Label className="mb-2">New Password</Form.Label>
            <BasicInput 
              type="password"  
              name="new_password"
              value={data.new_password}
              onChange={e => onChange(e)}
              disabled={isLoading}
              className="mb-1"
              required
            />
            {
              data.errors.new_password
                &&
                <div class="text-danger font-size-8">{data.errors.new_password}</div>
            }
          </Form.Group>

          <Form.Group className="mb-3 mb-lg-4">
            <Form.Label className="mb-2">Confirm New Password</Form.Label>
            <BasicInput 
              type="password"  
              name="new_password_confirm"
              value={data.new_password_confirm}
              onChange={e => onChange(e)}
              disabled={isLoading}
              className="mb-1"
              required
            />
          </Form.Group>
          {
            data.errors.new_password_confirm
              &&
              <div class="text-danger font-size-8">{data.errors.new_password_confirm}</div>
          }

          {
            data.errors.server
              &&
              <div class="text-danger font-size-8">{data.errors.server}</div>
          }

          <div className="mt-4 d-flex justify-content-end">
            <Button 
              color="signature"
              text="Change"
              type="submit"
              className="px-5"
              disabled={isLoading}
              className="mb-1"
            />
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default ChangePassword