import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialSharedModule } from '@shared/modules';
import { IconComponent } from '../icon/icon.component';

export interface IConfirmDialog {
  title: string;
  subTitle: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialSharedModule, IconComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Output() confirmAction = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.confirmAction.emit();
  }
}
