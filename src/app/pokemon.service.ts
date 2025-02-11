import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs'; // Import 'of'
import { map, mergeMap, catchError } from 'rxjs/operators'; // Import catchError

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokemonListResponse {
  results: Pokemon[];
  next: string | null; // You might use this for pagination later
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(
    limit: number = 151,
    offset: number = 0
  ): Observable<PokemonListResponse> {
    return this.http
      .get<PokemonListResponse>(
        `${this.apiUrl}?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((response) => ({
          ...response,
          results: response.results.map((pokemon) => ({
            ...pokemon,
            id: parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10),
          })),
        })),
        mergeMap((response) => {
          if (response.results.length === 0) {
            return of({ ...response, results: [] }); // Handle empty results
          }
          const pokemonDetailsObservables = response.results.map((pokemon) =>
            this.getPokemonDetails(pokemon.id)
          );
          return forkJoin(pokemonDetailsObservables).pipe(
            map((details) => ({
              ...response,
              results: response.results.map((pokemon, index) => ({
                ...pokemon,
                sprites: details[index].sprites,
                types: details[index].types,
              })),
            })),
            catchError((error) => {
              console.error('Error fetching Pokémon details:', error);
              return of({ ...response, results: [] }); // Return empty array on error
            })
          );
        }),
        catchError((error) => {
          console.error('Error fetching Pokémon list:', error);
          return of({ results: [], next: null }); // Return default values on error
        })
      );
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching details for Pokémon ${id}:`, error);
        return of({} as Pokemon); // Return an empty Pokemon object on error
      })
    );
  }
}
