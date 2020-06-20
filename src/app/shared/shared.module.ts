import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const SHARED_MODULES = [MatSnackBarModule];

@NgModule({
  imports: [CommonModule, ...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class SharedModule {}
