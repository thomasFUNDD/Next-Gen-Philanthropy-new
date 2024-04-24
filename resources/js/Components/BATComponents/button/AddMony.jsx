import ProtoTypes from "prop-types";

function GreenBtn({ text, action, className }) {
  return (
    <button
      onClick={() => (action ? action() : "")}
      className={`bg-lightPurple hover:bg-midPurple transition-all text-darkPurple hover:text-white border border-darkPurple py-4 w-full font-bold rounded-lg ${
        className ? className : "mt-14"
      }`}
      aria-label="none"
    >
      {text}
    </button>
  );
}

GreenBtn.propTypes = {
  text: ProtoTypes.string,
  className: ProtoTypes.string,
  action: ProtoTypes.func,
};

export default GreenBtn;