import React, { useState, useRef } from 'react';
import { ContactUs } from '../assets/images/index.ts'
import ReCAPTCHA from "react-google-recaptcha";
import { formSubmit } from '../services/service.ts';

interface FormData {
  name: string;
  phone: string;
  email: string;
  organization: string;
  message: string;
  schedule: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCaptchaValidated, setIscaptchaValidated] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    organization: '',
    message: '',
    schedule: ''
  });

  const formatData = (data: any) => {
    // Convert "2025-04-16T17:12" → "2025-04-16 17:12"
    const formattedSchedule = data.schedule.replace("T", " ");

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      brief_message: data.message,
      scheduled_time: formattedSchedule, // Now in "YYYY-MM-DD HH:mm" format
    };
  };

  const onCaptchaSuccess = (value: any) => {
    if (value) {
      setIscaptchaValidated(true);
    }
    formErrors.captcha = ""
  }

  // Validation helpers
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove all non-digit characters first
    const digitsOnly = phone.replace(/\D/g, '');
    // Then check length (adjust as needed for your requirements)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };



  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.organization.trim()) errors.organization = "organization/Facility name is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    if (!isCaptchaValidated) errors.captcha = "Please complete the CAPTCHA";

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.schedule.trim()) {
      errors.schedule = "Schedule time is required";
    } else {
      const selectedTime = new Date(formData.schedule).getTime();
      const currentTime = new Date().getTime();

      // Check if time is in the past
      if (selectedTime <= currentTime) {
        errors.schedule = "Please select a future time";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    if (!validateForm()) {
      setIsError(true);
      return;
    }


    try {
      setIsSubmitting(true);
      const formattedData = formatData(formData);

      const data = await formSubmit(formattedData);
      if (data) {
        setIsError(false);
        setMessage("Thanks for submitting your request. We will get back to you soon");
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          organization: '',
          message: '',
          schedule: ''
        });
        recaptchaRef.current?.reset();
        setIscaptchaValidated(false);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log("HandleSubmit Error", error);
      setIsError(true);
      setMessage("Failed to submit form. Please try again.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ""
      });
    }
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
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
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
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
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
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="organization" className="form-label">
                    organization/Facility Name*
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Type your organization/facility name"
                  />
                  {formErrors.organization && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.organization}</p>
                  )}
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
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                  )}
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
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {formErrors.schedule && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.schedule}</p>
                  )}
                </div>

              
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_SITE_KEY}
                    onChange={onCaptchaSuccess}
                    size="normal"
                  />
                  {formErrors.captcha && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.captcha}</p>
                  )}

                  {/* Status message */}
                  {message && (
                    <p className={`text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                      {message}
                    </p>
                  )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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