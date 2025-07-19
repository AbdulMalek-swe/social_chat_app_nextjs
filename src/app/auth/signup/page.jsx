"use client"
// SignupForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignUpMutation } from '../features/authApi';

export default function SignupForm() {
    const [signUp,{isError,data,isLoading}] = useSignUpMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      signUp(values)
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
