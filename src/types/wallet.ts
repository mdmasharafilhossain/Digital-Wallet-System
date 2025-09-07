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
export interface WalletResponse {
  status: string;
  results: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: {
    wallets: Wallet[];
  };
}


export interface CashInModalProps {
  isOpen: boolean
  onClose: () => void
}


export interface CashOutModalProps {
  isOpen: boolean
  onClose: () => void
}
