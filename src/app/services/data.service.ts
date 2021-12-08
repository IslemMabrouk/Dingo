import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(){

   let  users =  [
    {  id:  1,  firstName:  'Islem', lastName: 'Ben Mabrouk', email: 'islem@mail.com', password: 'islem123', phone: '50956665', role: 'admin' },
    {  id:  2,  firstName:  'Muhammed', lastName: 'Ben Marzouk', email: 'medbm@mail.com', password: 'medbm123', phone: '50989783', role: 'client' },
    {  id:  3,  firstName:  'Takwa', lastName: 'Ait hammou', email: 'takwa@mail.com', password: 'takwa123', phone: '520123456', role: 'chef',speciality: 'Dessert', experience: '5', dateOfBirth: '20/11/1996' },

   ];

   return {users};

  }
}
