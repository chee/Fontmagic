var options = $( document.body );
var familyInput = options.find( '#family' );
var styleInput = options.find( '#style' );
var weightInput = options.find( '#weight' );
var urlInput = options.find( '#url' );

function addFont( family, style, weight, url ) {
	var font = {};
	font[ family + '-' + style + '-' + weight ] = {
		family: family,
		style: style,
		weight: weight,
		url: url
	};

	chrome.storage.local.set( font, function() {
		showFonts();
	});

}


options.on( 'click', 'button', function () {
	var $ = options.find;
	addFont( familyInput.val(),
		styleInput.val(), 
		weightInput.val(),
		urlInput.val()
	);
}).on( 'change', '#file', function( event ) {
	var reader = new FileReader();
	reader.onload = function ( event ) {
		urlInput.val( event.target.result );
	};
	reader.readAsDataURL( event.target.files[0] );
});

var table = document.querySelector( 'table' );

function showFonts() {
	table.innerHTML = '';
	chrome.storage.local.get( null, function ( fonts ) {
		Object.keys( fonts ).forEach(function ( key ) {
			var font = fonts[ key ];
			var row = table.insertRow();
			row.style.fontFamily = font.family;
			[ 'Family', 'Style', 'Weight' ].forEach( function ( attr ) {
				var attribute = attr.toLowerCase();
				row.style[ 'font' + attr ] = font[ attribute ];
				row.insertCell().innerText = font[ attribute ];
			});
		});
	});
}

showFonts();
