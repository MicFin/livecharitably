$(document).ready(function(){
	
	Charity.create_divs();
	Charity.create_ranks();
	$('#map').hide();
	$('#top').hide();
	$('#average').hide();
	$('#percent').hide();
	
	Charity.hide_divs();

	Charity.create_top_totals();

	Charity.create_top_avg();

	Charity.create_top_perc();

	$('#submit-button').click(function(event) {
		$('#map').show(1500);
		$('#top').show();
		$('#average').show();
		$('#percent').show();
		event.preventDefault();
		var age = $( "#age" ).val();
		var state = $( "#state" ).val();
		$('#'+state).show();
		$('#rank-'+state).show();
		$('#form').hide();
});


	$('#map').usmap({
		'stateStyles': {fill: '#7b91c4'},
		'stroke-width': 200,
		'stateHoverStyles': {fill: '#452f8c'},

	  click: function(event, data) {
	  	Plotter.removeData();
	  	Charity.add_to_graph(data.name);

	  	// $('#clicked-state')
	  	// .parent().effect('highlight', {color: '#C7F464'}, 2000);
		},

		mouseover: function(event, data){
			Charity.hide_divs();
			$('#'+data.name).show();
			$('#rank-'+data.name).show();
		}
	});



});

