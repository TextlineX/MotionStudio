export default function RangeRow({ label, value, min, max, step = .01, unit = '', onChange }) {
  const text = unit ? `${value}${unit}` : Number(value).toFixed(step < 1 ? 2 : 0);
  return <label className="range-row"><span>{label}</span><div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/><b>{text}</b></div></label>;
}
