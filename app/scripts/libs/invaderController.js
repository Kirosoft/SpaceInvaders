

export default class InvaderController {

  constructor(game) {
    this.game = game;
    this.reset();
  }

  reset() {
    this.horizantalState = "goingRight";
    this.verticalState = "same";
  }

  update() {
    let _self = this;

    if (this.horizantalState === "goingRight") {

      let rightmostInvader = this.game.filterBy( (gameObject) => {
        if (gameObject.type === "invader" && ((gameObject.x + gameObject.xStep) >= (640 - gameObject.img.width*gameObject.scale*2))) {
          return this;
        }
      });

      if (rightmostInvader.length > 0) {
        _self.horizantalState = "goingLeft";
        _self.verticalState = "goingDown";
      } else {
        _self.verticalState = "same";
      }

    } else {

      let leftmostInvader = this.game.filterBy( (gameObject) => {
        if (gameObject.type === "invader" && ((gameObject.x - gameObject.xStep) < (gameObject.img.width*gameObject.scale*2))) {
          return this;
        }
      });

      if (leftmostInvader.length > 0) {
        _self.horizantalState = "goingRight";
        _self.verticalState = "goingDown";
      } else {
        _self.verticalState = "same";
      }
    }
  }

}
