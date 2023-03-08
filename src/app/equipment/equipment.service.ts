import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class EquipmentService {
  constructor(private db: AngularFireDatabase) {}

  getEquipment(): Observable<any[]> {
    return this.db.list('/equipment').valueChanges();
  }
}