class GameoverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameoverScene' });
    }

    preload () {
        this.load.image('RestartButton', 'assets/Buttons/Restart.png');
        this.load.image('RestartButtonHover', 'assets/Buttons/RestartHover.png');
        this.load.image('MenuButton', 'assets/Buttons/Menu.png');
        this.load.image('MenuButtonHover', 'assets/Buttons/MenuHover.png');
    }
  
    create() {

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');

      // Display a "Game Over" message
      let message = this.add.text(centerX, centerY - 100, 'Game Over', {
        fontSize: '64px',
        color: '#fff',
        backgroundColor: '#000',
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5);
  
      // Show the score and the fishes collected
      let scoreText = this.add.text(centerX, centerY, 'Score: ' + score, {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
      });
  
      scoreText.setOrigin(0.5);
  
      let fishesText = this.add.text(centerX, centerY + 50, 'Fishes Collected: ' + fishescollected, {
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
      });
  
      fishesText.setOrigin(0.5);

       // Make the message and the score text flash
       this.tweens.add({
        targets: [message, scoreText, fishesText],
        alpha: 0,
        duration: 500,
        ease: 'Power2',
        yoyo: true,
        repeat: -1
      });
  
      // Add restart button
      let restartButton = this.add.image(centerX - 100, centerY + 200, 'RestartButton').setScale(0.18);
  
      restartButton.setInteractive({ useHandCursor: true });
      restartButton.on('pointerdown', () => {
        this.sound.stopAll();
        score = 0; // Reset the score to zero
        fishescollected = 0; // Reset the fishes collected to zero
        this.scene.start('GameScene1');
      });
      restartButton.on('pointerover', () => {
        restartButton.setTexture('RestartButtonHover');
        restartButton.setScale(0.18);
    });
    restartButton.on('pointerout', () => {
        restartButton.setTexture('RestartButton');
        restartButton.setScale(0.18);
    });
  
      // Add back to main menu button
      let mainMenuButton = this.add.image(centerX + 100, centerY + 200, 'MenuButton').setScale(0.18);
  
      mainMenuButton.setInteractive({ useHandCursor: true });
      mainMenuButton.on('pointerdown', () => {
        this.sound.stopAll();
        this.scene.start('MainMenu');
      });
      mainMenuButton.on('pointerover', () => {
        mainMenuButton.setTexture('MenuButtonHover');
        mainMenuButton.setScale(0.18);
    });
    mainMenuButton.on('pointerout', () => {
        mainMenuButton.setTexture('MenuButton');
        mainMenuButton.setScale(0.18);
    });
    }
}