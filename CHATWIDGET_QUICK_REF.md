# ⚡ ChatWidget - Quick Reference

## Installation ✅

Already integrated in your app!

## What You Get

- ✅ Fixed 💬 button in bottom-left corner
- ✅ Slides in from left with backdrop
- ✅ Messages saved to localStorage
- ✅ Auto-scroll & timestamps
- ✅ Keyboard shortcuts (Enter, Shift+Enter)
- ✅ Fully accessible & responsive
- ✅ Beautiful glassmorphism design

## Files

```
src/components/
├── ChatWidget.tsx          ← Component logic
└── ChatWidget.module.css   ← Styling
```

## Configuration (App.tsx)

```tsx
<ChatWidget
  apiEndpoint='http://localhost:5000/api/chat'
  title='💬 GlassyUI Chat'
  subtitle='Ask me anything!'
  placeholder='Type your message...'
/>
```

## Features

### UI

- Fixed button: Bottom-left corner
- Panel: Slides in from left
- Backdrop: Semi-transparent, dismissible
- Close button: ✕ in top-right

### Messages

- User: Right-aligned, purple
- AI: Left-aligned, gray
- Timestamps: HH:MM format
- Loading: Typing indicator

### Input

- Enter: Send message
- Shift+Enter: New line
- Clear: Delete history

### Storage

- Auto-save to localStorage
- Key: `chat_widget_messages`
- Persists across sessions
- Clear button to reset

## Keyboard Navigation

| Key           | Action         |
| ------------- | -------------- |
| Enter         | Send message   |
| Shift+Enter   | New line       |
| Tab           | Navigate focus |
| Click outside | Close panel    |

## Responsive

| Device  | Width     | Status         |
| ------- | --------- | -------------- |
| Desktop | >640px    | ✅ 420px panel |
| Tablet  | 480-640px | ✅ Adjusted    |
| Mobile  | <480px    | ✅ Full width  |

## API Endpoint

```
POST http://localhost:5000/api/chat
Content-Type: application/json

{
  "message": "Hello!"
}
```

Response:

```json
{
  "success": true,
  "reply": "Hi there!",
  "message": "..."
}
```

## Customize

### Change Position

Edit `ChatWidget.module.css`:

```css
/* Bottom-left (current) */
.chatButton {
  left: 20px;
}

/* Bottom-right */
.chatButton {
  right: 20px;
}
```

### Change Colors

```css
.chatButton {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Change API

```tsx
<ChatWidget apiEndpoint='https://your-api.com/chat' />
```

## Testing

- [ ] Button visible bottom-left ✅
- [ ] Click opens panel ✅
- [ ] Slides in from left ✅
- [ ] Backdrop visible ✅
- [ ] Click outside closes ✅
- [ ] Can type messages ✅
- [ ] Enter sends message ✅
- [ ] AI responds ✅
- [ ] Loading indicator shows ✅
- [ ] Messages persist (refresh) ✅
- [ ] Clear button works ✅
- [ ] Mobile responsive ✅
- [ ] Keyboard accessible ✅

## Troubleshooting

| Issue              | Solution                              |
| ------------------ | ------------------------------------- |
| Button not visible | Check z-index, parent overflow        |
| Messages not saved | Enable localStorage, check DevTools   |
| API not responding | Verify backend running on :5000       |
| Styling broken     | Check CSS Module imports              |
| Mobile issues      | Test on actual device, check viewport |

## Browser Support

✅ Chrome  
✅ Firefox  
✅ Safari  
✅ Edge  
❌ IE 11

## LocalStorage

```javascript
// View messages
JSON.parse(localStorage.getItem('chat_widget_messages'));

// Clear manually
localStorage.removeItem('chat_widget_messages');
```

## Accessibility (WCAG 2.1 AA)

- ✅ Semantic HTML
- ✅ ARIA roles & labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Error announcements
- ✅ Color contrast

## Props

```typescript
interface ChatWidgetProps {
  apiEndpoint?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
}
```

## Default Values

| Prop        | Default                          |
| ----------- | -------------------------------- |
| apiEndpoint | `http://localhost:5000/api/chat` |
| title       | `💬 Chat Assistant`              |
| subtitle    | `How can I help you today?`      |
| placeholder | `Type your message...`           |
| buttonText  | `💬`                             |

## CSS Classes (Modules)

- `.chatButton` - Fixed button
- `.chatPanel` - Slide-in panel
- `.backdrop` - Semi-transparent overlay
- `.header` - Title & close button
- `.messagesContainer` - Message list
- `.message` - Individual message
- `.input` - Text area
- `.sendButton` - Send action
- `.clearButton` - Clear history

---

**Status**: ✅ Ready to use  
**Integration**: Complete  
**Testing**: All features working  
**Accessibility**: WCAG 2.1 AA Compliant
