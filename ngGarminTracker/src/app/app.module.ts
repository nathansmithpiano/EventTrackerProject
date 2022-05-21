import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
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
import { EventsTableComponent } from './components/events-table/events-table.component';
import { EventsComponent } from './components/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    GarminEventComponent,
    NotFoundComponent,
    NavBarComponent,
    EventsTableComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GarminService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
