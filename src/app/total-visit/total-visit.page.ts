import { Component, OnInit } from '@angular/core';
import { patient } from '../_models/patient';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { VisitDataService } from '../_services/visit-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-data',
  templateUrl: './total-visit.page.html',
  styleUrls: ['./total-visit.page.scss']
})

export class TotalVisitPage implements OnInit {

  patientData: patient = new patient();
  visits = environment.visits;
  dateFormatText= environment.dateFormatText;
  dateSurgery: Date = new Date();
  today: Date = new Date();
  datePipe: DatePipe = new DatePipe('en-US');
  days = new Array();

  //todayDay = this.today.getDate();
  validateDates = new Array();
  nameButtons = new Array();
  visitsDone: Array<any> = [];

  constructor(private router: Router,
    private visitDataService: VisitDataService) { }

  ngOnInit(): void {
  }

    

  ionViewWillEnter() {  //ricarica pagina
    this.getPatientVisit();
  
  }

  getPatientVisit () {
    this.patientData = JSON.parse(localStorage.getItem('patient')|| '');
    console.log(this.patientData);
    this.dateSurgery = new Date(this.patientData.dateStart);
    this.today = new Date ( this.setFormat(this.today));
    this.getDays();
    //get visit alredy done
    this.visitDataService.getVisits(environment.visitsType.visitPostOperatorio , this.visitsDone, this.patientData.code)
    .subscribe( visitsDone => {
      this.visitsDone = visitsDone;
        this.visitDataService.getVisits(environment.visitsType.visitFollowUp , this.visitsDone, this.patientData.code)
      .subscribe( visitsDone2 => {
        this.visitsDone = visitsDone2;
        this.visits.forEach( visit => {
          //console.log(this.visits);
          //console.log(this.visitsDone);
          const found = this.visitsDone.filter( visitDone => visit.day + '' ===  visitDone.giorno + '');

          if(found && found.length > 0){
            visit.done = found[0];
          }
        }
        );
        //console.log(this.visits);
      });
    });
  }

  addDays(date: Date, day: number): Date {
    const d = new Date(date.toDateString());
    d.setDate(d.getDate() + day );
    return d;
  }

  setFormat( date: Date): string  {
    return this.datePipe.transform(date, environment.dateFormat) || '';
  }

  getDays(): void {
    //console.log(this.patientData);
    this.visits.forEach( visit => {
      const dateVisit = this.addDays(this.dateSurgery, visit.day);
      let dateMin = this.addDays(dateVisit, -visit.min);
      const dateMax = this.addDays(dateVisit,  visit.max);

      if(visit.day <= 13 ){
        visit.typeVisit = 'post-operatorio';
        visit.nameDay = visit.modelDay + visit.typeVisit;
        /*if( visit.day >= 7 ) {
          visit.typeVisit = 'domicilio';
          visit.nameDay = visit.modelDay + visit.typeVisit;
        } else {
        visit.typeVisit = 'post-operatorio';
        visit.nameDay = visit.modelDay + visit.typeVisit;
        }*/
      } else {
        visit.typeVisit = 'follow-up';
        visit.nameDay = visit.modelDay;
      }

      if( this.today >= dateMin && this.today <= dateMax) {

      }
      //dateMin  = new Date( dateMin.setDate(dateMin.getDate() + this.visits[i].day ));
      //let dateMax = new Date( dateMin.setDate(dateMin.getDate() + visit.max ));
      visit.dateMax = this.setFormat(dateMax);
      visit.dateMin = this.setFormat(dateMin);
      dateMin = this.dateSurgery;
    });
  }

  convertDate(date: string) {
    return new Date(date);
  }

  selectedVisit(visit: any){
    let keyVisit = 'selectedFollowUp';
    let route = 'follow-up';
    if(visit.day <= 13 ){
        keyVisit = 'selectedPostOperatorio';
      route = 'post-operatorio';
    }
    localStorage.setItem( keyVisit, JSON.stringify(visit) );
    this.router.navigate([route]);
  }


}
