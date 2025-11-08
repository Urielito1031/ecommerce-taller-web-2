import { Component, inject, computed, OnInit } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userService = inject(UserService);
  users = toSignal(this.userService.getAllUsers(), { initialValue: [] });


  constructor() { }
  ngOnInit(): void {
    console.log(this.users());
  }



}
