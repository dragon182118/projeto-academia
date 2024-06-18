window.onload = function () {
    // Declarações globais
    let alavanca = 0;
    const dDia = document.querySelector('#dia');
    const dMes = document.querySelector('#mes');
    const dAno = document.querySelector('#ano');
    let year = new Date().getFullYear();
    let month = new Date().getMonth();

    // Registro dos dias
    const diasdoMes = () => {

        let data = new Date(year, month, 1);

        data.setMonth(data.getMonth() + 1);
        data.setDate(0);

        return data.getDate();
    }

    // Ligação com o click da checkbox
    document.getElementById("cbox").addEventListener("click", (e) => {
        alavanca++
        if (alavanca <= 1) {
            criarTabela(1);
        }
        alavanca = 2;
        dDia.textContent = 2;
    });


    // Cria o novo elemento na tabela
    const criarTabela = (contador) => {
        for (let i = 0; i < contador; i++) {

            const tbody = document.getElementById("tCorpo");

            const exEl = document.getElementById(i + 2)

            if (exEl) {
                exEl.parentElement.parentElement.remove();
            }

            const trTabela = document.createElement("tr");

            let tdTabela1 = document.createElement("td");
            let tdTabela2 = document.createElement("td");
            let tdTabela3 = document.createElement("td");
            let tdTabela4 = document.createElement("td");

            let labelTd = document.createElement("label");

            let inputTd = document.createElement("input");

            tdTabela1.className = "cent";
            labelTd.className = "number";
            labelTd.setAttribute("for", `cbox${i + 2}`)
            labelTd.textContent = i + 2;
            labelTd.id = i + 2;

            tdTabela2.className = "cent";
            inputTd.type = "checkbox";
            inputTd.name = `cbox${i + 2}`;
            inputTd.id = `cbox${i + 2}`;

            tdTabela3.textContent = "Flexão";

            tdTabela4.textContent = "Prancha";

            tdTabela1.appendChild(labelTd);

            tdTabela2.appendChild(inputTd);

            trTabela.appendChild(tdTabela1);
            trTabela.appendChild(tdTabela2);
            trTabela.appendChild(tdTabela3);
            trTabela.appendChild(tdTabela4);

            tbody.appendChild(trTabela);

        }
        dDia.textContent++;

        let contador2 = contador + 1;

        if (dDia.textContent == diasdoMes()) {
            trConstructor(contador2);
        } else {

            // Mudanças dos dias 
            if (dDia.textContent == diasdoMes()) {
                dMes.textContent++; dDia.textContent = 1
            };
            if (dMes.textContent == 12) {
                dAno.textContent++; dMes.textContent = ''
            };
        }
    }
    const callbacks = {};

    function trConstructor(cc) {
            const input = document.getElementById(`cbox${cc}`);
            const callback = () => {
                criarTabela(cc);
            };

            callbacks[cc] = callback;
            input.addEventListener('click', callback);

            for (let y = 2; y < cc; y++) {
                let input2 = document.getElementById(`cbox${y}`);
                if (input2 && callbacks[y]) {
                    input2.removeEventListener('click', callbacks[y]);
                    input2.checked = true;
                }
            }
    }
}

