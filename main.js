const form = document.querySelector('.new_form');
const itemList = document.querySelector('.itemList');
const input = document.querySelector('.footer_input');
let items = JSON.parse(localStorage.getItem('items')) || [];

function isCompleted(event) {
    if (!event.target.matches('input')) return;
    const el = event.target;
    const index = el.dataset.index;
    items[index].complete = !items[index].complete;
    localStorage.setItem('items', JSON.stringify(items));
    createItem(items, itemList);
}

function deleteItem(event) {
    if (!event.target.matches('button')) return;
    const li = event.target.parentElement;
    const id = li.id;
    li.remove();
    items.splice(id, 1); 
    alert('삭제완료');
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(event) {
    event.preventDefault();
    const text = input.value;
    const item = {
        text,
        complete: false,
    }
    items.push(item);
    createItem(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
    input.value = '';
    input.focus();
    const li = itemList.lastElementChild;
    li.scrollIntoView({block: 'center'});
}

function createItem(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li class="item_row" id="${i}">
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.complete ? 'checked' : ' '} />
                <label for="item${i}">${plate.text}</label>
                <button class="item_delete" id="${i}">❌</button>
            </li>
            `;
        }).join('');
}

form.addEventListener('submit', addItem);
itemList.addEventListener('click', isCompleted);
itemList.addEventListener('click', deleteItem);
createItem(items, itemList);