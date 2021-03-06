import { DataTablesModule } from 'angular-datatables';

import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GarminService } from './services/garmin.service';
import { HomeComponent } from './components/home/home.component';
import { GarminEventComponent } from './components/garmin-event/garmin-event.component';
import { TableComponent } from './components/table/table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventsComponent } from './components/events/events.component';
import { DatePipePipe } from './date-pipe.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    GarminEventComponent,
    NotFoundComponent,
    NavBarComponent,
    EventsComponent,
    DatePipePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [GarminService, DatePipe, DatePipePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
