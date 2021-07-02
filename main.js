score_leftWrist = 0;
score_rightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1 = "";
song2 = "";
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("Clubstep Full Version.mp3");
    song2 = loadSound("MDK-Fingerbang.mp3");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 500);

    fill('#ff0000');
    stroke('#ff0000');

    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.stop();

        if(song2_status == false){
            song1.stop();
            song2.play();
            song2.setVolume(0.125);
            document.getElementById("song").innerHTML="Playing: MDK-Fingerbang";
        }
    }

    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        song2.stop();

        if(song1_status == false){
            song2.stop();
            song1.play();
            song1.setVolume(0.125);
            document.getElementById("song").innerHTML="Playing: Clubstep Full Version";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X Position: " + leftWristX + " Left Wrist Y Position: " + leftWristY);
        console.log("Right Wrist X Position: " + rightWristX + " Right Wrist Y Position: " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score/Accuracy/Confidence: " + score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score/Accuracy/Confidence: " + score_rightWrist);
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}