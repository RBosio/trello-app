import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Namespace: React.FC<any> = ({
  namespaces,
  ns,
  handleClickRemoveNs,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ns.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      key={ns.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className=" bg-white min-w-[300px] rounded-md overflow-y-scroll max-w-20"
    >
      <div
        onClick={() => handleClickRemoveNs(ns.id)}
        className="flex items-center justify-end  text-primary"
      >
        <p className="p-2 hover:cursor-pointer hover:opacity-70">
          <FontAwesomeIcon icon={faXmark} />
        </p>
      </div>
      <h3 className="text-center text-primary uppercase font-semibold">
        {ns.name}
      </h3>
      <h4 className="text-sm text-center text-primary/70">{ns.description}</h4>
      <SortableContext
        items={namespaces}
        strategy={verticalListSortingStrategy}
      >
        {ns.tasks.map((t: any) => (
          <div
            key={t.id}
            className="flex flex-col items-center bg-primary p-2 m-4 rounded-md"
          >
            <h3 className="text-white font-semibold">{t.title}</h3>
            <h3 className="text-white">{t.description}</h3>
          </div>
        ))}
      </SortableContext>
    </div>
  );
};
