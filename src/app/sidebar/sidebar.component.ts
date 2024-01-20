import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showSideBar: boolean = false;
  isMenuOpen: boolean = false;
  isCollapsed: boolean = false;

  constructor(){

  }

  collapseItems(){
    this.isCollapsed = !this.isCollapsed;
  }
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideBar(){
    this.showSideBar = !this.showSideBar;
  }



  
}

  

