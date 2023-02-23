import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

import { NavigationModule } from './Navigation/Basic-Module/navigation/navigation.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/Basic-Module/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthComponent } from './Modules/Production/Basic-Module/auth/auth-component/auth.component';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'rgb(0, 196, 255)',
  text: "Carregando...",
  pbColor: "rgb(0, 196, 255)",
  minTime: 1,
  maxTime: 10,
  fgsSize: 40,
  blur: 20,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    //  NgxUiLoaderHttpModule.forRoot({
    //   showForeground: true,

    // }),

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),



    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,
    MatGridListModule,
    FormsModule,
    NavigationModule,
    Ng2SearchPipeModule,
    NgxUiLoaderModule,

    

    
    
    
    
  ],
  providers: [

    AuthComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
