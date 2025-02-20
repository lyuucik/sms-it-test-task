package org.lyuucik.models;

import java.util.Objects;

public final class Product {
    private final String name;
    private final Double price;
    private final Double discountPrice;

    public Product(
            String name,
            Double price,
            Double discountPrice
    ) {
        this.name = name;
        this.price = price;
        this.discountPrice = discountPrice;
    }

    public Product(
            String name,
            Double price
    ) {
        this(name, price, null);
    }

    public String name() {
        return name;
    }

    public Double price() {
        return price;
    }

    public Double discountPrice() {
        return discountPrice;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Product) obj;
        return Objects.equals(this.name, that.name) &&
                Objects.equals(this.price, that.price) &&
                Objects.equals(this.discountPrice, that.discountPrice);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price, discountPrice);
    }

    @Override
    public String toString() {
        return "Product[" +
                "name=" + name + ", " +
                "price=" + price + ", " +
                "discountPrice=" + discountPrice + ']';
    }
}
