import questions from '../questions.js';
console.log(questions[0]);
document.addEventListener('DOMContentLoaded',function(){
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal'); 
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal =  document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

    btnOpenModal.addEventListener('click',()=>{
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click',()=>{
        modalBlock.classList.remove('d-block');
    });

    const playTest = ()=>{
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer)    =>  {
                const answerItem= document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
                </label>
                </div>
                `

                formAnswers.appendChild(answerItem)


            })
        }

        const renderQuestions = (indexQuestion)=>{
            formAnswers.innerHTML = ``;

            if(numberQuestion >= 0 && numberQuestion <= questions.length -1 ){

            questionTitle.textContent = `${questions[indexQuestion].question}`

            renderAnswers(indexQuestion);
                
            nextButton.classList.remove('d-none');
            prevButton.classList.remove('d-none')
            }

            if(numberQuestion === 0) {
                prevButton.classList.add('d-none')
            }

            if(numberQuestion === questions.length -1) {
                nextButton.classList.add('d-none')
            }

            
        }


        renderQuestions(numberQuestion);

        
        nextButton.onclick = () => {
            numberQuestion++
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--
            renderQuestions(numberQuestion);
        }

    };
});



