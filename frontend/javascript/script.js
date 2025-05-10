window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Ensure this element exists before updating
    const appNameElement = document.getElementById('app-name');
    if (appNameElement) {
      appNameElement.textContent = data.message;
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    const appNameElement = document.getElementById('app-name');
    if (appNameElement) {
      appNameElement.textContent = 'My Awesome App';
    }
  }
});
