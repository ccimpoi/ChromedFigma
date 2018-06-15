import { Injectable } from '@angular/core';
import { sprintf } from "sprintf-js"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service'
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FigmaService {

  static readonly FIGMA_API_URL = 'https://api.figma.com/v1/files/%s'

  fileData: any;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFileId() {
    try {
      var res: string = '';
      var url = chrome.extension.getBackgroundPage()['url'];
      res = new RegExp('/file\/([^\/]+)/').exec(url)[1];
    } catch(e) {
      console.log(e);
      res = window.prompt("Figma file ID");
    }

    return res;
  }

  getFile(): Observable<string> {
    var token = localStorage.getItem('token');
    if (!token) {
      alert('Please set your API token in Options!');
      token = '';
    }

    var options = { headers: {
      'X-Figma-Token': token
    }};
    this.messageService.add('Loading page...');

    return this.http.get<any>(sprintf(FigmaService.FIGMA_API_URL, this.getFileId()), options)
      .pipe(
        tap(file => this.log('Page loaded.')),
        catchError(this.handleError('getFile', []))
      );;
  }

  getPages(): any[] {
    var res = [];

    for (let p of this.fileData.document.children) {
      res.push({'id': p.id, 'name': p.name});
    }

    return res;
  }

  exportPage(pId): Object {
    this.log('Exporting page...');

    var exportData: Object = {};
    for (var pData of this.fileData.document.children) {
      if(pData.id == pId) break;
    }

    for (let fData of pData.children) {
      if (fData.type != "FRAME") continue;
      var d = {
        id: fData.id,
        name: fData.name,
        x: +fData.absoluteBoundingBox.x,
        y: +fData.absoluteBoundingBox.y,
        width: +fData.absoluteBoundingBox.width,
        height: +fData.absoluteBoundingBox.height,
        areas: []
      };

      let parseChildren = function(children) {
        for (let c of children) {
          if (c.transitionNodeID == null) {
            if (c.children != null) {
              parseChildren(c.children);
            }
          } else {
            d.areas.push({
              left: Math.round(+c.absoluteBoundingBox.x - d.x),
              top: Math.round(+c.absoluteBoundingBox.y - d.y),
              right: Math.round(+c.absoluteBoundingBox.x - d.x + c.absoluteBoundingBox.width),
              bottom: Math.round(+c.absoluteBoundingBox.y - d.y + c.absoluteBoundingBox.height),
              link: c.transitionNodeID,
              href: ''
            });
          }
        }
      };
      parseChildren(fData.children);
      exportData[fData.id] = d;
    }

    return exportData;
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  };
}
