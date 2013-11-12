$(document).ready(function(){

	$('#map').usmap({
		'stateStyles': {fill: '#7b91c4'},
		'stateHoverStyles': {fill: '#452f8c'},
		'showLabels': true,
  // The click action
	  click: function(event, data) {
	  	$('#clicked-state')
	  	.text('You clicked: '+ data.name)
	  	.parent().effect('highlight', {color: '#C7F464'}, 2000);
	  	Charity.retrieve_data(data.name)
	    // for(prop in Charity.data){
	    // 	if(Charity.data[prop].match_name === data.name){
	    // 	alert(prop);
	    // 	}
	    // }
	  	// Charity.data.forEach(function(element){
	  	// 	if(element.match_name === data.name){
	  	// 		alert("you found it");
	  	// 	}
	  	// });
		}
	})
});

