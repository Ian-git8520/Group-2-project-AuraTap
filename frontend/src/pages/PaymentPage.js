"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import "./PaymentPage.css"

const API_URL = "http://localhost:5000"

const validationSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("Payment method is required"),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.matches(/^\d{16}$/, "Card number must be 16 digits").required(),
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.matches(/^\d{3}$/, "CVV must be 3 digits").required(),
  }),
  phoneNumber: Yup.string().when("paymentMethod", {
    is: "mpesa",
    then: (schema) => schema.matches(/^254\d{9}$/, "Phone number must start with 254").required(),
  }),
})

function PaymentPage({ customer, cart, onPaymentSuccess, onClearCart }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = React.useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const finalTotal = total * 1.1 // Including tax

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsProcessing(true)

      // Create order first
      const orderResponse = await axios.post(`${API_URL}/orders`, {
        customer_id: customer.id,
        table_id: customer.table_id,
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      })

      const order = orderResponse.data

      // Process payment
      await axios.post(`${API_URL}/payments/${order.id}`, {
        amount: finalTotal,
        method: values.paymentMethod,
        transaction_id: `TXN_${Date.now()}`,
      })

      toast.success("Payment successful! Your order is being prepared.")
      onPaymentSuccess(order)
      onClearCart()
      navigate(`/feedback/${order.id}`)
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Complete Your Payment</h1>

        <div className="payment-layout">
          <div className="payment-form-section">
            <Formik
              initialValues={{
                paymentMethod: "",
                cardNumber: "",
                cardHolder: "",
                expiryDate: "",
                cvv: "",
                phoneNumber: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="payment-form">
                  <div className="form-group">
                    <label>Payment Method</label>
                    <div className="payment-methods">
                      <label className="method-option">
                        <Field type="radio" name="paymentMethod" value="card" />
                        <span className="method-label">💳 Card</span>
                      </label>
                      <label className="method-option">
                        <Field type="radio" name="paymentMethod" value="mpesa" />
                        <span className="method-label">📱 M-Pesa</span>
                      </label>
                      <label className="method-option">
                        <Field type="radio" name="paymentMethod" value="wallet" />
                        <span className="method-label">💰 Wallet</span>
                      </label>
                      <label className="method-option">
                        <Field type="radio" name="paymentMethod" value="cash" />
                        <span className="method-label">💵 Cash</span>
                      </label>
                    </div>
                    <ErrorMessage name="paymentMethod" component="div" className="error-message" />
                  </div>

                  {values.paymentMethod === "card" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="cardHolder">Card Holder Name</label>
                        <Field
                          type="text"
                          id="cardHolder"
                          name="cardHolder"
                          placeholder="John Doe"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <Field
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength="16"
                          className="form-input"
                        />
                        <ErrorMessage name="cardNumber" component="div" className="error-message" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <Field
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <Field
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            maxLength="3"
                            className="form-input"
                          />
                          <ErrorMessage name="cvv" component="div" className="error-message" />
                        </div>
                      </div>
                    </>
                  )}

                  {values.paymentMethod === "mpesa" && (
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Field
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="2547XXXXXXXX"
                        className="form-input"
                      />
                      <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                    </div>
                  )}

                  {values.paymentMethod === "cash" && (
                    <div className="info-box">
                      <p>Please have exact cash ready when the waiter arrives.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !values.paymentMethod || isProcessing}
                    className="submit-button"
                  >
                    {isProcessing ? "Processing..." : `Pay ${values.paymentMethod ? "Now" : ""}`}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%):</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
