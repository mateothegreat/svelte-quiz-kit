<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";

  let {
    onNext,
    onPrevious,
    showFeedback,
    isFirstQuestion,
    isLastQuestion,
    isAnswerSelected
  }: {
    onNext: () => void;
    onPrevious: () => void;
    showFeedback: boolean;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    isAnswerSelected: boolean;
  } = $props();
</script>

<div class="flex justify-between pt-4">
  <Button variant="outline" onclick={onPrevious} disabled={isFirstQuestion}>
    <ArrowLeft class="mr-2 h-4 w-4" />
    Previous
  </Button>

  <Button onclick={onNext} disabled={!isAnswerSelected}>
    {#if showFeedback}
      {#if isLastQuestion}
        Complete Quiz
      {:else}
        Next
        <ArrowRight class="ml-2 h-4 w-4" />
      {/if}
    {:else}
      Submit Answer
    {/if}
  </Button>
</div>
