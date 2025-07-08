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
    <div class="rounded-lg border p-4">
      <div class="mb-3 flex items-start gap-3">
        {#if isAnswerCorrect(question.id, answers[question.id])}
          <CheckCircle2 class="mt-1 h-5 w-5 text-green-600" />
        {:else}
          <XCircle class="mt-1 h-5 w-5 text-red-600" />
        {/if}
        <div class="flex-1">
          <h4 class="mb-2 font-medium">
            Question {index + 1}: {question.question}
          </h4>
          <div class="text-muted-foreground mb-2 text-sm">
            Your answer: {answers[question.id]}
          </div>
          <div class="mb-2 text-sm text-green-600">
            Correct answer: {question.correctAnswer}
          </div>
          <div class="bg-muted rounded p-2 text-sm">
            {question.explanation}
          </div>
        </div>
      </div>
    </div>
  {/each}
  <Button onclick={onBack} class="w-full">Back to Results</Button>
</CardContent>
