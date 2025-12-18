/**
 * Stripe Checkout Form Component
 *
 * Handles payment processing for scholarship applications using Stripe.
 * Creates payment intent, processes card payment, and saves application to database.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.scholarship - Scholarship object containing fees and details
 */

import React, { useEffect, useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    applicationFees,
    serviceCharge,
    scholarshipName,
    universityName,
    subjectCategory,
    scholarshipCategory,
    degree,
    _id,
  } = scholarship;

  /**
   * Create payment intent on component mount
   * Fetches client secret from backend for Stripe payment confirmation
   */
  useEffect(() => {
    if (applicationFees > 0) {
      axios
        .post("/payments/create-payment-intent", { price: applicationFees })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [applicationFees]);

  /**
   * Handle payment form submission
   * Processes card payment and creates application record on success
   *
   * @param {Event} event - Form submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm card payment with Stripe
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);

      // Save application with unpaid status on payment failure
      const failedApplication = {
        scholarshipId: _id,
        userId: user._id, // MongoDB ObjectId from backend user data
        scholarshipName: scholarshipName,
        universityName: universityName,
        subjectCategory: subjectCategory,
        scholarshipCategory: scholarshipCategory,
        degree: degree,
        userEmail: user.email,
        userName: user.displayName,
        applicationFees: applicationFees,
        serviceCharge: scholarship.serviceCharge || 0,
        applicationDate: new Date(),
        paymentStatus: "unpaid",
        applicationStatus: "pending",
      };

      try {
        await axios.post("/applications", failedApplication);
        navigate("/payment-failed");
      } catch (err) {
        // console.error("Failed to save application:", err);
      }
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Check if an unpaid application already exists for this user and scholarship
        try {
          const existingAppsRes = await axios.get(
            `/applications/user/${user.email}`
          );
          const existingApp = existingAppsRes.data.find(
            (app) => app.scholarshipId === _id && app.paymentStatus === "unpaid"
          );

          if (existingApp) {
            // Update existing unpaid application
            const updateData = {
              paymentStatus: "paid",
              applicationDate: new Date(), // Update to current date
            };

            const res = await axios.patch(
              `/applications/${existingApp._id}`,
              updateData
            );

            navigate("/payment-success", {
              state: {
                transactionId: paymentIntent.id,
                amount: applicationFees,
                scholarshipName,
                universityName,
              },
            });
          } else {
            // No existing unpaid application, create new one
            const application = {
              scholarshipId: _id,
              userId: user._id,
              scholarshipName: scholarshipName,
              universityName: universityName,
              subjectCategory: subjectCategory,
              scholarshipCategory: scholarshipCategory,
              degree: degree,
              userEmail: user.email,
              userName: user.displayName,
              applicationFees: applicationFees,
              serviceCharge: scholarship.serviceCharge || 0,
              applicationDate: new Date(),
              paymentStatus: "paid",
              applicationStatus: "pending",
            };

            const res = await axios.post("/applications", application);

            if (res.data._id || res.data.insertedId) {
              navigate("/payment-success", {
                state: {
                  transactionId: paymentIntent.id,
                  amount: applicationFees,
                  scholarshipName,
                  universityName,
                },
              });
            }
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message;
          setError(
            `Payment succeeded but failed to save application: ${errorMessage}`
          );
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${applicationFees}
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
