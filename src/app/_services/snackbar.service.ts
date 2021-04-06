import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) {}

    open(message: string, actionString: string, panelClass: string) {
        this.snackBar.open(message, actionString, {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: [panelClass]
        });
    }
}