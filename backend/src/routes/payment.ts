import express, { Request, Response } from "express";
// @ts-ignore
import SSLCommerz from "sslcommerz-lts";
import { verifyToken } from "../middleware/auth";
import { BookingModel } from "../models/hotel";

const router = express.Router();
const store_id = process.env.STORE_ID;
const store_password = process.env.STORE_PASSWORD;

const sslcommerz = new SSLCommerz(store_id, store_password, false); //use true in production

//sslcommerz init
router.post("/init", verifyToken, async (req, res) => {
  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   hotelId,
  //   adultCount,
  //   childCount,
  //   checkIn,
  //   checkOut,
  //   totalCost,
  // } = req.body;

  // const booking = await BookingModel.create();
  const tranId = `TRANS${Date.now()}`;
  const data = {
    total_amount: parseInt(req.body.totalCost),
    currency: "BDT",
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payments/success/${tranId}`,
    fail_url: `http://localhost:5000/api/payments/fail/${tranId}`,
    cancel_url: `http://localhost:5000/api/payments/cancel/${tranId}`,
    ipn_url: `http://localhost:5000/api/payments/ipn/${tranId}`,
    shipping_method: "No", //if it is (No) we do not need to provide any sipping information.
    product_name: "Hotel.",
    product_category: "Reservation",
    product_profile: "general",
    cus_name: `${req.body.firstName} ${req.body.lastName}`,
    cus_email: req.body.email,
    cus_phone: req.body.phone,
  };

  try {
    const userId = req.userId;
    req.body.userId = userId;
    req.body.tranId = tranId;
    await BookingModel.create(req.body);
    const response = await sslcommerz.init(data);
    if (response.status === "SUCCESS") {
      res.send({ payment_url: response.GatewayPageURL });
    } else {
      res.status(500).json({ message: "Failed to initiate payment", response });
    }
  } catch (error) {
    res.status(500).json({ message: "Error initiating payment", error });
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

router.post("/success/:tranId", async (req, res) => {
  const result = await BookingModel.findOneAndUpdate(
    { tranId: req.params.tranId },
    {
      $set: {
        status: "confirmed",
      },
    },
    { new: true }
  );
  

  if (result?.status !== "confirmed") {

    res.json({ message: "Something went wrong" });
  }
  // res.json({ message: "Payment was successful", data: req.body });
  res.redirect(302, "http://localhost:5173/payment/success");
});

router.post("/fail/:tranId", async (req, res) => {
  console.log(req.params.tranId);
  try {
    const result = await BookingModel.deleteOne({ tranId: req.params.tranId });

    if (!result?.deletedCount) {
      res.json({ message: "Something went wrong", data: req.body });
    }
    // res.json({ message: "Payment failed", data: req.body });
    res.redirect(302, "http://localhost:5173/payment/fail");
    //res.redirect( 301, "localhost:5173/payment/fail");
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
});

router.post("/cancel/:tranId", async (req, res) => {
  const result = await BookingModel.findOneAndUpdate(
    { tranId: req.params.tranId },
    {
      $set: {
        status: "canceled",
      },
    },
    { new: true }
  );
  if (result?.status !== "canceled") {
    res.status(400).json({ message: "Something went wrong" });
  }
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
