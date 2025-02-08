"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutFlow: React.FC = () => {
  const [formData, setFormData] = useState({
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingCountry: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
    shippingCountry: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);

      // Redirect to Home Page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Billing Address */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="font-semibold text-lg">Billing Address</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="billingName"
              value={formData.billingName}
              onChange={handleChange}
              placeholder="Full Name *"
              className={`input h-12 p-3 ${errors.billingName ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              placeholder="Address *"
              className={`input h-12 p-3 ${errors.billingAddress ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
              placeholder="City *"
              className={`input h-12 p-3 ${errors.billingCity ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="billingZip"
              value={formData.billingZip}
              onChange={handleChange}
              placeholder="ZIP Code *"
              className={`input h-12 p-3 ${errors.billingZip ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
              placeholder="Country *"
              className={`input h-12 p-3 col-span-2 ${errors.billingCountry ? "border-red-500" : ""}`}
              required
            />
          </div>
        </fieldset>

        {/* Shipping Address */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="font-semibold text-lg">Shipping Address</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="shippingName"
              value={formData.shippingName}
              onChange={handleChange}
              placeholder="Full Name *"
              className={`input h-12 p-3 ${errors.shippingName ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="Address *"
              className={`input h-12 p-3 ${errors.shippingAddress ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              placeholder="City *"
              className={`input h-12 p-3 ${errors.shippingCity ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="shippingZip"
              value={formData.shippingZip}
              onChange={handleChange}
              placeholder="ZIP Code *"
              className={`input h-12 p-3 ${errors.shippingZip ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleChange}
              placeholder="Country *"
              className={`input h-12 p-3 col-span-2 ${errors.shippingCountry ? "border-red-500" : ""}`}
              required
            />
          </div>
        </fieldset>

        {/* Payment Details */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="font-semibold text-lg">Payment Details</legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number *"
              className={`input h-12 p-3 col-span-2 ${errors.cardNumber ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="Expiry Date (MM/YY) *"
              className={`input h-12 p-3 ${errors.expiryDate ? "border-red-500" : ""}`}
              required
            />
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV *"
              className={`input h-12 p-3 ${errors.cvv ? "border-red-500" : ""}`}
              required
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 bg rounded-lg font-semibold transition ${
            isCompleted
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-800 hover:bg-green-700"
          } text-white disabled:bg-gray-400`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : isCompleted ? "Completed!" : "Complete Purchase"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutFlow;
