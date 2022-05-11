
import Foundation
struct QuizBrain {
    let quiz = [Question(q: "English is one of the official languages of the Philippines. ", a: "True"),
                Question(q: "Nepal is the only country in the world without a rectangular flag. ", a: "True"),
                Question(q: "The total surface area of two human lungs is approximately 70 square metres.", a: "True"),
                Question(q: "Bananas are curved due to their upward growth toward the light.", a: "True"),
                Question(q: "Spaghetto is the singular form of the word spaghetti.", a: "True"),
                Question(q: "The moon is wider than Australia. ", a: "True"),
                Question(q: "The first Disney princess was Cinderella.", a: "False"),
                Question(q: "Google was originally called 'Backrub'.", a: "True"),
                Question(q: "The longest river in the world is the Nile River. ", a: "True"),
                Question(q: "In the famous movie Harry Potter, Draco Malfoy doesn’t have a sibling.", a: "False"),
                Question(q: "No piece of square dry paper can be folded in half more than 7 times.", a: "False"),
                Question(q: "Seahorses have stomachs, which aid in the digestion of food.", a: "False")
]
    var questionNumber=0
    var score=0
    mutating func checkAnswer(_ userAnswer: String)->Bool{
        if userAnswer==quiz[questionNumber].answer{
            score+=1
            return true
        }else{
            return false
        }
    }
    func getScore()->Int
    {
        return score
    }
    func getQuestionText()->String{
        return quiz[questionNumber].text
    }
    func getProgress()->Float{
        let progress=Float(questionNumber+1)/Float(quiz.count)
        return progress
    }
    
    mutating func nextQuestion()
    {
        if questionNumber+1<quiz.count{
            questionNumber+=1
            
        }
        else{
            questionNumber=0
            score=0
        }
    }
    
}
