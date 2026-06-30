import { Component } from '@angular/core';
import { OrderComponent } from './order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'frontend';
}
