import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlStringComponent } from './dynamic-form-control-string.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('DynamicFormControlStringComponent', () => {
  let component: DynamicFormControlStringComponent;
  let fixture: ComponentFixture<DynamicFormControlStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, FormsModule, BrowserAnimationsModule, MatInputModule ],
      declarations: [ DynamicFormControlStringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormControlStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
