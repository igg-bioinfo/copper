import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { patient } from '../_models/patient';


@Injectable({
  providedIn: 'root'
})
export class AccountLoginService {

  constructor(private http: HttpClient) { }

  getCredential(user: string, password: string): Observable<boolean> {
    const token = localStorage.getItem('token');
    let found = false;
    if(token){
      return this.http.post<any>(environment.url+'query/dataSearch',
      { queryArgs: {
        wantsSubject:true,
        leafSearch:false,
        wantsPersonalInfo:true,
        dataType: environment.userDataType,
        multiProject:false,
        junction:'AND',
        model:'Subject',
        content:
        [
          {personalDetails:true,surnameComparator:'=',givenNameComparator:'=',birthDateComparator:'='},
          {code: user,codeComparator:'LIKE',specializedQuery:'Subject'},
          {sexComparator:'IN',specializedQuery:'Subject'},
          {fieldName:'password',
          fieldType:'text',
          isList:false,
          caseInsensitive:false,
          comparator:'=',
          fieldValue: password}
        ]
      }
     }
    ).pipe(map(data => {
      console.log(data.data);
      found = data.data && data.data.length > 0;
      if(found) {
        const patientData: patient = new patient();
        patientData.code = data.data[0].code;
        patientData.sex = data.data[0].sex;
        patientData.givenName = data.data[0].given_name;
        patientData.surname= data.data[0].surname ;
        patientData.birthDate= data.data[0].birth_data;
        patientData.dateStart = data.data[0].metadata.data_intervento.value;
        patientData.dateDimission = data.data[0].metadata.data_dimissioni ? data.data[0].metadata.data_dimissioni.value : '';
        patientData.id = data.data[0].id;
        localStorage.setItem('patient', JSON.stringify(patientData));
      }
      return found;
    }));
  } else {
    return of(found);
  }
}
}
