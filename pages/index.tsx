import Head from "next/head";
import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Employee, useEmployeeStore } from "../store/employeeSlice";
import { useRouter } from "next/router";

const initFormData = {
  id: 0,
  name: "",
  designation: "",
  joiningDate: "",
};

export default function Home() {
  const router = useRouter();
  const { editEmployeeItem, addEmployee, updateEmployeeItem } = useEmployeeStore((state) => state);
  const [formData, setFormData] = useState<Employee>(editEmployeeItem);
  const [formError, setFormError] = useState(false);

  const onChangeHandler = (e: { target: { name: any; value: any } }): void => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key] && key !== "id") {
        setFormError(true);
        return;
      }
    }

    if (formData.id) {
      updateEmployeeItem(formData);
      setFormData(initFormData);
      setFormError(false);
      router.push("/employee-list");
    } else {
      const data = {
        id: Math.floor(Math.random() * 10000),
        ...formData,
      };

      addEmployee(data);
      setFormData(initFormData);
      setFormError(false);
      router.push("/employee-list");
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={onChangeHandler} value={formData.name} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              onChange={onChangeHandler}
              value={formData.designation}
              placeholder="Designation"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Joining Date</Form.Label>
            <Form.Control
              type="date"
              name="joiningDate"
              onChange={onChangeHandler}
              value={formData.joiningDate}
              placeholder="Joining Date"
            />
          </Form.Group>

          {formError && <Alert variant="danger">Please fill up all the fields</Alert>}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </main>
    </>
  );
}
