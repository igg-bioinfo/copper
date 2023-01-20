import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitDataService {

  constructor(private http: HttpClient) { }

  getVisits(typeVisit: any, visits: any[], patientCode: string): Observable<any> {
    const token = localStorage.getItem('token');
    const body = {
      queryArgs: {
             dataType: environment.userDataType,
             multiProject:false,
             junction:'AND',
             model:'Subject',
             content:[{
                 personalDetails:true,
                 surnameComparator:'=',
                 givenNameComparator:'=',
                 birthDateComparator:'='
             },{
                 code: patientCode,
                 codeComparator: 'LIKE',
                 specializedQuery:'Subject'
             },{
                 sexComparator:'IN',
                 specializedQuery:'Subject'
             }/*,{
                 fieldName:'password',
                 fieldType:'text',
                 isList:false,
                 caseInsensitive:false,
                 comparator:'=',
                 fieldValue: patientData.password
             }*/,{
                 getMetadata:true,
                 label:typeVisit.label,
                 junction:'AND',
                 dataType:typeVisit.dataType,
                 model:'Data',
             }],
             wantsSubject:true,
             leafSearch:true,
             wantsPersonalInfo:true
         }
     };
    console.log(body);
    if(token){
      return this.http.post<any>(environment.url+'query/dataSearch', body).pipe ( map( data => {
        if(data.data){
          data.data.forEach((element: {[ k: string]: any } )=> {
            if(element[typeVisit.label] && element[typeVisit.label+'_id']){
            const visit: {[ k: string]: any } = {};
            for( const prop of Object.keys(element[typeVisit.label])){
              visit[prop] = element[typeVisit.label][prop].value;
            }
            visits.push(visit);
          }
          });
        }
        return visits;
       }));

    }

    return of(visits);
  }
}
