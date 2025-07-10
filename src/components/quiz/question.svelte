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
  <div class="flex gap-3 items-start">
    <h3 class="font-medium leading-relaxed text-lg">
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
    <div class="bg-muted p-4 rounded-lg">
      <div class="flex gap-2 items-start">
        {#if selectedAnswer === question.correctAnswer}
          <CheckCircle2 class="h-5 mt-0.5 text-green-600 w-5" />
        {:else}
          <XCircle class="h-5 mt-0.5 text-red-600 w-5" />
        {/if}
        <div>
          <p class="font-medium mb-1">
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
      <Button variant="outline" size="sm" onclick={onHintToggle} class="
        text-xs
      ">
        <Lightbulb class="h-3 mr-1 w-3" />
        {showHint ? "Hide Hint" : "Show Hint"}
      </Button>
    </div>
  {/if}

  {#if showHint && question.hint}
    <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg">
      <div class="flex gap-2 items-start">
        <HelpCircle class="h-4 mt-0.5 text-blue-600 w-4" />
        <p class="text-blue-800 text-sm">{question.hint}</p>
      </div>
    </div>
  {/if}
</div>
