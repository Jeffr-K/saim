import React from 'react';
import Svg, { G, Line, Polygon, Circle, Text as SvgText } from 'react-native-svg';

type RadarDatum = {
  label: string;
  value: number; // 0~100
};

interface RadarChartProps {
  size?: number; // px
  data: RadarDatum[]; // clockwise
  levels?: number; // grid rings
  color?: string; // primary stroke/fill
  labelColor?: string;
}

export function RadarChart({
  size = 220,
  data,
  levels = 4,
  color = '#567cf9',
  labelColor = '#7e82a0',
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) - 16; // padding
  const angleStep = (Math.PI * 2) / data.length;

  const polarToCartesian = (value: number, index: number, r: number) => {
    const angle = -Math.PI / 2 + index * angleStep; // start at top
    const v = (value / 100) * r;
    return {
      x: cx + v * Math.cos(angle),
      y: cy + v * Math.sin(angle),
    };
  };

  const ringPolygons: string[] = [];
  for (let lvl = 1; lvl <= levels; lvl += 1) {
    const r = (radius / levels) * lvl;
    const pts = data
      .map((_, i) => polarToCartesian(100, i, r))
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
    ringPolygons.push(pts);
  }

  const valuePoints = data
    .map((d, i) => polarToCartesian(d.value, i, radius))
    .map((p) => `${p.x},${p.y}`)
    .join(' ');

  return (
    <Svg width={size} height={size}>
      <G>
        {/* grid rings */}
        {ringPolygons.map((pts, idx) => (
          <Polygon key={`ring-${idx}`} points={pts} fill="none" stroke="#d7d8e2" strokeWidth={1} />
        ))}
        {/* axes */}
        {data.map((_, i) => {
          const end = polarToCartesian(100, i, radius);
          return <Line key={`axis-${i}`} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#e3e5ec" strokeWidth={1} />;
        })}
        {/* value polygon */}
        <Polygon points={valuePoints} fill={color + '33'} stroke={color} strokeWidth={2} />
        {/* nodes */}
        {data.map((d, i) => {
          const p = polarToCartesian(d.value, i, radius);
          return <Circle key={`dot-${i}`} cx={p.x} cy={p.y} r={3} fill={color} />;
        })}
        {/* labels */}
        {data.map((d, i) => {
          const p = polarToCartesian(110, i, radius); // slightly outside
          return (
            <SvgText
              key={`lab-${i}`}
              x={p.x}
              y={p.y}
              fill={labelColor}
              fontSize={12}
              fontWeight="500"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {d.label}
            </SvgText>
          );
        })}
      </G>
    </Svg>
  );
}


