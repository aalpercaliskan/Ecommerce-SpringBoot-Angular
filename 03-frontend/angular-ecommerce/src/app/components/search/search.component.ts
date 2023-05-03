import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isAdvertisement: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  doSearch(value: string) {
    console.log(`value=${value}`);

   
    this.router.navigateByUrl(`/search/${value}`);
    

   
  }
}
