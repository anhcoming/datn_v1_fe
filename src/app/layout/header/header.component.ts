import { TokenStorageService } from './../../services/token-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  name = ""
  constructor(private token: TokenStorageService, private router: Router, private tokenService: TokenStorageService) {
    this.getUser()
  }

  ngOnInit(): void {

  }
  getUser() {
    const user = this.token.getUser();
    console.log(user)
    this.name = user.name
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['login'])
  }
  changePassword() {

  }
  
}
