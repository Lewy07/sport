import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public show: boolean = true;
  roles: string[];
  authority: string;
  info: any;
  size = '0%';
  test = 'visible';
  widthRouting = '100%';

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  showFunc(): void {
    this.show = !this.show;
    console.log(this.show);
    this.size = '100%';
    this.test = 'hidden';
  }

  closeFunc(): void {
    this.size = '0%';
    setTimeout(() => {  this.test = 'visible'; }, 500);
  }
}

