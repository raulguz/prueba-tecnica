import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { IMenuItem } from './shared/models/menu.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poke-app';

  menuItems: IMenuItem[] = [
    {
      label: 'Pokemons',
      isSelected: false,
      path: 'pokemon-list',
      children: [],
    },
  ];
}
