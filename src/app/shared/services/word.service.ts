import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Levels } from "../types/word";

@Injectable({
  providedIn: 'root'
})
export class WordService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getWord(level: Levels): Observable<any> {
    const params = this.prepareParams(level);
    return this.httpClient.get<any>(this.rapidApiUrl + '?random=true', {headers: this.headers, params});
  }

  private prepareParams(level: Levels): {limit: number, syllablesMin: string, syllablesMax: string, hasDetails: string} {
    switch (level) {
      case 'Easy': return  {limit: 1000, syllablesMin: '1', syllablesMax: '1', hasDetails: 'hasDetails=typeOf,hasCategories'}
      case 'Medium': return  {limit: 1000, syllablesMin: '2', syllablesMax: '3', hasDetails: 'hasDetails=typeOf,hasCategories'}
      case 'Hard': return  {limit: 1000, syllablesMin: '4', syllablesMax: '5', hasDetails: 'hasDetails=typeOf,hasCategories'}
    }
  }
}
