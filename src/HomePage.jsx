import { useEffect,useState } from "react";
import './HomePage.css';

const HomePage = () => {
    const [products,setProducts]=useState([]);
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);


    console.log("HomePage Rendered");
    const fetchProductDetails = async () => {
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);

        const data = await response.json();
        //console.log(data);
        if(data.products)
        {
            setProducts(data.products);
            setTotalPages(Math.ceil(data.total/10));
        }
    }
    useEffect(() => {
        fetchProductDetails();
    }, [page]);
    const handlePageChange = (selectedPage) => {
        if(selectedPage<1 || selectedPage>totalPages) return;
        setPage(selectedPage);
    }

    return (
    <div className="home-container">
      <h1>Zepto Mart</h1>
      <div className="product-grid">
        {products.map((p, index) => (
          <div className="product-card" key={index}>
            <img src={p.thumbnail} alt={p.title + "image"} />
            <span>{p.title}</span>
            <span>${p.price}</span>
          </div>
        ))}
      </div>
      {
        products.length>0 && <div className="pagination">
            {page>1 &&<span onClick={()=> handlePageChange(page-1)}>Previous</span> }
            {
                [...Array(totalPages)].map((_,index) => (
                    index+1 >page-5 && index+1 <page+5 &&
                    <span key={index} onClick={() => {handlePageChange(index+1)}}
                    className={page===index+1?"active":""} >{index+1}</span>
                ))
            }
            { page<totalPages && <span onClick={() => handlePageChange(page+1)}>Next</span>  }
              
        </div>
      }
    </div>
  );
};


export default HomePage;