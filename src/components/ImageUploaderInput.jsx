import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Camera, 
  Link as LinkIcon, 
  X, 
  Check, 
  RotateCcw, 
  Image as ImageIcon, 
  Trash2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

/**
 * ImageUploaderInput Component
 * Provides seamless Image selection via:
 * 1. Local Device File Picker (Drag & Drop or File Select)
 * 2. Camera Snapshot (Live WebRTC Video Stream Modal + Native Mobile Capture)
 * 3. Direct Image URL Input (with live preview)
 */
const ImageUploaderInput = ({ 
  value = '', 
  onChange, 
  label = 'Image URL / Upload', 
  placeholder = 'https://images.unsplash.com/photo-... or upload photo',
  required = false,
  presetImages = [],
  accentColor = 'emerald' // 'emerald' | 'amber' | 'blue' | 'purple' | 'cyan' | 'optom'
}) => {
  const [activeInputMode, setActiveInputMode] = useState('upload'); // 'upload' | 'camera' | 'url'
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);

  // Clean up camera stream when camera modal closes or component unmounts
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Helper to convert & optimize image for fast multi-device cloud sync (500x500 canvas render, ~15-25KB)
  const compressAndSetImage = (fileOrDataUrl) => {
    setIsCompressing(true);
    const maxWidth = 500;
    const maxHeight = 500;
    const quality = 0.65; // High-efficiency compressed JPEG

    if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
      const objectUrl = URL.createObjectURL(fileOrDataUrl);
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const hdDataUrl = canvas.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(objectUrl);
        onChange(hdDataUrl);
        setIsCompressing(false);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        const reader = new FileReader();
        reader.onload = (e) => {
          onChange(e.target.result);
          setIsCompressing(false);
        };
        reader.onerror = () => setIsCompressing(false);
        reader.readAsDataURL(fileOrDataUrl);
      };
      img.src = objectUrl;
    } else if (typeof fileOrDataUrl === 'string') {
      let hdSource = fileOrDataUrl;
      if (hdSource.includes('unsplash.com')) {
        hdSource = hdSource.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90');
      }

      if (hdSource.startsWith('data:')) {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          onChange(canvas.toDataURL('image/jpeg', quality));
          setIsCompressing(false);
        };
        img.onerror = () => {
          onChange(hdSource);
          setIsCompressing(false);
        };
        img.src = hdSource;
      } else {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          onChange(canvas.toDataURL('image/jpeg', quality));
          setIsCompressing(false);
        };
        img.onerror = () => {
          onChange(hdSource);
          setIsCompressing(false);
        };
        img.src = hdSource;
      }
    } else {
      setIsCompressing(false);
    }
  };

  // Handle local device file select
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      compressAndSetImage(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      compressAndSetImage(e.dataTransfer.files[0]);
    }
  };

  // WebRTC Camera Modal Controls
  const startCamera = async (mode = facingMode) => {
    setCameraError('');
    setCapturedPhoto(null);
    stopCameraStream();

    // Check WebRTC support
    if (!navigator?.mediaDevices?.getUserMedia) {
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        setCameraError('Live WebRTC camera stream is not supported over HTTP. Please select photo from device.');
        setIsCameraModalOpen(true);
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setCameraStream(stream);
      setIsCameraModalOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.warn('Camera stream error:', err);
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        setCameraError('Unable to open live camera stream. Use mobile native photo selector below.');
        setIsCameraModalOpen(true);
      }
    }
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const capturePhotoFromStream = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(photoUrl);
  };

  const confirmCapturedPhoto = () => {
    if (capturedPhoto) {
      compressAndSetImage(capturedPhoto);
      closeCameraModal();
    }
  };

  const closeCameraModal = () => {
    stopCameraStream();
    setIsCameraModalOpen(false);
    setCapturedPhoto(null);
    setCameraError('');
  };

  // Color theme helpers
  const themeClasses = {
    emerald: {
      ring: 'focus:ring-emerald-500/50 focus:border-emerald-500',
      activeTab: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
      border: 'border-emerald-500',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    amber: {
      ring: 'focus:ring-amber-500/50 focus:border-amber-500',
      activeTab: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
      border: 'border-amber-500',
      btn: 'bg-amber-500 hover:bg-amber-600 text-white',
      badge: 'bg-amber-100 text-amber-800'
    },
    blue: {
      ring: 'focus:ring-blue-500/50 focus:border-blue-500',
      activeTab: 'bg-blue-600 text-white shadow-md shadow-blue-600/20',
      border: 'border-blue-500',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white',
      badge: 'bg-blue-100 text-blue-800'
    },
    purple: {
      ring: 'focus:ring-purple-500/50 focus:border-purple-500',
      activeTab: 'bg-purple-600 text-white shadow-md shadow-purple-600/20',
      border: 'border-purple-500',
      btn: 'bg-purple-600 hover:bg-purple-700 text-white',
      badge: 'bg-purple-100 text-purple-800'
    },
    cyan: {
      ring: 'focus:ring-cyan-500/50 focus:border-cyan-500',
      activeTab: 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20',
      border: 'border-cyan-500',
      btn: 'bg-cyan-600 hover:bg-cyan-700 text-white',
      badge: 'bg-cyan-100 text-cyan-800'
    },
    optom: {
      ring: 'focus:ring-emerald-500/50 focus:border-emerald-500',
      activeTab: 'bg-slate-900 text-white shadow-md shadow-slate-900/20',
      border: 'border-slate-800',
      btn: 'bg-slate-900 hover:bg-slate-800 text-white',
      badge: 'bg-slate-100 text-slate-800'
    }
  }[accentColor] || {
    ring: 'focus:ring-emerald-500/50 focus:border-emerald-500',
    activeTab: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
    border: 'border-emerald-500',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    badge: 'bg-emerald-100 text-emerald-800'
  };

  const isBase64 = value && value.startsWith('data:');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        {value && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {isBase64 ? '📷 Device/Camera Image' : '🔗 Web URL Image'}
          </span>
        )}
      </div>

      {/* Hidden file inputs for local device and direct camera capture */}
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*" 
        onChange={handleFileChange}
        className="hidden" 
      />
      <input 
        type="file" 
        ref={cameraInputRef}
        accept="image/*" 
        capture="environment"
        onChange={handleFileChange}
        className="hidden" 
      />

      {/* Source Switcher Buttons (Local Device | Camera | Image URL) */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setActiveInputMode('upload');
            fileInputRef.current?.click();
          }}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
            activeInputMode === 'upload' ? themeClasses.activeTab : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Local Device</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveInputMode('camera');
            startCamera();
          }}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
            activeInputMode === 'camera' ? themeClasses.activeTab : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Camera</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveInputMode('url')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
            activeInputMode === 'url' ? themeClasses.activeTab : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Paste URL</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      {activeInputMode === 'upload' && (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
            isDragging 
              ? `${themeClasses.border} bg-emerald-50/50 scale-[1.01]` 
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
              {isCompressing ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-slate-700" />
              )}
            </div>
            <div className="text-xs font-bold text-slate-800">
              {isCompressing ? 'Processing Image...' : 'Click to Upload from Device or Drag & Drop'}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Supports PNG, JPG, WEBP, GIF (Auto-optimized)
            </p>
          </div>
        </div>
      )}

      {/* Camera Direct Quick Launcher (Shown when Camera tab active) */}
      {activeInputMode === 'camera' && (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs font-medium">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Capture Photo</div>
              <div className="text-[11px] text-slate-300">Take a photo using front or rear camera</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => startCamera()}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Open Camera</span>
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              title="Native Mobile Camera Picker"
            >
              Native
            </button>
          </div>
        </div>
      )}

      {/* URL Input Box (Shown when URL mode active) */}
      {activeInputMode === 'url' && (
        <div className="relative">
          <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="url"
            value={isBase64 ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 ${themeClasses.ring}`}
          />
        </div>
      )}

      {/* Preset Images Quick Selector (If provided) */}
      {presetImages && presetImages.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-500 block">Or Select Preset Image:</span>
          <div className="grid grid-cols-4 gap-2">
            {presetImages.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(imgUrl)}
                className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  value === imgUrl ? `${themeClasses.border} scale-105 shadow-sm` : 'border-slate-200 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Selected Image Preview Container */}
      {value && (
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 mt-2 shadow-sm group">
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            <img 
              src={value} 
              alt="Selected Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-xl bg-slate-950/80 hover:bg-rose-600 text-white transition-colors backdrop-blur-md border border-white/20 shadow-md"
              title="Remove Image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Image Ready</span>
          </div>
        </div>
      )}

      {/* WEBRTC CAMERA MODAL OVERLAY */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-lg w-full text-white shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Camera Modal Header */}
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live Camera Capture</h3>
                  <p className="text-[11px] text-slate-400">Position item in frame and take photo</p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCameraModal}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Display Body */}
            <div className="relative bg-black flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
              {cameraError ? (
                <div className="p-6 text-center space-y-4 max-w-sm">
                  <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {cameraError}
                  </p>
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Mobile Device Camera</span>
                  </button>
                </div>
              ) : capturedPhoto ? (
                <img 
                  src={capturedPhoto} 
                  alt="Captured Snapshot" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
              )}

              {/* Video Overlay Guides */}
              {!cameraError && !capturedPhoto && (
                <div className="absolute inset-0 border-2 border-white/20 pointer-events-none rounded-2xl m-4 flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-black/50 text-white/80 text-[10px] font-bold backdrop-blur-sm">
                    Vision Care Camera Preview
                  </span>
                </div>
              )}
            </div>

            {/* Camera Action Controls */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              {!cameraError && !capturedPhoto && (
                <>
                  <button
                    type="button"
                    onClick={toggleCameraFacing}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    title="Flip Camera (Front/Rear)"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={capturePhotoFromStream}
                    className="flex-1 py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </button>
                </>
              )}

              {capturedPhoto && (
                <>
                  <button
                    type="button"
                    onClick={() => setCapturedPhoto(null)}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake</span>
                  </button>

                  <button
                    type="button"
                    onClick={confirmCapturedPhoto}
                    className="flex-1 py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Use This Photo</span>
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ImageUploaderInput;
