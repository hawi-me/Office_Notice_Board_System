"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  UserIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
  TrashIcon,
  ExternalLinkIcon,
} from "lucide-react"
import DOMPurify from "dompurify"
import { fetchNoticeById, deleteNoticeById } from "../api/notices"
import { ATTACHMENT_BASE_URL } from "../api/constant"

const NoticeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadNotice = async () => {
      try {
        setLoading(true)
        const noticeData = await fetchNoticeById(id)
        setNotice(noticeData)
        setError(null)
      } catch (err) {
        console.error("Error loading notice:", err)
        setError(err.message || "Failed to load notice details")
      } finally {
        setLoading(false)
      }
    }

    loadNotice()
  }, [id, navigate])

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
  const handleDeleteNotice = async () => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteNoticeById(id)
        navigate("/notices")
      } catch (err) {
        console.error("Error deleting notice:", err)
        alert("Failed to delete notice. Please try again.")
      }
    }
  }

  // Handle opening attachment
  const openAttachment = () => {
    if (notice?.file_path) {
      window.open(`${ATTACHMENT_BASE_URL}${notice.file_path}`, "_blank")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading notice details...</p>
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
            onClick={() => navigate("/notices")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Notices
          </button>
        </div>
      </div>
    )
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <AlertCircleIcon className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Notice Not Found</h2>
          <p className="text-gray-600 mb-6">The notice you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/notices")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Notices
          </button>
        </div>
      </div>
    )
  }

  const expirationStatus = getExpirationStatus(notice.expires_at)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/notices" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Notices
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-600">{notice.title}</h1>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(notice.status)}`}>
                    {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${expirationStatus.className}`}>
                    {expirationStatus.label}
                  </span>
                </div>
              </div>

              <div 
                className="text-lg leading-relaxed rich-text-content mb-8 text-gray-600"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notice.description) }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-600 mb-4">Notice Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-600">Created On</p>
                        <p className="text-gray-600">{formatDate(notice.created_at || notice.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-600">Expiration Date</p>
                        <p className="text-gray-600">{formatDate(notice.expires_at)}</p>
                      </div>
                    </div>

                    {notice.file_path && (
                      <div className="flex items-start">
                        <FileTextIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium text-gray-600">Attachment</p>
                          <button
                            onClick={openAttachment}
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <ExternalLinkIcon className="h-4 w-4 mr-2" />
                            Open Attachment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {notice.needs_approver && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">Approval Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <UserIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium text-gray-600">Approved By</p>
                          <p className="text-gray-600">{notice.approved_by}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium text-gray-600">Approval Date</p>
                          <p className="text-gray-600">{formatDate(notice.approved_at)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => navigate("/notices")}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to List
                </button>

                <button
                  onClick={handleDeleteNotice}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Notice
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NoticeDetail