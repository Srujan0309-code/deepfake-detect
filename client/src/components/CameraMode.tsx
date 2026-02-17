import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from './ui/Button';
import type { AnalysisResult } from '../types';
import axios from 'axios';
import { TrustScore } from './TrustScore';

export const CameraMode: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const capture = useCallback(async () => {
        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        // Convert base64 to blob
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        const file = new File([blob], "webcam-frame.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append('media', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await axios.post(`${apiUrl}/api/analyze`, formData);
            setResult(response.data);
        } catch (error) {
            console.error("Frame analysis failed", error);
        }
    }, [webcamRef]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isScanning) {
            interval = setInterval(() => {
                capture();
            }, 3000); // Analyze every 3 seconds to avoid rate limits
        }
        return () => clearInterval(interval);
    }, [isScanning, capture]);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="relative border-2 border-cyber-green/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.2)] mb-8">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full max-w-2xl"
                    videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user"
                    }}
                />

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 border-t-2 border-l-2 border-cyber-green w-8 h-8" />
                    <div className="absolute top-4 right-4 border-t-2 border-r-2 border-cyber-green w-8 h-8" />
                    <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-cyber-green w-8 h-8" />
                    <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-cyber-green w-8 h-8" />

                    {isScanning && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/80 text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
                            LIVE ANALYSIS ACTIVE
                        </div>
                    )}
                </div>

                {isScanning && (
                    <div className="absolute inset-0 bg-cyber-green/5 animate-pulse" />
                )}
            </div>

            <div className="flex gap-4 mb-8">
                <Button
                    variant={isScanning ? "outline" : "primary"}
                    onClick={() => setIsScanning(!isScanning)}
                    glow
                >
                    {isScanning ? "STOP SCAN" : "START LIVE SCAN"}
                </Button>
            </div>

            {result && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-center bg-cyber-card p-6 rounded-xl border border-cyber-border">
                        <TrustScore score={result.authenticity_score} riskLevel={result.risk_level} />
                        <div className="flex-1">
                            <h4 className="text-cyber-green font-bold mb-2">LATEST FRAME ANALYSIS</h4>
                            <p className="text-sm text-gray-300">{result.explanation}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
