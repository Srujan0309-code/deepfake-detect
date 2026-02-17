# Walkthrough - Intelligent Deepfake Detection & Trust Verification System

I have successfully built the "Intelligent Deepfake Detection & Trust Verification System". This application features a premium, futuristic UI and a powerful backend integrated with Google Gemini 1.5 Pro.

## 🚀 Key Features Implemented

### 1. Premium Frontend (Client)
-   **Tech Stack**: React, TypeScript, Vite, Tailwind CSS (v4), GSAP, Framer Motion.
-   **Animations**:
    -   **Hero Section**: Particle background, split-text text reveal, magnetic buttons.
    -   **Trust Dashboard**: Animated circular progress for trust scores, smooth reveal of analysis details.
    -   **Upload Zone**: Interactive drag & drop with glowing hover effects and pulse animations.
-   **Components**:
    -   `Hero.tsx`: Cinematic landing page.
    -   `Dashboard.tsx`: Main analysis hub.
    -   `CameraMode.tsx`: Real-time webcam analysis (simulated 3s interval).
    -   `TrustScore.tsx`: Visualizes authenticity 0-100%.

### 2. Robust Backend (Server)
-   **Tech Stack**: Node.js, Express, Multer.
-   **AI Integration**: Google Gemini 1.5 Pro for multimodal analysis (Images, Videos, Audio).
-   **Video Processing**: `fluent-ffmpeg` to extract frames from uploaded videos for analysis.
-   **API**: `POST /api/analyze` handles file uploads and returns structured JSON trust reports.

## 🛠️ How to Verify

### Prerequisites
-   Node.js installed.
-   FFmpeg installed and added to system PATH.
-   Google Gemini API Key.

### Step 1: Setup Backend
1.  Navigate to `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env`:
    -   Create `.env` file with:
        ```env
        PORT=3000
        GEMINI_API_KEY=your_actual_api_key
        USE_MOCK_DATA=false
        ```
    -   *Note: Set `USE_MOCK_DATA=true` to test UI without an API key.*
4.  Start server:
    ```bash
    npm run dev
    ```

### Step 2: Setup Frontend
1.  Navigate to `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start development server:
    ```bash
    npm run dev
    ```

### Step 3: Test Features
-   **Upload**: Drag and drop an image or video to the upload zone. Watch the "Scanning" animation and the result reveal.
-   **Live Camera**: Switch to "Live Scan" mode. Allow camera access. It will capture frames every 3 seconds and update the trust score in real-time.
-   **Animations**: Observe the particle effects on the landing page and the magnetic button interactions.

## 📸 Architecture

### Folder Structure
```
/
├── client/         # React Frontend
│   ├── src/
│   │   ├── components/  # Hero, Dashboard, UI
│   │   ├── index.css    # Tailwind & Cyber Themes
│   │   └── App.tsx
├── server/         # Express Backend
│   ├── src/
│   │   ├── controllers/ # Logic
│   │   ├── services/    # Gemini & FFmpeg
│   │   └── index.ts     # Entry point
```

## Next Steps
-   Deployment to Render or Vercel (configuration provided in `render.yaml`).
-   Enhancing specific audio analysis logic.
