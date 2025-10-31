"use client";

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Mail, MapPin, Phone, Send } from "lucide-react";

function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          alert("✅ Message sent successfully! Thank you for contacting me.");
          formRef.current?.reset();
        },
        (error) => {
          console.error("❌ Email send failed:", error);
          alert("❌ Failed to send message. Try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have a question or feedback? Please reach out to our support center.
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send a Message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                <a
                  href="mailto:chorychanrady.wu@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors break-all"
                >
                  chorychanrady.wu@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                <a
                  href="tel:+85510346085"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +855 10 346 085
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Telegram</h4>
                <a
                  href="https://t.me/chorychanrady"
                  className="text-gray-600 hover:text-blue-600 transition-colors break-all"
                >
                  @chorychanrady
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                <p className="text-gray-600">
                  271, Sangkat Ou Baek K'am, Khan Saen Sok
                  <br />
                  Phnom Penh, Cambodia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
