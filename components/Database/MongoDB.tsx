import React from 'react';
import Realm, {BSON} from 'realm';
import {createRealmContext} from '@realm/react';

// Define your object model
// export class Dog extends Realm.Object<Dog> {
//   name!: string;
//   age!: Number;

//   static schema = {
//     name: 'Dog',
//     properties: {
//       name: 'string',
//       age: 'int',
//     },
//   };
// }
// export const realmConfig: Realm.Configuration = {
//   schema: [Dog],
// };
// export const DogRealmContext = createRealmContext({
//   schema: [Dog]  
// });

export class Travel extends Realm.Object<Travel> {
  _id!: string;
  name!: string;
  useremail!: string;
  from!: string;
  to!: string;
  startDate!: Date;
  endDate!: Date;
  lifeexpectancy!: Number;

  static schema = {
    name: 'Travel',
    properties: {
      _id: 'string',
      useremail: 'string',
      from: 'string',
      to: 'string',
      startdate: 'date',
      enddate: 'date',
      lifeexpectancy: 'int'
    },
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Travel],
  schemaVersion: 12,
};


const {RealmProvider, useRealm, useObject, useQuery} = 
createRealmContext(realmConfig);


export const TravelRealmContext = createRealmContext({
  schema: [Travel],
  schemaVersion: 12
});


// Expose a realm
// function AppWrapper() {
//   return (
//     <RealmProvider>
//       <RestOfApp />
//     </RealmProvider>
//   );
// }
