import { Key, manager, type ModalInstance } from "@mateothegreat/svelte5-modal-manager";
import type { Component } from "svelte";

/**
 * Namespace for managing modals.
 */
export namespace modals {
  /**
   * Open a modal with the given component and props.
   *
   * @example
   * ```ts
   * const instance = modals.open(Basic, { message: "Hello, world!" }, () => {
   *   // This function will be called when the escape key is pressed.
   *   console.log("Modal closed");
   * });
   *
   * console.log(instance);
   * ```
   *
   * @param component - The component to open.
   * @param props - The props to pass to the component.
   * @param closeFn - The function to call when the modal is closed.
   *
   * @returns The modal instance.
   */
  export const open = <TComponent, TProps>(
    component: Component<TComponent, TProps>,
    props?: TProps,
    closeFn?: () => void
  ): ModalInstance<TProps> => {
    const instance = manager.open<TProps>({
      component,
      backdrop: {
        attributes: {
          "data-test": "backdrop"
        }
      },
      dialog: {
        attributes: {
          "data-test": "dialog"
        }
      },
      keybindings: [
        {
          key: Key.Escape,
          fn: closeFn ?? (() => instance.close())
        }
      ],
      props
    });

    return instance;
  };
}
