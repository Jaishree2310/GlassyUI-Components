# 🎯 ChatWidget Integration Guide

## Quick Start (2 minutes)

The chat widget is **already integrated** in your app! It appears as a **💬 button** in the **bottom-left corner** of your screen.

### What You Get

✅ Fixed button in bottom-left corner  
✅ Slides in from left with smooth animation  
✅ Semi-transparent backdrop  
✅ Persistent local storage (messages saved)  
✅ Auto-scroll to latest message  
✅ Keyboard shortcuts (Enter to send, Shift+Enter for newline)  
✅ Fully accessible (ARIA roles, keyboard navigation)  
✅ Responsive (works on mobile, tablet, desktop)  
✅ Beautiful glassmorphism design

---

## File Structure

```
src/components/
├── ChatWidget.tsx          ← Main component (logic)
├── ChatWidget.module.css   ← Styling (CSS Modules)
└── AIChatbot.jsx          ← Alternative full-page chatbot
```

---

## Component Props

```typescript
interface ChatWidgetProps {
  apiEndpoint?: string; // Backend API endpoint (default: http://localhost:5000/api/chat)
  title?: string; // Widget title (default: "💬 Chat Assistant")
  subtitle?: string; // Widget subtitle (default: "How can I help you today?")
  placeholder?: string; // Input placeholder (default: "Type your message...")
  buttonText?: string; // Button text/emoji (default: "💬")
}
```

---

## Current Configuration

In `src/App.tsx`:

```tsx
<ChatWidget
  apiEndpoint='http://localhost:5000/api/chat'
  title='💬 GlassyUI Chat'
  subtitle='Ask me anything!'
  placeholder='Type your message...'
/>
```

### Customize It

Change the `App.tsx` to customize the widget:

```tsx
// Example: Bottom-right chat widget
<ChatWidget
  apiEndpoint='http://localhost:5000/api/chat'
  title='🚀 AI Assistant'
  subtitle="I'm here to help"
  placeholder='Ask me anything...'
  buttonText='🎯'
/>
```

---

## Key Features

### 1. **Fixed Button (Bottom-Left)**

- Position: Fixed to viewport
- Always visible and accessible
- Smooth scale animation on hover
- Click to open/close chat

### 2. **Slide-In Panel**

- Slides in from **left side** of screen
- Semi-transparent backdrop blocks interaction with page
- Click outside to close
- Close button (✕) in top-right

### 3. **Local Storage Persistence**

- Messages automatically saved to `localStorage`
- Key: `chat_widget_messages`
- Persists across browser sessions
- Clear button to delete chat history

### 4. **Message Handling**

- **User messages**: Right-aligned, purple gradient
- **Assistant messages**: Left-aligned, gray background
- **Timestamps**: Shows time for each message
- **Loading state**: Typing indicator while waiting for response
- **Error handling**: Displays error message with dismiss button

### 5. **Keyboard Shortcuts**

- **Enter**: Send message
- **Shift+Enter**: New line in message
- **Escape**: Close widget (when focused on close button)
- **Tab**: Navigate between elements

### 6. **Accessibility (WCAG 2.1 AA)**

- Semantic HTML with proper ARIA roles
- `role="dialog"` on chat panel
- `aria-modal="true"` for focus management
- `aria-live="polite"` for message announcements
- Focus visible states on all interactive elements
- Proper heading hierarchy
- Error messages with `role="alert"`

---

## CSS Features

### Glassmorphism Design

- Backdrop blur effect
- Semi-transparent backgrounds
- Gradient overlays
- Modern rounded corners

### Responsive Breakpoints

```css
/* Desktop: 420px wide */
/* Tablet (640px): Adjusted padding/gaps */
/* Mobile (480px): Full width, optimized spacing */
```

### Dark Mode Support

Automatically adapts to system preferences:

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme colors applied */
}
```

### Animations

- **Slide-in**: 0.35s cubic-bezier animation
- **Fade backdrop**: 0.3s ease-out
- **Message appearance**: 0.3s slide-in effect
- **Typing indicator**: Continuous bounce animation
- **Button hover**: Scale transform

---

## API Integration

The widget communicates with your backend:

```
POST http://localhost:5000/api/chat
Content-Type: application/json

Request:
{
  "message": "Hello, how are you?"
}

Response:
{
  "success": true,
  "reply": "Hi! I'm doing great!",
  "message": "Response generated successfully"
}
```

### Change Backend URL

Edit `App.tsx`:

```tsx
<ChatWidget
  apiEndpoint='http://your-backend.com/api/chat'
  // ... other props
/>
```

---

## Browser Support

| Browser | Support                                               |
| ------- | ----------------------------------------------------- |
| Chrome  | ✅ Full                                               |
| Firefox | ✅ Full                                               |
| Safari  | ✅ Full                                               |
| Edge    | ✅ Full                                               |
| IE 11   | ❌ Not supported (use ChatWidget for modern browsers) |

---

## LocalStorage Data

### Save Format

```json
[
  {
    "id": "1234567890",
    "role": "user",
    "content": "Hello!",
    "timestamp": 1234567890000
  },
  {
    "id": "1234567891",
    "role": "assistant",
    "content": "Hi there!",
    "timestamp": 1234567891000
  }
]
```

### Clear Data

Click the **🗑️ Clear** button in the chat widget, or manually:

```javascript
localStorage.removeItem('chat_widget_messages');
```

---

## Advanced Usage

### Custom Styling

Override CSS Module classes:

```css
/* In your global CSS */
:global(.chatButton) {
  bottom: 30px !important;
  left: 30px !important;
  width: 60px !important;
  height: 60px !important;
}
```

Or pass custom class names as props (requires component modification).

### Reposition to Bottom-Right

If you want bottom-right instead of bottom-left:

1. Edit `ChatWidget.module.css`:

```css
.chatButton {
  /* Change from: */
  left: 20px;
  /* To: */
  right: 20px;
}

.chatPanel {
  /* Change from: */
  left: 0;
  /* To: */
  right: 0;
  /* Change animation: */
  transform: translateX(100%);
}

.chatPanel.open {
  transform: translateX(0);
}
```

### Use Multiple Chat Widgets

```tsx
<ChatWidget
  apiEndpoint='http://localhost:5000/api/chat'
  title='Support Chat'
  buttonText='📞'
/>
```

(Would need CSS modifications to position differently)

---

## Testing Checklist

- [ ] Chat button visible in bottom-left corner
- [ ] Button has purple gradient and glow on hover
- [ ] Clicking button opens chat panel with slide animation
- [ ] Clicking outside closes the panel
- [ ] Backdrop is semi-transparent and dismisses on click
- [ ] Can type messages in input field
- [ ] Enter key sends message
- [ ] Shift+Enter creates new line
- [ ] Messages display with timestamps
- [ ] AI responses appear with loading indicator
- [ ] Auto-scroll shows latest message
- [ ] Clear button removes all messages
- [ ] Refresh page - messages still there (localStorage)
- [ ] Close button (✕) in header works
- [ ] Error messages display correctly
- [ ] Mobile responsive (try on 480px width)
- [ ] Keyboard navigation works with Tab key
- [ ] Focus visible on all buttons

---

## Troubleshooting

### Chat button not visible

- Check z-index conflicts with other fixed elements
- Verify `position: fixed` not affected by parent `overflow: hidden`
- Check browser console for CSS errors

### Messages not persisting

- Check browser's localStorage is enabled
- Open DevTools → Application → Local Storage
- Look for key: `chat_widget_messages`
- Clear site data and try again

### API not responding

- Verify backend running: `http://localhost:5000/api/chat`
- Check CORS configuration in backend
- Open Network tab in DevTools to see request/response

### Styling issues on mobile

- Check responsive breakpoints in CSS
- Test on actual mobile device (not just DevTools)
- Verify textarea font-size is 16px+ (prevents zoom on iOS)

### Accessibility issues

- Check ARIA roles in DevTools Accessibility Tree
- Use keyboard to navigate (Tab, Shift+Tab, Enter)
- Test with screen reader (NVDA, JAWS, or VoiceOver)

---

## Performance Optimization

### Large Chat History

If you have 100+ messages, consider:

```javascript
// Limit stored messages to last 50
const MAX_HISTORY = 50;
if (messages.length > MAX_HISTORY) {
  const trimmed = messages.slice(-MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}
```

### Lazy Load Messages

Only load recent messages on open, fetch history on scroll.

---

## Comparison: ChatWidget vs AIChatbot

| Feature           | ChatWidget                 | AIChatbot               |
| ----------------- | -------------------------- | ----------------------- |
| **Position**      | Fixed button (bottom-left) | Full width page section |
| **UI Style**      | Glassmorphism, modern      | Glassmorphism, modern   |
| **Persistence**   | ✅ LocalStorage            | ❌ No persistence       |
| **Accessibility** | ✅ Full WCAG AA            | ⚠️ Partial              |
| **Responsive**    | ✅ Optimized               | ✅ Good                 |
| **Best for**      | Widget/sidebar chat        | Dedicated chat page     |

---

## Next Steps

1. **Test the widget** at `http://localhost:3000`
2. **Customize styling** in `ChatWidget.module.css`
3. **Update API endpoint** if deploying to production
4. **Test accessibility** with keyboard and screen reader
5. **Check localStorage** in DevTools

---

## Support

For issues or questions:

1. Check troubleshooting section above
2. Verify backend API is running and responding
3. Check browser console for errors
4. Review component props and configuration

---

**ChatWidget Status**: ✅ Production Ready  
**Last Updated**: May 15, 2026  
**Version**: 1.0.0
