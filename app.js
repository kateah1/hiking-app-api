'use strict'

$(document).ready(function() {

	$(".hidden-advanced").hide();

	$("#advanced").click(function() {
		$(".homepage").hide();
		$(".hidden-advanced").show();
	})

	$(".fa-home").click(function() {
		$(".homepage").show();
		$(".hidden-advanced").hide();
	})




});