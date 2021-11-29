import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { ReviewsModel } from '../reviewsModel';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }

  addReviewToSong(newReview:ReviewsModel):Observable<ReviewsModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    // let uploadNewPlaylistURL = `/secure/reviews/${newReview.reviewedSongID}`;
    let uploadNewPlaylistURL = `http://localhost:8081/v1/reviews`;
    let options = {
      headers:httpHeaders
    };
    return this.http.post<ReviewsModel>(uploadNewPlaylistURL,newReview,options);
  };

}
