import CryptoJS from "crypto-js";

function formatDatetime(date = new Date()) {
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
  if (isNaN(rupees)) throw new Error("Invalid amount");
  return Math.round(rupees * 100).toString();
}

export function alfalahPayment({
  merchantId,
  storeId,
  merchantHash,
  merchantUsername,
  merchantPassword,
  secretKey, // used for HMAC
  amount, // in rupees, e.g., "100.00"
  returnUrl,
  isTest = false,
  customFields = {}, // e.g. { HS_IsRedirectionRequest: "0" }
}) {
  const now = new Date();
  const txnRef = "T" + now.getTime();
  const txnDateTime = formatDatetime(now);

  const data = {
    HS_ChannelId: "1001", // redirect flow
    HS_IsRedirectionRequest: customFields.HS_IsRedirectionRequest || "0",
    HS_MerchantId: merchantId,
    HS_StoreId: storeId,
    HS_MerchantHash: merchantHash,
    HS_MerchantUsername: merchantUsername,
    HS_MerchantPassword: merchantPassword,
    HS_TransactionReferenceNumber: txnRef,
    HS_TransactionAmount: convertToPaisa(amount),
    HS_ReturnURL: `${returnUrl}?txnRef=${txnRef}`,
    HS_TxnDateTime: txnDateTime, // not in spec but helpful
  };

  // Prepare string to hash in alphabetical order of parameter names
  const keys = Object.keys(data).sort();
  const hashString = keys.map(k => `${k}=${data[k]}`).join("&");
  const hmac = CryptoJS.HmacSHA256(hashString, secretKey).toString(CryptoJS.enc.Hex);
  data.HS_RequestHash = hmac;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = isTest
    ? "https://sandbox.bankalfalah.com/HS/HS/HS"
    : "https://payments.bankalfalah.com/HS/HS/HS";

  Object.entries(data).forEach(([key, value]) => {
    const inp = document.createElement("input");
    inp.type = "hidden";
    inp.name = key;
    inp.value = value;
    form.appendChild(inp);
  });

  document.body.appendChild(form);
  form.submit();
}
