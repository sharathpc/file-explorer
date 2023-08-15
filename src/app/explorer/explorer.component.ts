import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import * as convert from 'xml-js';

import { ApplicationService } from '../app.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  alerts: any[] = [];
  foldersList: any[] = [];
  selectedFile = null;
  folders = null;
  files = null;
  breadcrumb = [];

  isLoading = false;
  token: string = null;

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private fsService: FileSaverService
  ) { }

  ngOnInit(): void {
    const prefix = this.route.snapshot.queryParamMap.get('prefix');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.foldersList = [{
      //init: true,
      isLoading: false,
      isOpen: false,
      label: 'Download-Report',
      name: prefix,
      children: []
    }, {
      isLoading: false,
      isOpen: false,
      label: 'Roster-Management',
      name: null,
      children: []
    }, {
      isLoading: false,
      isOpen: false,
      label: 'Member-Management',
      name: null,
      children: []
    }];
  }

  callData(prefix, item?): void {
    if (item?.isOpen) {
      item.isOpen = false;
      item.children = [];
    } else {
      this.deselectFile();
      if (item) {
        item.isLoading = true;
        item.isOpen = true;
      } else {
        this.isLoading = true;
      }
      this.appService.getFiles(prefix, this.token).
        subscribe(response => {
          const { breadcrumb, files, folders } = this.formatResponseData(response);
          if (item) {
            item.children = folders;
            item.isLoading = false;
            /* if (item.init) {
              this.files = files;
              this.folders = folders;
              this.isLoading = false;
            } */
          } else {
            this.breadcrumb = breadcrumb;
            this.files = files;
            this.folders = folders;
            this.isLoading = false;
          }
        });
    }
  }

  formatResponseData(response): any {
    const results: any = JSON.parse(convert.xml2json(response, { compact: true, spaces: 4 }));
    const backPrefix = results.EnumerationResults.Prefix._text;
    let breadcrumb = [];
    let files = [];
    let folders = [];

    if (Array.isArray(results.EnumerationResults.Blobs.Blob)) {
      files = results.EnumerationResults.Blobs.Blob;
    } else if (results.EnumerationResults.Blobs.Blob) {
      files = [results.EnumerationResults.Blobs.Blob];
    }

    if (Array.isArray(results.EnumerationResults.Blobs.BlobPrefix)) {
      folders = results.EnumerationResults.Blobs.BlobPrefix;
    } else if (results.EnumerationResults.Blobs.BlobPrefix) {
      folders = [results.EnumerationResults.Blobs.BlobPrefix];
    }

    files = files.map(file => {
      file.label = file.Name._text.replace(backPrefix, '');
      return file;
    })

    folders = folders.map(folder => {
      folder.isOpen = false;
      folder.label = folder.Name._text.replace(backPrefix, '');
      return folder;
    })

    breadcrumb = this.buildBreadcrumb(backPrefix);

    return {
      breadcrumb,
      files,
      folders,
    }
  }

  buildBreadcrumb(backPrefix): any {
    const splitItems = backPrefix.split('/').slice(0, -1);
    let previous = '';
    return splitItems.map((item, index) => {
      const value = {
        label: item,
        path: (index !== 0 ? `${previous}/${item}/` : `${item}/`)
      }
      previous = value.path.slice(0, -1);
      return value;
    })
  }

  selectFile(filePrefix): void {
    this.selectedFile = filePrefix;
  }

  deselectFile(): void {
    this.selectedFile = null;
  }

  downloadFile(filePrefix): void {
    this.appService.downloadFile(filePrefix, this.token).
      subscribe(response => {
        const fileName = filePrefix.substring(filePrefix.lastIndexOf('/') + 1);
        this.fsService.save((<any>response), fileName);
        this.alerts.push({
          type: 'info',
          msg: `The file ${fileName} is downloaded successfully`,
          timeout: 3000
        });
      });
  }
}
