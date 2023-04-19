const data = d3.range(100).map(() => ({
  x: Math.random() * 500,
  y: Math.random() * 500
}));


const svg = d3.select('svg');
const g = svg.append('g');

const circles = g.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('r', 3);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([0, 500]);
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([500, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);


g.append('g')
  .attr('transform', 'translate(0, 500)')
  .attr('class', 'x axis')
  .call(xAxis)
  .append('text')
  .attr('x', 250)
  .attr('y', 40)
  .attr('fill', '#333')
  .attr('text-anchor', 'middle')
  .text('X Axis');

g.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(0, 0)')
  .call(yAxis)
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -250)
  .attr('y', -40)
  .attr('fill', '#333')
  .attr('text-anchor', 'middle')
  .text('Y Axis');





d3.csv("titanic.csv").then(function(data) {

  var Groups = d3.range(0, 80, 10);
  var AgeData = Groups.map(function(d) {
    return {
      Range: d + "-" + (d + 10),
      count: 0
    };
  });

  data.forEach(function(d) {
    d.Age=+d.Age;
  });
  data.forEach(function(d) {
    AgeData.forEach(function(a) {
      if (d.Age >= a.Range.split("-")[0] && d.Age < a.Range.split("-")[1]) {
        a.count++;
      }
    });
  });
  



  var pie = d3.pie()
    .value(function(d) { return d.count; });
  var radius = Math.min(500, 500) / 2;
  var svg = d3.select('#pie')
    .append("g")
    .attr("transform", "translate(" + (500 / 2) + "," + (500 / 2) + ")");
  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
  var pieC = svg.selectAll("pieSlice")
    .data(pie(AgeData))
    .enter()
    .append("g");
  var color = d3.scaleOrdinal(d3.schemeSet3);
  pieC.append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) { return color(i); });
  pieC.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .text(function(d) { return d.data.Range});
});






