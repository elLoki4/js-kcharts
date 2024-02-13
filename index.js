import './style.css';

let body = document.getElementById('body');
const dataStorage = [];
let myChart;

function getData() {
  const textNumber = document.createElement('p');
  textNumber.textContent = 'Ingresa los datos';
  body.appendChild(textNumber);

  const number = document.createElement('input');

  body.appendChild(number);

  const textCategory = document.createElement('p');
  textCategory.textContent = 'Ingresa la categoría';
  body.appendChild(textCategory);

  const category = document.createElement('input');
  category.type = 'text';
  body.appendChild(category);

  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.className = 'button btn btn-primary';
  button.onclick = function () {
    const newNumber = parseInt(number.value, 10);

    if (isNaN(newNumber)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }

    const newData = {
      categoria: category.value,
      numeros: newNumber,
    };

    const index = dataStorage.findIndex(
      (item) => item.categoria === newData.categoria
    );

    if (index !== -1) {
      dataStorage[index].numeros += newData.numeros;
    } else {
      dataStorage.push(newData);
    }

    exploitCharts(dataStorage);
    allReport(dataStorage);
  };
  body.appendChild(button);
}

function exploitCharts(data) {
  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById('myChart');

  myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: data.map((entry) => entry.categoria),
      datasets: [
        {
          label: data.map((entry) => entry.categoria),
          data: data.map((entry) => entry.numeros),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function allReport(data) {
  const body = document.getElementById('all');
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  const suma = data.reduce(
    (total, entry) => total + parseFloat(entry.numeros || 0),
    0
  );

  const all = document.createElement('p');
  all.textContent = `El total de reportes es: ${suma}`;
  body.appendChild(all);
}

getData();
