import { Component, OnInit, OnChanges, SimpleChange, AfterViewInit, ViewChildren, Directive } from '@angular/core';
import { FigmaService } from '../figma.service';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit, AfterViewInit {

  @ViewChildren("link") links: QueryList<any>

  pagesLinks: Object[] = [];

  constructor(private figmaService: FigmaService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    var pageId = this.route.snapshot.paramMap.get('page');
    if (!pageId) {
      this.figmaService.getFile()
        .subscribe(file => this.onData(file));
    } else {
      var pData = this.figmaService.exportPage(pageId);

      for (let k in pData) {
        for (let c of pData[k].areas) {
          if (pData[c.link] != null) {
            c.href = pData[c.link].name + '.html';
          }
        }
      }

      for (let k in pData) {
        let p = pData[k];
        let linkData: any = {};
        linkData.download = p.name + '.html';
        let blobData = [];
        blobData.push(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${p.name}</title>
</head>
<body>
<img src="${p.name}.png" width="${p.width}" height="${p.height}" usemap="#map">
<map name="map">
        `);
        for (let a of p.areas) {
          blobData.push(`
  <area shape="rect" coords="${a.left},${a.top},${a.right},${a.bottom}" href="${a.href}"></area>
          `);
        }
        blobData.push(`
</body>
</html>
        `);
        let blob = new Blob(blobData, {type: "octet/stream"});
        linkData.href = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

        this.pagesLinks.push(linkData);
      }

      console.log(this.pagesLinks);
    }
  }

  ngAfterViewInit() {
    this.links.forEach(function(el) {
      el.nativeElement.click();
    });
  }

  onData(f: Object) {
    this.figmaService.fileData = f;

    console.log(this.figmaService.fileData);
    this.pages = this.figmaService.getPages();
  }

}
