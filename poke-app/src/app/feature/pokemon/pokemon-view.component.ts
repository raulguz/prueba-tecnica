import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PokemonEditDialogComponent } from './components/pokemon-edit-dialog/pokemon-edit-dialog.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { IPokemon } from './models/pokemon.interface';
import { PokemonStore } from './store/pokemon.store';

@Component({
  selector: 'app-pokemon-view',
  standalone: true,
  imports: [PokemonListComponent, CommonModule, PokemonEditDialogComponent],
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss',
  providers: [PokemonStore],
})
export class PokemonViewComponent implements OnInit {
  pokemons$ = this.store.pokemons$;

  constructor(private readonly store: PokemonStore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.loadFromLocalStore();
  }

  onDeletePokemon(item: IPokemon): void {
    this.store.deletePokemon(item);
  }
  onEditPokemon(item: IPokemon): void {
    const dialogRef = this.dialog.open(PokemonEditDialogComponent, {
      width: '450px',
      data: item,
    });

    dialogRef.componentInstance.savePokemon.subscribe((res) => {
      if (res.id) {
        this.store.editPokemon(res);
        dialogRef.componentInstance.closeDialog();
      }
    });
  }
}
