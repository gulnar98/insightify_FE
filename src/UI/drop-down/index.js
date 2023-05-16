import style from "./style.module.css";

function DropDown({ items, isOpen }) {
  return (
    <div className={`${style.container} ${isOpen && style.isOpen}`}>
      {items.map((item, index) => (
        <button key={`${item}-${index}`}>
          <img src={item.icon} alt={item.text} /> {item.text}
        </button>
      ))}
    </div>
  );
}

export default DropDown;
