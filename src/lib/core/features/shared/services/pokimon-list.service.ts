import { inject, Injectable, signal } from '@angular/core';
import {
  NamedAPIResource,
  PaginatedResponse,
  PokimonListItem,
  PokemonDetail,
} from '../models/pokimon-list-item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError, switchMap, forkJoin, firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokimonListService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly detail = signal<PokemonDetail | null>(null);
  readonly detailLoading = signal(false);
  readonly detailError = signal<string | null>(null);

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred.';
    if (error.status === 0) {
      message = 'Network error — please check your connection.';
    } else if (error.status === 404) {
      message = 'Pokémon not found.';
    } else if (error.status >= 500) {
      message = 'PokéAPI server error — please try again later.';
    }
    return throwError(() => new Error(message));
  }

  private getPokemonDetails(url: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(url);
  }

  private toListItem(item: NamedAPIResource, details: PokemonDetail): PokimonListItem {
    return {
      name: item.name,
      url: item.url,
      id: details.id,
      spriteUrl:
        details.sprites.other?.['official-artwork']?.front_default ||
        details.sprites.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`,
      types: details.types,
    };
  }

  getPokemonList(
    limit: number,
    offset: number,
  ): Observable<{ total: number; pokemon: PokimonListItem[] }> {
    return this.http
      .get<
        PaginatedResponse<NamedAPIResource>
      >(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((res) => {
          const requests = res.results.map((item) =>
            this.getPokemonDetails(item.url).pipe(map((details) => this.toListItem(item, details))),
          );
          return forkJoin(requests).pipe(map((pokemon) => ({ total: res.count, pokemon })));
        }),
        catchError(this.handleError),
      );
  }

  async loadDetail(id: number): Promise<void> {
    this.detail.set(null);
    this.detailLoading.set(true);
    this.detailError.set(null);
    try {
      const data = await firstValueFrom(
        this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${id}`),
      );
      this.detail.set(data);
    } catch {
      this.detailError.set('Failed to load Pokémon details.');
    } finally {
      this.detailLoading.set(false);
    }
  }
}
