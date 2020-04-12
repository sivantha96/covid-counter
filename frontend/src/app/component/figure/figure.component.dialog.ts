import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DialogData } from "src/app/model/figure";

@Component({
  selector: "app-figure-dialog",
  templateUrl: "./figure.component.dialog.html",
})
export class FigureComponentDialog {
  userNotResponded: boolean;
  constructor(
    public dialogRef: MatDialogRef<FigureComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = true;
    this.userNotResponded = data.disease.severity === 0;
  }

  onFocus(num) {
    switch (num) {
      case 1:
        this.data.disease.severity = 1;
        this.userNotResponded = false;
        break;

      case 2:
        this.data.disease.severity = 2;
        this.userNotResponded = false;
        break;

      case 3:
        this.data.disease.severity = 3;
        this.userNotResponded = false;
        break;
    }
  }

  isSelected(chip) {
    return chip === this.data.disease.severity;
  }
}
