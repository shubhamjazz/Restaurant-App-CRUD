import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  constructor(private formbuilder:FormBuilder, private _http:HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    });
  }

  logIn(){
    this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })
      if(user){
        alert("User Login Successfully!")
        this.loginForm.reset()
        this._router.navigate(['/restaurant'])
      }else{
        alert("User Not Found!")
      }
    },err=>{
      alert("OOPS!! Something went wrong from server side!")
    })
  }
}
