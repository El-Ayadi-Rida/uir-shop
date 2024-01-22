import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showSideBar: boolean = false;
  isMenuOpen: boolean = false;
  isClosed: boolean = false;
  

  constructor(){

  }

  isClosedItems(){
    this.isClosed = !this.isClosed;
  }
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideBar(){
    this.showSideBar = !this.showSideBar;
  }



  
}

  

