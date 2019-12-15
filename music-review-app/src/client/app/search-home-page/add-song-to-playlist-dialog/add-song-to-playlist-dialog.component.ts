import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from './../../playlists/playlistsServices/playlist.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from './../../playlists/playlistModel';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})
export class AddSongToPlaylistDialogComponent implements OnInit {
  addNewSongToPlaylistForm:FormGroup;
  playlistsData:PlaylistModel[];
  selectedPlaylistID:string;
  optionSelectedControl = new FormControl();
  itemToChange:Object;
  selectedSongTitle:string;
  selectedSongID:string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSongToPlaylistDialogComponent>,
    private _playlistService:PlaylistService,
    private _authService:AuthService,
    @Inject(MAT_DIALOG_DATA) data
  ) { this.selectedSongID = data.songId;
      this.selectedSongTitle = data.songTitle;
      console.log(`Selected song id is ${this.selectedPlaylistID}`);
    }

  ngOnInit() {
    //fetch all user's playlist.
    this.fetchAllPlaylistsOfUser();
    this.optionSelectedControl.valueChanges.subscribe(val=>{
      console.log(`We have selected playlist with id ${val}`);
      this.selectedPlaylistID = val
    });
          
  }

  fetchAllPlaylistsOfUser() {
    let userEmail = this._authService.userProfileSubject$.value.email
    this._playlistService.fetchExistingPlaylist(userEmail).subscribe(
      results=>{
        this.playlistsData = results.playlists;
      }
    )
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    console.log('Save Called');
    let selectedSongsJson = [];
      console.log(`New song ${this.selectedSongID} added`);
      console.log('newSongsAdded');
      selectedSongsJson.push({'songs':this.selectedSongID});
      this.itemToChange = {
        "songsInPlaylist":selectedSongsJson,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
    this._playlistService.updateExistingPlaylist(this.itemToChange,this.selectedPlaylistID).subscribe(result=>{
      console.log(``);
      this.dialogRef.close();
    });
  }

  createNewPlaylist(){
    console.log(`Calling service to create a new playlist`);
  }
}
