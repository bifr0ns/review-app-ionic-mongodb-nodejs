//import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
/* .map wasn't warking so you need to import this*/
import 'rxjs/add/operator/map'



/*
  Generated class for the ReviewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewsProvider {

  data: any;

    constructor(public http: Http) {
      this.data = null;
    }

    getReviews(){

      if (this.data) {
        return Promise.resolve(this.data);
      }

      return new Promise(resolve => {

        this.http.get('http://localhost:8080/api/reviews').map(res => res.json()).subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });

    }

    createReview(review){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
        .subscribe(res => {
          console.log(res.json());
        });

    }

    deleteReview(id){

      this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
        console.log(res.json());
      });

    }

/*  constructor(public http: HttpClient) {
    console.log('Hello ReviewsProvider Provider');
  } */

}
