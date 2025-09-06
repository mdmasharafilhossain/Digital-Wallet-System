import type { Wallet } from ".";

export interface WalletCardProps {
  wallet: Wallet | undefined;
  isLoading: boolean;
  onAddMoney: () => void;
  onWithdraw: () => void;
  onSendMoney: () => void;
}

export interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface WithdrawMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}