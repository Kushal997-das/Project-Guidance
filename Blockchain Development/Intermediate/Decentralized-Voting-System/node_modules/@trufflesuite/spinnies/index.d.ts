// Attribution note:
// These type declarations are modified from type declarations in
// jcarpanelli/spinnies#25 by Adam Jarret <https://github.com/adamjarret>.

export as namespace Spinnies;
export = Spinnies;

import { Color as ChalkColor } from "chalk";

declare namespace Spinnies {
    const dots: Spinner;
    const dashes: Spinner;

    type Color = typeof ChalkColor | "none";

    type StopAllStatus = "succeed" | "fail" | "warn" | "stopped";
    type SpinnerStatus = StopAllStatus | "spinning" | "non-spinnable";

    interface Spinner {
        interval: number;
        frames: string[];
    }

    /**
     * The configuration for a given spinner
     */
    interface SpinnerOptions {
        /**
         * Text to show in the spinner. If none is provided, the name field will be shown.
         */
        text: string;

        /**
         * Indent the spinner with the given number of spaces.
         */
        indent: number;

        /**
         * Initial status of the spinner.
         */
        status: SpinnerStatus;

        /**
         * The color of the text that accompanies the spinner. Default value is
         * `"none"`.
         */
        textColor?: Color;

        /**
         * The color of the spinner or prefix. Default value is `"none"`.
         */
        prefixColor?: Color;

        /**
         * The symbol to be used in place of the spinner on success. The default value is ✓.
         */
        succeedPrefix: string;

        /**
         * The symbol to be used in place of the spinner on failure. The default value is ✖.
         */
        failPrefix: string;

        /**
         * The symbol to be used in place of the spinner on warn. The default value is ⚠.
         */
        warnPrefix: string;

        /**
         * The symbol to be used in place of the spinner on stop. Default value is `""`.
         */
        stoppedPrefix?: string;
    }

    /**
     * Contains top-level configuration for the Spinnies class. Also allows the
     * caller to override default values used in `SpinnerOptions`.
     */
    interface Options {
        /**
         * The color of the text that accompanies the spinner. Default value is
         * `"none"`.
         */
        textColor?: Color;

        /**
         * The color of the spinner. Default value is `"none"`.
         */
        prefixColor?: Color;

        /**
         * The symbol to be used in place of the spinner on success. The default value is ✓.
         */
        succeedPrefix: string;

        /**
         * The symbol to be used in place of the spinner on failure. The default value is ✖.
         */
        failPrefix: string;

        /**
         * The symbol to be used in place of the spinner on stop. Default value is `undefined`.
         */
        stoppedPrefix?: string;

        /**
         * Disable spinner animations (will still print raw messages if `true`). The default value is `false`.
         */
        disableSpins: boolean;

        /**
         * Defines the animated spinner to be used while each spinner is active/spinning.
         */
        spinner: Spinner;

    }
}

/**
 * A class that manages multiple CLI spinners.
 */
declare class Spinnies {
    /**
     * The current configuration of this Spinnies object.
     */
    options: Spinnies.Options;

    constructor(options?: Partial<Spinnies.Options>);

    /**
     * Add a new spinner with the given name.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    add(name: string, text?: string): Spinnies.SpinnerOptions;
    add(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    add(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Get spinner by name.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    pick(name: string): Spinnies.SpinnerOptions;

    /**
     * Remove spinner with name.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    remove(name: string): Spinnies.SpinnerOptions;

    /**
     * Updates the spinner with name name with the provided options. Retains
     * the value of options that aren't specified.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    update(name: string, text?: string): Spinnies.SpinnerOptions;
    update(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    update(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Sets the specified spinner status as succeed.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    succeed(name: string, text?: string): Spinnies.SpinnerOptions;
    succeed(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    succeed(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Sets the specified spinner status as fail.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    fail(name: string, text?: string): Spinnies.SpinnerOptions;
    fail(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    fail(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Sets the specified spinner status as warn.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    warn(name: string, text?: string): Spinnies.SpinnerOptions;
    warn(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    warn(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Sets the specified spinner status as stopped.
     *
     * @returns full `SpinnerOptions` object for the given spinner, with
     * defaults applied
     */
    stop(name: string, text?: string): Spinnies.SpinnerOptions;
    stop(name: string, options?: Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;
    stop(name: string, textOrOptions?: string | Partial<Spinnies.SpinnerOptions>): Spinnies.SpinnerOptions;

    /**
     * Stops the spinners and sets the non-succeeded and non-failed ones to the provided status.
     *
     * @returns an object that maps spinner names to final `SpinnerOptions` objects for each spinner, with
     * defaults applied
     */
    stopAll(status?: Spinnies.StopAllStatus): { [name: string]: Spinnies.SpinnerOptions };

    /**
     * @returns false if all spinners have succeeded, failed or have been stopped
     */
    hasActiveSpinners(): boolean;
}
