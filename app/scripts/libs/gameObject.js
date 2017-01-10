
export default class GameObject {

  constructor(x, y, name, img, opts) {
    this.initialX = x;
    this.initialY = y;
    this.width = img.width;
    this.height = img.height;
    this.img = img;
    this.name = name;
    this.opts = opts || {};
    this.scale = 0.2;
    this.checkCollision = false;
    this.collisionTargets = null;
    this.type = null;

    this.reset();
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }

  getBounds() {
    return {
      left: this.x - ((this.img.width * this.scale) / 2),
      top: this.y - ((this.img.height * this.scale) / 2),
      right: this.x + ((this.img.width * this.scale) / 2),
      bottom: this.y + ((this.img.height * this.scale) / 2)
    }
  };

  intersect(a, b) {
    return (a.left <= b.right &&
    b.left <= a.right &&
    a.top <= b.bottom &&
    b.top <= a.bottom)
  }

  intersectsWith(gameObject) {
    return this.intersect(this.getBounds(), gameObject.getBounds());
  }

  update() {
    var _this = this;
    if (this.checkCollision) {
      $.map(game.checkCollisions(this, this.collisionTargets), function(gameObject) {
        _this.hit(gameObject);
      });
    }
  }

  // we have hit something
  hit() {
  }

  // we have been hit by something
  takeDamage(damagePoints) {
    // indicate we have no points left
    return 0;
  }

  kill() {
    game.remove(this.name);
  }

  render(ctx) {
    ctx.drawImage(this.img, this.x - ((this.img.width* this.scale) / 2),
                  this.y - ((this.img.height* this.scale) / 2),
                  this.img.width * this.scale, this.img.height * this.scale);
  }

}
