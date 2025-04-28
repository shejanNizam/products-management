import "./App.css";
import { useGetAllProductsQuery } from "./redux/features/products/productsApi";

function App() {
  const { data } = useGetAllProductsQuery([]);
  console.log(data?.products);

  return (
    <>
      <h1 className="text-3xl text-red-600 font-bold underline">
        Hello world!
      </h1>
    </>
  );
}

export default App;
