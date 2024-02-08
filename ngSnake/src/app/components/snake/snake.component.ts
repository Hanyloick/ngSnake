import { Component, Input } from '@angular/core';
import { Snake, SnakeModel } from '../../models/snake/snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent {
  @Input() snake!: SnakeModel;

}
 