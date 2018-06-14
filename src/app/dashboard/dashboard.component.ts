import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent {

  constructor(private router: Router) { }

  startWizard() {
    this.router.navigate(['/export']);
  }

}
