window.onload = function () {
    iniciarAplicacao();
};

function iniciarAplicacao() {
    console.log('Aplicação iniciada');
    let alavanca = 0;
    let ala = 2;
    const dDia = document.querySelector('#dia');
    const dMes = document.querySelector('#mes');
    const dAno = document.querySelector('#ano');
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    const tbody = document.getElementById("tCorpo");
    let exnome = ['Flexão', 'Prancha'];
    let thTabela0 = [];
    let colorTDS = {};
    let contadorX = -Infinity;
    let boolean = false;
    const ini = document.getElementById('inicializador');

    // Função para carregar estado do servidor
    async function carregarEstado() {
        try {
            const response = await fetch('/load');
            const data = await response.json();
            if (data.error) {
                console.log('No data found');
            } else {
                exnome = data.exnome;
                colorTDS = data.colorTDS;
                alavanca = data.alavanca;
                contadorX = data.contadorX;
                boolean = data.boolean;
                ala = data.ala;
                dMes.textContent = data.dMes;
                dAno.textContent = data.dAno;
                criarTabela(contadorX, ala, boolean);
            }
        } catch (error) {
            console.error('Erro ao carregar estado:', error);
        }
        if (alavanca == 2) {
            ini.remove();
        }
        ajusteColspan(ala);
    }

    // Chama a função para carregar estado ao iniciar a aplicação
    carregarEstado();

    const diasdoMes = () => {
        let data = new Date(year, month, 1);
        data.setMonth(data.getMonth() + 1);
        data.setDate(0);
        return data.getDate();
    };

    if (alavanca == 0) {
        document.getElementById('table').addEventListener("click", () => {

            ini.remove();
            alavanca++;
            if (alavanca <= 1) {
                criarTabela(1, 2, boolean);
                dDia.textContent = 1;
            }
            alavanca = 2;
            salvarEstado();
        });
    }

    const criarTabela = (contador, tdTabelaX, boolean) => {
        for (let i = 0; i < contador; i++) {
            const exEl = document.getElementById(i + 1);
            const thTabela = document.getElementById('thExercicio');

            if (exEl) {
                exEl.parentElement.parentElement.remove();
            }

            const trTabela = document.createElement("tr");
            let tdTabela1 = document.createElement("td");
            let tdTabela2 = document.createElement("td");
            let labelTd = document.createElement("label");
            let inputTd = document.createElement("input");

            tdTabela1.className = "cent";
            labelTd.className = "number";
            labelTd.setAttribute("for", `cbox${i + 1}`);
            labelTd.textContent = i + 1;
            labelTd.id = i + 1;

            tdTabela2.className = "cent";
            inputTd.type = "checkbox";
            inputTd.name = `cbox${i + 1}`;
            inputTd.id = `cbox${i + 1}`;

            tdTabela1.appendChild(labelTd);
            tdTabela2.appendChild(inputTd);
            trTabela.appendChild(tdTabela1);
            trTabela.appendChild(tdTabela2);

            for (let k = 0; k < tdTabelaX; k++) {
                if (!thTabela0[k]) {
                    thTabela0[k] = document.createElement("th");
                    thTabela0[k].id = `th${k}`;
                    thTabela0[k].textContent = exnome[k];
                    thTabela.appendChild(thTabela0[k]);
                }
            }

            for (let z = 0; z < tdTabelaX; z++) {
                let tdTabela0 = document.createElement("td");
                tdTabela0.textContent = exnome[z];
                tdTabela0.className = "checkColor";
                tdTabela0.id = `${exnome[z]}${i + 1}`;
                trTabela.appendChild(tdTabela0);

                if (colorTDS[tdTabela0.id]) {
                    tdTabela0.classList.add('click');
                }
            }

            tbody.appendChild(trTabela);
        }

        if (boolean == false) {
            dDia.textContent = contador;
        } else {
            boolean = false;
        }

        if (!(contador == diasdoMes())) {
            trConstructor(contador);
        }
        checks(contador);
        mudançaDeCor();
        contadorX = contador;
        salvarEstado();
    };

    const callbacks = {};

    function trConstructor(cc) {
        const input = document.getElementById(`cbox${cc}`);
        const callback = () => {
            boolean = false;
            criarTabela(cc + 1, ala, boolean);
            salvarEstado();
        };

        callbacks[cc] = callback;
        input.addEventListener('click', callback);
        for (let q = 0; q < ala; q++) {
            const tdTab = document.getElementById(exnome[q] + cc);
            if (colorTDS[tdTab.id]) {
                tdTab.classList.add('click');
            }
        }

        for (let y = 1; y < cc; y++) {
            let input2 = document.getElementById(`cbox${y}`);
            if (input2 && callbacks[y]) {
                input2.removeEventListener('click', callbacks[y]);
            }
        }
    }

    document.getElementById('exNew').addEventListener('click', () => {
        if (alavanca == 2) {
            let nNome = prompt('Digite o nome do novo exercício');
            try {
                if (isNaN(nNome) && nNome !== undefined && nNome !== null && nNome.length >= 3) {
                    if (!exnome[ala]) {
                        exnome[ala] = nNome;
                    }
                    ala++;
                    ajusteColspan(ala);
                    boolean = true;
                    criarTabela(contadorX, ala, boolean);
                    salvarEstado();
                } else {
                    throw new Error('Apenas palavras com mais de 3 letras');
                }
            } catch (error) {
                alert('Erro : ' + error.message);
            }
        }
    });

    function ajusteColspan(blo) {
        let thexs = document.getElementById('thExercicios');
        thexs.setAttribute('colspan', blo);
        const tdFoot = document.querySelectorAll(".ajusteCol");
        if (blo > 2) {
            var numeroColspan = Math.ceil(blo / 3);
            tdFoot.forEach((e) => {
                e.setAttribute('colspan', numeroColspan);
            });
        }
    }

    const mudançaDeCor = () => {
        document.querySelectorAll(".checkColor").forEach((e) => {
            e.addEventListener('click', () => {
                e.classList.toggle('click');
                if (e.classList.contains('click')) {
                    colorTDS[e.id] = true;
                } else {
                    delete colorTDS[e.id];
                }
                salvarEstado();
            });
        });
    };

    document.getElementById('exRm').addEventListener('click', () => {
        if (alavanca == 2) {
            if (ala > 2) {
                exnome.splice(ala - 1);
                let thremove = document.getElementById(`th${ala - 1}`);
                if (thremove) {
                    thTabela0.splice([ala - 1]);
                    thremove.remove();
                }
                ala--;
                boolean = true;
                criarTabela(contadorX, ala, boolean);
                ajusteColspan(ala);
                salvarEstado();
            } else {
                alert('Primeiro, crie um novo exercício.');
            }
        }
    });

    const checks = (cc) => {
        for (let x = 1; x < cc; x++) {
            let input2 = document.getElementById(`cbox${x}`); 
            if (input2) {
                input2.checked = true;
            }
        }

        if (cc == diasdoMes()) {
            if (callbacks[cc - 1]) {
                let input3 = document.getElementById(`cbox${cc}`);
                input3.addEventListener('click', () => {
                    if (tbody.children.length > 0) {
                        let firstTR = tbody.children[0].innerHTML;
                        tbody.innerHTML = firstTR;
                    }
                    alavanca = 0;
                    for (let i = 1; i <= diasdoMes(); i++) {
                        delete colorTDS[`Flexão${i}`];
                        delete colorTDS[`Prancha${i}`];
                    }
                    for (let l = 2; l < ala; l++) {
                        for (let j = 1; j <= diasdoMes(); j++) {
                            delete colorTDS[`${exnome[l]}${j}`];
                        }
                    }
                    criarTabela(1, ala, boolean);
                    dDia.textContent = 1;
                    dMes.textContent++;
                    if (dMes.textContent == 12) {
                        dAno.textContent++;
                        dMes.textContent = 1;
                    }
                    salvarEstado();
                });
            }
        }
    };

    // Função para salvar estado no servidor
    async function salvarEstado() {
        try {
            const response = await fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exnome,
                    colorTDS,
                    alavanca,
                    contadorX,
                    boolean,
                    ala,
                    dMes: dMes.textContent,
                    dAno: dAno.textContent
                })
            });
            const data = await response.json();
            console.log('Estado salvo com ID:', data.id);
        } catch (error) {
            console.error('Erro ao salvar estado:', error);
        }
    }
}
