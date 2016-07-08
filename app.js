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
	$("#homepage-submit").click(function() {
		$(".results").show();
	})

	$("#find-hikes").click(function() {
		$(".results").show();
	})







});