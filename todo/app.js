/*jshint esversion: 6 */

const divTodoList = document.querySelector( '.todo-list' );
const inputTodos = document.querySelector(' .new-todo' );
const btnEliminarCompletados = document.querySelector( '.clear-completed' );
const filtros = document.querySelector( '.filters' );
const claseFiltro = document.querySelectorAll( '.filtro' );

class Todo{

  constructor( tarea ){
    this.tarea = tarea;
    this.id = new Date().getTime();
    this.completado = false;
  }

}

class TodoList{

  constructor(){
    this.cargarLocalStorage();
  }

  nuevoTodo( todo ){
    this.todos.push( todo );

    this.guardarLocalStorage();
  }

  eliminarTodo( id ){
      this.todos = this.todos.filter( todo => todo.id != id );
      this.guardarLocalStorage();
  }

  completarTodo( id ){
      for ( const todo of this.todos ){
          if ( todo.id == id ){
            todo.completado = !todo.completado;
            this.guardarLocalStorage();
            break;
          }
      }
  }

  eliminarCompletados(){
    this.todos = this.todos.filter( todo => !todo.completado );
    this.guardarLocalStorage();
  }

  guardarLocalStorage(){
    localStorage.setItem( 'Todos', JSON.stringify( this.todos ) );
  }

  cargarLocalStorage(){
    this.todos = ( localStorage.getItem( 'Todos' ) ) ? this.todos = JSON.parse( localStorage.getItem( 'Todos' ) ) : [];
  }

}

const crearTarea = ( todo ) => {

   const item = `<li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
                   <div class="view">
                     <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
                     <label>${todo.tarea}</label>
                     <button class="destroy"></button>
                   </div>
                   <input class="edit" value="Create a TodoMVC template">
                 </li>`;

  const div = document.createElement( 'div' );

  div.innerHTML = item;

  divTodoList.append( div.firstElementChild );

  return div;

};

const listaTareas = new TodoList();

inputTodos.addEventListener( 'keyup', ( event ) => {

    if( event.keyCode == 13 && inputTodos.value.length > 0 ){

      const nuevaTarea = new Todo( inputTodos.value );

      listaTareas.nuevoTodo( nuevaTarea );

      crearTarea( nuevaTarea );

      inputTodos.value = '';

    }

});

listaTareas.todos.forEach( todo => crearTarea( todo ) );

divTodoList.addEventListener( 'click', () => {
  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoID = todoElemento.getAttribute( 'data-id' );

  if (nombreElemento.includes( 'input' ) ) {
    listaTareas.completarTodo( todoID );
    todoElemento.classList.toggle( 'completed' );
  } else if (nombreElemento.includes( 'button' ) ){
    listaTareas.eliminarTodo( todoID );
    divTodoList.removeChild( todoElemento );
  }
});

btnEliminarCompletados.addEventListener( 'click', ()=> {
  listaTareas.eliminarCompletados();
  for ( let i = divTodoList.children.length-1; i >= 0; i-- ) {
    const elemento = divTodoList.children[i];
    if( elemento.classList.contains( 'completed' ) ){
      divTodoList.removeChild( elemento );
    }
  }
} );

filtros.addEventListener( 'click', ( event ) => {
  const filtro = event.target.text;
    if ( !filtro ) return;
    claseFiltro.forEach( elemento => elemento.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' );
    for ( let elemento of divTodoList.children ) {
      elemento.classList.remove( 'hidden' );
      const completado = elemento.classList.contains( 'completed' );

      switch( filtro ){
        case 'Pendientes':
        if( completado ){
          elemento.classList.add( 'hidden' );
        }
        break;
        case 'Completados':
        if( !completado ){
          elemento.classList.add( 'hidden' );
        }
        break;
      }

    }
} );
