import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  error: any;

  // navigation extras only available inside the constructor,
  // otherwise we get a undefined
  // Refresh will clear this out, we only got one time acces to this.
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error =
      navigation &&
      navigation.extras &&
      navigation.extras.state &&
      navigation.extras.state.error;
  }

  ngOnInit(): void {}
}
