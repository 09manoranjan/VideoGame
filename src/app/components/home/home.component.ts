import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { APIResponse,Game } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  public sort:string;
  public games: Array<Game>;
  private routeSub:Subscription;
  private gameSub:Subscription;
  constructor(private httpservice:HttpService,
    private router:ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.routeSub = this.router.params.subscribe((params: Params)=>{
      if(params['game-searvh']){
        this.searchGames('metacrit',params['game-search']);
      }
      else{
        this.searchGames('metacrit');
      }
    })
  }
  searchGames(sort:string,search?:string){
    this.gameSub = this.httpservice.getgameList(sort,search).subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);

    })
  }
  openGameDetails(id:string){
    this.route.navigate(['details',id]);  
  }

  ngOnDestroy():void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
