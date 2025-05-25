import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStatisticsComponent } from '../components/user-statistics/user-statistics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UserStatisticsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularSingleZone';
}
