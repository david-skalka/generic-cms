import { Component, Input } from '@angular/core';
import { DynamicProperty } from '../api/model/models';
import { DynamicFormControl } from '../dynamic-form-control';



@Component({
  selector: 'app-dynamic-form-control-string',
  standalone: false,
  
  templateUrl: './dynamic-form-control-string.component.html',
  styleUrl: './dynamic-form-control-string.component.scss',
})
export class DynamicFormControlStringComponent implements DynamicFormControl {
   
   @Input() onChange: (value: unknown) => void = () => null;
  
   @Input() value: unknown;

   @Input() property: DynamicProperty = {defaultValue: '', name: '', type: 'String' };


   changeValueEvent(event: Event){
      this.onChange((event.target as HTMLInputElement).value);
    }
}


