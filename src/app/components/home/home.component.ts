import { Component, OnInit } from '@angular/core';
import { fade, glideY } from "../../shared/utilities/animations";
import { WordService } from "../../shared/services/word.service";
import { Levels, Result, Word } from "../../shared/types/word";
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
  public isLoading: { Easy: boolean, Medium: boolean, Hard: boolean } = { Easy: false, Medium: false, Hard: false };
  public isGuide: boolean;
  public isError: boolean = false;
  public isSuccess: boolean;
  public isLost: boolean = false;

  public currentWord: Word;
  public easyWord: Word;
  public mediumWord: Word;
  public hardWord: Word;
  public definition: string;
  public typeOf: string[];
  public syllables: number;
  public example: string;
  public step: number = 0;
  public hints: string[] = [];
  public level: Levels = null;

  constructor(private _wordService: WordService) {
  }

  public ngOnInit(): void {
    this.getWord('Easy');
    this.getWord('Medium');
    this.getWord('Hard');
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    environment.production
      ? getAnalytics(initializeApp(firebaseConfig))
      : null;
  }

  private getWord(level: Levels): void {
    this.isLoading[level] = true;
    this._wordService.getWord(level).subscribe(
      {
        next: res => {
          this.isLoading[level] = false;
          this.handleRes(res, level);
        },
        error: () => {
          this.isLoading[level] = false;
          this.isError = true;
        }
      });
  }

  private handleRes(res: Word, level: Levels): void {
    if (!res.syllables?.list?.length) {
      this.getWord(level);
      return;
    }
    const filteredResults = res.results.filter((result: Result) => {
      return result.partOfSpeech === 'noun' && result.examples?.length >= 1 && result.typeOf?.length >= 1
    });

    if (!filteredResults.length) {
      this.getWord(level);
      return;
    }
    this.switchLevel(level, filteredResults, res);
  }

  private switchLevel(level: Levels, results: Result[], res: Word): void {
    switch (level) {
      case "Easy": this.easyWord = this.setWords(results, res); break;
      case "Medium": this.mediumWord = this.setWords(results, res); break;
      case "Hard": this.hardWord = this.setWords(results, res); break;
    }
  }

  private setWords(results: Result[], res: Word): Word {
    return {results, word: res.word, syllables: res.syllables};
  }

  public chooseDifficulty(level: HTMLButtonElement, input: HTMLInputElement, container: HTMLDivElement): void {
    if (this.isLoading[level.children[0].innerHTML]) return;
    this.reset(true, input);
    Array.from(container.children).forEach(child => {
      child.classList.remove('active');
    });
    level.classList.add('active');
    this.level = level.children[0].innerHTML as Levels;
    this.setCurrentWord(this.level);
  }

  private setCurrentWord(level: Levels): void {
    switch (level) {
      case "Easy": this.currentWord = this.easyWord; break;
      case "Medium": this.currentWord = this.mediumWord; break;
      case "Hard": this.currentWord = this.hardWord; break;
    }
  }

  public submit(input: HTMLInputElement): void {
    if (!input.value) return;
    if (this.isLost) return;
    if (!this.level) {
      this.alterElements(false, input);
      return;
    }
    this.step++;
    this.failSteps(input);
  }

  private checkAnswer(input: HTMLInputElement): boolean {
    if (input.value.toLowerCase() === this.currentWord.word) {
      input.value = '';
      this.handleSuccess(input);
      return true;
    }
    input.value = '';
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
      case 1: this.hints.push(`The word contains ${this.currentWord.word.length} letters.`); break;
      case 2: this.hints.push(`The first letter is ${this.currentWord.word[0].toUpperCase()}`); break;
      case 3: this.hints.push(`The word has ${this.syllables} syllables`); break;
      case 4: this.hints.push(`The word is a type of: "${this.typeOf[0]}"`); break;
      case 5: this.hints.push(`The word can be used in a sentence like this: ${this.sensorString(this.example)}`); break;
      case 6: this.revelWord(); break;
    }
  }

  private revelWord(): void {
    this.reset(false);
    this.isLost = true;
  }

  public sensorString(definition: string): string {
    if (!definition) {
      return '';
    }
    const wordToReplace = this.currentWord.word;
    const stars = '_'.repeat(wordToReplace.length);
    return definition.replace(wordToReplace, stars);
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

  public toggleShowGuide(): void {
    this.isGuide = !this.isGuide;
  }

}
