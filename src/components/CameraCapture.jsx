import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, X, RefreshCw } from 'lucide-react';

const CameraCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setIsStreaming(true);
            }
            setError(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera. Please allow permissions or use upload.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsStreaming(false);
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);

            canvas.toBlob((blob) => {
                onCapture(blob);
                stopCamera();
            }, 'image/jpeg', 0.95);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            onCapture(file);
        }
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    return (
        <div className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

            {/* Camera Viewport */}
            <div className="glass-panel" style={{
                width: '100%',
                aspectRatio: '3/4',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {error ? (
                    <div className="text-center p-4" style={{ padding: '2rem', color: 'white' }}>
                        <p className="text-error mb-2">{error}</p>
                        <button onClick={startCamera} className="btn btn-secondary btn-sm">
                            <RefreshCw size={16} /> Retry
                        </button>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
            </div>

            {/* Controls */}
            <div className="flex-between" style={{ width: '100%', gap: '1rem', padding: '0 1rem' }}>
                <label className="btn btn-secondary" style={{ flex: 1 }}>
                    <Upload size={20} />
                    <span>Upload</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </label>

                <button
                    onClick={captureImage}
                    disabled={!isStreaming}
                    style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        border: '4px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 0 0 4px var(--primary-light)'
                    }}
                >
                    <Camera size={32} />
                </button>

                <div style={{ flex: 1 }}></div> {/* Spacer for balance */}
            </div>
        </div>
    );
};

export default CameraCapture;
