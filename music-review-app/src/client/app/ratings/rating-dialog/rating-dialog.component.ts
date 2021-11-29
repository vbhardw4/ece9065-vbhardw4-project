import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,Validators } from '@angular/forms';
import { RatingService } from './../ratingsServices/rating.service';
import { RatingsModel } from './../ratingsModel';
import { ReviewsModel } from './../reviewsModel';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {
  currentRate : number;
  reviews : string;
  rating:number;
  musicInfoId:number;
  ratingControl = new FormControl(null,Validators.required);
  newReview:Object;

  constructor(
    private dialogRef: MatDialogRef<RatingDialogComponent>,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) data,
    ratingConfig:NgbRatingConfig,
    private _ratingService:RatingService
  ) {
    this.reviews = data.reviews;
    this.musicInfoId = data.musicInfoId;
    this.rating = data.rating;
    ratingConfig.max = 5;
   }

  ngOnInit() {
    this.ratingControl.valueChanges.subscribe(value=>{
      this.currentRate = value;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(`For song ${this.musicInfoId} Comments given are ${this.reviews} and rating of ${this.currentRate}
    is given`);
    // let SongToReview : RatingsModel  = {
      
    //   reviewedSongID:this.songID,
    //   // createdByUser:this.auth.userProfileSubject$.value.email
    //   ratingsGivenByUser:{
    //     'rating':this.currentRate,
    //     'ratedByUser':this.auth.userProfileSubject$.value.email,
    //     'comments':this.userComments
    //   }
    // };
    let songToReview:ReviewsModel = {
      musicInfoId : this.musicInfoId,
      reviews : this.reviews,
      rating  : this.rating
    }
    this.callServiceForSavingUserReviews(songToReview);
    this.dialogRef.close();
  }

  callServiceForSavingUserReviews(SongToReview:ReviewsModel) {
    this._ratingService.addReviewToSong(SongToReview).subscribe(result=>{
      this.newReview = result;
      
    });
  }
}
