import CustomModal from "@/component/modal/CustomModal";

interface ITypingSettingsModal {
  close: () => void;
}

const TypingSettingsModal = ({close}: ITypingSettingsModal) => {
  return (
    <CustomModal close={close}>
      <div>
        TEST
      </div>
    </CustomModal>
  );
}

export default TypingSettingsModal;