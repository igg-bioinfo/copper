export const environment = {
  production: true,
  url: 'https://xtens.dibris.unige.it/',
  
  visits: [
    { day: 1, modelDay: 'giorno 1 ', nameDay: '', typeVisit: '', max: 1, min: 0, dateMin: '', dateMax: '', done: null},
    { day: 2, modelDay: 'giorno 2 ',  nameDay: '', typeVisit: '',max: 1, min: 0,  dateMin: '',dateMax: '', done: null},
    { day: 3, modelDay: 'giorno 3 ', nameDay: '', typeVisit: '', max: 1, min: 0, dateMin: '',dateMax: '', done: null},
    { day: 4, modelDay: 'giorno 4 ', nameDay: '', typeVisit: '', max: 1,min: 0,  dateMin: '', dateMax: '', done: null},
    { day: 5, modelDay: 'giorno 5 ', nameDay: '', typeVisit: '', max: 1,min: 0, dateMin: '', dateMax: '', done: null},
    { day: 6, modelDay: 'giorno 6 ',  nameDay: '', typeVisit: '', max: 1,min: 0,  dateMin: '', dateMax: '', done: null},

    { day: 7, modelDay: 'giorno 7 ', nameDay: '', typeVisit: '', max: 1, min: 0, dateMin: '', dateMax: '', done: null},
    { day: 8, modelDay: 'giorno 8 ', nameDay: '', typeVisit: '', max: 1,min: 0,   dateMin: '',dateMax: '', done: null},
    { day: 9, modelDay: 'giorno 9 ', nameDay: '', typeVisit: '', max: 1,min: 0, dateMin: '',dateMax: '', done: null},
    { day: 10, modelDay: 'giorno 10 ', nameDay: '', typeVisit: '', max: 1, min: 0, dateMin: '', dateMax: '', done: null},
    { day: 11, modelDay: 'giorno 11 ', nameDay: '', typeVisit: '', max: 1,min: 0, dateMin: '', dateMax: '', done: null},
    { day: 12, modelDay: 'giorno 12 ', nameDay: '', typeVisit: '', max: 1, min: 0, dateMin: '', dateMax: '', done: null},
    { day: 13, modelDay: 'giorno 13 ', nameDay: '', typeVisit: '', max: 1, min: 0,dateMin: '', dateMax: '', done: null},

    { day: 14, modelDay: 'giorno 14 Follow up',  nameDay: '', typeVisit: '', max: 1, min: 0,dateMin: '', dateMax: '', done: null},
    { day: 30, modelDay: '1° mese Follow up', nameDay: '', typeVisit: '', max: 2, min: 2, dateMin: '', dateMax: '', done: null},
    { day: 60, modelDay: '2° mese Follow up ', nameDay: '', typeVisit: '', max: 5, min: 5, dateMin: '', dateMax: '', done: null},
    { day: 90, modelDay: '3° mese Follow up', nameDay: '', typeVisit: '', max: 5, min: 5, dateMin: '', dateMax: '', done: null},
    { day: 120, modelDay: '4° mese Follow up ',  nameDay: '', typeVisit: '', max: 5,min: 5,  dateMin: '', dateMax: '', done: null},
    { day: 150, modelDay: '5° mese Follow up', nameDay: '', typeVisit: '', max: 5, min: 5, dateMin: '', dateMax: '', done: null},
    { day: 180, modelDay: '6° mese Follow up ', nameDay: '', typeVisit: '', max: 5, min: 5,  dateMin: '', dateMax: '', done: null},
  ],
 
  dateFormat: 'YYYY-MM-dd',
  dateFormatText: 'E d MMM yy',

  userDataType : 1,

  visitsType: {
    'visitPostOperatorio' : {
    label: 'dati_postoperatori',
    dataType: 2,
  },
    'visitFollowUp' : {
    label: 'dati_followup',
    dataType: 4,
  },
},
};
