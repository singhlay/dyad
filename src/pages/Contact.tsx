import React, { useState } from 'react';
import {ContactUs} from '../assets/images/index.ts'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    practice: '',
    message: '',
    schedule: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Contact Hero Section */}
      <section className="contact-section py-16">
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-medium">Providers or Administrators:</h2>
              <p className="text-2xl font-medium mb-6">Please Fill Out The Form Below</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Type your name here"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Type your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Type your email id"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="practice" className="form-label">
                    Practice/Facility Name*
                  </label>
                  <input
                    type="text"
                    id="practice"
                    name="practice"
                    value={formData.practice}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Type your practice/facility name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Enter a Brief Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Do not leave information protected under HIPAA. This form is intended for providers and administrators only."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="schedule" className="form-label">
                    Schedule a Time to Connect*
                  </label>
                  <input
                    type="datetime-local"
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Schedule time"
                    required
                  />
                </div>
                

                <button
                  type="submit"
                  className="btn-submit"
                >
                  Submit
                </button>
              </form>
            </div>

            <div>
              <img 
                src={ContactUs}
                alt="Contact Support"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;