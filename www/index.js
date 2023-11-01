// let endpoint = 'http://128.199.80.110:12111';
const endpoint = axios.create({
    baseURL: 'https://developer-examination-api.onrender.com',
  });

$(document).ready(async function () {
    try {
        const res = await endpoint.get(`/api`);
        const resdata = await res.data;
        renderTable(resdata)

        console.log({status:'200', message:'OK', data: resdata})
      } catch (err) {
        console.log(err);
        console.log({ status: err.message, message: err.code });
      }
});


const renderTable = async (data) => {
    const table = document.getElementById("tbody");
    table.innerHTML = '';

    if(data){
        data.map((val, key) => {
            table.innerHTML += `
                    <tr key=${key} data-id=${val._id}>
                        <th>${key + 1}</th>
                        <td>${val.name}</td>
                        <td>${val.price}</td>
                        <td>${val.quantity}</td>
                        <td>
                        <button
                            type="button"
                            id="view-btn"
                            class="view-btn btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#justview"
                        >
                            view
                        </button>
                        <button
                            type="button"
                            id="edit-btn"
                            class="edit-btn btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                            edit
                        </button>
                        
                        </td>
                    </tr>
                    `
          });
        
          $('#restable').DataTable();
          table.addEventListener('click', function(e) {
            if (e.target.classList.contains('edit-btn')) {
                const editId = e.target.closest('tr').getAttribute('data-id');
                resItemId(editId);
              } 
            else if (e.target.classList.contains('view-btn')){
                const viewId = e.target.closest('tr').getAttribute('data-id');
                justview(viewId);
            }
          });
    }

  
};


const resItemId = async (data) => {
    console.log(data)
    var nameInput = document.getElementById("name-input");
    var priceInput = document.getElementById("price-input");
    var qtyInput = document.getElementById("qty-input");
    var descInput = document.getElementById("desc-input");
    // console.log(data._id)
    try {
        const res = await endpoint.get(`/api/get_item_by_id/${data}`)
        console.log(res)
        const resdata = await res.data
        console.log(resdata)
        console.log({status:'200', message:'OK', data: resdata})
        nameInput.value = resdata.name
        priceInput.value = resdata.price
        qtyInput.value = resdata.quantity
        descInput.value = resdata.description
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }

    const savechanges = document.getElementById('savechanges')
    savechanges.addEventListener('click',async function(){
        await updateItem(data)
    })

}

const justview = async (data) => {
    // console.log(key)
    // console.log(data._id)
    var nameView = document.getElementById("name-view");
    var priceView = document.getElementById("price-view");
    var qtyView = document.getElementById("qty-view");
    var descView = document.getElementById("desc-view");
    try {
        const res = await endpoint.get(`/api/get_item_by_id/${data}`)
        // console.log(res)
        const resdata = await res.data
        console.log({status:'200', message:'OK', data: resdata})
        nameView.value = resdata.name
        priceView.value = resdata.price
        qtyView.value = resdata.quantity
        descView.value = resdata.description
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }


}

// const deleteItem = async (data) => {
//     try {
//         await axios.delete(`http://localhost:4000/api/del/id/${data._id}`)
//         console.log("item id:" + data._id + "has been deleted!")
//         alert("Item deleted!")
//         window.location.reload();

//     } catch (err) {
//         console.log(err)
//         console.log({status:err.message, message:err.code})
//     }
//     // console.log("delete" + key)
// }

const updateItem = async (data) => {
    var nameInput = document.getElementById("name-input").value;
    var priceInput = document.getElementById("price-input").value;
    var qtyInput = document.getElementById("qty-input").value;
    var descInput = document.getElementById("desc-input").value;
    try {
        const updatelist = await endpoint.put(`/api/update_item/id/${data}`, {
        name: nameInput,
        price: priceInput,
        quantity: qtyInput,
        description: descInput,
    })
    console.log({status:'200', message:'OK'})
    console.log(updatelist)
    alert("Item updated!")
    window.location.reload();
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
        const res = await endpoint.post('/api/insert_item/', {
            name: name,
            price: price,
            qty: qty,
            description: desc,
        })
        // console.log(res)
        // console.log({status: '200', message:'OK'})
        alert("New Item Add!!")
        window.location.reload();
    } catch (err) {
        console.log(err)
        console.log({status:err.message, message:err.code})
    }

    document.getElementById("name").value = '';
    document.getElementById("price").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("desc").value = '';
}
