import './Background.css';

const Background = ({ children, image }) => {
  return (
    <div
      className="bg-container"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.28)), url(${image})`,
      }}
    >
      {children}
    </div>
  );
};
export default Background;
