import React, { useEffect, useState } from "react";
export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit
}) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (!open) return;
        setName(initialProduct?.name ?? "");
        setCategory(initialProduct?.category ?? "");
        setDescription(initialProduct?.description ?? "");
        setPrice(initialProduct?.price != null ? String(initialProduct.price) : "");
        setAmount(initialProduct?.amount != null ? String(initialProduct.amount) : "");

    }, [open, initialProduct]);
    if (!open) return null;
    const title = mode === "edit" ? "Редактирование товара" : "Создание товара";
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedCategory = category.trim();
        const trimmedDescription = description.trim();
        const parsedPrice = Number(price);
        const parsedAmount = Number(amount);
        if (!trimmedName) {
            alert("Введите название");
            return;
        }
        if (!trimmedCategory) {
            alert("Введите категорию");
            return;
        }
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            alert("Введите корректную цену (не отрицательная)");
            return;
        }
        if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
            alert("Введите корректное количество на складе (не отрицательное)");
            return;
        }
        onSubmit({
            id: initialProduct?.id,
            name: trimmedName,
            category: trimmedCategory,
            description: trimmedDescription,
            price: parsedPrice,
            amount: parsedAmount,
        });
    };
    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div className="modal" onMouseDown={(e) => e.stopPropagation()}
                role="dialog" aria-modal="true">
                <div className="modal__header">
                    <div className="modal__title">{title}</div>
                    <button className="btn btn--icon" onClick={onClose} arialabel="Закрыть">
                        ✕
                    </button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="text">Название товара<span className="required">*</span></span>
                        <input
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder = 'Например, "Фикус"'
                            autoFocus
                        />
                    </label>
                    <label className="label">
                        <span className="text">Категория<span className="required">*</span></span>
                        <input
                            className="input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Например, "Тутовые"'
                        />
                    </label>
                    <label className="label">
                        Описание
                        <input
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Характеристики товара"
                        />
                    </label>
                    <label className="label">
                        <span className="text">Цена<span className="required">*</span></span>
                        <input
                            className="input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                            inputMode="numeric"
                        />
                    </label>
                    <label className="label">
                        <span className="text">Количество на складе<span className="required">*</span></span>
                        <input
                            className="input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            inputMode="numeric"
                        />
                    </label>
                    <div className="modal__footer">
                        <button type="button" className="btn btn--danger" onClick=
                            {onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {mode === "edit" ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
