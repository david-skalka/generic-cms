import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EntityServiceProviderToken } from './injection-tokes';
import CaseService from './case-service';
import { of } from 'rxjs';
import { EntityServiceInterface } from './api';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {


    const entityServiceSpy = jasmine.createSpyObj<EntityServiceInterface>('DataService', ['entityEntitiesGet']);

    entityServiceSpy.entityEntitiesGet.and.returnValue(of(["ProductCategory"])  );

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatToolbarModule,
      ],
      providers: [{ provide: EntityServiceProviderToken, useValue: entityServiceSpy }, CaseService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GenericCmsClient'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GenericCmsClient');
  });

  
  it('should init', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await app.ngOnInit();
    expect(app.entities.length).toBe(1)

  });

});
