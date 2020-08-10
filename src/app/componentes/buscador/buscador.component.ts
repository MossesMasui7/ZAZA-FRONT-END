// Importacion de Servicios
import { MyserviceService } from "src/app/services/myservice.service";
import { RegistroService } from "../../services/usuario.service";
import { ProductoService } from "../../services/producto.service";
//Importaciones de herramientas
import { Component, OnInit, Injectable } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-buscador",
  templateUrl: "./buscador.component.html",
  styleUrls: ["./buscador.component.scss"],
})
export class BuscadorComponent implements OnInit {
  //Declaracion de variables

  vacio: boolean = false;
  resultado: boolean = false;
  productos: any[] = [];
  search: any = new FormControl("");

  // Constructor

  constructor(
    public usuario: MyserviceService,
    public usuarios: RegistroService,
    private barcodeScanner: BarcodeScanner,
    public producto: ProductoService,
    public router: Router
  ) {}

  //Funciones que se ejecutan al iniciar el componente

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(700)).subscribe((texto) => {
      this.producto.cdb = texto;
      if (texto) {
        this.vacio = true;
        this.obtenerProducto(texto);
      } else {
        this.vacio = false;
        this.producto.productos = [];
      }
    });
  }

  //Funcion escaner por QR y Codigo de barras con ionic native

  escanear() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.producto.cdb = barcodeData.text;

        this.search = barcodeData.text;
        this.obtenerProducto(this.search);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  // Funcion Obtener los Kilometros del producto a nuestra ubicacion

  rad(x) {
    return (x * Math.PI) / 180;
  }
  getKilometros = function (lat2, lon2) {
    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.rad(lat2 - this.usuario.la);
    var dLong = this.rad(lon2 - this.usuario.lo);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.usuario.la)) *
        Math.cos(this.rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3); //Retorna tres decimales
  };
  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  // Funcion para Ordenar productos por precio

  SortPre() {
    for (let i = 0; i < this.producto.tiendas["tiendas"].length; i++) {
      if (
        parseFloat(
          this.getKilometros(
            this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
              "longitude"
            ],
            this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
              "latitude"
            ]
          )
        ) <= 200
      ) {
        this.productos.push(this.producto.tiendas["tiendas"][i]);
        this.productos[i]["distancia"] = this.getKilometros(
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "longitude"
          ],
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "latitude"
          ]
        );
        this.productos.sort(this.GetSortOrder("precio"));
      } else {
        this.productos.push(this.producto.tiendas["tiendas"][i]);
        this.productos[i]["alcance"] = false;
      }
    }
    this.producto.tiendas["tiendas"] = this.productos;
    this.productos = [];
    console.log(this.producto.tiendas["tiendas"]);
  }

  //Funcion para odenar productos por distancia

  SortDis() {
    for (let i = 0; i < this.producto.tiendas["tiendas"].length; i++) {
      if (
        parseFloat(
          this.getKilometros(
            this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
              "longitude"
            ],
            this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
              "latitude"
            ]
          )
        ) < 200
      ) {
        this.productos.push(this.producto.tiendas["tiendas"][i]);
        this.productos[i]["distancia"] = this.getKilometros(
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "longitude"
          ],
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "latitude"
          ]
        );
        this.productos[i]["alcance"] = true;

        this.productos.sort(this.GetSortOrder("distancia"));
      } else {
        this.productos.push(this.producto.tiendas["tiendas"][i]);
        this.productos[i]["distancia"] = this.getKilometros(
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "longitude"
          ],
          this.producto.tiendas["tiendas"][i]["negocio"]["cordenadas"][
            "latitude"
          ]
        );
        this.productos[i]["alcance"] = false;
      }
    }
    this.producto.tiendas["tiendas"] = this.productos;
    this.productos = [];
    console.log(this.producto.tiendas["tiendas"]);
  }

  //Funcion para extraer el producto que seleccionaste

  seleccionar(indice: any) {
    this.producto.tiendas = this.producto.productos[indice];

    this.SortDis();
    this.router.navigate(["./buscar"]);
    //console.log(this.producto.tiendas);
    this.producto.precio = [];
    this.search = null;
    this.producto.productos = [];
  }

  // funcion que redirecciona a añadir producto si no existe

  addProducto() {
    this.router.navigate(["alta-producto"]);
  }

  //Funcion que obtiene los productos de la base de datos

  obtenerProducto(texto: any) {
    if (texto.startsWith("@")) {
      let usuario = texto.substring(1);
      this.usuarios
        .buscar(usuario)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("Usuario no existe");
        });
    } else {
      this.producto
        .obtener(texto.toLowerCase())
        .then((prod) => {
          if (prod["resp"].length > 1) {
            prod["resp"].forEach((element) => {
              if (element["tiendas"].length > 0) {
                this.producto.productos.push(element);
              }
            });
            this.resultado = false;
            // console.log(this.producto.productos);
          } else if (prod["resp"].length == 0) {
            this.resultado = true;
            this.router.navigate(["./alta-producto"]);
          } else {
            this.producto.tiendas = prod["resp"]["0"];
            this.resultado = false;
            this.router.navigate(["./buscar"]);

            this.SortDis();
            this.producto.precio = [];
          }
        })
        .catch((err) => {
          this.resultado = true;
          this.producto.productos = [];
        });
    }
  }
}
