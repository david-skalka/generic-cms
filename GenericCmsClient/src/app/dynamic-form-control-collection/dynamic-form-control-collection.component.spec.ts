import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlCollectionComponent } from './dynamic-form-control-collection.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import CaseService from '../case-service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('DynamicFormControlCollectionComponent', () => {
  let component: DynamicFormControlCollectionComponent;
  let fixture: ComponentFixture<DynamicFormControlCollectionComponent>;

  const item = { name: 'Lukas' };

  beforeEach(async () => {
    
    const matDialogSpy = jasmine.createSpyObj<MatDialog>(['open']);
    matDialogSpy.open.and.returnValue({componentInstance: {ok: of({name: 'David'})}, close : jasmine.createSpy('close')} as never);
    
    
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, BrowserAnimationsModule],
      providers: [CaseService, {provide: MatDialog, useValue: matDialogSpy}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormControlCollectionComponent);
    component = fixture.componentInstance;

    component.value = [item];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should edit', async () => {
    await component.edit(item);
    
    expect(component.value.length).toBe(1);
  });



  it('should add', async () => {
    await component.add();
    
    expect(component.value.length).toBe(2);
  });

  it('should delete', async () => {
    await component.delete(item);
    
    expect(component.value.length).toBe(0);
  });



});
