const Tabs = ({ items, value, onChange, className }) => {
  return (
    <div className={`bg-white rounded-full shadow-md p-1 w-fit ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          className={`py-2 px-6 rounded-full ${
            value === item?.value
              ? "bg-black text-white shadow-md transition duration-200 rounded-full text-blue"
              : "hover:bg-gray-100"
          } `}
          onClick={() => onChange(item?.value)}
        >
          {item?.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
