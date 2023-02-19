// Made by Dustin Mader

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GymTrafficService {

  private gymInfo = [{
    logo: '',
    name: 'E.L. Wiegand Fitness Center',
    link: 'https://www.unr.edu/fitness',
  },
  {
    logo: '',
    name: 'Anytime Fitness',
    link: 'https://www.anytimefitness.com'
  },
  {
    logo: '',
    name: 'South Reno Athletic Club',
    link: 'https://southrac.com/'
  },
  {
    logo: '',
    name: 'Double Edge Fitness - Midtown',
    link: 'https://doubleedgefitness.com'
  },
  {
    logo: '',
    name: 'American Iron Gym',
    link: 'https://american-iron.com/'
  }];

  get gymData() {
    return this.gymInfo;
  }

  set gymData(data) {
    this.gymInfo = data;
  }

  constructor() { }
}
