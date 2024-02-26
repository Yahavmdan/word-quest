import { Component, OnInit } from '@angular/core';
import { fade, glideY } from "../../shared/utilities/animations";
import { WordService } from "../../shared/services/word.service";
import { EndPoints, Levels, Word } from "../../shared/types/word";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig, environment } from "../../../environments/environment.prod";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade('fade', 500),
    glideY('glide', -50, 200)
  ]
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public isGuide: boolean;
  public isError: boolean = false;
  public isSuccess: boolean;
  public isLost: boolean = false;

  public word: Word;
  public definition: string;
  public typeOf: string[];
  public rhymesWith: string[];
  public example: string;
  public step: number = 0;
  public hints: string[] = [];
  public level: Levels = null;

  constructor(private _wordService: WordService) {
  }

  public ngOnInit(): void {
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    environment.production
      ? getAnalytics(initializeApp(firebaseConfig))
      : null;
  }

  private getWord(): void {
    this.isLoading = true;
    this._wordService.getWord(this.level).subscribe(
      {
        next: res => {
          this.isLoading = false;
          this.word = res[0];
          this.getWordBy('definitions');
        },
        error: () => {
          this.isLoading = false;
          this.isError = true;
        }
      });
  }

  private handleDefinitions(res: any): void {
    this.definition = res.definitions[0].definition;
  }

  private handleExamples(res: any): void {
    const example = this.findLongestString(res['examples']);
    if (!example) {
      this.step++;
      this.failSteps();
      return;
    }
    this.example = this.replaceWordWithStars(example);
    this.hints.push(`The word can be used in a sentence like this: "${this.example}"`);
  }

  private handleRhymes(res: any): void {
    this.rhymesWith = res['rhymes'].all;
    this.hints.push(`The word rhymes with "${this.rhymesWith[0]}" or "${this.rhymesWith[1]}" or "${this.rhymesWith[2]}"`);
  }

  private handleTypeOf(res: any): void {
    this.typeOf = res.typeOf;
    if (!this.typeOf.length) {
      this.step++;
      this.failSteps();
      return;
    }
    this.hints.push(`The word is a type of "${this.typeOf[0]}"`);
  }

  private getWordBy(type: EndPoints): void {
    this._wordService.getWord2(this.word.word, type).subscribe(res => {
      switch (type) {
        case 'definitions': this.handleDefinitions(res); break;
        case 'examples': this.handleExamples(res); break;
        case 'rhymes': this.handleRhymes(res); break;
        case 'typeOf': this.handleTypeOf(res); break;
      }
    });
  }

  public chooseDifficulty(level: HTMLButtonElement, input: HTMLInputElement, container: HTMLDivElement): void {
    this.reset(true, input);
    Array.from(container.children).forEach(child => {
      child.classList.remove('active');
    });
    level.classList.add('active');
    // if ()
    this.level = level.innerHTML as Levels;
    // const word = this.findWord();
    // if (word) {
    //   this.word = word;
    // } else {
    this.getWord();
    // }
  }

  public submit(input: HTMLInputElement): void {
    if (this.isLost) return;
    if (!this.level) {
      this.alterElements(false, input);
      return;
    }
    this.step++;
    this.failSteps(input);
  }

  private checkAnswer(input: HTMLInputElement): boolean {
    if (input.value.toLowerCase() === this.word.word) {
      this.handleSuccess(input);
      return true;
    }
    return false;
  }

  private alterElements(success: boolean, input: HTMLInputElement): void {
    input.nextElementSibling.classList.remove('d-none');
    input.nextElementSibling.classList.add(success ? 'bi-check-lg' : 'bi-exclamation-lg');
    input.classList.add(success ? 'success' : 'error');
    setTimeout(() => {
      input.nextElementSibling.classList.add('d-none');
      input.nextElementSibling.classList.remove(success ? 'bi-check-lg' : 'bi-exclamation-lg');
      input.classList.remove(success ? 'success' : 'error');
      this.isSuccess = false;
    }, success ? 10000 : 500)
  }

  private failSteps(input?: HTMLInputElement): void {
    if (input) {
      if (this.checkAnswer(input)) return;

      this.alterElements(false, input);
    }
    switch (this.step) {
      case 1: this.hints.push(`The word contains ${this.word.word.length} letters.`); break;
      case 2: this.hints.push(`The first letter is ${this.word.word[0].toUpperCase()}`); break;
      case 3: this.getWordBy('typeOf'); break;
      case 4: this.getWordBy('examples'); break;
      case 5: this.getWordBy('rhymes'); break;
      case 6: this.getWordBy('similarTo'); break;
      case 7: this.revelWord(); break;
    }
  }

  private revelWord(): void {
    this.reset(false);
    this.isLost = true;
  }

  private replaceWordWithStars(definition: string): string {
    if (!definition) {
      return '';
    }
    const wordToReplace = this.word.word;
    const stars = '*'.repeat(wordToReplace.length);
    return definition.replace(wordToReplace, stars);
  }

  private findLongestString(arr: string[]): string {
    let longest = "";
    arr.forEach(str => {
      if (str.length > longest.length) {
        longest = str;
      }
    });
    return longest;
  }

  private reset(moveLevel: boolean, input?: HTMLInputElement): void {
    if (input && moveLevel) {
      input.value = '';
    }
    this.isLost = false;
    this.definition = '';
    this.step = 0;
    this.hints = [];
    this.isSuccess = false;
    this.isError = false;
  }

  private handleSuccess(input: HTMLInputElement): void {
    this.reset(false);
    this.alterElements(true, input);
    this.isSuccess = true;
  }

  private findWord(): Word {
    return JSON.parse(localStorage.getItem(`daly ${this.level} word`));
  }

  private setWord(): void {
    localStorage.setItem(`daly ${this.level} word`, JSON.stringify(this.word))
  }

  public toggleShowGuide(): void {
    this.isGuide = !this.isGuide;
  }

}
