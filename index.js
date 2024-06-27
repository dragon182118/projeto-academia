window.onload = function () {
    // Declarações globais
    let alavanca = 0;
    let ala = 2;
    const dDia = document.querySelector('#dia');
    const dMes = document.querySelector('#mes');
    const dAno = document.querySelector('#ano');
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    const tbody = document.getElementById("tCorpo");
    let exnome = ['Flexão', 'Prancha'];
    let thTabela0 = {};
    let colorTDS = [];
    // Registro dos dias
    const diasdoMes = () => {

        let data = new Date(year, month, 1);

        data.setMonth(data.getMonth() + 1);
        data.setDate(0);

        return data.getDate();
    }

    // Ligação com o click da checkbox
    if (alavanca == 0) {
        document.getElementById('table').addEventListener("click", () => {
            alavanca++
            if (alavanca <= 1) {
                criarTabela(1, 2);
                dDia.textContent = 1;
                document.getElementById('inicializador').remove();
            }
            alavanca = 2;
        });
    }

    // Cria o novo elemento na tabela
    const criarTabela = (contador, tdTabelaX) => {
        
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
            labelTd.setAttribute("for", `cbox${i + 1}`)
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

            //criação dos th e tds

            for (let k = 0; k < tdTabelaX; k++) {
                if (thTabela0[k]) {
                } else {
                    thTabela0[k] = document.createElement("th");
                    thTabela0[k].textContent = exnome[k];
                    thTabela.appendChild(thTabela0[k]);
                }
            }

            for (let z = 0; z < tdTabelaX; z++) {
                let tdTabela0 = {};
                tdTabela0[z] = document.createElement("td");
                tdTabela0[z].textContent = exnome[z];
                tdTabela0[z].className = "checkColor";
                if (colorTDS[i]) {
                    tdTabela0[z].classList.add('click');
                    //errado verificar a lógica
                }
                trTabela.appendChild(tdTabela0[z]);
            }
            
            tbody.appendChild(trTabela);
        
        }
        dDia.textContent++;

        if (!(contador == diasdoMes())) {
            trConstructor(contador);
        } else {
            // Mudanças dos dias 
            dMes.textContent++;
            dDia.textContent = 1;
            if (dMes.textContent == 12) {
                dAno.textContent++; dMes.textContent = ''
            };
        }
        checks(contador);
        mudançaDeCor();
    }
    const callbacks = {};
    //construção de novas linhas
    function trConstructor(cc) {
        const input = document.getElementById(`cbox${cc}`);
        const callback = () => {
            criarTabela(cc + 1, ala);
        };

        callbacks[cc] = callback;
        input.addEventListener('click', callback);

        for (let y = 1; y < cc; y++) {
            let input2 = document.getElementById(`cbox${y}`);
            if (input2 && callbacks[y]) {
                input2.removeEventListener('click', callbacks[y]);
            }
        }
    }
    // botão de adição de exercício
    document.getElementById('exNew').addEventListener('click', () => {
        let nNome = prompt('Digite o nome do novo exercício');
        if (exnome[ala]) {
        } else {
            exnome[ala] = nNome;
        }
        ala++;
        ajusteColspan(ala);
    });

    //ajuste no espaço do tfoot
    function ajusteColspan(blo) {
        let thexs = document.getElementById('thExercicios');
        thexs.setAttribute('colspan', blo);

        const tdFoot = document.querySelectorAll(".ajusteCol");
        if (blo > 2) {
            var numeroColspan = Math.ceil(blo / 3);
            tdFoot.forEach((e) => {
                e.setAttribute('colspan', numeroColspan);
            })
        }
    }

    //mudança na cor do td
    const mudançaDeCor = () => {
        document.querySelectorAll(".checkColor").forEach((e, i) => {
            e.addEventListener('click', () => {
                e.classList.toggle('click');
                if (e.classList.contains('click')){
                    colorTDS[i] = e;
                }
            })
        })
    }
    // check ativo / reset da tabela
    const checks = (cc) => {
        //cheks
        for (let x = 1; x < cc; x++) {
            let input2 = document.getElementById(`cbox${x}`);
            if (input2 && callbacks[x]) {
                input2.checked = true;
            }
        }
        /*reset*/
        if (cc == diasdoMes()) {
            if (callbacks[cc - 1]) {
                let input3 = document.getElementById(`cbox${cc}`);
                input3.addEventListener('click', () => {
                    if (tbody.children.length > 0) {
                        let firstTR = tbody.children[0].innerHTML;
                        tbody.innerHTML = firstTR;
                    }
                    alavanca = 0;
                    dDia.textContent = 1;
                    //reatribuição de eventlistener
                    for (let i = 1; i <= diasdoMes(); i++) {
                        let input2 = document.getElementById(`cbox${i}`);
                        if (input2 && callbacks[i]) {
                            input2.addEventListener('click', callbacks[i]);
                        }
                    }
                });
            }
        }
    }

}

