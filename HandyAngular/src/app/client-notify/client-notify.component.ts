import { ClientNotifyService } from './../Services/ClientNotifyService';
import { Notification } from './../Models/Notification';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../Models/CartItem';
import { Product } from '../Models/Product';
import { Users } from '../Models/Users';
import { ApiService } from '../Services/api.service';
import { CartService } from '../Services/CartService';
import { ProductsService } from '../Services/ProductsService';
import { sellerService } from './../Services/sellerService';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-client-notify',
  templateUrl: './client-notify.component.html',
  styleUrls: ['./client-notify.component.css']
})

export class ClientNotifyComponent implements OnInit {

  public User :Users;
  public CurrentUser 
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService,
    private router: Router ,private sellerService : sellerService,private UserService:UserService,
     private CartService:CartService,private ProductsService:ProductsService,
     private notify:ClientNotifyService) { }
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
  Counter :number
  IsRead : boolean[]=[]
  ngOnInit(): void {
    this.notify.getNotifyByuserId(localStorage.getItem('userId')).subscribe((data:any)=>{
      console.log("sdfsdf")
     data.forEach(element => {
      this.NotificationList.push(element)
      this.IsRead.push(element.isRead)
      this.userservice.getUserNameByUserId(element.sellerId).subscribe((item=>{
        if(this.users[element.id]!= item.userName )
        {
          this.users[element.id]=item.userName
        }
      }))
     });    
    })    
    this.notify.notReadedCount(localStorage.getItem('userId')).subscribe(
      count=>{
         this.Counter = count
      }
    )
    this.CurrentUser = new Users(localStorage.getItem('username'),'','','','');
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data
        this.CartService.getUserCartItems(this.user.id).subscribe((
         data=>{
           this.cartItemList=data;
           data.forEach(item => {
             this.ProductsService.getProductById(item.productId).subscribe((data:any) =>{
               this.productCartList.push(data);
             })
           });
         }
       ))
      }
    )) 
  }
  logout(){
    this.apiservice.logout();
    localStorage.clear()
  }
  users:{[id:number]:string}={};
  NotificationList :Notification[]=[]

  newNotify
  MakeRead(id)
  {
    this.notify.getById(id).subscribe((data=>{
      this.newNotify = data
      this.newNotify.isRead =true 
      this.notify.changetoRead(id,this.newNotify).subscribe()
    }))
  }
  
  getReadboolean(idx){
    return this.IsRead[idx];
  }
  user =null;
 

getProductName(idx){
  return this.productCartList[idx].productName;
}
getProductPathImg(idx){
  return this.productCartList[idx].productImagePath;
}

getTotalPrice(){
 let total=0;
 this.cartItemList.forEach(e=>{
   total+=e.totalPrice;
 })
 return total;
}

public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}
public response: {dbPath: ''};
allproduct =null

public uploadFinished = (event) => {
  this.response = event;
}

}
