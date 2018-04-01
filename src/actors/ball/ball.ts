import * as ex from 'excalibur';

export class Ball extends ex.Actor {
  public game;
  constructor(game) {
    super();
    this.game = game;
    this.x = 100;
    this.y = 300;
    this.setWidth(20);
    this.setHeight(20);

    this.color = ex.Color.Red;

    this.draw = (ctx, delta) => {
      // Optionally call original 'base' method
      // ex.Actor.prototype.draw.call(this, ctx, delta)

      // Custom draw code
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    this.vel.setTo(0, 100);

    this.collisionType = ex.CollisionType.Passive;

    this.on('precollision', (e?: ex.PreCollisionEvent) => {
      var intersection = e.intersection.normalize();

      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    });

    this.on('postupdate', () => {
      // If the ball collides with the left side
      // of the screen reverse the x velocity
      if (this.pos.x < this.getWidth() / 2) {
        this.vel.x *= -1;
      }

      // If the ball collides with the right side
      // of the screen reverse the x velocity
      if (this.pos.x + this.getWidth() / 2 > this.game.drawWidth) {
        this.vel.x *= -1;
      }

      // If the ball collides with the top
      // of the screen reverse the y velocity
      if (this.pos.y < this.getHeight() / 2) {
        this.vel.y *= -1;
      }
    });

    this.on('exitviewport', function() {
      alert('You lose!');
    });
  }
}
