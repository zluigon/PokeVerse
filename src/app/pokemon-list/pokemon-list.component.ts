import { Component, OnInit } from '@angular/core';
import { PokemonService, Pokemon } from '../pokemon.service'; // Import service and interface
import { CommonModule } from '@angular/common'; // Import CommonModule
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component'; // Import the card component
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, MatProgressSpinnerModule], // Import CommonModule and the card component
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loading = true;
    this.pokemonService.getPokemonList().subscribe({
      // Use getPokemonList
      next: (response) => {
        this.pokemons = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching pokemons', error);
        this.loading = false; // Even on error, stop showing the spinner.
        // Optionally display an error message to the user.
      },
    });
  }
}
