// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {

  // Select the element with id `sandbox` and append a `div` element to it. Make sure to store the div in a JavaScript varaible
  var appendDiv = d3.select("#sandbox").append("div").attr('id', 'my-div');

  // Create a variable `mySvg` by appending an `svg` element to your newly created `div`
  var mySvg = appendDiv.append("svg");

  // Set both the width and height attributes of your `svg` to 300 
  mySvg.attr('height', 300)
  	.attr('width', 300);

  // Append a `circle` element to your `svg`, setting the properties noted in index.html
  mySvg.append("circle")
	.attr("r", 30)
	.attr("cx", 75)
	.attr('cy', 30)
	.style('opacity', .5)
	.style('fill', 'blue');

  // Append a `rect` element to your `svg`, setting the properties noted in index.html
  mySvg.append("rect")
	.attr("r", 30)
	.attr("x", 70)
	.attr('y', 60)
	.attr('height', 250)
	.attr('width', 10)
	.style('opacity', .5)
	.style('fill', 'orange');
});
