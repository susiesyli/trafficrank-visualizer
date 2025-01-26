// const data = [
//     {
//       iteration: 0,
//       ranks: [ /* your data for iteration 0 */ ]
//     },
//     {
//       iteration: 1,
//       ranks: [ /* your data for iteration 1 */ ]
//     },
//     // Add more iterations here
//   ];

  fetch('data/traffic.json')
  .then(response => response.json())
  .then(data => {
    const rankHistory = data;  // Assuming the data format is already structured as rankHistory
   
  
  const width = 800;
  const height = 600;
  
  // Create an SVG element to display the graph
  const svg = d3.select('#graph');
  
  // Set up scales for positioning nodes
  const xScale = d3.scaleLinear().domain([0, data[0].ranks.length - 1]).range([50, width - 50]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);
  
  // Create nodes and edges (for simplicity, only use the ranks as nodes)
  const nodes = data[0].ranks.map((rank, index) => ({
    id: index,
    rank: rank,
    x: xScale(index),
    y: yScale(rank)
  }));
  
  // Add node elements to the SVG
  const nodeElements = svg.selectAll('.node')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', 10)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .style('fill', d => d3.interpolateBlues(d.rank)); // Color based on rank
  
  // Set up slider functionality
  d3.select('#iteration').on('input', function(event) {
    const iteration = event.target.value;
    updateNodes(parseInt(iteration));
  });
  
  function updateNodes(iteration) {
    const newRanks = data[iteration].ranks;
    
    nodes.forEach((node, index) => {
      node.rank = newRanks[index];
      node.y = yScale(node.rank);
    });
    
    nodeElements.transition()
      .duration(500)
      .attr('cy', d => d.y)
      .style('fill', d => d3.interpolateBlues(d.rank));
  }
  