import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type';
import path from 'path';
import { Readable } from 'stream';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const MAX_FILENAME_LENGTH = 255;

function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            throw error(400, 'No file uploaded');
        }

        const safeFilename = path.basename(file.name).slice(0, MAX_FILENAME_LENGTH);
        const fileExtension = path.extname(safeFilename).toLowerCase();

        if (file.size > MAX_FILE_SIZE) {
            throw error(400, 'File size exceeds the maximum limit');
        }

        const fileStream = Readable.from(file.stream());
        const chunks: Uint8Array[] = [];
        
        for await (const chunk of fileStream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        const fileType = await fileTypeFromBuffer(buffer);

        if (!fileType || !ALLOWED_MIME_TYPES.includes(fileType.mime) || !fileExtension.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            throw error(400, 'Invalid file type');
        }

        const sharpImage = sharp(buffer);
        const metadata = await sharpImage.metadata();
        let resizedImage;

        if (metadata.width && metadata.height) {
            const aspectRatio = metadata.width / metadata.height;
            let newWidth = Math.min(metadata.width, MAX_WIDTH);
            let newHeight = Math.round(newWidth / aspectRatio);

            if (newHeight > MAX_HEIGHT) {
                newHeight = MAX_HEIGHT;
                newWidth = Math.round(newHeight * aspectRatio);
            }

            resizedImage = await sharpImage.resize(newWidth, newHeight, { fit: 'inside' }).toBuffer();
        } else {
            resizedImage = await sharpImage.toBuffer();
        }

        const compressedImage = await sharp(resizedImage).webp({ quality: 80 }).toBuffer();
        const escapedFilename = escapeHtml(safeFilename);

        return json({
            originalSize: buffer.byteLength,
            compressedSize: compressedImage.byteLength,
            compressedDataUrl: `data:image/webp;base64,${compressedImage.toString('base64')}`,
            filename: escapedFilename
        });
    } catch (err) {
        console.error(err);
        throw error(500, 'Error processing image');
    }
};
