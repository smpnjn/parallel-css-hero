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
        
        document.body.addEventListener(item, function(e) {/*
            let startXNeg, startXPos, startYNeg, startYPos;
            reduceRotate = setInterval(function() {
                let finishX, finishY;
                let change = 1;
                if(typeof document.getElementById('rotator').style.transform.split('rotateY(')[1] !== "undefined") {
                    curValueY = parseFloat(document.getElementById('rotator').style.transform.split('rotateY(')[1].split(')')[0]);
                }
                if(typeof document.getElementById('rotator').style.transform.split('rotateX(')[1] !== "undefined") {
                    curValueX = parseFloat(document.getElementById('rotator').style.transform.split('rotateX(')[1].split(')')[0]);
                }
    
                console.log(curValueX );
                
                if(curValueX > 0) {
                    if(startXPos !== true) {
                        curValueX -= change;
                    } else { finishX = true; }
                    startXNeg = true;
                }
                else if(curValueX < 0) {
                    if(startXNeg !== true) {
                        curValueX += change;
                    } else { finishX = true; }
                    startXPos = true;
                }

                if(curValueY > 0) {
                    if(startYNeg !== true) {
                        curValueY -= change;
                    } else { finishY = true; }
                    startYPos = true;
                }
                else if(curValueY < 0) {
                    if(startYPos !== true) {
                        curValueY += change;
                    } else { finishY = true; }
                    startYNeg = true;
                }

                document.getElementById('rotator').style.transform = `rotateY(${curValueY}deg) rotateX(${curValueX}deg)`;

                if(finishX == true && finishY == true || curValueX == 0 && curValueY == 0) {
                    clearInterval(reduceRotate);
                    document.getElementById('rotator').style.transform = `rotateY(0deg) rotateX(0deg)`;
                }
            }, 1000/60);
            console.log(typeof reduceRotate);*/
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