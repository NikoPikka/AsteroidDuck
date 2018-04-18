
//var hahmo = document.getElementById("hahmo");
var tausta = document.getElementById("tausta");
//var vihollinen = document.getElementById("vihollinen");

//Hahmo objecti
var rocket = {
    hahmo: document.getElementById("hahmo"),
    X: 25, 
    Y: 130,
    W: 105,
    H: 47,
};

//Liikuta hahmoa SPACEBARilla
document.getElementById("peli").addEventListener("keydown", function(event){
    if(event.which == 32){
        pushup = true;
        rocket.hahmo.src = "img/rocketon.png";
    }
    if(event.which == 13 && col == true){
        restart();
    }
    if(event.which == 81 && col == true){
        window.close();
    }
});

document.getElementById("peli").addEventListener("keyup", function(event){
    if(event.which == 32){
        pushup = false;
        rocket.hahmo.src = "img/rocket.png";
    }
});

//Asteroidien taulukko ja määrä.
var asteroidList = [];
addAsteroids(100); 


var muutosy = 0;
var muutosx = -10;
const PAINOVOIMA = 0.3;
var pushup = false;
var col = false;


var timer;
var score = 0;
if(!sessionStorage.highscore){
    sessionStorage.highscore = 0;
}

asteroidList[0].vihollinen.style.top = asteroidList[0].Y + "px";
asteroidList[0].vihollinen.style.left = asteroidList[0].X + "px";

rocket.hahmo.style.top = rocket.Y + "px";
rocket.hahmo.style.left = rocket.X + "px";

function mainloop(){
    update();
    enemyUpdate();
    collision();
    document.getElementById("info").innerHTML ="Score: " + score + "<br/>";
    document.getElementById("info").innerHTML +="Highscore: " + sessionStorage.highscore;
}

//Hahmon putoaminen + hahmolle alueen rajat
function update(){
    if(pushup && muutosy > -6){
        muutosy -= 0.7;
    }
    else{
        muutosy += PAINOVOIMA;
    }
    
    rocket.Y += muutosy;
    
    if(rocket.Y > 529){
        muutosy = 0;
        rocket.Y = 529;
        // score -= 0.5;
    }
    
    if(rocket.Y < 0){
        muutosy = 0;
        rocket.Y = 0;
        // score -= 0.5;
    }
    rocket.hahmo.style.top = rocket.Y + "px";
}



//Liikuta vihollista + tarkista vihollisen sijainti pistelaskuria varten
function enemyUpdate(){
    for(var i = 0; i < asteroidList.length; i++){
        asteroidList[i].X += muutosx;
        
        if(asteroidList[i].X < -51){
            if(i == 0){
                asteroidList[i].X = asteroidList[asteroidList.length-1].X + 100;
                
            }else if (i > 0) {
                asteroidList[i].X = asteroidList[i-1].X + 100;
            }
            asteroidList[i].Y = Math.random()*545;
            scorecounter();
        if(score % 10 == 0){
            muutosx -= 0.2;
        }   
        }
    
    asteroidList[i].vihollinen.style.top = asteroidList[i].Y + "px";
    asteroidList[i].vihollinen.style.left = asteroidList[i].X + "px";
    }
}

//Törmäys + pistelaskuri
function collision(){
    for(var i = 0; i < asteroidList.length; i++){
        if((rocket.Y > asteroidList[i].Y - rocket.H + 10 && rocket.Y + 10 < asteroidList[i].Y + asteroidList[i].H) && (rocket.X > asteroidList[i].X + 5 - rocket.W + 5 && rocket.X + 40 < asteroidList[i].X + asteroidList[i].W + 5) ){
            col = true;  
            clearInterval(timer);
            
            
            document.getElementById("info2").innerHTML = "You scored: " + score + " </br>";
            if(score > sessionStorage.highscore){
                sessionStorage.highscore = score;
                document.getElementById("info2").innerHTML += "New highscore: " + sessionStorage.highscore + "<br/>";
                
            }
            document.getElementById("info2").innerHTML += "Press ENTER to restart <br/> Press Q to exit";
            
            document.getElementById("info2").style.visibility = "visible";
        }
         
    }
}

function scorecounter(){
           score += 1;
}

//Vihollisen luonti!
function addAsteroids(number){
    for(var i = 0; i < number; i++){
        var newAsteroid = document.createElement("IMG");
            newAsteroid.src ="img/asteroid.png";
            newAsteroid.style.position = "absolute";
            newAsteroid.style.visibility = "hidden";
            tausta.appendChild(newAsteroid);
            
            
        var asteroid = {
            vihollinen: newAsteroid,
            X: 1075 + i * 100,
            Y: Math.random()*545,
            W: 50,
            H: 50,
           
        };
        
        asteroidList.push(asteroid);
    }
}

function StartGame(){
    document.getElementById("menu").style.visibility="hidden";
    document.getElementById("button").style.visibility="hidden";
    document.getElementById("extbutton").style.visibility="hidden";
    document.getElementById("button").blur();
    timer = setInterval(mainloop,25);
    for(var i = 0; i < asteroidList.length; i++){
        asteroidList[i].vihollinen.style.visibility = "visible";
    }
    
}

// Pelin uudelleenkäynnistys
function restart(){
    rocket.X = 25;
    rocket.Y = 130;
    score = 0;
    muutosx = -10;
    document.getElementById("info2").style.visibility = "hidden";
    for(var i = 0; i < asteroidList.length; i++){
        asteroidList[i].X = 1075 + + i * 100;
        asteroidList[i].Y = Math.random()*545;
    }
    timer = setInterval(mainloop,25);
    col = false;
}

