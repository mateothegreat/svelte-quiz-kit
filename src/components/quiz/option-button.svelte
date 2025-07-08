<script lang="ts">
  import { Check, X } from "lucide-svelte";

  export let option: string;
  export let selectedAnswer: any;
  export let showFeedback: boolean;
  export let correctAnswer: string | number;
  export let onSelect: () => void;

  $: isSelected = selectedAnswer === option;
  $: isCorrect = option === correctAnswer;
</script>

<button
  onclick={onSelect}
  class="w-full rounded-lg border p-4 text-left transition-all"
  class:border-green-500={showFeedback && isCorrect}
  class:bg-green-50={showFeedback && isCorrect}
  class:border-red-500={showFeedback && isSelected && !isCorrect}
  class:bg-red-50={showFeedback && isSelected && !isCorrect}
  class:border-primary={!showFeedback && isSelected}
  class:bg-primary-50={!showFeedback && isSelected}
  class:border-border={!isSelected}
  class:hover-border-primary-50={!isSelected}
  disabled={showFeedback}>
  <div class="flex items-center gap-3">
    <div
      class="flex h-6 w-6 items-center justify-center rounded-full border-2"
      class:border-green-500={showFeedback && isCorrect}
      class:bg-green-500={showFeedback && isCorrect}
      class:border-red-500={showFeedback && isSelected && !isCorrect}
      class:bg-red-500={showFeedback && isSelected && !isCorrect}
      class:border-primary={!showFeedback && isSelected}
      class:bg-primary={!showFeedback && isSelected}
      class:border-muted-foreground={!isSelected}>
      {#if showFeedback && isCorrect}
        <Check class="h-3 w-3 text-white" />
      {:else if showFeedback && isSelected && !isCorrect}
        <X class="h-3 w-3 text-white" />
      {:else if !showFeedback && isSelected}
        <div class="h-2 w-2 rounded-full bg-white"></div>
      {/if}
    </div>
    <span>{option}</span>
  </div>
</button>
