import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../../../../lib/Toast";
import { Mail, User, Phone, Send } from "lucide-react";

function ContactForm() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  };

  const [values, setValues] = useState(null);

  const { mutate } = useMutation({
    mutationKey: ["send_message"],
    mutationFn: async (values) =>
      await axios.post("/general/contactSendEmail", values),

    onSuccess: (msg) => {
      showSuccessToast(msg.data.message);
      setValues(initialValues);
      navigate("/");
    },
    onError: (error) => {
      showErrorToast(error.response.data.error);
    },
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      mutate(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-transparent bg-clip-text mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-4" />
          <p className="text-amber-700">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-amber-700 mb-2 font-medium">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-amber-500" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={values?.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-amber-700 mb-2 font-medium">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-amber-500" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={values?.lastName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-amber-700 mb-2 font-medium">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-amber-700 mb-2 font-medium">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-amber-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={values?.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-amber-700 mb-2 font-medium">
                Message Description
              </label>
              <textarea
                name="description"
                value={values?.description}
                onChange={handleChange}
                rows="4"
                className="block w-full px-3 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all duration-200"
                placeholder="Tell us about your inquiry..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
