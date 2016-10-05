	var data = [

	    {
	        'filter': 'Satisfaction with University of South Carolina',
	        'years': [{
	            'year': '2010',
	            'percentage': .65
	        }, {
	            'year': '2011',
	            'percentage': .70
	        }, {
	            'year': '2012',
	            'percentage': .80
	        }, {
	            'year': '2013',
	            'percentage': .85
	        }]
	    },

	    {
	        'filter': 'Commitment to the Institution',
	        'years': [{
	            'year': '2010',
	            'percentage': .60
	        }, {
	            'year': '2011',
	            'percentage': .65
	        }, {
	            'year': '2012',
	            'percentage': .75
	        }, {
	            'year': '2013',
	            'percentage': .80
	        }]
	    },

	    {
	        'filter': 'Understanding of Students',
	        'years': [{
	            'year': '2010',
	            'percentage': .42
	        }, {
	            'year': '2011',
	            'percentage': .59
	        }, {
	            'year': '2012',
	            'percentage': .59
	        }, {
	            'year': '2013',
	            'percentage': .69
	        }]
	    }
	];



	function init() {
	   
	    $.each(data, function(i, item) {

	        //Get the filter
	        var filter = item.filter;
	        console.log(filter);

	        var option = '<option value="' + filter + '">';
	        option += filter;
	        option += '</option>';
	        $('#theFilter').append(option);

	    });

        //Add a dummy plot to initialize the graph.
	    graph([{c: [{v: ' '}, {v: 0}, {v: "#b30000"}]}]);}


	function init_with_year() {
	    var selected = $('#theFilter').find(":selected").val();

	    var objs = [];


	    $.each(data, function(i, item) {

	        //Get the filter
	        var filter = item.filter;
	        console.log(filter);




	        //Get each year entry
	        $.each(item.years, function(k, item) {
	            var year = item.year;
	            var percentage = item.percentage;
	            /*
				var arr = $.map(item, function(el) { return el });
				entry_array.push(arr);
				console.log(arr);
				*/

	            var obj = {c: [{v: year}, {v: percentage}, {v: "#b30000"}]}
				
	            if (selected == filter) {
	                objs.push(obj);
	            }
	        });


	    });



	    /*			
			var data = [{'filter':'Made important contributions to our class','year':2015,'avg_mean':4.33},{'filter':'Was approachable','year':2015,'avg_mean':4.45}
			                ,{'filter':'Was an appropriate role model','year':2015,'avg_mean':4.09},
							 {'filter':'Was a valuable part of my University 101 experience','year':2015,'avg_mean':4.45},
							 {'filter':'Helped me make a successful transition to the University','year':2015,'avg_mean':4.67},
							 {'filter':'was a valuable resource','year':2015,'avg_mean':4.76},
							 {'filter':'Made important contributions to our class','year':2014,'avg_mean':3.33},{'filter':'Was approachable','year':2015,'avg_mean':3.45}
			                ,{'filter':'Was an appropriate role model','year':2014,'avg_mean':3.09},
							 {'filter':'Was a valuable part of my University 101 experience','year':2014,'avg_mean':3.45},
							 {'filter':'Helped me make a successful transition to the University','year':2014,'avg_mean':3.67},
							 {'filter':'was a valuable resource','year':2014,'avg_mean':3.76}]
							 
				*/


	    /*
						
			  $.each(data, function(i, item) {
				  
				 item_year = item.year;
				 
				 if(item_year == year){
					 //Then it will become an option in the select menu
					 var option = '<option value="' +item.avg_mean+'">';
					     option += item.filter;
						 option += '</option>';
				 }
				 
				 $('#theFilter').append(option);
			  
			  });
			  
			  */

	    //Rechart
	    graph(objs);

	}



	google.charts.load('current', {
	    'packages': ['corechart']
	});
	//Initialize the chart options for the current year
	google.charts.setOnLoadCallback(init);
	//Initialize the graph
	google.charts.setOnLoadCallback(graph);


	function graph(objs) {


	    var theOption = " ";

	    var theValue = $('#theFilter').find(":selected").val();

	    if (theValue != " ") {

	        theOption = $('#theFilter').find(":selected").text() + " (" + theValue + ") ";
	    }


	    var data = google.visualization.arrayToDataTable([
	        ["Element", "Percentage", {
	            role: "style"
	        }],
	        objs[0]
	    ]);

	    //Remove the first element of objs
	    objs.shift();
	    //Iterate the entry array and add each item to the data object

	    //Make the array dynamic
	    //data.Sf.push([2011, 70, '#b30000']);


	    $.each(objs, function(index, value) {
	        data.Tf.push(value);
	    });

	    var view = new google.visualization.DataView(data);
	    view.setColumns([0, 1, {
	            calc: "stringify",
	            sourceColumn: 1,
	            type: "string",
	            role: "annotation"
	        },
	        2
	    ]);

	    var options = {
	        title: $('#theFilter').find(":selected").val(),
	        width: '100%',
	        height: 550,
	        bar: {
	            groupWidth: "45%"
	        },
	        legend: {
	            position: "none"
	        },
	        vAxis: {
	            format: '#%',
	            viewWindowMode: 'explicit',
	            viewWindow: {
	                max: 1.0,
	                min: 0
	            },

	        }
	    };
	    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
	    chart.draw(view, options);
	}