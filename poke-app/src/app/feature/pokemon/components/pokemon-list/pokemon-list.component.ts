import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deletePokemon = new EventEmitter<IPokemon>();
  @Output() editPokemon = new EventEmitter<IPokemon>();

  displayedColumns: string[] = [
    'id',
    'name',
    'imageUrl',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<IPokemon>([]);

  onDeletePokemon(item: IPokemon) {
    this.deletePokemon.emit(item);
  }

  onEditPokemon(item: IPokemon) {
    this.editPokemon.emit(item);
  }
}
