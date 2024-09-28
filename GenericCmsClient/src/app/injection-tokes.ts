import { InjectionToken, NgModule } from "@angular/core";
import { AutocompleteDataProvider, AutocompleteDataSourceEntityQuery } from "../autocomplete-data-provider";
import { EntityServiceInterface } from "./api";
import CaseService from "./case-service";
import { DynamicFormControlAutocompleteComponent } from "./dynamic-form-control-autocomplete/dynamic-form-control-autocomplete.component";
import { DynamicFormControlCollectionComponent } from "./dynamic-form-control-collection/dynamic-form-control-collection.component";
import { DynamicFormControlNumberComponent } from "./dynamic-form-control-number/dynamic-form-control-number.component";
import { DynamicFormControlStringComponent } from "./dynamic-form-control-string/dynamic-form-control-string.component";

export const EntityServiceProviderToken = new InjectionToken("EntityService");



export const AutocompleteDataProviderToken = new InjectionToken("AutocompleteDataProvider");


export const DynamicFormControlMapToken = new InjectionToken("DynamicFormControlMapToken");


@NgModule({
    providers: [
      {provide: AutocompleteDataProviderToken, useFactory: (entityService: EntityServiceInterface, caseService: CaseService)=> new Map<string, AutocompleteDataProvider>().set('EntityQuery', new AutocompleteDataSourceEntityQuery(entityService, caseService)), deps: [EntityServiceProviderToken, CaseService]},
    
    ]
  })
  export class AutocompleteDataProviderModule { }



  @NgModule({
    providers: [
        {provide: DynamicFormControlMapToken, useFactory:()=>{
            const componentMap = new Map<string, never>();
            componentMap.set('String', DynamicFormControlStringComponent as never);
            componentMap.set('Number', DynamicFormControlNumberComponent as never);
            componentMap.set('Collection', DynamicFormControlCollectionComponent as never);
            componentMap.set('Autocomplete', DynamicFormControlAutocompleteComponent as never);
            return componentMap;
          } },
    
    ]
  })
  export class DynamicFormControlMapModule { }