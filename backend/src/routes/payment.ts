

import express, { Request, Response } from "express";
// @ts-ignore
import SSLCommerz from "sslcommerz-lts";

const router = express.Router();
const store_id = process.env.STORE_ID ;
const store_password = process.env.STORE_PASSWORD ;
const is_live = process.env.SSL_MODE;

const sslcommerz = new SSLCommerz(store_id, store_password, true);

//sslcommerz init
router.get("/init", async (req, res) => {
  const data = {
    total_amount: 100,
    store_passwd: "sikder420@#",
    store_id:"start6586f3bfbdbf1",
    currency: "BDT",
    tran_id: `TRANS_${Date.now()}`, // use unique tran_id for each api call
    success_url: "http://localhost:5000/api/payments/success",
    fail_url: "http://localhost:5000/api/payments/fail",
    cancel_url: "http://localhost:5000/api/payments/cancel",
    ipn_url: "http://localhost:5000/api/payments/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };


  try {
    const response = await sslcommerz.init(data);
    if (response.status === 'SUCCESS') {
      res.json({ payment_url: response.GatewayPageURL });
    } else {
      res.status(500).json({ message: 'Failed to initiate payment', response });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error });
  }
});

//sslcommerz validation
// router.get("/validate", (req, res) => {
//   const data = {
//     val_id: "ADGAHHGDAKJ456454", //that you go from sslcommerz response
//   };
//   const sslcz = new SSLCommerzPayment(
//     process.env.STORE_ID,
//     process.env.STORE_PASSWORD,
//     process.env.SSL_MODE
//   );
//   sslcz.validate(data).then((data: any) => {
//     //process the response that got from sslcommerz
//     // https://developer.sslcommerz.com/doc/v4/#order-validation-api
//   });
// });

router.post("/success", (req, res) => {
  console.log("Payment Success:", req.body);
  res.json({ message: "Payment was successful", data: req.body });
});

router.post("/fail", (req, res) => {
  console.log("Payment Failed:", req.body);
  res.json({ message: "Payment failed", data: req.body });
});

router.post("/cancel", (req, res) => {
  console.log("Payment Canceled:", req.body);
  res.json({ message: "Payment canceled", data: req.body });
});

router.post("/ipn", (req, res) => {
  console.log("IPN Received:", req.body);
  res.json({ message: "IPN received", data: req.body });
});

const paymentRoutes = router;

export default paymentRoutes;





// curl -X POST \
// -H "Content-Type: application/json" \
// -d '{
//       "store_id": "start6586f3bfbdbf1",
//       "store_passwd": "sikder420@#",
//       "total_amount": "1000",
//       "currency": "BDT",
//       "tran_id": "TEST_12345",
//       "success_url": "http://localhost:3000/payment-success",
//       "fail_url": "http://localhost:3000/payment-fail",
//       "cancel_url": "http://localhost:3000/payment-cancel"
//     }' \
// https://sandbox.sslcommerz.com/gwprocess/v4/api.php




