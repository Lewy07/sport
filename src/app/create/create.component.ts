import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TokenStorageService } from '../auth/token-storage.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  info: any;
  selectedFile: File;
  message: string;
  form: any = {};
  imageSrc: string;
  url = '';

  constructor(private token: TokenStorageService, private httpClient: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  public onFileChanged(event): void {
    //Select File
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
      }
    }
  }

  onSubmit() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('title', JSON.stringify(this.form.title));
    uploadImageData.append('author', JSON.stringify(this.info.username));
    uploadImageData.append('description', JSON.stringify(this.form.description));
    uploadImageData.append('tags', JSON.stringify(this.form.firstTag + ', ' + this.form.secondTag));

    this.dataService.create(uploadImageData).subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Pomyślnie dodano element';
        } else {
          this.message = 'Błąd podczas dodawania';
        }
      }
      );
  }
}
