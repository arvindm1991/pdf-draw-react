import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth - 100, // Account for toolbar
        height: window.innerHeight,
        isDrawingMode: false
      });

      // Set drawing brush properties
      if (fabricCanvasRef.current.freeDrawingBrush) {
        fabricCanvasRef.current.freeDrawingBrush.width = 5;
        fabricCanvasRef.current.freeDrawingBrush.color = 'red';
      }

      const handleResize = () => {
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.setDimensions({
            width: window.innerWidth - 100,
            height: window.innerHeight
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        fabricCanvasRef.current?.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, []);

  const toggleDrawing = () => {
    const newDrawingState = !isDrawing;
    setIsDrawing(newDrawingState);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = newDrawingState;
    }
  };

  return (
    <div className="app-container">
      <div className="toolbar">
        <button onClick={toggleDrawing} className={isDrawing ? 'active' : ''}>
          <span className="icon">✏️</span>
          Drawing Tool
        </button>
      </div>
      <div className="viewer-container">
        {/* PDF Layer */}
        <div className="pdf-layer">
          <iframe 
            src="https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true" 
            width="100%" 
            height="100%" 
            frameBorder="0">
          </iframe>
        </div>
        {/* Canvas Layer */}
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>
    </div>
  );
}

export default App;
