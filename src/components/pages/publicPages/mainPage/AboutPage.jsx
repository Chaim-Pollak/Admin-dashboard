import React from "react";
import {
  Target,
  History,
  Users,
  Award,
  Star,
  Grid,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function AboutPage() {
  const companyInfo = {
    name: "Construction Issue Manager",
    slogan: "Transforming Tomorrow's Issue Today",
    founded: "2024",
    founders: [
      "Chaim Pollak",
      "Netanel Malka",
      "Simcha Kalikshtein",
      "Daniel Biton",
    ],
  };

  const sections = [
    {
      title: "Our Vision",
      icon: <Target className="w-8 h-8 mb-4 text-amber-600" />,
      content: `At ${companyInfo.name}, we envision a world where technology seamlessly enhances efficiency in construction management. Our mission is to deliver innovative solutions that streamline issue tracking, improve communication, and drive efficiency on construction sites. We are guided by our core values of innovation, integrity, and excellence in everything we do.`,
    },
    {
      title: "Our Story",
      icon: <History className="w-8 h-8 mb-4 text-amber-600" />,
      content: `Founded in ${
        companyInfo.founded
      } by ${companyInfo.founders.join(
        ", "
      )}, our journey began with a shared vision to revolutionize the way construction issues are tracked and resolved. Frustrated by inefficiencies in traditional methods, we set out to develop a platform that simplifies issue management, enhances collaboration, and ensures projects stay on schedule.`,
    },
    {
      title: "Our Expertise",
      icon: <Grid className="w-8 h-8 mb-4 text-amber-600" />,
      content:
        "We specialize in construction site issue tracking, real-time reporting, and workflow automation. Our platform is designed to empower construction professionals with intuitive tools to log, monitor, and resolve site issues efficiently.",
    },
    {
      title: "Achievements",
      icon: <Award className="w-8 h-8 mb-4 text-amber-600" />,
      content:
        "Successfully implemented issue tracking solutions for major construction projects. Helped teams reduce issue resolution time by 80% (you can add a real number if available). Recognized for improving construction project efficiency through streamlined workflows.",
    },
  ];

  const competitiveAdvantages = [
    "Seamless Integration with existing construction management tools.",
    "Real-Time Collaboration for field workers, and project managers.",
    "Data-Driven Insights to improve issue resolution and prevent future delays.",
    "User-Friendly Interface for fast adoption and minimal training.",
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-transparent bg-clip-text mb-4">
          {companyInfo.name}
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-4" />
        <p className="text-xl text-amber-700 font-light">
          {companyInfo.slogan}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              {section.icon}
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                {section.title}
              </h2>
            </div>
            <p className="text-amber-900 text-center">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Competitive Advantages Section */}
      <div className="bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-sm mb-16">
        <h2 className="text-2xl font-bold text-amber-700 text-center mb-8">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitiveAdvantages.map((advantage, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg"
            >
              <Star className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">{advantage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-sm mb-16">
        <div className="text-center mb-8">
          <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-700">Our Team</h2>
          <p className="text-amber-900 mt-4">
            Our diverse team of experts brings together experience in
            construction management, software development, and process
            optimization. Each member is committed to delivering excellence and
            improving efficiency in construction issue tracking.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-700 mb-6">
          Ready to Transform Your Business?
        </h2>
        <NavLink to={"/ContactPage"}>
          <button className="bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto">
            <PhoneCall className="w-5 h-5 mr-2" />
            Contact Us Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default AboutPage;
