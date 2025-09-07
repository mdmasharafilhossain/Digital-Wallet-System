import React, { useState } from "react";

import Swal from "sweetalert2";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   Swal.fire({
      title: "Message Sent! 🎉",
      text: "Thank you for your message. We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#C8A978",
      background: "#355676",
      color: "#E6D5B8",
      confirmButtonText: "OK",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#355676] text-[#E6D5B8] py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg text-[#C8A978]">
            Have questions? We'd love to hear from you
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <div className="bg-[#2A4555] shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {["name", "email", "subject"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium mb-1"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md bg-[#355676] text-[#E6D5B8] border border-[#C8A978]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#355676] text-[#E6D5B8] border border-[#C8A978]/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#C8A978] text-[#355676] px-6 py-2 rounded-md font-semibold hover:bg-[#E6D5B8] hover:text-[#355676] focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A978] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info + FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-[#2A4555] shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="w-6 h-6 mt-1">📍</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Address</h3>
                    <p className="text-sm opacity-80">
                      123 Financial Street, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 mt-1">📞</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Phone</h3>
                    <p className="text-sm opacity-80">+880 1234 567890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 mt-1">✉️</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Email</h3>
                    <p className="text-sm opacity-80">info@Amarwallet.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 mt-1">🕒</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Business Hours</h3>
                    <p className="text-sm opacity-80">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm opacity-80">
                      Sat: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#2A4555] shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold hover:text-[#C8A978] transition-colors">
                    How do I create an account?
                  </h3>
                  <p className="text-sm opacity-80">
                    Click on the Register button and follow the simple steps to
                    create your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold hover:text-[#C8A978] transition-colors">
                    Is my money safe?
                  </h3>
                  <p className="text-sm opacity-80">
                    Yes, we use bank-level security measures to protect your
                    funds and personal information.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold hover:text-[#C8A978] transition-colors">
                    How long do transfers take?
                  </h3>
                  <p className="text-sm opacity-80">
                    Most transfers are instant, but some may take up to 24 hours
                    depending on the method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
