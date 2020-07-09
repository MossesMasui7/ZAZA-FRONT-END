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
  codigo: any;

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
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((texto) => {
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
        this.search = barcodeData.text;
        this.obtenerProducto(this.search);
        if (this.resultado == true) {
          this.router.navigate(["./alta-producto"]);
        }
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
        ) <= 15
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
        ) <= 15
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
  }

  //Funcion para extraer el producto que seleccionaste

  seleccionar(indice: any) {
    this.producto.tiendas = this.producto.productos[indice];
    this.SortDis();
    this.producto.precio = [];
    //console.log(this.producto.tiendas);
    this.alerta();
  }

  // funcion que redirecciona a añadir producto si no existe

  addProducto() {
    this.router.navigate(["alta-producto"]);
  }

  //Funcion de alerta

  alerta() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Seleccione la opcion",
        text: "Desea Comparar el producto ó ver perfil de producto",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Comparar",
        cancelButtonText: "Ver perfil",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.router.navigate(["buscar"]);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.router.navigate(["perfil-producto"]);
        }
      });
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
            this.producto.productos = prod["resp"];

            this.resultado = false;
            // console.log(this.producto.productos);
          } else if (prod["resp"].length == 0) {
            this.resultado = true;
          } else {
            this.producto.tiendas = prod["resp"]["0"];
            this.resultado = false;
            this.router.navigate(["./buscar"]);

            this.SortDis();
            this.producto.precio = [];
            // console.log(this.producto.tiendas);
          }
        })
        .catch((err) => {
          this.resultado = true;
          this.producto.productos = [];
        });
    }
  }
}
