import {Component, OnInit} from '@angular/core';
import {EndPointService} from '../end-point.service';
import {EndPoint} from 'platform-domain';

@Component({
  selector: 'fuse-end-point-list',
  templateUrl: './end-point-list.component.html',
  styleUrls: ['./end-point-list.component.scss']
})
export class EndPointListComponent implements OnInit {

  rows: EndPoint[] = [];

  constructor(private eps: EndPointService) {
  }

  ngOnInit() {
    this.eps.getAll().subscribe(result => this.rows = result);
  }

  gotoEndpoint(id: string) {
    console.log(`clicked id:${id}`);
  }
}

