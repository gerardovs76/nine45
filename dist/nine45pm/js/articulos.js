(function ($) {
  var totalPedido = 0;
  var totalCantidad = 0;
  var todasLasLineas = [];
  var lineasDePedido;
  var btnGrabarLinea = $("#btnGrabarLinea");
  var urlRequest = "https://nine45pm.com/services/pedido.php";

  $(document).ready(() => {
    validarOpciones();
    var divColores = $('#div-colores');
    var htmlDivColores = '';
    for (let i = 1; i < 11; i++) {
      htmlDivColores += `<div style="max-width: 50px; max-height: 50px;">
      <img src="images/colors/${i}.png" alt="" style="width:100%; height:auto;"/>
    </div>`
    }
    // console.log(htmlDivColores);
    divColores.html(htmlDivColores);
    var divDiseno = $('#div-diseno');
    var htmlDivDiseno = '';
    for (let i = 1; i < 41; i++) {
      htmlDivDiseno += `<div style="max-width: 50px; max-height: 50px;">
      <img src="images/designs/${i}.png" alt="" style="width:100%; height:auto;"/>
    </div>`
    }
    // console.log(htmlDivDiseno);
    divDiseno.html(htmlDivDiseno);
    console.log("Cargado completamente");
    var listartamano =
      "<option value=" + null + ">Seleccione el tamaño</option>";
    var tamano = ["Menor de 7 años", "De 7 a 14 años", "Mayor de 14 años"];

    var listarColores =
      "<option value=" + null + ">Seleccione el color</option>";
    var colores = [
      "Rojo",
      "Celeste",
      "Naranja",
      "Verde",
      "Amarillo",
      "Negro",
      "Blanco",
      "Azul",
      "Beige",
      "Café",
    ];

    var listarDisenos =
      "<option value=" + null + ">Seleccione el diseño</option>";
    var disenos = [
      "Transparente",
      "Lego Superman",
      "Lego Batman",
      "Capitán América",
      "Super Mario:  Luigi",
      "Amazing Spiderman 1",
      "Amazing Spiderman 2",
      "Hello Kitty",
      "My Little Pony",
      "Super Mario: Mario",
      "Frozen: Elsa",
      "PJ Masks: Gatuno",
      "Simpsons: Barcelona",
      "Fortnite",
      "StarWars: Darth Vader",
      "Simpsons: Emelec",
      "Transformers: Optimus Prime",
      "Dragon Ball Z: Goku",
      "Barbie",
      "Princesas Disney",
      "Spiderman",
      "Yo soy Grut",
      "Marvel Heroes",
      "Bebes Llorones: BOs",
      "Bebes Llorones: Countess",
      "StarWars: Darth Vader 2",
      "Adventure Tim",
      "Barbie 2",
      "Bob Esponja",
      "Paw Patrol",
      "Simpsons: Homero",
      "Las chicas superpoderosas",
      "Hulk",
      "Iron Man",
      "Princesita Sofia",
      "Pokemon",
      "Sonic Generations",
      "Captain America",
      "Mickey Mouse",
      "Frozen: Elsa 2",
    ];

    var formTamano = $("#formTamano");
    $.each(tamano, (key, tam) => {
      listartamano += "<option value=" + tam + ">" + tam + "</option>";
    });
    formTamano.append(listartamano);

    var formColor = $("#formColor");
    $.each(colores, (key, col) => {
      listarColores += "<option value=" + col + ">" + col + "</option>";
    });
    formColor.append(listarColores);

    var formDiseno = $("#formDiseno");
    $.each(disenos, (key, dis) => {
      listarDisenos += "<option value=" + dis + "><img src='images/designs/"+key+".png'/> " + dis + "</option>";
    });
    formDiseno.append(listarDisenos);

    $("#formCantidad").val(1);

    formTamano.on("change", () => {
      validarOpciones();
    });
    formColor.on("change", () => {
      validarOpciones();
    });
    formDiseno.on("change", () => {
      validarOpciones();
    });
    $("#formCantidad").on("change", () => {
      validarOpciones();
    });
    var nombre = $("#nombre");
    nombre.focusin(() => {
      //   console.log(nombre.val());
      validarOpciones();
    });
    nombre.focusin(() => {
      //   console.log(nombre.val());
      validarOpciones();
    });
    nombre.keyup(() => {
      //   console.log(nombre.val());
      validarOpciones();
    });
    var email = $("#email");
    email.focusin(() => {
      //   console.log(email.val());
      validarOpciones();
    });
    email.focusin(() => {
      //   console.log(email.val());
      validarOpciones();
    });
    email.keyup(() => {
      //   console.log(email.val());
      validarOpciones();
    });
    var telefono = $("#telefono");
    telefono.focusin(() => {
      //   console.log(telefono.val());
      validarOpciones();
    });
    telefono.focusin(() => {
      //   console.log(telefono.val());
      validarOpciones();
    });
    telefono.keyup(() => {
      //   console.log(telefono.val());
      validarOpciones();
    });
    var ciudad = $("#ciudad");
    ciudad.focusin(() => {
      //   console.log(ciudad.val());
      validarOpciones();
    });
    ciudad.focusin(() => {
      //   console.log(ciudad.val());
      validarOpciones();
    });
    ciudad.keyup(() => {
      //   console.log(ciudad.val());
      validarOpciones();
    });

    btnGrabarLinea.click((e) => {
      btnGrabarLinea.attr("disabled", true);
      grabarLinea(e);
    });

    $("#grabarPedido").click((e) => {
      $("#grabarPedido").attr("disabled", true);
      grabarPedido(e);
    });
  });

  function grabarPedido(e) {
    e.preventDefault();
    var nombre = $("#nombre").val();
    var email = $("#email").val();
    var telefono = $("#telefono").val();
    var ciudad = $("#ciudad").val();

    var enviarPedido = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      ciudad: ciudad,
      lineasDePedido: todasLasLineas,
      total: totalPedido,
      totalCantidad: totalCantidad,
    };

    $.post(urlRequest, enviarPedido).done((res) => {
      console.log(res);
      $("#grabarPedido").addClass("btn--stroke");
      $("#grabarPedido").removeClass("btn--primary");
      $("#nombre").val("");
      $("#email").val("");
      $("#telefono").val("");
      $("#ciudad").val("");
      $("#datosParaPedido").hide();
      $("#tableLineaPedido").html("");
      todasLasLineas = [];
      alertify.alert(
        "<h3>Su pedido fué enviado con éxito</h3>",
        "En el transcurso de máximo 2 horas nos pondremos en contacto con usted!!",
        function () {
          var offset = 20;
          $("html, body").animate(
            {
              scrollTop: $("#home").offset().top + offset,
            },
            2000
          );
        }
      );
    });
    // console.log(enviarPedido);
  }

  function validarOpciones() {
    var btnGrabarPedido = $("#grabarPedido");
    if (
      $("#formTamano option:selected").val() == "null" ||
      $("#formColor option:selected").val() == "null" ||
      $("#formDiseno option:selected").val() == "null" ||
      $("#formCantidad").val() < 1 ||
      isNaN($("#formCantidad").val())
    ) {
      btnGrabarLinea.removeClass("btn--primary");
      btnGrabarLinea.addClass("btn--stroke");
      btnGrabarLinea.attr("disabled", true);
    } else {
      btnGrabarLinea.addClass("btn--primary");
      btnGrabarLinea.removeClass("btn--stroke");
      btnGrabarLinea.attr("disabled", false);
    }
    if (!todasLasLineas.length) {
      $("#datosParaPedido").hide();
    } else {
      $("#datosParaPedido").show();
    }
    if (
      $("#nombre").val().length < 4 ||
      $("#email").val().length < 4 ||
      $("#telefono").val().length < 10 ||
      $("#ciudad").val().length < 4
    ) {
      btnGrabarPedido.addClass("btn--stroke");
      btnGrabarPedido.removeClass("btn--primary");
      btnGrabarPedido.attr("disabled", true);
    } else {
      //   console.log("Dentro: ", $("#nombre").val());
      btnGrabarPedido.addClass("btn--primary");
      btnGrabarPedido.removeClass("btn--stroke");
      btnGrabarPedido.attr("disabled", false);
    }
  }

  function grabarLinea(e) {
    e.preventDefault();

    var enviarTamano = $("#formTamano option:selected").text();
    var enviarColor = $("#formColor option:selected").text();
    var enviarDiseno = $("#formDiseno option:selected").text();
    var enviarCantidad = $("#formCantidad").val();

    todasLasLineas.push({
      id: +todasLasLineas.length + 1,
      tamano: enviarTamano,
      color: enviarColor,
      diseno: enviarDiseno,
      cantidad: enviarCantidad,
    });

    alertify
      .confirm(
        "Línea grabada con éxito",
        "<p>Color: " +
          enviarColor +
          "</p><p>Diseño: " +
          enviarDiseno +
          "</p><p>Tamaño: " +
          enviarTamano +
          "</p><p>Cantidad: " +
          enviarCantidad +
          "</p><p>¿Qué desea hacer ahora?</p>",
        function () {
          var offset = 1;
          $("html, body").animate(
            {
              scrollTop: $("#formGrabarLineaDePedido").offset().top + offset,
            },
            1500
          );
        },
        function () {
          var offset = 1;
          $("html, body").animate(
            {
              scrollTop: $("#formConfirmarPedido").offset().top + offset,
            },
            1500
          );
        }
      )
      .set("labels", { ok: "Grabar otra línea", cancel: "Confirmar pedido" });

    // console.log(todasLasLineas);

    mostrarLineas();
  }

  function eliminarLinea(id) {
    //   console.log(id);
    //   console.log('Antes de Filter: ', todasLasLineas);
    todasLasLineas = todasLasLineas.filter((linea) => {
      //   console.log(linea.id);
      //   console.log(linea.id != id);
      return linea.id != id;
    });

    mostrarLineas();
  }

  function mostrarLineas() {
    totalPedido = 0;
    totalCantidad = 0;
    // console.log("Todas las lineas en funcion: ", todasLasLineas);
    lineasDePedido = `<table>
    <thead>
      <tr>
        <th>#</th>
        <th>Cantidad</th>
        <th>Color</th>
        <th>Diseño</th>
        <th>Tamaño</th>
        <th>Sub-Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>`;
    c = 1;
    $.each(todasLasLineas, (key, linea) => {
      if (linea.diseno == "Transparente") {
        var subtotal = (+linea.cantidad * 3).toFixed(2);
      } else {
        var subtotal = (+linea.cantidad * 3.5).toFixed(2);
      }
      totalPedido += +subtotal;
      totalCantidad += +linea.cantidad;
      lineasDePedido +=
        "<tr><td>" +
        c +
        "</td><td>" +
        linea.cantidad +
        "</td><td>" +
        linea.color +
        "</td><td>" +
        linea.diseno +
        "</td><td>" +
        linea.tamano +
        "</td><td>$ " +
        subtotal +
        "</td><td><a class='btn btn--small btn--danger btn-eliminar' data-id='" +
        linea.id +
        "'>Eliminar Línea</a></td></tr>";
      c++;
    });
    lineasDePedido +=
      "<tr><td colspan=2>Total: </td><td colspan=2>$ " +
      totalPedido.toFixed(2) +
      "</td></tr>";
    if (totalCantidad > 12) {
      var descuento = +totalCantidad * 0.25;
      lineasDePedido +=
        "<tr><td colspan=2 style='color: red;'>Descuento: </td><td colspan=2 style='color: red;'>- $ " +
        descuento.toFixed(2) +
        "</td></tr>";
      lineasDePedido +=
        "<tr><td colspan=2 style='color: white;'>Total a Pagar: </td><td colspan=2 style='color: white;'>- $ " +
        (totalPedido - descuento).toFixed(2) +
        "</td></tr>";
    }
    lineasDePedido += `</tbody>
    </table>`;
    if (todasLasLineas.length) {
      $("#tableLineaPedido").html(lineasDePedido);
    } else {
      $("#tableLineaPedido").html("");
    }
    $(".btn-eliminar").click((btn) => {
      alertify
        .confirm(
          "¿Realmente desea eliminar esta línea?",
          "Esta acción no se puede deshacer!!",
          function () {
            eliminarLinea(btn.target.dataset.id);
            alertify.notify("Eliminado", "error", 2, function () {
              console.log("dismissed");
            });
            var offset = 1;
            $("html, body").animate(
              {
                scrollTop: $("#formGrabarLineaDePedido").offset().top + offset,
              },
              1500
            );
          },
          function () {
            alertify.notify(
              "Acción Cancelada",
              "alert-box--info",
              2,
              function () {
                console.log("dismissed");
              }
            );
            var offset = 1;
            $("html, body").animate(
              {
                scrollTop: $("#formGrabarLineaDePedido").offset().top + offset,
              },
              1500
            );
          }
        )
        .set("labels", { ok: "Eliminar", cancel: "Cancelar" });
    });
    $("#formColor").val("null");
    $("#formTamano").val("null");
    $("#formDiseno").val("null");
    $("#formCantidad").val(1);
    validarOpciones();
  }
})(jQuery);
