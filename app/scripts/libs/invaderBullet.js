/**
 * Created by mark on 07/01/2017.
 */
import GameObject from './gameObject';

export default class InvaderBullet extends GameObject {
  constructor(x, y, name, img, opts) {
    super(x, y, name, img, opts);
    this.checkCollision = true;
    this.collisionTargets = 'player|wallBlock';
    this.damage = 10;
    this.scale = 0.05;
  }

  // we have hit something
  hit(targetObj) {
    if (targetObj.takeDamage(this.damage) === 0) {
      // the targetObj is now dead
      targetObj.kill();
    }
    // Our work is done
    game.remove(this.name);
  }

  update() {
    // todo: fix constant
    if (this.y < 480) {
      this.y += 1;
    } else {
      game.remove(this.name);
    }
    super.update();
  }

}
