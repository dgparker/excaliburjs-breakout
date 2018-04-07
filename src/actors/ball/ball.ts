import * as ex from 'excalibur';

export class Ball extends ex.Actor {
  public game;

  constructor(game) {
    super({
      x: 100,
      y: 300,
      width: 20,
      height: 20
    });

    this.game = game;

    this.collisionType = ex.CollisionType.Passive;
    this.vel.setTo(200, 200);
    this.color = ex.Color.Red;

    this.draw = (ctx, delta) => {
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    this.registerPrecollision();
    this.registerPostupdate();
  }

  private registerPrecollision() {
    this.on('precollision', (e?: ex.PreCollisionEvent) => {
      var intersection = e.intersection.normalize();

      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    });
  }

  private registerPostupdate() {
    this.on('postupdate', () => {
      if (this.pos.x < this.getWidth() / 2) {
        this.vel.x *= -1;
      }

      if (this.pos.x + this.getWidth() / 2 > this.game.drawWidth) {
        this.vel.x *= -1;
      }

      if (this.pos.y < this.getHeight() / 2) {
        this.vel.y *= -1;
      }
    });

    this.on('exitviewport', function() {
      alert('You lose!');
    });
  }
}
