const questions = [
    {
        question:"who discovered computer?",
        answer: [
            {
                text:"konrad Zuse",correct:false
            },
            {
                text:"Recharles",correct:false
            },
            {
                text:"Alan Turing",correct:false
            },
            {
                text:"charles Babbage",correct:true
            },

        ]
    },
    {
        question:"which language is make html pages interactive ",
        answer:[
            {
                text:"javascript",correct:true
            },
            {
                text:"css",correct:false
            },
            {
                text:"html",correct:false
            },
            {
                text:"none of these",correct:false
            },

        ]
    },
    {
    question:"who founded javascript?",
        answer:[
            {
                text:"james Gosling",correct:false
            },
            {
                text:"Brendan Eich",correct:true
            },
            {
                text:"Zu do Van dan Russan",correct:false
            },
            {
                text:"patric Naughton",correct:false
            },

        ]
    },
    {
        question:"what is FulForm DRDO?",
        answer:[
            {
                text:"Defence research demand organizaton",correct:false
            },
            {
                text:"Defence research development organizaton",correct:true
            },
            {
                text:"development research demand organizaton",correct:false
            },
            {
                text:"None of These",correct:false
            },

        ]
    }

];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer");
const nextButton=document.getElementById("nextbut");

let currentquestionindex=0;
let score=0;

function startquiz()
{
    currentquestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();

}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionNo=currentquestionindex+1;

    questionElement.innerHTML=questionNo+ "." +currentquestion.question;


    currentquestion.answer.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("but");

        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;

        }
        button.addEventListener("click",selectAnswer);
    });
} 

function resetstate()
{
    nextButton.style.display="none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedbut=e.target;
    const isCorrect=selectedbut.dataset.correct==="true";
    if(isCorrect)
    {
        selectedbut.classList.add("correct");
        score++;

    } 
    else{
        selectedbut.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");

        }
        button.disabled=true;

    });
    nextButton.style.display="block";

}
function showscore()
{
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length)
    {
        showquestion();

    }
    else{
        showscore();
    }
}

nextButton.addEventListener("click", ()=>
{
    if(currentquestionindex<questions.length)
    {
        handlenextbutton();

    }
    else{
        startquiz();
    }
});
startquiz();
