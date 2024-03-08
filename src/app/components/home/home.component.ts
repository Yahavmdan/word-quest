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
  public isLoading: boolean = false;
  public isGuide: boolean;
  public isError: boolean = false;
  public isSuccess: boolean;
  public isLost: boolean = false;

  public word: Word;
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
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    environment.production
      ? getAnalytics(initializeApp(firebaseConfig))
      : null;
  }

  private getWord(level?: Levels): void {
    this.isLoading = true;
    this._wordService.getWord(this.level ?? level).subscribe(
      {
        next: res => {
          this.handleRes(res, this.level);
        },
        error: () => {
          this.isLoading = false;
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

    this.word = {results: filteredResults, word: res.word, syllables: res.syllables};
    this.definition = this.word.results[0].definition;
    this.syllables = this.word.syllables.count;
    this.typeOf = this.word.results[0].typeOf;
    this.example = this.word.results[0].examples[0];
    this.isLoading = false;
  }

  public chooseDifficulty(level: HTMLButtonElement, input: HTMLInputElement, container: HTMLDivElement): void {
    this.reset(true, input);
    Array.from(container.children).forEach(child => {
      child.classList.remove('active');
    });
    level.classList.add('active');
    this.level = level.innerHTML as Levels;
    this.getWord();
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
    if (input.value.toLowerCase() === this.word.word) {
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
      case 1: this.hints.push(`The word contains ${this.word.word.length} letters.`); break;
      case 2: this.hints.push(`The first letter is ${this.word.word[0].toUpperCase()}`); break;
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
    const wordToReplace = this.word.word;
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
