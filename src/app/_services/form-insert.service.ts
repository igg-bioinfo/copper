import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { createAotCompiler } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FormInsertService {

  constructor(private http: HttpClient) { }

  saveFormPostOp( data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if(token){
      const metadata = {
        allodinia: {value: data.allodinia, group: "Campi"},
        analgesia_al_bisogno: {value: data.analgesia_bisogno, group: "Campi"},
        analgesia_fissa_ad_orari: {value: data.analgesia_fissa, group: "Campi"},
        dosi_analgesia_al_bisogno: {value: data.analgesia_extra, group: "Campi"},
        altri_effetti_collaterali_:{value:data.effetti_collaterali_altro,group:'Campi'},
        //catetere_vescicale:{value:data.catetere_vescicale,group:'Campi'},
        consumo_morfina__mg_tot_:{value: data.morfina_mg,group:'Campi'},
        consumo_morfina_alle_ore:{value:data.morfina_ore,group:'Campi'},
        durata_dolore:{value:data.durata_dolore,group:'Campi'},
        effetti_collaterali:{value: data.effetti_collaterali,group:'Campi'},
        frequenza_dolore:{value:data.frequenza,group:'Campi'},
        giorno:{value:data.giorno,group:'Campi'},
        giudizio_fisioterapia:{value:data.fisioterapia,group:'Campi'},
        iperalgesia: {value: data.iperalgesia, group: "Campi"},
        nausea: {value: data.nausea, group: "Campi"},
        nrs:{value:data.nrs,group:'Campi'},
        parestesie_arti_inferiori: {value: data.parestesie, group: "Campi"},
        //uso_altri_analgesici_rescue_dose:{value:data.analgesici,group:'Campi'},
        vomito: {value: data.vomito, group: "Campi"},
        data_compilazione: {value: data.data_compilazione, group: "Campi"},
        competenze_motorie_deambulazione: {value: data.cm_deamb, group: "Campi"},
        competenze_motorie_seduto: {value: data.cm_seduto, group: "Campi"},
        competenze_motorie_seduto_mani_dietro: {value: data.cm_seduto_mani, group: "Campi"},
        competenze_motorie_squat: {value: data.cm_squat, group: "Campi"},
        volume_massimo_inspirato : {value: data.volMax_inspirato, group:"Campi"},
        yapfaq: {value: data.scoreTotale, group: "Campi"}
      }
      console.log(metadata);
      console.log(data.code)
      return this.http.post<any>(environment.url+'data',
      {
        type:2,parentSubject:[data.code],
        owner:1,
        date:new Date(),
        metadata: metadata,
      }).pipe ( map (res => res ));
    }

  }

  saveFormFollowUp( data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if(token){
      const metadata = {
        giorno : { value: data.giorno, group:"Campi"},
        nrs : { value: data.nrs, group:"Campi"},
        frequenza_dolore : { value: data.frequenza, group:"Campi"},
        durata_dolore : { value: data.durata_dolore, group:"Campi"},
        pedsql_1 : { value: data.scorePed1, group:"Campi"},
        pedsql_2 : { value: data.scorePed2, group:"Campi"},
        pedsql_3 : { value: data.scorePed3, group:"Campi"},
        pedsql_4 : { value: data.scorePed4, group:"Campi"},
        pedsql_totale : { value: data.scoreTotalePedsQl, group:"Campi"},
        cali : { value: data.scoreTotaleCali, group:"Campi"},
        yapfaq : { value: data.ScoreTotaleYAPFAQ, group:"Campi"},
        commenti : { value: data.commenti, group:"Campi"}
      }
      return this.http.post<any>(environment.url+'data',
      {
        type:4,
        parentSubject:[data.code],
        owner:1,
        date:new Date(),
        metadata: metadata,
      }).pipe ( map (res => res ));
    }

  }

}
