export interface AnalysisResult {
    authenticity_score: number;
    risk_level: 'Low' | 'Medium' | 'High';
    explanation: string;
}

export interface UploadResponse {
    fileId: string;
    url: string;
}
