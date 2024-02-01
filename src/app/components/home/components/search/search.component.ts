import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoCompleteResponse } from "../../../../shared/types/auto-complete-response";
import { AutoCompleteService } from "../../../../shared/services/auto-complete.service";
import { ToastService } from "../../../../shared/services/toast.service";
import { catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public selectedCity: AutoCompleteResponse;
  searchInput: string = '';

  @Input() public inputPlaceholder: string;
  @Output() public search: EventEmitter<AutoCompleteResponse> = new EventEmitter<AutoCompleteResponse>();

  constructor(
    private _autoCompleteService: AutoCompleteService,
    public toastService: ToastService
  ) { }

  public onSearch(): void {
    if (!this.searchInput) return;
    if (!this.selectedCity)
      return this.toastService.showErrorToast('Invalid state, please try again');
    this.search.emit(this.selectedCity);
  }

  public keyPress(event): void {
    this.filterText()
    if (event.key === "Enter")
      this.onSearch();
  }

  public filterText(): void {
    try{
      const nonEnglishRegex = new RegExp(/^[^A-Za-z]*$/);
      this.searchInput = this.searchInput.replace(nonEnglishRegex, '');
    } catch(err) {
      return;
    }
  }

  public selectFormatter = (value: AutoCompleteResponse): string => {
    this.selectedCity = value;
    this.onSearch()
    return this.popupFormatter(value);
  }
  public popupFormatter = (value: AutoCompleteResponse): string => {
    return value ? `${value.LocalizedName}, ${value.Country.LocalizedName}` : null
  }

  public onAutoComplete = (value$: Observable<string>): Observable<AutoCompleteResponse[]> => {
    return value$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._autoCompleteService.getAutoComplete(value)),
      catchError((err) => { this.toastService.showErrorToast(err.message); return of([]) })
    )
  }

}
