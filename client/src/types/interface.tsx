export interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  children: React.ReactNode;
}
