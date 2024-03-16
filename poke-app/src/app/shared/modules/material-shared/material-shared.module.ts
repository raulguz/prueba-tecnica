import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

const modules = [MatIconModule, MatTableModule];

@NgModule({
  declarations: [],
  imports: [...modules, FeatherModule.pick(allIcons)],
  exports: [...modules, FeatherModule],
})
export class MaterialSharedModule {}
