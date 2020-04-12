import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit, Inject, Pipe } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DialogData, ListDialogData, PostData } from "src/app/model/figure";
import { UserInfoService } from "src/app/service/user-info.service";

declare var $: any;

// figure
@Component({
  selector: "app-figure",
  templateUrl: "./figure.component.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponent implements OnInit {
  diseases = {
    cold: {
      name: "Cold",
      imageUrl: "../../../assets/figure/cold.jpg",
      iconUrl: "../../../assets/figure/icon.jpg",
      severity: 0,
    },
    soreThroat: {
      name: "Sore Throat",
      imageUrl: "../../../assets/figure/sore.jpg",
      iconUrl: "../../../assets/figure/icon.jpg",
      severity: 0,
    },
    cough: {
      name: "Cough",
      imageUrl: "../../../assets/figure/cough.jpg",
      iconUrl: "../../../assets/figure/icon.jpg",
      severity: 0,
    },
  };
  postData: PostData;
  scriptUrl = "assets/js/onChangeWindow.js";
  showMan: boolean = true;
  symptomsArray: string[] = ["cold", "soreThroat", "cough"];
  noOfSymptoms:number 

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService
  ) {
    this.noOfSymptoms = this.symptomsArray.length;
  }

  ngOnInit(): void {
    // calling the map coordinates transforming script executor
    this.loadScript();

    // parse stringified data received from the previous route
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData), diseases: [] };
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
          areas: this.symptomsArray,
          diseases: this.diseases,
        },
        autoFocus: false,
      });

      listDialogRef.afterClosed().subscribe((data) => {
        if (typeof data !== "undefined") {
          this.symptomsArray.forEach((symptom) => {
            let disease = {
              name: data.diseases[symptom].name,
              severity: data.diseases[symptom].severity,
            };

            const position = this.postData.diseases
              .map(function (e) {
                return e.name;
              })
              .indexOf(disease.name);

            if (position === -1) {
              this.postData.diseases.push(disease);
            } else {
              this.postData.diseases[position].severity = disease.severity;
            }
          });
        }
      });

      // other area is clicked
    } else {
      const dialogRef = this.dialog.open(FigureComponentDialog, {
        width: "90vh",
        height: "none",
        maxHeight: "90vh",
        data: {
          disease: this.diseases[areaType],
        },
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (typeof data !== "undefined") {
          const disease = {
            name: data.disease.name,
            severity: data.disease.severity,
          };
          const position = this.postData.diseases
            .map(function (e) {
              return e.name;
            })
            .indexOf(disease.name);

          if (position === -1) {
            this.postData.diseases.push(disease);
          } else {
            this.postData.diseases[position].severity = disease.severity;
          }
        }
      });
    }
  }

  // map coordinates transforming script executor
  public loadScript() {
    let node = document.createElement("script");
    node.src = this.scriptUrl;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  onSubmitMain() {
    if (this.noOfSymptoms === this.postData.diseases.length) {
      console.log("completed")
      console.log(this.postData)
    }
    else {
      console.log("Not completed")
    }
    // this.userInfoService.postInfo(this.postData).subscribe((res) => {
    //   console.log(res);
    // });
  }
}

// single page dialog
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
  ) {
    listDialogRef.disableClose = true;
  }

  handleClick(area) {
    const dialogRef = this.dialog.open(FigureComponentDialog, {
      width: "90vh",
      height: "none",
      maxHeight: "90vh",
      data: {
        // disease: this.diseases[areaType],
        disease: this.data.diseases[area],
      },
      autoFocus: false,
    });
  }

  onSubmit() {
    let isCompleted = true
    this.data.areas.forEach(disease => {
      if (this.data.diseases[disease].severity === 0) {
        isCompleted = false
      }
    });
    if (isCompleted) {
      this.listDialogRef.close(this.data);
    } else {
      console.log("Not completed")
    }
    
  }
}
