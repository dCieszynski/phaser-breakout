import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    gravity: { y: 0 },
    debug: false,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

// Player variables
let player = null;
let playerAcceleration = 30;
let playerMaxSpeed = 390;
let cursors = null;

// Ball
let ball = null;

function preload() {
  this.load.image("player", "/player.png");
  this.load.image("ball", "/ball.png");
}

function create() {
  // Initializing player
  player = this.physics.add
    .sprite(400, 550, "player")
    .setScale(3, 1)
    .setImmovable();
  cursors = this.input.keyboard.createCursorKeys();
  player.setBounceX(0.5);
  player.setCollideWorldBounds(true);
  player.body.maxVelocity.x = playerMaxSpeed;

  // Initializing ball
  ball = this.physics.add.sprite(player.x, 500, "ball");
  ball.setBounce(1);
  ball.setCollideWorldBounds(true, true, true, false);
  ball.setVelocity(-75, 300);
  this.physics.add.collider(ball, player, this.hitPlayer, null, this);

  function hitPlayer(ball, player) {
    let diff = 0;

    if (ball.x < player.x) {
      diff = player.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > player.x) {
      diff = ball.x - player.x;
      ball.setVelocityX(10 * diff);
    } else {
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }
}

function update() {
  // Player input and movement
  if (cursors.left.isDown) {
    player.setVelocityX(
      Math.max(player.body.velocity.x - playerAcceleration, playerMaxSpeed * -1)
    );
  } else if (cursors.right.isDown) {
    player.setVelocityX(
      Math.min(player.body.velocity.x + playerAcceleration, playerMaxSpeed)
    );
  } else {
    player.setVelocityX(Phaser.Math.Linear(player.body.velocity.x, 0, 0.2));
  }
}
