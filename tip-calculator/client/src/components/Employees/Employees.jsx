import React, { useState } from 'react';
import './Employees.css';

const Employees = ({ servers, kitchenStaff }) => {
    const [employees, setEmployees] = useState({
        servers: servers,
        kitchenStaff: kitchenStaff,
    });

    const renderEmployeeTable = (type, title) => (
        <div className="employee-table">
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {employees[type].map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                {editingEmployee && editingEmployee.id === employee.id ? (
                                    <input
                                        type="text"
                                        value={editingEmployee.name}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                                    />
                                ) : (
                                    employee.name
                                )}
                            </td>
                            <td>
                                {editingEmployee && editingEmployee.id === employee.id ? (
                                    <input
                                        type="text"
                                        value={editingEmployee.role}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                                    />
                                ) : (
                                    employee.role
                                )}
                            </td>
                            <td>
                                {editingEmployee && editingEmployee.id === employee.id ? (
                                    <>
                                        <button onClick={saveEdit}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(employee, type)}>Edit</button>
                                        <button onClick={() => deleteEmployee(employee.id, type)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="employees-container">
            <h1>Manage Employees</h1>
            <div className="add-employee-form">
                <input
                    type="text"
                    name="name"
                    // value={newEmployee.name}
                    // onChange={handleInputChange}
                    placeholder="Employee Name"
                />
                {/* <select name="type" value={newEmployee.type} onChange={handleInputChange}>
                    <option value="servers">Server</option>
                    <option value="kitchenStaff">Kitchen Staff</option>
                </select> */}
                {/* <button onClick={addEmployee}>Add Employee</button> */}
            </div>
            <div className="tables-container">
                {renderEmployeeTable('servers', 'Servers')}
                {renderEmployeeTable('kitchenStaff', 'Kitchen Staff')}
            </div>
        </div>
    );
};

export default Employees;