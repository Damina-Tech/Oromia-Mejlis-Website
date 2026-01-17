"use client";

import { useState, FormEvent, useEffect } from "react";
import { submitContactMessage } from "@/lib/strapi";
import Link from "next/link";

// Rate limiting constants
const MAX_SUBMISSIONS_PER_DAY = 3;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface SubmissionRecord {
  count: number;
  firstSubmission: number;
  lastSubmission: number;
}

// Utility functions for rate limiting
const getSubmissionHistory = (): SubmissionRecord | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("contact_form_submissions");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const saveSubmissionHistory = (record: SubmissionRecord) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("contact_form_submissions", JSON.stringify(record));
};

const checkRateLimit = (): { allowed: boolean; remainingTime?: number } => {
  const history = getSubmissionHistory();
  const now = Date.now();

  if (!history) {
    // First submission
    saveSubmissionHistory({
      count: 1,
      firstSubmission: now,
      lastSubmission: now,
    });
    return { allowed: true };
  }

  // Check if 24 hours have passed since first submission
  const timeSinceFirst = now - history.firstSubmission;

  if (timeSinceFirst >= RATE_LIMIT_WINDOW) {
    // Reset counter - new 24-hour window
    saveSubmissionHistory({
      count: 1,
      firstSubmission: now,
      lastSubmission: now,
    });
    return { allowed: true };
  }

  // Check if limit exceeded
  if (history.count >= MAX_SUBMISSIONS_PER_DAY) {
    const remainingTime = RATE_LIMIT_WINDOW - timeSinceFirst;
    return {
      allowed: false,
      remainingTime: Math.ceil(remainingTime / (60 * 60 * 1000)), // Convert to hours
    };
  }

  // Increment counter
  saveSubmissionHistory({
    count: history.count + 1,
    firstSubmission: history.firstSubmission,
    lastSubmission: now,
  });
  return { allowed: true };
};

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 5000); // Max length
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInput = (name: string, email: string, subject: string, message: string): string | null => {
  if (name.length < 2 || name.length > 100) {
    return "Name must be between 2 and 100 characters.";
  }
  if (!validateEmail(email)) {
    return "Please enter a valid email address.";
  }
  if (email.length > 255) {
    return "Email address is too long.";
  }
  if (subject.length < 3 || subject.length > 200) {
    return "Subject must be between 3 and 200 characters.";
  }
  if (message.length < 10 || message.length > 5000) {
    return "Message must be between 10 and 5000 characters.";
  }
  return null;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Honeypot field for bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    total: number;
  } | null>(null);

  // Check rate limit status on mount
  useEffect(() => {
    const history = getSubmissionHistory();
    if (history) {
      const now = Date.now();
      const timeSinceFirst = now - history.firstSubmission;
      
      if (timeSinceFirst < RATE_LIMIT_WINDOW) {
        setRateLimitInfo({
          remaining: Math.max(0, MAX_SUBMISSIONS_PER_DAY - history.count),
          total: MAX_SUBMISSIONS_PER_DAY,
        });
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Honeypot check - if filled, it's likely a bot
      if (formData.honeypot) {
        setSubmitStatus({
          type: "error",
          message: "Invalid submission detected.",
        });
        setIsSubmitting(false);
        return;
      }

      // Input validation
      const validationError = validateInput(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
      if (validationError) {
        setSubmitStatus({
          type: "error",
          message: validationError,
        });
        setIsSubmitting(false);
        return;
      }

      // Rate limiting check
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        setSubmitStatus({
          type: "error",
          message: `You have reached the maximum number of submissions (${MAX_SUBMISSIONS_PER_DAY} per day). Please try again in ${rateLimitCheck.remainingTime} hour(s).`,
        });
        setIsSubmitting(false);
        return;
      }

      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email).toLowerCase(),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      // Add a small delay to prevent rapid submissions
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await submitContactMessage(sanitizedData);
      
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
        
        // Update rate limit info
        const history = getSubmissionHistory();
        if (history) {
          setRateLimitInfo({
            remaining: Math.max(0, MAX_SUBMISSIONS_PER_DAY - history.count),
            total: MAX_SUBMISSIONS_PER_DAY,
          });
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We really appreciate you taking the time to get in touch. Please fill in the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We really appreciate you taking the time to get in touch. Please fill in the form below.
              </p>

              {/* Contact Information */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Oromia Majlis Headquarters, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call</h3>
                    <p className="text-gray-600">+251 9XX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Mail</h3>
                    <p className="text-gray-600">info@oromiamajlis.et</p>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Opening Hours</h3>
                <p className="text-gray-600">
                  Open Daily 8:00 AM - 5:30 PM<br />
                  Friday: 1:00 PM - 5:30 PM
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Leave your message</h2>
              
              {/* Rate Limit Info */}
              {rateLimitInfo && rateLimitInfo.remaining < MAX_SUBMISSIONS_PER_DAY && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-sm">
                  <p>
                    You have {rateLimitInfo.remaining} of {rateLimitInfo.total} submissions remaining today.
                  </p>
                </div>
              )}

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      minLength={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    minLength={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="Message Subject"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Write your message...
                    </label>
                    <span className="text-xs text-gray-500">
                      {formData.message.length}/5000 characters
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={5000}
                    minLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-y"
                    placeholder="Your message here..."
                  />
                  {formData.message.length < 10 && formData.message.length > 0 && (
                    <p className="mt-1 text-xs text-amber-600">
                      Message must be at least 10 characters ({10 - formData.message.length} more needed)
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  For security purposes, submissions are limited to {MAX_SUBMISSIONS_PER_DAY} messages per day per user.
                </p>
              </form>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h2>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.788!2d38.7636!3d9.0054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164f85b8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oromia Majlis Location - Addis Ababa, Ethiopia"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

