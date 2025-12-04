import { useState } from 'react';
import { ChildData } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from './ui/progress';

interface QuizActivityProps {
  childData: ChildData;
  onComplete: (activityType: string, xp: number, badges: string[], items: string[]) => void;
  onBack: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: 'What is 5 + 3?',
    options: ['6', '7', '8', '9'],
    correct: 2,
    emoji: '🔢',
  },
  {
    id: 2,
    question: 'Which one is a fruit?',
    options: ['Carrot', 'Apple', 'Potato', 'Onion'],
    correct: 1,
    emoji: '🍎',
  },
  {
    id: 3,
    question: 'What color is the sky?',
    options: ['Green', 'Red', 'Blue', 'Yellow'],
    correct: 2,
    emoji: '☁️',
  },
  {
    id: 4,
    question: 'How many legs does a spider have?',
    options: ['4', '6', '8', '10'],
    correct: 2,
    emoji: '🕷️',
  },
  {
    id: 5,
    question: 'What sound does a cat make?',
    options: ['Woof', 'Meow', 'Moo', 'Oink'],
    correct: 1,
    emoji: '🐱',
  },
];

export function QuizActivity({ childData, onComplete, onBack }: QuizActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const score = correctAnswers + (selectedAnswer === question.correct ? 1 : 0);
      const xpEarned = score * 20;
      const badges = score === quizQuestions.length ? ['Perfect Quiz!'] : [];
      onComplete('quiz', xpEarned, badges, []);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-xl text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-3 bg-gray-200" />

        {/* Question Card */}
        <Card className="p-8 bg-white rounded-3xl shadow-xl">
          <div className="space-y-8">
            {/* Question */}
            <div className="text-center space-y-4">
              <div className="text-7xl">{question.emoji}</div>
              <h2 className="text-3xl text-gray-800">{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                let buttonClass = 'h-20 text-2xl rounded-2xl border-4 transition-all';
                
                if (showFeedback) {
                  if (index === question.correct) {
                    buttonClass += ' bg-green-100 border-green-500 text-green-700';
                  } else if (index === selectedAnswer) {
                    buttonClass += ' bg-red-100 border-red-500 text-red-700';
                  } else {
                    buttonClass += ' border-gray-200 text-gray-400';
                  }
                } else {
                  buttonClass += ' border-purple-200 hover:border-purple-400 hover:bg-purple-50';
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showFeedback}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {option}
                      {showFeedback && index === question.correct && (
                        <CheckCircle2 className="w-6 h-6" />
                      )}
                      {showFeedback && index === selectedAnswer && index !== question.correct && (
                        <XCircle className="w-6 h-6" />
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <div className="text-center space-y-4">
                {selectedAnswer === question.correct ? (
                  <div className="space-y-2">
                    <div className="text-5xl">🎉</div>
                    <p className="text-2xl text-green-600">Awesome! You got it right!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-5xl">💪</div>
                    <p className="text-2xl text-orange-600">Good try! Keep learning!</p>
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl h-16 px-12 text-xl"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
