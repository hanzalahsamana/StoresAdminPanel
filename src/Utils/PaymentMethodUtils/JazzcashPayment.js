import CryptoJS from "crypto-js";

function formatDate(date = new Date()) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

function convertToPaisa(amountInRupees) {
  const rupees = parseFloat(amountInRupees);
  if (isNaN(rupees))
    throw new Error("Invalid amount passed to JazzCash payment");

  return Math.round(rupees * 100).toString();
}

export function jazzCashPayment({
  merchantId,
  password,
  amount, // in paisa (e.g. 10000 = Rs.100)
  salt,
  returnUrl,
  phone,
  txnType = "",
  isTestAccount = false,
  customFields = {},
}) {
  const now = new Date();
  const txnRefNo = "T" + now.getTime();
  const txnDateTime = formatDate(now);
  const txnExpiryDateTime = formatDate(
    new Date(now.getTime() + 60 * 60 * 1000)
  ); // 1hr later

  const data = {
    pp_Version: "1.1",
    pp_TxnType: txnType,
    pp_Language: "EN",
    pp_MerchantID: merchantId,
    pp_SubMerchantID: "",
    pp_Password: password,
    pp_TxnRefNo: txnRefNo,
    pp_Amount: convertToPaisa(amount),
    pp_DiscountedAmount: "",
    pp_DiscountBank: "",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: txnDateTime,
    pp_TxnExpiryDateTime: txnExpiryDateTime,
    pp_BillReference: "billRef",
    pp_Description: "Order Payment",
    pp_ReturnURL: returnUrl,
    ppmpf_1: phone,
    ppmpf_2: customFields.ppmpf_2 || "",
    ppmpf_3: customFields.ppmpf_3 || "",
    ppmpf_4: customFields.ppmpf_4 || "",
    ppmpf_5: customFields.ppmpf_5 || "",
  };

  // Create hash string
  const fieldsToHash = [
    "pp_Amount",
    "pp_BillReference",
    "pp_Description",
    "pp_Language",
    "pp_MerchantID",
    "pp_Password",
    "pp_ReturnURL",
    "pp_SubMerchantID",
    "pp_TxnCurrency",
    "pp_TxnDateTime",
    "pp_TxnExpiryDateTime",
    "pp_TxnRefNo",
    "pp_TxnType",
    "pp_Version",
    "ppmpf_1",
    "ppmpf_2",
    "ppmpf_3",
    "ppmpf_4",
    "ppmpf_5",
  ];

  const hashString =
    salt + "&" + fieldsToHash.map((k) => data[k] ?? "").join("&");
  const hash = CryptoJS.HmacSHA256(hashString, salt).toString(CryptoJS.enc.Hex);
  data.pp_SecureHash = hash;

  // Create and submit form
  const form = document.createElement("form");
  form.method = "POST";
  form.action = isTestAccount
    ? "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"
    : "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/";

  Object.entries(data).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
