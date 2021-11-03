import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-accordion',
  templateUrl: './flow-accordion.component.html',
  styleUrls: ['./flow-accordion.component.css']
})
export class FlowAccordionComponent implements OnInit {

  constructor() { }

  items = ['General', 'Actions', 'Conditions'];
  expandedIndex = 0;
  mobile_item_selec:String = '';
  panelOpenState = true;

  drag(ev:any) {
    if (ev.type === "touchstart") {
      this.mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
  }

  ngOnInit(): void {
  }

}
