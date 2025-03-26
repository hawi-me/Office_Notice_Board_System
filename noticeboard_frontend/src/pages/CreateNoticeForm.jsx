"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CalendarIcon, ClockIcon, FileIcon, CheckCircleIcon, AlertCircleIcon, ArrowLeftIcon, MoreVerticalIcon } from "lucide-react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreateNoticeForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showTitleDropdown, setShowTitleDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    expires_at: "",
    needs_approver: true,
    approved_by: "",
    approved_at: "",
    file_path: "",
  })

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  // Quill formats configuration
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTitleDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Set mounted state and default values
  useEffect(() => {
    setIsMounted(true)
    
    const oneMonthFromNow = new Date()
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

    const today = new Date()

    setFormData((prev) => ({
      ...prev,
      expires_at: oneMonthFromNow.toISOString().split("T")[0],
      approved_at: today.toISOString().split("T")[0],
      approved_by: "123e4567-e89b-12d3-a456-426614174000",
    }))
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }))
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  // Handle drag-and-drop file upload
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const NewFormData = new FormData()

      NewFormData.append("title", formData.title)
      NewFormData.append("description", formData.description)
      NewFormData.append("status", formData.status)
      NewFormData.append("expires_at", formData.expires_at)
      NewFormData.append("needs_approver", formData.needs_approver ? "1" : "0")
      NewFormData.append("approved_by", formData.approved_by)
      NewFormData.append("approved_at", formData.approved_at)

      if (file) {
        NewFormData.append("file_path", file)
      }

      const response = await fetch("https://demo.iclpartner.com/api/create_notice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: NewFormData,
      })

      const rawResponse = await response.text()
      console.log("Raw response:", rawResponse)

      if (!response.ok) {
        let errorData
        try {
          errorData = JSON.parse(rawResponse)
        } catch (err) {
          console.error("Failed to parse error response as JSON:", rawResponse)
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`)
      }

      setSuccess(true)
      setTimeout(() => {
        navigate("/notices")
      }, 2000)
    } catch (err) {
      console.error("Error creating notice:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p>Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Create New Notice</h1>
                <p className="text-gray-500 mt-2">Fill in the details to create a new office notice</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                  <div className="flex">
                    <AlertCircleIcon className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
                  <div className="flex">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span>Notice created successfully! Redirecting...</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-black"
                          placeholder="Enter notice title"
                        />
                        <button
                          type="button"
                          onClick={() => setShowTitleDropdown(!showTitleDropdown)}
                          className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <MoreVerticalIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Title Dropdown Menu */}
                      {showTitleDropdown && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        >
                          <div className="py-1">
                           
                            <button
                              type="button"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                navigator.clipboard.writeText(formData.title)
                                setShowTitleDropdown(false)
                              }}
                            >
                              Copy Title
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <div className="bg-white rounded-lg border border-gray-300">
                        <ReactQuill
                          theme="snow"
                          value={formData.description}
                          onChange={handleDescriptionChange}
                          modules={modules}
                          formats={formats}
                          placeholder="Enter notice description"
                          className="h-64 mb-12 text-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-black"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="expires_at"
                            name="expires_at"
                            type="date"
                            required
                            value={formData.expires_at}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Approval Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="needs_approver"
                        name="needs_approver"
                        type="checkbox"
                        checked={formData.needs_approver}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="needs_approver" className="ml-2 block text-sm text-gray-700">
                        This notice requires approval
                      </label>
                    </div>

                    {formData.needs_approver && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 pt-2"
                      >
                        <div>
                          <label htmlFor="approved_by" className="block text-sm font-medium text-gray-700 mb-1">
                            Approver ID
                          </label>
                          <input
                            id="approved_by"
                            name="approved_by"
                            type="text"
                            value={formData.approved_by}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-black"
                            placeholder="Enter approver ID"
                          />
                        </div>

                        <div>
                          <label htmlFor="approved_at" className="block text-sm font-medium text-gray-700 mb-1">
                            Approval Date
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <ClockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="approved_at"
                              name="approved_at"
                              type="date"
                              value={formData.approved_at}
                              onChange={handleChange}
                              className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-black"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Additional Information
                  </h2>

                  <div>
                    <label htmlFor="file_path" className="block text-sm font-medium text-gray-700 mb-1">
                      Attach File
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white"
                      }`}
                    >
                      <p className="text-gray-500">Drag and drop a file here, or</p>
                      <input
                        id="file_path"
                        name="file_path"
                        type="file"
                        onChange={handleFileChange}
                        className="mt-2"
                      />
                    </div>
                    {file && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Uploaded file: {file.name}</p>
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Preview file
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || success}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
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
                        Creating...
                      </div>
                    ) : (
                      "Create Notice"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateNoticeForm