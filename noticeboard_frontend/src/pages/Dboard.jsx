"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  BellIcon,
  UserIcon,
  LogOutIcon,
  PlusIcon,
  ExternalLinkIcon,
  ClipboardListIcon,
  CalendarIcon,
} from "lucide-react"
import api from "/src/Services/api"
const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  })
  const [notices, setNotices] = useState([])
  const [activeNotices, setActiveNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
      }
    }

    const fetchNotices = async () => {
      try {
        setLoading(true)
        const data = await api.notices.getAll()

        setNotices(data)

        // Filter active and non-expired notices
        const today = new Date()
        const active = data.filter((notice) => {
          const expiryDate = new Date(notice.expires_at)
          return expiryDate > today && notice.status === "active"
        })

        // Sort by expiration date (soonest first)
        active.sort((a, b) => new Date(a.expires_at) - new Date(b.expires_at))

        setActiveNotices(active)
        setError(null)
      } catch (err) {
        console.error("Error fetching notices:", err)
        setError(err.message || "Failed to load notices")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    fetchNotices()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get days until expiration
  const getDaysUntilExpiration = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">Office Notice Board</h1>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <span className="hidden md:inline-block">{user.name}</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="ml-4 flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <LogOutIcon className="h-5 w-5" />
                <span className="ml-1 hidden md:inline-block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Profile Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Role:</span> {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notices Summary Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Notices</h3>
                      <BellIcon className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-800">{activeNotices.length}</div>
                      <p className="text-sm text-gray-500">Active notices</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Link
                        to="/create-notice"
                        className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Create Notice
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link
                        to="/notices"
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ClipboardListIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="text-gray-700">View All Notices</span>
                      </Link>

                      <Link
                        to="/office-display"
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ExternalLinkIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="text-gray-700">Office Display</span>
                      </Link>

                      <button className="flex items-center w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <CalendarIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="text-gray-700">Calendar View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Notices */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Recent Notices</h2>
                <Link to="/notices" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading notices...</p>
                </div>
              ) : error ? (
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : activeNotices.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-gray-500 mb-4">No active notices found</p>
                  <Link
                    to="/create-notice"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Your First Notice
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeNotices.slice(0, 3).map((notice) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{notice.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{notice.description}</p>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{getDaysUntilExpiration(notice.expires_at)} days left</span>
                          </div>

                          <Link
                            to={`/notices/${notice.id}`}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

