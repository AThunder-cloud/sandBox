
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit ,signal  } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
})
export class SearchComponent implements OnInit {
  http = inject(HttpClient)
  searchControl = new FormControl('');
  error = signal(false);
  loading = signal(false);
  result = signal<any[]>([]);
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) return of([]);
        this.loading.set(true);
        this.error.set(false);

        return this.http.get<any[]>(`http://www.google.com/search?q=${value}`).pipe(
          catchError(() => {
            this.error.set(true);
            return of([]);
          }),
          finalize(() => this.loading.set(false))
        );
      } )
    ).subscribe((res:any)=>{
      this.result.set(res);
    })
  }
}
