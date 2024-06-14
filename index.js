window.onload = function () {
    // Ligação com o click da checkbox
    let alavanca = 0;
    document.getElementById("cbox").addEventListener("click", (e) => {
        alavanca++
        if (alavanca <= 1) {
            criarTabela(1);
        }
        alavanca = 2;
    });
    // Cria o novo elemento na tabela
    function criarTabela(contador) {
        for (let i = 0; i < contador; i++) {
            const tbody = document.getElementById("tCorpo");

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
          
    }
    // Verifica a quantidade de linhas na tabela
    document.querySelectorAll(".number").forEach(el => {
        let aryValue = []
        aryValue.push(el.textContent);
        console.log(aryValue)
        let contador2 = 1;
        aryValue.forEach(el => {
            if (el > contador2) {
                contador2 = el;
            }
        });
        let trCriador = document.getElementById(contador2);
        trCriador.addEventListener('click', () => {
            criarTabela(contador2);
        });
    });
}

