import { Request, Response } from "express";
import Item from "../models/Item";
import Change from "../models/Change";

let items: any[] = [];
let coins: any[] = [];

class VendorController {
  buy(req: Request, res: Response) {
    try {
      const { money, quantity } = req.body;
      const { index } = req.params;

      // Check clients funds
      if (money < items[Number(index)].cost) {
        res.json({
          success: false,
          message: "You do not have enough money!!",
        });
      }

      // Check if item is in stock
      if (items[Number(index)].amountLeft > 0) {
        // Calculate the change
        let change: any = calculateChange(Number(index), money, quantity);
        console.log(change);

        if (change.totalChange <= 0) {
          return res.json({
            success: false,
            message: "Oops sorry we do not change",
            change: change,
          });
        }

        // Update inventory
        for (let i = 1; i <= quantity; i++) {
          items[Number(index)].amountLeft = items[Number(index)].amountLeft - 1;
        }
        res.json({
          success: true,
          message: "You have bought an item !!",
          item: items[Number(index)],
          change: change,
        });
      } else {
        res.json({
          success: false,
          message: "item does not exist or It is finished !!",
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }

  /**
   * Item functions
   */
  get(req: Request, res: Response) {
    try {
      res.send(items);
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }

  addItems(req: Request, res: Response) {
    try {
      const { name, type, cost, quantity } = req.body;
      let newItem = new Item(name, type, cost, quantity);

      items.push(newItem);
      res.json({
        success: true,
        message: "Item added successfully !!",
        data: items,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }
  updateItem(req: Request, res: Response) {
    try {
      const { name, type, cost, quantity } = req.body;
      const { index } = req.params;

      items[Number(index)].name = name;
      items[Number(index)].type = type;
      items[Number(index)].cost = cost;
      items[Number(index)].quantity = quantity;
      res.json({
        success: true,
        message: "Item updated successfully !!",
        data: items[Number(index)],
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }
  removeItem(req: Request, res: Response) {
    try {
      const { index } = req.params;
      items.splice(0, Number(index));
      items = items;
      res.json({
        success: true,
        message: "Item removed successfully !!",
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }
  addChange(req: Request, res: Response) {
    try {
      const { change } = req.body;
      let arr = [];
      for (let i = 0; i < change.length; i++) {
        let newChange = new Change(change[i].amount, change[i].quantity);

        arr.push(newChange);
      }
      coins = arr;
      res.json({
        success: true,
        message: "Change added successfully !!",
        data: coins,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }
  getChange(req: Request, res: Response) {
    try {
      res.send(coins);
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Operation failed !!",
      });
    }
  }
}

const calculateChange = (index: number, money: number, quantity: number) => {
  let amountSpent = items[Number(index)].cost * quantity;
  if (amountSpent === money) {
    return 0;
  }

  if (amountSpent < money) {
    let actualChange = money - amountSpent;
    // Extract coin denominations
    let denominations = [];
    for (let i = 0; i < coins.length; i++) {
      denominations.push(coins[i].amount);
    }

    // Get the integer part of the change
    let change_integer = actualChange - (actualChange % 50);
    // Get the fractional part of the change
    let change_fraction = actualChange - change_integer;

    // Initial output scaling array
    let output = [0, 0, 0, 0];

    // Get number of each denomination required to obtain the change
    for (let i = denominations.length - 1; i >= 0; i--) {
      let integer = Number(change_integer / denominations[i]);

      if (integer >= 1 && integer <= coins[i].quantity) {
        coins[i].quantity = coins[i].quantity - 1;
        output[i] = integer;
        change_integer -= denominations[i] * integer;
      }

      let fraction = Number(change_fraction / denominations[i]);

      if (fraction >= 1 && fraction <= coins[i].quantity) {
        coins[i].quantity = coins[i].quantity - 1;
        output[i] = fraction;
        change_fraction -= denominations[i] * fraction;
      }
    }
    let totalChange = 0;
    // Calculate the total change
    for (let i = 0; i <= output.length - 1; i++) {
      if (output[i] != 0) {
        totalChange = totalChange + output[i] * denominations[i];
      }
    }

    return {
      output: output,
      denominations,
      totalChange,
    };
  }
};

export default VendorController;
