"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
  SearchIcon,
  FilterIcon,
  ExternalLinkIcon,
} from "lucide-react"
import DOMPurify from 'dompurify'; 
import { fetchAllNotices, deleteNoticeById } from "../api/notices"


const NoticesList = () => {
  const navigate = useNavigate()
  const [notices, setNotices] = useState([])
  const [filteredNotices, setFilteredNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  


  useEffect(() => {
    const loadNotices = async () => {
      try {
        setLoading(true)
        const data = await fetchAllNotices()
        // Sort notices by creation date (newest first)
        const sortedNotices = data.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
        setNotices(sortedNotices)
        setFilteredNotices(sortedNotices)
        setError(null)
      } catch (err) {
        console.error("Error loading notices:", err)
        setError(err.message || "Failed to load notices")
      } finally {
        setLoading(false)
      }
    }

    loadNotices()
  }, [])

  // Filter notices when search term or status filter changes
  useEffect(() => {
    let results = notices

    // Filter by status
    if (statusFilter !== "all") {
      results = results.filter((notice) => notice.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (notice) => notice.title.toLowerCase().includes(term) || notice.description.toLowerCase().includes(term),
      )
    }

    setFilteredNotices(results)
  }, [notices, searchTerm, statusFilter])

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get expiration status
  const getExpirationStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { label: "Expired", className: "bg-red-100 text-red-800" }
    } else if (diffDays <= 7) {
      return { label: `Expires in ${diffDays} days`, className: "bg-yellow-100 text-yellow-800" }
    } else {
      return { label: `Expires in ${diffDays} days`, className: "bg-green-100 text-green-800" }
    }
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Handle notice deletion
  const handleDeleteNotice = async (id) => {
    try {
      await deleteNoticeById(id)
      // Remove the deleted notice from the state
      setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id))
      setFilteredNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id))
    } catch (err) {
      console.error("Error deleting notice:", err)
      alert("Failed to delete notice. Please try again.")
    }
  }
  // Format date for display

  const sanitizeHtml = (html) => {
    // Basic HTML sanitization - you might want to use a library like DOMPurify for production
    return html
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/on\w+=".*?"/gi, '')
      .replace(/javascript:/gi, '');
  };

 


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading notices...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <AlertCircleIcon className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notices</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/office-display"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <ExternalLinkIcon className="h-4 w-4 mr-2" />
              Office Display
            </Link>

            <Link
              to="/create-notice"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Notice
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="md:w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FilterIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notices list */}
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <AlertCircleIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No notices found</h2>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first notice to get started"}
            </p>
            <Link
              to="/create-notice"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Notice
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNotices.map((notice) => {
              const expirationStatus = getExpirationStatus(notice.expires_at)

              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(notice.status)}`}
                        >
                          {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                        </span>

                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${expirationStatus.className}`}>
                          {expirationStatus.label}
                        </span>
                      </div>
                    </div>

                    <div 
  className="prose max-w-none mb-4 text-gray-600"
  dangerouslySetInnerHTML={{ 
    __html: notice.description ? DOMPurify.sanitize(notice.description) : "No description available" 
  }}
/>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Created: {formatDate(notice.created_at || notice.date)}
                      </div>

                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Expires: {formatDate(notice.expires_at)}
                      </div>

                      {notice.file_path && (
                        <div className="flex items-center">
                          <FileTextIcon className="h-4 w-4 mr-1" />
                          Has attachment
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/notices/${notice.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this notice?")) {
                            handleDeleteNotice(notice.id)
                          }
                        }}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticesList