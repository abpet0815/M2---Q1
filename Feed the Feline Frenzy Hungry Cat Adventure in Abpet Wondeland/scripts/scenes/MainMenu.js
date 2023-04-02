class MainMenu extends Phaser.Scene {
    constructor(){
        super('MainMenu')
    }

    preload () {
        this.load.image('background', 'assets/Background/BG1.png');
        this.load.image('logo', 'assets/Misc/Logo.png');
        this.load.image('startButton', 'assets/Buttons/Play.png');
        this.load.image('startButtonPressed', 'assets/Buttons/PlayHover.png')
        this.load.image('creditsButton', 'assets/Buttons/Credits.png');
        this.load.image('creditsButtonPressed', 'assets/Buttons/CreditsHover.png');
        this.load.image('exitButton', 'assets/Buttons/QuitButton.png');
        this.load.image('exitButtonPressed', 'assets/Buttons/QuitButtonHover.png');
        this.load.audio('backgroundMusic', 'assets/Audio/Introbgm.mp3');
        this.load.on('complete', () => {
            this.sound.add('backgroundMusic', { 
                loop: true,
                volume: 0.2
            }).play();
        });
    }
  
    create() {
        // Add the background image
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        
        // Add the logo
        let logo = this.add.image(1536/2, 300, 'logo');
        logo.setScale(0.7);

        // Add the "Start Game" button
        let startButton = this.add.image(logo.x - logo.width/2 + 250, logo.y + logo.displayHeight/2 + 70, 'startButton').setInteractive({ useHandCursor: true });
        startButton.setScale(0.18);
        
        startButton.on('pointerover', () => {
            startButton.setTexture('startButtonPressed');
            startButton.setScale(0.18);
        });
        startButton.on('pointerout', () => {
            startButton.setTexture('startButton');
            startButton.setScale(0.18);
        });
        startButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('GameScene1');
        });

        // Add the "Credits" button
        let creditsButton = this.add.image(startButton.x + 110, startButton.y, 'creditsButton').setInteractive({ useHandCursor: true });
        creditsButton.setScale(0.18);

        creditsButton.on('pointerover', () => {
        creditsButton.setTexture('creditsButtonPressed');
        creditsButton.setScale(0.18);
        });

        creditsButton.on('pointerout', () => {
        creditsButton.setTexture('creditsButton');
        creditsButton.setScale(0.18);
        });

        creditsButton.on('pointerdown', () => {
        this.scene.start('CreditsScene');
        });

        // Add the "Exit" button
        let exitButton = this.add.image(creditsButton.x + 110, creditsButton.y, 'exitButton').setInteractive({ useHandCursor: true });
        exitButton.setScale(0.18);

        exitButton.on('pointerover', () => {
            exitButton.setTexture('exitButtonPressed');
            exitButton.setScale(0.18);
        });
        exitButton.on('pointerout', () => {
            exitButton.setTexture('exitButton');
            exitButton.setScale(0.18);
        });
        exitButton.on('pointerdown', () => {

            if (confirm("Are you sure you want to exit?")) {
                window.close();
            }
        });
    }

    update(){
        
    }
}