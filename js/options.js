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
		familyInput.val( '' );
		styleInput.val( 'normal' );
		weightInput.val( '300' );
		urlInput( '' );
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
		urlInput.val( event.target.result )
	}
	reader.readAsDataURL( event.target.files[0] );
});
