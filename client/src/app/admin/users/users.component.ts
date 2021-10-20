import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  isCurrent: boolean = false;
  constructor(private admin:AdminService, private account:AccountService ) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
  this.admin.getAllUsers().subscribe((response: IUser[]) => {
    this.users = response;
  },error => {
    console.log(error);
  });

  }

  disableUser(user:IUser) {
  this.account.deactivateUser(user.email);
  }

}
