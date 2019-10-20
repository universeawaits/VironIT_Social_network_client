import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string, isSuccess: boolean) {
    this.snackBar.open(message, 'ok', {
      duration: 4000,
      panelClass: isSuccess ? [ 'snack-success' ] : [ 'snack-error' ],
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}
