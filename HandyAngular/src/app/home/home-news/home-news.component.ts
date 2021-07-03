import { AddReviewService } from './../../Services/ReviewService';
import { ProductWishlistService } from './../../Services/ProductWishlistService';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from './../../Services/CartService';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductsService } from 'src/app/Services/ProductsService';
import { ProductWishlist } from 'src/app/Models/ProductWishlist';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.css']
})
export class HomeNewsComponent implements OnInit {
  products : Product[]=[]
  productList : Product[]=[]
  user:any;
  flag :boolean
    constructor(private _productsService:ProductsService,private CartService:CartService,
      private reviewService:AddReviewService,
      private UserService:UserService,private productWishlistService:ProductWishlistService) { }
    ngOnInit(): void {
      this.getBest();
      this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
        data =>{
          this.user=data}))
    }
Reviews:{[id:number]:number}={};

  getBest(){
    this._productsService.GetTopSales().subscribe(
      (products: any) => {
        products.forEach(p => {
          this.productList.push(p);
            this.reviewService.averagerRating(p.id).subscribe(
              num=>
              {
                if(this.Reviews[p.id]!= Number(num))
                {
                  this.Reviews[p.id]= Number(num)
                }
            }) 
        })
      },
  );
  if(this.productList.length >8)
   {
     this.flag=true
   }
   if(this.productList.length >4)
   {
     this.flag=false
   }

}
public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}

AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  location.reload();
  }
  public productWishlist;
  AddToWishList(id){
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
          product=>{
            this.productWishlist = new ProductWishlist(id,product.id);
            this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe( 
            );
          }
        )  
      }
    )
  }
  hasDiscount(product:Product){
    return product.discount>0;
  }
  getPriceAfterDiscount(prouct:Product){
    let res=prouct.unitPrice;
    res-=prouct.unitPrice*(prouct.discount/100.0);
    return Math.ceil(res);
   }
}
