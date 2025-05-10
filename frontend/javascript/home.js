const micButton = document.getElementById('micButton');
const status = document.getElementById('status');
const questionBox = document.getElementById('questionBox');
const recommendationBox = document.getElementById('recommendationBox');
const historyList = document.getElementById('history-list');
const todayList = document.getElementById('today-list');
const fromLangSelect = document.getElementById('fromLang');
const toLangSelect = document.getElementById('toLang');

const spokenText = document.createElement('div'); // user query text
spokenText.id = 'spokenText';
spokenText.style.marginTop = '12px';
spokenText.style.textAlign = 'center';
spokenText.style.fontWeight = '500';
spokenText.style.fontSize = '16px';
document.querySelector('.text-center.my-4').appendChild(spokenText);

let isListening = false;

const currentUser = 'kittu'; // dynamically set this later
const firstLetter = currentUser.charAt(0).toUpperCase();
document.getElementById('profileCircle').textContent = firstLetter;
document.getElementById('profileCircle').style.backgroundColor = stringToColor(currentUser);

const languageMap = {
  English: 'en',
  Telugu: 'te',
  Hindi: 'hi',
  Tamil: 'ta',
  Malayalam: 'ml',
  Kannada: 'kn'
};

// Start Mic Button
micButton.addEventListener('click', async () => {
  if (isListening) return;

  isListening = true;
  micButton.classList.add('pulse');
  micButton.style.cursor = 'not-allowed';
  status.textContent = 'Listening...';
  spokenText.textContent = '';
  questionBox.textContent = 'Processing...';
  recommendationBox.textContent = '';

  const fromLang = languageMap[fromLangSelect.value];
  const toLang = languageMap[toLangSelect.value];

  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: fromLang,
        language2: toLang,
        username: currentUser
      })
    });

    const data = await response.json();

    if (response.ok && data.response_speech) {
      // Show spoken text
      spokenText.textContent = `You said: "${data.original}"`;

      // Show cohere-translated output
      questionBox.textContent = data.response_speech;
      recommendationBox.textContent = 'Check the audio for explanation.';

      // Create history entry
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.textContent = data.response_speech;

      // On click show this answer again
      historyItem.onclick = () => {
        questionBox.textContent = data.response_speech;
        recommendationBox.textContent = 'Check the audio for explanation.';
        spokenText.textContent = `You said: "${data.original}"`;
      };

      // Add to "Today's Queries" and Full History
      if (todayList.textContent === 'No queries yet') todayList.innerHTML = '';
      todayList.appendChild(historyItem.cloneNode(true));
      historyList.appendChild(historyItem);
    } else {
      questionBox.textContent = data.message || 'Could not understand.';
    }
  } catch (err) {
    console.error(err);
    questionBox.textContent = 'Something went wrong.';
  } finally {
    isListening = false;
    micButton.classList.remove('pulse');
    micButton.style.cursor = 'pointer';
    status.textContent = 'Tap to Speak';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - color.length) + color;
}
