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

/////////////////////////////////////////////

/*
let themePreferred = document.getElementById("theme-preferred");
themePreferred.onchange = alert(themePreferred);
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
  let totalReceive = document.getElementById("total-receive");
  let comissionAmount = document.getElementById("comission");
  let comissionPercent =
    optionsTree[`${document.getElementById("payment-process").value}`][
      `comission`
    ];
  console.log(comissionPercent);

  let totalPaymentAmount =
    parseInt(totalNet) + parseInt(totalFreight) + parseInt(totalVat);
  totalPayment.value = `${totalPaymentAmount} ${
    document.getElementById("currency").value
  }`;
  console.log(parseInt(totalPaymentAmount));
  console.log(
    parseInt(
      parseInt(
        optionsTree[`${document.getElementById("payment-process").value}`][
          `comission`
        ]
      )
    )
  );
  comissionAmount.value = parseInt(totalPaymentAmount) * comissionPercent;
  totalReceive.value = totalPaymentAmount - parseInt(comissionAmount.value);
}

function createOptionsList(options, formElement) {
  formElement.innerHTML = ``;
  options.forEach(function (item) {
    var option = document.createElement("option");
    option.value = item;
    option.innerHTML = item;
    formElement.appendChild(option);
  });
  if (formElement.options.length === 1) {
    formElement[0].selected = true;
    formElement.disabled = true;
  } else {
    formElement.disabled = false;
    var placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.innerHTML = "Chose...";
    formElement.prepend(placeholderOption);
    placeholderOption.selected = true;
  }
}
function createPlaceholderOption(htmlElement, placeholderText) {
  var placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.innerHTML = placeholderText;
  htmlElement.prepend(placeholderOption);
  placeholderOption.selected = true;
}
function populateDeterminationFieldsDependants() {
  let purchasingUnit = document.getElementById("purchasing-unit").value;
  let paymentProcess = document.getElementById("payment-process").value;
  let currency = document.getElementById("currency");
  let shiptoCountry = document.getElementById("shipto-country");
  let legalEntitiesList = document.getElementById("le-options");
  let costCenterList = document.getElementById("cc-options");
  let comissionAmount = document.getElementById("comission");

  console.log(`${paymentProcess} ${purchasingUnit}`);
  let currencyOptions =
    optionsTree[`${paymentProcess}`][`purchasing_units`][`${purchasingUnit}`][
      `currencies`
    ];
  console.log(currencyOptions);
  let legalEntitiesOptions =
    processesByPU[`${purchasingUnit}`][`legal_entities`];

  createOptionsList(currencyOptions, currency);
  createOptionsList(legalEntitiesOptions, legalEntitiesList);
  let countryOption = processesByPU[`${purchasingUnit}`][`country`];
  shiptoCountry.value = countryOption;
  shiptoCountry.disabled = true;

  let comission = optionsTree[`${paymentProcess}`][`comission`];
  comissionAmount.placeholder = `${comission * 100} %`;

  let costCenterOptions = processesByPU[`${purchasingUnit}`][`cost_centers`];
  createOptionsList(costCenterOptions, costCenterList);
}

function makeVisible(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute(`style`, `display: flex;`);
  }
}

function makeInvisible(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute(`style`, `display: none;`);
  }
}

function verifyVisibilityOfFields() {
  if (document.getElementById("payment-process").value === "") {
    makeInvisible(fieldsSpecificCandex);
    makeInvisible(fieldsSpecificEpay);
    makeInvisible(fieldsSpecificEpayUS);
  } else if (document.getElementById("payment-process").value === "candex") {
    makeVisible(fieldsSpecificCandex);
    makeInvisible(fieldsSpecificEpay);
    makeInvisible(fieldsSpecificEpayUS);
  } else if (
    document.getElementById("payment-process").value === "express_pay"
  ) {
    makeInvisible(fieldsSpecificCandex);
    makeVisible(fieldsSpecificEpay);
    makeInvisible(fieldsSpecificEpayUS);
  } else if (
    document.getElementById("payment-process").value === "express_pay_us"
  ) {
    makeInvisible(fieldsSpecificCandex);
    makeInvisible(fieldsSpecificEpay);
    makeVisible(fieldsSpecificEpayUS);
  } else {
    alert("Hello");
  }
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

// WORKING HERE

/*
let radiosCostCenterSplit = document.getElementsByName("cost-center-split");
for (var i = 0; i < radiosCostCenterSplit.length; i++) {
  radiosTeamRedirected[i].onclick = function () {
    if (document.getElementById("cost-center-split").checked) {
      document.getElementById("cc-split-quantity").style.display = "flex";
    } else if (document.getElementById("cost-center-split-yes").checked) {
      document.getElementById("cc-split-quantity").style.display = "none";
    } else {
    }
  };
}
*/

const totalPaymentComponents = [
  document.getElementById("currency"),
  document.getElementById("total-net"),
  document.getElementById("total-freight"),
  document.getElementById("total-vat"),
];
totalPaymentComponents.forEach(function (paymentComponent) {
  paymentComponent.addEventListener("change", updateGrandTotal);
});

const determinationFields = [
  document.getElementById("purchasing-unit"),
  document.getElementById("payment-process"),
];

determinationFields.forEach(function (determinationField) {
  determinationField.addEventListener("change", function () {
    if (
      document.getElementById("purchasing-unit").value === "SAP" &&
      document.getElementById("payment-process").value === "express_pay_us"
    ) {
      verifyVisibilityOfFields();
    } else if (
      document.getElementById("purchasing-unit").value !== "" &&
      document.getElementById("payment-process").value !== ""
    ) {
      populateDeterminationFieldsDependants();
      verifyVisibilityOfFields();
    } else {
      verifyVisibilityOfFields();
    }
  });
});

const fieldsSpecificEpay = document.getElementsByClassName("express-pay");
const fieldsSpecificCandex = document.getElementsByClassName("candex");
const fieldsSpecificEpayUS = document.getElementsByClassName("express-pay-us");
/*
 */

let purchasingUnitOptions = document.getElementById("purchasing-unit");

purchasingUnitOptions.addEventListener("change", function (event) {
  x = processesByPU[`${event.target.value}`][`processes`];
  console.log(x);
  let formElement = document.getElementById("payment-process");
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
    verifyVisibilityOfFields();
  } else {
    formElement.disabled = false;
    createPlaceholderOption(formElement, "Choose...");
    verifyVisibilityOfFields();
  }

  if (
    document.getElementById("purchasing-unit").value !== "" &&
    document.getElementById("payment-process").options.length === 1
  ) {
    populateDeterminationFieldsDependants();
  } else {
  }
});

// SOURCE & DETERMINATION OBJECTS

const processesByPU = {
  SAP: {
    country: "United States",
    processes: [
      { value: `candex`, name: `Candex (PO)` },
      { value: `express_pay_us`, name: `ExpressPay (PO)` },
    ],
    legal_entities: [
      "United States LE 1",
      "United States LE 2",
      "United States LE 3",
      "United States LE 4",
      "United States LE 5",
    ],
    cost_centers: [
      "United States CC 1",
      "United States CC 2",
      "United States CC 3",
      "United States CC 4",
      "United States CC 5",
    ],
  },
  SAPGB: {
    country: "United Kingdom",
    processes: [
      { value: `express_pay`, name: `ExpressPay (non PO)` },
      { value: `candex`, name: `Candex (PO)` },
    ],
    legal_entities: [
      "United Kingdom LE 1",
      "United Kingdom LE 2",
      "United Kingdom LE 3",
      "United Kingdom LE 4",
      "United Kingdom LE 5",
    ],
    cost_centers: [
      "United Kingdom CC 1",
      "United Kingdom CC 2",
      "United Kingdom CC 3",
      "United Kingdom CC 4",
      "United Kingdom CC 5",
    ],
  },
  SAPMX: {
    country: "Mexico",
    processes: [{ value: `candex`, name: `Candex (PO)` }],
    legal_entities: [
      "Mexico LE 1",
      "Mexico LE 2",
      "Mexico LE 3",
      "Mexico LE 4",
      "Mexico LE 5",
    ],
    cost_centers: [
      "Mexico CC 1",
      "Mexico CC 2",
      "Mexico CC 3",
      "Mexico CC 4",
      "Mexico CC 5",
    ],
  },
  SAPSG: {
    country: "Singapore",
    processes: [{ value: `candex`, name: `Candex (PO)` }],
    legal_entities: [
      "Singapore LE 1",
      "Singapore LE 2",
      "Singapore LE 3",
      "Singapore LE 4",
      "Singapore LE 5",
    ],
    cost_centers: [
      "Singapore CC 1",
      "Singapore CC 2",
      "Singapore CC 3",
      "Singapore CC 4",
      "Singapore CC 5",
    ],
  },
};

const optionsTree = {
  express_pay: {
    comission: 0,
    purchasing_units: {
      SAPGB: {
        country: "United Kingdom",
        currencies: ["GBP"],
        legal_entities: ["UK LE 1", "UK LE 2", "UK LE 3", "UK LE 4", "UK LE 5"],
        //cost_centers: ["UK CC 1", "UK CC 2", "UK CC 3", "UK CC 4", "UK CC 5"],
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
      SAPGB: {
        country: "United Kingdom",
        currencies: ["GBP"],
        legal_entities: ["UK LE 1", "UK LE 2", "UK LE 3", "UK LE 4", "UK LE 5"],
      },
      SAPMX: {
        country: "Mexico",
        currencies: ["MXN"],
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

const countriesAndTelCodes = [
  { code: "AF", tel_code: "93", country: "Afghanistan" },
  { code: "AX", tel_code: "+358-18", country: "Aland Islands" },
  { code: "AL", tel_code: "355", country: "Albania" },
  { code: "DZ", tel_code: "213", country: "Algeria" },
  { code: "AS", tel_code: "+1-684", country: "American Samoa" },
  { code: "AD", tel_code: "376", country: "Andorra" },
  { code: "AO", tel_code: "244", country: "Angola" },
  { code: "AI", tel_code: "+1-264", country: "Anguilla" },
  { code: "AQ", tel_code: "", country: "Antarctica" },
  { code: "AG", tel_code: "+1-268", country: "Antigua and Barbuda" },
  { code: "AR", tel_code: "54", country: "Argentina" },
  { code: "AM", tel_code: "374", country: "Armenia" },
  { code: "AW", tel_code: "297", country: "Aruba" },
  { code: "AU", tel_code: "61", country: "Australia" },
  { code: "AT", tel_code: "43", country: "Austria" },
  { code: "AZ", tel_code: "994", country: "Azerbaijan" },
  { code: "BS", tel_code: "+1-242", country: "Bahamas" },
  { code: "BH", tel_code: "973", country: "Bahrain" },
  { code: "BD", tel_code: "880", country: "Bangladesh" },
  { code: "BB", tel_code: "+1-246", country: "Barbados" },
  { code: "BY", tel_code: "375", country: "Belarus" },
  { code: "BE", tel_code: "32", country: "Belgium" },
  { code: "BZ", tel_code: "501", country: "Belize" },
  { code: "BJ", tel_code: "229", country: "Benin" },
  { code: "BM", tel_code: "+1-441", country: "Bermuda" },
  { code: "BT", tel_code: "975", country: "Bhutan" },
  { code: "BO", tel_code: "591", country: "Bolivia" },
  { code: "BQ", tel_code: "599", country: "Bonaire Saint Eustatius and Saba " },
  { code: "BA", tel_code: "387", country: "Bosnia and Herzegovina" },
  { code: "BW", tel_code: "267", country: "Botswana" },
  { code: "BV", tel_code: "", country: "Bouvet Island" },
  { code: "BR", tel_code: "55", country: "Brazil" },
  { code: "IO", tel_code: "246", country: "British Indian Ocean Territory" },
  { code: "VG", tel_code: "+1-284", country: "British Virgin Islands" },
  { code: "BN", tel_code: "673", country: "Brunei" },
  { code: "BG", tel_code: "359", country: "Bulgaria" },
  { code: "BF", tel_code: "226", country: "Burkina Faso" },
  { code: "BI", tel_code: "257", country: "Burundi" },
  { code: "KH", tel_code: "855", country: "Cambodia" },
  { code: "CM", tel_code: "237", country: "Cameroon" },
  { code: "CA", tel_code: "1", country: "Canada" },
  { code: "CV", tel_code: "238", country: "Cape Verde" },
  { code: "KY", tel_code: "+1-345", country: "Cayman Islands" },
  { code: "CF", tel_code: "236", country: "Central African Republic" },
  { code: "TD", tel_code: "235", country: "Chad" },
  { code: "CL", tel_code: "56", country: "Chile" },
  { code: "CN", tel_code: "86", country: "China" },
  { code: "CX", tel_code: "61", country: "Christmas Island" },
  { code: "CC", tel_code: "61", country: "Cocos Islands" },
  { code: "CO", tel_code: "57", country: "Colombia" },
  { code: "KM", tel_code: "269", country: "Comoros" },
  { code: "CK", tel_code: "682", country: "Cook Islands" },
  { code: "CR", tel_code: "506", country: "Costa Rica" },
  { code: "HR", tel_code: "385", country: "Croatia" },
  { code: "CU", tel_code: "53", country: "Cuba" },
  { code: "CW", tel_code: "599", country: "Curacao" },
  { code: "CY", tel_code: "357", country: "Cyprus" },
  { code: "CZ", tel_code: "420", country: "Czech Republic" },
  { code: "CD", tel_code: "243", country: "Democratic Republic of the Congo" },
  { code: "DK", tel_code: "45", country: "Denmark" },
  { code: "DJ", tel_code: "253", country: "Djibouti" },
  { code: "DM", tel_code: "+1-767", country: "Dominica" },
  { code: "DO", tel_code: "+1-809 and 1-829", country: "Dominican Republic" },
  { code: "TL", tel_code: "670", country: "East Timor" },
  { code: "EC", tel_code: "593", country: "Ecuador" },
  { code: "EG", tel_code: "20", country: "Egypt" },
  { code: "SV", tel_code: "503", country: "El Salvador" },
  { code: "GQ", tel_code: "240", country: "Equatorial Guinea" },
  { code: "ER", tel_code: "291", country: "Eritrea" },
  { code: "EE", tel_code: "372", country: "Estonia" },
  { code: "ET", tel_code: "251", country: "Ethiopia" },
  { code: "FK", tel_code: "500", country: "Falkland Islands" },
  { code: "FO", tel_code: "298", country: "Faroe Islands" },
  { code: "FJ", tel_code: "679", country: "Fiji" },
  { code: "FI", tel_code: "358", country: "Finland" },
  { code: "FR", tel_code: "33", country: "France" },
  { code: "GF", tel_code: "594", country: "French Guiana" },
  { code: "PF", tel_code: "689", country: "French Polynesia" },
  { code: "TF", tel_code: "", country: "French Southern Territories" },
  { code: "GA", tel_code: "241", country: "Gabon" },
  { code: "GM", tel_code: "220", country: "Gambia" },
  { code: "GE", tel_code: "995", country: "Georgia" },
  { code: "DE", tel_code: "49", country: "Germany" },
  { code: "GH", tel_code: "233", country: "Ghana" },
  { code: "GI", tel_code: "350", country: "Gibraltar" },
  { code: "GR", tel_code: "30", country: "Greece" },
  { code: "GL", tel_code: "299", country: "Greenland" },
  { code: "GD", tel_code: "+1-473", country: "Grenada" },
  { code: "GP", tel_code: "590", country: "Guadeloupe" },
  { code: "GU", tel_code: "+1-671", country: "Guam" },
  { code: "GT", tel_code: "502", country: "Guatemala" },
  { code: "GG", tel_code: "+44-1481", country: "Guernsey" },
  { code: "GN", tel_code: "224", country: "Guinea" },
  { code: "GW", tel_code: "245", country: "Guinea-Bissau" },
  { code: "GY", tel_code: "592", country: "Guyana" },
  { code: "HT", tel_code: "509", country: "Haiti" },
  { code: "HM", tel_code: " ", country: "Heard Island and McDonald Islands" },
  { code: "HN", tel_code: "504", country: "Honduras" },
  { code: "HK", tel_code: "852", country: "Hong Kong" },
  { code: "HU", tel_code: "36", country: "Hungary" },
  { code: "IS", tel_code: "354", country: "Iceland" },
  { code: "IN", tel_code: "91", country: "India" },
  { code: "ID", tel_code: "62", country: "Indonesia" },
  { code: "IR", tel_code: "98", country: "Iran" },
  { code: "IQ", tel_code: "964", country: "Iraq" },
  { code: "IE", tel_code: "353", country: "Ireland" },
  { code: "IM", tel_code: "+44-1624", country: "Isle of Man" },
  { code: "IL", tel_code: "972", country: "Israel" },
  { code: "IT", tel_code: "39", country: "Italy" },
  { code: "CI", tel_code: "225", country: "Ivory Coast" },
  { code: "JM", tel_code: "+1-876", country: "Jamaica" },
  { code: "JP", tel_code: "81", country: "Japan" },
  { code: "JE", tel_code: "+44-1534", country: "Jersey" },
  { code: "JO", tel_code: "962", country: "Jordan" },
  { code: "KZ", tel_code: "7", country: "Kazakhstan" },
  { code: "KE", tel_code: "254", country: "Kenya" },
  { code: "KI", tel_code: "686", country: "Kiribati" },
  { code: "XK", tel_code: "", country: "Kosovo" },
  { code: "KW", tel_code: "965", country: "Kuwait" },
  { code: "KG", tel_code: "996", country: "Kyrgyzstan" },
  { code: "LA", tel_code: "856", country: "Laos" },
  { code: "LV", tel_code: "371", country: "Latvia" },
  { code: "LB", tel_code: "961", country: "Lebanon" },
  { code: "LS", tel_code: "266", country: "Lesotho" },
  { code: "LR", tel_code: "231", country: "Liberia" },
  { code: "LY", tel_code: "218", country: "Libya" },
  { code: "LI", tel_code: "423", country: "Liechtenstein" },
  { code: "LT", tel_code: "370", country: "Lithuania" },
  { code: "LU", tel_code: "352", country: "Luxembourg" },
  { code: "MO", tel_code: "853", country: "Macao" },
  { code: "MK", tel_code: "389", country: "Macedonia" },
  { code: "MG", tel_code: "261", country: "Madagascar" },
  { code: "MW", tel_code: "265", country: "Malawi" },
  { code: "MY", tel_code: "60", country: "Malaysia" },
  { code: "MV", tel_code: "960", country: "Maldives" },
  { code: "ML", tel_code: "223", country: "Mali" },
  { code: "MT", tel_code: "356", country: "Malta" },
  { code: "MH", tel_code: "692", country: "Marshall Islands" },
  { code: "MQ", tel_code: "596", country: "Martinique" },
  { code: "MR", tel_code: "222", country: "Mauritania" },
  { code: "MU", tel_code: "230", country: "Mauritius" },
  { code: "YT", tel_code: "262", country: "Mayotte" },
  { code: "MX", tel_code: "52", country: "Mexico" },
  { code: "FM", tel_code: "691", country: "Micronesia" },
  { code: "MD", tel_code: "373", country: "Moldova" },
  { code: "MC", tel_code: "377", country: "Monaco" },
  { code: "MN", tel_code: "976", country: "Mongolia" },
  { code: "ME", tel_code: "382", country: "Montenegro" },
  { code: "MS", tel_code: "+1-664", country: "Montserrat" },
  { code: "MA", tel_code: "212", country: "Morocco" },
  { code: "MZ", tel_code: "258", country: "Mozambique" },
  { code: "MM", tel_code: "95", country: "Myanmar" },
  { code: "NA", tel_code: "264", country: "Namibia" },
  { code: "NR", tel_code: "674", country: "Nauru" },
  { code: "NP", tel_code: "977", country: "Nepal" },
  { code: "NL", tel_code: "31", country: "Netherlands" },
  { code: "NC", tel_code: "687", country: "New Caledonia" },
  { code: "NZ", tel_code: "64", country: "New Zealand" },
  { code: "NI", tel_code: "505", country: "Nicaragua" },
  { code: "NE", tel_code: "227", country: "Niger" },
  { code: "NG", tel_code: "234", country: "Nigeria" },
  { code: "NU", tel_code: "683", country: "Niue" },
  { code: "NF", tel_code: "672", country: "Norfolk Island" },
  { code: "KP", tel_code: "850", country: "North Korea" },
  { code: "MP", tel_code: "+1-670", country: "Northern Mariana Islands" },
  { code: "NO", tel_code: "47", country: "Norway" },
  { code: "OM", tel_code: "968", country: "Oman" },
  { code: "PK", tel_code: "92", country: "Pakistan" },
  { code: "PW", tel_code: "680", country: "Palau" },
  { code: "PS", tel_code: "970", country: "Palestinian Territory" },
  { code: "PA", tel_code: "507", country: "Panama" },
  { code: "PG", tel_code: "675", country: "Papua New Guinea" },
  { code: "PY", tel_code: "595", country: "Paraguay" },
  { code: "PE", tel_code: "51", country: "Peru" },
  { code: "PH", tel_code: "63", country: "Philippines" },
  { code: "PN", tel_code: "870", country: "Pitcairn" },
  { code: "PL", tel_code: "48", country: "Poland" },
  { code: "PT", tel_code: "351", country: "Portugal" },
  { code: "PR", tel_code: "+1-787 and 1-939", country: "Puerto Rico" },
  { code: "QA", tel_code: "974", country: "Qatar" },
  { code: "CG", tel_code: "242", country: "Republic of the Congo" },
  { code: "RE", tel_code: "262", country: "Reunion" },
  { code: "RO", tel_code: "40", country: "Romania" },
  { code: "RU", tel_code: "7", country: "Russia" },
  { code: "RW", tel_code: "250", country: "Rwanda" },
  { code: "BL", tel_code: "590", country: "Saint Barthelemy" },
  { code: "SH", tel_code: "290", country: "Saint Helena" },
  { code: "KN", tel_code: "+1-869", country: "Saint Kitts and Nevis" },
  { code: "LC", tel_code: "+1-758", country: "Saint Lucia" },
  { code: "MF", tel_code: "590", country: "Saint Martin" },
  { code: "PM", tel_code: "508", country: "Saint Pierre and Miquelon" },
  {
    code: "VC",
    tel_code: "+1-784",
    country: "Saint Vincent and the Grenadines",
  },
  { code: "WS", tel_code: "685", country: "Samoa" },
  { code: "SM", tel_code: "378", country: "San Marino" },
  { code: "ST", tel_code: "239", country: "Sao Tome and Principe" },
  { code: "SA", tel_code: "966", country: "Saudi Arabia" },
  { code: "SN", tel_code: "221", country: "Senegal" },
  { code: "RS", tel_code: "381", country: "Serbia" },
  { code: "SC", tel_code: "248", country: "Seychelles" },
  { code: "SL", tel_code: "232", country: "Sierra Leone" },
  { code: "SG", tel_code: "65", country: "Singapore" },
  { code: "SX", tel_code: "599", country: "Sint Maarten" },
  { code: "SK", tel_code: "421", country: "Slovakia" },
  { code: "SI", tel_code: "386", country: "Slovenia" },
  { code: "SB", tel_code: "677", country: "Solomon Islands" },
  { code: "SO", tel_code: "252", country: "Somalia" },
  { code: "ZA", tel_code: "27", country: "South Africa" },
  {
    code: "GS",
    tel_code: "",
    country: "South Georgia and the South Sandwich Islands",
  },
  { code: "KR", tel_code: "82", country: "South Korea" },
  { code: "SS", tel_code: "211", country: "South Sudan" },
  { code: "ES", tel_code: "34", country: "Spain" },
  { code: "LK", tel_code: "94", country: "Sri Lanka" },
  { code: "SD", tel_code: "249", country: "Sudan" },
  { code: "SR", tel_code: "597", country: "Suriname" },
  { code: "SJ", tel_code: "47", country: "Svalbard and Jan Mayen" },
  { code: "SZ", tel_code: "268", country: "Swaziland" },
  { code: "SE", tel_code: "46", country: "Sweden" },
  { code: "CH", tel_code: "41", country: "Switzerland" },
  { code: "SY", tel_code: "963", country: "Syria" },
  { code: "TW", tel_code: "886", country: "Taiwan" },
  { code: "TJ", tel_code: "992", country: "Tajikistan" },
  { code: "TZ", tel_code: "255", country: "Tanzania" },
  { code: "TH", tel_code: "66", country: "Thailand" },
  { code: "TG", tel_code: "228", country: "Togo" },
  { code: "TK", tel_code: "690", country: "Tokelau" },
  { code: "TO", tel_code: "676", country: "Tonga" },
  { code: "TT", tel_code: "+1-868", country: "Trinidad and Tobago" },
  { code: "TN", tel_code: "216", country: "Tunisia" },
  { code: "TR", tel_code: "90", country: "Turkey" },
  { code: "TM", tel_code: "993", country: "Turkmenistan" },
  { code: "TC", tel_code: "+1-649", country: "Turks and Caicos Islands" },
  { code: "TV", tel_code: "688", country: "Tuvalu" },
  { code: "VI", tel_code: "+1-340", country: "U.S. Virgin Islands" },
  { code: "UG", tel_code: "256", country: "Uganda" },
  { code: "UA", tel_code: "380", country: "Ukraine" },
  { code: "AE", tel_code: "971", country: "United Arab Emirates" },
  { code: "GB", tel_code: "44", country: "United Kingdom" },
  {
    code: "UM",
    tel_code: "1",
    country: "United States Minor Outlying Islands",
  },
  { code: "US", tel_code: "1", country: "United States" },
  { code: "UY", tel_code: "598", country: "Uruguay" },
  { code: "UZ", tel_code: "998", country: "Uzbekistan" },
  { code: "VU", tel_code: "678", country: "Vanuatu" },
  { code: "VA", tel_code: "379", country: "Vatican" },
  { code: "VE", tel_code: "58", country: "Venezuela" },
  { code: "VN", tel_code: "84", country: "Vietnam" },
  { code: "WF", tel_code: "681", country: "Wallis and Futuna" },
  { code: "EH", tel_code: "212", country: "Western Sahara" },
  { code: "YE", tel_code: "967", country: "Yemen" },
  { code: "ZM", tel_code: "260", country: "Zambia" },
  { code: "ZW", tel_code: "263", country: "Zimbabwe" },
];

let telCodesList = document.getElementById("tel-codes-list");
telCodesList.innerHTML = ``;

countriesAndTelCodes.forEach(function (arrayItem) {
  var option = document.createElement("option");
  option.value = arrayItem.tel_code;
  option.innerHTML = `${arrayItem.tel_code} (${arrayItem.country})`;
  telCodesList.appendChild(option);
});
createPlaceholderOption(telCodesList, "Choose country tel. code...");

let countries = document.getElementById("countries");
countries.innerHTML = ``;
countriesAndTelCodes.forEach(function (arrayItem) {
  var option = document.createElement("option");
  option.value = arrayItem.country;
  option.innerHTML = arrayItem.country;
  countries.appendChild(option);
});

/*

countriesAndTelCodes.forEach(function (item) {
  //countriesAndTelCodesItem = countriesAndTelCodes[i];
  var option = document.createElement("option");
  option.innerHTML = item.tel_code.name;
  formElement.appendChild(option);
});

purchasingUnitOptions.addEventListener("change", function (event) {
  x = processesByPU[`${event.target.value}`];
  console.log(x);
  let formElement = document.getElementById("payment-process");
  formElement.innerHTML = ``;
  x.forEach(function (item) {
    var option = document.createElement("option");
    option.value = item.value;
    option.innerHTML = item.name;
    formElement.appendChild(option);
  });


function blabla() {
  telCodes[i].forEach((item) => console.log(item));
}

}

function bla() {
  alert("hello");
  for (var i = 0; i < telCodes.length; i++) {
    console.log(telCodes[i]);
  }
}
*/
