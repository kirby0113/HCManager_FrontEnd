import "./CreateGroupModal.css";

const CreateGroupModal = (props) => {
    const overlayClass = props.modalVisible ? "Modal-Overlay" : "Modal-Overlay hiddenOverlay";
    const FormClass = props.modalVisible ? "CreateGroupForm" : "CreateGroupForm hiddenForm";
    return <div>
        <div className={overlayClass} onClick={() => {props.setModalVisible(false)}}>
            &nbsp;
        </div>
        <form>
            <div className={FormClass}>
                Form建設予定地
            </div>
        </form>
    </div>
}

export default CreateGroupModal;