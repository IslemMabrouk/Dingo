import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { PopularDishesComponent } from './components/popular-dishes/popular-dishes.component';
import { HistoryComponent } from './components/history/history.component';
import { PopularMenuComponent } from './components/popular-menu/popular-menu.component';
import { ChefsComponent } from './components/chefs/chefs.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { NewsComponent } from './components/news/news.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoComponent } from './components/video/video.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddChefComponent } from './components/add-chef/add-chef.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { DashboardChefComponent } from './components/dashboard-chef/dashboard-chef.component';
import { ChefComponent } from './components/chef/chef.component';
import { ReservePipe } from './pipes/reserve.pipe';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayPlatComponent } from './components/display-plat/display-plat.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    PopularDishesComponent,
    HistoryComponent,
    PopularMenuComponent,
    ChefsComponent,
    ReservationComponent,
    TestimonialsComponent,
    NewsComponent,
    FooterComponent,
    VideoComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    AddAdminComponent,
    AddChefComponent,
    DashboardAdminComponent,
    DisplayUserComponent,
    DashboardChefComponent,
    ChefComponent,
    ReservePipe,
    DisplayPlatComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  //Général filProjet kol yjibhom
    ReactiveFormsModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
