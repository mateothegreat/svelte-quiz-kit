<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { CheckCircle2, XCircle } from "lucide-svelte";
  import type { quiz } from "./quiz";

  let {
    config,
    answers,
    onBack,
    isAnswerCorrect
  }: {
    config: quiz.Config;
    answers: Record<string, any>;
    onBack: () => void;
    isAnswerCorrect: (questionId: string, answer: any) => boolean;
  } = $props();
</script>

<CardHeader>
  <CardTitle>Answer Review</CardTitle>
  <p class="text-muted-foreground">Review your answers and explanations</p>
</CardHeader>
<CardContent class="space-y-6">
  {#each config.questions as question, index}
    <div class="border p-4 rounded-lg">
      <div class="flex gap-3 items-start mb-3">
        {#if isAnswerCorrect(question.id, answers[question.id])}
          <CheckCircle2 class="h-5 mt-1 text-green-600 w-5" />
        {:else}
          <XCircle class="h-5 mt-1 text-red-600 w-5" />
        {/if}
        <div class="flex-1">
          <h4 class="font-medium mb-2">
            Question {index + 1}: {question.question}
          </h4>
          <div class="mb-2 text-muted-foreground text-sm">
            Your answer: {answers[question.id]}
          </div>
          <div class="mb-2 text-green-600 text-sm">
            Correct answer: {question.correctAnswer}
          </div>
          <div class="bg-muted p-2 rounded text-sm">
            {question.explanation}
          </div>
        </div>
      </div>
    </div>
  {/each}
  <Button onclick={onBack} class="w-full">Back to Results</Button>
</CardContent>
