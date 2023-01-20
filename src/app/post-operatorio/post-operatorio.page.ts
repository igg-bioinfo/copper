import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormInsertService } from '../_services/form-insert.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { patient } from '../_models/patient';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';
import { AlertController } from '@ionic/angular'; 
import { ThisReceiver, ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-post-operatorio',
  templateUrl: './post-operatorio.page.html',
  styleUrls: ['./post-operatorio.page.scss'],
})
export class PostOperatorioPage implements OnInit {
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
  secondNumber;
  effettiCollaterali =[
    { label: 'Nausea', nameForm:'nausea'},
    { label: 'Vomito', nameForm:'vomito'},
  /*  { label: 'Allodinia', nameForm:'allodinia'},
    { label: 'Iperalgesia', nameForm:'iperalgesia'},
    { label: 'Parestesie arti inferiori', nameForm:'parestesie'}*/
  ];
  patientData : patient = new patient();
  dateFormatText = environment.dateFormatText;

  constructor(public formBuilder: FormBuilder,
    private formInsertService: FormInsertService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.visit= JSON.parse(localStorage.getItem('selectedPostOperatorio'));
    this.patientData = JSON.parse(localStorage.getItem('patient')|| '');
    console.log(this.patientData);
    console.log(this.visit)

    

    this.codicePaziente = parseInt(this.patientData.code.slice(-1));
    console.log('codice paziente' + this.codicePaziente)
    this.secondNumber = this.patientData.code.slice(-2,-1);
    console.log('slice -2 before control: ' + this.secondNumber)
    
    if( this.secondNumber === '-' ){
       this.codicePaziente= parseInt(this.patientData.code.slice(-1)) + 13;
      console.log('slice -1  ' + this.codicePaziente);
    } else {
      this.codicePaziente = parseInt(this.patientData.code.slice(-2)) +14 ;
      console.log('slice -2  ' + this.codicePaziente)
    }

    if(this.visit.done){
      this.isView = true;
    }


    const group = {
      giorno: [JSON.stringify(this.visit.day)],
      nrs: ['', [Validators.required]],
      frequenza: ['', [Validators.required]],
      durata_dolore: ['', [Validators.required]],
      morfina_mg: [0, [Validators.pattern('^[0-9]+$')]],
      morfina_ore: [''],
      analgesia_fissa: [false],
      analgesia_bisogno:[false],
      analgesia_extra:[0],
      catetere_vescicale: [''],
      fisioterapia: [''],
      effetti_collaterali: [false],
      effetti_collaterali_altro : [''],
      code: [this.codicePaziente],
      data_compilazione: [ this.setFormat(new Date)],
      volMax_inspirato: [0],
      cm_seduto:['', [Validators.required]],
      cm_seduto_mani:['', [Validators.required]],
      cm_deamb:['', [Validators.required]],
      cm_squat:['', [Validators.required]],
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
      scoreTotale: ['']
    };

  this.effettiCollaterali.forEach( effetto =>
    {
      group[effetto.nameForm]= [false];
    });
  this.myForm = this.formBuilder.group(group);

  }

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

  onSubmit() {
    this.submitted = true;

    if (!this.myForm.valid) {
      console.log('All fields are required.');
      console.log(this.myForm.valid)
      console.log(this.myForm.value)
      return false;
    } else {
      this.ScoreTotaleYAPFAQ();
      this.formInsertService.saveFormPostOp(this.myForm.value).subscribe(res => { console.log(res)});
      this.router.navigate(['total-visit']);
      //console.log('form');
      console.log(this.myForm.value);

    }
  }

  isChecked(): void {

    if( this.checked ){

      this.effettiCollaterali.forEach( effetto => {
        (<HTMLInputElement> document.getElementById( effetto.nameForm)).checked = false;
      });
      (<HTMLInputElement> document.getElementById('effetti_collaterali_altro_check')).checked = false;
    }
    this.checked = !this.checked;
  }

  addAltroEffetto(): void {
    if( this.checked_altro){
      console.log((<HTMLInputElement> document.getElementById('effetti_collaterali_altro')).value );
      (<HTMLInputElement> document.getElementById('effetti_collaterali_altro')).value = '';
      this.myForm.controls.effetti_collaterali_altro.setValue('');
    }
    this.checked_altro = !this.checked_altro;

  }

  avanti() {
    this.checkAnswer = true;
    if(this.controlloPagina==1){
      if(this.errorCtr.nrs.errors?.required || this.errorCtr.frequenza.errors?.required ||this.errorCtr.durata_dolore.errors?.required  ){
        console.log('risposte mancanti');
        return false;
      }else{
        this.controlloPagina = this.controlloPagina+1; 
        this.checkAnswer=false;
      }
    } else if(this.controlloPagina==2){
      this.controlloPagina = this.controlloPagina+1; 
        this.checkAnswer=false;
    }
     else if(this.controlloPagina==3) {
      this.ScoreTotaleYAPFAQ();
      if( typeof(this.myForm.value.scoreTotale) === 'string' ){
        console.log('risposte mancanti');
        console.log(this.myForm.value)
        this.checkAnswer=true;
        return false;
      }else{
        this.controlloPagina = this.controlloPagina+1; 
        this.checkAnswer=false;
     }
    } 
     
  } 

  indietro() {
    this.controlloPagina= this.controlloPagina-1;
  }

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
    this.myForm.value.scoreTotale = somma;
  }
  console.log(somma)
  console.log(this.myForm.value)
  }


}
