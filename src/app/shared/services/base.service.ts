import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { keys } from "../../../env";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public rapidApiUrl = environment.apiUrlRapid;
  public headers = {
    'X-RapidAPI-Key': keys.rapidApiKey,
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }

}
