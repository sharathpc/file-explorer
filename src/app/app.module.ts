import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { FileSaverModule } from 'ngx-filesaver';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExplorerComponent } from './explorer/explorer.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FileSaverModule,
    AlertModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ExplorerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
