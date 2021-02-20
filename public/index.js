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

    // Responce Wrapper
    const responce_wrapper = $("#responce_wrapper");
    const responce_text = $("#responce_text");

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
                responce_text.html("Woot!")

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
})