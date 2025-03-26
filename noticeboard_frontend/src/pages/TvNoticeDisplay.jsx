"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, ImageIcon, FileIcon, Download, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import logo from "/src/assets/logo.png"
import DOMPurify from 'dompurify'; 
import { getActiveNotices } from "../api/notices"
import { ATTACHMENT_BASE_URL } from "../api/constant";


// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

export default function OfficeDisplay() {
  const [notices, setNotices] = useState([])
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const modalRef = useRef(null)

  // PDF state
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  // Fetch notices from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const activeNotices = await getActiveNotices()
        setNotices(activeNotices)
        setError(null)
      } catch (err) {
        console.error("Error fetching notices:", err)
        setError(err.message || "Failed to load notices")
      } finally {
        setLoading(false)
      }
    }

    // Fetch notices from API
    fetchData()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Auto-rotate through notices every 15 seconds
    const rotationTimer = setInterval(() => {
      if (notices.length > 1) {
        setActiveNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length)
      }
    }, 15000)

    // Refresh notices every 5 minutes
    const refreshTimer = setInterval(fetchData, 5 * 60 * 1000)

    return () => {
      clearInterval(timer)
      clearInterval(rotationTimer)
      clearInterval(refreshTimer)
    }
  }, [notices.length])

  // PDF functions
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return Math.min(Math.max(1, newPageNumber), numPages || 1)
    })
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }
  // Add this helper function at the top of your file
const sanitizeHtml = (html) => {
  // Basic HTML sanitization - you might want to use a library like DOMPurify for production
  return html
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/on\w+=".*?"/gi, '')
    .replace(/javascript:/gi, '');
};

  // Calculate days until expiration
  const getDaysUntilExpiration = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get file icon based on extension
  const getFileIcon = (fileExtension) => {
    switch (fileExtension.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "xls":
      case "xlsx":
        return <FileText className="h-6 w-6 text-green-500" />
      case "ppt":
      case "pptx":
        return <FileText className="h-6 w-6 text-orange-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        return <ImageIcon className="h-6 w-6 text-purple-500" />
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />
    }
  }

  // Render attachment based on file type
  const renderAttachment = (filePath) => {
    if (!filePath) return null

    const fullFilePath = `${ATTACHMENT_BASE_URL}${filePath}`
    const fileName = filePath.split("/").pop()
    const fileExtension = filePath.split(".").pop().toLowerCase()
    const isImage = ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension)
    const isPdf = fileExtension === "pdf"
    const fileIcon = getFileIcon(fileExtension)

    // For images, display them directly
    if (isImage) {
      return (
        <div className="mt-6 rounded-xl overflow-hidden bg-white">
          <img
            src={fullFilePath || "/placeholder.svg"}
            alt="Notice attachment"
            className="w-full h-auto object-contain max-h-[400px]"
            onClick={() => {
              setSelectedImage(fullFilePath)
              setShowImageModal(true)
            }}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.svg?height=300&width=400"
              e.target.alt = "Failed to load image"
            }}
          />
        </div>
      )
    }
    // For PDFs, use react-pdf instead of iframe
    else if (isPdf) {
      return (
        <div className="mt-6 rounded-xl overflow-hidden bg-white">
          <div className="w-full h-[400px] bg-gray-50 flex flex-col">
            <Document
              file={fullFilePath}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex-1 overflow-auto"
              loading={<div className="flex items-center justify-center h-full">Loading PDF...</div>}
              error={<div className="flex items-center justify-center h-full">Failed to load PDF</div>}
            >
              <Page
                pageNumber={pageNumber}
                width={400}
                className="mx-auto"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            {numPages && (
              <div className="flex items-center justify-between p-3 border-t">
                <button
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="text-sm">
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )
    }
    // For other file types, show a download card
    else {
      return (
        <div className="mt-6 rounded-xl overflow-hidden bg-white border border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">{fileIcon}</div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg">{fileName}</h3>
                <p className="text-gray-500 mt-1">{fileExtension.toUpperCase()} file</p>
              </div>
            </div>
            <a
              href={fullFilePath}
              download
              className="px-4 py-2 bg-[#2F4858] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </div>
        </div>
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2F4858] mx-auto mb-6"></div>
          <p className="text-xl text-gray-800">Loading notices...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-2xl">
          <div className="h-16 w-16 mx-auto mb-6 text-red-500">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#2F4858] hover:bg-opacity-90 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (notices.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-2xl">
          <div className="h-16 w-16 mx-auto mb-6 text-[#2F4858]">🔔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Notices</h2>
          <p className="text-gray-600">There are no active notices to display at this time.</p>
        </div>
      </div>
    )
  }

  const activeNotice = notices[activeNoticeIndex]
  const daysUntilExpiration = getDaysUntilExpiration(activeNotice.expires_at)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo */}
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 mr-3">
                <img src={logo || "/placeholder.svg"} alt="ICL Logo" className="h-20 w-20 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-white">International</h1>
                <h2 className="text-2xl font-medium text-white">Clinical Laboratories</h2>
              </div>
            </div>
            <div className="bg-white text-blue-600 px-6 py-3 rounded-xl shadow-lg">
              <div className="text-4xl font-mono font-bold">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
              <div className="text-sm text-blue-600 text-center">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeNotice.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 1,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6"
          >
            {/* Left side - Image or File */}
            <motion.div
              className="relative h-[600px] bg-gray-100 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
            >
              {activeNotice.file_path ? (
                <div className="h-full w-full flex items-center justify-center">
                  {activeNotice.file_path.split(".").pop().toLowerCase() === "pdf" ? (
                    <iframe
                      src={`${ATTACHMENT_BASE_URL}${activeNotice.file_path}`}
                      className="w-full h-full border-0"
                      title="PDF Document"
                      allowFullScreen
                    />
                  ) : ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
                      activeNotice.file_path.split(".").pop().toLowerCase(),
                    ) ? (
                    <img
                      src={`${ATTACHMENT_BASE_URL}${activeNotice.file_path}`}
                      alt="Notice attachment"
                      className="w-full h-full object-cover"
                      onClick={() => {
                        setSelectedImage(`${ATTACHMENT_BASE_URL}${activeNotice.file_path}`)
                        setShowImageModal(true)
                      }}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.svg?height=600&width=800"
                        e.target.alt = "Failed to load image"
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      {getFileIcon(activeNotice.file_path.split(".").pop().toLowerCase())}
                      <p className="mt-4 text-lg font-medium">{activeNotice.file_path.split("/").pop()}</p>
                      <a
                        href={`${ATTACHMENT_BASE_URL}${activeNotice.file_path}`}
                        download
                        className="mt-6 px-4 py-2 bg-[#2F4858] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download File
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No attachment</p>
                </div>
              )}
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="flex flex-col justify-between py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[#2F4858] mb-2">NOTICE</h2>
                  <h3 className="text-3xl font-bold text-[#2F4858]">{activeNotice.title}</h3>
                </motion.div>

                <motion.div
  className="space-y-6 text-gray-600"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.3 }}
>
  <div 
    className="text-lg leading-relaxed rich-text-content"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeNotice.description) }}
  />
</motion.div>

                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <p className="text-lg font-semibold text-[#2F4858]">EXPIRES: {formatDate(activeNotice.expires_at)}</p>
                </motion.div>
              </div>

              {/* Slide Navigation Dots */}
              <div className="flex justify-center gap-2 pt-8">
                {notices.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveNoticeIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === activeNoticeIndex ? "bg-[#2F4858] w-8" : "bg-gray-300 w-3"
                    }`}
                    aria-label={`Go to notice ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Image Modal - Only shown when an image is clicked */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowImageModal(false)
          }}
        >
          <div ref={modalRef} className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Image Attachment</h3>
              <button onClick={() => setShowImageModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Full size attachment"
                className="max-w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg?height=600&width=800"
                  e.target.alt = "Failed to load image"
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

