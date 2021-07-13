import { PutWalletDto } from "./put.wallets.dto";

// Use partial to create a new type by copying PutWalletDto fields
// and making them optional.
export interface PatchWalletDto extends Partial<PutWalletDto> {}