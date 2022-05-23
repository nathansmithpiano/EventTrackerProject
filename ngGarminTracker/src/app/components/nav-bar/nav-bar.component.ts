
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  getRoute = (): string => {
    let url = this.router.url;
    let output = "";
    if (url === '/events/create') {
      output = 'create';
    }
    if (url === '/events') {
      output = 'events';
    }
    if (url === '/') {
      output = 'home';
    }
    return output;
  }



}
