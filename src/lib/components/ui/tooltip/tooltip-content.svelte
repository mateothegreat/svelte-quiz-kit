<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 0,
		side = "top",
		children,
		arrowClasses,
		...restProps
	}: TooltipPrimitive.ContentProps & {
		arrowClasses?: string;
	} = $props();
</script>

<TooltipPrimitive.Portal>
	<TooltipPrimitive.Content
		bind:ref
		data-slot="tooltip-content"
		{sideOffset}
		{side}
		class={cn(
			`
     animate-in bg-primary
     data-[side=bottom]:slide-in-from-top-2
     data-[side=left]:slide-in-from-right-2
     data-[side=right]:slide-in-from-left-2
     data-[side=top]:slide-in-from-bottom-2
     data-[state=closed]:animate-out data-[state=closed]:fade-out-0
     data-[state=closed]:zoom-out-95
     fade-in-0 origin-[var(--bits-tooltip-content-transform-origin)] px-3 py-1.5
     rounded-md text-balance text-primary-foreground text-xs w-fit z-50
     zoom-in-95
   `,
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<TooltipPrimitive.Arrow>
			{#snippet child({ props })}
				<div
					class={cn(
						"bg-primary rotate-45 rounded-[2px] size-2.5 z-50",
						`
        data-[side=top]:translate-x-1/2
        data-[side=top]:translate-y-[calc(-50%_+_2px)]
      `,
						`
        data-[side=bottom]:-translate-x-1/2
        data-[side=bottom]:-translate-y-[calc(-50%_+_1px)]
      `,
						`
        data-[side=right]:translate-x-[calc(50%_+_2px)]
        data-[side=right]:translate-y-1/2
      `,
						"data-[side=left]:-translate-y-[calc(50%_-_3px)]",
						arrowClasses
					)}
					{...props}
				></div>
			{/snippet}
		</TooltipPrimitive.Arrow>
	</TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
