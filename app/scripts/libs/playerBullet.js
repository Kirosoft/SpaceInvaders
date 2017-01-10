import GameObject from './gameObject';

export default class InvaderBullet extends GameObject {
  constructor(x, y, name, img, player, opts) {
    super(x, y, name, img, opts);
    this.scale = 0.1;
    this.player = player;
    this.damage = 20;
    this.checkCollision = true;
    this.collisionTargets = 'invader|wallBlock';
    this.bulletSpeed = 2;
  }

  // we have hit something
  hit(targetObj) {
    if (targetObj.takeDamage(this.damage) === 0) {
      // the targetObj is now dead
      targetObj.kill();
    }
    // indicate the player scored a hit
    this.player.hit();

    // Our work is done
    game.remove(this.name);
  }

  update() {
    if (this.y > 0) {
      this.y -= this.bulletSpeed;
    } else {
      game.remove(this.name);
    }
    super.update();
  }
}
