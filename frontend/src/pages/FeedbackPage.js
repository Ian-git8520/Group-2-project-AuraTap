"use client"

import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import "./FeedbackPage.css"

const API_URL = "http://localhost:5000"

const validationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1 and 5")
    .required("Rating is required"),
  comment: Yup.string().max(500, "Comment must be less than 500 characters"),
})

function FeedbackPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [hoveredRating, setHoveredRating] = React.useState(0)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${API_URL}/feedbacks`, {
        order_id: Number.parseInt(orderId),
        rating: values.rating,
        comment: values.comment,
      })

      toast.success("Thank you for your feedback!")
      navigate("/orders")
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("Failed to submit feedback")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-card">
          <div className="feedback-header">
            <span className="header-icon">⭐</span>
            <h1>Share Your Experience</h1>
            <p>Help us improve by sharing your feedback</p>
          </div>

          <Formik
            initialValues={{ rating: 0, comment: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="feedback-form">
                <div className="form-group">
                  <label>How would you rate your meal?</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${hoveredRating >= star ? "hover" : ""} ${values.rating >= star ? "selected" : ""}`}
                        onClick={() => setFieldValue("rating", star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div className="rating-labels">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                  <ErrorMessage name="rating" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Add a comment (optional)</label>
                  <Field
                    as="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Tell us what you think about your meal, service, and atmosphere..."
                    className="form-textarea"
                    rows="5"
                  />
                  <div className="char-count">{values.comment.length}/500</div>
                  <ErrorMessage name="comment" component="div" className="error-message" />
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                  <button type="button" onClick={() => navigate("/orders")} className="skip-button">
                    Skip for Now
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="feedback-benefits">
          <h3>Why your feedback matters</h3>
          <div className="benefits-list">
            <div className="benefit">
              <span className="benefit-icon">🎯</span>
              <p>Help us improve our menu and service quality</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🏆</span>
              <p>Exclusive rewards and discounts for feedback</p>
            </div>
            <div className="benefit">
              <span className="benefit-icon">👥</span>
              <p>Your opinion helps other customers decide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
