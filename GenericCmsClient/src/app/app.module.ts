import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormControlCollectionComponent } from './dynamic-form-control-collection/dynamic-form-control-collection.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EntityComponent } from './entity/entity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import CaseService from './case-service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormControlStringComponent } from './dynamic-form-control-string/dynamic-form-control-string.component';
import { DynamicFormControlNumberComponent } from './dynamic-form-control-number/dynamic-form-control-number.component';
import { DynamicFormControlAutocompleteComponent } from './dynamic-form-control-autocomplete/dynamic-form-control-autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Configuration, EntityService } from './api';
import { ApiModule } from './api'; 
import { provideHttpClient } from '@angular/common/http';
import { AutocompleteDataProviderModule, DynamicFormControlMapModule, EntityServiceProviderToken } from './injection-tokes';





@NgModule({
  declarations: [
    AppComponent,
    DynamicFormControlCollectionComponent,
    EntityComponent,
    DynamicFormComponent,
    DynamicListComponent,
    DynamicFormControlStringComponent,
    DynamicFormControlNumberComponent,
    DynamicFormControlAutocompleteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule, MatPaginatorModule,
    MatListModule, RouterModule,
    FlexLayoutModule,
    ApiModule.forRoot(() => new Configuration({
      basePath: '/api',
    })),
    AutocompleteDataProviderModule,
    DynamicFormControlMapModule

  ],
  providers: [{
    provide: CaseService, useClass: CaseService}, provideHttpClient(), {provide: EntityServiceProviderToken, useFactory: (EntityService: EntityService) => EntityService, deps: [EntityService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
