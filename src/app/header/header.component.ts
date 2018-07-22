import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  onSaveData(){
    this.dataStorage.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData(){
    this.dataStorage.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
