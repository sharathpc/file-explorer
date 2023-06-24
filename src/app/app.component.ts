import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as convert from 'xml-js';
//import { FileSaverService } from 'ngx-filesaver';

import { ApplicationService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  folders = [];
  files = [];
  backPrefix = null;
  backURL = null;

  token: string = null;

  fileForm: FormGroup = new FormGroup({
    prefix: new FormControl('FIRSTHAND_STAGE/'),
    token: new FormControl(''),
  })

  constructor(
    private appService: ApplicationService,
    //private fsService: FileSaverService
  ) { }

  ngOnInit(): void { }

  submitData(prefix): void {
    this.token = this.fileForm.get('token').value;
    this.callData(prefix);
  }

  callData(prefix): void {
    this.appService.getFiles(prefix, this.token).
      subscribe(response => {
        const results: any = JSON.parse(convert.xml2json(response, { compact: true, spaces: 4 }));
        this.files = null;
        this.folders = null;
        this.backPrefix = results.EnumerationResults.Prefix._text;
        this.backURL = null;

        if (this.backPrefix.split('/').length > 2) {
          this.backURL = `${this.backPrefix.split('/').slice(0, -2).join('/')}/`;
        }

        if (Array.isArray(results.EnumerationResults.Blobs.Blob)) {
          this.files = results.EnumerationResults.Blobs.Blob;
        } else if (results.EnumerationResults.Blobs.Blob) {
          this.files = [results.EnumerationResults.Blobs.Blob];
        }

        if (Array.isArray(results.EnumerationResults.Blobs.BlobPrefix)) {
          this.folders = results.EnumerationResults.Blobs.BlobPrefix;
        } else if (results.EnumerationResults.Blobs.BlobPrefix) {
          this.folders = [results.EnumerationResults.Blobs.BlobPrefix];
        }
      });
  }

  downloadFile(filePrefix): void {
    this.appService.downloadFile(filePrefix, this.token).
      subscribe(response => {
        console.log(response);
        //this.fsService.save((<any>response), 'sample.txt');
      });
  }
}
