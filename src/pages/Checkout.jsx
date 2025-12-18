import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Payment/CheckoutForm";

/**
 * Initialize Stripe with publishable key from environment variables
 * This key is safe to expose in client-side code
 */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    // Fetch specific scholarship details
    if (id) {
      axios
        .get(`/scholarships/${id}`)
        .then((res) => setScholarship(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!scholarship)
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner"></span>
      </div>
    );

  return (
    <div className="max-w-md mx-auto my-20 bg-base-100 p-8 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Payment for {scholarship.scholarshipName}
      </h2>
      <p className="mb-6">
        Please pay the application fee to complete your application.
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm scholarship={scholarship} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
