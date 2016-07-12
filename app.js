'use strict'

$(document).ready(function() {

// pageload	
	$(".hidden-advanced").hide();
	$(".results").hide();

// show advanced search page	
	$("#advanced").click(function() {
		$(".homepage").hide();
		$(".hidden-advanced").show();
		$(".results").hide();
	})

// show homepage
	$(".fa-home").click(function() {
		$(".homepage").show();
		$(".hidden-advanced").hide();
		$(".results").hide();
	})

// show results page on submit
	$("#homepage-submit").click(function(e) {
		e.preventDefault();
		$(".results").show();
		$(".results").html('');
		getTrails();
	})

	$("#find-hikes").click(function(e) {
		e.preventDefault();
		$(".results").show();
		$(".results").html('');
		getTrails();
	})


// get hiking trails based on search values
var getTrails = function(criteria) {

	// parameters to pass in request to Trail API
	var params = {
		"q[activities_activity_name_cont]": $("#park").val(),
		"q[activities_activity_type_name_eq]": 'hiking',
		"q[city_cont]": $("#city").val(),
		"q[country_cont]": 'United States',
		"q[state_cont]": $("#state").val(),
		radius: $("#distance").val()
	};

	$.ajax({
    	url: 'https://trailapi-trailapi.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: params, // Additional parameters here
    	dataType: 'json',
    	success: function(data) {
    		console.log((data));
    		for(var i = 0; i < data.places.length; i++) {
    			$(".results").append("<h1>" + data.places[i].name + "</h1>");
    			$(".results").append("<h2>" + data.places[i].city + ", " + data.places[i].state + "</h2>");
    			$(".results").append("<p>" + data.places[i].description + "</p>");
    			$(".results").append("<p>" + "Directions: " + data.places[i].directions + "</p>");
    			$(".results").append("<a href=>" + data.places[i].activities[0].url + "</a>");
    		}
    	},
    	error: function(err) { alert(err); },
    	beforeSend: function(xhr) {
    		xhr.setRequestHeader("X-Mashape-Authorization", "QYyfJ0AJ55mshNE7Z8fXe8CIU4pQp1bT9bMjsnaTW8xTgmib0u"); // Enter here your Mashape key
    	}
	});

};

// takes results object and returns number of results and criteria to be appended to DOM
var showSearchResults = function(criteria, resultNum) {
	var results = resultNum + ' results for ' + criteria;
	return results;
};




});