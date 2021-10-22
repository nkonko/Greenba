import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';
import { userAdminDto } from '../../shared/models/userAdmindto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  currentUser: IUser;
  constructor(private fb: FormBuilder, private admin: AdminService, private account: AccountService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = this.account.getCurrentUser();
    this.loadUsers()
  }

  loadUsers() {
    this.admin.getAllUsers().subscribe((response: IUser[]) => {
      this.users = response.filter((item => {
        return item.email != this.currentUser.email
      }));
    }, error => {
      console.log(error);
    });

  }

  disableUser(user: IUser) {
    this.account.disableUser({ userName: user.email }).subscribe(response => {
      if (response) {
        this.toast.success("Usuario deshabilitado");
        this.loadUsers();
        setTimeout(() => {
        }, 3000);
      }
    }, error => {
      console.log(error);
    });
  }

  enableUser(user: IUser) {
    this.account.enableUser({ userName: user.email }).subscribe(response => {
      if (response) {
        this.toast.success("Usuario habilitado");
        this.loadUsers();
        setTimeout(() => {
        }, 3000);
      }

    }, error => {
      console.log(error);
    });

  }

}
