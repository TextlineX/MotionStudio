import { useRef, useState } from 'react';
import ShaderLogo from './components/ShaderLogo';
import EffectPicker from './components/EffectPicker';
import RangeRow from './components/RangeRow';
import { ExportManager } from './engine/ExportManager';

const defaults = { effect:'gemSmoke', speed:1, scale:.6, rotation:0, offsetX:0, offsetY:0, contour:.52, softness:.16, repetition:2.2, distortion:.2, shiftRed:.28, shiftBlue:.24, angle:24, innerDistortion:.82, outerDistortion:.68, innerGlow:.64, outerGlow:.55, smokeOffset:.08, size:.86 };
const motion = [['速度','speed',0,2,.1],['缩放','scale',.25,1,.05],['旋转','rotation',-180,180,1,'°'],['水平偏移','offsetX',-1,1,.05],['垂直偏移','offsetY',-1,1,.05]];
const metal = [['轮廓','contour',0,1],['柔化','softness',.01,.6],['重复','repetition',.5,6],['扭曲','distortion',0,1],['红色偏移','shiftRed',0,1],['蓝色偏移','shiftBlue',0,1],['角度','angle',-180,180,1,'°']];
const smoke = [['内部扭曲','innerDistortion',0,1],['外部扭曲','outerDistortion',0,1],['烟雾偏移','smokeOffset',0,1],['烟雾大小','size',.2,1.5]];
function IconButton({ label, children, onClick }) { return <button className="icon-button" aria-label={label} onClick={onClick}>{children}</button>; }

export default function App() {
  const [settings, setSettings] = useState(defaults); const [file, setFile] = useState(null); const defaultLogo = '/mh.svg'; const [exporting, setExporting] = useState(false); const rendererRef = useRef(null);
  const update = key => value => setSettings(current => ({ ...current, [key]: value }));
  const exportFile = type => { const api = new ExportManager(rendererRef.current.canvas); if (type === 'png') api.png(); else if (type === 'react') api.reactComponent(settings); else { setExporting(true); api.video().finally(() => setExporting(false)); } };
  const parameters = settings.effect === 'liquidMetal' ? metal : smoke;
  return <main className="app-shell">
    <section className="canvas-area" aria-label="动画预览"><header className="topbar"><button className="brand"><span className="brand-mark">⌁</span><strong>loqo animations</strong><span className="chevron">⌄</span></button><button className="fit-button">自适应 <span>⌄</span></button></header><ShaderLogo settings={settings} imageFile={file} defaultLogo={defaultLogo} rendererRef={rendererRef}/><div className="stage-label">WebGL2 · React 重构预览</div></section>
    <aside className="control-panel"><header className="panel-header"><h1>设置</h1><div><IconButton label="重置设置" onClick={() => setSettings(defaults)}>↶</IconButton><IconButton label="导出 PNG" onClick={() => exportFile('png')}>⇩</IconButton><IconButton label="导出 WebM" onClick={() => exportFile('webm')}>{exporting ? '…' : '◉'}</IconButton></div></header><div className="panel-scroll">
      <EffectPicker effect={settings.effect} onChange={update('effect')}/>
      <section className="upload-card"><label className="upload"><input type="file" accept="image/png,image/svg+xml" onChange={event => setFile(event.target.files?.[0] || null)}/><span>▧&nbsp; 上传标志</span><small>（PNG / SVG）</small></label>{file && <p>{file.name}</p>}</section>
      <section className="control-card"><h2>运动</h2>{motion.map(([label,key,min,max,step,unit]) => <RangeRow key={key} label={label} value={settings[key]} min={min} max={max} step={step} unit={unit || ''} onChange={update(key)}/>)}</section>
      <section className="control-card"><h2>{settings.effect === 'liquidMetal' ? 'Liquid Metal' : 'Smoke / Heatmap'} 参数</h2>{parameters.map(([label,key,min,max,step,unit]) => <RangeRow key={key} label={label} value={settings[key]} min={min} max={max} step={step || .01} unit={unit || ''} onChange={update(key)}/>) }<RangeRow label="内部辉光" value={settings.innerGlow} min={0} max={1.5} onChange={update('innerGlow')}/><RangeRow label="外部辉光" value={settings.outerGlow} min={0} max={1.5} onChange={update('outerGlow')}/></section>
      <section className="export-card"><h2>导出</h2><button onClick={() => exportFile('png')}>下载 PNG</button><button onClick={() => exportFile('webm')} disabled={exporting}>{exporting ? '正在录制 4 秒…' : '导出 WebM（4 秒）'}</button><button className="react-export" onClick={() => exportFile('react')}>导出 React</button></section>
    </div></aside>
  </main>;
}
