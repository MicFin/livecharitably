$(document).ready(function(){
	Charity.list_of_states();
	Charity.create_divs();
	Charity.create_ranks();
	$('#navbar').hide();
	$('#map').hide();
	$('#top').hide();
	$('#average').hide();
	$('#percent').hide();
	$('#graph-title').hide();

	Charity.hide_divs();

	Charity.create_top_totals();

	Charity.create_top_avg();

	Charity.create_top_perc();

	$('#submit-button').click(function(event) {
		$('#navbar').show();
		$('#map').show(1500);
		$('#top').show();
		$('#average').show();
		$('#percent').show();
		$('#intro').hide();
		event.preventDefault();
		var state = $( "#state-list" ).val();
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
	  	$('#graph-title').show();
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

