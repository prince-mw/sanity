"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";

const ZOHO_FORM_PERMALINK = "U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw";
const ZOHO_FORM_LINK_NAME = "ContactUs";
const ZOHO_PORTAL_NAME = "movingwallsholdingpteltd";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burma","Burundi",
  "Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hong Kong","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Korea (North)","Korea (South)","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway",
  "Oman",
  "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Venezuela","Vietnam",
  "Yemen",
  "Zambia","Zimbabwe"
];

export default function ContactForm() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/zoho-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zohoFormPermalink: ZOHO_FORM_PERMALINK,
          zohoFormLinkName: ZOHO_FORM_LINK_NAME,
          zohoPortalName: ZOHO_PORTAL_NAME,
          fields: {
            "Name_First": formData.firstName,
            "Name_Last": formData.lastName,
            "SingleLine": formData.company,
            "Email": formData.email,
            "PhoneNumber_countrycode": formData.phone,
            "Radio": formData.role,
            "Address_Country": formData.country,
            "MultiLine": formData.message,
            "Page_Source": typeof window !== "undefined" ? window.location.pathname : "",
            "Page_URL": typeof window !== "undefined" ? window.location.href : "",
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-mw-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              {t('landingPage.contactForm.title')}
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              {t('landingPage.contactForm.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-mw-gray-900 mb-6">Multiple Ways to Connect</h3>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-mw-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-mw-gray-900 mb-1">Moving Walls Pte Ltd</h4>
                      <p className="text-mw-gray-600">14, Robinson Road #8-02<br />Far East Financial Building<br />Singapore 048545</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-mw-gray-900 mb-1">Direct Line</h4>
                      <p className="text-mw-gray-600 font-medium">+65 6714 6699</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-mw-gray-900 mb-1">Priority Email</h4>
                      <a href="mailto:info@movingwalls.com" className="text-mw-gray-600 font-medium hover:text-mw-blue-600 transition-colors">info@movingwalls.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-mw-lg p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* First Name / Last Name */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-mw-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-mw-gray-700 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-mw-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                        placeholder="Company Name"
                      />
                    </div>

                    {/* Company Email / Phone */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-mw-gray-700 mb-2">
                          Company Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                          placeholder="Company Email"
                        />
                        <p className="text-xs text-mw-gray-500 mt-1">Please use your company email</p>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-mw-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    {/* I am a.. (Dropdown) */}
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-mw-gray-700 mb-2">
                        I am a.. <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 outline-none transition-all text-sm bg-white appearance-none"
                      >
                        <option value="" disabled>Select...</option>
                        <option value="Brand">Brand</option>
                        <option value="Agency">Agency</option>
                        <option value="Media Owner">Media Owner</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    {/* Country */}
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-mw-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors"
                      >
                        <option value="">Select Country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-mw-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500 transition-colors resize-vertical"
                        placeholder="Tell us more about your request"
                      />
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-mw-blue-600 to-indigo-600 hover:from-mw-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-mw-md hover:shadow-mw-lg transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            {t('landingPage.contactForm.form.submit')}
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-mw-gray-900 mb-4">{t('landingPage.contactForm.form.success')}</h3>
                    <p className="text-mw-gray-600 mb-4">
                      {t('landingPage.contactForm.form.successDesc')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}