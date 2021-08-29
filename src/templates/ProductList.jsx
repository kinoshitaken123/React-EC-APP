import React, {useEffect} from 'react';
import {ProductCard} from "../components/Products";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../reducks/products/selectors";
import {fetchProducts} from "../reducks/products/operations";

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const products = getProducts(selector);

    // const query = window.location.search
    // const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""

    // useEffect(() => {
    //     dispatch(fetchProducts(category))
    // },[query])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row"> 
                {/* {}はJSを使う宣言 */}
                {products.length > 0 && (   
                    products.map(product => (
                        <ProductCard
                            key={product.id} id={product.id} images={product.images}
                            price={product.price} name={product.name}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductList;