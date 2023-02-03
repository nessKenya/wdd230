const userInput = document.getElementById("favchap");
const addChapterBtn = document.getElementById("addChapter");
const chapterList = document.getElementById("list");

addChapterBtn.addEventListener('click', function () {
  if(userInput.value !== "") {
    let liElement = document.createElement('li');
    let deleteBtn = document.createElement('button');
    
    liElement.innerHTML = userInput.value;
    deleteBtn.textContent = '❌';
    liElement.append(deleteBtn);

    chapterList.append(liElement);

    deleteBtn.addEventListener('click', function() {
      chapterList.removeChild(liElement);
    });
    
    userInput.focus();
    userInput.value = "";
  }
});