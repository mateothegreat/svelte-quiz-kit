<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		size = "md",
		isActive = false,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		size?: "sm" | "md";
		isActive?: boolean;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			`
     -translate-x-px
     [&>span:last-child]:truncate
     [&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:text-sidebar-accent-foreground
     active:bg-sidebar-accent active:text-sidebar-accent-foreground
     aria-disabled:opacity-50 aria-disabled:pointer-events-none
     disabled:opacity-50 disabled:pointer-events-none
     flex
     focus-visible:ring-2
     gap-2 h-7
     hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
     items-center min-w-0 outline-hidden overflow-hidden px-2 ring-sidebar-ring
     rounded-md text-sidebar-foreground
   `,
			`
     data-[active=true]:bg-sidebar-accent
     data-[active=true]:text-sidebar-accent-foreground
   `,
			size === "sm" && "text-xs",
			size === "md" && "text-sm",
			"group-data-[collapsible=icon]:hidden",
			className
		),
		"data-slot": "sidebar-menu-sub-button",
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<a bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</a>
{/if}
