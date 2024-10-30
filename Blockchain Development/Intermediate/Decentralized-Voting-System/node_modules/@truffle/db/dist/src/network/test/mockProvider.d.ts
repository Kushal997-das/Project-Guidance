import type { Provider } from "web3/providers";
import { Batch, Model } from "../../../test/arbitraries/networks";
export declare const mockProvider: (options: {
    model: Model;
    batch: Batch;
}) => Provider;
