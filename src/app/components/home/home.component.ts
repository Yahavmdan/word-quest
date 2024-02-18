import { Component } from '@angular/core';
import { fade, glideY } from "../../shared/utilities/animations";
import { WordService } from "../../shared/services/word.service";
import { Word } from "../../shared/types/word";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade('fade', 500),
    glideY('glide', -20, 500)]
})
export class HomeComponent {

  public word: Word;
  public step: number = 0;
  public hints: string[] = [];
  public level: 'Easy' | 'Medium' | 'Hard' = null;
  public success: boolean;

  constructor(private _wordService: WordService) {
  }

  private getWord(): void {
    this._wordService.getWord(this.level).subscribe(res => {
      this.word = res[0];
      this.setWord();
    })
  }

  public chooseDifficulty(level: 'Easy' | 'Medium' | 'Hard', input: HTMLInputElement): void {
    this.reset(true, input);
    this.level = level;
    const word = this.findWord();
    if (word) {
      this.word = word;
    } else {
      this.getWord();
    }
  }

  public submit(input: HTMLInputElement): void {
    this.step ++;
    this.failSteps(input);
  }

  private isSuccess(input: HTMLInputElement): boolean {
    if (input.value === this.word.word) {
      this.handleSuccess(input);
      return true;
    }
    return false;
  }

  private alterElements(success: boolean, input: HTMLInputElement):void {
    input.nextElementSibling.classList.remove('d-none');
    input.nextElementSibling.classList.add( success ? 'bi-check-lg' : 'bi-exclamation-lg');
    input.classList.add(success ? 'success' : 'error');
    setTimeout(() => {
      input.nextElementSibling.classList.add('d-none');
      input.nextElementSibling.classList.remove(success ? 'bi-check-lg' : 'bi-exclamation-lg');
      input.classList.remove(success ? 'success' : 'error');
    }, 1000)
  }

  private failSteps(input: HTMLInputElement): void {
    if (this.isSuccess(input)) return;

    this.alterElements(false, input);

    if (this.step === 1) {
      this.hints.push(`Hint- ${this.step}: The word contains ${this.word.word.length} letters.`)
    }

    if (this.step === 2) {
      this.hints.push(`Hint- ${this.step}: The first letter is ${this.word.word[0].toUpperCase()}`)
    }

    if (this.step === 3) {

    }
  }

  private reset(moveLevel: boolean, input?: HTMLInputElement): void {
    if (input && moveLevel) {
      input.focus();
      input.value = '';
    }
    this.step = 0;
    this.hints = [];
    this.success = false;
  }

  private handleSuccess(input: HTMLInputElement): void {
    this.reset(false);
    this.alterElements(true, input);
    this.success = true;
  }

  private findWord(): Word {
    return JSON.parse(localStorage.getItem(`daly ${this.level} word`));
  }

  private setWord(): void {
    localStorage.setItem(`daly ${this.level} word`, JSON.stringify(this.word))
  }


}
