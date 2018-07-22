import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDo0H8nuz0C2Bw0N3uHUcz8MNlEYqDQGLE",
      authDomain: "ng-recipe-book-45aee.firebaseapp.com",
    });
  }
}
