const BASE_URL = 'http://localhost:8000';

async function encryptData(department, data) {
  const res = await fetch(`${BASE_URL}/encrypt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      department,
      data
    })
  });

  // ⚠️ fetch KHÔNG tự throw khi status != 200
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Encrypt failed: ${errorText}`);
  }

  return await res.json();
}

async function decryptData(user, encrypted) {
  const res = await fetch(`${BASE_URL}/decrypt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      encrypted
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Decrypt failed: ${errorText}`);
  }

  return await res.json();
}

async function exportSignedPdf(user, data) {
  const res = await fetch(`${BASE_URL}/export-signed-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      data   // 🔥 gửi plaintext
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Export PDF failed: ${errorText}`);
  }

  return res;
}

module.exports = {
  encryptData,
  decryptData, 
  exportSignedPdf
};