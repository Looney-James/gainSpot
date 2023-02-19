// Made by Dustin Mader

import { Component, OnInit } from '@angular/core';
import { GymTrafficService } from './gym-traffic.service';

@Component({
  selector: 'app-gym-traffic',
  templateUrl: './gym-traffic.component.html',
  styleUrls: ['./gym-traffic.component.css']
})
export class GymTrafficComponent implements OnInit {

  public gymData: {
    logo: string, 
    name: string, 
    link: string
  }[] = [];

  constructor(
    private gymTrafficService: GymTrafficService
  ) {}

  ngOnInit(): void {
    this.gymData = this.gymTrafficService.gymData;
  }

}
