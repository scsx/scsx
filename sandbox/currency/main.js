var theAmount = 0;
var theAmountCollectable = 0;
var country = "pt";

$("#calc").click(function(){
	theAmount = $("#amount").val();
	calculateIncome();
});

function calculateNet(grossYear) {
	
	switch(true) {
		case (country == "de"):
			grossYear = grossYear - (grossYear * .42);
			$(".taxes tr.rate td:eq(7)").addClass("selected");
			break;
		case (grossYear < 7091 ):
			grossYear = grossYear - (grossYear * .145);
			$(".taxes tr.rate td:eq(0)").addClass("selected");
			break;
		case (grossYear < 10700 ):
			grossYear = grossYear - (grossYear * .23);
			$(".taxes tr.rate td:eq(1)").addClass("selected");
			break;
		case (grossYear < 20261 ):
			grossYear = grossYear - (grossYear * .28);
			$(".taxes tr.rate td:eq(2)").addClass("selected");
			break;
		case (grossYear < 25000 ):
			grossYear = grossYear - (grossYear * .35);
			$(".taxes tr.rate td:eq(3)").addClass("selected");
			break;
		case (grossYear < 36856 ):
			grossYear = grossYear - (grossYear * .37);
			$(".taxes tr.rate td:eq(4)").addClass("selected");
			break;
		case (grossYear < 80640 ):
			grossYear = grossYear - (grossYear * .45);
			$(".taxes tr.rate td:eq(5)").addClass("selected");
			break;
		case (grossYear >= 80640 ):
			grossYear = grossYear - (grossYear * .48);
			$(".taxes tr.rate td:eq(6)").addClass("selected");
			break;
		default:
			grossYear = "Error";
	}
	grossYear = grossYear / 12;
	return grossYear;
	
}
function roundToCents(value) {
	value = Math.round(value * 100) / 100;
	return value;
}

function splitValues() {

	theAmount = roundToCents(theAmount);
	
	if($('#de').is(':checked')) {
		country = "de";
		$(".taxes tr.country td:eq(1)").addClass("selected");
	} else {
		country = "pt";
		$(".taxes tr.country td:eq(0)").addClass("selected");
	}
	
	if($('#timeYear').is(':checked')) {
		$("p.money.month14").text( roundToCents(theAmount / 14)  + "€");
		$("p.money.month12").text( roundToCents(theAmount / 12)  + "€");
		$("p.money.year").text(roundToCents(theAmount) + "€");
		$("p.money.net12").text( roundToCents(calculateNet(theAmount)) + "€");
	} else {
		$("p.money.month14").text( roundToCents(theAmount) + "€" + "(+ 2x)");
		$("p.money.month12").text( roundToCents(theAmount) + "€");
		$("p.money.year").text( roundToCents(theAmount * 12) + "€");
		$("p.money.net12").text( roundToCents(calculateNet(theAmount * 12)) + "€");
	}
	$(".result").slideDown(300);
}


function calculateIncome() {
	var theCurrencyOperation = $('input[name=radiosCurrency]:checked').val() + "_EUR";
	$(".taxes td").removeClass("selected");
	if ( theCurrencyOperation != "EUR_EUR") {
		$.ajax({
			type: 'GET',
			url: 'https://free.currencyconverterapi.com/api/v5/convert?q=' + theCurrencyOperation + '&compact=y',
			contentType: 'text/plain',
			xhrFields: {
				withCredentials: false
			},
			headers: {
			},
			success: function (data) {
				if ( theCurrencyOperation === "USD_EUR") {
					theAmount = theAmount * data.USD_EUR.val;
					console.log("USD OK");
				} else {
					theAmount = theAmount * data.GBP_EUR.val;
					console.log("GBP OK");
				}
				splitValues();
			},
			error: function () {
				console.log("DB Error. Please, try reloading the page.");
			}
		});
	} else {
		splitValues();
	}
}


$("#reset").click(function(){
	$(".result").slideUp(300);
	$("input#amount").val("");
	$("#currEuro, #timeYear").prop("checked", true);
});




/*

$(document).ready(function(){
});
*/















