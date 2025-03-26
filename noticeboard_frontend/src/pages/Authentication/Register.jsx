"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    role: "",
    position: "",
    office_id: "",
    email: "",
    phone_number: "",
    dob: "",
    city: "",
    password: "",
    password_confirmation: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1)
  const [token, setToken] = useState(null) // Store the token after login

  const passwordRequirements = [
    { id: "length", label: "At least 8 characters", met: formData.password.length >= 8 },
    { id: "uppercase", label: "At least 1 uppercase letter", met: /[A-Z]/.test(formData.password) },
    { id: "lowercase", label: "At least 1 lowercase letter", met: /[a-z]/.test(formData.password) },
    { id: "number", label: "At least 1 number", met: /\d/.test(formData.password) },
    { id: "special", label: "At least 1 special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required"
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required"
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.password = "Password does not meet all requirements"
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://demo.iclpartner.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: formData.first_name,
            middle_name: formData.middle_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_number: formData.phone_number,
            dob: formData.dob,
            city: formData.city,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            role: "user",
            position: "Software Engineer",
            office_id: "123e4567-e89b-12d3-a456-426614174000",
        }
    ),
      });

  
      // Check if the response is a redirect
      if (response.redirected) {
        throw new Error("Request was redirected. Check the backend configuration.");
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      // Redirect to login after successful registration
      window.location.href = "/dashboard";
    } catch (err) {
        console.log("error", err)
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  

  const handlePostNotice = async (noticeData) => {
    try {
      const response = await fetch("https://demo.iclpartner.com/api/get_notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(noticeData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to post notice")
      }

      alert("Notice posted successfully!")
    } catch (err) {
      setErrors({ submit: err.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (step === 1) {
      handleNextStep()
      return
    }

    if (!validateStep2()) {
      return
    }

    await handleRegister()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-500 mt-2">Sign up to get started</p>
            </div>

            {errors.submit && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">{errors.submit}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                   <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          value={formData.first_name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.first_name ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="John"
                        />
                        {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
                      </div>
                      <div>
                        <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Middle Name
                        </label>
                        <input
                          id="middle_name"
                          name="middle_name"
                          type="text"
                          value={formData.middle_name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.middle_name ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="A"
                        />
                        {errors.middle_name && <p className="mt-1 text-sm text-red-500">{errors.middle_name}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.last_name ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                        placeholder="Doe"
                      />
                      {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone_number ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                        placeholder="+1234567890"
                      />
                      {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
                    </div>

                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.dob ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                      />
                      {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

                      <div className="mt-3 space-y-2">
                        {passwordRequirements.map((req) => (
                          <div key={req.id} className="flex items-center">
                            {req.met ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                            )}
                            <span className={`text-xs ${req.met ? "text-green-500" : "text-gray-500"}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type={showPassword ? "text" : "password"}
                          value={formData.password_confirmation}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.password_confirmation ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}

              

                {step === 2 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                )}
              </div>
            </form>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                   <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

                      <div className="mt-3 space-y-2">
                        {passwordRequirements.map((req) => (
                          <div key={req.id} className="flex items-center">
                            {req.met ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                            )}
                            <span className={`text-xs ${req.met ? "text-green-500" : "text-gray-500"}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type={showPassword ? "text" : "password"}
                          value={formData.password_confirmation}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.password_confirmation ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                )}
              </div>
            </form>

            <p className="text-center mt-8 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register