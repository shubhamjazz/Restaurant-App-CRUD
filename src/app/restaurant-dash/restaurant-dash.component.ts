import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.scss']
})
export class RestaurantDashComponent implements OnInit {
restaurantObjModel:RestaurantData = new RestaurantData();

formValue!:FormGroup
allRestaurantData!:any
showAdd!:boolean
showBtn!:boolean

showAddTitle!:boolean
showBtnTitle!:boolean
  constructor(private formBuilder:FormBuilder, private apiService:ApiService, private http:HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllData()
  }
  clickAddRestro(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
    this.showAddTitle=true;
    this.showBtnTitle=false;
    
  }
    //Now Subcribing our Data which is maped via services.
    addRestro(){
      this.restaurantObjModel.id = this.formValue.value.id;

      this.restaurantObjModel.name = this.formValue.value.name;
      this.restaurantObjModel.email = this.formValue.value.email;
      this.restaurantObjModel.mobile = this.formValue.value.mobile;
      this.restaurantObjModel.address = this.formValue.value.address;
      this.restaurantObjModel.services = this.formValue.value.services;

      let clear = document.getElementById('clear')
      this.apiService.postRestaurant(this.restaurantObjModel).subscribe((res)=>{
        console.log(res)
        alert("Restaurant Record added successfully")
        clear?.click();
        this.formValue.reset();
        this.getAllData() //when you post any Data
      },
      err=>{
        alert("Something went wrong !")
      })
    }

    //Get all Data
    getAllData(){
      this.apiService.getRestaurant().subscribe(res=>{
        this.allRestaurantData = res
      })
    }

    //Delete the records
    deleteRestro(data:any){
      this.apiService.deleteRestaurant(data.id).subscribe(res=>{
        alert("Restaurant Record Deleted")
        this.getAllData() //refresh quick data
      })
    }

    //Edit the data
    onEditRestro(data:any){
      this.showAdd=false;
      this.showBtn=true;
      this.showAddTitle=false;
      this.showBtnTitle=true;
      this.restaurantObjModel.id = data.id;
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['services'].setValue(data.services);
    }

    //Update Restaurant
    updateRestro(){
      this.restaurantObjModel.name = this.formValue.value.name;
      this.restaurantObjModel.email = this.formValue.value.email;
      this.restaurantObjModel.mobile = this.formValue.value.mobile;
      this.restaurantObjModel.address = this.formValue.value.address;
      this.restaurantObjModel.services = this.formValue.value.services;
      
      this.apiService.updateRestaurant(this.restaurantObjModel,this.restaurantObjModel.id).subscribe((res)=>{
        alert("Restaurant updated Successfully");
        let clear = document.getElementById('clear')
        clear?.click();
        this.formValue.reset();
        this.getAllData() //when you post any Data
      })
    }
}
