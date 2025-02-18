import { Component } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamService } from './team.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent, MatToolbarModule, MatButtonModule, CommonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PokeVerse';
  constructor(public teamService: TeamService) {}
}
