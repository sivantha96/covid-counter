import { StrictNumberOnlyDirective } from './component/landing/numers-only.directive';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  FigureComponent,
  FigureComponentDialog,
  FigureComponentListDialog,
} from "./component/figure/figure.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRippleModule } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./component/layout/header/header.component";
import { LandingComponent } from "./component/landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { WelcomeComponent } from "./component/page/welcome/welcome.component";
import { ThankYouComponent } from "./component/page/thank-you/thank-you.component";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    FigureComponent,
    FigureComponentDialog,
    FigureComponentListDialog,
    WelcomeComponent,
    ThankYouComponent,
    StrictNumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRippleModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
