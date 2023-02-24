const checkbox = document.getElementById("checkbox");
chartExists = document.getElementById("myChart");

if (localStorage.getItem("darkMode") === null) {
  localStorage.setItem("darkMode", "false");
}

checkStatus();

function checkStatus() {
  if (localStorage.getItem("darkMode") === "true") {
    checkbox.checked = true;
    document.body.classList.toggle("dark");
  } else {
    checkbox.checked = false;
  }
}

function changeStatus() {
  if (localStorage.getItem("darkMode") === "true") {
    localStorage.setItem("darkMode", "false");
    location.reload();
    document.body.classList.toggle("dark");
  } else {
    localStorage.setItem("darkMode", "true");
    location.reload();
    document.body.classList.toggle("dark");
  }
}

// This is from the earn page

let cards = document.querySelectorAll(".card-pool");

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    cards.forEach((card) => {
      card.classList.remove("is-active");
    });

    cards[index].classList.add("is-active");
  });
});

let tabs = document.querySelectorAll(".tabs-toggle"),
  contents = document.querySelectorAll(".tabs-content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    contents.forEach((content) => {
      content.classList.remove("is-active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });

    contents[index].classList.add("is-active");
    tabs[index].classList.add("is-active");
  });
});

// This is from the stake page

let exchangeRateButtonStake = document.querySelector(".exchange-rate-stake");
let rateStake = document.querySelector(".rate-stake");
let exchangeRateButtonUnstake = document.querySelector(
  ".exchange-rate-unstake"
);
let rateUnstake = document.querySelector(".rate-unstake");

if (exchangeRateButtonStake != null && rateStake != null) {
  exchangeRateButtonStake.addEventListener("click", () => {
    if (rateStake.innerHTML === "1 KVS = 1 sKVS") {
      rateStake.innerHTML = "1 sKVS = 1 KVS";
    } else {
      rateStake.innerHTML = "1 KVS = 1 sKVS";
    }
  });
}

if (exchangeRateButtonUnstake != null && rateUnstake != null) {
  exchangeRateButtonUnstake.addEventListener("click", () => {
    if (rateUnstake.innerHTML === "1 KVS = 1 sKVS") {
      rateUnstake.innerHTML = "1 sKVS = 1 KVS";
    } else {
      rateUnstake.innerHTML = "1 KVS = 1 sKVS";
    }
  });
}

// Here is the line chart stuff
// setup

let step1 = "rgba(96, 101, 178, 1)";
let step2 = "rgba(96, 101, 178, 0.7)";
let step3 = "rgba(96, 101, 178, 0)";

if (localStorage.getItem("darkMode") === "true") {
  step1 = "rgba(355, 355,355, 1)";
  step2 = "rgba(355, 355,355, 0.7)";
  step3 = "rgba(355, 355,355, 0)";
}

//Chart.defaults.font.family = "Lato";

//let dataFeed = document.getElementById('rate-stake').innerHTML;
//console.log(dataFeed);

const data = {
  labels: ["Launch", "week 1", "week 2", "week 3", "week 4"],
  datasets: [
    {
      label: "",
      data: [1, 1.12], // <--- HERE SHOULD THE EXCHANGE RATE DATA GO, HARDCODED!!!
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea, scales } = chart;
        if (!chartArea) {
          return null;
        }
        return bgGradient(ctx, chartArea, scales);
      },
      borderColor: [step1],
      tension: 0.4,
      color: step1,
      borderWidth: 2,
      fill: true,
    },
  ],
};

// config
const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "'Arial', sans-serif",
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          color: step3,
        },
        ticks: {
          color: step1,
        },
      },
      y: {
        grid: {
          color: step3,
        },
        ticks: {
          color: step1,
        },
        beginAtZero: false,
      },
    },
  },
};

drawChart();

function drawChart() {
  let chart = document.getElementById("myChart");

  if (localStorage.getItem("darkMode") === "true") {
    step1 = "rgba(355, 355,355, 1)";
    step2 = "rgba(355, 355,355, 0.7)";
    step3 = "rgba(355, 355,355, 0)";
  } else {
    step1 = "rgba(96, 101, 178, 1)";
    step2 = "rgba(96, 101, 178, 0.7)";
    step3 = "rgba(96, 101, 178, 0)";
  }

  if (chart != null) {
    // render init block
    const myChart = new Chart(document.getElementById("myChart"), config);

    if (window.outerWidth > 666) {
      Chart.defaults.font.size = 14;
    }
  }
}

function responsiveFont() {
  if (window.outerWidth > 999) {
    Chart.defaults.font.size = 18;
  }
  if (window.outerWidth < 999 && window.outerWidth > 333) {
    Chart.defaults.font.size = 16;
  }
  if (window.outerWidth < 333) {
    Chart.defaults.font.size = 14;
  }
}

function bgGradient(ctx, chartArea, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
  gradientBackground.addColorStop(0, step1);
  gradientBackground.addColorStop(0.2, step2);
  gradientBackground.addColorStop(1, step3);
  return gradientBackground;
}

function shortenAddress(address) {
  var shortened = address.slice(0, 6) + "..." + address.slice(-4);
  return shortened;
}

async function connectWallet() {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  var userAccountAddress = accounts[0];
  if (
    document.getElementById("connectButton").innerHTML ==
    shortenAddress(userAccountAddress)
  ) {
  } else {
    document.getElementById("connectButton").innerHTML =
      shortenAddress(userAccountAddress); //"Connected"
  }
}

async function checkConnection() {
  await ethereum
    .request({
      method: "eth_accounts",
    })
    .then((account) => {
      if (account[0] != null) {
        setTimeout(connectWallet, 1000);
      }
    })
    .catch(console.error);
}

window.onload = checkConnection(); //run on page load

var url =
  "https://api.coingecko.com/api/v3/simple/price?ids=kava&vs_currencies=usd";
var kavaPrice;

$.getJSON(url, function (data) {
  // JSON result in `data` variable
  kavaPrice = data["kava"]["usd"];
  //alert(kavaPrice);
});
