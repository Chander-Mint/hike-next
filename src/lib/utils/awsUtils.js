import { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs/promises';

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME;
const FOLDER = process.env.AWS_S3_BUCKET_FOLDER || 'hike';

export async function listFilesFromS3(subDir = '') {
    const prefix = `${FOLDER}/${subDir}/`;

    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
    });

    const result = await s3.send(command);

    return result.Contents?.map((obj) => ({
        key: obj.Key,
        url: `https://${BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${obj.Key}`,
    })) || [];
}

export async function deleteFileFromS3(fileKey) {

    let file = fileKey;
    if (fileKey?.includes('.amazonaws.com')) {
        file = fileKey.split('.amazonaws.com/')[1];
    }

    const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: file,
    });

    await s3.send(command);
}

export async function handleFileUpload(file, isGallery = false) {
    if (!file?.originalFilename || !file?.filepath) {
        throw new Error('Invalid file object');
    }

    const folder = FOLDER;
    const uploadSubDir = isGallery ? 'gallery' : '';
    const ext = path.extname(file.originalFilename);
    const newFilename = `${Date.now()}${ext}`;
    const fileKey = path.posix.join(folder, uploadSubDir, newFilename);

    const fileData = await fs.readFile(file.filepath);

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileKey,
        Body: fileData,
        ContentType: getContentType(ext),
    });

    try {
        await s3.send(command);
        await fs.unlink(file.filepath);
        return `https://${BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${fileKey}`;
    } catch (err) {
        console.error('AWS Upload Failed:', err);
        throw new Error('Failed to upload file to S3');
    }
}

function getContentType(ext) {
    switch (ext.toLowerCase()) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.webp':
            return 'image/webp';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}
