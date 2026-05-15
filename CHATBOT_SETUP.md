# 🤖 GlassyUI AI Chatbot - Complete Setup Guide

## 📋 Overview

This is a **fully functional local chatbot** using Google Gemini API with:

- ✅ **Secure backend** (Node.js + Express) - API key protected
- ✅ **React frontend** - Clean, responsive UI
- ✅ **Error handling** - Graceful error recovery
- ✅ **CORS enabled** - Frontend-backend communication
- ✅ **Production-ready** - Input validation & timeout handling

---

## 📁 Project Structure

```
GlassyUI-Components/
├── server/
│   ├── app.js                          # Main Express app
│   ├── package.json                    # Backend dependencies
│   ├── .env                            # API key (NEVER commit!)
│   ├── controllers/
│   │   └── chatController.js           # Gemini AI logic
│   └── routes/
│       └── chatRoutes.js               # /api/chat endpoints
│
└── src/
    └── components/
        ├── AIChatbot.jsx               # React chatbot component
        └── AIChatbot.css               # Chatbot styling
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

**Installed packages:**

- `@google/generative-ai` - Google Gemini API client
- `express` - Web framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Step 2: Verify API Key in `.env`

The file `server/.env` should contain:

```env
GEMINI_API_KEY=AIzaSyBJN0GV9hvXR__Hou1lpQn7b4T7Dj2irbg
PORT=5000
```

✅ **Your key is already there!**

### Step 3: Start the Backend Server

```bash
cd server
npm install                    # First time only
node app.js                    # Start server
```

**Expected output:**

```
Server running on port 5000
```

### Step 4: Start Frontend (in new terminal)

```bash
npm start
```

The React app will open at `http://localhost:3000`

### Step 5: Use the Chatbot

1. Navigate to the **AIChatbot** component in your app
2. Type a message (e.g., "Hello, what is React?")
3. Click **Send** or press **Enter**
4. Watch the AI respond in real-time!

---

## 🔐 Security Architecture

### Backend (Protected)

- ✅ API key stored in `.env` (never exposed)
- ✅ All Gemini API calls happen on backend
- ✅ Frontend never sees the API key

### Frontend (Safe)

- ✅ Only communicates with your backend
- ✅ No direct Gemini API calls
- ✅ No sensitive data stored locally

### Communication Flow

```
Frontend (React)
      ↓
  Sends message via fetch
      ↓
Backend (Node.js) @ port 5000
      ↓
  Validates input
      ↓
  Calls Gemini API (with key)
      ↓
  Returns AI response
      ↓
Frontend displays response
```

---

## 📡 API Endpoints

### POST `/api/chat`

Send a message and get AI response

**Request:**

```json
{
  "message": "What is glassmorphism?"
}
```

**Response (Success):**

```json
{
  "success": true,
  "reply": "Glassmorphism is a design trend...",
  "message": "Response generated successfully"
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Message is required"
}
```

### GET `/api/chat/health`

Check if the chat service is operational

**Response:**

```json
{
  "success": true,
  "message": "Chat service is operational",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔧 Frontend Integration

### Using the Chatbot Component

```jsx
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <div>
      <h1>Welcome to GlassyUI</h1>
      <AIChatbot />
    </div>
  );
}

export default App;
```

### Manual Fetch Example

```javascript
// Send message to chatbot
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hello, AI!',
  }),
});

const data = await response.json();
console.log(data.reply); // AI response
```

---

## ⚙️ Configuration

### Change Backend Port

**File:** `server/.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
PORT=8000    # Change to 8000
```

**Also update frontend fetch URL in `AIChatbot.jsx`:**

```javascript
const response = await fetch('http://localhost:8000/api/chat', {
  // ... rest of code
});
```

### Change Model

**File:** `server/controllers/chatController.js`

```javascript
// Change this line:
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// To use a different model:
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@google/generative-ai'"

**Solution:**

```bash
cd server
npm install @google/generative-ai
```

### Issue: CORS Error in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
Backend already has CORS enabled. Make sure:

1. Backend is running on port 5000
2. Frontend is on port 3000
3. Both are running on `localhost`

If you changed ports, update `server/app.js`:

```javascript
app.use(
  cors({
    origin: 'http://localhost:3000', // Update this
  }),
);
```

### Issue: "GEMINI_API_KEY is not configured"

**Solution:**

1. Check `server/.env` exists
2. Verify the key is set: `GEMINI_API_KEY=YOUR_KEY`
3. Restart backend server
4. Make sure you're in the `server/` directory

### Issue: Backend crashes with "Cannot read properties of undefined"

**Solution:**

1. Verify `.env` file is in `server/` folder
2. Run `npm install` again
3. Check Node.js version: `node --version` (should be v14+)

### Issue: "Network error: Unable to reach Gemini API"

**Possible causes:**

- No internet connection
- Gemini API is down (rare)
- Invalid API key

**Solution:**

1. Check internet connection: `ping google.com`
2. Verify API key in `.env`
3. Try a test request:

```bash
curl -X GET http://localhost:5000/api/chat/health
```

---

## 📊 How It Works

### 1. User Sends Message

User types "Hello!" and clicks Send

### 2. Frontend Validation

- Check message is not empty
- Check message length < 4000 chars
- Show loading spinner

### 3. Backend Processing

```javascript
// Receives request
POST http://localhost:5000/api/chat
{ message: "Hello!" }

// Validates input
if (!message) throw error

// Calls Gemini API
const result = await model.generateContent(message)

// Returns response
{ success: true, reply: "Hello! How can I help you today?" }
```

### 4. Frontend Display

- Hide loading spinner
- Show AI response
- Add to chat history
- Auto-scroll to latest message

---

## 🎨 Customization

### Customize Chatbot Appearance

**File:** `src/components/AIChatbot.css`

Change colors:

```css
.chatbot-header {
  background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
}
```

### Add Typing Delay

**File:** `src/components/AIChatbot.jsx`

```javascript
// Add delay before sending
setTimeout(async () => {
  const response = await fetch(...);
}, 1000); // 1 second delay
```

### Integrate with Existing Chat UI

You can also fetch and integrate the response anywhere:

```javascript
async function askGemini(message) {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.success ? data.reply : data.error;
}

// Usage
const reply = await askGemini('What is AI?');
console.log(reply);
```

---

## 📚 Environment Variables

| Variable         | Value          | Purpose                          |
| ---------------- | -------------- | -------------------------------- |
| `GEMINI_API_KEY` | Your API key   | Authenticates with Google Gemini |
| `PORT`           | 5000 (default) | Backend server port              |

---

## ✅ Checklist

Before deployment:

- [ ] Backend dependencies installed: `npm install`
- [ ] `.env` file exists in `server/` with API key
- [ ] Backend starts without errors: `node app.js`
- [ ] Frontend can reach backend: `http://localhost:5000`
- [ ] Chat component imported in App
- [ ] Test with sample message
- [ ] Error handling works (try empty message)
- [ ] Loading state displays correctly

---

## 🎯 Next Steps

1. **Add Database** - Store chat history
2. **Add Authentication** - User sessions
3. **Add Rate Limiting** - Prevent API abuse
4. **Deploy** - Move to production hosting
5. **Monitor** - Track API usage & errors

---

## 📞 Support

**Common errors and fixes:**

| Error               | Fix                                           |
| ------------------- | --------------------------------------------- |
| Port already in use | Kill process or change `PORT` in `.env`       |
| Module not found    | Run `npm install` in correct directory        |
| API key invalid     | Verify key in `.env` and Gemini console       |
| CORS blocked        | Check origin in `app.js` matches frontend URL |

---

## 🔗 Useful Links

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

---

**Made with ❤️ for GlassyUI**
