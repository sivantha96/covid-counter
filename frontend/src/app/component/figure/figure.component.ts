import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PostData, AlertOptions } from "src/app/model/figure";
import { UserInfoService } from "src/app/service/user-info.service";
import { AlertService } from "src/app/modules/_alert";
import { FigureComponentDialog } from "./figure.component.dialog";
import { FigureComponentListDialog } from "./figure.component.list.dialog";

declare var $: any;

@Component({
  selector: "app-figure",
  templateUrl: "./figure.component.html",
  styleUrls: ["./figure.component.css"],
})
export class FigureComponent implements OnInit {
  diseases: any;
  postData: PostData;
  scriptUrl: string;
  showMan: boolean;
  symptomsArray: string[];
  noOfSymptoms: number;
  alertOptions: AlertOptions;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    protected alertService: AlertService
  ) {
    this.scriptUrl = "assets/js/onChangeWindow.js";
    this.showMan = true;
    this.symptomsArray = ["cold", "soreThroat", "cough"];
    this.noOfSymptoms = this.symptomsArray.length;
    this.alertOptions = {
      autoClose: true,
      id: "main-submit",
    };
    this.diseases = {
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
      this.userInfoService.postInfo(this.postData).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.alertService.warn("Not completed", this.alertOptions);
    }
  }
}
