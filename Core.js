//REFERENCIES
var consoleInput = document.getElementById("console_input");
var orbiteCheckbox = document.getElementById("orbite_checkbox");
var nameCheckbox = document.getElementById("name_checkbox");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//SETTINGS
var refreshTime = 1000 / 60;
setInterval(Update, refreshTime);
var time = 1;
var timeSpeed = 1;
var layerMax = 4;
var sSatelite = null;

const characters = {
  vowel: "aeiouy",
  consonnant: "bcdfghjklmnpqrstvwxz",
  all: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
};

var system = {
  speed: 10,
  position: {
    x: 0,
    y: 0
  },
  size: 1
};

const Scroll = e => {
  const direction = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
  system.size += -direction * 0.1;
  if(system.size < 0.1) system.size = 0.1;
};
document.addEventListener("wheel", Scroll);
document.addEventListener("mousewheel", Scroll);
document.addEventListener("DOMMouseScroll", Scroll);

class Satelite {
  constructor(radius, distance, layer) {
    this.position = {
      x: 0,
      y: 0
    };
    this.layer = layer;
    this.radius = radius;
    this.distance = distance;
    this.speed = 0;
    this.satelites = [];
    // If this satelite is not the center of the univers
    if(this.distance > 0)
      this.speed = 1 / this.distance;
    // Generate a random name to the planet
    this.name = GetRandomName();
    if(layer != 1) // Completly random color
      this.color = GetRandomColor(0, 255, 0, 255, 0, 255); 
    else // Sun color tone
      this.color = GetRandomColor(255, 255, 255, 255, 200, 255);
    if(layer < layerMax)
      this.GenerateSatelites(parseInt(6/layer), parseInt(10/layer)); 
    // Each step deeper into the iteration of the generation, reduce the number of satelite
    this.UpdatePosition(this.position);
  }

  UpdatePosition(center) {
    this.position.x =
      center.x +
      Math.cos(time * this.speed * system.speed) * this.distance * system.size;
    this.position.y =
      center.y +
      Math.sin(time * this.speed * system.speed) * this.distance * system.size;
    this.Draw(center);

    this.satelites.map((satelite, index) => {
      satelite.UpdatePosition(this.position);
    });
  }

  Draw(center) {

    // Draw the orbit of the planet if a checkbot is on
    if (orbiteCheckbox.checked) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.arc(center.x, center.y, this.distance * system.size, 0, 2 * Math.PI);
      ctx.lineWidth = 0.25;
      ctx.stroke();
    }
    // Draw the name of the planet if a checkbot is on
    if(nameCheckbox.checked)
    {
      ctx.font = `${15 * (system.size/(this.layer*2))}px 'Carter One`;
      ctx.fillStyle = this.color;
      ctx.textAlign = "center";
      ctx.fillText(
        this.name,
        this.position.x,
        this.position.y - this.radius * system.size - 10
      );
    }

    // Draw his own circle
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius * system.size,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  GenerateSatelites(_min, _max) {
    var nbSatelites = GetRandomInt(_min, _max);
    var lastDistance = this.radius * 1.5;
    for (var i = 0; i < nbSatelites; i++) {
      lastDistance += (this.radius/4) * (i+1) + GetRandomInt(-(this.radius/3), (this.radius/3));
      var _radius = (lastDistance / 45);
      this.satelites.push(new Satelite(_radius, lastDistance, this.layer+1));
    }
  }

  Collider(posX, posY)
  {
    if(Math.abs(posX - this.position.x) < this.radius * system.size
    && Math.abs(posY - this.position.y) < this.radius * system.size)
    {
      console.log(this.name);
      sSatelite = this;
      DisplaySatelite(sSatelite);
    }

    this.satelites.map((satelite, index) => {
      satelite.Collider(posX, posY);
    });
  }
}

var mainSatelite;
function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  system.position.x = canvas.width/2;
  system.position.y = canvas.height/2;
  mainSatelite = new Satelite(GetRandomInt(50, 75), 0, 1);
}

function Update() {
  // Clear the canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Redraw the background before anything else
  DrawBackground();
  // Update the mainSatelite (updating his satelites and so on)
  mainSatelite.UpdatePosition(system.position);
  Focus(sSatelite);
  // Refresh time value
  time = performance.now() / 1000;
}

function DrawBackground() {
  ctx.beginPath();
  ctx.fillStyle = "#0f1017";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

//#region CONTROLLER 
var drag = false;
var dragPosX = 0;
var dragPosY = 0;
function MovingMouse(event)
{
  if(drag)
  {
    system.position.x += event.clientX - dragPosX;
    system.position.y += event.clientY - dragPosY;
    dragPosX = event.clientX;
    dragPosY = event.clientY;
  }
}

function MouseDown(event)
{ 
  dragPosX = event.clientX;
  dragPosY = event.clientY;
  drag = true;

  sSatelite = null;
  
  mainSatelite.Collider(event.clientX, event.clientY);
}
function MouseUp(event)
{
  drag = false;
}
function Focus(sObject)
{
  if(sObject !== null)
  {
    system.position.x -= sObject.position.x - canvas.width/2;
    system.position.y -= sObject.position.y - canvas.height/2;
  }
}

// Resize the canvas if the page change width or height
window.onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// Change the timeScale value using when the user type in the command and hit enter
consoleInput.onchange = function() {
  console.log("Changing time from " + timeSpeed + " to " + consoleInput.value);
  system.speed = consoleInput.value;
};