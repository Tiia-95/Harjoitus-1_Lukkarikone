
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
var edetaanko = false;
var juoksevaId = 1;

function uusiElementti() {
  tarkastus();
  if (edetaanko == false){
    alert("VIRHE! Lisää puuttuva tieto!")
  } else {
    tyhjennys();
    varastoi();
    var li = document.createElement("li");
    li.id = juoksevaId;
    juoksevaId ++;
    var inputValue = paaAihe;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    
    document.getElementById("tulostus").appendChild(li);
  
    paaAihe = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        //Lista objekti poistetaan täällä
        var div = this.parentElement;
        alert(localStorage.getItem(div.id));

        div.style.display = "none";
      }
    }
  }
  }



function tarkastus() {
  var otsikko = "";
  var paiva1 = "";
  var ele = document.getElementsByName("tyyppi");
   for(var i=0;i<ele.length;i++)
      if (ele[i].checked) {
        otsikko = ele[i].value;
      }
  
  var ele = document.getElementsByName("paiva");
  for(var i=0;i<ele.length;i++)
      if (ele[i].checked) {
        paiva1 = ele[i].value;
      }
  
  var tarkennus = document.getElementById("aihe").value;
  var aloitus = document.getElementById("aAika").value;
  var lopetus = document.getElementById("lAika").value;
  var lisatieto = document.getElementById("info").value;
  if (otsikko == ""){
    alert("Valitse jokin aihe, ennen kuin voit lisätä kentän");
    edetaanko = false;
  }
  else if (paiva1 == ""){
    alert("Valitse päivä, jolle haluat lisätä tapahtuman");
    edetaanko = false;
  }
  else if (aloitus == 0 || lopetus == 0){
    alert("Lisää vielä aika");
    edetaanko = false;
  }
  else if (aloitus > lopetus){
    alert("Lopetus aika ei voi olla ennen aloitus aikaa");
    edetaanko = false;
  } 
  else {
    edetaanko = true;
    var aika = aika_ero(aloitus, lopetus);
    var lisattava = `${otsikko} : ${tarkennus} : ${lisatieto} : ${paiva1} : ${aloitus}-${lopetus} : ${aika}h`;
    paaAihe = lisattava;
    yhteenlasku(aika, otsikko);
  }
}

function aika_ero(aloitus, lopetus) {
  
  var ero = ( new Date("1970-1-1 " + lopetus) - new Date("1970-1-1 " + aloitus) );
  ero = Math.round((ero / 60000 / 60) * 100) / 100;
  return ero;
}

function tyhjennys() {
  document.getElementById("aihe").value= "";
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

function varastoi() {
  localStorage.setItem(juoksevaId, paaAihe);
}

var kaikki = 0;
var treyht = 0;
var otyht = 0;
var ioyht = 0;
var oppiyht = 0;
var ruokayht = 0;
var muutyht = 0;

function yhteenlasku(aika, otsikko) {
  
  kaikki = kaikki + aika;
  document.getElementById("kaikkiyht").innerHTML = kaikki;
  
  if(otsikko == "Treeni"){
    treyht = treyht + aika;
    document.getElementById("treeniyht").innerHTML = treyht;
  }
  else if(otsikko == "Oppitunti"){
    otyht = otyht + aika;
    oppiyht = oppiyht + aika;
    document.getElementById("oppiyht").innerHTML = otyht;
    document.getElementById("opiskeluyht").innerHTML = oppiyht;
  }
  else if(otsikko == "Muu meno"){
    muutyht = muutyht + aika;
    document.getElementById("muuyht").innerHTML = muutyht;
  }
  else if(otsikko == "Itsenäinen opiskelu"){
    ioyht = ioyht + aika;
    oppiyht = oppiyht + aika;
    document.getElementById("itseyht").innerHTML = ioyht;
    document.getElementById("opiskeluyht").innerHTML = oppiyht;
  }
  else if(otsikko == "Ruokailu"){
    ruokayht = ruokayht + aika;
    document.getElementById("ruokayht").innerHTML = ruokayht;
  }
}

