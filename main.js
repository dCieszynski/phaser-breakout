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

let player = null;
let cursors = null;

function preload() {
  this.load.image("player", "/player.png");
}

function create() {
  player = this.physics.add.sprite(400, 550, "player").setScale(3, 1);
  cursors = this.input.keyboard.createCursorKeys();
  player.setBounceX(0.3);
  player.setCollideWorldBounds(true);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
  } else {
    if (player.body.speed) {
      player.body.setDragX(200);
    }
  }
}
