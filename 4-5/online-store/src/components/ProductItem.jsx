import React from "react";
export default function ProductItem({ product, onEdit, onDelete }) {
    return (
        <div className="product">
            <div className="product__main">
                <div className="product__id">#{product.id}</div>
                <div className="product__name">{product.name}</div>
                <div className="product__category">{product.category}</div>
                <div className="product__description">{product.description}</div>
                <div className="product__analytic">
                    <div className="product__price">{product.price} руб.</div>
                    <div className="product__amount">На складе {product.amount} шт.</div>
                </div>

            </div>
            <div className="product__actions">
                <button className="btn btn__edit" onClick={() => onEdit(product)}>
                    Редактировать
                </button>
                <button className="btn btn--danger" onClick={() =>
                    onDelete(product.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}
