import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {baseModuleList} from '../../models/module/module.base'

declare var Drawflow: any 
declare var Swal: any;
declare var JSON: any;


@Component({
  selector: 'app-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrls: ['./flow-editor.component.css']
})
export class FlowEditorComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {   
  }

  showFiller = false;
  editor:any;

  swal:any = Swal;
  json:any = JSON;

  mobile_item_selec:String = '';
  mobile_last_move:any;

  lock_display:any = 'block';
  unlock_display:any = 'none';

  dataToImport:any = {
    "drawflow": {
        "Home": {
            "data": {}
        },       
    }
};

  positionMobile(ev:any) {
    this.mobile_last_move = ev;
  }

  allowDrop(ev:any) {
    ev.preventDefault();
  }

  drop(ev:any) {
    if (ev.type === "touchend") {
      let parentdrawflow = this.document.elementFromPoint( this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY)?.closest("#drawflow");
      if(parentdrawflow != null) {
        this.addNodeToDrawFlow(this.mobile_item_selec, this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY);
      }
      this.mobile_item_selec = '';
    } else {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("node");
      this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }

  }

  export(){
    console.log(this.editor.export())
  }

  addNodeToDrawFlow(name:String, pos_x:any, pos_y:any):any {
    if(this.editor.editor_mode === 'fixed') {
      return false;
    }
    pos_x = pos_x * ( this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * ( this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
    pos_y = pos_y * ( this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * ( this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)));
    
    this.addFlowNode(name,pos_x,pos_y)    
  }


  addFlowNode(name:String, pos_x:any, pos_y:any):any{
    let flow = baseModuleList.find(a=>a.name == name);
    if(flow == undefined) return;
    this.editor.addNode(flow.name, 3,  1, pos_x, pos_y, flow.name, {}, flow.html );       
    
  }

  transform:String = '';
  showpopup(e:any) {
    e.target.closest(".drawflow-node").style.zIndex = "9999";
    e.target.children[0].style.display = "block";
    //document.getElementById("modalfix").style.display = "block";

    //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
    this.transform = this.editor.precanvas.style.transform;
    this.editor.precanvas.style.transform = '';
    this.editor.precanvas.style.left = this.editor.canvas_x +'px';
    this.editor.precanvas.style.top = this.editor.canvas_y +'px';
    console.log(this.transform);

    //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
    //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
    this.editor.editor_mode = "fixed";

  }

   closemodal(e:any) {
     e.target.closest(".drawflow-node").style.zIndex = "2";
     e.target.parentElement.parentElement.style.display  ="none";
     //document.getElementById("modalfix").style.display = "none";
     this.editor.precanvas.style.transform = this.transform;
     this.editor.precanvas.style.left = '0px';
     this.editor.precanvas.style.top = '0px';
     this.editor.editor_mode = "edit";
   }

    changeModule(event:any) {
      var all = document.querySelectorAll(".menu ul li");
        for (var i = 0; i < all.length; i++) {
          all[i].classList.remove('selected');
        }
      event.target.classList.add('selected');
    }
  changeMode(option:any) {
    console.log(option)
    if(option == 'lock') {

      this.lock_display = 'none';
      this.unlock_display = 'block';
    } else {
      this.lock_display = 'block';
      this.unlock_display = 'none';
    }

  }


  ngOnInit(): void {

    var id = document.getElementById("drawflow");
    this.editor = new Drawflow(id);
    this.editor.reroute = true;

    this.editor.start();
    this.editor.import(this.dataToImport);
    
  }

  

}


/*
 <div class="btn-export" (click)="swal.fire({ title: 'Export',
      html: '<pre><code>'+json.stringify(editor.export(), null,4)+'</code></pre>'
      })">Export</div>
      <div class="btn-clear" (click)="editor.clearModuleSelected()">Clear</div>
      */