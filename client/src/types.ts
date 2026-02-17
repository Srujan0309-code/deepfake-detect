export interface AnalysisResult {
    authenticity_score: number;
    risk_level: 'Low' | 'Medium' | 'High';
    explanation: string;
}
