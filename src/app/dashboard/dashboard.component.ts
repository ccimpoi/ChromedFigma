import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FigmaService } from '../figma.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent {

  constructor(private router: Router, private figmaService: FigmaService) {
    this.figmaService.getFileId();
  }

  startWizard() {
    this.router.navigate(['/export']);
  }

}
