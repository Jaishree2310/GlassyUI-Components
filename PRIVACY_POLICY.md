# 🔒 Chat Widget - Privacy Policy

## Overview

The GlassyUI Chat Widget is designed with **privacy-first principles**. Your personal information is **protected at every level** of the system.

---

## 📋 What Data We Collect

### What We DO Collect

- ✅ **Chat messages** (text you type)
- ✅ **Message timestamps** (when you sent the message)
- ✅ **Message identifiers** (unique IDs for organizing messages)

### What We DO NOT Collect

- ❌ Personal identifying information (names, emails, phone numbers)
- ❌ Browser cookies (beyond localStorage)
- ❌ Device information or IP addresses
- ❌ Geographic location data
- ❌ Behavioral tracking data
- ❌ Third-party analytics
- ❌ User profiles or registration data

---

## 🛡️ How We Protect Your Data

### Frontend (Client-Side) Protection

```
Your Device
    │
    ├─→ Chat messages stored ONLY in browser localStorage
    │   └─→ Location: Your computer/device
    │   └─→ Encryption: Browser's built-in isolation
    │   └─→ Not sent to cloud services
    │
    └─→ Messages displayed in widget UI only
        └─→ Not tracked or logged
```

**Key Features:**

- ✅ Messages saved **locally on your device only**
- ✅ localStorage is **isolated by domain** (can't be accessed by other sites)
- ✅ No third-party scripts or tracking
- ✅ No analytics or user tracking
- ✅ Full control: You can clear messages anytime

### Backend (Server-Side) Protection

```
Chat Server (localhost:5000)
    │
    ├─→ Receives message
    │   └─→ Message NOT logged to files
    │   └─→ Message NOT stored in database
    │   └─→ Message NOT printed to console (except errors)
    │
    ├─→ Processes keyword matching
    │   └─→ Only checks for specific keywords
    │   └─→ Full message content never saved
    │
    └─→ Returns generic response
        └─→ Response does NOT include user message
        └─→ Response is anonymous
        └─→ No personal info echoed back
```

**Key Features:**

- ✅ **Zero message logging**: Messages not written to logs
- ✅ **Zero message storage**: No database entries
- ✅ **Zero data persistence**: Messages discarded after response
- ✅ **No data leakage**: Responses don't reveal what you said
- ✅ **Error safety**: Errors log only error type, not message content

---

## 📦 Data Storage

### Frontend Storage (Your Device)

**Where:** Browser localStorage  
**Key:** `chat_widget_messages`  
**Format:** JSON array of messages  
**Persistence:** Survives browser refresh  
**Deletion:** Clear with 🗑️ button or browser storage settings  
**Accessibility:** Only JavaScript on same domain can access

### Backend Storage (Server)

**Where:** None (in-memory only)  
**Lifetime:** Request duration only  
**After Response:** Message is discarded  
**Persistence:** Zero—message is not saved anywhere  
**Log Files:** Errors only, message content not included

---

## 🔐 Security Measures

### Input Validation

```javascript
// Backend security checks:
✅ Message required (not empty)
✅ Message must be string type
✅ Maximum 4000 characters
✅ Trimmed of whitespace
✅ Never echoed in responses
```

### Output Sanitization

```javascript
// Response security:
✅ Generic responses (no personalization)
✅ No user message included
✅ No sensitive data returned
✅ Standard error messages (no details)
✅ Safe for all audiences
```

### API Security

```javascript
// Network security:
✅ POST method (no message in URL)
✅ Content-Type validation
✅ CORS protection
✅ No message in response body
✅ No tracking parameters
```

---

## 🚀 API Endpoints

### POST /api/chat

**Request:**

```json
{
  "message": "User's question"
}
```

**Response:**

```json
{
  "success": true,
  "reply": "Generic response",
  "message": "Response generated successfully"
}
```

**Privacy Details:**

- ✅ Message not included in response
- ✅ Message not stored
- ✅ Message not logged
- ✅ Response is generic (not personalized)
- ✅ No tracking ID in response

---

## 💾 How to Manage Your Data

### View Your Data

```
1. Open DevTools (F12)
2. Go to: Application → Storage → Local Storage
3. Find: chat_widget_messages
4. You'll see your message history
```

### Clear Your Data

**Method 1: In the Widget**

- Click 🗑️ Clear button in chat panel
- All messages deleted from localStorage

**Method 2: In Browser Settings**

- Settings → Privacy → Clear browsing data
- Select "Cookies and site data"
- Clear data for your domain

**Method 3: In DevTools**

- Right-click on localStorage key
- Select "Delete" or "Clear"

### Export Your Data

```javascript
// In browser console:
const messages = JSON.parse(localStorage.getItem('chat_widget_messages'));
console.log(messages);
// Copy/paste to save as JSON file
```

---

## 🌐 Third-Party Services

### What's Integrated

- ✅ **React** (UI library - no tracking)
- ✅ **Your backend API** (localhost:5000)
- ✅ **Browser APIs** (localStorage, fetch)

### What's NOT Integrated

- ❌ Google Analytics
- ❌ Mixpanel
- ❌ Amplitude
- ❌ Sentry (error tracking)
- ❌ Hotjar (session replay)
- ❌ Facebook Pixel
- ❌ Third-party ads
- ❌ Data brokers

---

## 🔄 Real Gemini API (Optional)

### Current State

- 🟢 **Demo Mode Active**: Uses keyword-based responses
- 🟡 **No API integration**: Real Gemini API not connected
- 🟢 **Zero personal data**: Messages not sent to Gemini

### If You Add Gemini API

**You would send:**

- ✅ Message text only
- ❌ No user identifiers
- ❌ No location data
- ❌ No personal info

**Google's Privacy:**

- See: https://policies.google.com/privacy
- Check: Gemini API documentation
- Note: You're responsible for Google's terms

**Before Adding Gemini API:**

1. Review Google's privacy policy
2. Understand what Google does with API messages
3. Add a new privacy notice if needed
4. Inform users about Gemini integration

---

## 📄 Data Processing

### User → Browser

```
You type message
  ↓
Stored in localStorage (YOUR device)
  ↓
Sent to backend (only message text)
  ↓
Backend never stores it
```

### Backend → Response

```
Backend receives message
  ↓
Checks for keywords (message not saved)
  ↓
Generates response (generic, not personalized)
  ↓
Returns response (without including your message)
  ↓
Message is discarded
```

---

## ✅ Privacy Guarantees

### What We Guarantee

✅ **No Selling Data**: We never sell your data  
✅ **No Sharing Data**: Data not shared with advertisers  
✅ **No Tracking**: No cookies, pixels, or tracking scripts  
✅ **No Cloud Storage**: Data stays on YOUR device  
✅ **No Logging**: Messages not logged to files  
✅ **No Retention**: Backend keeps zero message records  
✅ **No Profiling**: No user profiles or behavioral tracking  
✅ **Full Control**: You can delete anytime

### What You Control

✅ All messages stored locally  
✅ All messages clearable by you  
✅ API endpoint (can point anywhere)  
✅ Data retention (you decide)  
✅ Privacy settings (browser controls)

---

## 🛠️ Technical Implementation

### Backend Privacy Code

```javascript
// PRIVACY NOTICE in chatController.js:
/*
 * - User messages are NOT logged
 * - Personal information is NOT extracted
 * - Messages are NOT stored in database
 * - No user data is sent to third parties
 */

// Never log message content
console.error('Chat Error - Type:', error.name); // ✅ Safe
// Instead of:
console.error('Chat Error:', error); // ❌ Unsafe (might contain message)

// Never return user message in response
return res.json({
  success: true,
  reply: 'Generic response', // ✅ No user data
  message: 'Response generated',
});
```

### Frontend Privacy Code

```typescript
// In ChatWidget.tsx:
// Messages stored ONLY in localStorage
const STORAGE_KEY = 'chat_widget_messages';

// Never include user data in API calls beyond message text
await fetch(apiEndpoint, {
  method: 'POST',
  body: JSON.stringify({ message: trimmedInput }) // ✅ Only message
});

// Display privacy notice to users
<div className={styles.privacyNotice}>
  🔒 Your messages are private and never shared
</div>
```

---

## 📞 Privacy Questions?

If you have questions about privacy, you can:

1. **Check the code**

   - `server/controllers/chatController.js` - Backend
   - `src/components/ChatWidget.tsx` - Frontend
   - `PRIVACY_POLICY.md` - This file

2. **Review the implementation**

   - No console.log of messages
   - No database storage
   - No localStorage beyond `chat_widget_messages`
   - No external services

3. **Customize as needed**
   - Modify backend for your needs
   - Add encryption if desired
   - Integrate with your services
   - Maintain your own privacy standards

---

## 🔄 Updates to This Policy

This policy describes the current implementation. If you:

- **Modify the code** - Update this policy
- **Add services** - Document what they do
- **Change storage** - Update storage section
- **Integrate APIs** - Document their privacy

---

## 📋 Summary

| Aspect              | Status               | Details                     |
| ------------------- | -------------------- | --------------------------- |
| **Message Logging** | ✅ Disabled          | Never written to logs       |
| **Message Storage** | ✅ Disabled          | Not stored in database      |
| **Cloud Sync**      | ✅ Disabled          | No cloud services           |
| **Tracking**        | ✅ Disabled          | No analytics or cookies     |
| **Data Retention**  | ✅ Zero server-side  | Messages not kept           |
| **User Control**    | ✅ Full              | Clear anytime               |
| **Encryption**      | ✅ Browser isolation | localStorage isolation      |
| **Third Parties**   | ✅ None              | No external integrations    |
| **GDPR Compliant**  | ✅ Yes               | No personal data processing |
| **CCPA Compliant**  | ✅ Yes               | Full user control           |

---

## 🎯 Bottom Line

**Your messages are:**

- 🔒 Private (stored on your device only)
- 🚫 Not logged (backend doesn't keep them)
- 🔐 Not shared (no third parties)
- 🎯 Under your control (delete anytime)

**What we don't do:**

- ❌ Sell your data
- ❌ Track you
- ❌ Profile you
- ❌ Share with advertisers
- ❌ Keep messages in logs
- ❌ Store in cloud
- ❌ Use external analytics

---

**Privacy Status**: ✅ **MAXIMUM PRIVACY**  
**Last Updated**: May 15, 2026  
**Version**: 1.0.0

For questions or concerns about privacy, review the code directly. All privacy measures are visible and auditable in the source files.
