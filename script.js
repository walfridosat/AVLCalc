
function parseMatrix(matrixStr) {
    return matrixStr.trim().split('\n').map(row => row.trim().split(' ').map(Number));
}

function subLine(line1, line2) {
    const length = Math.min(list1.length, list2.length);
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(list1[i] - list2[i]);
    }
    return result;
}

function kv(list, k) {
    return list.map(item => item * k);
}

function escalonar(matrix) {
    let lead = 0;
    let rows = matrix.length;   
    let columns = matrix[0].length;
    for (let r = 0; r < rows; r++) {
      if (columns <= lead) {
        return;
      }
      let i = r;
      while (matrix[i][lead] == 0) {
        i++;
        if (rows == i) {
          i = r;
          lead++;
          if (columns == lead) {
            return;
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

function calculate(operation) {
    const matrix1 = parseMatrix(document.getElementById('matrix1').value);
    const matrix2 = parseMatrix(document.getElementById('matrix2').value);

    let result;

    if (operation === 'add') {
        if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
            alert("As matrizes devem ter o mesmo tamanho para soma/subtração!");
            return;
        }
        result = matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
        console.log(result);
    } else if (operation === 'subtract') {
        if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
            alert("As matrizes devem ter o mesmo tamanho para soma/subtração!");
            return;
        }
        result = matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
    } else if (operation === 'multiply') {
        if (matrix1[0].length !== matrix2.length) {
            alert("Multiplicação inválida: o número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.");
            return;
        }
        result = [];
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix2[0].length; j++) {
                result[i][j] = 0;
                for (let k = 0; k < matrix1[0].length; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
    } else if (operation === 'determinant1') {
        if (matrix1.length !== matrix1[0].length) {
            alert("Somente matrizes quadradas têm determinante.");
            return;
        }
        const det = determinant(matrix1);
        result = `Determinante: ${det}`;
    } else if (operation === 'determinant2') {
        if (matrix2.length !== matrix2[0].length) {
            alert("Somente matrizes quadradas têm determinante.");
            return;
        }
        const det = determinant(matrix2);
        result = `Determinante: ${det}`;
    } else if (operation == 'sistem1'){
        result = escalonar(matrix1);
        console.log(result);
    } else if (operation == 'sistem2'){
        result = escalonar(matrix2);
        console.log(result);
    }

    document.getElementById('result').textContent = typeof result === 'string' ? result : matrixToString(result);
}
