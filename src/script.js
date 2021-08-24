function clear() {
  window.localStorage.clear();
  console.log(localStorage);
}

function saveInputValues() {
  localStorage.setItem(
    "requestTitle",
    document.getElementById("request-title").value
  );
  localStorage.setItem(
    "paymentMethod",
    document.getElementById("payment-method").value
  );
  localStorage.setItem(
    "supplierName",
    document.getElementById("supplier-name").value
  );
  localStorage.setItem(
    "supplierCountry",
    document.getElementById("supplier-country").value
  );
  localStorage.setItem("currency", document.getElementById("currency").value);
  localStorage.setItem("totalNet", document.getElementById("total-net").value);
  localStorage.setItem(
    "totalFreight",
    document.getElementById("total-freight").value
  );
  localStorage.setItem("totalVat", document.getElementById("total-vat").value);
  localStorage.setItem("oboSID", document.getElementById("obo-sid").value);
  localStorage.setItem("oboEmail", document.getElementById("obo-email").value);
  localStorage.setItem("jpmcLE", document.getElementById("jpmc-le").value);
  localStorage.setItem(
    "shiptoCountry",
    document.getElementById("shipto-country").value
  );
  localStorage.setItem(
    "shiptoStreet",
    document.getElementById("shipto-street").value
  );
  localStorage.setItem(
    "shiptoCity",
    document.getElementById("shipto-city").value
  );
  localStorage.setItem(
    "shiptoZipcode",
    document.getElementById("shipto-zipcode").value
  );
  localStorage.setItem(
    "shiptoState",
    document.getElementById("shipto-state").value
  );
  localStorage.setItem(
    "shiptoCountry",
    document.getElementById("shipto-country").value
  );
  localStorage.setItem("comments", document.getElementById("comments").value);

  console.log(localStorage);
  alert(
    "Your input values have been saved. You can restore them or clean up later."
  );
}
function sendEmail() {
  let supplier = `ABC company`;
  let country = `UK`;
  window.open(
    `mailto:utoanna@gmail.com?method=POST?enctype=text/plain?subject=subject&body=
    supplier=${supplier} %0D%0A 
    country=${country} `
  );
}

/*
function sendEmail() {
  var mailBody = document.getElementById("mail-body").innerHTML;
  window.location = "mailto:utoanna@gmail.com?subject=hii&body=" + mailBody;
}
*/

const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  sendEmail();
});

const buttonSave = document.getElementById("save");
buttonSave.addEventListener("click", (event) => {
  event.preventDefault();
  saveInputValues();
});

function makePreferencesSelected(optionsList, preference) {
  var option = optionsList.options;
  for (var i = 0; i < optionsList.options.length; i++) {
    if (option[i].value == preference) {
      option[i].selected = true;
    }
  }
}

let themePreferred = document.getElementById("theme-preferred");
//themePreferred.onchange = alert(themePreferred);
/*
themePreferred.addEventListener("change", (event) => {
  alert(`You like ${event.target.value}`);
});
*/
function updateGrandTotal() {
  for (var i = 1; i < totalPaymentComponents.length; i++) {
    if (totalPaymentComponents[i].value !== "") {
    } else {
      totalPaymentComponents[i].value = 0;
    }
  }
  let totalNet = document.getElementById("total-net").value;
  let totalFreight = document.getElementById("total-freight").value;
  let totalVat = document.getElementById("total-vat").value;
  let totalPayment = document.getElementById("total-payment");

  totalPayment.value = `${
    parseInt(totalNet) + parseInt(totalFreight) + parseInt(totalVat)
  } ${document.getElementById("currency").value}`;
}

let optionsExpressPay = {
  UK: {
    currency: "GBP",
    LE: ["UK LE 1", "UK LE 2", "UK LE 3", "UK LE 4", "UK LE 5"],
    ship_to_country: "United Kingdom",
  },
};

const category = document.getElementById("itemCategoryList");
let categoryOptions = optionsExpressPay.UK.LE;

categoryOptions.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item;
  document.getElementById("itemCategoryListOptions").appendChild(option);
});

function createOptionsList(options, formElement) {
  formElement.innerHTML = ``;
  options.forEach(function (item) {
    var option = document.createElement("option");
    option.value = item;
    option.innerHTML = item;
    formElement.appendChild(option);
  });
  if (formElement.options.length === 1) {
    //formElement[0].setAttribute(`selected`, `true`);
    formElement[0].selected = true;
    formElement.disabled = true;
  } else {formElement.disabled = false;
    var placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.innerHTML = "Chose...";
  formElement.prepend(placeholderOption)
placeholderOption.selected = true}
}

function populateDependants() {
  let purchasingUnit = document.getElementById("purchasing-unit").value;
  let paymentProcess = document.getElementById("payment-process").value;
  console.log(purchasingUnit);
  console.log(paymentProcess);
  let currency = document.getElementById("currency");
  let shiptoCountry = document.getElementById("shipto-country");
  let legalEntitiesList = document.getElementById("le-options");

  console.log(`${paymentProcess} ${purchasingUnit}`)
  let currencyOptions =
    optionsTree[`${paymentProcess}`][`purchasing_units`][`${purchasingUnit}`][
      `currencies`
    ];
console.log (currencyOptions)
  let legalEntitiesOptions =
    optionsTree[`${paymentProcess}`][`purchasing_units`][`${purchasingUnit}`][
      `legal_entities`
    ];

  createOptionsList(currencyOptions, currency);
  createOptionsList(legalEntitiesOptions, legalEntitiesList);
  let countryOption =
    optionsTree[`${paymentProcess}`][`purchasing_units`][`${purchasingUnit}`][
      `country`
    ];
  shiptoCountry.value = countryOption;
  shiptoCountry.disabled = true;
}

// EVENT LISTENERS

let radiosTeamRedirected = document.getElementsByName("setup-team-redirected");
for (var i = 0; i < radiosTeamRedirected.length; i++) {
  radiosTeamRedirected[i].onclick = function () {
    if (document.getElementById("setup-team-redirected-yes").checked) {
      document.getElementById("gs-setup-input").style.display = "flex";
    } else if (document.getElementById("setup-team-redirected-no").checked) {
      document.getElementById("gs-setup-input").style.display = "none";
    } else {
    }
  };
}

const totalPaymentComponents = [
  document.getElementById("currency"),
  document.getElementById("total-net"),
  document.getElementById("total-freight"),
  document.getElementById("total-vat"),
];
totalPaymentComponents.forEach(function (paymentComponent) {
  paymentComponent.addEventListener("change", updateGrandTotal);
});

/*
const determinationFields = [
  document.getElementById("purchasing-unit"),
  document.getElementById("payment-process"),
];
determinationFields.forEach(function (determinationField) {
  determinationField.addEventListener("change", function () {
    if (
      document.getElementById("purchasing-unit").value !== "" &&
      document.getElementById("payment-process").value !== ""
    ) {
      populateDependants();
    } else {
    }
  });
});
*/
let purchasingUnitOptions = document.getElementById("purchasing-unit");

purchasingUnitOptions.addEventListener("change", function(event) {
  x = processesByPU[`${event.target.value}`]
  console.log(x)
let formElement = document.getElementById("payment-process")
  formElement.innerHTML = ``;
  x.forEach(function (item) {
    var option = document.createElement("option");
    option.value = item.value;
    option.innerHTML = item.name;
    formElement.appendChild(option);
  });
  if (formElement.options.length === 1) {
    formElement[0].selected = true;
    formElement.disabled = true;
  }

  if (
      document.getElementById("purchasing-unit").value !== "" && 
      document.getElementById("payment-process").options.length === 1) {
      populateDependants();
    } else {
    }
});



// SOURCE & DETERMINATION OBJECTS

const processesByPU = {
  SAP: [{ value: `candex`, name: `Candex (PO)` }],
  SAPGB: [{ value: `express_pay`, name: `ExpressPay (non PO)` }],
  SAPMX: [{ value: `candex`, name: `Candex (PO)` }],
  SAPSG: [{ value: `candex`, name: `Candex (PO)` }],
};

const optionsTree = {
  express_pay: {
    comission: 0,
    purchasing_units: {
      SAPGB: {
        country: "United Kingdom",
        currencies: ["GBP"],
        legal_entities: ["UK LE 1", "UK LE 2", "UK LE 3", "UK LE 4", "UK LE 5"],
      },
    },
  },
  candex: {
    comission: 0.03,
    purchasing_units: {
      SAP: {
        country: "United States",
        currencies: ["USD"],
        legal_entities: ["US LE 1", "US LE 2", "US LE 3", "US LE 4", "US LE 5"],
      },
      SAPMX: {
        country: "Mexico",
        currencies: ["MXN","USD"],
        legal_entities: ["MX LE 1", "MX LE 2", "MX LE 3", "MX LE 4", "MX LE 5"],
      },
      SAPSG: {
        country: "Singapore",
        currencies: ["SGD"],
        legal_entities: ["SG LE 1", "SG LE 2", "SG LE 3", "SG LE 4", "SG LE 5"],
      },
    },
  },
};
