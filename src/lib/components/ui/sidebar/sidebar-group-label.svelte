<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			`
     [&>svg]:shrink-0 [&>svg]:size-4
     duration-200 ease-linear flex
     focus-visible:ring-2
     font-medium h-8 items-center outline-hidden px-2 ring-sidebar-ring
     rounded-md shrink-0 text-sidebar-foreground/70 text-xs
     transition-[margin,opacity]
   `,
			"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
			className
		),
		"data-slot": "sidebar-group-label",
		"data-sidebar": "group-label",
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
