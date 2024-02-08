import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { SnakeComponent } from './components/snake/snake.component';
import { FoodComponent } from './components/food/food.component';
import { GameEngine } from './services/engine.service';
import { RestartComponent } from './components/restart/restart.component';
import { SnakeGameComponent } from './components/snake-game/snake-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    SnakeComponent,
    FoodComponent,
    RestartComponent,
    SnakeGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameEngine],
  bootstrap: [AppComponent],
})
export class AppModule { }
