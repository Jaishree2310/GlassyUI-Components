#!/bin/bash
# Quick Start Script for GlassyUI Chatbot Backend

echo "🚀 Starting GlassyUI Chatbot Backend..."
echo ""

# Check if we're in the right directory
if [ ! -f "app.js" ]; then
    echo "❌ Error: app.js not found!"
    echo "📁 Make sure you're in the 'server' directory"
    echo "   cd server"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "📝 Creating .env file..."
    echo "GEMINI_API_KEY=YOUR_API_KEY" > .env
    echo "PORT=5000" >> .env
    echo "   ✅ .env created - please add your GEMINI_API_KEY"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"
echo "✅ API Key configured in .env"
echo ""
echo "🟢 Starting server..."
echo "📡 Backend will run at: http://localhost:5000"
echo "📡 API endpoint: POST http://localhost:5000/api/chat"
echo ""
echo "🌐 Make sure your React frontend is running at http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
node app.js
