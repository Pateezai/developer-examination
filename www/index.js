// let endpoint = 'http://128.199.80.110:12111';
// $(document).ready(function () {
// });


// const renderTable = () => {
// }

// http://localhost:3000/api
// https://developer-examination-api.onrender.com/api
var nameInput = document.getElementById('name-input')
var priceInput = document.getElementById('price-input')
var qtyInput = document.getElementById('qty-input')
var descInput = document.getElementById('desc-input')


document.addEventListener('DOMContentLoaded',async function(){
    try {
        const res = await axios.get('https://developer-examination-api.onrender.com/api')
        const resdata = res.data
        console.log(res)
        console.log({status:'200', message:'OK', data: resdata})
        resTable(resdata);
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }
       
})


function resTable(data){
    const table = document.querySelector('table tbody')
    let tableHtml = "";
    // console.log(data.length)
    if(data.length == 0){
        table.innerHTML = `<tr>
            <td colspan='5'>There're no any item ...</td>
            </tr>`
        
    }
    // console.log(data)
    data.map((val, key) => {
    return  ((tableHtml += `<tr key=${key}>
            <th>${key + 1}</th>
            <td>${val.name}</td>
            <td>${val.price}</td>
            <td>${val.quantity}</td>
            <td>
            <button 
                type="button"
                id="view-btn-${key}"
                class="view-btn btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                view
            </button>
            <button 
                type="button"
                id="delete-btn-${key}"
                class="btn btn-danger"
            >
                Delete
            </button>
            </td>
            </tr>
            `))
        
    });

    table.innerHTML += tableHtml;
    
    
    data.forEach((val, key) => {
        const viewBtn = document.getElementById(`view-btn-${key}`);
        viewBtn.addEventListener('click', function () {
                resItemId(val, key);
        });
    });
    data.forEach((val, key) => {
        const delBtn = document.getElementById(`delete-btn-${key}`);
        delBtn.addEventListener('click', function () {
            deleteItem(val);
        });
    });
    
    
}


async function resItemId(data, key){
    // console.log(key)
    // console.log(data._id)
    try {
        const res = await axios.get(`https://developer-examination-api.onrender.com/api/get_item_by_id/${data._id}`)
        console.log(res)
        const resdata = res.data
        console.log({status:'200', message:'OK', data: resdata})
        nameInput.value = resdata.name
        priceInput.value = resdata.price 
        qtyInput.value = resdata.quantity
        descInput.value = resdata.desc
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }
    

    const savechanges = document.getElementById('savechanges')
    savechanges.addEventListener('click', function(){
        updateItem(data, key)
    })

}

async function deleteItem(data){
    try {
        await axios.delete(`https://developer-examination-api.onrender.com/api/del/id/${data._id}`)
        console.log("item id:" + data._id + "has been deleted!")
        alert("Item deleted! Pls refresh the Page")     
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }
    // console.log("delete" + key)
}




async function updateItem(val, key){
    try {
        const updatelist = await axios.put(`https://developer-examination-api.onrender.com/api/update_item/id/${val._id}`, {
        name: nameInput.value,
        price: priceInput.value,
        quantity: qtyInput.value,
        desc: descInput.value,
    })
    console.log({status:'200', message:'OK'})
    console.log(updatelist)
    alert("Item updated! Pls refresh the Page")
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }
        

    // console.log(val._id)
    // console.log(key)
}


const handleCreate = async () =>{
    const name = document.getElementById("name").value;
    const price = document.getElementById('price').value;
    const qty = document.getElementById('qty').value;
    const desc = document.getElementById('desc').value;

    // console.log(name, price, qty, desc)
    try {
        const res = await axios.post('https://developer-examination-api.onrender.com/api/insert_item/', {
            name: name,
            price: price,
            qty: qty,
            desc: desc,
        })
        console.log(res)
        console.log({status: '200', message:'OK'})
        alert("New Item Add!! Pls refresh the Page")
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }
        

    document.getElementById("name").value = '';
    document.getElementById("price").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("desc").value = '';
}



