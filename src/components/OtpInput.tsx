import { useState, useRef, useEffect, Fragment } from "react";

const MAX_OTP_LENGTH = 6;

const OtpInput = () => {
  const [otp, setOtp] = useState<string[]>(Array(MAX_OTP_LENGTH).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  function handleInputChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    const isNumeric = /^\d+$/.test(value);
    if (isNumeric && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < MAX_OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  function handleInputKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < MAX_OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleInputPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text/plain");
    const newOtp = [...otp];
    let nextIndex = getNextIndex(newOtp, 0);
    for (let i = 0; i < MAX_OTP_LENGTH; i++) {
      if (pastedText.length > i && /^\d+$/.test(pastedText[i])) {
        newOtp[nextIndex] = pastedText[i];
        nextIndex = getNextIndex(newOtp, nextIndex + 1);
      }
    }
    setOtp(newOtp);
    inputRefs.current[nextIndex]?.focus();
  }

  function getNextIndex(otp: string[], startIndex: number): number {
    for (let i = startIndex; i < MAX_OTP_LENGTH; i++) {
      if (!otp[i]) {
        return i;
      }
    }
    return MAX_OTP_LENGTH - 1;
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Fragment>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(event) => handleInputChange(index, event)}
          onKeyDown={(event) => handleInputKeyDown(index, event)}
          onPaste={(event) => handleInputPaste(event)}
          ref={(input) => {
            inputRefs.current[index] = input as HTMLInputElement;
          }}
          className="w-12 h-12 border-b-2 bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
        />
      ))}
    </Fragment>
  );
};

export default OtpInput;
