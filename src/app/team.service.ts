import { Injectable, signal } from '@angular/core';
import { Pokemon } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  team = signal<Pokemon[]>([]);
  teamSize = signal(6);

  constructor() {}

  addToTeam(pokemon: Pokemon) {
    if (
      this.team().length < this.teamSize() &&
      !this.team().includes(pokemon)
    ) {
      this.team.update((team) => [...team, pokemon]);
    }
  }

  removeFromTeam(pokemon: Pokemon) {
    this.team.update((team) => team.filter((p) => p !== pokemon));
  }
}
