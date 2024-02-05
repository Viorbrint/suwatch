const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 600;
const HEIGHT = 600;

const COLORS = {
  c1: "#BA4CFF",
  c2: "#FFBF4D",
  c3: "#4DFF9D",
}

canvas.width = WIDTH;
canvas.height = HEIGHT;

const RAD1 = 380 / 2;
const RAD2 = 323 / 2;
const RAD3 = 266 / 2;

let date;
let day;
let hour;
let minute;

let millisFromDay;
let millisFromHour;
let millisFromMinute;

let hoursFromDay;
let minutesFromHour;
let secondsFromMinute;

window.requestAnimationFrame(draw);

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  doTimeCalcs();
  drawSemicircle(RAD1, timeToDegree(hoursFromDay, 12), COLORS.c1);
  drawSemicircle(RAD2, timeToDegree(minutesFromHour, 60), COLORS.c2);
  drawSemicircle(RAD3, timeToDegree(secondsFromMinute, 60), COLORS.c3);
  window.requestAnimationFrame(draw);
}

function doTimeCalcs() {
  date = new Date();
  day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  hour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
  minute = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());

  millisFromDay = date - day;
  millisFromHour = date - hour;
  millisFromMinute = date - minute;

  hoursFromDay = millisFromDay / 1000 / 60 / 60;
  minutesFromHour = millisFromHour / 1000 / 60;
  secondsFromMinute = millisFromMinute / 1000;

  if(hoursFromDay > 12) {
    hoursFromDay -= 12;
  }
}

function timeToDegree(time, bounds) {
  return time * 2 * Math.PI / bounds;
}

function drawSemicircle(radius, degree, color) {
  degree -= Math.PI / 2;
  ctx.beginPath();

  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    -Math.PI / 2,
    degree,
    false
  );

  ctx.strokeStyle = color;
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.stroke();
}