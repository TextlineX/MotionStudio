const effects = [['heatmap','热力','✦','blue'],['liquidMetal','金属','✧','silver'],['gemSmoke','烟雾','⌁','smoke']];

export default function EffectPicker({ effect, onChange }) {
  const description = effect === 'heatmap' ? 'Heatmap · 渐变辉光' : effect === 'liquidMetal' ? 'Liquid Metal · 镜面液态' : 'Gem Smoke · 宝石烟雾';
  return <section className="control-card effect-card"><h2>效果</h2><div className="effect-grid">{effects.map(([id,name,glyph,tone]) => <button key={id} className={`effect ${effect===id?'selected':''}`} onClick={() => onChange(id)}><i className={tone}>{glyph}</i><span>{name}</span></button>)}</div><p className="effect-hint">{description}</p></section>;
}
