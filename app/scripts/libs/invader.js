/**
 * Created by mark on 07/01/2017.
 */
import GameObject from './gameObject';
import InvaderBullet from './invaderBullet';

export default class Invader extends GameObject {
  constructor(x, y, name, img, opts) {
    super(x, y, name, img, opts);
    this.type = 'invader';
    this.lastFired = Date.now();
    this.fireRate = 5+(Math.random()*15);
    this.xStep = 0.5;
    this.yStep = 20;
  }

  fire() {
    // TODO: fix the coordinate system
    var bullet= new InvaderBullet(this.x, this.y +((this.img.height*this.scale)/2),
      'inv-bullet'+Math.trunc(Math.random()*10000), this.img, this);
    game.add(bullet);
    this.lastFired = Date.now();
  }

  hit() {
  }

  update(horizontalState, verticalState) {

    this.x += horizontalState === "goingRight" ? this.xStep : -this.xStep;
    this.y += verticalState === "same" ? 0 : this.yStep;

    if (this.y > 460) {
      game.lost();
    }

    var dt = (Date.now() - this.lastFired) / 1000.0;
    if (dt > this.fireRate) {
      this.fire();
    }
  }

}
