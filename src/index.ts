import { arc, interpolate, select } from 'd3'

const dataset = [88]
const CHART_WIDTH = 116
const CHART_HEIGHT = 116
const CHART_RADIUS = 50
const FULL_CIRCLE = Math.PI * 2

const outsideArc = arc<number>()
  .innerRadius(CHART_RADIUS - 10)
  .outerRadius(CHART_RADIUS)
  .startAngle(0)
  .endAngle(FULL_CIRCLE)

const insideArc = arc<number>()
  .innerRadius(CHART_RADIUS - 10)
  .outerRadius(CHART_RADIUS)
  .cornerRadius(10)
  .startAngle(0)
  .endAngle((d: number) => FULL_CIRCLE * (d / 100))

const svg = select('#chart')
  .append('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT)

const charts = svg
  .selectAll('g')
  .data(dataset)
  .enter()
  .append('g')
  .attr('transform', `translate(${CHART_WIDTH / 2}, ${CHART_HEIGHT / 2})`)

charts.append('path').attr('d', outsideArc).attr('fill', '#ebebeb')
charts
  .append('path')
  .attr('fill', '#3674bc')
  .transition()
  .duration(800)
  .attrTween('d', (data) => {
    const i = interpolate(0, data)
    return (t: number) => insideArc(i(t))
  })
