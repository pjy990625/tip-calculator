import React, { useState } from 'react';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState({
    servers: [
      { id: 1, name: 'John Doe', role: 'Server' },
      { id: 2, name: 'Jane Smith', role: 'Server' },
    ],
    kitchenStaff: [
      { id: 3, name: 'Mike Johnson', role: 'Chef' },
      { id: 4, name: 'Sarah Williams', role: 'Sous Chef' },
    ],
  });

  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', type: 'servers' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      const updatedEmployees = { ...employees };
      const newId = Math.max(...Object.values(employees).flat().map(e => e.id)) + 1;
      updatedEmployees[newEmployee.type] = [
        ...updatedEmployees[newEmployee.type],
        { id: newId, name: newEmployee.name, role: newEmployee.role },
      ];
      setEmployees(updatedEmployees);
      setNewEmployee({ name: '', role: '', type: 'servers' });
    }
  };

  const startEditing = (employee, type) => {
    setEditingEmployee({ ...employee, type });
  };

  const cancelEditing = () => {
    setEditingEmployee(null);
  };

  const saveEdit = () => {
    if (editingEmployee) {
      const updatedEmployees = { ...employees };
      const index = updatedEmployees[editingEmployee.type].findIndex(e => e.id === editingEmployee.id);
      if (index !== -1) {
        updatedEmployees[editingEmployee.type][index] = {
          id: editingEmployee.id,
          name: editingEmployee.name,
          role: editingEmployee.role,
        };
        setEmployees(updatedEmployees);
      }
      setEditingEmployee(null);
    }
  };

  const deleteEmployee = (id, type) => {
    const updatedEmployees = { ...employees };
    updatedEmployees[type] = updatedEmployees[type].filter(e => e.id !== id);
    setEmployees(updatedEmployees);
  };

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
          {employees[type].map((employee) => (
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
          ))}
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
          value={newEmployee.name}
          onChange={handleInputChange}
          placeholder="Employee Name"
        />
        <input
          type="text"
          name="role"
          value={newEmployee.role}
          onChange={handleInputChange}
          placeholder="Employee Role"
        />
        <select name="type" value={newEmployee.type} onChange={handleInputChange}>
          <option value="servers">Server</option>
          <option value="kitchenStaff">Kitchen Staff</option>
        </select>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="tables-container">
        {renderEmployeeTable('servers', 'Servers')}
        {renderEmployeeTable('kitchenStaff', 'Kitchen Staff')}
      </div>
    </div>
  );
};

export default Employees;