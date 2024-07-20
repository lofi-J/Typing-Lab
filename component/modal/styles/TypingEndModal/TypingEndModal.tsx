import CustomModal from "@/component/modal/CustomModal";


interface ITypingEndModal {
  close: () => void;
}

const TypingEndModal = ({close}: ITypingEndModal) => {
  /*
  *
  * */
  return (
    <CustomModal close={close}>
      <>ENDMODAL</>
    </CustomModal>
  );
}

export default TypingEndModal;