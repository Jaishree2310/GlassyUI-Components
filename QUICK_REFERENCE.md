# 🚀 QUICK REFERENCE CARD

## 📌 Start Here

```bash
# Terminal 1: Backend
cd server
npm install
node app.js

# Terminal 2: Frontend (new terminal)
npm start
```

## 🔗 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API:** POST http://localhost:5000/api/chat

## 📝 Files You Need to Know

| File                                   | Purpose      | Status     |
| -------------------------------------- | ------------ | ---------- |
| `server/app.js`                        | Main backend | ✏️ Updated |
| `server/.env`                          | API Key      | ✏️ Ready   |
| `server/controllers/chatController.js` | Gemini logic | 🆕 New     |
| `server/routes/chatRoutes.js`          | Chat routes  | 🆕 New     |
| `src/components/AIChatbot.jsx`         | Chat UI      | 🆕 New     |
| `src/components/AIChatbot.css`         | Styling      | 🆕 New     |

## 💬 API Examples

### Send Message

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'
```

### Response

```json
{
  "success": true,
  "reply": "Hello! How can I help?"
}
```

## 🧪 Test Commands

```bash
# Health check
curl http://localhost:5000/api/chat/health

# Send message
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is React?"}'
```

## 🔧 Configuration

| Config          | File                | Value                   |
| --------------- | ------------------- | ----------------------- |
| Backend Port    | `.env`              | `PORT=5000`             |
| API Key         | `.env`              | `GEMINI_API_KEY=...`    |
| AI Model        | `chatController.js` | `gemini-1.5-flash`      |
| Frontend Origin | `app.js`            | `http://localhost:3000` |

## ❌ Common Issues

| Issue               | Fix                      |
| ------------------- | ------------------------ |
| Port already in use | Change `PORT` in `.env`  |
| Module not found    | Run `npm install`        |
| CORS error          | Check origin in `app.js` |
| API key error       | Verify `.env` has key    |
| No response         | Check backend is running |

## ✅ Verification

- [ ] Backend runs: `node app.js` ✅
- [ ] Frontend runs: `npm start` ✅
- [ ] Can send messages ✅
- [ ] AI responds ✅
- [ ] No errors in console ✅

## 📚 Documentation

1. **COMPLETE_SETUP.md** - Full setup guide
2. **CHATBOT_SETUP.md** - In-depth explanation
3. **API_REFERENCE.md** - API documentation
4. **IMPLEMENTATION_SUMMARY.md** - What was created

## 🎯 Using the Chatbot

1. Start backend & frontend
2. Go to http://localhost:3000
3. Find **AIChatbot** component
4. Type message & click **Send**
5. Get AI response in real-time!

## 🔐 Security

✅ API key in `.env` (protected)  
✅ Never exposed in frontend  
✅ All Gemini calls via backend  
✅ Input validation  
✅ Error handling

## 🚀 Deploy Later

When ready for production:

1. Move to cloud server (Heroku, AWS, etc.)
2. Update environment variables
3. Set production CORS origins
4. Add rate limiting
5. Enable HTTPS
6. Monitor API usage

## 💡 Tips

- Keep `.env` secret
- Test API with curl first
- Check browser console for errors
- Check backend logs for issues
- Use loading states for better UX
- Cache responses if possible

## 📞 Need Help?

1. Check console for errors
2. Verify backend is running
3. Check `.env` has API key
4. Read COMPLETE_SETUP.md
5. Review API_REFERENCE.md

---

**Keep this handy while developing!** 🎯
