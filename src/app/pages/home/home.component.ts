import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.header-menu-toggle').on('click', (e) => {
      e.preventDefault();

      $('body').toggleClass('menu-is-open');
  });
  }

}
