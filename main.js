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

// Blocks
let blocks = null;

function preload() {
  this.load.image("block", "/block.png");
  this.load.image("player", "/player.png");
}

function create() {
  // Initializing blocks
  blocks = this.physics.add.staticGroup();

  blocks.createMultiple({
    key: "block",
    quantity: 69,
  });

  Phaser.Actions.GridAlign(blocks.getChildren(), {
    width: 23,
    height: 3,
    cellWidth: 34,
    cellHeight: 34,
    x: 28,
    y: 32,
  });

  // Initializing player
  player = this.physics.add.sprite(400, 550, "player").setScale(3, 1);
  cursors = this.input.keyboard.createCursorKeys();
  player.setBounceX(0.5);
  player.setCollideWorldBounds(true);
  player.body.maxVelocity.x = playerMaxSpeed;
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
