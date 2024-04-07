alert1 = "";
status = "";
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    od = ml5.objectDetector("cocossd", modelLoaded);
    

}
function modelLoaded() {
    console.log("MODEL HAS LOADED")
    document.getElementById("status").innerHTML = "status: starting object detection"
    status = true

}
function gotresults(e, r) {
    if (e) {
        console.error(e)
    }
    else {
        console.log(r);
        objects = r
    }
}

function draw() {
    image(video, 0, 0, 380, 380)

    if (status != "") {
        od.detect(video, gotresults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("number_obj").innerHTML = "number of objects" + objects.length
            r = random (255)
            g = random (255)
            b = random (255)
            objname = objects[i].label;
            if (objname == "person"){
                alert1.stop()
                document.getElementById("status").innerHTML = "baby found"
            }
            else {
                alert1.play()
                document.getElementById("status").innerHTML = "baby not found"
            }
            objcon = floor(objects[i].confidence*100);
            objx = objects[i].x;
            objy = objects[i].y;
            obw = objects[i].width;
            obh = objects[i].height;
            fill(r,g,b);
            textSize(25);
            text(objname + " " + objcon + "%",objx+15,objy+15);
            noFill();
            stroke(r,g,b);
            rect(objx,objy,obw,obh);   
        }       
    }
}

function preload() {
    alert1 = loadSound("alert.mp3")
    
}
