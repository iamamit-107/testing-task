import { useRouter } from "next/router";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { Employee, useEmployeeStore } from "../store/employeeSlice";

export default function EmployeeList() {
  const router = useRouter();
  const { employees, addEditEmployeeItem } = useEmployeeStore((state) => state);
  const handleEdit = (employee: Employee) => {
    addEditEmployeeItem(employee);
    router.push("/");
  };
  return (
    <div className="main-body">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee: Employee, idx) => (
            <tr>
              <td>#{idx + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.joiningDate}</td>
              <td>
                <Button onClick={() => handleEdit(employee)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
