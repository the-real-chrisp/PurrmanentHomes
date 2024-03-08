import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import petInfo from "../../utils/seedPetData";
import PetInfoModal from "../../components/PetInfoModal";


const data = petInfo;

const speciesList = [
  "Cat",
  "Dog",
]

const genderList = [
  "Boy",
  "Girl",
]

export default function Adoption() {
  const [showModal, setShowModal] = useState(false);
  const [pet, setPet] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableColumnFilter: false,
      },
      {
        accessorFn: (originalRow) => (parseInt(originalRow.age.split(" ")[0])),
        id: "age",
        header: "Age(Months)",
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
      },
      {
        accessorKey: "species",
        header: "Species",
        filterVariant: 'multi-select',
        filterSelectOptions: speciesList,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        filterVariant: 'multi-select',
        filterSelectOptions: genderList,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        handleShowModal();
        setPet(row.original);
      },
      sx: {
        cursor: 'pointer',
      },
    }),
    enableFullScreenToggle: false,
  });

  return (
    <>
      <PetInfoModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        pet={pet} />
      <MaterialReactTable table={table} />
    </>
  );
}
