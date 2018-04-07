import * as ex from 'excalibur';
import { Paddle } from './actors/paddle/paddle';
import { Ball } from './actors/ball/ball';
import { Bricks } from './actors/bricks/bricks';

const game = new ex.Engine({
  width: 800,
  height: 600
});

const player = new Paddle(game);
const ball = new Ball(game);
const bricks = new Bricks(game);

game.start().then(() => {
  game.add(player);
  game.add(ball);
});
