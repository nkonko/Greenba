import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { IValidationResponse } from '../../shared/models/validationResponse';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.scss']
})
export class ValidateTokenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.validateToken(this.activatedRoute.snapshot.paramMap.get('Token')).subscribe((response: IValidationResponse) => {
      if (response.ValidToken) {
        //navigate to activation
      }
    }, error =>{
      console.log(error);
    })
  }

}
