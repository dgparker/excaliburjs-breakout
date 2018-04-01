import * as ex from 'excalibur';

export class Paddle extends ex.Actor {
  public game;
  constructor(game) {
    super();
    this.game = game;
    this.setWidth(200);
    this.setHeight(20);
    this.x = this.game.drawWidth / 2;
    this.y = this.game.drawHeight - 40;
    this.color = ex.Color.Chartreuse;

    this.collisionType = ex.CollisionType.Fixed;

    this.addInputListener();
  }

  private addInputListener() {
    this.game.input.pointers.primary.on('move', event => {
      this.x = event.x;
    });
  }
}
