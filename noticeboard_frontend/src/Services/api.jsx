// API service for handling all API requests

// Base URL for API requests
const API_BASE_URL = "https://demo.iclpartner.com/api"

// Helper function to get the auth token
const getToken = () => {
  return localStorage.getItem("token")
}

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json()

  if (!response.ok) {
    // If the response includes a message, use it for the error
    const errorMessage = data.message || `Error: ${response.status}`
    throw new Error(errorMessage)
  }

  return data
}

// API methods
const api = {
  // Auth endpoints
  // auth: {
  //   login: async (credentials) => {
  //     const response = await fetch(`${API_BASE_URL}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     })

  //     return handleResponse(response)
  //   },

  //   register: async (userData) => {
  //     const response = await fetch(`${API_BASE_URL}/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     })

  //     return handleResponse(response)
  //   },
  // },

  // Notices endpoints
  notices: {
    getAll: async () => {
      const token = localStorage.getItem("token");
    
      if (!token) {
        throw new Error("Authentication required");
      }
    
      const response = await fetch(`${API_BASE_URL}/get_notices`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    
      return handleResponse(response);
    },
  

    create: async (noticeData) => {
      const token = getToken()

      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await fetch(`${API_BASE_URL}/create_notice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeData),
      })

      return handleResponse(response)
    },

    // In a real app, you would have endpoints for update and delete as well
    update: async (id, noticeData) => {
      const token = getToken()

      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await fetch(`${API_BASE_URL}/update_notice/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeData),
      })

      return handleResponse(response)
    },

    delete: async (id) => {
      const token = getToken()

      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await fetch(`${API_BASE_URL}/delete_notice/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      return handleResponse(response)
    },
  },
}

export default api

