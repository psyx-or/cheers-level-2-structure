import { Component, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CocktailService, type CocktailView } from '../services/cocktail.service';

@Component({
    selector: 'app-cocktail-detail',
    imports: [ RouterLink ],
    templateUrl: './cocktail-detail.component.html',
    styleUrl: './cocktail-detail.component.scss'
})
export class CocktailDetailComponent {

    private readonly cocktailService = inject(CocktailService);
    
    public readonly cocktailId = input.required<string>();
    
    protected readonly cocktailSignal = resource({
        params: () => ({ id: this.cocktailId() }),
        loader: () => firstValueFrom(this.cocktailService.getCocktailDetail(this.cocktailId())),
    });
    
    protected toggleFavorite(cocktail: CocktailView) {
        this.cocktailService.toggleFavorite(cocktail);
    }
}
