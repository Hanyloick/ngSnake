import { Component, Input } from '@angular/core';
import { Food, FoodModel } from '../../models/food/food';
import { Snake, SnakeModel } from '../../models/snake/snake';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  @Input() snake!: SnakeModel;
  @Input() food!: FoodModel;
}
