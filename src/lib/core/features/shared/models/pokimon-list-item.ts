export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}
export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}
 

 
export interface PokemonAbility {
  ability: { name: string };
}
export interface PokimonListItem {
  name: string;
  url: string;
  id: number;
  spriteUrl: string;
  types: PokemonType[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: any; front_default: string 
};
  types: PokemonType[];

}


