import { Sett } from '../../generated/schema';
import { SettVault } from '../../generated/templates';
import { NewVault, PromoteVault, RemoveVault } from '../../generated/VaultRegistry/VaultRegistry';
import { loadSett, updateSettStatus } from '../entities/badger-sett';


// TODO: consider how to differentiate on author
export function handleNewVault(event: NewVault): void {
  let vault = event.params.vault;
  let sett = Sett.load(vault.toHexString());
  if (sett == null) {
    SettVault.create(vault);
    loadSett(vault).save();
  }
}

export function handlePromoteVault(event: PromoteVault): void {
  updateSettStatus(event.params.vault, "", "open");
}

export function handleRemoveVault(event: RemoveVault): void {
  updateSettStatus(event.params.vault, "", "unregistered");
}
