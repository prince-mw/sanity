"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function APIReferencePage() {
  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/campaigns",
      description: "Create a new advertising campaign",
      params: ["name", "budget", "start_date", "end_date", "targeting"]
    },
    {
      method: "GET",
      endpoint: "/api/v1/campaigns/{id}",
      description: "Retrieve campaign details",
      params: ["id"]
    },
    {
      method: "PUT",
      endpoint: "/api/v1/campaigns/{id}",
      description: "Update campaign settings",
      params: ["id", "budget", "targeting", "status"]
    },
    {
      method: "GET",
      endpoint: "/api/v1/analytics",
      description: "Get campaign analytics",
      params: ["campaign_id", "start_date", "end_date", "metrics"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              API Reference &
              <span className="text-mw-blue-600 block">Developer Resources</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Build powerful integrations with the Moving Walls API. Full REST API documentation and SDKs.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#" className="px-6 py-3 bg-mw-blue-600 text-white font-medium rounded-lg hover:bg-mw-blue-700 transition-colors">
                Get API Key
              </a>
              <Link href="/documentation" className="px-6 py-3 border border-mw-gray-300 text-mw-gray-700 font-medium rounded-lg hover:bg-mw-gray-50 transition-colors">
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">API Endpoints</h2>
          
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-mw-gray-200 rounded-xl p-6 hover:shadow-mw-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1 rounded font-mono text-sm font-semibold ${
                    endpoint.method === "GET" ? "bg-green-100 text-green-700" :
                    endpoint.method === "POST" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {endpoint.method}
                  </span>
                  <div className="flex-1">
                    <code className="text-lg font-mono text-mw-gray-900 mb-2 block">{endpoint.endpoint}</code>
                    <p className="text-mw-gray-600 mb-4">{endpoint.description}</p>
                    <div className="bg-mw-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-mw-gray-700 mb-2">Parameters:</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.params.map((param, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white text-mw-gray-700 text-sm font-mono rounded border border-mw-gray-200">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">Official SDKs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Node.js", icon: <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22h-.96c-.12 0-.21.1-.21.22v8.47c0 .66-.68 1.31-1.77.76L4.51 16.5a.26.26 0 01-.12-.21V7.71c0-.09.04-.17.12-.21l7.44-4.29a.24.24 0 01.24 0l7.44 4.29c.08.04.12.12.12.21v8.58c0 .08-.04.17-.12.21l-7.44 4.29a.27.27 0 01-.24 0l-1.91-1.11a.46.46 0 00-.22-.06c-.07 0-.14.03-.21.08L8.1 20.6c-.37.23-.49.47-.26.7.1.1.34.3 1.13.8.4.25.87.38 1.36.38.49 0 .96-.13 1.36-.38l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2z"/><path d="M14.25 10.68c-1.76 0-2.88.72-2.88 1.93 0 1.3 1.02 1.66 2.81 1.82 2.14.19 2.31.48 2.31.86 0 .67-.54.96-1.8.96-1.6 0-1.95-.4-2.07-1.19-.02-.11-.11-.19-.21-.19h-.99c-.12 0-.22.1-.22.22v.03c.17 1.68 1.27 2.36 3.5 2.36 2.09 0 3.29-.82 3.29-2.25 0-1.27-.86-1.61-2.67-1.85-1.82-.24-2.01-.36-2.01-.78 0-.35.16-.81 1.5-.81 1.2 0 1.64.26 1.82 1.08.02.1.11.17.21.17h.99c.06 0 .12-.02.16-.07.05-.04.08-.11.07-.18-.11-1.3-.93-1.91-3.14-1.91z"/></svg>, command: "npm install @movingwalls/node-sdk" },
              { name: "Python", icon: <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>, command: "pip install movingwalls-python" },
              { name: "PHP", icon: <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12s-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 01-.845 1.55zm6.285.92h-2.379l-.486 2.5h-1.378l1.23-6.326h1.358l-.513 2.637h2.379l.513-2.637h1.377l-1.23 6.326h-1.377l.506-2.5zm7.266-1.577c-.235.546-.551.991-.949 1.336-.398.345-.883.612-1.456.8-.57.188-1.261.282-2.073.282h-1.072l-.459 2.359h-1.378l1.23-6.326h2.304c.669 0 1.164.071 1.486.213.319.14.556.353.71.639.154.284.177.641.07 1.071l.58-.374zM19.23 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>, command: "composer require movingwalls/php-sdk" }
            ].map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-mw-gray-200 rounded-xl p-6"
              >
                <div className="mb-4">{sdk.icon}</div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{sdk.name}</h3>
                <code className="block bg-mw-gray-900 text-green-400 p-3 rounded text-sm font-mono mb-4">
                  {sdk.command}
                </code>
                <a href="#" className="text-mw-blue-600 font-medium hover:underline">
                  View Documentation →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Need Developer Support?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our developer community or reach out to our technical team for assistance.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
            >
              Contact Developer Support
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
