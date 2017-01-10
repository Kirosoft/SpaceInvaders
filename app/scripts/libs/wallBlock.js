/**
 * Created by mark on 07/01/2017.
 */
import GameObject from './gameObject';
import InvaderBullet from './invaderBullet';

export default class WallBlock extends GameObject {
  constructor(x, y, name, img, opts) {
    super(x, y, name, img, opts);
    this.type = 'wallBlock';
    this.scale = 1.0;
  }
}
