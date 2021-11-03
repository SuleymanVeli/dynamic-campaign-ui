import { Injectable } from '@angular/core';
import { BaseModel } from 'src/app/models/base-models/base-model';
import { IFlow } from 'src/app/models/flow/flow';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class FlowService extends GeneralService  {

  getflowList(url: string = "/flows"): Promise<BaseModel<IFlow[]>> {
       
    return this.sendGetRequest(url);
  }

}
