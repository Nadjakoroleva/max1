let pic;
let background;
let memes;
let troll;
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let foodX = 0;
let foodY = 0;
let enemyX = 0;
let enemyY = 0;
let dx = 6;
let dy = 6;
let health = 0;
let dHealth = 0;
let score = 0;
let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(800, 800);
  foodX = random(50, 350);
  foodY = random(50, 350);
  enemyX = random(400, 700);
  enemyY = random(400, 700);

  r = random(0, 250);
  g = random(0, 250);
  b = random(0, 250);

  noStroke();

  health = parseInt(675);
}

function preload() {
  // preload() runs once
  background = loadImage("background.png");
  memes = loadImage("memes.png");
  troll = loadImage("troll.png");
  pic = loadImage("pic.png");
}

function draw() {
  background.resize(800, 800);
  image(background, 0, 0);
  pic.resize(0, 100);
  image(pic, x, y);
  fill(r, g, b);
  stroke(1);
  ellipse(foodX, foodY, 20, 20);

  //enemy movement

  if (score >= 5) {
    if (x > enemyX) {
      enemyX = enemyX + 1;
    } else if (x < enemyX) {
      enemyX = enemyX - 1;
    }

    if (y > enemyY) {
      enemyY = enemyY + 1;
    } else if (y < enemyY) {
      enemyY = enemyY - 1;
    }
    memes.resize(0, 175);
    image(memes, enemyX, enemyY);

    if (x > enemyX - 30 && x < enemyX + 30) {
      if (y > enemyY - 30 && y < enemyY + 30) {
        dHealth = dHealth - 1;
      }
    }
  }

  //eating food
  if (x > foodX - 125 && x < foodX + 5) {
    if (y > foodY - 100 && y < foodY + 10) {
      foodX = random(100, 700);
      foodY = random(100, 700);
      r = random(0, 250);
      g = random(0, 250);
      b = random(0, 250);

      fill(r, g, b);
      ellipse(foodX, foodY, 20, 20);

      score = score + 1;

      dHealth = dHealth + 85;
    }
  }

  fill(255);
  textSize(30);
  text(health, 25, 750);

  if (health > 0) {
    textSize(100);
    text(score, 350, 100);
  }

  //death
  if (health <= 0) {
    health = 0;

    troll.resize(800, 800);
    image(troll, 0, 0);
  } else {
    // life left
    if (health > 0) {
      if (score > 5) {
        fill("#0040FF");

        health = parseInt(675 - millis() / 37 + dHealth);
      }
      if (score <= 5) {
        fill("#0040FF");

        health = parseInt(675 - millis() / 30 + dHealth);
      }
    }

    if (health > 675) {
      health = 675;
    }
    if (health < 0) {
      health = 0;
    }

    rect(width - 700, 725, health, 30);
  }

  if (x < 0 || y < 0) {
    x = width / 2;
    y = height / 2;
  }

  if (x > width - 100 || y > height - 100) {
    x = width / 2;
    y = height / 2;
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    x = x + dx;
  } else if (keyCode == LEFT_ARROW) {
    x = x - dx;
  } else if (keyCode == DOWN_ARROW) {
    y = y + dy;
  } else if (keyCode == UP_ARROW) {
    y = y - dy;
  }
}
