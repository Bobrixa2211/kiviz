let variation = document.querySelectorAll('.var')
let primer = document.querySelector('.primer')
let knStart = document.querySelector('.btn-start')
let txtStart = document.querySelector('.txt-primechanie')
let glDisplay = document.querySelector('.gl-display')
let stDisplay = document.querySelector('.start-display')
let three = document.querySelector('.three')
let two = document.querySelector('.two')
let one = document.querySelector('.one')
let input = document.querySelector('input')
let time = document.querySelector('.time')
let score_question = 0
let cool_question = 0

input.addEventListener('click', function(){
    time.innerHTML = input.value
})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
let massiv_sign = ['+', '-', '*', '/']
function getRandomSign() {
    return massiv_sign[randint(0, 3)]
}
  
class Question{
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+'){
            this.true_var = a + b
        }
        else if (sign == '-'){
            this.true_var = a - b
        }
        else if (sign == '*'){
            this.true_var = a * b
        }
        else if (sign == '/'){
            this.true_var = Math.round(a / b)
        }
        this.answers = [
            randint(this.true_var - 15, this.true_var - 1),
            randint(this.true_var - 15, this.true_var - 1),
            this.true_var,
            randint(this.true_var - 15, this.true_var - 1),
            randint(this.true_var - 15, this.true_var - 1),
        ]
        shuffle(this.answers)
    }
    display(){
        primer.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1)
        {
            variation[i].innerHTML = this.answers[i]
        }
    }
}

let question_now = new Question()


question_now.display()

for (let i = 0; i < variation.length; i += 1) {
    variation[i].addEventListener('click', function(){
        
        if (variation[i].innerHTML == question_now.true_var)
        {
            variation[i].style.backgroundColor = 'greenyellow'
            anime({
                targets: variation[i],
                background: '#FFFFFF',
                duration: 2000
            })
            cool_question += 1
        }
        else {
            variation[i].style.backgroundColor = 'red'
            anime({
                targets: variation[i],
                background: '#FFFFFF',
                duration: 2000
            })
        }
        
        score_question += 1
        question_now = new Question()
        question_now.display()
    })
}
knStart.addEventListener('click', function(){
    stDisplay.style.display = 'none';
    three.style.display = 'flex';
    setTimeout(function(){
        three.style.display = 'none';
        two.style.display = 'flex';
        setTimeout(function(){
            two.style.display = 'none';
            one.style.display = 'flex';
            setTimeout(function(){
                glDisplay.style.display = 'flex';
                one.style.display = 'none';
                setTimeout(function(){
                    alert(`Вы дали ${cool_question} правильных ответов из ${score_question}, точность - ${Math.round(cool_question / score_question * 100)}%`)
                    stDisplay.style.display = 'flex';
                    glDisplay.style.display = 'none';
                    cool_question = 0;
                    score_question = 0;
                }, Number(time.innerHTML) * 1000)
            }, 1000)
        }, 1000)
    }, 1000)
})
