import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  clickName: string;
}

@Component({
  selector: "app-figure",
  templateUrl: "./figure.component.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponent implements OnInit {
  showMan: boolean = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {}

  handleClick(click) {
    console.log("clicked");
    if (click === "head") {
      const dialogRef = this.dialog.open(FigureComponentHeadDialog, {
        width: "90vh",
        height: "80vh",
        data: { clickName: click },
        autoFocus: false
      });
    } else {
      const dialogRef = this.dialog.open(FigureComponentDialog, {
        width: "90vh",
        height: "80vh",
        data: { clickName: click },
      });
    }
  }
}

@Component({
  selector: "app-figure-dialog",
  templateUrl: "./figure.component.dialog.html",
})
export class FigureComponentDialog {
  isHead: boolean = false;
  imageURL: string = "../../../assets/cough.jpg"
  constructor(
    public dialogRef: MatDialogRef<FigureComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}

@Component({
  selector: "app-figure-head-dialog",
  templateUrl: "./figure.component.head.dialog.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponentHeadDialog {
  isHead: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FigureComponentHeadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  handleClickHead(click) {
    const dialogRef = this.dialog.open(FigureComponentDialog, {
      width: "90vh",
      height: "80vh",
      data: { clickName: click },
    });
  }

  handleClick(click) {
    console.log(click);
  }
}
