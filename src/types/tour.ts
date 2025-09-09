export interface TourProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface TourContextType {
  isTourOpen: boolean;
  openTour: () => void;
  closeTour: () => void;
}