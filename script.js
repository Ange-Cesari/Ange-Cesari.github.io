const priceBase = 0;

const optionsUniques = [
  {
    name: "monitoring",
    price: 2
  },
  {
    name: "database-backups",
    price: 2
  },
  {
    name: "access-control",
    price: 2
  },
  {
    name: "white-labeling",
    price: 2
  },
  {
    name: "priority-support",
    price: 2
  }
];

const optionsIncrementales = [
  {
    name: "projects",
    price: 2,
    valueMin: 1,
    valueMax: 1000
  },
  {
    name: "deployments",
    price: 2,
    valueMin: 20,
    valueMax: 1000,
    valueIncrement: 5
  },
  {
    name: "licenses",
    price: 2,
    valueMin: 0,
    valueMax: 1000
  },
  {
    name: "users",
    price: 2,
    valueMin: 1,
    valueMax: 1000
  }
];

function calculateprice() {
  let priceTotal = priceBase;

  optionsUniques.forEach((option) => {
    const checkbox = document.querySelector(`input[name="${option.name}"]`);
    if (checkbox.checked) {
      priceTotal += option.price;
    }
  });

  optionsIncrementales.forEach((option) => {
    const input = document.querySelector(`input[name="${option.name}"]`);
    let value = parseInt(input.value);
    if (value < option.valueMin) {
      value = option.valueMin;
      input.value = value;
    } else if (value > option.valueMax) {
      value = option.valueMax;
      input.value = value;
    }
    if (
      option.valueIncrement &&
      value % option.valueIncrement !== 0
    ) {
      value =
        Math.round(value / option.valueIncrement) *
        option.valueIncrement;
      input.value = value;
    }
    if (option.name === 'deployments') {
      const namebreIncr = Math.floor((value - option.valueMin) / option.valueIncrement);
      priceTotal += namebreIncr * option.price;
    } else if (value > 0 && value > option.valueMin) {
      priceTotal += option.price * (value - option.valueMin);
    }
  });

  const pricemonthly = document.querySelector("#price-monthly");
  pricemonthly.textContent = `$${priceTotal}`;
}

const formulaire = document.querySelector("form");
formulaire.addEventListener("change", calculateprice);