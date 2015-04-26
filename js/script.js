figure = document.createElement( 'figure' );
document.body.appendChild( figure );

figure.setAttribute('class', 'visible');

document.onmousemove = shadow;

var mouse = { x: 0, y: 0 };

function shadow(e) { 
    var w = window.innerWidth,
    	h = window.innerHeight,
    	x = e.pageX - w / 2,
	    y = e.pageY - h / 2,
	    xOffset = x / 6,
	    yOffset = y / 6,
	    blur = Math.abs(xOffset) + Math.abs(yOffset),
	    length = blur / 25,
	    opacity = 1 / length + .1;

	if ( x > 0 ) {
		xOffset = -Math.abs(xOffset);
	} else {
		xOffset = Math.abs(xOffset);
	}

	if ( y > 0 ) {
		yOffset = -Math.abs(yOffset);
	} else {
		yOffset = Math.abs(yOffset);
	}

    figure.style.boxShadow = xOffset + 'px ' + yOffset + 'px ' + blur + 'px ' + length + 'px rgba(0,0,0,' + opacity/3 + '), \
    					 ' + xOffset * 2 + 'px ' + yOffset * 2 + 'px ' + blur + 'px ' + length/2 + 'px rgba(0,0,0,' + opacity/4 + '), \
    					 ' + xOffset * 3 + 'px ' + yOffset * 3 + 'px ' + blur + 'px ' + length/3 + 'px rgba(0,0,0,' + opacity/5 + ')';
}

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
	switch(event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
    	first.screenX, first.screenY, 
       	first.clientX, first.clientY, false, 
        false, false, false, 0, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);  