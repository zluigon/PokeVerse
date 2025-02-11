import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}
