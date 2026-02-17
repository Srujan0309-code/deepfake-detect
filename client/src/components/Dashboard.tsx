import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { CameraMode } from './CameraMode';
import { Loader } from './ui/Loader';
import { TrustScore } from './TrustScore';
import { Button } from './ui/Button';
import type { AnalysisResult } from '../types';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiCamera } from 'react-icons/fi';

// Result Component
const ResultView = ({ result, onReset }: { result: AnalysisResult, onReset: () => void }) => (
    <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <TrustScore score={result.authenticity_score} riskLevel={result.risk_level} />

            <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-4 text-cyber-green">ANALYSIS REPORT</h3>
                <p className="text-gray-300 leading-relaxed mb-8 font-light">
                    {result.explanation}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent my-6" />

                <div className="flex justify-end">
                    <Button onClick={onReset} variant="outline">
                        Analyze New Media
                    </Button>
                </div>
            </div>
        </div>
    </motion.div>
);

export const Dashboard: React.FC = () => {
    const [mode, setMode] = useState<'upload' | 'camera'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (selectedFile: File) => {
        setFile(selectedFile);
        setIsAnalyzing(true);
        setError(null);

        const formData = new FormData();
        formData.append('media', selectedFile);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await axios.post(`${apiUrl}/api/analyze`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err: any) {
            console.error(err);
            setError("Analysis failed. Please try again. " + (err.response?.data?.error || err.message));
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 tracking-tight">
                MEDIA <span className="text-cyber-green">INTEGRITY_CHECK</span>
            </h1>

            {!result && !isAnalyzing && (
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setMode('upload')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${mode === 'upload' ? 'bg-cyber-green text-black font-bold' : 'bg-transparent border border-gray-600 text-gray-400 hover:border-cyber-green'}`}
                    >
                        <FiUpload /> UPLOAD
                    </button>
                    <button
                        onClick={() => setMode('camera')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${mode === 'camera' ? 'bg-cyber-green text-black font-bold' : 'bg-transparent border border-gray-600 text-gray-400 hover:border-cyber-green'}`}
                    >
                        <FiCamera /> LIVE SCAN
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-500 p-4 rounded mb-8 text-center animate-pulse">
                    {error}
                </div>
            )}

            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20"
                        >
                            <Loader />
                            <p className="text-center text-gray-400 mt-6 tracking-widest">
                                PROCESSING {file ? file.name.toUpperCase() : 'DATA STREAM'}...
                            </p>
                        </motion.div>
                    ) : result ? (
                        <ResultView key="result" result={result} onReset={handleReset} />
                    ) : mode === 'upload' ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UploadZone onFileSelect={handleFileSelect} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="camera"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CameraMode />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
