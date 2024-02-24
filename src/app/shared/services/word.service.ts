import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { EndPoints, Word } from "../types/word";
import { easyWords, hardWords, mediumWords } from "../consts/words";

@Injectable({
  providedIn: 'root'
})
export class WordService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getWord(level: 'Easy' | 'Medium' | 'Hard'): Observable<Word> {
    let words = [];
    switch (level) {
      case 'Easy':
        words = easyWords;
        break;
      case 'Medium':
        words = mediumWords;
        break;
      case 'Hard':
        words = hardWords;
        break;
    }
    return this.httpClient.get<Word>(this.apiUrl + this.getRandomWord(words));
  }

  public getWord2(word: string, endPoint: EndPoints): Observable<any> {
    return this.httpClient.get<any>(this.prepareEndPoint(word, endPoint), {headers: this.headers});
  }

}
