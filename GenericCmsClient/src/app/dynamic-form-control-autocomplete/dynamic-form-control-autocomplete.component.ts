import { Component, Inject, Input, OnInit, forwardRef } from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { AutocompleteDataProviderModel, AutocompleteDataProviderModelEntityQuery, DynamicPropertyAutocomplete, } from '../api';
import { AutocompleteDataProviderToken } from '../injection-tokes';
import { AutocompleteDataProvider } from '../../autocomplete-data-provider';
import { DynamicFormControl } from '../dynamic-form-control';





@Component({
  selector: 'app-dynamic-form-control-autocomplete',
  standalone: false,
  
  templateUrl: './dynamic-form-control-autocomplete.component.html',
  styleUrl: './dynamic-form-control-autocomplete.component.scss',
  providers: [{    provide: NG_VALUE_ACCESSOR,    useExisting: forwardRef(() => DynamicFormControlAutocompleteComponent),    multi: true,  }]
})
export class DynamicFormControlAutocompleteComponent implements DynamicFormControl, OnInit {

   @Input() onChange: (value: unknown) => void = () => null;
  
   @Input() value: unknown | null = null;

   @Input() property: DynamicPropertyAutocomplete = {defaultValue: '', name: '', type: 'String', dataProvider: {type: 'EntityQuery', expression: {}, name: 'ProductCategory', property: 'Path'} as AutocompleteDataProviderModelEntityQuery };


  options: string[] = [];


  constructor(@Inject(AutocompleteDataProviderToken) private autocompleteDataProviders: Map<string, AutocompleteDataProvider>) {
    
  }

 

  async ngOnInit(): Promise<void> {
    this.options = await this.autocompleteDataProviders.get((this.property.dataProvider as AutocompleteDataProviderModel).type!)!.getData(this.property.dataProvider as AutocompleteDataProviderModel);
    
  }


  changeValueEvent(event: Event){
    this.onChange((event.target as HTMLInputElement).value);
  }


}


