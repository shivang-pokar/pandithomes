import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/* import { CreateEditComponent } from '@realestate/ui'; */

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  /* public openCreateEditDialog() {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '950px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } */
}
