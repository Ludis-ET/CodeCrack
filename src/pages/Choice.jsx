import { useNavigate } from "react-router-dom";
import { FeatureBox } from "./FeatureBox";

export const Choice = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4 mb-4 w-full">
      <FeatureBox
        link="/github"
        title="Link To GitHub Repo"
        description="Add the questions you've solved to your GitHub profile."
        onClick={() => navigate("/github")}
      />
      <FeatureBox
        title="Feature 2"
        description="Short description of Feature 2."
        badge="#Enabled"
      />
      <FeatureBox
        title="Feature 3"
        description="Short description of Feature 3."
        badge="#Interactive"
      />
      <FeatureBox
        title="Feature 4"
        description="Short description of Feature 4."
        badge="#Customizable"
      />
      <FeatureBox
        title="Feature 5"
        description="Short description of Feature 5."
        badge="#Analytics"
      />
      <FeatureBox
        title="Feature 6"
        description="Short description of Feature 6."
        badge="#Insights"
      />
    </div>
  );
};