let gameRunning = false;
let score = 0;
let maxTime = 30_000; // in milliseconds, = 30s
let timeRemaining = 0;
let spawnDelay = 400; // milliseconds, has to be divisible by tick speed
let tickspeed = 10; // how many milliseconds between each tick
let spots = [];
let menuAnimateDuration = 700;
let hareAnimateDuration = 200;
let uptime = 4000; // Actually value has hareAnimatDuration added due to animation
let totalUp = 0;
let gameInterval = null;

class Hare{
    constructor(el){
        this.isUp = false;
        this.stamp = null;
        this.el = $(el);
        this.buffer = false;
        this.downTimeout = null;
        this.resetTimeout = null;

        this.el.on('click', () => {
            score += this.click();
            $("#score > span").text(score);
        })
    }

    click(){
        if(!gameRunning) return 0;

        if(this.isUp){
            clearTimeout(this.downTimeout);
            clearTimeout(this.resetTimeout);
            this.isUp = false;
            let x = Date.now() - this.stamp;
            this.stamp = null;
            this.buffer = true;
            this.el.addClass('hidden').removeClass('displayed');
            setTimeout(() => {
                this.buffer = false;
            }, hareAnimateDuration);
            totalUp--;
            return Math.max(Math.ceil(x / -950 + 5), 0);
        }else if(this.buffer){
            return 0;
        }else{
            return -4;
        }
    }

    up(){
        clearTimeout(this.downTimeout);
        this.isUp = true;
        this.stamp = Date.now();
        this.el.addClass('displayed').removeClass('hidden');
        totalUp++;
        this.resetTimeout = setTimeout(() => {
            this.down();
        }, uptime);
    }

    down(){
        clearTimeout(this.resetTimeout);
        this.el.addClass('hidden').removeClass('displayed');
        this.downTimeout = setTimeout(() => {
            this.stamp = null;
            this.isUp = false;
            totalUp--;
        }, hareAnimateDuration);
    }
}

$(document).ready(() => {
    spots = $("#spots > div").map((i, hare) => {
        return new Hare(hare);
    }).get();

    let highscores = [0,0,0,0,0,0,0,0,0];
    highscores.forEach((score, i) => {
        $("#highscores > ul").append($("<li>" + (i + 1) + ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + score + "</li>"))
    })
});

const startClicked = () => {
    $("#menu").addClass('hidden');
    $("#game").addClass('displayed').removeClass('hidden');
    $("#spots > div").removeClass('hidden').addClass('displayed');
    setTimeout(() => {
        $("#countdown").removeClass('dnone');
        $("#countdown > span").text('3');
        setTimeout(() => {
            $("#countdown > span").text('2');
        }, 1000);
        setTimeout(() => {
            $("#countdown > span").text('1');
        }, 2000);
        setTimeout(() => {
            $("#countdown").addClass('dnone');
            $("#spots > div").addClass('hidden').removeClass('displayed');
            startGame();
        }, 3000);
    }, menuAnimateDuration);
}

const startGame = () => {
    $("#time > span").text(Math.floor(maxTime / 1000));
    $("#score > span").text(0);
    gameRunning = true;
    timeRemaining = maxTime;
    let spawnWindow = spawnDelay;
    gameInterval = setInterval(() => {
        spawnWindow -= tickspeed;
        if(spawnWindow == 0 && totalUp <= spots.length){
            spawnWindow = spawnDelay;
            let random = Math.floor(Math.random() * 16);
            while(spots[random].isUp){
                random = Math.floor(Math.random() * 16);
            }
            console.log()
            spots[random].up();
        }
        timeRemaining -= tickspeed;
        if(timeRemaining % 1000 == 0){
            $("#time > span").text(timeRemaining / 1000);
        }
        if(timeRemaining == 0){
            stopGame();
        }
    }, tickspeed);
}

const stopGame = () => {
    clearInterval(gameInterval);
    gameRunning = false;
}

const helpClicked = () => {
    $("#menu").removeClass('displayed').addClass('hidden');
    $("#help").removeClass('hidden').addClass('displayed');
}

const highClicked = () => {
    $("#menu").removeClass('displayed').addClass('hidden');
    $("#highscores").removeClass('hidden').addClass('displayed');
}

const backClicked = (content) => {
    $("#menu").addClass('displayed').removeClass('hidden');
    $("#" + content).addClass('hidden').removeClass('displayed');
}