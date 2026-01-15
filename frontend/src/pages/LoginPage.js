"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import "./LoginPage.css"

const API_URL = "http://localhost:5000"

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required"),
  tableNumber: Yup.number().positive("Table number must be positive").required("Table number is required"),
})

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [tables, setTables] = React.useState([])

  React.useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/tables`)
      setTables(response.data)
    } catch (error) {
      console.error("Error fetching tables:", error)
      toast.error("Failed to load tables")
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Find table ID from table number
      const selectedTable = tables.find((t) => t.table_number === Number.parseInt(values.tableNumber))
      if (!selectedTable) {
        toast.error("Invalid table number")
        setSubmitting(false)
        return
      }

      // Create customer
      const response = await axios.post(`${API_URL}/customers`, {
        username: values.username,
        table_id: selectedTable.id,
      })

      const customerData = response.data
      onLogin(customerData)
      toast.success("Welcome! Ready to order?")
      navigate("/menu")
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Username already exists. Please choose another.")
      } else {
        toast.error("Login failed. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>Welcome to AURATAP</h1>
          <p>Enter your details to begin ordering</p>

          <Formik
            initialValues={{ username: "", tableNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Your Name</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your name"
                    className="form-input"
                  />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="tableNumber">Table Number</label>
                  <Field as="select" id="tableNumber" name="tableNumber" className="form-input">
                    <option value="">Select your table</option>
                    {tables.map((table) => (
                      <option key={table.id} value={table.table_number}>
                        Table {table.table_number} (Capacity: {table.capacity})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="tableNumber" component="div" className="error-message" />
                </div>

                <button type="submit" disabled={isSubmitting} className="submit-button">
                  {isSubmitting ? "Logging in..." : "Start Ordering"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
