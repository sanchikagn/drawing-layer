// get the canvas element and its context
var canvas = document.querySelector('#sketch');
var context = canvas.getContext('2d');

// brush settings
context.lineWidth = 2;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = '#000';

var lastMouse = {
    x: 0,
    y: 0
};

// attach the mousedown, mousemove, mouseup event listeners.
canvas.addEventListener('mousedown', function (e) {
    lastMouse = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
    };
    canvas.addEventListener('mousemove', move, false);
}, false);

canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', move, false);
}, false);
/*
function move(e) {
    var mouse = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
    };
    draw(lastMouse, mouse);
    lastMouse = mouse;
}*/

function draw(start, end) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.closePath();
    context.stroke();
}

/*
TogetherJS.send({
    type: "message-type"
});
*/

TogetherJS.hub.on("message-type", function (msg) {
    if (! msg.sameUrl) {
        // Usually you'll test for this to discard messages that came
        // from a user at a different page
        return;
    }
});

function move(e) {
    var mouse = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
    };
    draw(lastMouse, mouse);
    if (TogetherJS.running) {
        TogetherJS.send({type: "draw", start: lastMouse, end: mouse});
    }
    lastMouse = mouse;
}

TogetherJS.hub.on("draw", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    draw(msg.start, msg.end);
});

TogetherJS.hub.on("togetherjs.hello", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    var image = canvas.toDataURL("image/png");
    TogetherJS.send({
        type: "init",
        image: image
    });
});

TogetherJS.hub.on("init", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    var image = new Image();
    image.src = msg.image;
    context.drawImage(image, 0, 0);
});


