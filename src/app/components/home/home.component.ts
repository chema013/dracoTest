import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = ['../assets/img/0-900x500.jpg', '../assets/img/20-900x500.jpg', '../assets/img/128-900x500.jpg'];

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
