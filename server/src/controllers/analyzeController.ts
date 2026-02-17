import { Request, Response } from 'express';
import fs from 'fs';
import { analyzeMedia } from '../services/geminiService';
import { extractFrame } from '../services/mediaService';
import { AnalysisResult } from '../types';

const PROMPT_TEMPLATE = `
Analyze this media for deepfake manipulation.
Check for:
- Face distortion
- Frame blending artifacts
- Lip sync mismatch
- Audio irregularities
- Temporal inconsistencies

Return ONLY structured JSON:
{
  "authenticity_score": number (0-100),
  "risk_level": "Low" | "Medium" | "High",
  "explanation": "start verification reason with 'Based on ...'"
}
`;

export const analyze = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        let analysisBuffer: Buffer;
        let analysisMimeType = mimeType;

        console.log(`Processing file: ${req.file.originalname} (${mimeType})`);

        if (mimeType.startsWith('video/')) {
            console.log('Extracting frame from video...');
            const framePath = filePath + '.jpg';
            // For simplicity, we just extract one frame. In production, we'd analyze multiple or the whole video if small enough.
            await extractFrame(filePath, framePath);
            analysisBuffer = fs.readFileSync(framePath);
            analysisMimeType = 'image/jpeg';

            // Cleanup frame
            setTimeout(() => {
                if (fs.existsSync(framePath)) fs.unlinkSync(framePath);
            }, 1000);
        } else {
            analysisBuffer = fs.readFileSync(filePath);
        }

        if (process.env.USE_MOCK_DATA === 'true') {
            console.log('Mock Data Enabled: Skipping Gemini API call.');

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const isFake = Math.random() > 0.5;
            const score = isFake ? Math.floor(Math.random() * 40) : Math.floor(60 + Math.random() * 40);

            const analysisResult: AnalysisResult = {
                authenticity_score: score,
                risk_level: score > 80 ? 'Low' : score > 50 ? 'Medium' : 'High',
                explanation: `[MOCK ANALYSIS] Based on the analysis of facial landmarks and lighting consistency, ${score > 50 ? 'no significant anomalies were detected. The lighting shadows align with the light sources in the scene.' : 'several inconsistencies were found. The blinking patterns are irregular and there are digital artifacts around the mouth region.'}`
            };

            // Cleanup uploaded file
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            res.json(analysisResult);
            return;
        }

        console.log('Sending to Gemini...');
        const resultText = await analyzeMedia(PROMPT_TEMPLATE, analysisMimeType, analysisBuffer);
        console.log('Gemini response received.');

        const jsonMatch = resultText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Failed to parse JSON from Gemini response: " + resultText);
        }

        const analysisResult: AnalysisResult = JSON.parse(jsonMatch[0]);

        // Cleanup uploaded file
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        res.json(analysisResult);

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: 'Analysis failed' });
        // Cleanup if file exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};
