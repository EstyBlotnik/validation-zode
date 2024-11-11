"use client";
import React, { useState } from 'react';
import { userData, userSchema } from '@/app/types/user'

export default function Home() {
  const [formData, setFormData] = useState<userData>({
    firstname: '',
    lastname: '',
    id: '',
    birthdate: new Date(),
    email: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof userData, string>>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'birthdate' ? new Date(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ביצוע ולידציה באמצעות Zod
    const validationResult = userSchema.safeParse(formData);

    if (!validationResult.success) {
      // עדכון הודעות השגיאה במידה והוולידציה נכשלה
      const fieldErrors: Partial<Record<keyof userData, string>> = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof userData] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      // אם הוולידציה הצליחה, אפשר לשלוח את הנתונים לשרת או לבצע פעולה אחרת
      console.log("הנתונים תקינים:", validationResult.data);
      setErrors({}); // איפוס הודעות שגיאה
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">טופס הרשמה</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">שם פרטי:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          {errors.firstname && <span className="text-red-600 text-sm">{errors.firstname}</span>}
        </div>

        <div>
          <label className="block text-gray-700">שם משפחה:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          {errors.lastname && <span className="text-red-600 text-sm">{errors.lastname}</span>}
        </div>

        <div>
          <label className="block text-gray-700">תעודת זהות:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          {errors.id && <span className="text-red-600 text-sm">{errors.id}</span>}
        </div>

        <div>
          <label className="block text-gray-700">תאריך לידה:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate.toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          {errors.birthdate && <span className="text-red-600 text-sm">{errors.birthdate}</span>}
        </div>

        <div>
          <label className="block text-gray-700">אימייל:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300">
          הרשמה
        </button>
      </form>
    </div>
  );
}
