import { Component, OnInit } from '@angular/core';
import { RootService } from './service/root.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userAuth from './state-management/index'
import * as Auth from "./state-management/userauth.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'web';
  hash = "";
  loggedIn: BehaviorSubject<boolean> = this.rootService.loginObser;
  loading: boolean = true;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  _lat2 = 9.897598;
  _lon2 = 78.118788;
  difference: number = 0;

  constructor(
    private rootService: RootService,
    private store: Store<userAuth.State>
  ) {
    this.isLoggedIn$ = this.store.select(userAuth.getIsLoggedIn);
    this.isLoading$ = this.store.select(userAuth.getIsLoading);
  }

  ngOnInit() {
    this.store.dispatch(new Auth.Authorized());
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        console.log(`longitude: ${lng} | latitude: ${lat}`);


        this.difference = this.getDistanceFromLatLonInKm(9.898932, 78.120021, this._lat2, this._lon2);
        console.log("difference");
        console.log(this.difference);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in kilometers
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in KM
    return d * 1000;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  handleLocationError(error) {
    console.log("geolocation error");
    console.error(error);

    switch (error.code) {
      case 3:

        break;
      case 2:
        // ...
        break;
      case 1:
      // ...
    }
  }
}
