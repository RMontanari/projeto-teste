// Your JavaScript functionality can be added here.
// For now, let's just add some basic functionality for demonstration.
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert(`Button ${button.innerText} clicked!`);
        });
    });
});

const list = document.querySelectorAll(".list");
function activeLink(){
    list.forEach((item) => 
    item.classList.remove("active"));
    this.classList.add("active");
}

list.forEach((item) => 
    item.addEventListener('click', activeLink));

const content = document.querySelector('.content');
let scrollPosition = 0;

function scrollUp() {
    scrollPosition -= 50; // Altere conforme necessário
    content.scrollTo({ top: scrollPosition, behavior: 'smooth' });
}

function scrollDown() {
    scrollPosition += 50; // Altere conforme necessário
    content.scrollTo({ top: scrollPosition, behavior: 'smooth' });
}