<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		showIcon = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		showIcon?: boolean;
	} = $props();

	// Random width between 50% and 90%
	const width = `${Math.floor(Math.random() * 40) + 50}%`;
</script>

<div
	bind:this={ref}
	data-slot="sidebar-menu-skeleton"
	data-sidebar="menu-skeleton"
	class={cn("flex gap-2 h-8 items-center px-2 rounded-md", className)}
	{...restProps}
>
	{#if showIcon}
		<Skeleton class="rounded-md size-4" data-sidebar="menu-skeleton-icon" />
	{/if}
	<Skeleton
		class="flex-1 h-4 max-w-[var(--skeleton-width)]"
		data-sidebar="menu-skeleton-text"
		style="--skeleton-width: {width};"
	/>
	{@render children?.()}
</div>
