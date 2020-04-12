import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { FigureComponent } from './component/figure/figure.component';
import { WelcomeComponent } from './component/page/welcome/welcome.component';
import { ThankYouComponent } from './component/page/thank-you/thank-you.component';



const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'figure',
    component: FigureComponent
  },
  {
    path: 'thankyou',
    component: ThankYouComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
