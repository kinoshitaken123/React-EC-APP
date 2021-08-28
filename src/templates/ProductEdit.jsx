import React, {useCallback, useState} from 'react'
import {PrimaryButton, SelectBox,TextInput } from '../components/UIkit'

const ProductEdit = () => {

    const [name, setName] = useState(""),
          [description, setDescription] = useState(""),
          [category, setCategory] = useState(""),
          [price, setPrice] = useState("");

const inputName = useCallback((event) => {
    setName(event.target.value)
}, [setName]);

const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
}, [setDescription]);

const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
}, [setPrice]);

const categories = [
    {id: "fishs", name: "海鮮"},
    {id: "meets", name: "お肉"},
    {id: "frurt", name: "果物"},
    {id: "cake", name: "ケーキ"},
];
    return(
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true} label={"商品名"}　multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                /> 
                <TextInput
                    fullWidth={true} label={"商品説明"}　multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                /> 
                <SelectBox 
                    label={"カテゴリー"}　required={true} options={categories} select={setCategory} value={category}
                />
                <TextInput
                    fullWidth={true} label={"商品名"}　multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                /> 
                <div className="module-spacer--medium" />
                <div className="center">
                    <PrimaryButton
                       label={"商品情報を保存"}
                       onClick={}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit