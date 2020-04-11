import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit, Inject, Pipe } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatChipSelectionChange } from "@angular/material/chips";

// Input data for the single page dialog
export interface DialogData {
  decease: {
    name: string;
    imageUrl: string;
    iconUrl: string;
  };
}

export interface ListDialogData {
  areas: string[]
  deceases: {}
}

// receiving data from the previous route
export interface PostData {
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

declare var $: any;

// figure
@Component({
  selector: "app-figure",
  templateUrl: "./figure.component.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponent implements OnInit {
  deceases = {
    cold: {
      name: "Cold",
      imageUrl: "../../../assets/cold.jpg",
      iconUrl: "../../../assets/icon.jpg"
    },
    soreThroat: {
      name: "Sore Throat",
      imageUrl: "../../../assets/sore.jpg",
      iconUrl: "../../../assets/icon.jpg"
    },
    cough: {
      name: "Cough",
      imageUrl: "../../../assets/cough.jpg",
      iconUrl: "../../../assets/icon.jpg"
    },
  };

  postData: any;
  url = "assets/js/onChangeWindow.js";
  showMan: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // calling the map coordinates transforming script executor
    this.loadScript();

    // parse stringified data received from the previous route
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData) };
      } catch (error) {
        console.log(error);
      }
    });

    // setting the showMan property
    const gender = this.postData.gender;
    if (gender === "Male") {
      this.showMan = true;
    } else {
      this.showMan = false;
    }
  }

  // handle the click of an area of the figure
  handleClick(areaType) {
    // Head area is clicked
    if (areaType === "head") {
      const listDialogRef = this.dialog.open(FigureComponentListDialog, {
        width: "90vh",
        height: "none",
        maxHeight: "90vh",
        data: {
          areas: ["cold", "soreThroat", "cough"],
          deceases: this.deceases,
        },
        autoFocus: false,
      });

      // other area is clicked
    } else {
      const dialogRef = this.dialog.open(FigureComponentDialog, {
        width: "90vh",
        height: "none",
        maxHeight: "90vh",
        data: {
          decease: this.deceases[areaType],
        },
        autoFocus: false,
      });
    }
  }

  // map coordinates transforming script executor
  public loadScript() {
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
}

// single page dialog
@Component({
  selector: "app-figure-dialog",
  templateUrl: "./figure.component.dialog.html",
})
export class FigureComponentDialog {
  userResponse: number;
  selection1: boolean = false;
  selection2: boolean = false;
  selection3: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FigureComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    console.log(this.userResponse);
  }

  onPressOption(option) {
    this.userResponse = option;
  }

  onFocus(num) {
    switch (num) {
      case 1:
        this.selection1 = true;
        this.selection2 = false;
        this.selection3 = false;
        break;

      case 2:
        this.selection1 = false;
        this.selection2 = true;
        this.selection3 = false;
        break;

      case 3:
        this.selection1 = false;
        this.selection2 = false;
        this.selection3 = true;
        break;

      case 4:
        this.dialogRef.close();
        break;
    }
  }
}

// list dialog
@Component({
  selector: "app-figure-list-dialog",
  templateUrl: "./figure.component.list.dialog.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponentListDialog {

  constructor(
    public dialog: MatDialog,
    public listDialogRef: MatDialogRef<FigureComponentListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ListDialogData
  ) {}

  handleClick(area) {
    const dialogRef = this.dialog.open(FigureComponentDialog, {
      width: "90vh",
      height: "none",
      maxHeight: "90vh",
      data: {
        // decease: this.deceases[areaType],
        decease: this.data.deceases[area]
      },
      autoFocus: false,
    });
  }

  onSubmit() {
    this.listDialogRef.close();
  }
}
