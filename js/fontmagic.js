var fontface = '@font-face {font-family: "<% family %>";font-style: <% style %>;font-weight: <% weight %>;src: url(<% url %>);}';

function fontmagic ( object ) {
	return fontface.replace( /<% (\w+) %>/g, function ( match, key ) {
		return object[ key ];
	});
}

function inject() {
	chrome.storage.local.get( null, function ( fonts ) {
		var style = '<style>';
		Object.keys( fonts ).forEach(function ( key ) {
			style += fontmagic( fonts[ key ] );
		});
		$( document.head ).append( style );
	});
}

inject();
