import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit, Inject, Pipe } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";


export interface DialogData {
  clickName: string;
}

export interface postData {
  info1: {
    noOfFamily: number;
    youForeign: boolean;
    familyForeign: boolean;
  };
  info2: {
    gender: string;
    age: string;
  };
}

declare var $:any;

@Component({
  selector: "app-figure",
  templateUrl: "./figure.component.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponent implements OnInit {
  postData: postData;

  showMan: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData) };
      } catch (error) {
        console.log(error);
      }
    });
    const gender = this.postData.info2.gender;
    if (gender === "Male") {
      this.showMan = true;
    } else {
      this.showMan = false;
    }
  }

  handleClick(click) {
    console.log("clicked");
    if (click === "head") {
      const dialogRef = this.dialog.open(FigureComponentHeadDialog, {
        width: "90vh",
        height: "80vh",
        data: { clickName: click },
        autoFocus: false,
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
  imageURL: string = "../../../assets/cough.jpg";
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
