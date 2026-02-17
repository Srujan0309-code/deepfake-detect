# Intelligent Deepfake Detection & Trust Verification System

A premium cybersecurity SaaS platform for analyzing media authenticity using Google Gemini 1.5 Pro.

![Status](https://img.shields.io/badge/Status-Production_Ready-00ff9d)

## 🌟 Features

-   **Deepfake Detection**: AI-powered analysis of integrity for Images, Videos, and Audio.
-   **Real-time Analysis**: Live webcam frame processing for continuous verification.
-   **Premium UI**: Cinematic animations using GSAP and Framer Motion.
-   **Trust Scoring**: Visual dashboard with risk assessment levels.

## 🏗️ Architecture

-   **Frontend**: React (Vite), TypeScript, Tailwind CSS, GSAP, Framer Motion.
-   **Backend**: Node.js, Express, Multer, FFmpeg.
-   **AI**: Google Gemini 1.5 Pro (Multimodal).

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **FFmpeg**: Must be installed and available in your system PATH (required for video processing).
3.  **Gemini API Key**: Get one from Google AI Studio.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd deepfake-detect
    ```

2.  **Setup Backend**:
    ```bash
    cd server
    npm install
    ```
    -   Create a `.env` file in the `server` folder:
        ```env
        PORT=3000
        GEMINI_API_KEY=your_gemini_api_key
        USE_MOCK_DATA=false  # Set to true for UI testing without API cost
        ```

3.  **Setup Frontend**:
    ```bash
    cd ../client
    npm install
    ```

### Running the App

1.  **Start Backend** (Terminal 1):
    ```bash
    cd server
    npm run dev
    ```

2.  **Start Frontend** (Terminal 2):
    ```bash
    cd client
    npm run dev
    ```
3.  Open `http://localhost:5173` in your browser.

## 📦 Deployment

### Render.com (Recommended)
This project includes a `render.yaml` for easy deployment.
1.  Connect your repo to Render.
2.  It will detect the services.
3.  Ensure you add the `GEMINI_API_KEY` environment variable in the dashboard.

## 🔒 Security
-   All uploads are processed via secure API endpoints.
-   Files are cleaned up after analysis.
-   API keys are stored server-side only.

---
*Built with ❤️ by Antigravity*
