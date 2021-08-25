import { Transfer } from '../../generated/BADGER/V1Contract';
import { Transfer as Casted_Transfer } from '../../generated/BADGER/BadgerSett';
import { handleTransfer } from './sett-handler'
import { handleShareTransfer } from '../yearn/yVault';

export function handleTransferLegacy(event: Transfer): void {
  let casted_Transfer = event as Casted_Transfer;
  handleTransfer(casted_Transfer);
  handleShareTransfer(event);
}

