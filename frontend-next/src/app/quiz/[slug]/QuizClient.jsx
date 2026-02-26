'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { quizData } from '@/data/quiz-mock';
import Link from 'next/link';

export default function QuizClient() {
  const quiz = quizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelect = (id) => {
    if (isAnswered) return;
    setSelectedOption(id);
    const correct = id === currentQuestion.correctId;
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) return;
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <main className="bg-void-black min-h-screen text-paper flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10">
         <motion.div 
            className="h-full bg-volt"
            animate={{ width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%` }}
         />
      </div>

      <div className="max-w-2xl w-full relative z-10">
         <header className="mb-12 text-center">
            <span className="text-xs font-mono text-muted uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
               Knowledge Check
            </span>
            <div className="mt-8 text-sm font-mono text-muted">
               Question 0{currentQuestionIndex + 1} / 0{quiz.questions.length}
            </div>
         </header>

         <AnimatePresence mode="wait">
            <motion.div
               key={currentQuestion.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
            >
               <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-center leading-tight">
                  {currentQuestion.text}
               </h2>

               <div className="grid gap-4 mt-8">
                  {currentQuestion.options.map((option) => (
                     <motion.button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        className={clsx(
                           "p-6 text-left border rounded-lg transition-all duration-300 relative overflow-hidden group font-mono",
                           isAnswered && selectedOption === option.id
                              ? isCorrect 
                                 ? "bg-volt border-volt text-void-black" 
                                 : "bg-red-500 border-red-500 text-white"
                              : "bg-void-black border-white/10 hover:border-white/30"
                        )}
                     >
                        <div className="flex items-center justify-between relative z-10">
                           <span>{option.text}</span>
                           {isAnswered && selectedOption === option.id && (
                              isCorrect 
                                 ? <CheckCircle className="w-5 h-5" /> 
                                 : <XCircle className="w-5 h-5" />
                           )}
                        </div>
                     </motion.button>
                  ))}
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Feedback / Next Actions */}
         <AnimatePresence>
            {isAnswered && (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 text-center"
               >
                  {isCorrect ? (
                     isLastQuestion ? (
                        <Link href="/roadmap/full-stack-ai" className="inline-flex items-center px-8 py-4 bg-white text-void-black font-mono font-bold uppercase tracking-wide hover:bg-volt transition-colors">
                           Complete Module <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                     ) : (
                        <button onClick={nextQuestion} className="inline-flex items-center px-8 py-4 bg-volt text-void-black font-mono font-bold uppercase tracking-wide hover:opacity-90 transition-opacity">
                           Next Question <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                     )
                  ) : (
                     <button onClick={() => { setSelectedOption(null); setIsAnswered(false); }} className="inline-flex items-center px-8 py-4 bg-transparent border border-white/20 text-white font-mono font-bold uppercase tracking-wide hover:border-white transition-colors">
                        Try Again
                     </button>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </main>
  );
}
