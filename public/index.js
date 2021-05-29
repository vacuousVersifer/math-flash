$(document).ready(() => {
    // Header Wrapper
    const header_wrapper = $("#header_wrapper")
    const header_text = $("#header_text")

    // Main Wrapper
    const main_wrapper = $("#main_wrapper")

    // Question Wrapper
    const question_wrapper = $("#question_wrapper");
    const question_text = $("#question_text")

    // Answer Wrapper
    const answer_wrapper = $("#answer_wrapper");
    const answer_form = $("#answer_form");
    const answer_input = $("#answer_input");

    // Buttons
    const button_names = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "clear", "back"]
    let buttons = new Array(button_names.length);

    for(let i = 0; i < buttons.length; i++) {
        buttons[i] = $(`#${button_names[i]}_button`)
    }

    // Responce Wrapper
    const responce_wrapper = $("#responce_wrapper");
    const responce_text = $("#responce_text");
    const responce_total = $("#responce_total");
    const responce_right = $("#responce_right");
    const responce_wrong = $("#responce_wrong");
    responce_total.val(0)
    responce_right.val(0)
    responce_wrong.val(0)

    // Status Constants
    const INIT = "init";
    const MAKING_QUESTION = "making_question"
    const QUESTION_ACTIVE = "question_active"

    // Status
    let status = INIT

    // Current Question
    let question;
    
    game_loop()

    function game_loop() {
        status = MAKING_QUESTION
        question = make_question();

        question_text.html(`${question.a} * ${question.b} = ???`)
        status = QUESTION_ACTIVE
    }

    function make_question() {
        let a = Math.floor((Math.random() * 12) + 1);
        let b = Math.floor((Math.random() * 12) + 1);
        let ans = a * b;

        return {
            a, b, ans
        }
    }
    
    answer_form.submit(e => {
        e.preventDefault()

        if(status === QUESTION_ACTIVE) {
            let answer = answer_input.val()

            if(question.ans === parseInt(answer)) {
                responce_text.html("You did it!")

                responce_total.html(parseInt(responce_total.html()) + 1)

                answer_input.val("")
                game_loop()
            } else {
                responce_text.html("Not quite!")

                answer_input.val("")
            }
        } else {
            console.log("The game is not in the right state!")
        }
    })

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].click(() => {
            let val = i + 1;

            switch(val) {
                case 10:
                    add_digit(0)
                    break;
                case 11: 
                    clear_digit()
                    break;
                case 12:
                    remove_digit()
                    break;
                default:
                    add_digit(val)
                    break;
            }
        })
    }

    function add_digit(val) {
        answer_input.val(answer_input.val() + val)
    }

    function clear_digit() {
        answer_input.val("")
    }

    function remove_digit() {
        answer_input.val(answer_input.val().substring(0, answer_input.val().length-1))
    }
})