import Heading from "../components/Heading-component/Heading";
import SideMenu from "../components/edit-profile-components/SideMenu";

const EditProfile: React.FC = () => {
  return (
    <>
      <div className="p-4 bg-[#fffbf3] font-sans">
        <Heading title="My Profile" />
      </div>
      <SideMenu />
    </>
  );
};

export default EditProfile;
