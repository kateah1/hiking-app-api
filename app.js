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
	.done(function(result) {
		var searchResults = showSearchResults(params, result.items.length);

		$(".search-results").html(searchResults);
		$.each(result.items, function(i, item) {
			var search = showTrails(item);
			$(".results").append(search);
		});
	})
	// waits for ajax to return with an error promise object
	.fail(function(jqXHR, error) {
		var errorElem = showError(error);
		$(".results").append(errorElem);
	});
};


// takes search object returned by Trail API request and returns new result to be appended to DOM
var showTrails = function(trail) {

	// clone result template code
	var result = $(".hidden .results").clone();

	// set the state property in result
	var stateElem = result.find(".selected-state");
	stateElem

	// set the city property in result
	var cityElem = result.find(".selected-city");
	cityElem

	// set the park property in result
	var parkElem = result.find(".selected-park");
	parkElem

	// set the distance property in result
	var distanceElem = result.find(".selected-distance");
	distanceElem

	return result;
};

// takes results object and returns number of results and criteria to be appended to DOM
var showSearchResults = function(criteria, resultNum) {
	var results = resultNum + ' results for ' + criteria;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error) {
	var errorElem = $(".error").clone();
	var errorElem.append("<p>" + error + "</p>");
};





});