document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.fullName.value,
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Account created successfully!,login back');
      setTimeout(() => {
  window.location.href = 'signin.html';
}, 100); // small delay lets alert fully close
 // redirect on success
    } else {
      alert(result.detail || result.message || 'Signup failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while signing up.');
  }
});
