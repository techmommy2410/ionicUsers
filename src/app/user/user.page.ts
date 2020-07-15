import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../user.model'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      // console.log(params['userId']);
      this.getUser(params['userId']);
    });
  }

  getUser(id:string):void {
    this.usersService.getUser(id).subscribe(
      (response:any)=>{
        // console.log(response);
        this.user = response.user;
      }
    );
  }

  deleteUser(id:string): void {
    if (confirm("Are you sure to delete " + this.user.username)) {
      this.usersService.deleteUser(id).subscribe(
        () => { this.router.navigate(['/users']) }
      );
    }
  }
}
