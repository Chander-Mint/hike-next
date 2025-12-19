'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/gallery');
            const data = await res.json();

            if (data.images && Array.isArray(data.images)) {
                const validImages = data.images.filter(
                    (img) => img.url && typeof img.url === 'string' && img.key && typeof img.key === 'string'
                );
                setImages(validImages);
            } else {
                setImages([]);
                if (data.message && !data.message.toLowerCase().includes('success')) {
                    setError(data.message);
                }
            }
        } catch (err) {
            console.error('Error fetching images:', err);
            setError('Failed to load gallery. Please try again.');
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFile(files);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || selectedFile.length === 0) return;

        const formData = new FormData();
        selectedFile.forEach((file) => {
            formData.append('image', file);
        });

        try {
            setUploading(true);
            const res = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data) {
                await fetchImages();
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                setError(data.message || 'Failed to upload images');
            }
        } catch (err) {
            console.error('Error uploading images:', err);
            setError('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (imageKey) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const res = await fetch('/api/gallery', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagePath: imageKey }),
            });

            const data = await res.json();
            if (data) {
                await fetchImages();
                if (previewImage && previewImage.key === imageKey) {
                    setShowPreview(false);
                    setPreviewImage(null);
                }
            } else {
                setError(data.message || 'Failed to delete image');
            }
        } catch (err) {
            console.error('Error deleting image:', err);
            setError('Failed to delete image. Please try again.');
        }
    };

    const navigateImage = (direction) => {
        if (!previewImage) return;

        const currentIndex = images.findIndex((img) => img.key === previewImage.key);
        if (direction === 'prev') {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            setPreviewImage(images[prevIndex]);
        } else {
            const nextIndex = (currentIndex + 1) % images.length;
            setPreviewImage(images[nextIndex]);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowPreview(false);
            setPreviewImage(null);
        }
    };

    useEffect(() => {
        if (!showPreview) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowPreview(false);
                setPreviewImage(null);
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showPreview, previewImage, images]);

    const handleDownload = async (imageUrl, imageKey) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = imageKey.split('/').pop() || 'image';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading image:', err);
            setError('Failed to download image. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Gallery</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                            multiple
                            accept="image/*"
                        />
                        <label
                            htmlFor="image-upload"
                            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer"
                        >
                            <Icon icon="material-symbols:upload" className="mr-2" width={20} height={20} />
                            {selectedFile ? `${selectedFile.length} file(s) selected` : 'Choose Images'}
                        </label>
                    </div>
                    {selectedFile && (
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                        >
                            <Icon icon="line-md:upload-loop" className="mr-2" width={20} height={20} />
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    )}
                </div>
            </div>

            {/* {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError('')}>
                        <Icon icon="mdi:close" />
                    </button>
                </div>
            )} */}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Icon icon="svg-spinners:ring-resize" width={48} height={48} className="text-gray-900" />
                </div>
            ) : images?.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No images found in the gallery.</p>
                    <p className="text-gray-400">Upload some images to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images?.map((image, index) => (
                        <div key={image?.key} className="relative group">
                            <div
                                className="aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => {
                                    setPreviewImage(image);
                                    setShowPreview(true);
                                }}
                            >
                                <Image
                                    src={image.url}
                                    alt={`Gallery image ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(image.key);
                                }}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Delete image"
                            >
                                <Icon icon="mdi:trash-can-outline" width={16} height={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showPreview && previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
                    onClick={handleBackdropClick}
                >
                    <button
                        onClick={() => {
                            setShowPreview(false);
                            setPreviewImage(null);
                        }}
                        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                    >
                        <Icon icon="mdi:close" width={24} height={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage('prev');
                        }}
                        className="absolute left-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                    >
                        <Icon icon="mdi:chevron-left" width={24} height={24} />
                    </button>

                    <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
                        <Image
                            src={previewImage?.url}
                            alt="Preview"
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[80vh] object-contain"
                            unoptimized
                        />
                        <div className="mt-2 text-center text-white">
                            {images?.findIndex((img) => img.key === previewImage?.key) + 1} of {images?.length}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage('next');
                        }}
                        className="absolute right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                    >
                        <Icon icon="mdi:chevron-right" width={24} height={24} />
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(previewImage.url, previewImage.key);
                            }}
                            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 mx-2 flex items-center"
                        >
                            <Icon icon="mdi:download" className="mr-2" width={16} height={16} />
                            Download
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm('Are you sure you want to delete this image?')) {
                                    handleDelete(previewImage.key);
                                    setShowPreview(false);
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mx-2 flex items-center"
                        >
                            <Icon icon="mdi:trash-can-outline" className="mr-2" width={16} height={16} />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}