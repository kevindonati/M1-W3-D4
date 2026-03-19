const numeriNonEstratti = []
const numeriEstratti = []

// CREAZIONE TABELLONE

const creaCelle = function () {
  for (let i = 0; i < 90; i++) {
    const section = document.getElementById("tabella-celle")
    const celle = document.createElement("div")
    celle.innerHTML = `<p class="par-dentro-caselle">${i + 1}</p>`
    celle.classList.add("casella")
    section.appendChild(celle)
  }
}
creaCelle()

// CREAZIONE TABELLE GIOCATORE

const creaTabellaGiocatore = function () {
  const section = document.getElementById("tabella-giocatore")
  const tabella = document.createElement("div")
  tabella.classList.add("tabella-giocatore-singola")
  const numeri = []
  for (let i = 1; i <= 90; i++) {
    numeri.push(i)
  }
  const numeriEstratti = []
  for (let i = 0; i < 15; i++) {
    const random = Math.floor(Math.random() * numeri.length)
    const numero = numeri.splice(random, 1)[0]
    numeriEstratti.push(numero)
  }
  numeriEstratti.sort((a, b) => a - b)
  numeriEstratti.forEach((numero) => {
    const cella = document.createElement("div")
    cella.innerHTML = `<p class="par-dentro-caselle">${numero}</p>`
    cella.classList.add("casella-giocatore")
    tabella.appendChild(cella)
  })
  section.appendChild(tabella)
}

// ACQUISTO TABELLE GIOCATORE

const form = document.querySelector("form")
form.addEventListener("submit", function (e) {
  e.preventDefault()
  const section = document.getElementById("tabella-giocatore")
  section.innerHTML = ""
  const inputNumber = document.getElementById("seleziona-numero-caselle").value
  console.log(inputNumber)
  switch (inputNumber) {
    case "1":
      creaTabellaGiocatore()
      break
    case "2":
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      break
    case "3":
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      break
    case "4":
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      break
    case "5":
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      break
    case "6":
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      creaTabellaGiocatore()
      break
  }
})

// CREAZIONE "SACCHETTO CON 90 NUMERI"

const numeriIniziali = function () {
  let i = 0
  while (i < 90) {
    i++
    numeriNonEstratti.push(i)
  }
}
numeriIniziali()

// ESTRAZIONE

const bottone = document.querySelector("button")
bottone.addEventListener("click", function () {
  if (numeriNonEstratti.length !== 0) {
    const index = Math.floor(Math.random() * numeriNonEstratti.length)
    const numeroEstratto = numeriNonEstratti.splice(index, 1)[0]

    numeriEstratti.push(numeroEstratto)

    // SCRIVO QUALE NUMERO è STATO ESTRATTO

    const section = document.getElementById("numero-estratto")
    section.innerHTML = ""
    const h2 = document.createElement("h2")
    h2.classList.add("p-numero-estratto")
    section.appendChild(h2)
    h2.innerText = `Numero estratto: ${numeroEstratto}`

    // AGGIUNGO LA CLASSE ESTRATTO A TABELLONE PRINCIPALE, PER I NUMERI ESTRATTI

    const celle = document.querySelectorAll(".casella")
    celle.forEach((cella) => {
      if (parseInt(cella.innerText) === numeroEstratto) {
        cella.classList.add("estratto")
      }
    })

    // AGGIUNGO LA CLASSE ESTRATTO A TABELLA GIOCATORE, PER I NUMERI ESTRATTI

    const celleGiocatore = document.querySelectorAll(".casella-giocatore")
    celleGiocatore.forEach((cella) => {
      if (parseInt(cella.innerText) === numeroEstratto) {
        cella.classList.add("estratto")
      }
    })

    //  QUANDO HO ESTRATTO TUTTI I 90 NUMERI, BOTTONE ESTRAZIONE DIVENTA RESET

    if (numeriNonEstratti.length === 0) {
      bottone.innerText = "reset"
    }
  } else {
    // RESETTO CASELLE TABELLONE

    const celle = document.querySelectorAll(".casella")
    celle.forEach((cella) => {
      cella.classList.remove("estratto")
    })

    // RESETTO CASELLE TABELLE GIOCATORE

    const celleGiocatore = document.querySelectorAll(".casella-giocatore")
    celleGiocatore.forEach((cella) => {
      cella.classList.remove("estratto")
    })

    // RESETTO SACCHETTO NUMERI E NUMERI ESTRATTI

    numeriNonEstratti.splice(0)
    numeriIniziali()
    numeriEstratti.splice(0)
    document.getElementById("numero-estratto").innerHTML = ""
    bottone.innerText = "estrai"
  }
})
