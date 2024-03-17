import { Injectable } from '@angular/core';
import { LocalStorageEntitiesEnum } from '../constants/local-storage-entities.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(key: LocalStorageEntitiesEnum, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key: LocalStorageEntitiesEnum): any {
    const data = JSON.parse(localStorage.getItem(key) ?? '[]');
    return data;
  }
}
