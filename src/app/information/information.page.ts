import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  controlloTabs='nrs';
  controlloAppendice= false;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(ev.detail.value)
    if(ev.detail.value === 'nrs'){
      this.controlloTabs='nrs';
    }
    else if (ev.detail.value === 'cali'){
      this.controlloTabs='cali';
    }
    else if (ev.detail.value === 'yapfaq'){
      this.controlloTabs='yapfaq';
    }
    else if (ev.detail.value === 'pedsql'){
      this.controlloTabs='pedsql';
    }
  }

  appendice(){
    this.controlloAppendice = true;
  }

  indietro(){
    this.controlloAppendice=false;
  }
  /*nrs(){
    this.controlloTabs='nrs';
  }

  cali(){
    this.controlloTabs='cali';
  }

  yapfaq(){
    this.controlloTabs='yapfaq';
  }

  pedsql(){
    this.controlloTabs='pedsql';
  }*/
}
