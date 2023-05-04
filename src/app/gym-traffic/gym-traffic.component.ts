// Made by Dustin Mader

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-gym-traffic',
  templateUrl: './gym-traffic.component.html',
  styleUrls: ['./gym-traffic.component.css']
})
export class GymTrafficComponent implements OnInit {

  
  constructor( ) {}

  ngOnInit(): void {
   
  }


}
