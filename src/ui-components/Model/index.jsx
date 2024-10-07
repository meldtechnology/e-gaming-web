export const Model = ({ isOpen, modal }) => {
  return (
      <div className={`relative z-10 ${isOpen}`}
           aria-labelledby="modal-title"
           role="dialog"
           aria-modal="true">
        {modal}
      </div>
  );
}