import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: [...modules, FeatherModule.pick(allIcons)],
  exports: [...modules, FeatherModule],
})
export class MaterialSharedModule {}
