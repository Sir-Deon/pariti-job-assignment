import express from "express";
import VendorController from "../controllers/vendorController";

const router = express.Router();

const vendorCtl = new VendorController();

/**
 * @POST Request
 * @Params index of the product you wish to buy.
 * @Body Provide the money and quantity fields in the request body
 */
router.post("/items/buy/:index", vendorCtl.buy);

/**
 * @GET Request
 * Get available items in stock
 */
router.get("/items", vendorCtl.get);

/**
 * @POST Request
 * @Description Add items to the stock
 */
router.post("/admin/add_item", vendorCtl.addItems);

/**
 * @PUT Request
 * @Params index of the product you wish to update.
 * @Description Update items in stock
 */
router.put("/admin/update_item/:index", vendorCtl.updateItem);

/**
 * @Delete Request
 * @Params index of the product you wish to remove.
 * @Description Remove items from the stock
 */
router.delete("/admin/delete_item/:index", vendorCtl.removeItem);

/**
 * @POST Request
 * @Description Add and update change in the vending machine with the same endpoint
 */
router.post("/admin/add_change", vendorCtl.addChange);

/**
 * @GET Request
 * @Description Get the available change in the machine
 */
router.get("/admin/get_change", vendorCtl.getChange);

export default router;
