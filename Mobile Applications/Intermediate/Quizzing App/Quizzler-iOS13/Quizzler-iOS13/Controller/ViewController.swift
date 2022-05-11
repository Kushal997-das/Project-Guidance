
import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var scoreLabel: UILabel!
    @IBOutlet weak var questionLabbel: UILabel!
    @IBOutlet weak var progressBar: UIProgressView!
    @IBOutlet weak var trueButton: UIButton!
    @IBOutlet weak var falseButton: UIButton!
    
    var quizBrain=QuizBrain()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
updateUI()
    }

    @IBAction func answerButtonPressed(_ sender: UIButton) {
        let userAnswer=sender.currentTitle!
        let userGotItRight=quizBrain.checkAnswer(userAnswer)
        
        if userGotItRight{
            sender.backgroundColor=UIColor.green
        }
        else
        {
            sender.backgroundColor=UIColor.red
        }
        quizBrain.nextQuestion()
        updateUI()
        
    }
    func updateUI()
    {
        questionLabbel.text=quizBrain.getQuestionText()
        trueButton.backgroundColor=UIColor.clear
        falseButton.backgroundColor=UIColor.clear
        progressBar.progress=quizBrain.getProgress()
        scoreLabel.text = "Score: \(quizBrain.getScore())"
        
    }
    
}

