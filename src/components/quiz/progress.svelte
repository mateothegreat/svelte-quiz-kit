<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";

  let {
    current,
    total
  }: {
    current: number;
    total: number;
  } = $props();

  const progress = $derived(Math.round((current / total) * 100));
</script>

<div class="space-y-2">
  <div class="flex justify-between text-muted-foreground text-sm">
    <span>Question {current} of {total}</span>
    <span>{progress}% Complete</span>
  </div>
  <Progress value={progress} class="h-2" />
</div>
