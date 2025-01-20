const API_URL = "https://vercel.com/prasadchates-projects/jarurat-care-ngo/CKeuB2NXVbKutBkJmRteZXUznuDq";

// Register a user
async function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await response.json();
  console.log("Registration response: ", data); // Log response for debugging
  document.getElementById("response").innerText = JSON.stringify(data, null, 2);
}

// Login a user
async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log("Login response: ", data); // Log response for debugging
  document.getElementById("response").innerText = JSON.stringify(data, null, 2);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
}

// Get all users
async function getAllUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/all`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  console.log("Get users response: ", data); // Log response for debugging
  document.getElementById("response").innerText = JSON.stringify(data, null, 2);
}

// Event listeners
document.getElementById("register-btn").addEventListener("click", registerUser);
document.getElementById("login-btn").addEventListener("click", loginUser);
document.getElementById("get-users-btn").addEventListener("click", getAllUsers);
