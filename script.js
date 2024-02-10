// Get the canvas element by ID
var canvas = document.getElementById("arena");
var ctx = canvas.getContext("2d");

// Set the background color to white
ctx.fillStyle = "#FFFFFF"; // Set fill color to white
ctx.fillRect(0, 0, canvas.width, canvas.height); // Cover the entire canvas

const ARENA_WIDTH = 485;
const ARENA_HEIGHT = 498;
const EMOJI_SIZE = 15;

class Shape {
  constructor(x, y, directionX, directionY, type) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.type = type;
  }

  move() {
    this.x += this.directionX;
    if (this.x > ARENA_WIDTH || this.x < 0) {
      this.directionX *= -1;
    }
    this.y += this.directionY;
    if (this.y > ARENA_HEIGHT || this.y < 13) {
      this.directionY *= -1;
    }
  }

  draw() {
    ctx.font = "12px serif";
    ctx.fillText(this.type, this.x, this.y);
  }

  fight(enemy) {
    let mymiddle = { x: this.x + 7, y: this.y - 5 };
    let enemymiddle = { x: enemy.x + 7, y: enemy.y - 5 };
    if (
      Math.abs(mymiddle.x - enemymiddle.x) < 15 &&
      Math.abs(mymiddle.y - enemymiddle.y) < 15
    ) {
      if (this.type === "🪨" && enemy.type === "📃") {
        this.type = "📃";
      } else if (this.type === "📃" && enemy.type === "✂️") {
        this.type = "✂️";
      } else if (this.type === "✂️" && enemy.type === "🪨") {
        this.type = "🪨";
      }
    }
  }
}

// Create 10 shapes of each type with random positions and directions
var shapes = [];
for (var i = 0; i < 30; i++) {
  shapes.push(
    new Shape(
      Math.random() * (ARENA_WIDTH - 6) + 6,
      Math.random() * (ARENA_HEIGHT - 50) + 50,
      Math.random() < 0.5 ? 1 : -1,
      Math.random() < 0.5 ? 1 : -1,
      "🪨"
    )
  );
  shapes.push(
    new Shape(
      Math.random() * (ARENA_WIDTH - 6) + 6,
      Math.random() * (ARENA_HEIGHT - 50) + 50,
      Math.random() < 0.5 ? 1 : -1,
      Math.random() < 0.5 ? 1 : -1,
      "📃"
    )
  );
  shapes.push(
    new Shape(
      Math.random() * (ARENA_WIDTH - 6) + 6,
      Math.random() * (ARENA_HEIGHT - 50) + 50,
      Math.random() < 0.5 ? 1 : -1,
      Math.random() < 0.5 ? 1 : -1,
      "✂️"
    )
  );
}

function drawArena() {
  ctx.fillStyle = "#FFFFFF"; // Set fill color to white
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Cover the entire canvas
  shapes.forEach((shape) => {
    shape.move();
    shape.draw();
    shapes.forEach((enemy) => {
      if (shape !== enemy) {
        shape.fight(enemy);
      }
    });
  });
  window.requestAnimationFrame(drawArena);
}

drawArena();
