const download = (blob, name) => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url); };
export class ExportManager {
  constructor(canvas) { this.canvas = canvas; }
  png() { this.canvas.toBlob(blob => blob && download(blob, 'shader-logo.png'), 'image/png'); }
  video(seconds = 4) { return new Promise((resolve, reject) => { const stream = this.canvas.captureStream(60); const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' }); const chunks = []; recorder.ondataavailable = e => e.data.size && chunks.push(e.data); recorder.onstop = () => { download(new Blob(chunks, { type: 'video/webm' }), 'shader-logo.webm'); resolve(); }; recorder.onerror = reject; recorder.start(); setTimeout(() => recorder.stop(), seconds * 1000); }); }
  reactComponent(settings) { const props = JSON.stringify(settings, null, 2); const source = `import ShaderLogo from './components/ShaderLogo';\n\nexport default function ExportedShaderLogo() {\n  const settings = ${props};\n  return <ShaderLogo settings={settings} />;\n}\n`; download(new Blob([source], { type: 'text/javascript' }), 'ShaderLogo.jsx'); }
}
