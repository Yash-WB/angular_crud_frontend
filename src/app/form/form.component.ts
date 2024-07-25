import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import UserModel from '../Model/UserModel';
import GenderModel from '../Model/GenderModel';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import QueryModel from '../Model/QueryModel';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){}

  users: UserModel[] = []; 

  user: UserModel = {
    userId: 0,
    name: "",
    email: "",
    isActive: true,
    gender: "",
    genderId: 1,
    createdDate: "",
    createdBy: 0,
    updatedDate: "",
    updatedBy: 0
  }
  
  filterTxt: any;

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
    limit: 5,
    start: 0
  }
  
  ngOnInit() : void{
    this.route.params.subscribe((params: Params) => {
      const paramsId = params['id'];
      if(paramsId != null){
        this.userService.getUserById(paramsId).subscribe((data: UserModel) => {
          this.user = data;
          console.log(data);
        });
      }
    });
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
  onSubmit(){
    if(this.user.userId == 0){
      this.onSaveUser();
    }else{
      this.onUpdateUser();
    }
  }

  onSaveUser(){
    this.userService.createUser(this.user).pipe().subscribe({
      // next: (response)=>{
      //   alert(JSON.stringify(response));
      //   this.getUsers();
      // },
      error: (error: any) => {
        if(error.error.errors) {
        Object.values(error.error.errors).forEach((er: any) => alert(er));
        } else if(error.error) {
          alert(error.error);
        }
      },
      complete: () => {
        alert("Saved successfully!");
        this.router.navigateByUrl('/');
      }
    })
  }

  onUpdateUser(){
    this.userService.updateUser(this.user.userId, this.user).pipe().subscribe({
      // next: (response)=>{
      //   alert(JSON.stringify(response));
      // },
      error: (error: any) => {
        alert(error.error);
      },
      complete: () => {
        alert("Updated successfully!");
        this.router.navigateByUrl('/');
      }
    })
  }
}
