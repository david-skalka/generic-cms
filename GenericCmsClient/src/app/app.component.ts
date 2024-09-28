import { Component, Inject, OnInit } from '@angular/core';
import { EntityServiceInterface } from './api';
import { lastValueFrom } from 'rxjs';
import { EntityServiceProviderToken } from './injection-tokes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'DotnetCmsClient';

  entities: string[] = [];

  constructor(@Inject(EntityServiceProviderToken) private entityService: EntityServiceInterface) {

  }


  async ngOnInit(): Promise<void> {
   this.entities = (await lastValueFrom(this.entityService.entityEntitiesGet()));
  }


}
