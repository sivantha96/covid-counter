import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit, Inject, Pipe } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

// Input data for the single page dialog
export interface DialogData {
  decease: {
    name: string;
    imageUrl: string;
    iconUrl: string;
    severity: number;
  };
}

export interface ListDialogData {
  areas: string[];
  deceases: {};
}

// receiving data from the previous route
export interface PostData {
  family_members: number,
  is_visited_foreign_country: string,
  is_member_visited_foreign_country: string,
  age: string,
  gender: string,
  deceases: {
      name: string,
      severity: string,
  }[]
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
      iconUrl: "../../../assets/icon.jpg",
      severity: 0
    },
    soreThroat: {
      name: "Sore Throat",
      imageUrl: "../../../assets/sore.jpg",
      iconUrl: "../../../assets/icon.jpg",
      severity: 0
    },
    cough: {
      name: "Cough",
      imageUrl: "../../../assets/cough.jpg",
      iconUrl: "../../../assets/icon.jpg",
      severity: 0
    },
  };

  postData: PostData;
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
      console.log(this.postData)
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

      dialogRef.afterClosed().subscribe(data => {
        // const newPostData = {
        //   deceases: {
        //     name: data.
        //   }
        // }
        console.log(data)
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

  constructor(
    public dialogRef: MatDialogRef<FigureComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onFocus(num) {
    switch (num) {
      case 1:
        this.data.decease.severity = 1
        break;

      case 2:
        this.data.decease.severity = 2
        break;

      case 3:
        this.data.decease.severity = 3
        break;
    }
  }

  isSelected(chip) {
    return (chip === this.data.decease.severity);
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
        decease: this.data.deceases[area],
      },
      autoFocus: false,
    });
  }

  onSubmit() {
    this.listDialogRef.close();
  }
}
