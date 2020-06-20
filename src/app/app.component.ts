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
  loggedIn: BehaviorSubject<boolean> = this.rootService.loginObser;
  loading: boolean = true;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private rootService: RootService,
    private store: Store<userAuth.State>
  ) {
    this.isLoggedIn$ = this.store.select(userAuth.getIsLoggedIn);
    this.isLoading$ = this.store.select(userAuth.getIsLoading);
  }

  ngOnInit() {
    this.store.dispatch(new Auth.Authorized());
  }
}
