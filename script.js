
function parseMatrix(matrixStr) {
    return matrixStr.trim().split('\n').map(row => row.trim().split(' ').map(Number));
}

function filtro(matrix){
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[0].length; j++){
            matrix[i][j] = Math.round(matrix[i][j] * 1000) / 1000;
        }
    }
    return matrix;
}
// Subtrair duas linhas, result = L1-L2
function subLine(line1, line2) {
    const length = Math.min(list1.length, list2.length);
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(list1[i] - list2[i]);
    }
    return result;
}

function nonZero(vec){
    for(let i = 0; i < vec.length; i++){
        if(vec[i]!==0){
            return true;
        }
    }
    return false;
}
// Multiplicar uma linha por K
function kv(list, k) {
    return list.map(item => item * k);
}

// Parametrização
function parametrizar(matriz) {
    matriz = escalonar(matriz);
    matriz = filtro(matriz);
    let linhas = matriz.length;
    let colunas = matriz[0].length;
    let variaveisLivres = [];
    let solucao = Array(colunas - 1).fill(null);
    let base = 0;

    for (let j = 0; j < colunas - 1; j++) {
        let encontrouPivo = false;
        for (let i = base; i < linhas; i++) {
            if (matriz[i][j] !== 0) {
                encontrouPivo = true;
                base++;
                break;
            }
        }
        if (!encontrouPivo) {
            variaveisLivres.push(j);
        }
    }

    let vetores = Array(colunas-1).fill(null);
    let constantes = Array(colunas-1).fill(0);
    for(let i = 0; i < colunas; i++){
        vetores[i] = Array(colunas-1).fill(0);
    }

    let resultado = "Solução paramétrica: \n";
    for (let i = 0; i < linhas; i++) {
        let pivo = -1;
        for (let j = 0; j < colunas - 1; j++) {
            if (matriz[i][j] !== 0) {
                pivo = j;
                break;
            }
        }
        if (pivo !== -1) {
            let expressao = '';
            constantes[i]=matriz[i][colunas - 1];
            if (matriz[i][colunas - 1] !== 0) {
                expressao += `${matriz[i][colunas - 1]}`;
            }
            for (let j = pivo + 1; j < colunas - 1; j++) {
                if (matriz[i][j] !== 0) {
                    if (expressao.length > 0) {
                        if(matriz[i][j] < 0) {
                            expressao += ` + ${Math.abs(matriz[i][j])} * x${j + 1}`
                        } else {
                            expressao += ` - ${matriz[i][j]} * x${j + 1}`;
                        }
                        vetores[j][pivo] = -1*matriz[i][j];
                    } else {
                        if(matriz[i][j] < 0) {
                            expressao += `${Math.abs(matriz[i][j])} * x${j + 1}`
                        } else {
                            expressao += ` -${matriz[i][j]} * x${j + 1}`;
                        }
                        vetores[j][pivo] = -1*matriz[i][j];
                    }
                }
            }
            solucao[pivo] = expressao || '0';
        }
    }
    debugger;

    for(let i = 0; i < colunas; i++){
        if(vetores[i].reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) !== 0){
            vetores[i][i] = 1;
        } 
    }

    variaveisLivres.forEach((j, idx) => {
        solucao[j] = `t${idx + 1}`;
    });

    for (let i = 0; i < solucao.length; i++) {
        if (solucao[i] !== null) {
            resultado += `x${i + 1} = ${solucao[i]}\n`;
        }
    }
    console.log(vetores);
    console.log(constantes);
    resultado += "\n Combinação linear: \n";
    resultado += '(';
    for(let i = 0; i < colunas-2; i++){
        resultado+=`x${i+1},`;
    }
    resultado += `x${colunas-1}) = `;

    let vectorCount = 0;
    if(nonZero(constantes)){
        resultado += "("+constantes.join(",")+")";
        vectorCount+=1;
    }

    if(vetores.length>0){
        let count = 1;
        for(let i = 0; i < vetores.length-1; i++){
            if(nonZero(vetores[i])){
                if(vectorCount>0){
                    resultado += ` + t${count}(`+vetores[i].join(",")+")";
                    vectorCount += 1;
                } else{
                    resultado += `t${count}(`+vetores[i].join(",")+")";
                    vectorCount += 1;
                }
                count+=1;
            }
        }
        if(nonZero(vetores[vetores.length-1])){
            resultado += ` + t${vetores.length-1}(`+vetores[vetores.length-1].join(",")+")";
        }
    }

    return resultado;
}

const transpose = matrix => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

// Gauss
function escalonar(matrix) {
    let rows = matrix.length;
    let columns = matrix[0].length;
    let lead = 0;
    for (let r = 0; r < rows; r++) {
      if (columns <= lead) {
        return matrix;
      }
      let i = r;
      while (matrix[i][lead] == 0) {
        i++;
        if (rows == i) {
          i = r;
          lead++;
          if (columns == lead) {
            return matrix;
          }
        }
      }
      let tmp = matrix[i];
      matrix[i] = matrix[r];
      matrix[r] = tmp;
      let val = matrix[r][lead];
      for (let j = 0; j < columns; j++) {
        matrix[r][j] /= val;
      }
      for (let i = 0; i < rows; i++) {
        if (i == r) continue;
        val = matrix[i][lead];
        for (let j = 0; j < columns; j++) {
          matrix[i][j] -= val * matrix[r][j];
        }
      }
      lead++;
    }
    return matrix;
  }


// Botaozin de trocar
function changeMatrix() {
    var textarea1 = document.getElementById('matrix1');
    var textarea2 = document.getElementById('matrix2');
    
    var temp = textarea1.value;
    
    textarea1.value = textarea2.value;
    textarea2.value = temp;
}

function matrixToString(matrix) {
    return matrix.map(row => row.join(' ')).join('\n');
}

function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    let det = 0;
    for (let i = 0; i < n; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, index) => index !== i));
        det += matrix[0][i] * determinant(subMatrix) * (i % 2 === 0 ? 1 : -1);
    }
    return det;
}

function areSameSize(matrix1, matrix2) {
    return matrix1.length === matrix2.length && matrix1[0].length === matrix2[0].length;
}

function canMultiply(matrix1, matrix2) {
    return matrix1[0].length === matrix2.length;
}

function isSquare(matrix) {
    return matrix.length === matrix[0].length;
}

function performAdditionOrSubtraction(matrix1, matrix2, operation) {
    const isAddition = operation === 'add';
    return matrix1.map((row, i) =>
        row.map((val, j) => isAddition ? val + matrix2[i][j] : val - matrix2[i][j])
    );
}

function multiplyMatrices(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

function calculate(operation) {
    const matrix1 = parseMatrix(document.getElementById('matrix1').value);
    const matrix2 = parseMatrix(document.getElementById('matrix2').value);

    let result;

    switch (operation) {
        case 'add':
        case 'subtract':
            if (!areSameSize(matrix1, matrix2)) {
                alert("As matrizes devem ter o mesmo tamanho para soma/subtração!");
                return;
            }
            result = performAdditionOrSubtraction(matrix1, matrix2, operation);
            break;

        case 'multiply':
            if (!canMultiply(matrix1, matrix2)) {
                alert("Multiplicação inválida: o número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.");
                return;
            }
            result = multiplyMatrices(matrix1, matrix2);
            break;

        case 'determinant1':
            if (!isSquare(matrix1)) {
                alert("Somente matrizes quadradas têm determinante.");
                return;
            }
            result = `Determinante: ${determinant(matrix1)}`;
            break;

        case 'determinant2':
            if (!isSquare(matrix2)) {
                alert("Somente matrizes quadradas têm determinante.");
                return;
            }
            result = `Determinante: ${determinant(matrix2)}`;
            break;

        case 'sistem1':
            result = escalonar(matrix1);
            break;

        case 'sistem2':
            result = escalonar(matrix2);
            break;

        case 'parametrizar1':
            result = parametrizar(matrix1);
            break;

        case 'parametrizar2':
            result = parametrizar(matrix2);
            break;

        default:
            alert("Operação inválida!");
            return;
    }

    document.getElementById('result').textContent = typeof result === 'string' ? result : matrixToString(result);
}



