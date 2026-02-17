import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FiUploadCloud } from 'react-icons/fi';

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'video/*': [],
            'audio/*': []
        },
        maxFiles: 1
    });

    return (
        <Card className="w-full max-w-2xl mx-auto overflow-hidden">
            <div
                {...getRootProps()}
                className={`relative h-80 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-cyber-green bg-cyber-green/10 scale-[1.02] shadow-[0_0_30px_rgba(0,255,157,0.2)]' : 'border-gray-600 hover:border-cyber-green/50 hover:bg-white/5'}
        `}
            >
                <input {...getInputProps()} />
                <AnimatePresence mode="wait">
                    <motion.div
                        className="text-center p-6 w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="mb-4 flex justify-center w-full">
                            <FiUploadCloud className={`text-6xl mx-auto ${isDragActive ? 'text-cyber-green animate-bounce' : 'text-gray-400'}`} />
                        </div>
                        <p className="text-xl font-medium mb-2 text-white">
                            {isDragActive ? "DROP FILE TO SCAN" : "DRAG & DROP MEDIA"}
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Supports JPG, PNG, MP4, WAV, MP3
                        </p>
                        <div className="pointer-events-none inline-block">
                            <Button variant="outline" className="mx-auto">
                                BROWSE FILES
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {isDragActive && (
                    <>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,157,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[90%] h-[90%] border border-cyber-green/30 rounded-lg animate-pulse" />
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};
