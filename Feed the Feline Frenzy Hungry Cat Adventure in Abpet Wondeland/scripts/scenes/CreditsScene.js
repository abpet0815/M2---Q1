class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('creditsImage', 'assets/Misc/CreditsImage.png');
        this.load.image('BackButton', 'assets/Buttons/Back.png');
        this.load.image('BackButtonHover', 'assets/Buttons/BackHover.png');
    }

    create() {
        // Add the background image
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Add the image for the credits
        let creditsImage = this.add.image(1536/2, 350, 'creditsImage');
        creditsImage.setScale(1.2);

        // Add the "Back to Main Menu" button
        let backButton = this.add.image(50, 50, 'BackButton').setInteractive();
        backButton.setScale(0.15);
        backButton.on('pointerover', () => {
            backButton.setTexture('BackButtonHover');
            backButton.setScale(0.15);
        });
        backButton.on('pointerout', () => {
            backButton.setTexture('BackButton');
            backButton.setScale(0.15);
        });
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}