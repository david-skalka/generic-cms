import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import CaseService from '../case-service';
import { DynamicFormControlStringComponent } from '../dynamic-form-control-string/dynamic-form-control-string.component';
import { DynamicFormControlNumberComponent } from '../dynamic-form-control-number/dynamic-form-control-number.component';
import { AutocompleteDataProviderModelEntityQuery, DynamicPropertyAutocomplete, EntityServiceInterface } from '../api';
import { DynamicFormControlAutocompleteComponent } from '../dynamic-form-control-autocomplete/dynamic-form-control-autocomplete.component';
import { AutocompleteDataProviderModule, DynamicFormControlMapModule, EntityServiceProviderToken } from '../injection-tokes';
import { of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
   
    const entityServiceSpy = jasmine.createSpyObj<EntityServiceInterface>('DataService', ['entityQueryNamePost']);

    entityServiceSpy.entityQueryNamePost.and.returnValue(of([{ path: 'Notebooks' }])  );
   
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AutocompleteDataProviderModule,
        MatAutocompleteModule,
        DynamicFormControlMapModule
      ],
      declarations: [DynamicFormComponent, DynamicFormControlStringComponent, DynamicFormControlNumberComponent, DynamicFormControlAutocompleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: {} } },
        { provide: EntityServiceProviderToken, useValue: entityServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {properties: [
          {
            name: 'Name',
            type: 'String',
            defaultValue: '',
          },
          {
            name: 'Age',
            type: 'Number',
            defaultValue: 19,
          },
          {
            name: 'Age',
            type: 'Autocomplete',
            defaultValue: 19,
            dataProvider: {type: 'EntityQuery', name: 'ProductCategory', expression: {} } as AutocompleteDataProviderModelEntityQuery,
          } as DynamicPropertyAutocomplete
        ], value: {}, title: ''} },
        CaseService
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;

    
    ;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
