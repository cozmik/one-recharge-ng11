import { Component, OnInit } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

@Component({
  selector: 'sm-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  title = 'Categories';
  userIcon = faUser;
  signOut = faSignOutAlt;
  constructor() {}

  ngOnInit(): void {
  }

}
