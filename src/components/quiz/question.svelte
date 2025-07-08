<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { CheckCircle2, HelpCircle, Lightbulb, XCircle } from "lucide-svelte";
  import QuizOptionButton from "./option-button.svelte";
  import type { quiz } from "./quiz";

  let {
    question,
    selectedAnswer,
    showFeedback,
    showHint,
    onAnswerSelect,
    onHintToggle
  }: {
    question: quiz.Question;
    selectedAnswer: any;
    showFeedback: boolean;
    showHint: boolean;
    onAnswerSelect: (answer: any) => void;
    onHintToggle: () => void;
  } = $props();
</script>

<div class="space-y-4">
  <div class="flex items-start gap-3">
    <h3 class="text-lg leading-relaxed font-medium">
      {question.question}
    </h3>
  </div>

  <div class="space-y-2">
    {#if question.options}
      {#each question.options as option, index}
        <QuizOptionButton
          {option}
          {selectedAnswer}
          {showFeedback}
          correctAnswer={question.correctAnswer}
          onSelect={() => onAnswerSelect(option)} />
      {/each}
    {/if}
  </div>

  {#if showFeedback}
    <div class="bg-muted rounded-lg p-4">
      <div class="flex items-start gap-2">
        {#if selectedAnswer === question.correctAnswer}
          <CheckCircle2 class="mt-0.5 h-5 w-5 text-green-600" />
        {:else}
          <XCircle class="mt-0.5 h-5 w-5 text-red-600" />
        {/if}
        <div>
          <p class="mb-1 font-medium">
            {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
          </p>
          <p class="text-muted-foreground text-sm">
            {question.explanation}
          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if question.hint && !showFeedback}
    <div class="flex justify-center">
      <Button variant="outline" size="sm" onclick={onHintToggle} class="text-xs">
        <Lightbulb class="mr-1 h-3 w-3" />
        {showHint ? "Hide Hint" : "Show Hint"}
      </Button>
    </div>
  {/if}

  {#if showHint && question.hint}
    <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
      <div class="flex items-start gap-2">
        <HelpCircle class="mt-0.5 h-4 w-4 text-blue-600" />
        <p class="text-sm text-blue-800">{question.hint}</p>
      </div>
    </div>
  {/if}
</div>
