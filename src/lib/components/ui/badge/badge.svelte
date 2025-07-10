<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: `
    [&>svg]:pointer-events-none [&>svg]:size-3
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    border
    dark:aria-invalid:ring-destructive/40
    focus-visible:border-ring focus-visible:ring-[3px]
    focus-visible:ring-ring/50
    font-medium gap-1 inline-flex items-center justify-center overflow-hidden
    px-2 py-0.5 rounded-md shrink-0 text-xs transition-[color,box-shadow] w-fit
    whitespace-nowrap
  `,
		variants: {
			variant: {
				default:
					`
       [a&]:hover:bg-primary/90
       bg-primary border-transparent text-primary-foreground
     `,
				secondary:
					`
       [a&]:hover:bg-secondary/90
       bg-secondary border-transparent text-secondary-foreground
     `,
				destructive:
					`
       [a&]:hover:bg-destructive/90
       bg-destructive border-transparent
       dark:bg-destructive/70 dark:focus-visible:ring-destructive/40
       focus-visible:ring-destructive/20
       text-white
     `,
				outline: `
      [a&]:hover:bg-accent [a&]:hover:text-accent-foreground
      text-foreground
    `,
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
