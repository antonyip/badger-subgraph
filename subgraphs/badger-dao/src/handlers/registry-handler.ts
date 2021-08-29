import { Sett } from '../../generated/schema';
import { SettVault, SettVaultV2 } from '../../generated/templates';
import { NewVault, PromoteVault, DemoteVault, RemoveVault } from '../../generated/VaultRegistry/VaultRegistry';
import { loadSett, updateSettStatus, SettStatusString } from '../entities/badger-sett';
import { loadSettV2 } from '../entities/badger-sett-v2';


export function handleNewVault(event: NewVault): void {
  let vault = event.params.vault;
  let version = event.params.version;

  let sett = Sett.load(vault.toHexString());

  if (sett == null) {
    if (version == 'v1') {
      SettVault.create(vault);
      loadSett(vault).save();
    } else if (version == 'v2') {
      SettVaultV2.create(vault);
      loadSettV2(vault).save();
    }
  }
}

export function handlePromoteVault(event: PromoteVault): void {  
  let status = SettStatusString(event.params.status);
  updateSettStatus(event.params.vault, event.params.version, status);
}

export function handleDemoteVault(event: DemoteVault): void {
  let status = SettStatusString(event.params.status);
  updateSettStatus(event.params.vault, event.params.version, status);
}

export function handleRemoveVault(event: RemoveVault): void {
  updateSettStatus(event.params.vault, event.params.version, "unregistered");
}
