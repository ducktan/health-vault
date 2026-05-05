export const api = async (endpoint, options = {}, accessToken = null) => {
  const baseUrl = "http://localhost:5000/api";

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json", // 🔥 LUÔN có
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
    credentials: options.credentials || "include",
  };

  if (options.data !== undefined) {
    config.body = JSON.stringify(options.data);
  }

  const res = await fetch(baseUrl + endpoint, config);

  if (options.responseType === "blob") {
    if (!res.ok) throw new Error("Download failed");
    return await res.blob();
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};