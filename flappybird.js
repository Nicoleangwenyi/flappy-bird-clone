
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight 
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ration = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipes moving left speed

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board


    //draw flappy bird
    //context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src = "img/flappybird.png";
    birdImg.onload = function(){ //paints bird onto canvas
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "img/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
}

function update() {//updating the frame
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bird (bird being painted over and over again)
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //pipes
    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x +=velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = boardHeight/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false //to check if the birs has passed the pipe
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}


