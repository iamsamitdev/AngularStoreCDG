import { Component } from '@angular/core';

// Custom dynamic title
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'AngularStoreCDG';

  // Custom dynamic title ----------------------
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private titleService: Title,
    private metaService: Meta) { }

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const childRoute = this.getChild(this.activatedRoute);
      childRoute.data.subscribe((data: { title: string,  keywords:string, description: string}) => {
        this.titleService.setTitle(data.title);
        this.metaService.addTags([
          {name: 'keywords', content: data.keywords},
          {name: 'description', content: data.description},
          {name: 'robots', content: 'index, follow'}
        ]);
      });
    });

  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }
    else {
      return activatedRoute;
    }
  }
  // Custom dynamic title ----------------------
  
}
