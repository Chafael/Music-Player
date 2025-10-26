import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  protected searchQuery = '';
  readonly onSearch = output<string>();

  handleSearch(): void {
    if (this.searchQuery.trim()) {
      this.onSearch.emit(this.searchQuery.trim());
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
}