import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowEditorComponent } from './components/flow-editor/flow-editor.component';
import { AccountComponent } from './layouts/account/account.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { FlowListComponent } from './pages/flow-list/flow-list.component';
import { FlowEditComponent } from './pages/flow-edit/flow-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule } from '@angular/material/expansion';
import { FlowAccordionComponent } from './components/flow-accordion/flow-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowEditorComponent,
    AccountComponent,
    DashboardComponent,
    FlowListComponent,
    FlowEditComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    FlowAccordionComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
