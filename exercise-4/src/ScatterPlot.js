// Scatterplot
import React from 'react';
import * as d3 from 'd3';
import d3tip from 'd3-tip';
import './ScatterPlot.css';

// Scatterplot component
var ScatterPlot = React.createClass({
    // Setup on mount
    componentDidMount () {
        this.setUp();
    },

    // Create static pieces of chart
    setUp () {
        // Set chart margin
        let margin = {
            left:70,
            bottom:100,
            top:50,
            right:50,
        };

        // Height/width of the drawing area itself
        this.chartHeight = this.props.height - margin.bottom - margin.top;
        this.chartWidth = this.props.width - margin.left - margin.right;

        // Create wrapper svg
        this.svg = d3.select(this.root)
            .append('svg')
            .attr('height', this.props.height)
            .attr('width', this.props.width);

        // Create g in which to put visual markers
        this.g = this.svg.append('g')
				.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
				.attr('height', this.chartHeight)
				.attr('width', this.chartWidth);

        // Define an xAxis and yAxis function
        this.xAxis = d3.axisBottom();
        this.yAxis = d3.axisLeft();

        // Append a G element to show each axis
        this.xAxisG = this.svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (this.chartHeight + margin.top) + ')')
            .attr('class', 'axis');

        this.yAxisG = this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

        // Add a title g for the x axis
        this.xAxisTitle = this.svg.append('text')
            .attr('transform', 'translate(' + (margin.left + this.chartWidth/2) + ',' + (this.chartHeight + margin.top + 40) + ')')
            .attr('class', 'title')

        // Add a title g for the y axis
        this.yAxisTitle = this.svg.append('text')
            .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + this.chartHeight/2) + ') rotate(-90)')
            .attr('class', 'title');

        // Add hover
        this.tip = d3tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong>" + d.id + "</strong>";
                  })
        this.svg.call(this.tip);
        // Update points
        this.update();
    },
    setScales() {
        // Calculate x and y scales
        let xMax = d3.max(this.props.data, function(d){return +d.x})*1.05;
        let xMin = d3.min(this.props.data, function(d){return +d.x})*.85;
        this.xScale = d3.scaleLinear().range([0, this.chartWidth]).domain([xMin, xMax]);

        var yMin = d3.min(this.props.data, function(d){return +d.y})*.9;
        var yMax = d3.max(this.props.data, function(d){return +d.y})*1.05;
        this.yScale = d3.scaleLinear().range([this.chartHeight, 0]).domain([yMin, yMax]);

        // Update axes
        this.xAxis.scale(this.xScale);
        this.xAxisG.transition().duration(1000).call(this.xAxis);
        this.yAxis.scale(this.yScale);
        this.yAxisG.transition().duration(1000).call(this.yAxis);
    },
    update() {
        this.setScales();

        let circles = this.g.selectAll('circle').data(this.props.data, (d) => d.id);
        console.log('circles ', circles)
        // Use the .enter() method to get your entering elements, and assign initial positions
	  	circles.enter().append('circle')
			.attr('fill', 'blue')
			.attr('cy', this.chartHeight)
			.style('opacity', .3)
			.attr('cx', (d) => this.xScale(d.x))
            .on('mouseover', this.tip.show)
            .on('mouseout', this.tip.hide)
            .attr('r', 6)
            .transition()
			.duration(1500)
            .delay((d) => this.xScale(d.x) * 5)
            .ease(d3.easeBounceIn)
            .attr('cy', (d) => this.yScale(d.y))

        // Transition properties of the + update selections
        circles
            .attr('r', function(d) {
                return d.id.toLowerCase().match(this.props.search) !== null ? 6 : 1
            }.bind(this))
			.transition()
            .ease(d3.easeExpIn)
			.duration(1500)
            .delay((d) => this.xScale(d.x) * 5)
            .attr('cx', (d) => this.xScale(d.x))
            .attr('cy', (d) => this.yScale(d.y))

        circles.style("color",'green')

        // Use the .exit() and .remove() methods to remove elements that are no longer in the data
		circles.exit().remove();

        // Update titles
        this.xAxisTitle.text(this.props.titles.x)
        this.yAxisTitle.text(this.props.titles.y)

    },

    // Update on new props
    componentWillReceiveProps (props){
        this.props = props;
        this.update();
    },

	render() {
		// Return links and show anything inside the <App> component (children)
		return (

            <div width={this.props.width}
                height={this.props.height}
                ref={(node) => { this.root = node;}} />
		);
	}
});

export default ScatterPlot;
