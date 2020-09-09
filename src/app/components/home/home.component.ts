import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [20, 1011, 0].map((n) => `https://picsum.photos/id/${n}/1200/500`);
  images = ['../assets/img/1.jpg', '../assets/img/20.jpg', '../assets/img/944.jpg'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  iradmin(): void {
    this.router.navigate(['/administrar']);
  }

  irhistorial(): void {
    this.router.navigate(['/historial']);
  }

}
