<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { CheckCircle2, RotateCcw, Target, Trophy, XCircle } from "lucide-svelte";
  import { quiz } from "./quiz";

  let {
    config,
    answers,
    attempts,
    onRetake,
    onReview
  }: {
    config: quiz.Config;
    answers: Record<string, any>;
    attempts: number;
    onRetake: () => void;
    onReview: () => void;
  } = $props();

  const correctAnswers = $derived(
    config.questions.reduce((count: number, question: quiz.Question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0)
  );

  const score = $derived(Math.round((correctAnswers / config.questions.length) * 100));
  const passed = $derived(score >= config.passingScore);

  function isAnswerCorrect(questionId: string, answer: any) {
    const question = config.questions.find((q: quiz.Question) => q.id === questionId);
    return question?.correctAnswer === answer;
  }
</script>

<CardHeader class="text-center">
  {#if passed}
    <Trophy class="mx-auto h-16 w-16 text-yellow-500" />
  {:else}
    <Target class="mx-auto h-16 w-16 text-blue-500" />
  {/if}
  <CardTitle class="text-2xl">
    {passed ? "Congratulations!" : "Quiz Complete"}
  </CardTitle>
  <p class="text-muted-foreground">
    {passed ? "You've successfully passed the quiz!" : "Keep practicing to improve your score!"}
  </p>
</CardHeader>
<CardContent class="space-y-6">
  <div class="text-center">
    <div class="mb-2 text-4xl font-bold">{score}%</div>
    <Badge variant={passed ? "default" : "secondary"} class="mb-4">
      {passed ? "Passed" : "Not Passed"} (Required: {config.passingScore}%)
    </Badge>
  </div>

  <div class="grid grid-cols-2 gap-4 text-center">
    <div class="bg-muted rounded-lg p-4">
      <div class="text-2xl font-semibold text-green-600">
        {correctAnswers}
      </div>
      <div class="text-muted-foreground text-sm">Correct</div>
    </div>
    <div class="bg-muted rounded-lg p-4">
      <div class="text-2xl font-semibold text-red-600">
        {config.questions.length - correctAnswers}
      </div>
      <div class="text-muted-foreground text-sm">Incorrect</div>
    </div>
  </div>

  <div class="space-y-2">
    <h3 class="font-semibold">Question Review</h3>
    {#each config.questions as question, index}
      <div class="bg-muted flex items-center justify-between rounded p-2">
        <span class="text-sm">Question {index + 1}</span>
        {#if isAnswerCorrect(question.id, answers[question.id])}
          <CheckCircle2 class="h-5 w-5 text-green-600" />
        {:else}
          <XCircle class="h-5 w-5 text-red-600" />
        {/if}
      </div>
    {/each}
  </div>

  <div class="flex gap-2">
    {#if attempts < config.maxAttempts}
      <Button onclick={onRetake} variant="outline" class="flex-1">
        <RotateCcw class="mr-2 h-4 w-4" />
        Retake Quiz ({config.maxAttempts - attempts} attempts left)
      </Button>
    {/if}
    <Button onclick={onReview} variant="default" class="flex-1">Review Answers</Button>
  </div>
</CardContent>
