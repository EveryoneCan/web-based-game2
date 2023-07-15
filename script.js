var runStart = 0;

//Run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

//Jump sound
var jumpSound = new Audio("jump.mp3");

//Dead sound
var deadSound = new Audio("dead.mp3");

function keyCheck(event){
    
    // Enter
    if (event.which ==13){

        if(runWorkerId==0){
            blockWorkerId =setInterval(createBlock,1000);
            moveBlockWorkerId= setInterval(moveBlock,100);
            
            runWorkerId = setInterval(run,100);
            runSound.play();
            runStart =1;

            backgroundWorkerId = setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updadeScore,50);
        }
        
    }

    // Space
    if (event.which ==32){

        if (runStart ==1){

            if (jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId=setInterval(jump,100);
                jumpSound.play();
            }
        }
    }
}

// Player
var player = document.getElementById("player");

// Run
var runWorkerId =0;
var runImageNumber =1;
function run(){

    runImageNumber++;

    if (runImageNumber ==21){
        runImageNumber =1;
    }
    player.src = "Run (" + runImageNumber +").png";
}

// Jump
var jumpImageNumber =1;
var jumpWorkerId=0;
var playerMargintop = 400;
function jump(){

    jumpImageNumber++;

    // Fly
    if (jumpImageNumber<=7){
        playerMargintop = playerMargintop - 30;
        player.style.marginTop = playerMargintop + "px";
    }

    // Land

    if (jumpImageNumber>=8){
        playerMargintop = playerMargintop + 30;
        player.style.marginTop = playerMargintop + "px";
    }
    if(jumpImageNumber ==13){
        jumpImageNumber =1;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();
        jumpWorkerId =0;
    }
    player.src = "Jump (" + jumpImageNumber +").png";
}

// Background
var background = document.getElementById("background");

var backgroundX =0;
var backgroundWorkerId = 0;
// move background
function moveBackground(){
    backgroundX = backgroundX -20;
    background.style.backgroundPositionX = backgroundX + "px";
}


// Score

var score = document.getElementById("score");

// Update Score
var newScore =0;
var scoreWorkerId =0;

function updadeScore(){
    newScore++;
    score.innerHTML = newScore;
}

// Create blocks
var blockWorkerId = 0;
var blockMarginLeft = 700;
var blockId = 1;

function createBlock(){
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block"+blockId;

    blockId++;

    var gap = Math.random() * (1000-400) + 400;

    blockMarginLeft = blockMarginLeft+gap;

    block.style.marginLeft = blockMarginLeft + "px";
    background.appendChild(block);
}

// Move blocks

var moveBlockWorkerId =0;
function moveBlock(){
     for(var i =1;i<=blockId;i++){
        var currentBlock = document.getElementById("block"+i);
        var cuurentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(cuurentMarginLeft) -20;
        currentBlock.style.marginLeft = newMarginLeft+"px";

        
        if(newMarginLeft<160 & newMarginLeft>60){

            //alert(playerMargintop);
           if(playerMargintop>310){
            clearInterval(runWorkerId);
            runSound.pause();
            clearInterval(jumpWorkerId);
            jumpWorkerId=-1;
            clearInterval(backgroundWorkerId);
            clearInterval(scoreWorkerId);
            clearInterval(blockWorkerId);
            clearInterval(moveBlockWorkerId);
            deadWorkerId = setInterval(dead,100);
            deadSound.play();
           }
        }
    }
}

// Dead

var deadImageNumber =1;
var deadWorkerId = 0;

function dead(){

    deadImageNumber++;

    if(deadImageNumber ==31){
        deadImageNumber=30;
        player.style.marginTop = "400px";
        document.getElementById("endScreen").style.visibility="visible";
        document.getElementById("text2").innerHTML=newScore;
    }

    player.src = "Dead (" + deadImageNumber +").png";

}

function reload(){
    location.reload();
}
// 161 -41