
var Charity = {
  data: {},
  graph: []
};
// send states and counties through this so that it will send each individual county and individual state to the add_to_data_hash method
Charity.seperate_data_arrays = function(big_array, key_array) {
  var i = 0; 
  var max = big_array.length;
  for (; i<=max;){
    Charity.add_to_data_hash(key_array, big_array[i]);
    i = i + 1
  }
};

// adds data to large hash, send USA directly through this since it is only a single array, all other data should go through seperate_data_arrays first
Charity.add_to_data_hash = function(key_array, value_array){
  Charity.data = Charity.data || {};
  var temp_data = {};
  var i = 0;
  var max = key_array.length;
  for (; i < max;){
    temp_data[key_array[i]] = value_array[i];
    i = i + 1;
  }
  Charity.data[temp_data["match_name"]] = temp_data;
};

// // no longer used
// Charity.show_data = function(location, data_key){
//   return data[location][data_key]
// };

// // NO LONGE RUSED
// Charity.retrieve_data = function(abbrev){
//   for(var i in Charity.data){
//       if(Charity.data[i].match_name === abbrev){
//         return Charity.data[i].display_name;
//      }
//   }
// };

// creates data divs for all states
Charity.create_divs = function(){
  for(var i in Charity.data){
    $("#data-div").append("<div class='state-stats' id=\'"+Charity.data[i].match_name+"\'>"+"<h1><span class='state-names'>"+Charity.data[i].display_name+"</span></h1>"+"<h4 class='state-titles'>State's Total Charitable Contributions</h4><div class='state-numbers' id='total-contrib'>"+"$"+parseInt(Charity.data[i].tot_contrib).formatMoney(0)+"</div><h4 class='state-titles'>Avg Household Contribution</h4><div class='state-numbers'>"+"$"+parseInt(Charity.data[i].em_contrib).formatMoney(0)+"</div><h4 class='state-titles'>Avg Percent Household Income</h4><div class='state-numbers'>"+Charity.data[i].pctgiv+"</div></div>");
  }
};

//hides individual state ranking and data divs
Charity.hide_divs = function(){
  for(var i in Charity.data){
    $('#'+i).hide()
  }
  for(var i in Charity.data){
  $('#rank-'+i).hide()
  }
};

//creates states ranking div
Charity.create_ranks = function(){
  for(var i in Charity.data){
    var pctRank = Charity.data[i].rank_pctgiv.split("|");
    var contrRank = Charity.data[i].rank_em_contrib.split("|");
    $("#local-div").append("<div class='state-ranks' id=\'rank-"+Charity.data[i].match_name+"\'>"+"<h1><span class='state-names'>"+"Nationwide Rank"+"</span></h1>"+"<h4 class='averages' class='state-titles'>Average Household Contribution</h4><div class='rank-div' class='top-rank' ><div class='rank-text'>"+"#"+contrRank[0]+"</div></div><h4 class='last-averages' class='state-titles'>Average Percent Household Income</h4><div class='rank-div'><div class='rank-text'>"+"#"+pctRank[0]+"</div></div></div>");
  }
};

// next two methods find top 5 states by total given and add them to the top 5 div
Charity.create_top_totals = function(){
  var tot_hash = {};
  for(var i in Charity.data){
    if (parseInt(Charity.data[i].rank_tot_contrib) <=5){
      tot_hash[Charity.data[i].match_name]=Charity.data[i].rank_tot_contrib;
    }
  }
  Charity.top_totals_list(tot_hash);
};

Charity.top_totals_list = function(tot_hash){
  for(var i in tot_hash){
    switch (Charity.data[i].rank_tot_contrib){
      case "1|51":
        $('#total-1').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].tot_contrib).formatMoney(0))
        break;
      case "2|51":
        $('#total-2').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].tot_contrib).formatMoney(0))
        break;
      case "3|51":
        $('#total-3').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].tot_contrib).formatMoney(0))
        break;
      case "4|51":
        $('#total-4').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].tot_contrib).formatMoney(0))
        break;
      case "5|51":
        $('#total-5').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].tot_contrib).formatMoney(0))
        break;
    }
  }
};

// next two methods find top 5 states by avg household given and add them to the top 5 div
Charity.create_top_avg = function(){
  var tot_hash = {};
  for(var i in Charity.data){
    if (parseInt(Charity.data[i].rank_em_contrib) <=5){
      tot_hash[Charity.data[i].match_name]=Charity.data[i].rank_em_contrib;
    }
  }
  Charity.top_avg_list(tot_hash);
};

Charity.top_avg_list = function(tot_hash){
  for(var i in tot_hash){
    switch (Charity.data[i].rank_em_contrib){
      case "1|51":
        $('#average-1').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].em_contrib).formatMoney(0))
        break;
      case "2|51":
        $('#average-2').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].em_contrib).formatMoney(0))
        break;
      case "3|51":
        $('#average-3').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].em_contrib).formatMoney(0))
        break;
      case "4|51":
        $('#average-4').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].em_contrib).formatMoney(0))
        break;
      case "5|51":
        $('#average-5').html("<h3>" + Charity.data[i].display_name + ": $" + parseInt(Charity.data[i].em_contrib).formatMoney(0))
        break;
    }
  }
};

// next two methods find top 5 states by percent given and add them to the top 5 div
Charity.create_top_perc = function(){
  var tot_hash = {};
  for(var i in Charity.data){
    if (parseInt(Charity.data[i].rank_pctgiv) <=5){
      tot_hash[Charity.data[i].match_name]=Charity.data[i].rank_pctgiv;
    }
  }
  Charity.top_perc_list(tot_hash);
};


Charity.top_perc_list = function(tot_hash){
  for(var i in tot_hash){
    switch (Charity.data[i].rank_pctgiv){
      case "1|51":
        $('#percent-1').html("<h3>" + Charity.data[i].display_name + ": " + Charity.data[i].pctgiv)
        break;
      case "2|51":
        $('#percent-2').html("<h3>" + Charity.data[i].display_name + ": " + Charity.data[i].pctgiv)
        break;
      case "3|51":
        $('#percent-3').html("<h3>" + Charity.data[i].display_name + ": " + Charity.data[i].pctgiv)
        break;
      case "4|51":
        $('#percent-4').html("<h3>" + Charity.data[i].display_name + ": " + Charity.data[i].pctgiv)
        break;
      case "5|51":
        $('#percent-5').html("<h3>" + Charity.data[i].display_name + ": " + Charity.data[i].pctgiv)
        break;
    }
  }
};

// adds clicked state to graph array
Charity.add_to_graph = function(state){
  var obj = {};
    obj.name = state;
    obj.pctgiv = Charity.data[state].pctgiv;
    obj.total = parseInt(Charity.data[state].tot_contrib);
    obj.avg = parseInt(Charity.data[state].em_contrib);
    obj.avg = parseInt(Charity.data[state].em_contrib);
    if (obj.length >=1){
      svg.delete();
    };
  Charity.graph.push(obj);
  Plotter.plotData(Charity.graph);
  debugger;
};

// create state drop down form
Charity.create_state_form = function(states){
  var i =0, max = states.length;
  for (; i < max;){
    var state = states[i];
    var el = document.createElement("option");
    el.textContent = state;
    el.value = state;
    var sel = document.getElementById('state-list');
    sel.appendChild(el);
    i = i + 1;
  }
};

// create array of states for drop down form
Charity.list_of_states = function(){
  var states =[];
  for(var i in Charity.data){
     states.push(i);
   };
   states = states.sort();
   Charity.create_state_form(states);
};

// formats data numbers with commas for currency
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

// validates input of state
 // function validate()
 // {
 //   if( document.myForm.age.value == "" ||
 //     ( document.myForm.age.value ).isString? ||
 //     document.myForm.age.value.length <= 2 )
 //   {
 //     alert( "Please provide a zip in the format #####." );
 //     document.myForm.Zip.focus() ;
 //     return false;
 //   }
 //   return( true );
 // }



Charity.seperate_data_arrays(states, state_us_keys)
Charity.seperate_data_arrays(counties, county_keys)
Charity.add_to_data_hash(usa, state_us_keys)
