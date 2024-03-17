import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IconComponent } from '@shared/components';
import { MaterialSharedModule } from '@shared/modules';
import { IPokemon } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MaterialSharedModule, IconComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() set pokemons(val: IPokemon[]) {
    this.dataSource.data = val;
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'imageUrl',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<IPokemon>([]);
}
