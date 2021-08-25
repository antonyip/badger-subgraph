import { Sett } from '../../generated/schema';
import { SettVault, SettVaultV2 } from '../../generated/templates';
import { NewVault, PromoteVault, RemoveVault } from '../../generated/VaultRegistry/VaultRegistry';
import {
  NewVault as NewVaultV2,
  PromoteVault as PromoteVaultV2,
  RemoveVault as RemoveVaultV2
} from '../../generated/VaultRegistryV2/VaultRegistryV2';
import { loadSett } from '../entities/badger-sett';
import { loadSettV2 } from '../entities/badger-sett-v2';

// TODO: consider how to differentiate on author
export function handleNewVault(event: NewVault): void {
  let vault = event.params.vault;
  let sett = Sett.load(vault.toHexString());
  if (sett == null) {
    SettVault.create(vault);
    loadSett(vault).save();
  }
}

// TODO: potentially use for upgrading vault state vs. registering new vaults
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars-experimental
export function handlePromoteVault(event: PromoteVault): void {}

// TODO: consider vault state (active, deprecated, guarded) via new / promote
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars-experimental
export function handleRemoveVault(event: RemoveVault): void {}

export function handleNewVaultV2(event: NewVaultV2): void {
  let vault = event.params.vault;
  let version = event.params.version;

  if (version == "v1") {
    let sett = loadSett(vault);
    if (sett == null) {
      SettVault.create(vault);
      loadSett(vault).save();
    }
  } else if (version == "v2") {
    let settV2 = loadSettV2(vault);
    if (settV2 == null) {
      SettVaultV2.create(vault);
      loadSettV2(vault).save();
    }
  }
}

// TODO: potentially use for upgrading vault state vs. registering new vaults
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars-experimental
export function handlePromoteVaultV2(event: PromoteVaultV2): void {}

// TODO: consider vault state (active, deprecated, guarded) via new / promote
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars-experimental
export function handleRemoveVaultV2(event: RemoveVaultV2): void {}