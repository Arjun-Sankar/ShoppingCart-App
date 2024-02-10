import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveFormDatas: FormGroup;
  msg:any;
 
  constructor(public userser: UserService,public routes:Router,private pdtSer:ProductsService) {

  }
  ngOnInit() { 
    $('.toggle').click(() => {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });
    this.reactiveFormDatas = new FormGroup({
      "Username": new FormControl(),
      "Password": new FormControl()
    })
  }
  loginForm() {
    this.userser.userLogin(this.reactiveFormDatas.value).subscribe({
      next:(value:string)=>{
        // console.log(value);
        if(value.length>0){
          localStorage.setItem('token',value);
          this.pdtSer.updateCartCount.next("");
          this.routes.navigateByUrl('/')
        }else{
          this.msg="Invalid Username/Password";
          this.reactiveFormDatas.reset();
        }
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("completed");
      }
    })
    // console.log(this.reactiveFormDatas.value)
  }
  newAccount(formdata: NgForm) {
    this.userser.userRegister(formdata.value).subscribe({
      next:(data:string) => {
        // console.log(data);
        formdata.reset();
      },
      error:(errors:any)=>{
        console.log(errors);
      },
      complete:()=>{
        console.log("completed");
      }
    })
    // console.log(data.value);
    
  }
 
}
