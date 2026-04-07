'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from '@mui/icons-material/Check';

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File, previewUrl: string) => void;
}

type CameraState = 'requesting' | 'active' | 'captured' | 'denied' | 'error';

export default function CameraModal({ open, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraState, setCameraState] = useState<CameraState>('requesting');
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraState('requesting');
    setErrorMsg('');
    setCapturedUrl(null);
    setCapturedFile(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState('active');
    } catch (err: unknown) {
      stopStream();
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setCameraState('denied');
        setErrorMsg('Camera permission denied. Please allow camera access in your browser settings.');
      } else {
        setCameraState('error');
        setErrorMsg('Unable to access camera. Please check your device or browser settings.');
      }
    }
  }, [stopStream]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void startCamera();
    } else {
      stopStream();
      setCameraState('requesting');
      setCapturedUrl(null);
      setCapturedFile(null);
    }
    return () => {
      stopStream();
    };
  }, [open, startCamera, stopStream]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setCapturedUrl(url);
        setCapturedFile(file);
        setCameraState('captured');
        stopStream();
      },
      'image/jpeg',
      0.92
    );
  };

  const handleRetake = () => {
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedUrl(null);
    setCapturedFile(null);
    startCamera();
  };

  const handleUsePhoto = () => {
    if (capturedFile && capturedUrl) {
      onCapture(capturedFile, capturedUrl);
      onClose();
    }
  };

  const handleClose = () => {
    stopStream();
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: '#FFFFFF',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          color: '#1C1A16',
          borderBottom: '1px solid #ECEAE4',
          py: 2,
          px: 3,
        }}
      >
        Take a Photo
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: '#5A5750', '&:hover': { background: '#F4F2EE' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, background: '#000', position: 'relative', minHeight: 360 }}>
        {/* Video preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            display: cameraState === 'active' ? 'block' : 'none',
            maxHeight: 400,
            objectFit: 'cover',
          }}
        />

        {/* Canvas (hidden, used for snapshot) */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Captured image preview */}
        {cameraState === 'captured' && capturedUrl && (
          <Box
            component="img"
            src={capturedUrl}
            alt="Captured"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }}
          />
        )}

        {/* Loading / permission states */}
        {(cameraState === 'requesting' || cameraState === 'denied' || cameraState === 'error') && (
          <Box
            sx={{
              minHeight: 360,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              p: 4,
            }}
          >
            {cameraState === 'requesting' && (
              <>
                <CircularProgress sx={{ color: '#C8622A' }} />
                <Typography sx={{ color: '#9E9B93', fontFamily: 'Instrument Sans, sans-serif', fontSize: 14 }}>
                  Requesting camera access...
                </Typography>
              </>
            )}
            {(cameraState === 'denied' || cameraState === 'error') && (
              <>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#FDF1EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  📷
                </Box>
                <Typography
                  sx={{
                    color: '#5A5750',
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: 14,
                    textAlign: 'center',
                    maxWidth: 320,
                  }}
                >
                  {errorMsg}
                </Typography>
                {cameraState === 'error' && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={startCamera}
                    sx={{
                      borderColor: '#C8622A',
                      color: '#C8622A',
                      borderRadius: 8,
                      fontFamily: 'Instrument Sans, sans-serif',
                      '&:hover': { borderColor: '#C8622A', background: '#FDF1EB' },
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </>
            )}
          </Box>
        )}

        {/* Capture button overlay */}
        {cameraState === 'active' && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <IconButton
              onClick={handleCapture}
              sx={{
                width: 64,
                height: 64,
                background: '#FFFFFF',
                border: '3px solid #C8622A',
                '&:hover': { background: '#FDF1EB', transform: 'scale(1.05)' },
                transition: 'all 0.15s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <CameraAltIcon sx={{ color: '#C8622A', fontSize: 28 }} />
            </IconButton>
          </Box>
        )}
      </DialogContent>

      {cameraState === 'captured' && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: '1px solid #ECEAE4',
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <Button
            startIcon={<ReplayIcon />}
            onClick={handleRetake}
            variant="outlined"
            sx={{
              borderColor: '#ECEAE4',
              color: '#5A5750',
              borderRadius: 8,
              fontFamily: 'Instrument Sans, sans-serif',
              '&:hover': { borderColor: '#9E9B93', background: '#F4F2EE' },
            }}
          >
            Retake
          </Button>
          <Button
            startIcon={<CheckIcon />}
            onClick={handleUsePhoto}
            variant="contained"
            sx={{
              background: '#C8622A',
              borderRadius: 8,
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              px: 3,
              '&:hover': { background: '#b5561f' },
              boxShadow: 'none',
            }}
          >
            Use Photo
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
