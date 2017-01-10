import requestAnimFrame from './utils';
import InvaderController from './invaderController'

export default class Game {

  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.gameObjects = {};
    this.lastTime = null;
    this.backgroundColour = '#0000000';
    this.player = null;
    this.invaderController = new InvaderController(this);
    this.finished = false;

    this.reset();
  }

  reset() {
    this.clear();
    $.map(this.gameObjects, (gameobject) => gameObject.reset());
    this.invaderController.reset();
  }

  add(gameObject) {
    this.gameObjects[gameObject.name] = gameObject;
  }

  addPlayer(player) {
    this.player = player;
  }

  remove(gameObjectName) {
    delete this.gameObjects[gameObjectName];
  }

  start() {
    this.finished = false;
    this.lastTime = Date.now();
    this.loop();
  }

  stop() {
    this.finished = true;
  }

  loop() {
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000.0;

    this.clear();

    this.update(dt);
    this.render();

    this.lastTime = now;

    if (!this.finished) {
      requestAnimFrame(this.loop.bind(this));
    }
  }

  filterBy(filterFunc) {
    return $.map(this.gameObjects, filterFunc);
  }

  checkCollisions(sourceObject, targetType) {

    if ((!targetType) || (!sourceObject)) {
      return;
    }

   return $.map(this.gameObjects, function(gameObject) {
      if ((targetType.split('|').indexOf(gameObject.type) != -1)
          && (sourceObject != gameObject)
          &&(sourceObject.intersectsWith(gameObject))) {
        return gameObject;
      }
    });
  }

  update() {
    let _self = this;
    this.invaderController.update();
    let invaderCount = 0;

    $.map(this.gameObjects, function(gameObject) {
      if (gameObject.type === "invader") {
        gameObject.update(_self.invaderController.horizantalState,_self.invaderController.verticalState);
        invaderCount++;
      } else {
        gameObject.update();
      }
    });

    this.player && this.player.update();
    if (invaderCount === 0) {
      this.won();
    }
  }

  lost() {
    console.log("You Lost!!!");
    this.stop();
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeText("You Lost!!!", 200, 250);
  }

  won() {
    console.log("You Won!!!");
    this.stop();
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeText("You Won!!!", 200, 250);
  }

  render() {
    var ctx = this.ctx;

    $.map(this.gameObjects, function(gameObject) {
      gameObject.render(ctx);
    });
    this.player && this.player.render();

  }

  clear() {
    this.ctx.fillStyle = this.backgroundColour;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
