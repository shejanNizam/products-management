import ProductList from "../../ProductList/ProductList";

export default function Home() {
  return (
    <>
      <div className="  ">
        <h3 className=" font-bold text-center text-3xl text-primary ">
          {" "}
          Hello from home{" "}
        </h3>
        <h3 className=" font-bold text-center text-2xl text-secondary ">
          {" "}
          Hello from home{" "}
        </h3>
        <ProductList />
      </div>
    </>
  );
}
