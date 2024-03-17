import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialSharedModule } from '@shared/modules';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IPokemon } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokemon-edit-dialog',
  standalone: true,
  imports: [MaterialSharedModule, IconComponent, ReactiveFormsModule],
  templateUrl: './pokemon-edit-dialog.component.html',
  styleUrl: './pokemon-edit-dialog.component.scss',
})
export class PokemonEditDialogComponent implements OnInit {
  @Output() savePokemon = new EventEmitter<IPokemon>();

  form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<PokemonEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPokemon
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.patchFormData(this.data);
    }
  }

  patchFormData(data: IPokemon) {
    this.form.patchValue({
      name: data.name,
      description: data.description,
    });
    this.form.markAsPristine();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSavePokemon() {
    const data = {
      ...this.data,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    } as IPokemon;
    this.savePokemon.emit(data);
  }
}
