import * as ex from 'excalibur';

export class Bricks {
  padding: number;
  xoffset: number;
  yoffset: number;
  columns: number;
  rows: number;

  brickColor: Array<ex.Color>;
  brickWidth: number;
  brickHeight: number;
  bricks: Array<ex.Actor>;

  constructor(game) {
    this.padding = 20;
    this.xoffset = 65;
    this.yoffset = 20;
    this.columns = 5;
    this.rows = 3;

    this.brickWidth =
      game.drawWidth / this.columns -
      this.padding -
      this.padding / this.columns;
    this.brickHeight = 30;
    this.brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

    this.generateBricks(game);
  }

  private generateBricks(game) {
    this.bricks = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        this.bricks.push(
          new ex.Actor(
            this.xoffset + i * (this.brickWidth + this.padding) + this.padding,
            this.yoffset + j * (this.brickHeight + this.padding) + this.padding,
            this.brickWidth,
            this.brickHeight,
            this.brickColor[j % this.brickColor.length]
          )
        );
      }
    }

    this.bricks.forEach((brick: ex.Actor) => {
      brick.collisionType = ex.CollisionType.Active;

      brick.on('precollision', () => {
        brick.kill();
      });
      game.add(brick);
    });
  }
}
