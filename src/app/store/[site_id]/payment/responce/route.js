// app/api/payment/response/route.js (or route.ts if using TS)
export async function GET() {
  return new Response("✅ API is working. Use POST to send JazzCash data.", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
export async function POST(request) {
  console.log("POST handler called", request);

  try {
    await fetch(`http://localhost:1234/api/v1/jazzcash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request,
        status: "ONE",
      }),
    });
  } catch (err) {
    console.error("❌ Failed to update payment status:", err);
  }

  const formData = await request.formData();
  console.log("Received formData:", formData);
  try {
    await fetch(`http://localhost:1234/api/v1/jazzcash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
        status: "TWO",
      }),
    });
  } catch (err) {
    console.error("❌ Failed to update payment status:", err);
  }

  const data = {};
  formData.forEach((value, key) => {
    console.log(`Form field: ${key} = ${value}`);
    data[key] = value;
  });

  try {
    await fetch(`http://localhost:1234/api/v1/jazzcash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        status: "THREE",
      }),
    });
  } catch (err) {
    console.error("❌ Failed to update payment status:", err);
  }

  console.log("Parsed data object:", data);

  const txnRefNo = data?.pp_TxnRefNo;
  console.log("Transaction Reference Number:", txnRefNo);

  const isSuccess = data?.pp_ResponseCode === "000";
  console.log("Is Success:", isSuccess);

  const redirectURL = isSuccess
    ? `/thank-you?txnRefNo=${txnRefNo}`
    : `/payment-failed?txnRefNo=${txnRefNo}`;

  console.log("Redirect URL would be:", redirectURL);

  // Stop redirecting, just return a JSON response for now
  return new Response(
      JSON.stringify({
          message: "Redirect stopped for testing",
          data,
          txnRefNo,
          isSuccess,
          redirectURL,
      }),
      {
          status: 200,
          headers: { "Content-Type": "application/json" },
      }
  );

  // return Response.redirect(redirectURL, 307);
}
