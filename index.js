//Canvas Definitions
var canvas = document.getElementById('screen');
var ctx = canvas.getContext("2d");

//Background Image
//var background = new Image();
//background.src = "https://previews.123rf.com/images/mjak/mjak1511/mjak151100016/48191719-seamless-horizontal-winter-background-with-hills-and-houses-for-christmas-game.jpg"
//background.onload = function(){
//   ctx.drawImage(background,0,0);
//}

//ball && bal dirrect.
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var ballRadius = 5;

//paddle var and dir
var lineWidth = 60;
var lineHeight = 10;
var lineX = (canvas.width-lineWidth)/2;
var lineY = canvas.height-25;
var lineDX = 9;

//To Keep Score
var score = 0;


//Start Text
function drawText(text, x, y){
    var grd = ctx.createLinearGradient(10,2,220,0);
    grd.addColorStop(0, '#3cacae');
    grd.addColorStop(1, '#c8f4f9');
    ctx.fillStyle = grd;
    ctx.font = '12px "Press Start 2P"';
    ctx.fillText(text, x, y);
}

//Game start
document.getElementById("screen").addEventListener("click", function (){
    requestAnimationFrame(draw);
});

//Listen for key press to move the paddle
document.addEventListener("keydown", function(event){
    if(event.key == "a" && lineX > 0){
        lineX -= lineDX;
    }else if(event.key == "d" && lineX < canvas.width-lineWidth){
        lineX += lineDX;
    }
});

//Welcome Screen Text
setTimeout(function(){
    drawText('Click on the screen to Start Game', (canvas.width-400)/2, 30);
}, 50);


//Ball
function drawBall(){
    var grad = ctx.createLinearGradient(10,1,220,0);
    grad.addColorStop(0, '#beeef9');
    grad.addColorStop(1, '#e8f6f9');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x,y,ballRadius, 0, 2* Math.PI);
    ctx.stroke();
    ctx.fill();
}

//Draw Line
function drawLine(){
    ctx.fillStyle = '#aee1ec';
    ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
}

//Main Draw frame loop
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawLine();
    drawText("Score: "+score, canvas.width-120, 30);

    if(x+dx > canvas.width - ballRadius || x+dx < ballRadius) {
        dx = -dx;
    }else if( y + dy < ballRadius) {
        dy = -dy;
    }else if (x+dx >= lineX && x+dx <= lineX+lineWidth && y+dy >= lineY && y+dy <= lineY+1) {
        dy = -dy;
        score++;
    }

    x += dx;
    y += dy;
    
    if(y+dy < canvas.height){
        requestAnimationFrame(draw);
    }else{
        ctx.clearRect(canvas.width-250, 0, canvas.width, 100);
        drawText("Click on the screen to Restart the Game", (canvas.width-480)/2, 30);
        document.getElementById("screen").addEventListener("click", function (){
            score = -1;
            x = canvas.width/2;
            y = canvas.height-30;
            lineX = (canvas.width-lineWidth)/2;
            lineY = canvas.height-25;
        });
    }
} 








