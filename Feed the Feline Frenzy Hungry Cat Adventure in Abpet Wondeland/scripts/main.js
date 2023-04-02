let config = {
  type: Phaser.AUTO,
  width: 1536,
  height: 780,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: [MainMenu, GameScene1, CreditsScene, GameoverScene]
};


let game = new Phaser.Game(config);

function collectFish (player, fish)
{
  fish.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreUI.setText('Score: ' + score);
      // Check if 2 fishes have been collected
    fishescollected++;
  if (fishescollected % 2 === 0) {
    // Generate a urchin at a random x position within the game width
    let x = Phaser.Math.Between(0, game.config.width);
    let urchin = urchins.create(x, 16, 'urchin');
    urchin.setBounce(1);
    urchin.setCollideWorldBounds(true);
    urchin.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
  //  Remove the collected fish from the group
  collectSound = this.sound.add('collect');
  fishes.remove(fish);

  //  Add a new fish to the group
  let x = Phaser.Math.Between(0, game.config.width);
  let y = Phaser.Math.Between(0, game.config.height - 100);
  let newStar = fishes.create(x, y, 'fish');
  newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  //  Add and update the fishes
  Fishestext.setText('Fishes Collected: ' + fishescollected);
  collectSound.play();
  
  // Increase Player Size
  if (fishescollected % 5 === 0) {
    player.setScale(player.scaleX * 1.1, player.scaleY * 1.1);
}

  // Change the color of the player sprite
  player.setTint(colors[colorIndex]);
  colorIndex++;
  if(colorIndex >= colors.length) colorIndex = 0;

  if (fishes.countActive(true) === 0)
  {
      fishes.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

      });

  }
}

function hitUrchin(player, urchin) {
  gameOver = true;

  this.sound.stopByKey('bgmusic');
  this.sound.play('hit');
  player.setTint(0xff0000);
  player.anims.play('turn');
  this.sound.play('gameOver');

  player.disableBody(true, true);
  urchin.disableBody(true, true);

  this.scene.start('GameoverScene', { score: score, fishescollected: fishescollected });
}