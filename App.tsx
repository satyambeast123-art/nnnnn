
import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { generateRoutine } from "./src/services/geminiService";
import { Option, QuizState } from './types';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(Option | undefined)[]>(Array(QUIZ_QUESTIONS.length).fill(undefined));
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setQuizState('quiz');
  };

  const handleReset = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(undefined));
    setResult('');
    setError(null);
  };

  const handleAnswerSelect = (option: Option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(async () => {
    setQuizState('loading');
    setError(null);
    try {
      const generatedResult = await generateRoutine(answers);
      setResult(generatedResult);
      setQuizState('result');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
      setQuizState('error');
    }
  }, [answers]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  const renderContent = () => {
    switch (quizState) {
      case 'start':
        return (
          <div className="text-center p-8 bg-slate-800 rounded-2xl shadow-2xl max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-4">Build a Better Routine</h1>
            <p className="text-slate-300 text-lg mb-8">
              Answer 10 confidential questions to receive a personalized, AI-generated routine designed to help you build self-discipline and healthier habits.
            </p>
            <button
              onClick={handleStart}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start the Quiz
            </button>
          </div>
        );
      case 'quiz':
        const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
        return (
          <div className="w-full max-w-3xl p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-indigo-300">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-100">{currentQuestion.text}</h2>
            {currentQuestion.subtext && <p className="text-slate-400 mb-6">{currentQuestion.subtext}</p>}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer?.id === option.id
                      ? 'bg-indigo-600 border-indigo-500 shadow-md'
                      : 'bg-slate-700 border-slate-600 hover:bg-slate-600/50 hover:border-indigo-500'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed hover:enabled:bg-indigo-500 shadow-lg"
              >
                {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Get My Routine' : 'Next'}
              </button>
            </div>
          </div>
        );
      case 'loading':
        return <LoadingSpinner />;
      case 'result':
        return (
          <div className="w-full max-w-3xl p-6 md:p-8 bg-slate-800 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4">Your Personalized Routine</h2>
            <div className="prose prose-invert prose-lg max-w-none bg-slate-900/50 p-6 rounded-lg whitespace-pre-wrap font-sans text-slate-200"
              dangerouslySetInnerHTML={{
                __html: result
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>')
                  .replace(/\n/g, '<br />')
              }}
            />
            <button
              onClick={handleReset}
              className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
          </div>
        );
      case 'error':
         return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-2xl shadow-2xl max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-red-400 mb-4">An Error Occurred</h2>
            <p className="text-slate-300 text-lg mb-8">{error}</p>
            <button
              onClick={handleReset}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-indigo-900/30 rounded-full blur-3xl -z-10"></div>
         {renderContent()}
      </div>
    </main>
  );
};

export default App;
