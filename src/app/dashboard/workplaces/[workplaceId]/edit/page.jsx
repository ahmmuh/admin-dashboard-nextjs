import EditWorkPlaceClientComponent from "@/components/workplaces/editworkplaceClientComponent";

const EditWorkPlacePage = ({ params }) => {
  const { workplaceId } = params; // detta måste matcha din route [workplaceId]

  return <EditWorkPlaceClientComponent workPlaceId={workplaceId} />;
};

export default EditWorkPlacePage;
