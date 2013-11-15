
var Plotter = {

	removeData: function(){
		d3.select('#current').remove('');
	},

	plotData: function(data){
		// from cdn repo. now in d3 code
		// heightRange is smaller than h in order to make graph not go to very top
		var heightRange=450, h = 500, w = 500, dataLength = data.length, barWidth = w/dataLength;
		svg = d3.select('#graphs')
			.append('svg')
			.attr('height',h)
			.attr('width', w)
			.attr('id', "current")
			.style('border','2px solid black'),
		height = d3.scale
			.linear()
			.domain(Plotter.householdDomain(data))
			.range([0, heightRange]);

		// var colorScale = d3.scale
		// 	.linear()
		// 	.domain(Plotter.householdDomain(data))
		// 	.range([0, 255]);

			svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', function(d, i){
				return (w/dataLength+5)* i;
			})
			.attr('y', function(d, i){
				return h - height(d.avg);
			})
			.attr('height', function(d, i){
				return height(d.avg);
			})
			.attr('width', barWidth)
			.style('fill', '#e80c2c'

				// function(d,i){
				// var c = colorScale(d.volume);
				// return "rgb("+c+","+c+","+c+")";}
				);
			// .on('mouseenter', function(d,i){
			// 	// passing volume function
			// 	$("#current-volume").text("$" + Number(d.avg) + "per coin");
			// 	// changes color when mouse is over
			// 	d3.select(this)
			// 	// transition must come before action
			// 	.transition()
			// 	.duration(50)
			// 	.style('fill', 'pink')
			// 	// changes height on mouseover
			// 	.attr('height', function(d,i){
			// 		return height(d.avg) + 40;
			// 	})
			// 	.attr('y', function(d,i){
			// 		return h - height(d.avg) - 40;
			// 	})

			// })
			// // changes back to black after unhover
			// .on('mouseleave', function(){
			// 	d3.select(this)
			// 	.transition()
			// 	.duration(500)
			// 	.style('fill', 'black')
			// 	.attr('height', function(d,i){
			// 		return height(d.avg);
			// 	})
			// 	.attr('y', function(d,i){
			// 		return h - height(d.avg);
			// 	})
			// })
	},

	householdDomain: function(data) {
		// arbitrary values to start comparison
		var min=data[0].avg, max = min;
		// selecting data as a jquery function
		// iterates through to set true max and min
		$(data).each(function(index, state) {
			if(state.avg < min) {
				min = state.avg;
			}
			if(state.avg > max){
				max = state.avg
			}
		});

		return [min, max];
	}

}