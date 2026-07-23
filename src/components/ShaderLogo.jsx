import { useEffect, useRef } from 'react';
import { PaperShaderRenderer } from '../engine/PaperShaderRenderer';

export default function ShaderLogo({ settings, imageFile, rendererRef }) {
  const canvasRef = useRef(null);
  useEffect(() => { const renderer = new PaperShaderRenderer(canvasRef.current); rendererRef.current = renderer; return () => renderer.dispose(); }, [rendererRef]);
  useEffect(() => rendererRef.current?.setValues(settings), [settings, rendererRef]);
  useEffect(() => { if (imageFile) rendererRef.current?.loadImage(imageFile); }, [imageFile, rendererRef]);
  return <canvas ref={canvasRef} className="shader-canvas" aria-label="Shader 动画实时预览"/>;
}
