import { Component, signal } from '@angular/core';
import { Footer } from './footer/footer';


@Component({
  selector: 'app-root',
  imports: [Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-teste-angular');
  public disciplina: string = 'Programação Web';
}
