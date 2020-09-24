const db = firebase.database();
const data = db.ref('docs/')

function createToDo(){
    const title = document.getElementById('create-Todo-Title').value;
    const content = document.getElementById('todo-text').value;
    create(title,content);
    //renderToDo(title,content);
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

    //atribui as classes individualmente
    todo.className ='todo-item';
    todoTitle.className = 'todo-title';
    todoContent.className = 'todo-content';
    btn.className = 'btn'
    todo.id = id
    
    //add conteudo nelas
    todoTitle.innerText = title;
    todoContent.innerHTML = content;
    btn.innerHTML = 'Excluir';
    btn.onclick = deleteInDB
        

    //adiciona elas no todo-item
    todo.appendChild(todoTitle);
    todo.appendChild(todoContent);
    todo.appendChild(btn);

    //adiciona todo-item no list
    listContainer.appendChild(todo);


    // <div class = 'todo-item'>
    //     <h3 class = 'todo-title'>Um todo com nome inesquecível</h3>
    //     <p class = 'todo-content'>Uma lamentação bem grande pois estou sem criatividade no momento</p>
    // </div>
    
}

//Database CRUD no Firebase

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

async function read (){

    data.on("child_added",snap =>{
       let results = snap.val();
        
       renderToDo(results.title,results.content,snap.key);
    })
}

async function deleteInDB(){
    let thisElement = this.parentElement;
    let id = thisElement.id
    let ref = db.ref('docs/'+id)
    let todo_item = document.getElementById(`${id}`);

    await ref.remove();
    todo_item.remove();

}

async function update(){
    return alert();
}

