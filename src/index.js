const droneSpirit = document.querySelector(".drone-sprite");
const drone = document.getElementById("drone");
const moveLeftButton = document.getElementById("left");
const moveRightButton = document.getElementById("right");
const modal = document.getElementById("popUpModal");
const closeBtn = document.getElementsByClassName("close")[0];
const xAxis = document.getElementById("x-axis");
const yAxis = document.getElementById("y-axis");
const direction = document.getElementById("direction");
const sendBtn = document.getElementById("send");
const moveBtn = document.getElementById("move");
const shootBtn = document.getElementById("attack");
const bulletContainer = document.getElementById("bullet-container");
const place = document.getElementById("place");
const buttonArea = document.getElementById("btn-area");
const report = document.getElementById("report");

let bullets = [];

// When the page loads, show the modal
window.onload = function () {
  buttonArea.style.opacity = 0;
  drone.style.display = "none";
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
  drone.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    drone.style.display = "block";
  }
};

sendBtn.onClick = function () {
  modal.style.display = "none";
  buttonArea.style.opacity = 4;
};

// initial drone positioning

let dronePositionX, dronePositionY;
sendBtn.addEventListener("click", () => {
  dronePositionX = xAxis.value;
  dronePositionY = yAxis.value;
  if (direction.value === "east") {
    document.querySelector(".drone-sprite").style.transform = "rotate(90deg)";
  }
  if (direction.value === "south") {
    document.querySelector(".drone-sprite").style.transform = "rotate(180deg)";
  }
  if (direction.value === "west") {
    document.querySelector(".drone-sprite").style.transform = "rotate(270deg)";
  }
});

function hasPosition() {
  if (dronePositionX && dronePositionY) return true;
  return false;
}

if (hasPosition) {
  droneSpirit.style.bottom = dronePositionX;
  droneSpirit.style.left = dronePositionY;
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  droneSpirit.style.bottom = document.getElementById("x-axis").value;
  droneSpirit.style.left = document.getElementById("y-axis").value;
  drone.style.display = "block";
  modal.style.display = "none";
  buttonArea.style.opacity = 4;
});

report.addEventListener("click", () => {
  alert(
    dronePositionX +
      "y-axis" +
      " " +
      dronePositionY +
      "y-axis" +
      " " +
      direction.value
  );
});

place.addEventListener("click", () => {
  modal.style.display = "block";
});

// function moveSpriteUp() {
moveLeftButton.addEventListener("click", () => {
  const currentLeft = Number(droneSpirit.style.left.slice(0, -2));
  droneSpirit.style.left = currentLeft + 10 + "px";
});

moveRightButton.addEventListener("click", () => {
  const currentRight = Number(droneSpirit.style.left.slice(0, -2));
  droneSpirit.style.left = currentRight - 10 + "px";
});

function moveNorth() {
  const currPos = Number(droneSpirit.style.bottom.slice(0, -2));
  droneSpirit.style.bottom = currPos + 10 + "px";
}

function moveEast() {
  const currPos = Number(droneSpirit.style.left.slice(0, -2));
  droneSpirit.style.left = currPos + 10 + "px";
}

function moveWest() {
  const currPos = Number(droneSpirit.style.left.slice(0, -2));
  droneSpirit.style.left = currPos - 10 + "px";
}

function moveSouth() {
  const currPos = Number(droneSpirit.style.bottom.slice(0, -2));
  droneSpirit.style.bottom = currPos - 10 + "px";
  console.log(currPos);
}

moveBtn.addEventListener("click", () => {
  switch (direction.value) {
    case "east":
      moveEast();
      break;

    case "west":
      moveWest();
      break;

    case "south":
      moveSouth();
      break;

    default:
      moveNorth();
      break;
  }
});

shootBtn.addEventListener("click", () => {
  const bullet = document.createElement("button");
  bullet.className = "bullet";
  bullet.style.left = drone.offsetLeft + "px";
  bullet.style.top = drone.offsetTop + "px";
  bullets.push(bullet);
  bulletContainer.appendChild(bullet);
});

function moveBullets() {
  bullets.forEach((bullet) => {
    bullet.style.top = parseInt(bullet.style.top) - 10 + "px";
    if (parseInt(bullet.style.top) < 0) {
      bulletContainer.removeChild(bullet);
      bullets = bullets.filter((b) => b !== bullet);
    }
  });
}

setInterval(moveBullets, 50);