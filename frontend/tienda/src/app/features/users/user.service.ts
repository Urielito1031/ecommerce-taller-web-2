import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseUrl = environment.apiNodeBaseUrl + '/users';

  constructor(private api: ApiService) { }

  getAllUsers(){
    console.log(this.baseUrl);
    return this.api.get<User[]>(`${this.baseUrl}`);
  }
  createUser(user:User){
    return this.api.post<User>(`${this.baseUrl}`,user);
  }
  getUserById(id: number){
    return this.api.get<User>(`${this.baseUrl}/${id}`);
  }
}
