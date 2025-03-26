// api/notices.js
// const API_BASE_URL = "https://demo.iclpartner.com/api";
import { API_BASE_URL, NOTICES_ENDPOINT, DELETE_NOTICE_ENDPOINT,  ATTACHMENT_BASE_URL} from "./constant";


export const fetchNotices = async () => {
  try {
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

    if (!response.ok) {
      throw new Error("Failed to fetch notices");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchNotices:", error);
    throw error;
  }
};

export const getActiveNotices = async () => {
  try {
    const notices = await fetchNotices();
    const today = new Date();

    // Filter and sort notices
    const activeNotices = notices
      .filter((notice) => {
        const expiryDate = new Date(notice.expires_at);
        return expiryDate > today && notice.status === "active";
      })
      .sort((a, b) => new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime());

    // Add unique IDs if they don't exist
    return activeNotices.map((notice, index) => ({
      ...notice,
      id: notice.id || `notice-${index}`,
    }));
  } catch (error) {
    console.error("Error in getActiveNotices:", error);
    throw error;
  }
};

export const fetchAllNotices = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}${NOTICES_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notices: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllNotices:", error);
    throw error;
  }
};

export const fetchNoticeById = async (id) => {
  try {
    const notices = await fetchAllNotices();
    const foundNotice = notices.find((item) => item.id.toString() === id);

    if (!foundNotice) {
      throw new Error("Notice not found");
    }

    return foundNotice;
  } catch (error) {
    console.error("Error in fetchNoticeById:", error);
    throw error;
  }
};

export const deleteNoticeById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}${DELETE_NOTICE_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete notice: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error in deleteNoticeById:", error);
    throw error;
  }
};
export const getAttachmentUrl = (filePath) => {
  if (!filePath) return null;
  return `${ATTACHMENT_BASE_URL}${filePath}`;
};

/**
 * Opens the attachment in a new tab
 @param {string} filePath - The relative file path from the API
 */
export const openAttachment = (filePath) => {
  const url = getAttachmentUrl(filePath);
  if (url) {
    window.open(url, "_blank");
  }
};