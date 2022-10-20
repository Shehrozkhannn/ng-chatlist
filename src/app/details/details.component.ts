import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user:any;
  constructor(private route : ActivatedRoute , private firstRoute: Router) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        // console.log(params); // { orderby: "price" }
        this.user = JSON.parse(params.data);
        // console.log(this.user); // price
      }
    );
    
  }
  backToTheMainPage(){
    this.firstRoute.navigate(['/']);
  }

}
