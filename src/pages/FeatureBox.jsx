import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FeatureBox = ({ link, title, description, badge, onClick }) => {
  return (
    <Link to={link ? link : "/"}>
      <div
        onClick={onClick}
        className="bg-gray-800 cursor-pointer max-w-xs p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
        {badge && (
          <span className="inline-block mt-2 bg-purple-600 text-white text-sm font-semibold rounded-full px-2 py-1">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};

FeatureBox.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badge: PropTypes.string,
  onClick: PropTypes.func,
};
