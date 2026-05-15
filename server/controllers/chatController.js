import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with the key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /chat
 * Handles user messages and returns AI responses using Google Gemini
 *
 * PRIVACY NOTICE:
 * - User messages are NOT logged or stored on the server
 * - Personal information is NOT extracted or shared
 * - Messages are processed only to generate a response
 * - No user data is sent to third parties
 *
 * Request body: { message: "user message" }
 * Response: { reply: "AI response", success: true }
 */
export const sendMessage = async (req, res) => {
  try {
    // Validate request body
    // NOTE: Never log the actual user message content - protects privacy
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }

    if (typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message must be a string',
      });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }

    if (trimmedMessage.length > 4000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (max 4000 characters)',
      });
    }

    // Demo mode - return mock responses
    const demoResponses = {
      hello: 'Hello! Welcome to GlassyUI chatbot. How can I help you today?',
      hi: 'Hi there! Great to see you. What would you like to know?',
      'how are you': "I'm doing great, thanks for asking! Ready to help.",
      'what is react':
        'React is a JavaScript library for building user interfaces with reusable components. It makes building interactive UIs faster and easier!',
      help: 'I can help you with questions about React, GlassyUI, and web development. Feel free to ask anything!',
      thanks: "You're welcome! Happy to help. Anything else?",
      bye: 'Goodbye! Feel free to come back anytime!',
      default:
        "That's an interesting question! In a real deployment, I would use Google Gemini API to answer. For now, I'm in demo mode. To enable the real AI, add your Google Gemini API key to the .env file.",
    };

    // Match response based on keywords
    // NOTE: Only keywords are checked, full message is never logged or stored
    const lowerMessage = trimmedMessage.toLowerCase();
    let responseText = demoResponses['default'];

    for (const [key, value] of Object.entries(demoResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        responseText = value;
        break;
      }
    }

    // SECURITY: Never include user message in response (prevents data leaks)
    // PRIVACY: Response is generic and doesn't reveal user information
    return res.status(200).json({
      success: true,
      reply: responseText,
      message: 'Response generated successfully (Demo Mode)',
    });
  } catch (error) {
    // PRIVACY: Log error type only, never log user message or personal data
    console.error('Chat Error - Type:', error.name);

    // Handle specific error types
    if (error.message && error.message.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Invalid API key',
      });
    }

    if (error.message && error.message.includes('network')) {
      return res.status(503).json({
        success: false,
        error: 'Network error: Unable to reach Gemini API',
      });
    }

    if (error.code === 'TIMEOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'Request timeout: Gemini API took too long to respond',
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      error:
        'An error occurred while processing your request. Please try again later.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * GET /chat/health
 * Health check endpoint to verify the chat service is working
 */
export const healthCheck = async (req, res) => {
  try {
    // Verify API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Chat service is operational',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Health check failed',
    });
  }
};
