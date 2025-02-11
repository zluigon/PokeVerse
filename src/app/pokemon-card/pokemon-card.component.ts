import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.service'; // Import your Pokemon interface
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule], // Import CommonModule and MatCardModule
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon; // Use @Input to receive pokemon data
}
