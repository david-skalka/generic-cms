/**
 * GenericCms
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AutocompleteDataProviderModel } from './autocompleteDataProviderModel';


export interface DynamicPropertyAutocomplete { 
    readonly type?: string | null;
    dataProvider?: AutocompleteDataProviderModel;
    name?: string | null;
    validators?: Array<string> | null;
    defaultValue?: any | null;
}

