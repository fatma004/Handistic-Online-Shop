import { AddReview } from '../Models/ProductReview';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddReviewService {

  constructor(private http: HttpClient) { }
  url_review='https://localhost:44339/api/Review/AddReview';
  ngOnInit() {          
  }
 
  AddReview(review : AddReview)
  {
    return this.http.post(this.url_review,review);
  }
  CountReviews(id)
  {
    let url =`https://localhost:44339/api/Review/ProductReviewsCount/${id}`
    return this.http.get(url)
  }
  averagerRating(id)
  {
    let url =`https://localhost:44339/api/Review/averageRate/${id}`
    return this.http.get(url)
  }
  ShowReviews(id)
  {
      let url=`https://localhost:44339/api/Review/ProductReviews/${id}`;
      return this.http.get(url)
  }
  GetTopRatedProducts():Observable<any>{
    return this.http.get(`https://localhost:44339/api/Review/GetTopRatedProducts`);
  }
  GetTopRatedProductsPagination(pageSize:number,pageNumber:number):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Review/GetTopRatedProductsPagination/${pageSize}/${pageNumber}`);
  }
}
