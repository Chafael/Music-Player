import { Component, ViewChild } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { ProgressBar } from '../../shared/components/progress-bar/progress-bar';
import { Main } from '../../shared/components/main/main';

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidebar, ProgressBar, Main],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  @ViewChild('mainComponent') private mainComponent?: Main;

  handleSearch(query: string): void {
    this.mainComponent?.handleSearch(query);
  }

  getSelectedTrack() {
    return this.mainComponent?.getSelectedTrack() || null;
  }
}