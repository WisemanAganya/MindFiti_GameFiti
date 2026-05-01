
import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_COLOR } from '../constants';

const PaymentPage = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: PRIMARY_COLOR }}>
            How to Pay
          </h2>

          <div className="mb-8">
            <h3 className="font-montserrat text-2xl font-semibold mb-4 text-gray-800">M-Pesa Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Go to your M-Pesa application.</li>
              <li>Under the Paybill option input the business number <strong className="font-bold">247247</strong> (Equity Paybill).</li>
              <li>Under account number, input the 10-digit Account number <strong className="font-bold">0798036081</strong>.</li>
              <li>Input amount to be paid then complete the transaction.</li>
              <li>Obtain and retain the MPESA confirmation SMS with the payment details.</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="font-montserrat text-2xl font-semibold mb-4 text-gray-800">Equity Bank Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Login into your Bank’s Mobile App or Online Banking Platform.</li>
              <li>Input the following details:
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li><strong className="font-semibold">Account Name:</strong> Project MindStrong</li>
                  <li><strong className="font-semibold">Account Number:</strong> 0798036081</li>
                  <li><strong className="font-semibold">Narration:</strong> Customer Name</li>
                </ul>
              </li>
              <li>Obtain and retain a copy of the e-receipt once the transaction is completed.</li>
            </ol>
          </div>

          <div className="mt-10 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#e6f2ff', borderColor: PRIMARY_COLOR }}>
            <h4 className="font-montserrat text-xl font-bold mb-3 text-gray-800">After Payment</h4>
            <p className="text-gray-700 mb-3">Please send an email to <a href="mailto:info@projectmindstrong.com" className="font-bold hover:underline" style={{ color: PRIMARY_COLOR }}>info@projectmindstrong.com</a> with the following details:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>Your Full Name</li>
              <li>Phone Number</li>
              <li>Sizes and Description of Merchandise (include color)</li>
            </ul>
          </div>
           <div className="text-center mt-12">
                <Link to="/" className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300">
                    <i className="fas fa-arrow-left mr-2"></i>Back to Home
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;