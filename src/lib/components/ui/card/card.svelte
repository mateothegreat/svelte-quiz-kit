<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		`
    bg-card border flex flex-col gap-6 py-6 rounded-xl shadow-sm
    text-card-foreground
  `,
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
