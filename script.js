document.addEventListener('DOMContentLoaded', function(e) {
    let scale = 1;
    document.body.addEventListener('wheel', function(e) {
        if(scale >= 0.4 && scale <= 1.8) {
            scale = scale - (e.deltaY / 500);
        } 
        
        if(scale < 0.4) {
            scale = 0.42;
        } 
        if(scale > 1.8) {
            scale = 1.78;
        }


        document.getElementById('container').style.transform = `scale(${scale})`;
    });

    let drag = false;
    let startPointY = 0;
    let startPointX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    let reduceRotate;
    let curValueX = 0;
    let curValueY = 0;

    document.body.addEventListener('pointerdown', function(e) {
        drag = true;
        if(typeof reduceRotate !== "undefined") {
            clearInterval(reduceRotate);
        }
        startPointY = e.pageX;
        startPointX = e.pageY;
        if(typeof document.getElementById('rotator').style.transform.split('rotateY(')[1] !== "undefined") {
            currentRotationY = parseFloat(document.getElementById('rotator').style.transform.split('rotateY(')[1].split(')')[0]);
        }
        if(typeof document.getElementById('rotator').style.transform.split('rotateX(')[1] !== "undefined") {
            currentRotationX = parseFloat(document.getElementById('rotator').style.transform.split('rotateX(')[1].split(')')[0]);
        }
    });

    ['pointerup', 'pointerleave'].forEach(function(item) {
        
        document.body.addEventListener(item, function(e) {
            drag = false;
            document.getElementById('rotator').classList.remove('rotating');
        });
    });

    document.body.addEventListener('pointermove', function(e) {
        let changeY = (e.pageX - startPointY) / 5;
        let changeX = (e.pageY - startPointX) / 5;
        if(drag == true) {
            document.getElementById('rotator').classList.add('rotating');
            document.getElementById('rotator').style.transform = `rotateY(${changeY + currentRotationY}deg) rotateX(${-changeX + currentRotationX}deg)`;
        }
    });
});