import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailService, type CocktailView } from '../services/cocktail.service';


@Component({
    selector: 'app-cocktail-list',
    imports: [ RouterLink ],
    templateUrl: './cocktail-list.component.html',
    styleUrl: './cocktail-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailListComponent {
    
    private readonly cocktailService = inject(CocktailService);

    private readonly cocktails = signal<CocktailView[]>([]);
    protected readonly filtre = signal('');
    
    protected readonly filtredCocktails = computed(() => this.cocktails().filter(this.match.bind(this, this.filtre())));

    constructor() {
        this.cocktailService.getCocktails().subscribe(cocktails => {
            this.cocktails.set(cocktails);
        });
    }

    protected toggleFavorite(cocktail: CocktailView) {
        this.cocktailService.toggleFavorite(cocktail);
    }

    private match(search: string, cocktail: CocktailView): boolean {
        return cocktail.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    }
}
