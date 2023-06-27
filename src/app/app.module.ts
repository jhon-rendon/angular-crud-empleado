import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './shared/head/head.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { IndexComponent } from './shared/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MenuComponent,
    ErrorPageComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
