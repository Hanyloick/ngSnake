import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { SnakeComponent } from './components/snake/snake.component';
import { FoodComponent } from './components/food/food.component';
import { GameEngine } from './services/engine.service';
import { RestartComponent } from './components/restart/restart.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    SnakeComponent,
    FoodComponent,
    RestartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameEngine],
  bootstrap: [AppComponent],
})
export class AppModule { }
