import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import petInfo from "../../utils/seedPetData";
import PetInfoModal from "../../components/PetInfoModal";
import { useQuery } from "@apollo/client";
import { GET_PETS } from "../../utils/queries";
import goodCat from "../../assets/imgs/white_kitten.jpg"
import goodDog from "../../assets/imgs/black_labrador.jpg"

const clientData = petInfo;

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
  const { loading, data } = useQuery(GET_PETS);
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

  const transformedData = useMemo(() => {
    if (data) {
      return data.getPets.map((pet) => {
        return {
          ...pet,
          title: pet.name,
          pic: (pet.species === "Cat") ? goodCat: goodDog,
        };
      });
    }
    return [];
  }, [data]);

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
    clientData,
    initialState: { showColumnFilters: true },
    layoutMode: 'grid',
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        handleShowModal();
        setPet(row.original);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
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
