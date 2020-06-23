import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  principal() {
    this.router.navigate(["./home"]);
  }
  alta() {
    this.router.navigate(["./alta-producto"]);
  }
}
