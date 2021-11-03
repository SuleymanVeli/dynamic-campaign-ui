import { Component, OnInit } from '@angular/core';
import { IFlow } from 'src/app/models/flow/flow';
import { FlowService } from 'src/app/services/flow/flow.service';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.css']
})
export class FlowListComponent implements OnInit {

  constructor(private flowService:FlowService) { }

  flowList:IFlow[] =[];
  uiMessage:String = "";

  async ngOnInit(): Promise<void> {
   this.getFlowList()
    console.log('init')
  }

  async getFlowList() :Promise<void>{
    let model = await this.flowService.getflowList();
    if (model.hasError) this.uiMessage = model.error.error.userMessage;
    else this.flowList = model.data;
    this.uiMessage = "";
  } 

}
