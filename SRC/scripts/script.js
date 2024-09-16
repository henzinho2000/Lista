const ola = document.getElementById("submit");
let container = document.querySelector(".tarefas");
let concluidas = document.querySelector(".concluidas");
let contador = 0;
let total = 0;
let conclusao = document.querySelector(".conclusao");
let lixeira = document.querySelector(".lixe");
let coisas = document.querySelector(".coisas");
var apagarTodas = false;
let tru = document.querySelector(".trueOrFalse");

conclusao.innerText = `${contador} / ${total}`;

ola.addEventListener("click", function (e) {
	e.preventDefault();
	let nome = document.getElementById("nome");
	let valor = document.querySelector("#unidades");
	let number = document.querySelector("#number");
	let title = document.querySelector("h1");
	let background = document.querySelector("main");

	container.display = "flex";
	concluidas.display = "flex";

	ola.style.animation = "0.5s pulo";

	if (nome.value === "") {
		title.innerText = "Why List? :(";
		nome.placeholder = "Você esqueceu da sua anotação";
		background.style.background = "rgb(255, 7, 40)";
		somaSub();
	} else {
		title.innerText = "Your List ;)";
		let oi = new objetos(nome.value, valor.value, number.value);
		createTag(oi);
		nome.placeholder = "digite a sua anotação";
		background.style.background = "rgb(79, 46, 226)";
		total += 1;
		conclusao.innerText = ` - ${contador} / ${total}`;
		somaSub();
	}
});

class objetos {
	constructor(nome, unidade = "unidade", quantidade = 1) {
		this._nome = nome;
		this._unidade = unidade;
		this._quantidade = quantidade;
	}
	get nome() {
		return this._nome;
	}
	get unidade() {
		return this._unidade;
	}
	get quantidade() {
		return this._quantidade;
	}
}

function createTag(element) {
	let completo = false;

	let div = document.createElement("div");
	let p = document.createElement("p");
	let button = document.createElement("button");

	button.innerText = "X";

	div.className = "section";
	button.id = "exit";

	div.appendChild(p);
	div.appendChild(button);

	p.innerText = `${element.nome} - ${element.quantidade} ${element.unidade}`;

	container.appendChild(div);

	button.addEventListener("click", function () {
		container.removeChild(div);
		total -= 1;
		somaSub();
		conclusao.innerText = ` - ${contador} / ${total}`;
	});

	p.addEventListener("click", function () {
		if (completo === false) {
			completo = true;
			concluidas.appendChild(div);
			contador += 1;
			somaSub();
			conclusao.innerText = ` - ${contador} / ${total}`;
			button.addEventListener("click", function () {
				concluidas.removeChild(div);
				contador -= 1;
				total -= 1;
				somaSub();
				conclusao.innerText = ` - ${contador} / ${total}`;
			});
		} else if (completo === true) {
			contador -= 1;
			completo = false;
			somaSub();
			container.appendChild(div);
			conclusao.innerText = ` - ${contador} / ${total}`;
		}
	});
}

function apagar(){
	
		const elementos = document.querySelectorAll(".section");

		elementos.forEach((elemento) => elemento.remove());

		contador = 0;
		total = 0;

		tru.style.display = "none";

		somaSub();
}
function naoApagar(){
	apagarTodas = false;
	tru.style.display = "none";
}

somaSub();

lixeira.addEventListener("click", function () {
	if (total > 0) {
		tru.style.display = "block";
	}
});

function somaSub() {
	if (contador === 0 && total === 0) {
		conclusao.hidden = true;
		conclusao.style.color = "white";
		coisas.style.display = "none";
	} else if (contador === total) {
		conclusao.style.color = "rgb(19, 224, 105)";
		coisas.style.display = "flex";
	} else {
		conclusao.hidden = false;
		conclusao.style.color = "white";
		coisas.style.display = "flex";
	}
}
