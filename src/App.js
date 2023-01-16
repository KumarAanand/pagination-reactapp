import { React } from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const fetchProducts = async () => {
    // const res = await fetch("https://dummyjson.com/products?limit=100");
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      setTotalPage(data.total / 10);
    }
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page)
      setPage(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {/*
              --Frontend driven approach for pagination 
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })} */}

          {/* backend base approach */}

          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀️◀️
          </span>
          {[...Array(totalPage)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => {
              selectPageHandler(page + 1);
            }}
            className={page < totalPage ? "" : "pagination__disable"}
          >
            ▶️▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
