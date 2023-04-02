      let player;
      let fishes;
      let urchins;
      let platforms;
      let cursors;
      let fishescollected = 0;
      let gameOver = false;
      let Fishestext;
      let score = 0;
      let scoreUI;
      let colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0xee82ee];
      let colorIndex = 0;
      
      let centerX = 1568/2
      let centerY = 788/2

      class GameScene1 extends Phaser.Scene {
        constructor(){
            super('GameScene1')
        }

      preload ()
      {
        this.load.image('gradientbg', 'assets/Background/BG1.png');
        this.load.image('ground', 'assets/Misc/Platform.png');
        this.load.image('fish', 'assets/Misc/fish.png');
        this.load.image('urchin', 'assets/Misc/urchin.png');
        this.load.spritesheet('neko', 'assets/SpriteSheet/ShiroiNeko.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('bgmusic', 'assets/Audio/BGM.mp3');
        this.load.audio('collect', 'assets/Audio/Collect.wav');
        this.load.audio('hit', 'assets/Audio/Hit.wav');
        this.load.audio('gameOver', 'assets/Audio/GameOver.mp3');
      }
      
      create ()
      {
        this.add.image(770, 370, 'gradientbg');
      
        platforms = this.physics.add.staticGroup();
      
        //  Main Ground
        platforms.create(200, 770, 'ground').setScale(1).refreshBody();
        platforms.create(600, 770, 'ground').setScale(1).refreshBody();
        platforms.create(1000, 770, 'ground').setScale(1).refreshBody();
        platforms.create(1400, 770, 'ground').setScale(1).refreshBody();
      
        //  Ledges
        platforms.create(600, 450, 'ground');
        platforms.create(1400, 630, 'ground');
        platforms.create(1100, 530, 'ground');
        platforms.create(1200, 330, 'ground');
        platforms.create(880, 670, 'ground');
        platforms.create(400, 630, 'ground');
        platforms.create(150, 330, 'ground');
        platforms.create(250, 130, 'ground');
        platforms.create(1400, 150, 'ground');
        platforms.create(800, 200, 'ground');
      
        player = this.physics.add.sprite(100, 450, 'neko');
      
        this.sound.add('bgmusic', { 
          loop: true,
          volume: 0.3
        }).play();
      
        this.sound.add('gameOver', { 
          loop : true,
          volume: 0.3
      });
  
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
      
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('neko', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
      
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'neko', frame: 4 } ],
            frameRate: 20
        });
      
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('neko', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        cursors = this.input.keyboard.createCursorKeys();
      
        fishes = this.physics.add.group({
            key: 'fish',
            repeat: 0,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
      
        fishes.children.iterate(function (child) {
      
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      
        });
      
        urchins = this.physics.add.group();
      
        //  The Fishes collected
      Fishestext = this.add.text(1145, 16, 'Fishes Collected: 0', { fontSize: '32px', fill: '#000' });
      
        // The Score
      scoreUI = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
      
        //Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fishes, platforms);
        this.physics.add.collider(urchins, platforms);
      
        this.physics.add.overlap(player, fishes, collectFish, null, this);
      
        this.physics.add.collider(player, urchins, hitUrchin, null, this);
      }
      
      update ()
      {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
      
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
      
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
      
            player.anims.play('turn');
        }
      
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
      }

      
    }