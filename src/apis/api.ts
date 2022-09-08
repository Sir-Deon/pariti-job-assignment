import express from "express";
import VendorController from "../controllers/vendorController";

const router = express.Router();

const vendorCtl = new VendorController();

router.post("/items/buy/:index", vendorCtl.buy);
router.get("/items", vendorCtl.get);
router.post("/admin/add_item", vendorCtl.addItems);
router.put("/admin/update_item/:index", vendorCtl.updateItem);
router.delete("/admin/delete_item/:index", vendorCtl.removeItem);
router.post("/admin/add_change", vendorCtl.addChange);
router.get("/admin/get_change", vendorCtl.getChange);

export default router;
