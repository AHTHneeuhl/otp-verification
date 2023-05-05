import Button from "./components/Button";
import VerificationModal from "./components/VerificationModal";
import useVerificationModal from "./hooks/useVerificationModal";

function App() {
  const { onOpen, onClose, isOpen } = useVerificationModal();
  return (
    <div className="grid place-items-center h-[100vh] w-full bg-neutral-50">
      <VerificationModal isOpen={isOpen} onClose={onClose} />
      <Button content="Verify OTP" onClick={onOpen} />
    </div>
  );
}

export default App;
