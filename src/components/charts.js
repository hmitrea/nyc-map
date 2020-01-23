import React from 'react';
import { charts } from '../style';

import {
  VerticalBarSeries,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

export default function Charts({
  all
}) {
  return <div style={charts}>
    <h2>Type of {all.selectedIndex}</h2>
    </div>
  if (! all.data.trees) return null
  let data = all.data.trees.map(d => {
    let color = '#125C77';
    //console.log(d)
    color = 'pink'
    return { ...d, color };
  });

  return (<div style={charts}>
    <h2>Type of trees</h2>
    <XYPlot
      margin={{ left: 40, right: 25, top: 10, bottom: 25 }}
      height={140}
      width={480}
      yDomain={[0, 1000]}
      onMouseLeave={() => highlight(null)}
    >
      <YAxis
        tickFormat={d => (d / 100).toFixed(0) + '%'}
      />
      <VerticalBarSeries
        colorType="literal"
        data={data}
        onValueMouseOver={d => highlight(d.hour)}
        onValueClick={d => select(d.hour)}
        style={{ cursor: 'pointer' }}
      />
      <XAxis
        tickFormat={h => (h % 24) >= 12 ?
          (h % 12 || 12) + 'PM' :
          (h % 12 || 12) + 'AM'
        }
        tickSizeInner={0}
        tickValues={[0, 6, 12, 18, 24]}
      />
    </XYPlot>
  </div>);
}
