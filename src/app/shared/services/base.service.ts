import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { keys } from "../../../env";
import { EndPoints } from "../types/word";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public apiUrl = environment.apiUrl;
  public apiUrlRapid = environment.apiUrlRapid;
  public headers = {
    'X-RapidAPI-Key': keys.apiRapidKey,
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }

  public getRandomWord(words: string[]): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  public prepareEndPoint(word: string, endPoint: EndPoints): string {
    return this.apiUrlRapid + word + '/' + endPoint
  }
}
