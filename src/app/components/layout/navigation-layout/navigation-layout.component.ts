import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.css']
})
export class NavigationLayoutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  get userName(): string{
    return this.auth.hasIdentity() ? this.auth.getIdentity().name : '';
  }
}
