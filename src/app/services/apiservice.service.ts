import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() {}

  setLocalData(key, data) {
    return new Promise(async resolve => {
      await Storage.set({key: `${key}`, value: `${data}`})
      resolve(true)
    })
  }

  getLocalData(key) {
    return new Promise(async resolve => {
      let result = await Storage.get({key: `${key}`});
      
      if (result) {
        resolve(result.value)
      } else {
        resolve(null)
      }
    })
  }

  removeLocalData(key) {
    return new Promise(async resolve => {
      await Storage.remove({key: `${key}`});
      resolve(true);
    })
  }
}
