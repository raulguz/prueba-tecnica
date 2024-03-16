import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

const modules = [MatIconModule];

@NgModule({
  declarations: [],
  imports: [...modules, FeatherModule.pick(allIcons)],
  exports: [...modules, FeatherModule],
})
export class MaterialSharedModule {}
