import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const extractFrame = (videoPath: string, outputPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                count: 1,
                folder: path.dirname(outputPath),
                filename: path.basename(outputPath),
                size: '100%'
            })
            .on('end', () => resolve())
            .on('error', (err) => reject(err));
    });
};
