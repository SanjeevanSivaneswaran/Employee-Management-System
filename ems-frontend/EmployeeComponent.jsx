import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeServices'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const {id} = useParams()

    const [errors,setErrors] = useState({});

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setEmployee(response.data)
            }).catch(error => {
                console.error(error)
            })
        }
    },[id])

    const handleChange = (e) =>{
        setEmployee({...employee, [e.target.name]: e.target.value})
    }

    const validateForm = () => {
        const errors = {}

        if (!employee.firstName.trim()) {
            errors.firstName = 'First Name is required...'
        }

        if (!employee.lastName.trim()) {
            errors.lastName = 'Last Name is required...'
        }

        if(!employee.email.trim()) {
            errors.email = 'Email is required...'
        } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
            errors.email = 'Email is invalid...'
        }

        return errors;
    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault()

        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }
        console.log(employee)

        if(id) {
            updateEmployee(id, employee).then((response) => {
                console.log(response.data);
                navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
        } else {
            createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator('/employees')
            setErrors({})
            })
        }
    }

    const pageTitle = () => {
        if(id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div>
      <div className='container mt-5 mb-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3' >
                {
                    pageTitle()
                }
                <br></br>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name: </label>
                            <input 
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={employee.firstName}
                                className='form-control'
                                onChange={handleChange}
                            />
                            {errors.firstName && <div style={{ color:'red'}}>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name: </label>
                            <input 
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={employee.lastName}
                                className='form-control'
                                onChange={handleChange}
                            />
                            {errors.lastName && <div style={{ color:'red'}}>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email: </label>
                            <input 
                                type='email'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={employee.email}
                                className='form-control'
                                onChange={handleChange}
                            />
                            {errors.email && <div style={{ color:'red'}}>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
