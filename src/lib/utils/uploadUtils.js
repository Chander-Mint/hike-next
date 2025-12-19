import { promises as fs } from 'fs';
import path from 'path';
import { sendError } from './responseUtils';

// export async function handleFileUpload(file, isGallery = false) {

//     const uploadSubDir = isGallery ? 'gallery' : '';

//     const uploadDir = path.join(process.cwd(), 'public', 'uploads', uploadSubDir);
//     await fs.mkdir(uploadDir, { recursive: true });

//     const data = await fs.readFile(file.filepath);

//     const ext = path.extname(file.originalFilename);
//     const newFilename = `${Date.now()}${ext}`;
//     const newPath = path.join(uploadDir, newFilename);

//     await fs.writeFile(newPath, data);
//     await fs.unlink(file.filepath);

//     return `${newFilename}`;
// }

export async function processFormFile(file) {
    const tempDir = path.join(process.cwd(), 'tmp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempPath = path.join(tempDir, `temp-${Date.now()}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(tempPath, buffer);

    return {
        filepath: tempPath,
        originalFilename: file.name
    };
}

export async function deleteFile(filePath, isGallery = false) {

    try {

        const uploadSubDir = isGallery ? 'gallery' : '';

        const imgPath = path.join(process.cwd(), 'public/uploads/', uploadSubDir, filePath);
        if (await fs.access(imgPath).then(() => true).catch(() => false)) {
            await fs.unlink(imgPath);
        }
    } catch (error) {
        sendError('Failed to delete file', 500);
    }
}