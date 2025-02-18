import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  constructor(public teamService: TeamService) {}

  addToTeam() {
    this.teamService.addToTeam(this.pokemon);
  }

  removeFromTeam() {
    this.teamService.removeFromTeam(this.pokemon);
  }
}
