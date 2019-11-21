import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateSessionComponent,
  EventRouteActivator,
  EventListResolver,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { 
  JQ_TOKEN, 
  TOASTR_TOKEN, 
  Toastr, 
  CollapsibleWellComponent, 
  SimpleModalComponent,
  ModalTriggerDirective} from './common/index'
import { appRoutes} from './routes'
import { CreateEventComponent} from './events/create-event.component'
import { Error404Component} from './errors/404.component'
import { AuthService } from './user/auth.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

let toastr:Toastr = window['toastr']
let jQuery = window['$']


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    Error404Component,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent
  ], 
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jQuery},
    EventRouteActivator,
    EventListResolver,
    AuthService,
    VoterService,
    {provide:'canDeactivateCreateEvent', useValue: checkDirtyState}  
  ],
  bootstrap: [EventsAppComponent],
  
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
   
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}