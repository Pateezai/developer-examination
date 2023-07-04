import Item from "../models/Item.js";


export const createItem = async (req,res, next) =>{

    const newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.qty,
        desc: req.body.desc,
    })
    try {
        const saveItem = await newItem.save()
        return res.status(200).json(saveItem)
    } catch (err) {
        next(err);
    }
}

export const getItem = async (req,res,next) =>{
    try {
        const item = await Item.findById(
            req.params.id
        )
       return res.status(200).json(item)
    } catch (err) {
        next(err);
    }
}

export const getItems = async (req,res,next) =>{
    try {
        const items = await Item.find(req.query).limit(req.query.limit)
        return res.status(200).json(items)
        
    } catch (err) {
        next(err)
    }
}

export const updateItem = async (req,res,next) =>{
    try {
        const updateItem = await Item.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new: true},
        )
        await updateItem.save();
        return res.status(200).json(updateItem)
    } catch (err) {
        next(err)
    }
}

export const deleteItem = async (req,res,next) =>{
    try {
        await Item.findByIdAndDelete(
            req.params.id,
            {$set: req.body },
            { new: true}
        )
        return res.status(200).json()
    } catch (err) {
        next(err)
        
    }
}