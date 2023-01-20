import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormInsertService } from '../_services/form-insert.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { patient } from '../_models/patient';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
})
export class FollowUpPage implements OnInit {
  visit: any;
  datePipe: DatePipe = new DatePipe('en-US');
  myForm: FormGroup;
  submitted = false;
  checked = false;
  checked_altro = false;
  isView = false;
  checkAnswer = false;
  controlloPagina=1;
  codicePaziente; 
  control = false;
  patientData : patient = new patient();
  dateFormatText = environment.dateFormatText;

  constructor(public formBuilder: FormBuilder,
    private formInsertService: FormInsertService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
      this.visit= JSON.parse(localStorage.getItem('selectedFollowUp'));
      this.patientData = JSON.parse(localStorage.getItem('patient')|| '');
      console.log(this.patientData);
      console.log(this.visit)

      this.codicePaziente= parseInt(this.patientData.code.slice(-1)) + 13;

      if(this.visit.done){
        this.isView = true;
      }

    const group = {
      giorno: [JSON.stringify(this.visit.day)],
      code: [this.codicePaziente],
      nrs: ['', [Validators.required]],
      frequenza: ['', [Validators.required]],
      durata_dolore: ['', [Validators.required]],
      YAPFAQ_1:['', [Validators.required]],
      YAPFAQ_2:['', [Validators.required]],
      YAPFAQ_3:['', [Validators.required]],
      YAPFAQ_4:['', [Validators.required]],
      YAPFAQ_5:['', [Validators.required]],
      YAPFAQ_6:['', [Validators.required]],
      YAPFAQ_7:['', [Validators.required]],
      YAPFAQ_8:['', [Validators.required]],
      YAPFAQ_9:['', [Validators.required]],
      YAPFAQ_10:['', [Validators.required]],
      YAPFAQ_11:['', [Validators.required]],
      YAPFAQ_12:['', [Validators.required]],
      ScoreTotaleYAPFAQ: [''],
      cali_1:['',Validators.required],
      cali_2:['',Validators.required],
      cali_3:['',Validators.required],
      cali_4:['',Validators.required],
      cali_5:['',Validators.required],
      cali_6:['',Validators.required],
      cali_7:['',Validators.required],
      cali_8:['',Validators.required],
      cali_9:['',Validators.required],
      scoreTotaleCali:[''],
      ped1sql_1: ['', Validators.required],
      ped1sql_2: ['', Validators.required],
      ped1sql_3: ['', Validators.required],
      ped1sql_4: ['', Validators.required],
      ped1sql_5: ['', Validators.required],
      ped1sql_6: ['', Validators.required],
      ped1sql_7: ['', Validators.required],
      ped1sql_8: ['', Validators.required],
      scorePed1:[''],
      ped2sql_1: ['', Validators.required],
      ped2sql_2: ['', Validators.required],
      ped2sql_3: ['', Validators.required],
      ped2sql_4: ['', Validators.required],
      ped2sql_5: ['', Validators.required],
      scorePed2:[''],
      ped3sql_1: ['', Validators.required],
      ped3sql_2: ['', Validators.required],
      ped3sql_3: ['', Validators.required],
      ped3sql_4: ['', Validators.required],
      ped3sql_5: ['', Validators.required],
      scorePed3:[''],
      ped4sql_1: ['', Validators.required],
      ped4sql_2: ['', Validators.required],
      ped4sql_3: ['', Validators.required],
      ped4sql_4: ['', Validators.required],
      ped4sql_5: ['', Validators.required],
      scorePed4:[''],
      scoreTotalePedsQl:[''],
      data_compilazione: [ this.setFormat(new Date)],
      commenti:['']
      }
    this.myForm = this.formBuilder.group(group);
  }

  /*---------------------------Allert pop-up -----------------------------------*/
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'alert-buttons',
      header: 'Invio questionario',
      message: 'Sei sicuro delle risposte date?',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
           this.onSubmit();
            console.log('MandaQuestionario')
          }
        },
         {
          text: 'Indietro',
          handler: () => {
            console.log('Exit');
          }
        }
      ]
    });
    await alert.present();
  }

  setFormat( date: Date): string  {
    return this.datePipe.transform(date, environment.dateFormat) || '';
  }


  get errorCtr() {
    return this.myForm.controls;
  }
/* ------------------------Funzione onSubmit------------------------------- */
  onSubmit() {
    this.submitted = true;

    if (!this.myForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      this.myForm.value.ScoreTotaleYAPFAQ= this.ScoreTotaleYAPFAQ();
      this.myForm.value.scoreTotaleCali = this.scoreTotaleCali();
      this.scoreSectionPedsQ();
      console.log('Form mandato')
      console.log(this.myForm.value)
      this.formInsertService.saveFormFollowUp(this.myForm.value).subscribe(res => { console.log(res)});
      this.router.navigate(['total-visit']);

    }
  }
/* ------------Funzione score totale YAPFAQ---------------------- */
  ScoreTotaleYAPFAQ() {
    let array_form = Object.keys(this.myForm.value);
    let somma=0;
    for(let i=0; i < array_form.length; i++){
      let value = array_form[i];
      if(value.substring(0,5) === 'YAPFA'){
        somma = somma + parseInt(this.myForm.value[array_form[i]]); 
      }
    }
    if(isNaN(somma)) {
      return false;
    } else {
      return somma;
    }
    }
//---------- Funzione score totale Cali ----------------------------------
    scoreTotaleCali(){
      let array_form = Object.keys(this.myForm.value);
    let sommaCali=0;
    for(let i=0; i < array_form.length; i++){
      let value = array_form[i];
      if(value.substring(0,4) === 'cali'){
        sommaCali = sommaCali + parseInt(this.myForm.value[array_form[i]]); 
      }
    }
    if(isNaN(sommaCali)) {
      return false;
    } else {
      return sommaCali;
    }
    }
/* ------------------------ Funzione score sezione pedsQl--------------------- */
    scoreSectionPedsQ (){
      let array_form = Object.keys(this.myForm.value);
    let sommaSect1=0;
    let sommaSect2=0;
    let sommaSect3=0;
    let sommaSect4=0;
    for(let i=0; i< array_form.length;i++){
      let value = array_form[i];
      if(value.substring(0,4) === 'ped1'){
        sommaSect1= sommaSect1 + parseInt(this.myForm.value[array_form[i]]);
      } else if(value.substring(0,4) === 'ped2') {
        sommaSect2 = sommaSect2 + parseInt(this.myForm.value[array_form[i]]);
      } else if(value.substring(0,4)=== 'ped3'){
        sommaSect3= sommaSect3 + parseInt(this.myForm.value[array_form[i]]);
      } else if(value.substring(0,4)=== 'ped4' ){
        sommaSect4= sommaSect4 + parseInt(this.myForm.value[array_form[i]]);
      }
    }
    if(isNaN(sommaSect1)){
      this.myForm.value.scorePed1 = false;
      return false;
    } 
    else if (isNaN(sommaSect2)) {
      this.myForm.value.scorePed1 = sommaSect1;
      this.myForm.value.scorePed2 = false;
      return false;
    } 
    else if(isNaN(sommaSect3)){
      this.myForm.value.scorePed1 = sommaSect1;
      this.myForm.value.scorePed2 = sommaSect2;
      this.myForm.value.scorePed3 = false;
      return false;
    } else if(isNaN(sommaSect4)){
      this.myForm.value.scorePed1 = sommaSect1;
      this.myForm.value.scorePed2 = sommaSect2;
      this.myForm.value.scorePed3 = sommaSect3;
      this.myForm.value.scorePed4 = false;
      return false;
    }
    else {
      this.myForm.value.scorePed1 = sommaSect1;
      this.myForm.value.scorePed2 = sommaSect2;
      this.myForm.value.scorePed3 = sommaSect3;
      this.myForm.value.scorePed4 = sommaSect4;
      this.myForm.value.scoreTotalePedsQl= sommaSect1 + sommaSect2+ sommaSect3+sommaSect4;
    }      
    }
  /*---------------- funzione controllo domande------------------------ */
  controlloDomande(){
    this.checkAnswer=true;
    if(this.controlloPagina==1){
      if(this.errorCtr.nrs.errors?.required || this.errorCtr.frequenza.errors?.required ||this.errorCtr.durata_dolore.errors?.required){
        console.log('risposte mancanti');
        return false;
      } else {
        this.checkAnswer=false;
      }
    } 
    else if( this.controlloPagina ==2){
     this.myForm.value.scoreTotale= this.ScoreTotaleYAPFAQ();
      if( typeof(this.myForm.value.scoreTotale) === 'boolean'){
        console.log('risposte mancanti');
        console.log(this.myForm.value)
        this.checkAnswer=true;
        return false;
      }else{
        this.checkAnswer=false;
        console.log(this.controlloPagina)
        console.log('score yapfaq' + this.myForm.value.scoreTotale)
     }
    } 
    else if (this.controlloPagina==3){
      this.myForm.value.scoreTotaleCali = this.scoreTotaleCali();
      if(typeof(this.myForm.value.scoreTotaleCali) === 'boolean'){
        console.log('risposte mancanti');
        console.log(this.myForm.value)
        this.checkAnswer=true;
        return false
      }else {
        this.checkAnswer=false;
        console.log(this.myForm.value)
      }
    } 
    else if(this.controlloPagina==4){
     this.scoreSectionPedsQ();
     if(typeof(this.myForm.value.scorePed1) === 'boolean'){
      console.log('risposte mancanti');
      console.log(this.myForm.value)
      this.checkAnswer=true;
      return false
     } else {
      this.checkAnswer=false;
      console.log(this.myForm.value)
     }
    } 
    else if(this.controlloPagina==5){
      this.scoreSectionPedsQ();
      if(typeof(this.myForm.value.scorePed2) === 'boolean'){
       console.log('risposte mancanti');
       console.log(this.myForm.value)
       this.checkAnswer=true;
       return false
      } else {
       this.checkAnswer=false;
       console.log(this.myForm.value)
      }
     }
     else if(this.controlloPagina==6){
      this.scoreSectionPedsQ();
      if(typeof(this.myForm.value.scorePed3) === 'boolean'){
       console.log('risposte mancanti');
       console.log(this.myForm.value)
       this.checkAnswer=true;
       return false
      } else {
       this.checkAnswer=false;
       console.log(this.myForm.value)
      }
     }
     else if(this.controlloPagina==7){
      this.scoreSectionPedsQ();
      if(typeof(this.myForm.value.scorePed4) === 'boolean'){
       console.log('risposte mancanti');
       console.log(this.myForm.value)
       this.checkAnswer=true;
       return false
      } else {
       this.checkAnswer=false;
       console.log(this.myForm.value)
      }
     }  
  }
/*----------------Funzione bottoni avanti e indietro----------------------- */
  avanti() {
    this.myForm.value.ScoreTotaleYAPFAQ= this.ScoreTotaleYAPFAQ();
    this.myForm.value.scoreTotaleCali = this.scoreTotaleCali();
    this.scoreSectionPedsQ();
    this.controlloDomande();
    if(!this.checkAnswer){ 
      this.controlloPagina= this.controlloPagina+1;
    }
    
  }

  indietro() {
    this.controlloPagina= this.controlloPagina-1;
  }

}
