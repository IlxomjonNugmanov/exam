const $elid = document.querySelector('.student-id')
const $elname = document.querySelector('.student-name')
const $elmarkedDate = document.querySelector('.student-marked-date')
const $elstudentMark = document.querySelector('.student-mark')
const $elcount= document.querySelector('.count')
const $eladdForm = document.querySelector('#add-form')
const $eleditForm = document.querySelector('#edit-form')

const $elstudentsTable = document.querySelector('#students-table-body')
const $elstudentDeleteBtn = document.querySelector('#student-delete')

const $elstudentEditBtn = document.querySelector('.student-edit')
const $elstudentEditBtn2 = document.querySelector('.student-edit2')
const $elEditTd = document.querySelector('.edit_td')



const $elstudentEditName= document.querySelector('#edit-name')
const $elstudentEditLastname= document.querySelector('#edit-lastname')
const $elstudentEditMark = document.querySelector('#edit-mark')
const $elstudentTable = document.querySelector('#students-table-body')







$eladdForm.addEventListener('submit', (e)=>{
//   e.preventDefault()
    let { name, lastname, mark} = e.target.elements
    const data = {
      name: name.value,
      lastName: lastname.value,
      mark: Number(mark.value),
      markedDate: '2012-05-12'
    }
   
    const postData = JSON.stringify(data)
    async function addData(postData) {
        try {

            await fetch('http://167.235.158.238/students/', {
                method: 'POST',
                body: postData,
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            })
            render(await fetchData())
        } catch (error) {
            console.log(error.message);
        }
    }
    
    addData(postData)
})



async function render(arr) {

    $elcount.textContent=`Count: ${arr.length}`
    
    arr.forEach(element => {
        
        let eltr = document.createElement('tr')
        
        eltr.innerHTML = `
        <td class="py-3 text-center student-id">${element.id}</td>
          <td class="py-3 fw-bold student-name">${element.name} ${element.lastName}</td>
          <td class="py-3 student-marked-date">${element.markedDate}</td>
          <td class="py-3 text-center student-mark">${element.mark}</td>
          <td class="py-3 text-center">
          <p class="h5">
              <span class="badge rounded-pill student-pass-status"></span>
              </p>
          </td>
          <td class="py-3 text-center" id="edit_td">
              <button class="btn btn-outline-secondary student-edit" data-bs-toggle="modal" data-bs-target="#edit-student-modal"
             data-id="${element.id}" onclick="edit()">
                 <i class="fa-solid fa-pen" style="pointer-events: none;"></i>
              </button>
          </td>
            <td class="py-3 text-center">
            <button class="btn btn-outline-danger student-delete" data-id="${element.id}" onclick="deleteData(${element.id})">
              <i class="fa-solid fa-trash" style="pointer-events: none;"></i>
              </button>
              </td> `
          
       
        $elstudentsTable.append(eltr)


    });


}

async function updateData(id) {
    
    try {
        const postData = JSON.stringify(
            {
                name: $elstudentEditName.value,
                lastName: $elstudentEditLastname.value ,
                mark: $elstudentEditMark.value,
                markedDate: new Date(12-12-2022)
                
            }
        )
        await fetch(`http://167.235.158.238/students/${id}`, {
            method: 'PUT',
            body: postData,
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
        }).then(res =>console.log( res.status))

        render(await fetchData())
    } catch (error) {
        console.log(error.message);
    }
}
$elstudentTable.addEventListener("click", (evt)=> {
    if (evt.target.matches(".student-edit")) {
        const EditId = evt.target.dataset.id;
        console.log(EditId);
       
        $eleditForm.addEventListener('submit',(e)=>{
            e.preventDefault()
        
            updateData(EditId)
        })

    }
})

async function deleteData(id) {
    try {
        await fetch(`http://167.235.158.238/students/${id}`, {
            method: 'DELETE',
        });
        
        // render(await fetchData())
        
    } catch (error) {
        console.log(error.message);
    }
}

window.onload = async () => {
    render(await fetchData())
}


async function fetchData() {
    
    try {
        const response = await fetch(`http://167.235.158.238/students`)
        const body = await response.json()
        console.log(body);
        
        return body
    } catch (error) {
        console.log(error.message);
    }
}




