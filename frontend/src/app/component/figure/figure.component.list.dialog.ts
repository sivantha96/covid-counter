import { Component, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ListDialogData, AlertOptions } from "src/app/model/figure";
import { FigureComponentDialog } from "./figure.component.dialog";
import { AlertService } from 'src/app/modules/_alert';

@Component({
  selector: "app-figure-list-dialog",
  templateUrl: "./figure.component.list.dialog.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponentListDialog {
  alertOptions: AlertOptions;

  constructor(
    public dialog: MatDialog,
    protected alertService: AlertService,
    public listDialogRef: MatDialogRef<FigureComponentListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ListDialogData
  ) {
    listDialogRef.disableClose = true;
    this.alertOptions = {
      autoClose: true,
      id: "dialog-submit"
    }
  }

  handleClick(area) {
    const dialogRef = this.dialog.open(FigureComponentDialog, {
      width: "90vh",
      height: "none",
      maxHeight: "90vh",
      data: {
        disease: this.data.diseases[area],
      },
      autoFocus: false,
    });
  }

  onSubmit() {
    let isCompleted = true;
    this.data.areas.forEach((disease) => {
      if (this.data.diseases[disease].severity === 0) {
        isCompleted = false;
      }
    });
    if (isCompleted) {
      this.listDialogRef.close(this.data);
    } else {
      this.alertService.warn("Not completed", this.alertOptions)
    }
  }
}
