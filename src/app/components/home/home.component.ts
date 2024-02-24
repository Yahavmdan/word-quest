import { Component, OnInit } from '@angular/core';
import { fade, glideY } from "../../shared/utilities/animations";
import { WordService } from "../../shared/services/word.service";
import { Word } from "../../shared/types/word";
import { ThemeService } from "../../shared/services/theme.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade('fade', 100),
    glideY('glide', -50, 100)
  ]
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public showGuide: boolean;
  public isError: boolean = false;
  public isSuccess: boolean;
  public isDarkMode: boolean;
  public word: Word;
  public definition: string;
  public step: number = 0;
  public hints: string[] = [];
  public level: 'Easy' | 'Medium' | 'Hard' = null;

  constructor(private _wordService: WordService,
              private themeService: ThemeService) {
  }

  public ngOnInit(): void {
    this._wordService.getT('banana', 'typeOf').subscribe(res => {
      console.log(res)
    })
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  private getWord(): void {
    this.isLoading = true;
    this._wordService.getWord(this.level).subscribe(
      {
        next: res => {
          this.isLoading = false;
          this.word = res[0];
          this.definition = this.word.meanings[0].definitions[0].definition;
        },
        error: () => {
          this.isLoading = false;
          this.isError = true;
        }
      });
  }


  public chooseDifficulty(level: HTMLDivElement, input: HTMLInputElement): void {
    this.reset(true, input);
    this.level = level.innerHTML as 'Easy' | 'Medium' | 'Hard';
    // const word = this.findWord();
    // if (word) {
    //   this.word = word;
    // } else {
      this.getWord();
    // }
  }

  public submit(input: HTMLInputElement): void {
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

  private failSteps(input: HTMLInputElement): void {
    if (this.checkAnswer(input)) return;

    this.alterElements(false, input);

    if (this.step === 1) {
      this.hints.push(`Hint- ${this.step}: The word contains ${this.word.word.length} letters.`)
    }

    if (this.step === 2) {
      this.hints.push(`Hint- ${this.step}: The first letter is ${this.word.word[0].toUpperCase()}`)
    }

    if (this.step === 3) {
      let examples: string[] = []
      this.word.meanings[0].definitions.forEach(definition => {
        if (definition['example']) {
          examples.push(definition['example']);
        }
      });
      this.word.meanings[1]?.definitions.forEach(definition => {
        if (definition['example']) {
          examples.push(definition['example']);
        }
      });
      if (examples.length) {
        this.hints.push(`Hint- ${this.step}: The word can be used in a sentence like this: ${
          this.replaceWordWithStars(examples[0])
        }`);
      }
    }
  }

  private replaceWordWithStars(definition: string): string {
    if (!definition) {
      return '';
    }
    const wordToReplace = this.word.word;
    const stars = '*'.repeat(wordToReplace.length);
    return definition.replace(wordToReplace, stars);
  }

  private reset(moveLevel: boolean, input?: HTMLInputElement): void {
    if (input && moveLevel) {
      input.value = '';
    }
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
    this.showGuide = !this.showGuide;
  }

}
