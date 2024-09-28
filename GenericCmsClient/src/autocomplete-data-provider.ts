import { lastValueFrom } from "rxjs";
import CaseService from "./app/case-service";
import { EntityServiceInterface } from "./app/api/api/entity.serviceInterface";
import { AutocompleteDataProviderModel } from "./app/api/model/autocompleteDataProviderModel";
import { AutocompleteDataProviderModelEntityQuery } from "./app/api/model/autocompleteDataProviderModelEntityQuery";



export interface AutocompleteDataProvider {
    getData(input: AutocompleteDataProviderModel): Promise<string[]>;
}


export class AutocompleteDataSourceEntityQuery implements AutocompleteDataProvider {
    
    constructor(private entityService: EntityServiceInterface, private caseService: CaseService) {
        this.caseService = caseService;
    }

    async getData(input: AutocompleteDataProviderModel): Promise<string[]> {
        const dataProvider = input as AutocompleteDataProviderModelEntityQuery;
        return (await lastValueFrom((this.entityService.entityQueryNamePost(dataProvider.name!, dataProvider.expression!)))).map(x => x[this.caseService.camelCase(dataProvider.property!)]);
    }
}



