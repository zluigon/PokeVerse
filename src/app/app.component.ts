import { Component } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'PokeVerse';
}
