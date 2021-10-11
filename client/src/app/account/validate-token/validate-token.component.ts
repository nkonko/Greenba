import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { IValidationResponse } from '../../shared/models/validationResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.scss']
})
export class ValidateTokenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private accountService: AccountService, 
              private router: Router, 
              private toast: ToastrService) 
              {
              }

  ngOnInit(): void {

    this.accountService.validateToken(this.activatedRoute.snapshot.paramMap.get('Token')).subscribe((response: IValidationResponse) => {
      if (response.ValidToken) {
        this.router.navigate(['/activation'], { state: {userName: response.UserName}});
      }
      else
      {
        this.toast.error('El token no es valido por favor volve a generarlo');
      }
    }, error =>{
      console.log(error);
    })
  }

}
