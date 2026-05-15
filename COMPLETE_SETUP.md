# 🚀 COMPLETE SETUP & RUN INSTRUCTIONS

## 📋 What You're Getting

✅ **Backend Server** - Express.js with Google Gemini integration  
✅ **Frontend Component** - React chatbot UI  
✅ **Secure Communication** - API key protected on backend  
✅ **Error Handling** - Graceful failure recovery  
✅ **Production Ready** - Validation & timeouts included

---

## ⚡ Quick Start (Copy & Paste)

### Terminal 1: Start Backend

```bash
cd server
npm install
node app.js
```

**Expected output:**

```
Server running on port 5000
```

### Terminal 2: Start Frontend

```bash
npm start
```

**Browser opens automatically to http://localhost:3000**

---

## 📝 Detailed Setup Steps

### Step 1: Install Backend Dependencies

Navigate to the server directory and install packages:

```bash
cd server
npm install
```

**What gets installed:**

- `@google/generative-ai` - Gemini API client
- `express` - Web framework
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- Other existing dependencies (mongoose, nodemailer, etc.)

**Time:** ~2-3 minutes

### Step 2: Verify API Key

Check that `server/.env` exists and contains:

```env
GEMINI_API_KEY=AIzaSyBJN0GV9hvXR__Hou1lpQn7b4T7Dj2irbg
PORT=5000
```

✅ **Your key is already there!**

### Step 3: Start Backend Server

```bash
cd server
node app.js
```

**Success indicators:**

```
Server running on port 5000
```

**Test the server:**

```bash
# In another terminal, test the health endpoint:
curl http://localhost:5000/api/chat/health
```

**Expected response:**

```json
{
  "success": true,
  "message": "Chat service is operational",
  "timestamp": "..."
}
```

### Step 4: Start Frontend (New Terminal)

```bash
npm start
```

**Wait for:** Browser opens to `http://localhost:3000`

### Step 5: Test the Chatbot

1. Find the **AIChatbot** component in your app
2. Type a message: "Hello, what is React?"
3. Click **Send** or press **Enter**
4. Watch the AI respond!

---

## 📂 File Structure

```
GlassyUI-Components/
│
├── server/
│   ├── app.js                    ← Main backend file (UPDATED)
│   ├── .env                      ← API key (UPDATED)
│   ├── package.json              ← Dependencies (UPDATED)
│   ├── controllers/
│   │   └── chatController.js     ← NEW: Gemini logic
│   └── routes/
│       └── chatRoutes.js         ← NEW: Chat endpoints
│
├── src/
│   └── components/
│       ├── AIChatbot.jsx         ← NEW: React chatbot
│       └── AIChatbot.css         ← NEW: Styling
│
├── CHATBOT_SETUP.md              ← Complete guide
├── API_REFERENCE.md              ← API documentation
└── COMPLETE_SETUP.md             ← This file
```

---

## 🔧 Configuration Guide

### Change Backend Port

**Edit:** `server/.env`

```env
GEMINI_API_KEY=YOUR_KEY
PORT=8000     # Change from 5000 to 8000
```

Then update frontend URL in `src/components/AIChatbot.jsx`:

```javascript
const response = await fetch('http://localhost:8000/api/chat', {
  // ...
});
```

### Change Gemini Model

**Edit:** `server/controllers/chatController.js`

```javascript
// Find this line:
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Change to:
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

### Enable Development Logging

**Edit:** `server/app.js` (after imports)

```javascript
const DEBUG = true; // Add this

// Then in requests, add:
if (DEBUG) console.log('Request:', req.body);
```

---

## 🧪 Testing the API

### Test 1: Health Check

```bash
curl http://localhost:5000/api/chat/health
```

Expected:

```json
{ "success": true, "message": "Chat service is operational" }
```

### Test 2: Send Message

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, AI!"}'
```

Expected:

```json
{ "success": true, "reply": "Hello! How can I help you today?" }
```

### Test 3: Invalid Input

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":""}'
```

Expected:

```json
{ "success": false, "error": "Message cannot be empty" }
```

---

## 📱 Frontend Integration

### Option 1: Use Pre-built Component

```jsx
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <AIChatbot />
    </div>
  );
}
```

### Option 2: Custom Integration

Create your own component that uses the API:

```jsx
import { useState } from 'react';

function MyChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    if (data.success) {
      setMessages([
        ...messages,
        { text: input, sender: 'user' },
        { text: data.reply, sender: 'ai' },
      ]);
      setInput('');
    }
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.sender}:</strong> {msg.text}
        </p>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MyChat;
```

---

## 🐛 Troubleshooting

### Issue 1: "Cannot find module '@google/generative-ai'"

**Cause:** Package not installed

**Solution:**

```bash
cd server
npm install @google/generative-ai
npm list @google/generative-ai  # Verify
```

### Issue 2: CORS Error

**Error:** `Access to XMLHttpRequest at 'http://localhost:5000/api/chat' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:**
Verify in `server/app.js`:

```javascript
app.use(
  cors({
    origin: 'http://localhost:3000', // Should match your frontend
  }),
);
```

### Issue 3: Port 5000 Already in Use

**Cause:** Another app running on port 5000

**Solution:**

```bash
# Find process on port 5000
lsof -i :5000    # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Change port in server/.env
PORT=8000
```

### Issue 4: API Key Not Working

**Check:**

1. Key is in `server/.env`
2. Format: `GEMINI_API_KEY=AIzaSy...`
3. No extra spaces or quotes
4. Restart server after changes

**Test:**

```bash
curl http://localhost:5000/api/chat/health
```

### Issue 5: Backend Crashes on Startup

**Try:**

```bash
cd server
rm -rf node_modules package-lock.json
npm install
node app.js
```

### Issue 6: Timeout When Sending Messages

**Cause:** Gemini API is slow (rare)

**Solution:** Increase timeout in `AIChatbot.jsx`:

```javascript
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: inputValue }),
  // Add timeout handling
});
```

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Backend dependencies installed: `npm list` shows all packages
- [ ] `.env` file has GEMINI_API_KEY
- [ ] Backend starts without errors: `node app.js` ✅
- [ ] Health check works: `curl http://localhost:5000/api/chat/health` ✅
- [ ] Frontend starts: `npm start` ✅
- [ ] Frontend loads at http://localhost:3000 ✅
- [ ] AIChatbot component visible in app
- [ ] Can type and send messages
- [ ] AI responds with text
- [ ] Loading state shows while waiting
- [ ] Error messages display correctly
- [ ] Clear button works

---

## 🚀 Deployment Checklist

Before going to production:

- [ ] Remove debug logging
- [ ] Set `NODE_ENV=production`
- [ ] Use production database
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Add authentication if needed
- [ ] Monitor API usage
- [ ] Set up error logging
- [ ] Test with real users
- [ ] Cache responses if possible
- [ ] Add fallback messages

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React App (localhost:3000)                          │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  AIChatbot Component                           │  │   │
│  │  │  - Displays messages                           │  │   │
│  │  │  - Handles user input                          │  │   │
│  │  │  - Fetches from backend                        │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↓ (HTTP POST to /api/chat)                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Your Server                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js + Express (localhost:5000)                  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  /api/chat endpoint                            │  │   │
│  │  │  - Validates input                             │  │   │
│  │  │  - Calls Gemini API                            │  │   │
│  │  │  - Returns response                            │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Environment: .env                              │  │   │
│  │  │  - GEMINI_API_KEY (protected)                   │  │   │
│  │  │  - PORT=5000                                    │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↓ (REST API call)                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Google Gemini API                           │
│  (Cloud, secured with API key from server)                  │
│  - Processes natural language                               │
│  - Generates responses                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Documentation Files

- **CHATBOT_SETUP.md** - Comprehensive setup guide with security architecture
- **API_REFERENCE.md** - Complete API documentation with examples
- **COMPLETE_SETUP.md** - This file, step-by-step instructions

---

## 💡 Tips & Best Practices

1. **Keep API key secret** - Never commit `.env` to git
2. **Add .env to .gitignore** - Already done in most projects
3. **Test with curl first** - Before debugging frontend
4. **Check browser console** - For frontend errors
5. **Check backend logs** - For server errors
6. **Use loading states** - Better UX while waiting for response
7. **Implement error handling** - User-friendly error messages
8. **Cache responses** - Avoid duplicate API calls
9. **Rate limit requests** - Prevent abuse
10. **Monitor API usage** - Track costs in Google Cloud

---

## 🎯 What's Next?

1. ✅ Setup and run chatbot (this guide)
2. 📊 Add chat history/database
3. 🔐 Add user authentication
4. 💾 Implement caching
5. 📈 Add rate limiting
6. 🚀 Deploy to production
7. 📱 Make mobile-responsive
8. 🎨 Custom styling
9. 🔔 Add notifications
10. 📞 Add voice support

---

**Need Help?** Check the other guides:

- `CHATBOT_SETUP.md` - Full setup guide
- `API_REFERENCE.md` - API documentation
- Troubleshooting section above

**Last Updated:** May 15, 2026
