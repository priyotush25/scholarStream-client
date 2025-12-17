import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../../components/common/Loader/Loader';
import { PiCheckCircleFill } from 'react-icons/pi';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
    const { loading } = useAuth()
    const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
            if (res.data.resultPayment.insertedId) {
                toast.success("Payment Successful");
                setPaymentData(res.data.payment);
            }
        })
        .catch(err => {
          console.error("Payment verification failed", err);
        });
    }

  }, [sessionId, axiosSecure]);
   

  if (loading) {
    return <Loader />;
  }

  if (!paymentData && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Verification Failed</h2>
          <p className="mb-6">We couldn't verify your payment. Please contact support.</p>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <PiCheckCircleFill className="text-6xl text-success" />
          </div>

          <h2 className="text-3xl font-bold text-success mb-2">Payment Successful!</h2>
          <p className="text-base-content/70 mb-8">
            Thank you for your payment. Your application has been successfully processed.
          </p>

          <div className="bg-base-300 rounded-lg p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between items-center border-b border-base-content/10 pb-2">
              <span className="text-sm opacity-70">Amount Paid</span>
              <span className="font-bold text-lg">${paymentData?.amount?.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center border-b border-base-content/10 pb-2">
              <span className="text-sm opacity-70">University</span>
              <span className="font-medium">{paymentData?.universityName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-base-content/10 pb-2">
              <span className="text-sm opacity-70">Transaction ID</span>
              <span className="font-mono text-xs opacity-70">{paymentData?.transactionId ? `${paymentData.transactionId.slice(0, 16)}...` : 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">Date</span>
              <span className="text-sm">{dayjs(paymentData?.paidAt).format('DD MMMM YYYY')}</span>
            </div>
          </div>

          <div className="card-actions justify-center">
            <Link to="/dashboard/my-applications" className="btn btn-primary btn-wide">
              Go to My Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;