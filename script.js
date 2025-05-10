
function generateMatrix() {
    const commission = parseFloat(document.getElementById("commission").value);
    const extraCost = parseInt(document.getElementById("additionalCosts").value);
    const gameCost = parseInt(document.getElementById("gameCosts").value);
    const workCost = document.getElementById("workCost").checked ? 40 : 0;
    const matrixDiv = document.getElementById("matrix");
    const buyPrices = [];
    const sellPrices = [];

    for (let i = 300; i <= 1000; i += 50) buyPrices.push(i);
    for (let i = 1100; i <= 1600; i += 100) buyPrices.push(i);

    for (let i = 600; i <= 1500; i += 50) sellPrices.push(i);
    for (let i = 1600; i <= 2600; i += 100) sellPrices.push(i);

    let table = "<table><thead><tr><th class='sticky-col'>Kupno →<br>Sprzedaż ↓</th>";
    for (let buy of buyPrices) table += "<th>" + buy + "</th>";
    table += "</tr></thead><tbody>";

    for (let sell of sellPrices) {
        table += "<tr><th class='sticky-col'>" + sell + "</th>";
        for (let buy of buyPrices) {
            let commissionFee = sell * (commission / 100);
            let pcc = buy > 1000 ? buy * 0.02 : 0;
            let profit = sell - buy - commissionFee - extraCost - gameCost - workCost - pcc;
            let cls = profit > 149 ? 'green' : profit > 0 ? 'yellow' : 'red';
            table += "<td class='" + cls + "'>" + Math.round(profit) + "</td>";
        }
        table += "</tr>";
    }

    table += "</tbody></table>";
    matrixDiv.innerHTML = table;
}

document.getElementById("commission").addEventListener("input", function () {
    document.getElementById("commissionValue").innerText = this.value + "%";
    generateMatrix();
});
document.getElementById("additionalCosts").addEventListener("change", generateMatrix);
document.getElementById("gameCosts").addEventListener("change", generateMatrix);
document.getElementById("workCost").addEventListener("change", generateMatrix);

window.onload = generateMatrix;
