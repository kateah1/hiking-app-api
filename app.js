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

	var park = $("#park").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var distance = $("#distance").val();

	// parameters to pass in request to Trail API
	var params = {
		q[activities_activity_name_cont]: park,
		q[activities_activity_type_name_eq]: 'hiking',
		q[city_cont]: city,
		q[country_cont]: 'United States',
		q[state_cont]: state,
		radius: distance,
	};

	$.ajax({
		url: "https://trailapi-trailapi.p.mashape.com/",
		data: params,
		dataType: "jsonp",
		type: "GET",
	})
	// waits for ajax to return with successful promise object
	.done(function(results) {

	})
	//waits for ajax to return with an error promise object
	.fail(function(jqXHR, error) {

	})
};

// append results based on search criteria
function results() {
	$(".results").append("<h1>Name of hiking trail</h1>");
	$(".results").append("<h2>Location of hiking trail</h2>");
	$(".results").append("<h3>Distance of hiking trail</h3>");
}






});