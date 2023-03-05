import CommonNav from "../common/CommonNav";
function TopNav() {
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Find Candidates",
      path: "employer/auth",
    },
    {
      name: "Find Jobs",
      path: "candidate/auth",
    }
  ];
  return (
    <CommonNav pages={pages} />
  );
}
export default TopNav;
