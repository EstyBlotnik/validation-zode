"use client";
import React, { useState } from 'react';

interface LoginFormState {
  username: string;
  email: string;
  password: string;
}
export default function Home() {
  const [formData, setFormData] = useState<LoginFormState>({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormState>({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // פונקציה לבדיקת הטופס
  const validateForm = (): boolean => {
    const newErrors = { username: '', email: '', password: '' };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = 'יש להזין שם משתמש';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'יש להזין אימייל';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'יש להזין סיסמה';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // פונקציה לטיפול בשליחת הטופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // כאן תוכל להוסיף את הלוגיקה להתחברות
      console.log('טופס נשלח:', formData);
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        </div>

        <div>
          <label>אימייל:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
          <label>סיסמה:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>

        <button type="submit" style={{ padding: '10px', marginTop: '12px', width: '100%', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          התחבר
        </button>
      </form>
    </div>
  );

}
