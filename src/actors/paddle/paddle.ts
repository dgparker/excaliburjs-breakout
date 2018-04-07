import * as ex from 'excalibur';
import { Pointer } from 'Input/Index';

export class Paddle extends ex.Actor {
  game: ex.Engine;

  constructor(game: ex.Engine) {
    super({
      x: game.drawWidth / 2,
      y: game.drawHeight - 40,
      width: 200,
      height: 20
    });

    this.color = ex.Color.Chartreuse;
    this.collisionType = ex.CollisionType.Fixed;

    this.addInputListener(game);
  }

  private addInputListener(game) {
    game.input.pointers.primary.on('move', event => {
      this.x = event.x;
    });
  }
}
