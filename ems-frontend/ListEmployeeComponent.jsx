import React,{ use, useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeServices'
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees()
    }, [])

    const getAllEmployees = () => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/update-employee/${id}`)
    }

    const removeEmployee = (id) => {
        deleteEmployee(id).then((response) => {
            getAllEmployees()
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h1 className='text-center'>List of Employees</h1>
        
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

        <button className='btn btn-primary mb-2' onClick={addNewEmployee} >Add Employee</button>
        
    </div>
  )
}

export default ListEmployeeComponent
