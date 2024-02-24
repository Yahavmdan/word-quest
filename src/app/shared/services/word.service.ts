import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Word } from "../types/word";

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
      case 'Easy': words = this.words.easyWords; break;
      case 'Medium': words = this.words.mediumWords; break;
      case 'Hard': words = this.words.hardWords; break;
    }
    return this.httpClient.get<Word>(this.apiUrl + this.getRandomWord(words));
  }

  public getWordType(word: string, endPoint: 'typeOf' | 'other'): Observable<any> {
    return this.httpClient.get<any>(this.prepareEndPoint(word, endPoint), {headers: this.headers});
  }

  private getRandomWord(words: string[]): string {
    return words[Math.floor(Math.random() * words.length)];
  }

}
