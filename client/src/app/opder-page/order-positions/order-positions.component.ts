import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";

import {PositionsService} from "../../shared/services/positions.service";
import {Positionse} from "../../shared/interfaces";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";


@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Positionse[]>;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionsService,
    public order: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionService.fetch(params['id'])
          }
        ),
        map(
          (positions: Positionse[]) => {
            return positions.map(position => {
              position.quantity = 1;
              return position;
            })
          }
        )
      )
  }

  addToOrder(position: Positionse) {
    MaterialService.toast(`Добавленно х ${position.quantity} элемента`);
    this.order.add(position);
  }

}
