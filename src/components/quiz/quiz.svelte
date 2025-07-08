<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { cn } from "$lib/utils";
  import type { ModalInstance } from "@mateothegreat/svelte5-modal-manager";
  import QuizCompleted from "./completed.svelte";
  import QuizControls from "./controls.svelte";
  import QuizProgress from "./progress.svelte";
  import QuizQuestion from "./question.svelte";
  import { quiz } from "./quiz";
  import QuizReview from "./review.svelte";
  import QuizTimer from "./timer.svelte";

  let {
    instance,
    config = instance.props.config,
    onComplete,
    onRetake,
    class: className,
    ...rest
  }: {
    instance: ModalInstance<quiz.ModalConfig>;
    config: quiz.Config;
    onComplete?: (result: quiz.Result) => void;
    onRetake?: () => void;
    class?: string;
  } = $props();

  let currentQuestionIndex = $state(0);
  let answers = $state<Record<string, any>>({});
  let quizState = $state<"active" | "completed" | "review">("active");
  let showHint = $state(false);
  let showFeedback = $state(false);
  let selectedAnswer = $state<any>(null);
  let startTime = $state(Date.now());
  let attempts = $state(1);

  const currentQuestion = $derived(config.questions[currentQuestionIndex]);

  const handleAnswerSelect = (answer: any) => {
    selectedAnswer = answer;
    answers[currentQuestion.id] = answer;
  };

  const handleNextQuestion = () => {
    if (showFeedback) {
      showFeedback = false;
      selectedAnswer = null;
      showHint = false;

      if (currentQuestionIndex < config.questions.length - 1) {
        currentQuestionIndex += 1;
      } else {
        handleQuizComplete();
      }
    } else {
      showFeedback = true;
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex -= 1;
      showFeedback = false;
      selectedAnswer = answers[config.questions[currentQuestionIndex - 1].id] || null;
      showHint = false;
    }
  };

  const handleQuizComplete = () => {
    const correctAnswers = config.questions.reduce((count, question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / config.questions.length) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const passed = score >= config.passingScore;

    const result: quiz.Result = {
      score,
      totalQuestions: config.questions.length,
      correctAnswers,
      timeSpent,
      passed,
      answers
    };

    quizState = "completed";
    onComplete?.(result);
  };

  const handleRetake = () => {
    if (attempts < config.maxAttempts) {
      currentQuestionIndex = 0;
      answers = {};
      quizState = "active";
      showHint = false;
      showFeedback = false;
      selectedAnswer = null;
      attempts += 1;
      startTime = Date.now();
    }
    onRetake?.();
  };

  const isAnswerCorrect = (questionId: string, answer: any) => {
    const question = config.questions.find((q) => q.id === questionId);
    return question?.correctAnswer === answer;
  };
</script>

<Card class={cn(instance.config.dialog.class, className)}>
  {#if quizState === "active"}
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>{config.title}</CardTitle>
          <p class="text-muted-foreground">{config.description}</p>
        </div>
        {#if config.timeLimit}
          <QuizTimer timeLimit={config.timeLimit} onTimeUp={handleQuizComplete} />
        {/if}
      </div>
      <QuizProgress current={currentQuestionIndex + 1} total={config.questions.length} />
    </CardHeader>
    <CardContent class="space-y-6">
      <QuizQuestion
        question={currentQuestion}
        {selectedAnswer}
        {showFeedback}
        {showHint}
        onAnswerSelect={handleAnswerSelect}
        onHintToggle={() => (showHint = !showHint)} />
      <QuizControls
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        {showFeedback}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === config.questions.length - 1}
        isAnswerSelected={selectedAnswer !== null} />
    </CardContent>
  {:else if quizState === "completed"}
    <QuizCompleted
      {config}
      {answers}
      {attempts}
      onRetake={handleRetake}
      onReview={() => (quizState = "review")} />
  {:else if quizState === "review"}
    <QuizReview {config} {answers} onBack={() => (quizState = "completed")} {isAnswerCorrect} />
  {/if}
</Card>
