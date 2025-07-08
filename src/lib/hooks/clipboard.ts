import type { Attachment } from "svelte/attachments";

export type ClipboardOptions = {
  /**
   * The text to copy to clipboard.
   *
   * This could be a string or a function or even a $state().
   */
  text: string;

  /**
   * The time in milliseconds before the status resets to idle (default: 2000).
   */
  delay?: number;

  /**
   * Callback when copy succeeds.
   */
  onSuccess?: (text: string) => void;

  /**
   * Callback when copy fails.
   */
  onFailure?: (error: Error) => void;
};

interface ClipboardState {
  timeout?: ReturnType<typeof setTimeout>;
}

/**
 * Svelte 5+ attachment action for copying text to clipboard.
 *
 * @example
 * ```svelte
 * <button
 *   {@attach clipboard({
 *     text: 'Hello, World!',
 *     onSuccess: () => {
 *       toast.success('Copied to clipboard!');
 *     },
 *     onFailure: (error) => {
 *       toast.error(`Failed to copy to clipboard: ${error.message}`);
 *     }
 *   })}>
 *   Copy to clipboard
 * </button>
 * ```
 */
export function clipboard(options: ClipboardOptions): Attachment<HTMLElement> {
  /**
   * Return an attachment function that can be used to attach the clipboard
   * action to a node.
   */
  return (node: HTMLElement) => {
    const state: ClipboardState = {
      timeout: undefined
    };

    /**
     * Reset the timeout if it exists.
     */
    const reset = () => {
      if (state.timeout) {
        clearTimeout(state.timeout);
        state.timeout = undefined;
      }
    };

    /**
     * Handle the click event and copy the text to the clipboard by calling
     * the navigator.clipboard.writeText() method.
     */
    const handleClick = async (event: MouseEvent) => {
      /**
       * Prevent default if it's a button inside a form.
       *
       * `node.tagName` must be uppercase (see: https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName).
       */
      if (node.tagName === "BUTTON" && node.closest("form")) {
        event.preventDefault();
      }

      /**
       * Clear any existing timeout as to debounce in the event that the
       * user clicks the button multiple times.
       *
       * This is a workaround for the fact that the clipboard API is not
       * debounced by default.
       */
      reset();

      try {
        await navigator.clipboard.writeText(options.text);
        options.onSuccess?.(options.text);
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Failed to copy to clipboard");
        options.onFailure?.(err);
      }
    };

    /**
     * Attach an event listener to the node to handle the click event.
     */
    node.addEventListener("click", handleClick);

    /**
     * Add appropriate ARIA attributes
     */
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", "Copy to clipboard");

    /**
     * Cleanup the event listener and ARIA attributes when the node is
     * removed from the DOM.
     */
    return () => {
      /**
       * Reset the timeout if it exists.
       */
      reset();

      /**
       * Remove the event listener and ARIA attributes.
       */
      node.removeEventListener("click", handleClick);
      node.removeAttribute("role");
      node.removeAttribute("aria-label");
    };
  };
}
