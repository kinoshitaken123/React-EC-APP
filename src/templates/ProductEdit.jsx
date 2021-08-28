import React, {useCallback, useState} from 'react'
import { TextInput } from '../components/UIkit'

const ProductEdit = () => {

    const [name,setName] = useState(""),
    const [description,setDescription] = useState(""),
    const [category,setCategory] = useState(""),
    const [name,setPrice] = useState("");

const inputName = useCallback((event) => {
    setName(event.target.value)
}, [setName]);

const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
}, [setDescription]);

const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
}, [setPrice]);
    return(
        <section>
            <h2 className ="u-text_headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true} label={"商品名"}　multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                /> 
                <TextInput
                    fullWidth={true} label={"商品説明"}　multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                /> 
                <TextInput
                    fullWidth={true} label={"商品名"}　multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                /> 
            </div>
        </section>
    )
}

export default ProductEdit