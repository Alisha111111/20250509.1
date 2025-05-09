// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handpose;
let predictions = [];
let circleX, circleY;
const circleSize = 100;

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });

  // Initialize circle position at the center of the canvas
  circleX = width / 2;
  circleY = height / 2;
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // Draw the circle
  fill(255, 0, 0, 150);
  noStroke();
  ellipse(circleX, circleY, circleSize);

  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const hand = predictions[i];
    const keypoints = hand.landmarks;

    // Draw lines for keypoints
    for (let j = 0; j < 4; j++) {
      line(keypoints[j][0], keypoints[j][1], keypoints[j + 1][0], keypoints[j + 1][1]);
    }
    for (let j = 5; j < 8; j++) {
      line(keypoints[j][0], keypoints[j][1], keypoints[j + 1][0], keypoints[j + 1][1]);
    }
    for (let j = 9; j < 12; j++) {
      line(keypoints[j][0], keypoints[j][1], keypoints[j + 1][0], keypoints[j + 1][1]);
    }
    for (let j = 13; j < 16; j++) {
      line(keypoints[j][0], keypoints[j][1], keypoints[j + 1][0], keypoints[j + 1][1]);
    }
    for (let j = 17; j < 20; j++) {
      line(keypoints[j][0], keypoints[j][1], keypoints[j + 1][0], keypoints[j + 1][1]);
    }

    // Draw circles on fingertips
    fill(0, 255, 0);
    noStroke();
    ellipse(keypoints[8][0], keypoints[8][1], 20); // Left or right index finger

    // Check if the fingertip touches the circle
    if (dist(keypoints[8][0], keypoints[8][1], circleX, circleY) < circleSize / 2) {
      circleX = keypoints[8][0];
      circleY = keypoints[8][1];
    }
  }
}
