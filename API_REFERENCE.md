# 🤖 API Quick Reference

## Base URL

```
http://localhost:5000
```

## Endpoints

### 1. Send Message to Chatbot

**Endpoint:** `POST /api/chat`

**Description:** Send a message and get AI response from Google Gemini

**Request:**

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is React?"}'
```

**Request Body:**

```json
{
  "message": "What is React?"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "reply": "React is a JavaScript library for building user interfaces...",
  "message": "Response generated successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "error": "Message is required"
}
```

**Error Types:**

- `400` - Bad request (empty message, too long, invalid type)
- `500` - Server error (API key issue, network error)
- `503` - Service unavailable (Gemini API unreachable)
- `504` - Request timeout

---

### 2. Health Check

**Endpoint:** `GET /api/chat/health`

**Description:** Verify the chat service is operational

**Request:**

```bash
curl http://localhost:5000/api/chat/health
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Chat service is operational",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

**Error Response (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "GEMINI_API_KEY is not configured"
}
```

---

### 3. Server Status

**Endpoint:** `GET /api/health`

**Description:** Check overall API server status

**Request:**

```bash
curl http://localhost:5000/api/health
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "GlassyUI API Server is running",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

## Request/Response Examples

### Example 1: Simple Question

**Request:**

```json
{
  "message": "What is glassmorphism?"
}
```

**Response:**

```json
{
  "success": true,
  "reply": "Glassmorphism is a modern UI design trend that uses a frosted glass effect combined with semi-transparent backgrounds. It creates a layered appearance with a light, clean aesthetic.",
  "message": "Response generated successfully"
}
```

---

### Example 2: Code Help

**Request:**

```json
{
  "message": "How do I fetch data in React?"
}
```

**Response:**

```json
{
  "success": true,
  "reply": "In React, you can fetch data using the useEffect hook with fetch API or axios library. Here's an example:\n\nuseEffect(() => {\n  fetch('https://api.example.com/data')\n    .then(res => res.json())\n    .then(data => setData(data));\n}, []);",
  "message": "Response generated successfully"
}
```

---

## Input Validation Rules

| Rule             | Limit                           | Error                                       |
| ---------------- | ------------------------------- | ------------------------------------------- |
| Message required | Must not be empty               | "Message is required"                       |
| Message type     | Must be string                  | "Message must be a string"                  |
| Message length   | Max 4000 characters             | "Message is too long (max 4000 characters)" |
| Whitespace trim  | Removes leading/trailing spaces | None (auto-fixed)                           |

---

## Response Status Codes

| Code | Meaning             | Common Cause                                |
| ---- | ------------------- | ------------------------------------------- |
| 200  | Success             | Request processed successfully              |
| 400  | Bad Request         | Invalid input (empty, too long, wrong type) |
| 404  | Not Found           | Wrong endpoint path                         |
| 500  | Server Error        | API key issue, Gemini API error             |
| 503  | Service Unavailable | Cannot reach Gemini API                     |
| 504  | Gateway Timeout     | Request took too long                       |

---

## Testing with Different Tools

### Using Fetch API (JavaScript)

```javascript
const sendMessage = async message => {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  console.log(data);
};

sendMessage('Hello, AI!');
```

### Using Axios (JavaScript)

```javascript
import axios from 'axios';

const sendMessage = async message => {
  try {
    const response = await axios.post('http://localhost:5000/api/chat', {
      message,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

sendMessage('Hello, AI!');
```

### Using Python

```python
import requests

url = 'http://localhost:5000/api/chat'
headers = {'Content-Type': 'application/json'}
data = {'message': 'Hello, AI!'}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

### Using Thunder Client / Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/api/chat`
3. **Headers:**
   ```
   Content-Type: application/json
   ```
4. **Body (JSON):**
   ```json
   {
     "message": "Hello, AI!"
   }
   ```

---

## Error Handling

### Handling Errors in Frontend

```javascript
try {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData.error);
    return;
  }

  const data = await response.json();
  if (data.success) {
    console.log('AI Reply:', data.reply);
  } else {
    console.error('Error:', data.error);
  }
} catch (error) {
  console.error('Network Error:', error.message);
}
```

---

## CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:3000` (React frontend)

To allow other origins, modify `server/app.js`:

```javascript
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add origins here
  }),
);
```

---

## Rate Limiting (Future Feature)

Currently, there's no rate limiting. For production, add:

```bash
npm install express-rate-limit
```

Then use in `server/app.js`:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/chat', limiter);
```

---

## Troubleshooting

### "Cannot connect to http://localhost:5000"

**Check:**

1. Is backend running? `node app.js`
2. Is port 5000 correct? `netstat -an | grep 5000`
3. Is API key set? Check `server/.env`

### "Cannot read properties of undefined (reading 'init')"

**Fix:**

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Restart server

### "GEMINI_API_KEY is not configured"

**Fix:**

1. Open `server/.env`
2. Add: `GEMINI_API_KEY=YOUR_API_KEY`
3. Save and restart server

---

## Performance Tips

- **Batch requests:** Don't send too many simultaneous requests
- **Reuse connections:** Keep connection alive for multiple requests
- **Cache responses:** Store AI responses for similar questions
- **Timeout:** Set reasonable timeouts (30+ seconds recommended)

---

**Last Updated:** May 15, 2026
