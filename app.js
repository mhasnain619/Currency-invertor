const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropDowns = document.querySelectorAll('select');
let btn = document.querySelector('#get-rate')
let frmCurrency = document.querySelector('.from select')
let toCurrency = document.querySelector('.to select')
let msg = document.querySelector('.msg')
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};


// Loop through each dropdown
for (let select of dropDowns) {
    // Loop through each currency code in the countryList
    for (let currencyCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === 'from' && currencyCode === 'USD') {
            newOption.selected = 'selected';
        } else if (select.name === 'to' && currencyCode === 'PKR') {
            newOption.selected = 'selected';
        }
        select.appendChild(newOption);
    }
    select.addEventListener('change', (eve) => {
        updateFlag(eve.target)
    })
}

const updateFlag = (ele) => {
    let currCode = ele.value
    let currencyCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${currencyCode}/flat/64.png`
    let img = ele.parentElement.querySelector('img')
    img.src = newSrc

    // const flag = document.getElementById('flag');
}
btn.addEventListener('click', async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector('.amount input')
    let amountValue = amount.value
    if (amountValue === '' || amountValue < 1) {
        amountValue = 1
        amount.value = '1'
    }

    // Updated URL and fetching method
    const Url = `${baseUrl}/${frmCurrency.value.toLowerCase()}.json`
    try {
        let res = await fetch(Url)
        let json = await res.json();


        // Access the conversion rate from the nested object
        let rate = json[frmCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
        console.log(rate);
        let finalAmount = Math.floor(amountValue * rate)
        msg.innerText = `${amountValue} ${frmCurrency.value} = ${finalAmount} ${toCurrency.value}`
        console.log(finalAmount);

        // console.log(`Conversion rate from ${frmCurrency.value} to ${toCurrency.value}:`, rate);
        // You can now use this rate for further calculations (e.g., multiplying by amountValue)

    } catch (error) {
        console.error('Error fetching conversion rate:', error);
    }
});



