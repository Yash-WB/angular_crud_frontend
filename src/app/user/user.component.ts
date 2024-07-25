import { Component } from '@angular/core';
import UserModel from '../Model/UserModel';
import GenderModel from '../Model/GenderModel';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import QueryModel from '../Model/QueryModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private userService: UserService, private router: Router){}

  users: UserModel[] = []; 

  user: UserModel = {
    userId: 0,
    name: "",
    email: "",
    isActive: false,
    gender: "",
    genderId: 0,
    createdDate: "",
    createdBy: 0,
    updatedDate: "",
    updatedBy: 0
  }

  genders: GenderModel[] = []; 

  gender: GenderModel = {
    genderId: 0,
    genderName: "",
    CreatedDate: "",
    CreatedBy: 0,
    UpdatedDate: "",
    UpdatedBy: 0
  }

  query: QueryModel = {
    searchTxt: "",
    filterTxt: "",
    limit: 0,
    start: 0
  }
  p: number = 1;
  count: number = 5;

  ngOnInit() : void{
    this.getUsers();
    this.getGenders();
  }
  getUsers(){
    this.userService.getUsers(this.query).subscribe((data)=>{
      this.users = data;
    });
  }

  getGenders(): void{
    this.userService.getGenders().subscribe((dataOfGenders)=>{
      this.genders = dataOfGenders;
    });
  }

  onEdit(userId:number):void{
    if(userId!=null){
      this.router.navigate(['/adduser', userId]);
    }
  }
  
  onDelete(userId:number):void{
    this.deleteUser(userId);
  }
  deleteUser(userId: number){
    this.userService.deleteUserById(userId).pipe().subscribe({
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        alert("Deleted successfully!");
        this.getUsers();
      }
    })
  }
}
