
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    }
  }

var paaAihe = "";

function uusiElementti() {
    tarkastus();
    tyhjennys();
    var li = document.createElement("li");
    var inputValue = paaAihe;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("Sinun täytyy valita jokin aihe");
    } else {
      document.getElementById("tulostus").appendChild(li);
    }
    paaAihe = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  }

function myFunction(tyyppi) {
  document.getElementById("asia").value = tyyppi;
  }

function paivanvalinta(paiva) {
  document.getElementById("valittuPaiva").value = paiva;
  }

function tarkastus() {
  var otsikko = document.getElementById("asia").value;
  var tarkennus = document.getElementById("aihe").value;
  var paiva = document.getElementById("valittuPaiva").value;
  var aloitus = document.getElementById("aAika").value;
  var lopetus = document.getElementById("lAika").value;
  var lisatieto = document.getElementById("info").value;

  if (otsikko == ""){
    alert("Valitse jokin aihe, ennen kuin voit lisätä kentän");
  }
  else if (tarkennus == ""){
    tarkennus = " ";
  }
  else if (paiva == ""){
    alert("Valitse päivä, jolle haluat lisätä tapahtuman")
  }
  else if (aloitus == "" || lopetus == ""){
    alert("Lisää vielä aika")
  }
  else if (aloitus > lopetus){
    alert("Lopetus aika ei voi olla ennen aloitus aikaa")
  }
  var aika  = aika_ero(aloitus, lopetus);

  var lisattava = `${otsikko} : ${tarkennus} : ${lisatieto} : ${paiva} : ${aloitus}-${lopetus} : ${aika}h`;
  paaAihe = lisattava;
  
}

function aika_ero(aloitus, lopetus) {
  var ero = ( new Date("1970-1-1 " + lopetus) - new Date("1970-1-1 " + aloitus) );
  ero = Math.round((ero / 60000 / 60) * 100) / 100;
  return ero;
}

function tyhjennys() {
  document.getElementById("asia").value = "";
  document.getElementById("aihe").value= "";
  document.getElementById("valittuPaiva").value= "";
  document.getElementById("aAika").value= "";
  document.getElementById("lAika").value= "";
  document.getElementById("info").value= "";
  var ele = document.getElementsByName("tyyppi");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
  var ele = document.getElementsByName("paiva");
  for(var i=0;i<ele.length;i++)
      ele[i].checked = false;

}