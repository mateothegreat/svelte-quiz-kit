<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";
	export const sheetVariants = tv({
		base: `
    bg-background
    data-[state=closed]:animate-out data-[state=closed]:duration-300
    data-[state=open]:animate-in data-[state=open]:duration-500
    ease-in-out fixed flex flex-col gap-4 shadow-lg transition z-50
  `,
		variants: {
			side: {
				top: `
      border-b
      data-[state=closed]:slide-out-to-top
      data-[state=open]:slide-in-from-top
      h-auto inset-x-0 top-0
    `,
				bottom: `
      border-t bottom-0
      data-[state=closed]:slide-out-to-bottom
      data-[state=open]:slide-in-from-bottom
      h-auto inset-x-0
    `,
				left: `
      border-r
      data-[state=closed]:slide-out-to-left
      data-[state=open]:slide-in-from-left
      h-full inset-y-0 left-0
      sm:max-w-sm
      w-3/4
    `,
				right: `
      border-l
      data-[state=closed]:slide-out-to-right
      data-[state=open]:slide-in-from-right
      h-full inset-y-0 right-0
      sm:max-w-sm
      w-3/4
    `,
			},
		},
		defaultVariants: {
			side: "right",
		},
	});

	export type Side = VariantProps<typeof sheetVariants>["side"];
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import XIcon from "@lucide/svelte/icons/x";
	import type { Snippet } from "svelte";
	import SheetOverlay from "./sheet-overlay.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "right",
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: SheetPrimitive.PortalProps;
		side?: Side;
		children: Snippet;
	} = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="sheet-content"
		class={cn(sheetVariants({ side }), className)}
		{...restProps}
	>
		{@render children?.()}
		<SheetPrimitive.Close
			class="
     absolute
     disabled:pointer-events-none
     focus-visible:outline-hidden focus-visible:ring-2
     focus-visible:ring-offset-2 focus-visible:ring-ring
     hover:opacity-100
     opacity-70 right-4 ring-offset-background rounded-xs top-4
     transition-opacity
   "
		>
			<XIcon class="size-4" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPrimitive.Portal>
