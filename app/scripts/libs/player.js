import GameObject from './gameObject';
import PlayerBullet from './playerBullet';

export default class Player extends GameObject {

  constructor(x, y, name, img, input, opts) {
    super(x, y, name, img, opts);
    this.input = input;
    this.speed = 3;
    this.lastFired = Date.now();
    this.fireRate = 0.1;
    this.score = 0;
    this.type = 'player';
    this.lives = 3;
  }

  left() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  right() {
    // TODO: Fix this constant
    if (this.x < 640) {
      this.x += this.speed;
    }
  }

  fire() {
    var bullet= new PlayerBullet(this.x, this.y -((this.img.height*this.scale)/2),
                'bullet'+Math.trunc(Math.random()*10000), this.img, this);
    game.add(bullet);
    this.lastFired = Date.now();
  }

  hit(obj) {
    this.score += 10;
  }

  takeDamage(damage) {
    if (this.lives > 0) {
      this.lives -= 1;
    }
    return this.lives;
  }

  kill() {
    game.lost();
  }

  render(ctx) {
    super.render(ctx);

    ctx.strokeStyle = 'white';
    ctx.strokeText("Lives: "+this.lives, 10, 50);
    ctx.strokeText("Score: "+this.score, 420, 50);
  }

  update() {
    if (this.input.actions['left'] === true) {
      this.left();
    }
    if (this.input.actions['right'] === true) {
      this.right();
    }
    if (this.input.actions['space'] === true) {
      var dt = (Date.now() - this.lastFired) / 1000.0;
      if (dt > this.fireRate) {
        this.fire();
      }
    }

    this.input.clearPressed();
  }
}
