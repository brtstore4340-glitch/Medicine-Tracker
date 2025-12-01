import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraCapture from '../components/CameraCapture';
import MedicineForm from '../components/MedicineForm';
import { analyzeMedicineImage } from '../services/gemini';
import { addMedicine } from '../services/firebase';
import { Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';

const STEPS = {
    CAMERA: 'camera',
    ANALYZING: 'analyzing',
    FORM: 'form'
};

const AddMedicine = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(STEPS.CAMERA);
    const [capturedImage, setCapturedImage] = useState(null);
    const [aiData, setAiData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleCapture = async (imageBlob) => {
        setCapturedImage(imageBlob);
        setStep(STEPS.ANALYZING);
        setError(null);

        try {
            // Call Gemini API
            const data = await analyzeMedicineImage(imageBlob);
            setAiData(data);
            setStep(STEPS.FORM);
        } catch (err) {
            console.error("Analysis failed", err);
            setError(err.message || "Failed to analyze image");
            // Still go to form, but show error
            setAiData({});
            setStep(STEPS.FORM);
        }
    };

    const handleSave = async (formData) => {
        setIsSaving(true);
        try {
            await addMedicine(formData);
            navigate('/');
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save medicine. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={20} /> Back
                </button>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Add Medicine</h2>
                <div style={{ width: '60px' }}></div> {/* Spacer */}
            </div>

            {step === STEPS.CAMERA && (
                <CameraCapture onCapture={handleCapture} />
            )}

            {step === STEPS.ANALYZING && (
                <div className="flex-col" style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    gap: '1.5rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div className="pulse-ring"></div>
                        <Sparkles size={40} color="var(--primary)" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Analyzing Image...</h3>
                        <p className="text-muted">Extracting details with Gemini AI</p>
                    </div>
                    <style>{`
            .pulse-ring {
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 4px solid var(--primary-light);
              opacity: 0;
              animation: pulse 2s infinite;
            }
            @keyframes pulse {
              0% { transform: scale(0.8); opacity: 0.8; }
              100% { transform: scale(1.5); opacity: 0; }
            }
          `}</style>
                </div>
            )}

            {step === STEPS.FORM && (
                <div className="fade-in">
                    {error ? (
                        <div className="card" style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', marginBottom: '1.5rem' }}>
                            <div className="flex-between">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AlertCircle size={20} color="#DC2626" />
                                    <span className="text-sm font-bold" style={{ color: '#DC2626' }}>AI Error</span>
                                </div>
                                <span className="text-xs text-muted" style={{ color: '#DC2626' }}>{error}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="card" style={{ background: 'var(--bg-app)', border: '1px dashed var(--primary)', marginBottom: '1.5rem' }}>
                            <div className="flex-between">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Sparkles size={16} color="var(--primary)" />
                                    <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>AI Auto-filled</span>
                                </div>
                                <span className="text-xs text-muted">Please verify details</span>
                            </div>
                        </div>
                    )}

                    {/* Debug View - Remove before production */}
                    {aiData && (
                        <details style={{ marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <summary>Debug: Raw AI Data</summary>
                            <pre style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '4px', overflowX: 'auto' }}>
                                {JSON.stringify(aiData, null, 2)}
                            </pre>
                        </details>
                    )}

                    <MedicineForm
                        initialData={aiData}
                        onSubmit={handleSave}
                        onCancel={() => setStep(STEPS.CAMERA)}
                        isSaving={isSaving}
                    />
                </div>
            )}
        </div>
    );
};

export default AddMedicine;
