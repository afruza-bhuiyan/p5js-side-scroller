//variables for the game character 
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var walkFrame;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

//variables for scenery & interactive items
var trees_x;
var trees_x1;
var clouds;
var clouds_small;
var mountains;
var mountains_front;
var ground;
var canyon;
var collectable;
var flagpole;

var platform;

//variable for the score & lives 
var game_score;
var lives;

// variable for ends
var gameOver;
var levelComplete;

function setup()
{  
    createCanvas(1024, 576);
	floorPos_y = height * 3/4;

    lives = 3;    
    gameOver = false;
    levelComplete = false;

    startGame();
    windowResized();

    document.body.style.margin = '0';
    document.body.style.background = 'black';
    document.body.style.overflow = 'hidden';

}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

    walkFrame = 0;

	// Variable to control the background scrolling.
	scrollPos = 0;
    
	// Variable to store the real position of the gameChar in the game world. 
    // Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
        
	// Initialise arrays of scenery objects.
    
    //arrays for trees 
    //darker ones 
    trees_x = [970,840,575,5,1250,1800,1870,-275];
    
    //lighter ones 
    trees_x1 = [900,540,75,1300,1840,1920];
    
    //add random positions to both tree arrays
    for (var i=0; i<30; i++)
    {
        trees_x.push(random(5000,-300));
        trees_x1.push(random(5000,-300));
    }
    
    //arrays for clouds 
    //bigger (5 circle) ones
    clouds = [{x_pos:100, y_pos:100, size:100},
              {x_pos:-300, y_pos:20, size:60},
              {x_pos:600, y_pos:40, size:60},
              {x_pos:1150, y_pos:50, size:75}];
    
    //smaller (3 circle) ones
    clouds_small = [{x_pos:-1150, y_pos:150, size:80},
                    {x_pos:280, y_pos:160, size:60}];
    
    // arrays to add random positioned clouds (right)
    for (var i=0; i<5; i++) 
    {
        //new x position
        var x = i*1000 + 800;  

        // add some noise to the x position
        x = x + random(-100,100);
        var cl = {x_pos:x, y_pos:random(50,120), size:random(50,120)};

        // put x into my clouds  array
        clouds.push(cl);
        
        x = x + random(-100,100);
        var cl = {x_pos:x, y_pos:random(50,120), size:random(50,120)};
        clouds_small.push(cl);
    }
    
    // arrays to add random positioned clouds (left)
    for (var i=0; i<5; i++) 
    {
        // new x position
        var x = i*-1000 + 800;

        // add some noise to the x position
        x = x + random(-100,100);
        var cl = {x_pos:x, y_pos:random(50,120), size:random(50,120)};

        // put x into my clouds array
        clouds.push(cl);
                
        x = x + random(-100,100);
        var cl = {x_pos:x, y_pos:random(50,120), size:random(50,120)};
        clouds_small.push(cl);
    }
    
    //arrays for mountains
    //back mountains 
    mountains = [{x_pos:0,y_pos:200, 
                  x_pos1:0,y_pos1:200,
                  x_pos2:0,y_pos2:200},
                 {x_pos:170,y_pos:200, 
                  x_pos1:185,y_pos1:320,
                  x_pos2:150,y_pos2:200},
                 {x_pos:540,y_pos:200, 
                  x_pos1:593,y_pos1:268,
                  x_pos2:596,y_pos2:200},
                 {x_pos:480,y_pos:200, 
                  x_pos1:510,y_pos1:313,
                  x_pos2:432,y_pos2:200},
                 {x_pos:830,y_pos:200, 
                  x_pos1:894,y_pos1:300,
                  x_pos2:770,y_pos2:200},
                 //right side of the screen 
                 {x_pos:1050,y_pos:200, 
                  x_pos1:1100,y_pos1:200, 
                  x_pos2:1100,y_pos2:200},
                 {x_pos:1300,y_pos:200, 
                  x_pos1:1450,y_pos1:320, 
                  x_pos2:1370,y_pos2:200},
                 {x_pos:1700,y_pos:200, 
                  x_pos1:1870,y_pos1:288, 
                  x_pos2:1896,y_pos2:200},
                 //left side of the screen 
                 {x_pos:-425,y_pos:200,
                  x_pos1:-350,y_pos1:240, 
                  x_pos2:-380,y_pos2:200}];
    
    //arrays to add random positioned back mountain (left)
    for (var i=0; i<10; i++) 
    {
        // new e position
        var e = i*-250 - 1000;

        // add some noise to the e position
        e = e + random(-100,100);
        var mount = {
            x_pos:e+random(200,500), 
            y_pos:200, 
            x_pos1:e, 
            y_pos1:random(110,300), 
            x_pos2:e-random(200,500),
            y_pos2:200
        };

        // put mount into my mountains array
        mountains.push(mount);
    }
    
    //arrays to add random positioned back mountain (right)
    for (var i=0; i<10; i++) 
    {
        // new e position
        var e = i*250 + 2100;

        // add some noise to the e position
        e = e + random(-100,100);
        var mount = {
            x_pos:e+random(200,500), 
            y_pos:200, 
            x_pos1:e, 
            y_pos1:random(110,300), 
            x_pos2:e-random(200,500),
            y_pos2:200
        };

        // put mount into mountains array
        mountains.push(mount);
    }
    
    //array for mountains in the front 
    mountains_front = [
        {x_pos:0,y_pos:200, 
         x_pos1:0,y_pos1:200,
         x_pos2:0,y_pos2:200},
        {x_pos:180,y_pos:200, 
         x_pos1:170,y_pos1:270,
         x_pos2:144,y_pos2:200},
        {x_pos:290,y_pos:200, 
         x_pos1:300,y_pos1:190,
         x_pos2:294,y_pos2:200},
        {x_pos:575,y_pos:200, 
         x_pos1:560,y_pos1:220,
         x_pos2:544,y_pos2:200},
        {x_pos:700,y_pos:200, 
         x_pos1:670,y_pos1:290,
         x_pos2:694,y_pos2:200},
        {x_pos:58,y_pos:200, 
         x_pos1:-130,y_pos1:320,
         x_pos2:-256,y_pos2:200},
        {x_pos:850,y_pos:200, 
         x_pos1:870,y_pos1:170,
         x_pos2:944,y_pos2:200},
        //right side of the screen 
        {x_pos:1250,y_pos:200, 
         x_pos1:1265,y_pos1:250,
         x_pos2:1300,y_pos2:200},
        {x_pos:1505,y_pos:200,
         x_pos1:1555,y_pos1:150,
         x_pos2:1600,y_pos2:200},
        //left side of the screen 
        {x_pos:-250,y_pos:200,
         x_pos1:-250,y_pos1:170,
         x_pos2:-250,y_pos2:200},
        {x_pos:-510,y_pos:200,
         x_pos1:-500,y_pos1:250,
         x_pos2:-490,y_pos2:200},
        {x_pos:-710,y_pos:200,
         x_pos1:-660,y_pos1:150,
         x_pos2:-620,y_pos2:200}
    ]; 
    
    //randomly adding mountain in the front(left)
    for (var i=0; i<10; i++) 
    {
        //new position 
        var e = i*-250 - 1000;
        var h = random(100,300);

        // add some noise 
        e = e + random(-100,100);
        var mount = {
            x_pos:e+random(200,500), 
            y_pos:200, 
            x_pos1:e, 
            y_pos1:h, 
            x_pos2:e-random(200,500),
            y_pos2:200
        };

        //put mount into my mountains_front array
        mountains_front.push(mount);
    }
    
    //randomly adding the mountains in the front(right)
    for (var i=0; i<10; i++) 
    {
        //new position 
        var e = i*250 + 2000;
        var h = random(100,300);

        //add some noise 
        e = e + random(-100,100);
        var mount = {
            x_pos:e+random(200,500), 
            y_pos:200, 
            x_pos1:e, 
            y_pos1:h, 
            x_pos2:e-random(200,500),
            y_pos2:200
        };

        //put mount into my mountains_front array
        mountains_front.push(mount);
    }
    
    //array for the canyons 
    canyon = [
        {x_pos:180, width:80},
        {x_pos:610, width:80},
        {x_pos:1350, width:80},
        {x_pos:-600, width:80},
        {x_pos:-1000, width:80},
        {x_pos:-1500, width:80},
        {x_pos:1750, width:80},
        {x_pos:2050, width:80},
        {x_pos:3550, width:80},
        {x_pos:2750, width:80},
        {x_pos:4120, width:80},
        {x_pos:-2050, width:80}
    ];
    
    //array for the collectable item 
    collectable = [
        {x_pos:100, y_pos:100, size:50, isFound:false},
        {x_pos:700, y_pos:100, size:50, isFound:false},
        {x_pos:1620, y_pos:10, size:50, isFound:false},
        {x_pos:2700, y_pos:40, size:50, isFound:false},
        {x_pos:-1500, y_pos:40, size:50, isFound:false}
    ];
    
    //platforms 
    platform = [];
    
    platform.push(createPlatform(360,floorPos_y-100,100));
    platform.push(createPlatform(450,floorPos_y-180,100));
    platform.push(createPlatform(1900,floorPos_y-100,100));
    
    //flag at the end
    flagpole = {x_pos:4500, isReached:false};
    //setting the game score to 0 at the beginning
    game_score = 0;
    gameOver = false;
    levelComplete = false;
    
    //array for enemy
    enemies = [];
    
    //adding enemies
    enemies.push(new Enemy(350,floorPos_y,100));
    enemies.push(new Enemy(950,floorPos_y,200));
    enemies.push(new Enemy(1900,floorPos_y,100));
    enemies.push(new Enemy(2900,floorPos_y,150));
    enemies.push(new Enemy(-1300,floorPos_y,200));
    
    //ground design 
    ground = [];
    
    //top & fifth layer 
    for (var i=0; i<100; i++) 
    {
        var e = i*100;
        var h = i*5;

        //first layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+25, size:100};
        //fifth layer
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+85, size:100};
        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    for (var i=0; i<100; i++) 
    {
        var e = i*-100;
        var h = i*-5;

        //first layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+25, size:100};
        //fifth layer
        var grnd1 = {x_pos:e+h,y_pos:floorPos_y+85,size:100 };
        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }

    //second & eighth layer
    for (var i=0; i<100; i++) 
    {
        var e = i*180;
        var h = i*5;

        //second layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+40,size:180};
        //eighth layer 
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+130,size:180};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    for (var i=0; i<100; i++) 
    {
        var e = i*-180;
        var h = i*-5;

        //second layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+40,size:180};
        //eighth layer 
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+130,size:180};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    //third & seventh layer
    for (var i=0; i<100; i++) 
    {
        var e = i*80;
        var h = i*5;

        //third layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+55,size:80};
        //seventh layer 
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+115,size:80};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    for (var i=0; i<100; i++) 
    {
        var e = i*-80;
        var h = i*-5;
        
        //third layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+55,size:80};
        //seventh layer 
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+115,size:80};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    //fourth & sixth layer 
    for (var i=0; i<100; i++) 
    {
        var e = i*250;
        var h = i*5;

        //fourth layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+70,size:250};
        //sixth layer
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+100,size:250};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
    for (var i=0; i<100; i++) 
    {
        var e = i*-250;
        var h = i*-5;

        //fourth layer 
        var grnd = {x_pos:e+h, y_pos:floorPos_y+70,size:250};
        //sixth layer
        var grnd1 = {x_pos:e+h, y_pos:floorPos_y+100,size:250};

        //put them into the ground array
        ground.push(grnd);
        ground.push(grnd1);
    }
}

function playerDeath()
{
    lives--;

    if (lives > 0)
    {
        resetLevel();
    }
    else
    {
        gameOver = true;
        isPlummeting = false;
        isFalling = false;
        isLeft = false;
        isRight = false;
    }
}

function resetLevel()
{
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    scrollPos = 0;
    gameChar_world_x = gameChar_x;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    game_score = 0;

    for (var i=0; i<collectable.length; i++)
    {
        collectable[i].isFound = false;
    }

    flagpole.isReached = false;
    levelComplete = false;
}

function draw()
{
    //sky
    background(100,155,255); 

    //draw some green ground
    noStroke();
	fill(0,100,0);
	rect(0, floorPos_y+0.4, 1024, 20);
    //underground
    fill(190,105,50);
    rect(0, floorPos_y+20, 1024, 200);

    //draw some white clouds
    push();
    translate(scrollPos*0.2,0);
    drawClouds();
    pop();
    
    //draw mountains
    push();
    translate(scrollPos*0.3,0);
    drawMountains();
    pop();

    //draw ground
    push();
    translate(scrollPos,0);
    drawGround();
    pop();
    
    //draw trees
    push();
    translate(scrollPos*0.5,0);
    drawTrees();
    pop();
    
    //draw canyons
    push();
    translate(scrollPos,0);
    for(var i=0; i<canyon.length; i++)
    {
        drawCanyon(canyon[i]);
    }
    pop();


    //draw collectables
    push();
    translate(scrollPos,0);
    for(var i=0; i<collectable.length; i++)
    {
        if (!collectable[i].isFound)
        {
            drawCollectable(collectable[i]);
        }
    }
    pop();

    //draw platforms
    push();
    translate(scrollPos,0);
    for(var i=0; i<platform.length; i++)
    {
        platform[i].draw();
    }
    pop();

    //draw flagpole
    push();
    translate(scrollPos,0);
    renderFlagpole();
    pop();

    //draw enemies
    push();
    translate(scrollPos,0);
    for(var i=0; i<enemies.length; i++)
    {
        enemies[i].draw();
        enemies[i].update();
    }
    pop();

    //draw game character
    drawGameChar();

    //check collectables
    if (!levelComplete)
    {
        for(var i=0; i<collectable.length; i++)
        {
            if (!collectable[i].isFound)
            {
                checkCollectable(collectable[i]);
            }
        }
    }

    //check flagpole
    if (!levelComplete)
    {
        checkFlagpole();
    }

    //check enemies
    if (!isPlummeting && !gameOver && !levelComplete)
    {
        for(var i=0; i<enemies.length; i++)
        {
            if(enemies[i].isContact(gameChar_world_x,gameChar_y))
            {
                playerDeath();
                break;
            }
        }
    }

    //check canyons
    if (!isPlummeting && !gameOver && !levelComplete)
    {
        for(var i=0; i<canyon.length; i++)
        {
            checkCanyon(canyon[i]);
        }
    }

    //movement
    if(isLeft)
    {
        if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
        else
        {
            scrollPos += 5;
        }
    }

    if(isRight)
    {
        if(gameChar_x < width * 0.8)
        {
            gameChar_x += 5;
        }
        else
        {
            scrollPos -= 5;
        }
    }

    if(isLeft || isRight)
    {
        if(frameCount % 10 == 0)
        {
            walkFrame++;

            if(walkFrame > 1)
            {
                walkFrame = 0;
            }
        }
    }
    else
    {
        walkFrame = 0;
    }

    gameChar_world_x = gameChar_x - scrollPos;

    //falling and platforms
    if(gameChar_y < floorPos_y)
    {
        var isContact = false;

        //check if character is standing on a platform
        for(var i=0; i<platform.length; i++)
        {
            if(gameChar_world_x + 20 > platform[i].x &&
               gameChar_world_x - 20 < platform[i].x + platform[i].length)
            {
                if(gameChar_y >= platform[i].y &&
                   gameChar_y <= platform[i].y + 10)
                {
                    gameChar_y = platform[i].y;
                    isContact = true;
                    break;
                }
            }
        }

        if(!isContact)
        {
            gameChar_y += 5;
            isFalling = true;
        }
        else
        {
            isFalling = false;
        }
    }
    else
    {
        isFalling = false;
    }

    //plummeting
    if(isPlummeting)
    {
        gameChar_y += 10;

        if(gameChar_y > height)
        {
            playerDeath();
        }
    }
    //-------------------------------
    //  HUD background
    //-------------------------------

    fill(0, 170);
    rect(10, 10, 180, 70, 10);
    //HUD text
    fill(255);
    textSize(20);

    //score
    text("Score: ", 20, 38);
    noStroke();
    for(var i = 0; i < 5; i++)
    {
        if(i < game_score)
        {
            fill(224, 33, 138);
        }
        else
        {
            fill(100);
        }

        ellipse(89 + i * 22, 34, 14, 14);
    }

    fill(255);
    textSize(20);
    //lives 
    text("Lives:", 20, 65);
    noStroke();
    for(var i = 0; i < 3; i++)
    {
        if(i < lives)
        {
            fill(255, 0, 0);
        }
        else
        {
            fill(100);
        }

        //hearts 
        ellipse(82 + i * 22, 57, 8, 8);
        ellipse(89 + i * 22, 57, 8, 8);
        triangle(
            78 + i * 22, 59,
            93 + i * 22, 59,
            85.5 + i * 22, 68
        );
    }

    //game over
    if(gameOver)
    {
        //dark overlay
        fill(0, 150);
        rect(0, 0, width, height);

        //status 
        fill(255);
        textAlign(CENTER);
        textSize(60);
        text("GAME OVER!",width / 2, height / 2 - 70);

        //lives
        textSize(40);
        text("You have used all your lives.", width / 2, height / 2 - 20);

        //restart message
        textSize(35);
        text("Press SPACE to play again.", width / 2, height / 2 + 30);

        textAlign(LEFT);
    }

    //level complete
    if(levelComplete)
    {
        //dark overlay
        fill(0, 150);
        rect(0, 0, width, height);

        //status
        fill(255);
        textAlign(CENTER);
        textSize(60);
        text("LEVEL COMPLETE!", width / 2, height / 2 - 80);

        //score
        textSize(40);
        text("You have collected " + game_score + " of 5 tokens", width / 2, height / 2 - 20);

        //lives
        text("with " + lives + " of 3 lives left.", width / 2, height / 2 + 25);

        //restart message
        textSize(35);
        text("Press SPACE to play again.", width / 2, height / 2 + 70);

        textAlign(LEFT);
    }
}

//Control functions 
function keyPressed()
{
    //restart after game over or level completion
    if(keyCode == 32)
    {
        if(gameOver || levelComplete)
        {
            lives = 3;
            startGame();
        }

        return;
    }

    //going left
    if(key == 'A' || keyCode == LEFT_ARROW)
    {
        isLeft = true;
    }

    //going right
    if(key == 'D' || keyCode == RIGHT_ARROW)
    {
        isRight = true;
    }

    //going up
    if(key == 'W' || keyCode == UP_ARROW)
    {
        if(!isFalling && !isPlummeting)
        {
            gameChar_y -= 100;
        }
    }

    //going down immediately
    if(key == 'S')
    {
        gameChar_y = floorPos_y;
    }

    console.log("keyPressed: " + key);
}

//stop moving when keys are released 
function keyReleased()
{
    //stop going left
    if(key == 'A' || keyCode == LEFT_ARROW)
    {
        isLeft = false;
    }

    //stop going right
    if(key == 'D' || keyCode == RIGHT_ARROW)
    {
        isRight = false;
    }

    console.log("keyReleased: " + key);
}

// ---------------------------
// Character render functions
// ---------------------------

// Function to draw the game character
function drawGameChar()
{
    //draw game character
    if(isLeft && isFalling)
    {
        //jumping left
        stroke(0);
        fill(255,105,180);
        rect(gameChar_x-15,gameChar_y-55,30,30,10);//main body
        rect(gameChar_x-4,gameChar_y-25,25,10,5);//left leg 2
        rect(gameChar_x-4,gameChar_y-35,10,20,5);//left leg 
        ellipse(gameChar_x,gameChar_y-65,25,25);//head
        rect(gameChar_x,gameChar_y-55,20,10,5);//right arm
        fill(255);    
        rect(gameChar_x-12,gameChar_y-68,5,5);//eye
    }
    else if(isRight && isFalling)
    {
        //jumping right
        stroke(0);
        fill(255,105,180);
        rect(gameChar_x-15,gameChar_y-55,30,30,10);//main body
        rect(gameChar_x-20,gameChar_y-25,25,10,5);//right leg 2
        rect(gameChar_x-4,gameChar_y-35,10,20,5);//right leg 
        ellipse(gameChar_x,gameChar_y-65,25,25);//head
        rect(gameChar_x-20,gameChar_y-55,20,10,5);//right arm
        fill(255);    
        rect(gameChar_x+7,gameChar_y-68,5,5);//eye
    }
    else if(isLeft)
    {
        //walking left
        stroke(0);
        fill(255,105,180);

        if(walkFrame == 0)
        {
            rect(gameChar_x-17,gameChar_y-20,10,15,5);//left leg
            rect(gameChar_x-2,gameChar_y-20,10,20,5);//right leg
        }
        else
        {
            rect(gameChar_x-17,gameChar_y-20,10,20,5);//left leg
            rect(gameChar_x-2,gameChar_y-20,10,15,5);//right leg
        }

        rect(gameChar_x-15,gameChar_y-45,30,30,10);//main body 

        if(walkFrame == 0)
        {
            rect(gameChar_x-5,gameChar_y-40,10,20,5);//right arm
        }
        else
        {
            rect(gameChar_x-5,gameChar_y-35,10,20,5);//right arm
        }

        ellipse(gameChar_x,gameChar_y-55,25,25);//head
        fill(255);    
        rect(gameChar_x-12,gameChar_y-58,5,5);//eye
    }
    else if(isRight)
    {
        //walking right
        stroke(0);
        fill(255,105,180);

        if(walkFrame == 0)
        {
            rect(gameChar_x+8,gameChar_y-20,10,15,5);//left leg
            rect(gameChar_x-7,gameChar_y-20,10,20,5);//right leg
        }
        else
        {
            rect(gameChar_x+8,gameChar_y-20,10,20,5);//left leg
            rect(gameChar_x-7,gameChar_y-20,10,15,5);//right leg
        }

        rect(gameChar_x-15,gameChar_y-45,30,30,10);//main body 
        
        if(walkFrame == 0)
        {
            rect(gameChar_x-4,gameChar_y-35,10,20,5);//right arm
        }
        else
        {
            rect(gameChar_x-4,gameChar_y-40,10,20,5);//right arm
        }

        ellipse(gameChar_x,gameChar_y-55,25,25);//head
        fill(255);    
        rect(gameChar_x+7,gameChar_y-58,5,5);//eye
    }
    else if(isFalling)
    {
        //jumping facing front
        stroke(0);
        fill(255,105,180);
        rect(gameChar_x-15,gameChar_y-55,30,30,10);//main body
        rect(gameChar_x-12,gameChar_y-35,10,20,5);//left leg 
        rect(gameChar_x+2,gameChar_y-35,10,20,5);//right leg 
        rect(gameChar_x-22,gameChar_y-70,10,20,5);//left arm
        rect(gameChar_x+12,gameChar_y-70,10,20,5);//right arm
        ellipse(gameChar_x,gameChar_y-65,25,25);//head
        fill(255);    
        rect(gameChar_x-10,gameChar_y-68,20,5);//eye
        ellipse(gameChar_x,gameChar_y-42,10,10);//chest
    }
    else
    {
        //standing front facing
        stroke(0);
        fill(255,105,180);
        rect(gameChar_x-12,gameChar_y-20,10,20,5);//left leg 
        rect(gameChar_x+2,gameChar_y-20,10,20,5);//right leg
        rect(gameChar_x-22,gameChar_y-40,10,20,5);//left arm
        rect(gameChar_x+12,gameChar_y-40,10,20,5);//right arm
        rect(gameChar_x-15,gameChar_y-45,30,30,10);//main body
        ellipse(gameChar_x,gameChar_y-55,25,25);//head
        fill(255);    
        rect(gameChar_x-10,gameChar_y-58,20,5);//eye
        ellipse(gameChar_x,gameChar_y-32,10,10);//chest
    }
}

// ---------------------------
// Background render functions
// ---------------------------

//function to draw cloud objects
function drawClouds()
{
    //bigger 5 circle ones
    for(var i=0; i<clouds.length; i++)
    {
        noStroke();
        fill(255);

        ellipse(clouds[i].x_pos+(400+(clouds[i].size-100)),
                clouds[i].y_pos-(25+(clouds[i].size-100)/1.7),
                clouds[i].size,clouds[i].size);

        ellipse(clouds[i].x_pos+(370+(clouds[i].size-100)/1.5),
                clouds[i].y_pos+(25+(clouds[i].size-100)/9),
                clouds[i].size*1.5,clouds[i].size*0.65);

        ellipse(clouds[i].x_pos+(335+(clouds[i].size-100)/2.2),
                clouds[i].y_pos-(10+(clouds[i].size-100)/2),
                clouds[i].size*0.55,clouds[i].size*0.55);

        ellipse(clouds[i].x_pos+(275+(clouds[i].size-100)/9),
                clouds[i].y_pos+(20+(clouds[i].size-100)/20),
                clouds[i].size*1.3,clouds[i].size*0.5);

        ellipse(clouds[i].x_pos+(460+(clouds[i].size-100)/0.7),
                clouds[i].y_pos+10,
                clouds[i].size*0.8,clouds[i].size*0.55);
    }

    //smaller 3 circle ones
    for(var j=0; j<clouds_small.length; j++)
    {
        noStroke();
        fill(255);

        ellipse(clouds_small[j].x_pos+(885+(clouds_small[j].size-100)/3),
                clouds_small[j].y_pos-50,
                clouds_small[j].size*0.5,clouds_small[j].size*0.25);

        ellipse(clouds_small[j].x_pos+(850+(clouds_small[j].size-100)/10),
                clouds_small[j].y_pos-50,
                clouds_small[j].size*0.5,clouds_small[j].size*0.25);

        ellipse(clouds_small[j].x_pos+(875+(clouds_small[j].size-100)/4),
                clouds_small[j].y_pos-(70+(clouds_small[j].size-100)/6),
                clouds_small[j].size*0.5,clouds_small[j].size*0.4);
    }
}

//function to draw mountains objects
function drawMountains()
{
    //back mountains
    for(var i=0; i<mountains.length; i++)
    {
        noStroke();
        fill(169,169,169);

        triangle(
            mountains[i].x_pos-10,mountains[i].y_pos+232,
            mountains[i].x_pos1+60,mountains[i].y_pos1-110,
            mountains[i].x_pos2+250,mountains[i].y_pos2+232
        );
    }

    //front mountains
    for(var j=0; j<mountains_front.length; j++)
    {
        noStroke();
        fill(192,192,192);

        triangle(
            mountains_front[j].x_pos,mountains_front[j].y_pos+232,
            mountains_front[j].x_pos1+130,mountains_front[j].y_pos1-30,
            mountains_front[j].x_pos2+256,mountains_front[j].y_pos2+232
        );
    }
}

//function to draw ground layer
function drawGround()
{
    for(var i=0; i<ground.length; i++)
    {
        noStroke();
        fill(139,69,19);

        rect(
            ground[i].x_pos,
            ground[i].y_pos,
            ground[i].size,
            10,
            25
        );
    }
}

//function to draw trees objects
function drawTrees()
{
    //darker ones
    for(var i=0; i<trees_x.length; i++)
    {
        noStroke();
        fill(180,80,0);
        rect(trees_x[i],floorPos_y-184,20,185);

        //leaves
        fill(85,107,47);

        triangle(
            trees_x[i]+10,floorPos_y-182,
            trees_x[i]-45,floorPos_y-32,
            trees_x[i]+65,floorPos_y-32
        );

        triangle(
            trees_x[i]+10,floorPos_y-212,
            trees_x[i]-35,floorPos_y-107,
            trees_x[i]+55,floorPos_y-107
        );
    }
        
    //lighter ones
    for(var j=0; j<trees_x1.length; j++)
    {
        noStroke();
        fill(180,80,0);
        rect(trees_x1[j],floorPos_y-184,20,185);

        //leaves 
        fill(0,150,0);

        triangle(
            trees_x1[j]+10,floorPos_y-182,
            trees_x1[j]-45,floorPos_y-32,
            trees_x1[j]+65,floorPos_y-32
        );

        triangle(
            trees_x1[j]+10,floorPos_y-212,
            trees_x1[j]-35,floorPos_y-107,
            trees_x1[j]+55,floorPos_y-107
        );
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

//function to draw canyon objects
function drawCanyon(t_canyon)
{
    noStroke();
    fill(0,206,209);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,500);
}

//function to check character is over a canyon
function checkCanyon(t_canyon)
{
    if(gameChar_world_x > t_canyon.x_pos &&
       gameChar_world_x < t_canyon.x_pos + t_canyon.width &&
       gameChar_y == floorPos_y)
    {
        isPlummeting = true;
        isRight = false;
        isLeft = false;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

//function to draw collectable objects
function drawCollectable(t_collectable)
{
    var bob = sin(frameCount * 0.1) * 5;

    stroke(0);
    strokeWeight(2);

    fill(0);
    rect(
        t_collectable.x_pos+304,
        t_collectable.y_pos+305 + bob,
        t_collectable.size-48,
        t_collectable.size-35,
        20
    );

    fill(255,0,127);
    ellipse(
        t_collectable.x_pos+300,
        t_collectable.y_pos+300 + bob,
        t_collectable.size-30,
        t_collectable.size-30
    );
    ellipse(
        t_collectable.x_pos+(310+t_collectable.size-50),
        t_collectable.y_pos+300 + bob,
        t_collectable.size-30,
        t_collectable.size-30
    );

    fill(255,51,153);
    ellipse(
        t_collectable.x_pos+(305+(t_collectable.size-50)/1.6),
        t_collectable.y_pos+(290-(t_collectable.size-50)/1.1) + bob,
        t_collectable.size-30,
        t_collectable.size-30
    );

    strokeWeight(1);
}

//function to check character has collected an item
function checkCollectable(t_collectable)
{
    var d = dist(
        gameChar_world_x,
        gameChar_y,
        t_collectable.x_pos+304,
        t_collectable.y_pos+305
    );

    if(d < 50)
    {
        t_collectable.isFound = true;
        //increment score by 1
        game_score++;
    }
}

// ------------------------------------
// Flagpole render and check functions
// ------------------------------------

//draw flag function
function renderFlagpole()
{
    var wave = sin(frameCount * 0.1) * 3;

    //not reached 
    if(!flagpole.isReached)
    {
        stroke(0);
        strokeWeight(2);
        fill(165,42,42);
        rect(flagpole.x_pos,floorPos_y-40,2,40);

        fill(255,20,147);
        triangle(
            flagpole.x_pos, floorPos_y-40,
            flagpole.x_pos+20, floorPos_y-30 + wave,
            flagpole.x_pos, floorPos_y-20
        );
    }
    //reached 
    else
    {
        stroke(0);
        strokeWeight(2);
        fill(165,42,42);
        rect(flagpole.x_pos,floorPos_y-40,2,40);

        fill(255,20,147);
        triangle(
            flagpole.x_pos, floorPos_y-40,
            flagpole.x_pos+10, floorPos_y-20 + wave,
            flagpole.x_pos, floorPos_y-20
        );
    }
}

//check flag function
function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);

    if(d < 50)
    {
        flagpole.isReached = true;
        levelComplete = true;
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;
        
    }
}

//enemy
function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.inc = 1;
    this.walkFrame = 0;

    //draw enemy function
    this.draw = function()
    {
        //body
        stroke(0);
        strokeWeight(0.75);
        fill(120,150,240);
        rect(this.current_x,this.y-75,15,75);
        strokeWeight(2);
        
        //front legs
        stroke(0,0,205,190);

        if(this.walkFrame == 0)
        {
            line(this.current_x+7.5,this.y-30,this.current_x-10,this.y-55);
            line(this.current_x-10,this.y-55,this.current_x-20,this.y-15);

            line(this.current_x+7.5,this.y-30,this.current_x+25,this.y-55);
            line(this.current_x+25,this.y-55,this.current_x+35,this.y-15);
        }
        else
        {
            line(this.current_x+7.5,this.y-30,this.current_x-5,this.y-65);
            line(this.current_x-5,this.y-65,this.current_x-15,this.y-10);

            line(this.current_x+7.5,this.y-30,this.current_x+20,this.y-65);
            line(this.current_x+20,this.y-65,this.current_x+30,this.y-10);
        }

        //back legs
        stroke(0,0,205,190);
        line(this.current_x+7.5,this.y-30,this.current_x+23,this.y-65);
        line(this.current_x+23,this.y-65,this.current_x+30,this.y-10);
        line(this.current_x+7.5,this.y-30,this.current_x-7.5,this.y-65);
        line(this.current_x-7.5,this.y-65,this.current_x-15,this.y-10);
        
        //eye
        strokeWeight(0);
        fill(255,0,0);
        rect(this.current_x,this.y-67,15.5,4);
    }

    //moves enemy
    this.update = function()
    {
        this.current_x += this.inc;

        if(frameCount % 10 == 0)
        {
            this.walkFrame++;

            if(this.walkFrame > 1)
            {
                this.walkFrame = 0;
            }
        }

        //changes direction
        if(this.current_x < this.x)
        {
            this.inc = 1;
        }
        else if(this.current_x > this.x + this.range)
        {
            this.inc = -1;
        }
    }
    
    this.isContact = function(gc_x,gc_y)
    {
        var d = dist(
            gc_x,
            gc_y,
            this.current_x,
            this.y
        );

        return d < 25;
    }
}

// -------------------------
// Platform render function
// -------------------------

//function to create platform
function createPlatform(x,y,length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function()
        {
            stroke(0);
            strokeWeight(1);
            fill(0,100,0);
            rect(this.x,this.y,this.length,20);
            fill(190,105,50);
            rect(this.x,this.y+10,this.length,10);
        },
    }

    return p;
}

//function for window size
function windowResized()
{
    var scale = min(windowWidth / 1024, windowHeight / 576);

    var canvas = document.querySelector('canvas');

    canvas.style.width = (1024 * scale) + 'px';
    canvas.style.height = (576 * scale) + 'px';
    
    canvas.style.position = 'absolute';
    canvas.style.left = ((windowWidth - 1024 * scale) / 2) + 'px';
    canvas.style.top = ((windowHeight - 576 * scale) / 2) + 'px';
}