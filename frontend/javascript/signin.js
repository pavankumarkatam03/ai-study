const API_URL = 'http://127.0.0.1:8000/api/v1/login'; // Change to actual backend if deployed

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Optional: Save token to localStorage
      localStorage.setItem('token', data.token);
      window.location.href = 'home.html';
    } else {
      errorMsg.textContent = data.detail || 'Invalid username or password.';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.textContent = 'Server error. Please try again later.';
  }
});
