import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { TokenStorageService } from '../auth/token-storage.service';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  images: any;
  titleSearch: String;
  descriptionSearch: String;
  dateFromSearch: String;
  dateToSearch: String;
  tagToSearch: String;
  datecontrol: '';
  p: number = 1;
  pipe = new DatePipe('en-US'); // Use your own locale
  form: any;

  constructor(private token: TokenStorageService, private httpClient: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.retreiveImages();
  }

  retreiveImages(): void {
    this.dataService.getAll().subscribe(
      data => {
        data.forEach(element => {
          element.picByte = 'data:image/jpeg;base64,' + element.picByte;
          element.author = element.author.replace(/"/g, " ");
          element.description = element.description.replace(/"/g, " ");
          element.tags = element.tags.replace(/"/g, " ");
          element.title = element.title.replace(/"/g, " ");
          element.date = this.pipe.transform(element.date, 'short');
        });
        this.images = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  refresh() {
    this.retreiveImages();
  }

  search(): void {
    if (this.dateFromSearch) {
      this.dateFromSearch = this.dateFromSearch.replace(/T/g, " ");
      console.log(this.dateFromSearch);
    }
    if (this.dateToSearch) {
      console.log("Date to");
      this.dateToSearch = this.dateToSearch.replace(/T/g, " ");
      console.log(this.dateToSearch);
      console.log("Date to");
    }
    console.log(this.tagToSearch);

    this.dataService.findImages(this.titleSearch, this.descriptionSearch, this.tagToSearch, this.dateFromSearch, this.dateToSearch).subscribe(
      data => {
        data.forEach(element => {
          element.picByte = 'data:image/jpeg;base64,' + element.picByte;
          element.author = element.author.replace(/"/g, " ");
          element.description = element.description.replace(/"/g, " ");
          element.tags = element.tags.replace(/"/g, " ");
          element.title = element.title.replace(/"/g, " ");
          element.date = this.pipe.transform(element.date, 'short');
        });
        this.images = data;
      },
      error => {
        console.log(error);
      }
    )
    this.titleSearch = undefined;
    this.descriptionSearch = undefined;
    this.tagToSearch = undefined;
    this.dateFromSearch = undefined;
    this.dateToSearch = undefined;

  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
