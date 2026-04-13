// src/services/api.js
export const api = async (endpoint, options = {}, accessToken = null) => {
  const baseUrl = "http://localhost:5000/api";

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
    credentials: options.credentials || "include", // gửi cookie theo mặc định
  };

  if (options.data) {
    config.body = JSON.stringify(options.data);
  }

  const res = await fetch(baseUrl + endpoint, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || "API request failed";
    throw new Error(message);
  }

  return data;
};