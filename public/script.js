const db = firebase.database();
const data = db.ref('docs/')


function createToDo(){
    let title = document.getElementById('create-Todo-Title');
    let content = document.getElementById('todo-text');
    create(title.value,content.value);

    title.value = ''
    content.value = ''
}

function deleteTodo(){
    alert('test ok');
}


//renderiza um to-do
function renderToDo(title,content,id){
    let listContainer = document.getElementById('list');
    
    //cria elementos
    let todo = document.createElement('div');
    let todoTitle = document.createElement('h3');
    let todoContent = document.createElement('p');
    let btn = document.createElement('button');
    let btnEdit = document.createElement('button');
    

    //atribui as classes individualmente aos elementos
    todo.className ='todo-item';
    todoTitle.className = 'todo-title';
    todoContent.className = 'todo-content';
    btn.className = 'btn'
    btnEdit.className = 'btn'
    todo.id = id
    
    //preenche os elementos
    todoTitle.innerText = title;
    todoContent.innerHTML = content;
    btn.innerHTML = 'Excluir';
    btnEdit.innerHTML = 'Editar';

    //atribui a função deletarTodos no botão
    btn.onclick = deleteInDB
    btnEdit.onclick = update
        

    //adiciona os elementos no todo-item
    todo.appendChild(todoTitle);
    todo.appendChild(todoContent);
    todo.appendChild(btnEdit);
    todo.appendChild(btn);

    //adiciona todo-item no list de todos
    listContainer.appendChild(todo);

}

//Operações no firebase 

//Create
async function create (title,content){
    if(title.length === 0){
        title = 'untitled';
    }
    
    await data.push({
        title,
        content,
    });

    window.scrollTo(0,document.body.scrollHeight)

}

// Read
async function read (){

    await data.on("child_added",snap =>{
       let results = snap.val();
        
       renderToDo(results.title,results.content,snap.key);
    })
}

//Update
async function update(){
    const thisElement = this.parentElement;
    const id = thisElement.id
    const todoItem = document.querySelector(`#${id}`)
    
    let title = document.querySelector(`#${id} .todo-title`);
    let content = document.querySelector(`#${id} .todo-content`)

    let inputTitle = document.createElement('input')
    let inputContent = document.createElement('input')

    inputTitle.value = title.innerHTML;
    inputContent.value = content.innerHTML;
    
    todoItem.appendChild(inputTitle);
    todoItem.appendChild(inputContent);

    title.remove();
    content.remove();

}

//Delete
async function deleteInDB(){
    const thisElement = this.parentElement;
    const id = thisElement.id

    let ref = db.ref('docs/'+id)
    let todo_item = document.getElementById(`${id}`);

    await ref.remove();
    todo_item.remove();
}


