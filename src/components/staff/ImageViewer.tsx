import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Fullscreen,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { BsFullscreenExit } from "react-icons/bs";
interface Image {
  src: string;
  alt: string;
}
interface Props {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
  showThumbnails: boolean;
  showControls: boolean;
  enableZoom: boolean;
  enableFullscreen: boolean;
}
const ImageViewer: React.FC<Props> = ({
  images = [],
  initialIndex = 0,
  onClose,
  showThumbnails = true,
  showControls = true,
  enableZoom = true,
  enableFullscreen = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
    setIsZoomed(false);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
    setIsZoomed(false);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!onClose) return;

      switch (e.key) {
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen?.();
            setIsFullscreen(false);
          } else {
            onClose();
          }
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, goToNext, goToPrevious, isFullscreen, onClose]);

  const toggleZoom = () => {
    if (enableZoom) {
      setIsZoomed(!isZoomed);
    }
  };

  const toggleFullscreen = () => {
    if (!enableFullscreen) return;

    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false);
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center text-white text-xl">
        <p>No images to display</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 bg-black/50 bg-opacity-90 flex flex-col z-50 ${
        isFullscreen ? "bg-black/50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-70 z-10">
        <div className="flex flex-col gap-1">
          <span className="text-sm opacity-80">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage.alt && (
            <span className="text-base font-medium">{currentImage.alt}</span>
          )}
        </div>
        <div className="flex gap-2">
          {enableFullscreen && (
            <button
              className="bg-opacity-10 border-none text-white p-2 rounded cursor-pointer text-lg hover:bg-opacity-20 transition-all"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <BsFullscreenExit /> : <Fullscreen />}
            </button>
          )}
          {onClose && (
            <button
              className=" border-1 h-10 w-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-white/50 transition-all"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <X />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center relative p-8">
        {showControls && images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeftCircle size={40} />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRightCircle size={40} />
            </button>
          </>
        )}

        <div
          className={`relative max-w-[90%] max-h-[90%] flex items-center justify-center transition-transform duration-300 cursor-zoom-in ${
            isZoomed ? "cursor-zoom-out" : ""
          } ${!imageLoaded ? "opacity-0" : "opacity-100"}`}
          onClick={toggleZoom}
        >
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt || `Image ${currentIndex + 1}`}
            onLoad={handleImageLoad}
            loading="eager"
            className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150 cursor-grab" : ""
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="animate-pulse">Loading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="p-4 bg-black bg-opacity-70 overflow-x-auto">
          <div className="flex gap-2 justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                className={`w-16 h-16 border-2 rounded overflow-hidden cursor-pointer opacity-60 transition-all hover:opacity-80 ${
                  index === currentIndex
                    ? "opacity-100 border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="p-4 bg-black bg-opacity-70 flex justify-center">
        <div className="flex gap-2">
          {enableZoom && (
            <button
              className=" bg-opacity-10 border-none text-white p-2 rounded cursor-pointer hover:bg-opacity-20 transition-all"
              onClick={toggleZoom}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut /> : <ZoomIn />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
