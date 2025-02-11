import { Component, OnInit } from '@angular/core';
import { PokemonService, Pokemon } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, MatProgressSpinnerModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loading = true;
    this.pokemonService.getPokemonList().subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching pokemons', error);
        this.loading = false;
      },
    });
  }
}
