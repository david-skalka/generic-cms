import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlAutocompleteComponent } from './dynamic-form-control-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityServiceInterface } from '../api';
import CaseService from '../case-service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { AutocompleteDataProviderModule, EntityServiceProviderToken } from '../injection-tokes';


describe('DynamicFormControlAutocompleteComponent', () => {
  let component: DynamicFormControlAutocompleteComponent;
  let fixture: ComponentFixture<DynamicFormControlAutocompleteComponent>;

  beforeEach(async () => {

    
    const entityServiceSpy = jasmine.createSpyObj<EntityServiceInterface>('DataService', ['entityQueryNamePost']);

    entityServiceSpy.entityQueryNamePost.and.returnValue(of([{ path: 'Notebooks' }])  );

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        AutocompleteDataProviderModule
      ],
      providers: [{ provide: EntityServiceProviderToken, useValue: entityServiceSpy }, CaseService],
      declarations: [DynamicFormControlAutocompleteComponent]
    })
      .compileComponents();


    fixture = TestBed.createComponent(DynamicFormControlAutocompleteComponent);
    component = fixture.componentInstance;


   


  });

  it('should create', async () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should init', async () => {
    await component.ngOnInit();
    expect(component.options.length).toBe(1)

  });

  
});
