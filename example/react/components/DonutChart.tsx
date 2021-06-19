import React, { useEffect } from 'react'
import { arc, interpolate, select } from 'd3'
import { css } from '@emotion/react'

const FULL_CIRCLE = Math.PI * 2

type ChartOptions = {
  radius: number
  thickness: number
}

type DonutChartProps = {
  data: number
  options?: ChartOptions
}

const DonutChart: React.FC<DonutChartProps> = ({ data, options = {} }) => {
  const { radius = 50, thickness = 10 } = options
  const size = radius * 2 + 20

  const outsideArc = arc<number>()
    .innerRadius(radius - thickness)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(FULL_CIRCLE)

  useEffect(() => {
    const svg = select('#chart')
      .append('svg')
      .attr('width', size)
      .attr('height', size)

    const charts = svg
      .selectAll('g')
      .data([data])
      .enter()
      .append('g')
      .attr('transform', `translate(${size / 2}, ${size / 2})`)

    charts
      .append('path')
      .attr('class', 'outside-arc')
      .attr('d', outsideArc)
      .attr('fill', '#ebebeb')

    charts.append('path').attr('class', 'inside-arc').attr('fill', '#3674bc')
  }, [])

  useEffect(() => {
    var insideArcEl = select('#chart').selectAll('path.inside-arc').data([data])
    const insideArc = arc<number>()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .cornerRadius(10)
      .startAngle(0)
      .endAngle((d: number) => FULL_CIRCLE * (d / 100))

    insideArcEl
      .transition()
      .duration(800)
      .attrTween('d', (data) => {
        const i = interpolate(0, data)
        return (t: number) => insideArc(i(t))
      })
  }, [data])

  return (
    <div css={rootStyle}>
      <div id="chart"></div>
    </div>
  )
}

export default DonutChart

const rootStyle = css`
  padding: 32px;
`
