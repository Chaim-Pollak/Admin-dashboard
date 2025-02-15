import React, { useState } from "react";
import {
  Clock,
  FileText,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  BarChart,
  Shield,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function HomePage() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      title: "Real-Time Issue Management",
      description: "Track and document issues from any device, anytime.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      title: "Detailed Reports & Smart Insights",
      description: "Generate professional reports with a single click.",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: "Personalized Support",
      description: "Close guidance throughout your project phases.",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  const benefits = [
    {
      title: "Time & Cost Savings",
      description: "Streamlined processes reducing delays",
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: "Uncompromising Professionalism",
      description: "Experienced team understanding your challenges",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Advanced Technology",
      description: "Innovative solutions for the digital age",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-transparent bg-clip-text mb-6">
            Construction Issue Manager
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-8">
            We're here to make your construction site issue management simple,
            fast, and efficient.
          </p>

          <NavLink to={"/ContactPage"}>
            <button className="px-8 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              Contact Us Now
            </button>
          </NavLink>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`text-amber-600 mb-4 transform transition-transform duration-300 ${
                    hoveredService === index ? "scale-110" : ""
                  }`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-700 mb-4">
                  {service.title}
                </h3>
                <p className="text-amber-900">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="text-amber-600 p-3 bg-amber-100 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-700 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-amber-900">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-12">
            What Our Clients Say
          </h2>
          <div className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm">
            <p className="text-xl text-amber-900 italic mb-6">
              "Their system has transformed the way we work - everything is
              clearer, more organized, and faster!"
            </p>
            <p className="text-amber-700 font-semibold">David Cohen</p>
            <p className="text-amber-600">Project Manager</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-12">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Phone className="w-8 h-8 text-amber-600 mb-4" />
              <p className="text-amber-900">053-5444616</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Mail className="w-8 h-8 text-amber-600 mb-4" />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ch324id@gmail.com"
                target="_blank"
                className="text-amber-900 hover:text-amber-600"
              >
                ch324id@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <MapPin className="w-8 h-8 text-amber-600 mb-4" />
              <p className="text-amber-900">Effective Solutions, Ashdod</p>
            </div>
          </div>
          <NavLink to={"/ContactPage"}>
            <button className="mt-12 px-8 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg inline-flex items-center">
              Start Managing Your Issues Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
