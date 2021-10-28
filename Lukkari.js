//Alla paikallisten muuttujien määrittely
var paaAihe = "";
var edetaanko = false;
var juoksevaId = 0;
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

//Tässä on pääfunktio, sillä tätä kutsutaan html koodissa, kun halutaan lisätä uusi tapahtuma. Ja tästä kutsutaan muita suoritettavia funktioita.
//Tästä fuktiosta siirrytään eteenpäin tarkastamaan syötettyjä tietoja tarkastus-funktioon, sekä jos tarkastus on hyväksytty, siirrytään tyhjennys- ja uusiElementti-funktioihin.
function paaFunktio() {
  tarkastus();
  if (edetaanko == true){
    tyhjennys();
    uusiElementti();
  }
}

//Tässä on fuktio, joka luo uuden listaobjektin.
//Tästä fuktiosta siirytään objektia poistettaessa poistaminen-funktioon. 
function uusiElementti() {
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
        var listItem=this.parentNode;
        poistaminen(listItem.textContent, listItem.id);
        var ul=listItem.parentNode;
        ul.removeChild(listItem);
      }
    }
  }

//Tässä funktiossa poistetaan yksittäinen listaobjekti localstoragen tiedoista.
function poistaminen(tieto, id) {
  var otsikko = [];
  var aika = [];
  var mones = 0;
  for(i = 0; i < tieto.length; i++){
    if(tieto[i] != ":"){  
      if(mones == 0){
        otsikko.push(tieto[i]);
      } else if(mones == 7){
        aika.push(tieto[i]);
      }
    } else {
        mones ++;
    }
  }
  var ots = otsikko.join("");
  var aik = aika.join("");
  ots = ots.trim();
  yhteenlasku((aik*-1), ots)
 
  id = Number(id);
  for(i = id; i <= (juoksevaId - 1); i++){
    if(i < (juoksevaId - 1)){
      localStorage.setItem(i, localStorage.getItem(i+1));
    } else {
      localStorage.removeItem(i);      
    }
  }
  juoksevaId = juoksevaId - 1;
}

//Tässä funktiossa tarkastetaan, että tarpeelliset tiedot on syötetty. Jos näin ei ole, estetään ohjelman eteneminen.
//Jos tiedot on kunnossa, edetään yhteenlasku-funktioon sekä lisätään tiedot localstoragen muistiin.
function tarkastus() {
  var otsikko = "";
  var paiva1 = "";
  var ele = document.getElementsByName("tyyppi");
   for(var i = 0; i < ele.length; i++)
      if (ele[i].checked) {
        otsikko = ele[i].value;
      }
  
  var ele = document.getElementsByName("paiva");
  for(var i = 0; i < ele.length; i++)
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
    var aika = Number(((new Date("1970-1-1 " + lopetus) - new Date("1970-1-1 " + aloitus)) / 60000 / 60).toFixed(2));
    var lisattava = `${otsikko} : ${tarkennus} : ${lisatieto} : ${paiva1} : ${aloitus}-${lopetus} : ${aika}:(h)`;
    paaAihe = lisattava;
    yhteenlasku(aika, otsikko);
    localStorage.setItem(juoksevaId, paaAihe);
  }
}

//Tämä funktio tyhjentää kysely-lomakkeen.
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

//Tässä funktiossa luodaan localstorageen tarvittavat muuttujat.
//Suoritetaan aina uudelleen ladataessa sivu sekä tyhjennä-napin painamisen jälkeen.
function varasto() {
  if(localStorage.getItem("kaikki") == null){
    localStorage.setItem("kaikki", "0");
  } 
  if(localStorage.getItem("treyht") == null){
    localStorage.setItem("treyht", "0");
  }
  if(localStorage.getItem("otyht") == null){
    localStorage.setItem("otyht", "0");
  }
  if(localStorage.getItem("ioyht") == null){
    localStorage.setItem("ioyht", "0");
  }
  if(localStorage.getItem("oppiyht") == null){
    localStorage.setItem("oppiyht", "0");
  }
  if(localStorage.getItem("ruokayht") == null){
    localStorage.setItem("ruokayht", "0");
  }
  if(localStorage.getItem("muutyht") == null){
    localStorage.setItem("muutyht", "0");
  }
  document.getElementById("kaikkiyht").innerHTML = localStorage.getItem("kaikki");
  document.getElementById("treeniyht").innerHTML = localStorage.getItem("treyht");
  document.getElementById("oppiyht").innerHTML = localStorage.getItem("otyht");
  document.getElementById("opiskeluyht").innerHTML = localStorage.getItem("oppiyht");
  document.getElementById("muuyht").innerHTML = localStorage.getItem("muutyht");
  document.getElementById("itseyht").innerHTML = localStorage.getItem("ioyht");
  document.getElementById("ruokayht").innerHTML = localStorage.getItem("ruokayht");
  
  if(localStorage.length > 7){
    var maara = localStorage.length - 7;
    for(ind = 0; i < maara; ind++){
      paaAihe = localStorage.getItem(ind);
      uusiElementti();
    }
  }
}

//Tässä lasketaan yhteen koko viikon ajan tunnit. 
function yhteenlasku(aika, otsikko) {

  //LocalStoragesta haetaan nykyinen arvo, joka muutetaan numeroksi. Siihen lisätään aika ja se pyöristetään kahden desimaalin tarkkuuteen ennen uudelleen tallentamista.
  localStorage.setItem("kaikki", Math.round((Number(localStorage.getItem("kaikki")) + aika)*100)/100);
  document.getElementById("kaikkiyht").innerHTML = localStorage.getItem("kaikki");
  
  if(otsikko == "Treeni"){
    localStorage.setItem("treyht", Math.round((Number(localStorage.getItem("treyht")) + aika)*100)/100);
    document.getElementById("treeniyht").innerHTML = localStorage.getItem("treyht");
  }
  else if(otsikko == "Oppitunti"){
    localStorage.setItem("otyht", Math.round((Number(localStorage.getItem("otyht")) + aika)*100)/100);
    document.getElementById("oppiyht").innerHTML = localStorage.getItem("otyht");

    localStorage.setItem("oppiyht", Math.round((Number(localStorage.getItem("oppiyht")) + aika)*100)/100);
    document.getElementById("opiskeluyht").innerHTML = localStorage.getItem("oppiyht");
  }
  else if(otsikko == "Muu meno"){
    localStorage.setItem("muutyht", Math.round((Number(localStorage.getItem("muutyht")) + aika)*100)/100);
    document.getElementById("muuyht").innerHTML = localStorage.getItem("muutyht");
  }
  else if(otsikko == "Itsenäinen opiskelu"){
    localStorage.setItem("ioyht", Math.round((Number(localStorage.getItem("ioyht")) + aika)*100)/100);
    document.getElementById("itseyht").innerHTML = localStorage.getItem("ioyht");

    localStorage.setItem("oppiyht", Math.round((Number(localStorage.getItem("oppiyht")) + aika)*100)/100);
    document.getElementById("opiskeluyht").innerHTML = localStorage.getItem("oppiyht");
  }
  else if(otsikko == "Ruokailu"){
    localStorage.setItem("ruokayht", Math.round((Number(localStorage.getItem("ruokayht")) + aika)*100)/100);
    document.getElementById("ruokayht").innerHTML = localStorage.getItem("ruokayht");
  }
}

//Tässä fuktiossa tyhjennetään kokonaan kaikki sivun tiedot, tyhjennä-napista aktivoitaessa.
function tyhjenna() {
  
  localStorage.clear();
  juoksevaId = 0; 
  document.getElementById("tulostus").innerHTML = "";

  varasto();
}

document.addEventListener('DOMContentLoaded', varasto);