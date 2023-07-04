import express from 'express'
import { createItem, updateItem, getItem, getItems, deleteItem } from '../controllers/item-ctrl.js'


const router = express.Router()

//Create
router.post("/insert_item/", createItem)
//Update
router.put("/update_item/id/:id", updateItem)
//Delete
router.delete("/del/id/:id", deleteItem)
//Get
router.get("/get_item_by_id/:id", getItem)
//Gets
router.get("/", getItems)

export default router