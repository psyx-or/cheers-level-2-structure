import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, type Observable } from 'rxjs';

interface Cocktail {
    id: string;
    name: string;
    isAlcoholic: boolean;
    imageUrl: string;
    instructions: string;
    ingredients: string[];
}

export interface CocktailView extends Cocktail {
    isFavorite: boolean;
}

const PROP_FAVORITES = 'favorites';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {
    private readonly http = inject(HttpClient);

    private readonly favorites: string[] = JSON.parse(localStorage.getItem(PROP_FAVORITES) ?? '[]');
    
    public getCocktails(): Observable<CocktailView[]> {
        return this.http.get<Cocktail[]>('/cocktails').pipe(
            takeUntilDestroyed(),
            map(cocktails => cocktails.map(this.toCocktailView.bind(this))),
        );
    }
    
    public getCocktailDetail(id: string): Observable<CocktailView> {
        return this.http.get<Cocktail>(`/cocktails/${id}`).pipe(
            map(this.toCocktailView.bind(this)),
        );
    }

    private toCocktailView(cocktail: Cocktail): CocktailView {
        return {
            ...cocktail,
            isFavorite: this.favorites.includes(cocktail.id),
        };
    }

    public toggleFavorite(cocktail: CocktailView) {
        if (cocktail.isFavorite) {
            this.favorites.splice(this.favorites.indexOf(cocktail.id), 1);
        }
        else {
            this.favorites.push(cocktail.id);
        }
        cocktail.isFavorite = !cocktail.isFavorite;
        localStorage.setItem(PROP_FAVORITES, JSON.stringify(this.favorites));
    }
}
