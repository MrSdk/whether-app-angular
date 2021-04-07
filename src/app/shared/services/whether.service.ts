import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod"

@Injectable({
  providedIn: 'root'
})
export class WhetherService {
  private url = environment.url+"/data/2.5/onecall?appid=85e8aa1e4e1f21f163162abfe3feff52&units=metric" // &lat=41.311081&lon=69.240562

  constructor(private http: HttpClient) { }

  getCloudData(lat,lng){
    return this.http.get( this.url + "&lat=" + lat + "&lon=" + lng  )
  }
}
