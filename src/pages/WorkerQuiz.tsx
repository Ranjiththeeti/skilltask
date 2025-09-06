import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, ArrowLeft, Trophy } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  skill: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const WorkerQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const skills = location.state?.skills || ["Painting"];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Sample questions database
  const allQuestions: Question[] = [
    // Painting Questions
    {
      id: 1,
      skill: "Painting",
      question: "What is the first step before painting a wall?",
      options: ["Apply paint directly", "Clean and prepare the surface", "Apply the topcoat", "Mix colors"],
      correctAnswer: 1
    },
    {
      id: 2,
      skill: "Painting",
      question: "Which type of paint is best for high-moisture areas like bathrooms?",
      options: ["Oil-based paint", "Water-based paint", "Semi-gloss or gloss paint", "Flat paint"],
      correctAnswer: 2
    },
    {
      id: 3,
      skill: "Painting",
      question: "What tool is best for painting corners and edges?",
      options: ["Roller", "Spray gun", "Angled brush", "Sponge"],
      correctAnswer: 2
    },
    
    // Plumbing Questions
    {
      id: 4,
      skill: "Plumbing",
      question: "What should you do first when a pipe is leaking?",
      options: ["Call a plumber", "Turn off the main water supply", "Use tape to fix it", "Ignore it"],
      correctAnswer: 1
    },
    {
      id: 5,
      skill: "Plumbing",
      question: "Which tool is essential for tightening pipe fittings?",
      options: ["Hammer", "Screwdriver", "Pipe wrench", "Pliers"],
      correctAnswer: 2
    },
    
    // Cleaning Questions
    {
      id: 6,
      skill: "Cleaning",
      question: "What is the safest way to clean glass surfaces?",
      options: ["Use abrasive cleaners", "Use newspaper and vinegar solution", "Use steel wool", "Use hot water only"],
      correctAnswer: 1
    },
    {
      id: 7,
      skill: "Cleaning",
      question: "Which cleaning method is best for wooden furniture?",
      options: ["Soak with water", "Use gentle wood cleaner with soft cloth", "Use bleach", "Use scrubbing brush"],
      correctAnswer: 1
    },
    
    // Tutoring Questions
    {
      id: 8,
      skill: "Tutoring",
      question: "What is the most important quality for effective tutoring?",
      options: ["Speaking loudly", "Being patient and understanding", "Teaching fast", "Giving many examples"],
      correctAnswer: 1
    },
    {
      id: 9,
      skill: "Tutoring",
      question: "How should you handle a student who is struggling with a concept?",
      options: ["Move to next topic", "Explain the same way repeatedly", "Try different teaching methods", "Give up"],
      correctAnswer: 2
    },
    
    // Electrical Work Questions
    {
      id: 10,
      skill: "Electrical Work",
      question: "What is the first safety step before any electrical work?",
      options: ["Wear gloves", "Turn off power at the breaker", "Use insulated tools", "Call supervisor"],
      correctAnswer: 1
    }
  ];

  // Filter questions based on selected skills
  const relevantQuestions = allQuestions.filter(q => skills.includes(q.skill));
  const questionsToShow = relevantQuestions.slice(0, 5); // Show 5 questions

  const currentQuestion = questionsToShow[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questionsToShow.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an Answer",
        description: "Please select an answer before continuing",
        variant: "destructive"
      });
      return;
    }

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questionsToShow.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      // Calculate score
      const correctCount = newAnswers.reduce((count, answer, index) => {
        return answer === questionsToShow[index].correctAnswer ? count + 1 : count;
      }, 0);
      
      setScore(correctCount);
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    const passed = score >= Math.ceil(questionsToShow.length * 0.6); // 60% pass rate
    
    if (passed) {
      toast({
        title: "Congratulations! 🎉",
        description: "You are now a verified worker! Start receiving job notifications.",
        variant: "default"
      });
      navigate("/worker/dashboard");
    } else {
      toast({
        title: "Quiz Not Passed",
        description: "You can retake the quiz after 24 hours to get verified",
        variant: "destructive"
      });
      navigate("/worker/profile");
    }
  };

  if (questionsToShow.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Questions Available</h2>
            <p className="text-muted-foreground mb-4">
              Questions for your selected skills are not available yet.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="w-full bg-white/90 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Skill Verification Quiz
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <Card className="shadow-card border-0">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="text-sm">
                    Question {currentQuestionIndex + 1} of {questionsToShow.length}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {currentQuestion.skill}
                  </Badge>
                </div>
                <Progress value={progress} className="mb-4" />
                <CardTitle className="text-xl text-primary">
                  {currentQuestion.question}
                </CardTitle>
                <CardDescription>
                  Select the best answer from the options below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  onClick={handleNext} 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedAnswer}
                >
                  {currentQuestionIndex < questionsToShow.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Results Screen
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  {score >= Math.ceil(questionsToShow.length * 0.6) ? (
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl text-primary">
                  Quiz Complete!
                </CardTitle>
                <CardDescription>
                  Here are your results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {score}/{questionsToShow.length}
                  </div>
                  <p className="text-muted-foreground">
                    {Math.round((score / questionsToShow.length) * 100)}% Score
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Skills Tested:</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {score >= Math.ceil(questionsToShow.length * 0.6) ? (
                  <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 text-success mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Congratulations! You Passed!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You are now a verified worker and will receive job notifications for your skills.
                    </p>
                  </div>
                ) : (
                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 text-destructive mb-2">
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">Quiz Not Passed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You need at least 60% to pass. You can retake the quiz after 24 hours.
                    </p>
                  </div>
                )}

                <Button onClick={handleFinish} variant="hero" size="lg" className="w-full">
                  Continue to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerQuiz;