//import questions from '../questions.js';
//console.log(questions[0]);
document.addEventListener('DOMContentLoaded',function(){
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal'); 
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal =  document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    const firebaseConfig = {
        apiKey: "AIzaSyBVrgzd14S6H21E30gHE7q3cEe1ehqWzE4",
        authDomain: "quizgame-aa16f.firebaseapp.com",
        databaseURL: "https://quizgame-aa16f-default-rtdb.firebaseio.com",
        projectId: "quizgame-aa16f",
        storageBucket: "quizgame-aa16f.appspot.com",
        messagingSenderId: "15317155603",
        appId: "1:15317155603:web:611b97b8d4f523076664e6",
        measurementId: "G-5F735YPN1R"
      };
    firebase.initializeApp(firebaseConfig);

    const getData = () => {
        formAnswers.textContent = 'LOAD'
        nextButton.classList.add('d-none')
         prevButton.classList.add('d-none')
         
         setTimeout(() => {
            firebase.database().ref().child('questions').once('value')
            .then(snap => playTest(snap.val()))
         },1000)
    }

    btnOpenModal.addEventListener('click',()=>{
        getData();
        modalBlock.classList.add('d-block');
        
    });

    closeModal.addEventListener('click',()=>{
        modalBlock.classList.remove('d-block');
    });

    const playTest = (questions)=>{
        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer)    =>  {
                const answerItem= document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
                </label>
                </div>
                `;
                formAnswers.appendChild(answerItem);
            });
        ;}

        const renderQuestions = (indexQuestion)=>{
            formAnswers.innerHTML = ``;

            if(numberQuestion >= 0 && numberQuestion <= questions.length -1 ){
                questionTitle.textContent = `${questions[indexQuestion].question}`
                renderAnswers(indexQuestion);
                    
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none')
                sendButton.classList.add('d-none')
            };

            switch(true){

                case numberQuestion === 0:
                    prevButton.classList.add('d-none')
                break;

                case numberQuestion === questions.length:
                    nextButton.classList.add('d-none')
                    prevButton.classList.add('d-none')
                    sendButton.classList.remove('d-none')
    
                    formAnswers.innerHTML= `
                    <div class="form-group">
                        <label for="numberPhone">Enter your number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                    `
                break;
                case numberQuestion === questions.length + 1:
                    formAnswers.textContent = 'Спасибо за пройденный тест!';
                    questionTitle.innerText = '';
                    sendButton.classList.add('d-none');
                    setTimeout(
                    () => {
                        modalBlock.classList.remove('d-block')
                    },2000);

                break;
                default:
                   // console.log('Something went wrong!');
            };
        };


        renderQuestions(numberQuestion);

        const checkAnswer = ()  =>{
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')
            inputs.forEach((input, index) => {
                switch(true){

                    case numberQuestion >= 0 && numberQuestion <= questions.length -1:
                        obj [`${index}_${questions[numberQuestion].question}`] = input.value
                    break;

                    case numberQuestion === questions.length:
                        obj [`Номер телефона`] = input.value
                    break;

                    default:
                        //console.log('Something went wrong!');
                }
        });
            finalAnswers.push(obj)
        };

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++
            renderQuestions(numberQuestion);
        };

        prevButton.onclick = () => {
            numberQuestion--
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {
            checkAnswer();          
            numberQuestion++
            renderQuestions(numberQuestion);
            firebase
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers)
        };

    };
});



