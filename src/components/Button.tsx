type TProps = {
  content: string;
  onClick: () => void;
};

const Button: React.FC<TProps> = ({ content, onClick }) => {
  return (
    <button
      className="py-3 px-5 font-semibold border bg-white rounded-lg hover:bg-neutral-100/70 transition shadow"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
