import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {OrderService} from '../../services/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rating',
  template: `
    <h1 mat-dialog-title>Rate Your Pet (Order #{{data.orderId}})</h1>
    <div mat-dialog-content>
      <p>Please rate your pet from 1 to 5:</p>
      <mat-form-field appearance="fill">
        <mat-label>Rating</mat-label>
        <mat-select [(value)]="rating">
          <mat-option *ngFor="let star of stars" [value]="star">{{ star }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSubmit()">Submit</button>
    </div>
  `,
  imports: [
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    NgForOf,
    MatLabel
  ]
})
export class RatingComponent {
  stars = [1, 2, 3, 4, 5];
  rating: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {orderId: number},
    private  orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.rating !== null) {
      this.orderService.rateOrder(this.data.orderId, this.rating).subscribe({
        next: () => {
          this.snackBar.open('Rating submitted successfully.', 'Ok', {duration: 3000});
          this.dialogRef.close(this.rating);
        },
        error: () => {
          this.snackBar.open('Failed to submit rating.', 'Ok', {duration: 3000});
        }
      });
    }
    this.dialogRef.close(this.rating);
  }
}
