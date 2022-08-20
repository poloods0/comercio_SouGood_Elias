import UseAuth from "../../lib/auth";
import ManagementPanel from "../../components/management/managementPanel";

const Management: React.FC = () => {

  return (
    <div className="mx-auto mt-5 text-center">
      <h1 className="mb-5">Panel de administración</h1>
      <ManagementPanel></ManagementPanel>
    </div>
  );
};

export default UseAuth(Management, ['admin']);
